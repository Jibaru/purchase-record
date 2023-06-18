import { createRouter, createWebHistory } from 'vue-router'
import CostCentersView from '../home/cost-centers/views/CostCentersView.vue'
import LoginView from '../auth/views/LoginView.vue'
import HomeView from '../home/views/HomeView.vue'
import PurchaseRecordsView from '../home/purchase-records/views/PurchaseRecordsView.vue'
import SuppliersView from '../home/suppliers/views/SuppliersView.vue'
import SupplierView from '../home/suppliers/views/SupplierView.vue'
import ItemsView from '../home/items/views/ItemsView.vue'
import ItemView from '../home/items/views/ItemView.vue'
import UsersView from '../home/users/views/UsersView.vue'
import VouchersView from '../home/vouchers/views/VouchersView.vue'
import VoucherView from '../home/voucher/views/VoucherView.vue'

const router = createRouter({
  history: createWebHistory(),
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
        },
        {
          path: 'suppliers',
          name: 'suppliers',
          component: SuppliersView
        },
        {
          path: '/suppliers/:reference',
          name: 'supplier',
          props: true,
          component: SupplierView
        },
        {
          path: 'items',
          name: 'items',
          component: ItemsView
        },
        {
          path: '/items/:reference',
          name: 'item',
          props: true,
          component: ItemView
        },
        {
          path: 'cost-centers',
          name: 'costCenters',
          component: CostCentersView
        }
      ]
    }
  ]
})

export default router
