---
title: TreeTransfer 树形穿梭框
---

# TreeTransfer 树形穿梭框

## 基础用法

TreeTransfer 的数据通过 data 属性传入。 数据需要是一个对象数组，每个对象有以下属性：key(默认为id) 为数据的唯一性标识，label 为显示文本，disabled 表示该项数据是否禁止被操作。

<preview path="./def" />

## 自定义Icon

TreeTransfer组件可以通过以下属性进行自定义设置：expand-icon（展开图标）、expand-icon-color（展开图标颜色）、collapse-icon（收起图标）、collapse-icon-color（收起图标颜色）和 icon（图标样式）。为了提高代码的可读性和维护性，建议将这些属性整合到一个名为 TreeTransferOptions 的对象中。在使用时，您可以根据需要设置这些属性，以实现自定义展示效果。

<preview path="./customIconTreeTransfer" />

## 自定义

可以对列表标题文案、默认选中值、按钮文案等进行自定义。

可以使用 titles、default-data、rightHeader插槽、empty插槽分别对列表标题文案、默认选中值、按钮文案、空数据文案进行自定义。此外，如果希望某些数据项在初始化时就被勾选，可以使用 default-data 属性。 最后，本例还展示了 change 事件的用法。

<preview path="./customTreeTransfer" />

## 拖拽

设置`showDrag`属性为`true`可以开启右侧列表的拖拽功能。

<preview path="./dragTreeTransfer" />

## API

<API src="./tree_transfer.json" lang="zh"></API>
