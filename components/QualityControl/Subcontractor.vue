<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="checkedList"
      hide-default-footer
      style="border: 1px solid #eae9e9"
      class="rounded-lg overflow-hidden"
    >
      <template #top>
        <v-card flat>
          <v-card-title>Checked products’ quantities (1 sort)</v-card-title>
        </v-card>
      </template>
      <template #item.actions="{item}">
        <v-tooltip
          top
          color="#544B99"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
            >
              <v-img src="/t-shirt.svg" max-width="22"/>
            </v-btn>
          </template>
          <span class="text-capitalize">classification</span>
        </v-tooltip>
        <v-tooltip
          top
          color="#544B99"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
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
        <v-select
          @click.stop
          @change="changeStatus(item)"
          :background-color="statusColor.subcontractColor(item.status)"
          :items="status_enums"
          append-icon="mdi-chevron-down"
          v-model="item.status"
          hide-details
          class="mt-n2"
          item-color="green"
          rounded
          dark
        />
      </template>
    </v-data-table>
    <v-data-table
      :headers="headers"
      :items="checkedList"
      hide-default-footer
      style="border: 1px solid #eae9e9"
      class="rounded-lg overflow-hidden mt-10"
    >
      <template #top>
        <v-card flat>
          <v-card-title>Checked products’ quantities (2 sort)</v-card-title>
        </v-card>
      </template>
      <template #item.actions="{item}">
        <v-tooltip
          top
          color="#544B99"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
            >
              <v-img src="/t-shirt.svg" max-width="22"/>
            </v-btn>
          </template>
          <span class="text-capitalize">classification</span>
        </v-tooltip>
        <v-tooltip
          top
          color="#544B99"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
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
        <v-select
          @click.stop
          @change="changeStatus(item)"
          :background-color="statusColor.subcontractColor(item.status)"
          :items="status_enums"
          append-icon="mdi-chevron-down"
          v-model="item.status"
          hide-details
          class="mt-n2"
          item-color="green"
          rounded
          dark
        />
      </template>
    </v-data-table>

  </div>
</template>

<script>
export default {
  name: 'Subcontractor',
  data() {
    return {
      status_enums: ["RECEIVED", "SENT"],
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
        {text: 'Status', align: 'start', sortable: false, value: 'status', width: 200},
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
          status: 'SENT'
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
          status: 'RECEIVED'
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
          status: 'SENT'
        },

      ],
      statusEnums: ['Sent', 'Received', 'T-sent'],
    }
  },
  methods: {
    getHistory(item) {
    },
    editItem() {
    },
    deleteItem() {
    },
    changeStatus() {
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
