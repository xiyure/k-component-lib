---
title: Message 消息提示
---

# Message 消息提示

常用于主动操作后的反馈提示。 与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 基础用法

从顶部出现，3 秒后自动消失。

<demo-preview2 path="./def.vue" />

## 不同状态

**用来显示「成功、警告、消息、错误」类的操作反馈。**

当需要自定义更多属性时，`Message` 也可以接收一个对象为参数。 比如，设置 `type` 字段可以定义不同的状态，默认为`info`。 此时正文内容以 `message` 的值传入。 同时，我们也为 `Message` 的各种 `type` 注册了方法，可以在不传入 `type` 字段的情况下像 `open4` 那样直接调用。

<demo-preview2 path="./typeMessage.vue" />

## Plain

设置 `plain `为 plain 背景。

<demo-preview2 path="./plainMessage.vue" />

## 可关闭的消息提示

可以添加关闭按钮。

默认的 `Message` 是不可以被人工关闭的。 如果你需要手动关闭功能，你可以把 `showClose` 设置为 `true` 此外，和 `Notification` 一样，`Message` 拥有可控的 `duration`， 默认的关闭时间为 `3000` 毫秒，当把这个属性的值设置为`0`便表示该消息不会被自动关闭。

<demo-preview2 path="./closeMessage.vue" />

## 文字居中

使用 `center` 属性让文字水平居中。

<demo-preview2 path="./centerMessage.vue" />

## 使用 HTML 片段作为正文内容

`message` 还支持使用 `HTML` 字符串作为正文内容。

将`dangerouslyUseHTMLString`属性设置为 `true`,`message` 就会被当作 HTML 片段处理。

<demo-preview2 path="./htmlMessage.vue" />

::: warning
`message` 属性虽然支持传入 `HTML` 片段，但是在网站上动态渲染任意 `HTML` 是非常危险的，因为容易导致 [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) 攻击。 因此在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，永远不要将用户提交的内容赋值给 `message` 属性。
:::

## 分组消息合并

合并相同内容的消息。

设置 `grouping` 为 `true`，内容相同的 `message` 将被合并。

<demo-preview2 path="./groupingMessage.vue" />

## API

<API src="./message.json" lang="zh"></API>