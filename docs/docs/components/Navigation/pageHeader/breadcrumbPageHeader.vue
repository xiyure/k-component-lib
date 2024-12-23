<template>
  <k-page-header>
    <template #breadcrumb>
      <k-breadcrumb separator="/">
        <k-breadcrumb-item :to="{ path: './page-header.html' }">
          homepage
        </k-breadcrumb-item>
        <k-breadcrumb-item
          ><a href="./page-header.html">route 1</a></k-breadcrumb-item
        >
        <k-breadcrumb-item>route 2</k-breadcrumb-item>
      </k-breadcrumb>
    </template>
    <template #content>
      <span class="text-large font-600 mr-3"> Title </span>
    </template>
  </k-page-header>
</template>
