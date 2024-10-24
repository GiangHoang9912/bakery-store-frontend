<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const products = ref<Product[]>([]);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/products');
    products.value = response.data.map((product: any) => ({
      ...product,
      quantity: 0,
      formattedPrice: formatPrice(product.price),
    }));
  } catch (error) {
    console.error('Lỗi khi tải sản phẩm:', error);
  }
};

onMounted(fetchProducts);

// Increase or decrease quantity
const increaseQuantity = (product: Product) => {
  product.quantity++;
};

const decreaseQuantity = (product: Product) => {
  if (product.quantity > 0) product.quantity--;
};
</script>

<template>
  <div class="products">
    <h2>BÁNH TRUNG THU TRUYỀN THỐNG</h2>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <img :src="product.imageUrl" :alt="product.name" />
        <p>{{ product.name }}</p>
        <p>{{ product.formattedPrice }}</p>
        <div class="quantity-control">
          <span>Số lượng:</span>
          <button @click="decreaseQuantity(product)">-</button>
          <span>{{ product.quantity }}</span>
          <button @click="increaseQuantity(product)">+</button>
        </div>
      </div>
    </div>
    <!-- <div class="pagination">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>...</span>
    </div> -->
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
