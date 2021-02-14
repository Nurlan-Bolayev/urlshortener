export function buildGuestOnlyGuard(store) {
  return async (to, from, next) => {
    if (to.matched.some(record => record.meta.guestOnly)) {
      await store.dispatch('fetchUser').catch(() => {})

      if (store.state.user) {
        return next('/');
      }
    }

    next()
  }
}
