---
title: Tour 漫游式引导
---

# Tour 漫游式引导

<leadInto name="KTour" />

用于分步引导用户了解产品功能的气泡组件。 用来引导用户并介绍产品

## 基础用法

最简单的用法。

<demo path="./def.vue" />

## 非模态

使用`:mask="false"`可以将引导变为非模态， 同时为了强调引导本身，建议与 `type="primary"` 组合使用。

<demo path="./nonModal.vue" />

## 位置

改变引导相对于目标的位置，共有 12 种位置可供选择。 当 target 为空时引导将会展示在正中央。

<demo path="./position.vue" />

## 自定义遮罩样式

自定义遮罩样式。

<demo path="./maskStyle.vue" />

## 自定义指示器

自定义指示器。

<demo path="./indicator.vue" />

## 目标

可以传入目标的各种类型的参数。 支持字符串和函数类型。

<demo path="./target.vue" />

## API

<API src="./tour.json" lang="zh"></API>

<API src="./tourStep.json" lang="zh"></API>