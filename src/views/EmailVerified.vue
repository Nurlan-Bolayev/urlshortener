<template>
  <div>
    <v-card>
      <v-card-text>Your email has been verified</v-card-text>
    </v-card>
    <div>
      if you want to proceed, please click on the
      <router-link to="/feeds">link</router-link>
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