<template>
  <div class="mt-4">
    <v-data-table
      :headers="headers"
      :items="fabricOrdersList"
      :items-per-page="100"
      class="elevation-0"
      hide-default-footer
    ></v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'FabricOrderedComponent',
  data() {
    return {
      headers: [
        {
          text: 'Deadline',
          align: 'start',
          sortable: false,
          value: 'deadline',
        },
        { text: 'Order №', value: 'orderNumber', sortable: false },
        { text: 'Model №', value: 'modelNumber', sortable: false },
        { text: 'Client', value: 'client', sortable: false },
        { text: 'Body parts', value: 'bodyPart', sortable: false },
        { text: 'Fabric specification', value: 'specification', width: 340, sortable: false },
        { text: 'Color', value: 'color', sortable: false },
        { text: 'Quantity', value: 'quantity', sortable: false },
        { text: 'Fabric 1pc', value: 'quantityOnePc', sortable: false },
        { text: 'Total fabric', value: 'total', sortable: false },
      ],
    }
  },
  computed: {
    ...mapGetters({
      fabricOrdersList: 'fabricOrdered/fabricOrdersList',
      fabricPlanningId: 'fabric/fabricPlanningId',
    })
  },
  watch: {
    fabricPlanningId(val) {
      this.getFabricOrdered(val);
    }
  },
  methods: {
    ...mapActions({
      getFabricOrdered: 'fabricOrdered/getFabricOrdered',
    })
  },
  mounted() {
    const param = this.$route.params.id;
    if(param !== 'create') {
      this.getFabricOrdered(param)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
