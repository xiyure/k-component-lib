---
title: Tree 树形控件
---

# Tree 树形控件

<leadInto name="KTree" />

用清晰的层级结构展示信息，可展开或折叠。

## 基础用法

基础的树形结构展示

<demo path="./def.vue" />

## 可选择

适用于需要选择层级时使用。

本例还展示了动态加载节点数据的方法。

<demo path="./selectTree.vue" />

## 懒加载自定义叶子节点

由于在点击节点时才进行该层数据的获取，默认情况下 Tree 无法预知某个节点是否为叶子节点， 所以会为每个节点添加一个下拉按钮，如果节点没有下层数据，则点击后下拉按钮会消失。 同时，你也可以提前告知 Tree 某个节点是否为叶子节点，从而避免在叶子节点前渲染下拉按钮。

<demo path="./lazyLoadTree.vue" />

## 多次懒加载

加载远程节点数据时，懒加载有时可能失败。 在这种情况下，您可以调用 reject 以保持节点状态，并允许远程加载继续。

<demo path="./lazyLoadFailTree.vue" />

## 禁用复选框

节点的复选框可以设置为禁用。

在示例中，通过 `disabled` 设置禁用状态。 相应的复选框已禁用，不能点击。

<demo path="./disabledTree.vue" />

## 默认展开以及默认选中

树节点可以在初始化阶段被设置为展开和选中。

分别通过 `default-expanded-keys` 和 `default-checked-keys` 设置默认展开和默认选中的节点。 需要注意的是，此时必须设置 `node-key`， 其值为节点数据中的一个字段名，该字段在整棵树中是唯一的。

<demo path="./defaultTree.vue" />

## 树节点的选择

本例展示如何获取和设置选中节点。 获取和设置各有两种方式：通过 `node` 或通过 `key`。 如果需要通过 `key` 来获取或设置，则必须设置 `node-key`。

<demo path="./selectNodeTree.vue" />

## 自定义节点内容

节点的内容支持自定义，可以在节点区添加按钮或图标等内容

可以通过两种方法进行树节点内容的自定义：`render-content` 和 `scoped slot`。 使用 `render-content` 指定渲染函数，该函数返回需要的节点区内容即可。 渲染函数的用法请参考 `Vue` 文档。 使用 `scoped slot` 会传入两个参数 `node` 和 `data`，分别表示当前节点的 `Node` 对象和当前节点的数据。 注意：由于 `JSFiddle` 不支持 `JSX` 语法，所以 `render-content` 示例无法在那里运行。 但是在实际的项目中，只要正确地配置了相关依赖，就可以正常运行。

<demo path="./customContentTree.vue" />

## 自定义节点类名

节点的类名支持自定义。

使用 `props.class` 来建立节点的类名。

<demo path="./customClassTree.vue" />

## 树节点过滤

树节点是可以被过滤的

调用 `Tree` 实例对象的 `filter` 方法来过滤树节点。 方法的参数就是过滤关键字。 需要注意的是，此时需要设置 `filter-node-method` 属性，其值为过滤函数。

<demo path="./filterTree.vue" />

## 手风琴模式

对于同一级的节点，每次只能展开一个

<demo path="./accordionTree.vue" />

## 可拖拽节点

通过 `draggable` 属性可让节点变为可拖拽

<demo path="./draggableTree.vue" />

## 自定义节点图标

通过`icon`，`expand-icon`，`collapse-icon`属性分别可以自定义叶子节点、展开节点、收起节点的图标。
设置`showArrow`为`false`可以隐藏图标

<demo path="./customIconTree.vue" />

## API

<API src="./tree.json" lang="zh"></API>