<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// No script needed for this static layout
</script>

<template>
  <div class="admin-page">

    <main class="content">
      <h2 class="title">KHÁCH HÀNG</h2>
      <table class="customer-table">
        <thead>
          <tr>
            <th>TÀI KHOẢN</th>
            <th>TÊN KHÁCH HÀNG</th>
            <th>EMAIL</th>
            <th>SDT</th>
            <th>SỬA / XÓA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>user001</td>
            <td>Nguyễn Văn A</td>
            <td>a.nguyen@gmail.com</td>
            <td>0123456789</td>
            <td>
              <button class="edit-btn">
                <i class="icon-edit"></i>
              </button>
              <button class="delete-btn">
                <i class="icon-delete"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>user002</td>
            <td>Trần Thị B</td>
            <td>b.tran@gmail.com</td>
            <td>0987654321</td>
            <td>
              <button class="edit-btn">
                <i class="icon-edit"></i>
              </button>
              <button class="delete-btn">
                <i class="icon-delete"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>user003</td>
            <td>Lê Văn C</td>
            <td>c.le@gmail.com</td>
            <td>0123456789</td>
            <td>
              <button class="edit-btn">
                <i class="icon-edit"></i>
              </button>
              <button class="delete-btn">
                <i class="icon-delete"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>user004</td>
            <td>Hoàng Thị D</td>
            <td>d.hoang@gmail.com</td>
            <td>0987654321</td>
            <td>
              <button class="edit-btn">
                <i class="icon-edit"></i>
              </button>
              <button class="delete-btn">
                <i class="icon-delete"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>user005</td>
            <td>Phạm Văn E</td>
            <td>e.pham@gmail.com</td>
            <td>0123456789</td>
            <td>
              <button class="edit-btn">
                <i class="icon-edit"></i>
              </button>
              <button class="delete-btn">
                <i class="icon-delete"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>user006</td>
            <td>Vũ Thị F</td>
            <td>f.vu@gmail.com</td>
            <td>0987654321</td>
            <td>
              <button class="edit-btn">
                <i class="icon-edit"></i>
              </button>
              <button class="delete-btn">
                <i class="icon-delete"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>...</span>
      </div>
    </main>
  </div>
</template>

<style scoped>
.admin-page {
  font-family: Arial, sans-serif;
  color: #333;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #b07a3a;
  padding: 15px 30px;
  color: white;
}

.brand {
  font-size: 24px;
}

.nav a {
  color: white;
  text-decoration: none;
  margin-right: 20px;
  font-weight: bold;
}

.nav a:hover {
  text-decoration: underline;
}

.admin-info {
  display: flex;
  align-items: center;
}

.admin-info span {
  margin-right: 10px;
}

.icon-user::before {
  content: '👤'; /* Placeholder for the user icon */
  font-size: 24px;
}

.content {
  padding: 30px;
}

.title {
  font-size: 28px;
  color: #b07a3a;
  margin-bottom: 20px;
}

.customer-table {
  width: 100%;
  border-collapse: collapse;
}

.customer-table th, .customer-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.customer-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.edit-btn, .delete-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.icon-edit::before {
  content: '✏️'; /* Placeholder for the edit icon */
  font-size: 18px;
}

.icon-delete::before {
  content: '🗑️'; /* Placeholder for the delete icon */
  font-size: 18px;
  color: red;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}

.pagination span {
  margin: 0 5px;
  cursor: pointer;
}

.pagination span:hover {
  text-decoration: underline;
}
</style>
