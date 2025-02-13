---
title: Progress 进度条
---

# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

## 直线进度条

`Progress` 组件设置 `percentage` 属性即可，表示进度条对应的百分比。 该属性必填，并且必须在 `0-100` 的范围内。 你可以通过设置 `format` 来自定义文字显示的格式。

<demo-preview2 path="./def.vue" />

## 进度条内显示百分比标识

百分比不占用额外空间，适用于文件上传等场景。

`Progress` 组件可通过 `stroke-width` 属性更改进度条的高度，并可通过 `text-inside` 属性来改变进度条内部的文字。

<demo-preview2 path="./percentProgress.vue" />

## 自定义进度条的颜色

可以通过 `color` 属性来设置进度条的颜色。 该属性可以接受十六进制颜色值，函数和数组。

<demo-preview2 path="./colorProgress.vue" />

## 环形进度条

`Progress` 组件可通过 `type` 属性来指定使用环形进度条，在环形进度条中，还可以通过 `width` 属性来设置其大小。

<demo-preview2 path="./toroidalProgress.vue" />

## 仪表盘形进度条

您也可以指定 `type` 属性到 `dashboard` 使用控制面板进度栏。

<demo-preview2 path="./appearanceProgress.vue" />

## 自定义内容

通过默认插槽添加自定义内容。

<demo-preview2 path="./customProgress.vue" />

## 动画进度条

使用 `intermediate` 属性来设置不确定的进度， `duration` 来控制动画持续时间。

<demo-preview2 path="./animationProgress.vue" />

## 条纹进度条

通过设置 `striped` 属性获取条纹进度条。 也可以使用 `striped-flow` 属性来使条纹流动起来。 使用`duration` 属性来控制条纹流动的速度。

<demo-preview2 path="./streakProgress.vue" />

## API

<API src="./progress.json" lang="zh"></API>