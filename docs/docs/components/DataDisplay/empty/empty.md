---
title: empty 空状态
---

# Empty 空状态

空状态时的占位提示。

## 基础用法

<preview path="./def.vue" />

## 自定义图片

通过设置 image 属性传入图片 URL

<preview path="./customizeEmpty.vue" />

## 图片尺寸

通过使用 image-size 属性来控制图片大小。

<preview path="./emptySize.vue" />

## 底部内容

使用默认插槽可在底部插入内容。

<preview path="./emptyBottom.vue" />

## 自定义样式

您可以为empty组件设置自定义样式。 使用 css/scss 语言来更改全局或局部颜色。 我们设置了一些全局颜色变量：--k-empty-fill-color-0、--k-empty-fill-color-1、--k-empty-fill-color-2、……、--k-empty-fill-color-9。 您可以使用类似 :root { --k-empty-fill-color-0: red; --k-empty-fill-color-1: blue; } 等变量。 但通常，如果你想要更改样式，你需要更改所有颜色，因为这些颜色是一个组合。

## API

<API src="./empty.json" lang="zh"></API>