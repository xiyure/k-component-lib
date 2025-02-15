---
title: tooltips 气泡框
---

# tooltips 气泡框

常用于展示鼠标 `hover` 时的提示信息。

:::tip
在 `SSR` 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxtjs.org/)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).
:::

## 基础用法

在这里我们提供 `9` 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

使用 `content` 属性来决定 `hover` 时的提示信息。 由 `placement` 属性决定展示效果： `placement`属性值为：[方向]-[对齐位置]；四个方向：`top`、left、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。 如 `placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

<demo path="./def.vue" />

## 自定义颜色

使用`color`属性来自定义气泡框的颜色, 使用`textColor`属性来自定义提示信息的颜色。

<demo path="./colorTooltips.vue" />

## 主题

`Tooltip` 组件内置了两个主题：`dark`和`light`。

:::tip
暂不支持自定义主题
:::

通过设置 `effect` 来修改主题，默认值为 `dark`.

<demo path="./themeTooltips.vue" />

## 更多内容的文字提示

展示多行文本或者是设置文本内容的格式

用具名 `slot content`，替代`tooltip`中的`content`属性。

<demo path="./slotContentTooltips.vue" />

## 高级扩展

除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果：

`transition` 属性可以定制显隐的动画效果，默认为`fade-in-linear`。

如果需要关闭 `tooltip` 功能，`disabled` 属性可以满足这个需求， 你只需要将其设置为 `true`。

事实上，`Tooltip` 是一个基于 `KPopper` 的扩展，您可以使用 `KPopper` 中允许的任何属性。

<demo path="./advancedTooltips.vue" />

:::tip
`Tooltip` 内不支持 `router-link` 组件，请使用 `vm.$router.push` 代替。

`tooltip` 内不支持 `disabled form` 元素，参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event)， 请在 `disabled form` 元素外层添加一层包裹元素。
:::

## 显示 HTML 内容

内容属性可以设置为 `HTML` 字符串。

:::warning
`content` 属性虽然支持传入 `HTML` 片段，但是在网站上动态渲染任意 `HTML` 是非常危险的，因为容易导致[XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) 攻击。 因此在 `raw-content` 打开的情况下，请确保 `content` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `content` 属性。
:::

<demo path="./htmlContentTooltips.vue" />

## 虚拟触发

有时候我们想把 `tooltip` 的触发元素放在别的地方，而不需要写在一起，这时候就可以使用虚拟触发。

:::tip
需要注意的是，虚拟触发的 `tooltip` 是受控组件，因此你必须自己去控制 `tooltip` 是否显示，**你将无法**通过点击空白处来关闭 `tooltip`。
:::

<demo path="./virtualTriggerTooltips.vue" />

## 单例模式

Tooltip 可以作为单例，也就是是说你可以同时有多个触发同一个 tooltip 的触发元素，这个功能是在 虚拟触发 的基础上开发的。

:::tip
已知问题：使用单例模式时，弹出窗口会从意料之外的位置弹出。
:::

<demo path="./singleTooltips.vue" />

## 受控模式

`Tooltip` 可以通过父组件使用 `:visible` 来控制它的显示与关闭。

<demo path="./controlledTooltips.vue" />

## 自定义动画

`Tooltip` 可以自定义动画，你可以根据需要自行设置所需的动画方法。

<demo path="./customAnimationTooltips.vue" />

## API

<API src="./tooltip.json" lang="zh"></API>
