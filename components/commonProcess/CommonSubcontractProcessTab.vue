<template >
  <div>
    <v-data-table
      :headers="printingHeader"
      :items="printingList"
      :items-per-page="50"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="elevation-0"
      hide-default-footer
      show-expand
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      @item-expanded="loadDetails"
    >
      <template #item.status="{item}">
        <v-select
          @click.stop
          @change="changeStatus(item)"
          :background-color="statusColor.subcontractColor(item.status)"
          :items="status_enums"
          append-icon="mdi-chevron-down"
          v-model="item.status"
          hide-details
          class="mt-n2"
          item-color="green"
          rounded
          dark
        />
      </template>

      <template #item.actions="{item}">
        <v-tooltip
          top
          color="#544B99"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
              @click="getClassification(item)"
            >
              <v-img src="/t-shirt.svg" max-width="22"/>
            </v-btn>
          </template>
          <span class="text-capitalize">classification</span>
        </v-tooltip>

        <v-tooltip
          top
          color="#544B99"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
              @click="getHistory(item)"
            >
              <v-img src="/history.svg" max-width="22"/>
            </v-btn>
          </template>
          <span class="text-capitalize">History</span>
        </v-tooltip>

        <v-tooltip
          top
          color="green"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="green"
              @click="editPrintingRow(item)"
            >
              <v-img src="/edit-active.svg" max-width="22"/>
            </v-btn>
          </template>
          <span class="text-capitalize">edit</span>
        </v-tooltip>

        <v-tooltip
          top
          color="red"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="red"
              @click="deletePrintingRow(item)"
            >
              <v-img src="/delete.svg" max-width="22"/>
            </v-btn>
          </template>
          <span class="text-capitalize">delete</span>
        </v-tooltip>
      </template>

      <template #expanded-item="{headers, item}">
        <td :colspan="headers.length">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col>
                  <div class="body-1 mb-3">
                    Sent date:
                    <span class="font-weight-bold ml-2"> {{ item?.sendDate }}</span>
                  </div>
                  <div class="body-1 mb-3">
                    Comment:
                    <span class="font-weight-bold ml-2"> {{ item?.comment }}</span>
                  </div>

                </v-col>
                <v-col>
                  <div class="body-1 mb-3">
                    Deadline:
                    <span class="font-weight-bold ml-2"> {{ item?.deadline }}</span>
                  </div>

                </v-col>

              </v-row>
            </v-card-text>
          </v-card>
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="edit_dialog" max-width="1200">
      <v-card>
        <v-card-title class="w-full d-flex text-capitalize text-h6 justify-space-between">
          <div>Edit Info</div>
          <v-btn @click="edit_dialog = !edit_dialog" icon>
            <v-icon color="#544B99">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="edit_form">
            <v-row class="mb-4">
              <v-col cols="12" lg="6">
                <div class="label">Price per work</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="selectedSubcontract.pricePerWork"
                    placeholder="0.00"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    validate-on-blur
                    dense
                    color="#544B99"
                    :suffix="selectedSubcontract.currency"
                  />
                </div>
              </v-col>

              <v-col cols="12" lg="6">
                <div class="label">Sent date</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    v-model="selectedSubcontract.sentDate"
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

              <v-col cols="12" lg="3" v-for="(item,idx) in selectedSubcontract.sizeDistributions" :key="idx">
                <div class="label">{{item.size}}</div>
                <v-text-field
                  v-model="item.quantity"
                  placeholder="0"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base mb-4"
                  validate-on-blur
                  dense
                  color="#544B99"

                />
              </v-col>

              <v-col cols="12" lg="6" >
                <div class="label">Deadline</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    v-model="selectedSubcontract.deadline"
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
          </v-form>
        </v-card-text>

        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="163"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="163"
            @click="setSubcontract"
          >
            save
          </v-btn>

        </v-card-actions>
        <v-divider></v-divider>

        <div class="px-4 pb-4">
          <v-data-table
            :headers="[...historyHeaders,{text: 'Actions', sortable: false, align: 'center', value: 'actions',width:'120' },]"
            hide-default-footer
            :items="historyList"
            class="mt-4 rounded-lg"
            style="border: 1px solid #E9EAEB"
          >
          <template #top>
            <div class="title ma-4">History</div>
          </template>
          <template #item.actions="{item}">
            <v-btn icon color="green" @click.stop="editHistoryItem(item)">
              <v-img src="/edit-active.svg" max-width="22"/>
            </v-btn>
            <v-btn icon color="red" @click.stop="deleteHistoryItem(item)">
              <v-img src="/delete.svg" max-width="27"/>
            </v-btn>
          </template>
          </v-data-table>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="printingDelete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete printing</v-card-title>
        <v-card-text>
          Are you sure you want to Delete printing?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="printingDelete_dialog = false"
          >
            cancel
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deletePrintingItem"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="classification_dialog" max-width="600">
      <v-card flat>
        <v-card-title>
          <div class="title">Add classification</div>
          <v-spacer/>
          <v-btn
            icon
            @click="classification_dialog=false"
            color="#544B99"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="12" lg="3" v-for="(item,idx) in classification_shortcom.sizeDistributions" :key="idx">
              <div class="label">{{ item.size }}</div>
              <v-text-field
                outlined
                hide-details
                dense
                height="44"
                class="rounded-lg base" color="#544B99"
                placeholder="Enter branch number"
                v-model.trim="item.quantity"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <div class="label">Reason</div>
              <v-select
                :items="classificationEnums"
                v-model.trim="classification_shortcom.reason"
                append-icon="mdi-chevron-down"
                outlined
                hide-details
                dense
                height="44"
                class="rounded-lg base" color="#544B99"
                placeholder="Enter branch number"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <div class="label">Comment</div>
              <v-text-field
                v-model.trim="classification_shortcom.comment"
                outlined
                hide-details
                dense
                height="44"
                class="rounded-lg base" color="#544B99"
                placeholder="Enter branch number"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="px-10 pb-5">
          <v-spacer/>
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#544B99"
            width="163" height="44"
            @click="classification_dialog=false"
            style="border-width: 2px"
          >
            {{ $t('planningProduction.planning.cancel') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold ml-8"
            color="#544B99" dark
            width="163" height="44"
            @click="saveShortcom"
          >
            Save
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="history_dialog" max-width="600">
      <v-card flat>
        <v-card-title>
          <div class="title">History</div>
          <v-spacer/>
          <v-btn
            icon
            @click="history_dialog=false"
            color="#544B99"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="historyHeaders"
            hide-default-footer
            :items="historyList"
            class="mt-4 rounded-lg"
            style="border: 1px solid #E9EAEB"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
export default {
  data(){
    return{
      printingDelete_dialog:false,
      edit_dialog:false,
      singleExpand: true,
      expanded: [],
      new_validate:true,
      currency_enums:["USD","UZS","RUB"],
      selectedSubcontract:{},
      history_dialog:false,
      classification_dialog:false,
      classification_shortcom:{},
      classificationEnums: ['DEFECT', 'PHOTO', 'PHOTO_SAMPLE', 'SAMPLE', 'LOST', 'OTHERS'],
      status_enums: ["RECEIVED", "SENT"],

      printingHeader:[
        {text: 'Color', sortable: false, align: 'start', value: 'color'},


        {text: 'Recived total quantity', sortable: false, align: 'start', value: 'recivedTotalQuantity'},
        {text: 'Partner', sortable: false, align: 'start', value: 'partner'},
        {text: 'Price per work', sortable: false, align: 'start', value: 'pricePerWork'},
        {text: 'Total price', sortable: false, align: 'start', value: 'totalPrice'},
        {text: 'Status', sortable: false, align: 'start', value: 'status'},
        {text: 'Actions', sortable: false, align: 'center', value: 'actions'},
        {text: '', value: 'data-table-expand'},

      ],

      printingList:[],

      historyHeaders: [
        {text: 'Date', sortable: false, align: 'start', value: 'date'},
        {text: 'Done By', sortable: false, align: 'center', value: 'doneBy'},
      ],

      historyList: [],
    }
  },

  computed:{
    ...mapGetters({
      subcontractList:"commonProcess/subcontractList",
      planningProcessId:"commonProcess/planningProcessId",
      historyServerList:"history/historyList",
    })
  },

  watch:{
    subcontractList(list){
      this.printingHeader= [
        {text: "Color", sortable: false, value: "color"},
      ],

      list[0]?.sizeDistributionList?.forEach((item)=>{
        this.printingHeader.push({
          text: item.size, sortable: false, align: 'start', value: item.size
        })
      })
      this.printingHeader.push(
        {text: "Received total quantity", sortable: false, value: "receivedQuantity"},
        {text: "Partner", sortable: false, value: "partnerName"},
        {text: "Price per work", sortable: false, value: "pricePerWork",width:"100"},
        {text: "Total price", sortable: false, align: 'start', value: 'totalPrice'},
        {text: "Status", sortable: false, value: "status",width:"200"},
        {text: "Action", sortable: false, value: "actions",width:"200"},
        {text: '', value: 'data-table-expand'},
      )

      const specialList = list.map(function (el) {
        const value = {};
        const sizesList=[];
        el?.sizeDistributionList.forEach((item) => {
          value[item.size]=item.quantity
          sizesList.push({size:item.size,quantity:0})
        });
        return{
          ...el,
          ...value,
          sizeDistributions:[...sizesList],
        }
      })

      this.printingList = JSON.parse(JSON.stringify(specialList));
    },

    historyServerList(list){
      this.historyHeaders = [
        {text: 'Date', sortable: false, align: 'start', value: 'createdDate'},
      ],
        list[0]?.sizeDistributionList?.forEach((item) => {
          this.historyHeaders.push({
            text: item.size, sortable: false, align: 'start', value: item.size
          })
        })
      this.historyHeaders.push(
        {text: 'Done By', sortable: false, align: 'center', value: 'createdBy'},
      )

      const specialList = list.map(function (el) {
        const value = {};
        const sizesList = [];
        el?.sizeDistributionList.forEach((item) => {
          value[item.size] = item.quantity
          sizesList.push({size: item.size, quantity: item.quantity})
        });
        return {
          ...el,
          ...value,
          sizeDistributions: [...sizesList],
        }
      })
      this.historyList = JSON.parse(JSON.stringify(specialList))
    }
  },

  methods:{
    ...mapActions({
      getSubcontarctList:"commonProcess/getSubcontarctList",
      updateCommonProcess:"commonProcess/updateCommonProcess",
      deleteCommonProcess:"commonProcess/deleteCommonProcess",
      createShortcomingsList:"commonCalculationsShortcomings/createShortcomingsList",
      getHistoryList:"history/getHistoryList",
      deleteHistory:"history/deleteHistoryItem",
      editHistory:"history/editHistoryItem",
      changeStatusCommon:"commonProcess/changeStatusCommon",
    }),
    loadDetails({item}) {
      // current opened || choose object ^
    },

    editPrintingRow(item){
      this.edit_dialog=true
      this.selectedSubcontract={...item}
      this.selectedSubcontract.pricePerWork=item.pricePerWork.split(" ")[0]
      this.selectedSubcontract.currency=item.pricePerWork.split(" ")[1]
      this.selectedProcessId=item.id
      this.getHistoryList(item.id)
    },
    setSubcontract(){
      if(this.selectedSubcontract.status==="editHistory"){
        const data={
          id:this.selectedSubcontract.id,
          sizeDistributionList:[...this.selectedSubcontract.sizeDistributions]
        }
        this.editHistory(data)
      }else{
        const data={
          deadline:this.selectedSubcontract.deadline,
          id:this.selectedSubcontract.id,
          pricePerWork:this.selectedSubcontract.pricePerWork,
          sentDate:this.selectedSubcontract.sentDate,
          operationType:"FIRST_CLASS",
          sizeDistributions:[...this.selectedSubcontract.sizeDistributions],
        }
        this.updateCommonProcess(data)
      }
      this.edit_dialog=false
    },

    deletePrintingRow(item){
      this.printingDelete_dialog=true
      this.selectedSubcontract={...item}
    },

    deletePrintingItem(){
      this.deleteCommonProcess(this.selectedSubcontract.id)
    },

    getClassification(item){
      this.classification_shortcom={...item}
      this.classification_dialog=true
    },
    saveShortcom(){
      const data={
        description:this.classification_shortcom.comment,
        detailsId:this.classification_shortcom.id,
        reason:this.classification_shortcom.reason,
        sizeDistributions:[],
        status:"subcontract_classification"
      }
      this.classification_shortcom?.sizeDistributions.forEach((item) => {
        if (item.quantity !== 0 && item.quantity) {
          data.sizeDistributions.push(item)
        }
      })
      this.createShortcomingsList({data,id:this.planningProcessId})
      this.classification_dialog=false
    },

    getHistory(item){
      this.history_dialog=true
      this.getHistoryList(item.id)
    },
    editHistoryItem(item){
      this.selectedSubcontract={...item}
      this.selectedSubcontract.status="editHistory"
    },
    deleteHistoryItem(item){
      this.deleteHistory({id:item.id,processId:this.selectedProcessId})
    },
    changeStatus(item){
      this.changeStatusCommon({id:item.id,status:item.status})
    }
  },
  mounted(){
    this.getSubcontarctList()
  }
}
</script>
<style lang="">

</style>
