<template>
  <div>
    <v-card elevation="0" rounded="lg">
      <v-card-title class="d-flex align-center justify-space-between">
        <div>Quality of Models shipping by months</div>
      </v-card-title>
      <v-card-text>
        <div>
          <LineChart
            :chart-data="line"
            :chart-options="line_options"
            :height="line_options.height"
            :label="line.label"
            :width="line_options.width"
            chart-id="line-char"
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'lineChartComponent',
  data() {
    return {
      line: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Quality of models',
            backgroundColor: '#7631FF',
            data: ['40', '39', '30', '40', '39', '50', '40', '40', '39', '55', '40', '39', 0]
          },
        ],
      },
      line_options: {
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
