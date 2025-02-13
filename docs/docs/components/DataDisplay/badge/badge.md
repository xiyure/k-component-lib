---
title: badge 徽章
---

# Badge 徽章

按钮和图标上的数字或状态标记。

## 基础用法

可以用来展示新消息的数量。

数量值可接受 `Number` 或 `String`。

<demo path="./def.vue" />

## 最大值

你还可以自定义最大值

由 `max` 属性定义，接受 `Number` 值。 请注意，仅在值也是 `Number` 时起作用。

<demo path="./badgeMax.vue" />

## 自定义显示内容

你也可以展示除数字以外你想要展示的任何值。

当 `value` 是 `String` 时，可以显示自定义文字。

<demo path="./customizeBadge.vue" />

## 小红点

通过一个小红点标记来告知用户有新内容。

使用 `is-dot` 属性。 是个布尔值。

<demo path="./redDotBadge.vue" />

## 偏移量

设置徽章点的偏移，格式是[左，顶部]， 代表状态点从左侧和默认位置顶部的偏移。

<demo path="./offsetBadge.vue" />

## API

<API src="./badge.json" lang="zh"></API>
