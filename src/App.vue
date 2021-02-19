<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <router-link to="/">
        <div class="d-flex align-center">
        <span class="pl-5"
              style="color: white; font-size: x-large; font-family: cursive; font-weight: bold; font-style: italic">
          Url Shortener App
        </span>
        </div>
      </router-link>

      <v-spacer/>

      <div>
        <v-menu v-if="$store.state.user" offset-y>
          <template #activator="{on}">
            <v-btn text v-on="on">
              {{ $store.state.user.name }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item to="/">
              <v-list-item-title>
                Home
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>
                Log out
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <div v-else>
          <v-btn text to="/login">Login</v-btn>
          <v-btn text to="/register">Sign up</v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-main class="main">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import axios from '@/./axios';

export default {
  name: 'App',
  data() {
    return {
      openedMenu: false,
      isLoggingOut: false
    }
  },
  methods: {
    async logout() {
      try {
        this.isLoggingOut = true;
        await axios.post('api/logout');
        this.$store.commit('setUser', null);
        this.$router.push('/welcome');
      } finally {
        this.isLoggingOut = false;
      }
    }
  }
  ,
  async mounted() {
    await this.$store.dispatch('fetchUser');
  },
};
</script>

<style>

.main {

}
</style>
