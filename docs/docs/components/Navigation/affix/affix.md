---
title: Affix 固钉
---

# Affix 固钉

将页面元素固定在特定可视区域。

## 基础用法

固钉默认固定在页面顶部。

通过设置 `offset` 属性来改变吸顶距离，默认值为 0。

<demo path="./def.vue" />

## 指定容器

通过设置 `target` 属性，让固钉始终保持在容器内， 超过范围则隐藏。

请注意容器避免出现滚动条。

<demo path="./targetAffix.vue" />

## 固定位置

`Affix` 组件提供 `2` 个固定的位置参数 `top` 和 `bottom`。

通过设置 `position` 属性来改变固定位置，默认值为 `top` 。

<demo path="./positionAffix.vue" />

## API

<API src="./affix.json" lang="zh"></API>