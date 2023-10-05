<template >
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>
          Placed orders
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
                height="44"
                class="rounded-lg filter d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                placeholder="Order name"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#7631FF">
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
                hide-details
                height="44"
                class="rounded-lg filter d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                placeholder="Model name"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#7631FF">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">Model group</div>
              <v-combobox
                v-model="filters.modelGroup"
                :items="modelGroups"
                :search-input.sync="modelGroupSearch"
                item-text="name"
                item-value="name"
                validate-on-blur
                outlined
                hide-details
                height="44"
                class="rounded-lg filter d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                placeholder="Model group"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#7631FF">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">Gender</div>
              <v-select
                :items="gander_enums"
                v-model="filters.gender"
                placeholder="Gender type"
                dense
                outlined
                height="44"
                hide-details
                validate-on-blur
                class="rounded-lg filter mr-2"
                append-icon="mdi-chevron-down"
              />
            </v-col>
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
                  <v-icon class="d-inline-block" color="#7631FF">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">Brand name</div>
              <v-select
                :items="brandList"
                v-model="filters.brandName"
                placeholder="Brand name"
                dense
                outlined
                height="44"
                hide-details
                validate-on-blur
                class="rounded-lg filter mr-2"
                append-icon="mdi-chevron-down"
              />
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
                  <v-icon class="d-inline-block" color="#7631FF">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">Creator</div>
              <v-combobox
                v-model="filters.creatorId"
                :items="users"
                :search-input.sync="creatorSearch"
                item-text="name"
                item-value="id"
                validate-on-blur
                outlined
                hide-details
                height="44"
                class="rounded-lg filter d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                placeholder="Creator name"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#7631FF">
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
              color="#7631FF"
              elevation="0"
              class="text-capitalize mr-4 rounded-lg font-weight-bold"
              @click="resetFilter"
            >
              Reset filters
            </v-btn>
            <v-btn
              width="140"
              color="#7631FF"
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
        color="#7631FF"
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
        orderNumber: "",
        modelNumber: "",
        modelGroup: "",
        clientName: "",
        country: "",
        brandName: "",
        fromDate: "",
        toDate: "",
        gender: "",
        creatorId: "",

      },
      gander_enums: ["MALE", "FEMALE", "BOY", "GIRL", "UNISEX"],
      isLoad: false,

      orderNumSearch: "",
      modelNumSearch: "",
      modelGroupSearch: "",
      clientSearch: "",
      brandNameSearch: "",
      countryIdSearch: "",
      creatorSearch: "",
      users: [],
      pdfServe: "",
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
      this.getModelGroup({ name: this.modelGroupSearch });
    this.getClient();
    this.getCountryList({ name: this.countryIdSearch });
    this.getUsersList();
  },

  computed: {
    ...mapGetters({
      ordersList: "orders/ordersList",
      modelsList: "models/modelsList",
      modelGroups: "orders/modelGroups",
      clientList: "orders/clientList",
      brandList: "models/brandList",
      countryList: "partners/countryList",
      usersList: "orders/usersList",
      pdfList: "generatePdf/pdfList",
    }),
  },

  watch: {
    pdfList(val) {
      const blob = new Blob(
        [new Uint8Array([...val].map((char) => char.charCodeAt(0)))],
        { type: "application/pdf" }
      );
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", objectUrl);
      a.click();
      this.pdfServe=objectUrl
      URL.revokeObjectURL(objectUrl);
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
    modelGroupSearch(val) {
      if (!!val) {
        this.getModelGroup({ name: val });
      }
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
      filterOrderList: "orders/filterOrderList",
      getModelsList: "models/getModelsList",
      getModelGroup: "orders/getModelGroup",
      getClient: "orders/getClient",
      getBrandList: "models/getBrandList",
      getCountryList: "partners/getCountryList",
      getUsersList: "orders/getUsersList",
      getPdfList: "generatePdf/getPdfList",
    }),

    resetFilter() {
      this.$refs.filters.reset();
    },
    filter() {
      const data = {
        brandName: this.filters.brandName,
        clientName: !!this.filters.clientName?.name
          ? this.filters.clientName?.name
          : "",
        country: !!this.filters.country?.name ? this.filters.country?.name : "",
        creatorId: this.filters.creatorId?.id ? this.filters.creatorId?.id : 0,
        fromDate: !!this.filters.fromDate ? this.filters.fromDate : null,
        gender: this.filters.gender,
        modelGroup: this.filters.modelGroup,
        modelNumber: this.filters.modelNumber?.modelNumber
          ? this.filters.modelNumber?.modelNumber
          : "",
        orderNumber: this.filters.orderNumber?.orderNumber
          ? this.filters.orderNumber?.orderNumber
          : "",
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