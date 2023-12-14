<template >
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>
          Recieved fabric form
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row class="mb-5">
            <v-col cols="12" lg="3">
              <div class="label">Order number</div>
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
                placeholder="Order name"
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
              <div class="label">Model number</div>
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
                placeholder="Model name"
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
              <div class="label">Fabric Status</div>
              <v-select
              :items="fabricStatus"
              v-model="filters.fabricStatus"
              placeholder="Select fabric status"
              dense
              outlined
              color="#544B99"
              height="44"
              hide-details
              validate-on-blur
              class="rounded-lg filter mr-2"
              append-icon="mdi-chevron-down"
            />
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">Accessory Status</div>
              <v-select
              :items="accessoryStatus"
              v-model="filters.accessoryStatus"
              placeholder="Select Accessory status"
              dense
              outlined
              color="#544B99"
              height="44"
              hide-details
              validate-on-blur
              class="rounded-lg filter mr-2"
              append-icon="mdi-chevron-down"
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
              Reset filters
            </v-btn>
            <v-btn
              width="140"
              color="#544B99"
              dark
              elevation="0"
              class="text-capitalize rounded-lg font-weight-bold"
              @click="filter"
            >
              Generate
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
      fabricStatus:["NOT_PLANNED","PLANNED","GENERATED_FABRIC","ORDERED"],
      accessoryStatus:["NOT_PLANNED","PLANNED","ORDERED"],
      filters: {
        approvedBy:"",
        orderNumber: "",
        modelNumber: "",
        supplierName:"",
        creator: "",
        sipNumber:"",
        fabricStatus:"",
        accessoryStatus:"",
      },
      isLoad: false,

      approvedSearch:"",
      sipNumberSearch:"",
      orderNumSearch: "",
      modelNumSearch: "",
      creatorSearch: "",
      users: [],
      pdfServe: "",
      partnerName:"",
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
    this.getPartnerName("");
    this.getSipNumbers("");
  },

  computed: {
    ...mapGetters({
      ordersList: "orders/ordersList",
      modelsList: "models/modelsList",
      usersList: "orders/usersList",
      pdfList: "generatePdf/productionPdfList",
      partnerLists: "fabricOrdering/partnerLists",
      sipNumbers: "fabricWarehouse/sipNumbers",
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
      this.pdfServe=objectUrl
      this.isLoad = false;
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
      getPdfList: "generatePdf/getProductionPdfList",
      getPartnerName: "fabricOrdering/getPartnerName",
      getSipNumbers: "fabricWarehouse/getSipNumbers",
    }),

    resetFilter() {
      this.$refs.filters.reset();
    },
    filter() {
      const data = {
        accessoryStatus:this.filters.accessoryStatus,
        fabricStatus:this.filters.fabricStatus,
        modelNumber: this.filters.modelNumber?.modelNumber
          ? this.filters.modelNumber?.modelNumber
          : "",
        orderNumber: this.filters.orderNumber?.orderNumber
          ? this.filters.orderNumber?.orderNumber
          : "",
      };
      this.getPdfList(data);
      this.isLoad = true;
    },
  },
};
</script>
<style lang="">
</style>
