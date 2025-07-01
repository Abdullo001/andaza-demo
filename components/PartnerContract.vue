<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="documentList"
      :items-per-page="50"
      class="elevation-0 rounded"
      hide-default-footer
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex">
            <div class="title"> {{ $t("modelBox.documentBox.document") }}</div>
            <v-spacer/>
            <v-btn
              class="rounded-lg text-capitalize"
              color="#544B99"
              width="160" height="36"
              @click="newDialog = true; dialogStatus='add'"
              dark
            >
              {{ $t("modelBox.documentBox.uploadDocument") }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.contractDeadline="{item}">
        {{ formatLong(item.contractDeadline) }}
      </template>
      <template #item.contractDate="{item}">
        {{ formatLong(item.contractDate) }}
      </template>
      <template #item.actions="{item}">
        <div>
          <v-tooltip top color="#10BF41">
            <template #activator="{on, attrs}">
              <v-btn
                icon class="mr-1"
                @click="editDocument(item)"
                v-on="on"
                v-bind="attrs"
              >
                <v-img src="/edit-green.svg" max-width="20"/>
              </v-btn>
            </template>
            <span>{{ $t("edit") }}</span>
          </v-tooltip>
          <v-tooltip top color="#FF4E4F">
            <template #activator="{on, attrs}">
              <v-btn
                icon @click="deleteDoc(item)"
                v-on="on"
                v-bind="attrs"
              >
                <v-img src="/trash-red.svg" max-width="20"/>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
          <v-tooltip top color="#544B99">
            <template #activator="{on, attrs}">
              <v-btn
                icon class="ml-2"
                :href="item.contractFilePath"
                :download="`Document.${item.contractNumber}`"
                v-on="on"
                v-bind="attrs"
                @click.stop
              >
                <v-img src="/download.svg" max-width="24"/>
              </v-btn>
            </template>
            <span>Download</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
    <v-dialog max-width="900" v-model="newDialog">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between mb-6">
          <div class="title text-capitalize">{{dialogStatus==="add"?"Add contract":"Edit contract" }}</div>
          <v-btn icon color="#544B99" @click="newDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="new_validate" lazy-validation>
            <v-row>
              <v-col cols="6">
                <div class="label">Contract number</div>
                <v-text-field
                  placeholder="Enter contract number"
                  outlined
                  dense
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  color="#544B99"
                  v-model="newDocument.contractNumber"
                  validate-on-blur
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="6">
                <div class="label">Contract amount</div>
                <div class="d-flex">
                  <v-text-field
                    placeholder="Enter contract amount"
                    outlined
                    dense
                    hide-details
                    height="44"
                    class="rounded-lg rounded-r-0 base"
                    color="#544B99"
                    v-model="newDocument.contractAmount"
                    validate-on-blur
                    :rules="[formRules.required]"
                  />
                  <v-select
                    v-model="newDocument.currency"
                    :items="currencyList"
                    item-text="key"
                    item-value="key"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg rounded-l-0 base"
                    append-icon="mdi-chevron-down"
                    dense
                    placeholder="Select"
                    color="#544B99"
                    style="max-width: 100px"
                  />
                </div>
              </v-col>
              <v-col cols="6">
                <div class="label">Contract deadline</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    v-model="newDocument.contractDeadline"
                    :picker-options="pickerShortcuts"
                    class="base_picker"
                    placeholder="dd.MM.yyyy"
                    style="width: 100%; height: 100%"
                    type="date"
                    value-format="timestamp"
                    format="dd.MM.yyyy"
                  >
                  </el-date-picker>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="label">Delivery terms</div>
                <v-select
                  v-model="newDocument.deliveryTerms"
                  :items="deliveryTermList"
                  item-text="key"
                  item-value="key"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  append-icon="mdi-chevron-down"
                  dense
                  placeholder="Enter delivery terms"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="6">
                <div class="label">Contract date</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    v-model="newDocument.contractDate"
                    :picker-options="pickerShortcuts"
                    class="base_picker"
                    placeholder="dd.MM.yyyy"
                    style="width: 100%; height: 100%"
                    type="date"
                    value-format="timestamp"
                    format="dd.MM.yyyy"
                  >
                  </el-date-picker>
                </div>
              </v-col>

              <v-col cols="12">
                <div class="label">{{ $t("modelBox.documentBox.uploadDocument") }}</div>
                <v-file-input
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base mb-4"
                  show-size
                  dense
                  prepend-icon=""
                  prepend-inner-icon="mdi-file-document-outline"
                  :placeholder="$t('modelBox.documentBox.selectDocument')"
                  color="#544B99"
                  v-model="newDocument.contractFile"
                  validate-on-blur
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-spacer/>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg border"
            outlined color="#544B99"
            width="140" height="40"
            @click="newDialog=false"
          >
            {{ $t("userManagement.dialog.cancel") }}
          </v-btn>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#544B99" dark
            width="140" height="40"
            @click="addDocument"
          >
            {{this.dialogStatus!=="edit"?$t("userManagement.dialog.add"):"Edit" }}
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete documents</v-card-title>
        <v-card-text>
          Are you sure you want to Delete document row ?
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
            dark @click="deleteDocumentRow"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" max-width="500">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between mb-6">
          <div class="title text-capitalize">edit document</div>
          <v-btn icon color="#544B99" @click="edit_dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="edit_validate" lazy-validation v-model="valid_edit">
            <v-row>
              <v-col cols="12" lg="12">
                <div class="label">Upload document</div>
                <v-file-input
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base mb-4"
                  show-size
                  dense
                  prepend-icon=""
                  prepend-inner-icon="mdi-file-document-outline"
                  color="#544B99"
                  v-model="edit_document.file"
                  validate-on-blur
                />
                <div class="label">Title</div>
                <v-text-field
                  placeholder="Enter document name"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                  v-model="edit_document.title"
                  validate-on-blur
                  :rules="[formRules.required]"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-spacer/>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg border"
            outlined color="#544B99"
            width="140" height="40"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#544B99" dark
            width="140" height="40"
            @click="docUpdate"
          >
            {{ $t('update') }}
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "DocumentsComponent",
  data() {
    return {
      edit_document: {
        file: null,
        title: '',
        modelId: '',
        id: ''
      },
      valid_edit: true,
      edit_dialog: false,
      delete_dialog: false,
      newDialog: false,
      dialogStatus: 'add',
      headers: [
        {text:  "Contract Number", align: 'start', sortable: false, value: 'contractNumber'},
        {text:  "Delivery condition", align: 'start', sortable: false, value: 'deliveryTerms'},
        {text:  "Contract date", align: 'start', sortable: false, value: 'contractDate'},
        {text:  "Contract amount", align: 'start', sortable: false, value: 'contractAmount'},
        {text:  "Contract deadline", align: 'start', sortable: false, value: 'contractDeadline'},
        {text: "Creator", sortable: false, value: 'createdBy'},
        {text: this.$t('modelBox.measurementListBox.date'), sortable: false, value: 'createdAt'},
        {text: this.$t("catalogGroups.tabs.table.actions"), sortable: false, align: 'center', value: 'actions', width: 180},
      ],
      type_enums: ['DOC', 'PHOTO'],
      fileType: '',
      newDocument: {
        contractAmount:null,
        contractNumber:"",
        contractDate:null,
        contractDeadline:null,
        contractFile:null,
        deliveryTerms:"",
        currency:"USD",
      },
      documentList:[],
      currentId: ''
    }
  },
  computed: {
    ...mapGetters({
      partnerContractList: "partners/partnerContractList",
      newModelId: "models/newModelId",
      partnerId: "partners/partnerId",
      deliveryTermList: "partners/deliveryTermList",
      currencyList: "partners/currencyList",
    })
  },
  watch:{
    partnerContractList(val){
      this.documentList=JSON.parse(JSON.stringify(val))
    },
    newDialog(val){
      if(!val){
        this.$refs.new_validate.reset();
        this.newDocument.contractDeadline=null
        this.newDocument.contractDate=null
      }
    }
  },
  methods: {
    ...mapActions({
      getDocuments: "documents/getDocuments",
      createDocument: "documents/createDocument",
      deleteDocument: "documents/deleteDocument",
      updateDocument: "documents/updateDocument",

      getPartnerContractList:"partners/getPartnerContractList",
      createPartnerContract:"partners/createPartnerContract",
      getDeliveryTermList:"partners/getDeliveryTermList",
      getCurrencyList:"partners/getCurrencyList",
      deleteContract:"partners/deleteContract",
      updateContract:"partners/updateContract",
    }),
    editDocument(item) {
      this.newDocument={...item}
      this.newDocument.contractAmount=this.extractNumber(item.contractAmount)
      this.newDialog = true;
      this.dialogStatus="edit"
    },
    async docUpdate() {
      await this.updateDocument(this.edit_document);
      this.edit_dialog = false;
    },
    deleteDoc(item) {
      this.currentId = item.partnerContractId;
      this.delete_dialog = true;
    },
    async deleteDocumentRow() {
      await this.deleteContract({contractId: this.currentId, partnerId: this.partnerId});
      this.delete_dialog = false;
    },
    async addDocument() {
      const valid = this.$refs.new_validate.validate();
      if(valid) {
        const formData = new FormData();
        Object.entries(this.newDocument).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append("partnerId",this.partnerId)
        if(this.dialogStatus==="add"){
          this.createPartnerContract({data:formData,partnerId:this.partnerId})
        }
        if(this.dialogStatus==="edit"){
          this.updateContract({data:formData,partnerId:this.partnerId,contractId:this.newDocument.partnerContractId})
        }
        this.newDialog = false
      }
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    if(!this.partnerId&&id!=="add-partner"){
      this.$store.commit("partners/setPartnerId",id)
    }
    this.getDeliveryTermList()
    this.getCurrencyList()
    if (id !== 'add-partner') {
      this.getPartnerContractList(this.partnerId)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
