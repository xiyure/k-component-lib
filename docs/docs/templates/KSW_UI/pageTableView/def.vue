<template>
  <div style="height: 500px">
    <KPageTableView
      show-aside
      aside-title="视图"
      aside-descriptions="描述信息"
      aside-refresh
      page-icon="IconAomMenuAOMRZColor"
      page-title="用户管理"
      page-descriptions="用户管理页面描述信息"
    >
      <template #aside>视图的内容插槽</template>
      <template #aside-toolbar>
        <KButton text>默认刷新按钮</KButton>
      </template>
      <template #toolbar>
        <div>
          工具栏插槽
          <KButton main>新增</KButton>
        </div>
      </template>

      <p>页面默认插槽</p>
    </KPageTableView>
  </div>
</template>
