---
title: TimePicker 时间选择器
---

# TimePicker 时间选择器

用于选择或输入日期

:::tip
在 `SSR` 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxtjs.org/)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).
:::

## 任意时间点

可以选择任意时间

提供了两种交互方式：默认情况下通过鼠标滚轮进行选择，打开arrow-control属性则通过界面上的箭头进行选择。

<preview path="./def.vue" />

## 限制时间选择范围

您也可以限制时间选择范围。

通过 `disabledHours`，`disabledMinutes` 和 `disabledSeconds` 限制可选时间范围。,

<preview path="./limitTimePicker.vue" />

## 任意时间范围

可选择任意的时间范围

添加`is-range`属性即可选择时间范围。 同样支持 `arrow-control` 属性。

<preview path="./rangeTimePicker.vue" />

## API

<API src="./time_picker.json" lang="zh"></API>