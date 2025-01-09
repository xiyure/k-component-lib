---
title: Page Header 页头
---

# Page Header 页头

如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。

## 完整示例

<preview path="./fullPageHeader.vue" />

## 基础用法

简单场景下的标准页头。

<preview path="./def.vue" />

## 自定义图标

默认图标可能无法满足您的需求，您可以通过设置`icon`属性来自定义图标，示例如下。

<preview path="./customIconPageHeader.vue" />

## 无图标

有时，页面全是元素，您可能不想展示页面上方的图标，您可以设置`icon`属性值为`null`来去除它。

<preview path="./noIconPageHeader.vue" />

## 面包屑导航

使用页头组件，您可以通过添加插槽 `breadcrumb` 来设置面包屑路由导航。

<preview path="./breadcrumbPageHeader.vue" />

## 额外操作部分

头部可能会变得很复杂，您可以在头部添加更多的区块，以允许丰富的交互。

<preview path="./extraActionsPageHeader.vue" />

## 主要内容

有时我们想让页头显示一些协同响应内容，我们可以使用 default 插槽。

<preview path="./defaultPageHeader.vue" />

## API

<API src="./pageHeader.json" lang="zh"></API>