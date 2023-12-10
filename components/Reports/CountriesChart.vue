<template>
  <div>
    <v-card elevation="0" rounded="lg">
      <v-card-title class="d-flex align-center justify-space-between">
        <div>Prefinance creators</div>
      </v-card-title>
      <v-card-text>
        <div>
          <DoughnutChart
            :chart-options="doughnut_options"
            :chart-data="doughnut"
            chart-id="Doughnut-char"
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
  name: 'CountriesChartComponent',
  data() {
    return {
      doughnut: {
        labels: ['Russian', 'Belorus', 'Kazakhstan', 'Lithuania'],
        datasets: [
          {
            backgroundColor: [
              '#544B99',
              'rgb(255, 99, 132)',
              'rgb(255, 205, 86)',
              '#10BF41'
            ],
            data: [57, 7, 22, 15]
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
