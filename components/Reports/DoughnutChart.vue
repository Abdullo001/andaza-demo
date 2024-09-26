<template>
  <div>
    <v-card elevation="0" rounded="lg">
      <v-card-title class="d-flex align-center justify-space-between">
        <div>Prefinance creators</div>
      </v-card-title>
      <v-card-text>
        <div style="min-height: 400px">
          <VueApexChart
            height="400"
            type="donut"
            :options="chartOptions"
            :series="series"
          ></VueApexChart>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  ssr:false,
  name: "DoughnutChartComponent",
  data() {
    return {
      creators: [],
      items: [],
    };
  },
  computed: {
    ...mapGetters({
      prefinancesCreator: "report/prefinancesCreator",
    }),

    chartOptions: {
      get() {
        return {
          colors: [
                "#544b99",
                "#10BF41",
                "#FFC915",
                "#397CFD",
                "#00ffd5",
                "#ff00b3",
                "#c800ff",
                "#03fcbe",
                "#fc7703",
              ],
          labels: this.creators,
          chart: {
            type: "donut",
          },
          plotOptions: {
            pie: {
              donut: {
                // size: '200px',
                labels: {
                  show: true,
                  total: {
                    show: true,
                    showAlways: true,
                    fontSize: "24px",
                  },
                },
              },
            },
          },
          legend: {
            show: true,
            position: "bottom",
            fontSize: "18px",
            markers: {
              width: 18,
              height: 12,
              radius: 0,
            },
          },
          fill: {
            opacity: 1,
            // colors:["#544b99", "#eef0fa"]
          },
          tooltip: {
            enabled: false,
          },
        };
      },
    },

    series: {
      get() {
        return [...this.items];
      },
    },
  },

  watch: {
    prefinancesCreator(val) {
      this.creators = [];
      this.items = [];
      val.itemReports.forEach((item) => {
        this.creators.push(`${item.creator}: ${item.preFinanceCount}`);
        this.items.push(item.preFinanceCount);
      });
    },
  },

  methods:{
  }
};
</script>

<style lang="scss" scoped></style>
