<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="order-management">
    <h2 class="title">QUẢN LÍ ĐƠN HÀNG</h2>
    <table class="order-table">
      <thead>
        <tr>
          <th>MÃ ĐƠN HÀNG</th>
          <th>SẢN PHẨM</th>
          <th>NGÀY GIAO HÀNG</th>
          <th>TRẠNG THÁI ĐƠN HÀNG</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.product }}</td>
          <td>{{ order.deliveryDate }}</td>
          <td>{{ order.status }}</td>
        </tr>
      </tbody>
    </table>
    
    <div class="pagination">
      <span v-for="page in totalPages" :key="page" @click="changePage(page)" class="page-number">{{ page }}</span>
      <button @click="nextPage" class="next-button">></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const orders = ref([
  { id: 'DH001', product: 'Sản phẩm 1', deliveryDate: '25/09/2024', status: 'Đang giao' },
  { id: 'DH002', product: 'Sản phẩm 2', deliveryDate: '26/09/2024', status: 'Đã giao' },
  // Add more orders here...
]);

const totalPages = ref(3); // for example
const currentPage = ref(1);

const changePage = (page: number) => {
  currentPage.value = page;
  console.log(`Current Page: ${page}`);
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
  console.log(`Next Page: ${currentPage.value}`);
};
</script>

<style scoped>
.order-management {
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 24px;
  color: #A87951;
  margin-bottom: 20px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.order-table th, .order-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.order-table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

/* Pagination styling */
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

.page-number {
  margin: 0 5px;
  cursor: pointer;
}

.page-number:hover {
  font-weight: bold;
}

.next-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
}
</style>
