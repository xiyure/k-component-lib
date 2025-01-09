<template>
  <k-space wrap>
    <k-card
      v-for="i in 3" :key="i" class="box-card"
      style="width: 250px"
    >
      <template #header>
        <div class="card-header">
          <span>Card name</span>
          <k-button class="button" text>Operation button</k-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ 'List item ' + o }}
      </div>
    </k-card>
  </k-space>
</template>
