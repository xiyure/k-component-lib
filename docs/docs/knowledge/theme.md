---
title: 主题
date: 2020-08-8 10:30:00
---

# 主题

`@ksware/ksw-ux` 提供了`AOM`、 `GFAOM`、 `KingAutometa`三种主题, 默认使用`AOM`主题。

```typescript
import kswUx from '@ksware/ksw-ux';

app.use(kswUx, {
  styleModule: 'AOM',
});
```

# 修改全局CSS变量

`@ksware/ksw-ux` 提供了修改全局CSS变量的功能，可以方便的修改主题色、字体大小等。

```typescript
import kswUx from '@ksware/ksw-ux';

app.use(kswUx, {
  cssVariables: {
    '--k-gray-50': 'blue',
  },
});
```

