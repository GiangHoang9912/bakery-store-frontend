import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductsView from "../views/ProductsView.vue";
import OrdersView from "../views/OrdersView.vue";
import ContactView from "../views/ContactView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ContactCompleteView from "../views/ContactCompleteView.vue";
import SearchResultsView from "@/views/SearchResultsView.vue";
import OrderDetailsView from "@/views/OrderDetailsView.vue";
import CustomerAccountView from "@/views/CustomerAccountView.vue";
import ShoppingCartView from "@/views/ShoppingCartView.vue";
import PaymentConfirmationView from "@/views/PaymentConfirmation.vue";
import ResetPasswordView from "@/views/ResetPassword.vue";
import CustomersView from "@/views/CustomerView.vue";
import ProductManagementView from "@/views/ProductManagementView.vue";
import OrderManagementView from "@/views/OrderManagementView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/products",
      name: "products",
      component: ProductsView,
    },
    {
      path: "/orders",
      name: "orders",
      component: OrdersView,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },
    {
      path: "/contact-complete",
      name: "contact-complete",
      component: ContactCompleteView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView
    },
    {
      path: "/search-results",
      name: "search-results",
      component: SearchResultsView
    },
    {
      path: "/order-details",
      name: "order-details",
      component: OrderDetailsView
    },
    {
      path: "/customer-account",
      name: "customer-account",
      component: CustomerAccountView
    },
    {
      path: "/shopping-cart",
      name: "shopping-cart",
      component: ShoppingCartView
    },
    {
      path: "/payment-confirmation",
      name: "payment-confirmation",
      component: PaymentConfirmationView
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPasswordView
    },
    {
      path: "/customers",
      name: "customers",
      component: CustomersView
    },
    {
      path: "/product-management",
      name: "product-management",
      component: ProductManagementView
    },
    {
      path: "/order-management",
      name: "order-management",
      component: OrderManagementView
    },
    

  ],
});

export default router;
