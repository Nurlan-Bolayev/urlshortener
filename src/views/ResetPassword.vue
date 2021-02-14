<template>
  <div style="display:flex;justify-content:center;margin-top:200px;align-content: center;width: 100vw">
    <v-form style="height: 100%;width: 70%" @submit.prevent="resetPassword">
      <v-text-field
          label="Email"
          outlined
          placeholder="Enter the email to reset password"
          v-model="body.email"
          :error-messages="errors.email"
      />
      <v-text-field
          label="New password"
          outlined
          placeholder="Enter the new password"
          v-model="body.password"
          :error-messages="errors.password"
      />
      <v-text-field
          label="Confirm the password"
          outlined
          placeholder="Confirm the password"
          v-model="body.password_confirmation"
          :error-messages="errors.password_confirmation"
      />

      <v-btn color="green" dark type="submit" :loading="isLoading">Reset</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from '@/axios'
export default {
 data(){
   return {
     isLoading : false,
     body : {
       email : '',
       password : '',
       password_confirmation : '',
       token : this.$route.query.token
     },
     errors : {}
   }
 },
  methods : {
   async resetPassword(){
     try {
     this.isLoading = true;
     await axios.post('api/reset-password',this.body);
     this.errors = {};
     }catch (e){
       this.errors = e.response?.data?.errors || {};
     }finally {
       this.isLoading = false;
     }
   }
  },mounted() {
  }
}
</script>

<style scoped>

</style>