<template>
  <div>
    <v-card elevation="0" class="mb-4">
      <v-card-text>
        <v-radio-group row v-model.trim="pageType" class="">
          <v-radio
            color="#544B99"
            label="Annual"
            value="ANNUAL"
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
                <div class="text-h4 font-weight-bold" style="color:black">120</div>
              </div>
              <img src="/modelReport/shipping.svg" alt="pic">              
            </div>
            <div class="d-flex align-center justify-space-between">
              <div class="rounded-lg py-2 px-2 d-flex align-center justify-space-between" style="background-color: #A1F1A4; width: 100px; color: #0FA958;" >
                <v-icon color="#0FA958">mdi-chevron-up</v-icon>
                <div class="text-h6 font-weight-bold">34 %</div>
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
                <div class="text-h4 font-weight-bold" style="color:black">560 756</div>
              </div>
              <img src="/modelReport/total.svg" alt="pic">              
            </div>
            <div class="d-flex align-center justify-space-between">
              <div class="rounded-lg py-2 px-2 d-flex align-center justify-space-between" style="background-color: #A1F1A4; width: 100px; color: #0FA958;" >
                <v-icon color="#0FA958">mdi-chevron-up</v-icon>
                <div class="text-h6 font-weight-bold">7 %</div>
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
                <div class="text-h4 font-weight-bold" style="color:black">3 256 266 $</div>
              </div>
              <img src="/modelReport/totalPrice.svg" alt="pic">              
            </div>
            <div class="d-flex align-center justify-space-between">
              <div class="rounded-lg py-2 px-2 d-flex align-center justify-space-between" style="background-color: #A1F1A4; width: 100px; color: #0FA958;" >
                <v-icon color="#0FA958">mdi-chevron-up</v-icon>
                <div class="text-h6 font-weight-bold">7 %</div>
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
                <div class="text-h4 font-weight-bold" style="color:black">693 210 $</div>
              </div>
              <img src="/modelReport/totalProfit.svg" alt="pic">              
            </div>
            <div class="d-flex align-center justify-space-between">
              <div class="rounded-lg py-2 px-2 d-flex align-center justify-space-between" style="background-color: #FFB6B6; width: 100px; color: #A90F0F;" >
                <v-icon color="#A90F0F">mdi-chevron-down</v-icon>
                <div class="text-h6 font-weight-bold">10 %</div>
              </div>

              <div class="text-subtitle-2 ">
                Since last period
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      
    </v-row>

    <v-row class="px-4">
      <v-col cols="3" class="selected">
        <v-data-table
          hide-default-footer
          disable-sort
          :headers="firstHeaders"
          :items="items"
          :loader-height="2"
          class="custom-hover"
          :hover="false"
        >
          <template #top>
            <v-toolbar elevation="0">
              <v-toolbar-title class="d-flex w-full align-center justify-space-between">
                <div>Revenue and profit by models</div>
                
              </v-toolbar-title>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="9" class="selected">
        <v-data-table
          hide-default-footer
          disable-sort
          :headers="headers"
          :items="items"
          :loader-height="2"
        >
        <template #top>
          <v-toolbar elevation="0">
            <v-toolbar-title class="d-flex w-full align-center justify-space-between">
              <div>  </div>
              
            </v-toolbar-title>
          </v-toolbar>
        </template>
        </v-data-table>
      </v-col>
    </v-row>

  </div>
</template>
<script>
export default {
  data(){
    return{
      pageType:"",
      firstHeaders:[
        {text:"No.",value:"orderedNumber", fixed: false},
        {text:"Order No.",value:"orderNumber", fixed: true},
        {text:"Photo",value:"modelPhoto", fixed: true},
        {text:"Model No.",value:"modelNumber", fixed: true},
      ],
      headers:[
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
        {text:"Difference total price",value:"differenceTotalPrice"},
        {text:"Fabric supplier",value:"fabricSupplier",class: "fixed"},
      ],

      items:[
        {orderedNumber:"1",orderNumber:"ASDA",modelNumber:"ASN678",modelPhoto:""}
      ]
    }
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



</style>
