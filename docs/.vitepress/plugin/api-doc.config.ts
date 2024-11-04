import { resolveLocaleConfigs, parseProps } from './utils.js';
import MarkdownIt from 'markdown-it';
import matter from 'gray-matter';
import { dirname, resolve } from 'node:path';
import fs from 'fs';
import { componentProps, Props, Events, Methods, Slots } from './type.js';

type Lang = 'zh' | 'en';

const escapeCharacter = (str: string) => {
  if (!str) {
    return '';
  }
  return str.replace(/\r?\n/g, "<br>").replace(/\|/g, "\\|");
};
const toKebabCase = (str: string) => {
  return str.replace(/[A-Z]/g, (match, offset) => {
    return `${offset > 0 ? "-" : ""}${match.toLocaleLowerCase()}`;
  });
};
function unquote(str: string) {
  return str && str.replace(/^['"]|['"]$/g, "");
}
function trimStr(str: string) {
  return str && str.replace(/^(\s|\||\r?\n)*|(\s|\||\r?\n)*$/g, "");
}
function cleanStr(str: string) {
  return str && str.replace(/\r?\n/g, "");
}

// 生成Props模板
const tmplProps = (props: Props[]) => {
  const displayableProps = props;
  const content = displayableProps.map((prop) => {
    const { displayName, description, type, defaultValue, tip, version } = escapeParams(prop);
    let lineContent = `|${displayName} ${genTag(version)}|${description}|\`${type}\`${tip}|\`${defaultValue}\`|`;
    return lineContent;
  }).join("\n");
  return {
    content
  };
};
// 处理Props
const handleProps = (props: Props[], lang: Lang = 'zh') => {
  const { content } = tmplProps(props);
  if (!content)
    return "";
  let header = ['', ''];
  if (lang === 'en') {
    header = ["|Name|Description|Type|Default|", "|---|---|---|:---:|"];
  } else {
    header = ["|\u53C2\u6570\u540D|\u63CF\u8FF0|\u7C7B\u578B|\u9ED8\u8BA4\u503C|", "|---|---|---|:---:|"];
  }
  return `
${header[0]}
${header[1]}
${content}
`;
};

// 生成Events模板
const tmplEvents = (events: Events[]) => {
  const displayableEvents = events;
  const content = displayableEvents.map((event) => {
    const { displayName, description, type, tip, version } =  escapeParams(event);
    let lineContent = `|${displayName} ${genTag(version)}|${description}|\`${type}\`${tip}|`;
    return lineContent;
  }).join("\n");
  return {
    content
  };
};
// 处理Events
const handleEvents = (events: Events[], lang: Lang = 'zh') => {
  const { content } = tmplEvents(events);
  if (!content)
    return "";
  const header = lang === "en" ? ["|Event Name|Description|Type|", "|---|---|---|"] : ["|\u4E8B\u4EF6\u540D|\u63CF\u8FF0|\u7c7b\u578b|", "|---|---|---|"];
  return `
${header[0]}
${header[1]}
${content}
`;
};

// 生成Methods模板
const tmplMethods = (methods: Methods[]) => {
  const displayableMethods = methods;
  const content = displayableMethods.map((method) => {
    const { displayName, description, type, tip, version } =  escapeParams(method);
    let lineContent = `|${displayName} ${genTag(version)}|${description}|\`${type}\`${tip}|`;
    return lineContent;
  }).join("\n");
  return {
    content
  };
};
// 处理Methods
const handleMethods = (methods: Methods[], lang: Lang = 'zh') => {
  const { content } = tmplMethods(methods);
  if (!content)
    return "";
  const header = lang === "en" ? ["|Method|Description|Type|", "|---|---|---|"] : ["|\u65B9\u6CD5\u540D|\u63CF\u8FF0|\u7c7b\u578b|", "|---|---|---|"];
  return `
${header[0]}
${header[1]}
${content}
`;
};

// 生成Slots模板
const tmplSlots = (slots: Slots[]) => {
  const displayableSlots = slots;
  const content = displayableSlots.map((slot) => {
    const { displayName, description, parameters, tip, version } =  escapeParams(slot);
    let lineContent = `|${displayName} ${genTag(version)}|${description}|\`${parameters}\`${tip}|`;
    return lineContent;
  }).join("\n");
  return {
    content
  };
};
// 处理Slots
const handleSlots = (slots: Slots[], lang: Lang = 'zh') => {
  const { content } = tmplSlots(slots);
  if (!content)
    return "";
  const header = lang === "en" ? ["|Slot Name|Description|Parameters|", "|---|---|---|"] : ["|\u63D2\u69FD\u540D|\u63CF\u8FF0|\u53C2\u6570|", "|---|---|---|"];
  return `
${header[0]}
${header[1]}
${content}
`;
};

const getTmpl = (suffix: string, content: string, options: any) => {
  const { name } = options;
  if (!content) {
    return '';
  }
  return `### ${name ?? ''} ${suffix}
  ${content}`;
};
const getApiTmpl = (componentDoc: any, lang: Lang) => {
  const { name, props, subProps = [], events, methods, slots } = componentDoc;
  const options = { name, lang };
  const subPropsTmpl: any[] = [];
  for (const key in subProps) {
    const subProp = getTmpl('' ,handleProps(subProps[key], lang), { ...options, name: key});
    subPropsTmpl.push(subProp);
  }
  const propsTmpl =  getTmpl("Props", handleProps(props || [], lang), options);
  const eventsTmpl =  getTmpl("Events", handleEvents(events || [], lang), options);
  const methodsTmpl =  getTmpl("Methods", handleMethods(methods || [], lang), options);
  const slotsTmpl =  getTmpl("Slots", handleSlots(slots || [], lang), options);
  const res = `${propsTmpl}\n${subPropsTmpl.join("\n")}\n${slotsTmpl}\n${eventsTmpl}\n${methodsTmpl}`;
  return res;
};

const parseParamsFile = async (filePath: string) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = JSON.parse(content);
  return content;
};

const API_REG = /^<API (.*)(<\/API>|\/>)$/;
const LOG_PREFIX = "[gen-doc-api]";
function genApiDoc() {
  let localeConfigs: any;
  let md: any;
  return {
    name: "gen-api-doc",
    enforce: "pre",
    configResolved: async (config: any) => {
      localeConfigs = await resolveLocaleConfigs(config.root);
      md = new MarkdownIt("zero");
    },
    transform: async (code: string, id: string) => {
      if (!id.endsWith(".md")) {
        return null;
      }
      const { data: frontmatter, content } = matter(code);
      const mdFilePath = id; // 获取当前文件路径
      const baseDir = dirname(mdFilePath)

      const blocks = md.parse(content, {}).map((i: any) => i.content);
      const replacedBlocks: any = [];
      for (const block of blocks) {
        if (!block.match(API_REG)) {
          replacedBlocks.push(block);
        } else {
          replacedBlocks.push(
            await getApiMarkdown(block, localeConfigs, baseDir)
          );
        }
      }
      const replacedCode = matter.stringify(replacedBlocks.join("\n"), {
        ...frontmatter
      });
      return replacedCode;
    }
  };
}
async function getApiMarkdown(apiComponent: any, localeConfigs: any, baseDir: string) {
  const props: componentProps = parseProps(apiComponent);
  const lang = (props.lang ?? (localeConfigs.defaultLang.includes("zh") ? "zh" : "en")) as Lang;
  if (!props.src) {
    console.error(`${LOG_PREFIX} "${apiComponent}" missing src props.`);
    return apiComponent;
  }
  const srcPath = resolve(baseDir, props.src);
  if (!srcPath.toLowerCase().endsWith('.json')) {
    console.error(`${LOG_PREFIX} "${apiComponent}" src is not a json file.`);
    return '';
  }
  const componentDoc = await parseParamsFile(srcPath);
  const apiMdContents = getApiTmpl(componentDoc, lang);
  return apiMdContents || `${srcPath}'s api is empty!`;
}

function genTooltip(content: string) {
  if (!content) {
    return '';
  }
  const html = `<KTooltip content="${content.toString()}" effect="light" trigger="click"></KTooltip>`;
  return html;
}
function genTag(content: string) {
  if (!content) {
    return '';
  }
  const html = `<KTag size="sm" round>${content.toString()}</KTag>`;
  return html;
}
function escapeParams(params: any) {
  const { displayName, description, type, defaultValue, parameters, tip, version } = params;
  return {
    displayName: escapeCharacter(displayName),
    description: escapeCharacter(description),
    type: escapeCharacter(type),
    defaultValue: escapeCharacter(defaultValue + '') || '-',
    tip: escapeCharacter(genTooltip(tip ?? parameters)),
    parameters: parameters ? 'object' : '-' ,
    version: escapeCharacter(version)
  }
}

export { genApiDoc };
