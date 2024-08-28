<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>{{ $t("forms.orderedFabrics.title") }}</div>
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
                {{ $t("forms.orderedFabrics.approved")
                }}<span style="color: red">*</span>
              </div>
              <v-combobox
                v-model="filters.approvedBy"
                :items="users"
                :search-input.sync="approvedSearch"
                item-text="name"
                item-value="name"
                validate-on-blur
                outlined
                color="#544B99"
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
                {{ $t("forms.calculationsList.creator")
                }}<span style="color: red">*</span>
              </div>
              <v-combobox
                v-model="filters.creator"
                :items="users"
                :search-input.sync="creatorSearch"
                item-text="name"
                item-value="name"
                validate-on-blur
                outlined
                color="#544B99"
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
              <div class="label">{{ $t("forms.orderedFabrics.sip") }}</div>
              <v-combobox
                v-model="filters.sipNumber"
                :items="sipNumbers"
                :search-input.sync="sipNumberSearch"
                item-text="sipNumber"
                item-value="sipNumber"
                validate-on-blur
                outlined
                hide-details
                color="#544B99"
                height="44"
                class="rounded-lg filter"
                :return-object="true"
                dense
                :placeholder="$t('forms.orderedFabrics.sip')"
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
                {{ $t("forms.orderedFabrics.supplier")
                }}<span style="color: red">*</span>
              </div>
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
        approvedBy: "",
        orderNumber: "",
        modelNumber: "",
        supplierName: "",
        creator: "",
        sipNumber: "",
      },
      isLoad: false,

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
      pdfList: "generatePdf/orderedPdfList",
      partnerLists: "partners/partnerList",
      sipNumbers: "fabricWarehouse/sipNumbers",
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
    sipNumberSearch(val) {
      if (!!val) {
        this.getSipNumbers(val);
      }
    },
    usersList(list) {
      list.map((item) => {
        this.users.push({
          id: item.id,
          name: `${item.firstName} ${item.lastName}`,
        });
      });
    },
    partnerName(val) {
      this.getPartnerList({page:0, size:10,partnerName:val});
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
      getPdfList: "generatePdf/getOrderedPdfList",
      getPartnerList: "partners/getPartnerList",
      getSipNumbers: "fabricWarehouse/getSipNumbers",
    }),

    resetFilter() {
      this.$refs.filters.reset();
    },
    filter() {
      const data = {
        supplierName: !!this.filters.supplierName?.name
          ? this.filters.supplierName?.name
          : "",
        approvedBy: !!this.filters.approvedBy?.name
          ? this.filters.approvedBy?.name
          : "",
        sipNumber: !!this.filters.sipNumber?.sipNumber
          ? this.filters.sipNumber?.sipNumber
          : "",
        creator: !!this.filters.creator?.name ? this.filters.creator?.name : "",
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
<style lang=""></style>
