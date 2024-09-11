import { join, dirname, sep, resolve } from 'path';
import { parseProps } from './utils';
import fsExtra from 'fs-extra';

const FenceDemoTag = "vue:demo";
const DemoTag = "demo";

const scriptRE = /<\/script>/;
const scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/;
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/;
const scriptClientRE = /<\s*script[^>]*\bclient\b[^>]*/;
let index = 1;
function getDemoComponent(md, env, { title, desc, path, code }) {
  const componentName = `DemoComponent${index++}`;
  path = normalizePath(path);
  injectImportStatement(env, componentName, path);
  const highlightedCode = md.options.highlight(code, "vue", "");
  return `
    <${DemoTag}
      code="${encodeURIComponent(code)}"
      highlightedCode="${encodeURIComponent(highlightedCode)}"
      src="${path}"
      title="${title ?? ""}"
      desc="${desc ?? ""}"
    >
        <${componentName}></${componentName}>
    </${DemoTag}>
  `.trim();
}
let fenceIndex = 1;
const codeFileMap = {};
function genDemoByCode(md, env, path, code) {
  let { demoName = "", demoPath = "" } = codeFileMap[code] ?? {};
  if (!codeFileMap[code]) {
    while (true) {
      demoName = `demo-${fenceIndex++}.vue`;
      demoPath = join(dirname(path), "dist", demoName);
      if (!fsExtra.existsSync(demoPath)) {
        break;
      }
    }
    fsExtra.createFileSync(demoPath);
    fsExtra.writeFileSync(demoPath, code);
    codeFileMap[code] = {
      demoName,
      demoPath
    };
  }
  return getDemoComponent(md, env, {
    path: demoPath,
    code
  });
}
function injectImportStatement(env, componentName, path) {
  const componentRegistStatement = `import ${componentName} from '${path}'`.trim();
  if (!env.sfcBlocks.scripts) {
    env.sfcBlocks.scripts = [];
  }
  const tags = env.sfcBlocks.scripts;
  const isUsingTS = tags.findIndex((tag) => scriptLangTsRE.test(tag.content)) > -1;
  const existingSetupScriptIndex = tags?.findIndex((tag) => {
    return scriptRE.test(tag.content) && scriptSetupRE.test(tag.content) && !scriptClientRE.test(tag.content);
  });
  if (existingSetupScriptIndex > -1) {
    const tagSrc = tags[existingSetupScriptIndex];
    tags[existingSetupScriptIndex].content = tagSrc.content.replace(
      scriptRE,
      `${componentRegistStatement}

      <\/script>`
    );
  } else {
    tags.unshift({
      content: `
        <script ${isUsingTS ? 'lang="ts"' : ""} setup >
          ${componentRegistStatement}
        <\/script>
      `.trim()
    });
  }
}
function normalizePath(path) {
  return path.split(sep).join("/");
}

function demoBlockPlugin(md) {
  const addRenderRule = (type) => {
    const defaultRender = md.renderer.rules[type];
    md.renderer.rules[type] = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const content = token.content.trim();
      if (!content.match(new RegExp(`^<${DemoTag}\\s`))) {
        return defaultRender(tokens, idx, options, env, self);
      }
      const { path } = env;
      const props = parseProps(content);
      if (!props.src) {
        console.error(`miss src props in ${path} demo.`);
        return defaultRender(tokens, idx, options, env, self);
      }
      const frontmatter = env.frontmatter;
      const mdDir = dirname(frontmatter.realPath ?? path);
      const srcPath = resolve(mdDir, props.src);
      const code = fsExtra.readFileSync(srcPath, "utf-8");
      const demoScripts = getDemoComponent(md, env, {
        title: props.title,
        desc: props.desc,
        path: srcPath,
        code
      });
      return demoScripts;
    };
  };
  addRenderRule("html_block");
  addRenderRule("html_inline");
}

function fencePlugin(md) {
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token.info.trim() !== FenceDemoTag) {
      return defaultRender(tokens, idx, options, env, self);
    }
    const content = token.content;
    const path = env.path;
    const demoScripts = genDemoByCode(md, env, path, content);
    return demoScripts;
  };
}

function applyPlugins(md) {
  md.use(fencePlugin);
  md.use(demoBlockPlugin);
}

export { DemoTag, FenceDemoTag, applyPlugins };
