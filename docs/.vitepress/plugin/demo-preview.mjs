import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import markdownItContainer from 'markdown-it-container';

// componentPreview check
var isCheckPreviewCom1 = /^<preview (.*)><\/preview>$/;
var isCheckPreviewCom2 = /^<preview (.*) \/>$/;
var isCheckContainerPreview = /^demo-preview=(.+)$/;
var scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/;
var scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/;
var scriptSetupCommonRE = /<\s*script\s+(setup|lang='ts'|lang="ts")?\s*(setup|lang='ts'|lang="ts")?\s*>/;
/**
 * 统一处理组件名称->驼峰命名
 * @param componentName
 */
var handleComponentName = function (componentName) {
    var newName = componentName;
    newName = newName.replaceAll(/[_|-]+(\w)/g, function ($0, $1) {
        return $1.toUpperCase();
    });
    return newName;
};
/**
 * 注入 script 脚本
 * @param mdInstance
 * @param path
 * @param componentName
 */
var injectComponentImportScript = function (env, path, componentName) {
    // https://github.com/vuejs/vitepress/issues/1258  __Path、__Relativepath、__data.Hoistedtags 被删除解决方案
    // https://github.com/mdit-vue/mdit-vue/blob/main/packages/plugin-sfc/src/types.ts
    // https://github.com/mdit-vue/mdit-vue/blob/main/packages/plugin-sfc/tests/__snapshots__/sfc-plugin.spec.ts.snap
    var scriptsCode = env.sfcBlocks.scripts;
    // 判断MD文件内部是否本身就存在 <script setup> 脚本
    var scriptsSetupIndex = scriptsCode.findIndex(function (script) {
        if (scriptSetupRE.test(script.tagOpen) || scriptLangTsRE.test(script.tagOpen))
            return true;
        return false;
    });
    // 统一处理组件名称为驼峰命名
    var _componentName = handleComponentName(componentName);
    // MD文件中没有 <script setup> 或 <script setup lang='ts'> 脚本文件
    if (scriptsSetupIndex === -1) {
        var scriptBlockObj = {
            type: 'script',
            tagClose: '</script>',
            tagOpen: "<script setup lang='ts'>",
            content: "<script setup lang='ts'>\n        import ".concat(_componentName, " from '").concat(path, "'\n        </script>"),
            contentStripped: "import ".concat(_componentName, " from '").concat(path, "'")
        };
        scriptsCode.push(scriptBlockObj);
    }
    else {
        // MD文件注入了 <script setup> 或 <script setup lang='ts'> 脚本
        var oldScriptsSetup = scriptsCode[0];
        // MD文件中存在已经引入了组件
        if (oldScriptsSetup.content.includes(path) && oldScriptsSetup.content.includes(_componentName)) {
            scriptsCode[0].content = oldScriptsSetup.content;
        }
        else {
            // MD文件中不存在组件 添加组件 import ${_componentName} from '${path}'\n
            // 如果MD文件中存在 <script setup lang="ts">、<script lang="ts" setup>  或 <script setup> 代码块, 那么统一转换为 <script setup lang="ts">
            var scriptCodeBlock = '<script lang="ts" setup>\n';
            scriptsCode[0].content = scriptsCode[0].content.replace(scriptSetupCommonRE, scriptCodeBlock);
            // 将组件引入的代码放进去
            scriptsCode[0].content = scriptsCode[0].content.replace(scriptCodeBlock, "<script setup>\n\n      import ".concat(_componentName, " from '").concat(path, "'\n"));
        }
    }
};
/**
 * 源码 => 代码块
 * @param mdInstance
 * @param sourceCode
 * @param suffix
 * @returns
 */
var transformHighlightCode = function (mdInstance, sourceCode, suffix) {
    return mdInstance.options.highlight(sourceCode, suffix, '');
};
/**
 * 根据组件路径组合组件引用名称
 * @param path
 * @returns
 */
var composeComponentName = function (path) {
    var isFlag = true;
    var componentList = [];
    while (isFlag) {
        var lastIndex = path.lastIndexOf('/');
        if (lastIndex === -1) {
            isFlag = false;
        }
        else {
            var name = path.substring(lastIndex + 1);
            componentList.unshift(name);
            path = path.substring(0, lastIndex);
        }
    }
    componentList = componentList.filter(function (item) { return item !== '' && item !== '.' && item !== '..'; });
    return componentList.join('-').split('.')[0];
};
/**
 * 检查组件相对路径
 * @param path
 * @returns
 */
var isCheckingRelativePath = function (path) {
    var relativePath = path;
    if (relativePath.startsWith('./') || relativePath.startsWith('../') || relativePath.startsWith('/'))
        return relativePath;
    return "./".concat(relativePath);
};

