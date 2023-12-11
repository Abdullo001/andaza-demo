<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="subcontractsList"
      :items-per-page="50"
      item-key="id"
      show-select
      :single-select="singleSelect"
      show-expand
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="elevation-0"
      hide-default-footer
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex align-center">
            <span class="mr-8">Subcontractor</span>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #[`header.data-table-select`]="{ props, on }">
        <v-simple-checkbox
          :value="props.value || props.indeterminate"
          v-on="on"
          :indeterminate="props.indeterminate"
          color="#544B99"
        />
      </template>
      <template #item.data-table-select="{isSelected, select,item}">
        <v-simple-checkbox
          color="#544B99"
          v-ripple
          :value="isSelected"
          v-model="item.isMain"
          :disabled="item.isOnCutting"
          @input="select($event)"
          @click="setMainColor(item)"
        />
      </template>
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
      <template #item.wasteFabric="{item}">
        <v-text-field
          @keyup.enter="setWasteFabricFunc(item)"
          outlined
          hide-details
          height="32"
          class="rounded-lg base my-2" dense
          :rules="[formRules.required]"
          validate-on-blur
          color="#544B99"
          v-model="item.wasteFabric"
        />
      </template>
      <template #item.actions="{ item }">
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
                @click="returnDialog(item)"
              >
                <v-img src="/rotate.svg" max-width="22"/>
              </v-btn>
            </template>
            <span class="text-capitalize">return fabric</span>
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
                @click="editParts(item)"
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
                @click="deleteSubcontractOne(item)"
              >
                <v-img src="/delete.svg" max-width="22"/>
              </v-btn>
            </template>
            <span class="text-capitalize">delete</span>
          </v-tooltip>
        </div>
      </template>
      <template #expanded-item="{headers, item}">
        <td :colspan="headers.length">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col>
                  <div class="body-1 mb-3">
                    Total price:
                    <span class="font-weight-bold ml-2"> {{item.totalPrice}}</span>
                  </div>
                  <div class="body-1 mb-3">
                    sent date:
                    <span class="font-weight-bold ml-2">05.03.2023</span>
                  </div>
                </v-col>
                <v-col>
                  <div class="body-1 mb-3">
                    Deadline:
                    <span class="font-weight-bold ml-2">05.03.2023</span>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </td>
      </template>
    </v-data-table>


    <v-dialog v-model="edit_dialog" max-width="572">
      <v-card>
        <v-card-title class="w-full d-flex text-capitalize text-h6 justify-space-between">
          <div>Edit Subcontract</div>
          <v-btn @click="edit_dialog = !edit_dialog" icon>
            <v-icon color="#544B99">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="edit_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">Price per work</div>
                <v-text-field
                  v-model="subcontractsDetail.pricePerWork"
                  placeholder="0.00"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base "
                  validate-on-blur
                  dense
                  color="#544B99"
                  :suffix="subcontractsDetail.priceCurrency"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Sent date</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    v-model="subcontractsDetail.sentDate"
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
                <div class="label">Deadline</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    v-model="subcontractsDetail.deadline"
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
              <v-col cols="12" lg="6"></v-col>

              <v-col cols="12" lg="3" v-for="(item,idx) in subcontractsDetail.sizeDistributions" :key="idx">
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
            @click="updateSubcontractsView"
          >
            save
          </v-btn>
        </v-card-actions>

        <v-divider/>
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
        <v-card-title class="d-flex justify-center"
        >Delete subcontract row
        </v-card-title
        >
        <v-card-text>
          Are you sure you want to Delete subcontract row?
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
            @click="deleteSubcontract"
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
            <v-col  cols="12" lg="3" v-for="(item,idx) in classification_shortcom.sizeDistributions" :key="idx">
              <div class="label">{{item.size}}</div>
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
            @click="saveClassification"
          >
            Save
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog max-width="500" v-model="return_dialog">
      <v-card>
        <v-card-title class="d-flex align-center w-full">
          <div class="title">Returned fabric</div>
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
            <div class="label">Sip №</div>
            <v-text-field
              outlined
              hide-details
              dense
              height="44"
              class="rounded-lg base" color="#544B99"
              placeholder="Enter spin number"
              v-model.trim="returned_fabric.sipNumber"
            />
          </v-col>
          <v-col cols="12">
            <div class="label">Batch №</div>
            <v-text-field
              outlined
              hide-details
              dense
              height="44"
              class="rounded-lg base" color="#544B99"
              placeholder="Enter branch number"
              v-model.trim="returned_fabric.batchNumber"
            />
          </v-col>
          <v-col cols="12">
            <div class="label">Returned fabric quantity</div>
            <div class="d-flex align-center">
              <v-text-field
                outlined
                hide-details
                dense
                height="44"
                class="rounded-l-lg base" color="#544B99"
                placeholder="Enter returned fabric quantity"
                v-model.trim="returned_fabric.quantity"
                :suffix="returned_fabric.measurment"
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
            @click="saveReturnFabric"
          >
            Save
          </v-btn>
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
  name: "Subcontracts",
  data() {
    return {
      historyList:[],
      historyHeaders:[],
      history_dialog:false,
      returned_fabric:{},
      return_dialog:false,
      classification_dialog:false,
      classification_shortcom:{},
      edit_validate:true,
      selected: [],
      singleSelect: false,
      expanded: [],
      singleExpand: true,
      classificationEnums: ['DEFECT','PHOTO','PHOTO_SAMPLE','SAMPLE','LOST','OTHERS'],
      status_enums: ["RECEIVED", "SENT"],



      btn_disabled: true,
      edit_dialog: false,
      delete_dialog: false,
      modelSearch: "",
      modelNumber: "",
      headers: [],
      subcontractsList: [],
      subcontractsDetail: {},
      selectedSubcontract: {},
    };
  },

  computed: {
    ...mapGetters({
      setSubcontractsList: "subcontracts/subcontractsList",
      historyListDate:"cuttingProcess/historyList",

    }),
  },
  watch: {
    setSubcontractsList(list) {
      this.headers= [
        {text: "Sip №", sortable: false, align: "start", value: "sipNumber"},
        {text: "Batch №", sortable: false, align: "start", value: "batchNumber"},
        {text: "Fabric specification", sortable: false, align: "start", value: "fabricSpecification",width:"150"},
        {text: "Given fabric quantity f/c.", sortable: false, value: "givenFabricQuantity",width:"150"},
        {text: "Used fabric", sortable: false, align: "start", value: "usedFabricQuantity",width:"80"},
        {text: "Color", sortable: false, value: "color"},
      ],

      list[0]?.sizeDistributionList?.forEach((item)=>{
        this.headers.push({
          text: item.size, sortable: false, align: 'start', value: item.size
        })
      })
      this.headers.push(
        {text: "Received total quantity", sortable: false, value: "receivedQuantity"},
        {text: "Partner", sortable: false, value: "partnerName"},
        {text: "Price per work", sortable: false, value: "pricePerWork",width:"100"},
        {text: "Status", sortable: false, value: "status",width:"200"},
        {text: "Waste fabric", sortable: false, value: "wasteFabric",width:"150"},
        {text: "Action", sortable: false, value: "actions",width:"250"},
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

      this.subcontractsList = JSON.parse(JSON.stringify(specialList));

    },

    historyListDate(list){
      this.historyHeaders= [
        {text: 'Date', sortable: false, align: 'start', value: 'createdDate'},
      ],
      list[0]?.sizeDistributionList?.forEach((item)=>{
        this.historyHeaders.push({
          text: item.size, sortable: false, align: 'start', value: item.size
        })
      })
      this.historyHeaders.push(
        {text: 'Done By', sortable: false, align: 'center', value: 'createdBy'},

        )

      const specialList=list.map(function(el){
        const value = {};
        el?.sizeDistributionList.forEach((item) => {
          value[item.size]=item.quantity
        });
        return{
          ...el,
          ...value,
        }
      })
      this.historyList=JSON.parse(JSON.stringify(specialList))


    }
  },

  methods: {
    ...mapActions({
      getSubcontractsList: "subcontracts/getSubcontractsList",
      setUpdateSizes: "subcontracts/setUpdateSizes",
      deleteSubcontractServer: "subcontracts/deleteSubcontractServer",
      setClassification: "subcontracts/setClassification",
      createClassification: "subcontracts/createClassification",
      saveReturnFabricFunc: "subcontracts/saveReturnFabric",
      changeStatusFunc: "subcontracts/changeStatus",
      getHistoryList: "cuttingProcess/getHistoryList",
      setMainColorFunc: "subcontracts/setMainColor",
      setWasteFabric: "subcontracts/setWasteFabric",

    }),
    setWasteFabricFunc(item){
      const data={
        id:item.id,
        wasteFabric:item.wasteFabric
      }
      this.setWasteFabric(data)
    },
    setMainColor(item,isSelected){
      if(!item.isOnCutting){
        this.setMainColorFunc(item.id)
      }
    },
    returnDialog(item) {
      this.return_dialog = true;
      this.returned_fabric = {...item};
    },
    saveReturnFabric(){
      const data={
        id:this.returned_fabric.id,
        quantity:this.returned_fabric.quantity,
        warehouseId:this.returned_fabric.warehouseId
      }
      this.saveReturnFabricFunc(data)
      this.return_dialog = false;

    },
    getHistory(item) {
      this.history_dialog = true;
      this.getHistoryList(item.id)
    },

    editParts(item) {
      this.edit_dialog = !this.edit_dialog;
      this.subcontractsDetail = {...item};
      const price=item.pricePerWork.split(" ")
      this.subcontractsDetail.pricePerWork=price[0]
      this.subcontractsDetail.priceCurrency=price[1]
      this.getHistoryList(item.id)

    },

    editHistoryItem(){},

    deleteHistoryItem(){},

    changeStatus(item){
      this.changeStatusFunc({id:item.id, status:item.status})
    },

    getClassification(item) {
      this.classification_dialog = true
      this.classification_shortcom={
        ...item,
        reason: '',
        comment: '',
      }
    },

    saveClassification(){
      const data={
        description: this.classification_shortcom.comment,
        detailsId: this.classification_shortcom.id,
        reason: this.classification_shortcom.reason,
        sizeDistributions:[]
      }
      this.classification_shortcom?.sizeDistributions.forEach((item)=>{
        if(item.quantity!==0 && item.quantity){
          data.sizeDistributions.push(item)
        }
      })

      this.createClassification(data)
      this.classification_dialog = false

    },


    async updateSubcontractsView() {
      this.edit_dialog = false;
      const data={
        sizeDistributions:[...this.subcontractsDetail.sizeDistributions],
        deadline:this.subcontractsDetail.deadline,
        sentDate:this.subcontractsDetail.sentDate,
        pricePerWork:this.subcontractsDetail.pricePerWork,
        id:this.subcontractsDetail.id,
      }
      this.setUpdateSizes(data);
    },

    deleteSubcontractOne(item) {
      this.selectedSubcontract = item;
      this.delete_dialog = true;
    },
    async deleteSubcontract() {
      await this.deleteSubcontractServer({
        id: this.selectedSubcontract.id,
      });
      this.delete_dialog = false;
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.getSubcontractsList();

    this.setClassification()
  },
};
</script>
<style lang="scss" scoped>
.search-field {
  width: 250px !important;
}

.color-white {
  color: #000000;
}

.v-select > .v-input__control > .v-input__slot {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
