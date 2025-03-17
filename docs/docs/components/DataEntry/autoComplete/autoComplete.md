---
title: Autocomplete 自动补全输入框
---

# Autocomplete 自动补全输入框

<leadInto name="KAutocomplete" />

根据输入内容提供对应的输入建议。

## 基础用法

`Autocomplete` 组件提供输入建议。

`fetch-suggestions` 属性是返回建议输入的方法。 在此示例中， `querySearch(queryString, cb)` 方法通过 `cb(data)` 给 `Autocomplete` 组件返回建议。

<demo path="./basic.vue" />

## 自定义模板

自定义如何显示输入建议。

使用 `scoped slot` 自定义输入建议。 在这个范围中，你可以使用 `item` 键来访问当前输入建议对象。

<demo path="./autoCompleteTemplate.vue" />

## 远程搜索

从服务端搜索数据。

<demo path="./remote-search.vue" />

## 自定义加载

修改加载区域内容

<demo path="./custom-loading.vue" />

## API

<API src="./autoComplete.json" lang="zh"></API>