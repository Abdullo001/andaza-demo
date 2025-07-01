<template>
  <div>
    <v-card elevation="0">
      <v-card-title>
        <v-radio-group row v-model.trim="filter" class="">
          <v-radio
            :readonly="managementStatus || productionStatus"
            color="#544B99"
            :label="$t('forms.index.all')"
            value="ALL"
          ></v-radio>
          <v-radio
            :readonly="managementStatus"
            color="#544B99"
            :label="$t('forms.index.management')"
            value="MANAGEMENT"
          ></v-radio>
          <v-radio
            :readonly="productionStatus"
            color="#544B99"
            :label="$t('forms.index.production')"
            value="PRODUCTION"
          ></v-radio>
        </v-radio-group>
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-2">
        <v-row>
          <v-col cols="3" v-for="(item, idx) in buttons" :key="idx">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card
                :elevation="hover ? 10 : 2"
                :class="{ 'on-hover': hover }"
                v-if="item.status == filter || filter === 'ALL'"
                height="150"
                style="cursor: pointer"
                @click="$router.push(localePath(`${item.to}`))"
              >
                <v-card-title class="d-flex align-center justify-center">
                  <div style="color: #544b99" class="text-center">
                    {{ item.title }}
                  </div>
                </v-card-title>
                <v-card-text class="">
                  <div style="text-align: center">{{ item.subtitle }}</div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filter: "ALL",
      productionStatus: true,
      managementStatus: true,
      buttons: [
        {
          title: this.$t("forms.index.cards.calculations"),
          subtitle: this.$t("forms.index.cards.calculationsSub"),
          to: "/forms/calculation-list",
          status: "MANAGEMENT",
        },
        {
          title: this.$t("forms.index.cards.placedOrders"),
          subtitle: this.$t("forms.index.cards.placedOrdersSub"),
          to: this.localePath("/forms/order-pdf-generation"),
          status: "MANAGEMENT",
        },
        {
          title: this.$t("forms.index.cards.prints"),
          subtitle: this.$t("forms.index.cards.printsSub"),
          to: this.localePath("/forms/print-pdf-generation"),
          status: "MANAGEMENT",
        },
        {
          title: this.$t("forms.index.cards.fabrics"),
          subtitle: this.$t("forms.index.cards.fabricsSub"),
          to: this.localePath("/forms/ordered-fabric-form"),
          status: "MANAGEMENT",
        },
        {
          title: this.$t("forms.index.cards.recievedFabrics"),
          subtitle: this.$t("forms.index.cards.recievedFabricsSub"),
          to: this.localePath("/forms/recieved-fabric-form"),
          status: "MANAGEMENT",
        },
        {
          title: this.$t("forms.index.cards.orderedFabricsAmount"),
          subtitle: this.$t("forms.index.cards.orderedFabricsAmountSub"),
          to: this.localePath("/forms/suppliers-fabric-form"),
          status: "MANAGEMENT",
        },
        {
          title: this.$t("forms.index.cards.orderedAccessories"),
          subtitle: this.$t("forms.index.cards.orderedAccessoriesSub"),
          status: "MANAGEMENT",
          to: this.localePath("/forms/ordered-accessory-form"),
        },
        {
          title: this.$t("forms.index.cards.recievedAccessories"),
          subtitle: this.$t("forms.index.cards.recievedAccessoriesSub"),
          status: "MANAGEMENT",
          to: this.localePath("/forms/recieved-accessory-form"),
        },
        {
          title: this.$t("forms.index.cards.inspectionFiles"),
          subtitle: this.$t("forms.index.cards.inspectionFilesSub"),
          status: "MANAGEMENT",
          to: this.localePath("/forms/inspection-files"),
        },
        {
          title: this.$t("forms.index.cards.shipping"),
          subtitle: this.$t("forms.index.cards.shippingSub"),
          status: "MANAGEMENT",
          to: this.localePath("/forms/shipping-form"),
        },
        {
          title: this.$t("forms.index.cards.cutting"),
          subtitle: this.$t("forms.index.cards.cuttingSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/cutting"),
        },
        {
          title: this.$t("forms.index.cards.sewing"),
          subtitle: this.$t("forms.index.cards.sewingSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/sewing-list"),
        },
        {
          title: this.$t("forms.index.cards.productionList"),
          subtitle: this.$t("forms.index.cards.productionListSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/production-list"),
        },
        {
          title: this.$t("forms.index.cards.productionStatus"),
          subtitle: this.$t("forms.index.cards.productionStatusSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/production-status"),
        },
        {
          title: this.$t("forms.index.cards.dailyProduction"),
          subtitle: this.$t("forms.index.cards.dailyProductionSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/daily-production"),
        },
        {
          title: this.$t("forms.index.cards.cuttingSubcontractor"),
          subtitle: this.$t("forms.index.cards.cuttingSubcontractorSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/cutting-list-subcontractor"),
        },
        {
          title: this.$t("forms.index.cards.printingSubcontractor"),
          subtitle: this.$t("forms.index.cards.printingSubcontractorSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/printing-list-subcontractor"),
        },
        {
          title: this.$t("forms.index.cards.inconmingPrinting"),
          subtitle: this.$t("forms.index.cards.inconmingPrintingSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/incoming-printing-subcontractor"),
        },
        {
          title: this.$t("forms.index.cards.sewingSubcontractor"),
          subtitle: this.$t("forms.index.cards.sewingSubcontractorSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/sewing-list-subcontractor"),
        },
        {
          title: this.$t("forms.index.cards.inconmingSewing"),
          subtitle: this.$t("forms.index.cards.inconmingSewingSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/incoming-sewing-subcontractor"),
        },
        {
          title: "All warehouses remaining",
          subtitle: this.$t("forms.index.cards.inconmingSewingSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/warehouse-remaining"),
        },
        {
          title: this.$t("forms.shortcomingClassification"),
          subtitle: this.$t("forms.index.cards.inconmingSewingSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/shortcoming-classification"),
        },
        {
          title: "Work completed according to processes",
          subtitle: this.$t("forms.index.cards.inconmingSewingSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/process-form"),
        },
        {
          title: this.$t("forms.dailySorting"),
          subtitle: this.$t("forms.index.cards.inconmingSewingSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/daily-sorting-form"),
        },
        {
          title: this.$t("forms.cuttingToOutsourcing"),
          subtitle: this.$t("forms.index.cards.inconmingSewingSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/cutting-to-subcontractor"),
        },
        {
          title: this.$t("forms.sortingToStreams"),
          subtitle: this.$t("forms.index.cards.inconmingSewingSub"),
          status: "PRODUCTION",
          to: this.localePath("/forms/to-stream-form"),
        },
      ],
      filteredButtons: [],
    };
  },
  watch: {},
  methods: {},
  mounted() {
    this.$store.commit("setPageTitle", this.$t("sidebar.forms"));
    const permisionList = JSON.parse(localStorage.getItem("permissionList"));
    permisionList.forEach((item) => {
      if (item.permissionName === "MANAGEMENT_FORM") {
        this.filter = "MANAGEMENT";
        this.managementStatus = false;
      }
      if (item.permissionName === "PRODUCTION_FORM") {
        this.filter = "PRODUCTION";
        this.productionStatus = false;
      }
      if (!this.productionStatus && !this.managementStatus) {
        this.filter = "ALL";
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.width-100p {
  width: 100%;
}
.v-btn__content {
  flex-direction: column !important;
}
</style>
