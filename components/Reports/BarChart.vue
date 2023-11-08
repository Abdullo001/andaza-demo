<template>
  <div>
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
          <div>Created prefinances: <span>590 models</span></div>
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
  </div>
</template>

<script>
export default {
  name: 'BarChartComponent',
  data() {
    return {
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
            label: ['Prefinance'],
            backgroundColor: '#7631FF',
            data: [60, 54, 32, 25, 65, 50, 65, 44, 51, 38, 35, 66, 0]
          },
        ],
      },

    }
  },
}
</script>
