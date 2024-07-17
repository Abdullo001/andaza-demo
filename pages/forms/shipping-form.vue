<template >
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>
          Shipment Form
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row class="mb-5">


            <v-col cols="12" lg="3">
              <div class="label">Client name</div>
              <v-combobox
                v-model="filters.clientName"
                :items="clientList"
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
                placeholder="Client name"
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
              <div class="label">From date</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.fromDate"
                  type="datetime"
                  style="width: 100%; height: 100%"
                  placeholder="dd.MM.yyyy HH:mm:ss"
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
                  type="datetime"
                  style="width: 100%; height: 100%"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">Country</div>
              <v-combobox
                v-model="filters.country"
                :items="countryList"
                :search-input.sync="countryIdSearch"
                item-text="name"
                item-value="id"
                validate-on-blur
                outlined
                hide-details
                height="44"
                class="rounded-lg filter d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                placeholder="Country"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
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



      },
      season_enums: [
        {key: 'SS', text: ' Spring/Summer'},
        {key: 'AW', text: 'Autumn/Winter'}
      ],
      gander_enums: ["MALE", "FEMALE", "BOY", "GIRL", "UNISEX"],
      fabric_status:["NOT_PLANNED","PLANNED","GENERATED_FABRIC", "ORDERED"],
      accessory_status:["NOT_PLANNED","PLANNED", "ORDERED"],
      isLoad: false,


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
      getPdfList: "generatePdf/getShipmentPdf",
    }),

    resetFilter() {
      this.$refs.filters.reset();
      this.filters.fromDate=""
      this.filters.toDate=""
    },
    filter() {
      const data = {
        clientName: !!this.filters.clientName?.name
          ? this.filters.clientName?.name
          : "",
        country: !!this.filters.country?.name ? this.filters.country?.name : "",
        fromDate: !!this.filters.fromDate ? this.filters.fromDate : null,
        toDate: !!this.filters.toDate ? this.filters.toDate : null,
      };
      this.getPdfList(data);
      this.isLoad = true;
    },
  },
};
</script>
<style lang="">
</style>
