<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>{{ $t("forms.productionForm.title") }}</div>
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row class="mb-5">
            <v-col cols="12" lg="3">
              <div class="label">
                {{ $t("forms.placedOrdersBox.orderNumber") }}
              </div>
              <v-combobox
                v-model="filters.orderNumber"
                :items="ordersList"
                :search-input.sync="orderNumSearch"
                item-text="orderNumber"
                item-value="orderNumber"
                validate-on-blur
                outlined
                hide-details
                color="#544B99"
                height="44"
                class="rounded-lg filter d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                :placeholder="
                  $t('forms.placedOrdersBox.orderNumberPlaceholder')
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
              <div class="label">
                {{ $t("forms.calculationsList.clientName") }}
              </div>
              <v-combobox
                v-model="filters.clientName"
                :items="partnerLists"
                :search-input.sync="clientSearch"
                item-text="name"
                item-value="name"
                validate-on-blur
                outlined
                hide-details
                height="44"
                class="rounded-lg filter d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                :placeholder="
                  $t('forms.calculationsList.clientNamePlaceholder')
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
              <div class="label">
                {{ $t("forms.productionForm.shippingDate") }}
              </div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.shippingDate"
                  type="month"
                  style="width: 100%; height: 100%"
                  class="filter_picker"
                  :placeholder="$t('forms.productionForm.shippingDate')"
                  value-format="MM-yyyy"
                />
              </div>
            </v-col>
            <v-col cols="12" class="d-flex align-center justify-space-between">
              <v-radio-group
                row
                v-model.trim="fileType"
                class="mb-4"
              >
                <v-radio
                  color="#544B99"
                  label="PDF"
                  value="PDF"
                ></v-radio>
                <v-radio
                  color="#544B99"
                  label="Excel"
                  value="EXCEL"
                ></v-radio>
              </v-radio-group>
              <v-checkbox
                v-model="filters.isPriceEnabled"
                color="#544B99"
                :label="$t('forms.productionForm.price')"
              ></v-checkbox>
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
      fileType:"PDF",
      filter_form: true,
      fabricStatus: ["NOT_PLANNED", "PLANNED", "GENERATED_FABRIC", "ORDERED"],
      accessoryStatus: ["NOT_PLANNED", "PLANNED", "ORDERED"],
      filters: {
        shippingDate: "",
        clientName: "",
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
    this.filterOrderList({
      page: 0,
      size: 10,
      data: {
        modelNumber: "",
        orderNumber: this.orderNumSearch,
        creatorId: "",
        clientName: "",
      },
    });
    this.getModelsList({
      page: 0,
      size: 10,
      modelNumber: this.modelNumSearch,
      partner: "",
      status: "ACTIVE",
    }),
    this.getUsersList();
    this.getPartnerList({page:0, size:10});
    this.getSipNumbers("");
  },

  computed: {
    ...mapGetters({
      ordersList: "orders/ordersList",
      modelsList: "models/modelsList",
      usersList: "orders/usersList",
      clientList: "orders/clientList",
      pdfList: "generatePdf/productionPdfList",
      partnerLists: "partners/partnerList",
      sipNumbers: "fabricWarehouse/sipNumbers",
    }),
  },

  watch: {
    pdfList(val) {
      this.downloadFile(val, this.fileType);
    },

    orderNumSearch(val) {
      if (!!val) {
        this.filterOrderList({
          page: 0,
          size: 10,
          data: {
            modelNumber: "",
            orderNumber: val,
            creatorId: "",
            clientName: "",
          },
        });
      }
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
    clientSearch(val){
      this.getPartnerList({page:0, size:10,partnerName:val});
    }
  },

  methods: {
    ...mapActions({
      filterOrderList: "orders/filterOrderList",
      getModelsList: "models/getModelsList",
      getBrandList: "models/getBrandList",
      getCountryList: "partners/getCountryList",
      getUsersList: "orders/getUsersList",
      getPdfList: "generatePdf/getProductionPdfList",
      getPartnerList: "partners/getPartnerList",
      getSipNumbers: "fabricWarehouse/getSipNumbers",
    }),
    downloadFile(val, fileType) {
      const fileTypes = {
        PDF: "application/pdf",
        EXCEL: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      };

      const mimeType = fileTypes[fileType];
      if (!mimeType) {
        console.error("Invalid file type");
        return;
      }

      const blob = new Blob(
        [new Uint8Array([...val].map((char) => char.charCodeAt(0)))],
        { type: mimeType }
      );
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", objectUrl);

      const fileName = `download.${fileType === "PDF" ? "pdf" : "xlsx"}`;
      a.setAttribute("download", fileName);

      a.click();
      this.isLoad = false;

    },


    resetFilter() {
      this.$refs.filters.reset();
      this.filters.shippingDate = "";
    },
    filter() {
      const data = {
        isPriceEnabled: this.filters.isPriceEnabled,

        modelNumber: this.filters.modelNumber?.modelNumber
          ? this.filters.modelNumber?.modelNumber
          : "",
        orderNumber: this.filters.orderNumber?.orderNumber
          ? this.filters.orderNumber?.orderNumber
          : "",
        clientName: this.filters.clientName?.name
          ? this.filters.clientName?.name
          : "",
        shippingDate: !!this.filters.shippingDate
          ? this.filters.shippingDate
          : null,
      };
      this.getPdfList({data, fileType: this.fileType});
      this.isLoad = true;
    },
  },
};
</script>
<style lang=""></style>
