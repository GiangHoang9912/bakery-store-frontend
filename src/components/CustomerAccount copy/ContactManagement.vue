<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="contact-management">
    <h2 class="title">QUẢN LÍ LIÊN HỆ</h2>
    <table class="contact-table">
      <thead>
        <tr>
          <th>TÊN</th>
          <th>EMAIL</th>
          <th>SỐ ĐIỆN THOẠI</th>
          <th>NOTE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.phone }}</td>
          <td>{{ contact.note }}</td>
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

const contacts = ref([
  {
    id: 1,
    name: "",
    email: "",
    phone: "",
    note: ""
  }
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
.contact-management {
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 24px;
  color: #A87951;
  margin-bottom: 20px;
}

.contact-table {
  width: 100%;
  bcontact-collapse: collapse;
  margin-bottom: 20px;
}

.contact-table th, .contact-table td {
  bcontact: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.contact-table th {
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
  bcontact: none;
  cursor: pointer;
  font-size: 18px;
}
</style>
