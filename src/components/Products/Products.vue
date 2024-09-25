<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue';

// Sample product data
const products = ref([
  {
    id: 1,
    name: "Bánh nướng thập cẩm",
    price: "80.000",
    image: "https://via.placeholder.com/150",
    quantity: 0
  },
  {
    id: 2,
    name: "Bánh nướng trứng muối thập cẩm",
    price: "80.000",
    image: "https://via.placeholder.com/150",
    quantity: 0
  },
  {
    id: 3,
    name: "Bánh nướng đậu xanh trứng muối",
    price: "80.000",
    image: "https://via.placeholder.com/150",
    quantity: 0
  },
  {
    id: 4,
    name: "Bánh nướng hạt sen trứng muối",
    price: "80.000",
    image: "https://via.placeholder.com/150",
    quantity: 0
  },
]);

// Increase or decrease quantity
const increaseQuantity = (product) => {
  product.quantity++;
};

const decreaseQuantity = (product) => {
  if (product.quantity > 0) product.quantity--;
};
</script>

<template>
  <div class="products">
    <h2>BÁNH TRUNG THU TRUYỀN THỐNG</h2>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <img :src="product.image" :alt="product.name" />
        <p>{{ product.name }}</p>
        <p>{{ product.price }}</p>
        <div class="quantity-control">
          <span>Số lượng:</span>
          <button @click="decreaseQuantity(product)">-</button>
          <span>{{ product.quantity }}</span>
          <button @click="increaseQuantity(product)">+</button>
        </div>
      </div>
    </div>
    <div class="pagination">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>...</span>
    </div>
  </div>
</template>

<style scoped>
.products {
  max-width: 900px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
  text-align: center;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: left;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product-item {
  width: 45%;
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: left;
}

.product-item img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.product-item p {
  font-size: 16px;
  margin: 10px 0;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.quantity-control button {
  padding: 5px 10px;
  background-color: #795548;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.quantity-control button:hover {
  background-color: #5d4037;
}

.pagination {
  margin-top: 20px;
}

.pagination span {
  margin: 0 5px;
  font-size: 16px;
  cursor: pointer;
}

.pagination span:hover {
  font-weight: bold;
}
</style>
