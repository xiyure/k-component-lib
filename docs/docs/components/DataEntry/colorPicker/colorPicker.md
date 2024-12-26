---
title: ColorPicker 颜色选择器
---

# ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

:::tip
在 `SSR` 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxtjs.org/)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).
:::

## 基础用法

使用 `v-model` 与 `Vue` 实例中的一个变量进行双向绑定，绑定的变量需要是字符串类型。

<preview path="./def.vue" />

## 选择透明度

`ColorPicker` 支持普通颜色，也支持带 `Alpha` 通道的颜色，通过`show-alpha`属性即可控制是否支持透明度的选择。 要启用 `Alpha` 选择，只需添加 `show-alpha` 属性。

<preview path="./chooseColorPicker.vue" />

## 预定义颜色

`ColorPicker` 支持预定义颜色

<preview path="./predefineColorPicker.vue" />

## 不同尺寸

<preview path="./sizeColorPicker.vue" />

## API

<API src="./color_picker.json" lang="zh"></API>