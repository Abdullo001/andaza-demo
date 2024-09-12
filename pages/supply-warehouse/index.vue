<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :placeholder="$t('supplyWarehouse.modelNo')"
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
              :placeholder="$t('supplyWarehouse.orderNo')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.orderNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2">
            <v-text-field
              :placeholder="$t('supplyWarehouse.subconName')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.partner"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2">
            <v-select
              :items="statusItems"
              v-model="filters.status"
              :placeholder="$t('supplyWarehouse.status')"
              dense
              outlined
              hide-details
              validate-on-blur
              class="rounded-lg filter mr-2"
              append-icon="mdi-chevron-down"
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
               {{$t('supplyWarehouse.reset') }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{$t('supplyWarehouse.search') }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>

    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="items"
      :items-per-page="itemPerPage"
      hide-default-footer
      :server-items-length="totalElements"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div> {{$t('supplyWarehouse.title') }}</div>
            <div>
              <v-btn
                color="#544B99"
                outlined
                class="text-capitalize rounded-lg"
                @click="addWaybil"
              >
               {{$t('supplyWarehouse.waybill') }}
              </v-btn>
            </div>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.status="{ item }">
        <v-chip :color="statusColor.subcontractColor(item.status)" dark>
          {{ item.status }}
        </v-chip>
      </template>

      <template #item.sizes="{ item }">
        <table style="width: 100% !important">
          <thead>
            <tr>
              <th
                class="mr-2"
                v-for="(el, idx) in item.sizeDistributions"
                :key="`${item.modelNumber}-${el.size}-${idx}`"
              >
                {{ el.size }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                v-for="(el, idx) in item.sizeDistributions"
                :key="`${item.modelNumber}` + `${el.size}` + `${idx}`"
              >
                {{ el.quantity }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>

      <template #item.action="{ item }">
        <div>
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
          <v-tooltip top color="#544B99">
            <template v-slot:activator="{ on, attrs }">
              <FinishProcessBtn  class="d-inline-block" v-bind="{modelId:item.modelId,propertyName:'SUPPLY_WAREHOUSE',type:true}" />
            </template>
            <span>Finish process</span>
          </v-tooltip>
          <v-tooltip top color="red">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="red"
                v-on="on"
                v-bind="attrs"
                @click="deleteFunc(item)"
              >
                <v-img src="/trash-red.svg" max-width="20" />
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="edit_dialog" width="1200">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            Supply to branch/subcontractor
          </div>
          <v-btn icon color="#544B99" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="edit_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="12" md="12">
                <div class="label">Planned Accessory expense for 1 set</div>
                <div class="d-flex align-center">
                  <v-select
                    v-model="expenseGroupId"
                    :items="expenseGroup"
                    item-value="id"
                    item-text="name"
                    append-icon="mdi-chevron-down"
                    class="rounded-lg base rounded-l-lg rounded-r-0 mr-1"
                    color="#544B99"
                    dense
                    placeholder="Expense group"
                    height="44"
                    hide-details
                    outlined
                    style="max-width: 200px"
                    validate-on-blur
                  />
                  <v-text-field
                    disabled
                    v-model="expense.totalPrice"
                    class="rounded-lg base rounded-l-0 rounded-r-0 mr-1"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    placeholder="0.00"
                    readonly
                    validate-on-blur
                  />
                  <v-text-field
                    disabled
                    v-model="expense.currency"
                    class="rounded-lg base rounded-l-0 rounded-r-lg"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    placeholder="Currency"
                    readonly
                    validate-on-blur
                  />
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <div class="label">Price per work</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="selectedItem.price"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    placeholder="0.00"
                    validate-on-blur
                  />
                  <v-select
                    v-model="selectedItem.currency"
                    :items="currency_enums"
                    append-icon="mdi-chevron-down"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    style="max-width: 100px"
                    validate-on-blur
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <div class="label">Waybill No.</div>
                <div class="search-field">
                  <v-combobox
                    v-model="selectedItem.waybillId"
                    :items="waybillList"
                    item-text="number"
                    item-value="id"
                    :return-object="true"
                    :search-input.sync="waybilSearch"
                    class="rounded-lg base d-flex align-center justify-center"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    placeholder="Select waybill No."
                    prepend-icon=""
                    style="margin-bottom:22px"
                  >
                    <template #append>
                      <v-icon class="d-inline-block" color="#544B99">
                        mdi-magnify
                      </v-icon>
                    </template>
                  </v-combobox>
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Name of delivering products</div>
                <v-text-field
                  v-model="selectedItem.name"
                  placeholder="Enter name"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base "
                  validate-on-blur
                  dense
                  color="#544B99"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="3" v-for="(item, idx) in selectedItem.sizeDistributionList" :key="`_cutting_${idx}`">
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
                  placeholder="0"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base "
                  validate-on-blur
                  dense
                  color="#544B99"
                />
              </v-col>
              
            </v-row>
            <v-row>
              <v-col cols="12" lg="3">
                <div class="label">M/U</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="selectedItem.measurementUnitId"
                  :items="measurementUnitList"
                  :rules="[formRules.required]"
                  item-text="name"
                  item-value="id"
                  hide-details
                  color="#544B99"
                  class=" base rounded-lg"
                  rounded
                  outlined
                  dense
                  placeholder="Select measurment unit"
                />
              </v-col>
              <v-col cols="3" class="d-flex align-center">
                <v-switch inset v-model="autoFilling" color="#4F46E5" />
                <div class="label mr-5 ">Aut.Filling</div>
              </v-col>
            </v-row>
              <!-- <v-col cols="12" lg="3" v-for="(item, idx) in selectedItem.sizeDistributions" :key="`_cutting_${idx}`">
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
                  placeholder="0"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base "
                  validate-on-blur
                  dense
                  color="#544B99"
                />
              </v-col>
            </v-row>
            <v-row v-if="title!=='packaging'">
              <v-col cols="8">
                <v-radio-group

                  row
                  v-model.trim="selectedItem.workshopType"
                  class="mb-4"
                >
                  <v-radio
                    :aria-disabled="selectedItem.status==='edit_history'"
                    color="#544B99"
                    label="Own workshop"
                    value="OWN_WORKSHOP"
                  ></v-radio>
                  <v-radio
                    color="#544B99"
                    label="Subcontractor"
                    value="SUBCONTRACTOR"
                  ></v-radio>
                  <v-radio
                    v-if="passSupplyWarehouse"
                    color="#544B99"
                    label="Supply warehouse"
                    value="SUPPLY_WAREHOUSE"
                  ></v-radio>

                </v-radio-group>
              </v-col>
              <v-col cols="4" class="d-flex align-center">
                <v-switch inset v-model="autoFilling" color="#4F46E5" />
                <div class="label mr-5 ">Aut.Filling</div>
              </v-col>
              <v-col cols="12" lg="6" >
                <div class="label"  >Select the next process</div>
                <v-select
                  :items="nextProcessList"
                  item-text="process"
                  item-value="process"
                  v-model.trim="selectedItem.process"
                  :disabled="selectedItem.status==='edit_history'"
                  append-icon="mdi-chevron-down"
                  outlined
                  hide-details
                  dense
                  height="44"
                  class="rounded-lg base" color="#544B99"
                  placeholder="Select process type"
                />
              </v-col>
              <v-col cols="12" lg="6" v-if="selectedItem.workshopType==='SUBCONTRACTOR'">
                <div class="label">Partner</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="selectedItem.partnerId"
                  :items="partnerList"
                  :rules="[formRules.required]"
                  item-text="name"
                  item-value="id"
                  hide-details
                  color="#544B99"
                  class=" base rounded-lg"
                  rounded
                  outlined
                  dense
                  placeholder="Select partner"
                />
              </v-col> -->
            
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#544B99"
            width="130"
            @click="closeDialog"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="save"
          >
            save
          </v-btn>
        </v-card-actions>

        <div class="px-4 pb-4">
          <v-data-table
            :headers="historyHeaders"
            hide-default-footer
            :items="historyList"
            class="mt-4 rounded-lg"
            style="border: 1px solid #E9EAEB"
          >
            
          </v-data-table>
        </div>
      </v-card>
    </v-dialog>

    <DeleteDialog v-bind="deleteData" />
  </div>
</template>
<script>
import DeleteDialog from "../../components/DeleteDialog.vue";
import FinishProcessBtn from "@/components/FinishProcessBtn.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    DeleteDialog,
    FinishProcessBtn,
  },
  data() {
    return {
      selectedItem: {
        boxQuantity: "",
        currency: "",
        measurementUnitId: "",
        name: "",
        partnerId: null,
        price: "",
        productionId: null,
        totalQuantity: null,
        type: "FIRST_CLASS",
        waybillId: null,
      },
      expenseGroupId:"",
      expense:{},
      waybilSearch:"",
      currency_enums:["USD","UZS","RUB"],
      valid_search: true,
      edit_validate: true,
      filters: {
        modelNumber: "",
        orderNumber: "",
        partner: "",
        status: "",
      },
      deleteDialog: false,
      edit_dialog: false,
      autoFilling: false,
      historyList:[],

      headers: [
        { text: this.$t('supplyWarehouse.incomeFrom'), value: "fromProcess", sortable: false },
        { text: this.$t('supplyWarehouse.orderNo'), value: "orderNumber", sortable: false },
        { text: this.$t('supplyWarehouse.modelNo'), value: "modelNumber", sortable: false },
        { text: this.$t('supplyWarehouse.mainColor'), value: "colorSpecification", sortable: false },
        { text: this.$t('supplyWarehouse.artWork'), value: "artWork", sortable: false },
        { text: this.$t('supplyWarehouse.sizeName'), value: "sizeName", sortable: false },
        {
          text: this.$t('supplyWarehouse.sizeName'),
          value: "sizes",
          sortable: false,
          width: 400,
          align: "center",
        },
        { text: this.$t('supplyWarehouse.totalQuantity'), value: "totalQuantity", sortable: false },
        {
          text: this.$t('supplyWarehouse.servicePricePerWork'),
          value: "pricePerWork",
          sortable: false,
        },
        { text: this.$t('supplyWarehouse.orderDeadline'), value: "orderDeadline", sortable: false },
        {
          text: this.$t('supplyWarehouse.branchName'),
          value: "partner",
          sortable: false,
        },
        { text:  this.$t('supplyWarehouse.sentDate'), value: "sendDate", sortable: false },
        { text:  this.$t('supplyWarehouse.status'), value: "status", sortable: false },
        { text:  this.$t('supplyWarehouse.action'), value: "action", sortable: false, width: 160 },
      ],
      historyHeaders:[
        {text:"Send date", value:"sendDate",sortable:false},
        {text:"Total", value:"totalQuantity",sortable:false},
        {text:"Branc/sub-tor", value:"partner",sortable:false},
        {text:"Service price", value:"pricePerWork",sortable:false},
        {text:"Waybill number", value:"waybillNumber",sortable:false},

      ],
      itemPerPage: 10,
      statusItems: ["PENDING", "SENT", "RECEIVED"],
      items: [],
    };
  },

  created(){
    this.getWaybillList({page:0,size:10,type:"EXTERNAL"})
    this.getMeasurementUnit()
  },

  computed: {
    finishDate:{
      get(){
        return{
          // modelId:!!this.oneModel.id?this.oneModel.id:0,
          modelId:0,
          propertyName:"SUPPLY_WAREHOUSE",
          type:true,
        }
      }
    },
    deleteData: {
      get() {
        return {
          deleteDialog: this.deleteDialog,
          deleteFunction: () => {},
          closeDialog: () => {
            this.deleteDialog = false;
          },
        };
      },
    },

    ...mapGetters({
      supplyList: "supply/supplyList",
      historyListStore: "supply/historyList",
      totalElements: "supply/totalElements",
      waybillList: "waybill/waybillList",
      measurementUnitList: "preFinance/measurementUnit",
      expenseForProduction: "expenseGroup/expenseForProduction",
      expenseGroup: "expenseGroup/expenseGroup",
    }),
  },

  watch: {
    expenseGroupId(val){
      this.getExpenseProduction({groupId:val,modelId:this.selectedItem.modelId})
    },
    expenseForProduction(val){
      this.expense=JSON.parse(JSON.stringify(val))
    },
    supplyList(list) {
      const specialList = list.map(function (el) {
        const value = {};
        const sizesList = [];
        el?.sizeDistributions.forEach((item) => {
          value[item.size] = item.quantity
          sizesList.push({size: item.size, quantity: 0})
        });

        return {
          ...value,
          ...el,
          sizeDistributionList: [...sizesList],

        }
      })

      this.items = JSON.parse(JSON.stringify(specialList))
    },
    autoFilling(val){
      if(val){
        this.selectedItem.sizeDistributionList.forEach((item,idx)=>{
          item.quantity=this.selectedItem.sizeDistributions[idx].quantity
        })
      }else{
        this.selectedItem.sizeDistributionList.forEach((item,idx)=>{
          item.quantity=0
        })
      }
    },

    historyListStore(list){
      this.historyHeaders=[
        {text:"Send date", value:"sendDate",sortable:false},
      ]
      list[0]?.sizeDistributions.forEach((item) => {
        this.historyHeaders.push({
          text: item.size, sortable: false, align: 'start', value: item.size
        })
      })

      this.historyHeaders.push(
        {text:"Total", value:"totalQuantity",sortable:false},
        {text:"Branc/sub-tor", value:"partner",sortable:false},
        {text:"Service price", value:"pricePerWork",sortable:false},
        {text:"Waybill number", value:"waybillNumber",sortable:false},
      )

      const specialList = list.map(function (el) {
        const value = {};
        const sizesList = [];
        el?.sizeDistributions.forEach((item) => {
          value[item.size] = item.quantity
          sizesList.push({size: item.size, quantity: item.quantity})
        });

        return {
          ...value,
          ...el,
          sizeDistributionList: [...sizesList],

        }
      })

      this.historyList = JSON.parse(JSON.stringify(specialList))
    },

    waybilSearch(val){
      const item=val??""
      this.getWaybillList({page:0,size:10,number:item,type:"EXTERNAL"})
    }
  },

  methods: {
    ...mapActions({
      getSupplyList: "supply/getSupplyList",
      getSupplyHistory: "supply/getSupplyHistory",
      spendSupply: "supply/spendSupply",
      getWaybillList: "waybill/getWaybillList",
      getMeasurementUnit: "preFinance/getMeasurementUnit",
      filterExpenseGroup: "expenseGroup/filterExpenseGroup",
      getExpenseProduction: "expenseGroup/getExpenseProduction",
    }),
    resetFilters() {
      this.getSupplyList({ page: 0, size: 10 });
      this.$refs.filter_form.reset()

    },
    filterData() {
      this.getSupplyList({ page: 0, size: 10,...this.filters });
    },
    addWaybil() {
      this.$router.push("/supply-warehouse/waybills");
    },
    viewDetails(item) {
      this.edit_dialog = true;
      this.selectedItem={...item}
      this.getSupplyHistory(item.id)
    },
    deleteFunc(item) {
      this.deleteDialog = true;
    },
    page(value) {
      this.current_page = value - 1;
      this.getOrdersList({
        page: this.current_page,
        size: this.itemPrePage,
      });
    },
    size() {
      this.getSupplyList({ page: 0, size: this.itemPerPage });
    },

    closeDialog() {
      this.edit_dialog = false;
      this.autoFilling = false;
    },
    save() {
      const data={
        currency:this.selectedItem.currency,
        measurementUnitId:this.selectedItem.measurementUnitId,
        name:this.selectedItem.name,
        price:this.selectedItem.price,
        sizeDistributions:this.selectedItem.sizeDistributionList,
        waybillId:this.selectedItem.waybillId?.id,
        type:"FIRST_CLASS",
      }
      this.spendSupply({id:this.selectedItem.id,data})
      this.edit_dialog=false
    },
    finishFunc(){
      console.log("hello");
      
    }
  },
  mounted() {
    this.filterExpenseGroup({id:"",name:"",createdAt:"",updateAt:""})
    this.$store.commit("setPageTitle", "Supply warehouse");
    this.getSupplyList({ page: 0, size: 10 });
  },
};
</script>
<style lang=""></style>
