<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="checkedList"
      hide-default-footer
    >
      <template #top>
        <v-card flat>
          <v-card-title>Checked products’ quantities (1 sort)</v-card-title>
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
            >
              <v-img src="/t-shirt.svg" max-width="22"/>
            </v-btn>
          </template>
          <span class="text-capitalize">classification</span>
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
              @click="getHistory(item)"
            >
              <v-img src="/history.svg" max-width="22"/>
            </v-btn>
          </template>
          <span class="text-capitalize">History</span>
        </v-tooltip>
        <v-tooltip
          top
          color="green"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="green"
              @click="editItem(item)"
            >
              <v-img src="/edit-active.svg" max-width="21"/>
            </v-btn>
          </template>
          <span class="text-capitalize">edit</span>
        </v-tooltip>
        <v-tooltip
          top
          color="red"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="red"
              @click="deleteItem(item)"
            >
              <v-img src="/delete.svg" max-width="24"/>
            </v-btn>
          </template>
          <span class="text-capitalize">delete</span>
        </v-tooltip>
      </template>
      <template #item.status="{item}">

      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'Subcontractor',
  data() {
    return {
      headers: [
        {text: 'Color', align: 'start', sortable: false, value: 'color'},
        {text: '24', align: 'start', sortable: false, value: '24'},
        {text: '26', align: 'start', sortable: false, value: '26'},
        {text: '28', align: 'start', sortable: false, value: '28'},
        {text: '30', align: 'start', sortable: false, value: '30'},
        {text: 'Partner', align: 'start', sortable: false, value: 'partner'},
        {text: 'Price per work', align: 'start', sortable: false, value: 'pricePerWork'},
        {text: 'Total price', align: 'start', sortable: false, value: 'totalPrice'},
        {text: 'Sent date', align: 'start', sortable: false, value: 'sentDate'},
        {text: 'Deadline', align: 'start', sortable: false, value: 'deadline'},
        {text: 'Status', align: 'start', sortable: false, value: 'status'},
        {text: 'Actions', align: 'end', sortable: false, value: 'actions'},
      ],
      checkedList: [
        {
          id: 1,
          color: 'Grey 8996 TPX',
          24: '24',
          26: '26',
          28: '28',
          30: '30',
          partner: 'Chicco GPX',
          pricePerWork: '0.8 USD',
          totalPrice: '5520',
          sentDate: '22.08.2023',
          deadline: '30.08.2024',
          status: 'Sent'
        },
        {
          id: 2,
          color: 'Grey 8996 TPX',
          24: '24',
          26: '26',
          28: '28',
          30: '30',
          partner: 'Chicco GPX',
          pricePerWork: '0.8 USD',
          totalPrice: '5520',
          sentDate: '22.08.2023',
          deadline: '30.08.2024',
          status: 'Sent'
        },
        {
          id: 3,
          color: 'Grey 8996 TPX',
          24: '24',
          26: '26',
          28: '28',
          30: '30',
          partner: 'Chicco GPX',
          pricePerWork: '0.8 USD',
          totalPrice: '5520',
          sentDate: '22.08.2023',
          deadline: '30.08.2024',
          status: 'Sent'
        },

      ],
      statusEnums: ['Sent', 'Ment', 'Fent']
    }
  },
  methods: {
    getHistory(item) {
    },
    editItem() {
    },
    deleteItem() {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
