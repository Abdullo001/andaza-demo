<template>
  <v-card flat class="rounded-lg mb-5">
    <v-data-table
      item-key="calculation"
      :headers="headers"
      :items="items"
      disable-pagination
      hide-default-footer
    >
      <template #top>
        <div class="pa-4 d-flex align-center justify-space-between">
          <div class="title">Given accessories quantity</div>

        </div>
      </template>
      <template #item.actions="{item}">
        <div>
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
                @click="returnDialog(item)"
              >
                <v-img src="/rotate.svg" max-width="22"/>
              </v-btn>
            </template>
            <span class="text-capitalize">return accessory</span>
          </v-tooltip>
        </div>
      </template>

    </v-data-table>
    <v-dialog max-width="500" v-model="return_dialog">
      <v-card>
        <v-card-title class="d-flex align-center w-full">
          <div class="title">Returned accessory</div>
          <v-spacer/>
          <v-btn
            icon
            color="#544B99"
            @click="return_dialog=false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-col cols="12">
            <div class="label">Accessory name</div>
            <v-text-field
              outlined
              hide-details
              dense
              height="44"
              class="rounded-lg base" color="#544B99"
              placeholder="Enter spin number"
              v-model.trim="selectedItem.name"
              readonly
            />
          </v-col>
          <v-col cols="12">
            <div class="label">Returned accessory quantity</div>
            <div class="d-flex align-center">
              <v-text-field
                outlined
                hide-details
                dense
                height="44"
                class="rounded-l-lg base" color="#544B99"
                placeholder="Enter returned fabric quantity"
                v-model.trim="selectedItem.returnedQuantity"
                :suffix="selectedItem.measurementUnit"
              />
            </div>
          </v-col>
        </v-card-text>
        <v-card-actions class="px-10 pb-5">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#544B99"
            width="163" height="44"
            @click="return_dialog=false"
            style="border-width: 2px"
          >
            {{ $t('planningProduction.planning.cancel') }}
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold ml-8"
            color="#544B99" dark
            width="163" height="44"
            @click="saveReturnAccessory"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="history_dialog" max-width="500">
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
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'CalculationShortcomings',
  data() {
    return {
      headers: [
        {
          text: 'Accessory name',
          sortable: false,
          align: 'start',
          value: 'accessoryName'
        },
        {
          text: 'Specification',
          sortable: false,
          align: 'start',
          value: 'specification'
        },
        {
          text: 'Given quantity',
          sortable: false,
          align: 'start',
          value: 'givenQuantity'
        },

        {
          text: 'Actions',
          sortable: false,
          align: 'start',
          value: 'actions'
        },

      ],
      items: [],
      return_dialog:false,
      history_dialog:false,
      selectedItem:{},
      historyHeaders:[
        {
          text: 'Id',
          sortable: false,
          align: 'start',
          value: 'id'
        },
        {
          text: 'Quantity',
          sortable: false,
          align: 'start',
          value: 'quantity'
        },
      ],
    }
  },

  computed:{
    ...mapGetters({
      accessorysList:"givenAccessoryQuantity/accessorysList",
      historyList:"givenAccessoryQuantity/historyList",
      planningProcessId:"commonProcess/planningProcessId",
    })
  },

  watch:{
    accessorysList(val){
      this.headers= [
        {
          text: 'Accessory name',
          sortable: false,
          align: 'start',
          value: 'name'
        },
        {
          text: 'Specification',
          sortable: false,
          align: 'start',
          value: 'specification'
        },
        {
          text: 'Given quantity',
          sortable: false,
          align: 'start',
          value: 'quantity'
        },
        {
          text: 'M/U',
          sortable: false,
          align: 'start',
          value: 'measurementUnit'
        },

        {
          text: 'Actions',
          sortable: false,
          align: 'start',
          value: 'actions'
        },
      ]
      if(val[0]?.partner){
        this.headers.splice(3,0,
          {
            text: 'Partner',
            sortable: false,
            align: 'start',
            value: 'partner'
          },
        )
      }

      this.items=JSON.parse(JSON.stringify(val))
    },

  },

  methods:{
    ...mapActions({
      setAccessoryReturn: "givenAccessoryQuantity/setAccessoryReturn",
      getHistoryList: "givenAccessoryQuantity/getHistoryList",
    }),
    returnDialog(item){
      this.selectedItem={...item}
      this.return_dialog=true

    },
    saveReturnAccessory(){
      const data={
        id:this.selectedItem.id,
        quantity:this.selectedItem.returnedQuantity,
      }
      const isSubcontract=this.selectedItem.partner?true:false
      this.setAccessoryReturn({data,isSubcontract,processPlaningId:this.planningProcessId})
      this.return_dialog=false
    },
    getHistory(item){
      this.history_dialog=true
      this.getHistoryList(item.id)
    },

  }
}
</script>

<style lang="scss" scoped>

</style>
