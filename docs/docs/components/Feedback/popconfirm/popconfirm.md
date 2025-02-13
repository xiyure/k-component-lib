---
Popconfirm 气泡确认框
---

# Popconfirm 气泡确认框

点击某个元素弹出一个简单的气泡确认框

## 基础用法

`Popconfirm` 的属性与 `Popover` 很类似， 因此对于重复属性，请参考 `Popover` 的文档，在此文档中不做详尽解释。

在 `Popconfirm` 中，只有 `title` 属性可用，`content` 属性会被忽略。

<demo path="./def.vue" />

## 自定义弹出框的内容

可以在 `Popconfirm` 中自定义内容。

<demo path="./custom.vue" />

## 多种让 Popconfirm 出现的方法

点击按钮触发事件

<demo path="./trigger.vue" />

## API

<API src="./popconfirm.json" lang="zh"></API>