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
          <div> Overproduction</div>
          <div>
            <v-btn color="#544B99" dark class="text-capitalize rounded-lg" @click="addGarment">
              <v-icon>mdi-plus</v-icon>
              add Overproduction
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
              <v-img src="/spend-icon.svg" max-width="22" />
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
          <div class="title text-capitalize">add OverProduction</div>
          <v-btn icon color="#544B99" @click="newDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="add_form" v-model="add_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">Model number</div>
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
                  v-model="addition.name"
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
                  v-model="addition.colorSpecification"
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
                    v-model="addition.totalQuantity"
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
                <div class="label">Price</div>
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
          <div class="title text-capitalize">Edit Overproduction</div>
          <v-btn icon color="#544B99" @click="spendDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="add_form" v-model="add_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">Price</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="selectForSell.price"
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
                    v-model="selectForSell.currency"
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
                <div class="label">Buyer name</div>
                <v-text-field
                  v-model="selectForSell.buyer"
                  class="rounded-lg base mb-4"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  placeholder="Enter buyer name"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Description</div>
                <v-text-field
                  v-model="selectForSell.description"
                  class="rounded-lg base mb-4"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  placeholder="Enter description"
                  validate-on-blur
                />
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
              <v-col cols="12" lg="6">
                <div class="label">Total quantity</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="selectForSell.totalQuantity"
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
                    v-model="selectForSell.measurementUnitId"
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
        {text:"Name",value:"name",sortable:false},
        {text:"Order No.",value:"orderNumber",sortable:false},
        {text:"Model No.",value:"modelNumber",sortable:false},
        {text:"Color",value:"colorSpecification",sortable:false},
        {text:"M/U",value:"measurementUnit",sortable:false},
        {text:"Sizes",value:"sizes",sortable:false,align:"center",width:300},
        {text:"Total",value:"totalQuantity",sortable:false},
        {text:"Price",value:"price",sortable:false},
        {text:"Total price",value:"totalPrice",sortable:false},
        {text:"Action",value:"action",sortable:false},
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
  },

  computed:{
    ...mapGetters({
      newId:"generalWarehouse/newId",
      modelSizes:"garment/modelSizes",
      itemList:"garment/itemList",
      modelsList: "models/modelsList",
      colorList: "accessorySamples/colorList",
      measurementUnitList: "preFinance/measurementUnit",

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
      this.getItemList({warehouseId:val,type:"OVERPRODUCTION"})
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
      itemSellDomestic:"garment/itemSellDomestic",
      getModelSizes:"garment/getModelsizes",
      getModelsList: "models/getModelsList",
      modelColor: "accessorySamples/modelColor",
      getMeasurementUnit: "preFinance/getMeasurementUnit",
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
      data.type= "OVERPRODUCTION",
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
      data.type= "OVERPRODUCTION",
      this.updateItem({data,id:this.selectedItem.id})
      this.editDialog=false
    },

    deleteFunc(item){
      this.selectedItem={...item}
      this.deleteDialog=true
    },
    delete(){
      this.deleteItem({type:"OVERPRODUCTION",warehouseId:this.id,id:this.selectedItem.id})
      this.deleteDialog=false
    },
    spendFunc(item){
      const sizesNoQuantity=[]
      item.sizeDistributions.forEach((el)=>{
        sizesNoQuantity.push({size:el.size,quantity:0})
      })
      this.selectForSell={
        garmentId:item.id,
        type:"OVERPRODUCTION",
        warehouseId:this.id,
        sizesNoQuantity:sizesNoQuantity,
        sizeDistributions:item.sizeDistributions
      }
      this.spendDialog=true
    },
    sell(){
      const data={
        ...this.selectForSell,
      }
      data.sizeDistributions=this.selectForSell.sizesNoQuantity
      delete data.sizesNoQuantity

      this.itemSellDomestic(data)
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