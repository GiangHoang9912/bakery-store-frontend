<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface User {
  id: number;
  fullname: string;
  email: string;
  phone: string;
}

const users = ref<User[]>([]);
const editingUser = ref<User | null>(null);
const showEditPopup = ref(false);
const loading = ref(false);
const errorMessage = ref('');

const fetchUsers = async () => {
  loading.value = true;
  errorMessage.value = ''; // Đặt lại thông báo lỗi
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);
    users.value = response.data;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 403) {
      errorMessage.value = 'Lỗi quyền truy cập: Người dùng không có quyền xem danh sách khách hàng';
    } else {
      errorMessage.value = 'Đã xảy ra lỗi khi tải danh sách khách hàng';
    }
  } finally {
    loading.value = false;
  }
};

const openEditPopup = (user: User) => {
  editingUser.value = { ...user };
  showEditPopup.value = true;
};

const closeEditPopup = () => {
  showEditPopup.value = false;
  editingUser.value = null;
};

const saveUserChanges = async () => {
  if (!editingUser.value) return;
  loading.value = true;
  errorMessage.value = ''; // Đặt lại thông báo lỗi
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;
    await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/${editingUser.value.id}`,
      { fullname: editingUser.value.fullname, phone: editingUser.value.phone },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    const index = users.value.findIndex(u => u.id === editingUser.value!.id);
    if (index !== -1) {
      users.value[index] = { ...editingUser.value };
    }

    closeEditPopup();
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin người dùng:', error);
    errorMessage.value = 'Đã xảy ra lỗi khi cập nhật thông tin người dùng';
  } finally {
    loading.value = false;
  }
};

const deleteUser = async (userId: number) => {
  if (!confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
    return;
  }
  loading.value = true;
  errorMessage.value = ''; // Đặt lại thông báo lỗi
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;
    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      users.value = users.value.filter(u => u.id !== userId);
      alert('Xóa người dùng thành công');
    }
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error);
    if (error.response && error.response.status === 403) {
      errorMessage.value = 'Bạn không có quyền xóa người dùng này';
    } else {
      errorMessage.value = 'Có lỗi xảy ra khi xóa người dùng';
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="admin-page">
    <main class="content">
      <div class="title-container">
        <h2 class="title">Quản lý khách hàng</h2>
      </div>

      <!-- Hiển thị thông báo lỗi -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>TÀI KHOẢN</th>
            <th>TÊN KHÁCH HÀNG</th>
            <th>EMAIL</th>
            <th>SDT</th>
            <th>SỬA / XÓA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.fullname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>
              <button class="edit-btn" @click="openEditPopup(user)">
                <i class="icon-edit"></i>
              </button>
              <button class="delete-btn" @click="deleteUser(user.id)">
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
  </div>

  <!-- Popup chỉnh sửa -->
  <div v-if="showEditPopup" class="edit-popup">
    <div class="edit-popup-content">
      <h3>Chỉnh sửa thông tin khách hàng</h3>
      <input v-model="editingUser.fullname" placeholder="Tên khách hàng" />
      <input v-model="editingUser.phone" placeholder="Số điện thoại" />
      <div class="button-group">
        <button @click="closeEditPopup">Đóng</button>
        <button @click="saveUserChanges">Lưu</button>
      </div>
    </div>
  </div>

  <div v-if="loading" class="loading-overlay">
    <div class="loading-spinner"></div>
  </div>
</template>

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

.edit-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.edit-popup-content input {
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
}

.button-group {
  display: flex;
  justify-content: space-between;
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

.error-message {
  color: red;
  background-color: #ffebee;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  text-align: center;
}
</style>
