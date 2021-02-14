export function buildRequiresAuthGuard(store) {
  return async (to, from, next) => {
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
  }
}
