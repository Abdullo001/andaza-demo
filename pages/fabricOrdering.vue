<template >
  <div>
    <v-data-table
    :headers="headers"
    :items-per-page="10"
    class="elevation-0"
    hide-default-footer
    >
    <template #top>      
      <div class="mt-1">
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="text-h6">Fabric ordering</div>
          </v-toolbar-title>

        </v-toolbar>
        <div class="px-4">
          <v-row class=" mb-4 align-end justify-space-beetwen">
            <v-col cols="12" lg="4"  >
              <div class="label"> Order number <span style="color:red">*</span></div>
              <v-combobox   
              :search-input.sync="orderNumber"
              item-text="name"
              item-value="id"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              :return-object="true"
              color="#7631FF"
              dense
              placeholder="Enter order number"
              append-icon="mdi-chevron-down"
              :rules="[formRules.required]"
              validate-on-blur
            >
              <template #append>
                <v-icon color="#7631FF">mdi-magnify</v-icon>
              </template>
            </v-combobox>
            </v-col>
            <v-col cols="12" lg="8" class="d-flex">
              <v-spacer/>
              <v-btn
                class="text-capitalize rounded-lg font-weight-bold py-1 px-6"
                color="#7631FF"
                dark
                height="44"
              >
                Search models
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="3">
              <div class="label">Supplier name</div>
                <v-select
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base" dense
                  validate-on-blur
                  placeholder="Select supplier name"
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">Delivery time</div>
              <div style="height: 44px !important">
                <el-date-picker
                  type="datetime"
                  style="width: 100%; height: 100%"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                  class="base_picker"
                >
                </el-date-picker>
              </div>
            </v-col>
          </v-row>
        </div>

      </div>
    </template>

    <template #item.isOrdered="{item}">
      <v-simple-checkbox
        v-model="item.isOrdered"
        :disabled="item.status==='ORDERED'"
        color="#7631FF"
      ></v-simple-checkbox>
    </template>

    <template #item.withFleece="{item}">
      {{ item.withFleece?"Fleece":"-" }}
    </template>

    <template #item.peachEffectEnabled="{item}">
      {{ item.peachEffectEnabled?"Peach effect":"-" }}
    </template>
  </v-data-table>

  <div class="d-flex my-6 ">
    <v-spacer/>
    <v-btn
      class="text-capitalize rounded-lg font-weight-bold mr-4 py-1 px-6"
      color="#7631FF"
      outlined
      height="44"
    >
      Generate Fabric Order
    </v-btn>
  </div>

  <v-data-table
    :headers="genHeaders"
    :items-per-page="10"
    class="elevation-0"
    hide-default-footer
  >
  <template #top>
    <v-toolbar elevation="0">
      <v-toolbar-title class="d-flex justify-space-between w-full">
        <div class="text-h6">Generated Orders</div>
      </v-toolbar-title>

    </v-toolbar>
  </template>

  </v-data-table>
  <div class="d-flex my-6 ">
    <v-spacer/>
    <v-btn
      class="text-capitalize rounded-lg font-weight-bold mr-4 py-1 px-6"
      color="#7631FF"
      dark
      height="44"
    >
      Order Fabric
    </v-btn>
  </div>

  </div>
</template>
<script>
export default {
  data(){
    return{
      headers:[
        {text:"",value:"isOrdered",sortable:false},
        {text:"Model №",value:"modelNumber",sortable:false},
        {text:"Fabric specification",value:"specification",sortable:false},
        {text:"Density gr/m2",value:"density",sortable:false},
        {text:"Fleece",value:"withFleece",sortable:false},
        {text:"Peach effect",value:"peachEffectEnabled",sortable:false},
        {text:"Color",value:"color",sortable:false},
        {text:"Total fabric",value:"total",sortable:false},
        {text:"Price",value:"pricePerUnit",sortable:false},
        {text:"Total price",value:"totalPrice",sortable:false},

      ],
      genHeaders:[
        {text:"Sip №",value:"sipNumber",sortable:false},
        {text:"Model №",value:"modelNumber",sortable:false},
        {text:"Fabric specification",value:"specification",sortable:false},
        {text:"Color",value:"color",sortable:false},
        {text:"Supplier",value:"color",sortable:false},
        {text:"Total fabric",value:"total",sortable:false},
        {text:"Total price",value:"totalPrice",sortable:false},
        {text:"Fabric deadline",value:"deadline",sortable:false},
        
      ],
      orderNumber:"",
    }
  }
}
</script>
<style lang="scss" scoped>
  
</style>