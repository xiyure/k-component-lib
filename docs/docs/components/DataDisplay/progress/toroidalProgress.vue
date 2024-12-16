<template>
  <div class="demo-progress">
    <k-progress class="k-progress--circle" type="circle" :percentage="0" />
    <k-progress class="k-progress--circle" type="circle" :percentage="25" />
    <k-progress class="k-progress--circle" type="circle" :percentage="100" status="success" />
    <k-progress class="k-progress--circle" type="circle" :percentage="70" status="warning" />
    <k-progress class="k-progress--circle" type="circle" :percentage="50" status="exception" />
  </div>
</template>
<style scoped>
.demo-progress .k-progress--circle {
  margin-right: 15px;
}
</style>
