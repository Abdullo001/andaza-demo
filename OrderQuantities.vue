<template>
  <div>
    <v-card flat class="rounded-lg">
      <v-data-table
        :headers="headers"
        :items="items"
      >
        <template #top>
          <div class="title pa-4">Order quantities</div>
        </template>
      </v-data-table>
    </v-card>
    
  </div>
</template>

<script>
export default {
  name: 'OrderQuantities',

  data() {
    return {
      headers: [
        {text: 'Main color', sortable: false, value: 'mainColor', align: 'start'},
        {text: '24', sortable: false, value: '24', align: 'start'},
        {text: '26', sortable: false, value: '26', align: 'start'},
        {text: '28', sortable: false, value: '28', align: 'start'},
        {text: '30', sortable: false, value: '30', align: 'start'},
        {text: 'Total', sortable: false, value: 'total', align: 'end'},
      ],
      items: [
        {mainColor: 'Black', 24: '24', 26: '26', 28: '28', 30: '30', total: '2100'},
        {mainColor: 'White', 24: '24', 26: '26', 28: '28', 30: '30', total: '2100'},
        {mainColor: 'Grey', 24: '24', 26: '26', 28: '28', 30: '30', total: '2700'},
        {mainColor: 'Total', 24: '1500', 26: '1600', 28: '1600', 30: '1800', total: '6900'},
      ]
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
