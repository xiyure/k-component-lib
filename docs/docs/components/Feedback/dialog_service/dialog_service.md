---
title: DialogService 函数式弹窗
---

# DialogService 函数式弹窗

<leadInto name="showDialog" />

### 基础用法

<demo path="./def.vue" />

### 自定义弹窗内容

<demo path="./custom_base.vue" />

使用自定义内容时，可以通过插槽参数获取内容ref实例、弹窗数据以及关闭弹窗的 `close` 方法（如果使用了内置表单，则ref为表单实例，同时表单数据也会通过插槽参数传递出来）。

<demo path="./custom.vue" />

### 使用内置表单

::: warning ⚠️ 注意
`slots.default` 不能与 `formItems`参数不能同时设置
:::

配置 `formItems` 参数，可以快速生成一个内置表单， 同时可以设置 `formAttrs` 参数来设置表单参数。
<demo path="./default_form.vue" />

内置表单+默认底部按钮时， 可以通过 `confirm` 和 `cancel` 设置按钮触的回调函数。

<demo path="./default_callback.vue" />

## API

<API src="./dialog_service.json" lang="zh"></API>