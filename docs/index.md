---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "ksw-ux"
  # text: "基于 Element-Plus 的 UI 组件库"
  tagline: 助力设计开发者「更灵活」地搭建出「更美」的产品，让用户「快乐工作」～
  actions:
    - theme: brand
      text: 快速开始
      link: /docs/introduce
    - theme: alt
      text: API 文档
      link: /api
  image:
    src: /assets/home.png

features:
  - icon: 
      src: /assets/designValues.svg
    title: 设计价值观
    details: 确定性、意义感、生长性、自然
  - icon:
      src: /assets/designGuidelines.svg
    title: 设计指引
    details: 全局样式、设计模式
  - icon: 
      src: /assets/componentLibrary.svg
    title: 组件库
    details: KSW Design of Vue
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

.VPFeature {
  background-color: rgb(255 255 255 / 16%) !important;
  box-shadow: 2px 4px 12px #00000014;
  backdrop-filter: blur(24px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>