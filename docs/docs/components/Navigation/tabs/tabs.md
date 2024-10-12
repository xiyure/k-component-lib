---
title: Tabs 标签页
---

# Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

## 基础用法

基础的、简洁的标签页。

Tabs 组件提供了选项卡功能， 默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页。

<preview path="./basic.vue"></preview>

## 卡片风格的标签

你可以设置具有卡片风格的标签。

只需要设置 `type` 属性为 `card` 就可以使选项卡改变为标签风格。

<preview path="./cardStyle.vue"></preview>

## 带有边框的卡片风格

你还可以设置标签页为带有边框的卡片

将 `type` 设置为 `border-card`。

<preview path="./borderCard.vue"></preview>

## 标签位置的设置

可以通过 `tab-position` 设置标签的位置

标签一共有四个方向的设置 `tabPosition="left|right|top|bottom"`

<preview path="./tabPosition.vue"></preview>

## 自定义标签页的内容

可以通过具名插槽来实现自定义标签页的内容

<preview path="./customTab.vue"></preview>

## 动态增减标签页

增减标签页按钮只能在选项卡样式的标签页下使用

<preview path="./dynamicTabs.vue"></preview>

<!-- ## 添加按钮自定义图标


<preview path="./customizedAddButtonIcon.vue"></preview> -->

## 增加标签页触发器自定义

<preview path="./customizedTrigger.vue"></preview>