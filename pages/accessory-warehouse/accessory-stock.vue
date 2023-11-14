<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field label="Accessory name" outlined class="rounded-lg filter" v-model.trim="filters.accessoryName"
              hide-details dense @keydown.enter="filterData" />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field label="Model №" outlined class="rounded-lg filter" v-model.trim="filters.modelNumber"
              hide-details dense @keydown.enter="filterData" />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field label="Supplier name" outlined class="rounded-lg filter" v-model.trim="filters.supplierName"
              hide-details dense @keydown.enter="filterData" />
          </v-col>
          <v-spacer />
          <v-col cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn width="140" outlined color="#397CFD" elevation="0" class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters">
                Reset
              </v-btn>
              <v-btn width="140" color="#397CFD" dark elevation="0" class="text-capitalize rounded-lg"
                @click="filterData">
                Search
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table class="mt-4 rounded-lg pt-4" :headers="headers" :items="current_list" :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }">
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex w-full align-center justify-space-between">
            <div>Accessory stock</div>
            <v-btn color="#7631FF" dark class="text-capitalize rounded-lg" @click="addArrivedAccessoryStock">
              <v-icon>mdi-plus</v-icon>
              Add Accessory Stock
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.production="{ item }">
        <div class="d-flex">
          <v-tooltip top color="#7631FF" class="pointer" v-if="Object.keys(item).length > 2">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" color="#7631FF" @click="workshopFunc(item)">
                <v-img src="/cut-icon.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">Workshop</span>
          </v-tooltip>

          <v-tooltip top color="#7631FF" class="pointer" v-if="Object.keys(item).length > 2">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" color="#7631FF" @click="subcontractorFunc(item)">
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
            {{ title }} Accessory stock
          </div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" v-model="new_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">Order №</div>
                <v-text-field 
                :rules="[formRules.required]" 
                v-model="arrivedAccessoryStock.orderNumber" 
                outlined
                hide-details 
                dense 
                class="rounded-lg base" 
                placeholder="Enter Order №" 
                color="#7631FF" />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Model №</div>
                <v-text-field 
                :rules="[formRules.required]" 
                v-model="arrivedAccessoryStock.modelNumber" 
                outlined
                hide-details 
                class="rounded-lg base" 
                height="44" 
                dense 
                color="#7631FF" 
                placeholder="Enter Model №" />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Accessory name</div>
                <v-text-field 
                :rules="[formRules.required]" 
                v-model="arrivedAccessoryStock.accessoryName" 
                outlined
                hide-details 
                class="rounded-lg base" 
                height="44" 
                dense 
                color="#7631FF"
                placeholder="Enter accessory name" />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Supplier name</div>
                <v-combobox 
                v-model="arrivedAccessoryStock.supplierId" 
                :rules="[formRules.required]"
                :search-input.sync="partnerName" 
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
                <div class="label">Accessory specification</div>
                <v-text-field :rules="[formRules.required]" v-model="arrivedAccessoryStock.specification" outlined
                  hide-details dense class="rounded-lg base" placeholder="Enter accessory specification"
                  color="#7631FF" />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Remaining quantity</div>
                <div class="d-flex align-center">
                  <v-text-field height="44" class="rounded-lg base rounded-l-lg rounded-r-0" color="#7631FF"
                    v-model="arrivedAccessoryStock.remainingQuantity" outlined hide-details dense
                    placeholder="Enter Remaining q-ty" />
                  <v-select :items="measurementUnitList" item-text="name" item-value="id" style="max-width: 100px" dense
                    v-model="arrivedAccessoryStock.measurementUnitId" outlined hide-details height="44"
                    class="rounded-lg base rounded-r-lg rounded-l-0" validate-on-blur placeholder=""
                    append-icon="mdi-chevron-down" color="#7631FF" place />
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Price per unit</div>
                <div class="d-flex align-center">
                  <v-text-field height="44" class="rounded-lg base rounded-l-lg rounded-r-0" color="#7631FF"
                    v-model="arrivedAccessoryStock.pricePerUnit" outlined hide-details dense
                    placeholder="Enter Price P/U" />
                  <v-select :items="priceEnums" style="max-width: 100px" dense
                    v-model="arrivedAccessoryStock.pricePerUnitCurrency" outlined hide-details height="44"
                    class="rounded-lg base rounded-r-lg rounded-l-0" validate-on-blur placeholder=""
                    append-icon="mdi-chevron-down" color="#7631FF" place />
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn class="rounded-lg text-capitalize font-weight-bold" outlined color="#7631FF" width="163"
            @click="new_dialog = false">
            cancel
          </v-btn>
          <v-btn v-if="title === 'New'" class="rounded-lg text-capitalize ml-4 font-weight-bold" color="#7631FF" dark
            width="163" @click="saveArrivedAccessoryStock">
            save
          </v-btn>
          <v-btn v-else class="rounded-lg text-capitalize ml-4 font-weight-bold" color="#7631FF" dark width="163"
            @click="editArrivedAccessoryStock">
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="workshop_dialog" width="450">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            Accessory giving to own workshop
          </div>
          <v-btn icon color="#7631FF" @click="workshop_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="workshop_form" v-model="workshop_validate" lazy-validation>
            <v-row>
             <v-col cols="12">
                <div class="label">Model number</div>
                <v-combobox
                  v-model="workshop.modelNumber"
                  :items="modelsList"
                  :search-input.sync="modelNumSearch"
                  :rules="[formRules.required]"
                  item-text="modelNumber"
                  item-value="id"
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
                <div class="label">Process</div>
                <v-select 
                append-icon="mdi-chevron-down" 
                v-model="workshop.process" 
                :rules="[formRules.required]"
                :items="processes" 
                hide-details color="#7631FF" 
                class="base rounded-lg" 
                rounded 
                outlined 
                dense
                placeholder="Select Model №" />
              </v-col>

              <v-col cols="12">
                <div class="label">Giving fabric quantity</div>
                <v-text-field 
                :rules="[formRules.required]" 
                v-model="workshop.givingQuantity" 
                outlined hide-details dense
                class="rounded-lg base" 
                placeholder="Enter giving fabric quantity" 
                color="#7631FF"
                :suffix="workshop.measurement" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn class="rounded-lg text-capitalize font-weight-bold" outlined color="#7631FF" width="130"
            @click="workshop_dialog = false">
            cancel
          </v-btn>
          <v-btn class="rounded-lg text-capitalize ml-4 font-weight-bold" color="#7631FF" dark width="130"
            @click="saveWorkshop">
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="subcontractor_dialog" width="450">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            Accessory giving to Subcontractor
          </div>
          <v-btn icon color="#7631FF" @click="subcontractor_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="subcontractor_form" v-model="subcontractor_validate" lazy-validation>
            <v-row>
              <v-col cols="12">
                <div class="label">Model number</div>
                <v-combobox
                  v-model="workshop.modelNumber"
                  :items="modelsList"
                  :search-input.sync="modelNumSearch"
                  :rules="[formRules.required]"
                  item-text="modelNumber"
                  item-value="id"
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
                <div class="label">Process</div>
                <v-select 
                append-icon="mdi-chevron-down" 
                v-model="subcontractor.process" 
                :rules="[formRules.required]"
                :items="processes" 
                hide-details color="#7631FF" 
                class="base rounded-lg" 
                rounded 
                outlined 
                dense
                placeholder="Select Process" />
              </v-col>

              <v-col cols="12">
                <div class="label">Partner name</div>
                <v-combobox
                  v-model="subcontractor.partnerId"
                  :rules="[formRules.required]"
                  :search-input.sync="partnerName"
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

              <v-col cols="12">
                <div class="label">Giving fabric quantity</div>
                <v-text-field 
                :rules="[formRules.required]" 
                v-model="subcontractor.givingQuantity" 
                outlined 
                hide-details 
                dense
                class="rounded-lg base" 
                placeholder="Enter giving fabric quantity" 
                color="#7631FF"
                :suffix="subcontractor.measurement" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn class="rounded-lg text-capitalize font-weight-bold" outlined color="#7631FF" width="130"
            @click="subcontractor_dialog = false">
            cancel
          </v-btn>
          <v-btn class="rounded-lg text-capitalize ml-4 font-weight-bold" color="#7631FF" dark width="130"
            @click="saveSubcontractor">
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
        <v-card-title class="d-flex justify-center">Delete accessory stock row</v-card-title>
        <v-card-text>
          Are you sure you want to Delete accessory stock row?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn outlined class="rounded-lg text-capitalize font-weight-bold" color="#777C85" width="140"
            @click.stop="delete_dialog = false">
            cancel
          </v-btn>
          <v-spacer />
          <v-btn class="rounded-lg text-capitalize font-weight-bold" color="#FF4E4F" width="140" elevation="0" dark
            @click="deleteItem">
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
        { text: "Order №", value: "orderNumber", sortable: false },
        { text: "Model №", value: "modelNumber", sortable: false },
        { text: "Accessory name", value: "accessoryName", sortable: false },
        {
          text: "Accessory specification",
          value: "specification",
          sortable: false,
          width: 200,
        },
        { text: "Supplier name", value: "supplierName", sortable: false },
        { text: "Remaining q-ty", value: "remainingQuantity", sortable: false },
        { text: "M/U", value: "measurementUnit", sortable: false },
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
      title: "",
      partnerName: "",
      new_validate: true,
      workshop_validate: true,
      enums: [ "TPX", "TCX", "TPG", "C", "MELANGE" ],
      priceEnums: [ "USD", "UZS", "RUB" ],
      processes: [ "SEWING", "PACKAGING" ],
      subcontractor_validate: true,
      spend_validate: true,
      new_dialog: false,
      delete_dialog: false,
      workshop_dialog: false,
      subcontractor_dialog: false,
      arrivedAccessoryStock: {},
      workshop: {
        givingQuantity: null,
        id: null,
        modelId: null,
        process: null,
      },

      subcontractor: {
        givingQuantity: null,
        id: null,
        modelId: null,
        partnerId: null,
        process: null,
      },

      filters: {
        accessoryName: null,
        modelNumber: null,
        supplierName: null,
      },

      deletedId: null,
      modelNumbers: [],
      modelNumSearch: "",
      current_list: [],
    };
  },

  computed: {
    ...mapGetters( {
      accessoryStockList: "accessoryStock/accessoryStockList",
      partnerLists: "accessoryStock/partnerLists",
      modelsList: "models/modelsList",
      measurementUnitList: "shippingInfo/measurementUnitList",
    } ),
  },

  watch: {
    accessoryStockList( val ) {
      this.current_list = JSON.parse( JSON.stringify( val ) );
    },
    partnerName( val ) {
      if ( !!val && val !== "" ) {
        this.getPartnerName( val );
      }
    },
    "arrivedAccessoryStock.measurementUnitId"( id ) {
      this.arrivedAccessoryStock.measurementUnitId = id;
    },
    "workshop.modelNumber"(val) {
      this.workshop.modelId = val?.id;
    },
    "workshop.modelNumber"(val) {
      this.subcontractor.modelId = val?.id;
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
    this.getPartnerName();
    this.getMeasurementUnit();
    this.getModelsList({
      page: 0,
      size: 10,
      modelNumber: this.modelNumSearch,
      partner: "",
      status: "ACTIVE",
    });
  },

  methods: {
    ...mapActions( {
      getAccessoryStockList: "accessoryStock/getAccessoryStockList",
      createAccessoryStock: "accessoryStock/createAccessoryStock",
      updateAccessoryStock: "accessoryStock/updateAccessoryStock",
      deleteAccessoryStock: "accessoryStock/deleteAccessoryStock",
      setAccessoryStockToWorkshop: "accessoryStock/setAccessoryStockToWorkshop",
      setAccessoryStockToSubcontract:
        "accessoryStock/setAccessoryStockToSubcontract",
      getPartnerName: "accessoryStock/getPartnerName",
      getModelsList: "models/getModelsList",
      getMeasurementUnit: "shippingInfo/getMeasurementUnit",
    } ),
    loadDetails( { item } ) {
      // current opened || choose object ^
    },

    addArrivedAccessoryStock() {
      this.title = "New";
      this.new_dialog = true;
    },

    async saveArrivedAccessoryStock() {
      const data = { ...this.arrivedAccessoryStock };
      data.supplierId = this.arrivedAccessoryStock.supplierId.id;
      await this.createAccessoryStock( data );
      await this.$refs.new_form.reset();
      this.new_dialog = false;
    },

    editItem( item ) {
      this.title = "Edit";
      this.arrivedAccessoryStock = { ...item };
      this.arrivedAccessoryStock.measurementUnitId = item.measurementUnitId;
      this.arrivedAccessoryStock.pricePerUnitCurrency =
        item.pricePerUnit.split( " " )[ 1 ];
      this.arrivedAccessoryStock.pricePerUnit = item.pricePerUnit.split( " " )[ 0 ];
      this.arrivedAccessoryStock.supplierId = {
        id: item.supplierId,
        name: item.supplierName,
      };
      console.log( this.arrivedAccessoryStock );
      console.log( item );
      this.new_dialog = true;
    },

    editArrivedAccessoryStock() {
      const data = {
        modelNumber: this.arrivedAccessoryStock.modelNumber,
        pricePerUnitCurrency: this.arrivedAccessoryStock.pricePerUnitCurrency,
        supplierId: this.arrivedAccessoryStock.supplierId.id,
        accessoryName: this.arrivedAccessoryStock.accessoryName,
        orderNumber: this.arrivedAccessoryStock.orderNumber,
        measurementUnitId: this.arrivedAccessoryStock.measurementUnitId,
        specification: this.arrivedAccessoryStock.specification,
        measurementUnit:
          this.arrivedAccessoryStock.measurementUnit.split( " " )[ 0 ],
        remainingQuantity: this.arrivedAccessoryStock.remainingQuantity,
        pricePerUnit: this.arrivedAccessoryStock.pricePerUnit.split( " " )[ 0 ],
        id: this.arrivedAccessoryStock.id,
      };
      this.updateAccessoryStock( data );
      this.new_dialog = false;
    },

    getDeleteItem( item ) {
      this.deletedId = item.id;
      this.delete_dialog = true;
    },

    deleteItem() {
      this.deleteAccessoryStock( this.deletedId );
      this.delete_dialog = false;
    },

    workshopFunc( item ) {
      this.workshop_dialog = true;
      this.workshop.id = item.id;
      this.workshop.modelId = item.modelId;
      this.workshop.process = item.process;
      this.workshop.givingQuantity = item.givingQuantity;
    },

    async saveWorkshop() {
      this.workshop_dialog = false;
      const data = {
        id: this.workshop.id,
        modelId: this.workshop.modelId,
        givingQuantity: this.workshop.givingQuantity,
        process: this.workshop.process,
      };
      this.setAccessoryStockToWorkshop( data );
      await this.$refs.workshop_form.reset();
    },

    async saveSubcontractor() {
      this.subcontractor_dialog = false;
      const data = {
        givingQuantity: this.subcontractor.givingQuantity,
        id: this.subcontractor.id,
        modelId: this.subcontractor.modelId,
        partnerId: this.subcontractor.partnerId.id,
        process: this.subcontractor.process,
      };
      this.setAccessoryStockToSubcontract( data );
      await this.$refs.subcontractor_form.reset();
    },

    async subcontractorFunc( item ) {
      this.subcontractor_dialog = true;
      this.subcontractor.id = item.id;
      this.subcontractor.process = item.process;
      this.subcontractor.givingQuantity = item.givingQuantity;
      this.modelNumbers = [ ...item.modelNumber.split( "/" ) ];
    },

    filterData() {
      this.getAccessoryStockList( {
        accessoryName: this.filters.accessoryName,
        modelNumber: this.filters.modelNumber,
        supplierName: this.filters.supplierName,
      } );
    },
    async resetFilters() {
      await this.getAccessoryStockList( {
        accessoryName: "",
        modelNumber: "",
        supplierName: "",
      } );
      await this.$refs.filter_form.reset();
    },
  },

  mounted() {
    this.getAccessoryStockList( {
      accessoryName: "",
      modelNumber: "",
      supplierName: "",
    } );
  },
};
</script>
<style lang="scss"></style>
