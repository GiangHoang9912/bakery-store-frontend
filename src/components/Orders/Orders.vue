<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="register-form">
    <h2>Tra cứu đơn hàng</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <input type="text" id="username" v-model="form.username" required placeholder="Nhập mã đơn hàng" />
      </div>

      
      <button type="submit" class="btn-register">Tra cứu đơn hàng</button>
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
