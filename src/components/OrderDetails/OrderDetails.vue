<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="order-details">
    <h2>CHI TIẾT ĐƠN HÀNG</h2>

    <div class="order-items">
      <div v-for="item in orderItems" :key="item.id" class="order-item">
        <div class="item-image">
          <img :src="item.imageUrl" :alt="item.name" />
        </div>
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p>Đơn giá: {{ formatPrice(item.price) }}</p>
          <p>Số lượng: {{ item.quantity }}</p>
          <p>Thành tiền: {{ formatPrice(item.price * item.quantity) }}</p>
        </div>
      </div>
    </div>

    <div class="order-summary">
      <p><span>Tổng giá trị đơn hàng:</span> {{ formatPrice(calculateOrderValue()) }}</p>
      <p><span>Phí vận chuyển:</span> {{ formatPrice(shippingFee) }}</p>
      <p><span>Khuyến mãi:</span> {{ formatPrice(discount) }}</p>
      <p class="total"><span>Tổng thanh toán:</span> {{ formatPrice(calculateTotalAmount()) }}</p>
      <p><span>Trạng thái đơn hàng:</span> {{ orderStatus }}</p>
    </div>

    <div class="button-group">
      <button class="button-back" @click="goHome">QUAY VỀ TRANG CHỦ</button>
      <button class="button-payment" @click="showReceiverDialog" :disabled="isSubmitting">
        {{ isSubmitting ? 'ĐANG XỬ LÝ...' : 'THANH TOÁN' }}
      </button>
    </div>

    <!-- Dialog nhập thông tin người nhận -->
    <div v-if="showDialog" class="dialog-overlay">
      <div class="dialog">
        <h3>Thông tin người nhận</h3>
        <div class="form-group">
          <label>Họ tên:</label>
          <input v-model="receiver.name" type="text" required>
        </div>
        <div class="form-group">
          <label>Số điện thoại:</label>
          <input v-model="receiver.phone" type="tel" required>
        </div>
        <div class="form-group">
          <label>Địa chỉ:</label>
          <input v-model="receiver.address" type="text" required>
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input v-model="receiver.email" type="email" required>
        </div>
        <div class="dialog-buttons">
          <button @click="closeDialog">Hủy</button>
          <button @click="saveReceiverAndOrder" :disabled="!isValidForm">Xác nhận</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface Receiver {
  name: string;
  phone: string;
  address: string;
  email: string;
}

const route = useRoute();
const router = useRouter();

const orderItems = ref<OrderItem[]>([]);
const orderCode = ref(`ORD${Date.now()}`);
const orderStatus = ref('Chờ xác nhận');
const shippingFee = ref(30000);
const discount = ref(0);
const isSubmitting = ref(false);

const showDialog = ref(false);
const receiver = ref<Receiver>({
  name: '',
  phone: '',
  address: '',
  email: ''
});

// Tính tổng giá trị đơn hàng
const calculateOrderValue = () => {
  return orderItems.value.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
};

// Tính tổng thanh toán
const calculateTotalAmount = () => {
  return calculateOrderValue() + shippingFee.value - discount.value;
};

// Format giá tiền
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const goHome = () => {
  router.push('/');
};

// Thêm hàm tạo đơn hàng
const showReceiverDialog = () => {
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
};

const isValidForm = computed(() => {
  const r = receiver.value;
  console.log(r);
  return r.name && r.phone && r.address && r.email;
});

const saveReceiverAndOrder = async () => {
  try {
    isSubmitting.value = true;

    // Lấy thông tin user và token từ localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;

    // Tạo headers với token xác thực
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Lưu thông tin người nhận với headers xác thực
    const receiverResponse = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/receivers`,
      receiver.value,
      { headers }
    );
    const receiverId = receiverResponse.data.id;

    // Tạo đơn hàng với receiverId và headers xác thực
    const orderData = {
      orderDetails: orderItems.value.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      status: 'PENDING',
      receiverId: receiverId
    };

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/orders`,
      orderData,
      { headers }
    );

    if (response.data) {
      alert('Đặt hàng thành công!');
      localStorage.removeItem('cart');
      router.push('/');
    }
  } catch (error: any) {
    console.error('Lỗi khi xử lý đơn hàng:', error);
    if (error.response?.status === 401) {
      alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
      router.push('/login');
    } else if (error.response?.status === 403) {
      alert('Bạn không có quyền thực hiện thao tác này!');
    } else {
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  } finally {
    isSubmitting.value = false;
    showDialog.value = false;
  }
};

onMounted(() => {
  // Load sản phẩm từ localStorage
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    orderItems.value = JSON.parse(savedCart).filter((item: OrderItem) => item.quantity > 0);
  }
});
</script>

<style scoped>
.order-details {
  max-width: 800px;
  margin: 50px auto;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.order-header {
  margin-bottom: 20px;
  text-align: left;
}

.order-items {
  margin: 20px 0;
}

.order-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.item-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

.item-details {
  margin-left: 20px;
  text-align: left;
  flex: 1;
}

.item-details h3 {
  margin: 0 0 10px 0;
  color: #795548;
}

.order-summary {
  margin-top: 20px;
  text-align: right;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.order-summary p {
  margin: 10px 0;
}

.order-summary span {
  font-weight: bold;
  margin-right: 10px;
}

.total {
  font-size: 1.2em;
  color: #795548;
  font-weight: bold;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
}

.button-back:hover {
  background-color: #5d4037;
}

.button-payment {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.button-payment:hover {
  background-color: #45a049;
}

.button-payment:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.dialog-buttons button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dialog-buttons button:first-child {
  background-color: #ccc;
}

.dialog-buttons button:last-child {
  background-color: #4CAF50;
  color: white;
}

.dialog-buttons button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
