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
          <v-card-title>Classification of shortcomings</v-card-title>
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

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'Classification',
  data() {
    return {
      headers: [
        {text: 'Color', align: 'start', sortable: false, value: 'color'},
        {text: 'Size', align: 'start', sortable: false, value: 'size'},
        {text: 'Quality', align: 'start', sortable: false, value: 'quality'},
        {text: 'Status', align: 'start', sortable: false, value: 'status'},
        {text: 'Comment', align: 'start', sortable: false, value: 'comment'},
        {text: 'Actions', align: 'end', sortable: false, value: 'actions'},
      ],
      checkedList: [
        {id: 1, color: 'Grey', size: '24', quality: '1', status: 'Photo sample', comment: 'test comment'},
        {id: 2, color: 'Black', size: '24', quality: '1', status: 'Sample to client', comment: 'test comment'},
        {id: 3, color: 'White', size: '24', quality: '3', status: 'Defect', comment: 'test comment'},
        {id: 4, color: 'Purple', size: '24', quality: '2', status: 'Barak', comment: 'test comment'},
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
