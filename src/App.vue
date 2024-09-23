<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="contact">
      <p>19001009</p>
      <p>darlith@gmail.com</p>
      <RouterLink class="router-link" to="/login">Đăng nhập</RouterLink>
      <RouterLink class="router-link" to="/register">Đăng ký</RouterLink>
    </div>
    <nav class="menu">
      <RouterLink class="router-link" id="store-name" to="/">Thùy Phạm mooncake</RouterLink>
      <RouterLink class="router-link" to="/">Trang chủ</RouterLink>
      <RouterLink class="router-link" to="/products">Sản phẩm</RouterLink>
      <RouterLink class="router-link" to="/orders">Đơn hàng</RouterLink>
      <RouterLink class="router-link" to="/contact">Liên hệ</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  background-color: #BC9669;
  height: 15vh;
}

#store-name {
  font-size: 1.875rem;
  font-weight: bold;
  text-decoration: none;
}

nav {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
}

nav a {
  text-decoration: none;
  color: #000;
}

.contact {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}

.contact p {
  margin: 0 1rem;
  color: #000;
  text-decoration: none;
}

.router-link {
  font-size: 1.25rem;
  text-decoration: none;
  color: #000;
}

.contact .router-link {
  margin: 0 1rem;
  font-size: 1rem;
}

.menu .router-link {
  padding-bottom: 1rem;
}
</style>
