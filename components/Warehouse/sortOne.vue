<template>
  <div>
    <v-data-table
      item-key="id"
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="items"
      :items-per-page="10"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
    >
      <template #top>
        <v-card flat>
          <div class="title mt-0 ma-4">1-sort</div>
        </v-card>
      </template>
      <template #item.actions="{item}">
        <v-tooltip
          top
          color="#7631FF"
          class="pointer"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#7631FF"
            >
              <v-img src="/history.svg" max-width="21"/>
            </v-btn>
          </template>
          <span class="text-capitalize">History</span>
        </v-tooltip>
        <v-tooltip
          top
          color="#7631FF"
          class="pointer"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#7631FF"
            >
              <v-img src="/car.svg" max-width="21"/>
            </v-btn>
          </template>
          <span class="text-capitalize">Shipping</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'SortOne',
  data() {
    return {
      headers: [
        {text: 'Main colors', align: 'start', sortable: false, value: 'mainColors'},
        {text: '24', align: 'start', sortable: false, value: '24'},
        {text: '26', align: 'start', sortable: false, value: '26'},
        {text: '28', align: 'start', sortable: false, value: '28'},
        {text: '30', align: 'start', sortable: false, value: '30'},
        {text: 'Total', align: 'start', sortable: false, value: 'total'},
        {text: 'Price', align: 'start', sortable: false, value: 'price'},
        {text: 'Total Price', align: 'start', sortable: false, value: 'totalPrice'},
        {text: 'Actions', align: 'end', sortable: false, value: 'actions'},
      ],
      items: [
        {id: 1, mainColors: 'Purple', 24: '24', 26: '26', 28: '28', 30: '30', total: '2105', price: '5.8', totalPrice: '21 400 USD'},
        {id: 2, mainColors: 'Purple', 24: '24', 26: '26', 28: '28', 30: '30', total: '2105', price: '5.8', totalPrice: '21 400 USD'},
        {id: 3, mainColors: 'Purple', 24: '24', 26: '26', 28: '28', 30: '30', total: '2105', price: '5.8', totalPrice: '21 400 USD'},
        {id: 4, mainColors: 'Purple', 24: '24', 26: '26', 28: '28', 30: '30', total: '2105', price: '5.8', totalPrice: '21 400 USD'},
      ]
    }
  },
  computed:{
    ...mapGetters({
      firstClassList:"readyGarmentWarehouse/firstClassList",
    })
  },

  watch:{
    firstClassList(val){
    }
  },

  methods:{
    ...mapActions({
      getWarehouseListEachSort:"readyGarmentWarehouse/getWarehouseListEachSort",
    })
  },

  mounted(){
    const id=this.$route.params.id
    this.getWarehouseListEachSort({warehouseId:id,operationType:"FIRST_CLASS"})
  }

}
</script>

<style lang="scss" scoped>

</style>
