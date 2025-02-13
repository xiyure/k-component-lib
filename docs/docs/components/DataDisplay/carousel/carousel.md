---
title: Carousel 走马灯
---

# Carousel 走马灯

在有限空间内，循环播放同一类型的图片、文字等内容

## 基础用法

结合使用 `k-carousel` 和 `k-carousel-item` 标签就得到了一个走马灯。 每一个页面的内容是完全可定制的，把你想要展示的内容放在 `k-carousel-item` 标签内。 默认情况下，在鼠标 `hover` 底部的指示器时就会触发切换。 通过设置 `trigger` 属性为 `click`，可以达到点击触发的效果。

<demo-preview2 path="./def.vue" />

## 指示器

可以将指示器的显示位置设置在容器外部

`indicator-position` 属性定义了指示器的位置。 默认情况下，它会显示在走马灯内部，设置为 `outside` 则会显示在外部；设置为 `none` 则不会显示指示器。

<demo-preview2 path="./indicatorCarousel.vue" />

## 切换箭头

可以设置切换箭头的显示时机

`arrow` 属性定义了切换箭头的显示时机。 默认情况下，切换箭头只有在鼠标 `hover` 到走马灯上时才会显示。 若将 `arrow` 设置为 `always`，则会一直显示；设置为 `never`，则会一直隐藏。

<demo-preview2 path="./switchCarousel.vue" />

## 自动高度

当 `carousel <code>的<code> height` 设置为 `auto`时， `carousel` 的高度将根据子内容的高度自动设置

<demo-preview2 path="./automaticAltitude.vue" />

## 卡片模式

当页面宽度方向空间空余，但高度方向空间匮乏时，可使用卡片风格

将 `type` 属性设置为 `card` 即可启用卡片模式。 从交互上来说，卡片模式和一般模式的最大区别在于，卡片模式可以通过直接点击两侧的幻灯片进行切换。

<demo-preview2 path="./cardModeCarousel.vue" />

## 垂直排列

默认情况下，方向 `direction` 为 水平 `horizontal`。 通过设置 `direction` 为 `vertical` 来让走马灯在垂直方向上显示。

<demo-preview2 path="./verticalCarousel.vue" />

## API

<API src="./carousel.json" lang="zh"></API>

<API src="./carouselItem.json" lang="zh"></API>