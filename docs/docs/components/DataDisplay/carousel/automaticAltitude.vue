<template>
  <div class="block text-center" style="height: 300px">
    <span class="demonstration">each carousel-item has a different height</span>
    <k-carousel height="auto" autoplay>
      <k-carousel-item style="height: 100px" class="k-carousel__item">
        <h3 class="small justify-center" text="2xl">height 100px</h3>
      </k-carousel-item>
      <k-carousel-item style="height: 200px" class="k-carousel__item">
        <h3 class="small justify-center" text="2xl">height 200px</h3>
      </k-carousel-item>
      <k-carousel-item style="height: 300px" class="k-carousel__item">
        <h3 class="small justify-center" text="2xl">height 300px</h3>
      </k-carousel-item>
    </k-carousel>
  </div>
</template>

<style scoped>
.carousel-item {
  color: #475669;
  opacity: 0.75;
  margin: 0;
  text-align: center;
}

.k-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  display: flex;
  align-items: center;
  margin: 0;
  text-align: center;
  height: 100%;
}

.k-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.k-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
