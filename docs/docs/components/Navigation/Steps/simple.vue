<template>
  <k-steps
    class="mb-4"
    style="max-width: 600px"
    :space="200"
    :active="1"
    simple
  >
    <k-step title="Step 1" icon="IconEdit" />
    <k-step title="Step 2" icon="IconClearDate" />
    <k-step title="Step 3" icon="IconMenuCollect" />
  </k-steps>

  <k-steps
    style="max-width: 600px" :active="1" finish-status="success"
    simple
  >
    <k-step title="Step 1" />
    <k-step title="Step 2" />
    <k-step title="Step 3" />
  </k-steps>
</template>
