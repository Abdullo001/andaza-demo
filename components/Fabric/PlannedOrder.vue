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
          @focus="handleKeyEvent(item.plannedFabricOrderId, $event)"
          @keyup="handleKeyEvent(item.plannedFabricOrderId, $event)"
          @keyup.enter="handleEnter(item)"
          outlined
          :hide-details="!enterError[item.plannedFabricOrderId]"
          height="32"
          class="rounded-lg base my-2" 
          error-color="orange"
          dense
          :disabled="item.status === 'ORDERED'"
          :error-messages="enterError[item.plannedFabricOrderId]"
          :color="!enterError[item.plannedFabricOrderId]?'#544B99':'orange'"
          v-model="item.actualFabricTotal"
        >
        <template v-slot:message="{ message }">
          <span class="custom-error-message" style="color: orange;">{{ message }}</span>
        </template>
        </v-text-field>
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
        {{ allPlannerOrder.length===0? $t('planning.listFabric.totalFabric'):'Refresh Order' }}
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
        { text:  this.$t('planning.listFabric.fabricSpecification'), value: 'specification', sortable: false },
        {
          text: this.$t('planning.listFabric.deadline'),
          align: 'start',
          sortable: false,
          value: 'deadline',
        },
        { text:  this.$t('partners.table.status'),value:'status',sortable: false},
        { text: this.$t('planning.listFabric.color'), value: 'color', sortable: false },
        { text:  this.$t('planning.listFabric.quantity'), value: 'quantity', sortable: false },
        { text:  this.$t('planning.listFabric.fabricPerPiece'), value: 'quantityOnePc', sortable: false },
        { text:  this.$t('planning.listFabric.totalFabric'), value: 'total', sortable: false },
        { text:this.$t('planning.listFabric.actualTotalFabric'), value: 'actualTotalFabric', sortable: false,width: 200 },

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
      enterError: {},
    }
  },
  computed: {
    ...mapGetters({
      partnerLists: "partners/partnerList",
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
      this.getPartnerList({page:0, size:10,partnerName:val});
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
      getPartnerList: 'partners/getPartnerList',
      getWarehouseCodeList: 'plannedOrder/getWarehouseCodeList',
      getPlannedOrderList: 'plannedOrder/getPlannedOrderList',
      createPlanningOrder: 'plannedOrder/createPlanningOrder',
      generateFabricOrder:'plannedOrder/generateFabricOrder',
      setPricePerUnitFunc: 'plannedOrder/setPricePerUnitFunc',
      setActualTotalFunc: 'plannedOrder/setActualTotalFunc',
      getDocuments: "documents/getDocuments",
    }),
    handleKeyEvent(id, event) {
      if (event.keyCode !== 13) {
        this.enterError[id] = 'Please confirm with Enter';
      } else {
        this.enterError[id] = '';
      }
    },
    handleEnter(item) {
      if (item.actualFabricTotal && item.actualFabricTotal.trim() !== '') {
        this.setActualFabric(item);
      } 
    },
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
  .custom-error {
    // error-messages rangini o'zgartirish
    :deep(.v-messages__message) {
      color: orange !important; // yoki o'zingiz xohlagan rang
    }
  }
  .custom-error-message {
    color: orange !important;
  }
  .v-application .error--text {
    color: orange !important;
  }
  .orange-border >>> .v-input__control .v-input__slot {
    border-color: orange !important;
  }
}
</style>
