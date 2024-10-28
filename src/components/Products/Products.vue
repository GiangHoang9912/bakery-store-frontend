<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);

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

const saveCartToLocalStorage = (cartItems: Product[]) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

const fetchProducts = async () => {
  loading.value = true;
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const savedCart = loadCartFromLocalStorage();
    products.value = response.data.map((product: any) => {
      const savedProduct = savedCart.find((item: Product) => item.id === product.id);
      return {
        ...product,
        quantity: savedProduct ? savedProduct.quantity : 0,
        formattedPrice: formatPrice(product.price),
      };
    });
  } catch (error: any) {
    console.error('Lỗi khi tải sản phẩm:', error);
    if (error.response && error.response.status === 401) {
      router.push('/login');
    }
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProducts);

// Increase or decrease quantity
const increaseQuantity = (product: Product) => {
  product.quantity++;
  saveCartToLocalStorage(products.value);
};

const decreaseQuantity = (product: Product) => {
  if (product.quantity > 0) {
    product.quantity--;
    saveCartToLocalStorage(products.value);
  }
};
</script>

<template>
  <div class="products">
    <h2>SẢN PHẨM</h2>
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
    <div v-else class="product-list">
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

    <!-- Thêm loading spinner -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<style scoped>
.products {
  max-width: 900px;
  margin: 30px auto;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  padding: 15px;
}

.product-item {
  width: 100%;
  background-color: white;
  padding: 15px;
  margin-bottom: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-item p {
  font-size: 16px;
  margin: 8px 0;
  color: #333;
}

.product-item p:first-of-type {
  font-weight: bold;
  font-size: 18px;
}

.quantity-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.quantity-control button {
  padding: 8px 15px;
  background-color: #795548;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 16px;
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

/* Thêm style cho loading */
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
  border-top: 5px solid #A87951;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
