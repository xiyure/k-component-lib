---
title: Radio 单选框
---

# Radio 单选框

在一组备选项中进行单选

## 基础用法

单选框不应该有太多的可选项， 如果你有很多的可选项你应该使用选择框而不是单选框。

要使用 `Radio` 组件，只需要设置`v-model`绑定变量， 选中意味着变量的值为相应 `Radio value`属性的值， `value`可以是`String`、`Number` 或 `Boolean`。

<demo-preview2 path="./basic.vue" />

## 自定义颜色

使用`color`属性可以自定义单选框的颜色。

<demo-preview2 path="./colorRadio.vue" />

## 禁用状态

`disabled` 属性可以用来控制单选框的禁用状态。

你只需要为单选框设置 `disabled` 属性就能控制其禁用状态。

<demo-preview2 path="./disabled.vue" />

## 单选框组

适用于在多个互斥的选项中选择的场景

结合`k-radio-group`元素和子元素`k-radio`可以实现单选组， 为 `k-radio-group` 绑定 `v-model`，再为 每一个 `k-radio` 设置好 `label` 属性即可， 另外，还可以通过 `change` 事件来响应变化，它会传入一个参数 `value` 来表示改变之后的值。

<demo-preview2 path="./radioButtonGroup.vue" />

## 按钮样式

你可以让单选框看起来像一个按钮一样。

只需要添加`button`属性即可， 此外，还提供了 size 属性用来控制单选框的大小。

<demo-preview2 path="./buttonStyle.vue" />

## API

<API src="./radio.json" lang="zh"></API>

<API src="./radio_group.json" lang="zh"></API>
