<template>
  <div style="height: 500px">
    <KPageTableView
      showViewBus
      viewBusTitle="视图"
      viewBusInfo="描述信息"
      viewBusRefresh
      pageIcon="IconAomMenuAOMRZColor"
      pageTitle="用户管理"
      pageInfo="用户管理页面描述信息"
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
