<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="checkedList"
    >
      <template #top>
        <v-card flat>
          <v-card-title>Checked products’ quantities (1 sort)</v-card-title>
        </v-card>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'QualityControl',
  data() {
    return {
      headers: [
        {text: 'Color', align: 'start', sortable: false, value: 'color'},
        {text: '24', align: 'center', sortable: false, value: '24'},
        {text: '26', align: 'center', sortable: false, value: '26'},
        {text: '28', align: 'center', sortable: false, value: '28'},
        {text: '30', align: 'center', sortable: false, value: '30'},
        {text: 'Produced total', align: 'center', sortable: false, value: 'producedTotal'},
        {text: 'Actions', align: 'center', sortable: false, value: 'actions'},
      ],
      checkedList: [
        {id: 1, color: 'Grey 8996 TPX', 24: '24', 26: '26', 28: '28', 30: '30', producedTotal: '2105'},
        {id: 2, color: 'Grey 8996 TPX', 24: '24', 26: '26', 28: '28', 30: '30', producedTotal: '2105'},
        {id: 3, color: 'Grey 8996 TPX', 24: '24', 26: '26', 28: '28', 30: '30', producedTotal: '2105'},
        {id: 4, color: 'Grey 8996 TPX', 24: '24', 26: '26', 28: '28', 30: '30', producedTotal: '2105'},

      ],
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
