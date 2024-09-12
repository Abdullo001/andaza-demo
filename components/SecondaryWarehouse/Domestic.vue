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
        {text:this.$t('secondaryWarehouse.domestic.type'),value:"type",sortable:false},
        {text:this.$t('secondaryWarehouse.domestic.color'),value:"colorSpecification",sortable:false},
        {text:this.$t('secondaryWarehouse.domestic.pricePerUnit'),value:"price",sortable:false},
        {text:this.$t('secondaryWarehouse.domestic.measurementUnit'),value:"measurementUnit",sortable:false},
        {text:this.$t('secondaryWarehouse.domestic.sizes'),value:"sizes",sortable:false,width:300, align:"center"},
        {text:this.$t('secondaryWarehouse.domestic.totalQuantity'),value:"totalQuantity",sortable:false},
        {text:this.$t('secondaryWarehouse.domestic.totalPrice'),value:"totalPrice",sortable:false},
        {text:this.$t('secondaryWarehouse.domestic.buyer'),value:"buyer",sortable:false},
        {text:this.$t('secondaryWarehouse.domestic.soldDate'),value:"soldDate",sortable:false},
        {text:this.$t('secondaryWarehouse.domestic.description'),value:"description",sortable:false},
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