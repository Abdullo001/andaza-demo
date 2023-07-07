<template>
  <div class="mt-4">
    <v-data-table
      :headers="headers"
      :items="supplyFabricList"
      :items-per-page="10"
      class="elevation-0"
      hide-default-footer
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: 'FabricSupplyComponent',
  data() {
    return {
      headers: [
        {
          text: 'Deadline',
          align: 'start',
          sortable: false,
          value: 'deadline',
        },
        { text: 'Order №', value: 'orderNumber' },
        { text: 'Model №', value: 'modelNumber' },
        { text: 'Client', value: 'client' },
        { text: 'Body parts', value: 'bodyPart' },
        { text: 'Fabric specification', value: 'specification' },
        { text: 'Color', value: 'color' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'M/U', value: 'quantityUnit' },
        { text: 'Fabric 1pc', value: 'quantityOnePc' },
        { text: 'M/U', value: 'quantityOnePcUnit' },
        { text: 'Total fabric', value: 'total' },
      ],
      supplyFabricList: []
    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>

</style>
