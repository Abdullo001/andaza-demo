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
             <div class="label">Delivery time</div>
             <el-date-picker
               v-model="details.deliveryTime"
               type="datetime"
               placeholder="Deadline for fabric"
               :picker-options="pickerShortcuts"
               value-format="dd.MM.yyyy HH:mm:ss"
               class="base_picker"
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
          color="#7631FF"
        ></v-simple-checkbox>
      </template>
    </v-data-table>
    <v-divider/>
    <div class="d-flex mt-6">
      <v-spacer/>
      <v-btn
        class="text-capitalize rounded-lg font-weight-bold"
        color="#7631FF" dark
        height="44"
        width="133"
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
        {
          text: 'Deadline',
          align: 'start',
          sortable: false,
          value: 'deadline',
        },
        { text: 'Supplier name', value: 'supplierName', sortable: false },
        { text: 'Warehouse C/N', value: 'warehouseCode', sortable: false },
        { text: 'Delivery time', value: 'deliveryTime', sortable: false },
        { text: 'Fabric specification', value: 'specification', sortable: false },
        { text: 'VAR.1', value: 'var1', sortable: false },
        { text: 'VAR.2', value: 'var2', sortable: false },
        { text: 'Quantity', value: 'quantity', sortable: false },
        { text: 'M/U', value: 'quantityUnit', sortable: false },
        { text: 'Fabric 1pc', value: 'quantityOnePc', sortable: false },
        { text: 'M/U', value: 'quantityOnePcUnit', sortable: false },
        { text: 'Total fabric', value: 'total', sortable: false },
      ],
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
      new_valid: true
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
      this.allPlannerOrder = JSON.parse(JSON.stringify(val));
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
      getDocuments: "documents/getDocuments",
    }),
    savePlanningOrder() {
      const valid = this.$refs.valid.validate();
      if(valid) {
        const planningChartIds = this.allPlannerOrder.map(item => item.fabricPlanningChartId)
        const data = {
          deliveryTime: this.details.deliveryTime,
          partnerId: this.details.partnerName.id,
          planningChartIds,
          warehouseId: this.details.warehouseCode.id
        }
        this.createPlanningOrder({data, id: this.fabricPlanningId});
      }
    }
  },
  mounted() {
    if(!!this.fabricPlanningId) {
       this.getPlannedOrderList(this.fabricPlanningId);
       this.getDocuments(this.modelId);
    }
  }
}
</script>

<style lang="scss">
.custom-picker2 {
  width: 100% !important;
  background: #F8F4FE;
  border-radius: 10px 10px 0 0 !important;
  &::placeholder {
    color: #cccccc;
  }
  >input.el-input__inner {
    border-radius: 10px 10px 0 0 !important;

    background: #F8F4FE !important;
    border: 0;
    border-bottom: 1px solid #777777 !important;
    width: 100% !important;
    height: 40px !important;
    &::placeholder {
      color: #9A979D !important;
    }
  }
}
</style>
