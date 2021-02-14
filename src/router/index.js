import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Login from "@/views/Login";
import Register from "@/views/Register";
import Home from "@/views/Home";
import UrlStatistics from "@/views/UrlStatistics";
import VerifyEmailNotice from '@/views/VerifyEmailNotice'
import EmailVerified from "@/views/EmailVerified";
import ForgotPassword from "@/views/ForgotPassword";
import ResetPassword from "@/views/ResetPassword";

Vue.use(VueRouter)

const routes = [
  {
    path: '/welcome',
    component: Welcome
  },

  {
    path: '/register',
    component: Register,
    meta: { guestOnly: true }
  },

  {
    path: '/login',
    component: Login,
    meta: { guestOnly: true }
  },

  {
    path: '/',
    component: Home,
  },

  {
    path: '/statistics/:short_url',
    component: UrlStatistics,
    meta: { requiresAuth: true }
  },

  {
    path: '/verify/email/notice',
    component: VerifyEmailNotice
  },

  {
    path: '/email/verified/',
    component: EmailVerified
  },
  {
    path: '/forgot/password/',
    component: ForgotPassword
  },
  {
    path: '/reset/password/',
    component: ResetPassword
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
