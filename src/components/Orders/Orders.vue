<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="register-form">
    <h2>Tra cứu đơn hàng</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <input type="text" v-model="orderId" required placeholder="Nhập mã đơn hàng" />
      </div>
      <button type="submit" class="btn-register">Tra cứu đơn hàng</button>
    </form>

    <!-- Thêm phần hiển thị orders -->
    <div class="orders-list" v-if="orders.length">
      <h3>Đơn hàng của bạn</h3>
      <div v-for="order in orders" :key="order.id" class="order-item">
        <div class="order-header">
          <span>Mã đơn: {{ order.id }}</span>
          <span
            class="status-badge"
            :style="{
              backgroundColor: getStatusColor(order.status).background,
              color: getStatusColor(order.status).color
            }"
          >
            {{ translateStatus(order.status) }}
          </span>
        </div>
        <div class="order-details">
          <p>Tổng tiền: {{ formatPrice(calculateTotal(order.orderDetails)) }}</p>
          <p>Ngày đặt: {{ formatDate(order.createdAt) }}</p>
        </div>
      </div>
    </div>

    <!-- Thêm loading overlay -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// Thêm enum cho status
enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

const router = useRouter()
const orderId = ref('')
const orders = ref([])
const loading = ref(false)

// Thêm hàm translateStatus
const translateStatus = (status: string) => {
  const statusMap = {
    [OrderStatus.PENDING]: 'Chờ xử lý',
    [OrderStatus.PROCESSING]: 'Đang xử lý',
    [OrderStatus.COMPLETED]: 'Hoàn thành',
    [OrderStatus.CANCELLED]: 'Đã hủy'
  };
  return statusMap[status as OrderStatus] || status;
};

// Thêm hàm getStatusColor
const getStatusColor = (status: string) => {
  const colorMap = {
    [OrderStatus.PENDING]: {
      background: '#fff3cd',
      color: '#856404'
    },
    [OrderStatus.PROCESSING]: {
      background: '#cce5ff',
      color: '#004085'
    },
    [OrderStatus.COMPLETED]: {
      background: '#d4edda',
      color: '#155724'
    },
    [OrderStatus.CANCELLED]: {
      background: '#f8d7da',
      color: '#721c24'
    }
  };
  return colorMap[status as OrderStatus] || { background: '#f8f9fa', color: '#333' };
};

// Thêm hàm formatPrice
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

// Thêm hàm formatDate
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN');
};

// Cập nhật template và các hàm khác
const calculateTotal = (orderDetails: any[]) => {
  return orderDetails.reduce((sum, detail) => sum + detail.price * detail.quantity, 0);
};

const fetchUserOrders = async () => {
  loading.value = true
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const response = await axios.get('http://localhost:8080/api/orders/user',
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    )
    orders.value = response.data
  } catch (error) {
    console.error('Error fetching orders:', error)
  } finally {
    loading.value = false
  }
}

const onSubmit = () => {
  router.push({
    name: 'search-results',
    params: { orderId: orderId.value }
  })
}

onMounted(() => {
  fetchUserOrders()
})
</script>

<style scoped>
.register-form {
  width: 100vw;
  margin: 0 auto;
  padding: 20px;
  margin-top: 10rem;
}

h2 {
  text-align: center;
  color: #3a4a74;
}

.form-group {
  margin-bottom: 15px;
  width: 30%;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input:focus {
  border-color: #3a4a74;
}

.btn-register {
  padding: 10px;
  background-color: #3a4a74;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 30%;
}

.btn-register:hover {
  background-color: #4d5286;
}

.orders-list {
  width: 70%;
  margin: 2rem auto;
}

.order-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
}

.order-header span:first-child {
  font-weight: bold;
  color: #3a4a74;
}

.order-details {
  color: #666;
}

.order-details p {
  margin: 0.25rem 0;
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
  border-top: 5px solid #3a4a74;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.status-badge {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
  text-align: center;
  min-width: 100px;
}
</style>
