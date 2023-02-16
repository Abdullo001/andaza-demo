<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="printing_list"
      :items-per-page="10"
      hide-default-footer
      class="elevation-0"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex">
            <v-spacer/>
            <v-btn class="text-capitalize rounded-lg" color="#7631FF" dark>
              <v-icon class="mr-1">mdi-plus</v-icon>
              printing
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.actions="{item}">

      </template>
    </v-data-table>
    <v-divider/>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      print_types: ['Material', 'test', 'test 2'],
      currency: ['USD', 'RUB', 'UZS'],
      printing_list: [
        {
          printType: 'Material',
          colorQuantity: '3',
          printPartnerName: 'Color print LLC',
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
        {text: 'Actions', sortable: false, value: 'actions'},
      ]
    }
  },
  computed: {
    ...mapGetters({
      printingList: 'printing/printingList'
    })
  },
  methods: {
    ...mapActions({
      getPrintingList: 'printing/getPrintingList'
    })
  },
  async mounted() {
    await this.getPrintingList({page: 0, size: 20})
  }
}
</script>

<style lang="scss" scoped>
</style>
