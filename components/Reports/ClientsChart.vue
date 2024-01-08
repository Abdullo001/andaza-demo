<template>
  <div>
    <v-card elevation="0" rounded="lg">
      <v-card-title class="d-flex align-center justify-space-between">
        <div>Orders by clients</div>
      </v-card-title>
      <v-card-text>
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
  name: "ClientsChartComponent",
  data() {
    return {
      doughnut: {
        labels: ['Fashionteks', 'Sela', 'Nice & Easy', 'Boy', 'Girl', 'Unisex'],
        datasets: [
          {
            label: 'Models by genders',
            backgroundColor: '#544B99',
            data: [20, 60, 81, 48, 30, 85, 0]
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
