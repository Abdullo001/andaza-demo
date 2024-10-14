<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>{{ $t("forms.inspectionFiles.title") }}</div>
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
                {{ $t("forms.placedOrdersBox.modelGroup") }}
              </div>
              <v-combobox
                v-model="filters.modelGroup"
                :items="modelGroups"
                :search-input.sync="modelGroupSearch"
                item-text="name"
                item-value="id"
                validate-on-blur
                outlined
                hide-details
                height="44"
                class="rounded-lg filter d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                :placeholder="$t('forms.placedOrdersBox.modelGroup')"
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
              <div class="label">{{ $t("forms.calculationsList.gender") }}</div>
              <v-select
                :items="gander_enums"
                v-model="filters.gender"
                item-text="text"
                item-value="val"
                :placeholder="$t('forms.calculationsList.genderPlaceholder')"
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
              <div class="label">
                {{ $t("forms.calculationsList.clientName") }}
              </div>
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
                {{ $t("forms.placedOrdersBox.brandName") }}
              </div>
              <v-select
                :items="brandList"
                v-model="filters.brandName"
                :placeholder="$t('forms.placedOrdersBox.brandName')"
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
              <div class="label">
                {{ $t("forms.placedOrdersBox.fromDate") }}
              </div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.fromDate"
                  type="datetime"
                  style="width: 100%; height: 100%"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  :picker-options="pickerShortcuts"
                  value-format="timestamp"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">{{ $t("forms.placedOrdersBox.toDate") }}</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.toDate"
                  type="datetime"
                  style="width: 100%; height: 100%"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  :picker-options="pickerShortcuts"
                  value-format="timestamp"
                >
                </el-date-picker>
              </div>
            </v-col>
            
            <v-col cols="12" lg="3">
              <div class="label">
                {{ $t("forms.calculationsList.country") }}
              </div>
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
                :placeholder="$t('forms.calculationsList.country')"
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
                {{ $t("forms.calculationsList.creator") }}
              </div>
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
                :placeholder="$t('forms.calculationsList.creatorPlaceholder')"
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
                {{ $t("forms.placedOrdersBox.fabricStatus") }}
              </div>
              <v-select
                :items="fabric_status"
                v-model="filters.fabricStatus"
                :placeholder="$t('forms.placedOrdersBox.fabricStatus')"
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
              <div class="label">
                {{ $t("forms.placedOrdersBox.accessoryStatus") }}
              </div>
              <v-select
                :items="accessory_status"
                v-model="filters.accessoryStatus"
                :placeholder="$t('forms.placedOrdersBox.accessoryStatus')"
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
              <div class="label">
                {{ $t("forms.placedOrdersBox.modelStatus") }}
              </div>
              <v-select
                :items="status_enums"
                v-model="filters.modelStatus"
                :placeholder="$t('forms.placedOrdersBox.modelStatus')"
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
      status_enums: ["ACTIVE", "DISABLED", "PENDING"],
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
        accessoryStatus: "",
        fabricStatus: "",
        shippingDateYearly: "",
        shippingDateMonthly: "",
      },
      gander_enums: [
        {
          val: "MALE",
          text: this.$t("forms.calculationsList.gender_enums.male"),
        },
        {
          val: "FEMALE",
          text: this.$t("forms.calculationsList.gender_enums.female"),
        },
        {
          val: "BOY",
          text: this.$t("forms.calculationsList.gender_enums.boy"),
        },
        {
          val: "GIRL",
          text: this.$t("forms.calculationsList.gender_enums.girl"),
        },
        {
          val: "UNISEX",
          text: this.$t("forms.calculationsList.gender_enums.unisex"),
        },
      ],
      fabric_status: ["NOT_PLANNED", "PLANNED", "GENERATED_FABRIC", "ORDERED"],
      accessory_status: ["NOT_PLANNED", "PLANNED", "ORDERED"],
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
    });
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
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", objectUrl);
      a.click();
      this.pdfServe = objectUrl;
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
      this.filters.fromDate = "";
      this.filters.shippingDateYearly = "";
      this.filters.shippingDateMonthly = "";
      this.filters.toDate = "";
    },
    filter() {
      const { shippingDateYearly, shippingDateMonthly } = this.filters;
      let shippingDate = "";
      
      if (shippingDateYearly !== "") {
        shippingDate = shippingDateYearly;
      } else if (shippingDateMonthly !== "") {
        shippingDate = shippingDateMonthly;
      }
      const data = {
        brandName: this.filters.brandName,
        clientId: !!this.filters.clientName?.id
          ? this.filters.clientName?.id
          : null,
        countryId: !!this.filters.country?.id ? this.filters.country?.id : null,
        creatorId: this.filters.creatorId?.id ? this.filters.creatorId?.id : null,
        from: !!this.filters.fromDate ? this.filters.fromDate : null,
        gender: !!this.filters.gender ? this.filters.gender : null,
        // modelStatus: this.filters.modelStatus,
        accessoryStatus: !!this.filters.accessoryStatus ? this.filters.accessoryStatus : null,
        fabricStatus: !!this.filters.fabricStatus ? this.filters.fabricStatus : null,
        modelGroupId: this.filters.modelGroup?.id?this.filters.modelGroup?.id:null,
        modelId: this.filters.modelNumber?.id
          ? this.filters.modelNumber?.id
          : null,
        orderId: this.filters.orderNumber?.id
          ? this.filters.orderNumber?.id
          : null,
        to: !!this.filters.toDate ? this.filters.toDate : null,
        modelStatus:"ACTIVE"
        
      };

      this.getPdfList(data);
      this.isLoad = true;
    },
  },
};
</script>
<style lang=""></style>
