---
title: ScriptInput 脚本输入框
---

# ScriptInput 脚本输入框

<leadInto name="KScriptInput" />

## 基础用法

<demo path="./def" />

## 自定义模式切换按钮

调用`toggleMode`方法可切换输入框模式, 通过手动改变`show-mode-switch`属性可控制切换模式功能是否显示。

<demo path="./switchMode" />

## 自定义下拉框按钮

调用`showPopper`方法可控制下拉框显示与隐藏, 通过手动改变`show-popper-switch`属性可控制按钮是否显示。

<demo path="./treeBtn" />

## 自定义脚本key

设置`script-key`属性可自定义Key值。

<demo path="./customKey" />

## 树形列表

使用`use-tree`属性可开启树形列表模式, 并通过`tree-config`属性传入树形数据配置。

<demo path="./treeScriptInput" />

## 前后插槽

可以在输入框中前置或后置一个元素，通常是标签或按钮。
可通过 slot 来指定在 Input 中分发的前置或者后置的内容。

<demo path="./prepend" />

## 密码输入框

设置`show-password`属性为`true`即可开启密码输入框模式。

<demo path="./password" />

## 唯一值模式

设置`only-one-input`属性为`true`即可开启只允许输入一个值。

<demo path="./unique" />

## 禁用状态

设置`disabled`属性为`true`即可禁用输入框。

<demo path="./disabled" />

## 文本校验

设置`check-content-type`属性为`true`即可限制输入框只能输入`content-type`指定类型。

`content-type`可以选择`string（是否是字符串）`、`boolean（是否是布尔值）`、`number（是否是数字）`、`tooltip（变量名是否合规）`等值

<demo path="./validate" />

## 自定义高度

<demo path="./heightScriptInput" />

## 禁用选项重复选择

设置`option-repeatable`属性为`false`即可禁止同一选项多次选择。

<demo path="./repeatable" />

## API

<API src="./scriptInput.json" lang="zh"></API>