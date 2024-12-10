---
title: TimeSelect 时间选择
---

# TimeSelect 时间选择

用于选择或输入日期

可用时间范围是 00:00-23:59

## 固定时间点

提供几个固定的时间点供用户选择

使用 el-time-select 标签，然后通过start、end和step指定起始时间，结束时间和步长。

<preview path="./immobilizationTime" />

## 时间格式

使用 format 属性来控制时间格式 (小时以及分钟)。

在 [这里](https://day.js.org/docs/zh-CN/display/format) 查看 Day.js 支持的 format 参数。

:::warning
请一定要注意传入参数的大小写是否正确
:::

<preview path="./timeFormat" />

## 固定时间范围

如果先选中了开始（或结束）时间，则结束（或开始）时间的状态也将会随之改变。

<preview path="./timeRang" />