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
             :items="partner_enums"
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
             :items="warehouseCodeList"
             :search-input.sync="warehouseCode"
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
           <div class="font-weight-bold text-body-1 mb-2">Warehouse name</div>
            <v-text-field
              placeholder="Enter warehouse name"
              filled dense
              color="#7631FF"
              class="rounded-lg"
            />
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

      warehouseCodeList: [],

      partnerName: '',
      warehouseCode: '',

      plannedOrderList: []
    }
  },
  computed: {
    ...mapGetters({
      partner_enums: 'models/partner_enums'
    })
  },
  methods: {
    ...mapActions({
      getPartnerList: 'models/getPartnerList'
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
