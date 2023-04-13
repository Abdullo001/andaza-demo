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
              label="ID planning"
              outlined
              class="rounded-lg"
              v-model.trim="filters.idPlanning"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Name"
              outlined
              class="rounded-lg"
              v-model.trim="filters.name"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <el-date-picker
              v-model="filters.createdAt"
              type="datetime"
              placeholder="Created"
              :picker-options="pickerShortcuts"
              format="dd.MM.yyyy HH:mm:ss"
              style="width: 100%;"
            >
            </el-date-picker>
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <el-date-picker
              v-model="filters.updatedAt"
              type="datetime"
              placeholder="Update"
              :picker-options="pickerShortcuts"
              format="dd.MM.yyyy HH:mm:ss"
              style="width: 100%;"
            >
            </el-date-picker>
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
      :items="filteredPlanning"
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
            <div class="font-weight-medium">Planning of production</div>
            <v-btn
              color="#7631FF"
              class="rounded-lg text-capitalize"
              dark
              @click="$router.push(`/planning-production/create`)"
            >
              <v-icon>mdi-plus</v-icon>
              Planning
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
              @click="$router.push(`/planning-production/${item.id}`)"
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
import {all} from "core-js/internals/document-all";
import login from "@/pages/login.vue";

export default {
  data() {
    return {
      options: {},
      valid_search: true,
      filters: {
        idPlanning: '',
        name: '',
        createdAt: '',
        updatedAt: ''
      },
      headers: [
        {text: 'ID', align: 'start', sortable: false, value: 'id'},
        {text: 'Order number', value: 'orderNumber'},
        {text: 'Model number', value: 'modelNumber'},
        {text: 'Order quantity', value: 'orderQuantity'},
        {text: 'Deadline of prod.', value: 'deadline'},
        {text: 'Quantity', value: 'productionQuantity'},
        {text: 'Status', value: 'status'},
        {text: 'Actions', value: 'actions'},
      ],
      itemPerPage: 10,
      current_page: 0,
      filteredPlanning: []
    }
  },
  computed: {
    ...mapGetters({
      planningList: 'production/planning/planningList',
      totalElements: 'production/planning/totalElements'
    }),
  },
  watch: {
    planningList(val) {
      let data  = JSON.parse(JSON.stringify(val));
      data = data.filter(obj => Object.keys(obj).length !== 0);
      this.filteredPlanning = data;
    }
  },
  methods: {
    ...mapActions({
      getPlanningList: 'production/planning/getPlanningList'
    }),
    filterData() {},
    resetFilters() {},
  },
  async mounted() {
    await this.getPlanningList({page: 0, size: 20})
  }
}
</script>

<style lang="scss" scoped>

</style>
