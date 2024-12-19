---
Drawer 抽屉
---

# Drawer 抽屉

有些时候, `Dialog` 组件并不满足我们的需求, 比如你的表单很长, 亦或是你需要临时展示一些文档, `Drawer` 拥有和 `Dialog` 几乎相同的 `API`, 在 `UI` 上带来不一样的体验.

:::tip
在 `Vue 3` 之后的版本 `v-model` 可以用于任何一个组件，`visible.sync` 已被移除，请使用 `v-model="visibilityBinding"` 来控制抽屉组件的显示和隐藏状态。
:::
:::tip
在 `SSR` 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxtjs.org/)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).
:::

## 基础用法

呼出一个临时的侧边栏, 可以从多个方向呼出

你必须像 `Dialog`一样为 `Drawer` 设置 `model-value` 属性来控制 `Drawer` 的显示与隐藏状态，该属性接受一个 `boolean` 类型。`Drawer` 包含三部分: `title` & `body` & `footer`, 其中 `title` 是一个具名 `slot`, 你还可以通过 `title` 属性来设置标题, 默认情况下它是一个空字符串, 其中 `body` 部分是 `Drawer` 组件的主区域, 它包含了用户定义的主要内容. `footer`和`title`用法一致, 用来显示页脚信息. 当 `Drawer` 打开时，默认设置是从右至左打开 `30%` 浏览器宽度。 你可以通过传入对应的 `direction` 和 `size` 属性来修改这一默认行为。 下面一个示例将展示如何使用 `before-close API`，更多详细用法请参考页面底部的 `API` 部分。

<preview path="./def.vue" />

## 不添加 Title

当你不需要标题的时候，你可以将它移除。

通过设置 `with-header` 属性为 `false` 来控制是否显示标题。 如果你的应用需要具备可访问性，请务必设置好 `title`。

<preview path="./withoutTitleDrawer.vue" />

## 自定义内容

像 `Dialog` 组件一样，`Drawer` 也可以用来显示多种不同的交互。

<preview path="./customContentDrawer.vue" />

## 自定义头部

`header` 可用于自定义显示标题的区域。 为了保持可用性，除了使用此插槽外，使用 `title` 属性，或使用 `titleId` 插槽属性来指定哪些元素应该读取为抽屉标题。

<preview path="./customHeaderDrawer.vue" />

## 嵌套抽屉

你可以像 `Dialog` 一样拥有多层嵌套的 `Drawer`

如果你需要在不同图层中多个抽屉，你必须设置 `append-to-body` 属性到 `true`

<preview path="./nestedDrawer.vue" />

:::tip
`Drawer` 的内容是懒渲染的，即在第一次被打开之前，传入的默认 `slot` 不会被渲染到 `DOM` 上。 因此，如果需要执行 `DOM` 操作，或通过 `ref` 获取相应组件，请在 `open` 事件回调中进行。
:::

:::tip
`Drawer` 还提供一个 `destroy-on-close` 的 `API`，用来控制是否在 `Drawer` 隐藏之后把 `Drawer` 的默认插槽内的内容销毁。 当你需要每次打开抽屉都要调用 `mounted` 生命周期时，可以使用此 `API`。
:::

## API

<API src="./data.json" lang="zh"></API>
