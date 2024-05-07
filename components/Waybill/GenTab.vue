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
          <div> {{tabName}}</div>
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
          <div> {{tabName}}</div>
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
        {text:"Name",value:"name",sortable:false},
        {text:"Order No.",value:"orderNumber",sortable:false},
        {text:"Model No.",value:"modelNumber",sortable:false},
        {text:"Color",value:"colorSpecification",sortable:false},
        {text:"M/U",value:"measurementUnit",sortable:false},
        {text:"Sizes",value:"sizes",sortable:false,align:"center",width:300},
        {text:"Total",value:"totalQuantity",sortable:false},
        {text:"Outsource Price",value:"price",sortable:false},
        {text:"Total price",value:"totalPrice",sortable:false},
        {text:"Box quantity",value:"boxQuantity",sortable:false},
        {text:"Client name",value:"clientName",sortable:false},
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