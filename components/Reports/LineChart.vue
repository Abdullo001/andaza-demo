<template>
  <div>
    <v-card elevation="0" rounded="lg">
      <v-card-title class="d-flex align-center justify-space-between">
        <div>Quantity of Models shipping by months</div>
      </v-card-title>
      <v-card-text>
        <VueApexChart
          height="450"
          type="line"
          :options="chartOptions"
          :series="series"
        ></VueApexChart>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  ssr:false,
  name: "lineChartComponent",
  data() {
    return {
      
      line_options: {
        plugins: {
          customScale: {
            grace: "100%", 
          },
        },
        tooltips: {
          callbacks: {
            footer: this.footer,
          },
          legend: {
            position: "bottom",
          },
          enabled: true,
          external: this.externalTooltipHandler,
          intersect: true,
          
        },

        maintainAspectRatio: false,
        responsive: true,
        width: 400,
        height: 369,
      },

      modelQuantity: [],
      orderQunt: [],
      totalPrices: [],
    };
  },
  computed: {
    chartOptions: {
      get() {
        return {
          chart: {
            height: 450,
            type: "line",
            toolbar: {
              show: true,
            },
            dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2,
            },
            
          },
          tooltip: {
            enabled: false,
          },
          colors: ["#544B99", "#545454"],
          dataLabels: {
            enabled: true,
            formatter: this.dataLabelFunc,

            style: {
              fontSize: "12px",
              fontWeight: "bold",
            },
            background: {
              enabled: true,
              foreColor: "#fff",
              borderRadius: 2,
              padding: 4,
              opacity: 0.9,
              borderWidth: 1,
              borderColor: "#000",
            },
          },
          stroke: {
            curve: "smooth",
          },
          grid: {
            borderColor: "#e7e7e7",
            row: {
              colors: ["#f3f3f3", "transparent"], 
              opacity: 0.5,
            },
          },
          markers: {
            size: 1,
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
          yaxis: {
            title: {
              text: "Quantity of models",
            },
          },
          legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
          },
        };
      },
    },
    series: {
      get() {
        return [
          {
            name: "Total",
            data: this.totalPrices,
          },
        ];
      },
    },
    ...mapGetters({
      orderQuantity: "report/orderQuantity",
    }),
  },
  watch: {
    orderQuantity(val) {
      this.totalPrices = [];
      this.orderQunt = [];
      this.modelQuantity = [];

      val.forEach((el) => {
        this.totalPrices.push(el.totalPrice);
        this.orderQunt.push(el["orderQuantity"]);
        this.modelQuantity.push(el.modelCount);
      });
    },
  },
  methods: {
    ...mapActions({
      getOrderQuantity: "report/getOrderQuantity",
    }),
    footer(tooltipItems) {
      let model = 0;
      let order = 0;

      this.orderQuantity.forEach((el, id) => {
        if (id === tooltipItems[0].index) {
          model = el.modelCount;
          order = el["orderQuantity"];
        }
      });
      return "Sum: " + model + "/" + order;
    },

    dataLabelFunc(val, opt) {
      const message = `${val}$   ${this.modelQuantity[opt.dataPointIndex]} / ${
        this.orderQunt[opt.dataPointIndex]
      } pcs`;
      return message;
    },
  },
};
</script>

<style lang="scss" scoped></style>
