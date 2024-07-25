<template >
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
              label="Model number"
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
              label="Model name"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.modelName"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <div style="height: 40px !important" class="mr-2">
              <el-date-picker
                v-model="filters.fromDate"
                class="rounded-lg d-block filter_picker "
                type="date"
                style="width: 100%; height: 100%"
                placeholder="From date"
                :picker-options="pickerShortcuts"
                value-format="dd-MM-yyyy"
              >
              </el-date-picker>
            </div>
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <div style="height: 40px !important" class="mr-2">
              <el-date-picker
                v-model="filters.toDate"
                class="rounded-lg d-block filter_picker "
                type="date"
                style="width: 100%; height: 100%"
                placeholder="To date"
                :picker-options="pickerShortcuts"
                value-format="dd-MM-yyyy"
              >
              </el-date-picker>
            </div>
          </v-col>
          <v-spacer/>
          <v-col cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn
                width="140" outlined
                color="#544B99" elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                {{ $t('planningProduction.dialog.reset') }}
              </v-btn>
              <v-btn
                width="140" color="#544B99" dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t('planningProduction.dialog.search') }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="stockList"
      :items-per-page="itemPerPage"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      @update:page="page"
      @update:items-per-page="size"
      :server-items-length="totalElements"
      @click:row="(item) => viewDetails(item)"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>Garments of Stock</div>
            <div>
              <v-btn color="#544B99" dark class="text-capitalize rounded-lg" @click="addGarment">
                <v-icon>mdi-plus</v-icon>
                add Garments
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
              @click.stop="viewDetails(item)"
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
  data(){
    return{
      filters:{
        modelNumber:"",
        modelName:"",
        fromDate:"",
        toDate:"",
      },
      valid_search:true,
      itemPerPage:10,
      currentPage:0,
      itemsList:[],
      headers: [
        { text: "Model No.", value: "modelNumber", sortable: false },
        { text: "Model name", value: "modelName", sortable: false },
        { text: "Price", value: "price", sortable: false },
        { text: "Production quantity", value: "productionQuantity", sortable: false },
        { text: "Remaining quantity", value: "remainingQuantity", sortable: false },
        { text: "Added at", value: "createdAt", sortable: false },
        { text: "Added by", value: "createdBy", sortable: false },
        { text: "Action", value: "action", sortable: false },
      ],
    }
  },

  computed:{
    ...mapGetters({
      stockList:"garmentStock/stockList",
      totalElements:"garmentStock/totalElements",

    })
  },

  methods:{
    ...mapActions({
      getStockList:"garmentStock/getStockList",
    }),
    filterData(){
      this.getStockList({page:0,size:10,...this.filters})
    },
    resetFilters(){
     this.$refs.filter_form.reset()
     this.filters.fromDate=null
     this.filters.toDate=null
     this.getStockList({page:0,size:10})

    },
    viewDetails(item){
      this.$store.commit("garmentStock/setStockId",item.id)
      this.$router.push(`/garments-stock/${item.id}`)
    },
    page(value){
      this.currentPage=val-1
      this.getStockList({page:this.currentPage,size:this.itemPerPage})
    },
    size(value){
      this.itemPerPage=value
      this.getStockList({page:0,size:this.itemPerPage})

    },

    addGarment(){
      this.$router.push("/garments-stock/add-garment")
    }
  },

  mounted(){
    this.getStockList({page:0,size:10})
  }
}
</script>
<style lang="">
  
</style>