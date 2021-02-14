<template>
  <div class="d-flex flex-column justify-center align-center" style="height: 100%">
    <v-form style="width: 40%" @submit.prevent="login">
      <v-text-field
          class="ma-2 pa-6"
          v-model="body.email"
          label="Email"
          :error-messages="errors.email"
      />
      <v-text-field
          class="ma-2 pa-6"
          v-model="body.password"
          :error-messages="errors.password"
          label="Password"
          type="password"
      />

      <v-btn style="margin: auto 45%" color="green" type="submit" :loading="isLoading">Login</v-btn>

    </v-form>
    <div class="mt-5 d-flex justify-center"><router-link style="text-decoration: none" to="/forgot/password">Forgot your password?</router-link></div>
    <div style="margin-top: 80px">If you do not have an account,please <router-link style="text-decoration: none" to="/register">Register</router-link></div>
  </div>
</template>

<script>
import axios from '@/./axios'
export default {
  data(){
    return {
      body : {
        email : '',
        password : ''
      },
      isLoading : false,
      errors : {},
    }
  },
  methods: {
    async login() {
      try {
        this.isLoading = true;
        const {data} = await axios.post('/api/login', this.body);
        this.$store.commit('setUser', data);
        this.$router.push(this.$route.query.redirect ?? '/');
      } catch (e) {
        this.errors = e.response?.data?.errors || {};
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>

</style>