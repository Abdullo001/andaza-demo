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
              :label="$t('planningProduction.dialog.planningId')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.id"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :label="$t('planningProduction.dialog.name')"
              outlined
              class="rounded-lg filter"
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
              class="filter_picker"
              :placeholder="$t('planningProduction.dialog.created')"
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
              class="filter_picker"
              :placeholder="$t('planningProduction.dialog.update')"
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
                {{ $t('planningProduction.dialog.reset') }}
              </v-btn>
              <v-btn
                width="140" color="#397CFD" dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t('planningProduction.dialog.search') }}
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
      :no-data-text="$t('noDataText')"
      @update:items-per-page="getItemSize"
      @update:page="page"
      @click:row="(item) => getCurrentRow(item)"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium">{{ $t('planningProduction.dialog.planningProduction') }}</div>
            <v-btn
              color="#7631FF"
              class="rounded-lg text-capitalize"
              dark
              @click="$router.push(localePath(`/planning-production/create`))"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t('planningProduction.dialog.planning') }}
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
              @click="getCurrentRow(item)"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('planningProduction.dialog.details') }}</span>
        </v-tooltip>
      </template>
      <template #item.status="{ item }">
        <v-select
          @click.stop
          @change="changeStatus(item)"
          :background-color="statusColor.prodColor(item.status)"
          :items="status_enums"
          append-icon="mdi-chevron-down"
          v-model="item.status"
          hide-details
          class="mt-n2"
          rounded
          dark
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      options: {},
      valid_search: true,
      filters: {
        id: '',
        name: '',
        createdAt: '',
        updatedAt: ''
      },
      headers: [
        {text: 'ID', align: 'start', sortable: false, value: 'id'},
        {text: this.$t('planningProduction.table.orderNumber'), value: 'orderNumber'},
        {text: this.$t('planningProduction.table.modelNumber'), value: 'modelNumber'},
        {text: this.$t('planningProduction.table.orderQuantity'), value: 'orderQuantity'},
        {text: this.$t('planningProduction.table.deadlineProd'), value: 'deadline'},
        {text: this.$t('planningProduction.table.quantity'), value: 'productionQuantity'},
        {text: this.$t('planningProduction.table.status'), value: 'status', width: 200},
        {text: this.$t('planningProduction.table.actions'), value: 'actions'},
      ],
      itemPerPage: 10,
      current_page: 0,
      filteredPlanning: [],
      status_enums: ["ACTIVE","FINISHED","DISABLED"],
      current_status: ''
    }
  },
  computed: {
    ...mapGetters({
      planningList: 'production/planning/planningList',
      totalElements: 'production/planning/totalElements',
      statusList: 'production/planning/statusList'
    }),
  },
  watch: {
    // statusList(val) {
    //   this.status_enums = JSON.parse(JSON.stringify(val));
    //   console.log(val);
    // },
    planningList(val) {
      let data = JSON.parse(JSON.stringify(val));
      data = data.filter(obj => Object.keys(obj).length !== 0);
      this.filteredPlanning = data;
    }
  },
  methods: {
    ...mapActions({
      getPlanningList: 'production/planning/getPlanningList',
      getStatusList: 'production/planning/getStatusList',
      updateStatus: 'production/planning/updateStatus'
    }),
    getCurrentRow(row) {
      this.$router.push(this.localePath(`/planning-production/${row.modelId}`));
      this.$store.commit('production/planning/setProductionId', row.id);
    },
    
    async filterData() {
      await this.getPlanningList({
        page: this.current_page,
        size: this.itemPerPage,
        id: this.filters.id
      })
    },
    async resetFilters() {
      await this.getPlanningList({
        page: this.current_page,
        size: this.itemPerPage,
        id: ''
      });
      this.filters = {
        id: '',
        name: '',
        createdAt: '',
        updatedAt: ''
      }
    },
     changeStatus(item) {
      // this.updateStatus({
      //   id: item.id,
      //   statusId: item.statusId,
      //   page: this.current_page,
      //   size: this.itemPerPage
      // })
      console.log(item);
    },
    async page(val) {
      this.current_page = val - 1;
      await this.getPlanningList({
        page: this.current_page,
        size: this.itemPerPage,
        id: this.filters.id
      })
    },
    async getItemSize(val) {
      this.itemPerPage = val;
      await this.getPlanningList({
        page: this.current_page,
        size: this.itemPerPage,
        id: this.filters.id
      })
    },
  },
  async mounted() {
    await this.getPlanningList({page: 0, size: 20, id: ''});
    await this.getStatusList()
  }
}
</script>

<style lang="scss" scoped>

</style>
