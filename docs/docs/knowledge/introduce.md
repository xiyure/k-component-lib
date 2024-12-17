---
title: 介绍
date: 2020-08-12 10:30:00
---

# 介绍

`@ksware/ksw-ux` 是一套面向企业级中后台的 UI 组件库，以 Element Plus 为基础进行二次封装。在保留 Element Plus 原有 API 的同时，进一步针对某些业务场景进行了封装与功能扩展，旨在提供高效且愉悦的开发体验。

以 Vue 3.x 与 TypeScript 为开发基础。

## 特性

- **基于 Element Plus**：在保留 Element Plus 强大功能和灵活性的同时，针对企业级中后台的特定需求进行了优化和扩展。
- **高可定制性**：提供了丰富的配置选项，允许开发者根据具体需求进行调整，确保组件在各种场景下都能完美适配。
- **增强的业务组件**：增加了许多常用的业务组件，如高级表单、数据表格、图表等，减少了重复开发的工作量。
- **TypeScript 支持**：全量使用 TypeScript 进行开发，提供完整的类型定义，提升开发效率和代码质量。
- **优秀的文档与示例**：详细的文档和丰富的示例代码，帮助开发者快速上手并充分利用组件库的功能。

## 支持环境

`Vue ^3.0.0`

| Chrome | Edge | Firefox | Safari |
| ------ | ---- | ------- | ------ |
| 79 +   | 79 + | 72 +    | 13.1 + |

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

1. **全局引入**

在 `main.ts` 文件中引入 `@ksware/ksw-ux` 并进行注册：

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import KswUx from '@ksware/ksw-ux';

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

const app = createApp(App);

app.component('KButton', KButton);
app.component('KTable', KTable);

app.mount('#app');
```

通过这种方式，你可以有效减少打包后的文件大小，提高应用的性能。
