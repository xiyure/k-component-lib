---
title: Icon 图标
date: 2021-03-12
---

# Icon 图标

[Ksw vue icon](https://sengoku-f.github.io/KSW-vue-icon/) 图标库是一个通过技术驱动矢量图标样式的图标库产品，可以实现根据单一SVG源文件导出为 Vue3 组件代码，打通 Design to Code 链路，实现产品、研发、设计师一站式对接，使用更高效。

## 使用方法

### 安装

使用图标组件，你需要安装 [ksw-vue-icon](https://www.npmjs.com/package/ksw-vue-icon) 图标组件包：

::: code-group

```sh [npm]
npm install -D ksw-vue-icon
```

```sh [yarn]
yarn add -D ksw-vue-icon
```

```sh [pnpm]
pnpm install -D ksw-vue-icon
```

```sh [bun]
bun add -D ksw-vue-icon
```

:::

### 按需引用图标

从组件顶部的 `ksw-vue-icon` 导入一个图标，然后在模板标签中使用它：

```js:line-numbers
// 引用
import { IconName } from 'ksw-vue-icon'

// 使用
<IconName :size="24" color="#333" />
```

### 引入样式

导入图标样式（整个项目只需1次）:

```js:line-numbers
import 'ksw-vue-icon/styles/icon.css';
```

### 全局注册图标

我们建议按需加载图标，因为这样可以大大减少编译代码量。但是在一些类似远程加载菜单的场景下，直接引用所有图标可以减少开发成本。

```js:line-numbers
import { KswIcon } from 'ksw-vue-icon'
Vue.use(KswIcon)
```

### 项目用法 <k-tag type="primary" round>^2.3.0</k-tag>

::: tip
自 `2.3.0` 版本起图标库支持 `Vue.ues` 传入项目名称来使用项目图标
:::

你可以在 `Vue.ues` 方法传入项目名称来使用项目图标库扩充基本图标库。项目图标的优先级大于基本图标。

例如下方的示例使用广发 `Guangfa` 来扩充基本图标库

```js
Vue.use(KswIcon, { projectName: "Guangfa" });
```

| projectName  | 备注                     | 
| --------- | -------------------------- |
| Base      |  基本图标库       |
| Guangfa     | 广发图标库 |

## 代码演示

### 基本用法

从组件顶部的 `ksw-vue-icon` 导入一个图标，然后在模板标签中使用它，也可以通过设置 spin 属性来实现动画旋转效果。

<IconSearch />
<IconSettingFill color="#3491FA" />
<IconArrowTop />
<IconRefresh :spin="true" />
<IconArrowTop :rotate="180" />
<IconLoading />

<!-- ::: details 点我查看代码 -->

```js:line-numbers
import {
  IconSearch,
  IconSettingFill,
  IconRefresh,
  IconArrowTop,
  IconLoading
} from "ksw-vue-icon";

<IconSearch />
<IconSettingFill color="#3491FA" />
<IconArrowTop />
<IconRefresh :spin="true" />
<IconArrowTop :rotate="180" />
<IconLoading />
```

<!-- ::: -->

### SVG Script

图标库支持 SVG 中的 `script` 脚本元素，因此可以通过 `javascript` 来修改 SVG 元素，来为图标设置动画或形状。

下方的示例演示了 SVG Script 标签的作用。在代码中，我们使用 JavaScript 改变 SVG `<text>` 元素的内容。这样我们就能获得一个始终显示当前日期的日历图标。

<IconCalendarColor :size="128" />

::: details 点我查看代码

```html:line-numbers {3-22}
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" onload="init()" aria-hidden="true"
  viewBox="0 0 24 24">
  <script type="text/javascript">
    function init() {
      try {
          var time = new Date();
          var locale = "zh-cn";

          var DD = time.getDate();
          var MMM = time.toLocaleString(locale, { month: "short" }).toUpperCase();

          document.querySelectorAll("[data-id-feda7348='day']").forEach(function(elem) {
              elem.textContent = DD;
          });
          document.querySelectorAll("[data-id-feda7348='month']").forEach(function(elem) {
              elem.textContent = MMM;
          });
      } catch (error) {
          console.error("An error occurred:", error);
      }
    }
  </script>
  <defs>
    <linearGradient id="42e69816_master_svg1_732_94332" x1=".5" x2=".5" y1="0" y2="1">
      <stop offset="0%" stop-color="#FCFCFB"></stop>
      <stop offset="100%" stop-color="#F0EEE7"></stop>
    </linearGradient>
    <clipPath id="42e69816_master_svg0_732_92815">
      <rect width="24" height="24" rx="0"></rect>
    </clipPath>
  </defs>
  <path fill="#F53F3F" d="M2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v3H2Z"></path>
  <path fill="url(#42e69816_master_svg1_732_94332)" d="M2 8h20v10a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z"></path>
  <text x="50%" y="6.75" data-id-feda7348="month"
    style="font-size: 4px; font-weight: 600; fill: rgb(255, 255, 255); text-anchor: middle;">7月</text>
  <text x="50%" y="15.5" data-id-feda7348="day"
    style="font-size: 12px; fill: rgb(38, 38, 38); text-anchor: middle; dominant-baseline: middle;">5</text>
</svg>
```

:::

## 图标列表

<iframe class="iframe-container" src="https://sengoku-f.github.io/KSW-vue-icon/iframe" />

## API

| 参数       | 说明                       | 类型                       | 默认值         |
| ---------- | -------------------------- | -------------------------- | -------------- |
| **size**   | 图标的大小，宽高相同       | `number` &#124; `string`   | `1em`          |
| **color**  | 图标的颜色，默认为当前颜色 | `string` &#124; `string[]` | `currentColor` |
| **rotate** | 图标旋转角度（IE9 无效）   | `number`                   | `-`            |
| **spin**   | 给图标加旋转动画           | `boolean`                  | `false`        |


<style scoped>
h3{
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.iframe-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  width: 100%;
  height: 82vh;
}
</style>
