---
title: Upload 上传
---

# Upload 上传

<leadInto name="KUpload" />

通过点击或者拖拽上传文件。

## 基础用法

通过 `slot` 你可以传入自定义的上传按钮类型和文字提示。 可通过设置 limit 和 on-exceed 来限制上传文件的个数和定义超出限制时的行为。 可通过设置 `before-remove` 来阻止文件移除操作。

<demo path="./def" />

## 覆盖前一个文件

设置 `limit` 和 `on-exceed` 可以在选中时自动替换上一个文件。

<demo path="./coverUpload" />

## 用户头像

在 before-upload 钩子中限制用户上传文件的格式和大小。

<demo path="./avatarUpload" />

## 照片墙

使用 `list-type` 属性来设定文件列表的样式。

<demo path="./photoWallUpload" />

## 图片列表缩略图

<demo path="./thumbnailUpload" />

## 上传文件列表控制

通过 `on-change` 钩子函数来对上传文件的列表进行控制。

<demo path="./controlUpload" />

## 拖拽上传

你可以将文件拖拽到特定区域以进行上传。

<demo path="./dragUpload" />

## 手动上传

<demo path="./manualUpload" />

## 自定义图标

设置`success-icon`、`fail-icon`、`remove-icon`可分别定义上传文件成功状态图标、上传文件失败状态图标、移除文件图标。

<demo path="./iconUpload" />

# API

<API src="./upload.json" lang="zh"></API>