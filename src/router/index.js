import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

import store from '@/store'

import { Toast } from 'vant'

// 懒加载路由组件
const Login = () => import('@/views/login')
const Myorder = () => import('@/views/myorder')
const Pay = () => import('@/views/pay')
const Prodetail = () => import('@/views/prodetail')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart, meta: { requiresAuth: true } },
        { path: '/user', component: User }
      ]
    },
    { path: '/login', component: Login },
    { path: '/myorder', component: Myorder, meta: { requiresAuth: true } },
    { path: '/pay', component: Pay, meta: { requiresAuth: true } },
    // 动态路由传参，确认将来是哪个商品，路由参数中携带 id
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  console.log('路由守卫', to.path)

  // 检查目标路由是否需要登录
  const requiresAuth = to.meta.requiresAuth
  const token = store.getters.token

  console.log('是否需要登录:', requiresAuth)
  console.log('当前 token:', token)

  if (requiresAuth && !token) {
    // 需要登录但未登录，重定向到登录页
    Toast('需要登录才能查看')
    console.log('未登录，重定向到登录页')
    next(`/login?backUrl=${encodeURIComponent(to.fullPath)}`)
  } else {
    next()
  }
})

export default router
