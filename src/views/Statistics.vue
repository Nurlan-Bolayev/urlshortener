<template>
  <pre>
    {{json}}
  </pre>
</template>

<script>
import axios from '@/axios';
export default {
  name: "Statistics",
  data(){
    return {
      json : {},
    }
  },
  async mounted() {
    const {data} = await axios.get("api/PU1QQ/statistics");
    this.json = data;
 },
}
</script>

<style scoped>

</style>