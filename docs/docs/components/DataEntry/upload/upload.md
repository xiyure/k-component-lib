---
title: Upload 上传
---

# Upload 上传

通过点击或者拖拽上传文件。

## 基础用法

通过 `slot` 你可以传入自定义的上传按钮类型和文字提示。 可通过设置 limit 和 on-exceed 来限制上传文件的个数和定义超出限制时的行为。 可通过设置 `before-remove` 来阻止文件移除操作。

<preview path="./def" />

## 覆盖前一个文件

设置 `limit` 和 `on-exceed` 可以在选中时自动替换上一个文件。

<preview path="./coverUpload" />

## 用户头像

在 `before-upload` 钩子中限制用户上传文件的格式和大小。

🚧 待完善

# API

<API src="./upload.json" lang="zh"></API>