<template>
  <v-card flat class="rounded-lg mb-5">
    <v-data-table
      item-key="calculation"
      :headers="headers"
      :items="items"
      disable-pagination   
      hide-default-footer
    >
      <template #top>
        <div class="pa-4 d-flex align-center justify-space-between">
          <div class="title">Given accessories quantity</div>
          
        </div>
      </template>
      <template #item.actions="{item}">
        <div>
          <v-btn icon class="mr-2" >
            <v-img src="/edit-green.svg" max-width="20"/>
          </v-btn>
          <v-btn icon>
            <v-img src="/trash-red.svg" max-width="20"/>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'CalculationShortcomings',
  data() {
    return {
      headers: [
        {
          text: 'Accessory name',
          sortable: false,
          align: 'start',
          value: 'accessoryName'
        },
        {
          text: 'Specification',
          sortable: false,
          align: 'start',
          value: 'specification'
        },
        {
          text: 'Given quantity',
          sortable: false,
          align: 'start',
          value: 'givenQuantity'
        },
        {
          text: 'Partner',
          sortable: false,
          align: 'start',
          value: 'partner'
        },
       
      ],
      items: [
        {
          accessoryName: 'Button',
          specification: 'D5mm, 2holes',
          givenQuantity: 500,
          partner: 'Chicco LLC',
        },
        {
          accessoryName: 'Button',
          specification: 'D5mm, 2holes',
          givenQuantity: 500,
          partner: 'Chicco LLC',
        },
        {
          accessoryName: 'Button',
          specification: 'D5mm, 2holes',
          givenQuantity: 500,
          partner: 'Chicco LLC',
        },
        
      ]
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
