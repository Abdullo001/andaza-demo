<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
               :label="$t('fabricWarehouse.sipNumber')"
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
              :label="$t('prefinances.child.modelNumber')"
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
              :label="$t('fabricOrderingBox.plannedAccessoryOrderBox.supplierName')"
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
                color="#544B99"
                elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                {{$t('fabricWarehouse.reset') }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{$t('fabricWarehouse.search') }}
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
            <div> {{$t('fabricWarehouse.fabricStock') }}</div>
            <v-btn
              color="#544B99"
              dark
              class="text-capitalize rounded-lg"
              @click="addArrivedFabricStock"
            >
              <v-icon>mdi-plus</v-icon>
              {{$t('fabricWarehouse.fabricStock') }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.production="{ item }">
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
                @click="workshopFunc(item)"
              >
                <v-img src="/cut-icon.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">Workshop</span>
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
           {{ $t('fabricStockBox.newFabricStock') }}
          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" v-model="new_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label"> {{ $t('fabricStockBox.artNumber') }}</div>
                <v-text-field
                  v-model="arrivedFabricStock.sipNumber"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  :placeholder="$t('fabricStockBox.artNumber')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{$t('fabricStockBox.batchNumber')}}</div>
                <v-text-field
                  v-model="arrivedFabricStock.batchNumber"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  :placeholder="$t('fabricStockBox.batchNumber')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('fabricStockBox.orderNumber') }}</div>
                <v-text-field
                  v-model="arrivedFabricStock.orderNumber"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  :placeholder=" $t('fabricStockBox.orderNumber') "
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{  $t('fabricStockBox.modelNumber')  }}</div>
                <v-text-field
                  v-model="arrivedFabricStock.modelNumber"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  height="44"
                  dense
                  color="#544B99"
                  :placeholder=" $t('fabricStockBox.modelNumber')"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{  $t('fabricStockBox.supplierName') }}</div>
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
                  color="#544B99"
                  dense
                  :placeholder=" $t('fabricStockBox.supplierName')"
                  append-icon="mdi-chevron-down"
                  validate-on-blur
                >
                  <template #append>
                    <v-icon color="#544B99">mdi-magnify</v-icon>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{  $t('fabricStockBox.fabricSpecification') }}</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="arrivedFabricStock.fabricSpecification"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  :placeholder="$t('fabricStockBox.fabricSpecification')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('fabricStockBox.color') }}</div>
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
                  :placeholder="$t('fabricStockBox.color') "
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('fabricStockBox.pantone')  }}</div>
                <div class="d-flex align-center">
                  <v-text-field
                    height="44"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    color="#544B99"
                    v-model="arrivedFabricStock.pantoneCode"
                    outlined
                    hide-details
                    dense
                    :placeholder="$t('fabricStockBox.pantone')"
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
                    color="#544B99"
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('fabricStockBox.remainingQuantity') }}</div>
                <div class="d-flex align-center">
                  <v-text-field
                    height="44"
                    class="rounded-lg base rounded-l-lg"
                    color="#544B99"
                    v-model="arrivedFabricStock.remainingQuantity"
                    outlined
                    hide-details
                    dense
                    :placeholder=" $t('fabricStockBox.remainingQuantity') "
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{  $t('fabricStockBox.pricePerUnit') }}</div>
                <div class="d-flex align-center">
                  <v-text-field
                    height="44"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    color="#544B99"
                    v-model="arrivedFabricStock.pricePerUnit"
                    outlined
                    hide-details
                    dense
                    :placeholder=" $t('fabricStockBox.pricePerUnit')"
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
                    color="#544B99"
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
            color="#544B99"
            width="163"
            @click="new_dialog = false"
          >
           {{ $t('fabricStockBox.cancel')}}
          </v-btn>
          <v-btn
            v-if="title === 'New'"
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="saveArrivedFabricStock"
          >
           {{ $t('fabricStockBox.save')}}
          </v-btn>
          <v-btn
            v-else
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
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
          <v-btn icon color="#544B99" @click="workshop_dialog = false">
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
                    <v-icon class="d-inline-block" color="#544B99">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
              </v-col>

              <v-col cols="12">
                <div class="label">As a new row</div>
                <v-checkbox
                  v-model="workshop.isNew"
                  outlined
                  hide-details
                  color="#544B99"
                />
              </v-col>

              <v-col cols="12">
                <div class="label">Sip №</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="workshop.sipNumber"
                  :disabled="workshop.isNew"
                  :rules="[formRules.required]"
                  :items="processDetails"
                  item-text="sipNumber"
                  item-value="id"
                  hide-details
                  color="#544B99"
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
                  color="#544B99"
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
            color="#544B99"
            width="130"
            @click="workshop_dialog = false"
          >
            cancel
          </v-btn>

          <v-btn
            v-if="workshop.isNew"
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="saveWorkshop"
          >
            save
          </v-btn>

          <v-btn
            v-else
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="workshopSureFunc"
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
          <v-btn icon color="#544B99" @click="subcontractor_dialog = false">
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
                    <v-icon class="d-inline-block" color="#544B99">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>

              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="subcontractor.isNew"
                  outlined
                  label="As a new row"
                  hide-details
                  color="#544B99"
                />
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
                  color="#544B99"
                  class="base rounded-lg"
                  rounded
                  :disabled="subcontractor.isNew"
                  outlined
                  dense
                  placeholder="Select Sip №"
                />
              </v-col>

              <v-col cols="12">
                <div class="label">Partner</div>
                <v-combobox
                  v-if="subcontractor.isNew"
                  v-model="subcontractor.partnerId"
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
                <v-select
                  v-else
                  append-icon="mdi-chevron-down"
                  v-model="subcontractor.partnerId"
                  :items="partnerList"
                  :rules="[formRules.required]"
                  item-text="name"
                  item-value="id"
                  hide-details
                  color="#544B99"
                  class="base rounded-lg"
                  rounded
                  :disabled="subcontractor.isNew"
                  outlined
                  dense
                  placeholder="Select partner name"
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
                  color="#544B99"
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
            color="#544B99"
            width="130"
            @click="subcontractor_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            v-if="subcontractor.isNew"
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="saveSubcontractor"
          >
            save
          </v-btn>

          <v-btn
            v-else
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="subcontractorSureFunc"
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

    <v-dialog v-model="workshopSure_dialog" max-width="450">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40" />
        </div>
        <v-card-title class="d-flex justify-center font-weight-bold"
          >Are you sure ?</v-card-title
        >
        <v-card-text>
          Giving the current fabric to
        </v-card-text>
        <v-card-text>
          <div>
           <span class="font-weight-bold"> Fabric specification:</span>
            {{ selectedProcess.fabricSpecification }}
          </div>
        </v-card-text>
        <v-card-text>
          <div>
            <span class="font-weight-bold" >Color:</span> {{ selectedProcess.color }}
          </div>
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
          Giving the current fabric to
        </v-card-text>
        <v-card-text>
          <div>
           <span class="font-weight-bold"> Fabric specification:</span>
            {{ selectedProcess.fabricSpecification }}
          </div>
        </v-card-text>
        <v-card-text>
          <div>
            <span class="font-weight-bold" >Color:</span> {{ selectedProcess.color }}
          </div>
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      headers: [
        { text: this.$t('fabricWarehouse.sipNumber'), value: "sipNumber", sortable: false },
        { text:this.$t('fabricWarehouse.batchNumber'), value: "batchNumber", sortable: false },
        { text: this.$t('fabricWarehouse.orderNumber'), value: "orderNumber", sortable: false },
        { text: this.$t('prefinances.child.modelNumber'), value: "modelNumber", sortable: false },
        { text: this.$t('samplesBox.sampleTabs.fabricSupplierName'), value: "supplierName", sortable: false },
        { text: this.$t('fabricWarehouse.fabricSpecification'), value: "fabricSpecification", sortable: false, width: 200 },
        { text: this.$t('fabricWarehouse.color'), value: "color", sortable: false },
        { text: this.$t('fabricWarehouse.remainingQuantity'), value: "remainingQuantity", sortable: false },
        { text:this.$t('fabricWarehouse.pricePerUnit'), value: "pricePerUnit", sortable: false, align: "center" },
        { text: this.$t('fabricWarehouse.totalPrice'), value: "totalPrice", sortable: false },
        { text: this.$t('fabricWarehouse.production'), value: "production", sortable: false, align: "center" },
        { text: this.$t('fabricWarehouse.action'), value: "actions", sortable: false, align: "center" },
      ],
      enums: ["TPX", "TCX", "TPG", "C", "MELANGE"],
      priceEnums: ["USD", "UZS", "RUB"],
      valid_search: "",
      supplierName: "",
      new_validate: true,
      workshop_validate: true,
      subcontractor_validate: true,
      new_dialog: false,
      delete_dialog: false,
      workshop_dialog: false,
      subcontractor_dialog: false,
      workshopSure_dialog: false,
      subcontractorSure_dialog: false,
      title: "",
      arrivedFabricStock: {},
      selectedProcess:{},
      workshopProccessId: null,
      subcontractorProcessId: null,
      workshop: {
        id: null,
        batchNumber: "",
        sipNumber: "",
        color: null,
        fabricSpecification: null,
        modelId: null,
        processDetailId: null,
        quantity: null,
        isNew: false
      },

      subcontractor: {
        id: 0,
        batchNumber: "",
        color: null,
        fabricSpecification: null,
        isNew: false,
        modelId: null,
        partnerId: null,
        processDetailId: null,
        quantity: null,
        sipNumber: ""
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
      if (val && val.id) {
        this.workshopProccessId = val.id;
        this.workshop.modelId = this.workshopProccessId;
        this.getFabricProcessDetails({ id: this.workshopProccessId, isForSubcontractor: false });
      }
    },
    "subcontractor.modelNumber"(val) {
      if (val && val.id) {
        this.subcontractor.modelId = val.id;
        this.getFabricProcessDetails({ id: val.id, isForSubcontractor: true });
      }
    },
    "workshop.sipNumber"(id) {
      this.workshop.processDetailId = id;
    },
    "subcontractor.sipNumber"(id) {
      if (typeof this.subcontractor.sipNumber === "number") {
        this.getPartnerListFunc(id);
      }
      this.subcontractor.processDetailId = id;
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
      this.workshop.color = item.color;
      this.workshop.fabricSpecification = item.fabricSpecification;
      if(item.sipNumber) {
        this.workshop.sipNumber = item.sipNumber
      }else {
        this.workshop.sipNumber = ''
      }
      if(item.batchNumber) {
        this.workshop.batchNumber = item.batchNumber
      }else {
        this.workshop.batchNumber = ''
      }
      this.workshop.id = item.id;
    },

    workshopSureFunc() {
      this.workshop_dialog = false;
      this.workshopSure_dialog = true;
      this.processDetails.forEach((item)=>{
        if(item.id===this.workshop.processDetailId){
          this.selectedProcess={...item}
        }
      })
    },

    async saveWorkshop() {
      this.workshop.isNew ? this.workshop_dialog = false : this.workshopSure_dialog = false;
      const data = {
        id: this.workshop.id,
        quantity: this.workshop.quantity,
        batchNumber: this.workshop.isNew ? this.workshop.batchNumber : undefined,
        sipNumber: this.workshop.isNew ? this.workshop.sipNumber : undefined,
        color: this.workshop.isNew ? this.workshop.color : undefined,
        fabricSpecification: this.workshop.isNew ? this.workshop.fabricSpecification : undefined,
        processDetailId: !this.workshop.isNew ? this.workshop.processDetailId : undefined,
        modelId: this.workshop.isNew ? this.workshop.modelId : undefined,
        isNew: this.workshop.isNew ? this.workshop.isNew : this.workshop.isNew = false,
      }
      this.setFabricStockToWorkshop(data);
      await this.$refs.workshop_form.reset();
    },

    async subcontractorFunc(item) {
      this.subcontractor_dialog = true;
      this.subcontractor.color = item.color;
      this.subcontractor.fabricSpecification = item.fabricSpecification;
      if(item.sipNumber) {
        this.subcontractor.sipNumber = item.sipNumber
      }else {
        this.subcontractor.sipNumber = ''
      }
      if(item.batchNumber) {
        this.subcontractor.batchNumber = item.batchNumber
      }else {
        this.subcontractor.batchNumber = ''
      }
      this.subcontractor.id = item.id;
    },

    subcontractorSureFunc(){
      this.subcontractor_dialog = false;
      this.subcontractorSure_dialog = true;
      this.processDetails.forEach((item)=>{
        if(item.id===this.subcontractor.processDetailId){
          this.selectedProcess={...item}
        }
      })
    },

    async saveSubcontractor() {
      this.subcontractor.isNew ? this.subcontractor_dialog = false : this.subcontractorSure_dialog = false;
      const data = {
        id: this.subcontractor.id,
        quantity: this.subcontractor.quantity,
        batchNumber: this.subcontractor.isNew ? this.subcontractor.batchNumber : undefined,
        sipNumber: this.subcontractor.isNew ? this.subcontractor.sipNumber : undefined,
        color: this.subcontractor.isNew ? this.subcontractor.color : undefined,
        fabricSpecification: this.subcontractor.isNew ? this.subcontractor.fabricSpecification : undefined,
        processDetailId: !this.subcontractor.isNew ? this.subcontractor.processDetailId : undefined,
        partnerId:  this.subcontractor.partnerId,
        modelId: this.subcontractor.isNew ? this.subcontractor.modelId : undefined,
        isNew: this.subcontractor.isNew ? this.subcontractor.isNew : this.subcontractor.isNew = false,
      };
      if(typeof this.subcontractor.partnerId==='object'){
        data.partnerId=  this.subcontractor.partnerId?.id

      }
      await this.setFabricStockToSubcontract(data);
      await this.$refs.subcontractor_form.reset();
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
