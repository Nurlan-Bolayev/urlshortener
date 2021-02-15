<template>
  <div>
    <v-form @submit.prevent="login" class="d-flex align-center justify-center pt-15">
      <v-card class="pa-5" max-width="450">
        <v-card-title>
          <h1 class="mb-5">Login</h1>
        </v-card-title>

        <v-card-text>
          <v-text-field
              label="Email"
              type="email"
              name="email"
              v-model="body.email"
              outlined
              :error-messages="errors.email"
          />

          <v-text-field
              label="Password"
              type="password"
              v-model="body.password"
              outlined
              messages=""
              :error-messages="errors.password"
          />

          <div class="d-flex" style="position: relative">
            <v-spacer/>
            <router-link to="/forgot/password" style="position: absolute; top: -21px; right: 0">
              Forgot password?
            </router-link>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" type="submit" :loading="isLoading">Login</v-btn>
          <v-spacer/>
          <div class="pl-5">
            If you don't have an account,
            <router-link to="/register">Please register</router-link>
          </div>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import axios from '@/./axios'

export default {
  data() {
    return {
      body: {
        email: '',
        password: ''
      },
      isLoading: false,
      errors: {},
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