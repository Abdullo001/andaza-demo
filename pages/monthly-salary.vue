<template >
  <div>
    <v-card elevation="0" class="mb-2">
      <v-card-title>
        <div>
          Monthly Salary
        </div>
      </v-card-title>
    </v-card>

    <v-card class="mt-6" flat>
      <v-tabs v-model="tab">
        <v-tabs-slider color="#544B99" />
        <v-tab
          class="text-capitalize"
          v-for="item in tabs"
          :key="item"
          active-class="active-tab"
        >
          {{ item }}
        </v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <Typical/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <Daily/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          </v-tabs-items>
      </v-tabs>
    </v-card>

  </div>
</template>
<script>
import Daily from '../components/SalaryReport/Daily.vue';
import Typical from '../components/SalaryReport/Typical.vue';
export default {
  components:{
    Daily,
    Typical,
  },
  data(){
    return{
      tabs:["Typical","Daily"],
      tab:null
    }
  }
}
</script>
<style lang="scss" scoped>
.active-tab {
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #544b99;
}
</style>
