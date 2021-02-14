import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    await store.dispatch('fetchUser').catch(() => {})

    if (store.state.user) {
      return next();
    }

    return next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
  }

  next()
})


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
