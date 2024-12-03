<template>
  <k-calendar
    :schedule="[]"
    adaptive
    show-lunar
    :range="[new Date(2019, 2, 4), new Date(2019, 2, 24)]"
  />
</template>
