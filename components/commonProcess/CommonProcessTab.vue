<template >
  <div>
    <v-data-table
    :headers="headers"
    :items="items"
    item-key="cuttingTable"
    hide-default-footer
    :items-per-page="30"

  >
    <template #top>
      <div class="title ma-4">Done works’ quantities</div>
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
              @click="editItem(item)"
            >
              <v-img src="/daily.svg" max-width="25"/>
            </v-btn>
          </template>
          <span class="text-capitalize">Daily work</span>
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
              @click="deleteItem(item)"
            >
              <v-img src="/delete.svg" max-width="22"/>
            </v-btn>
          </template>
          <span class="text-capitalize">delete</span>
        </v-tooltip>
    </template>
    <template v-slot:body.append>
      <tr>
        <td></td>
        <td v-if="headers.length === 9 || title === 'sorting'"></td>
        <td
          :colspan="ownList[0]?.sizeDistributionList?.length"
          class="text-capitalize text-body-1 font-weight-bold"
        >
            {{ $t('orderBox.colorSize.totalQuantities') }}
        </td>
        <td>
          {{ moneyFormatter(totalQuantity, true) }}
        </td>
        <td></td>
      </tr>
    </template>
  </v-data-table>


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
        <v-form ref="classification_form" v-model="edit_validate" lazy-validation>
        <v-row>
          <v-col cols="12" lg="3" v-for="(item,idx) in classification_shortcom.sizeDistributions" :key="idx">
            <div class="label">{{ item.size }}</div>
            <v-text-field
              outlined
              hide-details
              dense
              height="44"
              class="rounded-lg base" color="#544B99"
              placeholder="0"
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
              placeholder="Select reason"
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
              placeholder="Enter commet"
            />
          </v-col>
        </v-row>
      </v-form>
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

  <v-dialog v-model="history_dialog" max-width="800">
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
          :items-per-page="historyList.length"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="edit_dialog" width="1200">
    <v-card>
      <v-card-title class="d-flex justify-space-between w-full">
        <div class="text-capitalize font-weight-bold">Daily work info</div>
        <v-btn icon color="#544B99" @click="edit_dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="mt-4">
        <v-form ref="edit_form" v-model="edit_validate" lazy-validation>
          <v-row>
            <v-col cols="12" lg="3" v-for="(item,idx) in selectedItem.sizeDistributions" :key="idx">
              <div class="label">{{item.size}}</div>
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
            <v-col cols="3" v-if="title!=='sorting'">
              <div class="label">Stream Number</div>
              <v-select
                :items="streamList"
                v-model.trim="selectedItem.streamId"
                append-icon="mdi-chevron-down"
                item-text="streamNumber"
                item-value="streamId"
                outlined
                hide-details
                dense
                height="44"
                class="rounded-lg base" color="#544B99"
                placeholder="Select reason"
              />
            </v-col>
            <v-col cols="3">
              <div class="label">Work date</div>
              <el-date-picker
                  v-model="selectedItem.workDate"
                  type="date"
                  style="width: 100%; height: 44px !important;"
                  :placeholder="$t('fabricOrderingBox.plannedAccessoryOrderBox.deliveryTime')"
                  :picker-options="pickerShortcuts"
                  value-format="timestamp"
                  class="base_picker"
                  :rules="[formRules.required]"
                  validate-on-blur
                >
              </el-date-picker>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center pb-8">
        <v-btn
          class="rounded-lg text-capitalize font-weight-bold"
          outlined color="#544B99"
          width="130"
          @click="edit_dialog = false"
        >
          cancel
        </v-btn>
        <v-btn
          class="rounded-lg text-capitalize ml-4 font-weight-bold"
          color="#544B99" dark
          width="130"
          @click="save"
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

  <v-dialog v-model="delete_dialog" max-width="500">
    <v-card class="pa-4 text-center">
      <div class="d-flex justify-center mb-2">
        <v-img src="/error-icon.svg" max-width="40"/>
      </div>
      <v-card-title class="d-flex justify-center">
        Delete {{title}} info
      </v-card-title>
      <v-card-text>
        Are you sure you want to  delete  {{ title }} info?
      </v-card-text>
      <v-card-actions class="px-16">
        <v-btn
          outlined
          class="rounded-lg text-capitalize font-weight-bold"
          color="#777C85"
          width="140"
          @click.stop="delete_dialog = false"
        >
          Cancel
        </v-btn>
        <v-spacer/>
        <v-btn
          class="rounded-lg text-capitalize font-weight-bold"
          color="#FF4E4F"
          width="140"
          elevation="0"
          dark
          @click="deleteFunc"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>

