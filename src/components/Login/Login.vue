<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import emitter from '../../eventBus';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const loading = ref(false); // Thêm biến loading

const login = async (e: Event) => {
  e.preventDefault();
  loading.value = true; // Bắt đầu loading
  errorMessage.value = ''; // Reset error message
  try {
    console.log(email.value, password.value);
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      email: email.value,
      password: password.value,
    });

    console.log(response.data);

    if (response.status === 200) {
      const { token, role, fullname, email, phone } = response.data;
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        token,
        role,
        fullname,
        email,
        phone,
      }));
      emitter.emit('login'); // Emit login event
      router.push('/');
    }
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    errorMessage.value = 'Email hoặc mật khẩu không hợp lệ';
  } finally {
    loading.value = false; // Kết thúc loading
  }
};
</script>

<template>
  <div class="login-container">
    <h2>Đăng nhập</h2>
    <!-- Thêm alert để hiển thị lỗi -->
    <div v-if="errorMessage" class="error-alert">
      {{ errorMessage }}
    </div>
    <form action="#">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Mật khẩu" required>
      <!-- <button type="submit">Đăng nhập</button> -->
      <button @click="login" :disabled="loading">
        {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
      </button>
    </form>
    <!--  to="/reset-password" -->
    <a href="/forgot-password">Quên mật khẩu?</a>
    <a href="/register">Đăng kí tài khoản</a>
  </div>

  <!-- Thêm loading overlay -->
  <div v-if="loading" class="loading-overlay">
    <div class="loading-spinner"></div>
  </div>
</template>

<style lang="css">
.login-container {
  margin-top: 10rem;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100vw;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-container h2 {
  color: #3a4a74;
  margin-bottom: 20px;
}

.login-container input[type="email"],
.login-container input[type="password"] {
  width: 30%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.login-container button {
  width: 30%;
  padding: 10px;
  background-color: #3a4a74;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-container button:hover {
  background-color: #3a4a74;
}

.login-container a {
  display: block;
  margin-top: 15px;
  text-decoration: none;
  color: #333;
}

.login-container a:hover {
  text-decoration: underline;
}

/* Thêm style cho loading */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3a4a74;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Thêm style cho alert lỗi */
.error-alert {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
}
</style>
