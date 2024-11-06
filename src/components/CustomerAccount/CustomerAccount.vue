<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Account Information
const accountInfo = ref({
  fullname: '',
  email: '',
  role: 1
});

// Hàm để lấy thông tin từ localStorage
const loadAccountInfo = () => {
  const userString = localStorage.getItem('user') || '{}';
  const user = JSON.parse(userString);
  accountInfo.value = user;
};

// Gọi hàm loadAccountInfo khi component được mount
onMounted(() => {
  loadAccountInfo();
});
</script>

<template>
  <div class="account-details">
    <h2>TÀI KHOẢN</h2>
    <div class="account-info">
      <div class="account-info-container">
        <h3>THÔNG TIN TÀI KHOẢN</h3>
        <div class="info-item">
          <span class="label">Tên đầy đủ:</span>
          <span class="value">{{ accountInfo.fullname }}</span>
        </div>
        <div class="info-item">
          <span class="label">Email:</span>
          <span class="value">{{ accountInfo.email }}</span>
        </div>
        <div class="info-item">
          <span class="label">Loại tài khoản:</span>
          <span class="value">{{ Number(accountInfo.role) === 0 ? 'Quản trị viên' : 'Khách hàng' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-details {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 28px;
  color: #3a4a74;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
}

h3 {
  font-size: 22px;
  color: #3d3885;
  margin-bottom: 25px;
  text-align: center;
  border-bottom: 2px solid #c6c5e6;
  padding-bottom: 10px;
}

.account-info-container {
  padding: 20px;
  background-color: #f3f3fa;
  border-radius: 10px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
}

.value {
  margin-left: 10px;
}
</style>
