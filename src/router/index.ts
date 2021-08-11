import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/components/public/Login.vue'
import Register from '@/components/public/Register.vue'
import Secure from '@/components/secure/Secure.vue'
import Dashboard from '@/components/secure/dashboard/Dashboard.vue'
import Users from '@/components/secure/Users/users.vue'
import userCreate from '@/components/secure/Users/userCreate.vue'
import userEdit from '@/components/secure/Users/userEdit.vue'
import Roles from '@/components/secure/roles/roles.vue'
import RoleCreate from '@/components/secure/roles/roleCreate.vue'
import RoleEdit from '@/components/secure/roles/roleEdit.vue'
import Products from '@/components/secure/products/products.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/',
    component: Secure,
    children: [
      {
        path: '/',
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        component: Dashboard
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/users/create',
        component: userCreate
      },
      {
        path: '/users/:id/edit',
        component: userEdit
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/roles/create',
        component: RoleCreate
      },
      {
        path: '/roles/:id/edit',
        component: RoleEdit
      },
      {
        path: '/products',
        component: Products
      }

    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
