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
          <div class="title mt-0 ma-4">2-sort</div>
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
              <v-img src="/dollar.svg" max-width="21"/>
            </v-btn>
          </template>
          <span class="text-capitalize">Selling</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'SortTwo',
  data() {
    return {
      headers: [
        {text: 'Main colors', align: 'start', sortable: false, value: 'mainColors'},
        {text: '24', align: 'start', sortable: false, value: '24'},
        {text: '26', align: 'start', sortable: false, value: '26'},
        {text: '28', align: 'start', sortable: false, value: '28'},
        {text: '30', align: 'start', sortable: false, value: '30'},
        {text: 'Total', align: 'start', sortable: false, value: 'total'},
        {text: 'Real price', align: 'start', sortable: false, value: 'realPrice'},
        {text: 'Sold Price', align: 'start', sortable: false, value: 'soldPrice'},
        {text: 'Comment', align: 'start', sortable: false, value: 'comment'},
        {text: 'Actions', align: 'end', sortable: false, value: 'actions'},
      ],
      items: [
        {id: 1, mainColors: 'Purple', 24: '24', 26: '26', 28: '28', 30: '30', total: '2105', realPrice: '5.8', soldPrice: '21 400 USD', comment: 'Product comment'},
        {id: 2, mainColors: 'Purple', 24: '24', 26: '26', 28: '28', 30: '30', total: '2105', realPrice: '5.8', soldPrice: '21 400 USD', comment: 'Product comment'},
        {id: 3, mainColors: 'Purple', 24: '24', 26: '26', 28: '28', 30: '30', total: '2105', realPrice: '5.8', soldPrice: '21 400 USD', comment: 'Product comment'},
        {id: 4, mainColors: 'Purple', 24: '24', 26: '26', 28: '28', 30: '30', total: '2105', realPrice: '5.8', soldPrice: '21 400 USD', comment: 'Product comment'},
      ]
    }
  },
  methods:{
    ...mapActions({
      getWarehouseListEachSort:"readyGarmentWarehouse/getWarehouseListEachSort",
    })
  },

  mounted(){
    const id=this.$route.params.id
    this.getWarehouseListEachSort({warehouseId:id,operationType:"SECOND_CLASS"})
  }

}
</script>

<style lang="scss" scoped>

</style>
