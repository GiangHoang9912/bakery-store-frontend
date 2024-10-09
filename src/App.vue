<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import emitter from './eventBus'

const isLoggedIn = ref(false)
const fullname = ref('')
const router = useRouter()

onMounted(() => {
  checkLoginStatus()
  emitter.on('login', checkLoginStatus)
})

function checkLoginStatus() {
  const userString = localStorage.getItem('user')
  if (userString) {
    const user = JSON.parse(userString)
    isLoggedIn.value = true
    fullname.value = user.fullname
  } else {
    isLoggedIn.value = false
    fullname.value = ''
  }
}

function logout() {
  localStorage.removeItem('user')
  isLoggedIn.value = false
  fullname.value = ''
  router.push('/')
}
</script>

<template>
  <header>
    <div class="contact">
      <p>19001009</p>
      <p>darlith@gmail.com</p>
      <template v-if="!isLoggedIn">
        <RouterLink class="router-link" to="/login">Đăng nhập</RouterLink>
        <RouterLink class="router-link" to="/register">Đăng ký</RouterLink>
      </template>
      <template v-else>
        <span class="user-info">{{ fullname }}</span>
        <RouterLink class="router-link" to="/order-details">Giỏ hàng</RouterLink>
        <a href="#" class="router-link" @click.prevent="logout">Đăng xuất</a>
      </template>
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

.user-info {
  margin: 0 1rem;
  font-size: 1rem;
  color: #000;
}
</style>
