import { createApp } from 'vue';
import KUi from '../package/index';
import App from './App.vue';
import { KswIcon } from 'ksw-vue-icon';
import '../tailwind.css';

const app = createApp(App);
app.use(KUi, {
  locale: 'zh',
});
app.use(KswIcon);
app.mount('#app');
