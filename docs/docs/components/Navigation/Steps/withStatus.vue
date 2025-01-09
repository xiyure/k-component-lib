<template>
  <k-steps
    style="max-width: 600px"
    :space="200"
    :active="1"
    finish-status="success"
  >
    <k-step title="Done" />
    <k-step title="Processing" />
    <k-step title="Step 3" />
  </k-steps>
</template>
