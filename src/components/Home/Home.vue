<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// audo slide
import { onMounted } from 'vue'

onMounted(() => {
  const carousel = document.querySelector('#carouselExampleControls')
  const carouselInstance = new bootstrap.Carousel(carousel, {
    interval: 2000
  })
})

</script>

<template>
  <div>
    <!-- <img src="@/assets/logo.svg" alt="logo" /> -->
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/slideshow_1.webp" class="d-block w-100">
        </div>
        <div class="carousel-item">
          <img src="@/assets/slideshow_3.webp" class="d-block w-100">
        </div>
        <div class="carousel-item">
          <img src="@/assets/slideshow_5.webp" class="d-block w-100">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
#carouselExampleControls {
  width: 100vw;
}

.carousel-inner {
  width: 100vw;
}

.carousel-item {
  width: 100vw;
}

.carousel-item img {
  width: 100vw;
  height: 82.85vh;
}
</style>
