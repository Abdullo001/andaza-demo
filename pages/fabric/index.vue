<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="ID fabric"
              outlined
              class="rounded-lg"
              v-model.trim="filters.id_fabric"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Model №"
              outlined
              class="rounded-lg"
              v-model.trim="filters.modelId"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Order №"
              outlined
              class="rounded-lg"
              v-model.trim="filters.orderId"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-spacer/>
          <v-col cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn
                width="140" outlined
                color="#397CFD" elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                Reset
              </v-btn>
              <v-btn
                width="140" color="#397CFD" dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                Search
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="fabricList"
      :items-per-page="10"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
      :options.sync="options"
      :server-items-length="totalElements"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium">Fabric</div>
            <v-btn
              color="#7631FF"
              class="rounded-lg text-capitalize"
              dark
              @click="$router.push(`/fabric/create`)"
            >
              <v-icon>mdi-plus</v-icon>
              Fabric
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>
      <template #item.actions="{item}">
        <v-tooltip top color="#7631FF">
          <template v-slot:activator="{on, attrs}">
            <v-btn
              icon color="#7631FF"
              v-on="on" v-bind="attrs"
              @click="$router.push(`/fabric/${item.id}`)"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <span>Details</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'FabricPage',
  data() {
    return {
      options: {},
      filters: {
        id_fabric: '',
        modelId: '',
        orderId: '',
      },
      valid_search: '',
      menu2: false,
      headers: [
        {text: 'ID', align: 'start', sortable: false, value: 'id'},
        {text: 'Model number', value: 'modelNumber'},
        {text: 'Model id', value: 'modelId'},
        {text: 'Order number', value: 'orderNumber'},
        {text: 'Order id', value: 'orderId'},
        {text: 'Created', value: 'createdTimeOfPlanning'},
        {text: 'Updated', value: 'updatedTimeOfPlanning'},
        {text: 'Actions', value: 'actions'},
      ],
      itemPerPage: 10,
      current_page: 0,
    }
  },
  created() {
    this.getFabricList({page:0, size:10});
  },
  computed: {
    ...mapGetters({
      fabricList: 'fabric/fabricList',
      totalElements: 'fabric/totalElements'
    })
  },
  watch: {},
  methods: {
    ...mapActions({
      getFabricList: 'fabric/getFabricList',
    }),
    filterData() {},
    resetFilters() {},


  },
  mounted() {
    this.$store.commit('setPageTitle', 'Planning')
  }
}
</script>

<style lang="scss">
.v-data-table-header {
  background-color: #E9EAEB;
}
</style>
