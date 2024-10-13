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
            <th>SẢN PHẨM</th>
            <th>NGÀY GIAO HÀNG</th>
            <th>TRẠNG THÁI</th>
            <th>SỬA / XÓA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.product }}</td>
            <td>{{ order.deliveryDate }}</td>
            <td>{{ order.status }}</td>
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

      <div class="pagination">
        <button class="page-btn">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <span>...</span>
        <button class="page-btn next-btn">&gt;</button>
      </div>
    </main>
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const orders = ref([]);
const loading = ref(false);

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

const editOrder = async (id: string) => {
  loading.value = true;
  try {
    const orderToEdit = orders.value.find(order => order.id === id);
    if (orderToEdit) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const token = user.token;
      const updatedOrder = { ...orderToEdit, /* các trường đã được cập nhật */ };
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/orders/${id}`, updatedOrder, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert(`Đã cập nhật đơn hàng ${id}`);
      await fetchOrders();
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật đơn hàng:', error);
  } finally {
    loading.value = false;
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
</style>
