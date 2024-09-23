<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
</script>

<template>
  <div class="login-container">
    <h2>Đăng nhập</h2>
    <form action="#">
      <input type="email" placeholder="Email" required>
      <input type="password" placeholder="Mật khẩu" required>
      <button type="submit">Đăng nhập</button>
    </form>
    <a href="#">Quên mật khẩu?</a>
    <a href="#">Đăng kí tài khoản</a>
  </div>
</template>

<style lang="css">
.login-container {
  margin-top: 10rem;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100vw;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-container h2 {
  color: #a56538;
  margin-bottom: 20px;
}

.login-container input[type="email"],
.login-container input[type="password"] {
  width: 30%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.login-container button {
  width: 30%;
  padding: 10px;
  background-color: #a56538;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-container button:hover {
  background-color: #8b4e27;
}

.login-container a {
  display: block;
  margin-top: 15px;
  text-decoration: none;
  color: #333;
}

.login-container a:hover {
  text-decoration: underline;
}
</style>
