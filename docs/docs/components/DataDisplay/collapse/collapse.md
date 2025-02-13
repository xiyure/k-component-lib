---
title: collapse 折叠面板
---

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板，面板之间不影响

<demo-preview2 path="./def.vue" />

## 手风琴效果

每次只能展开一个面板

通过 `accordion` 属性来设置是否以手风琴模式显示。

<demo-preview2 path="./accordion.vue" />

## 自定义面板标题

除了可以通过 `title` 属性以外，还可以通过具名 `slot` 来实现自定义面板的标题内容，以实现增加图标等效果。

<demo-preview2 path="./customization.vue" />

## 自定义图标

除了使用 `icon` 属性外，您还可以自定义面板项目图标，从而添加自定义内容。

<demo-preview2 path="./customIcon.vue" />

## API

<API src="./collapse.json" lang="zh"></API>

<API src="./collapse_item.json" lang="zh"></API>
