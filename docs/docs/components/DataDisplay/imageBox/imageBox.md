---
title: Image 图片
---

# Image 图片

<leadInto name="KImage" />

图片容器，在保留所有原生 img 的特性下，支持懒加载，自定义占位、加载失败等

## 基础用法

可通过`fit`确定图片如何适应到容器框，同原生 `object-fit`。

<demo path="./def.vue" />

# 占位内容

可通过`slot = placeholder`可自定义占位内容

<demo path="./placeholderImage.vue" />

# 加载失败

可通过`slot = error`可自定义加载失败内容

<demo path="./errorImage.vue" />

# 懒加载

::: tip
您可以使用 loading="lazy" 替换之前的lazy= true。

如果当前浏览器支持原生图片延迟加载，则先使用原生能力，否则将使用滚动监听实现相同效果。
:::

可通过`lazy`开启懒加载功能， 当图片滚动到可视范围内才会加载。 可通过 `scroll-container` 来设置滚动容器， 若未定义，则为最近一个 `overflow` 值为 `auto` 或 `scroll` 的父元素。

<demo path="./lazyImage.vue" />

# 图片预览

可通过 `previewSrcList` 开启预览大图的功能。 你可以通过 `initial-index` 初始化第一张预览图片的位置。 默认初始位置为 0。

<demo path="./previewImage.vue" />

## API

<API src="./imageBox.json" lang="zh"></API>

<API src="./imageViewer.json" lang="zh"></API>