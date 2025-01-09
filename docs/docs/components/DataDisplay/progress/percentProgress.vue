<template>
  <div class="demo-progress">
    <k-progress
      :text-inside="true" :stroke-width="26" :percentage="70"
      class="k-progress--line"
    />
    <k-progress
      :text-inside="true"
      :stroke-width="24"
      :percentage="100"
      status="success"
      class="k-progress--line"
    />
    <k-progress
      :text-inside="true"
      :stroke-width="22"
      :percentage="80"
      status="warning"
      class="k-progress--line"
    />
    <k-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="exception"
      class="k-progress--line"
    />
  </div>
</template>

<style scoped>
.demo-progress .k-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
