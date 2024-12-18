---
title: Select 选择器
---

## Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

:::tip
在 `SSR` 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxtjs.org/)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).
:::

## 基础用法

适用广泛的基础单选 `v-model` 的值为当前被选中的 `k-option` 的 `value` 属性值

<preview path="./def.vue" />

## 有禁用选项

在 `k-option` 中，设定 `disabled` 值为 `true`，即可禁用该选项

<preview path="./disabledOptionSelect.vue" />

## 禁用状态

禁用整个选择器组件

为 `k-select` 设置 `disabled`属性，则整个选择器不可用。

<preview path="./disabledSelect.vue" />

## 可清空单选

您可以使用清除图标来清除选择。

为 `k-select` 设置 `clearable` 属性，则可将选择器清空。 需要注意的是，`clearable` 属性仅适用于单选。

<preview path="./clearableSelect.vue" />

## 基础多选

多选选择器使用 tag 组件来展示已选中的选项。

为 `k-select` 设置 `multiple` 属性即可启用多选， 此时 `v-model` 的值为当前选中值所组成的数组。 默认情况下选中值会以 `Tag` 组件的形式展现， 你也可以设置 `collapse-tags` 属性将它们合并为一段文字。 您可以使用 `collapse-tags-tooltip` 属性来启用鼠标悬停折叠文字以显示具体所选值的行为。

<preview path="./multipleSelect.vue" />

## 自定义模板

你可以自定义如何来渲染每一个选项。

将自定义的 `HTML` 模板插入 `k-option` 的 `slot` 中即可。

<preview path="./customTemplateSelect.vue" />

## 自定义下拉菜单的头部

您可以自定义下拉菜单的头部。

使用slot 自定义内容

<preview path="./customHeaderSelect.vue" />

## 自定义下拉菜单的底部

您可以自定义下拉菜单的底部。

使用slot 自定义内容

<preview path="./customFooterSelect.vue" />

## 将选项进行分组

你可以为选项进行分组来区分不同的选项

使用 `k-option-group` 对备选项进行分组，它的 `label` 属性为分组名

<preview path="./groupSelect.vue" />

## 筛选选项

可以利用筛选功能快速查找选项。

为`k-select`添加`filterable`属性即可启用搜索功能。 默认情况下，`Select` 会找出所有 `label` 属性包含输入值的选项。 如果希望使用其他的搜索逻辑，可以通过传入一个 `filter-method` 来实现。 `filter-method` 为一个 `Function`，它会在输入值发生变化时调用，参数为当前输入值。

<preview path="./filterableSelect.vue" />

## 远程搜索

输入关键字以从远程服务器中查找数据。

从服务器搜索数据，输入关键字进行查找。为了启用远程搜索，需要将`filterable`和`remote`设置为`true`，同时传入一个remote-method。 `remote-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。 需要注意的是，如果 `k-option` 是通过 `v-for` 指令渲染出来的，此时需要为`k-option` 添加 `key` 属性， 且其值需具有唯一性，比如这个例子中的 `item.value`。

<preview path="./remoteSelect.vue" />

## 创建新的选项

创建并选中未包含在初始选项中的条目。

通过使用 `allow-create` 属性，用户可以通过输入框创建新项目。 为了使 `allow-create` 正常工作， `filterable` 的值必须为 true。 本例还使用了 `default-first-option` 属性， 在该属性为 `true` 的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。

<preview path="./createSelect.vue" />

## 使用值键 value-key 属性

创建并选中未包含在初始选项中的条目。

如果 `Select` 的绑定值为对象类型，请务必指定 `value-key` 作为它的唯一性标识。

通过使用 `value-key` 属性，可以正确处理带有重复`label`的数据。 这样虽然`label` 是重复的，但任可通过 `id` 来确认唯一性。

<preview path="./valueKeySelect.vue" />

## 自定义标签

您可以自定义标签。

将自定义的标签插入 `k-select` 的 `slot` 中即可。 `collapse-tags`, `collapse-tags-tooltip`, `max-collapse-tags` 在此模式下不生效.

<preview path="./customTagSelect.vue" />

## 自定义加载

修改加载区域内容

<preview path="./customLoadingSelect.vue" />

## API

<API src="./select.json" lang="zh"></API>

<API src="./option.json" lang="zh"></API>

<API src="./option_group.json" lang="zh"></API>
