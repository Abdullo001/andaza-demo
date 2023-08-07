<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="cuttingTable"
    >
      <template #top>
        <div class="title ma-4">Cutting</div>
      </template>
      <template #item.returnedFabric="{item}">
        <v-btn icon @click="returnDialog(item)">
          <v-img src="/rotate.svg" max-width="20"/>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog max-width="500" v-model="return_dialog">
      <v-card>
        <v-card-title class="d-flex align-center w-full">
          <div class="title">Returned fabric</div>
          <v-spacer/>
          <v-btn
            icon
            color="#7631FF"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'CuttingComponent',
  data() {
    return {
      return_dialog: false,
      headers: [
        {text: 'Sip №', sortable: false, align: 'start', value: 'sipNumber'},
        {text: 'Batch №', sortable: false, align: 'start', value: 'batchNumber'},
        {text: 'Fabric specification', sortable: false, align: 'start', value: 'fabricSpecification'},
        {text: 'Given fabric quantity for cut.', sortable: false, align: 'start', value: 'quantity'},
        {text: 'Used fabric', sortable: false, align: 'start', value: 'usedFabric'},
        {text: 'Color', sortable: false, align: 'start', value: 'color'},
        {text: 'Cut quantity', sortable: false, align: 'start', value: 'cutQuantity'},
        {text: 'Produced total', sortable: false, align: 'start', value: 'producedTotal'},
        {text: 'Returned fabric', sortable: false, align: 'end', value: 'returnedFabric'},
      ],
      items: [
        {
          sipNumber: 'ART005/03-23',
          batchNumber: '02259-89',
          fabricSpecification: 'Description of Suppliers catalogs',
          quantity: '1000 kg',
          usedFabric: '900 kg',
          color: 'Grey 8996 TPX',
          cutQuantity: '',
          producedTotal: '21',
        },
        {
          sipNumber: 'ART005/03-23',
          batchNumber: '02259-89',
          fabricSpecification: 'Description of Suppliers catalogs',
          quantity: '1000 kg',
          usedFabric: '900 kg',
          color: 'Grey 8996 TPX',
          cutQuantity: '',
          producedTotal: '21',
        },
        {
          sipNumber: 'ART005/03-23',
          batchNumber: '02259-89',
          fabricSpecification: 'Description of Suppliers catalogs',
          quantity: '1000 kg',
          usedFabric: '900 kg',
          color: 'Grey 8996 TPX',
          cutQuantity: '',
          producedTotal: '21',
        },
      ]
    }
  },
  methods: {
    returnDialog() {
      this.return_dialog = true;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
