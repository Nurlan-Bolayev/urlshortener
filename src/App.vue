<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="d-flex justify-space-around" style="width: 100%">
        <v-btn to="/"

        >Home
        </v-btn>
        <div>
          <div v-if="this.$store.state.user" style="display: flex;justify-content: space-between">
            <v-btn to="/feeds" class="mr-3">{{ this.$store.state.user.name }}
            </v-btn>
            <v-btn :loading="isLoggingOut" @click="logout">Logout</v-btn>
          </div>
          <v-btn class="" v-else to="/login">Login</v-btn>
        </div>
      </div>

      <!--      <v-spacer></v-spacer>-->
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
