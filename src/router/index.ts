import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import OrdersView from '../views/OrdersView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ContactCompleteView from '../views/ContactCompleteView.vue'
import SearchResultsView from '@/views/SearchResultsView.vue'
import OrderDetailsView from '@/views/OrderDetailsView.vue'
import CustomerAccountView from '@/views/CustomerAccountView.vue'
import ShoppingCartView from '@/views/ShoppingCartView.vue'
import PaymentConfirmationView from '@/views/PaymentConfirmation.vue'
import ResetPasswordView from '@/views/ResetPassword.vue'
import CustomersView from '@/views/CustomerView.vue'
import ProductManagementView from '@/views/ProductManagementView.vue'
import OrderManagementView from '@/views/OrderManagementView.vue'
import ContactUsManagementView from '@/views/ContactUsManagementView.vue'
import EditInformationView from '@/views/EditInformationView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/contact-complete',
    name: 'contact-complete',
    component: ContactCompleteView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/search-results',
    name: 'search-results',
    component: SearchResultsView
  },
  {
    path: '/order-details',
    name: 'order-details',
    component: OrderDetailsView
  },
  {
    path: '/customer-account',
    name: 'customer-account',
    component: CustomerAccountView
  },
  {
    path: '/shopping-cart',
    name: 'shopping-cart',
    component: ShoppingCartView
  },
  {
    path: '/payment-confirmation',
    name: 'payment-confirmation',
    component: PaymentConfirmationView
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordView
  },
  {
    path: '/edit-information',
    name: 'edit-information',
    component: EditInformationView
  },
  {
    path: '/manage-accounts',
    name: 'manage-accounts',
    component: CustomersView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/manage-products',
    name: 'manage-products',
    component: ProductManagementView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/manage-orders',
    name: 'manage-orders',
    component: OrderManagementView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/manage-contacts-us',
    name: 'manage-contacts-us',
    component: ContactUsManagementView,
    meta: { requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const userString = localStorage.getItem('user')

  const user = userString ? JSON.parse(userString) : null
  console.log("requiresAdmin", to.matched.some((record) => record.meta.requiresAdmin))
  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (user && Number(user.role) === 0) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
