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
    <div class="d-flex align-center justify-center" style="height: 100%;width: 100vw">
      <div class="mt-16" style="width: 85%">
        <v-data-table
            :headers="headers"
            :items="urls"
            item-key="name"
            class="elevation-3"
            :loading="isFetchingUrls"
            no-data-text="You have no urls 🙁"
        >
          <template #top>
            <div class="pt-2"></div>
          </template>

          <template #item.url="{value}">
            <div class="d-flex align-center">
              <span class="collapse-text">{{ value }}</span>
              <v-btn class="mr-3" icon :href="value" target="_blank">
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </div>
          </template>

          <template v-slot:item.short_url="{item}">
            <span class="mr-3">{{ shortUrl(item) }}</span>
            <v-btn
                depressed
                small
                dark
                :color="isCopied[item.id] ? 'success' : 'blue lighten-1'"
                @click="copy(item, item.id)"
            >
              {{ isCopied[item.id] ? 'Copied!' : 'Copy' }}
            </v-btn>
          </template>

          <template v-slot:item.action="{item}">
            <div class="d-flex align-center">
              <v-btn color="primary" class="mr-3" small dark :to="`/statistics/${item.id}`">
                <v-icon left>
                  mdi-eye
                </v-icon>

                Statistics
              </v-btn>

              <v-btn
                  class="delete-button"
                  icon
                  color="red"
                  dark
                  :loading="urlToBeDeleted === item.id"
                  @click="deleteUrl(item)"
              >
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
                <span v-if="value" class="d-flex align-content-center justify-center">
                  <v-icon>mdi-calendar-month</v-icon>
                  {{ value }}
                </span>
                <span v-else>Not clicked yet</span>
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
      headers: [
        {text: 'ID', value: 'id', align: 'center',},
        {text: 'Url', value: 'url', align: 'center'},
        {text: 'Shortened Url', value: 'short_url', align: 'center'},
        {text: 'Action', value: 'action', align: 'center', sortable: false},
        {text: 'Total clicks', value: 'click_count', align: 'center'},
        {text: 'Last-click', value: 'last_click', align: 'center'},
      ],
      errors: {},
      urls: [],
      body: {
        url: '',
      },
      isLoading: false,
      isFetchingUrls: false,
      urlToBeDeleted: false,
      isCopied: {},
    }
  },
  methods: {
    async deleteUrl(item) {
      try {
        if (!confirm('Are you sure to delete?')) {
          return
        }

        this.urlToBeDeleted = item.id;
        await axios.delete(`api/${item.short_url}`);
        this.fetchUrls();
      } catch (e) {
        //
      } finally {
        this.urlToBeDeleted = false;
      }
    },
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


    shortUrl(url) {
      return `http://localhost:8000/${url.short_url}`;
    },

    async fetchUrls() {
      try {
        this.isFetchingUrls = true
        const {data} = await axios.get(`api/urls`);
        this.urls = data;
      } finally {
        this.isFetchingUrls = false
      }
    },

    async shorten() {
      try {
        this.isLoading = true;
        const {data} = await axios.post('api/urls/add-url', this.body);
        const exists = this.urls.filter(url => url.url === data.url).length;
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

  mounted() {
    this.fetchUrls()
  }
}
</script>

<style scoped>
::v-deep .v-data-table__empty-wrapper {
  color: black !important;
}

.collapse-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>