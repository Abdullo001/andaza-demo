import Vue from 'vue'
import {Bar, Doughnut, HorizontalBar, Line, mixins, Pie} from 'vue-chartjs'

const registerComponent = function (name, originalComponent) {
  Vue.component(name, {
    extends: originalComponent,
    mixins: [mixins.reactiveProp],
    props: {
      chartData: {
        type: Object,
        default: () => {
        },
      },
      chartOptions: {
        type: Object,
        default: () => {
        },
      },
      chartPlugins: {
        type: Object,
        default: () => {
        },
      },
      width: {
        type: Number,
        default: 200
      },
      height: {
        type: Number,
        default: 200
      },
    },
    watch:{
      data(){
        this.renderChart(
          this.chartData,
          this.chartOptions,
          this.width,
          this.height
        )
      }
    },
    mounted() {
      this.renderChart(
        this.chartData,
        this.chartOptions,
        this.width,
        this.height
      )
    },
  })
}

registerComponent('BarChart', Bar)
registerComponent('HorizontalBarChart', HorizontalBar)
registerComponent('DoughnutChart', Doughnut)
registerComponent('LineChart', Line)
registerComponent('PieChart', Pie)
