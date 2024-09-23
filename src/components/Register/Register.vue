<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="register-form">
    <h2>Đăng ký</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <input type="text" id="username" v-model="form.username" required placeholder="Tên tài khoản" />
      </div>

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

const form = reactive({
  username: '',
  fullname: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const onSubmit = () => {
  if (form.password !== form.confirmPassword) {
    alert('Mật khẩu không khớp!')
    return
  }
  console.log('Form submitted', form)
  // Xử lý đăng kí ở đây
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
