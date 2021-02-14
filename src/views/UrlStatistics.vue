<template>
  <div>
    <div style="width:100%;display: flex;justify-content: center;align-content: center">
      <chart-vue style="height:100%;width: 50%;display: flex;justify-content: center;align-content: center" :option="dataSet.options" :chart-data="dataSet"></chart-vue>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';
import ChartVue from '@/views/Chart';

export default {
  components: {
    ChartVue
  },
  data() {
    return {
      urlData: {},
      data: null,
      dataSet: {
        labels: [],
        datasets: [
          {
            label: 'Click count per month',
            fill: false,
            borderColor: '#f87979',
            data: []
          }
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      },
      total_clicks: 0,
    }
  },
  async mounted() {
    try {
      const {data} = await axios.get(`api/${this.$route.params.short_url}/statistics`);
      this.total_clicks = data.total_clicks;
      console.log(this.total_clicks);

      this.dataSet.labels = Object.keys(data.click_count).map(x => new Date(x).toDateString().split(' ')[1])
      this.dataSet.datasets[0].data = Object.values(data.click_count);
      this.dataSet = {...this.dataSet}
    } finally {
      //
    }

    //  try {
    //    const {data} = await axios.get(`api/${this.$route.params.short_url}/statistics`);
    //    this.data = data;
    //  }finally {
    //    //
    //  }
  }
}
</script>

<style scoped>

</style>