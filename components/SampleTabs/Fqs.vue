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
            <div>FQS</div>
            <v-btn
              color="#544B99"
              dark
              class="text-capitalize rounded-lg"
              @click="addNewChart"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t('samplesBox.sampleTabs.addSampleInfo') }}
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
          <div>FQS </div>
          <v-btn @click="new_dialog = false" icon>
            <v-icon color="#544B99">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row class="mb-4">
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('samplesBox.sampleTabs.bodyPartColor') }}</div>
                <v-select
                  v-model="chartData.color"
                  :items="colorList"
                  :rules="[formRules.required]"
                  item-text="color"
                  item-value="color"
                  append-icon="mdi-chevron-down"
                  :placeholder="$t('samplesBox.sampleTabs.bodyPartColor')"
                  outlined
                  single-line
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('samplesBox.sampleTabs.fabricSupplierName') }}</div>
                <v-combobox
                  v-model="chartData.supplierId"
                  :items="partnerLists"
                  :search-input.sync="partnerName"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :return-object="true"
                  color="#544B99"
                  dense
                  :placeholder=" $t('samplesBox.sampleTabs.fabricSupplierName')"
                  append-icon="mdi-chevron-down"
                  :rules="[formRules.required]"
                  validate-on-blur
                  >
                  <template #append>
                    <v-icon color="#544B99">mdi-magnify</v-icon>
                  </template>
                 </v-combobox>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label"> {{$t('samplesBox.sampleTabs.sentDate')}}</div>
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
              <v-col cols="12" lg="6">
                <div class="label">{{$t('samplesBox.sampleTabs.result')}}</div>
                <v-select
                  v-model="chartData.result"
                  :items="result_items"
                  :rules="[formRules.required]"
                  append-icon="mdi-chevron-down"
                  :placeholder="$t('samplesBox.sampleTabs.result')"
                  outlined
                  single-line
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                />
              </v-col>
              <v-col cols="12" lg="12" v-if="chartData.result==='REMAKE'">
                <div class="label">Reason</div>
                <v-text-field
                  v-model="chartData.reason"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter reason"
                  validate-on-blur
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="12">
                <div class="label">{{ $t('samplesBox.sampleTabs.note') }}</div>
                <v-text-field
                  v-model="chartData.note"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('samplesBox.sampleTabs.note')"
                  validate-on-blur
                  dense
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="text-capitalize rounded-lg font-weight-bold mr-6"
            color="#544B99"
            width="163"
            @click="new_dialog = !new_dialog"
          >
           {{ $t("bodyParts.dialog.cancelBtn") }}
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="saveFqs"
          >
            {{ $t('orderBox.contractBox.save') }}
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
  name: "FqsComponent",
  data() {
    return {
      partnerName:"",
      delete_dialog:false,
      new_validate: true,
      itemsPerPage: 10,
      new_dialog: false,
      chartData:{
        color:"",
        supplierId:"",
        result:"",
        sendDate:"",
        reason:"",
        note:"",
      },
      headers: [
        { text: "NO.", align: "center", sortable: false, value: "ordinalNumber" },
        {
          text: this.$t('samplesBox.sampleTabs.bodyPartColor'),
          align: "center",
          sortable: false,
          value: "color",
        },
        {
          text: this.$t('samplesBox.sampleTabs.fabricSupplierName'),
          align: "center",
          sortable: false,
          value: "supplier",
        },
        {
          text: this.$t('samplesBox.sampleTabs.sentDate'),
          align: "center",
          sortable: false,
          value: "sendDate",
        },
        { text: this.$t('samplesBox.sampleTabs.result'), align: "center", sortable: false, value: "result" },
        { text: this.$t('samplesBox.sampleTabs.reason'), align: "center", sortable: false, value: "reason" },
        { text: this.$t('samplesBox.sampleTabs.note'), align: "center", sortable: false, value: "note" },
        { text: this.$t('samplesBox.sampleTabs.actions'), align: "center", sortable: false, value: "actions" },
      ],
      currentList: [],
      result_items:["OK","REMAKE","PENDING"],
      actionStatus:"new",
    };
  },

  computed:{
    ...mapGetters({
      chartList:"samplesTabs/chartList",
      partnerLists: "partners/partnerList",
      colorList: "accessorySamples/colorList",
      oneSample:"accessorySamples/oneSample",


    })
  },

  watch:{
    chartList(val){
      this.currentList=JSON.parse(JSON.stringify(val))
    },
    partnerName(val) {
      this.getPartnerList({page:0, size:10,partnerName:val});

    },
  },

  methods: {
    ...mapActions({
      getChartList:"samplesTabs/getChartList",
      createChartRow:"samplesTabs/createChartRow",
      updateChartRow:"samplesTabs/updateChartRow",
      deleteChartRow:"samplesTabs/deleteChartRow",
      getPartnerList: "partners/getPartnerList",

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
      this.chartData.supplierId={name:item.supplier,id:item?.supplierId}
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
    saveFqs(){
      const data={...this.chartData}
      data.supplierId=this.chartData.supplierId?.id
      data.samplePlanningId=this.oneSample?.id
      data.purpose="FQS"
      if(this.actionStatus==="new"){
        this.createChartRow(data)
      }
      if(this.actionStatus==="edit"){
        this.updateChartRow(data)
      }
      this.new_dialog=false
      this.chartData.sendDate=""
      this.$refs.new_form.reset()

    },
  },

  mounted(){
    this.getPartnerList({page:0,size:10})
  }
};
</script>
<style lang="">
</style>
