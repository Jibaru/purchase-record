import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../auth/views/LoginView.vue'
import HomeView from '../home/views/HomeView.vue'
import PurchaseRecordsView from '../home/purchase-records/views/PurchaseRecordsView.vue'
import UsersView from '../home/users/views/UsersView.vue'
import VouchersView from '../home/vouchers/views/VouchersView.vue'
import VoucherView from '../home/voucher/views/VoucherView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'users',
          name: 'users',
          component: UsersView
        },
        {
          path: 'vouchers',
          name: 'vouchers',
          component: VouchersView
        },
        {
          path: '/vouchers/:id',
          name: 'voucher',
          props: true,
          component: VoucherView
        },
        {
          path: 'purchase-records',
          name: 'purchaseRecords',
          component: PurchaseRecordsView
        }
      ]
    }
  ]
})

export default router
