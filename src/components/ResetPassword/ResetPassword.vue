<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue';

// Form data
const email = ref('');
const newPassword = ref('');

// Function to handle login
const handleSubmit = () => {
  alert(`Email: ${email.value}, New Password: ${newPassword.value}`);
};
</script>

<template>
  <div class="reset-container">
    <h2>CÀI ĐẶT LẠI MẬT KHẨU</h2>
    <form class="reset-form" @submit.prevent="handleSubmit">
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        v-model="newPassword"
        placeholder="Mật khẩu mới"
        required
      />
      <button type="submit">Đăng nhập</button>
    </form>
  </div>
</template>

<style scoped>
/* Style for the form container */
.reset-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
}

/* Title style */
h2 {
  font-size: 24px;
  color: #a57b5b;
  margin-bottom: 40px;
  text-align: center;
}

/* Form container */
.reset-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
}

/* Input fields style */
input {
  margin-bottom: 20px;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #f4f4f4;
  color: #333;
  width: 100%;
}

/* Button style */
button {
  padding: 15px;
  background-color: #a57b5b;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}

button:hover {
  background-color: #8b6049;
}
</style>
