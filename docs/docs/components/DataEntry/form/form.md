---
title: Form 表单
---

# Form 表单

<leadInto name="KForm" />

表单包含 `输入框`, `单选框`, `下拉选择`, `多选框` 等用户输入的组件。 使用表单，您可以收集、验证和提交数据。

## 典型表单

最基础的表单包括各种输入表单项，比如`input`、`select`、`radio`、`checkbox`等。

在每一个 `form` 组件中，你需要一个 `form-item` 字段作为输入项的容器，用于获取值与验证值。

<demo path="./basic.vue" />

:::tip

> [W3C](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2) 标准定义:
>
> 当一个表单中只有一个单行文本输入字段时， 浏览器应当将在此字段中按下 Enter （回车键）的行为视为提交表单的请求。 如果希望阻止这一默认行为，可以在 \<k-form> 标签上添加 @submit.prevent。

:::

## 行内表单

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

通过设置 `inline` 属性为 `true` 可以让表单域变为行内的表单域。

<demo path="./inline.vue" />

## 对齐方式

根据你们的设计情况，来选择最佳的标签对齐方式。

<demo path="./alignment.vue" />

## 表单校验

`Form` 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。

<demo path="./validation.vue" />

## 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

本例还使用 `status-icon` 属性为输入框添加了表示校验结果的反馈图标。

<demo path="./customValidation.vue" />

:::tip

自定义的校验回调函数必须被调用。 校验规则参见 [async-validator](https://github.com/yiminghe/async-validator).

:::

## 添加/删除表单项

除了一次通过表单组件上的所有验证规则外. 您也可以动态地通过验证规则或删除单个表单字段的规则。

<demo path="./items.vue" />

## 数字类型验证

数字类型的验证需要在 `v-model` 处加上 `.number` 的修饰符，这是 `Vue` 自身提供的用于将绑定值转化为 `number` 类型的修饰符。

<demo path="./numberValidate.vue" />

## 尺寸控制

表单中的所有子组件都继承了该表单的 `size` 属性。 同样，`form-item` 也有一个 `size` 属性。

如果希望某个表单项或某个表单组件的尺寸不同于 `Form` 上的 `size` 属性，直接为这个表单项或表单组件设置自己的 `size` 属性即可。

<demo path="./sizeControl.vue" />

## 隐藏label

如果不需要显示 `label` 标签，可以设置 `showLabel` 属性为 `false`, 如果需要隐藏单独的 `label` 标签，可以在Item上设置`showLabel` 属性为 `false`。

<demo path="./hideLabel.vue" />

## 隐藏冒号

如果不需要显示冒号，可以设置 `showColon` 属性为 `false`。

<demo path="./hideColon.vue" />

## 嵌套item

<demo path="./nestedItem.vue" />

## 嵌套form

<demo path="./nestedForm.vue" />

## API

<API src="./form.json" lang="zh"></API>

<API src="./form_item.json" lang="zh"></API>
