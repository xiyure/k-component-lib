<template>
  <k-calendar :schedule="[]" adaptive show-lunar>
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✔️' : '' }}
      </p>
    </template>
  </k-calendar>
</template>

<style>
.is-selected {
  color: #1989fa;
}
</style>
