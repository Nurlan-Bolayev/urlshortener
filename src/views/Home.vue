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
            placeholder="Shorten your url"
        />
        <v-btn class="mb-7 ml-3" style="width: 30%;" dark color="green" type="submit" :loading="isLoading">Shorten
        </v-btn>
      </v-form>
    </div>
    <div class="d-flex align-center justify-center flex-column" style="height: 100%;width: 100vw">
      <div class="mt-16 text-center" style="overflow: hidden;width: 85%">
        <v-data-table
            :headers="headers"
            :items="urls"
            :items-per-page="5"
            item-key="name"
            class="elevation-1"
            :loading="isFetchingUrls"
            no-data-text="You have no urls 🙁"
        >
          <template v-slot:item.short_url="{item}">
            <v-btn :to="`/statistics/${item.short_url}`">Url</v-btn>
          </template>

          <template v-slot:item.action="{item}">
            <div class="d-flex">
              <v-btn class="mr-3" :href="`http://localhost:8000/${item.short_url}`"
                     target="_blank">
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
              <button @click="copy($event,item)"
                      style="outline: none;color:white;background-color: #4caf50;padding: 5px 10px;width:60px;border-radius: 5px;margin-right: 10px">
                Copy
              </button>
              <v-btn class="delete-button" :loading="urlToBeDeleted === item.id" color="red" dark
                     @click="deleteUrl(item)">
                <v-icon>
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
            </div>
          </template>

          <template v-slot:item.total_clicks="{item}">
            {{ item.total_clicks ? item.total_clicks : 0 }}
          </template>
          <template v-slot:item.last_click="{value}">
            <div style="width: 100px">
              <div>
                <span v-if="value === ''">-</span>
                <span v-else class="d-flex align-content-center justify-center"><v-icon>mdi-calendar-month</v-icon>{{ value }}</span>
              </div>
            </div>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store';
import axios from '@/axios';

export default {
  async beforeRouteEnter(from, to, next) {
    await store.dispatch('fetchUser').catch(() => {
    })

    if (store.state.user) {
      next()
    } else {
      next('/welcome');
    }
  },

  data() {
    return {
      user: null,
      hasUrls: false,
      headers: [
        {text: 'ID', value: 'id', align: 'center',},
        {text: 'Url', value: 'url', align: 'center'},
        {text: 'Shortened Url', value: 'short_url', align: 'center'},
        {text: 'Action', value: 'action', align: 'center'},
        {text: 'Total clicks', value: 'click_count', align: 'center'},
        {text: 'Last-click', value: 'last_click', align: 'center'},
      ],
      errors: [],
      copiedUrl: '',
      urls: [],
      body: {
        url: '',
      },
      isLoading: false,
      isFetchingUrls: false,
      urlToBeDeleted: false
    }
  },
  methods: {
    async deleteUrl(item) {
      try {
        if(!confirm('Are you sure to delete?')){
          return
        }
        this.urlToBeDeleted = item.id;
        console.log(this.urlToBeDeleted);
        await axios.delete(`api/${item.short_url}`);
        location.reload();
      } catch (e) {
        //
      } finally {
        this.urlToBeDeleted = false;
      }
    },
    copy(e, item) {
      let input = document.createElement('input');
      this.$el.append(input);
      input.style.cssText = 'position:absolute;top:-999999px;left:-999999px';
      input.value = `http://localhost:8000/${item.short_url}`;
      console.log(e.target.value);
      e.target.style.innerText = 'Copied!';
      console.log(e.target.style.innerText);
      setInterval(() => e.target.style.innerText = 'Copy', 2000);
      input.remove();
    }
    ,
    async shorten() {
      try {
        this.isLoading = true;
        const {data} = await axios.post('api/urls/add-url', this.body);
        let exists = this.urls.filter(url => url.url === data.url).length;
        if (!exists) {
          this.urls.push(data);
        }
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
  },

  async mounted() {
    try {
      this.isFetchingUrls = true
      const {data} = await axios.get(`api/urls`);
      this.urls = data;
    } finally {
      this.isFetchingUrls = false
    }
  }
}
</script>

<style scoped>
::v-deep .v-data-table__empty-wrapper {
  color: black !important;
}
</style>