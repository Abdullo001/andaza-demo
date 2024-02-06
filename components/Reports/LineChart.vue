<template>
  <div>
    <v-card elevation="0" rounded="lg">
      <v-card-title class="d-flex align-center justify-space-between">
        <div>Quality of Models shipping by months</div>
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
  name: "lineChartComponent",
  data() {
    return {
      
      line_options: {
        plugins: {
          customScale: {
            grace: "100%", // Percentage of max value
            // grace: 40 // Flatout extra value to add
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
            dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2,
            },
            toolbar: {
              show: false,
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
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
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
      console.log(tooltipItems[0].index);
      let model = 0;
      let order = 0;

      this.orderQuantity.forEach((el, id) => {
        if (id === tooltipItems[0].index) {
          model = el.modelCount;
          order = el["orderQuantity"];
          console.log(model);
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

    getOrCreateTooltip(chart) {
      let tooltipEl = chart.canvas.parentNode.querySelector("div");

      if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
        tooltipEl.style.borderRadius = "3px";
        tooltipEl.style.color = "white";
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = "none";
        tooltipEl.style.position = "absolute";
        tooltipEl.style.transform = "translate(-50%, 0)";
        tooltipEl.style.transition = "all .1s ease";

        const table = document.createElement("table");
        table.style.margin = "0px";

        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
      }

      return tooltipEl;
    },

    externalTooltipHandler(context) {
      // Tooltip Element
      console.log(context);
      const { chart, tooltip } = context;
      const tooltipEl = getOrCreateTooltip(chart);

      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set Text
      if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map((b) => b.lines);

        const tableHead = document.createElement("thead");

        titleLines.forEach((title) => {
          const tr = document.createElement("tr");
          tr.style.borderWidth = 0;

          const th = document.createElement("th");
          th.style.borderWidth = 0;
          const text = document.createTextNode(title);

          th.appendChild(text);
          tr.appendChild(th);
          tableHead.appendChild(tr);
        });

        const tableBody = document.createElement("tbody");
        bodyLines.forEach((body, i) => {
          const colors = tooltip.labelColors[i];

          const span = document.createElement("span");
          span.style.background = colors.backgroundColor;
          span.style.borderColor = colors.borderColor;
          span.style.borderWidth = "2px";
          span.style.marginRight = "10px";
          span.style.height = "10px";
          span.style.width = "10px";
          span.style.display = "inline-block";

          const tr = document.createElement("tr");
          tr.style.backgroundColor = "inherit";
          tr.style.borderWidth = 0;

          const td = document.createElement("td");
          td.style.borderWidth = 0;

          const text = document.createTextNode(body);

          td.appendChild(span);
          td.appendChild(text);
          tr.appendChild(td);
          tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector("table");

        // Remove old children
        while (tableRoot.firstChild) {
          tableRoot.firstChild.remove();
        }

        // Add new children
        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
      }

      const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.left = positionX + tooltip.caretX + "px";
      tooltipEl.style.top = positionY + tooltip.caretY + "px";
      tooltipEl.style.font = tooltip.options.bodyFont.string;
      tooltipEl.style.padding =
        tooltip.options.padding + "px " + tooltip.options.padding + "px";
    },
  },
};
</script>

<style lang="scss" scoped></style>
