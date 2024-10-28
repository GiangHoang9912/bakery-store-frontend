<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const loading = ref(false);

const name = ref('');
const email = ref('');
const phone = ref('');
const message = ref('');
const errors = ref({} as any);

const validateForm = () => {
  errors.value = {}; // Đặt lại errors trước khi xác thực
  if (!name.value.trim()) errors.value.name = 'Vui lòng nhập họ tên';
  if (!email.value.trim()) errors.value.email = 'Vui lòng nhập email';
  else if (!/\S+@\S+\.\S+/.test(email.value)) errors.value.email = 'Email không hợp lệ';
  if (!phone.value.trim()) errors.value.phone = 'Vui lòng nhập số điện thoại';
  else if (!/^\d{10}$/.test(phone.value)) errors.value.phone = 'Số điện thoại không hợp lệ';
  if (!message.value.trim()) errors.value.message = 'Vui lòng nhập tin nhắn';
  return Object.keys(errors.value).length === 0;
};

const submitForm = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/contact-us`, {
        name: name.value,
        email: email.value,
        phone: phone.value,
        note: message.value
      });
      console.log('Gửi liên hệ thành công:', response.data);
      name.value = '';
      email.value = '';
      phone.value = '';
      message.value = '';
    } catch (error) {
      console.error('Lỗi khi gửi liên hệ:', error);
      if (axios.isAxiosError(error) && error.response) {
      } else {
      }
    } finally {
      loading.value = false;
    }
  }
};
</script>

<template>
  <div class="contact-container">
    <h1 class="contact-title">CONTACT US</h1>
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
    <div class="contact-content">
      <div class="contact-text">
        <p>Our shop would be delighted to assist as you discover Linh Anh Mooncake and its products.</p>
        <p>You may contact our Customer Service by call on .</p>
        <p>Service available from Monday to Saturday from 9 am to 9 pm and Sunday 11am - 7pm.</p>
      </div>
      <form class="contact-form" @submit.prevent="submitForm">
        <input v-model="name" type="text" placeholder="Họ tên" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>

        <input v-model="email" type="email" placeholder="Email" />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>

        <input v-model="phone" type="tel" placeholder="Số điện thoại" />
        <span v-if="errors.phone" class="error">{{ errors.phone }}</span>

        <textarea v-model="message" placeholder="Note"></textarea>
        <span v-if="errors.message" class="error">{{ errors.message }}</span>

        <button type="submit">Gửi</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  font-family: Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 10rem;
}

.contact-title {
  color: #c9a063;
  font-size: 24px;
  margin-bottom: 20px;
}

.contact-content {
  display: flex;
  gap: 40px;
}

.contact-text {
  flex: 1;
}

.contact-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input,
textarea,
button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  height: 100px;
  resize: vertical;
}

button {
  background-color: #8b572a;
  color: white;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  width: auto;
  padding: 10px 20px;
}

.error {
  color: red;
  font-size: 0.8em;
  margin-top: -5px;
  margin-bottom: 5px;
  text-align: left;
  width: 100%;
}

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
  border-top: 5px solid #8b572a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
