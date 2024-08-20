<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>{{ $t("forms.index.cards.cutting") }}</div>
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row class="mb-5">
            <v-col cols="12" lg="3">
              <div class="label">
                {{ $t("forms.placedOrdersBox.modelNumber") }}
              </div>
              <v-combobox
                v-model="filters.modelNumber"
                :items="modelsList"
                :search-input.sync="modelNumSearch"
                item-text="modelNumber"
                item-value="modelNumber"
                validate-on-blur
                outlined
                color="#544B99"
                hide-details
                height="44"
                class="rounded-lg filter d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                :placeholder="
                  $t('forms.placedOrdersBox.modelNumberPlaceholder')
                "
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">{{ $t("forms.shipmentForm.bodyColor") }}</div>
              <v-select
                v-model="filters.mainColorCode"
                :items="colorList"
                item-text="color"
                item-value="color"
                append-icon="mdi-chevron-down"
                :placeholder="$t('forms.shipmentForm.bodyColorPlaceholder')"
                outlined
                single-line
                hide-details
                height="44"
                class="rounded-lg filter"
                color="#544B99"
                dense
              />
            </v-col>
          </v-row>

          <div class="d-flex justify-center">
            <v-btn
              width="140"
              outlined
              color="#544B99"
              elevation="0"
              class="text-capitalize mr-4 rounded-lg font-weight-bold"
              @click="resetFilter"
            >
              {{ $t("forms.calculationsList.btnReset") }}
            </v-btn>
            <v-btn
              width="140"
              color="#544B99"
              dark
              elevation="0"
              class="text-capitalize rounded-lg font-weight-bold"
              @click="filter"
            >
              {{ $t("forms.calculationsList.btnGenerate") }}
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <v-overlay v-model="isLoad" class="align-center justify-center">
      <v-progress-circular
        color="#544B99"
        indeterminate
        size="80"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      filter_form: true,
      fabricStatus: ["NOT_PLANNED", "PLANNED", "GENERATED_FABRIC", "ORDERED"],
      accessoryStatus: ["NOT_PLANNED", "PLANNED", "ORDERED"],
      filters: {
        shippingDate: "",
        clientName: "",
        mainColorCode: "",
        approvedBy: "",
        orderNumber: "",
        modelNumber: "",
        supplierName: "",
        creator: "",
        sipNumber: "",
        fabricStatus: "",
        accessoryStatus: "",
        isPriceEnabled: false,
      },
      isLoad: false,
      clientSearch: "",
      approvedSearch: "",
      sipNumberSearch: "",
      orderNumSearch: "",
      modelNumSearch: "",
      creatorSearch: "",
      users: [],
      pdfServe: "",
      partnerName: "",
    };
  },
  created() {
    this.getModelsList({
      page: 0,
      size: 10,
      modelNumber: this.modelNumSearch,
      partner: "",
      status: "ACTIVE",
    });
  },

  computed: {
    ...mapGetters({
      ordersList: "orders/ordersList",
      modelsList: "models/modelsList",
      usersList: "orders/usersList",
      clientList: "orders/clientList",
      pdfList: "generatePdf/cuttingPdfList",
      partnerLists: "fabricOrdering/partnerLists",
      sipNumbers: "fabricWarehouse/sipNumbers",
      colorList: "samplesTabs/mainColorsList",
    }),
  },

  watch: {
    pdfList(val) {
      console.log(val);
      const blob = new Blob(
        [new Uint8Array([...val].map((char) => char.charCodeAt(0)))],
        { type: "application/pdf" }
      );
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", objectUrl);
      a.click();
      this.pdfServe = objectUrl;
      this.isLoad = false;
    },

    modelNumSearch(val) {
      if (!!val) {
        this.getModelsList({
          page: 0,
          size: 10,
          modelNumber: val,
          partner: "",
          status: "ACTIVE",
        });
      }
    },
    "filters.modelNumber"(val) {
      if (!!val) {
        this.modelColor(val.id);
      }
    },
  },

  methods: {
    ...mapActions({
      filterOrderList: "orders/filterOrderList",
      getModelsList: "models/getModelsList",
      getModelGroup: "orders/getModelGroup",
      getClient: "orders/getClient",
      getBrandList: "models/getBrandList",
      getCountryList: "partners/getCountryList",
      getUsersList: "orders/getUsersList",
      getPdfList: "generatePdf/getCuttingPdf",
      getPartnerName: "fabricOrdering/getPartnerName",
      getSipNumbers: "fabricWarehouse/getSipNumbers",
      modelColor: "samplesTabs/getMainColors",
    }),

    resetFilter() {
      this.$refs.filters.reset();
      this.filters.shippingDate = "";
    },
    filter() {
      const data = {
        modelId: this.filters.modelNumber?.id
          ? this.filters.modelNumber?.id
          : "",
        mainColorCode: !!this.filters.mainColorCode
          ? this.filters.mainColorCode
          : "",
      };
      // console.log(this.filters.modelNumber);
      this.getPdfList(data);
      this.isLoad = true;
    },
  },
};
</script>
<style lang=""></style>
