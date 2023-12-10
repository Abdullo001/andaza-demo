<template>
  <div>
    <v-card elevation="0" rounded="lg">
      <v-card-title class="d-flex align-center justify-space-between">
        <div>Models by genders</div>
      </v-card-title>
      <v-card-text>
        <div class="d-flex align-center justify-space-around">
          <div class="font-weight-bold black--text text-caption">Total:
            <span class="font-weight-regular"> 590 models</span>
          </div>
          <div class="font-weight-bold black--text text-caption">Order quantity:
            <span class="font-weight-regular"> 590 models</span>
          </div>
          <div class="font-weight-bold black--text text-caption">Amount:
            <span class="font-weight-regular"> 590 models</span>
          </div>

        </div>
        <div>
          <HorizontalBarChart
            :chart-options="doughnut_options"
            :chart-data="doughnut"
            chart-id="Horizontal-char"
            :label="doughnut.labels"
            :width="doughnut_options.width"
            :height="doughnut_options.height"
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "HorizontalChartComponent",
  data() {
    return {
      doughnut: {
        labels: ['Male', 'Female', 'Boy', 'Girl', 'Unisex'],
        datasets: [
          {
            label: 'Models by genders',
            backgroundColor: '#544B99',
            data: [20, 60, 81, 48, 30, 0]
          },
        ],
      },
      doughnut_options: {
        maintainAspectRatio: false,
        responsive: true,
        width: 400,
        height: 369
      },
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
