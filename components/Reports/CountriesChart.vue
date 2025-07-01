<template>
  <div>
    <v-card elevation="0" rounded="lg">
      <v-card-title class="d-flex align-center justify-space-between">
        <div>{{ $t("report.orderByCountries") }}</div>
      </v-card-title>
      <v-card-text>
        <div style="min-height: 400px">
          <div>
            <VueApexChart
              height="400"
              type="donut"
              :options="chartOptions"
              :series="series"
            ></VueApexChart>
          </div>
          <v-row class="mt-2">
            <v-col
              cols="6"
              v-for="(item, idx) in countryReport.itemReports"
              :key="idx"
            >
              <div class="" style="background-color: #eef0fa; padding: 8px; border-radius:8px;">
                <div class="d-flex">
                  <div
                    :style="{
                      backgroundColor: colors[idx],
                      width: '21px',
                      height: '21px',
                    }"
                    class="inner-box d-flex align-center justify-center"
                  ></div>
                  <span class="ml-2">{{ moneyFormatter(item.orderQuantity, true) }} pcs</span>
                </div>
                <div class="total">{{ moneyFormatter(item.totalPrice) }} $</div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DoughnutChartComponent",
  ssr:false,
  data() {
    return {
      creators: [],
      items: [],
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
    };
  },
  computed: {
    ...mapGetters({
      countryReport: "report/countryReport",
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
                labels: {
                  show: true,
                  total: {
                    show: true,
                    showAlways: true,
                    fontSize: "24px",
                    formatter: this.totalFormatter,
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
    countryReport(val) {
      this.creators = [];
      this.items = [];
      val.itemReports.forEach((item) => {
        this.creators.push(`${item.name}: ${this.moneyFormatter(item.itemCount, true)}`);
        this.items.push(item.itemCount);

      });
    },
  },

  methods: {
    // changeFormatter(value){
    //   return this.moneyFormatter(value, true)

    // },
    totalFormatter(w) {
      const temp = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
      return this.moneyFormatter(temp, true);
    }
  },
};
</script>

<style lang="scss" scoped>
.total {
  color: #544b99;
  font-size: 18px;
}
</style>
