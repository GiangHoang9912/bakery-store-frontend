<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="contact">
      <p>19001009</p>
      <p>darlith@gmail.com</p>
      <button>Đăng nhập</button>
      <button>Đăng ký</button>
    </div>
    <nav>
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
}

.router-link {
  font-size: 1.25rem;
}
</style>
