<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :placeholder="$t('secondaryWarehouse.index.modelNo')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.modelNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
             :placeholder="$t('secondaryWarehouse.index.orderNo')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.orderNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2">
            <div style="height: 40px !important">
              <el-date-picker
                v-model="filters.createdAt"
                type="datetime"
                style="width: 100%; height: 100%"
                class="filter_picker"
                :placeholder="$t('secondaryWarehouse.index.from')"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </div>
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
               {{ $t('secondaryWarehouse.index.reset') }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                  {{ $t('secondaryWarehouse.index.search') }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>

    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="itemsList"
      :items-per-page="itemPerPage"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      @update:page="page"
      @update:items-per-page="size"
      :server-items-length="totalElements"
      @click:row="(item) => viewDetails(item)"
      item-key="modelNumber"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>  {{ $t('secondaryWarehouse.index.title') }}</div>
            <div>
              <v-btn color="#544B99" dark class="text-capitalize rounded-lg" @click="addGarment">
                <v-icon>mdi-plus</v-icon>
                 {{ $t('secondaryWarehouse.index.addGarments') }}
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
        orderNumber: "",
        createdAt: "",
      },

      headers: [
       
        { text:this.$t('secondaryWarehouse.index.waybillNo'), value: "waybillNumber", sortable: false },
        {
          text: this.$t('secondaryWarehouse.index.twoSortQuantity'),
          value: "secondSortTotal",
          sortable: false,
        },
        {
          text: this.$t('secondaryWarehouse.index.overproductionsQuantity'),
          value: "overproductionTotal",
          sortable: false,
        },
        { text: this.$t('secondaryWarehouse.index.sewedBy'), value: "sewedBy", sortable: false },
        { text: this.$t('secondaryWarehouse.index.createdBy'), value: "createdBy", sortable: false },
        { text:  this.$t('secondaryWarehouse.index.createdAt'), value: "createdAt", sortable: false },
        { text:  this.$t('secondaryWarehouse.index.action'), value: "action", sortable: false },
      ],
      current_page:0,
      itemPerPage: 10,
    };
  },

  computed:{
    ...mapGetters({
      itemsList: "generalWarehouse/itemsList",
      totalElements: "generalWarehouse/totalElements",
    })
  },

  methods: {
    ...mapActions({
      getItems:"generalWarehouse/getItems",
    }),
    resetFilters() {},
    filterData() {},
    addGarment(){
      this.$router.push(this.localePath("/secondary-warehouse/add-garment"))
    },
    viewDetails(item) {
      this.$router.push( this.localePath(`/secondary-warehouse/${item.id}`))
    },
    page(value) {
      this.current_page=value-1
      this.getItems({page:this.current_page,size:this.itemPerPage,type:"SECONDARY"})
    },

    size() {
      this.getItems({page:0,size:this.itemPerPage,type:"SECONDARY"})
    },
  },

  mounted(){
    this.$store.commit("setPageTitle", "Secondary warehouse");
    this.getItems({page:0,size:10,type:"SECONDARY"})
  }
};
</script>
<style lang=""></style>
