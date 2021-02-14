<template>
  <div class="d-flex align-content-center justify-center" style="margin-top:200px; width: 100vw">
    <v-form style="height: 100%;width: 70%" @submit.prevent="sendResetLink">
      <h2 class="mb-5">Enter the email to reset password</h2>
      <v-text-field
          label="Email"
          outlined
          placeholder="Enter the email to reset password"
          v-model="body.email"
          :error-messages="errors.email"
      />

      <v-btn color="green" dark type="submit" :loading="isLoading">Send reset link</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  data() {
    return {
      isLoading: false,
      body: {
        email: ''
      },
      errors: {}
    }
  },
  methods: {
    async sendResetLink() {
      try {
        this.isLoading = true;
        await axios.post('api/forgot-password', this.body);
        this.errors = {};
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