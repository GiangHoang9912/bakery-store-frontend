<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'

const orderCode = ref('')
const emailOrPhone = ref('')
const errorMessage = ref('⚠️ Không tìm thấy dữ liệu')

const lookupOrder = () => {
  if (!orderCode.value || !emailOrPhone.value) {
    errorMessage.value = '⚠️ Không tìm thấy dữ liệu'
  } else {
    errorMessage.value = ""
    // API logic for lookup can go here
  }
}
</script>

<template>
  <div class="order-lookup">
    <div>
      <h2>TRA CỨU ĐƠN HÀNG</h2>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <form @submit.prevent="lookupOrder">
        <input type="text" v-model="orderCode" placeholder="Mã đơn hàng" required />
        <input type="text" v-model="emailOrPhone" placeholder="Email / số điện thoại" required />
        <button type="submit">TRA CỨU ĐƠN HÀNG</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.order-lookup {
  width: 100vw;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.order-lookup div {
  margin-top: 10rem;
}

.order-lookup h2 {
  color: #795548;
  font-size: 24px;
  margin-bottom: 20px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 15px;
}

form {
  width: 100vw;
  display: flex;
  flex-direction: column;
}

input {
  width: 30%;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  color: #b2b2b2;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f2f2f2;
}

input::placeholder {
  color: #b2b2b2;
}

button {
  padding: 10px;
  background-color: #795548;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #5d4037;
}
</style>
