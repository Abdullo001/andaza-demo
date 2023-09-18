<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="checkedList"
      hide-default-footer
      style="border: 1px solid #eae9e9"
      class="rounded-lg overflow-hidden"
    >
      <template #top>
        <v-card flat>
          <v-card-title>Quantity of Resent to alteration</v-card-title>
        </v-card>
      </template>
      <template #item.actions="{item}">
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
              @click="editItem(item)"
            >
              <v-img src="/edit-active.svg" max-width="21"/>
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
              @click="deleteItem(item)"
            >
              <v-img src="/delete.svg" max-width="24"/>
            </v-btn>
          </template>
          <span class="text-capitalize">delete</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">
          Delete this info
        </v-card-title>
        <v-card-text>
          Are you sure you want to Delete this info?
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
            @click="deleteConfirm"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="1200">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            Edit quantity of resent to alteration
          </div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="edit_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="3" v-for="(item,idx) in selectedItem.sizeDistributions" :key="idx">
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  outlined
                  hide-details
                  dense
                  height="44"
                  class="rounded-lg base" color="#7631FF"
                  placeholder="Enter branch number"
                  v-model.trim="item.quantity"
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
            @click="saveChanges"
          >
            save
          </v-btn>
        </v-card-actions>
        <v-divider/>
        <div class="px-4 pb-4">
          <v-data-table
            :headers="historyHeaders"
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
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'Alteration',
  data() {
    return {
      headers: [
        {text: 'Color', align: 'start', sortable: false, value: 'color'},
        {text: '24', align: 'start', sortable: false, value: '24'},
        {text: '26', align: 'start', sortable: false, value: '26'},
        {text: '28', align: 'start', sortable: false, value: '28'},
        {text: '30', align: 'start', sortable: false, value: '30'},
        {text: 'Total', align: 'start', sortable: false, value: 'total'},
        {text: 'Actions', align: 'end', sortable: false, value: 'actions'},
      ],
      checkedList: [],
      edit_dialog: false,
      delete_dialog: false,
      edit_validate: true,
      selectedItem:{},
      sizeDistributions: [
        {size: 24, quantity: 24},
        {size: 26, quantity: 26},
        {size: 28, quantity: 28},
        {size: 30, quantity: 30},
      ],
      historyHeaders: [
        {text: "Date", sortable: false, align: 'start', value: 'date'},
        
        {text: "Done by ", sortable: false, align: 'center', value: 'doneBy'},
      ],
      historyList: [],
    }
  },
  computed:{
    ...mapGetters({
      sentToAlterationList:"commonProcess/sentToAlterationList",
      historySentToAlterationList:"history/historySentToAlterationList",
      planningProcessId:"commonProcess/planningProcessId",

    }),
  },

  watch:{
    sentToAlterationList(list){
      this.headers= [
        {text: 'Color', sortable: false, align: 'start', value: 'color'},  
      ],

      list[0]?.sizeDistributionList?.forEach((item) => {
        this.headers.push({
          text: item.size, sortable: false, align: 'start', value: item.size
        })
      })

      this.headers.push(
        {text: 'Produced total', sortable: false, align: 'start', value: 'totalCutQuantity'},
        {text: 'Actions', sortable: false, align: 'start', value: 'actions'},
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

    historySentToAlterationList(list){
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
  methods: {
    ...mapActions({
      getSentToAlterationList: "commonProcess/getSentToAlterationList",
      updateSentToAlterationProcess: "commonProcess/updateSentToAlterationProcess",
      getHistorySentToAlterationList: "history/getHistorySentToAlterationList",
      deleteSentToAlterationProcess: "commonProcess/deleteSentToAlterationProcess",

    }),
    editItem(item){
      this.edit_dialog=true
      this.selectedItem={...item}
      this.selectedItem.status="editProcess"
      this.selectedProcessId=item.id
      this.getHistorySentToAlterationList(item.id)
    },
    saveChanges(){
      if(this.selectedItem.status==="editProcess"){
        const data={
          id:this.selectedItem.id,
          operationType:"SENT_TO_ALTERATION",
          sizeDistributions:[...this.selectedItem.sizeDistributions]
        }
        this.updateSentToAlterationProcess(data)
      }
      if(this.selectedItem.status==="editHistory"){
        const data={
          id:this.selectedItem.id,
          sizeDistributionList:[...this.selectedItem.sizeDistributions]
        }
        this.editHistorySecondClassItem(data)
      }
      this.edit_dialog=false
    },
    deleteItem(item) {
      this.delete_dialog = true;
      this.selectedItem={...item}
    },
    deleteConfirm() {
      this.deleteSentToAlterationProcess(this.selectedItem.id)
    },
    editHistoryItem(item) {
    },
    deleteHistoryItem(item) {}
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.getSentToAlterationList();
  }
}
</script>

<style lang="scss" scoped>

</style>
