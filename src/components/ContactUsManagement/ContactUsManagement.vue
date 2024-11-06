<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Contact {
  id: number;
  name: string;
  email: string;
  note: string;
  createdAt: string;
}

const contacts = ref<Contact[]>([]);
const loading = ref(false);

const fetchContacts = async () => {
  loading.value = true;
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/contact-us`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);
    contacts.value = response.data;
  } catch (error: any) {
    console.error(error);
    if (error.response && error.response.status === 403) {
      console.log('Lỗi quyền truy cập: Người dùng không có quyền xem danh sách liên hệ');
    }
  } finally {
    loading.value = false;
  }
};

const deleteContact = async (contactId: number) => {
  if (!confirm('Bạn có chắc chắn muốn xóa liên hệ này không?')) {
    return;
  }
  loading.value = true;
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;
    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/contact-us/${contactId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 204) {
      contacts.value = contacts.value.filter(c => c.id !== contactId);
      alert('Xóa liên hệ thành công');
    }
  } catch (error) {
    console.error('Lỗi khi xóa liên hệ:', error);
    alert('Có lỗi xảy ra khi xóa liên hệ');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchContacts();
});
</script>

<template>
  <div class="admin-page">
    <main class="content">
      <div class="title-container">
        <h2 class="title">Quản lý liên hệ</h2>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>TÊN</th>
            <th>EMAIL</th>
            <th>TIN NHẮN</th>
            <th>NGÀY TẠO</th>
            <th>XÓA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact.id">
            <td>{{ contact.id }}</td>
            <td>{{ contact.name }}</td>
            <td>{{ contact.email }}</td>
            <td>{{ contact.note }}</td>
            <td>{{ new Date(contact.createdAt).toLocaleString() }}</td>
            <td>
              <button class="delete-btn" @click="deleteContact(contact.id)">
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

  <div v-if="loading" class="loading-overlay">
    <div class="loading-spinner"></div>
  </div>
</template>

<style scoped>
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
  color: #5165a8;
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
  background-color: #5165a8;
  color: white;
}

.next-btn {
  font-weight: bold;
}

.add-btn {
  background-color: #5165a8;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

.add-btn:hover {
  background-color: #8c6543;
}

.add-popup {
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

.add-popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.add-popup-content h3 {
  margin-bottom: 15px;
}

.add-popup-content input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.button-group button {
  padding: 8px 15px;
  cursor: pointer;
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

.edit-popup-content h3 {
  margin-bottom: 15px;
}

.edit-popup-content input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
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
  border-top: 5px solid #5165a8;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>