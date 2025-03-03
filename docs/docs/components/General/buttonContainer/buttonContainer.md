---
title: ButtonContainer 按钮容器
---

# ButtonContainer 按钮容器

<leadInto name="KButtonContainer" />

## 基础用法

<demo path="./def.vue" />

## 触发方式

<demo path="./trigger.vue" />

## 最大高度

<demo path="./maxHeight.vue" />

## 菜单隐藏方式

可以通过 `hide-on-click` 属性来配置。

下拉菜单默认在点击菜单项后会被隐藏，将 `hide-on-click` 属性设置为 `false` 可以关闭此功能。

<demo path="./hideOnClick.vue" />

## 自定义触发按钮

<demo path="./customTrigger.vue" />

:::tip
由于这个组件基于k-Dropdown实现，由于原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

<API src="./buttonContainer.json" lang="zh"></API>