<template>
  <div>
    <v-card elevation="0" rounded="lg">
      <v-card-title class="d-flex align-center justify-space-between">
        <div>{{ $t("report.ordersByManagers") }}</div>
      </v-card-title>
      <v-card-text>
        <div style="min-height: 300px">
          <VueApexChart
            height="300"
            type="pie"
            :options="chartOptions"
            :series="series"
          ></VueApexChart>
        </div>

        <v-data-table
          :headers="headers"
          :items="dataList"
          :hide-default-header="false"
          :hide-default-footer="true"
        >
          <template #item.color="{ item }">
            <div
              :style="{
                backgroundColor: item.color,
                width: '21px',
                height: '21px',
              }"
              class="inner-box d-flex align-center justify-center"
            ></div>
          </template>
          <template v-slot:body.append>
            <tr>
              <td></td>
              <td
                class="text-capitalize text-body-1 font-weight-bold"
              >
                total
              </td>
              <td>
                {{ moneyFormatter(managerReport.models, true) }}
              </td>

              <td class="font-weight-bold text-body-1">{{ moneyFormatter(managerReport.totalPrice) }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  ssr:false,
  data() {
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
      headers: [
        { text: "Color", value: "color", sortable: false,width: 20  },
        { text: "Manager name", value: "manager", sortable: false },
        { text: "Models", value: "modelCount", sortable: false },
        { text: "Amount", value: "totalPrice", sortable: false },
      ],
      modelCount: [],
      managersList: [],
      dataList: [],
    };
  },
  computed: {
    chartOptions: {
      get() {
        return {
          colors: this.colors,
          chart: {
            type: "pie",
          },
          labels: this.managersList,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
          legend: {
            show: false,
          },
        };
      },
    },

    series: {
      get() {
        return [...this.modelCount];
      },
    },

    ...mapGetters({
      managerReport: "report/managerReport",
    }),
  },

  watch: {
    managerReport(val) {
      this.modelCount = [];
      this.managersList = [];
      this.dataList = JSON.parse(JSON.stringify(val.itemReports));
      this.dataList.forEach((item, idx) => {
        item.color = this.colors[idx];
        this.modelCount.push(item.modelCount);
        this.managersList.push(item.manager);
        item.totalPrice = this.moneyFormatter(item.totalPrice);
        item.modelCount = this.moneyFormatter(item.modelCount, true);
      });
    },
  },
};
</script>
<style lang=""></style>
