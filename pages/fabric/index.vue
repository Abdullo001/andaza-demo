<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="2">
            <v-text-field
              v-model="filters.orderNumber"
              :placeholder="$t('orderBox.index.orderNum')"
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
               :placeholder="$t('inspectionBox.model')"
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
              :placeholder="$t('modelBox.modelPartsBox.creator')"
              prepend-icon=""
              @keydown.enter="filterData"
            >
              <template #append>
                <v-icon class="d-inline-block" color="#544B99">
                  mdi-magnify
                </v-icon>
              </template>
            </v-combobox>
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
                 {{ $t('listsModels.dialog.reset') }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t('listsModels.dialog.search') }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>

    <!-- <v-data-table
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
      @click:row="(item) => $router.push(localePath(`/fabric/${item.id}`))"
    > -->
    <VDataTableWrapper :headers="headers" :items="items" :totalElements="totalElements" :callerFunction="getFabricList" :rowFunction="viewDetails">
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium">{{$t('planning.index.fabric')}}</div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="$router.push(localePath(`/fabric/create`))"
            >
              <v-icon>mdi-plus</v-icon>
              {{$t('planning.index.fabric')}}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider />
      </template>
      <template #item.actions="{ item }">
        <v-tooltip top color="#544B99">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#544B99"
              v-on="on"
              v-bind="attrs"
              @click="$router.push(localePath(`/fabric/${item.id}`))"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <span>Details</span>
        </v-tooltip>
      </template>
    </VDataTableWrapper>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VDataTableWrapper from "@/components/UI/VDataTableWrapper.vue";

export default {
  name: "FabricPage",
  components: {
    VDataTableWrapper,
  },
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
        { text: this.$t('prefinances.child.modelNumber'), value: "modelNumber" },
        { text: this.$t('orderBox.index.orderNum'), value: "orderNumber" },
        { text: this.$t("catalogGroups.tabs.table.createdAt"),value: "createdTimeOfPlanning" },
        { text:  this.$t('listsModels.child.creator'),  value: "creatorOfPlanning" },
        { text: this.$t("catalogGroups.tabs.table.actions"), value:"actions"},
      ],
      itemPerPage: 10,
      current_page: 0,
      users: [],
      items: [],
    };
  },
  created() {
    this.getFabricList({ page: 0, size: 10, data: { ...this.filters } });
    this.getUsersList();
  },
  computed: {
    ...mapGetters({
      fabricList: "fabric/fabricList",
      totalElements: "fabric/totalElements",
      usersList: "orders/usersList",
    }),
  },
  watch: {
    fabricList(list) {
      this.items = JSON.parse(JSON.stringify(list));
    },
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
    }),
    viewDetails(item) {
      this.$router.push(this.localePath(`/fabric/${item.id}`))
    },
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
      this.itemPerPage = value;
      await this.getFabricList({
        page: 0,
        size: this.itemPerPage,
        data: { ...this.filters },
      });
    },
  },
  mounted() {
    this.$store.commit("setPageTitle", this.$t('sidebar.planning'));
  },
};
</script>

<style lang="scss">
.v-data-table-header {
  background-color: #e9eaeb;
}
</style>
