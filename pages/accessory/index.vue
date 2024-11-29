<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation ref="filters">
          <div class="d-flex align-center justify-space-between flex-fill mb-4">
            <v-text-field
              v-model="filters.orderNumber"
              :placeholder="$t('fabricOrderingBox.index.supplier')"
              outlined
              height="40"
              validate-on-blur
              dense
              hide-details
              class="rounded-lg filter mr-2"
            />
            <v-text-field
              v-model="filters.modelNumber"
              :placeholder="$t('planning.listFabric.modelNumber')"
              outlined
              height="40"
              validate-on-blur
              dense
              hide-details
              class="rounded-lg filter mr-2"
            />
            <v-text-field
              v-model="filters.clientName"
              :placeholder="$t('inspectionBox.clientName')"
              outlined
              height="40"
              validate-on-blur
              dense
              hide-details
              class="rounded-lg filter mr-2"
            />
            <div style="height: 40px !important" class="mr-2">
              <el-date-picker
                v-model="filters.fromDate"
                class="rounded-lg d-block filter_picker "
                type="date"
                style="width: 100%; height: 100%"
                :placeholder="$t('forms.calculationsList.fromDate')"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy"
              >
              </el-date-picker>
            </div>
            <div style="height: 40px !important">
              <el-date-picker
                class="rounded-lg d-block filter_picker"
                v-model="filters.toDate"
                type="date"
                style="width: 100%; height: 100%"
                :placeholder="$t('forms.calculationsList.toDate')"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy"
              >
              </el-date-picker>
            </div>
          </div>
            
          <div class="d-flex justify-center">
            <v-btn
              width="140"
              outlined
              color="#544B99"
              elevation="0"
              class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
              @click="resetFilter"
            >
              {{ $t('listsModels.dialog.reset') }}
            </v-btn>
            <v-btn
              width="140"
              color="#544B99"
              dark
              elevation="0"
              class="text-capitalize rounded-lg font-weight-bold"
              @click="filterBtn"
            >
              {{ $t('listsModels.dialog.search') }}
            </v-btn>
          </div>
        
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
    @click:row="(item) => viewDetail(item)"
  >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>{{ $t('sidebar.accessory') }}</div>
            <v-btn color="#544B99" dark class="text-capitalize rounded-lg" @click="addOrder">
              <v-icon>mdi-plus</v-icon>
               {{ $t('sidebar.accessory') }}  
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
              @click="viewDetail(item)"
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
        orderNumber:"",
        modelNumber:"",
        toDate:null,
        fromDate:null,
        clientName:"",
      },
      headers: [
        {text: "ID", align: "start", sortable: false, value: "id",},
        {text: this.$t('orderBox.index.orderNum'), value: "orderNumber"},
        {text: this.$t('inspectionBox.model'), value: "modelNumber"},
        {text: this.$t('inspectionBox.clientName'), value: "clientName"},
        {text: this.$t("catalogGroups.tabs.table.createdAt"), value: "createdTimeOfPlanning"},
        {text: this.$t('planning.index.updated'),  value: "updatedTimeOfPlanning"},
        {text: this.$t("catalogGroups.tabs.table.actions"), value: "actions", sortable: false, align: "center"},
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
      const data = {...this.filters};
      this.current_page = value - 1;

      this.getAccessoryList({page: this.current_page, size: this.itemPrePage,data});
    },
    async size(value) {
      const data = {...this.filters};
      this.itemPrePage = value;
      this.getAccessoryList({page: 0, size: this.itemPrePage,data});
    },
    viewDetail(item){
      this.$router.push(this.localePath(`/accessory/${item.id}`))
      this.$store.commit("accessoryChart/setSelectedAccessory",item)
    },
    async filterBtn() {
      const data = {...this.filters};
      await this.getAccessoryList({page: this.current_page, size: this.itemPrePage,data});
    },
    resetFilter(){
      this.getAccessoryList({page: this.current_page, size: this.itemPrePage});

      this.$refs.filters.reset()
      this.filters.toDate=null
      this.filters.fromDate=null
      
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
      this.$router.push(this.localePath(`/accessory/create`));
      this.$store.commit("accessoryChart/setSelectedAccessory",{})
    },
  },

  mounted() {
    this.$store.commit("setPageTitle", "Planning");
  }
};
</script>

<style lang="scss" scoped></style>
