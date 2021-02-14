<template>
  <div class="d-flex flex-column justify-center align-center" style="height: 100%">
    <v-form style="width: 60%" @submit.prevent="register">
      <v-text-field
          class="ma-2 pa-6"
          v-model="body.name"
          label="Name"
          :error-messages="errors.name"
      />
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

      <v-btn style="margin: auto 45%" class="green" type="submit" :loading="isLoading">Register</v-btn>

    </v-form>
  </div>
</template>

<script>
import axios from '@/axios'
export default {
  data(){
    return {
      body : {
        name : '',
        email : '',
        password : ''
      },
      isLoading : false,
      errors : {},
    }
  },
  methods : {
    async register(){
      try {
        this.isLoading = true;
        const {data} = await axios.post('/api/register',this.body);
        this.errors = {};
        this.$store.commit('setUser', data);
        this.$router.push('/verify/email/notice');
        console.log(this.$store.state.user);
      }catch (e){
        this.errors = e.response?.data?.errors || {};
        console.log(this.errors);
      }
      finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>

</style>