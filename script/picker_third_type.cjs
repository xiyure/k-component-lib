const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const root = process.cwd();

const programOptions = {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.CommonJS
};

// element-plus
const elTypesConfig = {
  name: 'element-plus',
  set: new Set(),
  input: path.join(root, 'node_modules/element-plus/es/components'),
  output: path.join(root, 'typings/third_types/element.ts'),
  otherTypes: [
    'element-plus/es/components/tree/src/tree.type',
    'element-plus/es/directives',
    'element-plus/es/hooks'
  ]
};

// vxe-table
const vxeTypesConfig = {
  name: 'vxe-table',
  set: new Set(),
  input: path.join(root, 'node_modules/vxe-pc-ui/types/components/table'),
  output: path.join(root, 'typings/third_types/vxe.ts'),
  otherTypes: []
};

const getTsFiles = (src) => {
  if (!src) return [];
  try {
    const components = fs.readdirSync(src);
    const tsFiles = components
      .map((componentName) => {
        const componentPath = path.join(src, componentName, 'src');
        if (!fs.existsSync(componentPath)) return;
        return fs
          .readdirSync(componentPath)
          .filter((file) => file.endsWith('.d.ts') && !file.endsWith('.vue.d.ts'))
          .map((file) => path.join(componentPath, file));
      })
      .filter(Boolean)
      .flat();
    return tsFiles;
  } catch (error) {
    console.error('获取第三方组件的类型定义文件路径失败：', error);
    return null;
  }
};

const pickerThirdTypes = (tsFiles, targetSet) => {
  try {
    for (let i = 0; i < tsFiles.length; i++) {
      const filePath = tsFiles[i];
      extractTypesFromTsFile(filePath, targetSet);
    }
    console.log('类型定义文件生成成功');
  } catch (error) {
    console.error('生成类型定义文件失败：', error);
  }
};

function extractTypesFromTsFile(filePath, targetSet) {
  const sourceFile = ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, 'utf-8'),
    ts.ScriptTarget.Latest,
    true
  );
  function visitNode(node) {
    if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
      targetSet.add(node.name.text);
    }
    ts.forEachChild(node, visitNode);
  }
  visitNode(sourceFile);
}

function filterValidTypes(typeSet) {
  const excludes = ['Props', 'Emits', 'Instance'];
  return Array.from(typeSet).filter((type) => {
    return excludes.every((exclude) => !type.includes(exclude));
  });
}

function generateTypesFile(config) {
  const { name, set, output, otherTypes = [] } = config;
  const content = `export type{\n  ${filterValidTypes(set).join(',\n  ')}\n} from '${name}';\n${otherTypes.map((type) => `export * from '${type}';`).join('\n')}`;
  fs.writeFileSync(output, content, 'utf-8');
}

const run = (config) => {
  return new Promise((resolve) => {
    const { input, set } = config;
    const tsFiles = getTsFiles(input);
    if (tsFiles) {
      pickerThirdTypes(tsFiles, set);
    }
    generateTypesFile(config);
    console.log('开始检查类型定义文件...')
    resolve(config);
  });
};

run(elTypesConfig).then((config) => {
  const { set, output } = config;
  const program = ts.createProgram([output], programOptions);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  const diagnosticsText = [];
  for (const diagnostic of diagnostics) {
    if (diagnostic.code === 2614 || diagnostic.code === 2724) {
      const { messageText = '' } = diagnostic;
      const regex = /no exported member '(?<member>[^']+)'|no exported member named '(?<name>[^']+)'/;
      const { groups } = messageText.match(regex) || {};
      const propertyName = groups?.name ?? groups?.member;
      propertyName && diagnosticsText.push(propertyName);
    }
  }
  for (const propertyName of diagnosticsText) {
    set.has(propertyName) && set.delete(propertyName);
  }
  generateTypesFile(config);
  console.log('类型定义文件检查完成')
});
