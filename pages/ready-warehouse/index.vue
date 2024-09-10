<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model.trim="filters.orderNumber"
                :label="$t('fabricWarehouse.orderNumber')"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg filter"
                @keydown.enter="filterModel"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model.trim="filters.modelNumber"
               :label="$t('prefinances.child.modelNumber')"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg filter"
                @keydown.enter="filterModel"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filters.clientName"
                :label="$t('planningProduction.dialog.clientName')"
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
                  color="#544B99" elevation="0"
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
                  @click.stop="resetFilter"
                >
                  {{ $t('listsModels.dialog.reset') }}
                </v-btn>
                <v-btn
                  width="140" color="#544B99" dark
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
      :items-per-page="itemPerPage"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
      @update:page="page"
      @update:items-per-page="size"
      @click:row="(item) => viewDetails(item)"
      :server-items-length="totalElements"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex w-full align-center justify-space-between">
            <div>{{ $t('readyWarehouse.index.readyGarmentWarehouse') }}</div>
            <div>
              <v-btn color="#544B99" outlined class="text-capitalize rounded-lg mr-2" @click="toStockGarments">
               {{ $t('readyWarehouse.index.garmentsInStock') }}
              </v-btn>
              <v-btn color="#544B99" dark class="text-capitalize rounded-lg" @click="toCentralWarehouse">
              {{ $t('readyWarehouse.index.readyGarmentIncomeWithWaybill') }}
              </v-btn>
            </div>
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
        {text:this.$t('readyWarehouse.index.orderNumber'), align: 'start', sortable: false, value: 'orderNumber'},
        {text:this.$t('readyWarehouse.index.modelNumber'),  sortable: false, value: 'modelNumber'},
        {text: this.$t('readyWarehouse.index.clientName'),  sortable: false, value: 'clientName'},
        {text:this.$t('readyWarehouse.index.modelName'),  sortable: false, value: 'modelName'},
        {text: this.$t('readyWarehouse.index.orderQuantity'), sortable: false,  value: 'orderQuantity'},
        {text: this.$t('readyWarehouse.index.producedQuantity'),  sortable: false, value: 'producedQuantity'},
        {text: this.$t('readyWarehouse.index.deadline'),  sortable: false, value: 'deadline'},
        {text: this.$t('readyWarehouse.index.status'), sortable: false,  value: 'status', width: 200},
      ],
      allModels: [],
      statusEnum: ["SHIPPED", "PENDING", "FIELD"],
      itemPerPage:10,
      currentPage:0,
    }
  },
  computed:{
    ...mapGetters({
      warehouseList:"readyGarmentWarehouse/warehouseList",
      totalElements:"readyGarmentWarehouse/totalElements",
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
    page(value) {
      this.currentPage=value-1
      this.getWarehouseList({page:this.currentPage,size:this.itemPerPage})
    },

    size(value) {
      this.itemPerPage=value
      this.getWarehouseList({page:0,size:this.itemPerPage})
    },
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
      this.$refs.filters.reset()
      this.getWarehouseList({...this.filters,page:0,size:10})

    },
    filterModel() {
      this.getWarehouseList({...this.filters,page:0,size:10})
    },
    viewDetails(item) {
      this.$router.push(this.localePath(`/ready-warehouse/${item.id}`))
    },
    addModel() {
      this.$router.push(this.localePath(`/ready-warehouse/add-model`))
    },

    toCentralWarehouse(){
      this.$router.push("/rg-income-with-waybill")
    },

    toStockGarments(){
      this.$router.push("/garments-stock")
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
