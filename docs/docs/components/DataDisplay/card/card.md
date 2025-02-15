---
title: card 卡片
---

# Card 卡片

将信息聚合在卡片容器中展示。

## 基础用法

卡片包含标题，内容以及操作区域。

`Card` 组件由 `header` `body` 和 `footer`组成。 `header` 和 `footer`是可选的，其内容取决于一个具名的 `slot`。

<demo path="./basic.vue" />

## 简单卡片

卡片可以只有内容区域。

<demo path="./simple.vue" />

## 有图片内容的卡片

可配置定义更丰富的内容展示。

配置 `body-style` 属性来自定义 `body` 部分的样式。 在这个例子中我们还使用了 `k-col` 组件来布局。

<demo path="./with-images.vue" />

## 带有阴影效果的卡片

你可以定义什么时候展示卡片的阴影效果。

通过 `shadow` 属性设置卡片阴影出现的时机。 该属性的值可以是：`always`、`hover` 或 `never`。

<demo path="./shadow.vue" />

## API

<API src="./card.json" lang="zh"></API>