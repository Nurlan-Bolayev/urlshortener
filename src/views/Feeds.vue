<template>
  <div>
    <div style="width: 50%;margin: 200px 25% 50px 25%">
      <v-form class="d-flex align-center justify-center justify-space-around" @submit.prevent="shorten">
        <v-text-field
            ref="input"
            outlined
            v-model="body.url"
            style="width: 100%"
            :error-messages="errors.url"
            placeholder="Insert url..."
        />
        <v-btn class="mb-7 ml-3" style="width: 30%;" dark color="green" type="submit" :loading="isLoading">Shorten
        </v-btn>
      </v-form>
    </div>
    <div class="d-flex align-center justify-center flex-column" style="height: 100%">
      <div class="mt-16" style="width: 50%">
        <v-data-table
            v-if="urls.length"
            :headers="headers"
            :items="urls"
            :items-per-page="5"
            item-key="name"
            class="elevation-1"
            :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
    }"
        >
          <template v-slot:item.short_url="{item}">
            <v-btn :to="`/statistics/${item.short_url}`">Url</v-btn>
          </template>

          <template v-slot:item.action="{item}">
            <v-btn :href="`http://localhost:8000/api/urls/${item.short_url}`" target="_blank">
              <v-icon>{{ mdiOpenInNew }}</v-icon>
            </v-btn>
          </template>

          <template v-slot:item.total_clicks="{item}">
            {{ item.total_clicks }}
          </template>
        </v-data-table>
        <div class="d-flex justify-center" v-else-if="hasUrls">You have no urls</div>
      </div>
    </div>
  </div>
</template>
<script>
// import ChartVue from '@/views/Chart';
import axios from '@/axios';
import {mdiOpenInNew} from '@mdi/js';

export default {
  data() {
    return {
      user: null,
      hasUrls: false,
      mdiOpenInNew: mdiOpenInNew,
      headers: [
        {text: 'ID', value: 'id'},
        {text: 'Url', value: 'url'},
        {text: 'Shortened Url', value: 'short_url'},
        {text: 'Action', value: 'action'},
        {text: 'Total clicks', value: 'click_count'},
        {text: 'Last-click', value: 'last_click'},
      ],
      errors: [],
      urls: [],
      body: {
        url: '',
      },
      isLoading: false,
    }
  },
  methods: {
    async shorten() {
      try {
        this.isLoading = true;
        const {data} = await axios.post('api/urls/add-url', this.body);
        console.log(data);
        this.urls.push(data);
        this.errors = {};
      } catch (e) {
        this.errors = e.response?.data?.errors || {};
      } finally {
        this.isLoading = false;
      }
    }
  },
  created() {
    this.hasUrls = Boolean(this.urls.length) || false
  }
  ,
  async mounted() {
    console.log(this.$store.state.user);
    console.log(this.mdiOpenInNew);
    try {
      console.log(this.$store.state.user);
      const {data} = await axios.get(`api/urls`);
      console.log(this.user);
      this.urls = data;
    } finally {
      //
    }
  }
}
</script>

<style scoped>

</style>