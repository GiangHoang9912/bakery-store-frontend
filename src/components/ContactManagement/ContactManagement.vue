<template>
  <div class="contact-management">
    <h2 class="title">QUẢN LÍ THÔNG TIN LIÊN HỆ</h2>
    <table class="contact-table">
      <thead>
        <tr>
          <th>HỌ TÊN</th>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const contacts = ref([
  { id: 1, name: 'Nguyen Van A', email: 'vana@gmail.com', phone: '0901234567', note: 'Customer A' },
  { id: 2, name: 'Tran Thi B', email: 'thib@gmail.com', phone: '0902345678', note: 'Customer B' },
  // Add more contact information here...
]);
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
  border-collapse: collapse;
  margin-bottom: 20px;
}

.contact-table th, .contact-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.contact-table th {
  background-color: #f0f0f0;
  font-weight: bold;
}
</style>
