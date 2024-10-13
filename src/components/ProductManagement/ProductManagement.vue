<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

const products = ref<Product[]>([]);
const editingProduct = ref<Product | null>(null);
const showEditPopup = ref(false);
const showAddPopup = ref(false);
const newProduct = ref({ name: '', price: 0 });
const loading = ref(false);

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
    console.log(response.data);
    products.value = response.data;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 403) {
      console.log('Lỗi quyền truy cập: Người dùng không có quyền xem danh sách sản phẩm');
    }
  } finally {
    loading.value = false;
  }
};

const openEditPopup = (product: Product) => {
  editingProduct.value = { ...product };
  showEditPopup.value = true;
};

const closeEditPopup = () => {
  showEditPopup.value = false;
  editingProduct.value = null;
};

const saveProductChanges = async () => {
  if (!editingProduct.value) return;
  loading.value = true;
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;
    await axios.put(`${import.meta.env.VITE_API_BASE_URL}/products/${editingProduct.value.id}`,
      { name: editingProduct.value.name, price: editingProduct.value.price },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    const index = products.value.findIndex(p => p.id === editingProduct.value!.id);
    if (index !== -1) {
      products.value[index] = { ...editingProduct.value };
    }

    closeEditPopup();
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin sản phẩm:', error);
  } finally {
    loading.value = false;
  }
};

const deleteProduct = async (productId: number) => {
  if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
    return;
  }
  loading.value = true;
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;
    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/products/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 204) {
      products.value = products.value.filter(p => p.id !== productId);
      alert('Xóa sản phẩm thành công');
    }
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    if (error.response && error.response.status === 403) {
      alert('Bạn không có quyền xóa sản phẩm này');
    } else {
      alert('Có lỗi xảy ra khi xóa sản phẩm');
    }
  } finally {
    loading.value = false;
  }
};

const openAddPopup = () => {
  showAddPopup.value = true;
};

const closeAddPopup = () => {
  showAddPopup.value = false;
  newProduct.value = { name: '', price: 0 };
};

const addNewProduct = async () => {
  loading.value = true;
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/products`,
      newProduct.value,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    products.value.push(response.data);
    closeAddPopup();
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm mới:', error);
    alert('Có lỗi xảy ra khi thêm sản phẩm mới');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="admin-page">
    <main class="content">
      <div class="title-container">
        <h2 class="title">Quản lý sản phẩm</h2>
        <button class="add-btn" @click="openAddPopup">Thêm sản phẩm</button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>TÊN SẢN PHẨM</th>
            <th>GIÁ</th>
            <th>NGÀY TẠO</th>
            <th>NGÀY CẬP NHẬT</th>
            <th>SỬA / XÓA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ new Date(product.createdAt).toLocaleString() }}</td>
            <td>{{ new Date(product.updatedAt).toLocaleString() }}</td>
            <td>
              <button class="edit-btn" @click="openEditPopup(product)">
                <i class="icon-edit"></i>
              </button>
              <button class="delete-btn" @click="deleteProduct(product.id)">
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
  </div>

  <!-- Popup chỉnh sửa -->
  <div v-if="showEditPopup" class="edit-popup">
    <div class="edit-popup-content">
      <h3>Chỉnh sửa thông tin sản phẩm</h3>
      <input v-model="editingProduct.name" placeholder="Tên sản phẩm" />
      <input v-model="editingProduct.price" type="number" placeholder="Giá sản phẩm" />
      <div class="button-group">
        <button @click="closeEditPopup">Đóng</button>
        <button @click="saveProductChanges">Lưu</button>
      </div>
    </div>
  </div>

  <!-- Popup thêm sản phẩm mới -->
  <div v-if="showAddPopup" class="add-popup">
    <div class="add-popup-content">
      <h3>Thêm sản phẩm mới</h3>
      <input v-model="newProduct.name" placeholder="Tên sản phẩm" />
      <input v-model="newProduct.price" type="number" placeholder="Giá sản phẩm" />
      <div class="button-group">
        <button @click="closeAddPopup">Đóng</button>
        <button @click="addNewProduct">Thêm</button>
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

.add-btn {
  background-color: #A87951;
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
  border-top: 5px solid #A87951;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
