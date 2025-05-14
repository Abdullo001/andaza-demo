<template>
  <div>
    <ProductionDetail/>
    <v-card elevation="0" class="mt-3 rounded-lg">
      <v-card-text>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="#544B99"
        >
          <v-tab
            v-for="item in items"
            :key="item"
            class="text-none"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-divider/>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <CuttingComponent/>
          </v-tab-item>
          <v-tab-item>
            <Subcontracts/>
          </v-tab-item>
          <v-tab-item>
            <CuttingToNextProcess/>
          </v-tab-item>
          <v-tab-item>
            <ToWastes/>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
    <v-row class="mt-2" v-if="tab!==2">
      <v-col cols="6">
        <CalculationShortcomings/>
      </v-col>
      <v-col cols="6">
        <OrderQuantities/>
      </v-col>
    </v-row>
    <div class="text-right mt-5 mb-8">
      <FinishProcessBtn v-bind="finishDate"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Subcontracts from "@/components/Subcontracts.vue";
import CuttingComponent from "@/components/Cutting.vue";
import CalculationShortcomings from "@/components/CalculationsShoertcomings.vue";
import OrderQuantities from "@/components/OrderQuantities.vue";
import CuttingToNextProcess from "@/components/CuttingToNextProcess.vue";
import ToWastes from "@/components/ToWastes.vue";
import FinishProcessBtn from "@/components/FinishProcessBtn.vue";
import ProductionDetail from "@/components/commonProcess/ProductionDetail.vue";

export default {
  name: 'ProductionOfPlanningPage',
  components: {
    OrderQuantities,
    CalculationShortcomings,
    CuttingComponent,
    Subcontracts,
    CuttingToNextProcess,
    ToWastes,
    FinishProcessBtn,
    ProductionDetail
  },
  data() {
    return {
      tab: null,
      items: [this.$t('planningProduction.process.cutting'), this.$t('planningProduction.workShopType.subcontractor'), this.$t('planningProduction.planning.nextProcess'), this.$t('planningProduction.planning.wastes')],
    }
  },
  computed: {
    finishDate:{
      get(){
        return{
          modelId:!!this.modelInfo.modelId?this.modelInfo.modelId:0,
          propertyName:"CUTTING",
        }
      }
    },
    ...mapGetters({
      modelInfo: "production/planning/modelInfo",
      productionId: "production/planning/productionId",
      planningProcessId: "cuttingProcess/planningProcessId",
    })
  },
  watch: {
    tab(val){
      if(val===1){
        this.setClassification()
        this.getOrderQuantityList()
      }
      if(val===0){
        this.getClassificationList()
        this.getOrderQuantityList()
      }
      if(val===2){
        this.getPassingList(this.planningProcessId)
      }
    }
  },
  methods: {
    ...mapActions({
      setClassification: "subcontracts/setClassification",
      getClassificationList: "cuttingProcess/getClassificationList",
      getPassingList: "cuttingToNextProcess/getPassingList",
      getOrderQuantityList: "commonProcess/getOrderQuantityList",
    }),
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
</style>
