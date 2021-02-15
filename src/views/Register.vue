<template>
  <div>
    <v-form @submit.prevent="register" class="d-flex align-center justify-center pt-15">
      <v-card class="pa-5" width="450">
        <v-card-title>
          <h1 class="mb-5">Sign up</h1>
        </v-card-title>

        <v-card-text>
          <v-text-field
              label="Name"
              name="name"
              type="name"
              v-model="body.name"
              outlined
              :error-messages="errors.name"
          />

          <v-text-field
              label="Email"
              v-model="body.email"
              outlined
              :error-messages="errors.email"
          />

          <v-text-field
              type="password"
              label="Password"
              v-model="body.password"
              outlined
              :error-messages="errors.password"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" type="submit" :loading="isLoading">Register</v-btn>
          <v-spacer/>
          <div class="pl-5">
            Have an account?
            <router-link to="/login">Login here.</router-link>
          </div>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  data() {
    return {
      body: {
        name: '',
        email: '',
        password: ''
      },
      isLoading: false,
      errors: {},
    }
  },
  methods: {
    async register() {
      try {
        this.isLoading = true;
        const {data} = await axios.post('/api/register', this.body);
        this.errors = {};
        this.$store.commit('setUser', data);
        this.$router.push('/verify/email/notice');
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