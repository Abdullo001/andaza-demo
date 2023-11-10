<template >
  <div>
    <v-data-table
      :headers="headers"
      :items="currentList"
      :items-per-page="itemsPerPage"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>SHIPMENT SAMPLE</div>
            <v-btn
              color="#7631FF"
              dark
              class="text-capitalize rounded-lg"
              @click="addNewChart"
            >
              <v-icon>mdi-plus</v-icon>
              Add sample info
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.result="{item}">
        <v-chip :color="selectColor(item.result)" dark class="font-weight-bold ml-5">{{ item.result }}</v-chip>
      </template>

      <template #item.actions="{ item }">
        <v-tooltip top color="green">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="green"
              v-on="on"
              v-bind="attrs"
              @click="viewDetails(item)"
            >
              <v-img src="/edit-green.svg" max-width="20" />
            </v-btn>
          </template>
          <span>Details</span>
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
          <span>Details</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <v-dialog v-model="new_dialog" max-width="572">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>SHIPMENT SAMPLE info</div>
          <v-btn @click="new_dialog = false" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row class="mb-4">
              <v-col cols="12" lg="6">
                <div class="label">Main color</div>
                <v-select
                  v-model="chartData.color"
                  :items="mainColorsList"
                  :rules="[formRules.required]"
                  append-icon="mdi-chevron-down"
                  placeholder="Select main color"
                  outlined
                  single-line
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  color="#7631FF"
                  dense
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">SHIPMENT SAMPLE Sent date</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    v-model="chartData.sendDate"
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
              
              <v-col cols="12" lg="3" v-for="(item,idx) in chartData.sizeDistribution" :key="idx">
                <div class="label">{{item.size}}</div>
                <v-text-field
                  v-model="item.quantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter quantity"
                  validate-on-blur
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="12">
                <div class="label">Note</div>
                <v-text-field
                  v-model="chartData.note"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter note"
                  validate-on-blur
                  dense
                  color="#7631FF"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="text-capitalize rounded-lg font-weight-bold mr-6"
            color="#7631FF"
            width="163"
            @click="new_dialog = !new_dialog"
          >
            cancel
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="saveFqs"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40" />
        </div>
        <v-card-title class="d-flex justify-center"
          >Delete sample chart
        </v-card-title>
        <v-card-text>
          Are you sure you want to Delete sample chart?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            cancel
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteChart"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex';

export default {
  name: "ShipmentSampleComponent",
  data() {
    return {
      partnerName:"",
      delete_dialog:false,
      new_validate: true,
      itemsPerPage: 10,
      new_dialog: false,
      chartData:{
        color:"",
        sendDate:"",
        note:"",
        sizeDistribution:[],
      },
      headers: [
        { text: "NO.", align: "center", sortable: false, value: "ordinalNumber" },
        {
          text: "Body part color",
          align: "center",
          sortable: false,
          value: "color",
        },
        {
          text: "SHIPMENT SAMPLE sent date",
          align: "center",
          sortable: false,
          value: "sendDate",
        },
        { text: "Note", align: "center", sortable: false, value: "note" },
        { text: "Actions", align: "center", sortable: false, value: "actions" },
      ],
      currentList: [],
      result_items:["OK","REMAKE","PENDING"],
      actionStatus:"new",
    };
  },

  computed:{
    ...mapGetters({
      chartList:"samplesTabs/chartList",
      partnerLists: "fabricOrdering/partnerLists",
      colorList: "accessorySamples/colorList",
      mainColorsList: "samplesTabs/mainColorsList",
      modelSizesList: "samplesTabs/modelSizesList",
      oneSample:"accessorySamples/oneSample",


    })
  },

  watch:{
    modelSizesList(list){
      this.headers=[
        { text: "NO.", align: "center", sortable: false, value: "ordinalNumber" },
        {
          text: "Body part color",
          align: "center",
          sortable: false,
          value: "color",
        },
        {
          text: "SHIPMENT SAMPLE sent date",
          align: "center",
          sortable: false,
          value: "sendDate",
        },
      ]
      list.forEach((item)=>{
        this.chartData.sizeDistribution.push({quantity:"",size:item})
        this.headers.push(
          { text: item, align: "center", sortable: false, value: item },
        )
      })
      this.headers.push(
        { text: "Note", align: "center", sortable: false, value: "note" },
        { text: "Actions", align: "center", sortable: false, value: "actions" },
      )
    },
    chartList(list){
      const specialList=list.map((item)=>{
        const valueSizes = {};

        for (let el in item.sizeDistributions) {
          valueSizes[item.sizeDistributions[el].size]=item.sizeDistributions[el].quantity
        }
        return{
          ...item,
          ...valueSizes,
          sizeDistribution:[...item.sizeDistributions],
          
        }
      })
      this.currentList=JSON.parse(JSON.stringify(specialList))


    },
    partnerName(val) {
      if(!!val && val !== '') {
      this.getPartnerName(val);
      }
    },
  },

  methods: {
    ...mapActions({
      getChartList:"samplesTabs/getChartList",
      createChartRow:"samplesTabs/createChartRow",
      updateChartRow:"samplesTabs/updateChartRow",
      deleteChartRow:"samplesTabs/deleteChartRow",
      getPartnerName: "fabricOrdering/getPartnerName",
      getMainColors: "samplesTabs/getMainColors",
      getSizesList: "samplesTabs/getSizesList",

    }),
    selectColor(color){
      switch(color){
        case "PENDING": return "amber"
        case "REMAKE": return "#FF4E4F"
        case "OK" : return "#10BF41"
      }
    },
    addNewChart(){
      this.chartData.sendDate=""
      if(this.actionStatus==='edit'){
        this.$refs.new_form.reset()
      }
      this.actionStatus="new"
      this.new_dialog=true
    },
    viewDetails(item) {
      this.chartData={...item}
      this.new_dialog=true
      this.actionStatus="edit"
    },
    deleteFunc(item) {
      this.chartData={...item}
      this.delete_dialog=true
    },
    deleteChart(){
      const item={...this.chartData}
      this.deleteChartRow({id:item.id,purpose:item.purpose,planningId:item.samplePlanningId})
      this.delete_dialog=false

    },
    async saveFqs(){
      const data={}
      const {
        color,
        sendDate,
        note,
        sizeDistribution,
        id,
      }=this.chartData
      data.color=color
      data.sendDate=sendDate
      data.note=note
      sizeDistribution.map((item)=>{
        return{
          size:item.size,
          quantity:item.quantity===''&&item.quantity===null?0:item.quantity,
        }
      })
      data.sizeDistribution=sizeDistribution
      
      data.samplePlanningId=this.oneSample?.id
      data.purpose="SHIPMENT_SAMPLE"
      if(this.actionStatus==="new"){
        await this.createChartRow(data)
      }
      if(this.actionStatus==="edit"){
        data.id=id
        await this.updateChartRow(data)
      }
      this.new_dialog=false
      this.chartData.sendDate=""
      this.chartData.receivedDate=""

    },
  },

  mounted(){
    this.getMainColors(this.oneSample.modelId)
    this.getSizesList(this.oneSample.modelId)
    this.getPartnerName("")
  }
};
</script>
<style lang="">
</style>