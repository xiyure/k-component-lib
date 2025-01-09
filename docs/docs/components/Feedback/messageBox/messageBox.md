---
MessageBox 消息弹框
---

# MessageBox 消息弹框

模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。

:::tip
从设计上来说，`MessageBox` 的作用是美化系统自带的 `alert`、`confirm` 和 `prompt`，因此适合展示较为简单的内容。 如果需要弹出较为复杂的内容，请使用 `Dialog`。
:::

## 消息提示

当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。

调用 `KMessageBox.alert` 方法以打开 `alert` 框。 它模拟了系统的 `alert`，无法通过按下 `ESC` 或点击框外关闭。 此例中接收了两个参数，`message`和`title`。 值得一提的是，窗口被关闭后，它默认会返回一个`Promise`对象便于进行后续操作的处理。 若不确定浏览器是否支持`Promise`，可自行引入第三方 `polyfill` 或像本例一样使用回调进行后续处理。

<preview path="./def.vue" />

## 确认消息

提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。

调用 `KMessageBox.confirm` 方法以打开 `confirm` 框。它模拟了系统的 `confirm`。 `Message Box` 组件也拥有极高的定制性，我们可以传入 `options` 作为第三个参数，它是一个字面量对象。 `type` 字段表明消息类型，可以为`success，error，info`和 `warning`，无效的设置将会被忽略。 需要注意的是，第二个参数 `title` 必须定义为 `String` 类型，如果是 `Object`，会被当做为 `options`使用。 在这里我们返回了一个 `Promise` 来处理后续响应。

<preview path="./confirm.vue" />

## 提交内容

当需要用户输入内容时，可以使用 `Prompt` 类型的消息框。

调用 `KMessageBox.prompt` 方法以打开 `prompt` 框。它模拟了系统的 `prompt`。 可以用 `inputPattern` 字段自己规定匹配模式， 使用 `inputValidator` 来指定验证方法，它应该返回 `Boolean` 或 `String`。 返回 `false` 或 `String` 表示验证失败， 返回的字符串将用作 `inputErrorMessage`，用来提示用户错误原因。 此外，可以用 `inputPlaceholder`字段来定义输入框的占位符。

<preview path="./prompt.vue" />

## 使用 VNode

`message` 可以是 `VNode`。

<preview path="./vnode.vue" />

## 个性化

消息弹框可以被定制来展示各种内容。

上面提到的三个方法都是对 `KMessageBox` 方法的二次包装。 本例直接调用 `KMessageBox` 方法，使用了 `showCancelButton` 字段，用于显示取消按钮。 另外可使用 `cancelButtonClass` 为其添加自定义样式，使用 `cancelButtonText` 来自定义取消按钮文本（Confirm 按钮也具有相同的字段，在文末的 API 说明中有完整的字段列表）。 此例还使用了 `beforeClose` 属性， 当 `beforeClose` 被赋值且被赋值为一个回调函数时，在消息弹框被关闭之前将会被调用，并且可以通过该方法来阻止弹框被关闭。 它是一个接收三个参数：`action、instance` 和`done` 的方法。 使用它能够在关闭前对实例进行一些操作，比如为确定按钮添加 `loading` 状态等；此时若需要关闭实例，可以调用 `done` 方法（若在 `beforeClose` 中没有调用 `done`，则弹框便不会关闭）。

<preview path="./custom.vue" />

## 使用 HTML 片段

`message` 支持传入 `HTML` 字符串来作为正文内容。

将 `dangerouslyUseHTMLString` 属性设置为 `true`，`message` 属性就会被当作 `HTML` 片段处理。

<preview path="./htmlMessage.vue" />

## 区分取消操作与关闭操作

有些场景下，点击取消按钮与点击关闭按钮有着不同的含义。

默认情况下，当用户触发取消（点击取消按钮）和触发关闭（点击关闭按钮或遮罩层、按下 ESC 键）时，Promise 的 reject 回调和 `callback` 回调的参数均为 'cancel'。 如果将`distinguishCancelAndClose`属性设置为 true，则上述两种行为的参数分别为 'cancel' 和 'close'。

<preview path="./distinguishCancelAndClose.vue" />

## 内容居中

消息弹框支持使用居中布局。

将 `center` 属性设置为 `true` 可将内容居中显示。

<preview path="./center.vue" />

## 自定义图标

图标可以使用任意Vue 组件或 [渲染函数 (JSX)](https://vuejs.org/guide/extras/render-function.html)来自定义。

<preview path="./iconMessageBox.vue" />

## 可拖放

设置 `MessageBox` 可以拖拽。

设置`draggable`属性为`true`来开启拖拽弹窗能力。 设置 `overflow` 为 `true` 可以让拖拽范围超出可视区。

<preview path="./draggableMessageBox.vue" />

## API

<API src="./messageBox.json" lang="zh"></API>