<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="orderList"
      :items-per-page="10"
      class="elevation-0"
      hide-default-footer
    >

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
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'amount',
          value: 'amount',
          width: 100,
          align: 'center',
          sortable: false,
        },
      ],
      orderList: [
        {
          id: 1,
          name: 'Order quantity',
          amount: 0
        },
        {
          id: 2,
          name: 'Over-production %',
          amount: 0
        },
        {
          id: 3,
          name: 'Quantity to be producer',
          amount: 0
        },
        {
          id: 4,
          name: 'Quantity of cutting',
          amount: 0
        },
        {
          id: 5,
          name: 'Remainder of cutting',
          amount: 0
        },
        {
          id: 6,
          name: 'Shipping quantity',
          amount: 0
        },

      ]
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
