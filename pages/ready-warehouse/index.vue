<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model.trim="filters.orderNumber"
                label="Model №"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg filter"
                @keydown.enter="filterModel"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model.trim="filters.modelNumber"
                label="Model №"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg filter"
                @keydown.enter="filterModel"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filters.clientName"
                label="Client name"
                outlined dense hide-details
                validate-on-blur
                class="rounded-lg filter"
              />
            </v-col>
            <v-spacer/>
            <v-col cols="12" lg="3">
              <div class="d-flex justify-end">
                <v-btn
                  width="140" outlined
                  color="#397CFD" elevation="0"
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
                  @click.stop="resetFilter"
                >
                  {{ $t('listsModels.dialog.reset') }}
                </v-btn>
                <v-btn
                  width="140" color="#397CFD" dark
                  elevation="0"
                  class="text-capitalize rounded-lg font-weight-bold"
                  @click="filterModel"
                >
                  {{ $t('listsModels.dialog.search') }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-data-table
      item-key="id"
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="allModels"
      :items-per-page="10"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
      @click:row="(item) => viewDetails(item)"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex w-full align-center justify-space-between">
            <div>Ready garment warehouse</div>
            
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.status="{ item }">
        <v-select
          @click.stop
          @change="changeStatus(item)"
          :background-color="statusColors(item.status)"
          :items="statusEnum"
          append-icon="mdi-chevron-down"
          v-model="item.status"
          hide-details
          :item-color="itemColors(item.status)"
          class="mt-n2"
          rounded dark
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ModelMainPage',
  data() {
    return {
      new_dialog: false,
      filter_form: true,
      filters: {
        modelNumber: '',
        orderNumber: '',
        clientName: '',
      },
      headers: [
        {text: 'Order №', align: 'start', sortable: false, value: 'orderNumber'},
        {text: 'Model №',  sortable: false, value: 'modelNumber'},
        {text: 'Client name',  sortable: false, value: 'clientName'},
        {text: 'Model name',  sortable: false, value: 'modelName'},
        {text: 'Order  quantity', sortable: false,  value: 'orderQuantity'},
        {text: 'Produced quantity',  sortable: false, value: 'producedQuantity'},
        {text: 'Deadline',  sortable: false, value: 'deadline'},
        {text: 'Status', sortable: false,  value: 'status', width: 200},
      ],
      allModels: [],
      statusEnum: ["SHIPPED", "PENDING", "FIELD"]
    }
  },
  computed:{
    ...mapGetters({
      warehouseList:"readyGarmentWarehouse/warehouseList",
    })
  },
  watch:{
    warehouseList(list){
      this.allModels=JSON.parse(JSON.stringify(list))
    }
  },
  methods: {
    ...mapActions({
      getWarehouseList: "readyGarmentWarehouse/getWarehouseList"
    }),
    statusColors(color) {
      switch (color) {
        case 'SHIPPED':
          return '#10BF41';
        case 'PENDING':
          return '#FFC915';
        case  'FIELD':
          return 'red'
      }
    },
    itemColors(color) {
      switch (color) {
        case 'SHIPPED':
          return 'green';
        case 'PENDING':
          return 'amber';
        case  'FIELD':
          return 'red'
      }
    },
    changeStatus(item) {
    },
    resetFilter() {
    },
    filterModel() {
    },
    viewDetails(item) {
      this.$router.push(this.localePath(`/ready-warehouse/${item.id}`))
    },
    addModel() {
      this.$router.push(this.localePath(`/ready-warehouse/add-model`))
    }
  },
  async mounted() {
    this.$store.commit('setPageTitle', 'Warehouse');
    this.getWarehouseList({client:"",modelNumber:"",orderNumber:"",page:0,size:10})
  }
}
</script>

<style lang="scss">
.el-input__inner {
  &::placeholder {
    color: #000 !important;
  }
}

.el-input__icon.el-icon-time {
  color: #777 !important;
  font-size: 18px;
}

.v-data-table-header {
  background-color: #E9EAEB;
}

tbody > tr {
  cursor: pointer;
}
</style>
