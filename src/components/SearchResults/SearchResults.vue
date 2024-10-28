<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const orderDetails = ref(null)
const loading = ref(false)
const error = ref('')

const fetchOrderDetails = async () => {
  const orderId = route.params.orderId
  if (!orderId) return

  loading.value = true
  try {
    const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`)
    orderDetails.value = response.data
    error.value = ''
  } catch (err) {
    error.value = '⚠️ Không tìm thấy đơn hàng'
    orderDetails.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOrderDetails()
})

// Thêm hàm format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('vi-VN')
}

// Thêm hàm tính tổng tiền
const calculateTotal = () => {
  if (!orderDetails.value?.orderDetails) return 0
  return orderDetails.value.orderDetails.reduce((total, item) => total + item.price, 0)
}
</script>

<template>
  <div class="order-lookup">
    <div>
      <h2>CHI TIẾT ĐƠN HÀNG</h2>

      <!-- Thêm loading overlay -->
      <div v-if="loading" class="loading-overlay">
        <div class="loading-spinner"></div>
      </div>

      <div v-else-if="error" class="error-message">{{ error }}</div>

      <div v-else-if="orderDetails" class="order-details">
        <div class="order-info">
          <p>Mã đơn hàng: #{{ orderDetails.id }}</p>
          <p>Trạng thái: {{ orderDetails.status }}</p>
          <p>Ngày đặt: {{ formatDate(orderDetails.createdAt) }}</p>
          <p>Cập nhật lần cuối: {{ formatDate(orderDetails.updatedAt) }}</p>
        </div>

        <div class="products-list">
          <h3>Sản phẩm</h3>
          <div v-for="detail in orderDetails.orderDetails" :key="detail.id" class="product-item">
            <div class="product-image">
              <img :src="detail.product.imageUrl" :alt="detail.product.name">
            </div>
            <div class="product-info">
              <p class="product-name">{{ detail.product.name }}</p>
              <p>Số lượng: {{ detail.quantity }}</p>
              <p>Giá: {{ detail.price.toLocaleString() }}đ</p>
            </div>
          </div>

          <div class="order-total">
            <p>Tổng tiền: {{ calculateTotal().toLocaleString() }}đ</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-lookup {
  max-width: 1200px;
  margin: 40px auto; /* tăng margin */
  padding: 30px; /* tăng padding */
}

.order-lookup div {
  margin-top: 2rem;
}

.order-lookup h2 {
  color: #795548;
  font-size: 32px; /* tăng kích thước chữ */
  margin-bottom: 40px; /* tăng khoảng cách dưới */
  font-weight: 600;
  position: relative;
  display: inline-block;
}

.order-lookup h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #795548;
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

.order-details {
  max-width: 1000px; /* tăng độ rộng tối đa */
  margin: 0 auto;
  padding: 30px; /* tăng padding */
}

.order-info {
  background: #fff;
  padding: 30px; /* tăng padding */
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
  font-size: 1.1em; /* tăng kích thước chữ */
}

.products-list {
  border: none;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-item {
  display: flex;
  align-items: center;
  gap: 40px; /* tăng khoảng cách giữa ảnh và thông tin */
  padding: 25px; /* tăng padding */
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;
}

.product-item:hover {
  background: #f9f9f9;
  transform: translateY(-2px);
}

.product-image {
  width: 150px; /* tăng kích thước ảnh */
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;  /* Đảm bảo ảnh được căn chỉnh và lấp đầy không gian */
}

.product-info {
  flex: 1;
  text-align: left;
  padding: 15px; /* tăng padding */
}

.product-name {
  font-size: 1.2em; /* tăng kích thước chữ tên sản phẩm */
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.order-total {
  margin-top: 40px; /* tăng margin */
  padding: 25px; /* tăng padding */
  border-top: 2px solid #eee;
  font-weight: 600;
  text-align: right;
  font-size: 1.4em; /* tăng kích thước chữ */
  color: #795548;
}

@media (max-width: 768px) {
  .order-lookup {
    padding: 15px;
  }

  .product-image {
    width: 180px; /* tăng kích thước ảnh trên mobile */
    height: 180px;
  }

  .product-info {
    padding: 20px; /* tăng padding trên mobile */
  }
}

/* Thêm styles cho loading */
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
