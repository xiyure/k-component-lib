---
title: Slider 滑块
---

# Slider 滑块

通过拖动滑块在一个固定区间内进行选择

:::tip
在 `SSR` 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxtjs.org/)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).
:::

## 基础用法

在拖动滑块时，显示当前值

通过设置绑定值自定义滑块的初始值

<preview path="./def.vue" />

## 离散值

选项可以是离散的

改变`step`的值可以改变步长， 通过设置 `show-stops` 属性可以显示间断点

<preview path="./discreteSlider.vue" />

## 带有输入框的滑块

通过输入框输入来改变当前的值。

设置 `show-input` 属性会在右侧显示一个输入框

<preview path="./inputSlider.vue" />

## 不同尺寸

<preview path="./sizeSlider.vue" />

## 位置

您可以自定义 `Tooltip` 提示的位置。

<preview path="./postionSlider.vue" />

## 范围选择

你还可以选择一个范围值

配置 `range` 属性以激活范围选择模式，该属性的绑定值是一个数组，由最小边界值和最大边界值组成。

<preview path="./rangeSlider.vue" />

## 垂直模式

配置 `vertical` 属性为 `true` 启用垂直模式。 在垂直模式下，必须设置 `height` 属性。

<preview path="./verticalSlider.vue" />

## 显示标记

设置 `marks` 属性可以在滑块上显示标记。

<preview path="./showSlider.vue" />