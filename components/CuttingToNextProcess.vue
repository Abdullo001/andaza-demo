<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="checkedList"
      hide-default-footer
      class="mb-4"
    >
      <template #top>
        <v-card flat>
          <v-card-title>Passing to next process</v-card-title>
        </v-card>
      </template>
      <template #item.actions="{item}">

        <v-tooltip
          top
          color="#7631FF"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#7631FF"
              @click="getHistory(item)"
            >
              <v-img src="/history.svg" max-width="22"/>
            </v-btn>
          </template>
          <span class="text-capitalize">History</span>
        </v-tooltip>
        <v-tooltip
          top
          color="#7631FF"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#7631FF"
              @click="editItem(item)"
            >
              <v-img src="/right-icon.svg" max-width="21"/>
            </v-btn>
          </template>
          <span class="text-capitalize">edit</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <v-dialog v-model="edit_dialog" width="1200">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit Cutting info</div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="edit_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="3" v-for="(item, idx) in selectedItem.sizeDistributions" :key="`_cutting_${idx}`">
                <div class="label">{{ item.size }}</div>
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
            <v-row>
              <v-col cols="12">
                <v-radio-group
                
                  row
                  v-model.trim="selectedItem.workshopType"
                  class="mb-4"
                >
                  <v-radio
                    :aria-disabled="selectedItem.status==='edit_history'"
                    color="#7631FF"
                    label="Own workshop"
                    value="OWN_WORKSHOP"
                  ></v-radio>
                  <v-radio
                    color="#7631FF"
                    label="Subcontractor"
                    value="SUBCONTRACTOR"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" lg="6" >
                <div class="label"  >Select the next process</div>
                <v-select
                  :items="process_list"
                  v-model.trim="selectedItem.process"
                  :disabled="selectedItem.status==='edit_history'"
                  append-icon="mdi-chevron-down"
                  outlined
                  hide-details
                  dense
                  height="44"
                  class="rounded-lg base" color="#7631FF"
                  placeholder="Select process type"
                />
              </v-col>
              <v-col cols="12" lg="6" v-if="selectedItem.workshopType==='SUBCONTRACTOR'">
                <div class="label">Partner</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="selectedItem.partnerId"
                  :items="partnerList"
                  :rules="[formRules.required]"
                  item-text="name"
                  item-value="id"
                  hide-details
                  color="#7631FF"
                  class=" base rounded-lg"
                  rounded
                  outlined
                  dense
                  placeholder="Select partner"
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
        </v-data-table>
      </v-card>
    </v-dialog>

    <v-dialog v-model="history_dialog" max-width="1200">
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
    
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'QualityControl',
  data() {
    return {
      edit_dialog: false,
      history_dialog:false,
      selectedItem: {},
      edit_validate: true,
      process_list: ["CUTTING", "PRINTING", "SEWING", "IRONING", "QUALITY_CONTROL", "PACKAGING"],
      headers: [
        {text: 'Color', align: 'start', sortable: false, value: 'color'},
        {text: 'Total', align: 'start', sortable: false, value: 'total'},
        {text: 'Workshop', align: 'start', sortable: false, value: 'workshop'},
        {text: 'Actions', align: 'end', sortable: false, value: 'actions'},
      ],
      checkedList: [],
      historyHeaders:[
        {text: 'To process', sortable: false, align: 'start', value: 'toProcess'},
        {text: 'Date', sortable: false, align: 'start', value: 'date'},
        {text: 'Done By', sortable: false, align: 'center', value: 'doneBy'},
      ],
      historyList:[],
      selectedEntity:null,
    }
  },

  computed: {
    ...mapGetters({
      planningProcessId: "cuttingProcess/planningProcessId",
      passingList: "cuttingToNextProcess/passingList",
      productionId: "production/planning/productionId",
      partnerList: "subcontracts/partnerList",
      historyListServer: "cuttingToNextProcess/historyProcessableList",


    })
  },

  watch: {
    passingList(list) {
      this.headers = [
        {text: 'Color', align: 'start', sortable: false, value: 'color'},
      ]

      list[0]?.sizeDistributionList.forEach((item) => {
        this.headers.push({
          text: item.size, sortable: false, align: 'start', value: item.size
        })
      })

      this.headers.push(
        {text: 'Total', align: 'start', sortable: false, value: 'total'},
        {text: 'Workshop', align: 'start', sortable: false, value: 'workshop'},
        {text: 'Actions', align: 'end', sortable: false, value: 'actions'},
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

      this.checkedList = JSON.parse(JSON.stringify(specialList))
    },

    historyListServer(list){
      this.historyHeaders=[
        {text: 'To process', sortable: false, align: 'start', value: 'toProcess'},
      ]

      list[0]?.sizeDistributionList.forEach((item) => {
        this.historyHeaders.push({
          text: item.size, sortable: false, align: 'start', value: item.size
        })
      })

      this.historyHeaders.push(
        {text: 'Date', sortable: false, align: 'start', value: 'date'},
        {text: 'Done By', sortable: false, align: 'center', value: 'doneBy'},
      )

      const specialList = list.map(function (el) {
        const value = {};
        const sizesList = [];
        el?.sizeDistributionList.forEach((item) => {
          value[item.size] = item.quantity
          sizesList.push({size: item.size, quantity: item.quantity})
        });

        return {
          ...value,
          ...el,
          sizeDistributions: [...sizesList],

        }
      })

      this.historyList = JSON.parse(JSON.stringify(specialList))
    }

  },

  created() {
    this.getPartnerList()
  },

  methods: {
    ...mapActions({
      getPassingList: "cuttingToNextProcess/getPassingList",
      setUpdatePass: "cuttingToNextProcess/setUpdatePass",
      getPartnerList: "subcontracts/getPartnerList",
      getHistoryList: "cuttingToNextProcess/getHistoryProcessableList",
      deleteHistoryProcessable: "cuttingToNextProcess/deleteHistoryProcessable",
      setHistoryProcessable: "cuttingToNextProcess/setHistoryProcessable",

    }),
    getHistory(item) {
      this.getHistoryList(item.entityId)
      this.history_dialog=true
    },
    editItem(item) {
      this.edit_dialog = true
      this.selectedItem = {...item}
      this.selectedItem.status="editProcess"
      this.getHistoryList(item.entityId)
      this.selectedEntity=item.entityId
    },
    deleteItem() {
    },

    save() {
      if(this.selectedItem.status==="editProcess"){
        let data = {
          entityId: this.selectedItem.entityId,
          process: this.selectedItem.process,
          sizeDistributionList: [...this.selectedItem.sizeDistributions],
          productionId: this.productionId,
          workshopType: this.selectedItem.workshopType,
          planningProcessId: this.planningProcessId,
        }

        if (this.selectedItem.partnerId) {
          data = {...data, partnerId: this.selectedItem.partnerId}
        }
        this.setUpdatePass(data)
      }
      if(this.selectedItem.status==="edit_history"){
        let data={
          id:this.selectedItem.id,
          sizeDistributionList: [...this.selectedItem.sizeDistributions],
        }

        this.setHistoryProcessable({processId:this.planningProcessId,data})
      }
      
      this.edit_dialog = false
    },
    editHistoryItem(item){
      this.selectedItem = {...item}
      this.selectedItem.status="edit_history"

    },

    deleteHistoryItem(item){
      this.deleteHistoryProcessable({id:item.id,entityId:this.selectedEntity,processId:this.planningProcessId})
    },
  },

  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>

</style>
