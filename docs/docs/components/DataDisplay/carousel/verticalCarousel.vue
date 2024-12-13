<template>
  <p class="text-center demonstration">normal vertical layout</p>
  <k-carousel height="200px" direction="vertical" :autoplay="false">
    <k-carousel-item v-for="item in 4" :key="item" class="k-carousel__item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </k-carousel-item>
  </k-carousel>
  <p class="text-center demonstration">card vertical layout</p>
  <k-carousel
    height="400px"
    direction="vertical"
    type="card"
    :autoplay="false"
  >
    <k-carousel-item v-for="item in 4" :key="item" class="k-carousel__item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </k-carousel-item>
  </k-carousel>
</template>

<style scoped>
.k-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.k-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.k-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
