<template >
  <div>
    <v-data-table
    :items="sampleList"
    :headers="headers"
    :items-per-page="100"
    class="elevation-0"
    hide-default-footer
    >
    <template #top>      
      <div class="mt-1">
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="text-h6">Fabric ordering</div>
          </v-toolbar-title>

        </v-toolbar>
        <div class="px-4 py-4">
          <v-row class=" mb-4 align-end justify-space-beetwen">
            <v-col cols="12" lg="4"  >
              <div class="label"> Order number <span style="color:red">*</span></div>
              <v-combobox   
              :search-input.sync="orderNumber"
              :items="ordersList"
              v-model="orderId"
              item-text="orderNumber"
              item-value="id"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              :return-object="true"
              color="#7631FF"
              dense
              placeholder="Enter order number"
              :rules="[formRules.required]"
              validate-on-blur
            >
              <template #append>
                <v-icon color="#7631FF">mdi-magnify</v-icon>
              </template>
            </v-combobox>
            </v-col>
            <v-col cols="12" lg="8" class="d-flex">
              <v-spacer/>
              <v-btn
                class="text-capitalize rounded-lg font-weight-bold py-1 px-6"
                color="#7631FF"
                dark
                height="44"
                @click="searchModels"
              >
                Search models
              </v-btn>
            </v-col>
          </v-row>
          <v-form v-model="new_valid" ref="valid" lazy-validation>
            <v-row >
              <v-col cols="12" lg="3">
                <div class="label">Supplier name</div>
                <v-combobox
                  v-model="partnerId"
                  :items="partnerLists"
                  :search-input.sync="partnerName"
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
                  :rules="[formRules.required]"
                  validate-on-blur
                  >
                  <template #append>
                    <v-icon color="#7631FF">mdi-magnify</v-icon>
                  </template>
                 </v-combobox>
              </v-col>
              <v-col cols="12" lg="3">
                <div class="label">Delivery time</div>
                <div style="height: 44px !important">
                  <el-date-picker
                    v-model="deliveryTime"
                    type="datetime"
                    style="width: 100%; height: 100%"
                    placeholder="dd.MM.yyyy HH:mm:ss"
                    :picker-options="pickerShortcuts"
                    value-format="dd.MM.yyyy HH:mm:ss"
                    class="base_picker"
                  >
                  </el-date-picker>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </div>

      </div>
    </template>

    <template #item.isOrdered="{item}">
      <v-simple-checkbox
        v-if="!item.isOrdered"
        v-model="item.checked"
        :disabled="item.isOrdered"
        :value="item.isOrdered"
        color="#7631FF"
      ></v-simple-checkbox>
      <v-simple-checkbox
        v-else
        v-model="item.isOrdered"
        :disabled="item.isOrdered"
        :value="item.isOrdered"
        color="#7631FF"
      ></v-simple-checkbox>
    </template>

    
  </v-data-table>

  <div class="d-flex my-6 ">
    <v-spacer/>
    <v-btn
      class="text-capitalize rounded-lg font-weight-bold mr-4 py-1 px-6"
      color="#7631FF"
      outlined
      height="44"
      @click="generateFabric"
    >
      Generate Fabric Order
    </v-btn>
  </div>

  <v-data-table
    :items="generatedList"
    :headers="genHeaders"
    :items-per-page="100"
    class="elevation-0"
    hide-default-footer
  >
  <template #top>
    <v-toolbar elevation="0">
      <v-toolbar-title class="d-flex justify-space-between w-full">
        <div class="text-h6">Generated Orders</div>
      </v-toolbar-title>

    </v-toolbar>
  </template>

  <template #item.isOrder="{item}">
    <v-simple-checkbox
      v-model="item.isOrdered"
      :disabled="item.status==='ORDERED'"
      color="#7631FF"
    ></v-simple-checkbox>
  </template>

  <template #item.totalPrice="{item}">

    <v-text-field
      @keyup="(e)=>setTotalPriceFunc(e,item)"
      outlined
      hide-details
      height="32"
      class="rounded-lg base my-2" dense
      :disabled="item.status==='ORDERED'"
      :rules="[formRules.required]"
      validate-on-blur
      color="#7631FF"
      v-model="item.totalPrice"
    />

</template>

  <template #item.status="{item}">
    <v-select
      :background-color="statusColor.fabricOrderedStatus(item.status)"
      :items="status_enums"
      append-icon="mdi-chevron-down"
      v-model="item.status"
      hide-details
      class="mt-n2"
      rounded
      dark
      @change="changeStatusFunc(item)"
    />
  </template>

  </v-data-table>
  <div class="d-flex my-6 ">
    <v-spacer/>

    <v-btn
      class="text-capitalize rounded-lg font-weight-bold mr-4 py-1 px-6"
      color="#7631FF"
      outlined
      height="44"
      @click="returnFunc"
    >
      Return
    </v-btn>
    <v-btn
      class="text-capitalize rounded-lg font-weight-bold mr-4 py-1 px-6"
      color="#7631FF"
      dark
      height="44"
      @click="ordering"
    >
      Order Fabric
    </v-btn>
  </div>

  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
