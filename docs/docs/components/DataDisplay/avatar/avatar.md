---
title: Avatar 头像
---

# Avatar 头像

<leadInto name="KAvatar" />

`Avatar` 组件可以用来代表人物或对象， 支持使用图片、图标或者文字作为 `Avatar`。

## 基础用法

使用 `shape` 和 `size` 属性来设置 `Avatar` 的形状和大小。

<demo path="./def.vue" />

## 展示类型

支持使用图片，图标或者文字作为 `Avatar`。

<demo path="./typeAvatar.vue" />

## 回退行为

图片加载失败时的回退行为。

<demo path="./fallbackAvatar.vue" />

## 适应容器

当使用图片作为用户头像时，设置该图片如何在容器中展示。与`object-fit` 属性一致

<demo path="./fitAvatar.vue" />

## API

<API src="./avatar.json" lang="zh"></API>