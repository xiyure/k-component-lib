---
title: Steps 步骤条
---

# Steps 步骤条

引导用户按照流程完成任务的分步导航条， 可根据实际应用场景设定步骤，步骤不得少于 2 步。

## 基础用法

简单的步骤条。

设置 `active` 属性，接受一个 `Number`，表明步骤的 `index`，从 `0` 开始。 需要定宽的步骤条时，设置 `space` 属性即可，它接受 `Number`， 单位为 `px`， 如果不设置，则为自适应。 设置 `finish-status` 属性可以改变已经完成的步骤的状态。

<preview path="./basic.vue" />

## 含状态的步骤条

每一步骤显示出该步骤的状态。

也可以使用 `title` 具名插槽，可以用 `slot` 的方式来取代属性的设置， 在本文档最后的列表中有所有的插槽可供参考。

<preview path="./withStatus.vue" />

## 居中的步骤条

标题和描述可以居中。

<preview path="./centered.vue" />

## 带描述的步骤栏

每一步都有描述。

<preview path="./withDescription.vue" />

## 带图标的步骤条

可以在步骤栏中使用各种自定义图标。

通过 `icon` 属性来设置图标， 图标的类型可以参考 `Icon` 组件的文档， 除此以外，还能通过具名 `slot` 来使用自定义的图标。

<preview path="./withIcon.vue" />

## 垂直的步骤条

垂直方向的步骤条。

只需要在 `k-steps` 元素中设置 `direction` 属性为 `vertical` 即可。

<preview path="./vertical.vue" />

## 简洁风格的步骤条

设置 `simple` 可应用简洁风格，该条件下 `align-center` / `description` / `direction` / `space` 都将失效。

<preview path="./simple.vue" />

## API

<API src="./steps.json" lang="zh"></API>

<API src="./step.json" lang="zh"></API>
