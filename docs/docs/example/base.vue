<template>
  <div style="height: 500px">
    <KPageTableView
      show-view-bus
      view-bus-title="视图"
      view-bus-info="描述信息"
      view-bus-refresh
      page-icon="IconAomMenuAOMRZColor"
      page-title="用户管理"
      page-info="用户管理页面描述信息"
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
