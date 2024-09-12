<template >
  <div>
    <v-data-table
      class="mt-4 rounded-lg pt-4"
      v-if="type==='FIRST_CLASS'"
      :headers="headers"
      :items="waybillItems"
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
          <div> {{$t('production.oneSort.oneSort')}}</div>
          <div>
            
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

    
    </v-data-table>
    <v-data-table
      class="mt-4 rounded-lg pt-4"
      v-else
      :headers="headers"
      :items="secondWaybillItems"
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
          <div> {{$t('production.oneSort.twoSort')}}</div>
          <div>
            
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

    
    </v-data-table>

   

  </div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
export default {
  props:{
    tabName:{
      type:String,
      required:true,
    },
    type:{
      type:String,
      required:true,
    }

  },
  data(){
    return{
      
      headers:[
        {text:this.$t('production.oneSort.name'),value:"name",sortable:false},
        {text:this.$t('production.oneSort.orderNo'),value:"orderNumber",sortable:false},
        {text:this.$t('production.oneSort.modelNo'),value:"modelNumber",sortable:false},
        {text:this.$t('production.oneSort.color'),value:"colorSpecification",sortable:false},
        {text:this.$t('production.oneSort.mu'),value:"measurementUnit",sortable:false},
        {text:this.$t('production.oneSort.sizes'),value:"sizes",sortable:false,align:"center",width:300},
        {text:this.$t('production.oneSort.total'),value:"totalQuantity",sortable:false},
        {text:this.$t('production.oneSort.outsourcePrice'),value:"price",sortable:false},
        {text:this.$t('production.oneSort.totalPrice'),value:"totalPrice",sortable:false},
        {text:this.$t('production.oneSort.boxQuantity'),value:"boxQuantity",sortable:false},
        {text:this.$t('production.oneSort.clientName'),value:"clientName",sortable:false},
      ],
      itemsList:[],
      id:null,
      
    }
  },

  created(){
    
  },

  computed:{
    ...mapGetters({
      waybillItems:"waybill/waybillItems",
      secondWaybillItems:"waybill/secondWaybillItems",
    }),
    
  },

  watch:{

    
  },

  methods:{
    ...mapActions({
      getWaybillItems: "waybill/getWaybillItems",
      
    }),
    

  },

  mounted(){
    const param = this.$route.params.id
    if(param!=="add-garment"){
      this.id=param
      this.getWaybillItems({id:param,type:this.type})
    }
  }

}
</script>
<style lang="">
  
</style>