---
title: Pagination 分页
---

# Pagination 分页

当数据量过多时，使用分页分解数据。

## 基础用法

设置layout，表示需要显示的内容，用逗号分隔，布局元素会依次显示。 分页元素如下： `prev` (上一页按钮), `next` (下一页按钮), `pager` (分页列表), `jumper` (跳转), `total` (总计), `sizes` (每页条数选择) 和 -> (every element after this symbol will be pulled to the right).

<demo path="./def.vue" />

## 设置最大页码按钮数

默认情况下，当总页数超过 7 页时，`Pagination` 会折叠多余的页码按钮。 通过 `pager-count` 属性可以设置最大页码按钮数。

<demo path="./MaximumPagination.vue" />

## 带有背景色的分页

设置`background`属性可以为分页按钮添加背景色。

<demo path="./backgroundPagination.vue" />

## 小型分页

在空间有限的情况下，可以使用简单的小型分页。

通过`size`更改大小 这是个 `small`的例子

<demo path="./sizePagination.vue" />

## 当只有一页时隐藏分页

当只有一页时，通过设置 `hide-on-single-page` 属性来隐藏分页。

<demo path="./hidePagePagination.vue" />

## 附加功能

根据场景需要，可以添加其他功能模块。

此示例是一个完整的用例。 使用了 `size-change` 和 `current-change` 事件来处理页码大小和当前页变动时候触发的事件。 `page-sizes`接受一个整数类型的数组，数组元素为展示的选择每页显示个数的选项，`[100, 200, 300, 400]` 表示四个选项，每页显示 100 个，200 个，300 个或者 400 个。

<demo path="./appendPagination.vue" />

## API

<API src="./pagination.json" lang="zh"></API>