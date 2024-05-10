import { createApp } from 'vue';
import KUi from '../package/index';
import App from './App.vue';

const app = createApp(App);
app.use(KUi);
app.mount('#app');
