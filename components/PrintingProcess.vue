<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="cuttingTable"
    >
      <template #top>
        <div class="title ma-4">Printing</div>
      </template>
      
      <template #item.actions="{item}">
        <v-btn icon @click="getClassification(item)">
          <v-img src="/t-shirt.svg" max-width="20"/>
        </v-btn>
        <v-btn icon @click="getHistory(item)">
          <v-img src="/history.svg" max-width="20"/>
        </v-btn>

        <v-btn icon color="green" @click.stop="editItem(item)">
          <v-img src="/edit-active.svg" max-width="22"/>
        </v-btn>
        <v-btn icon color="red" @click.stop="deleteItem(item)">
          <v-img src="/delete.svg" max-width="27"/>
        </v-btn>
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
            color="#7631FF"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="12" lg="3">
              <div class="label">24</div>
              <v-text-field
                outlined
                hide-details
                dense
                height="44"
                class="rounded-lg base" color="#7631FF"
                placeholder="Enter branch number"
                v-model.trim="classificationList['24']"
              />
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">26</div>
              <v-text-field
                outlined
                hide-details
                dense
                height="44"
                class="rounded-lg base" color="#7631FF"
                placeholder="Enter branch number"
                v-model.trim="classificationList['26']"
              />
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">28</div>
              <v-text-field
                outlined
                hide-details
                dense
                height="44"
                class="rounded-lg base" color="#7631FF"
                placeholder="Enter branch number"
                v-model.trim="classificationList['28']"
              />
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">30</div>
              <v-text-field
                outlined
                hide-details
                dense
                height="44"
                class="rounded-lg base" color="#7631FF"
                placeholder="Enter branch number"
                v-model.trim="classificationList['30']"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <div class="label">Reason</div>
              <v-select
                :items="classificationEnums"
                v-model.trim="classificationList.reason"
                append-icon="mdi-chevron-down"
                outlined
                hide-details
                dense
                height="44"
                class="rounded-lg base" color="#7631FF"
                placeholder="Enter branch number"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <div class="label">Comment</div>
              <v-text-field
                v-model.trim="classificationList.comment"
                outlined
                hide-details
                dense
                height="44"
                class="rounded-lg base" color="#7631FF"
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
            color="#7631FF"
            width="163" height="44"
            @click="classification_dialog=false"
            style="border-width: 2px"
          >
            {{ $t('planningProduction.planning.cancel') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold ml-8"
            color="#7631FF" dark
            width="163" height="44"
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
            color="#7631FF"
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

    <v-dialog v-model="edit_dialog" width="600">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit printing info</div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="edit_validate" lazy-validation>
            <v-row>
              <v-col cols="12">
                <div class="label">Photos of printing</div>
              </v-col>
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
                  color="#7631FF"   
                />
              </v-col>
              
              
              
            </v-row>
          </v-form>

          
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#7631FF"
            width="130"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
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
          Delete printing info
        </v-card-title>
        <v-card-text>
          Are you sure you want to  Delete  printing info? 
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
            @click="deletePrinting"
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
  name: 'CuttingComponent',
  data() {
    return {
      table:"", 
      edit_validate:true,
      return_dialog: false,
      headers: [
        {text: 'Color', sortable: false, align: 'start', value: 'color'},
        
        {text: 'Printing total quantity', sortable: false, align: 'start', value: 'printingTotalQuantity'},
        {text: 'Print photo', sortable: false, align: 'start', value: 'printPhoto'},
        {text: 'Comment', sortable: false, align: 'end', value: 'comment'},
        {text: 'Actions', sortable: false, align: 'center', value: 'actions'},
      ],
      items: [],
      selectedItem:{},
      selectedProcessId:null,
      edit_dialog:false,
      delete_dialog:false,

      history_dialog:false,
      classification_dialog:false,
      classification_shortcom:{},

      historyHeaders: [
        {text: 'Date', sortable: false, align: 'start', value: 'date'},
        {text: 'Done By', sortable: false, align: 'canter', value: 'doneBy'},
      ],

      historyList: [],

      classificationList: {
        24: 100,
        26: 120,
        28: 140,
        30: 160,
        reason: 'Defect',
        comment: ''
      },
      classificationEnums: ['Defect', 'Effect )'],
    }
  },

  computed:{
    ...mapGetters({
      ownList:"commonProcess/ownList",
      historyServerList:"history/historyList",
    }),
  },

  watch:{
    ownList(list){
      this.headers= [
        {text: 'Color', sortable: false, align: 'start', value: 'color'},  
      ],

      list[0]?.sizeDistributionList?.forEach((item) => {
        this.headers.push({
          text: item.size, sortable: false, align: 'start', value: item.size
        })
      })

      this.headers.push(
        {text: 'Printing total quantity', sortable: false, align: 'start', value: 'totalCutQuantity'},
        {text: 'Print photo', sortable: false, align: 'start', value: 'printPhoto'},
        {text: 'Comment', sortable: false, align: 'end', value: 'description'},
        {text: 'Actions', sortable: false, align: 'center', value: 'actions'},
      )

      const specialList = list.map(function (el) {
        const value = {};
        const sizesList = [];
        el?.sizeDistributionList.forEach((item) => {
          value[item.size] = item.quantity
          sizesList.push({size: item.size, quantity: 0})
        });

        return {
          ...value,
          ...el,
          sizeDistributions: [...sizesList],

        }
      })
      this.items = JSON.parse(JSON.stringify(specialList))
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
        {text: 'Done By', sortable: false, align: 'canter', value: 'createdBy'},
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

  methods: {
    ...mapActions({
      getOwnList:"commonProcess/getOwnList",
      updateCommonProcess:"commonProcess/updateCommonProcess",
      deleteCommonProcess:"commonProcess/deleteCommonProcess",
      getHistoryList:"history/getHistoryList",
      deleteHistory:"history/deleteHistoryItem",
      editHistory:"history/editHistoryItem",

    }),
    getHistory(item) {
      this.history_dialog = true;
      this.getHistoryList(item.id)
    },

    getClassification(item) {
      this.classification_dialog = true;
    },

    editItem(item){
      this.edit_dialog=true
      this.selectedItem={...item}
      this.selectedItem.status="editProcess"
      this.selectedProcessId=item.id
      this.getHistoryList(item.id)

    },
    deleteItem(item){
      this.delete_dialog=true
      this.selectedItem={...item}
    },

    save(){
      if(this.selectedItem.status==="editProcess"){
        const data={
          id:this.selectedItem.id,
          sizeDistributions:[...this.selectedItem.sizeDistributions]
        }
        this.updateCommonProcess(data)
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
    deletePrinting(){
      this.deleteCommonProcess(this.selectedItem.id)
      this.delete_dialog=false
    },
    editHistoryItem(item){
      this.selectedItem={...item}
      this.selectedItem.status="editHistory"
    },
    deleteHistoryItem(item){
      this.deleteHistory({id:item.id,processId:this.selectedProcessId})
    },


    
  },
  mounted(){
    this.getOwnList()
  },
}
</script>

<style lang="scss" scoped>
  
</style>
