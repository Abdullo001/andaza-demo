<template >
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card
    color="#fff"
    elevation="0"
    class="rounded-t-lg pb-4 mb-4"
    >
      <v-card-title>
        <div>
          Accessory warehouse
          <v-chip color="#10BF41" dark class="font-weight-bold ml-5">{{stateStatus}}</v-chip>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-form lazy-validation v-model="valid_search" ref="filter_form" >
        <v-row class="mx-0 px-0 mb-2 mt-4  pa-4 w-full" justify="start">
          <v-col cols="12" lg="3" md="3">
            <div class="label">Order number</div>
              <v-combobox
                v-model="filters.orderId"
                :items="ordersList"
                item-text="orderNumber"
                item-value="id"
                :disabled="stateStatus==='Edit'"
                :search-input.sync="orderNumber"
                outlined
                hide-details
                height="44"
                class="rounded-lg base d-flex align-center justify-center mb-4"
                :return-object="true"
                color="#7631FF"
                dense
                placeholder="Enter order number"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#7631FF">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">Model number</div>
              <v-combobox
                v-model="filters.modelId"
                :items="modelsList"
                item-text="modelNumber"
                item-value="id"
                :disabled="stateStatus==='Edit'"
                :search-input.sync="modelNumber"
                outlined
                hide-details
                height="44"
                class="rounded-lg base d-flex align-center justify-center mb-4"
                :return-object="true"
                color="#7631FF"
                dense
                placeholder="Enter model number"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#7631FF">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">Planned at</div>
              <v-text-field
                placeholder="Planned at"
                outlined
                hide-details
                height="44"
                class="rounded-lg base mb-4"
                validate-on-blur
                dense
                color="#7631FF"
                background-color="#F8F4FE"
                readonly
                disabled
                v-model="filters.plannedAt"

              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">Planned by</div>
            <v-text-field
              placeholder="creator"
              outlined
              hide-details
              height="44"
              class="rounded-lg base mb-4"
              validate-on-blur
              dense
              color="#7631FF"
              background-color="#F8F4FE"
              readonly
              disabled
              v-model="filters.plannedBy"

            />
          </v-col>


        </v-row>

        <div class="d-flex  justify-end mr-3  ">
          <v-btn
              height="44"
              width="133"
              color="#7631FF"
              :dark="stateStatus!=='Edit'"
              class="text-capitalize rounded-lg font-weight-bold"
              @click="search"
              :disabled="stateStatus==='Edit'"
            >
              Search
            </v-btn>
        </div>
      </v-form>
    </v-card>

    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="accessoryList"
      :items-per-page="10"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
    >

      <template #item.deliveredQuantity="{item}">
        <v-text-field
          outlined
          hide-details
          height="32"
          class="rounded-lg base my-2" dense
          :rules="[formRules.required]"
          @keydown.enter="setDeliviredQuantity(item)"
          validate-on-blur
          color="#7631FF"
          v-model="item.deliveredQuantity"
        />
      </template>

      <template #item.actions="{item}">
        <div class="d-flex ">

          <v-btn icon color="red" @click="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27"/>
          </v-btn>
        </div>
      </template>

      <template #item.spending="{item}">
        <div class="d-flex ">
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
                @click="spendFunc(item)"
              >
                <v-img src="/spend-icon.svg" max-width="22"/>
              </v-btn>
            </template>
            <span class="text-capitalize">Spend</span>
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
                @click="getHistory(item)"
              >
              <v-img src="/history.svg" max-width="20"/>
              </v-btn>
            </template>
            <span class="text-capitalize">History</span>
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
                @click="workshopFunc(item)"
              >
                <v-img src="/cut-icon.svg" max-width="22"/>
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
                <v-img src="/bag-icon.svg" max-width="22"/>
              </v-btn>
            </template>
            <span class="text-capitalize">subcontractor</span>
          </v-tooltip>
        </div>
      </template>

    </v-data-table>
    <div class="d-flex mt-4">
      <v-spacer />
      <v-btn
        class="text-capitalize rounded-lg font-weight-bold"
        color="#7631FF"
        dark
        height="44"
        width="133"
        @click="saveAccessory"
      >
        save
      </v-btn>
    </div>

    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete fabric warehouse row</v-card-title>
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
          <v-spacer/>
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

    <v-dialog v-model="spend_dialog" width="500">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Spending fabric</div>
          <v-btn icon color="#7631FF" @click="spend_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="spend_form" v-model="spend_validate" lazy-validation>
            <v-row class="mx-0 px-0 mb-2 mt-4  pa-4 w-full" justify="start">
              <v-col cols="12" lg="6" md="3">
                <div class="label">Order number</div>
                  <v-combobox
                    v-model="spend.orderId"
                    :items="ordersListSpend"
                    item-text="orderNumber"
                    item-value="id"
                    :search-input.sync="orderNumberSpend"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base d-flex align-center justify-center mb-4"
                    :return-object="true"
                    color="#7631FF"
                    dense
                    placeholder="Enter order number"
                    prepend-icon=""
                  >
                    <template #append>
                      <v-icon class="d-inline-block" color="#7631FF">
                        mdi-magnify
                      </v-icon>
                    </template>
                  </v-combobox>
              </v-col>
              <v-col cols="12" lg="6" md="3">
                <div class="label">Model number</div>
                  <v-combobox
                    v-model="spend.modelId"
                    :items="modelsListSpend"
                    item-text="modelNumber"
                    item-value="id"
                    :search-input.sync="modelNumberSpend"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base d-flex align-center justify-center mb-4"
                    :return-object="true"
                    color="#7631FF"
                    dense
                    placeholder="Enter model number"
                    prepend-icon=""
                  >
                    <template #append>
                      <v-icon class="d-inline-block" color="#7631FF">
                        mdi-magnify
                      </v-icon>
                    </template>
                  </v-combobox>
              </v-col>
              <v-col cols="12" lg="6" md="3">
                <div class="label">Accessory</div>
                  <v-combobox
                    v-model="spend.accessoryIdTo"
                    :items="accessoriesSpendList"
                    item-text="name"
                    item-value="planningOrderId"
                    :search-input.sync="accessoryName"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base d-flex align-center justify-center mb-4"
                    :return-object="true"
                    color="#7631FF"
                    dense
                    placeholder="Enter accessory"
                    prepend-icon=""
                  >
                    <template #append>
                      <v-icon class="d-inline-block" color="#7631FF">
                        mdi-magnify
                      </v-icon>
                    </template>
                  </v-combobox>
              </v-col>
              <v-col cols="12" lg="6" md="3">
                <div class="label">Specification</div>
                <v-combobox
                    v-model="spend.accessoryIdTo"
                    :items="accessoriesSpendList"
                    item-text="specification"
                    item-value="planningOrderId"
                    outlined
                    disabled
                    hide-details
                    height="44"
                    class="rounded-lg base d-flex align-center justify-center mb-4"
                    :return-object="true"
                    color="#7631FF"
                    dense
                    placeholder="Enter accessory"
                    prepend-icon=""
                  >
                    <template #append>
                      <v-icon class="d-inline-block" color="#7631FF">
                        mdi-magnify
                      </v-icon>
                    </template>
                  </v-combobox>
              </v-col>
              <v-col cols="12" lg="6" md="3">
                <div class="label">Spending quantity</div>
                <v-text-field
                outlined
                hide-details
                height="44"
                class="rounded-lg base my-2" dense
                :rules="[formRules.required]"
                validate-on-blur
                placeholder="Enter spending quantity"
                color="#7631FF"
                v-model="spend.spendingQuantity"
              />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#7631FF"
            width="130"
            @click="spend_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="130"
            @click="saveSpending"
          >
            save
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="history_dialog" max-width="800">
      <v-card flat>
        <v-card-title>
          <div class="title">History</div>
          <v-spacer/>
          <v-btn
            icon
            @click="history_dialog=false"
            color="#7631FF"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="historyHeaders"
            :items="historyList"
            :items-per-page="-1"
            hide-default-footer
            class="mt-4 rounded-lg"
            style="border: 1px solid #E9EAEB"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="workshop_dialog" width="500">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Accessory giving to own workshop</div>
          <v-btn icon color="#7631FF" @click="workshop_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="workshop_form" v-model="workshop_validate" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-radio-group
                  row
                  v-model.trim="selectedItem.process"
                  class="mb-4"
                >
                  <v-radio
                    :aria-disabled="selectedItem.status==='edit_history'"
                    color="#7631FF"
                    label="Sewing"
                    value="SEWING"
                  ></v-radio>
                  <v-radio
                    color="#7631FF"
                    label="Packaging"
                    value="PACKAGING"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12">
                <div class="label">Quantity</div>
                <v-text-field
                :rules="[formRules.required]"
                v-model="selectedItem.quantity"
                outlined
                hide-details
                dense
                class="rounded-lg base "
                placeholder="Enter giving quantity"
                color="#7631FF"
              />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#7631FF"
            width="130"
            @click="workshop_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="130"
            @click="saveWorkshop"
          >
            save
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="subcontract_dialog" width="500">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Accessory giving to own workshop</div>
          <v-btn icon color="#7631FF" @click="subcontract_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="subcontractor_form" v-model="workshop_validate" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-radio-group
                  row
                  v-model.trim="subcontractor.process"
                  class="mb-4"
                >
                  <v-radio
                    color="#7631FF"
                    label="Sewing"
                    value="SEWING"
                  ></v-radio>
                  <v-radio
                    color="#7631FF"
                    label="Packaging"
                    value="PACKAGING"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="6" >
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
                  class=" base rounded-lg"
                  rounded
                  outlined
                  dense
                  placeholder="Select partner"
                />
              </v-col>
              <v-col cols="6">
                <div class="label">Quantity</div>
                <v-text-field
                :rules="[formRules.required]"
                v-model="subcontractor.quantity"
                outlined
                hide-details
                dense
                class="rounded-lg base "
                placeholder="Enter giving quantity"
                color="#7631FF"
              />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#7631FF"
            width="130"
            @click="subcontract_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="130"
            @click="saveSubcontract"
          >
            save
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>

    
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import Breadcrumbs from "../../components/Breadcrumbs.vue";

