<script setup lang="ts">
</script>

<template>
  <div class="outer-container">
    <h2>CHỈNH SỬA THÔNG TIN</h2>
    <div class="container">
      <form class="form">
        <input type="text" placeholder="Tên tài khoản" class="input-field" />
        <input type="text" placeholder="Họ tên" class="input-field" />
        <input type="text" placeholder="SDT" class="input-field" />
      </form>
    </div>
    <button type="submit" class="submit-button">Xác nhận thay đổi</button>
  </div>
</template>

<style scoped>
body, html {
  height: 100%;
  margin: 0;
}

.outer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  padding: 1rem;
  box-sizing: border-box;
  gap: 1.5rem; /* Khoảng cách giữa tiêu đề, nội dung, và nút */
}

h2 {
  font-size: 1.8rem;
  font-weight: normal;
  color: #8c5c33;
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
}

.input-field {
  padding: 0.8rem;
  font-size: 1.1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
}

.submit-button {
  padding: 1rem;
  font-size: 1.1rem;
  color: white;
  background-color: #8c5c33;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 400px;
}

.submit-button:hover {
  background-color: #704622;
}
</style>
