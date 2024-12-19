<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <k-tooltip
        class="box-item"
        effect="dark"
        content="Top Left prompts info"
        placement="top-start"
      >
        <k-button>top-start</k-button>
      </k-tooltip>
      <k-tooltip
        class="box-item"
        effect="dark"
        content="Top Center prompts info"
        placement="top"
      >
        <k-button>top</k-button>
      </k-tooltip>
      <k-tooltip
        class="box-item"
        effect="dark"
        content="Top Right prompts info"
        placement="top-end"
      >
        <k-button>top-end</k-button>
      </k-tooltip>
    </div>
    <div class="row">
      <k-tooltip
        class="box-item"
        effect="dark"
        content="Left Top prompts info"
        placement="left-start"
      >
        <k-button>left-start</k-button>
      </k-tooltip>
      <k-tooltip
        class="box-item"
        effect="dark"
        content="Right Top prompts info"
        placement="right-start"
      >
        <k-button>right-start</k-button>
      </k-tooltip>
    </div>
    <div class="row">
      <k-tooltip
        class="box-item"
        effect="dark"
        content="Left Center prompts info"
        placement="left"
      >
        <k-button class="mt-3 mb-3">left</k-button>
      </k-tooltip>
      <k-tooltip
        class="box-item"
        effect="dark"
        content="Right Center prompts info"
        placement="right"
      >
        <k-button>right</k-button>
      </k-tooltip>
    </div>
    <div class="row">
      <k-tooltip
        class="box-item"
        effect="dark"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <k-button>left-end</k-button>
      </k-tooltip>
      <k-tooltip
        class="box-item"
        effect="dark"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <k-button>right-end</k-button>
      </k-tooltip>
    </div>
    <div class="row center">
      <k-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <k-button>bottom-start</k-button>
      </k-tooltip>
      <k-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <k-button>bottom</k-button>
      </k-tooltip>
      <k-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <k-button>bottom-end</k-button>
      </k-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
