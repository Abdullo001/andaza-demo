<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      style="border: 1px solid #E9EAEB;"
      class="rounded-lg overflow-hidden"
    >
      <template #top>
        <v-card flat>
          <v-card-title>
            Calculations of shortcomings
          </v-card-title>
        </v-card>
      </template>
      <template #item.actions="{item}">
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
    </v-data-table>
  </div>
</template>

<script setup>
// export default {
//   name: 'CalculationsTable'
// }
import {reactive, ref} from "vue";

const headers = reactive([
  {text: 'Colors', sortable: false, align: 'start', value: 'colors'},
  {text: 'Size', sortable: false, align: 'start', value: 'size'},
  {text: 'Quantity', sortable: false, align: 'start', value: 'quantity'},
  {text: 'Status', sortable: false, align: 'start', value: 'status'},
  {text: 'Partner', sortable: false, align: 'start', value: 'partner'},
  {text: 'Comment', sortable: false, align: 'start', value: 'comment'},
  {text: 'Actions', sortable: false, align: 'end', value: 'actions'},
]);
const items = ref([
  {
    colors: 'Black',
    size: 25,
    quantity: 5,
    partner: 'Akfa LLC',
    status: 'Lost',
    comment: '-'
  },
  {
    colors: 'Black',
    size: 25,
    quantity: 5,
    partner: 'Akfa LLC',
    status: 'Lost',
    comment: '-'
  },
]);

// TODO: methods
const editItem = item => {
  console.log(item);
};
const deleteItem = item => {
  console.log(item);
}
</script>

<style lang="scss" scoped>

</style>