</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data(){
    return{
      headers:[
        {text: 'Color', align: 'start', value: 'color'},

        {text: 'Produced total', sortable: false, align: 'start', value: 'producedTotal'},
        {text: 'Actions', sortable: false, align: 'start', value: 'actions'},
      ],
      items:[],
      title:null,
      delete_dialog:false,
      radioGroup:"",
      selectedItem:{},
      edit_dialog:false,
      edit_validate:true,
      selectedProcessId:null,


      history_dialog:false,
      classification_dialog:false,
      classification_shortcom:{},

      historyHeaders: [
        {text: 'Date', sortable: true, align: 'start', value: 'workDate'},

        {text: 'Done By', sortable: false, align: 'center', value: 'createdBy'},
      ],

      historyList: [],
      classificationEnums: ['DEFECT', 'PHOTO', 'PHOTO_SAMPLE', 'SAMPLE', 'LOST', 'OTHERS'],
      totalQuantity:null,

    }
  },

  computed:{
    ...mapGetters({
      ownList:"commonProcess/ownList",
      historyServerList:"history/historyList",
      planningProcessId:"commonProcess/planningProcessId",
      streamList:"commonProcess/streamList",

    }),
  },

  watch:{
    ownList(list){
      this.headers= [
        {text: 'Color', sortable: false, align: 'start', value: 'color'},
      ]
      if(this.title==="sorting" || this.title==="printing"){
        this.headers.push({text: 'Model part', sortable: false, align: 'start', value: 'modelPartName'})
      }

      list[0]?.sizeDistributionList?.forEach((item) => {
        this.headers.push({
          text: item.size, sortable: false, align: 'start', value: item.size
        })
      })

      this.headers.push(
        {text: 'Produced total', sortable: false, align: 'start', value: this.title==='sorting' ? 'totalQuantity' : 'totalCutQuantity' },
        {text: 'Actions', sortable: false, align: 'start', value: 'actions'},
      )
      let totalQuantity=0

      const specialList = list.map((el) => {
        totalQuantity+= (this.title==="sorting"? el.totalQuantity : el.totalCutQuantity)
        const value = {};
        const sizesList = [];
        el?.sizeDistributionList.forEach((item) => {
          value[item.size] = item.quantity
          sizesList.push({size: item.size, quantity: null})
        });

        return {
          ...value,
          ...el,
          sizeDistributions: [...sizesList],
        }
      })
      this.totalQuantity=totalQuantity
      this.items = JSON.parse(JSON.stringify(specialList))
    },

    historyServerList(list){
      this.historyHeaders = [
        {text: 'Date', sortable: true, align: 'start', value: 'workDate'},
      ]
      if(this.title!=="sorting"){
        this.historyHeaders.push({text: 'Stream number', sortable: true, align: 'start', value: 'streamNumber'})
      }
      list[0]?.sizeDistributions?.forEach((item) => {
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
        el?.sizeDistributions.forEach((item) => {
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
      getOwnList:"commonProcess/getOwnList",
      getSortingOwn:"commonProcess/getSortingOwn",
      updateSorting:"commonProcess/updateSorting",
      updateCommonProcess:"commonProcess/updateCommonProcess",
      deleteCommonProcess:"commonProcess/deleteCommonProcess",
      deleteSorting:"commonProcess/deleteSorting",
      getPatokList:"commonProcess/getPatokList",
      getHistoryList:"history/getHistoryList",
      getSorting:"history/getSorting",
      deleteHistory:"history/deleteHistoryItem",
      editHistory:"history/editHistoryItem",
      createShortcomingsList:"commonCalculationsShortcomings/createShortcomingsList",
      createShortcomingsListSorting:"commonCalculationsShortcomings/createShortcomingsListSorting",
    }),
    getHistory(item) {
      this.history_dialog = true;
      if(this.title==="sorting"){
        this.getSorting(item.id)
      }else{
        this.getHistoryList(item.id)
      }
    },
    editHistoryItem(item){
      this.selectedItem={...item}
      this.selectedItem.status="editHistory"
    },
    deleteHistoryItem(item){
      this.deleteHistory({id:item.id,processId:this.selectedProcessId})
    },
    getClassification(item) {
      this.classification_dialog = true;
      console.log(item);

      this.classification_shortcom=JSON.parse(JSON.stringify(item))
    },
    async saveShortcom(){
      const data={
        description:this.classification_shortcom.comment,
        detailsId:this.classification_shortcom.id,
        reason:this.classification_shortcom.reason,
        sizeDistributions:[],
      }
      this.classification_shortcom?.sizeDistributions.forEach((item) => {
        if (item.quantity !== 0 && item.quantity) {
          data.sizeDistributions.push(item)
        }
      })
      if(this.title==="sorting"){
        await this.createShortcomingsListSorting({data, id:this.planningProcessId})
      }else{
        await this.createShortcomingsList({data,id:this.planningProcessId})
      }
      this.classification_dialog=false
      this.classification_shortcom=[]

    },

    editItem(item){
      this.edit_dialog=true
      this.selectedItem={...item}
      this.selectedItem.status="editProcess"
      this.selectedProcessId=item.id
      this.getHistoryList(item.id)
    },
    save(){
      if(this.selectedItem.status==="editProcess"){
        const data={
          id:this.selectedItem.id,
          operationType:"FIRST_CLASS",
          sizeDistributions:this.selectedItem.sizeDistributions.map((item)=>({
            size:item.size,
            quantity: item.quantity?item.quantity:0
          })),
          color:this.selectedItem.color,
          streamId:this.selectedItem.streamId,
          workDate:this.selectedItem.workDate,
        }
        if(this.title==="sorting"){
          this.updateSorting({payload:data, sortingProcessDetailsId:this.selectedProcessId, isSecond:false})
        }else{
          this.updateCommonProcess(data)
        }
      }
      if(this.selectedItem.status==="editHistory"){
        const data={
          id:this.selectedItem.id,
          sizeDistributionList:[...this.selectedItem.sizeDistributions]
        }
        this.editHistory(data)
      }
      this.edit_dialog=false
    },

    deleteItem(item){
      this.delete_dialog=true
      this.selectedSubcontract={...item}
    },
    deleteFunc(){
      if(this.title==="sorting"){
        this.deleteSorting({sortingProcessDetailsId:this.selectedSubcontract.id, isSecond:false})
      }else{
        this.deleteCommonProcess(this.selectedSubcontract.id)
      }
    },

  },

  mounted(){
    this.title=this.$route.path.split("/")[2]
    if(this.title==="sorting"){
      this.getSortingOwn(false)
    }else{
      this.getOwnList()
    }
    this.getPatokList()
  },

}
</script>
<style lang="">

</style>
