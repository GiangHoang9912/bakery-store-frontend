<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue';

// Account Information
const accountInfo = ref({
  username: 'Trang229',
  customerName: 'Trang',
  customerId: 'KH100'
});

// Order History
const orderHistory = ref([
  {
    productName: 'Hân hoan giftset',
    price: '450.000',
    orderDate: '09/09/2023',
    productImage: 'https://via.placeholder.com/150' // Replace with actual image URL
  }
]);
</script>

<template>
  <div class="account-details">
    <h2>TÀI KHOẢN</h2>
    <div class="account-info">
      <div class="account-info-left">
        <h3>THÔNG TIN TÀI KHOẢN</h3>
        <p><strong>Tên tài khoản:</strong> {{ accountInfo.username }}</p>
        <p><strong>Tên khách hàng:</strong> {{ accountInfo.customerName }}</p>
        <p><strong>Mã khách hàng:</strong> {{ accountInfo.customerId }}</p>
      </div>
      <div class="order-history">
        <h3>LỊCH SỬ ĐẶT HÀNG</h3>
        <div v-for="order in orderHistory" :key="order.productName" class="order-item">
          <img :src="order.productImage" :alt="order.productName" />
          <div class="order-info">
            <p>{{ order.productName }}</p>
            <p>{{ order.price }}</p>
            <p>Ngày đặt hàng: {{ order.orderDate }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="pagination">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>...</span>
    </div> -->
  </div>
</template>

<style scoped>
.account-details {
  max-width: 900px;
  margin: 50px auto;
  text-align: left;
  font-family: Arial, sans-serif;
}

h2 {
  font-size: 24px;
  color: #a57b5b; /* Light brown color */
}

h3 {
  font-size: 20px;
  margin-bottom: 15px;
}

.account-info {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.account-info-left {
  width: 45%;
}

.order-history {
  width: 45%;
}

.account-info-left p, .order-info p {
  margin-bottom: 10px;
  font-size: 16px;
}

.order-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.order-item img {
  width: 150px;
  height: auto;
  border-radius: 5px;
  margin-right: 20px;
}

.order-info {
  display: flex;
  flex-direction: column;
}

.pagination {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination span {
  margin: 0 10px;
  cursor: pointer;
}

.pagination span:hover {
  font-weight: bold;
}
</style>
