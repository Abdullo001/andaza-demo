<template>
  <div >
    <v-card elevation="0" rounded="lg" style="min-height: 480px;">
      <v-card-title class="d-flex align-center justify-space-between">
        <div>Models by genders</div>
      </v-card-title>
      <v-card-text>
        <div class="d-flex align-center justify-space-around mb-4" style="font-size: 14px;">
          <div class="font-weight-bold black--text ">
            Total:
            <span class="font-weight-regular"> {{genderReport.models}} models</span>
          </div>
          <div class="font-weight-bold black--text ">
            Order quantity:
            <span class="font-weight-regular"> {{genderReport.totalOrderQuantity}} pcs</span>
          </div>
          <div class="font-weight-bold black--text ">
            Amount:
            <span class="font-weight-regular"> {{genderReport.totalPrice}}$</span>
          </div>
        </div>
        <v-row v-for="(item,idx) in genderReport.itemReports" :key="idx">
          <v-col cols="2" class="d-flex align-center justify-center">{{item.gender}}</v-col>
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
            <span>
              {{ item.totalPrice }} $
            </span>
            <span>
              {{ item.orderQuantity }} pcs
            </span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  ssr:false,
  name: "HorizontalChartComponent",
  data() {
    return {
      bgWidth: 50,
    };
  },

  computed:{
    ...mapGetters({
      genderReport:"report/genderReport"
    })
  },

  watch:{
    genderReport(val){
    }
  }
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
