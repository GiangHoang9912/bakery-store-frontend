<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="register-form">
    <h2>Đăng ký</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <input type="text" id="fullname" v-model="form.fullname" required placeholder="Họ tên" />
      </div>

      <div class="form-group">
        <input type="tel" id="phone" v-model="form.phone" required placeholder="SDT" />
      </div>

      <div class="form-group">
        <input type="email" id="email" v-model="form.email" required placeholder="Email" />
      </div>

      <div class="form-group">
        <input type="password" id="password" v-model="form.password" required placeholder="Mật khẩu" />
      </div>

      <div class="form-group">
        <input type="password" id="confirmPassword" v-model="form.confirmPassword" required
          placeholder="Nhập lại mật khẩu" />
      </div>

      <button type="submit" class="btn-register">Đăng kí</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  fullname: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const onSubmit = async (e: Event) => {
  e.preventDefault();
  if (form.password !== form.confirmPassword) {
    alert('Mật khẩu không khớp!')
    return
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
      email: form.email,
      password: form.password,
      fullname: form.fullname,
      phone: form.phone
    })
    console.log('Đăng ký thành công:', response.data)
    // Xử lý sau khi đăng ký thành công (ví dụ: chuyển hướng đến trang đăng nhập)
    // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
    router.push('/login');
  } catch (error) {
    console.error('Lỗi đăng ký:', error)
    alert('Đăng ký thất bại. Vui lòng thử lại.')
  }
}
</script>

<style scoped>
.register-form {
  width: 100vw;
  margin: 0 auto;
  padding: 20px;
  margin-top: 10rem;
}

h2 {
  text-align: center;
  color: #8b572a;
}

.form-group {
  margin-bottom: 15px;
  width: 30%;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input:focus {
  border-color: #8b572a;
}

.btn-register {
  padding: 10px;
  background-color: #8b572a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 30%;
}

.btn-register:hover {
  background-color: #795045;
}
</style>
