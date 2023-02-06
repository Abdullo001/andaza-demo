<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="modelParts"
      :items-per-page="50"
      class="elevation-0"
      hide-default-footer
    >
      <template #item.partName="{item}">
        <v-select

        />
      </template>
    </v-data-table>
    <v-divider/>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'ModelPartsComponent',
  data() {
    return {
      headers: [
        {text: 'Part name', align: 'start', sortable: false, value: 'partName'},
        {text: 'Composition',  sortable: false, value: 'composition'},
        {text: 'Comment',  sortable: false, value: 'comment'},
        {text: 'Creator',  sortable: false, value: 'creator'},
        {text: 'Created at',  sortable: false, value: 'createdAt'},
      ],
      modelParts: [
        {
          partName: 'Body',
          composition: 'cotton 90% , po',
          comment: "Comment about body",
          creator: 'Aziza Azimova',
          createdAt: '12.10.2022'
        }
      ]
    }
  },
  created() {
    this.getPartName();
  },
  methods: {
    ...mapActions({
      getPartName: 'modelParts/getPartName',

    })
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-data-table-header {
  background-color: #F4F5FA;
}

::v-deep th {
  color: #000 !important;
}
</style>
