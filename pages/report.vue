<template>
  <div class="pb-10">
    <v-sheet class="mt-5 py-3 px-5 d-flex align-center" rounded="lg">
      {{ $t("report.year") }}
      <div style="height: 40px !important">
        <el-date-picker
        v-model="filters.year"
        @change="changeDate"
        type="year"
        style="width: 100%; height: 100%"
        :placeholder="$t('reports.pickAYear')"
        value-format="yyyy"
        :default-value="new Date()"
        class="ml-2"
      />
      </div>

    </v-sheet>
    <v-row class="mt-5">
      <v-col cols="12"  >
        <LineChartComponent />
      </v-col>
      <v-col cols="12" lg="4">
        <BarChartComponent />
      </v-col>
      <v-col cols="12" lg="4">
        <DoughnutChartComponent />
      </v-col>

      <v-col cols="12" lg="4">
        <HorizontalChartComponent />
      </v-col>
      <v-col cols="12" lg="4">
        <CountriesChartComponent />
      </v-col>
      <v-col cols="12" lg="4">
        <ClientsChartComponent />
      </v-col>
      <v-col cols="12" lg="4">
        <OrdersByManager />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  components: {
    OrdersByManager: () => import("@/components/Reports/OrdersByManager.vue"),
    BarChartComponent: () => import("@/components/Reports/BarChart.vue"),
    DoughnutChartComponent: () =>
      import("@/components/Reports/DoughnutChart.vue"),
    LineChartComponent: () => import("@/components/Reports/LineChart.vue"),
    HorizontalChartComponent: () =>
      import("@/components/Reports/HorizontalChart.vue"),
    CountriesChartComponent: () =>
      import("@/components/Reports/CountriesChart.vue"),
    ClientsChartComponent: () =>
      import("@/components/Reports/ClientsChart.vue"),
  },
  data() {
    return {
      chartData: [
        { label: "Category 1", value: 25, backgroundColor: "red" },
        { label: "Category 2", value: 40, backgroundColor: "blue" },
        { label: "Category 3", value: 20, backgroundColor: "green" },
        { label: "Category 4", value: 15, backgroundColor: "orange" },
      ],

      years: [2023, 2022, 2021],
      filters: {
        year: "",
        amount: true,
        quantity: true,
        percentage: false,
      },
    };
  },
  computed:{
  },

  methods:{
    ...mapActions({
      getOrderQuantity:"report/getOrderQuantity",
      getPrefinancesQuantity:"report/getPrefinancesQuantity",
      getPrefinancesCreators:"report/getPrefinancesCreators",
      getReportGender:"report/getReportGender",
      getReportCountry:"report/getReportCountry",
      getReportClinet:"report/getReportClinet",
      getReportManager:"report/getReportManager",
    }),
    changeDate(item){
      if(!!this.filters.year){
        this.getOrderQuantity(this.filters.year)
        this.getPrefinancesQuantity(this.filters.year)
        this.getPrefinancesCreators(this.filters.year)
        this.getReportGender(this.filters.year)
        this.getReportCountry(this.filters.year)
        this.getReportClinet(this.filters.year)
        this.getReportManager(this.filters.year)
      }
    }
  },
  mounted(){
    const date = new Date().getFullYear()
    this.getOrderQuantity(date)
    this.getPrefinancesQuantity(date)
    this.getPrefinancesCreators(date)
    this.getReportGender(date)
    this.getReportClinet(date)
    this.getReportCountry(date)
    this.getReportManager(date)
  }
};
</script>

<style lang="scss">
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none !important;
}

.color1 {
  width: 26px;
  height: 15px;
  border-radius: 5px;
  background: #eef0fa;
  margin-right: 8px;

  & + div {
    color: #000;
    font-size: 14px;
    font-style: normal;
    line-height: 10px;
    text-transform: capitalize;

    & > span {
      font-weight: 700;
    }
  }
}

.color2 {
  width: 26px;
  height: 15px;
  border-radius: 5px;
  background: #544b99;
  margin-right: 8px;

  & + div {
    color: #000;
    font-size: 14px;
    font-style: normal;
    line-height: 10px;
    text-transform: capitalize;

    & > span {
      font-weight: 700;
    }
  }
}
</style>
