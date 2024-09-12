import { baseParse } from '@vue/compiler-core';
import { resolveConfig } from 'vitepress';

function parseProps(content: string) {
  const ast = baseParse(content);
  const demoElement = ast.children[0] as any;
  const props = getPropsMap(demoElement.props);
  return props;
}
function getPropsMap(attrs) {
  const map = {};
  for (const { name, value } of attrs) {
    map[name] = value?.content;
  }
  return map;
}

async function resolveLocaleConfigs(root = "docs") {
  const vitepressConfigs = await resolveConfig(root);
  const siteData = vitepressConfigs.site;
  const defaultLang = siteData.lang;
  const langToPathMap = Object.entries(siteData.locales).reduce(
    (map, [path, localeConfig]) => {
      map[localeConfig.lang ?? 'en'] = path;
      return map;
    },
    {}
  );
  return {
    defaultLang,
    langToPathMap
  };
}

export { parseProps, resolveLocaleConfigs };
