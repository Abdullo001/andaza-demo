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
    </v-data-table>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'QuantitiesOne',
  data() {
    return {
      headers: [
        {text: 'Color', align: 'start', sortable: false, value: 'color'},
        {text: '24', align: 'start', sortable: false, value: '24'},
        {text: '26', align: 'start', sortable: false, value: '26'},
        {text: '28', align: 'start', sortable: false, value: '28'},
        {text: '30', align: 'start', sortable: false, value: '30'},
        {text: 'Produced total', align: 'start', sortable: false, value: 'producedTotal'},
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
    ...mapActions({
      getOwnList: "commonProcess/getOwnList"
    }),
    getHistory(item) {},
    editItem() {},
    deleteItem() {},
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.getOwnList(id);
  }
}
</script>

<style lang="scss" scoped>

</style>
