<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="2">
            <v-text-field
              v-model="filters.orderNumber"
              placeholder="Order number"
              outlined
              height="44"
              validate-on-blur
              dense
              hide-details
              class="rounded-lg filter mr-2"
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="filters.modelNumber"
              placeholder="Model number"
              outlined
              height="44"
              validate-on-blur
              dense
              hide-details
              class="rounded-lg filter mr-2"
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="2">
            <v-combobox
              v-model="filters.creatorId"
              :items="users"
              :search-input.sync="creatorSearch"
              item-text="name"
              item-value="id"
              validate-on-blur
              outlined
              hide-details
              height="44"
              class="rounded-lg filter d-flex align-center justify-center mr-2"
              :return-object="true"
              dense
              placeholder="Creator name"
              prepend-icon=""
              @keydown.enter="filterData"
            >
              <template #append>
                <v-icon class="d-inline-block" color="#7631FF">
                  mdi-magnify
                </v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="2">
            <v-combobox
              v-model="filters.clientName"
              :items="clientList"
              :search-input.sync="clientSearch"
              item-text="name"
              item-value="id"
              validate-on-blur
              outlined
              hide-details
              height="44"
              class="rounded-lg filter d-flex align-center justify-center"
              :return-object="true"
              dense
              placeholder="Client name"
              prepend-icon=""
              @keydown.enter="filterData"
            >
              <template #append>
                <v-icon class="d-inline-block" color="#7631FF">
                  mdi-magnify
                </v-icon>
              </template>
            </v-combobox>
          </v-col>
          <!-- <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Order №"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.orderId"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col> -->
          <v-spacer />
          <v-col cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn
                width="140"
                outlined
                color="#397CFD"
                elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                Reset
              </v-btn>
              <v-btn
                width="140"
                color="#397CFD"
                dark
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
      :items-per-page="itemPerPage"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      :options.sync="options"
      :server-items-length="totalElements"
      @update:page="page"
      @update:items-per-page="size"
      @click:row="(item) => $router.push(`/fabric/${item.id}`)"
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
        <v-divider />
      </template>
      <template #item.actions="{ item }">
        <v-tooltip top color="#7631FF">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#7631FF"
              v-on="on"
              v-bind="attrs"
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FabricPage",
  data() {
    return {
      options: {},
      filters: {
        orderNumber: "",
        modelNumber: "",
        creatorId: "",
        clientName: "",
      },
      clientSearch: "",
      creatorSearch: "",
      valid_search: "",
      menu2: false,
      headers: [
        { text: "ID", align: "start", sortable: false, value: "id" },
        { text: "Model number", value: "modelNumber" },
        { text: "Model id", value: "modelId" },
        { text: "Order number", value: "orderNumber" },
        { text: "Order id", value: "orderId" },
        { text: "Created", value: "createdTimeOfPlanning" },
        { text: "Updated", value: "updatedTimeOfPlanning" },
        { text: "Actions", value: "actions" },
      ],
      itemPerPage: 10,
      current_page: 0,
      users: [],
    };
  },
  created() {
    this.getFabricList({ page: 0, size: 10, data: { ...this.filters } });
    this.getUsersList();
    this.getClient();
  },
  computed: {
    ...mapGetters({
      fabricList: "fabric/fabricList",
      totalElements: "fabric/totalElements",
      usersList: "orders/usersList",
      clientList: "orders/clientList",
    }),
  },
  watch: {
    usersList(list) {
      list.map((item) => {
        this.users.push({
          id: item.id,
          name: `${item.firstName} ${item.lastName}`,
        });
      });
    },
  },
  methods: {
    ...mapActions({
      getFabricList: "fabric/getFabricList",
      getUsersList: "orders/getUsersList",
      getClient: "orders/getClient",
    }),
    filterData() {
      this.getFabricList({ page: 0, size: 10, data: { ...this.filters } });
    },
    resetFilters() {
      this.$refs.filter_form.reset()
      this.getFabricList({ page: 0, size: 10, data: { ...this.filters } });

    },
    async page(value) {
      this.current_page = value - 1;
      await this.getFabricList({
        page: this.current_page,
        size: this.itemPerPage,
        data: { ...this.filters },
      });
    },
    async size(value) {
      this.itemPrePage = value;
      await this.getFabricList({
        page: 0,
        size: this.itemPerPage,
        data: { ...this.filters },
      });
    },
  },
  mounted() {
    this.$store.commit("setPageTitle", "Planning");
  },
};
</script>

<style lang="scss">
.v-data-table-header {
  background-color: #e9eaeb;
}
</style>
