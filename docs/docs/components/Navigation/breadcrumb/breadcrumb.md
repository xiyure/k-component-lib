---
title: Breadcrumb 面包屑
---

# Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

## 基础用法

在 `k-breadcrumb` 中使用 `k-breadcrumb-item` 标签表示从首页开始的每一级。 该组件接受一个 `String` 类型的参数 `separator`来作为分隔符。 默认值为 '/'。

<preview path="./def.vue" />

## 图标分隔符

通过设置 `separator-class` 可使用相应的 `iconfont` 作为分隔符，注意这将使 `separator` 失效。

<preview path="./iconBreadcrumb.vue" />

## Breadcrumb API

<API src="./breadcrumb.json" lang="zh"></API>

## BreadcrumbItem API

<API src="./BreadcrumbItem.json" lang="zh"></API>