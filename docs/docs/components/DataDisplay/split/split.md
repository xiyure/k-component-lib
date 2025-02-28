---
title: Split 分割线
---

# Split 分割线

用于分割面板内容。

## 基础用法

使用`v-model`指定初始分割比例。

<demo path="./def.vue" />

## 横纵方向

使用`direction`指定分割线方向。

<demo path="./direction.vue" />

## 容器类型

使用`component`指定容器类型。

<demo path="./componentSplit.vue" />

## 自定义初始化比例

在不使用`v-model`指定初始分割比例，可使用`defaultSize`设置面板初始分割比例。

<demo path="./customSize.vue" />

## 限制拖动范围

使用`min`和`max`限制拖动范围。

<demo path="./limitSplit.vue" />

## 禁用拖动

使用`disabled`禁止拖动

<demo path="./disabledSplit.vue" />

## 自定义分割线

使用`triggerIcon`自定义分割线图标。

<demo path="./customSplit.vue" />

## 隐藏图标

使用`showTrigger`隐藏分割线图标。

<demo path="./hideSplit.vue" />

## API

<API src="./split.json" lang="zh"></API>