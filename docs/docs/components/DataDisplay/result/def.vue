<template>
  <k-row>
    <k-col :sm="12" :lg="6">
      <k-result icon="success" title="Success Tip">
        <template #icon><IconStepStatusSuccess /></template>
        <template #extra>
          <k-button type="primary" main>Back</k-button>
        </template>
      </k-result>
    </k-col>
    <k-col :sm="12" :lg="6">
      <k-result title="Warning Tip">
        <template #icon><IconWarning /></template>
        <template #extra>
          <k-button type="primary" main>Back</k-button>
        </template>
      </k-result>
    </k-col>
    <k-col :sm="12" :lg="6">
      <k-result icon="error" title="Error Tip">
        <template #icon><IconForbid /></template>
        <template #extra>
          <k-button type="primary" main>Back</k-button>
        </template>
      </k-result>
    </k-col>
    <k-col :sm="12" :lg="6">
      <k-result icon="info" title="Info Tip">
        <template #icon><IconStatusInfo /></template>
        <template #extra>
          <k-button type="primary" main>Back</k-button>
        </template>
      </k-result>
    </k-col>
  </k-row>
</template>
