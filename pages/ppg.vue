<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Model No."
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.modelNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Order No."
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.orderNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Subcon. name"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.clientName"
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

      <template #item.photo="{item}">
        <v-img
          :src="item.photo"
          class="flex-sm-grow-0 mr-2 mt-2"
          :width="38"
          :height="38"
          @click="showImage(item.photo)"

        />
      </template>

      <template #item.fabricStatus="{ item }">
        <v-chip :color="statusColor.fabricModelStatus(item.fabricStatus)" dark>
          {{ item.fabricStatus }}
        </v-chip>
      </template>
      <template #item.accessoryStatus="{ item }">
        <v-chip :color="statusColor.fabricModelStatus(item.accessoryStatus)" dark>
          {{ item.accessoryStatus }}
        </v-chip>
      </template>
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col cols="8">
                  <div class="label text-center">I. SAMPLES</div>
                  <v-row>
                    <v-col cols="3">
                      LAB DIP
                      <v-divider class="my-2" />
                      <div class="body-1 mb-3">
                        No. :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.ldResponse?.ordinalNumber }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Body part color :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.ldResponse?.color }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Fabric supplier :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.ldResponse?.supplier }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        LD sent date :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.ldResponse?.sendDate }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        LD received date :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.ldResponse?.receivedDate }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Result :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.ldResponse?.result }}</span
                        >
                      </div>
                    </v-col>
                    <v-col cols="3">
                      FITTING
                      <v-divider class="my-2" />
                      <div class="body-1 mb-3">
                        No. :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.fitResponse?.ordinalNumber }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Body part color :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.fitResponse?.color }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Sent date :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.fitResponse?.sendDate }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Received date :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.fitResponse?.receivedDate }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Result :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.fitResponse?.result }}</span
                        >
                      </div>
                    </v-col>
                    <v-col cols="3">
                      BULK
                      <v-divider class="my-2" />
                      <div class="body-1 mb-3">
                        No. :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.bulkResponse?.ordinalNumber }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Body part color :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.bulkResponse?.color }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Supplier :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.bulkResponse?.supplier }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Sent date :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.bulkResponse?.sendDate }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Received date :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.bulkResponse?.receivedDate }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Result :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.bulkResponse?.result }}</span
                        >
                      </div>
                    </v-col>
                    <v-col cols="3">
                      PPS
                      <v-divider class="my-2" />

                      <div class="body-1 mb-3">
                        No. :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.ppsResponse?.ordinalNumber }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Body part color :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.ppsResponse?.color }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Sent date :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.ppsResponse?.sendDate }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Received date :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.ppsResponse?.receivedDate }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Result :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.ppsResponse?.result }}</span
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="2">
                  <div class="label text-center">II. INSPECTION</div>
                  <div v-for="(el,idx) in itemDetail.inspectionResponses" :key="idx">
                    <div class="body-1 mb-3">
                      {{ idx+1 }}. Inspection sent date :
                      <span class="font-weight-bold ml-2">
                        {{ el.inspectionDate }}</span
                      >
                    </div>
                    <div class="body-1 mb-3">
                      Status :
                      <span class="font-weight-bold ml-2">
                        {{ el.status }}</span
                      >
                    </div>
                    <div class="body-1 mb-3">
                      Description :
                      <span class="font-weight-bold ml-2">
                        {{ el.description }}</span
                      >
                    </div>
                    <div class="body-1 mb-3">
                      Inspector :
                      <span class="font-weight-bold ml-2">
                        {{ el.inspector }}</span
                      >
                    </div>
                  </div>
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
                        Fabric supplier :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.cuttingResponse?.fabricSupplier }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Start date :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.cuttingResponse?.startDate }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Cutting quantity :
                        <span class="font-weight-bold ml-2">
                          {{ moneyFormatter(itemDetail.cuttingResponse?.quantity, true) }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Finish date :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.cuttingResponse?.finishDate }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Status :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.cuttingResponse?.status }}</span
                        >
                      </div>

                    </v-col>
                    <v-col cols="4">
                      PRINTING
                      <v-divider class="my-2" />
                      <div class="body-1 mb-3">
                        Fabric supplier :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.printingResponse?.fabricSupplier }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Start date :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.printingResponse?.startDate }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Printing quantity :
                        <span class="font-weight-bold ml-2">
                          {{ moneyFormatter(itemDetail.printingResponse?.quantity, true) }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Finish date :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.printingResponse?.finishDate }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Status :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.printingResponse?.status }}</span
                        >
                      </div>

                    </v-col>
                    <v-col cols="4">
                      SEWING
                      <v-divider class="my-2" />
                      <div class="body-1 mb-3">
                        Fabric supplier :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.sewingResponse?.fabricSupplier }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Start date :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.sewingResponse?.startDate }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Sewing quantity :
                        <span class="font-weight-bold ml-2">
                          {{ moneyFormatter(itemDetail.sewingResponse?.quantity, true) }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Finish date :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.sewingResponse?.finishDate }}</span
                        >
                      </div>
                      <div class="body-1 mb-3">
                        Status :
                        <span class="font-weight-bold ml-2">
                          {{ itemDetail.sewingResponse?.status }}</span
                        >
                      </div>

                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="2">
                  <div class="label text-center">IV. SHIPMENT</div>
                  <div class="body-1 mb-3">
                    {{ $t("shipping.index.invoiceNo") }} :
                    <span class="font-weight-bold ml-2">
                      {{ itemDetail.shipmentResponse?.invoiceNumber }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Truck in :
                    <span class="font-weight-bold ml-2">
                      {{ itemDetail.shipmentResponse?.truckIn }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Truck out :
                    <span class="font-weight-bold ml-2">
                      {{ itemDetail.shipmentResponse?.truckOut }}</span
                    >
                  </div>
                </v-col>
                <v-col cols="2">
                  <div class="label text-center">V. MODEL CANCEL</div>

                </v-col>
                <v-col cols="2">
                  <div class="label text-center">VI. DISCOUNT</div>
                  <div class="body-1 mb-3">
                    Discount percentage :
                    <span class="font-weight-bold ml-2">
                      {{ itemDetail.discount }}</span
                    >
                  </div>
                </v-col>

              </v-row>
            </v-card-text>
          </v-card>
        </td>
      </template>
    </v-data-table>

    <v-dialog max-width="590" v-model="image_dialog">
      <v-card >
        <v-card-title class="d-flex">
          <v-spacer/>
          <v-btn icon color="#544B99" large @click="image_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-img :src="currentImage" height="500" class="mb-4" contain/>
        </v-card-text>
      </v-card>
    </v-dialog>

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
        { text: "Accessory status", value: "accessoryStatus", sortable: false },
        { text: "Main color", value: "mainColorName", sortable: false },
        { text: "Articles", value: "articles", sortable: false },
        { text: "Order q-ty", value: "total", sortable: false, width:120 },
        { text: "Deadline of order", value: "orderDeadline", sortable: false },
        { text: "Price", value: "soldPrice", sortable: false },
        { text: "Total price", value: "totalPrice", sortable: false, width:120 },
        { text: "Model group", value: "modelGroup", sortable: false },
        { text: "Size group", value: "sizeName", sortable: false },
        { text: "Main fabric composition", value: "specification", sortable: false },
        { text: "Density gsm", value: "density", sortable: false },
        { text: "Fabric rework", value: "fabricRework", sortable: false },
        { text: "Artwork", value: "artwork", sortable: false },
        { text: "Finish plan status", value: "finishPlanStatus", sortable: false },
        { text: "Delay in delivery (days)", value: "delayDays", sortable: false },
        { text: "KPI category", value: "kpi", sortable: false },

        { text: "", value: "data-table-expand" },
      ],
      expanded: [],
      singleExpand: false,
      valid_search: "",
      filters: {
        modelNumber:null,
        orderNumber:null,
        clientName:null,

      },
      itemPrePage: 10,
      current_page: 0,

      current_list: [],
      image_dialog:false,
      currentImage:"",
      itemDetail:{},
    };
  },

  computed: {
    ...mapGetters({
      totalElements: "ppg/totalElements",
      ppgList: "ppg/ppgList",
      ppgInfo: "ppg/ppgInfo",
    }),
  },

  watch: {
    ppgInfo(val){
      this.itemDetail=JSON.parse(JSON.stringify(val))
    },
    ppgList(val) {
      this.current_list = val.map((item,index) => {
        return{
          ...item,
          id: index + 1,
          totalPrice: this.moneyFormatter(item.totalPrice),
          total: this.moneyFormatter(item.total, true),
        }
      })

      this.current_list.forEach((item,index)=>{
        item.id=index+1
      })
    },
  },

  created() {

  },

  methods: {
    ...mapActions({
      getPpgList:"ppg/getPpgList",
      getPpgInfo:"ppg/getPpgInfo",

    }),
    loadDetails({ item }) {
      this.getPpgInfo({color:item.mainColorName,id:item.modelId})
    },
    showImage(photo) {
      this.currentImage = photo;
      this.image_dialog = true;
    },
    async page(value) {
      this.current_page = value - 1;
      await this.getPpgList({
        page:this.current_page,
        size:this.itemPrePage,
      });
    },
    async size(value) {
      this.itemPrePage = value;
      await this.getPpgList({
        page:this.current_page,
        size:this.itemPrePage,
      });
    },


    filterData() {
      this.getPpgList({
        ...this.filters,
        page:this.current_page,
        size:this.itemPrePage,
      });
    },
    async resetFilters() {
      await this.getPpgList({
        page:this.current_page,
        size:this.itemPrePage,
      });
      await this.$refs.filter_form.reset();
    },
  },

  mounted() {

    this.getPpgList({page:0,size:10})
  },
};
</script>
<style lang="scss"></style>
