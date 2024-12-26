---
title: Rate 评分
---

# Rate 评分

用于评分

## 基础用法

评分默认被分为三个等级，可以利用颜色数组对分数及情感倾向进行分级（默认情况下不区分颜色）。 三个等级所对应的颜色用 `colors` 属性设置，而它们对应的两个阈值则通过 `low-threshold` 和 `high-threshold` 设定。

<preview path="./basic" />

## 尺寸

<preview path="./sizes" />

## 允许半选

属性 `allow-half` 允许出现半星

<preview path="./allow-half" />

## 辅助文字

用辅助文字直接地表达对应分数

为组件设置 `show-text` 属性会在右侧显示辅助文字。 通过设置 `texts` 可以为每一个分值指定对应的辅助文字。 `texts` 为一个数组，长度应等于最大值 max。

<preview path="./text-usage" />

## 可清空

当你再次点击相同的值时，可以将值重置为 `0`。

<preview path="./clearable" />

## 更多种类的图标

当有多层评价时，可以用不同类型的图标区分评分层级。

设置`icons`属性可以自定义不同分段的图标。 若传入数组，共有 `3` 个元素，为 `3` 个分段所对应的类名；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名。 本例还使用 `void-icon` 指定了未选中时的图标类名。

<preview path="./more-icons" />

## 只读

只读的评分用来展示分数， 允许出现半星。

为组件设置 `disabled` 属性表示组件为只读。 此时若设置 `show-score`，则会在右侧显示目前的分值。 此外，您可以使用属性 `score-template` 来提供评分模板。 模板为一个包含了 `{value}` 的字符串，`{value}` 会被替换为当前分值。

<preview path="./readonly" />

## API

<API src="./rate.json" lang="zh"></API>