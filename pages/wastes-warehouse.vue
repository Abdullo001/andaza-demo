<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :placeholder="$t('wastes.wastesWarehouse.modelNo')"
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
              :placeholder="$t('wastes.wastesWarehouse.wastesName')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.name"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2">
            <div style="height: 40px !important">
              <el-date-picker
                v-model="filters.fromDate"
                type="datetime"
                style="width: 100%; height: 100%"
                class="filter_picker"
                :placeholder="$t('wastes.wastesWarehouse.from')"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </div>
          </v-col>
          <v-col cols="12" lg="2">
            <div style="height: 40px !important">
              <el-date-picker
                v-model="filters.toDate"
                type="datetime"
                style="width: 100%; height: 100%"
                :placeholder="$t('wastes.wastesWarehouse.to')"
                class="filter_picker"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </div>
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
                {{ $t("wastes.wastesWarehouse.reset") }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t("wastes.wastesWarehouse.search") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>

    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="wastesList"
      :items-per-page="itemPerPage"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      :server-items-length="totalElements"
      @update:page="page"
      @update:items-per-page="size"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>{{ $t("wastes.wastesWarehouse.title") }}</div>
            <div>
              <v-btn
                color="#544B99"
                dark
                class="text-capitalize rounded-lg"
                @click="addWastes"
              >
                <v-icon>mdi-plus</v-icon>
                {{ $t("wastes.wastesWarehouse.addWastes") }}
              </v-btn>
            </div>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.beginPeriodQuantity="{ item }">
        <div style="color: #f2c62c">
          {{ moneyFormatter(item.beginPeriodQuantity) }}
        </div>
      </template>
      <template #item.beginPeriodTotalPrice="{ item }">
        <div style="color: #f2c62c">
          {{ moneyFormatter(item.beginPeriodTotalPrice) }}
        </div>
      </template>
      <template #item.totalInputQuantity="{ item }">
        <div style="color: #ff0000">
          {{ moneyFormatter(item.totalInputQuantity) }}
        </div>
      </template>
      <template #item.totalInputTotalPrice="{ item }">
        <div style="color: #ff0000">
          {{ moneyFormatter(item.totalInputTotalPrice) }}
        </div>
      </template>
      <template #item.totalOutputQuantity="{ item }">
        <div style="color: #08b137">
          {{ moneyFormatter(item.totalOutputQuantity) }}
        </div>
      </template>
      <template #item.totalOutputTotalPrice="{ item }">
        <div style="color: #08b137">
          {{ moneyFormatter(item.totalOutputTotalPrice) }}
        </div>
      </template>
      <template #item.remainingQuantity="{ item }">
        <div style="color: #f2c62c">
          {{ moneyFormatter(item.remainingQuantity) }}
        </div>
      </template>
      <template #item.remainingTotalPrice="{ item }">
        <div style="color: #f2c62c">
          {{ moneyFormatter(item.remainingTotalPrice) }}
        </div>
      </template>

      <template #item.actions="{ item }">
        <div class="d-flex">
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
                @click="spendFunc(item)"
              >
                <v-img src="/spend-icon.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">Sell</span>
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
                @click="getHistory(item)"
              >
                <v-img src="/history.svg" max-width="20" />
              </v-btn>
            </template>
            <span class="text-capitalize">History</span>
          </v-tooltip>
          <v-tooltip
            top
            color="green"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="green"
                @click="editItem(item)"
              >
                <v-img src="/edit-active.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">Edit</span>
          </v-tooltip>
          <v-tooltip
            top
            color="red"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="red"
                @click="getDeleteItem(item)"
              >
                <v-img src="/delete.svg" max-width="27" />
              </v-btn>
            </template>
            <span class="text-capitalize">Delete</span>
          </v-tooltip>
        </div>
      </template>

      <template v-slot:body.append>
        <tr>
          <td></td>
          <td></td>
          <td class="text-capitalize text-body-1 font-weight-bold">total:</td>
          <td colspan="4"></td>
          <td class="font-weight-bold text-body-1" style="color: #f2c62c">
            {{ moneyFormatter(totalBeginQuantity) }}
          </td>
          <td class="font-weight-bold text-body-1" style="color: #f2c62c">
            {{ moneyFormatter(totalBeginPrice) }}
          </td>
          <td class="font-weight-bold text-body-1" style="color: #ff0000">
            {{ moneyFormatter(totalInputQuantity) }}
          </td>
          <td class="font-weight-bold text-body-1" style="color: #ff0000">
            {{ moneyFormatter(totalInputPrice) }}
          </td>
          <td class="font-weight-bold text-body-1" style="color: #08b137">
            {{ totalOutputQuantity }}
          </td>
          <td class="font-weight-bold text-body-1" style="color: #08b137">
            {{ moneyFormatter(totalOutputPrice) }}
          </td>
          <td class="font-weight-bold text-body-1" style="color: #f2c62c">
            {{ moneyFormatter(totalRemainingQuantity) }}
          </td>
          <td class="font-weight-bold text-body-1" style="color: #f2c62c">
            {{ moneyFormatter(totalRemainingPrice) }}
          </td>
          <td></td>
        </tr>
      </template>
    </v-data-table>
    <div class="d-flex mt-6">
      <v-spacer />
      <v-btn
        :loading="isLoadSell"
        color="#544B99"
        outlined
        elevation="0"
        class="text-capitalize rounded-lg font-weight-bold mr-4"
        @click="
          () => {
            generateSellPdf();
            isLoadSell = true;
          }
        "
      >
        Sold wastes file
      </v-btn>
      <v-btn
        :loading="isLoad"
        color="#544B99"
        outlined
        elevation="0"
        class="text-capitalize rounded-lg font-weight-bold"
        @click="
          () => {
            generatePdf();
            isLoad = true;
          }
        "
      >
        Remaining wastes file
      </v-btn>
    </div>
    <v-dialog v-model="dialog" width="800">
      <v-card elevation="0">
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("wastes.wastesWarehouse.addWastes") }}
          </div>
          <v-btn icon color="#544B99" @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">
                  {{ $t("wastes.wastesWarehouse.nameOfWastes") }}
                </div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="currentItem.name"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  :placeholder="$t('wastes.wastesWarehouse.nameOfWastes')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6" v-if="currentItem.title !== 'edit'">
                <div class="label">
                  {{ $t("wastes.wastesWarehouse.modelNo") }}
                </div>
                <v-combobox
                  v-model="currentItem.modelNumber"
                  :items="modelsList"
                  :search-input.sync="searchModelNumber"
                  item-text="modelNumber"
                  item-value="modelNumber"
                  validate-on-blur
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base d-flex align-center justify-center mr-2"
                  :return-object="true"
                  dense
                  :placeholder="$t('wastes.wastesWarehouse.modelNo')"
                  prepend-icon=""
                >
                  <template #append>
                    <v-icon class="d-inline-block" color="#544B99">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" lg="6">
                <div>
                  <div class="label">
                    {{ $t("wastes.addWastes.wastesQuantity") }}
                  </div>
                  <div class="d-flex align-center">
                    <v-text-field
                      v-model="currentItem.quantity"
                      :placeholder="$t('wastes.addWastes.wastesQuantity')"
                      outlined
                      hide-details
                      height="44"
                      class="rounded-lg base rounded-l-lg rounded-r-0"
                      validate-on-blur
                      dense
                      color="#544B99"
                    />
                    <v-select
                      v-model="currentItem.measurementUnitId"
                      :items="measurementUnit"
                      style="max-width: 120px"
                      item-text="name"
                      item-value="id"
                      dense
                      outlined
                      hide-details
                      height="44"
                      class="rounded-lg base rounded-r-lg rounded-l-0"
                      validate-on-blur
                      placeholder=""
                      append-icon="mdi-chevron-down"
                      color="#544B99"
                    />
                  </div>
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">
                  {{ $t("wastes.addWastes.sellingPrice") }}
                </div>
                <div class="d-flex align-center">
                  <v-text-field
                    :rules="[formRules.required]"
                    v-model="currentItem.price"
                    outlined
                    hide-details
                    height="44"
                    dense
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    :placeholder="$t('wastes.addWastes.sellingPrice')"
                    color="#544B99"
                  />
                  <v-select
                    v-model="currentItem.currency"
                    :items="currency_list"
                    style="max-width: 120px"
                    dense
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    validate-on-blur
                    placeholder=""
                    append-icon="mdi-chevron-down"
                    color="#544B99"
                  />
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="text-capitalize rounded-lg font-weight-bold mr-6"
            color="#544B99"
            width="163"
            @click="dialog = false"
            >{{ $t("wastes.addWastes.cancel") }}
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="saveWaste"
          >
            {{ $t("wastes.addWastes.create") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="sellingDialog" width="800">
      <v-card elevation="0">
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Selling wastes</div>
          <v-btn icon color="#544B99" @click="sellingDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">Quantity</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="sellingWastes.quantity"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter quantity"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Customer</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="sellingWastes.customer"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter customers name"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="12">
                <div class="label">Description</div>
                <v-text-field
                  v-model="sellingWastes.description"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter description"
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
          <div class="d-flex justify-center pb-4 pt-8">
            <v-btn
              outlined
              class="text-capitalize rounded-lg font-weight-bold mr-6"
              color="#544B99"
              width="163"
              @click="sellingDialog = false"
              >cancel
            </v-btn>
            <v-btn
              class="text-capitalize rounded-lg font-weight-bold"
              color="#544B99"
              dark
              width="163"
              @click="sellItem"
            >
              Save
            </v-btn>
          </div>
          <v-divider />

          <v-data-table
            class="rounded-lg"
            :headers="sellingHistoryHeader"
            :items="sellingHistoryItems"
            hide-default-footer
          >
            <template #top>
              <v-toolbar elevation="0">
                <v-toolbar-title
                  class="d-flex w-full align-center justify-space-between"
                >
                  <div>History</div>
                </v-toolbar-title>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="historyDialog" width="600">
      <v-card elevation="0">
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">In/Output history</div>
          <v-btn icon color="#544B99" @click="historyDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            class="rounded-lg"
            :headers="historyDialogHeaders"
            :items="historyItems"
            hide-default-footer
          >
            <template #item.operationType="{ item }">
              <div
                style="color: #ff0000"
                :style="{
                  color: item.operationColor,
                }"
              >
                {{ item.operationType }}
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>

    <DeleteDialog v-bind="deleteData" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DeleteDialog from "../components/DeleteDialog.vue";
export default {
  components: {
    DeleteDialog,
  },
  data() {
    return {
      sellingDialog: false,
      new_validate: true,
      dialog: false,
      searchModelNumber: "",
      title: "Add",
      totalBeginQuantity: 0,
      totalBeginPrice: 0,
      totalInputQuantity: 0,
      totalInputPrice: 0,
      totalOutputQuantity: 0,
      totalOutputPrice: 0,
      totalRemainingQuantity: 0,
      totalRemainingPrice: 0,
      valid_search: true,
      filters: {},
      currentItem: {},
      current_list: [],
      headers: [
        {
          text: this.$t("wastes.wastesWarehouse.no"),
          value: "id",
          sortable: false,
        },
        {
          text: this.$t("wastes.wastesWarehouse.nameOfWastes"),
          value: "name",
          sortable: false,
        },
        {
          text: this.$t("wastes.wastesWarehouse.batchNumber"),
          value: "batchNumber",
          sortable: false,
        },
        {
          text: this.$t("wastes.wastesWarehouse.modelNo"),
          value: "modelNumber",
          sortable: false,
        },
        {
          text: this.$t("wastes.wastesWarehouse.mu"),
          value: "measurementUnit",
          sortable: false,
        },
        {
          text: this.$t("wastes.wastesWarehouse.price"),
          value: "price",
          sortable: false,
        },
        {
          text: this.$t("wastes.wastesWarehouse.currency"),
          value: "currency",
          sortable: false,
        },
        {
          text: this.$t("wastes.wastesWarehouse.beginOfPeriodQty"),
          value: "beginPeriodQuantity",
          sortable: false,
          width: 150,
        },
        {
          text: this.$t("wastes.wastesWarehouse.beginOfPeriodPrice"),
          value: "beginPeriodTotalPrice",
          sortable: false,
          width: 150,
        },
        {
          text: this.$t("wastes.wastesWarehouse.totalInputQty"),
          value: "totalInputQuantity",
          sortable: false,
          width: 150,
        },
        {
          text: this.$t("wastes.wastesWarehouse.totalInputPrice"),
          value: "totalInputTotalPrice",
          sortable: false,
          width: 150,
        },
        {
          text: this.$t("wastes.wastesWarehouse.totalOutputQty"),
          value: "totalOutputQuantity",
          sortable: false,
          width: 150,
        },
        {
          text: this.$t("wastes.wastesWarehouse.totalOutputPrice"),
          value: "totalOutputTotalPrice",
          sortable: false,
          width: 150,
        },
        {
          text: this.$t("wastes.wastesWarehouse.remainingQty"),
          value: "remainingQuantity",
          sortable: false,
          width: 150,
        },
        {
          text: this.$t("wastes.wastesWarehouse.remainingTotalPrice"),
          value: "remainingTotalPrice",
          sortable: false,
          width: 150,
        },
        {
          text: this.$t("wastes.wastesWarehouse.actions"),
          value: "actions",
          sortable: false,
          width: 150,
          align: "center",
        },
      ],
      sellingHistoryHeader: [
        { text: "Date", value: "date", sortable: false },
        { text: "Quantity", value: "quantity", sortable: false },
        { text: "Total price", value: "totalPrice", sortable: false },
        { text: "Customer", value: "customer", sortable: false },
        { text: "Description", value: "description", sortable: false },
      ],
      sellingHistoryItems: [],
      currency_list: ["USD", "UZS", "RUB"],
      sellingWastes: {},
      historyDialog: false,
      historyItems: [],
      historyDialogHeaders: [
        { text: "Date", value: "createdAt", sortable: false },
        { text: "Moving", value: "operationType", sortable: false },
        { text: "Quantity", value: "quantity", sortable: false },
        { text: "Total price", value: "totalPrice", sortable: false },
      ],
      selectItem: {},
      deleteDialog: false,
      itemPerPage: 10,
      current_page: 0,
      isLoad: false,
      isLoadSell: false,
    };
  },

  created() {
    this.getMeasurementUnit();
    this.getModelsList({
      page: 0,
      size: 10,
      modelNumber: "",
      partner: "",
    });
  },

  computed: {
    ...mapGetters({
      measurementUnit: "measurement/measurementUnit",
      modelsList: "models/modelsList",
      wastesList: "wastesWarehouse/wastesList",
      historyList: "wastesWarehouse/historyList",
      totalElements: "wastesWarehouse/totalElements",
      pdfList: "wastesWarehouse/pdfData",
    }),

    deleteData: {
      get() {
        return {
          deleteDialog: this.deleteDialog,
          deleteFunction: () => {},
          closeDialog: () => {
            this.deleteDialog = false;
          },
        };
      },
    },
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
      this.isLoad = false;
      this.isLoadSell = false;
    },
    dialog(val) {
      if (!val) {
        this.$refs.new_form.reset();
        this.currentItem.modelNumber = "";
      }
    },
    wastesList(list) {
      this.totalBeginQuantity = 0;
      this.totalBeginPrice = 0;
      this.totalInputQuantity = 0;
      this.totalInputPrice = 0;
      this.totalOutputQuantity = 0;
      this.totalOutputPrice = 0;
      this.totalRemainingQuantity = 0;
      this.totalRemainingPrice = 0;
      list.forEach((item) => {
        this.totalBeginQuantity += item.beginPeriodQuantity;
        this.totalBeginPrice += item.beginPeriodTotalPrice;
        this.totalInputQuantity += item.totalInputQuantity;
        this.totalInputPrice += item.totalInputTotalPrice;
        this.totalOutputQuantity += item.totalOutputQuantity;
        this.totalOutputPrice += item.totalOutputTotalPrice;
        this.totalRemainingQuantity += item.remainingQuantity;
        this.totalRemainingPrice += item.remainingTotalPrice;
      });
    },
    searchModelNumber(val) {
      this.getModelsList({
        page: 0,
        size: 10,
        modelNumber: val,
        partner: "",
      });
    },

    historyList(list) {
      this.historyItems = JSON.parse(JSON.stringify(list));
      this.historyItems.forEach((item) => {
        if (item.operationType === "INPUT") {
          item.operationColor = "#FF0000";
        } else if (item.operationType === "OUTPUT") {
          item.operationColor = "#08b137";
        }
      });
    },
  },

  methods: {
    ...mapActions({
      getMeasurementUnit: "measurement/getMeasurementUnit",
      getModelsList: "models/getModelsList",
      getWastesList: "wastesWarehouse/getWastesList",
      createWaste: "wastesWarehouse/createWaste",
      getHistoryList: "wastesWarehouse/getHistoryList",
      updateWaste: "wastesWarehouse/updateWaste",
      sellWaste: "wastesWarehouse/sellWaste",
      generatePdf: "wastesWarehouse/generatePdf",
      generateSellPdf: "wastesWarehouse/generateSellPdf",
    }),
    resetFilters() {
      this.getWastesList({ page: 0, size: 10 });
      this.$refs.filter_form.reset();
      this.filters.toDate = null;
      this.filters.fromDate = null;
    },
    filterData() {
      this.getWastesList({ page: 0, size: 10, ...this.filters });
    },
    page(value) {
      this.current_page = value - 1;
      this.getWastesList({ page: this.current_page, size: this.itemPerPage });
    },

    size(value) {
      this.itemPerPage = value;
      this.getWastesList({ page: 0, size: this.itemPerPage });
    },
    addWastes() {
      this.dialog = true;
      this.title = "Add";
      this.currentItem.title = "add";
    },
    spendFunc(item) {
      this.sellingWastes.id = item.id;
      this.sellingDialog = true;
    },
    getHistory(item) {
      this.historyDialog = true;
      this.getHistoryList(item.id);
    },
    getDeleteItem() {
      this.deleteDialog = true;
    },
    saveWaste() {
      const data = {
        ...this.currentItem,
        modelId: this.currentItem.modelNumber.id,
      };
      delete data.modelNumber;
      if (this.currentItem.title !== "edit") {
        this.createWaste(data);
      } else {
        this.updateWaste({ data, id: data.id });
      }
      this.currentItem = {};
      this.dialog = false;
    },
    editItem(item) {
      this.dialog = true;
      this.getModelsList({
        page: 0,
        size: 10,
        modelNumber: item.modelNUmber,
        partner: "",
      });
      this.title = "Edit";
      this.currentItem.id = item.id;
      this.currentItem.title = "edit";
      this.currentItem.name = item.name;
      this.currentItem.price = item.price;
      this.currentItem.currency = item.currency;
      this.currentItem.measurementUnitId = item.measurementUnitId;
      this.currentItem.quantity = item.beginPeriodQuantity;
      this.currentItem.modelNumber = this.modelsList[0];
    },
    sellItem() {
      const data = {
        quantity: this.sellingWastes.quantity,
        description: this.sellingWastes.description,
        partner: this.sellingWastes.customer,
      };
      this.sellWaste({ data, id: this.sellingWastes.id });
      this.sellingDialog = false;
      this.sellingWastes.quantity = "";
      this.sellingWastes.customer = "";
      this.sellingWastes.description = "";
    },
  },

  mounted() {
    this.$store.commit("setPageTitle", "Wastes warehouse");
    this.getWastesList({ page: 0, size: 10 });
  },
};
</script>
<style lang=""></style>
