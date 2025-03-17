<template>
  <k-button type="primary" @click="open = true" main>Begin Tour</k-button>

  <k-divider />

  <k-space>
    <k-button id="btn1">upload</k-button>
    <k-button id="btn2" type="primary" main>save</k-button>
    <k-button ref="ref3"><IconMore /></k-button>
  </k-space>

  <k-tour v-model="open">
    <k-tour-step
      target="#btn1"
      title="Upload File"
      description="Put you files here."
    />
    <k-tour-step :target="el" title="Save" description="Save your changes" />
    <k-tour-step
      :target="btnRef?.$el"
      title="Other Actions"
      description="Click to see other"
    />
  </k-tour>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const el = () => document.querySelector<HTMLElement>('#btn2')
const btnRef = ref()

const open = ref(false)
</script>
