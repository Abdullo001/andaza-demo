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
              <v-btn width="140" outlined color="#544B99" elevation="0" class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters">
                Reset
              </v-btn>
              <v-btn width="140" color="#544B99" dark elevation="0" class="text-capitalize rounded-lg"
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
            <v-btn color="#544B99" dark class="text-capitalize rounded-lg" @click="addArrivedAccessoryStock">
              <v-icon>mdi-plus</v-icon>
              Add Accessory Stock
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.accessoryPhoto="{item}">
        <v-img
        :src="item?.filePath"
        class="mr-2"
        width="40"
        height="40"
        @click="showImage(item.filePath)"
      />
      </template>
      <template #item.actions="{ item }">
          <div class="d-flex">
          <v-tooltip top color="#544B99" class="pointer" v-if="Object.keys(item).length > 2">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" color="#544B99" @click="workshopFunc(item)">
                <v-img src="/cut-icon.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">Workshop</span>
          </v-tooltip>
          <v-tooltip top color="#544B99" class="pointer" v-if="Object.keys(item).length > 2">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" color="#544B99" @click="subcontractorFunc(item)">
                <v-img src="/bag-icon.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">subcontractor</span>
          </v-tooltip>
          <v-tooltip top color="#544B99">
            <template #activator="{ on, attrs }" >
              <v-btn
                icon
                class="ml-2"
                :href="item.documentPath"
                :download="`Document.${item.extension}`"
                :disabled="!item.documentPath"
                v-on="on"
                target="_blank"
                v-bind="attrs"
                @click.stop
              >
                <v-img src="/download.svg"
                :style="{ filter: item.documentPath ? 'none' : 'grayscale(100%) opacity(0.5)' }"
                max-width="24" />
              </v-btn>
            </template>
            <span>Download</span>
          </v-tooltip>
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
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" v-model="new_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">Order №</div>
                <v-text-field
                v-model="arrivedAccessoryStock.orderNumber"
                outlined
                hide-details
                dense
                class="rounded-lg base"
                placeholder="Enter Order №"
                color="#544B99" />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Model №</div>
                <v-text-field
                v-model="arrivedAccessoryStock.modelNumber"
                outlined
                hide-details
                class="rounded-lg base"
                height="44"
                dense
                color="#544B99"
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
                color="#544B99"
                placeholder="Enter accessory name" />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Supplier name</div>
                <v-combobox
                v-model="arrivedAccessoryStock.supplierId"
                :search-input.sync="partnerName"
                :items="partnerLists"
                item-text="name"
                item-value="id"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                :return-object="true"
                color="#544B99"
                dense
                placeholder="Enter partner name"
                append-icon="mdi-chevron-down"
                validate-on-blur
                >
                  <template #append>
                    <v-icon color="#544B99">mdi-magnify</v-icon>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Accessory specification</div>
                <v-text-field
                :rules="[formRules.required]"
                v-model="arrivedAccessoryStock.specification"
                outlined
                hide-details
                dense
                class="rounded-lg base"
                placeholder="Enter accessory specification"
                color="#544B99" />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Remaining quantity</div>
                <div class="d-flex align-center">
                  <v-text-field
                  height="44"
                  class="rounded-lg base rounded-l-lg rounded-r-0"
                  color="#544B99"
                  v-model="arrivedAccessoryStock.remainingQuantity"
                  outlined
                  hide-details
                  dense
                  placeholder="Enter Remaining q-ty" />
                  <v-select
                  :items="measurementUnitList"
                  item-text="name"
                  item-value="id"
                  style="max-width: 100px"
                  dense
                  v-model="arrivedAccessoryStock.measurementUnitId"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base rounded-r-lg rounded-l-0"
                  validate-on-blur
                  placeholder="M/U"
                  append-icon="mdi-chevron-down" color="#544B99" place />
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Price per unit</div>
                <div class="d-flex align-center">
                  <v-text-field
                  height="44"
                  class="rounded-lg base rounded-l-lg rounded-r-0"
                  color="#544B99"
                  v-model="arrivedAccessoryStock.pricePerUnit"
                  outlined
                  hide-details
                  dense
                  placeholder="Enter Price P/U" />
                  <v-select
                  :items="priceEnums"
                  style="max-width: 100px"
                  dense
                  v-model="arrivedAccessoryStock.pricePerUnitCurrency"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base rounded-r-lg rounded-l-0"
                  validate-on-blur
                  placeholder="P/U"
                  append-icon="mdi-chevron-down" color="#544B99" place />
                </div>
              </v-col>
              <v-col cols="12">
                <div class="text-body-1 font-weight-medium mb-3">
                  {{ $t("partners.dialog.uploadContract") }}
                </div>
                <v-card style="border: #a5a7ad dashed 1px" elevation="0">
                  <v-card-title>
                    <input
                      ref="uploader"
                      class="d-none"
                      type="file"
                      @change="onChangeFile"
                    />
                    <v-btn
                      @click="clickImportFile"
                      elevation="0"
                      style="background-color: #f1ebfe; color: #544b99"
                      :disabled="docList.length !== 0"
                      class="font-weight-bold mr-3 text-capitalize"
                    >
                      {{ $t("partners.dialog.uploadFiles") }}
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <div v-for="(item, idx) in docList" :key="`imade_${idx}`">
                      <div class="d-flex justify-space-between align-center">
                        <p class="font-weight-bold">
                          <v-icon class="mr-3" color="green">
                            mdi-check
                          </v-icon>
                          {{ item.name }}
                        </p>
                        <p>
                          <v-btn icon @click="removeImage(item.size)">
                            <v-icon> mdi-close</v-icon>
                          </v-btn>
                        </p>
                      </div>
                      <v-divider />
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <div class="big__image overflow-hidden relative " >
                  <input
                    ref="uploaderFirst"
                    class="d-none"
                    type="file"
                    @change="(e)=>firstFileChanged(e)"
                    accept="image/*"
                  />

                  <div class="update__icon" v-if="!!files[0].file">
                    <v-btn color="green" icon @click="getFile('first')">
                      <v-img src="/upload-green.svg" max-width="22"/>
                    </v-btn>
                    <v-btn color="green" icon @click="deleteFile('first')">
                      <v-img src="/trash-red.svg" max-width="22"/>
                    </v-btn>
                  </div>

                  <v-img
                    :src="images[0].photo"
                    lazy-src="/model-image.jpg"
                    v-if="!!files[0].file" width="100%"
                    @click="showImage(images[0].photo)"
                  />

                  <div class="default__box" v-else>
                    <v-img src="/default-image.svg" width="70"/>
                    <v-btn text color="#5570F1" class="rounded-lg mt-6 my-4" @click="getFile('first')">
                      <v-img src="/upload.svg" class="mr-2"/>
                      <div class="text-capitalize upload-text">Upload Image</div>
                    </v-btn>
                    <div class="default__text">
                      <p>Upload a cover image for your product.</p>
                    </div>
                  </div>

                </div>
              </v-col>
            </v-row>
            </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
          class="rounded-lg text-capitalize font-weight-bold"
          outlined
          color="#544B99"
          width="163"
          @click="new_dialog = false">
            cancel
          </v-btn>
          <v-btn
          v-if="title === 'New'"
          class="rounded-lg text-capitalize ml-4 font-weight-bold"
          color="#544B99"
          dark
          width="163"
          @click="saveArrivedAccessoryStock">
            save
          </v-btn>
          <v-btn
          v-else
          class="rounded-lg text-capitalize ml-4 font-weight-bold"
          color="#544B99"
          dark width="163"
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
          <v-btn icon color="#544B99" @click="workshop_dialog = false">
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
                    <v-icon class="d-inline-block" color="#544B99">
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
                hide-details color="#544B99"
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
                color="#544B99"
                :suffix="workshop.measurement" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn class="rounded-lg text-capitalize font-weight-bold" outlined color="#544B99" width="130"
            @click="workshop_dialog = false">
            cancel
          </v-btn>
          <v-btn class="rounded-lg text-capitalize ml-4 font-weight-bold" color="#544B99" dark width="130"
            @click="workshopSureFunc">
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
          <v-btn icon color="#544B99" @click="subcontractor_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="subcontractor_form" v-model="subcontractor_validate" lazy-validation>
            <v-row>
              <v-col cols="12">
                <div class="label">Model number</div>
                <v-combobox
                  v-model="subcontractor.modelNumber"
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
                    <v-icon class="d-inline-block" color="#544B99">
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
                hide-details color="#544B99"
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
                  color="#544B99"
                  dense
                  placeholder="Enter partner name"
                  append-icon="mdi-chevron-down"
                  validate-on-blur
                >
                  <template #append>
                    <v-icon color="#544B99">mdi-magnify</v-icon>
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
                color="#544B99"
                :suffix="subcontractor.measurement" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn class="rounded-lg text-capitalize font-weight-bold" outlined color="#544B99" width="130"
            @click="subcontractor_dialog = false">
            cancel
          </v-btn>
          <v-btn class="rounded-lg text-capitalize ml-4 font-weight-bold" color="#544B99" dark width="130"
            @click="subcontractorSureFunc">
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
    <v-dialog v-model="workshopSure_dialog" max-width="450">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40" />
        </div>
        <v-card-title class="d-flex justify-center font-weight-bold"
          >Are you sure ?</v-card-title
        >
        <v-card-text>
         You want to giving the current accessory to this model ?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#544B99"
            width="120"
            @click.stop="workshopSure_dialog = false"
          >
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#544B99"
            width="120"
            elevation="0"
            dark
            @click="saveWorkshop"
          >
            Giving
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="subcontractorSure_dialog" max-width="450">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40" />
        </div>
        <v-card-title class="d-flex justify-center font-weight-bold"
          >Are you sure ?</v-card-title
        >
        <v-card-text>
         You want to giving the current accessory to this model ?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#544B99"
            width="120"
            @click.stop="subcontractorSure_dialog = false"
          >
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#544B99"
            width="120"
            elevation="0"
            dark
            @click="saveSubcontractor"
          >
            Giving
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      headers: [
        { text: "Order №", value: "orderNumber", sortable: false },
        { text: "Model №", value: "modelNumber", sortable: false },
        { text: "Accessory name", value: "accessoryName", sortable: false },
        { text: "Accessory specification", value: "specification", sortable: false, width: 200 },
        { text: "Accessory photo", value: "accessoryPhoto" },
        { text: "Supplier name", value: "supplierName", sortable: false },
        { text: "Remaining q-ty", value: "remainingQuantity", sortable: false },
        { text: "M/U", value: "measurementUnit", sortable: false },
        { text: "Price P/U", value: "pricePerUnit", sortable: false, align: "center" },
        { text: "Total price", value: "totalPrice", sortable: false },
        { text: "Action", value: "actions", sortable: false, align: "center" },
      ],

      files:[
        {file:null,id:null},
        {file:null,id:null},
        {file:null,id:null},
        {file:null,id:null},
      ],

      images:[
        {photo:""},
        {photo:""},
        {photo:""},
        {photo:""},
      ],

      enums: [ "TPX", "TCX", "TPG", "C", "MELANGE" ],
      priceEnums: [ "USD", "UZS", "RUB" ],
      processes: [ "SEWING", "PACKAGING" ],
      currentImage:"",
      valid_search: "",
      title: "",
      partnerName: "",
      new_validate: true,
      workshop_validate: true,
      subcontractor_validate: true,
      image_dialog:false,
      new_dialog: false,
      workshopSure_dialog: false,
      subcontractorSure_dialog: false,
      delete_dialog: false,
      workshop_dialog: false,
      subcontractor_dialog: false,
      arrivedAccessoryStock: {
        modelNumber: "",
        orderNumber: "",
      },

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
        accessoryName: "",
        modelNumber: "",
        supplierName: "",
      },

      deletedId: null,
      docList: [],
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
    "subcontractor.modelNumber"(val) {
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

    firstFileChanged(e) {
      this.files[0].file = e.target.files[0];
      this.images[0].photo = URL.createObjectURL(this.files[0].file);
      if(!!this.files[0].id){
        this.fileRequests[0].file=e.target.files[0]
        this.fileRequests[0].id=this.files[0].id
      }
    },

    getFile(count) {
      switch (count) {
        case 'first':
          return this.$refs.uploaderFirst.click();
        case 'second':
          return this.$refs.uploaderSecond.click();
        case 'third':
          return this.$refs.uploaderThird.click();
        case 'fourth':
          return this.$refs.uploaderFourth.click();
      }
    },

    deleteFile(count) {
      switch (count) {
        case 'first':
          this.files[0].file = null;
          break;
        case 'second':
          this.files[1].file = null;
          break;
        case 'third':
          this.files[2].file = null;

          break;
        case 'fourth':
          this.files[3].file = null;
          this.deleteImages({id:this.files[3].id,modelId:this.$route.params.id})
          break;
      }
    },

    showImage(photo) {
      this.currentImage = photo;
      this.image_dialog = true;
    },

    loadDetails( { item } ) {
      // current opened || choose object ^
    },

    onChangeFile(e) {
      const file = e.target.files[0];
      this.docList.push(file);
    },

    clickImportFile() {
      this.$refs.uploader.click();
    },

    removeImage(e) {
      this.docList = this.docList.filter((item) => item.size !== e);
    },

    addArrivedAccessoryStock() {
      this.title = "New";
      this.new_dialog = true;
    },

    async saveArrivedAccessoryStock() {
    if(this.title === "New") {
      const validate = this.$refs.new_form.validate();
      const {
        specification,
        accessoryName,
        modelNumber,
        orderNumber,
        pricePerUnit,
        pricePerUnitCurrency,
        measurementUnitId,
        remainingQuantity,
        supplierId,
      } = this.arrivedAccessoryStock
      if (validate) {
        const file=this.docList[0]
        const formData= new FormData()
        formData.append("accessoryName", accessoryName),
        formData.append("measurementUnitId", measurementUnitId),
        formData.append("modelNumber", modelNumber),
        formData.append("orderNumber", orderNumber),
        formData.append("pricePerUnit", pricePerUnit),
        formData.append("pricePerUnitCurrency", pricePerUnitCurrency),
        formData.append("remainingQuantity", remainingQuantity),
        formData.append("specification", specification),
        formData.append("supplierId", supplierId?.id)
        if(!!this.files[0]?.file){
          formData.append("file",this.files[0]?.file)
        }
        if(!!file){
          formData.append("document", file)
        }
        await this.createAccessoryStock({ data: formData });
        await this.$refs.new_form.reset();
      }
      this.new_dialog = false;
    }
    },

    editItem( item ) {
      this.title = "Edit";
      this.arrivedAccessoryStock = { ...item };
      this.images[0].photo=""
      if(!!item.filePath){
        this.images[0].photo=item.filePath
      }
      if(!!item.filePath){
          this.files[0].file = item.filePath
      }
      this.arrivedAccessoryStock.measurementUnitId = item.measurementUnitId;
      this.arrivedAccessoryStock.pricePerUnitCurrency = item.pricePerUnit.split( " " )[ 1 ];
      this.arrivedAccessoryStock.pricePerUnit = item.pricePerUnit.split( " " )[ 0 ];
      this.arrivedAccessoryStock.supplierId = {
        id: item.supplierId,
        name: item.supplierName,
      };
      this.new_dialog = true;
    },

    async editArrivedAccessoryStock() {
      if (this.title === "Edit") {
      const edit_validate = this.$refs.new_form.validate();
      const {
        specification,
        accessoryName,
        modelNumber,
        orderNumber,
        id,
        pricePerUnit,
        pricePerUnitCurrency,
        measurementUnitId,
        remainingQuantity,
        supplierId,
      } = this.arrivedAccessoryStock
      if (edit_validate) {
        const file=this?.docList[0]
        const formData= new FormData()
        formData.append("accessoryName", accessoryName),
        formData.append("measurementUnitId", measurementUnitId),
        formData.append("modelNumber", modelNumber),
        formData.append("orderNumber", orderNumber),
        formData.append("pricePerUnit", pricePerUnit),
        formData.append("pricePerUnitCurrency", pricePerUnitCurrency),
        formData.append("id", id),
        formData.append("pricePerUnitCurrency", pricePerUnitCurrency)
        if(!!this.files[0]?.file){
          formData.append("file", this.files[0]?.file)
        }
        if(!!file){
          formData.append("document", file)
        }
        formData.append("remainingQuantity", remainingQuantity),
        formData.append("specification", specification),
        formData.append("supplierId", supplierId.id),
        await this.updateAccessoryStock( { data: formData } );
      }
      this.new_dialog = false;
      }
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
      this.workshopSure_dialog = false;
      const data = {
        id: this.workshop.id,
        modelId: this.workshop.modelId,
        givingQuantity: this.workshop.givingQuantity,
        process: this.workshop.process,
      };
      this.setAccessoryStockToWorkshop( data );
      await this.$refs.workshop_form.reset();
    },

    workshopSureFunc() {
      this.workshopSure_dialog = true;
      this.workshop_dialog = false;
    },

    async subcontractorFunc( item ) {
      this.subcontractor_dialog = true;
      this.subcontractor.id = item.id;
      this.subcontractor.process = item.process;
      this.subcontractor.givingQuantity = item.givingQuantity;
      this.modelNumbers = [ ...item.modelNumber.split( "/" ) ];
    },

    async saveSubcontractor() {
      this.subcontractorSure_dialog = false;
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

    subcontractorSureFunc(){
      this.subcontractorSure_dialog = true;
      this.subcontractor_dialog = false;
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
<style lang="scss" scoped>
.image {
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
}
.update__icon {
  border-radius: 16px;
  position: absolute !important;
  z-index: 10 !important;
  top: 16px;
  right: 10px;
  background-color: #fff;
  padding: 5px;
  &.small {
    padding: 0 2px;
  }
}
.relative {
  position: relative !important;
  width: 100%;
}
.upload-text {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #5570F1;
}

.downloadIconDisable {
  fill: red
}
.big__image {
  background: #F4F5FA;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid #E1E2E9;
}
.default__box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.default__text {
  > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #8B8D97;
    margin-bottom: 7px;
    > span {
      color: #000;
    }
  }
}
</style>
