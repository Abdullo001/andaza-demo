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
            <QuantitiesOne class="mb-5" />
            <v-row class="pa-0 ma-0">
              <v-col class="pl-0">
                <QuantitiesTwo v-bind="classificationData" />
              </v-col>
              <v-col class="pr-0">
                <Alteration v-bind="classificationData" />
              </v-col>
            </v-row>
            <v-row class="pa-0 ma-0">
              <v-col class="pl-0">
                <Classification v-bind="classificationData" />
              </v-col>
              <v-col class="pr-0">
                <OrderQuantities v-bind="classificationData" />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <Subcontractor class="mb-10" />
            <v-row class="pa-0 ma-0">
              <v-col class="pl-0">
                <QuantitiesTwo v-bind="classificationData" />
              </v-col>
              <v-col class="pr-0">
                <Alteration v-bind="classificationData" />
              </v-col>
            </v-row>
            <v-row class="pa-0 ma-0">
              <v-col class="pl-0">
                <Classification v-bind="classificationData" />
              </v-col>
              <v-col class="pr-0">
                <OrderQuantities v-bind="classificationData" />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <NextProcess />
            <NextProcessSecondClass />
          </v-tab-item>
        </v-tabs-items>
        <v-spacer />
        <div class="text-right mt-5 mb-8">
          <FinishProcessBtn v-bind="finishDate" />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductionOfPlanningPage",
  components: {
    Alteration: () => import("@/components/QualityControl/Alteration.vue"),
    QuantitiesTwo: () =>
      import("@/components/QualityControl/QuantitiesTwo.vue"),
    OrderQuantities: () =>
      import("@/components/commonProcess/OrderQuantities.vue"),
    Classification: () =>
      import("@/components/commonProcess/CalculationsShortcomings.vue"),
    QuantitiesOne: () =>
      import("@/components/commonProcess/CommonProcessTab.vue"),
    Subcontractor: () =>
      import("@/components/commonProcess/CommonSubcontractProcessTab.vue"),
    NextProcess: () => import("@/components/PassingToNextProcess.vue"),
    NextProcessSecondClass: () =>
      import("@/components/QualityControl/NextProcessSecondClass.vue"),
    FinishProcessBtn: () => import("@/components/FinishProcessBtn.vue"),
    ProductionDetail: () =>
      import("@/components/commonProcess/ProductionDetail.vue"),
  },
  data() {
    return {
      show_btn: true,
      tab: null,
      items: [
        this.$t("planningProduction.process.quality_control"),
        this.$t("planningProduction.workShopType.subcontractor"),
        this.$t("planningProduction.planning.outputWaybill"),
      ],
      tabStatus: "OWN",
    };
  },
  computed: {
    finishDate: {
      get() {
        return {
          modelId: !!this.modelInfo.modelId ? this.modelInfo.modelId : 0,
          propertyName: "QUALITY_CONTROL",
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
        this.getSubcontarctSecondClassList();
        this.getSubcontractSentToAlterationList();
        this.tabStatus = "SUB";
        this.getOrderQuantityList(true);
      }
      if (val === 0) {
        this.getShortcomingsList({
          id: this.planningProcessId,
          type: "IN_PRODUCTION",
        });
        this.getSecondClassList();
        this.getSentToAlterationList();
        this.tabStatus = "OWN";
        this.getOrderQuantityList(false);
      }
      if (val === 2) {
        this.getPassingList(this.planningProcessId);
        this.getPassingSecondList(this.planningProcessId);
      }
    },
  },
  methods: {
    ...mapActions({
      getShortcomingsList: "commonCalculationsShortcomings/getShortcomingsList",
      getSubcontractShortcomingsList: "commonCalculationsShortcomings/getSubcontractShortcomingsList",
      getPassingList: "passingToNextProcess/getPassingList",
      getPassingSecondList: "nextProcessSecondClass/getSecondList",
      getSecondClassList: "commonProcess/getSecondClassList",
      getSubcontarctSecondClassList: "commonProcess/getSubcontarctSecondClassList",
      getSentToAlterationList: "commonProcess/getSentToAlterationList",
      getSubcontractSentToAlterationList: "commonProcess/getSubcontractSentToAlterationList",
      getOrderQuantityList: "commonProcess/getOrderQuantityList",
    }),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
