<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filters.id"
                placeholder="ID sample purposes"
                outlined
                validate-on-blur
                dense
                hide-details
                class="rounded-lg filter"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filters.name"
                placeholder="Name"
                outlined
                validate-on-blur
                dense
                hide-details
                class="rounded-lg filter"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2" style="max-width: 240px">
              <el-date-picker
                v-model="filters.createdAt"
                type="datetime"
                class="rounded-lg d-block filter_picker"
                placeholder="Created"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <el-date-picker
                v-model="filters.updatedAt"
                type="datetime"
                class="rounded-lg d-block filter_picker"
                placeholder="Updated"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </v-col>
            <v-spacer/>
            <v-col cols="12" lg="3">
              <div class="d-flex justify-end">
                <v-btn
                  width="140"
                  outlined
                  color="#544B99"
                  elevation="0"
                  @click="resetBtn"
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
                >
                  Reset
                </v-btn>
                <v-btn
                  width="140"
                  color="#544B99"
                  dark
                  elevation="0"
                  @click="filterBtn"
                  class="text-capitalize rounded-lg font-weight-bold"
                >
                  Search
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-data-table
    class="mt-4 rounded-lg pt-4"
    :headers="headers"
    :items="accessoryList"
    :server-items-length="totalElements"
    :items-per-page="itemPrePage"
    @update:page="page"
    @update:items-per-page="size"
    :footer-props="{
      itemsPerPageOptions: [10, 20, 50, 100],
    }"
    @click:row="(item) => $router.push(`/accessory/${item.id}`)"
  >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>Accessory</div>
            <v-btn color="#544B99" dark class="text-capitalize rounded-lg" @click="addOrder">
              <v-icon>mdi-plus</v-icon>
              Accessory
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.actions="{item}">
        <v-tooltip top color="#544B99">
          <template v-slot:activator="{on, attrs}">
            <v-btn
              icon color="#544B99"
              v-on="on" v-bind="attrs"
              @click="$router.push(`/accessory/${item.id}`)"
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
  name: "PlanningAccessoryPages",
  data() {
    return {
      current_page: 0,
      itemPrePage: 10,
      options: {},
      filters: {
        id: "",
        name: "",
        createdAt: "",
        updatedAt: "",
      },
      headers: [
        {text: "ID", align: "start", sortable: false, value: "id",},
        {text: "Order №", value: "orderNumber"},
        {text: "Model №", value: "modelNumber"},
        {text: "Created", value: "createdTimeOfPlanning"},
        {text: "Updated", value: "updatedTimeOfPlanning"},
        {text: "Actions", value: "actions", sortable: false, align: "center"},
      ],
    };
  },
  watch: {
    async "options.sortBy"(elem) {
      if (elem[0] !== undefined) {
        if (this.options.sortDesc[0] !== undefined) {
          const items = {
            sortDesc: this.options.sortDesc[0],
            sortBy: elem[0]
          }
          await this.sortAccessory({page: this.current_page, size: this.itemPrePage, data: items})
        }
      }
    }
  },
  async created() {
    await this.$store.dispatch("accessory/getAccessoryList", {page: this.current_page, size: this.itemPrePage})
  },
  computed: {
    ...mapGetters({
      loading: "accessory/loading",
      accessoryList: "accessory/accessoryList",
      totalElements: "accessory/totalElements",
    })
  },
  methods: {
    ...mapActions({
      filterExpenseGroup: "accessory/filterExpenseGroup",
      getAccessoryList: "accessory/getAccessoryList",
      sortAccessory: "accessory/sortAccessory",
    }),
    async page(value) {
      this.current_page = value - 1;

      this.getAccessoryList({page: this.current_page, size: this.itemPrePage});
    },
    async size(value) {
      this.itemPrePage = value;
      this.getAccessoryList({page: 0, size: this.itemPrePage});

    },
    async filterBtn() {
      const items = {...this.filters};
      await this.filterExpenseGroup(items);
    },
    async resetBtn() {
      this.filters = {
        id: "",
        name: "",
        createdAt: "",
        updatedAt: "",
      };
      await this.getAccessoryList({page: 0, size: 20});
    },

    addOrder() {
      this.$router.push(`/accessory/create`);
    },
  },

  mounted() {
    this.$store.commit("setPageTitle", "Planning");
  }
};
</script>

<style lang="scss" scoped></style>
