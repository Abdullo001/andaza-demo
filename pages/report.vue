<template>
  <div>
    <v-sheet
      class="mt-5 py-3 px-5 d-flex align-center"
      rounded="lg"
    >
      Year
      <v-select
        :items="years"
        v-model="filters.year"
        append-icon="mdi-chevron-down"
        solo
        class="elevation-0 ml-2"
        background-color="#F3F4F5"
        hide-details
        style="max-width: 100px;"
        dense
      />
      <v-checkbox
        label="Amount"
        color="#7631FF"
        class="ml-11"
        v-model="filters.amount"
      />
      <v-checkbox
        label="Quantity"
        color="#7631FF"
        class="ml-11"
        v-model="filters.quantity"
      />
      <v-checkbox
        label="Percentage"
        color="#7631FF"
        class="ml-11"
        v-model="filters.percentage"
      />
    </v-sheet>
    <v-row class="mt-5">
      <v-col cols="12" lg="4">
        <v-card elevation="0" rounded="lg">
          <v-card-title class="d-flex align-center justify-space-between">
            <div>Prefinance</div>
            <v-select
              :items="months"
              solo
              append-icon="mdi-chevron-down"
              hide-details
              v-model="current_month"
              style="max-width: 150px"
            />
          </v-card-title>
          <v-card-text>
            <div class="d-flex align-center mb-1">
              <div class="color1"></div>
              <div>Creteed prefinances: <span>590 models</span></div>
            </div>
            <div class="d-flex align-center mb-1">
              <div class="color2"></div>
              <div>Placed orders: <span>590 models</span></div>
            </div>
            <div>
              <BarChart
                :chart-options="bar_options"
                :chart-data="barData"
                chart-id="bar-char"
                :label="barData.label"
                :width="bar_options.width"
                :height="bar_options.height"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      years: [2023, 2022, 2021],
      filters: {
        year: 2023,
        amount: true,
        quantity: true,
        percentage: false
      },
      months: ['March', 'December', 'September'],
      current_month: 'September',
      bar_options: {
        maintainAspectRatio: false,
        responsive: true,
        width: 400,
        height: 311
      },
      barData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'],
        datasets: [
          {
            label: ['Clients'],
            backgroundColor: ['#7631FF', '#7631FF','#7631FF','#7631FF','#7631FF','#7631FF','#7631FF','#7631FF','#7631FF','#7631FF','#7631FF','#7631FF',],
            data: [60, 54, 32, 25, 65, 50, 65, 44, 51, 38, 35, 66, 0]
          },
        ],
      }
    }
  },
}
</script>

<style lang="scss">
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
  box-shadow: none!important;
}
.color1 {
  width: 26px;
  height: 15px;
  border-radius: 5px;
  background: #EEF0FA;
  margin-right: 8px;
  &+div {
    color: #000;
    font-size: 14px;
    font-style: normal;
    line-height: 10px;
    text-transform: capitalize;
    &>span {
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
  &+div {
    color: #000;
    font-size: 14px;
    font-style: normal;
    line-height: 10px;
    text-transform: capitalize;
    &>span {
      font-weight: 700;
    }
  }
}
</style>
