<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const submitForm = () => {
  // Handle form submission
  console.log('Form submitted');
}
</script>

<template>
  <div class="contact-container">
    <h1 class="contact-title">CONTACT US</h1>
    <div class="contact-content">
      <div class="contact-text">
        <p>Our shop would be delighted to assist as you discover Thùy Phạm Mooncake and its products.</p>
        <p>You may contact our Customer Service by call on .</p>
        <p>Service available from Monday to Saturday from 9 am to 9 pm and Sunday 11am - 7pm.</p>
      </div>
      <form class="contact-form" @submit.prevent="submitForm">
        <input type="text" placeholder="Họ tên" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Số điện thoại" />
        <textarea placeholder="Note"></textarea>
        <button type="submit">Gửi</button>
      </form>
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
  gap: 40px;
}

.contact-text {
  flex: 1;
}

.contact-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input,
textarea,
button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  height: 100px;
  resize: vertical;
}

button {
  background-color: #8b572a;
  color: white;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  width: auto;
  padding: 10px 20px;
}
</style>