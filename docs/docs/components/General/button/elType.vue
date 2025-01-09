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
  <k-button type="primary" text>主要按钮</k-button>
  <k-button type="success" text>成功按钮</k-button>
  <k-button type="info" text>信息按钮</k-button>
  <k-button type="warning" text>警告按钮</k-button>
  <k-button type="danger" text>危险按钮</k-button>

  <DocTitle>如果不想使用没有边框的icon 按钮, 则需要再 text 中添加图标</DocTitle>
  <k-button type="primary" text>
    <IconSearch />
  </k-button>
  <k-button type="success" text><IconSearch /></k-button>
  <k-button type="info" text><IconSearch /></k-button>
  <k-button type="warning" text><IconSearch /></k-button>
  <k-button type="danger" text><IconSearch /></k-button>
  <br />
</template>
