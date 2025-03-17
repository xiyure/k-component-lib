---
title: 色彩
date: 2025-01-06 10:30:00
---

# 色彩

`@ksware/ksw-ux` 使用 oklch 颜色模型生成的 css 变量。

组件库色彩使用有两种模式: 公共变量, 项目变量。

## 公共变量:

- 公共变量命名格式为 --k-{颜色}-{色阶}, 例如 --k-red-500 表示红色的 500 色阶。

## 项目变量:

首先需要再加载项目时, 导入项目。

在 main.ts 引入 KswUx 并传入配置。

```typescript
...
import KswUx from '@ksware/ksw-ux';

const app = createApp(App);
app.use(KswUx, { styleModule: 'GFAOM' }); // 传入项目名称
...
```

- 变量命名格式为 --k-theme-{颜色}-{色阶}, 例如 --k-theme-primary-500 表示主题色的 500 色阶。

## 调色板

ksw-ux 包含丰富、漂亮的开箱即用调色板，由专业设计师精心制作，适用于各种不同的设计风格。

<mainColor />

<script setup>
import mainColor from './mainColor.vue';

</script>