export default {
  components: {
    Breadcrumbs
  },
  data(){
    return{
      stateStatus:"Add",
      orderNumber:"",
      modelNumber:"",
      orderNumberSpend:"",
      modelNumberSpend:"",
      valid_search:"",
      delete_dialog:"",
      spend_dialog:"",
      accessoryName:"",
      spend_validate:true,
      history_dialog:false,
      filters:{
        orderId:null,
        modelId:null,
        createdBy:"",
        createdAt:"",
      },

      map_links: [
        {
          text: "Home",
          disabled: false,
          to: "/",
          icon: true,
        },
        {
          text: "Accessory-warehouse",
          disabled: false,
          to: "/accessory-warehouse",
          icon: true,
        },
        {
          text: "Add arrived accessory-warehouse",
          disabled: true,
          to: "/accessory-warehouse/7",
          icon: false,
        },
      ],

      spend:{
        idFrom:null,
        modelId:null,
        orderId:null,
        accessoryIdTo:null,
        spendingQuantity:null,
      },
      selectedItem:null,

      headers:[
        {text: "Accessory name", value: "name", sortable: false},
        {text: "Specification", value: "specification", sortable: false},
        {text: "Ordered quantity", value: "orderedQuantity", sortable: false},
        {text: "Delivered fact quantity", value: "deliveredQuantity", sortable: false},
        {text: "Spent quantity", value: "spentQuantity", sortable: false},
        {text: "Remaining quantity", value: "remainingQuantity", sortable: false},
        {text: "Price per unit", value: "perUnitPrice", sortable: false},
        {text: "Total price", value: "totalPrice", sortable: false},
        {text: "Supplier name", value: "supplier", sortable: false},
        {text: "Ordered date", value: "orderedDate", sortable: false},
        {text: "Spending", value: "spending", sortable: false},
        {text: "Actions", value: "actions", sortable: false},

      ],
      selectedItem:{},

      accessoryList:[],
      workshop_validate:true,
      workshop_dialog:false,
      subcontract_dialog:false,
      subcontractor:{
        partnerId:null,
      },

      historyHeaders:[
        {text: "Date", value: "createdAt", sortable: false},
        {text: "Quantity", value: "quantity", sortable: false},
        {text: "M/U", value: "measurementUnit", sortable: false},
        {text: "Done by ", value: "createdBy", sortable: false},
      ],
      historyList:[],
    }
  },

  created(){
    this.getPartnerList()
  },

  computed:{
    ...mapGetters({
      ordersList:"accessoryWarehouse/ordersList",
      ordersListSpend:"accessoryWarehouse/ordersListSpend",
      modelsList:"accessoryWarehouse/modelsList",
      modelsListSpend:"accessoryWarehouse/modelsListSpend",
      accessoriesDetailList:"accessoryWarehouse/accessoriesDetailList",
      accessoriesSpendList:"accessoryWarehouse/accessoriesSpendList",
      editDates:"accessoryWarehouse/editDates",
      historyServerList:"accessoryWarehouse/historyList",
      partnerList:"subcontracts/partnerList",
    })
  },

  watch:{
    editDates:{
      deep:true,
      immediate:true,

      handler(val){
        const id = this.$route.params.id
        this.orderNumber=val.orderNumber
        this.modelNumber=val.modelNumber
        this.filters.plannedAt=val.plannedAt
      this.filters.plannedBy=val.plannedBy
        this.filters.orderId={id:id,orderNumber:val.orderNumber}
        this.filters.modelId={id:val.modelId,modelNumber:val.modelNumber}
        if(id!=="add-accessory-warehouse"){
          this.searchAccessory({orderId:id,modelId:val.modelId})
        }
      }
    },
    orderNumber(val){
      if(!!val && val !== ''){
        this.getOrdersList({name: val});
      }
    },
    orderNumberSpend(val){
      if(!!val && val !== ''){
        this.getOrdersListSpend({name:val});
      }
    },

    "filters.orderId"(val){
      if(!!val && val !== ''){
        this.getModelsList(val.id)
      }
    },
    "spend.orderId"(val){
      if(!!val && val !== ''){
        this.getModelsListSpend(val.id)
      }
    },


    "spend.modelId"(val){
      if(!!val && val !== ''){
        if(!!this.spend.orderId && this.spend.orderId !== ''){
          this.searchSpendAccessory({orderId:this.spend.orderId.id,modelId:val.id})
        }
      }
    },

    accessoriesDetailList(val){
      this.accessoryList=JSON.parse(JSON.stringify(val))
    },

    historyServerList(list){
      this.historyList = JSON.parse(JSON.stringify(list))
    }
    
  },

  methods:{
    ...mapActions({
      getOrdersList:"accessoryWarehouse/getOrdersList",
      getModelsList:"accessoryWarehouse/getModelsList",
      searchAccessory:"accessoryWarehouse/searchAccessory",
      setDelivered:"accessoryWarehouse/setDeliveredQuantity",
      createAccessoryWarehouse:"accessoryWarehouse/createAccessoryWarehouse",
      deleteAccessory:"accessoryWarehouse/deleteAccessory",
      searchSpendAccessory:"accessoryWarehouse/searchSpendAccessory",
      spendAccessory:"accessoryWarehouse/spendAccessory",
      getOrdersListSpend:"accessoryWarehouse/getOrdersListSpend",
      getModelsListSpend:"accessoryWarehouse/getModelsListSpend",
      giveOwn:"accessoryWarehouse/giveOwn",
      getHistoryList:"accessoryWarehouse/getHistoryList",
      giveSubcontractor:"accessoryWarehouse/giveSubcontractor",
      getPartnerList:"subcontracts/getPartnerList",

    }),

    search(){
      this.searchAccessory({orderId:this.filters.orderId.id,modelId:this.filters.modelId.id})
    },

    setDeliviredQuantity(item){
      const data={
        warehouseId:item.warehouseId,
        deliveredQuantity:item.deliveredQuantity
      }
      this.setDelivered({data,modelId:this.filters.modelId?.id,orderId:this.filters.orderId?.id})
    },

    saveAccessory(){
      this.createAccessoryWarehouse({modelId:this.filters.modelId.id,orderId:this.filters.orderId.id})
    },

    spendFunc(item){
      this.spend_dialog=true
      this.spend.idFrom=item.planningOrderId
    },

    async saveSpending(){
      const data={
        idFrom:this.spend.idFrom,
        modelIdTo:this.spend.modelId.id,
        orderIdTo:this.spend.orderId.id,
        accessoryIdTo:this.spend.accessoryIdTo.planningOrderId,
        spendingQuantity:this.spend.spendingQuantity,
      }
      await this.spendAccessory({data,modelId:this.filters.modelId?.id,orderId:this.filters.orderId?.id})
      await this.$refs.spend_form.reset()
      this.spend_dialog=false
    },

    getDeleteItem(item){
      this.selectedItem=item.planningOrderId
      this.delete_dialog=true
    },

    deleteItem(){
      if(id!=="add-accessory-warehouse"){
        this.deleteAccessory({planningOrderId:this.selectedItem,modelId:this.filters.modelId.id,orderId:this.filters.orderId.id})
      }
      else{
        this.deleteAccessory({planningOrderId:this.selectedItem,modelId:this.filters.modelId.id,orderId:this.filters.orderId.id})
      }
      this.delete_dialog=false
    },
    getHistory(item){
      this.history_dialog=true
      this.getHistoryList(item.warehouseId)
    },
    workshopFunc(item){
      this.workshop_dialog=true
      this.selectedItem={...item}
    },
    async saveWorkshop(){
      const data={
        process:this.selectedItem.process,
        quantity:this.selectedItem.quantity,
        warehouseId:this.selectedItem.warehouseId,
      }
      await this.giveOwn({data,modelId:this.filters.modelId?.id,orderId:this.filters.orderId?.id})
      this.workshop_dialog=false

      await this.$refs.workshop_form.reset()
    },
    subcontractorFunc(item){
      this.subcontractor.warehouseId=item.warehouseId
      this.subcontract_dialog=true
    },

    async saveSubcontract(){
      const data={...this.subcontractor}
      await this.giveSubcontractor({data,modelId:this.filters.modelId?.id,orderId:this.filters.orderId?.id})
      this.subcontract_dialog=false
      await this.$refs.subcontractor_form.reset()
    },

  },

  mounted() {
    this.getOrdersList({name: ""});
    this.getOrdersListSpend({name: ""});
    const id=this.$route.params.id
    if(id!=="add-accessory-warehouse"){
      this.stateStatus="Edit"

    }else{
      this.filters.orderId=null
      this.filters.modelId=null
      this.stateStatus="New"
    }

  },
}
</script>
<style lang="">

</style>
