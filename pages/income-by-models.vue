<template>
  <div>
    <v-card elevation="0" class="mb-4">
      <v-card-text>
        <v-radio-group row v-model.trim="pageType" class="">
          <v-radio
            color="#544B99"
            label="Annual"
            value="YEARLY"
          ></v-radio>
          <v-radio
            color="#544B99"
            label="Monthly"
            value="MONTHLY"
          ></v-radio>
        </v-radio-group>
      </v-card-text>
    </v-card>

    <v-row class="mb-6">
      <v-col cols="12" lg="3" md="6" >
        <v-card elevation="0" v-if="!loader">
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-2">
              <div>
                <div class="text-subtitle-1 mb-1">{{ $t("shipping.shippingModels") }}</div>
                <div class="text-h4 font-weight-bold" style="color:black">{{totalAnalysis.shippedModels}}</div>
              </div>
              <img src="/modelReport/shipping.svg" alt="pic">
            </div>
            <div class="d-flex align-center justify-space-between">
              <div v-if="totalAnalysis?.shippedModelsRate?.split('%')[0]>=0" class="rounded-lg py-2 px-2 d-flex align-center justify-space-between" style="background-color: #A1F1A4; width: 100px; color: #0FA958;" >
                <v-icon color="#0FA958">mdi-chevron-up</v-icon>
                <div class="text-h6 font-weight-bold">{{totalAnalysis.shippedModelsRate}}</div>
              </div>
              <div v-else class="rounded-lg py-2 px-2 d-flex align-center justify-space-between" style="background-color: #FFB6B6; width: 100px; color: #A90F0F;" >
                <v-icon color="#A90F0F">mdi-chevron-down</v-icon>
                <div class="text-h6 font-weight-bold">{{totalAnalysis.shippedModelsRate}}</div>
              </div>
              <div class="text-subtitle-2 ">
                Since last period
              </div>
            </div>
          </v-card-text>
        </v-card>
        <v-skeleton-loader
          v-else
          class="mx-auto"
          height="100%"
          type="article, table-heading"

        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" lg="3" md="6" >
        <v-card elevation="0" v-if="!loader">
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-2">
              <div>
                <div class="text-subtitle-1 mb-1">Total works</div>
                <div class="text-h4 font-weight-bold" style="color:black">{{moneyFormatter(totalAnalysis.totalWorks, true)}}</div>
              </div>
              <img src="/modelReport/total.svg" alt="pic">
            </div>
            <div class="d-flex align-center justify-space-between">
              <div v-if="totalAnalysis?.totalWorksRate?.split('%')[0]>=0" class="rounded-lg py-2 px-2 d-flex align-center justify-space-between" style="background-color: #A1F1A4; width: 100px; color: #0FA958;" >
                <v-icon color="#0FA958">mdi-chevron-up</v-icon>
                <div class="text-h6 font-weight-bold">{{totalAnalysis.totalWorksRate}}</div>
              </div>
              <div v-else class="rounded-lg py-2 px-2 d-flex align-center justify-space-between" style="background-color: #FFB6B6; width: 100px; color: #A90F0F;" >
                <v-icon color="#A90F0F">mdi-chevron-down</v-icon>
                <div class="text-h6 font-weight-bold">{{totalAnalysis.totalWorksRate}}</div>
              </div>
              <div class="text-subtitle-2 ">
                Since last period
              </div>
            </div>
          </v-card-text>
        </v-card>
        <v-skeleton-loader
          v-else
          class="mx-auto"
          height="100%"
          type="article, table-heading"

        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" lg="3" md="6" >
        <v-card elevation="0" v-if="!loader">
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-2">
              <div>
                <div class="text-subtitle-1 mb-1">Total price</div>
                <div class="text-h4 font-weight-bold" style="color:black">{{totalAnalysis.totalPrice}}</div>
              </div>
              <img src="/modelReport/totalPrice.svg" alt="pic">
            </div>
            <div class="d-flex align-center justify-space-between">
              <div v-if="totalAnalysis?.totalPriceRate?.split('%')[0]>=0" class="rounded-lg py-2 px-2 d-flex align-center justify-space-between" style="background-color: #A1F1A4; width: 100px; color: #0FA958;" >
                <v-icon color="#0FA958">mdi-chevron-up</v-icon>
                <div class="text-h6 font-weight-bold">{{totalAnalysis.totalPriceRate}}</div>
              </div>
              <div v-else class="rounded-lg py-2 px-2 d-flex align-center justify-space-between" style="background-color: #FFB6B6; width: 100px; color: #A90F0F;" >
                <v-icon color="#A90F0F">mdi-chevron-down</v-icon>
                <div class="text-h6 font-weight-bold">{{totalAnalysis.totalPriceRate}}</div>
              </div>
              <div class="text-subtitle-2 ">
                Since last period
              </div>
            </div>
          </v-card-text>
        </v-card>
        <v-skeleton-loader
          v-else
          class="mx-auto"
          height="100%"
          type="article, table-heading"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" lg="3" md="6" >
        <v-card elevation="0" v-if="!loader">
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-2">
              <div>
                <div class="text-subtitle-1 mb-1">Total profit</div>
                <div class="text-h4 font-weight-bold" style="color:black">{{totalAnalysis.totalProfit}}</div>
              </div>
              <img src="/modelReport/totalProfit.svg" alt="pic">
            </div>
            <div class="d-flex align-center justify-space-between">
              <div v-if="totalAnalysis?.totalProfitRate?.split('%')[0]>=0" class="rounded-lg py-2 px-2 d-flex align-center justify-space-between" style="background-color: #A1F1A4; width: 100px; color: #0FA958;" >
                <v-icon color="#0FA958">mdi-chevron-up</v-icon>
                <div class="text-h6 font-weight-bold">{{totalAnalysis.totalProfitRate}}</div>
              </div>
              <div v-else class="rounded-lg py-2 px-2 d-flex align-center justify-space-between" style="background-color: #FFB6B6; width: 100px; color: #A90F0F;" >
                <v-icon color="#A90F0F">mdi-chevron-down</v-icon>
                <div class="text-h6 font-weight-bold">{{totalAnalysis.totalProfitRate}}</div>
              </div>
              <div class="text-subtitle-2 ">
                Since last period
              </div>
            </div>
          </v-card-text>
        </v-card>
        <v-skeleton-loader
          v-else
          class="mx-auto"
          height="100%"
          type="article, table-heading"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <!-- <v-card>
      <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
        <v-col cols="12" lg="3">
          <v-combobox
            v-model="filter.clientName"
            :items="partnerWithTypes"
            item-text="name"
            item-value="name"
            validate-on-blur
            outlined
            hide-details
            height="44"
            class="rounded-lg filter d-flex align-center justify-center mr-2"
            :return-object="false"
            dense
            :placeholder="
              $t('forms.calculationsList.clientNamePlaceholder')
            "
            prepend-icon=""
          >
            <template #append>
              <v-icon class="d-inline-block" color="#544B99">
                mdi-magnify
              </v-icon>
            </template>
          </v-combobox>
        </v-col>
        <v-col cols="12" lg="2" md="2" class="" style="max-width: 240px">
          <el-date-picker
            v-model="filter.from"
            type="date"
            class="filter_picker"
            :placeholder="$t('from')"
            :picker-options="pickerShortcuts"
            value-format="timestamp"
          >
          </el-date-picker>
        </v-col>
        <v-col cols="12" lg="2" md="2">
          <el-date-picker
            v-model="filter.to"
            type="date"
            class="filter_picker"
            :placeholder="$t('to')"
            :picker-options="pickerShortcuts"
            value-format="timestamp"
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
              {{ $t("catalogsPartnerType.child.reset") }}
            </v-btn>
            <v-btn
              width="140"
              color="#544B99"
              dark
              elevation="0"
              class="text-capitalize rounded-lg"
              @click="filterData"
            >
              {{ $t("catalogsPartnerType.child.search") }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <div class="table-container">
        <v-simple-table class="min-w-800" dense>
          <thead>
            <tr class="text-center">
              <th v-for="(header, idx) in headers"
                  :key="`header-${idx}`"
                  :class="`th-text ${header.fixed ? 'sticky-column' : ''}`">
                {{ header.text }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(obj, rowIdx) in modelsAnalysisList" :key="`row-${rowIdx}`">
              <td class="sticky-column">{{rowIdx + 1}}</td>
              <td class="sticky-column">{{ obj.orderNumber }}</td>
              <td class="sticky-column">
                <v-img
                  :src="obj.photo"
                  width="40"
                  height="40"
                  @click="showImage(obj.photo)"
                />
              </td>
              <td class="sticky-column">{{ obj.modelNumber }}</td>
              <td>{{ obj.modelName }}</td>
              <td>{{ obj.soldPrice }}</td>
              <td>{{ obj.orderQuantity }}</td>
              <td>{{ obj.overProdQuantity }}</td>
              <td>{{ obj.quantityWithOverProd }}</td>
              <td>{{ obj.shippedQuantity }}</td>
              <td>{{ obj.totalPriceOfModel }}</td>
              <td>{{ obj.shippedTotalPrice }}</td>
              <td>{{ obj.calculatedFabricKg }}</td>
              <td>{{ obj.fabricPrice }}</td>
              <td>{{ obj.totalFabricPrice }}</td>
              <td>{{ obj.receivedFabricKg }}</td>
              <td>{{ obj.factPrice }}</td>
              <td>{{ obj.receivedFabricTotalPrice }}</td>
              <td>{{ obj.fabricDifferenceKg }}</td>
              <td>{{ obj.differenceTotalPrice }}</td>
              <td>{{ obj.fabricSupplier }}</td>
              <td>{{ obj.planningAccessoryExpenses }}</td>
              <td>{{ obj.receivedAccessoryPrice }}</td>
              <td>{{ obj.differenceAccessoryPrice }}</td>
              <td>{{ obj.plannedPrintExpenses }}</td>
              <td>{{ obj.factPrintExpenses }}</td>
              <td>{{ obj.differencePrintExpenses }}</td>
              <td>{{ obj.currency }}</td>
              <td>-</td>
              <td class="sticky-column">-</td>
            </tr>

            <tr>
              <td class="sticky-column"></td>
              <td class="sticky-column"></td>
              <td class="sticky-column"></td>
              <td class="sticky-column">Total</td>
              <td></td>
              <td>{{ modelsAnalysis.totalSoldPrice }}</td>
              <td>{{ modelsAnalysis.totalOrderQuantity }}</td>
              <td></td>
              <td>{{ modelsAnalysis.totalWithOverProd }}</td>
              <td>{{ modelsAnalysis.totalShippedQuantity }}</td>
              <td>{{ modelsAnalysis.totalPriceOfModel }}</td>
              <td>{{ modelsAnalysis.shippedTotalPrice }}</td>
              <td>{{ modelsAnalysis.totalCalculatedFabricKg }}</td>
              <td>{{ modelsAnalysis.totalFabricPrice }}</td>
              <td></td>
              <td>{{ modelsAnalysis.totalReceivedFabricKg }}</td>
              <td>{{ modelsAnalysis.factTotalFabricPrice }}</td>
              <td></td>
              <td>{{ modelsAnalysis.totalFabricDifferenceKg }}</td>
              <td>{{ modelsAnalysis.totalFabricDifferencePrice }}</td>
              <td></td>
              <td>{{ modelsAnalysis.totalPlanningAccessoryExpense }}</td>
              <td>{{ modelsAnalysis.totalReceivedAccessoryPrice }}</td>
              <td>{{ modelsAnalysis.totalDifferenceAccessoryPrice }}</td>
              <td>{{ modelsAnalysis.totalPlannedPrintExpenses }}</td>
              <td>{{ modelsAnalysis.totalFactPrintExpenses }}</td>
              <td>{{ modelsAnalysis.totalDifferencePrintExpenses }}</td>
              <td>-</td>
              <td class="sticky-column">-</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </v-card> -->
    <v-card class="px-2">
      <v-row class="w-full align-center" justify="start">
        <v-col cols="12" lg="4">
          <v-combobox
            v-model="filter.modelNumber"
            :items="modelsList"
            :search-input.sync="modelNumSearch"
            item-text="modelNumber"
            item-value="modelNumber"
            validate-on-blur
            outlined
            hide-details
            height="44"
            class="rounded-lg filter d-flex align-center justify-center mr-2"
            :return-object="true"
            dense
            :placeholder="
              $t('forms.placedOrdersBox.modelNumberPlaceholder')
            "
            prepend-icon=""
          >
            <template #append>
              <v-icon class="d-inline-block" color="#544B99">
                mdi-magnify
              </v-icon>
            </template>
          </v-combobox>
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
              {{ $t("catalogsPartnerType.child.reset") }}
            </v-btn>
            <v-btn
              width="140"
              color="#544B99"
              dark
              elevation="0"
              class="text-capitalize rounded-lg"
              @click="filterData"
            >
              {{ $t("catalogsPartnerType.child.search") }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <VDataTableWrapper :headers="headers" :items="items" :hideDefaultFooter="true" :fixedColumns="4">
            <template #item.photo="{item}">
              <div class="d-flex justify-center align-center">
                <ImageContainer :value="item.photo" :width="40" :height="`100%`"/>
              </div>
            </template>
            <template #item.totalLaborCost="{item}">
              <v-text-field
                @keyup.enter="handleEnter(item)"
                outlined
                height="32"
                class="rounded-lg base"
                hide-details
                dense
                v-model="item.totalLaborCost"
              >
              </v-text-field>
            </template>
            <template #item.totalOtherCost="{item}">
              <v-text-field
                @keyup.enter="handleEnter(item)"
                outlined
                height="32"
                class="rounded-lg base"
                hide-details
                dense
                v-model="item.totalOtherCost"
              >
              </v-text-field>
            </template>
          </VDataTableWrapper>
        </v-col>
        <v-col cols="6">
          <AdditionalTabel :headers="orderQuantity" :items="orderQuantityList" :title="`Order quantity`"/>
        </v-col>
        <v-col cols="6">
          <AdditionalTabel :headers="orderQuantity" :items="shippedQuantityList" :title="`Shipped quantity`"/>
        </v-col>
        <v-col cols="6">
          <AdditionalTabel :headers="classificationHeaders" :items="classificationList" :title="`Classification of shortcomings`"/>
        </v-col>
        <v-col cols="6">
          <AdditionalTabel :headers="orderQuantity" :items="remainingFirstQuantityList" :title="`Remaining (1-sort)`"/>
        </v-col>
        <v-col cols="6">
          <AdditionalTabel :headers="orderQuantity" :items="remainingSecondQuantityList" :title="`Remaining (2-sort)`"/>
        </v-col>
        <v-col cols="6">
          <AdditionalTabel :headers="wasteHeaders" :items="wasteList" :title="`Wastes`"/>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog max-width="590" v-model="image_dialog">
      <v-card >
        <v-card-title class="d-flex">
          <v-spacer/>
          <v-btn icon color="#544B99" large @click="image_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-img :src="currentImage" height="500" class="mb-4" contain/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import AdditionalTabel from "@/components/IncomeByModel/AdditionalTabel.vue";
import VDataTableWrapper from "@/components/UI/VDataTableWrapper.vue";
import ImageContainer from "@/components/UI/ImageContainer.vue";
export default {
  components:{
    AdditionalTabel,
    VDataTableWrapper,
    ImageContainer,
  },
  data(){
    return{
      filter:{
        to: "",
        from: "",
        clientName: "",
      },
      pageType:"YEARLY",
      loader: true,
      // headers:[
      //   {text:"No.",value:"orderedNumber", fixed: true},
      //   {text:"Order No.",value:"orderNumber", fixed: true},
      //   {text:"Photo",value:"modelPhoto", fixed: true},
      //   {text:"Model No.",value:"modelNumber", fixed: true},
      //   {text:"Model name",value:"modelName"},
      //   {text:"Sold price",value:"soldPrice"},
      //   {text:"Order q-ty",value:"orderQuantity"},
      //   {text:"Overprod q-ty",value:"overprodQuantity"},
      //   {text:"Quantity with overprod",value:"quantityWithOverprod", width:150},
      //   {text:"Shipped q-ty",value:"shippedQuantity"},
      //   {text:"Total price of model",value:"totalPriceOfModel", width:150},
      //   {text:"Shipped total price",value:"shippedTotalPrice", width:120},
      //   {text:"Calculated fabric kg.",value:"calculatedFabric"},
      //   {text:"Price",value:"price"},
      //   {text:"Total price",value:"totalPrice"},
      //   {text:"Received fabric kg.",value:"receivedFabric", width:120},
      //   {text:"Fact price",value:"factPrice"},
      //   {text:"Fact total price",value:"factTotalPrice",width:150},
      //   {text:"Difference kg.",value:"difference"},
      //   {text:"Difference total price",value:"differenceTotalPrice"},
      //   {text:"Fabric supplier",value:"fabricSupplier",},
      //   {text:"Planning accessory expense", value:"planningAccessoryExpense"},
      //   {text:"Received accessory price", value:"receivedAccessoryPrice"},
      //   {text:"Difference", value:"difference"},
      //   {text:"Planned print expenses", value:"plannedPrintExpenses"},
      //   {text:"Fact print expenses", value:"factPrintExpenses"},
      //   {text:"Difference print exp.", value:"differencePrintExpenses"},
      //   {text:"Currency", value:"currency"},
      //   {text:"Stock fabric kg.", value:"stockFabricKg"},
      //   {text:"Stock fabric total price", value:"stockFabricTotalPrice",fixed: true},
      // ],
      headers:[
        {text:"Days of complete",value:"daysOfComplete", sortable: false},
        {text:"Order No.",value:"orderNumber", sortable: false},
        {text:"Photo",value:"photo", sortable: false, align:"center"},
        {text:"Model name",value:"modelName" , sortable: false},
        {text:"Sold price",value:"soldPrice", sortable: false},
        {text:"Order q-ty",value:"orderQuantity", sortable: false},
        {text:"Overprod q-ty",value:"overProdPercent", sortable: false},
        {text:"Quantity with overprod",value:"quantityWithOverProd", sortable: false},
        {text:"Shipped q-ty",value:"shippedQuantity", sortable: false},
        {text:"Total price of model",value:"totalPriceOfModel", sortable: false},
        {text:"Shipped total price",value:"shippedTotalPrice", sortable: false},
        {text:"Total fabric cost",value:"totalFabricCost", sortable: false},
        {text:"Total accessory cost",value:"totalAccessoryCost", sortable: false},
        {text:"Printing cost",value:"printingCost", sortable: false},
        {text:"Outsource cost",value:"outsourceCost", sortable: false},
        {text:"Total labor cost",value:"totalLaborCost", sortable: false, width: 100},
        {text:"Other costs",value:"totalOtherCost", sortable: false, width: 100},
        {text:"Total costs",value:"totalCosts", sortable: false},
        {text:"Net income",value:"netIncome", sortable: false},
        {text:"Currency",value:"currency", sortable: false},

      ],
      items:[],
      image_dialog: false,
      currentImage: null,
      modelNumSearch: "",
      orderQuantityList:[],
      shippedQuantityList:[],
      remainingFirstQuantityList:[],
      remainingSecondQuantityList:[],
      classificationList:[],
      wasteList:[],
      orderQuantity:[
        {text:"Main color",value:"mainColor", sortable: false},
        {text:"Sizes",value:"sizes", sortable: false, align:"center"},
        {text:"Total",value:"total", sortable: false},
      ],
      classificationHeaders:[
        {text:"Main color",value:"color", sortable: false},
        {text:"Process",value:"process", sortable: false},
        {text:"Size",value:"size", sortable: false, align:"center"},
        {text:"Quantity",value:"quantity", sortable: false, align:"center"},
        {text:"Reason",value:"reason", sortable: false, align:"center"},
        {text:"Partner",value:"partner", sortable: false, align:"center"},
      ],
      wasteHeaders:[
        {text:"Color",value:"color", sortable: false},
        {text:"Batch No.",value:"batchNumber", sortable: false},
        {text:"Name",value:"name", sortable: false},
        {text:"Weight",value:"weight", sortable: false},
      ],
    }
  },
  created(){
    this.getModelsList({
      page: 0,
      size: 10,
      modelNumber: this.modelNumSearch,
      partner: "",
      status: "ACTIVE",
    });
  },
  computed:{
    ...mapGetters({
      totalAnalysis: 'incomeByModels/totalAnalysis',
      modelsAnalysisList: 'incomeByModels/modelsAnalysisList',
      modelsAnalysis: 'incomeByModels/modelsAnalysis',
      partnerWithTypes: 'partners/partnerWithTypes',
      modelsList: "models/modelsList",
    })
  },
  watch:{
    modelsAnalysis(val){
      const totalCosts = (val.totalFabricCost + val.totalAccessoryCost + val.printingCost + val.outsourceCost + val.totalLaborCost) + (val.totalOtherCost ? val.totalOtherCost : 0)
      const netIncome = val.totalPriceOfModel - totalCosts
      this.items = [{...val, totalOtherCost: val.totalOtherCost ? val.totalOtherCost : null, totalCosts, netIncome}]
      this.orderQuantityList = val.orderQuantityList
      this.shippedQuantityList = val.shippedQuantityList
      this.remainingFirstQuantityList = val.remainingFirstQuantityList
      this.remainingSecondQuantityList = val.remainingSecondQuantityList
      this.classificationList = val.classificationList
      this.wasteList = val.wasteList
    },
    pageType(){
      this.loader=true
      this.getTotalAnalysis(this.pageType)
    },
    totalAnalysis(val){
      this.loader=false
    },
    modelNumSearch(val) {
      this.getModelsList({
        page: 0,
        size: 10,
        modelNumber: val ? val : "",
        partner: "",
        status: "ACTIVE",
      });
    },
  },
  methods:{
    ...mapActions({
      getTotalAnalysis: 'incomeByModels/getTotalAnalysis',
      getModalsAnalytics: 'incomeByModels/getModalsAnalytics',
      getModelsAnalyticsById: 'incomeByModels/getModelsAnalyticsById',
      setManualCost: 'incomeByModels/setManualCost',
      getPartnersWithTypes: "partners/getPartnersWithTypes",
      getModelsList: "models/getModelsList",
    }),
    handleEnter(item){
      console.log(item);
      const data = {
        modelId: this.filter.modelNumber.id,
        totalLaborCost: item.totalLaborCost?item.totalLaborCost:0,
        totalOtherCost: item.totalOtherCost?item.totalOtherCost:0,
      }

      this.setManualCost(data)

    },
    showImage(photo) {
      this.currentImage = photo;
      this.image_dialog = true;
    },
    resetFilters(){
      this.filter={}
      this.orderQuantityList=[]
      this.shippedQuantityList=[]
      this.remainingFirstQuantityList=[]
      this.remainingSecondQuantityList=[]
      this.classificationList=[]
      this.wasteList=[]
      this.items=[]
    },
    filterData(){
      this.getModelsAnalyticsById(this.filter.modelNumber.id)
    }
  },
  mounted(){
    this.getTotalAnalysis(this.pageType)
    this.getPartnersWithTypes(["buyer"])
  }
};
</script>
<style scoped lang="scss">


.selected{
  padding-left: 0 !important;
  padding-right: 0 !important;
}


.no-hover ::v-deep .v-data-table__row {
  transition: none !important;
}

.no-hover ::v-deep .v-data-table__row:hover {
  background-color: transparent !important;
}

.custom-hover >>> tbody tr:hover {
  background-color: transparent !important;
}
th .sticky-column{
  background-color: white;
}
.sticky-column {
  position: sticky;
  left: 0;
  background-color: #F7F4FE;
  z-index: 5;
  min-width: 150px;
  border-right: 1px solid #e0e0e0;
}
td{
  background-color: white !important;
}

table,
th,
td {
  border: 1px solid #ebebeb;
  border-collapse: collapse;
}
.sticky-column:nth-child(2) {
  left: 40px; /* 1-ustun kengligi */
}
.sticky-column:nth-child(3) {
  left: 180px; /* 1-ustun kengligi */
}
.sticky-column:nth-child(4) {
  left: 260px; /* 1-ustun kengligi */
}

.th-text {
  min-width: 100px;
  font-size: 16px !important;
  font-weight: 500;
  position: sticky !important;
  top: 0;
  background-color: #f8f4fe; /* Header rangi */
   /* Ustunlar ustida ko‘rinishi uchun yuqori z-index */
}
tbody{
  overflow-y: scroll;
  max-height: 90vh;
}


.table-container {
  overflow-x: auto;
  position: relative;
}


</style>
