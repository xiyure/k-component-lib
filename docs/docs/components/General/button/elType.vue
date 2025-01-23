<template>
  <DocTitle>主要按钮, main</DocTitle>
  <k-button type="primary" main>主要按钮</k-button>
  <k-button type="success" main>成功按钮</k-button>
  <k-button type="info" main>信息按钮</k-button>
  <k-button type="warning" main>警告按钮</k-button>
  <k-button type="danger" main>危险按钮</k-button>

  <DocTitle>次级按钮, secondary</DocTitle>
  <k-button type="primary" secondary>主要按钮</k-button>
  <k-button type="success" secondary>成功按钮</k-button>
  <k-button type="info" secondary>信息按钮</k-button>
  <k-button type="warning" secondary>警告按钮</k-button>
  <k-button type="danger" secondary>危险按钮</k-button>

  <DocTitle>文字按钮, text</DocTitle>
  <k-button color="blue" text>主要按钮</k-button>
  <k-button color="green" text>成功按钮</k-button>
  <k-button color="gray" text>信息按钮</k-button>
  <k-button color="orange" text>警告按钮</k-button>
  <k-button color="red" text>危险按钮</k-button>

  <DocTitle>如果想使用没有边框的icon 按钮, 则需要再 text 中添加图标</DocTitle>
  <k-button color="blue" text>
    <IconSearch />
  </k-button>
  <k-button :loading="true"><IconSearch /></k-button>
  <k-button color="gray" text><IconSearch /></k-button>
  <k-button color="orange" text><IconSearch /></k-button>
  <k-button color="red" text><IconSearch /></k-button>
  <br />
</template>
