<template>
  <div class="pb-10">
    <v-sheet
      class="mt-5 py-3 px-5 d-flex align-center"
      rounded="lg"
    >
      Year
      <v-select
        v-model="filters.year"
        :items="years"
        append-icon="mdi-chevron-down"
        background-color="#F3F4F5"
        class="elevation-0 ml-2"
        dense
        hide-details
        solo
        style="max-width: 100px;"
      />
      <v-checkbox
        v-model="filters.amount"
        class="ml-11"
        color="#7631FF"
        label="Amount"
      />
      <v-checkbox
        v-model="filters.quantity"
        class="ml-11"
        color="#7631FF"
        label="Quantity"
      />
      <v-checkbox
        v-model="filters.percentage"
        class="ml-11"
        color="#7631FF"
        label="Percentage"
      />
    </v-sheet>
    <v-row class="mt-5">
      <v-col cols="12" lg="4">
        <BarChartComponent/>
      </v-col>
      <v-col cols="12" lg="4">
        <DoughnutChartComponent/>
      </v-col>
      <v-col cols="12" lg="4">
        <LineChartComponent/>
      </v-col>
      <v-col cols="12" lg="4">
        <HorizontalChartComponent/>
      </v-col>
      <v-col cols="12" lg="4">
        <CountriesChartComponent/>
      </v-col>
      <v-col cols="12" lg="4">
        <ClientsChartComponent/>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  components: {
    BarChartComponent: () => import("@/components/Reports/BarChart.vue"),
    DoughnutChartComponent: () => import("@/components/Reports/DoughnutChart.vue"),
    LineChartComponent: () => import("@/components/Reports/LineChart.vue"),
    HorizontalChartComponent: () => import("@/components/Reports/HorizontalChart.vue"),
    CountriesChartComponent: () => import("@/components/Reports/CountriesChart.vue"),
    ClientsChartComponent: () => import("@/components/Reports/ClientsChart.vue"),
  },
  data() {
    return {
      chartData: [
        {label: 'Category 1', value: 25, backgroundColor: 'red'},
        {label: 'Category 2', value: 40, backgroundColor: 'blue'},
        {label: 'Category 3', value: 20, backgroundColor: 'green'},
        {label: 'Category 4', value: 15, backgroundColor: 'orange'},
      ],
      years: [2023, 2022, 2021],
      filters: {
        year: 2023,
        amount: true,
        quantity: true,
        percentage: false
      },

    }
  },
}
</script>

<style lang="scss">
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
  box-shadow: none !important;
}

.color1 {
  width: 26px;
  height: 15px;
  border-radius: 5px;
  background: #EEF0FA;
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
  background: #7631FF;
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
