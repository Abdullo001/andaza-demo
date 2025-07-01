<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="checkedList"
      hide-default-footer
      class="mb-4"
    >
      <template #top>
        <v-card flat>
          <v-card-title>Checked products' quantities (2 sort)</v-card-title>
        </v-card>
      </template>
      <template #item.actions="{ item }">
        <v-tooltip
          top
          color="#544B99"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
              @click="getHistory(item)"
            >
              <v-img src="/history.svg" max-width="22" />
            </v-btn>
          </template>
          <span class="text-capitalize">History</span>
        </v-tooltip>
        <v-tooltip
          top
          color="#544B99"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
              @click="editItem(item)"
            >
              <v-img src="/table-icon.svg" max-width="21" />
            </v-btn>
          </template>
          <span class="text-capitalize">Send to Waybill</span>
        </v-tooltip>
        <v-tooltip
          top
          color="#544B99"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
              @click="nextProcessItem(item)"
            >
              <v-img src="/warehouse.svg" max-width="21"/>
            </v-btn>
          </template>
          <span class="text-capitalize">Send to warehouse</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <v-dialog v-model="edit_dialog" width="1200">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Output to waybill</div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="edit_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">Waybill number</div>
                <div class="search-field">
                  <v-combobox
                    v-model="selectedItem.waybillId"
                    :items="waybillList"
                    item-text="number"
                    item-value="id"
                    :return-object="true"
                    :search-input.sync="waybilSearch"
                    class="rounded-lg base d-flex align-center justify-center"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    placeholder="Select waybill No."
                    prepend-icon=""
                    style="margin-bottom: 22px"
                  >
                    <template #append>
                      <v-icon class="d-inline-block" color="#544B99">
                        mdi-magnify
                      </v-icon>
                    </template>
                  </v-combobox>
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Good and products name</div>
                <v-text-field
                  v-model="selectedItem.name"
                  class="rounded-lg base mb-4"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  placeholder="Enter name"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Total quantity</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="selectedItem.totalQuantity"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    placeholder="Enter quantity"
                    validate-on-blur
                  />
                  <v-select
                    v-model="selectedItem.measurementUnitId"
                    append-icon="mdi-chevron-down"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    color="#544B99"
                    :items="measurementUnitList"
                    item-text="name"
                    item-value="id"
                    dense
                    height="44"
                    hide-details
                    outlined
                    style="max-width: 100px"
                    validate-on-blur
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Service price</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="selectedItem.price"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    placeholder="0.00"
                    validate-on-blur
                  />
                  <v-select
                    v-model="selectedItem.currency"
                    :items="currency_enums"
                    append-icon="mdi-chevron-down"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    style="max-width: 100px"
                    validate-on-blur
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t("shipping.boxQuantity") }}</div>
                <v-text-field
                  v-model="selectedItem.boxQuantity"
                  class="rounded-lg base mb-4"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  placeholder="Enter quantity"
                  validate-on-blur
                />
              </v-col>

              <v-col cols="4" class="d-flex align-center">
                <v-switch inset v-model="autoFilling" color="#4F46E5" />
                <div class="label mr-5 ">Aut.Filling</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                lg="3"
                v-for="(item, idx) in selectedItem.sizeDistributions"
                :key="`_cutting_${idx}`"
              >
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
                  placeholder="0"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  validate-on-blur
                  dense
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#544B99"
            width="130"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="save"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="nextProcessDialog" width="1200">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Send to garment warehouse</div>
          <v-btn icon color="#544B99" @click="nextProcessDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="edit_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="3" v-for="(item, idx) in selectedItem.sizeDistributions" :key="`_cutting_${idx}`">
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
                  placeholder="0"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base "
                  validate-on-blur
                  dense
                  color="#544B99"
                />
              </v-col>
            </v-row>

          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="130"
            @click="nextProcessDialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="130"
            @click="saveNextProcess"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="history_dialog" max-width="1200">
      <v-card flat>
        <v-card-title>
          <div class="title">History</div>
          <v-spacer />
          <v-btn icon @click="history_dialog = false" color="#544B99">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="historyHeaders"
            hide-default-footer
            :items="historyList"
            class="mt-4 rounded-lg"
            style="border: 1px solid #e9eaeb"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "QualityControl",
  data() {
    return {
      autoFilling:false,
      waybilSearch: "",
      edit_dialog: false,
      nextProcessDialog: false,
      selectedItem: {},
      edit_validate: true,
      currency_enums: ["USD", "UZS", "RUB"],
      process_list: [
        "CUTTING",
        "PRINTING",
        "SEWING",
        "IRONING",
        "QUALITY_CONTROL",
        "PACKAGING",
      ],
      headers: [
        { text: "Color", align: "start", sortable: false, value: "color" },

        { text: "Total", align: "start", sortable: false, value: "total" },
        {
          text: "Workshop",
          align: "start",
          sortable: false,
          value: "workshop",
        },
        { text: "Actions", align: "end", sortable: false, value: "actions" },
      ],
      historyHeaders:[],
      checkedList: [],
      historyList: [],
      history_dialog: false,
    };
  },

  computed: {
    ...mapGetters({
      planningProcessId: "commonProcess/planningProcessId",
      passingList: "nextProcessSecondClass/secondList",
      productionId: "production/planning/productionId",
      partnerList: "subcontracts/partnerList",
      historyListServer: "passingToNextProcess/historyProcessableList",
      measurementUnitList: "measurement/measurementUnit",
      waybillList: "waybill/waybillList",
    }),
  },

  watch: {
    autoFilling(val){
      if(val){
        this.selectedItem.sizeDistributions.forEach((item,idx)=>{
          item.quantity=this.selectedItem.sizeDistributionList[idx].quantity
        })
      }else{
        this.selectedItem.sizeDistributions.forEach((item,idx)=>{
          item.quantity=0
        })
      }

    },
    passingList(list) {
      this.headers = [
        { text: "Color", align: "start", sortable: false, value: "color" },
      ];

      list[0]?.sizeDistributionList.forEach((item) => {
        this.headers.push({
          text: item.size,
          sortable: false,
          align: "start",
          value: item.size,
        });
      });

      this.headers.push(
        { text: "Total", align: "start", sortable: false, value: "total" },
        {
          text: "Workshop",
          align: "start",
          sortable: false,
          value: "workshop",
        },
        { text: "Actions", align: "end", sortable: false, value: "actions" }
      );

      const specialList = list.map(function (el) {
        const value = {};
        const sizesList = [];
        el?.sizeDistributionList.forEach((item) => {
          value[item.size] = item.quantity;
          sizesList.push({ size: item.size, quantity: null });
        });

        return {
          ...value,
          ...el,
          sizeDistributions: [...sizesList],
        };
      });

      this.checkedList = JSON.parse(JSON.stringify(specialList));
    },
    historyListServer(list) {
      this.historyHeaders = [
        {
          text: "To process",
          sortable: false,
          align: "start",
          value: "toProcess",
        },
      ];

      list[0]?.sizeDistributionList.forEach((item) => {
        this.historyHeaders.push({
          text: item.size,
          sortable: false,
          align: "start",
          value: item.size,
        });
      });

      this.historyHeaders.push(
        { text: "Date", sortable: false, align: "start", value: "date" },
        { text: "Done By", sortable: false, align: "center", value: "doneBy" }
      );

      const specialList = list.map(function (el) {
        const value = {};
        const sizesList = [];
        el?.sizeDistributionList.forEach((item) => {
          value[item.size] = item.quantity;
          sizesList.push({ size: item.size, quantity: item.quantity });
        });

        return {
          ...value,
          ...el,
          sizeDistributions: [...sizesList],
        };
      });

      this.historyList = JSON.parse(JSON.stringify(specialList));
    },
    waybilSearch(val) {
      const item = val ?? "";
      this.getWaybillList({
        page: 0,
        size: 10,
        number: item,
        type: "INTERNAL",
      });
    },
  },

  created() {
    this.getPartnerList();
    this.getMeasurementUnit();
    this.getWaybillList({ page: 0, size: 10, type: "INTERNAL" });
  },

  methods: {
    ...mapActions({
      getPassingList: "nextProcessSecondClass/getSecondList",
      giveReadyWarehouse: "nextProcessSecondClass/giveReadyWarehouse",
      getPartnerList: "subcontracts/getPartnerList",
      getHistoryList: "passingToNextProcess/getHistoryProcessableList",
      getMeasurementUnit: "measurement/getMeasurementUnit",
      getWaybillList: "waybill/getWaybillList",
      productionToWaybill: "generalWarehouse/productionToWaybill",
    }),
    nextProcessItem(item){
      this.nextProcessDialog = true
      this.selectedItem = {...item}
    },
    saveNextProcess() {
      let data = {
        entityId: this.selectedItem.entityId,
        operationType:"SECOND_CLASS",
        productionId: this.productionId,
        sizeDistributionList: this.selectedItem.sizeDistributions.map((item)=>({
          size:item.size,
          quantity: item.quantity?item.quantity:0
        })),
      }

      this.giveReadyWarehouse({data,id:this.planningProcessId})
      this.nextProcessDialog = false
    },
    getHistory(item) {
      this.getHistoryList(item.entityId);
      this.history_dialog = true;
    },
    editItem(item) {
      this.edit_dialog = true;
      this.autoFilling = false

      this.selectedItem = { ...item };
    },
    deleteItem() {},

    save() {
      let data = {
        boxQuantity: this.selectedItem.boxQuantity,
        currency: this.selectedItem.currency,
        measurementUnitId: this.selectedItem.measurementUnitId,
        name: this.selectedItem.name,
        partnerId: this.selectedItem.waybillId?.partnerId,
        price: this.selectedItem.price,
        productionId: this.productionId,
        sizeDistributions: [...this.selectedItem.sizeDistributions],
        totalQuantity: this.selectedItem.totalQuantity,
        type: "SECOND_CLASS",
        waybillId: this.selectedItem.waybillId?.id,
      };

      this.productionToWaybill({data,id:this.selectedItem.entityId});
      this.autoFilling = false
      this.edit_dialog = false;
    },
    editHistoryItem(item) {
      this.selectedItem = { ...item };
      this.selectedItem.status = "edit_history";
    },

    deleteHistoryItem(item) {
      this.deleteHistoryProcessable({
        id: item.id,
        entityId: this.selectedEntity,
        processId: this.planningProcessId,
      });
    },
  },

  mounted() {
    this.getPassingList(this.planningProcessId);
  },
};
</script>

<style lang="scss" scoped></style>
