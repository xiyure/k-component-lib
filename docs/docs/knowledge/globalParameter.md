---
title: 全局参数
date: 2020-08-6 10:30:00
---

# 全局参数

`@ksware/ksw-ux` 可以全局修改Vxe Table以及ElementPlus的全局配置。

# Vxe Table 配置

[Vxe Table 的全局配置](https://vxetable.cn/#/start/global)可以通过 `vxeGlobalConfig` 选项进行修改。

```typescript
import kswUx from '@ksware/ksw-ux';
import '@ksware/ksw-ux/kingsware-ui/style.css'

app.use(kswUx, {
  vxeGlobalConfig: {
    table: {
      showHeader: true,
      delayHover: 250,
      autoResize: true,
      minHeight: 144,
    }
  }
});
```

# ElementPlus 配置

[ElementPlus 的全局配置](https://element-plus.org/zh-CN/component/config-provider.html)可以通过 `ElementPlusOptions` 选项进行修改。

```typescript
import kswUx from '@ksware/ksw-ux';
import '@ksware/ksw-ux/kingsware-ui/style.css'

app.use(kswUx, {
  ElementPlusOptions: {
    size:'small',
    zIndex: 200,
    message: {
      duration: 3000,
    }
  }
});
```
