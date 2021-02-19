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
        <v-btn class="mb-7 ml-3" color="green" type="submit" dark :loading="isLoading">Shorten
        </v-btn>
      </v-form>
    </div>
    <div class="d-flex justify-center align-center flex-column">
      <v-card class="ma-2" v-for="(url,i) in urls" :key="i">
        <v-card-text class="d-flex flex-column flex-sm-row align-sm-center justify-space-around">
          <span class="collapse-text mr-3">{{ url.url }}</span>

          <div class="d-flex align-center">
            <a class="short-url collapse-text" :href="url.url" target="_blank">{{ shortUrl(url) }}</a>

            <v-btn :color="isCopied[i] ? 'success' : 'blue lighten-1'" dark @click="copy(url, i)">
              {{ isCopied[i] ? 'Copied!' : 'Copy' }}
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import store from '@/store';

export default {
  async beforeRouteEnter(from, to, next) {
    await store.dispatch('fetchUser').catch(() => {
    })

    if (store.state.user) {
      next('/')
    } else {
      next();
    }
  },
  data: () => ({
    body: {
      url: '',
    },
    isLoading: false,
    isCopied: {},
    urls: [],
    value: '',
    errors: {}
  }),

  methods: {
    copy(url, i) {
      const el = document.createElement('input');
      el.value = this.shortUrl(url);

      el.style.cssText = 'position: absolute; left: -999999px; top: -999999px'
      this.$el.append(el);

      el.select();
      el.setSelectionRange(0, 99999);
      document.execCommand("copy");
      el.remove();

      this.isCopied = {...this.isCopied, [i]: true}
      setTimeout(() => this.isCopied = {...this.isCopied, [i]: false}, 1000)
    },

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
      return `http://localhost:8000/${url.short_url}`;
    }
  },

  async mounted() {
    const {data} = await axios.get(`api/urls`);
    this.urls = data;
  }
}
</script>

<style scoped>
.collapse-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.short-url {
  margin-right: 10px;
  text-decoration: none
}
</style>