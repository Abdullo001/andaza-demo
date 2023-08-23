<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="checkedList"
      hide-default-footer
      class="mb-4"
    >
      <template #top>
        <v-card flat>
          <v-card-title>Passing to next process</v-card-title>
        </v-card>
      </template>
      <template #item.actions="{item}">
        
        <v-tooltip
          top
          color="#7631FF"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#7631FF"
              @click="getHistory(item)"
            >
              <v-img src="/history.svg" max-width="22"/>
            </v-btn>
          </template>
          <span class="text-capitalize">History</span>
        </v-tooltip>
        <v-tooltip
          top
          color="#7631FF"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#7631FF"
              @click="editItem(item)"
            >
              <v-img src="/right-icon.svg" max-width="21"/>
            </v-btn>
          </template>
          <span class="text-capitalize">edit</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <div class="d-flex">
      <v-spacer/>
      <v-btn
        class="text-capitalize rounded-lg mr-4"
        color="#7631FF"
        width="205"
        outlined
      >
        Cancel the last passing
      </v-btn>
      <v-btn
        class="text-capitalize rounded-lg"
        color="#7631FF"
        width="205"
        dark
      >
        Generate
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QualityControl',
  data() {
    return {
      headers: [
        {text: 'Color', align: 'start', sortable: false, value: 'color'},
        {text: '24', align: 'start', sortable: false, value: '24'},
        {text: '26', align: 'start', sortable: false, value: '26'},
        {text: '28', align: 'start', sortable: false, value: '28'},
        {text: '30', align: 'start', sortable: false, value: '30'},
        {text: 'Total', align: 'start', sortable: false, value: 'total'},
        {text: 'Workshop', align: 'start', sortable: false, value: 'workshop'},
        {text: 'Actions', align: 'end', sortable: false, value: 'actions'},
      ],
      checkedList: [
        {id: 1, color: 'Grey 8996 TPX', 24: '24', 26: '26', 28: '28', 30: '30', producedTotal: '2105'},
        {id: 2, color: 'Grey 8996 TPX', 24: '24', 26: '26', 28: '28', 30: '30', producedTotal: '2105'},
        {id: 3, color: 'Grey 8996 TPX', 24: '24', 26: '26', 28: '28', 30: '30', producedTotal: '2105'},
        {id: 4, color: 'Grey 8996 TPX', 24: '24', 26: '26', 28: '28', 30: '30', producedTotal: '2105'},

      ],
    }
  },
  methods: {
    getHistory(item) {},
    editItem() {},
    deleteItem() {}
  }
}
</script>

<style lang="scss" scoped>

</style>
