---
title: dialog 对话框
---

# Dialog 对话框

## 适用

在保留当前页面状态的情况下，告知用户并承载相关操作。

## 基础用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。

需要设置 model-value / v-model 属性，它接收 Boolean，当为 true 时显示 Dialog。 Dialog 分为两个部分：body 和 footer，footer 需要具名为 footer 的 slot。 title 属性用于定义标题，它是可选的，默认值为空。 最后，本例还展示了 before-close 的用法。

<demo path="./def.vue" />

::: tip
`before-close` 只会在用户点击关闭按钮或者对话框的遮罩区域时被调用。 如果你在 `footer` 具名 slot 里添加了用于关闭 Dialog 的按钮，那么可以在按钮的点击回调函数里加入 `before-close` 的相关逻辑。
:::

## 自定义内容

对话框的内容可以是任何东西，甚至是一个表格或表单。 此示例显示如何在 Dialog 中使用 Element Plus 的表格和表单。

<demo path="./customizeDialog.vue" />

## 自定义头部

header 可用于自定义显示标题的区域。 为了保持可用性，除了使用此插槽外，使用 title 属性，或使用 titleId 插槽属性来指定哪些元素应该读取为对话框标题。

<demo path="./customizeHeaderDialog.vue" />

## 嵌套的对话框

如果需要在一个 Dialog 内部嵌套另一个 Dialog，需要使用 append-to-body 属性。

通常我们不建议使用嵌套对话框。 如果你需要在页面上呈现多个对话框，你可以简单地打平它们，以便它们彼此之间是平级关系。 如果必须要在一个对话框内展示另一个对话框，可以将内部嵌套的对话框属性 append-to-body 设置为 true，嵌套的对话框将附加到 body 而不是其父节点，这样两个对话框都可以被正确地渲染。

<demo path="./nestDialog.vue" />

## 内容居中

对话框的内容可以居中。

将center设置为true即可使标题和底部居中。 center仅影响标题和底部区域。 Dialog 的内容是任意的，在一些情况下，内容并不适合居中布局。 如果需要内容也水平居中，请自行为其添加 CSS 样式。

<demo path="./mediateDialog.vue" />

::: tip
Dialog 的内容是懒渲染的——在被第一次打开之前，传入的默认 slot 不会被立即渲染到 DOM 上。 因此，如果需要执行 DOM 操作，或通过 ref 获取相应组件，请在 open 事件回调中进行。
:::

## 居中对话框

从屏幕中心打开对话框。

设置 align-center 为 true 使对话框水平垂直居中。 由于对话框垂直居中在弹性盒子中，所以top属性将不起作用。

<demo path="./centerDialogBox.vue" />

## 关闭时销毁

启用此功能时，默认栏位下的内容将使用 v-if 指令销毁。 当出现性能问题时，可以启用此功能。

需要注意的是，当这个属性被启用时，在 transition.beforeEnter 事件卸载前，除了 overlay、header (可选)与footer(可选) ，Dialog 内不会有其它任何其它的 DOM 节点存在。

<demo path="./destroyDialog.vue" />

## 可拖拽对话框

试着拖动一下header部分吧

设置draggable属性为true以做到拖拽 设置 overflow为 true 可以让拖拽范围超出可视区。

<demo path="./dragDialog.vue" />

## 可伸缩模式

启动use-resizable模式，加强你的对话框体验。

<demo path="./resizableDialog.vue" />

## API

<API src="./dialog.json" lang="zh"></API>