var titleRegex = /title=['"](.*?)['"]/;
var pathRegex = /path=['"](.*?)['"]/;
var descriptionRegex = /description=['"](.*?)['"]/;
/**
 * 编译预览组件
 * @param md
 * @param token
 * @param env
 * @returns
 */
var transformPreview = function (md, token, env) {
    var componentProps = {
        path: '',
        title: '默认标题',
        description: '描述内容'
    };
    // 获取Props相关参数
    var titleValue = token.content.match(titleRegex);
    var pathRegexValue = token.content.match(pathRegex);
    var descriptionRegexValue = token.content.match(descriptionRegex);
    if (!pathRegexValue)
        throw new Error('@vitepress-demo-preview/plugin: path is a required parameter');
    // eslint-disable-next-line prefer-destructuring
    componentProps.path = isCheckingRelativePath(pathRegexValue[1]);
    componentProps.title = titleValue ? titleValue[1] : '';
    componentProps.description = descriptionRegexValue ? descriptionRegexValue[1] : '';
    // 组件绝对路径，检查 realPath 是否存在，若不存在则使用默认路径
    var basePath = env.realPath || env.path || '.';
    var componentPath = resolve(dirname(basePath), componentProps.path);
    // 组件名
    var componentName = composeComponentName(componentProps.path);
    // 后缀名
    var suffixName = componentPath.substring(componentPath.lastIndexOf('.') + 1);
    // 注入组件导入语句
    injectComponentImportScript(env, componentProps.path, componentName);
    // console.log(injectComponentImportScript(env, componentProps.path, componentName));
    // 组件源码
    var componentSourceCode = readFileSync(componentPath, {
        encoding: 'utf-8'
    });
    // 源码代码块（经过处理）
    var compileHighlightCode = transformHighlightCode(md, componentSourceCode, suffixName);
    var code = encodeURI(componentSourceCode);
    var showCode = encodeURIComponent(compileHighlightCode);
    var sourceCode = "<demo-preview title=\"".concat(componentProps.title, "\" description=\"").concat(componentProps.description, "\" code=\"").concat(code, "\" showCode=\"").concat(showCode, "\" suffixName=\"").concat(suffixName, "\" absolutePath=\"").concat(componentPath, "\" relativePath=\"").concat(componentProps.path, "\">\n    <").concat(componentName, "></").concat(componentName, ">\n  </demo-preview>");
    return sourceCode;
};

var validateContainerRE = /^preview.*$/;
var parseContainerParamRE = /^preview\s?(.*?)(?:\s\|\|\s(.*?))?$/;
/**
 * 自定义容器的注册
 * @param md
 */
var containerDirectiveMount = function (md) {
    md.use(markdownItContainer, 'preview', {
        marker: ':',
        validate: function (params) {
            var validateContainer = params.trim().match(validateContainerRE);
            if (validateContainer && validateContainer.length !== 0)
                return true;
            return false;
        }
    });
};
/**
 * 解析自定义日期的Tag
 * @param md
 */
var parseContainerTag = function (md) {
    // 开始标签 :::preview
    var defaultContainerPreviewOpenRender = md.renderer.rules.container_preview_open;
    md.renderer.rules.container_preview_open = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        // 组件的相对路径
        var componentRelativePath = isCheckingRelativePath(tokens[idx + 2].content.split('=')[1]);
        // 组件绝对路径
        var componentPath = resolve(dirname(env.path), componentRelativePath || '.');
        // 后缀名
        var suffixName = componentPath.substring(componentPath.lastIndexOf('.') + 1);
        // 组件源码
        var componentSourceCode = readFileSync(componentPath, {
            encoding: 'utf-8'
        });
        // 源码代码块（经过处理）
        var compileHighlightCode = transformHighlightCode(md, componentSourceCode, suffixName);
        var code = encodeURI(componentSourceCode);
        var showCode = encodeURIComponent(compileHighlightCode);
        var getParamArr = tokens[idx].info.trim().match(parseContainerParamRE);
        var title = getParamArr && getParamArr[1] ? getParamArr[1] : '';
        var description = getParamArr && getParamArr[2] ? getParamArr[2] : '';
        if (token.nesting === 1)
            return "<demo-preview title='".concat(title, "' description='").concat(description, "' code=\"").concat(code, "\" showCode=\"").concat(showCode, "\" suffixName=\"").concat(suffixName, "\" absolutePath=\"").concat(componentPath, "\" relativePath=\"").concat(componentRelativePath, "\">\n");
        return defaultContainerPreviewOpenRender(tokens, idx, options, env, self);
    };
    // 闭合标签 :::
    var defaultContainerPreviewCloseRender = md.renderer.rules.container_preview_close;
    md.renderer.rules.container_preview_close = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        if (token.nesting === -1)
            return "</demo-preview>\n";
        return defaultContainerPreviewCloseRender(tokens, idx, options, env, self);
    };
};
/**
 * 解析自定义容器
 * @param md
 */
var parseContainer = function (md) {
    var defaultHtmlTextRender = md.renderer.rules.text;
    md.renderer.rules.text = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        if (token.type === 'text' && token.content.match(isCheckContainerPreview)) {
            var componentRelativePath = isCheckingRelativePath(token.content.match(isCheckContainerPreview)[1]);
            var componentName = composeComponentName(componentRelativePath);
            injectComponentImportScript(env, componentRelativePath, componentName);
            return "<".concat(componentName, "></").concat(componentName, ">");
        }
        return defaultHtmlTextRender(tokens, idx, options, env, self);
    };
};

var componentPreview = function (md) {
    var defaultHtmlInlineRender = md.renderer.rules.html_inline;
    md.renderer.rules.html_inline = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        if (isCheckPreviewCom1.test(token.content) || isCheckPreviewCom2.test(token.content)) {
            return transformPreview(md, token, env);
        }
        return defaultHtmlInlineRender(tokens, idx, options, env, self);
    };
};
var containerPreview = function (md) {
    containerDirectiveMount(md);
    parseContainerTag(md);
    parseContainer(md);
};

export { componentPreview, containerPreview };
