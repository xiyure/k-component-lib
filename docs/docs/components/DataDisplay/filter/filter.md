---
title: filter 过滤器
---

# filter 过滤器

<leadInto name="KFilter" />

## 基本示例

<demo path="./def.vue" />

## 自定义过滤条件

如果需要自定义自定义过滤条件，可以通过配置项的 `options` 属性配置自定义过滤条件。

<demo path="./multiple_select.vue" />

# 自定义多选过滤

过滤时支持自定义多选，通过配置项的 `multiple` 属性开启多选，支持 `select` 和 `tree-select` 控件类型。

`multiple` 为 `true` 或 `select` 时，将会启用多选 `select` 控件

<demo path="./multiple_select.vue" />

`multiple` 为 `tree-select` 时，将会启用多选 `select` 控件

<demo path="./multiple_tree_select.vue" />

## 格式化日期

配置项的 `dataType` 属性为 `date` 时，可以通过 `date-format` 属性或者配置项的 `valueFormat` 属性格式化日期。

使用 `date-format` 属性全局配置格式化日期

<demo path="./formatDate_global.vue" />

通过配置项的 `valueFormat` 属性为该项单独配置格式化日期

<demo path="./formatDate_item.vue" />


## API

<API src="./filter.json" lang="zh"></API>
