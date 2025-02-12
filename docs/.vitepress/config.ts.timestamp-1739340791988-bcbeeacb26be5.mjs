// .vitepress/config.ts
import { defineConfig } from "file:///D:/ksWare/zujianku/docs/node_modules/vitepress/dist/node/index.js";

// .vitepress/configs/nav.ts
var nav_default = [
  { text: "\u6587\u6863", link: "/knowledge/introduce", activeMatch: "^/knowledge" },
  {
    text: "\u7EC4\u4EF6",
    link: "/components/General/button",
    activeMatch: "^/components/"
  },
  {
    text: "\u6A21\u677F",
    link: "/templates/KSW_UI/pageTableView",
    activeMatch: "^/templates/"
  },
  { text: "\u66F4\u65B0\u65E5\u5FD7", link: "/CHANGELOG" },
  { text: "\u5173\u4E8E\u6211\u4EEC", link: "/team" },
  {
    text: "\u56FE\u6807\u5E93",
    link: "https://sengoku-f.github.io/KSW-vue-icon"
  },
  {
    text: "\u6E90\u7801",
    link: "https://github.com/xiyure/k-component-lib"
  }
];

// .vitepress/plugin/rewritePath.ts
import path from "path";
import { globSync } from "file:///D:/ksWare/zujianku/docs/node_modules/glob/dist/esm/index.js";

// .vitepress/configs/sidebar.ts
import { generateSidebar } from "file:///D:/ksWare/zujianku/docs/node_modules/vitepress-sidebar/dist/index.js";
var baseSidebarOptions = {
  documentRootPath: "docs",
  useTitleFromFileHeading: true,
  // 启用后，会从文件头部的 title 标签获取标题
  useTitleFromFrontmatter: true,
  // 启用后，会从 frontmatter 中获取标题
  useFolderTitleFromIndexFile: true,
  //如果此值为true，则使用当前文件夹文件中的信息index.md来获取菜单名称。如果index.md文件不存在，则使用文件夹名称。
  useFolderLinkFromIndexFile: false,
  // 启用后，会将文件夹的名称作为链接，而不是文件夹下面的 index.md 文件
  convertSameNameSubFileToGroupIndexPage: true,
  // folderLinkNotIncludesFileName: true,
  underscoreToSpace: true,
  // _转为空格
  capitalizeFirst: true,
  //首字母强制大写
  // sortMenusByFrontmatterDate: true, // 启用日期排序
  // sortMenusOrderByDescending: true, // 升序
  collapsed: false
  // 文件夹折叠
  // debugPrint: true,
};
var KnowledgeSidebarOptions = {
  ...baseSidebarOptions,
  scanStartPath: "knowledge",
  resolvePath: "/knowledge/",
  sortMenusByFrontmatterDate: true,
  // 启用日期排序
  sortMenusOrderByDescending: true
  // 升序
};
var componentsGeneralSidebarOptions = {
  ...baseSidebarOptions,
  sortMenusByFrontmatterOrder: true,
  sortMenusOrderByDescending: true,
  scanStartPath: "components",
  resolvePath: "/components/",
  manualSortFileNameByPriority: ["General", "Navigation"]
  // 手动排序
};
var templatesGeneralSidebarOptions = {
  ...baseSidebarOptions,
  scanStartPath: "templates",
  resolvePath: "/templates/"
};
var sidebar_default = {
  "/knowledge/": {
    base: "/knowledge/",
    items: generateSidebar(KnowledgeSidebarOptions)
  },
  "/components/": {
    base: "/components/",
    items: generateSidebar(componentsGeneralSidebarOptions)
  },
  "/templates/": {
    base: "/templates/",
    items: generateSidebar(templatesGeneralSidebarOptions)
  }
};

// .vitepress/plugin/rewritePath.ts
function generateRewrites() {
  const rewrites = {};
  const moFiles = globSync("docs/**/*.md");
  moFiles.forEach((file) => {
    const posixFile = file.split(path.sep).join(path.posix.sep);
    const fileName = path.posix.basename(posixFile, ".md");
    const dirName = path.posix.basename(path.posix.dirname(posixFile));
    if (fileName.toLowerCase() === dirName.toLowerCase()) {
      const relativePath = path.posix.relative("docs", posixFile);
      const rewritePath = `${path.posix.dirname(relativePath)}.md`;
      rewrites[posixFile] = rewritePath;
    } else {
      const relativePath = path.posix.relative("docs", posixFile);
      rewrites[posixFile] = relativePath;
    }
  });
  return rewrites;
}
function sidebarRewrites() {
  function processItems(items) {
    items.forEach((item) => {
      if (item.link) {
        const parts = item.link?.split("/");
        if (parts.length > 1) {
          const lastPart = parts[parts.length - 1];
          const secondLastPart = parts[parts.length - 2];
          if (lastPart.toLowerCase() === secondLastPart.toLowerCase()) {
            parts.pop();
            item.link = parts.join("/");
          }
        }
      }
      if (item.items) {
        processItems(item.items);
      }
    });
  }
  const newSidebar = {};
  for (const [key, value] of Object.entries(sidebar_default)) {
    if (key.startsWith("/docs")) {
      const newKey = key.replace(/^\/docs/, "");
      const newValue = { ...value, base: value.base.replace(/^\/docs/, "") };
      newSidebar[newKey] = newValue;
    } else {
      newSidebar[key] = value;
    }
    processItems(value.items);
  }
  return newSidebar;
}

// .vitepress/plugin/demo-preview/utils.ts
var isCheckPreviewCom1 = /^<preview (.*)><\/preview>$/;
var isCheckPreviewCom2 = /^<preview (.*) \/>$/;
var isCheckContainerPreview = /^demo-preview=(.+)$/;
var scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/;
var scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/;
var scriptSetupCommonRE = /<\s*script\s+(setup|lang='ts'|lang="ts")?\s*(setup|lang='ts'|lang="ts")?\s*>/;
var handleComponentName = (componentName) => {
  let newName = componentName;
  newName = newName.replaceAll(/[_|-]+(\w)/g, ($0, $1) => {
    return $1.toUpperCase();
  });
  return newName;
};
var injectComponentImportScript = (env, path2, componentName) => {
  const scriptsCode = env.sfcBlocks.scripts;
  const scriptsSetupIndex = scriptsCode.findIndex((script) => {
    if (scriptSetupRE.test(script.tagOpen) || scriptLangTsRE.test(script.tagOpen)) return true;
    return false;
  });
  const _componentName = handleComponentName(componentName);
  if (scriptsSetupIndex === -1) {
    const scriptBlockObj = {
      type: "script",
      tagClose: "</script>",
      tagOpen: "<script setup lang='ts'>",
      content: `<script setup lang='ts'>
        import ${_componentName} from '${path2}'
        </script>`,
      contentStripped: `import ${_componentName} from '${path2}'`
    };
    scriptsCode.push(scriptBlockObj);
  } else {
    const oldScriptsSetup = scriptsCode[0];
    if (oldScriptsSetup.content.includes(path2) && oldScriptsSetup.content.includes(_componentName)) {
      scriptsCode[0].content = oldScriptsSetup.content;
    } else {
      const scriptCodeBlock = '<script lang="ts" setup>\n';
      scriptsCode[0].content = scriptsCode[0].content.replace(scriptSetupCommonRE, scriptCodeBlock);
      scriptsCode[0].content = scriptsCode[0].content.replace(
        scriptCodeBlock,
        `<script setup>

      import ${_componentName} from '${path2}'
`
      );
    }
  }
};
var transformHighlightCode = (mdInstance, sourceCode, suffix) => mdInstance.options.highlight(sourceCode, suffix, "");
var composeComponentName = (path2) => {
  let isFlag = true;
  let componentList = [];
  while (isFlag) {
    const lastIndex = path2.lastIndexOf("/");
    if (lastIndex === -1) {
      isFlag = false;
    } else {
      const name = path2.substring(lastIndex + 1);
      componentList.unshift(name);
      path2 = path2.substring(0, lastIndex);
    }
  }
  componentList = componentList.filter((item) => item !== "" && item !== "." && item !== "..");
  return componentList.join("-").split(".")[0];
};
var isCheckingRelativePath = (path2) => {
  const relativePath = path2;
  if (relativePath.startsWith("./") || relativePath.startsWith("../") || relativePath.startsWith("/")) {
    if (!relativePath.endsWith(".vue")) {
      return relativePath + ".vue";
    }
  }
  return relativePath;
};

// .vitepress/plugin/demo-preview/componentPreview.ts
import { resolve, dirname } from "path";
import { readFileSync } from "fs";
var titleRegex = /title=['"](.*?)['"]/;
var pathRegex = /path=['"](.*?)['"]/;
var descriptionRegex = /description=['"](.*?)['"]/;
var transformPreview = (md, token, env) => {
  const componentProps = {
    path: "",
    title: "\u9ED8\u8BA4\u6807\u9898",
    description: "\u63CF\u8FF0\u5185\u5BB9"
  };
  const titleValue = token.content.match(titleRegex);
  const pathRegexValue = token.content.match(pathRegex);
  const descriptionRegexValue = token.content.match(descriptionRegex);
  if (!pathRegexValue) throw new Error("@vitepress-demo-preview/plugin: path is a required parameter");
  componentProps.path = isCheckingRelativePath(pathRegexValue[1]);
  componentProps.title = titleValue ? titleValue[1] : "";
  componentProps.description = descriptionRegexValue ? descriptionRegexValue[1] : "";
  const basePath = env.realPath || env.path || ".";
  const componentPath = resolve(dirname(basePath), componentProps.path || ".");
  const componentName = composeComponentName(componentProps.path);
  const suffixName = componentPath.substring(componentPath.lastIndexOf(".") + 1);
  injectComponentImportScript(env, componentProps.path, componentName);
  const componentSourceCode = readFileSync(componentPath, {
    encoding: "utf-8"
  });
  const compileHighlightCode = transformHighlightCode(md, componentSourceCode, suffixName);
  const code = encodeURI(componentSourceCode);
  const showCode = encodeURIComponent(compileHighlightCode);
  const sourceCode = `<demo-preview title="${componentProps.title}" description="${componentProps.description}" code="${code}" showCode="${showCode}" suffixName="${suffixName}" absolutePath="${componentPath}" relativePath="${componentProps.path}">
    <client-only>
      <${componentName}></${componentName}>
    </client-only>
  </demo-preview>`;
  return sourceCode;
};

// .vitepress/plugin/demo-preview/containerPreview.ts
import { resolve as resolve2, dirname as dirname2 } from "path";
import { readFileSync as readFileSync2 } from "fs";
import markdownItContainer from "file:///D:/ksWare/zujianku/docs/node_modules/markdown-it-container/index.mjs";
var validateContainerRE = /^preview.*$/;
var parseContainerParamRE = /^preview\s?(.*?)(?:\s\|\|\s(.*?))?$/;
var containerDirectiveMount = (md) => {
  md.use(markdownItContainer, "preview", {
    marker: ":",
    validate: (params) => {
      const validateContainer = params.trim().match(validateContainerRE);
      if (validateContainer && validateContainer.length !== 0) return true;
      return false;
    }
  });
};
var parseContainerTag = (md) => {
  const defaultContainerPreviewOpenRender = md.renderer.rules.container_preview_open;
  md.renderer.rules.container_preview_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const componentRelativePath = isCheckingRelativePath(tokens[idx + 2].content.split("=")[1]);
    const basePath = env.realPath || env.path || ".";
    const componentPath = resolve2(dirname2(basePath), componentRelativePath || ".");
    const suffixName = componentPath.substring(componentPath.lastIndexOf(".") + 1);
    const componentSourceCode = readFileSync2(componentPath, {
      encoding: "utf-8"
    });
    const compileHighlightCode = transformHighlightCode(md, componentSourceCode, suffixName);
    const code = encodeURI(componentSourceCode);
    const showCode = encodeURIComponent(compileHighlightCode);
    const getParamArr = tokens[idx].info.trim().match(parseContainerParamRE);
    const title = getParamArr && getParamArr[1] ? getParamArr[1] : "";
    const description = getParamArr && getParamArr[2] ? getParamArr[2] : "";
    if (token.nesting === 1)
      return `<demo-preview title='${title}' description='${description}' code="${code}" showCode="${showCode}" suffixName="${suffixName}" absolutePath="${componentPath}" relativePath="${componentRelativePath}">
`;
    return defaultContainerPreviewOpenRender(tokens, idx, options, env, self);
  };
  const defaultContainerPreviewCloseRender = md.renderer.rules.container_preview_close;
  md.renderer.rules.container_preview_close = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token.nesting === -1) return `</demo-preview>
`;
    return defaultContainerPreviewCloseRender(tokens, idx, options, env, self);
  };
};
var parseContainer = (md) => {
  const defaultHtmlTextRender = md.renderer.rules.text;
  md.renderer.rules.text = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token.type === "text" && token.content.match(isCheckContainerPreview)) {
      const componentRelativePath = isCheckingRelativePath(token.content.match(isCheckContainerPreview)[1]);
      const componentName = composeComponentName(componentRelativePath);
      injectComponentImportScript(env, componentRelativePath, componentName);
      return `<${componentName}></${componentName}>`;
    }
    return defaultHtmlTextRender(tokens, idx, options, env, self);
  };
};

