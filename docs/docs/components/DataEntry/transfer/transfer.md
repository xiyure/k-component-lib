---
title: Transfer 穿梭框
---

# Transfer 穿梭框

## 基础用法

Transfer 的数据通过 data 属性传入。 数据需要是一个对象数组，每个对象有以下属性：key 为数据的唯一性标识，label 为显示文本，disabled 表示该项数据是否禁止被操作。 目标列表中的数据项会同步到绑定至 v-model 的变量，值为数据项的 key 所组成的数组。 当然，如果希望在初始状态时目标列表不为空，可以像本例一样为 v-model 绑定的变量赋予一个初始值。

<preview path="./def" />

## 可搜索过滤

在数据很多的情况下，可以对数据进行搜索和过滤。

设置 filterable 为 true 即可开启搜索模式。 默认情况下，若数据项的 label 属性包含搜索关键字，则会在搜索结果中显示。 你也可以使用 filter-method 定义自己的搜索逻辑。 filter-method 接收一个方法，当搜索关键字变化时，会将当前的关键字和每个数据项传给该方法。 若方法返回 true，则会在搜索结果中显示对应的数据项。

<preview path="./searchableFiltering" />

## 自定义

可以对列表标题文案、按钮文案、数据项的渲染函数、列表底部的勾选状态文案、列表底部的内容区等进行自定义。

可以使用 titles、button-texts、render-content 和 format 属性分别对列表标题文案、按钮文案、数据项的渲染函数和列表顶部的勾选状态文案进行自定义。 数据项的渲染还可以使用 scoped-slot 进行自定义。 对于列表底部的内容区，提供了两个具名 slot：left-footer 和 right-footer。 此外，如果希望某些数据项在初始化时就被勾选，可以使用 left-default-checked 和 right-default-checked 属性。 最后，本例还展示了 change 事件的用法。 注意，由于 JSFiddle 不支持 JSX 语法，故该示例无法在 JSFiddle 运行。 但是在实际的项目中，只要正确地配置了相关依赖，就可以正常运行。

<preview path="./customTransfer" />

## 数据项属性别名

默认情况下，Transfer 仅能识别数据项中的 key、label 和 disabled 字段。 如果你的数据的字段名不同，可以使用 props 属性为它们设置别名。

本例中的数据源没有 key 和 label 字段，在功能上与它们相同的字段名为 value 和 desc。 因此可以使用props 属性为 key 和 label 设置别名。

<preview path="./propertyItemAlias" />

## API

<API src="./tree_transfer.json" lang="zh"></API>

