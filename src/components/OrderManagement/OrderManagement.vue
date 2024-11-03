<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="admin-page">
    <main class="content">
      <div class="title-container">
        <h2 class="title">Quản lý đơn hàng</h2>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>MÃ ĐƠN HÀNG</th>
            <th>CHI TIẾT ĐƠN HÀNG</th>
            <th>TỔNG TIỀN</th>
            <th>NGÀY TẠO</th>
            <th>TRẠNG THÁI</th>
            <th>THAO TÁC</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>#{{ order.id }}</td>
            <td>
              <div v-for="detail in order.orderDetails" :key="detail.id" class="order-detail">
                <div class="product-info">
                  <img :src="`http://localhost:8080${detail.product.image}`" :alt="detail.product.name" class="product-image">
                  <div class="product-details">
                    <span class="product-name">{{ detail.product.name }}</span>
                    <span>Số lượng: {{ detail.quantity }}</span>
                    <span>Đơn giá: {{ formatPrice(detail.price) }}</span>
                  </div>
                </div>
              </div>
            </td>
            <td>{{ formatPrice(calculateTotal(order.orderDetails)) }}</td>
            <td>{{ formatDate(order.createdAt) }}</td>
            <td>
              <span
                :class="['status-badge', order.status.toLowerCase()]"
                :style="{
                  backgroundColor: getStatusColor(order.status).background,
                  color: getStatusColor(order.status).color
                }"
              >
                {{ translateStatus(order.status) }}
              </span>
            </td>
            <td>
              <button class="edit-btn" @click="editOrder(order.id)">
                <i class="icon-edit"></i>
              </button>
              <button class="delete-btn" @click="deleteOrder(order.id)">
                <i class="icon-delete"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- <div class="pagination">
        <button class="page-btn">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <span>...</span>
        <button class="page-btn next-btn">&gt;</button>
      </div> -->
    </main>
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
    <!-- Thêm modal chỉnh sửa trạng thái -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h3>Cập nhật trạng thái đơn hàng #{{selectedOrder?.id}}</h3>
        <select v-model="selectedStatus">
          <option value="PENDING">Chờ xử lý</option>
          <option value="PROCESSING">Đang xử lý</option>
          <option value="COMPLETED">Hoàn thành</option>
          <option value="CANCELLED">Đã hủy</option>
        </select>
        <div class="modal-buttons">
          <button @click="updateOrderStatus">Cập nhật</button>
          <button @click="showEditModal = false">Hủy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const orders = ref([]);
const loading = ref(false);
const showEditModal = ref(false);
const selectedOrder = ref<any>(null);
const selectedStatus = ref('');

// Thêm enum cho status
enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

// Hàm để lấy danh sách đơn hàng
const fetchOrders = async () => {
  loading.value = true;
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    orders.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng:', error);
  } finally {
    loading.value = false;
  }
};

// Gọi API khi component được tạo
onMounted(fetchOrders);

const editOrder = (id: string) => {
  const order = orders.value.find(o => o.id === id);
  if (order) {
    selectedOrder.value = order;
    selectedStatus.value = order.status;
    showEditModal.value = true;
  }
};

const deleteOrder = async (id: string) => {
  if (!confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?')) {
    return;
  }
  loading.value = true;
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/orders/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    alert(`Đã xóa đơn hàng ${id}`);
    await fetchOrders();
  } catch (error) {
    console.error('Lỗi khi xóa đơn hàng:', error);
  } finally {
    loading.value = false;
  }
};

// Thêm các hàm tiện ích
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN');
};

const calculateTotal = (orderDetails: any[]) => {
  return orderDetails.reduce((sum, detail) => sum + detail.price * detail.quantity, 0);
};

// Cập nhật hàm translateStatus
const translateStatus = (status: string) => {
  const statusMap = {
    [OrderStatus.PENDING]: 'Chờ xử lý',
    [OrderStatus.PROCESSING]: 'Đang xử lý',
    [OrderStatus.COMPLETED]: 'Hoàn thành',
    [OrderStatus.CANCELLED]: 'Đã hủy'
  };
  return statusMap[status as OrderStatus] || status;
};

// Thêm mapping cho màu sắc status
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

// Thêm hàm updateOrderStatus
const updateOrderStatus = async () => {
  if (!selectedOrder.value) return;

  loading.value = true;
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;

    await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/orders/${selectedOrder.value.id}/status`,
      selectedStatus.value,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    await fetchOrders();
    showEditModal.value = false;
    alert('Cập nhật trạng thái thành công');
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái:', error);
    alert('Có lỗi xảy ra khi cập nhật trạng thái');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.title-container {
  display: flex;
  justify-content: center;
}

.admin-page {
  color: #333;
  position: relative;
  min-height: 80vh;
}

.content {
  padding: 30px;
}

.title {
  font-size: 24px;
  color: #A87951;
  margin-bottom: 20px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.data-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.edit-btn,
.delete-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin: 0 5px;
}

.edit-btn::before {
  content: '✏️';
}

.delete-btn::before {
  content: '🗑️';
  color: red;
}

.pagination {
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 10px 0;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
}

.page-btn {
  margin: 0 5px;
  cursor: pointer;
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px 10px;
}

.page-btn:hover {
  background-color: #A87951;
  color: white;
}

.next-btn {
  font-weight: bold;
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
  border-top: 5px solid #A87951;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.product-info {
  display: flex;
  align-items: start;
  gap: 12px;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.product-details span:not(.product-name) {
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
}

.product-details span:not(.product-name)::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #A87951;
  border-radius: 50%;
  margin-right: 8px;
  opacity: 0.7;
}

.order-detail {
  margin-bottom: 12px;
  padding: 8px;
  border-bottom: 1px solid #eee;
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

.status-badge.pending,
.status-badge.processing,
.status-badge.completed,
.status-badge.cancelled {
  /* Xóa các style cũ */
}

.data-table td {
  vertical-align: top;
}

/* Thêm CSS cho modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.modal-content h3 {
  margin-bottom: 20px;
  color: #A87951;
}

.modal-content select {
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-buttons button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-buttons button:first-child {
  background-color: #A87951;
  color: white;
}

.modal-buttons button:last-child {
  background-color: #ddd;
}
</style>
