<template>
  <div>
    <ProductionDetail />
    <v-card elevation="0" class="mt-3 rounded-lg">
      <v-card-text>
        <v-tabs v-model="tab" background-color="transparent" color="#544B99">
          <v-tab v-for="item in items" :key="item" class="text-none">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-divider />
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <CommonProcessTab />
          </v-tab-item>
          <v-tab-item>
            <CommonSubcontractProcessTab />
          </v-tab-item>
          <v-tab-item>
            <PassingToNextProcess />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
    <v-row class="mt-2" v-if="tab !== 2">
      <v-col>
        <CalculationShortcomings v-bind="classificationData" />
      </v-col>
      <v-col>
        <OrderQuantities v-bind="classificationData" />
      </v-col>
      <v-col>
        <GivenAccessoryQuantity />
      </v-col>
    </v-row>
    <div class="text-right mt-5 mb-8">
      <FinishProcessBtn v-bind="finishDate" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CalculationShortcomings from "@/components/commonProcess/CalculationsShortcomings.vue";
import OrderQuantities from "@/components/commonProcess/OrderQuantities.vue";
import GivenAccessoryQuantity from "@/components/GivenAccessoryQuantity.vue";
import PassingToNextProcess from "@/components/PassingToNextProcess.vue";
import CommonProcessTab from "@/components/commonProcess/CommonProcessTab.vue";
import CommonSubcontractProcessTab from "@/components/commonProcess/CommonSubcontractProcessTab.vue";
import FinishProcessBtn from "@/components/FinishProcessBtn.vue";
import ProductionDetail from "@/components/commonProcess/ProductionDetail.vue";

export default {
  name: "ProductionOfPlanningPage",
  components: {
    OrderQuantities,
    CalculationShortcomings,
    GivenAccessoryQuantity,
    PassingToNextProcess,
    CommonProcessTab,
    CommonSubcontractProcessTab,
    FinishProcessBtn,
    ProductionDetail,
  },
  data() {
    return {
      tab: null,
      tabStatus: "OWN",
      items: [
        this.$t("planningProduction.process.sewing"),
        this.$t("planningProduction.workShopType.subcontractor"),
        this.$t("planningProduction.planning.nextProcess"),
      ],
    };
  },
  computed: {
    finishDate: {
      get() {
        return {
          modelId: !!this.modelInfo.modelId ? this.modelInfo.modelId : 0,
          propertyName: "SEWING",
        };
      },
    },
    classificationData: {
      get() {
        return {
          statusTab: this.tabStatus,
        };
      },
    },
    ...mapGetters({
      modelInfo: "production/planning/modelInfo",
      productionId: "production/planning/productionId",
      planningProcessId: "commonProcess/planningProcessId",
    }),
  },
  watch: {
    tab(val) {
      if (val === 1) {
        this.getSubcontractShortcomingsList({
          id: this.planningProcessId,
          type: "IN_PRODUCTION",
        });
        this.getAccessorySubcontractList(this.planningProcessId);
        this.tabStatus = "SUB";
        this.getOrderQuantityList(true);
      }
      if (val === 0) {
        this.getShortcomingsList({
          id: this.planningProcessId,
          type: "IN_PRODUCTION",
        });
        this.getAccessoryOwnList(this.planningProcessId);
        this.tabStatus = "OWN";
        this.getOrderQuantityList(false);
      }
      if (val === 2) {
        this.getPassingList(this.planningProcessId);
      }
    },
  },
  methods: {
    ...mapActions({
      getShortcomingsList: "commonCalculationsShortcomings/getShortcomingsList",
      getSubcontractShortcomingsList:
        "commonCalculationsShortcomings/getSubcontractShortcomingsList",
      getPassingList: "cuttingToNextProcess/getPassingList",
      getAccessoryOwnList: "givenAccessoryQuantity/getAccessoryOwnList",
      getAccessorySubcontractList:
        "givenAccessoryQuantity/getAccessorySubcontractList",
      getOrderQuantityList: "commonProcess/getOrderQuantityList",
    }),
    clickBtn() {
      this.show_btn = !this.show_btn;
    },
    async savePlanning() {
      const data = { modelId: this.planning.modelId };
      await this.createProcessPlanning(data);
    },
    showImage(image) {
      this.currentImage = image;
      this.image_dialog = true;
    },
  },
};
</script>

<style scoped lang="scss">
.show_active {
  height: 0;
  overflow: hidden;
}
</style>
