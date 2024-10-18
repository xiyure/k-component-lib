<template>
  <div>
    <k-button icon-left="IconAdd">
      <template #iconLeft>
        <IconAdd />
      </template>
      左侧 icon
    </k-button>
    <k-button icon-left="IconAdd">
      右侧 icon
      <template #iconRight>
        <IconArrowBottom />
      </template>
    </k-button>
  </div>
</template>
