<template>
  <div class="mt-10">
    <v-data-table
      :headers="headers"
      :items="items"
      style="border: 1px solid #E9EAEB;"
      class="rounded-lg overflow-hidden"
    >
      <template #top>
        <v-card flat>
          <v-card-title>
            Order quantities
          </v-card-title>
        </v-card>
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
  {text: 'Main color', sortable: false, align: 'start', value: 'mainColor'},
  {text: '24', sortable: false, align: 'start', value: '24'},
  {text: '26', sortable: false, align: 'start', value: '26'},
  {text: '28', sortable: false, align: 'start', value: '28'},
  {text: '32', sortable: false, align: 'start', value: '32'},
  {text: 'Total', sortable: false, align: 'end', value: 'total'},
]);
const items = ref([
  {
    mainColor: 'Black',
    24: '25',
    26: '26',
    28: '28',
    32: '32',
    total: 2500
  },
  {
    mainColor: 'Grey',
    24: '25',
    26: '26',
    28: '28',
    32: '32',
    total: 3200
  },
]);

// TODO: methods
</script>

<style lang="scss" scoped>

</style>
