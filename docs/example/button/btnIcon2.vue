<template>
  <div>
    <k-button iconLeft="IconAdd">
      <template #iconLeft>
        <IconAdd />
      </template>
      左侧 icon
    </k-button>
    <k-button iconLeft="IconAdd">
      右侧 icon
      <template #iconRight>
        <IconArrowBottom />
      </template>
    </k-button>
  </div>
</template>
