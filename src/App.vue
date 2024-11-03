<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import emitter from './eventBus'

const isLoggedIn = ref(false)
const fullname = ref('')
const isAdmin = ref(false)
const router = useRouter()
const showDropdown = ref(false)

onMounted(() => {
  checkLoginStatus()
  emitter.on('login', checkLoginStatus)
})

function checkLoginStatus() {
  const userString = localStorage.getItem('user')
  if (userString) {
    const user = JSON.parse(userString)
    console.log(user)

    isLoggedIn.value = true
    fullname.value = user.fullname
    isAdmin.value = Number(user.role) === 0
  } else {
    isLoggedIn.value = false
    fullname.value = ''
    isAdmin.value = false
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
      <p>linhanh@gmail.com</p>
      <template v-if="!isLoggedIn">
        <RouterLink class="router-link" to="/login">Đăng nhập</RouterLink>
        <RouterLink class="router-link" to="/register">Đăng ký</RouterLink>
      </template>
      <template v-else>
        <div class="dropdown" @mouseover="showDropdown = true" @mouseleave="showDropdown = false">
          <span class="router-link">{{ fullname }}</span>
          <div class="dropdown-content" v-show="showDropdown">
            <RouterLink to="/customer-account">Thông tin cá nhân</RouterLink>
            <RouterLink to="/reset-password">Đổi mật khẩu</RouterLink>
          </div>
        </div>
        <RouterLink v-if="!isAdmin" class="router-link" to="/order-details">Giỏ hàng</RouterLink>
        <a href="#" class="router-link" @click.prevent="logout">Đăng xuất</a>
      </template>
    </div>
    <nav class="menu">
      <RouterLink class="router-link" id="store-name" to="/">Linh Anh Mooncake</RouterLink>
      <template v-if="!isAdmin">
        <RouterLink class="router-link" to="/">Trang chủ</RouterLink>
        <RouterLink class="router-link" to="/products">Sản phẩm</RouterLink>
        <RouterLink class="router-link" to="/orders">Đơn hàng</RouterLink>
        <RouterLink class="router-link" to="/contact">Liên hệ</RouterLink>
      </template>
      <template v-else>
        <RouterLink class="router-link" to="/manage-accounts">Quản lý tài khoản</RouterLink>
        <RouterLink class="router-link" to="/manage-products">Quản lý sản phẩm</RouterLink>
        <RouterLink class="router-link" to="/manage-orders">Quản lý đơn hàng</RouterLink>
        <RouterLink class="router-link" to="/manage-contacts-us">Quản lý liên hệ</RouterLink>
      </template>
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

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 4px;
}

.dropdown-content a {
  color: #000;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}
</style>
