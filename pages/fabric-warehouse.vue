<template>
  <div>
    <v-card
    color="#fff"
    elevation="0"
    class="rounded-t-lg"
    >
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Sip №"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.sipNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Batch №"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.batchNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Order №"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.orderNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-spacer/>
          <v-col cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn
                width="140" outlined
                color="#397CFD" elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                Reset
              </v-btn>
              <v-btn
                width="140" color="#397CFD" dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                Search
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="current_list"
      :items-per-page="10"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
      show-expand
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      @item-expanded="loadDetails"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex w-full align-center justify-space-between">
            <div>Fabric warehouse</div>
            <v-btn
              color="#7631FF"
              dark class="text-capitalize rounded-lg"
              @click="addArrivedFabric"
            >
              <v-icon>mdi-plus</v-icon>
              Add arrived Fabric
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.production="{item}">
        <div class="d-flex ">
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
                @click="spendFunc(item)"
              >
                <v-img src="/spend-icon.svg" max-width="22"/>
              </v-btn>
            </template>
            <span class="text-capitalize">Spend</span>
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
                @click="getHistory(item)"
              >
              <v-img src="/history.svg" max-width="20"/>
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
                @click="workshopFunc(item)"
              >
                <v-img src="/cut-icon.svg" max-width="22"/>
              </v-btn>
            </template>
            <span class="text-capitalize">Workshop</span>
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
                @click="subcontractorFunc(item)"
              >
                <v-img src="/bag-icon.svg" max-width="22"/>
              </v-btn>
            </template>
            <span class="text-capitalize">subcontractor</span>
          </v-tooltip>

        </div>
      </template>
      <template #item.actions="{item}">
        <div class="d-flex ">
          <v-btn icon color="green" @click="editItem(item)">
            <v-img src="/edit-active.svg" max-width="22"/>
          </v-btn>
          <v-btn icon color="red" @click="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27"/>
          </v-btn>
        </div>
      </template>
      <template #expanded-item="{headers, item}">
        <td :colspan="headers.length">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col>
                  <div class="body-1 mb-3">
                    Fabric width in order:
                    <span class="font-weight-bold ml-2"> {{ item?.fabricWidthInOrder }}</span>
                  </div>
                  <div class="body-1 mb-3">
                    Fabric width in fact:
                    <span class="font-weight-bold ml-2"> {{ item?.fabricWidthInFact }}</span>
                  </div>
                  <div class="body-1 mb-3">
                    Density(gsm) in order gr/m2:
                    <span class="font-weight-bold ml-2"> {{ item?.densityInOrder ?? 'No'}}</span>
                  </div>
                  <div class="body-1 mb-3">
                    Density(gsm) in fact gr/m2:
                    <span class="font-weight-bold ml-2"> {{ item?.densityInFact ?? 'No'}}</span>
                  </div>
                </v-col>
                <v-col>
                  <div class="body-1 mb-3">
                    Actual fabric quantity:
                    <span class="font-weight-bold ml-2"> {{ item?.actualFabricQuantity }}</span>
                  </div>
                  <div class="body-1 mb-3">
                    Fabric received Gross weight:
                    <span class="font-weight-bold ml-2"> {{ item?.factReceivedGrossWeight }}</span>
                  </div>
                  <div class="body-1 mb-3">
                    Fabric unit Price:
                    <span class="font-weight-bold ml-2"> {{ item?.fabricUnitPrice }}</span>
                  </div>
                  <div class="body-1 mb-3">
                    Ordered quantity:
                    <span class="font-weight-bold ml-2"> {{ item?.orderedQuantity }}</span>
                  </div>
                </v-col>
                <v-col>
                  <div class="body-1 mb-3">
                    Created at:
                    <span class="font-weight-bold ml-2"> {{ item?.updatedAt }}</span>
                  </div>
                  <div class="body-1 mb-3">
                    Created by:
                    <span class="font-weight-bold ml-2"> {{ item?.updatedBy }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">{{ title }} arrived Fabric</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" v-model="new_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">Sip №</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="arrivedFabric.fabricOrderId"
                  :rules="[formRules.required]"
                  :items="sipNumbers"
                  item-text="sipNumber"
                  item-value="fabricOrderId"
                  hide-details
                  class=" base rounded-lg"
                  rounded
                  outlined
                  dense
                  placeholder="Select Sip №"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Batch №</div>
                <v-text-field
                :rules="[formRules.required]"
                v-model="arrivedFabric.batchNumber"
                outlined
                hide-details
                dense
                class="rounded-lg base "
                placeholder="Enter batch №"
                color="#7631FF"
              />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Fabric width in fact (cm)</div>
                <v-text-field
                :rules="[formRules.required]"
                v-model="arrivedFabric.fabricWidthInFact"
                outlined
                hide-details
                dense
                class="rounded-lg base "
                placeholder="Enter fabric widht in fact"
                color="#7631FF"
              />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Density (gsm) in fact gr/m2</div>
                <v-text-field
                :rules="[formRules.required]"
                v-model="arrivedFabric.densityInFact"
                outlined
                hide-details
                class="rounded-lg base "
                height="44"
                dense
                color="#7631FF"
                placeholder="Enter density (gsm) in fact"
              />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Fact received Gross weight</div>
                <v-text-field
                :rules="[formRules.required]"
                v-model="arrivedFabric.factReceivedGrossWeight"
                outlined
                hide-details
                dense
                class="rounded-lg base "
                placeholder="Enter fact received gross weight"
                color="#7631FF"
              />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Fact received Netto weight</div>
                <v-text-field
                :rules="[formRules.required]"
                v-model="arrivedFabric.factReceivedNettoWeight"
                outlined
                hide-details
                dense
                class="rounded-lg base "
                placeholder="Enter fact received netto weight"
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
            width="163"
            @click="new_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            v-if="title==='New'"
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="163"
            @click="saveArrivedFabric"
          >
            save
          </v-btn>
          <v-btn
            v-else
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="163"
            @click="editArrivedFabric"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="spend_dialog" width="350">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Spending fabric</div>
          <v-btn icon color="#7631FF" @click="spend_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="spend_form" v-model="spend_validate" lazy-validation>
            <v-row>
              <v-col cols="12" >
                <div class="label">to Sip №</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="spendingFabric.idTo"
                  :rules="[formRules.required]"
                  :items="toSipNumbers"
                  item-text="sipNumber"
                  item-value="id"
                  hide-details
                  color="#7631FF"
                  class=" base rounded-lg"
                  rounded
                  outlined
                  dense
                  placeholder="Select Sip №"
                />
              </v-col>
              <v-col cols="12" >
                <div class="label">to Batch №</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="spendingFabric.idTo"
                  :rules="[formRules.required]"
                  :items="toSipNumbers"
                  item-text="batchNumber"
                  item-value="id"
                  hide-details
                  class=" base rounded-lg"
                  rounded
                  color="#7631FF"
                  outlined
                  dense
                  placeholder="Batch №"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">Spending quantity</div>
                <v-text-field
                :rules="[formRules.required]"
                v-model="spendingFabric.spendingQuantity"
                outlined
                hide-details
                dense
                class="rounded-lg base "
                placeholder="Enter spending quantity"
                color="#7631FF"
                suffix="kg"
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
            @click="spend_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="130"
            @click="saveSpending"
          >
            save
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="workshop_dialog" width="450">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Fabric giving to own workshop</div>
          <v-btn icon color="#7631FF" @click="workshop_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="workshop_form" v-model="workshop_validate" lazy-validation>
            <v-row>
              <v-col cols="12" >
                <div class="label">Model №</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="workshop.modelNumber"
                  :rules="[formRules.required]"
                  :items="modelNumbers"
                  hide-details
                  color="#7631FF"
                  class=" base rounded-lg"
                  rounded
                  outlined
                  dense
                  placeholder="Select Model №"
                />
              </v-col>

              <v-col cols="12">
                <div class="label">Giving fabric quantity</div>
                <v-text-field
                :rules="[formRules.required]"
                v-model="workshop.quantity"
                outlined
                hide-details
                dense
                class="rounded-lg base "
                placeholder="Enter giving fabric quantity"
                color="#7631FF"
                :suffix="workshop.measurement"
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
            @click="workshop_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="130"
            @click="saveWorkshop"
          >
            save
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="subcontractor_dialog" width="450">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Fabric giving to Subcontractor</div>
          <v-btn icon color="#7631FF" @click="subcontractor_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="subcontractor_form" v-model="subcontractor_validate" lazy-validation>
            <v-row>
              <v-col cols="12" >
                <div class="label">Partner</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="subcontractor.partnerId"
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

              <v-col cols="12" >
                <div class="label">Model №</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="subcontractor.modelNumber"
                  :items="modelNumbers"
                  :rules="[formRules.required]"
                  hide-details
                  color="#7631FF"
                  class=" base rounded-lg"
                  rounded
                  outlined
                  dense
                  placeholder="Select Model №"
                />
              </v-col>

              <v-col cols="12">
                <div class="label">Giving fabric quantity</div>
                <v-text-field
                :rules="[formRules.required]"
                v-model="subcontractor.quantity"
                outlined
                hide-details
                dense
                class="rounded-lg base "
                placeholder="Enter giving fabric quantity"
                color="#7631FF"
                :suffix="subcontractor.measurement"
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
            @click="subcontractor_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="130"
            @click="saveSubcontractor"
          >
            save
          </v-btn>

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
            color="#7631FF"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="historyHeaders"
            :items="historyList"
            hide-default-footer
            class="mt-4 rounded-lg"
            style="border: 1px solid #E9EAEB"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete fabric warehouse row</v-card-title>
        <v-card-text>
          Are you sure you want to Delete fabric warehouse row?
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
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteItem"
          >
            delete
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
        {text: "Sip №", value: "sipNumber", sortable: false},
        {text: "Batch №", value: "batchNumber", sortable: false},
        {text: "Order №", value: "orderNumber", sortable: false},
        {text: "Model №", value: "modelNumber", sortable: false},
        {text: "Fabric specification", value: "fabricSpecification", sortable: false,width:200},
        {text: "Color", value: "color", sortable: false},
        {text: "Fact recieved Netto weight", value: "factReceivedNettoWeight", sortable: false},
        {text: "Given to cutting", value: "givenToCutting", sortable: false},
        {text: "Remaining q-ty in warehouse", value: "remainingQuantity", sortable: false},
        {text: "Production", value: "production", sortable: false,align:"center"},
        {text: "Action", value: "actions", sortable: false,align:"center"},
        {text: '', value: 'data-table-expand'},
      ],

      historyHeaders:[
        {text: "Date", value: "date", sortable: false},
        {text: "Warehouse operations", value: "warehouseOperations", sortable: false},
        {text: "From", value: "from", sortable: false},
        {text: "To", value: "to", sortable: false},
        {text: "Quantity", value: "quantity", sortable: false},
        {text: "Done by ", value: "doneBy", sortable: false},
      ],

      historyList:[
        {
          date:"08.01.2023",
          warehouseOperations:"Fabric order income",
          from:"Fashionmelon LLC",
          to:"Fashionmelon LLC",
          quantity:"1800 kg",
          doneBy:"Shavkatova M.",
        }
      ],

      expanded: [],
      singleExpand: true,
      valid_search:"",
      new_validate:true,
      workshop_validate:true,
      subcontractor_validate:true,
      spend_validate:true,
      new_dialog:false,
      delete_dialog:false,
      spend_dialog:false,
      workshop_dialog:false,
      subcontractor_dialog:false,

      history_dialog:false,

      title:"",
      arrivedFabric:{},
      spendingFabric:{
        batchNumber:null,
        idFrom:null,
        idTo:null,
        spendingQuantity:null,
      },

      workshop:{
        modelNumber:null,
        quantity:null,
        measurement:null,
        fabricWarehouseId:null,
      },

      subcontractor:{
        fabricWarehouseId:null,
        partnerId:null,
        modelNumber:null,
        quantity:null,
        measurement:null,
      },

      filters:{
        sipNumber:null,
        batchNumber:null,
        orderNumber:null,
      },

      deletedId:null,
      modelNumbers:[],

      current_list:[],
    }
  },

  computed:{
    ...mapGetters({
      fabricWarehouseList:"fabricWarehouse/fabricWarehouseList",
      sipNumbers:"fabricWarehouse/sipNumbers",
      toSipNumbers:"fabricWarehouse/toSipNumbers",
      partnerList:"subcontracts/partnerList",
    })
  },

  watch:{
    fabricWarehouseList(val){
      this.current_list=JSON.parse(JSON.stringify(val))
    }
  },

  created(){
    this.getSipNumbers()
    this.getToSipNumbers()
    this.getPartnerList()
  },

  methods:{
    ...mapActions({
      getFabricWarehouseList:"fabricWarehouse/getFabricWarehouseList",
      createFabricWarehouse:"fabricWarehouse/createFabricWarehouse",
      getSipNumbers:"fabricWarehouse/getSipNumbers",
      updateFabricWarehouse:"fabricWarehouse/updateFabricWarehouse",
      deleteFabricWarehouse:"fabricWarehouse/deleteFabricWarehouse",
      getToSipNumbers:"fabricWarehouse/getToSipNumbers",
      setSpendingFabric:"fabricWarehouse/setSpendingFabric",
      setFabricToWorkshop:"fabricWarehouse/setFabricToWorkshop",
      setFabricToSubcontract:"fabricWarehouse/setFabricToSubcontract",
      getPartnerList:"subcontracts/getPartnerList",
    }),
    loadDetails({item}) {
      // current opened || choose object ^
    },

    addArrivedFabric() {
      this.title="New"
      this.new_dialog=true
    },

    async saveArrivedFabric() {
      const data={...this.arrivedFabric}
      await this.createFabricWarehouse(data)
      await this.$refs.new_form.reset()
      this.new_dialog=false
    },

    editItem(item) {
      this.title="Edit"
      this.arrivedFabric={...item}
      this.new_dialog=true
    },

    editArrivedFabric() {
      const data={
        batchNumber: this.arrivedFabric.batchNumber ,
        densityInFact: this.arrivedFabric.densityInFact,
        fabricOrderId: this.arrivedFabric.fabricOrderId,
        fabricWidthInFact: this.arrivedFabric.fabricWidthInFact.split(" ")[0],
        factReceivedGrossWeight: this.arrivedFabric.factReceivedGrossWeight.split(" ")[0],
        factReceivedNettoWeight: this.arrivedFabric.factReceivedNettoWeight.split(" ")[0],
        id: this.arrivedFabric.id,
      }
      this.updateFabricWarehouse(data)
      this.new_dialog=false
    },

    spendFunc(item) {
      this.spendingFabric.idFrom=item.id
      this.spend_dialog=true
    },

    async saveSpending(){
      const data={...this.spendingFabric}
      await this.setSpendingFabric(data)
      await this.$refs.spend_form.reset()
      this.spend_dialog=false
    },

    getDeleteItem(item){
      this.deletedId=item.id
      this.delete_dialog=true
    },

    deleteItem(){
      this.deleteFabricWarehouse(this.deletedId)
      this.delete_dialog=false

    },

    workshopFunc(item){
      this.workshop_dialog=true
      this.workshop.fabricWarehouseId=item.id
      this.workshop.measurement=item.factReceivedNettoWeight.split(" ")[1]
      this.modelNumbers=[...item.modelNumber.split("/")]

    },

    async saveWorkshop(){
      this.workshop_dialog=false
      const data={
        modelNumber:this.workshop.modelNumber,
        quantity:this.workshop.quantity,
        fabricWarehouseId:this.workshop.fabricWarehouseId,

      }
      this.setFabricToWorkshop(data)

      await this.$refs.workshop_form.reset()
    },

    async saveSubcontractor(){
      this.subcontractor_dialog=false
      const data={
        modelNumber:this.subcontractor.modelNumber,
        quantity:this.subcontractor.quantity,
        fabricWarehouseId:this.subcontractor.fabricWarehouseId,
        partnerId:this.subcontractor.partnerId,

      }
      this.setFabricToSubcontract(data)
      await this.$refs.subcontractor_form.reset()
    },

    async subcontractorFunc(item){
      this.subcontractor_dialog=true
      this.subcontractor.measurement=item.factReceivedNettoWeight.split(" ")[1]
      this.subcontractor.fabricWarehouseId=item.id
      this.modelNumbers=[...item.modelNumber.split("/")]
    },

    getHistory(item) {
      this.history_dialog = true;
    },

    filterData() {
      this.getFabricWarehouseList({sipNumber:this.filters.sipNumber,batchNumber:this.filters.batchNumber,orderNumber:this.filters.orderNumber})
    },
    async resetFilters() {
      await this.getFabricWarehouseList({sipNumber:"",batchNumber:"",orderNumber:""})
      await this.$refs.filter_form.reset()
    },
  },

  mounted(){
    this.getFabricWarehouseList({sipNumber:"",batchNumber:"",orderNumber:""})
  }
}
</script>
<style lang="scss">

</style>
