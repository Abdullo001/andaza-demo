<template >
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
              placeholder="Invoice NO."
              outlined
              validate-on-blur
              dense
              hide-details
              class="rounded-lg filter"
            />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
              placeholder="Packing list"
              outlined
              validate-on-blur
              dense
              hide-details
              class="rounded-lg filter"
            />
            </v-col>
            <v-col cols="12" lg="2" md="2" style="max-width: 240px">
              <el-date-picker
                type="datetime"
                class="rounded-lg d-block filter_picker"
                placeholder="Created at"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <el-date-picker

                type="datetime"
                class="rounded-lg d-block filter_picker"
                placeholder="Updated at"
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
                  color="#397CFD"
                  elevation="0"
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
                >
                  Reset
                </v-btn>
                <v-btn
                  width="140"
                  color="#397CFD"
                  dark
                  elevation="0"
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
      :items="shippingList"
      :headers="headers"
      @click:row="(item)=>viewDetails(item)"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
    >
    <template #top>
      <v-toolbar elevation="0">
        <v-toolbar-title
          class="d-flex w-full align-center justify-space-between"
        >
          <div>Shipping</div>

        </v-toolbar-title>
      </v-toolbar>
    </template>

    <template #item.action="{ item }">
      <v-tooltip top color="#7631FF">
        <template v-slot:activator="{on, attrs}">
          <v-btn
            icon color="#7631FF"
            v-on="on" v-bind="attrs"
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
export default {
  data(){
    return{

      shippingList:[
        {
          id:1,
          orderNumber:"TEST-01",
          modelNumber:"TEST-01",
          invoiceNumber:"TEST-01",
          packingList:"TEST-01",
          client:"NONAME",
          actualShippingQuantity:"1000",

        }
      ],



      headers:[
        {text: "Id", align: "start", sortable: false, value: "id"},
        {text: "Order №",   value: "orderNumber"},
        {text: "Model №",  value: "modelNumber"},
        {text: "Invoice Number",  value: "invoiceNumber"},
        {text: "Packing List No.",  value: "packingList"},
        {text: "Client name",  value: "client"},
        {text: "Actual shipping q-tity",  value: "actualShippingQuantity"},
        {text: "Action",sortable:false,  value: "action"},

      ]
    }
  },

  methods:{
    async viewDetails(item){
      await this.$router.push(`/shipping/${item.id}`);

    }
  },

  mounted(){
    this.$store.commit("setPageTitle", "Shipping");

  }
}
</script>
<style lang="">

</style>
