<template>
  <v-card flat class="rounded-lg">
    <v-data-table
      item-key="calculation"
      :headers="headers"
      :items="items"
    >
      <template #top>
        <div class="pa-4 d-flex align-center justify-space-between">
          <div class="title">Classification of shortcomings</div>
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
          text: 'Colors',
          sortable: false,
          align: 'start',
          value: 'color'
        },
        {
          text: 'Size',
          sortable: false,
          align: 'start',
          value: 'size'
        },
        {
          text: 'Quantity',
          sortable: false,
          align: 'start',
          value: 'quantity'
        },
        {
          text: 'Reason',
          sortable: false,
          align: 'start',
          value: 'reason'
        },
        {
          text: 'Comment',
          sortable: false,
          align: 'start',
          value: 'description'
        },
        {
          text: '',
          sortable: false,
          align: 'end',
          value: 'actions'
        },
      ],
      items: [
        {
          color: 'Grey',
          size: 24,
          quantity: 1,
          reason: '131.0',
          description: 'No'
        },
        {
          color: 'Black',
          size: 24,
          quantity: 1,
          reason: '131.0',
          description: 'No'
        },
        {
          color: 'Purple',
          size: 24,
          quantity: 1,
          reason: '131.0',
          description: 'No'
        },
        {
          color: 'Black',
          size: 24,
          quantity: 1,
          reason: '131.0',
          description: 'No'
        },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
