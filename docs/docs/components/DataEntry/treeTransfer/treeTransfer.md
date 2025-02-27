---
title: TreeTransfer 树形穿梭框
---

# TreeTransfer 树形穿梭框

## 基础用法

TreeTransfer 的数据通过 data 属性传入。 数据需要是一个对象数组，每个对象有以下属性：key(默认为id) 为数据的唯一性标识，label 为显示文本，disabled 表示该项数据是否禁止被操作。

<demo path="./def" />

## 自定义Icon

TreeTransfer组件可以通过以下属性进行自定义设置：expand-icon（展开图标）、expand-icon-color（展开图标颜色）、collapse-icon（收起图标）、collapse-icon-color（收起图标颜色）和 icon（图标样式）。为了提高代码的可读性和维护性，建议将这些属性整合到一个名为 TreeTransferOptions 的对象中。在使用时，您可以根据需要设置这些属性，以实现自定义展示效果。

<demo path="./customIconTreeTransfer" />

## 自定义

可以对列表标题文案、默认选中值、按钮文案等进行自定义。

可以使用 titles、default-data、rightHeader插槽、empty插槽分别对列表标题文案、默认选中值、按钮文案、空数据文案进行自定义。此外，如果希望某些数据项在初始化时就被勾选，可以使用 default-data 属性。 最后，本例还展示了 change 事件的用法。

<demo path="./customTreeTransfer" />

## 拖拽

设置`showDrag`属性为`true`可以开启右侧列表的拖拽功能。

<demo path="./dragTreeTransfer" />

## 多搜索框

设置`searchStrictly`属性为`true`可以开启多搜索框功能。

<demo path="./multiSearchTreeTransfer" />

## 多列表格

在设置`searchStrictly`后，配置`columns`属性可以开启多列表格功能。

<demo path="./multiColumnsTreeTransfer" />

## 指定高度

设置`tableHeight`属性可以指定内容区的高度。

<demo path="./heightTreeTransfer" />

## 分页模式

设置`showPage`为`true`可以开启分页模式。

<demo path="./pageTreeTransfer" />

## API

<API src="./tree_transfer.json" lang="zh"></API>
