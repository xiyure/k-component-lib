---
title: calendar 日历
---

# Calendar 日历

<leadInto name="KCalendar" />

显示日期

## 基础用法

设置 `value` 来指定当前显示的月份。 如果 `value` 未指定，则显示当月。 `value` 支持 `v-model` 双向绑定。

<demo path="./def.vue" />

## 自定义内容

通过设置名为 `date-cell` 的 `scoped-slot` 来自定义日历单元格中显示的内容。 在 `scoped-slot` 可以获取到 `date`（当前单元格的日期）, `data`（包括 `type，isSelected，day` 属性）。 详情解释参考下方的 `API` 文档。

<demo path="./customizeCalendar.vue" />

## 日历范围

设置 `range` 属性指定日历的显示范围。 开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月。

<demo path="./rangeCalendar.vue" />

## 自定义日历头部

<demo path="./CustomizeTheCalendarHeader.vue" />

## 自定义农历

设置 `show-lunar` 属性指定是否显示农历日历。

<demo path="./lunarCalendar.vue" />

## 自定义日程表

设置 `schedule` 属性指定日程表数据。

<demo path="./scheduleCalendar.vue" />

## API

<API src="./calendar.json" lang="zh"></API>
