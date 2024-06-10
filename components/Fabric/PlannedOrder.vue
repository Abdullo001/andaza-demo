<template>
  <div class="mt-4">
    <v-data-table
      :headers="headers"
      :items="allPlannerOrder"
      :items-per-page="100"
      class="elevation-0"
      hide-default-footer
    >
      <template #item.status="{item}">
        <v-select
          :background-color="statusColor.fabricOrderedStatus(item.status)"
          :items="status_enums"
          append-icon="mdi-chevron-down"
          v-model="item.status"
          hide-details
          class="mt-n2"
          rounded
          readonly
          dark
        />
      </template>

      
      <template #item.actualTotalFabric="{item}">
        <v-text-field
          @keyup.enter="setActualFabric(item)"
          outlined
          hide-details
          height="32"
          class="rounded-lg base my-2" dense
          :disabled="item.status==='ORDERED'"
          :rules="[formRules.required]"
          validate-on-blur
          color="#544B99"
          v-model="item.actualFabricTotal"
        />
      </template>
    </v-data-table>
    <v-divider/>
    <div class="d-flex mt-6">
      <v-spacer/>
      <v-btn
        class="text-capitalize rounded-lg font-weight-bold mr-4 py-1 px-6"
        color="#544B99"
        outlined
        height="44"
        @click="generateFabricPlanningOrder"
      >
        {{ allPlannerOrder.length===0?'Generate order':'Refresh Order' }}
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
        { text: 'Fabric specification', value: 'specification', sortable: false },
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
        { text: 'Actual total fabric', value: 'actualTotalFabric', sortable: false,width: 110  },

      ],
      status_enums: ["ORDERED", "CANCELLED", "PENDING","FABRIC_GENERATED"],
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
      setActualTotalFunc: 'plannedOrder/setActualTotalFunc',
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
    },

    setActualFabric(item){
        const text= item.actualFabricTotal
        const arr=text?.split(" ")
        const data={
          plannedOrderId:item.plannedFabricOrderId,
          actualTotalFabric:arr[0],
        }
        this.setActualTotalFunc({data,id:this.fabricPlanningId})

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
