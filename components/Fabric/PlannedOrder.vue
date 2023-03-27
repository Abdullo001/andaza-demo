<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="plannedOrderList"
      :items-per-page="10"
      class="elevation-0"
      hide-default-footer
    >
     <template #top>
       <v-row class="mt-4">
         <v-col cols="12" lg="3">
           <div class="font-weight-bold text-body-1 mb-2">Partner name</div>
           <v-combobox
             v-model="details.partnerName"
             :items="partnerLists"
             :search-input.sync="partnerName"
             item-text="name"
             item-value="id"
             filled
             class="rounded-lg"
             :return-object="true"
             color="#7631FF"
             dense
             placeholder="Enter partner name"
             append-icon="mdi-chevron-down"
           >
             <template #append>
               <v-icon color="#7631FF">mdi-magnify</v-icon>
             </template>
           </v-combobox>
         </v-col>
         <v-col cols="12" lg="3">
           <div class="font-weight-bold text-body-1 mb-2">Warehouse code</div>
           <v-combobox
             v-model="details.warehouseCode"
             :items="warehouseList"
             :search-input.sync="warehouseCode"
             item-text="code"
             item-value="id"
             filled
             class="rounded-lg"
             :return-object="true"
             color="#7631FF"
             dense
             placeholder="Enter warehouse code"
             append-icon="mdi-chevron-down"
           >
             <template #append>
               <v-icon color="#7631FF">mdi-magnify</v-icon>
             </template>
           </v-combobox>
         </v-col>
         <v-col cols="12" lg="3">
           <div class="font-weight-bold text-body-1 mb-2">Warehouse name</div>
           <v-combobox
             v-model="details.warehouseName"
             :items="warehouseList"
             :search-input.sync="warehouseName"
             item-text="name"
             item-value="id"
             filled
             class="rounded-lg"
             :return-object="true"
             color="#7631FF"
             dense
             placeholder="Enter warehouse code"
             append-icon="mdi-chevron-down"
           >
             <template #append>
               <v-icon color="#7631FF">mdi-magnify</v-icon>
             </template>
           </v-combobox>
         </v-col>
         <v-col cols="12" lg="3">
           <div class="font-weight-bold text-body-1 mb-2">Delivery time</div>
           <el-date-picker
             v-model="details.deliveryTime"
             type="datetime"
             placeholder="Deadline for fabric"
             :picker-options="pickerShortcuts"
             value-format="dd.MM.yyyy HH:mm:ss"
             class="custom-picker2"
           >
           </el-date-picker>
         </v-col>
       </v-row>
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
        {
          text: 'Deadline',
          align: 'start',
          sortable: false,
          value: 'deadline',
        },
        { text: 'Supplier name', value: 'supplierName' },
        { text: 'Warehouse C/N', value: 'warehouse' },
        { text: 'Delivery time', value: 'deliveryTime' },
        { text: 'Fabric specification', value: 'specification' },
        { text: 'VAR.1', value: 'var1' },
        { text: 'VAR.2', value: 'var2' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'M/U', value: 'quantityUnit' },
        { text: 'Fabric 1pc', value: 'quantityOnePc' },
        { text: 'M/U', value: 'quantityOnePcUnit' },
        { text: 'Total fabric', value: 'total' },
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
      plannedOrderList: []
    }
  },
  computed: {
    ...mapGetters({
      partnerLists: 'plannedOrder/partnerLists',
      warehouseList: 'plannedOrder/warehouseList'
    })
  },
  watch: {
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
    }
  },
  methods: {
    ...mapActions({
      getPartnerList: 'models/getPartnerList',
      getPartnerName: 'plannedOrder/getPartnerName',
      getWarehouseCodeList: 'plannedOrder/getWarehouseCodeList'
    })
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
