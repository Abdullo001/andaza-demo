<template >
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>
          Suppliers form of ordered fabrics
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row class="mb-5">
            <v-col cols="12" lg="3">
              <div class="label">Supplier name <span style="color:red">*</span></div>
              <v-combobox
                v-model="filters.supplier"
                :items="partnerLists"
                :search-input.sync="partnerName"
                item-text="name"
                item-value="id"
                outlined
                hide-details
                height="44"
                class="rounded-lg filter"
                :return-object="true"
                color="#544B99"
                dense
                placeholder="Enter partner name"
                append-icon="mdi-chevron-down"
                :rules="[formRules.required]"
                validate-on-blur
                >
                <template #append>
                  <v-icon color="#544B99">mdi-magnify</v-icon>
                </template>
               </v-combobox>
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">From date</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.fromDate"
                  type="date"
                  style="width: 100%; height: 100%"
                  placeholder="dd.MM.yyyy"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">To date</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.toDate"
                  type="date"
                  style="width: 100%; height: 100%"
                  placeholder="dd.MM.yyyy"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">Status</div>
              <v-select
                :items="status_enums"
                v-model="filters.status"
                placeholder="Status"
                dense
                outlined
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
      filters: {
        clientName: "",
        country: "",
        season: "",
        fromDate: "",
        toDate: "",
        gender: "",
        creatorId: "",
        status:"",
      },
      season_enums: [
        {key: 'SS', text: ' Spring/Summer'},
        {key: 'AW', text: 'Autumn/Winter'},
      ],
      status_enums: ['ORDERED','RECEIVED'],
      gander_enums: ["MALE", "FEMALE", "BOY", "GIRL", "UNISEX"],
      fabric_status:["NOT_PLANNED","PLANNED","GENERATED_FABRIC", "ORDERED"],
      accessory_status:["NOT_PLANNED","PLANNED", "ORDERED"],
      isLoad: false,

      partnerName:"",
      clientSearch: "",
      countryIdSearch: "",
      creatorSearch: "",
      users: [],
      pdfServe: "",
    };
  },
  created() {


    this.getClient();
    this.getCountryList({ name: this.countryIdSearch });
    this.getUsersList();
  },

  computed: {
    ...mapGetters({
      partnerLists: "fabricOrdering/partnerLists",
      clientList: "orders/clientList",
      countryList: "partners/countryList",
      usersList: "orders/usersList",
      pdfList: "generatePdf/orderedFabricPdfList",
    }),
  },

  watch: {
    partnerName(val) {
      if(!!val && val !== '') {
      this.getPartnerName(val);
      }
    },
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
      this.pdfServe=objectUrl
      this.isLoad = false;
    },
    usersList(list) {
      list.map((item) => {
        this.users.push({
          id: item.id,
          name: `${item.firstName} ${item.lastName}`,
        });
      });
    },

    "filters.clientName"(val) {
      if (typeof val === "object" && !!val) {
        this.getBrandList(val?.id);
      }
    },
    countryIdSearch(val) {
      this.getCountryList({ name: val });
    },
  },

  methods: {
    ...mapActions({

      getClient: "orders/getClient",
      getCountryList: "partners/getCountryList",
      getUsersList: "orders/getUsersList",
      getPdfList: "generatePdf/getOrderedFabricPdfList",
      getPartnerName: "fabricOrdering/getPartnerName",

    }),

    resetFilter() {
      this.filters.fromDate=''
      this.filters.toDate=''
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
      if(!!this.filters.supplier){
        this.getPdfList(data);
        this.isLoad = true;
      }
    },
  },
};
</script>
<style lang="">
</style>
