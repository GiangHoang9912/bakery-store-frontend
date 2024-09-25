<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="order-details">
    <h2>CHI TIẾT ĐƠN HÀNG</h2>
    <div class="order-info">
      <div class="order-info-left">
        <p><strong>Mã đơn hàng:</strong> {{ orderCode }}</p>
        <img :src="productImage" alt="Trung thu giftset" />
      </div>
      <div class="order-info-right">
        <p><span>Tên sản phẩm:</span> {{ productName }}</p>
        <p><span>Tổng giá trị đơn hàng:</span> {{ orderValue }}</p>
        <p><span>Khuyến mãi:</span> {{ discount }}</p>
        <p><span>Phí vận chuyển:</span> {{ shippingFee }}</p>
        <p><span>Tổng thanh toán:</span> {{ totalAmount }}</p>
        <p><span>Trạng thái đơn hàng:</span> {{ orderStatus }}</p>
      </div>
    </div>
    <button class="button-back" @click="goHome">QUAY VỀ TRANG CHỦ</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const orderCode = ref('AB120');
const productName = ref('Trung thu giftset');
const orderValue = ref('530.000');
const discount = ref('0');
const shippingFee = ref('30.000');
const totalAmount = ref('560.000');
const orderStatus = ref('Chờ xác nhận');
const productImage = ref('https://via.placeholder.com/150'); // Placeholder image

const goHome = () => {
  alert('Quay về trang chủ');
};
</script>

<style scoped>
.order-details {
  max-width: 700px;
  margin: 50px auto;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: Arial, sans-serif;
}

h2 {
  color: #795548;
  margin-bottom: 30px;
}

.order-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-info-left {
  text-align: left;
}

.order-info-left p {
  font-size: 16px;
  margin-bottom: 10px;
}

.order-info-left img {
  width: 150px;
  border-radius: 5px;
}

.order-info-right {
  text-align: left;
  flex: 1;
  margin-left: 20px;
}

.order-info-right p {
  font-size: 16px;
  margin-bottom: 8px;
}

.order-info-right span {
  font-weight: bold;
}

.button-back {
  display: inline-block;
  padding: 10px 20px;
  background-color: #795548;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.button-back:hover {
  background-color: #5d4037;
}
</style>
