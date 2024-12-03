<template>
  <k-badge :value="12" class="item">
    <k-button>comments</k-button>
  </k-badge>
  <k-badge :value="3" class="item">
    <k-button>replies</k-button>
  </k-badge>
  <k-badge :value="1" class="item" type="primary">
    <k-button>comments</k-button>
  </k-badge>
  <k-badge :value="2" class="item" type="warning">
    <k-button>replies</k-button>
  </k-badge>
  <k-badge :value="1" class="item" color="green">
    <k-button>custom background</k-button>
  </k-badge>
  <k-dropdown trigger="click">
    <template #title>
      <span class="k-dropdown-link">
        Click Me
        <IconArrowRight />
      </span>
    </template>
    <k-dropdown-item class="clearfix">
      comments
      <k-badge class="mark" :value="12" />
    </k-dropdown-item>
    <k-dropdown-item class="clearfix">
      replies
      <k-badge class="mark" :value="3" />
    </k-dropdown-item>
  </k-dropdown>
</template>

<script lang="ts" setup></script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 30px;
}

.k-dropdown {
  margin-top: 1.1rem;
}
</style>
