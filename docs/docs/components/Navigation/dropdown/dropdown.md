---
title: Dropdown 下拉菜单
---

# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

:::tip
在 `SSR` 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxtjs.org/)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).
:::

## 基础用法

悬停在下拉菜单上以展开更多操作。

通过组件 slot 来设置下拉触发的元素以及需要通过具名 slot 为 dropdown 来设置下拉菜单。 默认情况下，只需要悬停在触发菜单的元素上即可，无需点击也会显示下拉菜单。

<demo path="./def.vue" />

## 触发对象

可使用按钮触发下拉菜单。

设置 split-button 属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为 true 即可。 如果你想要在第三和第四个选项之间添加一个分隔符，你只需要为第四个选项添加一个 divider 的 CSS class。

<demo path="./triggerDropdown.vue" />

## 触发方式

可以配置点击激活或者悬停激活。

将 `trigger` 属性设置为 `click` 即可， 默认为 `hover`。

<demo path="./triggerfunctionDropdown.vue" />

## 菜单隐藏方式

可以通过 `hide-on-click` 属性来配置。

下拉菜单默认在点击菜单项后会被隐藏，将 `hide-on-click` 属性设置为 `false` 可以关闭此功能。

<demo path="./hideDropdown.vue" />

## 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。

<demo path="./eventDropdown.vue" />

## 下拉方法

您可以手动使用 `手动打开` 或 `手动关闭下拉菜单以打开或关闭`

<demo path="./manualDropdown.vue" />

## 尺寸

`Dropdown` 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的尺寸。

使用 `size` 属性配置尺寸，可选的尺寸大小有: `large`, `default` 或 `small`

<demo path="./sizeDropdown.vue" />

## API

<API src="./dropdown.json" lang="zh"></API>

<API src="./dropdownItem.json" lang="zh"></API>