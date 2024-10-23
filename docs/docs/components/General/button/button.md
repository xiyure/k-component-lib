---
title: Button 按钮
date: 2021-03-11
---

# Button 按钮

常用的操作按钮。

## 基础用法

本组件库注重业务区分, 所以按钮 api 使用与 el 有些许不同, 首先按钮类型分别为:

- 普通按钮:
  > 默认状态, 常用用于不会产生数据的操作;
- 主要按钮:
  > 模块中一般只存在一个, 用于重要操作;
- 次级按钮
  > 模块中可以有多个, 用户产生数据的操作;
- 文字按钮
  > 一般用于链接, 或者表格中使用;
- icon按钮
  > 一般用于节省空间的情景。

<preview path="./def.vue" />

## disabled

<preview path="./btnDisabled.vue" />

## 彩色图标

首先明确 **普通按钮** 不支持染色, 增加颜色的方式有两种:

### 方式 1, type

使用 type, 此 api 参数兼容 el 预设, 如: primary, success, info, warning, danger

<preview path="./elType.vue" />

### 方式 2, color

自定义合规字符串, 如:

- 16 进制颜色 : #ff5500
- css 预设颜色: red
- el, type 颜色: primary...

<preview path="./btnColor.vue" />

## 左右图标插槽

### 方式一, api

<preview path="./btnIcon.vue" />

### 方式二, 插槽

<preview path="./btnIcon2.vue" />

## 不同尺寸(size)

size 提供三个尺寸: sm、base(def)、lg 。

<preview path="./btnSize.vue" />

## API

<API src="./button.json" lang="zh"></API>
