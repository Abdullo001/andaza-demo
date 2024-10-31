<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>All Warehouse Remaining</div>
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row class="mb-5">
            <v-col cols="4">
              <v-btn
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg font-weight-bold"
                @click="()=>{getStockAccessoryPdf();  isLoad=true}"
              >
                Generate Acessory Stock Remaining
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg font-weight-bold"
                @click="()=>{getWarehouseRemainsPdf();  isLoad=true}"
              >
                Generate All Warehouse Remaining
              </v-btn>
            </v-col>
          </v-row>
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
        clientName: "",
        country: "",
        season: "",
        fromDate: "",
        toDate: "",
        gender: "",
        creatorId: "",
        status: "",
      },
      season_enums: [
        { key: "SS", text: " Spring/Summer" },
        { key: "AW", text: "Autumn/Winter" },
      ],
      status_enums: ["ORDERED", "RECEIVED"],
      gander_enums: ["MALE", "FEMALE", "BOY", "GIRL", "UNISEX"],
      fabric_status: ["NOT_PLANNED", "PLANNED", "GENERATED_FABRIC", "ORDERED"],
      accessory_status: ["NOT_PLANNED", "PLANNED", "ORDERED"],
      isLoad: false,

      partnerName: "",
      clientSearch: "",
      countryIdSearch: "",
      creatorSearch: "",
      users: [],
      pdfServe: "",
    };
  },
  

  computed: {
    ...mapGetters({
      partnerLists: "partners/partnerList",
      clientList: "orders/clientList",
      countryList: "partners/countryList",
      usersList: "orders/usersList",
      pdfList: "generatePdf/pdfData",
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
  },

  methods: {
    ...mapActions({
      getClient: "orders/getClient",
      getCountryList: "partners/getCountryList",
      getUsersList: "orders/getUsersList",
      getPdfList: "generatePdf/getOrderedFabricPdfList",
      getStockAccessoryPdf:"generatePdf/getStockAccessoryPdf",
      getWarehouseRemainsPdf:"generatePdf/getWarehouseRemainsPdf",
      getPartnerList: "partners/getPartnerList",
    }),

    resetFilter() {
      this.filters.fromDate = "";
      this.filters.toDate = "";
      this.$refs.filters.reset();
    },
    filter() {
      const data = {
        supplier: !!this.filters.supplier?.name
          ? this.filters.supplier?.name
          : "",
        fromDate: !!this.filters.fromDate ? this.filters.fromDate : null,
        toDate: !!this.filters.toDate ? this.filters.toDate : null,
        status: this.filters.status,
      };
      if (!!this.filters.supplier) {
        this.getPdfList(data);
        this.isLoad = true;
      }
    },
  },
};
</script>
<style lang=""></style>
