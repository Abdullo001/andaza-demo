<template >
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row>
            <v-col cols="12" lg="4" md="4">
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
                 :placeholder="$t('orderBox.index.orderNum')"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" lg="4" md="4">
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
                :placeholder="$t('listsModels.child.modelName')"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-spacer />
            <v-col cols="12" lg="3">
              <div class="d-flex justify-end">
                <v-btn
                  width="140"
                  outlined
                  color="#544B99"
                  elevation="0"
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
                  @click="resetFilter"
                >
                 {{ $t('listsModels.dialog.reset') }}
                </v-btn>
                <v-btn
                  width="140"
                  color="#544B99"
                  dark
                  elevation="0"
                  class="text-capitalize rounded-lg font-weight-bold"
                  @click="filterOrder"
                >
                  {{ $t('listsModels.dialog.search') }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-data-table
      :headers="headers"
      :items="currentList"
      :items-per-page="itemsPerPage"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      :loading="loading"
      @update:page="page"
      @update:items-per-page="size"
      :server-items-length="totalElements"
      @click:row="(item) => viewDetails(item)"

      class="mt-4"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>{{ $t('samplesBox.samples') }}</div>
            <v-btn
              color="#544B99"
              dark
              class="text-capitalize rounded-lg"
              @click="$router.push(localePath(`/samples/create-sample`))"
            >
              <v-icon>mdi-plus</v-icon>
             {{ $t('samplesBox.addSample') }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.fqsStatus="{ item }">
        <v-select
          :background-color="statusColor.sampleStatusColor(item.fqsStatus)"
          :items="status_enums"
          readonly
          append-icon="mdi-chevron-down"
          v-model="item.fqsStatus"
          hide-details
          class="mt-n2"
          rounded
          dark
        />
      </template>
      <template #item.ldStatus="{ item }">
        <v-select
          :background-color="statusColor.sampleStatusColor(item.ldStatus)"
          :items="status_enums"
          readonly
          append-icon="mdi-chevron-down"
          v-model="item.ldStatus"
          hide-details
          class="mt-n2"
          rounded
          dark
        />
      </template>
      <template #item.fitStatus="{ item }">
        <v-select
          :background-color="statusColor.sampleStatusColor(item.fitStatus)"
          :items="status_enums"
          readonly
          append-icon="mdi-chevron-down"
          v-model="item.fitStatus"
          hide-details
          class="mt-n2"
          rounded
          dark
        />
      </template>
      <template #item.strikeStatus="{ item }">
        <v-select
          :background-color="statusColor.sampleStatusColor(item.strikeStatus)"
          :items="status_enums"
          readonly
          append-icon="mdi-chevron-down"
          v-model="item.strikeStatus"
          hide-details
          class="mt-n2"
          rounded
          dark
        />
      </template>
      <template #item.bulkStatus="{ item }">
        <v-select
          :background-color="statusColor.sampleStatusColor(item.bulkStatus)"
          :items="status_enums"
          readonly
          append-icon="mdi-chevron-down"
          v-model="item.bulkStatus"
          hide-details
          class="mt-n2"
          rounded
          dark
        />
      </template>
      <template #item.ppsStatus="{ item }">
        <v-select
          :background-color="statusColor.sampleStatusColor(item.ppsStatus)"
          :items="status_enums"
          readonly
          append-icon="mdi-chevron-down"
          v-model="item.ppsStatus"
          hide-details
          class="mt-n2"
          rounded
          dark
        />
      </template>
      <template #item.photoSampleStatus="{ item }">
        <v-select
          :background-color="statusColor.sampleStatusColor(item.photoSampleStatus)"
          :items="status_enums"
          readonly
          append-icon="mdi-chevron-down"
          v-model="item.photoSampleStatus"
          hide-details
          class="mt-n2"
          rounded
          dark
        />
      </template>
      <template #item.shipmentStatus="{ item }">
        <v-select
          :background-color="statusColor.sampleStatusColor(item.shipmentStatus)"
          :items="status_enums"
          readonly
          append-icon="mdi-chevron-down"
          v-model="item.shipmentStatus"
          hide-details
          class="mt-n2"
          rounded
          dark
        />
      </template>
      <template #item.certificateStatus="{ item }">
        <v-select
          :background-color="statusColor.sampleStatusColor(item.certificateStatus)"
          :items="status_enums"
          readonly
          append-icon="mdi-chevron-down"
          v-model="item.certificateStatus"
          hide-details
          class="mt-n2"
          rounded
          dark
        />
      </template>


      <template #item.actions="{ item, index }">
        <v-tooltip top color="#544B99">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#544B99"
              v-on="on"
              v-bind="attrs"
              @click="viewDetails(item)"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <span>Details</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      filter_form: true,
      selectedSample: {},
      enums: ["TPX", "TPC", "TPG", "C", "MELANGE"],

      current_page: 0,
      itemsPerPage: 10,
      image_list: [],
      edit_image_list: [],
      result_enums: ["PENDING", "OK", "REMAKE"],
      sample: {
        modelNumber: null,
        modelPartId: null,
        colorId: null,
        purposeId: "",
        partnerId: "",
        sentDate: "",
        recievedDate: "",
        result: "",
        reason: "",
      },
      filters: {
        orderNumber: "",
        modelNumber: "",
      },
      headers: [
        { text: "Id", align: "start", sortable: false, value: "id" },
        { text: "Order №", sortable: false, value: "orderNumber", width: 150 },
        { text: "Model №", sortable: false, value: "modelNumber", width: 150 },
        { text: "FQS", sortable: false, value: "fqsStatus" },
        { text: "LD", sortable: false, value: "ldStatus" },
        { text: "FIT", sortable: false, value: "fitStatus" },
        { text: "STRIKE", sortable: false, value: "strikeStatus" },
        { text: "BULK", sortable: false, value: "bulkStatus" },
        { text: "PPS", sortable: false, value: "ppsStatus" },
        { text: "PHOTO SAMPLE", sortable: false, value: "photoSampleStatus" },
        { text: "SHIPMET SAMPLE", sortable: false, value: "shipmentStatus" },
        {
          text: "CERTIFICATE SAPLE",
          sortable: false,
          value: "certificateStatus",
        },
        {
          text: "Actions",
          sortable: false,
          value: "actions",
          align: "center",
          width: 150,
        },
      ],
      currentList: [],
      orderNumSearch: "",
      modelNumSearch: "",
      status_enums:["EMPTY","OK","IN_PROCESS"]
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
  },

  computed: {
    ...mapGetters({
      ordersList: "orders/ordersList",
      modelsList: "models/modelsList",
      samplesList: "accessorySamples/samplesList",
      loading: "accessorySamples/loading",
      totalElements: "accessorySamples/totalElements",
    }),
  },

  watch: {
    samplesList(val) {
      this.currentList = JSON.parse(JSON.stringify(val));
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
      getSamplesList: "accessorySamples/getSamplesList",
      getModelId: "orders/getModelId",
    }),
    viewDetails(item) {
      this.$router.push(localePath(`/samples/${item.id}`));
    },

    filterOrder() {
      this.getSamplesList({
        page: 0,
        size: 10,
        modelNumber: this.filters.modelNumber.modelNumber,
        orderNumber: this.filters.orderNumber.orderNumber,
      });
    },
    resetFilter() {
      this.filters = {
        orderNumber: "",
        modelNumber: "",
      };
      this.getSamplesList({
        page: 0,
        size: 10,
        modelNumber: "",
        orderNumber: "",
      });
    },


    async page(value) {
      this.current_page = value - 1;
      await this.getSamplesList({
        page: this.current_page,
        size: this.itemPrePage,
        modelNumber: this.filters.modelNumber.modelNumber,
        orderNumber: this.filters.orderNumber.orderNumber,
      });
    },
    async size(value) {
      this.itemPrePage = value;
      await this.getSamplesList({
        page: 0,
        size: this.itemPrePage,
        modelNumber: this.filters.modelNumber.modelNumber,
        orderNumber: this.filters.orderNumber.orderNumber,
      });
    },
  },

  mounted() {
    this.$store.commit("setPageTitle", "Planning");
    this.getSamplesList({
      page: 0,
      size: 10,
      modelNumber: "",
      orderNumber: "",
    });
  },
};
</script>
<style lang="">
</style>
