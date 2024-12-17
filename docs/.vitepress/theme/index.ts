import DefaultTheme from 'vitepress/theme';
import { h, onMounted } from 'vue';
import { Container } from '../plugin/container/index';
import './style.less';
import './tailwind.css';
export default {
  ...DefaultTheme,
};
