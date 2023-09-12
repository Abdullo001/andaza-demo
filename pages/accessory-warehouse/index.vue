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
              label="Order number"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.orderId"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Model number"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.modelId"
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
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="accessoryList"
      :items-per-page="10"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex w-full align-center justify-space-between">
            <div>Accessory warehouse</div>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.data-table-expand="{headers, item}">
        <td
          :colspan="accessoriesHeader.length"
          class="ma-0 pa-0 pointer"
          @click="getRow(item)"
        >
          <v-data-table
            :items="item.accessoryWarehouses"
            :headers="accessoriesHeader"
            hide-default-footer
            item-key="name"
          >
          </v-data-table>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      valid_search: "",
      filters: {
        orderId: null,
        modelId: null,
      },
      headers: [
        {text: "Order №", value: "orderNumber", sortable: false, width: 120,  class: "header-color"},
        {text: "Model №", value: "modelNumber", sortable: false, width: 120, class: "header-color"},
        {text: '', value: 'data-table-expand', sortable: false, class: "header-color"},
      ],
      accessoriesHeader: [
        {text: "Accessory name", value: "name", sortable: false, class: "subheader-color"},
        {text: "Specification", value: "specification", sortable: false, width: 200, class: "subheader-color"},
        {text: "Ordered quantity", value: "orderedQuantity", sortable: false, class: "subheader-color"},
        {text: "Delivered quantity", value: "deliveredQuantity", sortable: false, class: "subheader-color"},
        {text: "Price per unit", value: "perUnitPrice", sortable: false, class: "subheader-color"},
        {text: "Total price", value: "totalPrice", sortable: false, class: "subheader-color"},
        {text: "Supplier name", value: "supplier", sortable: false, class: "subheader-color"},
        {text: "Ordered date", value: "orderedDate", sortable: false, class: "subheader-color"},
      ],
    }
  },
  created() {
    this.getAccessoryWarehouseList({page: 0, size: 10})
  },
  computed: {
    ...mapGetters({
      accessoryList: "accessoryWarehouse/accessoryList"
    })
  },
  methods: {
    ...mapActions({
      getAccessoryWarehouseList: 'accessoryWarehouse/getAccessoryWarehouseList'
    }),
    addArrivedAccessory() {
      this.$router.push(`/accessory-warehouse/add-accessory-warehouse`);
    },
    getRow(item) {
      const data={orderNumber:item.orderNumber,modelNumber:item.modelNumber,modelId:item.modelId,createdAt:item.createdAt,createdBy:item.createdBy}
      this.$store.commit('accessoryWarehouse/setEditDates', data);
      this.$router.push(`/accessory-warehouse/${item.orderId}`);

    },

    resetFilters() {

    },
    filterData() {

    },
    loadDetails({item}) {
      // current opened || choose object ^
    },
  }
}
</script>
<style lang="scss">
.header-color {
  //background-color: #F4F5FA;
}
.subheader-color {
  //background: rgba(111, 49, 237, 0.20);
  background-color: #F4F5FA;
}
</style>
