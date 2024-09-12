import { resolveLocaleConfigs, parseProps } from './utils.js';
import MarkdownIt from 'markdown-it';
import matter from 'gray-matter';
import { dirname, join, resolve } from 'node:path';
import fs from 'fs';
import { componentProps, Props, Events, Methods, Slots } from './type.js';

type Lang = 'zh' | 'en';

// 生成Props模板
const tmplProps = (props: Props[]) => {
  const displayableProps = props;
  const hasVersion = displayableProps.some((prop) => prop?.tags?.version);
  const content = displayableProps.map((prop) => {
    const { displayName, description, type, defaultValue, required, tags, tip } = prop;
    const tipContent = genTooltip(tip);
    let lineContent = `|${displayName}|${description}|\`${type}\`${tipContent}|\`${defaultValue ?? '-'}\`|`;
    if (hasVersion) {
      const version = tags?.version?.[0]?.description;
      lineContent += `${version || ""}|`;
    }
    return lineContent;
  }).join("\n");
  return {
    hasVersion,
    content
  };
};
// 处理Props
const handleProps = (props: Props[], lang: Lang = 'zh') => {
  const { content, hasVersion } = tmplProps(props);
  if (!content)
    return "";
  let header = ['', ''];
  if (lang === 'en') {
    header = ["|Name|Description|Type|Default|", "|---|---|---|:---:|"];
    if (hasVersion) {
      header[0] += "version|";
      header[1] += ":---|";
    }
  } else {
    header = ["|\u53C2\u6570\u540D|\u63CF\u8FF0|\u7C7B\u578B|\u9ED8\u8BA4\u503C|", "|---|---|---|:---:|"];
    if (hasVersion) {
      header[0] += "\u7248\u672C|";
      header[1] += ":---|";
    }
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
  const hasVersion = displayableEvents.some(
    (event) => event?.tags?.some((tag: any) => tag.title === "version")
  );
  const content = displayableEvents.map((event) => {
    const { displayName, description, type, tip, tags } = event;
    const tipContent = genTooltip(tip);
    let version = '';
    if (tags?.length) {
      for (const item of tags) {
        if (item.title === "version") {
          version = item.content;
          continue;
        }
      }
    }
    let lineContent = `|${displayName}|${description}|\`${type}\`${tipContent}|`;
    if (hasVersion) {
      lineContent += `${version}|`;
    }
    return lineContent;
  }).join("\n");
  return {
    content,
    hasVersion
  };
};
// 处理Events
const handleEvents = (events: Events[], lang: Lang = 'zh') => {
  const { content, hasVersion } = tmplEvents(events);
  if (!content)
    return "";
  const header = lang === "en" ? ["|Event Name|Description|Type|", "|---|---|---|"] : ["|\u4E8B\u4EF6\u540D|\u63CF\u8FF0|\u7c7b\u578b|", "|---|---|---|"];
  if (hasVersion) {
    header[0] += lang === "en" ? "version|" : "\u7248\u672C|";
    header[1] += ":---|";
  }
  return `
${header[0]}
${header[1]}
${content}
`;
};

// 生成Methods模板
const tmplMethods = (methods: Methods[]) => {
  const displayableMethods = methods;
  const hasVersion = displayableMethods.some((method) => method?.tags?.version);
  const content = displayableMethods.map((method) => {
    const { displayName, description, type, tip, tags } = method;
    const tipContent = genTooltip(tip);
    let lineContent = `|${displayName}|${description}|\`${type}\`${tipContent}|`;
    if (hasVersion) {
      const version = tags?.version?.[0]?.description;
      lineContent += `${version || ""}|`;
    }
    return lineContent;
  }).join("\n");
  return {
    hasVersion,
    content
  };
};
// 处理Methods
const handleMethods = (methods: Methods[], lang: Lang = 'zh') => {
  const { content, hasVersion } = tmplMethods(methods);
  if (!content)
    return "";
  const header = lang === "en" ? ["|Method|Description|Type|", "|---|---|---|"] : ["|\u65B9\u6CD5\u540D|\u63CF\u8FF0|\u7c7b\u578b|", "|---|---|---|"];
  if (hasVersion) {
    header[0] += lang === "en" ? "version|" : "\u7248\u672C|";
    header[1] += ":---|";
  }
  return `
${header[0]}
${header[1]}
${content}
`;
};

// 生成Slots模板
const tmplSlots = (slots: Slots[]) => {
  const displayableSlots = slots;
  const hasVersion = displayableSlots.some((slot) => slot?.tags?.version);
  const content = displayableSlots.map((slot) => {
    const { displayName, description, parameters, tags } = slot;
    let lineContent = `|${displayName}|${description}|${parameters || "-"}|`;
    if (hasVersion) {
      const version = tags?.version?.content;
      lineContent += `${version || ""}|`;
    }
    return lineContent;
  }).join("\n");
  return {
    hasVersion,
    content
  };
};
// 处理Slots
const handleSlots = (slots: Slots[], lang: Lang = 'zh') => {
  const { content, hasVersion } = tmplSlots(slots);
  if (!content)
    return "";
  const header = lang === "en" ? ["|Slot Name|Description|Parameters|", "|---|---|---|"] : ["|\u63D2\u69FD\u540D|\u63CF\u8FF0|\u53C2\u6570|", "|---|---|---|"];
  if (hasVersion) {
    header[0] += lang === "en" ? "version|" : "\u7248\u672C|";
    header[1] += ":---|";
  }
  return `
${header[0]}
${header[1]}
${content}
`;
};

const getTmpl = (suffix: string, content: string, options: any) => {
  const { displayName, tags, lang } = options;
  if (!content)
    return "";
  let title = displayName ?? '';
  if (tags?.version) {
    const version = tags.version[0]?.description;
    version && (title += ` (${version})`);
  }
  let description = "";
  if (suffix === "Props" && tags?.[lang]) {
    description = tags[lang][0]?.description;
  }
  return `### ${title}${description ? `
${description}` : ""}
${content}`;
};
const getApiTmpl = (componentDoc: any, lang: Lang) => {
  const { name, displayName, props, events, methods, slots, tags } = componentDoc;
  const options = { displayName, tags, lang };
  const propsTmpl =  getTmpl("Props", handleProps(props || [], lang), options);
  const eventsTmpl =  getTmpl("Events", handleEvents(events || [], lang), options);
  const methodsTmpl =  getTmpl("Methods", handleMethods(methods || [], lang), options);
  const slotsTmpl =  getTmpl("Slots", handleSlots(slots || [], lang), options);
  const res = `### ${name} Props\n${propsTmpl}\n
  ### ${name} Events\n${eventsTmpl}\n
  ### ${name} Slots\n${slotsTmpl}\n
  ### ${name} Expose\n${methodsTmpl}`;
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
      const projectDir = dirname(__dirname);
      const baseDir = join(dirname(projectDir), 'components')
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

function genTooltip(content: any) {
  if (!content) {
    return '';
  }
  const html = `<KTooltip content="${content.toString()}" effect="light" trigger="click"></KTooltip>`;
  return html;
} 

export { genApiDoc };
