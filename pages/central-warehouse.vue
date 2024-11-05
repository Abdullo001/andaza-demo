<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :label="$t('centralWarehouse.productName')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.productName"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
             :label="$t('centralWarehouse.department')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.department"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :label="$t('centralWarehouse.supplier')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.supplier"
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
                {{$t('centralWarehouse.reset')}}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
               {{$t('centralWarehouse.save')}}
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
      :items-per-page="itemPerPage"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      @update:page="page"
      @update:items-per-page="size"
      :server-items-length="totalElements"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>{{$t('centralWarehouse.centralWarehouse')}}</div>
            <div>
              <v-btn
                color="#544B99"
                dark
                class="text-capitalize rounded-lg"
                @click="addNewItem"
              >
                <v-icon>mdi-plus</v-icon>
                {{$t('centralWarehouse.addNewItem')}}
              </v-btn>
            </div>
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
                @click="spendFunc(item)"
              >
                <v-img src="/spend-icon.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">Spend</span>
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
          {{$t('centralWarehouse.addProduct')}}
          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" v-model="new_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label"> {{$t('centralWarehouse.productName')}}</div>
                <v-text-field
                  v-model="selectedItem.productName"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  :placeholder="$t('centralWarehouse.productName')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('centralWarehouse.specification') }}</div>
                <v-text-field
                  v-model="selectedItem.specification"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  :placeholder="$t('centralWarehouse.specification')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label"> {{ $t('centralWarehouse.quantity') }}</div>
                  <div class="d-flex align-center">
                    <v-text-field
                      v-model="selectedItem.quantity"
                      class="rounded-lg base rounded-l-lg rounded-r-0"
                      color="#544B99"
                      dense
                      height="44"
                      hide-details
                      outlined
                      :placeholder="0"
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
              <v-col cols="12" lg="6" md="6" sm="6">
                <div class="label">{{ $t("fabricOrderingBox.index.supplier") }}</div>
                <v-combobox
                  v-model="selectedItem.supplierId"
                  :items="partner_enums"
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
                  :placeholder="$t('centralWarehouse.enterPartnerName') "
                  append-icon="mdi-chevron-down"
                  :rules="[formRules.required]"
                  validate-on-blur
                >
                  <template #append>
                    <v-icon color="#544B99">mdi-magnify</v-icon>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <div class="label">{{  $t('centralWarehouse.price') }}</div>
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
                <div class="label">{{ $t('sidebar.department') }}</div>
                <v-combobox
                  v-model="selectedItem.departmentId"
                  :items="departmentList"
                  :search-input.sync="searchDepartment"
                  item-text="name"
                  item-value="departmentId"
                  validate-on-blur
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base d-flex align-center justify-center mr-2"
                  :return-object="true"
                  dense
                  :placeholder="$t('sidebar.department')"
                  prepend-icon=""
                >
                  <template #append>
                    <v-icon class="d-inline-block" color="#544B99">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" lg="12">
                <div class="label"> {{  $t('centralWarehouse.description') }}</div>
                <v-text-field
                  v-model="selectedItem.description"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  :placeholder=" $t('centralWarehouse.description')"
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
            width="163"
            @click="new_dialog = false"
          >
           {{  $t('centralWarehouse.cancel') }}
          </v-btn>
          <v-btn
            v-if="title === 'new'"
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="saveItem"
          >
           {{  $t('centralWarehouse.save') }}
          </v-btn>
          <v-btn
            v-else
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="updateItem"
          >
            Edit
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
          >Delete selected item</v-card-title
        >
        <v-card-text>
          Are you sure you want to Delete selected item?
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

    <v-dialog v-model="history_dialog" max-width="1000">
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
            :items="historyList"
            hide-default-footer
            class="mt-4 rounded-lg"
            style="border: 1px solid #e9eaeb"
          >
            <template #item.date="{item}">
                {{ formatLong(item.date) }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="spend_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            Spend dialog
          </div>
          <v-btn icon color="#544B99" @click="spend_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="spend_form" v-model="new_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">Quantity</div>
                <v-text-field
                  v-model="selectedItem.quantity"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter quantity"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label"> Description</div>
                <v-text-field
                  v-model="selectedItem.description"
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
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#544B99"
            width="163"
            @click="spend_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="saveSpending"
          >
            save
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
      currency_enums:["USD","UZS","RUB"],
      headers: [
        { text: "Id", value: "itemId", sortable: false },
        { text: this.$t('centralWarehouse.productName'), value: "productName", sortable: false },
        { text: this.$t('centralWarehouse.specification'), value: "specification", sortable: false },
        { text: this.$t('centralWarehouse.department'), value: "department", sortable: false },
        { text:this.$t('centralWarehouse.quantity'), value: "quantity", sortable: false },
        { text: this.$t('centralWarehouse.price'), value: "price", sortable: false },
        { text: this.$t('centralWarehouse.currency'), value: "currency", sortable: false },
        { text: this.$t('centralWarehouse.supplier'), value: "supplier", sortable: false },
        { text: this.$t('centralWarehouse.description'), value: "description", sortable: false },
        {
          text:this.$t('centralWarehouse.production'),
          value: "production",
          sortable: false,
          align: "center",
        },
        { text: this.$t('centralWarehouse.action'), value: "actions", sortable: false, align: "center" },
      ],

      historyHeaders: [
        { text: "Date", value: "date", sortable: false },
        { text: "Done by ", value: "doneBy", sortable: false },
        {
          text: "Warehouse operations",
          value: "operationType",
          sortable: false,
        },
        { text: "Quantity", value: "quantity", sortable: false },
        { text: "Description", value: "description", sortable: false },
      ],
      

      filters: {
        department: "",
      },
      partnerName:"",
      searchDepartment:"",
      deletedId:"",
      new_validate:true,
      valid_search:true,

      selectedItem: {
        currency: "USD",
        departmentId: "",
        description: "",
        measurementUnitId: "",
        price: "",
        productName: "",
        quantity: "",
        specification: "",
        supplierId: "",
      },
      title:"new",

      new_dialog:false,
      delete_dialog:false,
      history_dialog:false,
      current_list:[],

      current_page:0,
      itemPerPage:10,
      spend_dialog:false,
      spendingItem:{},
    };
  },

  created() {
    this.getDepartmentList({ page: 0, size: 10 });
    this.getPartnerList({page:0,size:10})
    this.getMeasurementUnit()
  },

  computed: {
    ...mapGetters({
      departmentList: "department/departmentList",
      partner_enums: "partners/partnerList",
      measurementUnitList: "preFinance/measurementUnit",
      warehouseList: "centralWarehouse/warehouseList",
      totalElements: "centralWarehouse/totalElements",
      historyList: "centralWarehouse/historyList",


    }),
  },

  watch: {
    searchDepartment(val){
      this.getDepartmentList({page:0,size:10,name:val})
    },
    warehouseList(val){
      this.current_list=JSON.parse(JSON.stringify(val))
    },

    new_dialog(val){
      if(!val){
        this.$refs.new_form.reset()
      }
    },

    partnerName(val){
      this.getPartnerList({page:0, size:10,partnerName:val});
    }
  },

  methods: {
    ...mapActions({
      getDepartmentList: "department/getDepartmentList",
      getPartnerList: "partners/getPartnerList",
      getMeasurementUnit: "preFinance/getMeasurementUnit",
      createWarehouseItem: "centralWarehouse/createWarehouseItem",
      getWarehouseList: "centralWarehouse/getWarehouseList",
      deleteWarehouseItem: "centralWarehouse/deleteWarehouseItem",
      getHistoryList: "centralWarehouse/getHistoryList",
      updateWarehouseItem: "centralWarehouse/updateWarehouseItem",
      spendWarehouseItem: "centralWarehouse/spendWarehouseItem",

    }),
    async page(value) {},
    async size(value) {},

    addNewItem() {
      this.new_dialog=true
      this.title="new"
    },

    saveItem(){
      const data={...this.selectedItem}
      data.departmentId=this.selectedItem.departmentId?.departmentId
      data.supplierId=this.selectedItem.supplierId?.id
      this.createWarehouseItem(data)

      this.new_dialog=false
    },

    editItem(item) {
      this.title = "edit";
      this.selectedItem={...item}
      this.selectedItem.supplierId={id:item.supplierId,name:item.supplier}
      this.selectedItem.departmentId={departmentId:item.departmentId,name:item.department}
    
      this.new_dialog = true;
    },

    updateItem(){
      const data={...this.selectedItem}
      data.departmentId=this.selectedItem.departmentId?.departmentId
      data.supplierId=this.selectedItem.supplierId?.id
      
      this.updateWarehouseItem({centralWarehouseId:this.selectedItem.itemId,data})

      this.new_dialog=false
    },

    spendFunc(item) {
      this.spendingItem.id = item.itemId;
      this.spend_dialog = true;
    },

    async saveSpending() {
      const data = {
        description:this.spendingItem.description,
        quantity:this.spendingItem.quantity,
      };

      await this.spendWarehouseItem({centralWarehouseId:this.spendingItem.id,data});
      await this.$refs.spend_form.reset();
      this.spend_dialog = false;
    },

    getDeleteItem(item) {
      this.deletedId = item.itemId;
      this.delete_dialog = true;
    },

    deleteItem() {
      this.deleteWarehouseItem(this.deletedId);
      this.delete_dialog = false;
    },

    workshopFunc(item) {
      // this.workshop_dialog = true;
      // this.workshop.fabricWarehouseId = item.id;
      // this.workshop.measurement = item.factReceivedNettoWeight.split(" ")[1];
      // this.modelNumbers = [...item.modelNumber.split("/")];
    },

    async saveWorkshop() {
      // this.workshop_dialog = false;
      // const data = {
      //   modelNumber: this.workshop.modelNumber,
      //   quantity: this.workshop.quantity,
      //   fabricWarehouseId: this.workshop.fabricWarehouseId,
      // };
      // this.setFabricToWorkshop(data);
      // await this.$refs.workshop_form.reset();
    },

    async saveSubcontractor() {
      // this.subcontractor_dialog = false;
      // const data = {
      //   modelNumber: this.subcontractor.modelNumber,
      //   quantity: this.subcontractor.quantity,
      //   fabricWarehouseId: this.subcontractor.fabricWarehouseId,
      //   partnerId: this.subcontractor.partnerId,
      // };
      // this.setFabricToSubcontract(data);
      // await this.$refs.subcontractor_form.reset();
    },

    async subcontractorFunc(item) {
      // this.subcontractor_dialog = true;
      // this.subcontractor.measurement =
      //   item.factReceivedNettoWeight.split(" ")[1];
      // this.subcontractor.fabricWarehouseId = item.id;
      // this.modelNumbers = [...item.modelNumber.split("/")];
    },

    getHistory(item) {
      this.history_dialog = true;
      this.getHistoryList(item.itemId)
    },

    filterData() {
      this.getWarehouseList({
        ...this.filters,
        page:this.current_page,
        size:this.itemPerPage,
      });
    },
    async resetFilters() {
      await this.getWarehouseList({
        page:this.current_page,
        size:this.itemPrePage,
      });
      await this.$refs.filter_form.reset();
    },
  },

  mounted() {
    this.getWarehouseList({page:0,size:10})
  },
};
</script>
<style lang="scss"></style>
