<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form>
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.id"
              :label="$t('catalogGroups.child.idSearch')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.name"
              :label="$t('catalogGroups.child.name')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <el-date-picker
              style="width: 100%"
              v-model="filters.createdAt"
              type="datetime"
              class="filter_picker"
              :placeholder="$t('catalogGroups.child.created')"
              :picker-options="pickerShortcuts"
              format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <el-date-picker
              style="width: 100%"
              v-model="filters.updatedAt"
              type="datetime"
              class="filter_picker"
              :placeholder="$t('catalogGroups.child.updated')"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-spacer />
          <v-col cols="12" lg="2" md="2">
            <div class="d-flex justify-end">
              <v-btn
                width="140"
                outlined
                color="#544B99"
                elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                {{ $t("catalogGroups.child.reset") }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t("catalogGroups.child.search") }}
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
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4 rounded-lg"
      @update:items-per-page="size"
      @update:page="page"
      @click:row="(item) => viewDetails(item)"
    >
      <template #top>
        <v-toolbar elevation="0" class="rounded-lg">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              {{ $t("catalogGroups.child.menuName") }}
            </div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="addCatalogGroup"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t("catalogGroups.child.addMainName") }}
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
              @click="$router.push(`/catalog-groups/${item.id}`)"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <span>
            {{ $t("catalogGroups.addPage.details") }}
          </span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CatalogGroupsPage",
  data() {
    return {
      itemPrePage: 10,
      current_page: 0,

      headers: [
        {
          text: this.$t("catalogGroups.table.id"),
          value: "id",
          align: "start",

          width: "100",
          sortable: false,
        },
        {
          text: this.$t("catalogGroups.table.name"),
          sortable: false,
          value: "groupName",
        },
        {
          text: this.$t("catalogGroups.table.code"),
          value: "groupCode",
          sortable: false,
        },
        {
          text: this.$t("catalogGroups.table.createdAt"),
          value: "createdAt",
          sortable: false,
        },
        {
          text: this.$t("catalogGroups.table.updatedAt"),
          value: "updatedAt",
          sortable: false,
        },
        {
          text: this.$t("catalogGroups.table.actions"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      filters: {
        id: "",
        name: "",
        updatedAt: "",
        createdAt: "",
      },
    };
  },
  async created() {
    await this.getCatalogGroupsList({ page: 0, size: 10 });
  },
  computed: {
    ...mapGetters({
      catalog_list: "catalogGroups/catalog_list",
      loading: "catalogGroups/loading",
      totalElements: "catalogGroups/totalElements",
    }),
  },
  methods: {
    ...mapActions({
      getCatalogGroupsList: "catalogGroups/getCatalogGroupsList",
      filterCatalogGroupsList: "catalogGroups/filterCatalogGroupsList",
    }),
    async size(val) {
      this.itemPrePage = val;
      await this.getCatalogGroupsList({ page: 0, size: this.itemPrePage });
    },
    async page(val) {
      this.current_page = val - 1;
      await this.getCatalogGroupsList({
        page: this.current_page,
        size: this.itemPrePage,
      });
    },

    viewDetails(item){
      this.$router.push( this.localePath(`/catalog-groups/${item.id}`))
    },

    addCatalogGroup() {
      this.$router.push(this.localePath(`/catalog-groups/create`))
    },
    async resetFilters() {
      this.filters = {
        id: "",
        name: "",
        updatedAt: "",
        createdAt: "",
      };
      await this.getCatalogGroupsList({ page: 0, size: 10 });

    },
    async filterData() {
      const items = { ...this.filters };
      await this.filterCatalogGroupsList(items);
    },
  },
  async mounted() {
    await this.$store.commit("setPageTitle", "Catalogs");
    await this.$store.commit("catalogGroups/setCatalogGroupId", "");
  },
};
</script>

<style lang="scss">
.el-input__inner::placeholder,
.el-input__icon,
.el-icon-time {
  color: #919191 !important;
}
</style>
