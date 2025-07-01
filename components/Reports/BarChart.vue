<template>
  <div>
    <v-card elevation="0" rounded="lg">
      <v-card-title class="d-flex align-center justify-space-between">
        <div>{{ $t("prefinances.dialog.prefinance") }}</div>
      </v-card-title>
      <v-card-text>
        <div class="d-flex align-center mb-1">
          <div class="color1"></div>
          <div>
            {{ $t("report.createdPrefinances") }}: <span>{{ totalPrefinances }} </span>
          </div>
        </div>
        <div class="d-flex align-center mb-1">
          <div class="color2"></div>
          <div>
            {{ $t("report.placedOrders") }}: <span>{{ totalOrders }} </span>
          </div>
        </div>
        <div>
          <VueApexChart
            type="bar"
            height="350"
            :options="chartOptions"
            :series="series"
          ></VueApexChart>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  ssr:false,
  name: "BarChartComponent",
  data() {
    return {
      totalOrders: 0,
      totalPrefinances: 0,
      preFinanceCount: [],
      orderCount: [],
    };
  },

  computed: {
    ...mapGetters({
      prefinancesQuantity: "report/prefinancesQuantity",
    }),

    chartOptions: {
      get() {
        return {
          chart: {
            type: "bar",
            height: 350,
            stacked: true,
            toolbar: {
              show: true,
            },
            zoom: {
              enabled: true,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0,
                },
              },
            },
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10,
              dataLabels: {
                total: {
                  enabled: true,
                  style: {
                    fontSize: "13px",
                    fontWeight: 900,
                  },
                },
              },
            },
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Avg",
              "Sep",
              "Okt",
              "Nov",
              "Dec",
            ],
            title: {
              text: "Month",
            },
          },
          legend: {
            show: false,
          },

          fill: {
            opacity: 1,
            colors: ["#544b99", "#eef0fa"],
          },
        };
      },
    },

    series: {
      get() {
        return [
          {
            name: " Orders",
            data: this.orderCount,
          },
          {
            name: " Prefinances",
            data: this.preFinanceCount,
          },
        ];
      },
    },
  },

  watch: {
    prefinancesQuantity(val) {
      this.orderCount = [];
      this.preFinanceCount = [];
      this.totalOrders = val.totalOrderQuantity;
      this.totalPrefinances = val.totalPreFinanceQuantity;
      val.quantityItemReports.forEach((el) => {
        this.orderCount.push(el.orderCount);
        const calculatePrefinance = el.preFinanceCount - el.orderCount;
        this.preFinanceCount.push(calculatePrefinance);
      });
    },
  },
};
</script>
