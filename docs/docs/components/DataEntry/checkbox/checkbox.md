---
title: checkbox 多选框
---

# Checkbox 多选框

<leadInto name="KCheckbox" />

在一组备选项中进行多选。

## 适用

- 在一组可选项中进行多项选择时；

- 单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 `checkbox` 按钮后的介绍。

`checkbox-group` 元素能把多个 `checkbox` 管理为一组，只需要在 `Group` 中使用 `v-model` 绑定 `Array` 类型的变量即可。 只有一个选项时的默认值类型为 `Boolean`，当选中时值为`true`。 `k-checkbox` 标签中的内容将成为复选框按钮之后的描述。

<demo path="./def.vue" />

## 自定义颜色多选框

设置 `color` 属性可以自定义颜色。

<demo path="./colorCheckbox.vue" />

## 严格模式多选框

设置 `strict` 属性可以启用严格模式, 只有点击复选框时才能选中。

<demo path="./strictCheckbox.vue" />

## 禁用状态

多选框不可用状态。

设置 `disabled` 属性即可。

<demo path="./disabled.vue" />

## 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

在 `k-checkbox` 元素中定义 `v-model` 绑定变量，单一的 `checkbox` 中，默认绑定变量的值会是 `Boolean`，选中为 `true`。 在 `k-checkbox` 组件中，`value` 是选择框的值。 如果该组件下没有被传入内容，那么 `label` 将会作为 `checkbox` 按钮后的介绍。 `value` 也与数组中的元素值相对应。 如果指定的值存在于数组中，就处于选择状态，反之亦然。

<demo path="./grouping.vue" />

## 中间状态

`indeterminate` 属性用以表示 `checkbox` 的不确定状态，一般用于实现全选的效果

<demo path="./intermediate.vue" />

## 可选项目数量的限制

使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。

<demo path="./limitation.vue" />

## 按钮样式

按钮样式的多选组合。

只需要把 `k-checkbox` 元素替换为 `k-checkbox-button` 元素即可。 此外还提供了`size`属性。

<demo path="./buttonStyle.vue" />

## 带有边框

设置 `border` 属性可以渲染为带有边框的多选框。

<demo path="./withBorder.vue" />

多选框。

## 何时使用

- 在一组可选项中进行多项选择时；

- 单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

<demo path="./def.vue" />

多选框。

## 何时使用

- 在一组可选项中进行多项选择时；

- 单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

<demo path="./def.vue" />

## API

<API src="./checkbox.json" lang="zh"></API>

<API src="./checkbox_group.json" lang="zh"></API>
