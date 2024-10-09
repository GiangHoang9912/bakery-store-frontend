<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import emitter from '../../eventBus';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const login = async (e: Event) => {
  e.preventDefault();
  try {
    console.log(email.value, password.value);
    const response = await axios.post('http://127.0.0.1:8080/api/auth/login', {
      email: email.value,
      password: password.value,
    });

    console.log(response.data);

    if (response.status === 200) {
      const { token, role, fullname, email, phone } = response.data;
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        token,
        role,
        fullname,
        email,
        phone,
      }));
      emitter.emit('login'); // Emit login event
      router.push('/');
    }
  } catch (error) {
    console.error('Login error:', error);
    errorMessage.value = 'Invalid email or password';
  }
};
</script>

<template>
  <div class="login-container">
    <h2>Đăng nhập</h2>
    <form action="#">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Mật khẩu" required>
      <!-- <button type="submit">Đăng nhập</button> -->
      <button @click="login">Đăng nhập</button>
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
