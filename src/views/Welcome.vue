<template>
  <div style="height: 100%">
    <div class="d-flex align-end justify-center mb-10" style="height: 40%">
      <v-form class="d-flex align-center justify-space-around" style="width: 50%;" @submit.prevent="shorten">
        <v-text-field
            outlined
            v-model="body.url"
            style="width: 100%"
            placeholder="Enter url to shorten..."
            :error-messages="errors.url"
        />
        <v-btn class="mb-7 ml-3" style="width: 30%;" color="green" type="submit" dark :loading="isLoading">Shorten
        </v-btn>
      </v-form>
    </div>
    <div class="d-flex justify-center align-center">
      <div style="width: 50%">
        <v-card class="ma-2" v-for="(url,i) in urls" :key="i">
          <v-card-text class="d-flex">
            <v-card-text class="align-start">{{ url.url }}</v-card-text>
            <div class="d-flex justify-space-around align-center">
              <a style="margin-right: 10px;text-decoration: none" target="_blank"
                 :href="url.url">{{ shortUrl(url) }}</a>
              <button class="copy-button" @click="copy($event,url)"
                      style="background: lightblue;color: white;padding: 10px;border-radius: 4px">Copy
              </button>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import store from '@/store';

export default {
  data: () => ({
    body: {
      url: '',
    },
    isLoading: false,
    urls: [],
    value: '',
    errors: {}
  }),
  methods: {
    copy(e, url) {
      const el = document.createElement('input');
      el.value = this.shortUrl(url);

      el.style.cssText = 'position: absolute; left: -999999px; top: -999999px'
      this.$el.append(el);

      el.select();
      el.setSelectionRange(0, 99999);
      document.execCommand("copy");
      el.remove();
      this.animate(e);
    },
    animate(e) {


      console.log(e.target.color);
      e.target.style.background = 'green';
      e.target.innerText = 'Copied!';
      setInterval(() => {
        e.target.style.background = 'lightblue';
        e.target.innerText = 'Copy';
      }, 1000)
    }
    ,
    async shorten() {

      try {
        this.isLoading = true;
        const {data} = await axios.post('api/urls/add-url', this.body);
        this.urls.push(data);
        this.errors = {};
      } catch (e) {
        this.errors = e.response?.data?.errors || {};
      } finally {
        this.isLoading = false;
      }
    },

    shortUrl(url) {
      return `http://localhost:8000/api/urls/${url.short_url}`;
    }
  },

  async mounted() {
    const {data} = await axios.get(`api/urls`);
    this.urls = data;
  }
}
</script>
