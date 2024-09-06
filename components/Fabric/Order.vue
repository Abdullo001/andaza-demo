<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="orderList"
      :items-per-page="10"
      class="elevation-0"
      hide-default-footer
    >
      <template #top class="px-0">
        <div class="text-h6">
         {{$t('planning.order.title')}}
        </div>
        <v-divider class="my-4"></v-divider>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'FabricOrder',
  data() {
    return {
      headers: [
        {
          text: this.$t('planning.expenseGroup.name'),
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: this.$t('workingProcess.workingTable.amount'),
          value: 'amount',
          width: 100,
          align: 'center',
          sortable: false,
        },
      ],
      orderList: [
        {
          id: 1,
          name: this.$t('planning.order.orderQuantity'),
          amount: 0
        },
        {
          id: 2,
          name: this.$t('planning.calculations.overProduction'),
          amount: 0
        },
        {
          id: 3,
          name: this.$t('planning.order.quantityToProduce'),
          amount: 0
        },
        {
          id: 4,
          name: this.$t('planning.order.quantityCutting'),
          amount: 0
        },
        {
          id: 5,
          name: this.$t('planning.order.remainderCutting'),
          amount: 0
        },
        {
          id: 6,
          name: this.$t('planning.order.shippingQuantity'),
          amount: 0
        },

      ]
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
