---
Popover 弹出框
---

# Popover 弹出框

## 基础用法

`Popover` 是在 `KTooltip` 基础上开发出来的。 因此对于重复属性，请参考 `Tooltip` 的文档，在此文档中不做详尽解释。

`trigger` 属性被用来决定 `popover` 的触发方式，支持的触发方式： `hover`、`click`、`focus` 或 `contextmenu`。 如果你想手动控制它，可以设置 `:visible` 属性。

<preview path="./def.vue" />

## 虚拟触发

像 `Tooltip`一样，`Popover` 可以由虚拟元素触发，这个功能就很适合使用在触发元素和展示内容元素是分开的场景。通常我们使用 `#reference` 来放置我们的触发元素， 用 `triggering-element API`，您可以任意设置您的触发元素 但注意到触发元素应该是接受 `mouse` 和 `keyboard` 事件的元素。

<preview path="./virtualPopover.vue" />

## 内容可扩展

可以在 `Popover` 中嵌套其它组件， 以下为嵌套表格的例子。

利用插槽取代 `content` 属性

<preview path="./slotContent.vue" />

## 嵌套操作

当然，你还可以嵌套操作， 它比使用dialog更加轻量。

<preview path="./nestedPopover.vue" />

## API

<API src="./popover.json" lang="zh"></API>

