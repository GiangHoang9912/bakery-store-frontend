<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const products = [
  { name: 'Bánh Trung Thu', price: '200.000', sold: 50, remaining: 20 },
  { name: 'Bánh Dẻo', price: '180.000', sold: 40, remaining: 10 },
  { name: 'Bánh Nướng', price: '150.000', sold: 30, remaining: 15 },
  { name: 'Bánh Ngọt', price: '170.000', sold: 35, remaining: 12 }
];

// Function to delete a product
const deleteProduct = (index: number) => {
  products.splice(index, 1);
};

// Function to edit a product
const editProduct = (index: number) => {
  alert(`Edit product at index ${index}`);
};
</script>

<template>
  <div class="product-management">
    <h1>QUẢN LÍ SẢN PHẨM</h1>
    <table>
      <thead>
        <tr>
          <th>TÊN SẢN PHẨM</th>
          <th>ĐƠN GIÁ</th>
          <th>ĐÃ BÁN</th>
          <th>CÒN LẠI</th>
          <th>SỬA / XÓA</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.sold }}</td>
          <td>{{ product.remaining }}</td>
          <td>
            <button class="edit-btn" @click="editProduct(index)">
              <img alt="Edit" />
            </button>
            <button class="delete-btn" @click="deleteProduct(index)">
              <img alt="Delete" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination">
      <button class="page-btn">1</button>
      <button class="page-btn">2</button>
      <button class="page-btn">3</button>
      <span>...</span>
      <button class="next-btn">></button>
    </div>
  </div>
</template>

<style scoped>
.product-management {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
  min-height: 80vh; /* To ensure space between content and footer */
  position: relative;
}

h1 {
  font-size: 24px;
  color: #b07a3a;
}

table {
  width: 80%;
  margin: 0 auto;
  border-collapse: collapse;
  text-align: left;
  border: 1px solid #ddd;
}

thead th {
  background-color: #f4f4f4;
  padding: 10px;
  border: 1px solid #ddd;
}

tbody td {
  padding: 10px;
  border: 1px solid #ddd;
}

.edit-btn,
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.edit-btn img {
  width: 20px;
  height: 20px;
}

.delete-btn img {
  width: 20px;
  height: 20px;
}

.pagination {
  position: fixed;
  bottom: 20px; /* Adjust this value to control the distance from the bottom */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 10px;
}

.page-btn,
.next-btn {
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px 10px;
  cursor: pointer;
}

.page-btn:hover,
.next-btn:hover {
  background-color: #f4f4f4;
}

.page-btn.active {
  background-color: #b07a3a;
  color: white;
}

.next-btn {
  padding: 5px 15px;
}
</style>

