<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>{{ $t("forms.orderedAccessoryFrom.title") }}</div>
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
              <div class="label">{{ $t("forms.orderedFabrics.supplier") }}</div>
              <v-combobox
                v-model="filters.supplierName"
                :items="partnerLists"
                :search-input.sync="partnerName"
                item-text="name"
                item-value="name"
                outlined
                hide-details
                height="44"
                class="rounded-lg filter"
                :return-object="true"
                color="#544B99"
                dense
                :placeholder="$t('forms.orderedFabrics.supplierPlaceholder')"
                :rules="[formRules.required]"
                validate-on-blur
              >
                <template #append>
                  <v-icon color="#544B99">mdi-magnify</v-icon>
                </template>
              </v-combobox>
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
      filters: {
        modelNumber: "",
        supplierName: "",
      },
      isLoad: false,

      modelNumSearch: "",
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
    }),
    this.getPartnerList({page:0, size:10});
  },

  computed: {
    ...mapGetters({
      modelsList: "models/modelsList",
      pdfList: "generatePdf/orderedAccessoryPdfList",
      partnerLists: "partners/partnerList",
    }),
  },

  watch: {
    pdfList(val) {
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
    partnerName(val) {
      this.getPartnerList({page:0, size:10,partnerName:val});

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
  },

  methods: {
    ...mapActions({
      filterOrderList: "orders/filterOrderList",
      getModelsList: "models/getModelsList",
      getPdfList: "generatePdf/getOrderedAccessoryList",
      getPartnerList: "partners/getPartnerList",

    }),

    resetFilter() {
      this.$refs.filters.reset();
    },
    filter() {
      const data = {
        supplierId: !!this.filters.supplierName?.id
          ? this.filters.supplierName?.id
          : null,
          modelId: this.filters.modelNumber?.id
          ? this.filters.modelNumber?.id
          : null,
      };
      this.getPdfList(data);
      this.isLoad = true;
    },
  },
};
</script>
<style lang=""></style>
