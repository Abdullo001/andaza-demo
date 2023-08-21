<template>
  <div>
    <v-card flat class="rounded-lg">
      <v-data-table
        :headers="headers"
        :items="items"
      >
        <template #top>
          <div class="title pa-4">Order quantities</div>
        </template>
      </v-data-table>
    </v-card>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'OrderQuantities',

  data() {
    return {
      headers: [],
      items: []
    }
  },

  computed:{
    ...mapGetters({
      orderQuantityList:"cuttingProcess/orderQuantityList",
    })
  },

  watch:{
    orderQuantityList(list){
      this.headers= [
        {text: 'Main color', sortable: false, value: 'color', align: 'start'},
      ];
      list[0]?.sizeDistributionList.forEach((item)=>{
        this.headers.push(
          {text: item.size, sortable: false, value: item.size, align: 'start'},
        )
      })
      this.headers.push({text: 'Total', sortable: false, value: 'total', align: 'end'},)

      const specialList = list.map(function (el) {
        const sizeList={}
        el?.sizeDistributionList.forEach((item)=>{
          sizeList[item.size]=item.quantity
        })

        return{
          color:el.color,
          total:el.total,
          ...sizeList,
        }
      })
      this.items=JSON.parse(JSON.stringify(specialList))
    }
  },

  methods:{
    ...mapActions({
      getOrderQuantity:"cuttingProcess/getOrderQuantity"
    })
  },

  mounted(){
    const id = this.$route.params.id
    this.getOrderQuantity(id)
  }
}
</script>

<style lang="scss" scoped>

</style>
