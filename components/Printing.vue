<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="printing_list"
      :items-per-page="10"
      hide-default-footer
      class="elevation-0"
    >
      <template #item.printType="{item}">
        <v-select
          :items="print_types"
          v-model="item.printType"
          flat solo
          hide-details
          append-icon="mdi-chevron-down"
          style="font-size: 14px; "
          background-color="transparent"
        />
      </template>
      <template #item.currency="{item}">
        <v-select
          :items="currency"
          v-model="item.currency"
          flat solo
          hide-details
          append-icon="mdi-chevron-down"
          style="font-size: 14px"
          background-color="transparent"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      print_types: ['Material', 'test', 'test 2'],
      currency: ['USD', 'RUB', 'UZS'],
      printing_list: [
        {
          printType: 'Material',
          colorQuantity: '3',
          printPartnerName: 'Colorprint LLC',
          price: '0.12',
          currency: 'USD',
          simpleSentDate: '12.10.2022',
          comment: 'Printing in process',
          creator: 'Guzal Hakimova',
          date: '12.10.2022'
        }
      ],
      headers: [
        {text: 'Print type', align: 'start', sortable: false, value: 'printType', width: 180},
        {text: 'Color quantity', sortable: false, value: 'colorQuantity'},
        {text: 'Print partner name', sortable: false, value: 'printPartnerName'},
        {text: 'Price', sortable: false, value: 'price'},
        {text: 'Currency', sortable: false, value: 'currency', width: 100},
        {text: 'Simple sent date', sortable: false, value: 'simpleSentDate'},
        {text: 'Comment', sortable: false, value: 'comment'},
        {text: 'Creator', sortable: false, value: 'creator'},
        {text: 'Date', sortable: false, value: 'date'},
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
