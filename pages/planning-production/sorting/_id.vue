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
            <SecondClassForSorting v-bind="classificationData" />
          </v-tab-item>
          <v-tab-item>
            <CommonSubcontractProcessTab />
            <SecondClassForSorting v-bind="classificationData" />
          </v-tab-item>
          <v-tab-item>
            <PassingNextForSorting />
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
    </v-row>
    <div class="text-right mt-5 mb-8">
      <FinishProcessBtn v-bind="finishDate" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CalculationShortcomings from "@/components/Sorting/CalculationsShortcomings.vue";
import OrderQuantities from "@/components/Sorting/OrderQuantities.vue";
import GivenAccessoryQuantity from "@/components/GivenAccessoryQuantity.vue";
import PassingToNextProcess from "@/components/PassingToNextProcess.vue";
import PassingNextForSorting from "@/components/commonProcess/PassingNextForSorting.vue";
import CommonProcessTab from "@/components/commonProcess/CommonProcessTab.vue";
import SecondClassForSorting from "@/components/commonProcess/SecondClassForSorting.vue";
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
    SecondClassForSorting,
    PassingNextForSorting,
    ProductionDetail,
  },
  data() {
    return {
      tab: null,
      tabStatus: "OWN",
      items: [
        this.$t("planningProduction.process.sorting"),
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
          propertyName: "SORTING",
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
      modelData: "preFinance/modelData",
      modelInfo: "production/planning/modelInfo",
      modelImages: "modelPhoto/modelImages",
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
        this.getSortingSubcontractor(true);
        this.tabStatus = "SUB";
      }
      if (val === 0) {
        this.getShortcomingsList({
          id: this.planningProcessId,
          type: "IN_PRODUCTION",
        });
        this.getAccessoryOwnList(this.planningProcessId);
        this.getSortingOwn(true);
        this.tabStatus = "OWN";
      }
      if (val === 2) {
        this.getPassingListForSorting(this.planningProcessId);
        Promise.all([
          this.getKittedList({
            planningProcessId: this.planningProcessId,
            isSecond: false,
          }),
          this.getKittedList({
            planningProcessId: this.planningProcessId,
            isSecond: true,
          }),
        ]);
      }
    },
  },
  methods: {
    ...mapActions({
      getSortingOwn: "commonProcess/getSortingOwn",
      getSortingSubcontractor: "commonProcess/getSortingSubcontractor",
      getShortcomingsList:
        "commonCalculationsShortcomings/getShortcomingsListSorting",
      getSubcontractShortcomingsList:
        "commonCalculationsShortcomings/getSubcontractShortcomingsListSorting",
      getPassingList: "cuttingToNextProcess/getPassingList",
      getAccessoryOwnList: "givenAccessoryQuantity/getAccessoryOwnList",
      getAccessorySubcontractList:
        "givenAccessoryQuantity/getAccessorySubcontractList",
      getPassingListForSorting: "passingToNextProcess/getPassingListForSorting",
      getKittedList: "passingToNextProcess/getKittedList",
    }),
  },
};
</script>

<style scoped lang="scss">
</style>
