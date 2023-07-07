<template>
  <div class="mt-4">
    <v-data-table
      :headers="headers"
      :items="fabricOrdersList"
      :items-per-page="10"
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
        { text: 'Order №', value: 'orderNumber' },
        { text: 'Model №', value: 'modelNumber' },
        { text: 'Client', value: 'client' },
        { text: 'Body parts', value: 'bodyPart' },
        { text: 'Fabric specification', value: 'specification' },
        { text: 'Color', value: 'color' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'M/U', value: 'quantityUnit' },
        { text: 'Fabric 1pc', value: 'quantityOnePc' },
        { text: 'M/U', value: 'quantityOnePcUnit' },
        { text: 'Total fabric', value: 'total' },
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
