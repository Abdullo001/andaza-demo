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
          <v-card-title>{{ $t('planningProduction.planning.passingTab') }}</v-card-title>
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
          <span class="text-capitalize">{{ $t('history') }}</span>
        </v-tooltip>
        <v-tooltip
          top
          color="#544B99"
          class="pointer"
          v-if="title === 'packaging'"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
              @click="sendWaybill(item)"
            >
              <v-img src="/table-icon.svg" max-width="21" />
            </v-btn>
          </template>
          <span class="text-capitalize">{{ $t('planningProduction.planning.sendWaybill') }}</span>
        </v-tooltip>
        <v-tooltip top color="#544B99" class="pointer">
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
              @click="editItem(item)"
            >
              <v-img src="/right-icon.svg" max-width="21" />
            </v-btn>
          </template>
          <span class="text-capitalize">{{ $t('planningProduction.planning.nextP') }}</span>
        </v-tooltip>
      </template>

      <template #item.workshop="{item}">
        {{ item.workshop==='OWN_WORKSHOP'? $t('planningProduction.workShopType.own') : item.workshop}}
      </template>
    </v-data-table>

    <v-dialog v-model="waybillDialog" width="1200">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">{{ $t('planningProduction.planning.outputOfWaybill') }}</div>
          <v-btn icon color="#544B99" @click="waybillDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="edit_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('planningProduction.planning.waybillNumber') }}</div>
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
                    :placeholder="$t('planningProduction.planning.selectWaybillN')"
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
                <div class="label">{{ $t('planningProduction.planning.productsName') }}</div>
                <v-text-field
                  v-model="selectedItem.name"
                  class="rounded-lg base mb-4"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  :placeholder="$t('enterName')"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('totalQuantity') }}</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="selectedItem.totalQuantity"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    :placeholder="$t('enterQuantity')"
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
                <div class="label">{{ $t('servicePrice') }}</div>
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
                <div class="label">{{ $t('production.oneSort.boxQuantity') }}</div>
                <v-text-field
                  v-model="selectedItem.boxQuantity"
                  class="rounded-lg base mb-4"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  :placeholder="$t('enterQuantity')"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="4" class="d-flex align-center">
                <v-switch inset v-model="autoFilling" color="#4F46E5" />
                <div class="label mr-5">{{ $t('autoFilling') }}</div>
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
            @click="waybillDialog = false"
          >
            {{ $t('cancel') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="send"
          >
            {{ $t('save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="edit_dialog" width="1200">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">{{ $t('planningProduction.planning.sendToNextP') }}</div>
          <v-btn icon color="#544B99" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="edit_validate" lazy-validation>
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
            <v-row v-if="title !== 'packaging'">
              <v-col cols="8">
                <v-radio-group
                  row
                  v-model.trim="selectedItem.workshopType"
                  class="mb-4"
                >
                  <v-radio
                    :aria-disabled="selectedItem.status === 'edit_history'"
                    color="#544B99"
                    :label="$t('planningProduction.workShopType.own')"
                    value="OWN_WORKSHOP"
                  ></v-radio>
                  <v-radio
                    color="#544B99"
                    :label="$t('planningProduction.workShopType.subcontractor')"
                    value="SUBCONTRACTOR"
                  ></v-radio>
                  <v-radio
                    v-if="passSupplyWarehouse"
                    color="#544B99"
                    :label="$t('sidebar.supplyWarehouse')"
                    value="SUPPLY_WAREHOUSE"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="4" class="d-flex align-center">
                <v-switch inset v-model="autoFilling" color="#4F46E5" />
                <div class="label mr-5">{{ $t('autoFilling') }}</div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('planningProduction.planning.nextP') }}</div>
                <v-select
                  :items="nextProcessList"
                  item-text="process"
                  item-value="process"
                  v-model.trim="selectedItem.process"
                  :disabled="selectedItem.status === 'edit_history'"
                  append-icon="mdi-chevron-down"
                  outlined
                  hide-details
                  dense
                  height="44"
                  class="rounded-lg base"
                  color="#544B99"
                  :placeholder="$t('planningProduction.planning.selectNextProcess')"
                />
              </v-col>
              <v-col
                cols="12"
                lg="6"
                v-if="selectedItem.workshopType === 'SUBCONTRACTOR'"
              >
                <div class="label">{{ $t('prefinances.child.partner') }}</div>
                <v-combobox
                  v-model="selectedItem.partnerId"
                  :items="partnerList"
                  :search-input.sync="partnerName"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :return-object="true"
                  color="#544B99"
                  dense
                  :placeholder="$t('modelBox.dialog.enterPartnerName')"
                  append-icon="mdi-chevron-down"
                  :rules="[formRules.required]"
                  validate-on-blur
                >
                  <template #append>
                    <v-icon color="#544B99">mdi-magnify</v-icon>
                  </template>
                </v-combobox>
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
            @click="closeDialog"
          >
          {{ $t(`cancel`) }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="save"
          >
          {{ $t(`save`) }}
          </v-btn>
        </v-card-actions>

        <div class="px-4 pb-4">
          <v-data-table
            :headers="[
              ...historyHeaders,
              {
                text: $t('planningProduction.planning.actions'),
                sortable: false,
                align: 'center',
                value: 'actions',
                width: '120',
              },
            ]"
            hide-default-footer
            :items="historyList"
            class="mt-4 rounded-lg"
            style="border: 1px solid #e9eaeb"
          >
            <template #top>
              <div class="title ma-4">{{ $t(`history`) }}</div>
            </template>
            <template #item.toProcess="{ item }">
              <div class="text-capitalize">{{ $t(`planningProduction.process.${item.toProcess.toLowerCase()}`) }}</div>
            </template>
            <template #item.actions="{ item }">
              <v-btn icon color="green" @click.stop="editHistoryItem(item)">
                <v-img src="/edit-active.svg" max-width="22" />
              </v-btn>
              <v-btn icon color="red" @click.stop="deleteHistoryItem(item)">
                <v-img src="/delete.svg" max-width="27" />
              </v-btn>
            </template>
          </v-data-table>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="history_dialog" max-width="1200">
      <v-card flat>
        <v-card-title>
          <div class="title">{{ $t(`history`) }}</div>
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
          <template #item.toProcess="{ item }">
            <div class="text-capitalize">{{ $t(`planningProduction.process.${item.toProcess.toLowerCase()}`) }}</div>
          </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
    <WarningDialog v-bind="warningDate" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import WarningDialog from "./WarningDialog.vue";

export default {
  name: "QualityControl",
  components: {
    WarningDialog,
  },
  props: {
    passSupplyWarehouse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      waybillDialog: false,
      partnerName: "",
      autoFilling: false,
      edit_dialog: false,
      history_dialog: false,
      selectedItem: {},
      edit_validate: true,
      title: "",
      process_list: [
        "CUTTING",
        "PRINTING",
        "SEWING",
        "IRONING",
        "QUALITY_CONTROL",
        "PACKAGING",
      ],
      headers: [
        { text: this.$t('planningProduction.planning.color'), align: "start", sortable: false, value: "color" },
        { text: this.$t('total'), align: "start", sortable: false, value: "total" },
        {
          text: this.$t('planningProduction.planning.workshop'),
          align: "start",
          sortable: false,
          value: "workshop",
        },
        { text: this.$t('planningProduction.planning.actions'), align: "end", sortable: false, value: "actions" },
      ],
      checkedList: [],
      historyHeaders: [
        {
          text: this.$t('historyTable.toProcess'),
          sortable: false,
          align: "start",
          value: "toProcess",
        },
        { text: this.$t('historyTable.date'), sortable: false, align: "start", value: "createdBy" },
        {
          text: this.$t('historyTable.doneBy'),
          sortable: false,
          align: "center",
          value: "createdDate",
        },
      ],
      historyList: [],
      selectedEntity: null,
      currency_enums: ["USD", "UZS", "RUB"],
      waybilSearch: "",
      warningState: false,
      warningText: "",
    };
  },

  computed: {
    ...mapGetters({
      planningProcessId: "cuttingProcess/planningProcessId",
      passingList: "passingToNextProcess/passingList",
      productionId: "production/planning/productionId",
      partnerList: "partners/partnerList",
      historyListServer: "passingToNextProcess/historyProcessableList",
      nextProcessList: "passingToNextProcess/nextProcessList",
      measurementUnitList: "measurement/measurementUnit",
      waybillList: "waybill/waybillList",
    }),
    warningDate: {
      get() {
        return {
          dialogState: this.warningState,
          voidFunction: this.giveNextProcess,
          dialogCloser: () => {
            this.warningState = false;
          },
          dialogText: this.warningText,
        };
      },
    },
  },

  watch: {
    waybilSearch(val) {
      this.getWaybillList({ page: 0, size: 10, number: val });
    },
    partnerName(val) {
      this.getPartnerList({ page: 0, size: 10, partnerName: val });
    },
    autoFilling(val) {
      if (val) {
        this.selectedItem.sizeDistributions.forEach((item, idx) => {
          item.quantity = this.selectedItem.sizeDistributionList[idx].quantity;
        });
      } else {
        this.selectedItem.sizeDistributions.forEach((item, idx) => {
          item.quantity = 0;
        });
      }
    },
    passingList(list) {
      this.headers = [
        { text: this.$t('planningProduction.planning.color'), align: "start", sortable: false, value: "color" },
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
        { text: this.$t('total'), align: "start", sortable: false, value: "total" },
        {
          text: this.$t('planningProduction.planning.workshop'),
          align: "start",
          sortable: false,
          value: "workshop",
        },
        { text: this.$t('planningProduction.planning.actions'), align: "end", sortable: false, value: "actions" }
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
          text: this.$t('historyTable.toProcess'),
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
        { text: this.$t('historyTable.date'), sortable: false, align: "start", value: "createdDate" },
        {
          text: this.$t('historyTable.doneBy'),
          sortable: false,
          align: "center",
          value: "createdBy",
        }
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
  },

  created() {
    this.getPartnerList({ page: 0, size: 10 });
    this.getMeasurementUnit();
    this.getWaybillList({ page: 0, size: 10 });
  },

  methods: {
    ...mapActions({
      getPassingList: "passingToNextProcess/getPassingList",
      setUpdatePass: "passingToNextProcess/setUpdatePass",
      getPartnerList: "partners/getPartnerList",
      getHistoryList: "passingToNextProcess/getHistoryProcessableList",
      deleteHistoryProcessable: "passingToNextProcess/deleteHistoryProcessable",
      setHistoryProcessable: "passingToNextProcess/setHistoryProcessable",
      getNextProcessList: "passingToNextProcess/getNextProcessList",
      setReadyGarmentWarehouse: "passingToNextProcess/setReadyGarmentWarehouse",
      getMeasurementUnit: "measurement/getMeasurementUnit",
      getWaybillList: "waybill/getWaybillList",
      productionToWaybill: "generalWarehouse/productionToWaybill",
    }),
    getHistory(item) {
      this.getHistoryList(item.entityId);
      this.history_dialog = true;
    },
    editItem(item) {
      this.edit_dialog = true;
      this.autoFilling = false;
      this.selectedItem = { ...item };
      this.selectedItem.status = "editProcess";
      this.getHistoryList(item.entityId);
      this.selectedEntity = item.entityId;
    },

    sendWaybill(item) {
      this.waybillDialog = true;
      this.autoFilling = false;
      this.selectedItem = { ...item };
      this.selectedEntity = item.entityId;
    },
    send() {
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
        type: "FIRST_CLASS",
        waybillId: this.selectedItem.waybillId?.id,
      };
      this.productionToWaybill({ data, id: this.selectedItem.entityId });

      this.waybillDialog = false;
    },
    deleteItem() {},

    async giveNextProcess() {
      let data = {};
      if (this.title === "printing") {
        data = {
          fromProcess: "PRINTING",
          entityId: this.selectedItem.entityId,
          process: this.selectedItem.process,
          sizeDistributionList: this.selectedItem.sizeDistributions.map((item)=>({
            size:item.size,
            quantity: item.quantity?item.quantity:0
          })),
          productionId: this.productionId,
          workshopType: this.selectedItem.workshopType,
          planningProcessId: this.planningProcessId,
        };
      } else {
        data = {
          entityId: this.selectedItem.entityId,
          process: this.selectedItem.process,
          sizeDistributionList: this.selectedItem.sizeDistributions.map((item)=>({
            size:item.size,
            quantity: item.quantity?item.quantity:0
          })),
          productionId: this.productionId,
          workshopType: this.selectedItem.workshopType,
          planningProcessId: this.planningProcessId,
        };
      }

      if (this.selectedItem.partnerId) {
        data = { ...data, partnerId: this.selectedItem.partnerId?.id };
      }
      this.setUpdatePass(data);

      this.edit_dialog = false;
      this.warningState=false
    },

    save() {
      if (this.selectedItem.status === "editProcess") {
        if (this.title === "packaging") {
          let data = {
            entityId: this.selectedItem.entityId,
            operationType: "FIRST_CLASS",
            productionId: this.productionId,
            sizeDistributionList: this.selectedItem.sizeDistributions.map((item)=>({
            size:item.size,
            quantity: item.quantity?item.quantity:0
          })),
          };
          this.setReadyGarmentWarehouse(data);
          this.edit_dialog = false;
        } else {
          if(this.nextProcessList[0]?.process===this.selectedItem.process){
            this.giveNextProcess()

          }else{
            this.warningText=`Are you really willing to switch from <strong>${this.title.toUpperCase()}</strong> to <strong>${this.selectedItem.process}</strong>?`
            this.warningState=true
          }
        }
      }
      if (this.selectedItem.status === "edit_history") {
        let data = {
          id: this.selectedItem.id,
          sizeDistributionList: [...this.selectedItem.sizeDistributions],
        };

        this.setHistoryProcessable({ processId: this.planningProcessId, data });
        this.edit_dialog = false;
      }

    },
    editHistoryItem(item) {
      this.selectedItem = { ...item };
      this.selectedItem.status = "edit_history";
    },
    closeDialog() {
      this.edit_dialog = false;
      this.autoFilling = false;
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
    this.title = this.$route.path.split("/")[2]==='planning-production'?this.$route.path.split("/")[3]:this.$route.path.split("/")[2];
    this.getPassingList(this.planningProcessId);
    this.getNextProcessList(this.planningProcessId);
  },
};
</script>

<style lang="scss" scoped></style>
