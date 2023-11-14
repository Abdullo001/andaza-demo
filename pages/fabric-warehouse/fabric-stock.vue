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
              label="Model №"
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
              label="Supplier name"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.supplierName"
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
                color="#397CFD"
                elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                Reset
              </v-btn>
              <v-btn
                width="140"
                color="#397CFD"
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
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>Fabric stock</div>
            <v-btn
              color="#7631FF"
              dark
              class="text-capitalize rounded-lg"
              @click="addArrivedFabricStock"
            >
              <v-icon>mdi-plus</v-icon>
              Add Fabric Stock
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.production="{ item }">
        <div class="d-flex">
          <v-tooltip
            top
            color="#7631FF"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="#7631FF"
                @click="workshopFunc(item)"
              >
                <v-img src="/cut-icon.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">Workshop</span>
          </v-tooltip>

          <v-tooltip
            top
            color="#7631FF"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="#7631FF"
                @click="subcontractorFunc(item)"
              >
                <v-img src="/bag-icon.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">subcontractor</span>
          </v-tooltip>
        </div>
      </template>
      <template #item.actions="{ item }">
        <div class="d-flex">
          <v-btn icon color="green" @click="editItem(item)">
            <v-img src="/edit-active.svg" max-width="22" />
          </v-btn>
          <v-btn icon color="red" @click="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27" />
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ title }} Fabric stock
          </div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" v-model="new_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">ART №</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="arrivedFabricStock.sipNumber"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter ART №"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Batch №</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="arrivedFabricStock.batchNumber"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter batch №"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Order №</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="arrivedFabricStock.orderNumber"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter Order №"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Model №</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="arrivedFabricStock.modelNumber"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  height="44"
                  dense
                  color="#7631FF"
                  placeholder="Enter Model №"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Supplier name</div>
                <v-combobox
                  v-model="arrivedFabricStock.supplierId"
                  :rules="[formRules.required]"
                  :search-input.sync="supplierName"
                  :items="partnerLists"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :return-object="true"
                  color="#7631FF"
                  dense
                  placeholder="Enter partner name"
                  append-icon="mdi-chevron-down"
                  validate-on-blur
                >
                  <template #append>
                    <v-icon color="#7631FF">mdi-magnify</v-icon>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Fabric specification</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="arrivedFabricStock.fabricSpecification"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter fabric specification"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Color</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="arrivedFabricStock.colorId"
                  :rules="[formRules.required]"
                  :items="colorsList"
                  item-text="name"
                  item-value="id"
                  hide-details
                  class="base rounded-lg"
                  rounded
                  outlined
                  dense
                  placeholder="Select Color"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Pantone</div>
                <div class="d-flex align-center">
                  <v-text-field
                    height="44"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    color="#7631FF"
                    v-model="arrivedFabricStock.pantoneCode"
                    outlined
                    hide-details
                    dense
                    placeholder="Enter pantone code"
                  />
                  <v-select
                    :items="enums"
                    style="max-width: 100px"
                    dense
                    v-model="arrivedFabricStock.pantoneType"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    validate-on-blur
                    placeholder=""
                    append-icon="mdi-chevron-down"
                    color="#7631FF"
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Remaining quantity</div>
                <div class="d-flex align-center">
                  <v-text-field
                    height="44"
                    class="rounded-lg base rounded-l-lg"
                    color="#7631FF"
                    v-model="arrivedFabricStock.remainingQuantity"
                    outlined
                    hide-details
                    dense
                    placeholder="Enter remaining quantity KG"
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Price per unit</div>
                <div class="d-flex align-center">
                  <v-text-field
                    height="44"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    color="#7631FF"
                    v-model="arrivedFabricStock.pricePerUnit"
                    outlined
                    hide-details
                    dense
                    placeholder="Enter Price P/U"
                  />
                  <v-select
                    :items="priceEnums"
                    style="max-width: 100px"
                    dense
                    v-model="arrivedFabricStock.pricePerUnitCurrency"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    validate-on-blur
                    placeholder=""
                    append-icon="mdi-chevron-down"
                    color="#7631FF"
                    place
                  />
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#7631FF"
            width="163"
            @click="new_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            v-if="title === 'New'"
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="saveArrivedFabricStock"
          >
            save
          </v-btn>
          <v-btn
            v-else
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="editArrivedFabricStock"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="workshop_dialog" width="450">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            Fabric giving to own workshop
          </div>
          <v-btn icon color="#7631FF" @click="workshop_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form
            ref="workshop_form"
            v-model="workshop_validate"
            lazy-validation
          >
            <v-row>
              <v-col cols="12">
                <div class="label">Model number</div>
                <v-combobox
                  v-model="workshop.modelNumber"
                  :items="modelsList"
                  :search-input.sync="modelNumSearch"
                  :rules="[formRules.required]"
                  item-text="modelNumber"
                  item-value="modelNumber"
                  validate-on-blur
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg filter d-flex align-center justify-center mr-2"
                  :return-object="true"
                  dense
                  placeholder="Model number"
                  prepend-icon=""
                >
                  <template #append>
                    <v-icon class="d-inline-block" color="#7631FF">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
              </v-col>

              <v-col cols="12">
                <div class="label">Sip №</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="workshop.sipNumber"
                  :rules="[formRules.required]"
                  :items="processDetails"
                  item-text="sipNumber"
                  item-value="id"
                  hide-details
                  color="#7631FF"
                  class="base rounded-lg"
                  rounded
                  outlined
                  dense
                  placeholder="Select Model №"
                />
              </v-col>

              <v-col cols="12">
                <div class="label">Giving fabric quantity</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="workshop.quantity"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter giving fabric quantity"
                  color="#7631FF"
                  :suffix="workshop.measurement"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#7631FF"
            width="130"
            @click="workshop_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
            dark
            width="130"
            @click="saveWorkshop"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="subcontractor_dialog" width="450">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            Fabric giving to Subcontractor
          </div>
          <v-btn icon color="#7631FF" @click="subcontractor_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form
            ref="subcontractor_form"
            v-model="subcontractor_validate"
            lazy-validation
          >
            <v-row>
              <v-col cols="12">
                <div class="label">Model number</div>
                <v-combobox
                  v-model="subcontractor.modelNumber"
                  :items="modelsList"
                  :search-input.sync="modelNumSearch"
                  :rules="[formRules.required]"
                  item-text="modelNumber"
                  item-value="modelNumber"
                  validate-on-blur
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg filter d-flex align-center justify-center mr-2"
                  :return-object="true"
                  dense
                  placeholder="Model number"
                  prepend-icon=""
                >
                  <template #append>
                    <v-icon class="d-inline-block" color="#7631FF">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
              </v-col>

              <v-col cols="12">
                <div class="label">Sip №</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="subcontractor.sipNumber"
                  :items="processDetails"
                  :rules="[formRules.required]"
                  hide-details
                  item-text="sipNumber"
                  item-value="id"
                  color="#7631FF"
                  class="base rounded-lg"
                  rounded
                  outlined
                  dense
                  placeholder="Select Sip №"
                />
              </v-col>

              <v-col cols="12">
                <div class="label">Partner</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="subcontractor.partnerId"
                  :items="partnerList"
                  :rules="[formRules.required]"
                  item-text="name"
                  item-value="id"
                  hide-details
                  color="#7631FF"
                  class="base rounded-lg"
                  rounded
                  outlined
                  dense
                  placeholder="Select partner"
                />
              </v-col>

              <v-col cols="12">
                <div class="label">Giving fabric quantity</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="subcontractor.quantity"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter giving fabric quantity"
                  color="#7631FF"
                  :suffix="subcontractor.measurement"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#7631FF"
            width="130"
            @click="subcontractor_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
            dark
            width="130"
            @click="saveSubcontractor"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40" />
        </div>
        <v-card-title class="d-flex justify-center"
          >Delete fabric warehouse row</v-card-title
        >
        <v-card-text>
          Are you sure you want to Delete fabric warehouse row?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            cancel
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteItem"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      headers: [
        { text: "Sip №", value: "sipNumber", sortable: false },
        { text: "Batch №", value: "batchNumber", sortable: false },
        { text: "Order №", value: "orderNumber", sortable: false },
        { text: "Model №", value: "modelNumber", sortable: false },
        { text: "Supplier name", value: "supplierName", sortable: false },
        {
          text: "Fabric specification",
          value: "fabricSpecification",
          sortable: false,
          width: 200,
        },
        { text: "Color", value: "color", sortable: false },
        { text: "Remaining q-ty", value: "remainingQuantity", sortable: false },
        {
          text: "Price P/U",
          value: "pricePerUnit",
          sortable: false,
          align: "center",
        },
        { text: "Total price", value: "totalPrice", sortable: false },
        {
          text: "Production",
          value: "production",
          sortable: false,
          align: "center",
        },
        { text: "Action", value: "actions", sortable: false, align: "center" },
      ],

      valid_search: "",
      new_validate: true,
      supplierName: "",
      workshop_validate: true,
      enums: ["TPX", "TCX", "TPG", "C", "MELANGE"],
      priceEnums: ["USD", "UZS", "RUB"],
      pantonType: "TPX",
      pricePerUnitCurrency: "USD",
      subcontractor_validate: true,
      spend_validate: true,
      new_dialog: false,
      delete_dialog: false,
      workshop_dialog: false,
      subcontractor_dialog: false,
      title: "",
      arrivedFabricStock: {},

      workshop: {
        id: null,
        quantity: null,
        warehouseId: null,
      },

      subcontractor: {
        id: null,
        partnerId: null,
        warehouseId: null,
        quantity: null,
      },

      filters: {
        sipNumber: null,
        modelNumber: null,
        supplierName: null,
      },

      modelNumSearch: "",
      deletedId: null,
      modelNumbers: [],
      current_list: [],
    };
  },

  computed: {
    ...mapGetters({
      fabricStockList: "fabricStock/fabricStockList",
      colorsList: "accessoryChart/colorsList",
      partnerLists: "fabricStock/partnerLists",
      partnerList: "fabricStock/partnerList",
      modelsList: "models/modelsList",
      processDetails: "fabricStock/processDetails",
    }),
  },

  watch: {
    "workshop.modelNumber"(val) {
      this.getFabricProcessDetails({ id: val?.id, isForSubcontractor: false });
    },
    "subcontractor.modelNumber"(val) {
      this.getFabricProcessDetails({ id: val?.id, isForSubcontractor: true });
    },
    "workshop.sipNumber"(id) {
      this.workshop.warehouseId = id;
    },
    "subcontractor.sipNumber"(id) {
      this.getPartnerListFunc(id);
      this.subcontractor.warehouseId = id;
    },
    "subcontractor.partnerId"(id) {
      this.subcontractor.partnerId = id;
    },
    fabricStockList(val) {
      this.current_list = JSON.parse(JSON.stringify(val));
    },
    partnerName(val) {
      if (!!val && val !== "") {
        this.getPartnerName(val);
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

  created() {
    this.getPartnerList();
    this.getColorsList();
    this.getPartnerName();
    this.getModelsList({
      page: 0,
      size: 10,
      modelNumber: this.modelNumSearch,
      partner: "",
      status: "ACTIVE",
    });
  },

  methods: {
    ...mapActions({
      getFabricStockList: "fabricStock/getFabricStockList",
      createFabricStock: "fabricStock/createFabricStock",
      updateFabricStock: "fabricStock/updateFabricStock",
      deleteFabricStock: "fabricStock/deleteFabricStock",
      setFabricStockToWorkshop: "fabricStock/setFabricStockToWorkshop",
      setFabricStockToSubcontract: "fabricStock/setFabricStockToSubcontract",
      getPartnerList: "subcontracts/getPartnerList",
      getColorsList: "accessoryChart/getColorsList",
      getPartnerName: "fabricStock/getPartnerName",
      getPartnerListFunc: "fabricStock/getPartnerList",
      getModelsList: "models/getModelsList",
      getFabricProcessDetails: "fabricStock/getFabricProcessDetails",
    }),
    loadDetails({ item }) {
      // current opened || choose object ^
    },

    addArrivedFabricStock() {
      this.title = "New";
      this.new_dialog = true;
    },

    async saveArrivedFabricStock() {
      const data = { ...this.arrivedFabricStock };
      data.supplierId = this.arrivedFabricStock.supplierId.id;
      await this.createFabricStock(data);
      await this.$refs.new_form.reset();
      this.new_dialog = false;
    },

    editItem(item) {
      this.title = "Edit";
      this.arrivedFabricStock = { ...item };
      this.arrivedFabricStock.pantoneType = item.pantoneType;
      this.arrivedFabricStock.remainingQuantity =
        item.remainingQuantity.split(" ")[0];
      this.arrivedFabricStock.pricePerUnitCurrency =
        item.pricePerUnit.split(" ")[1];
      this.arrivedFabricStock.pricePerUnit = item.pricePerUnit.split(" ")[0];
      this.arrivedFabricStock.supplierId = {
        id: item.id,
        name: item.supplierName,
      };
      this.new_dialog = true;
    },

    editArrivedFabricStock() {
      const data = {
        batchNumber: this.arrivedFabricStock.batchNumber,
        modelNumber: this.arrivedFabricStock.modelNumber,
        pantoneType: this.arrivedFabricStock.pantoneType,
        pricePerUnitCurrency: this.arrivedFabricStock.pricePerUnitCurrency,
        supplierId: this.arrivedFabricStock.supplierId.id,
        sipNumber: this.arrivedFabricStock.sipNumber,
        orderNumber: this.arrivedFabricStock.orderNumber,
        fabricSpecification: this.arrivedFabricStock.fabricSpecification,
        colorId: this.arrivedFabricStock.colorId,
        pantoneCode: this.arrivedFabricStock.pantoneCode,
        remainingQuantity: this.arrivedFabricStock.remainingQuantity,
        pricePerUnit: this.arrivedFabricStock.pricePerUnit.split(" ")[0],
        id: this.arrivedFabricStock.id,
      };
      this.updateFabricStock(data);
      this.new_dialog = false;
    },

    getDeleteItem(item) {
      this.deletedId = item.id;
      this.delete_dialog = true;
    },

    deleteItem() {
      this.deleteFabricStock(this.deletedId);
      this.delete_dialog = false;
    },

    workshopFunc(item) {
      this.workshop_dialog = true;
      this.workshop.id = item.id;
    },

    async saveWorkshop() {
      this.workshop_dialog = false;
      const data = {
        id: this.workshop.id,
        quantity: this.workshop.quantity,
        warehouseId: this.workshop.warehouseId,
      };
      this.setFabricStockToWorkshop(data);
      await this.$refs.workshop_form.reset();
    },

    async saveSubcontractor() {
      this.subcontractor_dialog = false;
      const data = {
        id: this.subcontractor.id,
        quantity: this.subcontractor.quantity,
        partnerId: this.subcontractor.partnerId,
        warehouseId: this.subcontractor.warehouseId,
      };
      this.setFabricStockToSubcontract(data);
      await this.$refs.subcontractor_form.reset();
    },

    async subcontractorFunc(item) {
      this.subcontractor_dialog = true;
      this.subcontractor.id = item.id;
      this.modelNumbers = [...item.modelNumber.split("/")];
    },

    filterData() {
      this.getFabricStockList({
        sipNumber: this.filters.sipNumber,
        modelNumber: this.filters.modelNumber,
        supplierName: this.filters.supplierName,
      });
    },
    async resetFilters() {
      await this.getFabricStockList({
        sipNumber: "",
        modelNumber: "",
        supplierName: "",
      });
      await this.$refs.filter_form.reset();
    },
  },

  mounted() {
    this.getFabricStockList({
      sipNumber: "",
      modelNumber: "",
      supplierName: "",
    });
  },
};
</script>
<style lang="scss"></style>
