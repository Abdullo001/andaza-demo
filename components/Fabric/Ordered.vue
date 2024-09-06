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
          text: this.$t('planning.listFabric.deadline'),
          align: 'start',
          sortable: false,
          value: 'deadline',
        },
        { text: this.$t('planning.listFabric.orderNumber'), value: 'orderNumber', sortable: false },
        { text:  this.$t('planning.listFabric.modelNumber'), value: 'modelNumber', sortable: false },
        { text: this.$t('planning.listFabric.client'), value: 'client', sortable: false },
        { text:  this.$t('planning.listFabric.bodyParts'), value: 'bodyPart', sortable: false },
        { text:  this.$t('planning.listFabric.fabricSpecification'), value: 'specification', width: 340, sortable: false },
        { text:  this.$t('planning.listFabric.color'), value: 'color', sortable: false },
        { text:  this.$t('planning.listFabric.quantity'), value: 'quantity', sortable: false },
        { text:  this.$t('planning.listFabric.fabricPerPiece'), value: 'quantityOnePc', sortable: false },
        { text:  this.$t('planning.listFabric.totalFabric'), value: 'total', sortable: false },
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
