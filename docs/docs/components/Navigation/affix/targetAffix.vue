<template>
  <div class="affix-container">
    <k-affix target=".affix-container" :offset="80">
      <k-button type="primary" main>Target container</k-button>
    </k-affix>
  </div>
</template>
<style scoped>
.affix-container {
  text-align: center;
  height: 400px;
  border-radius: 4px;
  background: #e1f5fe;
}
</style>
