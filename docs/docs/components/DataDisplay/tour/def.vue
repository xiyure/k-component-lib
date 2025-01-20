<template>
  <k-button type="primary" @click="open = true" main>Begin Tour</k-button>

  <k-divider />

  <k-space>
    <k-button ref="ref1">upload</k-button>
    <k-button ref="ref2" type="primary" main>save</k-button>
    <k-button ref="ref3"><IconMore /></k-button>
  </k-space>

  <k-tour v-model="open">
    <k-tour-step :target="ref1?.$el" title="Upload File">
      <k-image
        style="width: 100px; height: 100px"
        src="../../../../public/klogo.svg"
        alt="tour.png"
      />
      <div>Put you files here.</div>
    </k-tour-step>
    <k-tour-step :target="ref2?.$el" title="Save" description="Save your changes" />
    <k-tour-step :target="ref3?.$el" title="Other Actions" description="Click to see other" />
  </k-tour>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const ref1 = ref();
const ref2 = ref();
const ref3 = ref();

const open = ref(false);
</script>
