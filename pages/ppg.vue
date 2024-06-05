<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Sip №"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.sipNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Batch №"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.batchNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Order №"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.orderNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-spacer />
          <v-col cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn
                width="140"
                outlined
                color="#544B99"
                elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                Reset
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                Search
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="current_list"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      show-expand
      @update:page="page"
      @update:items-per-page="size"
      :server-items-length="totalElements"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      @item-expanded="loadDetails"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>Production plan of Garment  (PPG)</div>
            
          </v-toolbar-title>
        </v-toolbar>
      </template>
      
      
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-card flat>
            <v-card-text>
              <!-- <v-row>
                <v-col>
                  <div class="body-1 mb-3">
                    Fabric width in order:
                    <span class="font-weight-bold ml-2">
                      {{ item?.fabricWidthInOrder }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Fabric width in fact:
                    <span class="font-weight-bold ml-2">
                      {{ item?.fabricWidthInFact }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Density(gsm) in order gr/m2:
                    <span class="font-weight-bold ml-2">
                      {{ item?.densityInOrder ?? "No" }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Density(gsm) in fact gr/m2:
                    <span class="font-weight-bold ml-2">
                      {{ item?.densityInFact ?? "No" }}</span
                    >
                  </div>
                </v-col>
                <v-col>
                  <div class="body-1 mb-3">
                    Actual fabric quantity:
                    <span class="font-weight-bold ml-2">
                      {{ item?.actualFabricQuantity }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Fabric received Gross weight:
                    <span class="font-weight-bold ml-2">
                      {{ item?.factReceivedGrossWeight }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Actual fabric price:
                    <span class="font-weight-bold ml-2">
                      {{ item?.actualUnitPrice }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Ordered quantity:
                    <span class="font-weight-bold ml-2">
                      {{ item?.orderedQuantity }}</span
                    >
                  </div>
                </v-col>
                <v-col>
                  <div class="body-1 mb-3">
                    Created at:
                    <span class="font-weight-bold ml-2">
                      {{ item?.updatedAt }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Created by:
                    <span class="font-weight-bold ml-2">
                      {{ item?.updatedBy }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Total price:
                    <span class="font-weight-bold ml-2">
                      {{ item?.actualTotalPrice }}</span
                    >
                  </div>
                </v-col>
              </v-row> -->
              <v-row>
                <v-col cols="8">
                  <div class="label text-center">I. SAMPLES</div>
                  <v-row>
                    <v-col cols="3">
                      LAB DIP
                      <v-divider class="my-2" />
                      <div class="body-1 mb-3">
                        Created at:
                        <span class="font-weight-bold ml-2">
                          {{ item?.updatedAt }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Created by:
                        <span class="font-weight-bold ml-2">
                          {{ item?.updatedBy }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Total price:
                        <span class="font-weight-bold ml-2">
                          {{ item?.actualTotalPrice }}</span
                        >
                      </div>
                    </v-col>
                    <v-col cols="3">
                      LAB DIP
                      <v-divider class="my-2" />
                    </v-col>
                    <v-col cols="3">
                      LAB DIP
                      <v-divider class="my-2" />
                    </v-col>
                    <v-col cols="3">
                      LAB DIP
                      <v-divider class="my-2" />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="2">
                  <div class="label text-center">II. INSPECTION</div>

                </v-col>
                
              </v-row>
              <v-row>
                <v-col cols="6">
                  <div class="label text-center">III. PRODUCTION</div>
                  <v-row>
                    <v-col cols="4">
                      CUTTING
                      <v-divider class="my-2" />
                      <div class="body-1 mb-3">
                        Created at:
                        <span class="font-weight-bold ml-2">
                          {{ item?.updatedAt }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Created by:
                        <span class="font-weight-bold ml-2">
                          {{ item?.updatedBy }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Total price:
                        <span class="font-weight-bold ml-2">
                          {{ item?.actualTotalPrice }}</span
                        >
                      </div>
                    </v-col>
                    <v-col cols="4">
                      PRINTING
                      <v-divider class="my-2" />

                    </v-col>
                    <v-col cols="4">
                      SEWING
                      <v-divider class="my-2" />

                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="2">
                  <div class="label text-center">IV. SHIPMENT</div>

                </v-col>
                <v-col cols="2">
                  <div class="label text-center">V. MODEL CANCEL</div>

                </v-col>
                <v-col cols="2">
                  <div class="label text-center">VI. DISCOUNT</div>

                </v-col>

              </v-row>
            </v-card-text>
          </v-card>
        </td>
      </template>
    </v-data-table>

  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      sipNumberSearch:"",
      headers: [
        { text: "№", value: "id", sortable: false },
        { text: "Photo", value: "photo", sortable: false },
        { text: "Client", value: "client", sortable: false },
        { text: "Model №", value: "modelNumber", sortable: false },
        { text: "Fabric deadline", value: "fabricDeadline", sortable: false },
        { text: "Fabric status", value: "fabricStatus", sortable: false },
        { text: "Main color", value: "mainColor", sortable: false },
        { text: "Articles", value: "articles", sortable: false },
        { text: "Order q-ty", value: "orderQuantity", sortable: false },
        { text: "Deadline of order", value: "orderDeadline", sortable: false },
        { text: "Price", value: "price", sortable: false },
        { text: "Total price", value: "totalPrice", sortable: false },
        { text: "Model group", value: "modelGroup", sortable: false },
        { text: "Size group", value: "sizeGroup", sortable: false },
        { text: "Main fabric composition", value: "mainComposition", sortable: false },
        { text: "Density gsm", value: "densityGsm", sortable: false },
        { text: "Fabric rework", value: "fabricRework", sortable: false },
        { text: "Artwork", value: "artwork", sortable: false },
        { text: "Finish plan status", value: "finishPlanStatus", sortable: false },
        { text: "Delay in delivery (days)", value: "delayInDelivery", sortable: false },
        { text: "KPI category", value: "kpi", sortable: false },
        
        { text: "", value: "data-table-expand" },
      ],

      historyHeaders: [
        { text: "Date", value: "date", sortable: false },
        {
          text: "Warehouse operations",
          value: "warehouseOperations",
          sortable: false,
        },
        { text: "From", value: "from", sortable: false },
        { text: "To", value: "to", sortable: false },
        { text: "Quantity", value: "quantity", sortable: false },
        { text: "Done by ", value: "doneBy", sortable: false },
      ],

      historyList: [
        {
          date: "08.01.2023",
          warehouseOperations: "Fabric order income",
          from: "Fashionmelon LLC",
          to: "Fashionmelon LLC",
          quantity: "1800 kg",
          doneBy: "Shavkatova M.",
        },
      ],

      expanded: [],
      singleExpand: true,
      valid_search: "",
      new_validate: true,
      workshop_validate: true,
      subcontractor_validate: true,
      spend_validate: true,
      new_dialog: false,
      delete_dialog: false,
      spend_dialog: false,
      workshop_dialog: false,
      subcontractor_dialog: false,

      history_dialog: false,

      title: "",
      arrivedFabric: {},
      

      

      

      filters: {
        sipNumber: null,
        batchNumber: null,
        orderNumber: null,
      },

      deletedId: null,
      modelNumbers: [],
      itemPrePage: 10,
      current_page: 0,

      current_list: [],
    };
  },

  computed: {
    ...mapGetters({
      fabricWarehouseList: "fabricWarehouse/fabricWarehouseList",
      sipNumbers: "fabricWarehouse/sipNumbers",
      toSipNumbers: "fabricWarehouse/toSipNumbers",
      totalElements: "fabricWarehouse/totalElements",
      partnerList: "subcontracts/partnerList",
    }),
  },

  watch: {
    sipNumberSearch(val){
      if(!!val){
        this.getSipNumbers(val);
      }
    },
    fabricWarehouseList(val) {
      this.current_list = JSON.parse(JSON.stringify(val));
    },
  },

  created() {
    
  },

  methods: {
    ...mapActions({
      getFabricWarehouseList: "fabricWarehouse/getFabricWarehouseList",
      createFabricWarehouse: "fabricWarehouse/createFabricWarehouse",
      getSipNumbers: "fabricWarehouse/getSipNumbers",
      updateFabricWarehouse: "fabricWarehouse/updateFabricWarehouse",
      deleteFabricWarehouse: "fabricWarehouse/deleteFabricWarehouse",
      getToSipNumbers: "fabricWarehouse/getToSipNumbers",
      setSpendingFabric: "fabricWarehouse/setSpendingFabric",
      setFabricToWorkshop: "fabricWarehouse/setFabricToWorkshop",
      setFabricToSubcontract: "fabricWarehouse/setFabricToSubcontract",
      getPartnerList: "subcontracts/getPartnerList",
    }),
    loadDetails({ item }) {
      // current opened || choose object ^
    },
    async page(value) {
      this.current_page = value - 1;
      await this.getFabricWarehouseList({
        sipNumber: this.filters.sipNumber,
        batchNumber: this.filters.batchNumber,
        orderNumber: this.filters.orderNumber,
        page:this.current_page,
        size:this.itemPrePage,
      });
    },
    async size(value) {
      this.itemPrePage = value;
      await this.getFabricWarehouseList({
        sipNumber: this.filters.sipNumber,
        batchNumber: this.filters.batchNumber,
        orderNumber: this.filters.orderNumber,
        page:this.current_page,
        size:this.itemPrePage,
      });
    },
    

    

    async saveArrivedFabric() {
      const data = { ...this.arrivedFabric };
      await this.createFabricWarehouse(data);
      await this.$refs.new_form.reset();
      this.new_dialog = false;
    },

    

    

    

    filterData() {
      this.getFabricWarehouseList({
        sipNumber: this.filters.sipNumber,
        batchNumber: this.filters.batchNumber,
        orderNumber: this.filters.orderNumber,
        page:this.current_page,
        size:this.itemPrePage,
      });
    },
    async resetFilters() {
      await this.getFabricWarehouseList({
        sipNumber: "",
        batchNumber: "",
        orderNumber: "",
        page:this.current_page,
        size:this.itemPrePage,
      });
      await this.$refs.filter_form.reset();
    },
  },

  mounted() {
    this.getFabricWarehouseList({
      sipNumber: "",
      batchNumber: "",
      orderNumber: "",
      page:0,
      size:10,
    });
  },
};
</script>
<style lang="scss"></style>
