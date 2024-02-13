<template>
  <div>
    <v-card elevation="0" rounded="lg" style="min-height: 527px;">
      <v-card-title class="d-flex align-center justify-space-between">
        <div>Orders by clients</div>
      </v-card-title>
      <v-card-text>
        <div
          class="d-flex align-center justify-space-around mb-4"
          style="font-size: 14px"
        >
          <div class="font-weight-bold black--text">
            Total order quantity:
            <span class="font-weight-regular">
              {{ clientReport.totalOrderQuantity }} pcs</span
            >
          </div>
        </div>
        <v-row v-for="(item, idx) in clientReport.itemReports" :key="idx">
          <v-col cols="2" class="d-flex align-center justify-center">{{
            item.name
          }}</v-col>
          <v-col cols="7">
            <div style="" class="box">
              <div
                :style="{
                  backgroundColor: '#544B99',
                  width: item.percent + '%',
                  height: '42px',
                }"
                class="inner-box d-flex align-center justify-center"
              >
                {{ item.percent }} %
              </div>
            </div>
          </v-col>
          <v-col cols="3" class="d-flex flex-column">
            <span> {{ item.totalPrice }} $ </span>
            <span> {{ item.orderQuantity }} pcs </span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ClientsChartComponent",
  data() {
    return {
      doughnut: {
        labels: ["Fashionteks", "Sela", "Nice & Easy", "Boy", "Girl", "Unisex"],
        datasets: [
          {
            label: "Models by genders",
            backgroundColor: "#544B99",
            data: [20, 60, 81, 48, 30, 85, 0],
          },
        ],
      },
      doughnut_options: {
        maintainAspectRatio: false,
        responsive: true,
        width: 400,
        height: 369,
      },
    };
  },

  computed: {
    ...mapGetters({
      clientReport: "report/clientReport",
    }),
  },
};
</script>

<style lang="scss" scoped>
.box {
  background-color: #eef0fa;
  width: 100%;
  height: 42px;
  border-radius: 4px;
}
.inner-box {
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
</style>
