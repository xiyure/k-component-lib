---
title: 快速上手
date: 2020-08-11 10:30:00
---

# 快速上手

`@ksware/ksw-ux` 致力于提供给程序员愉悦的开发体验。

> 在开始之前，推荐先学习 Vue 3.x 和 ES2015，并正确安装和配置了 Node.js v16 或以上。官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 Vue 3.x 的正确开发方式。

## 支持环境

`Vue ^3.0.0`

| ![Chrome](https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_32x32.png) Chrome | ![Edge](https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_32x32.png) Edge | ![Firefox](https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_32x32.png) Firefox | ![Safari](https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_32x32.png) Safari |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| >= 85 +                                                                               | >=85 +                                                                        | 79 +                                                                                      | 14.1 +                                                                                |

## 安装

::: code-group

```sh [npm]
npm install @ksware/ksw-ux --save
```

```sh [yarn]
yarn add @ksware/ksw-ux
```

```sh [pnpm]
pnpm install @ksware/ksw-ux
```

:::

## 使用

在你的 Vue 项目中引入并使用 `@ksware/ksw-ux`：
导入`@ksware/ksw-ux/kingsware-ui/style.css`样式文件，并在 `main.ts` 文件中注册组件：

1. **全局引入**

在 `main.ts` 文件中引入 `@ksware/ksw-ux` 并进行注册：

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import KswUx from '@ksware/ksw-ux';
import '@ksware/ksw-ux/kingsware-ui/style.css'

const app = createApp(App);

app.use(KswUx);

app.mount('#app');
```

2. **按需引入**

如果你只需要使用部分组件，可以按需引入：

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import { KButton, KTable } from '@ksware/ksw-ux';
import '@ksware/ksw-ux/kingsware-ui/style.css'

const app = createApp(App);

app.component('KButton', KButton);
app.component('KTable', KTable);

app.mount('#app');
```

通过这种方式，你可以有效减少打包后的文件大小，提高应用的性能。

[查看完整示例](../components/General/button)