export default {

  data(){
    return{
      headers:[
        {text:"",value:"isOrdered",sortable:false},
        {text:"Model №",value:"modelNumber",sortable:false},
        {text:"Fabric specification",value:"specification",sortable:false},
        {text:"Density gr/m2",value:"density",sortable:false},
        {text:"Fleece",value:"fleeceEnabled",sortable:false},
        {text:"Peach effect",value:"peachEffectEnabled",sortable:false},
        {text:"Color",value:"color",sortable:false},
        {text:"Actual fabric total",value:"actualFabricTotal",sortable:false},
        {text:"Price",value:"pricePerUnit",sortable:false},
        {text:"Total price",value:"totalPrice",sortable:false},
      ],
      genHeaders:[
        {text:"",value:"isOrder",sortable:false},
        {text:"Sip №",value:"sipNumber",sortable:false},
        {text:"Model №",value:"modelNumbers",sortable:false},
        {text:"Fabric specification",value:"fabricSpecification",sortable:false},
        {text:"Color",value:"color",sortable:false},
        {text:"Status",value:"status",sortable:false},
        {text:"Supplier",value:"supplier",sortable:false},
        {text:"Actual fabric total",value:"actualTotalFabric",sortable:false},
        {text:"Total price",value:"totalPrice",sortable:false,width:200},
        {text:"Fabric deadline",value:"fabricDeadline",sortable:false},
      ],
      new_valid:true,
      orderNumber:"",
      partnerName:"",
      partnerId:null,
      orderId:null,
      deliveryTime:null,
      status_enums: ["ORDERED", "CANCELLED", "PENDING"],
      generatedList:[],
      sampleList:[],
    }
  },

  computed:{
    ...mapGetters({
      ordersList:"orders/ordersList",
      sampleFabricOrdering:"fabricOrdering/sampleFabricOrdering",
      partnerLists: "fabricOrdering/partnerLists",
      generatedFabricOrdering: "fabricOrdering/generatedFabricOrdering",
    })
  },

  watch:{
    partnerName(val) {
      if(!!val && val !== '') {
      this.getPartnerName(val);
      }
    },

    generatedFabricOrdering(val){
      this.generatedList=JSON.parse(JSON.stringify(val))
    },
    sampleFabricOrdering(val){
      this.sampleList=JSON.parse(JSON.stringify(val))
    }
  },


  methods:{
    ...mapActions({
      getOrdersList:"orders/getOrdersList",
      getSampleFabricOrdering:"fabricOrdering/getSampleFabricOrdering",
      getPartnerName: 'fabricOrdering/getPartnerName',
      generateFabricOrder: 'fabricOrdering/generateFabricOrder',
      getGeneratedFabricOrdering: 'fabricOrdering/getGeneratedFabricOrdering',
      setFabricOrder: 'fabricOrdering/setFabricOrder',
      setTotalPrice: 'fabricOrdering/setTotalPrice',
      changeStatus: 'fabricOrdering/changeStatus',
      returnOrders: 'fabricOrdering/returnOrders',

    }),

    setTotalPriceFunc(e,item){
      if(e.code===`Enter`){
        const data={
          fabricOrderId:item.fabricOrderId,
          totalPrice:item.totalPrice.split(' ')[0],
        }
        this.setTotalPrice({data,id:this.orderId.id})
      }
    },

    changeStatusFunc(item){
      this.changeStatus({id:item.fabricOrderId,status:item.status})
    },

    returnFunc(){
      const ids = []
      this.generatedList.forEach((item)=>{
        if(item.isOrdered&&item.status!=="ORDERED"){
          ids.push(item.fabricOrderId)
        }
      })

      this.returnOrders({ids,id:this.orderId.id})
    },
    

    searchModels(){
      this.getSampleFabricOrdering(this.orderId.id)
      this.getGeneratedFabricOrdering(this.orderId.id)
    },

    generateFabric(){
      const validate=this.$refs.valid.validate()
      if(validate){
        const plannedFabricOrderIds = []
        this.sampleList.forEach((item)=>{
          if(item.checked){
            plannedFabricOrderIds.push(item.plannedFabricOrderId)
          }
        })

        if(plannedFabricOrderIds.length!==0){
          const data={
            plannedFabricOrderIds,
            fabricDeadline: this.deliveryTime,
            orderId:this.orderId.id ,
            supplierId: this.partnerId.id 
          }

          this.generateFabricOrder(data)
        }
      }
      
    },

    ordering(){
      const fabricOrderIds = []
      this.generatedList.forEach((item)=>{
        if(item.isOrdered){
          fabricOrderIds.push(item.fabricOrderId)
        }
      })

      const data={
        fabricOrderIds
      }
      
      this.setFabricOrder({data,id:this.orderId.id})
    }
  },

  mounted(){
    this.getOrdersList({page:0,size:100})
    this.getPartnerName("")
  }
}

</script>
<style lang="scss" scoped>
  
</style>