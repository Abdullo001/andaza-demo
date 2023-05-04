<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-form>
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.id"
              label="Id Catalog groups"
              outlined
              class="rounded-lg"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.name"
              label="Name"
              outlined
              class="rounded-lg"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <el-date-picker
              style="width: 100%"
              v-model="filters.createdAt"
              type="datetime"
              placeholder="Created"
              :picker-options="pickerShortcuts"
              format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <el-date-picker
              style="width: 100%;"
              v-model="filters.updatedAt"
              type="datetime"
              placeholder="Updated"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-spacer/>
          <v-col cols="12" lg="2" md="2">
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
      :items="catalog_list"
      :loading="loading"
      :server-items-length="totalElements"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100]
      }"
      class="mt-4 rounded-lg"

    >
      <template #top>
        <v-toolbar elevation="0" class="rounded-lg">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">Catalog groups</div>
            <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark @click="$router.push(`/catalog-groups/create`)">
              <v-icon>mdi-plus</v-icon>
              Catalog groups
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
              @click="$router.push(`/catalog-groups/${item.id}`)"
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
  name: "CatalogGroupsPage",
  data() {
    return {
      itemPrePage: 10,
      current_page: 0,
      headers: [
        {text: "Id", value: "id", sortable: false},
        {text: "Group Name", value: "groupName", sortable: false},
        {text: "Group Code", value: "groupCode", sortable: false},
        {text: "Created At", value: "createdAt", sortable: false},
        {text: "Updated At", value: "updatedAt", sortable: false},
        {text: "Actions", value: "actions", align: "center", sortable: false},
      ],
      filters: {
        id: "",
        name: "",
        updatedAt: "",
        createdAt: "",
      },
    }
  },
  async created() {
    await this.getCatalogGroupsList({page: 0, size: 10});
  },
  computed: {
    ...mapGetters({
      catalog_list: "catalogGroups/catalog_list",
      loading: "catalogGroups/loading",
      totalElements: "catalogGroups/totalElements",
    })
  },
  methods: {
    ...mapActions({
      getCatalogGroupsList: "catalogGroups/getCatalogGroupsList",
      filterCatalogGroupsList: "catalogGroups/filterCatalogGroupsList",
    }),
    async resetFilters() {
      this.filters = {
        id: "",
        name: "",
        updatedAt: "",
        createdAt: "",
      };
      await this.getCatalogGroupsList({page: 0, size: 10});
    },
    async filterData() {
      const items = {...this.filters};
      await this.filterCatalogGroupsList(items);
    },
  },
  async mounted() {
    await this.$store.commit('setPageTitle', 'Catalogs');
    await this.$store.commit("catalogGroups/setCatalogGroupId", '');
  }
}
</script>

<style lang="scss">
.el-input__inner::placeholder,
.el-input__icon, .el-icon-time {
  color: #919191 !important;
}
</style>
