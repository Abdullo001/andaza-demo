<template >
  <div>
    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="domesticList"
      :items-per-page="20"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      hide-default-footer
    >
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
  data(){
    return{
      headers:[
        {text:"Type",value:"type",sortable:false},
        {text:"Color",value:"colorSpecification",sortable:false},
        {text:"Price per unit",value:"price",sortable:false},
        {text:"Measurement unit",value:"measurementUnit",sortable:false},
        {text:"Sizes",value:"sizes",sortable:false,width:300, align:"center"},
        {text:"Total quantity",value:"totalQuantity",sortable:false},
        {text:"Total price",value:"totalPrice",sortable:false},
        {text:"Buyer",value:"buyer",sortable:false},
        {text:"Sold date",value:"soldDate",sortable:false},
        {text:"Description",value:"description",sortable:false},
      ],
      items:[],
      id:null,

    }
  },

  computed:{
    ...mapGetters({
      newId:"generalWarehouse/newId",
      domesticList:"garment/domesticList",
    })
  },

  watch:{

    newId(val){
      this.id=val
    },

    id(val){
      this.getDomesticList(val)
    },
  },

  methods:{
    ...mapActions({
      getDomesticList:"garment/getDomesticList"
    })
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