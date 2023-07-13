<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="allPlannerOrder"
      :items-per-page="10"
      class="elevation-0"
      hide-default-footer
    >
     <template #top>
       <v-form v-model="new_valid" ref="valid" lazy-validation>
         <v-row class="my-4">
           <v-col cols="12" lg="3">
             <div class="label">Partner name</div>
             <v-combobox
               v-model="details.partnerName"
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
             <div class="label">Warehouse code</div>
             <v-combobox
               v-model="details.warehouseCode"
               :items="warehouseList"
               :search-input.sync="warehouseCode"
               item-text="code"
               item-value="id"
               outlined
               hide-details
               height="44"
               class="rounded-lg base"
               :return-object="true"
               color="#7631FF"
               dense
               placeholder="Enter warehouse code"
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
             <div class="label">Warehouse name</div>
             <v-combobox
               v-model="details.warehouseName"
               :items="warehouseList"
               :search-input.sync="warehouseName"
               item-text="name"
               item-value="id"
               outlined
               hide-details
               height="44"
               class="rounded-lg base"
               :return-object="true"
               color="#7631FF"
               dense
               placeholder="Enter warehouse code"
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
             <div class="label mb-2">Delivery time</div>
             <el-date-picker
               v-model="details.deliveryTime"
               type="datetime"
               placeholder="Deadline for fabric"
               :picker-options="pickerShortcuts"
               value-format="dd.MM.yyyy HH:mm:ss"
               class="base_picker rounded custom-picker2 date-input w-100 "
               :rules="[formRules.required]"
               validate-on-blur
             >
             </el-date-picker>
           </v-col>
         </v-row>
       </v-form>
     </template>
      <template #item.isOrdered="{item}">
        <v-simple-checkbox
          v-model="item.isOrdered"
          :disabled="item.status==='ORDERED'"
          color="#7631FF"
        ></v-simple-checkbox>
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
        />
      </template>

      <template #item.pricePerUnit="{item}">

          <v-text-field
            @keyup="(e)=>setPricePerUnit(e,item)"
            outlined
            hide-details
            height="32"
            class="rounded-lg base my-2" dense
            :disabled="item.status==='ORDERED'"
            :rules="[formRules.required]"
            validate-on-blur
            color="#7631FF"
            v-model="item.pricePerUnit"
          />

      </template>
    </v-data-table>
    <v-divider/>
    <div class="d-flex mt-6">
      <v-spacer/>
      <v-btn
        class="text-capitalize rounded-lg font-weight-bold mr-4 py-1 px-6"
        color="#7631FF"
        outlined
        height="44"
        @click="generateFabricPlanningOrder"
      >
        {{ allPlannerOrder.length===0?'Generate order':'Refresh Order' }}
      </v-btn>

      <v-btn
        class="text-capitalize rounded-lg font-weight-bold px-6"
        color="#7631FF"
        height="44"
        :disabled="allPlannerOrder.length===0"
        :dark="allPlannerOrder.length!==0"
        @click="savePlanningOrder"
      >
        order
      </v-btn>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      headers: [
        { text: '', value: 'isOrdered', sortable: false },
        { text: 'Fabric specification', value: 'specification', sortable: false },
        { text: 'Supplier name', value: 'supplierName', sortable: false },
        { text: 'Delivery time', value: 'deliveryTime', sortable: false },
        { text: 'Warehouse C/N', value: 'warehouseCode', sortable: false },
        {
          text: 'Deadline',
          align: 'start',
          sortable: false,
          value: 'deadline',
        },
        { text: 'Status',value:'status',sortable: false},
        { text: 'Color', value: 'color', sortable: false },
        { text: 'Quantity', value: 'quantity', sortable: false },
        { text: 'Fabric 1pc', value: 'quantityOnePc', sortable: false },
        { text: 'Total fabric', value: 'total', sortable: false },
        { text: 'Price per unit', value: 'pricePerUnit', sortable: false,width: 100 },
        { text: 'Total price', value: 'totalPrice', sortable: false },

      ],
      status_enums: ["ORDERED", "CANCELLED", "PENDING"],
      details: {
        partnerName: '',
        warehouseCode: '',
        warehouseName: '',
        deliveryTime: ''
      },
      partnerName: '',
      warehouseCode: '',
      warehouseName: '',
      allPlannerOrder: [],
      new_valid: true,
      price_valid:true,
    }
  },
  computed: {
    ...mapGetters({
      partnerLists: 'plannedOrder/partnerLists',
      warehouseList: 'plannedOrder/warehouseList',
      fabricPlanningId: 'fabric/fabricPlanningId',
      plannedOrderList: 'plannedOrder/plannedOrderList',
      modelId: 'fabric/modelId'
    })
  },
  watch: {
    plannedOrderList(val) {
      if(val){
        this.allPlannerOrder = JSON.parse(JSON.stringify(val));
      }
    },
    partnerName(val) {
      if(!!val && val !== '') {
      this.getPartnerName(val);
      }
    },
    warehouseCode(val) {
      if(!!val && val !== '')
      this.getWarehouseCodeList({code: val});
    },
    warehouseName(val) {
      if(!!val && val !== '')
        this.getWarehouseCodeList({name: val});
    },
    "details.warehouseCode"(val) {
      this.details.warehouseName = val;
    },
    "details.warehouseName"(val) {
      this.details.warehouseCode = val;
    },
    fabricPlanningId(val) {
      this.getPlannedOrderList(val);
    }
  },
  methods: {
    ...mapActions({
      getPartnerList: 'models/getPartnerList',
      getPartnerName: 'plannedOrder/getPartnerName',
      getWarehouseCodeList: 'plannedOrder/getWarehouseCodeList',
      getPlannedOrderList: 'plannedOrder/getPlannedOrderList',
      createPlanningOrder: 'plannedOrder/createPlanningOrder',
      generateFabricOrder:'plannedOrder/generateFabricOrder',
      setPricePerUnitFunc: 'plannedOrder/setPricePerUnitFunc',
      getDocuments: "documents/getDocuments",
    }),
    savePlanningOrder() {
      const valid = this.$refs.valid.validate();
      if(valid) {
        const plannedOrderIds = []
          this.allPlannerOrder.forEach((item) => {
            if(item.isOrdered&&item.status!=="ORDERED"){
              if(item.pricePerUnit){
                plannedOrderIds.push(item.plannedFabricOrderId)
              }else{
                this.$toast.error(`please enter the price of the order of this Specification:${item.specification} Color:${item.color}`);
              }
            }
        })

        if(plannedOrderIds.length!==0){
          const data = {
            deliveryTime: this.details.deliveryTime,
            partnerId: this.details.partnerName.id,
            plannedOrderIds,
            warehouseId: this.details.warehouseCode.id
          }
          this.createPlanningOrder({data, id: this.fabricPlanningId});
        }
      }
    },

    generateFabricPlanningOrder(){
      this.generateFabricOrder( this.fabricPlanningId)
    },

    setPricePerUnit(e,item){
      if(e.code===`Enter`){
        const data={
          plannedOrderId:item.plannedFabricOrderId,
          pricePerUnit:item.pricePerUnit,
        }
        this.setPricePerUnitFunc({data,id:this.fabricPlanningId})
      }
    }
  },
  mounted() {
    if(!!this.fabricPlanningId) {
       this.getPlannedOrderList(this.fabricPlanningId);
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-picker2 {
  width: 100% !important;
  background: #F8F4FE;
  border-radius: 10px 10px 10px 10px !important;
  &::placeholder {
    color: #cccccc;
  }

  >input.el-input__inner {
    border-radius: 10px 10px 10px 10px !important;

    background: #F8F4FE !important;
    border: 0;
    border-bottom: 1px solid #777777 !important;
    width: 100% !important;
    height: 40px !important;
    &::placeholder {
      color: #9A979D !important;
    }
  }

  .el-date-editor.el-input{
    width:100%;
  }

  .date-input{
    height: 44px !important;
    width:293px;
  }
}
</style>
