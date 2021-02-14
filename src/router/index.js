import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import Register from "@/views/Register";
import Feeds from "@/views/Feeds";
import UrlStatistics from "@/views/UrlStatistics";
import VerifyEmailNotice from '@/views/VerifyEmailNotice'
import EmailVerified from "@/views/EmailVerified";
import ForgotPassword from "@/views/ForgotPassword";
import ResetPassword from "@/views/ResetPassword";
// import Statistics from "@/views/Statistics";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/register',
    component: Register
  },

  {
    path: '/login',
    component: Login
  },

  {
    path: '/feeds',
    component: Feeds,
    meta: { requiresAuth: true }
  },

  {
    path: '/statistics/:short_url',
    component: UrlStatistics
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
