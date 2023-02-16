<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="printOne"
      :items-per-page="10"
      hide-default-footer
      class="elevation-0"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex w-full">
            <v-spacer/>
            <v-btn
              color="#7631FF"
              class="rounded-lg text-capitalize"
              dark
            >
              <v-icon>mdi-plus</v-icon>
              printing
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
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
        {text: 'Print partner name', sortable: false, value: 'partner'},
        {text: 'Price', sortable: false, value: 'price'},
        {text: 'Currency', sortable: false, value: 'currency', width: 100},
        {text: 'Simple sent date', sortable: false, value: 'simpleSentDate'},
        {text: 'Comment', sortable: false, value: 'description'},
        {text: 'Creator', sortable: false, value: 'createdBy'},
        {text: 'Date', sortable: false, value: 'updatedAt'},
      ]
    }
  },
  computed: {
    ...mapGetters({
      printOne: "printing/printOne",

    })
  },
  methods: {
    ...mapActions({
      getOnePrint: "printing/getOnePrinting",
      getAllPrints: "printing/getAllPrints"
    })
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id !== 'add-model') {
      await this.getOnePrint({id: id, page: 0, size: 20});
    } else await this.getAllPrints({id: id, page: 0, size: 20})
  }
}
</script>

<style lang="scss" scoped>
</style>
