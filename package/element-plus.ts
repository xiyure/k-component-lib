import * as ElementPlusInstance from 'element-plus';
import * as components from './components';

const componentPrefix = 'K';
const originComponents:any = {}; // 存放element-plus的原始组件
for (const key in ElementPlusInstance) {
  if (/^El[A-Z]/.test(key)) {
    const newKey = key.replace(/^El/, componentPrefix);
    if (!components[newKey]) {
      originComponents[newKey] = ElementPlusInstance[key];
    }
  }
}

export default originComponents;