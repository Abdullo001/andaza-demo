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
      :items="preFinanceList"
      :items-per-page="10"
      :loading="loading"
      @update:items-per-page="getItemSize"
      @update:page="page"
      :server-items-length="totalElements"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
      :options.sync="options"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium">Fabric</div>
            <v-btn
              color="#7631FF"
              class="rounded-lg text-capitalize"
              dark
              @click="$router.push(`/prefinances/create`)"
            >
              <v-icon>mdi-plus</v-icon>
              Fabric
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>
      <template #item.status="{item}">
        <div>
          <v-select
            @change="changeStatus(item)"
            :items="status_enum"
            v-model="item.status"
            hide-details
            rounded
            append-icon="mdi-chevron-down"
            :background-color="statusColor.color(item.status)"
            dark
            class="text-caption mt-n2"
            flat
          />
        </div>
      </template>
      <template #item.actions="{item}">
        <v-tooltip top color="primary">
          <template v-slot:activator="{on, attrs}">
            <v-btn
              icon color="primary"
              v-on="on" v-bind="attrs"
              @click="$router.push(`/prefinances/${item.id}`)"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
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
      status_enum: ['ACTIVE', 'DISABLED'],
      new_prefinance: false,
      filters: {
        id_fabric: '',
        modelId: '',
        orderId: '',
        createAt: ''
      },
      valid_search: '',
      menu2: false,
      headers: [
        {text: 'Prefinance number', align: 'start', sortable: false, value: 'preFinanceNumber'},
        {text: 'Model №', value: 'modelNumber'},
        {text: 'Partner', value: 'partner'},
        {text: 'Price', value: 'primaryRate'},
        {text: 'Currency', value: 'primaryCurrency'},
        {text: 'Status', value: 'status', align: 'center', width: 200},
        {text: 'Actions', value: 'actions'},
      ],
      preFinanceList: [],
      itemPerPage: 10,
      current_page: 0,
    }
  },
  created() {
    this.getFabricList();
  },
  computed: {
    ...mapGetters({

    })
  },
  watch: {},
  methods: {
    ...mapActions({
      getFabricList: 'fabric/getFabricList'
    })

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
