import DefaultTheme from 'vitepress/theme';
import { h, onMounted } from 'vue';
import { Container } from '../plugin/container/index';
import './style.less';
import './tailwind.css';
import DocTitle from '../components/DocTitle.vue';
import { KswIcon } from 'ksw-vue-icon';

/*
 *  源码
 */
import install from '../../../packages/index';
/*
 *  本地 build
 */
// import install from '../../../kingsware-ui/index';
// import '../../../kingsware-ui/style.css';
/*
 *  npm
 */
// import install from '@ksware/ksw-ux';
// import '@ksware/ksw-ux/kingsware-ui/style.css';

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    // inject Third-party libraries
    // DefaultTheme.enhanceApp(ctx);
    ctx.app.use(install);
    ctx.app.use(KswIcon);
    // ctx.app.use(NolebaseGitChangelogPlugin);
    ctx.app.component('demo-preview', Container);
    ctx.app.component('DocTitle', DocTitle);
    //   ctx.app.provide(InjectionKey, {
    //     // 配置
    //     layoutSwitch: {
    //       disableAnimation: false,
    //       defaultMode: 1,
    //     },
    //     spotlight: {
    //       defaultToggle: true,
    //     },
    //   } as Options);
  },
};
