<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0  mt-4 pa-4 pb-0 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              placeholder="Waybill №"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.number"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              placeholder="Model №"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.modelNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          
          <v-col cols="12" lg="2">
            <div class="block">
              <el-date-picker
                v-model="filters.date"
                type="daterange"
                unlink-panels
                range-separator="-"
                start-placeholder="From"
                end-placeholder="To"
                :shortcuts="pickerShortcuts"
                class="filter_picker rounded-lg" 
                value-format="dd.MM.yyyy HH:mm:ss"
    
              />
            </div>
          </v-col>
          
        </v-row>
        <v-row class="mb-7 pb-4 justify-center">
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
                Reset
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
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
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="waybillList"
      :items-per-page="itemPerPage"
      :server-items-length="totalElements"
      @click:row="(item) => viewDetails(item)"
      @update:page="page"
      @update:items-per-page="size"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>Waybills</div>
            <div>
              <v-btn
                color="#544B99"
                dark
                class="text-capitalize rounded-lg"
                @click="addWaybil"
              >
                <v-icon>mdi-plus</v-icon>
                Add waybill
              </v-btn>
            </div>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.action="{ item }">

        <v-tooltip top color="#544B99">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#544B99"
              v-on="on"
              v-bind="attrs"
              @click="viewDetails(item)"
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
import {mapActions,mapGetters} from "vuex"
export default {
  data() {
    return {
      valid_search: true,
      filters: {
        modelNumber: "",
        number: "",
        partnerName: "",
      },

      headers: [
        { text: "Waybill no.", value: "number", sortable: false },
        { text: "Order no.", value: "orderNumber", sortable: false },
        { text: "Model No.", value: "modelNumber", sortable: false },
        {
          text: "Branch name",
          value: "partner",
          sortable: false,
        },
        { text: "Sent date", value: "sendDate", sortable: false },
        { text: "Creator", value: "createdBy", sortable: false },
        { text: "Action", value: "action", sortable: false, width: 110 },
      ],
      itemPerPage: 10,
      current_page:0,
      statusItems: ["PENDING", "SENT", "RECEIVED"],
      items: [
        // Add more sample items as needed
      ],
    };
  },

  computed: {
    ...mapGetters({
      waybillList:"waybill/waybillList",
      totalElements:"waybill/totalElements",
    })
  },

  methods: {
    ...mapActions({
      getWaybillList:"waybill/getWaybillList",
    }),
    resetFilters() {
      this.getWaybillList({page:0,size:10,type:"INTERNAL"})
      this.$refs.filter_form.reset()
      this.filters.date=[]
    },
    filterData() {
      const data={
        type:"INTERNAL",
        page:0,
        size:10,
        ...this.filters,
        fromDate:this.filters.date[0],
        toDate:this.filters.date[1],
      }
      delete data.date
      this.getWaybillList(data)
    },
    addWaybil() {
      this.$router.push("/production/waybills/add-waybill");
    },
    viewDetails(item) {
      this.$router.push(`/production/waybills/${item.id}`)
    },
    deleteFunc(item) {},
    page(value) {
      this.current_page = value - 1;
      this.getWaybillList({page:this.current_page,size:this.itemPerPage,type:"INTERNAL"})
    },

    size(value) {
      this.itemPerPage = value;
      this.getWaybillList({page:0,size:this.itemPerPage,type:"INTERNAL"})
    },
  },
  mounted() {
    this.getWaybillList({page:0,size:10,type:"INTERNAL"})
  },
};
</script>
<style lang=""></style>
