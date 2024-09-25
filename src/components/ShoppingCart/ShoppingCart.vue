<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue';

// Cart product data and state
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

// Checkout function
const handleCheckout = () => {
  alert('Proceeding to checkout');
};
</script>

<template>
  <div class="cart-container">
    <h2>GIỎ HÀNG</h2>
    <div class="cart-content">
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
          <p class="total-price">Tổng thanh toán: {{ totalPrice.toLocaleString() }}₫</p>
        </div>
      </div>
    </div>

    <!-- Checkout button centered on the screen -->
    <div class="checkout">
      <button class="checkout-button" @click="handleCheckout">THANH TOÁN</button>
    </div>
  </div>
</template>

<style scoped>
/* Ensure the container is fullscreen and centers the content */
.cart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 10rem;
}

h2 {
  font-size: 24px;
  color: #a57b5b;
  margin-bottom: 30px;
  text-align: center;
}

.cart-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.product-details {
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
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
  background-color: #d6b290;
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
  font-size: 18px;
  color: #a57b5b;
}

/* Center the checkout button on the screen */
.checkout {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
}

.checkout-button {
  padding: 10px 20px;
  background-color: #a57b5b;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}

.checkout-button:hover {
  background-color: #8b6049;
}
</style>
