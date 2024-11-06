<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const cartItems = ref<Product[]>([]);
const totalPrice = ref(0);

// Load giỏ hàng từ localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart).filter((item: Product) => item.quantity > 0);
    calculateTotal();
  }
};

// Tính tổng tiền
const calculateTotal = () => {
  totalPrice.value = cartItems.value.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
};

// Tăng số lượng
const increaseQuantity = (product: Product) => {
  product.quantity++;
  updateCart();
};

// Giảm số lượng
const decreaseQuantity = (product: Product) => {
  if (product.quantity > 1) {
    product.quantity--;
    updateCart();
  } else {
    // Xóa sản phẩm khỏi giỏ hàng
    cartItems.value = cartItems.value.filter(item => item.id !== product.id);
    updateCart();
  }
};

// Cập nhật giỏ hàng trong localStorage
const updateCart = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
  calculateTotal();
};

// Format giá tiền
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const handleCheckout = () => {
  alert('Proceeding to checkout');
};

onMounted(() => {
  loadCartFromLocalStorage();
});
</script>

<template>
  <div class="cart-container">
    <h2>GIỎ HÀNG</h2>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Giỏ hàng trống</p>
    </div>
    <div v-else class="cart-content">
      <!-- Hiển thị từng sản phẩm trong giỏ hàng -->
      <div v-for="item in cartItems" :key="item.id" class="product-details">
        <img :src="item.imageUrl" :alt="item.name" />
        <div class="product-info">
          <p class="product-name">{{ item.name }}</p>
          <p class="product-price">{{ formatPrice(item.price) }}</p>
          <div class="quantity-control">
            <p>Số lượng:</p>
            <button @click="decreaseQuantity(item)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)">+</button>
          </div>
          <p class="item-total">Thành tiền: {{ formatPrice(item.price * item.quantity) }}</p>
        </div>
      </div>
    </div>

    <div v-if="cartItems.length > 0" class="cart-summary">
      <p class="total-price">Tổng ĐẶT HÀNG: {{ formatPrice(totalPrice) }}</p>
      <button class="checkout-button" @click="handleCheckout">ĐẶT HÀNG</button>
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
  color: #3a4a74;
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
  color: #3a4a74;
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
  background-color: #3a4a74;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}

.checkout-button:hover {
  background-color: #3a4a74;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.product-name {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 5px;
}

.product-price {
  color: #3a4a74;
  font-size: 16px;
}

.item-total {
  color: #3a4a74;
  font-weight: bold;
}

.cart-summary {
  margin-top: 2rem;
  text-align: center;
}
</style>
