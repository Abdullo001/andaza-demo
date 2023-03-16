<template>
  <div>
    <v-data-table
      :headers="chartHeaders"
      :items="planningCharts"
      hide-default-footer
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="text-h6">Fabric planning chart</div>
            <v-btn
              class="rounded-lg text-capitalize"
              color="#7631FF"
              dark
              width="150"
              height="36"
            >
              <v-icon class="mr-2">mdi-plus</v-icon>
              add row
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      chartHeaders: [
        {text: 'Part', align: 'start', sortable: false, value: 'part'},
        {text: 'Fabric specification', value: 'fabricSpecification'},
        {text: 'VAR.1', value: 'var1'},
        {text: 'VAR.2', value: 'var2'},
        {text: 'Quantity', value: 'quantity'},
        {text: 'M/U', value: 'measurementUnit'},
        {text: 'Width type', value: 'widthType'},
        {text: 'Width(cm)', value: 'width'},
        {text: 'Density kg/m2', value: 'density'},
        {text: 'Comment', value: 'comment'},
        {text: 'Actions', value: 'actions'},
      ],
      planningCharts: []
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
    ...mapActions({

    })
  }
}
</script>

<style lang="scss" scoped>

</style>
