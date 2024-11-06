<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

// Form data
const email = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

// Function to handle password reset
const handleSubmit = async () => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/users/forgot-password`,
      {
        email: email.value,
        newPassword: newPassword.value
      }
    );

    if (response.status === 200) {
      toast.success('Đặt lại mật khẩu thành công');
      // Reset form
      email.value = '';
      newPassword.value = '';
      confirmPassword.value = '';
    }
  } catch (error) {
    toast.error('Đặt lại mật khẩu thất bại');
    console.error('Error:', error);
  }
};
</script>

<template>
  <div class="reset-container">
    <h2>QUÊN MẬT KHẨU</h2>
    <form class="reset-form" @submit.prevent="handleSubmit">
      <input type="email" v-model="email" placeholder="Nhập email của bạn" required />
      <input type="password" v-model="newPassword" placeholder="Mật khẩu mới" required />
      <input type="password" v-model="confirmPassword" placeholder="Nhập lại mật khẩu" required />
      <button type="submit">Đặt lại mật khẩu</button>
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
  color: #3a4a74;
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
  background-color: #3a4a74;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}

button:hover {
  background-color: #455888;
}
</style>
