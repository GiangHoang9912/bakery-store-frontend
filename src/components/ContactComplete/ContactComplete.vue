<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const goToHomePage = () => {
  // Xử lý logic chuyển về trang chủ
  console.log('Chuyển về trang chủ');
}
</script>

<template>
  <div class="contact-container">
    <h1 class="contact-title">CONTACT US</h1>
    <div class="contact-content">
      <div class="contact-info">
        <p>Our shop would be delighted to assist as you discover Thùy Phạm Mooncake and its products.</p>
        <p>You may contact our Customer Service by call on .</p>
        <p>Service available from Monday to Saturday from 9 am to 9 pm and Sunday 11am - 7pm.</p>
      </div>
      <div class="contact-success">
        <p>Yêu cầu của quý khách đã được gửi thành công !</p>
        <p></p>
        <button @click="goToHomePage" class="home-button">QUAY VỀ TRANG CHỦ</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  font-family: Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 10rem;
}

.contact-title {
  color: #c9a063;
  font-size: 24px;
  margin-bottom: 20px;
}

.contact-content {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

.contact-info,
.contact-success {
  flex: 1;
}

.contact-success {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.home-button {
  background-color: #8b572a;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
}
</style>