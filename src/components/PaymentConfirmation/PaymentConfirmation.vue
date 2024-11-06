<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue';

// Product and quantity state
const product = ref({
  name: 'Over the moon',
  price: 600000,
  quantity: 1,
  image: 'https://via.placeholder.com/150' // Replace with actual image URL
});

// Total price calculation
const totalPrice = ref(product.value.price * product.value.quantity);

const increaseQuantity = () => {
  product.value.quantity++;
  totalPrice.value = product.value.price * product.value.quantity;
};

const decreaseQuantity = () => {
  if (product.value.quantity > 1) {
    product.value.quantity--;
    totalPrice.value = product.value.price * product.value.quantity;
  }
};

// Recipient information state
const recipientInfo = ref({
  name: '',
  phone: '',
  address: '',
  note: ''
});

const handlePayment = () => {
  alert('Payment confirmed!');
};
</script>

<template>
  <div class="payment-container">
    <h2>XÁC NHẬN ĐẶT HÀNG</h2>
    <div class="payment-content">
      <!-- Product details -->
      <div class="product-details">
        <img :src="product.image" alt="Product Image" />
        <div class="product-info">
          <p>{{ product.name }}</p>
          <p>{{ product.price.toLocaleString() }}₫</p>
          <div class="quantity-control">
            <p>Số lượng:</p>
            <button @click="decreaseQuantity">-</button>
            <span>{{ product.quantity }}</span>
            <button @click="increaseQuantity">+</button>
          </div>
          <p class="total-price">Tổng ĐẶT HÀNG: {{ totalPrice.toLocaleString() }}₫</p>
        </div>
      </div>

      <!-- Recipient details -->
      <div class="recipient-details">
        <h3>Thông tin người nhận:</h3>
        <div class="input-group">
          <label for="name">Họ tên:</label>
          <input type="text" v-model="recipientInfo.name" id="name" />
        </div>
        <div class="input-group">
          <label for="phone">Sđt:</label>
          <input type="text" v-model="recipientInfo.phone" id="phone" />
        </div>
        <div class="input-group">
          <label for="address">Địa chỉ:</label>
          <input type="text" v-model="recipientInfo.address" id="address" />
        </div>
        <div class="input-group">
          <label for="note">Ghi chú:</label>
          <textarea v-model="recipientInfo.note" id="note"></textarea>
        </div>
        <button class="pay-button" @click="handlePayment">ĐẶT HÀNG</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.payment-container {
  max-width: 900px;
  margin: 50px auto;
  text-align: left;
  font-family: Arial, sans-serif;
}

h2 {
  font-size: 24px;
  color: #3a4a74;
  text-align: center;
  margin-bottom: 30px;
}

.payment-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.product-details {
  width: 50%;
  display: flex;
  align-items: flex-start;
}

.product-details img {
  width: 150px;
  height: auto;
  border-radius: 8px;
  margin-right: 20px;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.quantity-control {
  display: flex;
  align-items: center;
  margin: 15px 0;
}

.quantity-control p {
  margin-right: 10px;
}

.quantity-control button {
  width: 30px;
  height: 30px;
  background-color: #3a4a74;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
}

.quantity-control span {
  font-size: 16px;
}

.total-price {
  margin-top: 15px;
  font-weight: bold;
}

.recipient-details {
  width: 40%;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.pay-button {
  width: 100%;
  padding: 10px;
  background-color: #3a4a74;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.pay-button:hover {
  background-color: #3a4a74;
}
</style>
