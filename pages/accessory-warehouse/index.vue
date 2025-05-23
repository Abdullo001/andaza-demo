<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :label="$t('fabricWarehouse.orderNumber')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.orderNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :label="$t('prefinances.child.modelNumber')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.modelNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-spacer />
          <v-col cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn
                width="140"
                outlined
                color="#544B99"
                elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                {{$t('fabricWarehouse.reset') }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
               {{$t('fabricWarehouse.search') }}
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
      :server-items-length="totalElements"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      @click:row="(item) => getRow(item)"
      @update:page="page"
      @update:items-per-page="size"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>{{ $t('sidebar.accessoryWarehouse') }}</div>
            <v-btn
              color="#544B99"
              outlined
              class="text-capitalize rounded-lg mr-2"
              @click="$router.push(localePath('/accessory-warehouse/accessory-stock'))"
            >
             {{ $t('accessoryWarehouse.accessoryStock') }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <!-- <template #item.data-table-expand="{ headers, item }">
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
      </template> -->
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      itemPrePage: 10,
      current_page: 0,
      valid_search: "",
      filters: {
        orderNumber: null,
        modelNumber: null,
      },
      headers: [
        {
          text:this.$t('fabricWarehouse.orderNumber'),
          value: "orderNumber",
          sortable: false,
        },
        {
          text: this.$t('prefinances.child.modelNumber'),
          value: "modelNumber",
          sortable: false,
        },
        {
          text:this.$t('accessoryWarehouse.plannedBy'),
          value: "plannedBy",
          sortable: false,
        },
        {
          text: this.$t('accessoryWarehouse.plannedAt'),
          value: "plannedAt",
          sortable: false,
        },
        {
          text: "",
          value: "data-table-expand",
          sortable: false,
        },
      ],
      accessoriesHeader: [
        {
          text: "Accessory name",
          value: "name",
          sortable: false,
          class: "subheader-color",
        },
        {
          text: "Specification",
          value: "specification",
          sortable: false,
          width: 200,
          class: "subheader-color",
        },
        {
          text: "Ordered quantity",
          value: "orderedQuantity",
          sortable: false,
          class: "subheader-color",
        },
        {
          text: "Delivered quantity",
          value: "deliveredQuantity",
          sortable: false,
          class: "subheader-color",
        },
        {
          text: "Price per unit",
          value: "perUnitPrice",
          sortable: false,
          class: "subheader-color",
        },
        {
          text: "Total price",
          value: "totalPrice",
          sortable: false,
          class: "subheader-color",
        },
        {
          text: "Supplier name",
          value: "supplier",
          sortable: false,
          class: "subheader-color",
        },
        {
          text: "Ordered date",
          value: "orderedDate",
          sortable: false,
          class: "subheader-color",
        },
      ],
    };
  },
  created() {
    this.getAccessoryWarehouseList({ page: 0, size: 10 ,modelNumber:'',orderNumber:''});
  },
  computed: {
    ...mapGetters({
      accessoryList: "accessoryWarehouse/accessoryList",
      totalElements: "accessoryWarehouse/totalElements",
    }),
  },
  methods: {
    ...mapActions({
      getAccessoryWarehouseList: "accessoryWarehouse/getAccessoryWarehouseList",
    }),
    async page(value) {
      this.current_page = value - 1;
      await this.getAccessoryWarehouseList({ page: this.current_page, size: this.itemPrePage ,...this.filters});

    },
    async size(value) {
      this.itemPrePage = value;
      await this.getAccessoryWarehouseList({ page: 0, size: this.itemPrePage ,...this.filters});
    },
    addArrivedAccessory() {
      this.$router.push(this.localePath(`/accessory-warehouse/add-accessory-warehouse`));
    },
    getRow(item) {
      const data = {
        orderNumber: item.orderNumber,
        modelNumber: item.modelNumber,
        modelId: item.modelId,
        plannedAt: item.plannedAt,
        plannedBy: item.plannedBy,
      };
      this.$store.commit("accessoryWarehouse/setEditDates", data);
      this.$router.push(this.localePath(`/accessory-warehouse/${item.orderId}`));
    },

    resetFilters() {
      this.getAccessoryWarehouseList({ page: 0, size: 10 ,modelNumber:'',orderNumber:''});
      this.$refs.filter_form.reset()
    },
    filterData() {
      this.getAccessoryWarehouseList({page:0,size:10,modelNumber:this.filters.modelNumber,orderNumber:this.filters.orderNumber})
    },
    loadDetails({ item }) {
      // current opened || choose object ^
    },
  },
};
</script>
<style lang="scss">
.header-color {
  //background-color: #F4F5FA;
}
.subheader-color {
  //background: rgba(111, 49, 237, 0.20);
  background-color: #f4f5fa;
}
</style>
