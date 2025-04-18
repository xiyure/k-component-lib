---
title: Input 输入框
---

# Input 输入框

<leadInto name="KInput" />

通过鼠标或键盘输入内容，是最基础的表单域的包装。

### 基础用法

<demo path="./def.vue" />

### 禁用状态

<demo path="./disable.vue" />

### 一键清空

使用 `clearable` 属性即可得到一个可一键清空的输入框

<demo path="./clearable.vue" />

### 格式化

在 `formatter` 的情况下显示值，我们通常同时使用 `parser`

<demo path="./formatter.vue" />

### 密码框

使用 `show-password` 属性即可得到一个可切换显示隐藏的密码框

<demo path="./password.vue" />

### 带图标的输入框

带有图标标记输入类型

要在输入框中添加图标，你可以简单地使用 `prefix-icon` 和 `suffix-icon` 属性。 另外， `prefix` 和 `suffix` 命名的插槽也能正常工作。

<demo path="./icon.vue" />

### 文本域

用于输入多行文本信息可缩放的输入框。 添加 `type="textarea"` 属性来将 `input` 元素转换为原生的 `textarea` 元素。

文本域高度可通过 `rows` 属性控制

<demo path="./textareaInput.vue" />

### 自适应文本域

设置文字输入类型的 `autosize` 属性使得根据内容自动调整的高度。 你可以给 `autosize` 提供一个包含有最大和最小高度的对象，让输入框自动调整。

<demo path="./autoSizeTextarea.vue" />

### 下拉选择

设置`selectable`属性可以开启下拉选择功能， 并通过 `options` 属性传入选项列表。

<demo path="./selectInput.vue" />

### 前后插槽

可以在输入框中前置或后置一个元素，通常是标签或按钮。

可通过 `slot` 来指定在 `Input` 中分发的前置或者后置的内容。

<demo path="./composite.vue" />

### 尺寸

使用 `size` 属性改变输入框大小。 除了默认大小外，还有另外两个选项： `large`, `small`。

<demo path="./size.vue" />

### 输入长度限制

使用 `maxlength` 和 `minlength` 属性, 来控制输入内容的最大字数和最小字数。 "字符数"使用JavaScript字符串长度来衡量。 为文本或文本输入类型设置 `maxlength` prop可以限制输入值的长度。 允许你通过设置 `show-word-limit` 到 `true` 来显示剩余字数。

<demo path="./length.vue" />

## API

<API src="./input.json" lang="zh"></API>
