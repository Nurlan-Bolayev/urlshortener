<template>
  <div class="d-flex justify-center align-center" style="height: 100%">
    <v-card class="mr-3">
      <v-card-text style="background: #4caf50;color: white">Your email has been verified</v-card-text>
    </v-card>
    <div style="font-size: 18px">
      if you want to proceed, please click on the
      <router-link style="text-decoration: none" to="/">Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmailVerified"
}
</script>

<style scoped>

</style>