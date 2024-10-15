---
title: DatePicker 日期选择器
---

# DatePicker 日期选择器

用于选择或输入日期

## 选择某一天

以”日“为基本单位，基础的日期选择控件

基本单位由 type 属性指定。 通过 shortcuts 配置快捷选项， 通过 disabledDate 函数，来设置禁用掉的日期。

<preview path="./enter-date" />

## 其他日期单位

通过扩展基础的日期选择，可以选择周、月、年或多个日期

<preview path="./other-measurements" />

## 选择一段时间

你可以通过如下例子来学习如何设置一个日期范围选择器。

在选择日期范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前月份，可以使用 `unlink-panels` 属性解除联动。

<preview path="./date-range" />


## 选择月份范围

你当然还可以选择一个月的范围。

在选择月份范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前年份，可以使用 `unlink-panels` 属性解除联动。

<preview path="./month-range" />

## 年份范围

你可以通过如下例子来学习如何设置一个年份范围选择器。

在选择范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前年份，可以使用 unlink-panels 属性解除联动。

<preview path="./year-range" />

## 默认值

日期选择器会在用户未选择任何日期的时候默认展示当天的日期。 你也可以使用 `default-value` 来修改这个默认的日期。 请注意该值需要是一个可以解析的 `new Date()` 对象。

如果类型是 `daterange`, `default-value` 则会设置左边窗口的默认值。

<preview path="./default-value" />

## 日期格式

使用`format`指定输入框的格式。 使用 `value-format` 指定绑定值的格式。

默认情况下，组件接受并返回`Date`对象。

在 [这里](https://day.js.org/docs/en/display/format#list-of-all-available-formats) 查看 Day.js 支持的所有格式。

:::warning

请一定要注意传入参数的大小写是否正确

:::

<preview path="./date-formats" />

## 默认显示日期

在选择日期范围时，你可以指定起始日期和结束日期的默认时间。

默认情况下，开始日期和结束日期的时间部分都是选择日期当日的 `00:00:00`。 通过 `default-time` 可以分别指定开始日期和结束日期的具体时刻。 它接受最多两个日期对象的数组。 其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。

<preview path="./default-time" />

## 设置自定义前缀的内容

前缀内容可以被自定义。

当你从其他`vue`组件或由渲染函数生成的组件中导入组件时, 你可以设置 `prefix-icon` 属性来定制前缀内容

<preview path="./custom-prefix-icon" />

## 自定义内容

弹出框的内容是可以自定义的，在插槽内你可以获取到当前单元格的数据 请注意，自定义内容结构应与默认结构一致，否则可能风格会不一致。

<preview path="./custom-content" />

## 自定义图标

使用插槽自定义图标。

<preview path="./custom-icon" />

更详细的数据类型，请查看下表:

```ts
interface DateCell {
  column: number
  customClass: string
  disabled: boolean
  end: boolean
  inRange: boolean
  row: number
  selected: Dayjs
  isCurrent: boolean
  isSelected: boolean
  start: boolean
  text: number
  timestamp: number
  date: Date
  dayjs: Dayjs
  type: 'normal' | 'today' | 'week' | 'next-month' | 'prev-month'
}
```

## API

🚧 施工中