// .vitepress/plugin/demo-preview/index.ts
var componentPreview = (md) => {
  const defaultHtmlInlineRender = md.renderer.rules.html_inline;
  md.renderer.rules.html_inline = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (isCheckPreviewCom1.test(token.content) || isCheckPreviewCom2.test(token.content)) {
      return transformPreview(md, token, env);
    }
    return defaultHtmlInlineRender(tokens, idx, options, env, self);
  };
};
var containerPreview = (md) => {
  containerDirectiveMount(md);
  parseContainerTag(md);
  parseContainer(md);
};

// .vitepress/config.ts
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///D:/ksWare/zujianku/docs/.vitepress/config.ts";
var config_default = defineConfig({
  lang: "zh-CN",
  title: "ksw-ux",
  description: "ksw-ux \u662F\u4E00\u4E2A\u57FA\u4E8E Element-Plus \u7684 UI \u7EC4\u4EF6\u5E93",
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/klogo.svg" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh" }],
    [
      "meta",
      {
        property: "og:title",
        content: "KSW Design | \u57FA\u4E8E KSW Design \u8BBE\u8BA1\u4F53\u7CFB\u7684 Vue3 \u7EC4\u4EF6\u5E93\uFF0C\u7528\u4E8E\u7814\u53D1\u4F01\u4E1A\u7EA7\u4E2D\u540E\u53F0\u4EA7\u54C1\u3002"
      }
    ],
    ["meta", { property: "og:site_name", content: "KSW Design" }]
  ],
  markdown: {
    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview);
    },
    image: {
      lazyLoading: true
    }
  },
  cleanUrls: true,
  rewrites: {
    ...generateRewrites()
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav_default,
    sidebar: {
      ...sidebarRewrites()
    },
    socialLinks: [{ icon: "github", link: "https://github.com/xiyure/k-component-lib" }],
    logo: { src: "/klogo.svg", width: 24, height: 24 },
    docFooter: {
      prev: "\u4E0A\u4E00\u9875",
      next: "\u4E0B\u4E00\u9875"
    },
    outline: {
      level: "deep",
      label: "\u9875\u9762\u5BFC\u822A"
    },
    langMenuLabel: "\u591A\u8BED\u8A00",
    returnToTopLabel: "\u56DE\u5230\u9876\u90E8",
    sidebarMenuLabel: "\u83DC\u5355",
    darkModeSwitchLabel: "\u4E3B\u9898",
    lightModeSwitchTitle: "\u5207\u6362\u5230\u6D45\u8272\u6A21\u5F0F",
    darkModeSwitchTitle: "\u5207\u6362\u5230\u6DF1\u8272\u6A21\u5F0F",
    outlineTitle: "\u672C\u9875\u76EE\u5F55",
    lastUpdatedText: "\u4E0A\u6B21\u66F4\u65B0",
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "\u641C\u7D22\u6587\u6863",
            buttonAriaLabel: "\u641C\u7D22\u6587\u6863"
          },
          modal: {
            noResultsText: "\u65E0\u6CD5\u627E\u5230\u76F8\u5173\u7ED3\u679C",
            resetButtonTitle: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
            footer: {
              selectText: "\u9009\u62E9",
              navigateText: "\u5207\u6362",
              closeText: "\u5173\u95ED"
            }
          }
        },
        // disableDetailedView: true,
        detailedView: true
      }
    }
  },
  vite: {
    plugins: [],
    resolve: {
      alias: [
        {
          find: /^.*\/VPHome\.vue$/,
          replacement: fileURLToPath(new URL("./templates/CVPHome/CVPHome.vue", __vite_injected_original_import_meta_url))
        }
      ]
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcudHMiLCAiLnZpdGVwcmVzcy9jb25maWdzL25hdi50cyIsICIudml0ZXByZXNzL3BsdWdpbi9yZXdyaXRlUGF0aC50cyIsICIudml0ZXByZXNzL2NvbmZpZ3Mvc2lkZWJhci50cyIsICIudml0ZXByZXNzL3BsdWdpbi9kZW1vLXByZXZpZXcvdXRpbHMudHMiLCAiLnZpdGVwcmVzcy9wbHVnaW4vZGVtby1wcmV2aWV3L2NvbXBvbmVudFByZXZpZXcudHMiLCAiLnZpdGVwcmVzcy9wbHVnaW4vZGVtby1wcmV2aWV3L2NvbnRhaW5lclByZXZpZXcudHMiLCAiLnZpdGVwcmVzcy9wbHVnaW4vZGVtby1wcmV2aWV3L2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxca3NXYXJlXFxcXHp1amlhbmt1XFxcXGRvY3NcXFxcLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxca3NXYXJlXFxcXHp1amlhbmt1XFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2tzV2FyZS96dWppYW5rdS9kb2NzLy52aXRlcHJlc3MvY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJztcbmltcG9ydCBuYXYgZnJvbSAnLi9jb25maWdzL25hdic7XG5pbXBvcnQgeyBnZW5lcmF0ZVJld3JpdGVzLCBzaWRlYmFyUmV3cml0ZXMgfSBmcm9tICcuL3BsdWdpbi9yZXdyaXRlUGF0aCc7XG5pbXBvcnQgeyBjb250YWluZXJQcmV2aWV3LCBjb21wb25lbnRQcmV2aWV3IH0gZnJvbSAnLi9wbHVnaW4vZGVtby1wcmV2aWV3JztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJztcblxuLy8gaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9zaXRlLWNvbmZpZ1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgbGFuZzogJ3poLUNOJyxcbiAgdGl0bGU6ICdrc3ctdXgnLFxuICBkZXNjcmlwdGlvbjogJ2tzdy11eCBcdTY2MkZcdTRFMDBcdTRFMkFcdTU3RkFcdTRFOEUgRWxlbWVudC1QbHVzIFx1NzY4NCBVSSBcdTdFQzRcdTRFRjZcdTVFOTMnLFxuXG4gIGhlYWQ6IFtcbiAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCB0eXBlOiAnaW1hZ2Uvc3ZnK3htbCcsIGhyZWY6ICcva2xvZ28uc3ZnJyB9XSxcbiAgICBbJ21ldGEnLCB7IHByb3BlcnR5OiAnb2c6dHlwZScsIGNvbnRlbnQ6ICd3ZWJzaXRlJyB9XSxcbiAgICBbJ21ldGEnLCB7IHByb3BlcnR5OiAnb2c6bG9jYWxlJywgY29udGVudDogJ3poJyB9XSxcbiAgICBbXG4gICAgICAnbWV0YScsXG4gICAgICB7XG4gICAgICAgIHByb3BlcnR5OiAnb2c6dGl0bGUnLFxuICAgICAgICBjb250ZW50OiAnS1NXIERlc2lnbiB8IFx1NTdGQVx1NEU4RSBLU1cgRGVzaWduIFx1OEJCRVx1OEJBMVx1NEY1M1x1N0NGQlx1NzY4NCBWdWUzIFx1N0VDNFx1NEVGNlx1NUU5M1x1RkYwQ1x1NzUyOFx1NEU4RVx1NzgxNFx1NTNEMVx1NEYwMVx1NEUxQVx1N0VBN1x1NEUyRFx1NTQwRVx1NTNGMFx1NEVBN1x1NTRDMVx1MzAwMicsXG4gICAgICB9LFxuICAgIF0sXG4gICAgWydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6ICdLU1cgRGVzaWduJyB9XSxcbiAgXSxcbiAgbWFya2Rvd246IHtcbiAgICBjb25maWc6IChtZCkgPT4ge1xuICAgICAgbWQudXNlKGNvbnRhaW5lclByZXZpZXcpO1xuICAgICAgbWQudXNlKGNvbXBvbmVudFByZXZpZXcpO1xuICAgIH0sXG4gICAgaW1hZ2U6IHtcbiAgICAgIGxhenlMb2FkaW5nOiB0cnVlLFxuICAgIH0sXG4gIH0sXG4gIGNsZWFuVXJsczogdHJ1ZSxcbiAgcmV3cml0ZXM6IHtcbiAgICAuLi5nZW5lcmF0ZVJld3JpdGVzKCksXG4gIH0sXG4gIHRoZW1lQ29uZmlnOiB7XG4gICAgLy8gaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9kZWZhdWx0LXRoZW1lLWNvbmZpZ1xuICAgIG5hdixcblxuICAgIHNpZGViYXI6IHtcbiAgICAgIC4uLnNpZGViYXJSZXdyaXRlcygpLFxuICAgIH0sXG5cbiAgICBzb2NpYWxMaW5rczogW3sgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20veGl5dXJlL2stY29tcG9uZW50LWxpYicgfV0sXG5cbiAgICBsb2dvOiB7IHNyYzogJy9rbG9nby5zdmcnLCB3aWR0aDogMjQsIGhlaWdodDogMjQgfSxcblxuICAgIGRvY0Zvb3Rlcjoge1xuICAgICAgcHJldjogJ1x1NEUwQVx1NEUwMFx1OTg3NScsXG4gICAgICBuZXh0OiAnXHU0RTBCXHU0RTAwXHU5ODc1JyxcbiAgICB9LFxuXG4gICAgb3V0bGluZToge1xuICAgICAgbGV2ZWw6ICdkZWVwJyxcbiAgICAgIGxhYmVsOiAnXHU5ODc1XHU5NzYyXHU1QkZDXHU4MjJBJyxcbiAgICB9LFxuXG4gICAgbGFuZ01lbnVMYWJlbDogJ1x1NTkxQVx1OEJFRFx1OEEwMCcsXG4gICAgcmV0dXJuVG9Ub3BMYWJlbDogJ1x1NTZERVx1NTIzMFx1OTg3Nlx1OTBFOCcsXG4gICAgc2lkZWJhck1lbnVMYWJlbDogJ1x1ODNEQ1x1NTM1NScsXG4gICAgZGFya01vZGVTd2l0Y2hMYWJlbDogJ1x1NEUzQlx1OTg5OCcsXG4gICAgbGlnaHRNb2RlU3dpdGNoVGl0bGU6ICdcdTUyMDdcdTYzNjJcdTUyMzBcdTZENDVcdTgyNzJcdTZBMjFcdTVGMEYnLFxuICAgIGRhcmtNb2RlU3dpdGNoVGl0bGU6ICdcdTUyMDdcdTYzNjJcdTUyMzBcdTZERjFcdTgyNzJcdTZBMjFcdTVGMEYnLFxuICAgIG91dGxpbmVUaXRsZTogJ1x1NjcyQ1x1OTg3NVx1NzZFRVx1NUY1NScsXG4gICAgbGFzdFVwZGF0ZWRUZXh0OiAnXHU0RTBBXHU2QjIxXHU2NkY0XHU2NUIwJyxcblxuICAgIHNlYXJjaDoge1xuICAgICAgcHJvdmlkZXI6ICdsb2NhbCcsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIHRyYW5zbGF0aW9uczoge1xuICAgICAgICAgIGJ1dHRvbjoge1xuICAgICAgICAgICAgYnV0dG9uVGV4dDogJ1x1NjQxQ1x1N0QyMlx1NjU4N1x1Njg2MycsXG4gICAgICAgICAgICBidXR0b25BcmlhTGFiZWw6ICdcdTY0MUNcdTdEMjJcdTY1ODdcdTY4NjMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbW9kYWw6IHtcbiAgICAgICAgICAgIG5vUmVzdWx0c1RleHQ6ICdcdTY1RTBcdTZDRDVcdTYyN0VcdTUyMzBcdTc2RjhcdTUxNzNcdTdFRDNcdTY3OUMnLFxuICAgICAgICAgICAgcmVzZXRCdXR0b25UaXRsZTogJ1x1NkUwNVx1OTY2NFx1NjdFNVx1OEJFMlx1Njc2MVx1NEVGNicsXG4gICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgc2VsZWN0VGV4dDogJ1x1OTAwOVx1NjJFOScsXG4gICAgICAgICAgICAgIG5hdmlnYXRlVGV4dDogJ1x1NTIwN1x1NjM2MicsXG4gICAgICAgICAgICAgIGNsb3NlVGV4dDogJ1x1NTE3M1x1OTVFRCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIC8vIGRpc2FibGVEZXRhaWxlZFZpZXc6IHRydWUsXG4gICAgICAgIGRldGFpbGVkVmlldzogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgdml0ZToge1xuICAgIHBsdWdpbnM6IFtdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAvXi4qXFwvVlBIb21lXFwudnVlJC8sXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi90ZW1wbGF0ZXMvQ1ZQSG9tZS9DVlBIb21lLnZ1ZScsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGtzV2FyZVxcXFx6dWppYW5rdVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxca3NXYXJlXFxcXHp1amlhbmt1XFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdzXFxcXG5hdi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDova3NXYXJlL3p1amlhbmt1L2RvY3MvLnZpdGVwcmVzcy9jb25maWdzL25hdi50c1wiO2V4cG9ydCBkZWZhdWx0IFtcbiAgeyB0ZXh0OiAnXHU2NTg3XHU2ODYzJywgbGluazogJy9rbm93bGVkZ2UvaW50cm9kdWNlJywgYWN0aXZlTWF0Y2g6ICdeL2tub3dsZWRnZScgfSxcbiAge1xuICAgIHRleHQ6ICdcdTdFQzRcdTRFRjYnLFxuICAgIGxpbms6ICcvY29tcG9uZW50cy9HZW5lcmFsL2J1dHRvbicsXG4gICAgYWN0aXZlTWF0Y2g6ICdeL2NvbXBvbmVudHMvJyxcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdcdTZBMjFcdTY3N0YnLFxuICAgIGxpbms6ICcvdGVtcGxhdGVzL0tTV19VSS9wYWdlVGFibGVWaWV3JyxcbiAgICBhY3RpdmVNYXRjaDogJ14vdGVtcGxhdGVzLycsXG4gIH0sXG4gIHsgdGV4dDogJ1x1NjZGNFx1NjVCMFx1NjVFNVx1NUZENycsIGxpbms6ICcvQ0hBTkdFTE9HJyB9LFxuICB7IHRleHQ6ICdcdTUxNzNcdTRFOEVcdTYyMTFcdTRFRUMnLCBsaW5rOiAnL3RlYW0nIH0sXG4gIHtcbiAgICB0ZXh0OiAnXHU1NkZFXHU2ODA3XHU1RTkzJyxcbiAgICBsaW5rOiAnaHR0cHM6Ly9zZW5nb2t1LWYuZ2l0aHViLmlvL0tTVy12dWUtaWNvbicsXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnXHU2RTkwXHU3ODAxJyxcbiAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3hpeXVyZS9rLWNvbXBvbmVudC1saWInLFxuICB9LFxuXTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxca3NXYXJlXFxcXHp1amlhbmt1XFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxwbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGtzV2FyZVxcXFx6dWppYW5rdVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxccGx1Z2luXFxcXHJld3JpdGVQYXRoLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9rc1dhcmUvenVqaWFua3UvZG9jcy8udml0ZXByZXNzL3BsdWdpbi9yZXdyaXRlUGF0aC50c1wiO2ltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBnbG9iU3luYyB9IGZyb20gXCJnbG9iXCI7XG5pbXBvcnQgc2lkZWJhciBmcm9tICcuLi9jb25maWdzL3NpZGViYXInO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVJld3JpdGVzKCkge1xuICBjb25zdCByZXdyaXRlcyA9IHt9O1xuICBcbiAgLy8gXHU1MzM5XHU5MTREXHU2MjQwXHU2NzA5XHU3Njg0IE1hcmtkb3duIFx1NjU4N1x1NEVGNlxuICBjb25zdCBtb0ZpbGVzID0gZ2xvYlN5bmMoJ2RvY3MvKiovKi5tZCcpO1xuICBcbiAgbW9GaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgIC8vIFx1NUMwNlx1OERFRlx1NUY4NFx1OEY2Q1x1NjM2Mlx1NEUzQSBQT1NJWCBcdTY4M0NcdTVGMEYsIFx1NTE3Q1x1NUJCOSB3aW5kb3dzXG4gICAgY29uc3QgcG9zaXhGaWxlID0gZmlsZS5zcGxpdChwYXRoLnNlcCkuam9pbihwYXRoLnBvc2l4LnNlcCk7XG4gICAgXG4gICAgY29uc3QgZmlsZU5hbWUgPSBwYXRoLnBvc2l4LmJhc2VuYW1lKHBvc2l4RmlsZSwgJy5tZCcpOyAvLyBcdTgzQjdcdTUzRDZcdTY1ODdcdTRFRjZcdTU0MERcdUZGMDhcdTRFMERcdTVFMjZcdTYyNjlcdTVDNTVcdTU0MERcdUZGMDlcbiAgICBjb25zdCBkaXJOYW1lID0gcGF0aC5wb3NpeC5iYXNlbmFtZShwYXRoLnBvc2l4LmRpcm5hbWUocG9zaXhGaWxlKSk7IC8vIFx1ODNCN1x1NTNENlx1NjI0MFx1NTcyOFx1NzZFRVx1NUY1NVx1NTQwRFxuICAgIFxuICAgIC8vIFx1NjhDMFx1NjdFNVx1NjU4N1x1NEVGNlx1NTQwRFx1NTQ4Q1x1NzZFRVx1NUY1NVx1NTQwRFx1NjYyRlx1NTQyNlx1NzZGOFx1NTQwQ1xuICAgIGlmIChmaWxlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBkaXJOYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIC8vIFx1NzUxRlx1NjIxMFx1OTFDRFx1NTE5OVx1OERFRlx1NUY4NFx1RkYwQ1x1NTNCQlx1NjM4OVx1OEJFNVx1NzZFRVx1NUY1NVxuICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gcGF0aC5wb3NpeC5yZWxhdGl2ZSgnZG9jcycsIHBvc2l4RmlsZSk7XG4gICAgICBjb25zdCByZXdyaXRlUGF0aCA9IGAke3BhdGgucG9zaXguZGlybmFtZShyZWxhdGl2ZVBhdGgpfS5tZGA7XG4gICAgICByZXdyaXRlc1twb3NpeEZpbGVdID0gcmV3cml0ZVBhdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFx1NTQyNlx1NTIxOVx1RkYwQ1x1NEZERFx1NjMwMVx1NTM5Rlx1NjcwOVx1NzY4NFx1NzZGOFx1NUJGOVx1OERFRlx1NUY4NFxuICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gcGF0aC5wb3NpeC5yZWxhdGl2ZSgnZG9jcycsIHBvc2l4RmlsZSk7XG4gICAgICByZXdyaXRlc1twb3NpeEZpbGVdID0gcmVsYXRpdmVQYXRoO1xuICAgIH1cbiAgfSk7XG4gIC8vIGNvbnNvbGUubG9nKHJld3JpdGVzKTtcblxuICByZXR1cm4gcmV3cml0ZXM7XG59XG5cbmZ1bmN0aW9uIHNpZGViYXJSZXdyaXRlcygpIHtcbiAgZnVuY3Rpb24gcHJvY2Vzc0l0ZW1zKGl0ZW1zKSB7XG4gICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLmxpbmspIHtcbiAgICAgICAgY29uc3QgcGFydHMgPSBpdGVtLmxpbms/LnNwbGl0KCcvJyk7XG4gICAgICAgIC8vIFx1NjhDMFx1NjdFNSBwYXJ0cyBcdTc2ODRcdTk1N0ZcdTVFQTZcdTRFRTVcdTc4NkVcdTRGRERcdTRFMERcdTRGMUFcdThCQkZcdTk1RUUgdW5kZWZpbmVkXG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY29uc3QgbGFzdFBhcnQgPSBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICBjb25zdCBzZWNvbmRMYXN0UGFydCA9IHBhcnRzW3BhcnRzLmxlbmd0aCAtIDJdO1xuICBcbiAgICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTY3MDBcdTU0MEVcdTRFMjRcdTkwRThcdTUyMDZcdTc2RjhcdTU0MENcdUZGMENcdTUyMTlcdTkxQ0RcdTUxOTlcdTk0RkVcdTYzQTVcbiAgICAgICAgICBpZiAobGFzdFBhcnQudG9Mb3dlckNhc2UoKSA9PT0gc2Vjb25kTGFzdFBhcnQudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgcGFydHMucG9wKCk7IC8vIFx1NzlGQlx1OTY2NFx1NjcwMFx1NTQwRVx1NEUwMFx1OTBFOFx1NTIwNlxuICAgICAgICAgICAgaXRlbS5saW5rID0gcGFydHMuam9pbignLycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBcdTU5ODJcdTY3OUNcdTY3MDlcdTVCNTBcdTdFQTdcdUZGMENcdTkwMTJcdTVGNTJcdTU5MDRcdTc0MDZcbiAgICAgIGlmIChpdGVtLml0ZW1zKSB7XG4gICAgICAgIHByb2Nlc3NJdGVtcyhpdGVtLml0ZW1zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBjb25zdCBuZXdTaWRlYmFyID0ge307XG5cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc2lkZWJhcikpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhgXHU1OTA0XHU3NDA2XHU1N0ZBXHU4REVGXHU1Rjg0OiAke3ZhbHVlLmJhc2V9YCk7XG4gICAgaWYgKGtleS5zdGFydHNXaXRoKCcvZG9jcycpKSB7XG4gICAgICAvLyBcdTUzQkJcdTk2NjRcdTk1MkVcdTRFMkRcdTc2ODQgJy9kb2NzJyBcdTUyNERcdTdGMDBcbiAgICAgIGNvbnN0IG5ld0tleSA9IGtleS5yZXBsYWNlKC9eXFwvZG9jcy8sICcnKTtcbiAgICAgIC8vIFx1NTNCQlx1OTY2NGJhc2VcdThERUZcdTVGODRcdTRFMkRcdTc2ODQgJy9kb2NzJ1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSB7IC4uLnZhbHVlLCBiYXNlOiB2YWx1ZS5iYXNlLnJlcGxhY2UoL15cXC9kb2NzLywgJycpIH07XG4gICAgICAvLyBcdTVDMDZcdTU5MDRcdTc0MDZcdTU0MEVcdTc2ODRcdTk1MkVcdTU0OENcdTUwM0NcdTZERkJcdTUyQTBcdTUyMzBcdTY1QjBcdTc2ODRcdTVCRjlcdThDNjFcdTRFMkRcbiAgICAgIG5ld1NpZGViYXJbbmV3S2V5XSA9IG5ld1ZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBcdTU5ODJcdTY3OUNcdTk1MkVcdTRFMERcdTUzMDVcdTU0MkIgJy9kb2NzJ1x1RkYwQ1x1NTIxOVx1NzZGNFx1NjNBNVx1NTkwRFx1NTIzNlx1NTIzMFx1NjVCMFx1NUJGOVx1OEM2MVx1NEUyRFxuICAgICAgbmV3U2lkZWJhcltrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHByb2Nlc3NJdGVtcyh2YWx1ZS5pdGVtcyk7XG4gIH1cbiAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobmV3U2lkZWJhciwgbnVsbCwgMikpO1xuICByZXR1cm4gbmV3U2lkZWJhcjsgLy8gXHU4RkQ0XHU1NkRFXHU0RkVFXHU2NTM5XHU1NDBFXHU3Njg0IHNpZGViYXJcbn1cblxuZXhwb3J0IHsgZ2VuZXJhdGVSZXdyaXRlcywgc2lkZWJhclJld3JpdGVzIH07IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxrc1dhcmVcXFxcenVqaWFua3VcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGtzV2FyZVxcXFx6dWppYW5rdVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnc1xcXFxzaWRlYmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9rc1dhcmUvenVqaWFua3UvZG9jcy8udml0ZXByZXNzL2NvbmZpZ3Mvc2lkZWJhci50c1wiO2ltcG9ydCB7IGdlbmVyYXRlU2lkZWJhciB9IGZyb20gJ3ZpdGVwcmVzcy1zaWRlYmFyJztcblxuY29uc3QgYmFzZVNpZGViYXJPcHRpb25zID0ge1xuICBkb2N1bWVudFJvb3RQYXRoOiAnZG9jcycsXG4gIHVzZVRpdGxlRnJvbUZpbGVIZWFkaW5nOiB0cnVlLCAvLyBcdTU0MkZcdTc1MjhcdTU0MEVcdUZGMENcdTRGMUFcdTRFQ0VcdTY1ODdcdTRFRjZcdTU5MzRcdTkwRThcdTc2ODQgdGl0bGUgXHU2ODA3XHU3QjdFXHU4M0I3XHU1M0Q2XHU2ODA3XHU5ODk4XG4gIHVzZVRpdGxlRnJvbUZyb250bWF0dGVyOiB0cnVlLCAvLyBcdTU0MkZcdTc1MjhcdTU0MEVcdUZGMENcdTRGMUFcdTRFQ0UgZnJvbnRtYXR0ZXIgXHU0RTJEXHU4M0I3XHU1M0Q2XHU2ODA3XHU5ODk4XG4gIHVzZUZvbGRlclRpdGxlRnJvbUluZGV4RmlsZTogdHJ1ZSwgLy9cdTU5ODJcdTY3OUNcdTZCNjRcdTUwM0NcdTRFM0F0cnVlXHVGRjBDXHU1MjE5XHU0RjdGXHU3NTI4XHU1RjUzXHU1MjREXHU2NTg3XHU0RUY2XHU1OTM5XHU2NTg3XHU0RUY2XHU0RTJEXHU3Njg0XHU0RkUxXHU2MDZGaW5kZXgubWRcdTY3NjVcdTgzQjdcdTUzRDZcdTgzRENcdTUzNTVcdTU0MERcdTc5RjBcdTMwMDJcdTU5ODJcdTY3OUNpbmRleC5tZFx1NjU4N1x1NEVGNlx1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1NTIxOVx1NEY3Rlx1NzUyOFx1NjU4N1x1NEVGNlx1NTkzOVx1NTQwRFx1NzlGMFx1MzAwMlxuICB1c2VGb2xkZXJMaW5rRnJvbUluZGV4RmlsZTogZmFsc2UsIC8vIFx1NTQyRlx1NzUyOFx1NTQwRVx1RkYwQ1x1NEYxQVx1NUMwNlx1NjU4N1x1NEVGNlx1NTkzOVx1NzY4NFx1NTQwRFx1NzlGMFx1NEY1Q1x1NEUzQVx1OTRGRVx1NjNBNVx1RkYwQ1x1ODAwQ1x1NEUwRFx1NjYyRlx1NjU4N1x1NEVGNlx1NTkzOVx1NEUwQlx1OTc2Mlx1NzY4NCBpbmRleC5tZCBcdTY1ODdcdTRFRjZcbiAgY29udmVydFNhbWVOYW1lU3ViRmlsZVRvR3JvdXBJbmRleFBhZ2U6IHRydWUsXG4gIC8vIGZvbGRlckxpbmtOb3RJbmNsdWRlc0ZpbGVOYW1lOiB0cnVlLFxuICB1bmRlcnNjb3JlVG9TcGFjZTogdHJ1ZSwgLy8gX1x1OEY2Q1x1NEUzQVx1N0E3QVx1NjgzQ1xuICBjYXBpdGFsaXplRmlyc3Q6IHRydWUsIC8vXHU5OTk2XHU1QjU3XHU2QkNEXHU1RjNBXHU1MjM2XHU1OTI3XHU1MTk5XG4gIC8vIHNvcnRNZW51c0J5RnJvbnRtYXR0ZXJEYXRlOiB0cnVlLCAvLyBcdTU0MkZcdTc1MjhcdTY1RTVcdTY3MUZcdTYzOTJcdTVFOEZcbiAgLy8gc29ydE1lbnVzT3JkZXJCeURlc2NlbmRpbmc6IHRydWUsIC8vIFx1NTM0N1x1NUU4RlxuICBjb2xsYXBzZWQ6IGZhbHNlLCAvLyBcdTY1ODdcdTRFRjZcdTU5MzlcdTYyOThcdTUzRTBcbiAgLy8gZGVidWdQcmludDogdHJ1ZSxcbn07XG5cbmNvbnN0IEtub3dsZWRnZVNpZGViYXJPcHRpb25zID0ge1xuICAuLi5iYXNlU2lkZWJhck9wdGlvbnMsXG4gIHNjYW5TdGFydFBhdGg6ICdrbm93bGVkZ2UnLFxuICByZXNvbHZlUGF0aDogJy9rbm93bGVkZ2UvJyxcbiAgc29ydE1lbnVzQnlGcm9udG1hdHRlckRhdGU6IHRydWUsIC8vIFx1NTQyRlx1NzUyOFx1NjVFNVx1NjcxRlx1NjM5Mlx1NUU4RlxuICBzb3J0TWVudXNPcmRlckJ5RGVzY2VuZGluZzogdHJ1ZSwgLy8gXHU1MzQ3XHU1RThGXG59O1xuXG4vLyBjb25zdCBhcGlTaWRlYmFyT3B0aW9ucyA9IHtcbi8vICAgLi4uYmFzZVNpZGViYXJPcHRpb25zLFxuLy8gICBzY2FuU3RhcnRQYXRoOiAnYXBpJyxcbi8vICAgcmVzb2x2ZVBhdGg6ICcvYXBpLycsXG4vLyB9O1xuXG5jb25zdCBjb21wb25lbnRzR2VuZXJhbFNpZGViYXJPcHRpb25zID0ge1xuICAuLi5iYXNlU2lkZWJhck9wdGlvbnMsXG4gIHNvcnRNZW51c0J5RnJvbnRtYXR0ZXJPcmRlcjogdHJ1ZSxcbiAgc29ydE1lbnVzT3JkZXJCeURlc2NlbmRpbmcgOiB0cnVlLFxuICBzY2FuU3RhcnRQYXRoOiAnY29tcG9uZW50cycsXG4gIHJlc29sdmVQYXRoOiAnL2NvbXBvbmVudHMvJyxcbiAgbWFudWFsU29ydEZpbGVOYW1lQnlQcmlvcml0eTogWydHZW5lcmFsJywgJ05hdmlnYXRpb24nXSwgLy8gXHU2MjRCXHU1MkE4XHU2MzkyXHU1RThGXG59O1xuXG5jb25zdCB0ZW1wbGF0ZXNHZW5lcmFsU2lkZWJhck9wdGlvbnMgPSB7XG4gIC4uLmJhc2VTaWRlYmFyT3B0aW9ucyxcbiAgc2NhblN0YXJ0UGF0aDogJ3RlbXBsYXRlcycsXG4gIHJlc29sdmVQYXRoOiAnL3RlbXBsYXRlcy8nLFxufTtcblxuLy8gY29uc3QgZG9jc1NpZGViYXJPcHRpb25zID0ge1xuLy8gICAuLi5iYXNlU2lkZWJhck9wdGlvbnMsXG4vLyAgIHNjYW5TdGFydFBhdGg6ICdkb2NzJyxcbi8vICAgcmVzb2x2ZVBhdGg6ICcvZG9jcy8nLFxuLy8gICBtYW51YWxTb3J0RmlsZU5hbWVCeVByaW9yaXR5OiBbXG4vLyAgICAgXCJpbnRyb2R1Y2UubWRcIixcbi8vICAgXVxuLy8gfTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAnL2tub3dsZWRnZS8nOiB7XG4gICAgYmFzZTogJy9rbm93bGVkZ2UvJyxcbiAgICBpdGVtczogZ2VuZXJhdGVTaWRlYmFyKEtub3dsZWRnZVNpZGViYXJPcHRpb25zKSxcbiAgfSxcbiAgJy9jb21wb25lbnRzLyc6IHtcbiAgICBiYXNlOiAnL2NvbXBvbmVudHMvJyxcbiAgICBpdGVtczogZ2VuZXJhdGVTaWRlYmFyKGNvbXBvbmVudHNHZW5lcmFsU2lkZWJhck9wdGlvbnMpLFxuICB9LFxuICAnL3RlbXBsYXRlcy8nOiB7XG4gICAgYmFzZTogJy90ZW1wbGF0ZXMvJyxcbiAgICBpdGVtczogZ2VuZXJhdGVTaWRlYmFyKHRlbXBsYXRlc0dlbmVyYWxTaWRlYmFyT3B0aW9ucyksXG4gIH0sXG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxrc1dhcmVcXFxcenVqaWFua3VcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHBsdWdpblxcXFxkZW1vLXByZXZpZXdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGtzV2FyZVxcXFx6dWppYW5rdVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxccGx1Z2luXFxcXGRlbW8tcHJldmlld1xcXFx1dGlscy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDova3NXYXJlL3p1amlhbmt1L2RvY3MvLnZpdGVwcmVzcy9wbHVnaW4vZGVtby1wcmV2aWV3L3V0aWxzLnRzXCI7aW1wb3J0IE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQnXG5cbi8vIGNvbXBvbmVudFByZXZpZXcgY2hlY2tcbmV4cG9ydCBjb25zdCBpc0NoZWNrUHJldmlld0NvbTEgPSAvXjxwcmV2aWV3ICguKik+PFxcL3ByZXZpZXc+JC9cbmV4cG9ydCBjb25zdCBpc0NoZWNrUHJldmlld0NvbTIgPSAvXjxwcmV2aWV3ICguKikgXFwvPiQvXG5leHBvcnQgY29uc3QgaXNDaGVja0NvbnRhaW5lclByZXZpZXcgPSAvXmRlbW8tcHJldmlldz0oLispJC9cblxuY29uc3Qgc2NyaXB0UkUgPSAvPFxcL3NjcmlwdD4vXG5jb25zdCBzY3JpcHRMYW5nVHNSRSA9IC88XFxzKnNjcmlwdFtePl0qXFxibGFuZz1bJ1wiXXRzWydcIl1bXj5dKi9cbmNvbnN0IHNjcmlwdFNldHVwUkUgPSAvPFxccypzY3JpcHRbXj5dKlxcYnNldHVwXFxiW14+XSovXG5jb25zdCBzY3JpcHRDbGllbnRSRSA9IC88XFxzKnNjcmlwdFtePl0qXFxiY2xpZW50XFxiW14+XSovXG5jb25zdCBzY3JpcHRTZXR1cENvbW1vblJFID0gLzxcXHMqc2NyaXB0XFxzKyhzZXR1cHxsYW5nPSd0cyd8bGFuZz1cInRzXCIpP1xccyooc2V0dXB8bGFuZz0ndHMnfGxhbmc9XCJ0c1wiKT9cXHMqPi9cblxuLyoqXG4gKiBcdTdFREZcdTRFMDBcdTU5MDRcdTc0MDZcdTdFQzRcdTRFRjZcdTU0MERcdTc5RjAtPlx1OUE3Q1x1NUNGMFx1NTQ3RFx1NTQwRFxuICogQHBhcmFtIGNvbXBvbmVudE5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGhhbmRsZUNvbXBvbmVudE5hbWUgPSAoY29tcG9uZW50TmFtZTogc3RyaW5nKSA9PiB7XG4gIGxldCBuZXdOYW1lID0gY29tcG9uZW50TmFtZVxuICBuZXdOYW1lID0gbmV3TmFtZS5yZXBsYWNlQWxsKC9bX3wtXSsoXFx3KS9nLCAoJDAsICQxKSA9PiB7XG4gICAgcmV0dXJuICQxLnRvVXBwZXJDYXNlKClcbiAgfSlcbiAgcmV0dXJuIG5ld05hbWVcbn1cblxuLyoqXG4gKiBcdTZDRThcdTUxNjUgc2NyaXB0IFx1ODExQVx1NjcyQ1xuICogQHBhcmFtIG1kSW5zdGFuY2VcbiAqIEBwYXJhbSBwYXRoXG4gKiBAcGFyYW0gY29tcG9uZW50TmFtZVxuICovXG5leHBvcnQgY29uc3QgaW5qZWN0Q29tcG9uZW50SW1wb3J0U2NyaXB0ID0gKGVudjogYW55LCBwYXRoOiBzdHJpbmcsIGNvbXBvbmVudE5hbWU6IHN0cmluZykgPT4ge1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vdnVlanMvdml0ZXByZXNzL2lzc3Vlcy8xMjU4ICBfX1BhdGhcdTMwMDFfX1JlbGF0aXZlcGF0aFx1MzAwMV9fZGF0YS5Ib2lzdGVkdGFncyBcdTg4QUJcdTUyMjBcdTk2NjRcdTg5RTNcdTUxQjNcdTY1QjlcdTY4NDhcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21kaXQtdnVlL21kaXQtdnVlL2Jsb2IvbWFpbi9wYWNrYWdlcy9wbHVnaW4tc2ZjL3NyYy90eXBlcy50c1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWRpdC12dWUvbWRpdC12dWUvYmxvYi9tYWluL3BhY2thZ2VzL3BsdWdpbi1zZmMvdGVzdHMvX19zbmFwc2hvdHNfXy9zZmMtcGx1Z2luLnNwZWMudHMuc25hcFxuICBjb25zdCBzY3JpcHRzQ29kZSA9IGVudi5zZmNCbG9ja3Muc2NyaXB0cyBhcyBhbnlbXVxuXG4gIC8vIFx1NTIyNFx1NjVBRE1EXHU2NTg3XHU0RUY2XHU1MTg1XHU5MEU4XHU2NjJGXHU1NDI2XHU2NzJDXHU4RUFCXHU1QzMxXHU1QjU4XHU1NzI4IDxzY3JpcHQgc2V0dXA+IFx1ODExQVx1NjcyQ1xuXG4gIGNvbnN0IHNjcmlwdHNTZXR1cEluZGV4ID0gc2NyaXB0c0NvZGUuZmluZEluZGV4KChzY3JpcHQ6IGFueSkgPT4ge1xuICAgIGlmIChzY3JpcHRTZXR1cFJFLnRlc3Qoc2NyaXB0LnRhZ09wZW4pIHx8IHNjcmlwdExhbmdUc1JFLnRlc3Qoc2NyaXB0LnRhZ09wZW4pKSByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiBmYWxzZVxuICB9KVxuXG4gIC8vIFx1N0VERlx1NEUwMFx1NTkwNFx1NzQwNlx1N0VDNFx1NEVGNlx1NTQwRFx1NzlGMFx1NEUzQVx1OUE3Q1x1NUNGMFx1NTQ3RFx1NTQwRFxuICBjb25zdCBfY29tcG9uZW50TmFtZSA9IGhhbmRsZUNvbXBvbmVudE5hbWUoY29tcG9uZW50TmFtZSlcblxuICAvLyBNRFx1NjU4N1x1NEVGNlx1NEUyRFx1NkNBMVx1NjcwOSA8c2NyaXB0IHNldHVwPiBcdTYyMTYgPHNjcmlwdCBzZXR1cCBsYW5nPSd0cyc+IFx1ODExQVx1NjcyQ1x1NjU4N1x1NEVGNlxuICBpZiAoc2NyaXB0c1NldHVwSW5kZXggPT09IC0xKSB7XG4gICAgY29uc3Qgc2NyaXB0QmxvY2tPYmogPSB7XG4gICAgICB0eXBlOiAnc2NyaXB0JyxcbiAgICAgIHRhZ0Nsb3NlOiAnPC9zY3JpcHQ+JyxcbiAgICAgIHRhZ09wZW46IFwiPHNjcmlwdCBzZXR1cCBsYW5nPSd0cyc+XCIsXG4gICAgICBjb250ZW50OiBgPHNjcmlwdCBzZXR1cCBsYW5nPSd0cyc+XG4gICAgICAgIGltcG9ydCAke19jb21wb25lbnROYW1lfSBmcm9tICcke3BhdGh9J1xuICAgICAgICA8L3NjcmlwdD5gLFxuICAgICAgY29udGVudFN0cmlwcGVkOiBgaW1wb3J0ICR7X2NvbXBvbmVudE5hbWV9IGZyb20gJyR7cGF0aH0nYFxuICAgIH1cbiAgICBzY3JpcHRzQ29kZS5wdXNoKHNjcmlwdEJsb2NrT2JqKVxuICB9IGVsc2Uge1xuICAgIC8vIE1EXHU2NTg3XHU0RUY2XHU2Q0U4XHU1MTY1XHU0RTg2IDxzY3JpcHQgc2V0dXA+IFx1NjIxNiA8c2NyaXB0IHNldHVwIGxhbmc9J3RzJz4gXHU4MTFBXHU2NzJDXG4gICAgY29uc3Qgb2xkU2NyaXB0c1NldHVwID0gc2NyaXB0c0NvZGVbMF1cbiAgICAvLyBNRFx1NjU4N1x1NEVGNlx1NEUyRFx1NUI1OFx1NTcyOFx1NURGMlx1N0VDRlx1NUYxNVx1NTE2NVx1NEU4Nlx1N0VDNFx1NEVGNlxuICAgIGlmIChvbGRTY3JpcHRzU2V0dXAuY29udGVudC5pbmNsdWRlcyhwYXRoKSAmJiBvbGRTY3JpcHRzU2V0dXAuY29udGVudC5pbmNsdWRlcyhfY29tcG9uZW50TmFtZSkpIHtcbiAgICAgIHNjcmlwdHNDb2RlWzBdLmNvbnRlbnQgPSBvbGRTY3JpcHRzU2V0dXAuY29udGVudFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBNRFx1NjU4N1x1NEVGNlx1NEUyRFx1NEUwRFx1NUI1OFx1NTcyOFx1N0VDNFx1NEVGNiBcdTZERkJcdTUyQTBcdTdFQzRcdTRFRjYgaW1wb3J0ICR7X2NvbXBvbmVudE5hbWV9IGZyb20gJyR7cGF0aH0nXFxuXG5cbiAgICAgIC8vIFx1NTk4Mlx1Njc5Q01EXHU2NTg3XHU0RUY2XHU0RTJEXHU1QjU4XHU1NzI4IDxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XHUzMDAxPHNjcmlwdCBsYW5nPVwidHNcIiBzZXR1cD4gIFx1NjIxNiA8c2NyaXB0IHNldHVwPiBcdTRFRTNcdTc4MDFcdTU3NTcsIFx1OTBBM1x1NEU0OFx1N0VERlx1NEUwMFx1OEY2Q1x1NjM2Mlx1NEUzQSA8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuICAgICAgY29uc3Qgc2NyaXB0Q29kZUJsb2NrID0gJzxzY3JpcHQgbGFuZz1cInRzXCIgc2V0dXA+XFxuJ1xuICAgICAgc2NyaXB0c0NvZGVbMF0uY29udGVudCA9IHNjcmlwdHNDb2RlWzBdLmNvbnRlbnQucmVwbGFjZShzY3JpcHRTZXR1cENvbW1vblJFLCBzY3JpcHRDb2RlQmxvY2spXG5cbiAgICAgIC8vIFx1NUMwNlx1N0VDNFx1NEVGNlx1NUYxNVx1NTE2NVx1NzY4NFx1NEVFM1x1NzgwMVx1NjUzRVx1OEZEQlx1NTNCQlxuICAgICAgc2NyaXB0c0NvZGVbMF0uY29udGVudCA9IHNjcmlwdHNDb2RlWzBdLmNvbnRlbnQucmVwbGFjZShcbiAgICAgICAgc2NyaXB0Q29kZUJsb2NrLFxuICAgICAgICBgPHNjcmlwdCBzZXR1cD5cXG5cbiAgICAgIGltcG9ydCAke19jb21wb25lbnROYW1lfSBmcm9tICcke3BhdGh9J1xcbmBcbiAgICAgIClcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBcdTZFOTBcdTc4MDEgPT4gXHU0RUUzXHU3ODAxXHU1NzU3XG4gKiBAcGFyYW0gbWRJbnN0YW5jZVxuICogQHBhcmFtIHNvdXJjZUNvZGVcbiAqIEBwYXJhbSBzdWZmaXhcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1IaWdobGlnaHRDb2RlID0gKG1kSW5zdGFuY2U6IE1hcmtkb3duSXQsIHNvdXJjZUNvZGU6IHN0cmluZywgc3VmZml4OiBzdHJpbmcpID0+XG4gIG1kSW5zdGFuY2Uub3B0aW9ucy5oaWdobGlnaHQhKHNvdXJjZUNvZGUsIHN1ZmZpeCwgJycpXG5cbi8qKlxuICogXHU2ODM5XHU2MzZFXHU3RUM0XHU0RUY2XHU4REVGXHU1Rjg0XHU3RUM0XHU1NDA4XHU3RUM0XHU0RUY2XHU1RjE1XHU3NTI4XHU1NDBEXHU3OUYwXG4gKiBAcGFyYW0gcGF0aFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbXBvc2VDb21wb25lbnROYW1lID0gKHBhdGg6IHN0cmluZykgPT4ge1xuICBsZXQgaXNGbGFnID0gdHJ1ZVxuICBsZXQgY29tcG9uZW50TGlzdDogc3RyaW5nW10gPSBbXVxuICB3aGlsZSAoaXNGbGFnKSB7XG4gICAgY29uc3QgbGFzdEluZGV4ID0gcGF0aC5sYXN0SW5kZXhPZignLycpXG4gICAgaWYgKGxhc3RJbmRleCA9PT0gLTEpIHtcbiAgICAgIGlzRmxhZyA9IGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBwYXRoLnN1YnN0cmluZyhsYXN0SW5kZXggKyAxKVxuXG4gICAgICBjb21wb25lbnRMaXN0LnVuc2hpZnQobmFtZSlcbiAgICAgIHBhdGggPSBwYXRoLnN1YnN0cmluZygwLCBsYXN0SW5kZXgpXG4gICAgfVxuICB9XG4gIGNvbXBvbmVudExpc3QgPSBjb21wb25lbnRMaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0gIT09ICcnICYmIGl0ZW0gIT09ICcuJyAmJiBpdGVtICE9PSAnLi4nKVxuICByZXR1cm4gY29tcG9uZW50TGlzdC5qb2luKCctJykuc3BsaXQoJy4nKVswXVxufVxuXG4vKipcbiAqIFx1NjhDMFx1NjdFNVx1N0VDNFx1NEVGNlx1NzZGOFx1NUJGOVx1OERFRlx1NUY4NFxuICogQHBhcmFtIHBhdGhcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBpc0NoZWNraW5nUmVsYXRpdmVQYXRoID0gKHBhdGg6IHN0cmluZykgPT4ge1xuICBjb25zdCByZWxhdGl2ZVBhdGggPSBwYXRoXG4gIGlmIChyZWxhdGl2ZVBhdGguc3RhcnRzV2l0aCgnLi8nKSB8fCByZWxhdGl2ZVBhdGguc3RhcnRzV2l0aCgnLi4vJykgfHwgcmVsYXRpdmVQYXRoLnN0YXJ0c1dpdGgoJy8nKSlcbiAgICBpZiAoIXJlbGF0aXZlUGF0aC5lbmRzV2l0aCgnLnZ1ZScpKSB7XG4gICAgICAgIHJldHVybiByZWxhdGl2ZVBhdGggKyAnLnZ1ZSc7XG4gICAgfVxuICAgIHJldHVybiByZWxhdGl2ZVBhdGhcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxca3NXYXJlXFxcXHp1amlhbmt1XFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxwbHVnaW5cXFxcZGVtby1wcmV2aWV3XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxrc1dhcmVcXFxcenVqaWFua3VcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHBsdWdpblxcXFxkZW1vLXByZXZpZXdcXFxcY29tcG9uZW50UHJldmlldy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDova3NXYXJlL3p1amlhbmt1L2RvY3MvLnZpdGVwcmVzcy9wbHVnaW4vZGVtby1wcmV2aWV3L2NvbXBvbmVudFByZXZpZXcudHNcIjsvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuaW1wb3J0IE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQnXG5pbXBvcnQgVG9rZW4gZnJvbSAnbWFya2Rvd24taXQvbGliL3Rva2VuJ1xuaW1wb3J0IHsgcmVzb2x2ZSwgZGlybmFtZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tICdmcydcbmltcG9ydCB7XG4gIGNvbXBvc2VDb21wb25lbnROYW1lLFxuICBpbmplY3RDb21wb25lbnRJbXBvcnRTY3JpcHQsXG4gIGlzQ2hlY2tpbmdSZWxhdGl2ZVBhdGgsXG4gIHRyYW5zZm9ybUhpZ2hsaWdodENvZGVcbn0gZnJvbSAnLi91dGlscydcblxuY29uc3QgdGl0bGVSZWdleCA9IC90aXRsZT1bJ1wiXSguKj8pWydcIl0vXG5jb25zdCBwYXRoUmVnZXggPSAvcGF0aD1bJ1wiXSguKj8pWydcIl0vXG5jb25zdCBkZXNjcmlwdGlvblJlZ2V4ID0gL2Rlc2NyaXB0aW9uPVsnXCJdKC4qPylbJ1wiXS9cblxuZXhwb3J0IGludGVyZmFjZSBEZWZhdWx0UHJvcHMge1xuICBwYXRoOiBzdHJpbmdcbiAgdGl0bGU6IHN0cmluZ1xuICBkZXNjcmlwdGlvbjogc3RyaW5nXG59XG5cbi8qKlxuICogXHU3RjE2XHU4QkQxXHU5ODg0XHU4OUM4XHU3RUM0XHU0RUY2XG4gKiBAcGFyYW0gbWRcbiAqIEBwYXJhbSB0b2tlblxuICogQHBhcmFtIGVudlxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybVByZXZpZXcgPSAobWQ6IE1hcmtkb3duSXQsIHRva2VuOiBUb2tlbiwgZW52OiBhbnkpID0+IHtcbiAgY29uc3QgY29tcG9uZW50UHJvcHM6IERlZmF1bHRQcm9wcyA9IHtcbiAgICBwYXRoOiAnJyxcbiAgICB0aXRsZTogJ1x1OUVEOFx1OEJBNFx1NjgwN1x1OTg5OCcsXG4gICAgZGVzY3JpcHRpb246ICdcdTYzQ0ZcdThGRjBcdTUxODVcdTVCQjknXG4gIH1cblxuICAvLyBcdTgzQjdcdTUzRDZQcm9wc1x1NzZGOFx1NTE3M1x1NTNDMlx1NjU3MFxuICBjb25zdCB0aXRsZVZhbHVlID0gdG9rZW4uY29udGVudC5tYXRjaCh0aXRsZVJlZ2V4KVxuICBjb25zdCBwYXRoUmVnZXhWYWx1ZSA9IHRva2VuLmNvbnRlbnQubWF0Y2gocGF0aFJlZ2V4KVxuICBjb25zdCBkZXNjcmlwdGlvblJlZ2V4VmFsdWUgPSB0b2tlbi5jb250ZW50Lm1hdGNoKGRlc2NyaXB0aW9uUmVnZXgpXG5cbiAgaWYgKCFwYXRoUmVnZXhWYWx1ZSkgdGhyb3cgbmV3IEVycm9yKCdAdml0ZXByZXNzLWRlbW8tcHJldmlldy9wbHVnaW46IHBhdGggaXMgYSByZXF1aXJlZCBwYXJhbWV0ZXInKVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgY29tcG9uZW50UHJvcHMucGF0aCA9IGlzQ2hlY2tpbmdSZWxhdGl2ZVBhdGgocGF0aFJlZ2V4VmFsdWVbMV0pXG4gIGNvbXBvbmVudFByb3BzLnRpdGxlID0gdGl0bGVWYWx1ZSA/IHRpdGxlVmFsdWVbMV0gOiAnJ1xuICBjb21wb25lbnRQcm9wcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uUmVnZXhWYWx1ZSA/IGRlc2NyaXB0aW9uUmVnZXhWYWx1ZVsxXSA6ICcnXG5cbiAgLy8gXHU3RUM0XHU0RUY2XHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHVGRjBDXHU2OEMwXHU2N0U1IHJlYWxQYXRoIFx1NjYyRlx1NTQyNlx1NUI1OFx1NTcyOFx1RkYwQ1x1ODJFNVx1NEUwRFx1NUI1OFx1NTcyOFx1NTIxOVx1NEY3Rlx1NzUyOFx1OUVEOFx1OEJBNFx1OERFRlx1NUY4NFxuICBjb25zdCBiYXNlUGF0aCA9IGVudi5yZWFsUGF0aCB8fCBlbnYucGF0aCB8fCAnLic7XG5cbiAgLy8gXHU3RUM0XHU0RUY2XHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XG4gIGNvbnN0IGNvbXBvbmVudFBhdGggPSByZXNvbHZlKGRpcm5hbWUoYmFzZVBhdGgpLCBjb21wb25lbnRQcm9wcy5wYXRoIHx8ICcuJylcblxuICAvLyBcdTdFQzRcdTRFRjZcdTU0MERcbiAgY29uc3QgY29tcG9uZW50TmFtZSA9IGNvbXBvc2VDb21wb25lbnROYW1lKGNvbXBvbmVudFByb3BzLnBhdGgpXG4gIC8vIFx1NTQwRVx1N0YwMFx1NTQwRFxuICBjb25zdCBzdWZmaXhOYW1lID0gY29tcG9uZW50UGF0aC5zdWJzdHJpbmcoY29tcG9uZW50UGF0aC5sYXN0SW5kZXhPZignLicpICsgMSlcblxuICAvLyBcdTZDRThcdTUxNjVcdTdFQzRcdTRFRjZcdTVCRkNcdTUxNjVcdThCRURcdTUzRTVcbiAgaW5qZWN0Q29tcG9uZW50SW1wb3J0U2NyaXB0KGVudiwgY29tcG9uZW50UHJvcHMucGF0aCwgY29tcG9uZW50TmFtZSlcblxuICAvLyBcdTdFQzRcdTRFRjZcdTZFOTBcdTc4MDFcbiAgY29uc3QgY29tcG9uZW50U291cmNlQ29kZSA9IHJlYWRGaWxlU3luYyhjb21wb25lbnRQYXRoLCB7XG4gICAgZW5jb2Rpbmc6ICd1dGYtOCdcbiAgfSlcbiAgLy8gXHU2RTkwXHU3ODAxXHU0RUUzXHU3ODAxXHU1NzU3XHVGRjA4XHU3RUNGXHU4RkM3XHU1OTA0XHU3NDA2XHVGRjA5XG4gIGNvbnN0IGNvbXBpbGVIaWdobGlnaHRDb2RlID0gdHJhbnNmb3JtSGlnaGxpZ2h0Q29kZShtZCwgY29tcG9uZW50U291cmNlQ29kZSwgc3VmZml4TmFtZSlcblxuICBjb25zdCBjb2RlID0gZW5jb2RlVVJJKGNvbXBvbmVudFNvdXJjZUNvZGUpXG4gIGNvbnN0IHNob3dDb2RlID0gZW5jb2RlVVJJQ29tcG9uZW50KGNvbXBpbGVIaWdobGlnaHRDb2RlKVxuXG4gIGNvbnN0IHNvdXJjZUNvZGUgPSBgPGRlbW8tcHJldmlldyB0aXRsZT1cIiR7Y29tcG9uZW50UHJvcHMudGl0bGV9XCIgZGVzY3JpcHRpb249XCIke2NvbXBvbmVudFByb3BzLmRlc2NyaXB0aW9ufVwiIGNvZGU9XCIke2NvZGV9XCIgc2hvd0NvZGU9XCIke3Nob3dDb2RlfVwiIHN1ZmZpeE5hbWU9XCIke3N1ZmZpeE5hbWV9XCIgYWJzb2x1dGVQYXRoPVwiJHtjb21wb25lbnRQYXRofVwiIHJlbGF0aXZlUGF0aD1cIiR7Y29tcG9uZW50UHJvcHMucGF0aH1cIj5cbiAgICA8Y2xpZW50LW9ubHk+XG4gICAgICA8JHtjb21wb25lbnROYW1lfT48LyR7Y29tcG9uZW50TmFtZX0+XG4gICAgPC9jbGllbnQtb25seT5cbiAgPC9kZW1vLXByZXZpZXc+YFxuXG4gIHJldHVybiBzb3VyY2VDb2RlXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGtzV2FyZVxcXFx6dWppYW5rdVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxccGx1Z2luXFxcXGRlbW8tcHJldmlld1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxca3NXYXJlXFxcXHp1amlhbmt1XFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxwbHVnaW5cXFxcZGVtby1wcmV2aWV3XFxcXGNvbnRhaW5lclByZXZpZXcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2tzV2FyZS96dWppYW5rdS9kb2NzLy52aXRlcHJlc3MvcGx1Z2luL2RlbW8tcHJldmlldy9jb250YWluZXJQcmV2aWV3LnRzXCI7LyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1kZXN0cnVjdHVyaW5nICovXG5pbXBvcnQgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdCdcbmltcG9ydCBUb2tlbiBmcm9tICdtYXJrZG93bi1pdC9saWIvdG9rZW4nXG5pbXBvcnQgUmVuZGVyZXIgZnJvbSAnbWFya2Rvd24taXQvbGliL3JlbmRlcmVyJ1xuaW1wb3J0IHsgcmVzb2x2ZSwgZGlybmFtZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tICdmcydcbmltcG9ydCBtYXJrZG93bkl0Q29udGFpbmVyIGZyb20gJ21hcmtkb3duLWl0LWNvbnRhaW5lcidcbmltcG9ydCB7XG4gIGNvbXBvc2VDb21wb25lbnROYW1lLFxuICBpbmplY3RDb21wb25lbnRJbXBvcnRTY3JpcHQsXG4gIGlzQ2hlY2tDb250YWluZXJQcmV2aWV3LFxuICBpc0NoZWNraW5nUmVsYXRpdmVQYXRoLFxuICB0cmFuc2Zvcm1IaWdobGlnaHRDb2RlXG59IGZyb20gJy4vdXRpbHMnXG5cbmNvbnN0IHZhbGlkYXRlQ29udGFpbmVyUkUgPSAvXnByZXZpZXcuKiQvXG5jb25zdCBwYXJzZUNvbnRhaW5lclBhcmFtUkUgPSAvXnByZXZpZXdcXHM/KC4qPykoPzpcXHNcXHxcXHxcXHMoLio/KSk/JC9cblxuLyoqXG4gKiBcdTgxRUFcdTVCOUFcdTRFNDlcdTVCQjlcdTU2NjhcdTc2ODRcdTZDRThcdTUxOENcbiAqIEBwYXJhbSBtZFxuICovXG5leHBvcnQgY29uc3QgY29udGFpbmVyRGlyZWN0aXZlTW91bnQgPSAobWQ6IE1hcmtkb3duSXQpID0+IHtcbiAgbWQudXNlKG1hcmtkb3duSXRDb250YWluZXIsICdwcmV2aWV3Jywge1xuICAgIG1hcmtlcjogJzonLFxuICAgIHZhbGlkYXRlOiAocGFyYW1zOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkYXRlQ29udGFpbmVyID0gcGFyYW1zLnRyaW0oKS5tYXRjaCh2YWxpZGF0ZUNvbnRhaW5lclJFKVxuICAgICAgaWYgKHZhbGlkYXRlQ29udGFpbmVyICYmIHZhbGlkYXRlQ29udGFpbmVyLmxlbmd0aCAhPT0gMCkgcmV0dXJuIHRydWVcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfSlcbn1cblxuLyoqXG4gKiBcdTg5RTNcdTY3OTBcdTgxRUFcdTVCOUFcdTRFNDlcdTY1RTVcdTY3MUZcdTc2ODRUYWdcbiAqIEBwYXJhbSBtZFxuICovXG5leHBvcnQgY29uc3QgcGFyc2VDb250YWluZXJUYWcgPSAobWQ6IE1hcmtkb3duSXQpID0+IHtcbiAgLy8gXHU1RjAwXHU1OUNCXHU2ODA3XHU3QjdFIDo6OnByZXZpZXdcbiAgY29uc3QgZGVmYXVsdENvbnRhaW5lclByZXZpZXdPcGVuUmVuZGVyID0gbWQucmVuZGVyZXIucnVsZXMuY29udGFpbmVyX3ByZXZpZXdfb3BlbiFcbiAgbWQucmVuZGVyZXIucnVsZXMuY29udGFpbmVyX3ByZXZpZXdfb3BlbiA9IChcbiAgICB0b2tlbnM6IFRva2VuW10sXG4gICAgaWR4OiBudW1iZXIsXG4gICAgb3B0aW9uczogTWFya2Rvd25JdC5PcHRpb25zLFxuICAgIGVudjogYW55LFxuICAgIHNlbGY6IFJlbmRlcmVyXG4gICkgPT4ge1xuICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2lkeF1cbiAgICAvLyBcdTdFQzRcdTRFRjZcdTc2ODRcdTc2RjhcdTVCRjlcdThERUZcdTVGODRcbiAgICBjb25zdCBjb21wb25lbnRSZWxhdGl2ZVBhdGggPSBpc0NoZWNraW5nUmVsYXRpdmVQYXRoKHRva2Vuc1tpZHggKyAyXS5jb250ZW50LnNwbGl0KCc9JylbMV0pXG5cbiAgICAvLyBcdTdFQzRcdTRFRjZcdTdFRERcdTVCRjlcdThERUZcdTVGODRcdUZGMENcdTY4QzBcdTY3RTUgcmVhbFBhdGggXHU2NjJGXHU1NDI2XHU1QjU4XHU1NzI4XHVGRjBDXHU4MkU1XHU0RTBEXHU1QjU4XHU1NzI4XHU1MjE5XHU0RjdGXHU3NTI4XHU5RUQ4XHU4QkE0XHU4REVGXHU1Rjg0XG4gICAgY29uc3QgYmFzZVBhdGggPSBlbnYucmVhbFBhdGggfHwgZW52LnBhdGggfHwgJy4nO1xuXG4gICAgLy8gXHU3RUM0XHU0RUY2XHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XG4gICAgY29uc3QgY29tcG9uZW50UGF0aCA9IHJlc29sdmUoZGlybmFtZShiYXNlUGF0aCksIGNvbXBvbmVudFJlbGF0aXZlUGF0aCB8fCAnLicpXG5cbiAgICAvLyBcdTU0MEVcdTdGMDBcdTU0MERcbiAgICBjb25zdCBzdWZmaXhOYW1lID0gY29tcG9uZW50UGF0aC5zdWJzdHJpbmcoY29tcG9uZW50UGF0aC5sYXN0SW5kZXhPZignLicpICsgMSlcbiAgICAvLyBcdTdFQzRcdTRFRjZcdTZFOTBcdTc4MDFcbiAgICBjb25zdCBjb21wb25lbnRTb3VyY2VDb2RlID0gcmVhZEZpbGVTeW5jKGNvbXBvbmVudFBhdGgsIHtcbiAgICAgIGVuY29kaW5nOiAndXRmLTgnXG4gICAgfSlcbiAgICAvLyBcdTZFOTBcdTc4MDFcdTRFRTNcdTc4MDFcdTU3NTdcdUZGMDhcdTdFQ0ZcdThGQzdcdTU5MDRcdTc0MDZcdUZGMDlcbiAgICBjb25zdCBjb21waWxlSGlnaGxpZ2h0Q29kZSA9IHRyYW5zZm9ybUhpZ2hsaWdodENvZGUobWQsIGNvbXBvbmVudFNvdXJjZUNvZGUsIHN1ZmZpeE5hbWUpXG5cbiAgICBjb25zdCBjb2RlID0gZW5jb2RlVVJJKGNvbXBvbmVudFNvdXJjZUNvZGUpXG4gICAgY29uc3Qgc2hvd0NvZGUgPSBlbmNvZGVVUklDb21wb25lbnQoY29tcGlsZUhpZ2hsaWdodENvZGUpXG5cbiAgICBjb25zdCBnZXRQYXJhbUFyciA9IHRva2Vuc1tpZHhdLmluZm8udHJpbSgpLm1hdGNoKHBhcnNlQ29udGFpbmVyUGFyYW1SRSlcbiAgICBjb25zdCB0aXRsZSA9IGdldFBhcmFtQXJyICYmIGdldFBhcmFtQXJyWzFdID8gZ2V0UGFyYW1BcnJbMV0gOiAnJ1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZ2V0UGFyYW1BcnIgJiYgZ2V0UGFyYW1BcnJbMl0gPyBnZXRQYXJhbUFyclsyXSA6ICcnXG5cbiAgICBpZiAodG9rZW4ubmVzdGluZyA9PT0gMSlcbiAgICAgIHJldHVybiBgPGRlbW8tcHJldmlldyB0aXRsZT0nJHt0aXRsZX0nIGRlc2NyaXB0aW9uPScke2Rlc2NyaXB0aW9ufScgY29kZT1cIiR7Y29kZX1cIiBzaG93Q29kZT1cIiR7c2hvd0NvZGV9XCIgc3VmZml4TmFtZT1cIiR7c3VmZml4TmFtZX1cIiBhYnNvbHV0ZVBhdGg9XCIke2NvbXBvbmVudFBhdGh9XCIgcmVsYXRpdmVQYXRoPVwiJHtjb21wb25lbnRSZWxhdGl2ZVBhdGh9XCI+XFxuYFxuICAgIHJldHVybiBkZWZhdWx0Q29udGFpbmVyUHJldmlld09wZW5SZW5kZXIodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2VsZilcbiAgfVxuICAvLyBcdTk1RURcdTU0MDhcdTY4MDdcdTdCN0UgOjo6XG4gIGNvbnN0IGRlZmF1bHRDb250YWluZXJQcmV2aWV3Q2xvc2VSZW5kZXIgPSBtZC5yZW5kZXJlci5ydWxlcy5jb250YWluZXJfcHJldmlld19jbG9zZSFcbiAgbWQucmVuZGVyZXIucnVsZXMuY29udGFpbmVyX3ByZXZpZXdfY2xvc2UgPSAoXG4gICAgdG9rZW5zOiBUb2tlbltdLFxuICAgIGlkeDogbnVtYmVyLFxuICAgIG9wdGlvbnM6IE1hcmtkb3duSXQuT3B0aW9ucyxcbiAgICBlbnY6IGFueSxcbiAgICBzZWxmOiBSZW5kZXJlclxuICApID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpZHhdXG5cbiAgICBpZiAodG9rZW4ubmVzdGluZyA9PT0gLTEpIHJldHVybiBgPC9kZW1vLXByZXZpZXc+XFxuYFxuICAgIHJldHVybiBkZWZhdWx0Q29udGFpbmVyUHJldmlld0Nsb3NlUmVuZGVyKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpXG4gIH1cbn1cblxuLyoqXG4gKiBcdTg5RTNcdTY3OTBcdTgxRUFcdTVCOUFcdTRFNDlcdTVCQjlcdTU2NjhcbiAqIEBwYXJhbSBtZFxuICovXG5leHBvcnQgY29uc3QgcGFyc2VDb250YWluZXIgPSAobWQ6IE1hcmtkb3duSXQpID0+IHtcbiAgY29uc3QgZGVmYXVsdEh0bWxUZXh0UmVuZGVyID0gbWQucmVuZGVyZXIucnVsZXMudGV4dCFcbiAgbWQucmVuZGVyZXIucnVsZXMudGV4dCA9ICh0b2tlbnM6IFRva2VuW10sIGlkeDogbnVtYmVyLCBvcHRpb25zOiBNYXJrZG93bkl0Lk9wdGlvbnMsIGVudjogYW55LCBzZWxmOiBSZW5kZXJlcikgPT4ge1xuICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2lkeF1cbiAgICBpZiAodG9rZW4udHlwZSA9PT0gJ3RleHQnICYmIHRva2VuLmNvbnRlbnQubWF0Y2goaXNDaGVja0NvbnRhaW5lclByZXZpZXcpKSB7XG4gICAgICBjb25zdCBjb21wb25lbnRSZWxhdGl2ZVBhdGggPSBpc0NoZWNraW5nUmVsYXRpdmVQYXRoKHRva2VuLmNvbnRlbnQubWF0Y2goaXNDaGVja0NvbnRhaW5lclByZXZpZXcpIVsxXSlcbiAgICAgIGNvbnN0IGNvbXBvbmVudE5hbWUgPSBjb21wb3NlQ29tcG9uZW50TmFtZShjb21wb25lbnRSZWxhdGl2ZVBhdGgpXG4gICAgICBpbmplY3RDb21wb25lbnRJbXBvcnRTY3JpcHQoZW52LCBjb21wb25lbnRSZWxhdGl2ZVBhdGgsIGNvbXBvbmVudE5hbWUpXG4gICAgICByZXR1cm4gYDwke2NvbXBvbmVudE5hbWV9PjwvJHtjb21wb25lbnROYW1lfT5gXG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0SHRtbFRleHRSZW5kZXIodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2VsZilcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxrc1dhcmVcXFxcenVqaWFua3VcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHBsdWdpblxcXFxkZW1vLXByZXZpZXdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGtzV2FyZVxcXFx6dWppYW5rdVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxccGx1Z2luXFxcXGRlbW8tcHJldmlld1xcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDova3NXYXJlL3p1amlhbmt1L2RvY3MvLnZpdGVwcmVzcy9wbHVnaW4vZGVtby1wcmV2aWV3L2luZGV4LnRzXCI7aW1wb3J0IE1hcmtkb3duSXQsIHsgT3B0aW9ucyB9IGZyb20gJ21hcmtkb3duLWl0J1xuaW1wb3J0IFJlbmRlcmVyIGZyb20gJ21hcmtkb3duLWl0L2xpYi9yZW5kZXJlci5tanMnXG5pbXBvcnQgVG9rZW4gZnJvbSAnbWFya2Rvd24taXQvbGliL3Rva2VuLm1qcydcbmltcG9ydCB7IGlzQ2hlY2tQcmV2aWV3Q29tMSwgaXNDaGVja1ByZXZpZXdDb20yIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IHRyYW5zZm9ybVByZXZpZXcgfSBmcm9tICcuL2NvbXBvbmVudFByZXZpZXcnXG5pbXBvcnQgeyBjb250YWluZXJEaXJlY3RpdmVNb3VudCwgcGFyc2VDb250YWluZXIsIHBhcnNlQ29udGFpbmVyVGFnIH0gZnJvbSAnLi9jb250YWluZXJQcmV2aWV3J1xuXG5leHBvcnQgY29uc3QgY29tcG9uZW50UHJldmlldyA9IChtZDogTWFya2Rvd25JdCkgPT4ge1xuICBjb25zdCBkZWZhdWx0SHRtbElubGluZVJlbmRlciA9IG1kLnJlbmRlcmVyLnJ1bGVzLmh0bWxfaW5saW5lIVxuICBtZC5yZW5kZXJlci5ydWxlcy5odG1sX2lubGluZSA9IChcbiAgICB0b2tlbnM6IFRva2VuW10sXG4gICAgaWR4OiBudW1iZXIsXG4gICAgb3B0aW9uczogT3B0aW9ucyxcbiAgICBlbnY6IGFueSxcbiAgICBzZWxmOiBSZW5kZXJlclxuICApID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpZHhdXG4gICAgaWYgKGlzQ2hlY2tQcmV2aWV3Q29tMS50ZXN0KHRva2VuLmNvbnRlbnQpIHx8IGlzQ2hlY2tQcmV2aWV3Q29tMi50ZXN0KHRva2VuLmNvbnRlbnQpKSB7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtUHJldmlldyhtZCwgdG9rZW4sIGVudilcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRIdG1sSW5saW5lUmVuZGVyKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNvbnRhaW5lclByZXZpZXcgPSAobWQ6IE1hcmtkb3duSXQpID0+IHtcbiAgY29udGFpbmVyRGlyZWN0aXZlTW91bnQobWQpXG4gIHBhcnNlQ29udGFpbmVyVGFnKG1kKVxuICBwYXJzZUNvbnRhaW5lcihtZClcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1IsU0FBUyxvQkFBb0I7OztBQ0FULElBQU8sY0FBUTtBQUFBLEVBQ3pULEVBQUUsTUFBTSxnQkFBTSxNQUFNLHdCQUF3QixhQUFhLGNBQWM7QUFBQSxFQUN2RTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsRUFDZjtBQUFBLEVBQ0EsRUFBRSxNQUFNLDRCQUFRLE1BQU0sYUFBYTtBQUFBLEVBQ25DLEVBQUUsTUFBTSw0QkFBUSxNQUFNLFFBQVE7QUFBQSxFQUM5QjtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGOzs7QUN0QnlULE9BQU8sVUFBVTtBQUMxVSxTQUFTLGdCQUFnQjs7O0FDRDJSLFNBQVMsdUJBQXVC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QUFBLE1BQ1YsU0FBUztBQUFBLFFBQ1AsY0FBYztBQUFBLFVBQ1osUUFBUTtBQUFBLFlBQ04sWUFBWTtBQUFBLFlBQ1osaUJBQWlCO0FBQUEsVUFDbkI7QUFBQSxVQUNBLE9BQU87QUFBQSxZQUNMLGVBQWU7QUFBQSxZQUNmLGtCQUFrQjtBQUFBLFlBQ2xCLFFBQVE7QUFBQSxjQUNOLFlBQVk7QUFBQSxjQUNaLGNBQWM7QUFBQSxjQUNkLFdBQVc7QUFBQSxZQUNiO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQTtBQUFBLFFBRUEsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVMsQ0FBQztBQUFBLElBQ1YsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWEsY0FBYyxJQUFJLElBQUksbUNBQW1DLHdDQUFlLENBQUM7QUFBQSxRQUN4RjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiLCAicmVzb2x2ZSIsICJkaXJuYW1lIiwgInJlYWRGaWxlU3luYyIsICJyZXNvbHZlIiwgImRpcm5hbWUiLCAicmVhZEZpbGVTeW5jIl0KfQo=
