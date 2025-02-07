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
        <v-card elevation="0">
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-2">
              <div>
                <div class="text-subtitle-1 mb-1">Shipping models</div>
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
                <v-icon color="#A90F0F">mdi-chevron-up</v-icon>
                <div class="text-h6 font-weight-bold">{{totalAnalysis.shippedModelsRate}}</div>
              </div>
              <div class="text-subtitle-2 ">
                Since last period
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="6" >
        <v-card elevation="0">
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-2">
              <div>
                <div class="text-subtitle-1 mb-1">Total works</div>
                <div class="text-h4 font-weight-bold" style="color:black">{{totalAnalysis.totalWorks}}</div>
              </div>
              <img src="/modelReport/total.svg" alt="pic">
            </div>
            <div class="d-flex align-center justify-space-between">
              <div v-if="totalAnalysis?.totalWorksRate?.split('%')[0]>=0" class="rounded-lg py-2 px-2 d-flex align-center justify-space-between" style="background-color: #A1F1A4; width: 100px; color: #0FA958;" >
                <v-icon color="#0FA958">mdi-chevron-up</v-icon>
                <div class="text-h6 font-weight-bold">{{totalAnalysis.totalWorksRate}}</div>
              </div>
              <div v-else class="rounded-lg py-2 px-2 d-flex align-center justify-space-between" style="background-color: #FFB6B6; width: 100px; color: #A90F0F;" >
                <v-icon color="#A90F0F">mdi-chevron-up</v-icon>
                <div class="text-h6 font-weight-bold">{{totalAnalysis.totalWorksRate}}</div>
              </div>
              <div class="text-subtitle-2 ">
                Since last period
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="6" >
        <v-card elevation="0">
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
                <v-icon color="#A90F0F">mdi-chevron-up</v-icon>
                <div class="text-h6 font-weight-bold">{{totalAnalysis.totalPriceRate}}</div>
              </div>
              <div class="text-subtitle-2 ">
                Since last period
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="6" >
        <v-card elevation="0">
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
                <v-icon color="#A90F0F">mdi-chevron-up</v-icon>
                <div class="text-h6 font-weight-bold">{{totalAnalysis.totalProfitRate}}</div>
              </div>
              <div class="text-subtitle-2 ">
                Since last period
              </div>
            </div>
          </v-card-text>
        </v-card>
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
export default {
  data(){
    return{
      pageType:"YEARLY",
      headers:[
        {text:"No.",value:"orderedNumber", fixed: true},
        {text:"Order No.",value:"orderNumber", fixed: true},
        {text:"Photo",value:"modelPhoto", fixed: true},
        {text:"Model No.",value:"modelNumber", fixed: true},
        {text:"Model name",value:"modelName"},
        {text:"Sold price",value:"soldPrice"},
        {text:"Order q-ty",value:"orderQuantity"},
        {text:"Overprod q-ty",value:"overprodQuantity"},
        {text:"Quantity with overprod",value:"quantityWithOverprod", width:150},
        {text:"Shipped q-ty",value:"shippedQuantity"},
        {text:"Total price of model",value:"totalPriceOfModel", width:150},
        {text:"Shipped total price",value:"shippedTotalPrice", width:120},
        {text:"Calculated fabric kg.",value:"calculatedFabric"},
        {text:"Price",value:"price"},
        {text:"Total price",value:"totalPrice"},
        {text:"Received fabric kg.",value:"receivedFabric", width:120},
        {text:"Fact price",value:"factPrice"},
        {text:"Fact total price",value:"factTotalPrice",width:150},
        {text:"Difference kg.",value:"difference"},
        {text:"Difference total price",value:"differenceTotalPrice"},
        {text:"Fabric supplier",value:"fabricSupplier",},
        {text:"Planning accessory expense", value:"planningAccessoryExpense"},
        {text:"Received accessory price", value:"receivedAccessoryPrice"},
        {text:"Difference", value:"difference"},
        {text:"Planned print expenses", value:"plannedPrintExpenses"},
        {text:"Fact print expenses", value:"factPrintExpenses"},
        {text:"Difference print exp.", value:"differencePrintExpenses"},
        {text:"Currency", value:"currency"},
        {text:"Stock fabric kg.", value:"stockFabricKg"},
        {text:"Stock fabric total price", value:"stockFabricTotalPrice",fixed: true},
      ],

      items:[
        {orderedNumber:"1",orderNumber:"ASDA",modelNumber:"ASN678",modelPhoto:""}
      ],
      image_dialog: false,
      currentImage: null,
    }
  },
  computed:{
    ...mapGetters({
      totalAnalysis: 'incomeByModels/totalAnalysis',
      modelsAnalysisList: 'incomeByModels/modelsAnalysisList',
      modelsAnalysis: 'incomeByModels/modelsAnalysis',
    })
  },
  watch:{
    pageType(){
      this.getTotalAnalysis(this.pageType)
    },
  },
  methods:{
    ...mapActions({
      getTotalAnalysis: 'incomeByModels/getTotalAnalysis',
      getModalsAnalytics: 'incomeByModels/getModalsAnalytics',
    }),
    showImage(photo) {
      this.currentImage = photo;
      this.image_dialog = true;
    },
  },
  mounted(){
    this.getTotalAnalysis(this.pageType)
    this.getModalsAnalytics()
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
