import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import KUi from '../package/index';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import Hello from './view/Hello.vue';
import World from './view/World.vue';
import Cors from './view/Cors.vue';

const routes = [
  { path: '/world', component: World, meta: {title: 'World', path: '/world'} },
  { path: '/hello', component: Hello, meta: {title: 'Hello', path: '/hello'} },
  { path: '/cors', component: Cors, meta: {title: 'Cors', path: '/cors'} },
];
 
const router = createRouter({
  history: createWebHistory(),
  routes,
});
const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(KUi);
app.mount('#app');
