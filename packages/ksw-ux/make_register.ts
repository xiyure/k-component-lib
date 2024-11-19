import type { App, Plugin } from 'vue';
import * as ElementPlusInstance from 'element-plus';
import components from './resources/component';
import templates from './resources/template';

// components and templates are registered here
export const makeRegister = (app: App) => {
  const plugins: Plugin[] = [...components, ...templates];
  plugins.forEach(component => {
    if (!component || !component.install || !component?.name) {
      return;
    }
    app.use(component);
  });
  // register element-plus components
  const ElComponents = getElComponents();
  for (const key in ElComponents) {
    app.component(key, ElComponents[key]);
  }
};

function getElComponents() {
  const componentPrefix = 'K';
  const ElComponents:any = {}; 
  for (const key in ElementPlusInstance) {
    if (/^El[A-Z]/.test(key)) {
      const newKey = key.replace(/^El/, componentPrefix);
      const targetComp = components.find(comp => comp.name === newKey);
      if (!targetComp) {
        ElComponents[newKey] = ElementPlusInstance[key];
      }
    }
  }
  return ElComponents;
}