---
title: DateTimePicker 日期时间选择器
---

# DateTimePicker 日期时间选择器

在同一个选择器里选择日期和时间

:::tip

日期时间选择器来自日期选择器和时间选择器的组合。 关于属性的更详细解释，请参阅日期选择器和时间选择器。

:::

## 日期和时间点

通过设置`type`属性为`datetime`，即可在同一个选择器里同时进行日期和时间的选择。 快捷方式的使用方法与 `Date Picker` 相同。

<demo path="./date-and-time" />

## 日期时间格式

使用`format`指定输入框的格式。 使用value-format指定绑定值的格式。

默认情况下，组件接受并返回`Date`对象。

在 [这里](https://day.js.org/docs/en/display/format#list-of-all-available-formats) 查看 `Day.js` 支持的所有格式。

:::warning

请一定要注意传入参数的大小写是否正确

:::

<demo path="./date-and-time-formats" />

## 下拉列表中的日期和时间格式

使用 `date-format` 和 `time-format` 控制下拉列表面板输入框中显示的文本格式

<demo path="./date-and-time-formats-panel" />

## 日期和时间范围

设置`type`为`datetimerange`即可选择日期和时间范围

<demo path="./date-and-time-range" />

## 默认的起始与结束时刻

使用`datetimerange`进行范围选择时，在日期选择面板中选定起始与结束的日期，默认会使用该日期的00:00:00作为起始与结束的时刻；通过选项`default-time`可以控制选中起始与结束日期时所使用的具体时刻。 我们可以使用 `default-time` 属性来控制它。 `default-time`接受一个数组，其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。 第一项控制开始日期的时间值，第二项控制结束日期的时间值。

<demo path="./default-time" />


## 自定义图标

使用插槽自定义图标。

<demo path="./custom-icon" />

## API

<API src="./date_time_picker.json" lang="zh"></API>