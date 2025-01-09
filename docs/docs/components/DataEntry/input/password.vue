<template>
  <k-form>
    <k-form-item label="密码">
      <KInput
        v-model="input"
        style="width: 240px"
        type="password"
        placeholder="请输入密码"
        show-password
      />
    </k-form-item>
  </k-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const input = ref('');
</script>
