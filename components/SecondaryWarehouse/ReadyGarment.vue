<template >
  <div>
    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="itemsList"
      :items-per-page="20"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      hide-default-footer
    >
    <template #top>
      <v-toolbar elevation="0">
        <v-toolbar-title
          class="d-flex w-full align-center justify-space-between"
        >
          <div> {{$t('readyWarehouse.addReadyGarment.readyGarments')}}</div>
          <div>
            <v-btn color="#544B99" dark class="text-capitalize rounded-lg" @click="addGarment">
              <v-icon>mdi-plus</v-icon>
             {{$t('readyWarehouse.addReadyGarment.title')}}
            </v-btn>
          </div>
        </v-toolbar-title>
      </v-toolbar>
    </template>

    <template #item.sizes="{ item }">
      <table style="width: 100% !important">
        <thead>
          <tr>
            <th
              class="mr-2"
              v-for="(el, idx) in item.sizeDistributions"
              :key="`${item.modelNumber}-${el.size}-${idx}`"
            >
              {{ el.size }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              v-for="(el, idx) in item.sizeDistributions"
              :key="`${item.modelNumber}` + `${el.size}` + `${idx}`"
            >
              {{ el.quantity }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>

    <template #item.action="{item}">
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
              <v-img src="/truck.svg" max-width="22" />
            </v-btn>
          </template>
          <span class="text-capitalize">Spend</span>
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
              @click="editFunc(item)"
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
              @click="deleteFunc(item)"
            >
              <v-img src="/delete.svg" max-width="27" />
            </v-btn>
          </template>
          <span class="text-capitalize">Delete</span>
        </v-tooltip>

      </div>
    </template>
    </v-data-table>

    <v-dialog max-width="900" v-model="newDialog">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between mb-6">
          <div class="title text-capitalize">{{$t('readyWarehouse.addReadyGarment.title')}}</div>
          <v-btn icon color="#544B99" @click="newDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="new_form" v-model="add_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">{{$t('readyWarehouse.addReadyGarment.modelNo')}}</div>
                <v-combobox
                  v-model="addition.modelNumber"
                  :items="modelsList"
                  :search-input.sync="modelNumSearch"
                  item-text="modelNumber"
                  item-value="modelNumber"
                  validate-on-blur
                  outlined
                  color="#544B99"
                  hide-details
                  height="44"
                  class="rounded-lg base d-flex align-center justify-center mr-2"
                  :return-object="true"
                  dense
                  :placeholder="$t('readyWarehouse.addReadyGarment.modelNo')"
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
                <div class="label">{{ $t('readyWarehouse.addReadyGarment.goodAndProductsName') }}</div>
                <v-text-field
                  v-model="addition.name"
                  class="rounded-lg base mb-4"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  :placeholder="$t('readyWarehouse.addReadyGarment.goodAndProductsName')"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('readyWarehouse.addReadyGarment.color') }}</div>
                <v-select
                  :items="colorList"
                  v-model="addition.colorSpecification"
                  :placeholder="$t('readyWarehouse.addReadyGarment.color')"
                  dense
                  outlined
                  height="44"
                  hide-details
                  color="#544B99"
                  validate-on-blur
                  class="rounded-lg base mr-2"
                  append-icon="mdi-chevron-down"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('readyWarehouse.addReadyGarment.totalQuantity') }}</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="addition.totalQuantity"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    :placeholder="$t('readyWarehouse.addReadyGarment.totalQuantity') "
                    validate-on-blur
                  />
                  <v-select
                    v-model="addition.measurementUnitId"
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
                <div class="label">{{ $t('readyWarehouse.addReadyGarment.outsourcePrice')  }}</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="addition.price"
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
                    v-model="addition.currency"
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
                <div class="label">{{ $t('readyWarehouse.addReadyGarment.boxQuantity')  }}</div>
                <v-text-field
                  v-model="addition.boxQuantity"
                  class="rounded-lg base mb-4"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  :placeholder=" $t('readyWarehouse.addReadyGarment.boxQuantity') "
                  validate-on-blur
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" v-for="(item,idx) in addition.sizeDistributions" :key="idx">
                <div class="label">{{item.size}}</div>
                <v-text-field
                  v-model="item.quantity"
                  class="rounded-lg base mb-4"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  :placeholder="item.size"
                  validate-on-blur
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
            @click="newDialog = false"
          >
          {{  $t('readyWarehouse.addReadyGarment.cancel')  }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="save"
          >
        {{  $t('readyWarehouse.addReadyGarment.save')  }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="900" v-model="editDialog">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between mb-6">
          <div class="title text-capitalize">Edit Overproduction</div>
          <v-btn icon color="#544B99" @click="editDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="add_form" v-model="add_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">Model number</div>
                <v-combobox
                  disabled
                  v-model="selectedItem.modelNumber"
                  :items="modelsList"
                  :search-input.sync="modelNumSearch"
                  item-text="modelNumber"
                  item-value="modelNumber"
                  validate-on-blur
                  outlined
                  color="#544B99"
                  hide-details
                  height="44"
                  class="rounded-lg base d-flex align-center justify-center mr-2"
                  :return-object="true"
                  dense
                  placeholder="Model name"
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
                <div class="label">Color</div>
                <v-select
                  :items="colorList"
                  v-model="selectedItem.colorSpecification"
                  placeholder="Select color"
                  dense
                  outlined
                  height="44"
                  hide-details
                  color="#544B99"
                  validate-on-blur
                  class="rounded-lg base mr-2"
                  append-icon="mdi-chevron-down"
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
                <div class="label">Price</div>
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
                  v-model="addition.boxQuantity"
                  class="rounded-lg base mb-4"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  placeholder="Enter box quantity"
                  validate-on-blur
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" v-for="(item,idx) in selectedItem.sizeDistributions" :key="idx">
                <div class="label">{{item.size}}</div>
                <v-text-field
                  v-model="item.quantity"
                  class="rounded-lg base mb-4"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  :placeholder="item.size"
                  validate-on-blur
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
            @click="editDialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="edit"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="900" v-model="spendDialog">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between mb-6">
          <div class="title text-capitalize">Selling Overproduction</div>
          <v-btn icon color="#544B99" @click="spendDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="add_form" v-model="add_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <div class="label">Invoice number</div>
                <v-combobox
                  v-model="selectForSell.shippingId"
                  :rules="[formRules.required]"
                  :search-input.sync="shippingInvoice"
                  :items="shippingInvoiceList"
                  item-text="invoiceNumber"
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

              <v-col cols="4" class="d-flex align-center">
                <v-switch inset v-model="autoFilling" color="#4F46E5" />
                <div class="label mr-5 ">Aut.Filling</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" v-for="(item,idx) in selectForSell.sizesNoQuantity" :key="idx">
                <div class="label">{{item.size}}</div>
                <v-text-field
                  v-model="item.quantity"
                  class="rounded-lg base mb-4"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  :placeholder="item.size"
                  validate-on-blur
                />
              </v-col>
            </v-row>
            <v-row>


            </v-row>

          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#544B99"
            width="130"
            @click="spendDialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="sell"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <DeleteDialog v-bind="deleteData" />

  </div>
</template>
<script>
import DeleteDialog from "../DeleteDialog.vue";
import {mapActions,mapGetters} from "vuex"
export default {
  components:{
    DeleteDialog,
  },
  data(){
    return{
      shippingInvoice: "",
      spendDialog:false,
      add_validate:true,
      newDialog:false,
      editDialog:false,
      modelNumSearch: "",
      itemsList:[],
      currency_enums: ["USD", "UZS", "RUB"],
      addition:{
        sizeDistributions:[],
      },
      selectedItem:{},
      headers:[
        {text:this.$t('readyWarehouse.addReadyGarment.name'),value:"name",sortable:false},
        {text:this.$t('readyWarehouse.addReadyGarment.orderNo'),value:"orderNumber",sortable:false},
        {text:this.$t('readyWarehouse.addReadyGarment.modelNo'),value:"modelNumber",sortable:false},
        {text:this.$t('readyWarehouse.addReadyGarment.color'),value:"colorSpecification",sortable:false},
        {text:"M/U",value:"measurementUnit",sortable:false},
        {text:this.$t('sizeTemplate.dialog.size'),value:"sizes",sortable:false,align:"center",width:300},
        {text:this.$t('readyWarehouse.addReadyGarment.total'),value:"totalQuantity",sortable:false},
        {text:this.$t('readyWarehouse.addReadyGarment.modelPrice'),value:"modelPrice",sortable:false},
        {text:this.$t('readyWarehouse.addReadyGarment.modelTotalPrice'),value:"modelTotalPrice",sortable:false},
        {text:this.$t('readyWarehouse.addReadyGarment.orderNo'),value:"price",sortable:false},
        {text:this.$t('readyWarehouse.addReadyGarment.outsourceTotalPrice'),value:"totalPrice",sortable:false},
        {text:this.$t('readyWarehouse.addReadyGarment.boxQuantity'),value:"boxQuantity",sortable:false},
        {text:this.$t('readyWarehouse.addReadyGarment.clientName'),value:"clientName",sortable:false},
        {text:this.$t('readyWarehouse.addReadyGarment.action'),value:"action",sortable:false},
      ],
      selectForSell:{},
      id:null,
      deleteDialog:false,
      autoFilling:false,
    }
  },

  created(){
    this.getModelsList({
      page: 0,
      size: 10,
      modelNumber: this.modelNumSearch,
      partner: "",
      status: "ACTIVE",
    });
    this.getMeasurementUnit();
    this.getShippingInvoiceList({
      page: 0,
      size: 100,
      invoiceNumber: this.shippingInvoice,
    });
  },

  computed:{
    ...mapGetters({
      newId:"generalWarehouse/newId",
      modelSizes:"garment/modelSizes",
      itemList:"garment/garmentList",
      modelsList: "models/modelsList",
      colorList: "accessorySamples/colorList",
      measurementUnitList: "measurement/measurementUnit",
      shippingInvoiceList: "shipping/shippingInvoiceList",


    }),
    deleteData: {
      get() {
        return {
          deleteDialog: this.deleteDialog,
          deleteFunction: this.delete,
          closeDialog: () => {
            this.deleteDialog = false;
          },
        };
      },
    },
  },

  watch:{
    shippingInvoice(val) {
      if (!!val) {
        this.getShippingInvoiceList({
          page: 0,
          size: 100,
          invoiceNumber: val,
        });
      }
    },
    newDialog(val){
      if(!val){
        this.$refs.new_form.reset()
      }
    },
    autoFilling(val){
      if(val){
        this.selectForSell.sizesNoQuantity.forEach((item,idx)=>{
          item.quantity=this.selectForSell.sizeDistributions[idx].quantity
        })
      }else{
        this.selectForSell.sizesNoQuantity.forEach((item,idx)=>{
          item.quantity=0
        })
      }
    },
    modelSizes(list){
      this.addition.sizeDistributions=[]
      list.forEach((item)=>{
        this.addition.sizeDistributions.push({size:item,quantity:0})
      })
    },
    itemList(list){
      this.itemsList = JSON.parse(JSON.stringify(list))
    },
    newId(val){
      this.id=val
    },

    id(val){
      this.getItemList({warehouseId:val,type:"READY_GARMENT"})
    },

    modelNumSearch(val) {
      if (true) {
        this.getModelsList({
          page: 0,
          size: 10,
          modelNumber: val,
          partner: "",
          status: "ACTIVE",
        });
      }
    },
    "addition.modelNumber"(val) {
      if (!!val) {
        this.modelColor(val.id);
        this.getModelSizes(val.id)
      }
    },
    "selectedItem.modelNumber"(val) {
      if (!!val) {
        this.modelColor(val.id);
      }
    },
  },

  methods:{
    ...mapActions({
      getItemList:"garment/getItemList",
      createItem:"garment/createItem",
      updateItem:"garment/updateItem",
      deleteItem:"garment/deleteItem",
      sellGarmentInCentral:"garment/sellGarmentInCentral",
      itemSellDomestic:"garment/itemSellDomestic",
      getModelSizes:"garment/getModelsizes",
      getModelsList: "models/getModelsList",
      modelColor: "accessorySamples/modelColor",
      getMeasurementUnit: "measurement/getMeasurementUnit",
      getShippingInvoiceList: "shipping/getShippingInvoiceList",

    }),
    addGarment(){
      this.newDialog=true
    },
    save(){
      const data={
        ...this.addition,
      }
      data.modelId=this.addition.modelNumber.id
      data.warehouseId=this.id
      data.type= "READY_GARMENT",
      this.createItem(data)

      this.newDialog=false
    },
    editFunc(item){
      this.selectedItem={...item}
      this.selectedItem.modelNumber={id:item.modelId,modelNumber:item.modelNumber}
      this.selectedItem.currency=item.totalPrice.split(" ")[1]
      this.selectedItem.price=item.price.split(" ")[0]

      this.editDialog=true
    },

    edit(){
      const data={
        ...this.selectedItem,
      }
      data.modelId=this.selectedItem.modelNumber.id
      data.warehouseId=this.id
      data.type= "READY_GARMENT",
      this.updateItem({data,id:this.selectedItem.id})
      this.editDialog=false
    },

    deleteFunc(item){
      this.selectedItem={...item}
      this.deleteDialog=true
    },
    delete(){
      this.deleteItem({type:"READY_GARMENT",warehouseId:this.id,id:this.selectedItem.id})
      this.deleteDialog=false
    },
    spendFunc(item){
      this.autoFilling=false
      const sizesNoQuantity=[]
      item.sizeDistributions.forEach((el)=>{
        sizesNoQuantity.push({size:el.size,quantity:0})
      })
      this.selectForSell={
        garmentId:item.id,
        colorSpecification:item.colorSpecification,
        type:"READY_GARMENT",
        warehouseId:this.id,
        sizesNoQuantity:sizesNoQuantity,
        sizeDistributions:item.sizeDistributions
      }
      this.spendDialog=true
    },
    sell(){
      const data={
        colorSpecification:this.selectForSell.colorSpecification,
        sizeDistributions:this.selectForSell.sizesNoQuantity,
        shippingId:this.selectForSell.shippingId.id,
        warehouseId:this.id,
      }
      delete data.sizesNoQuantity


      this.sellGarmentInCentral({data,id:this.selectForSell.garmentId})
      this.spendDialog=false
    }


  },

  mounted(){
    const param = this.$route.params.id
    if(param!=="add-garment"){
      this.id=param
    }
  }

}
</script>
<style lang="">

</style>
