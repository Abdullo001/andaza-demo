<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="inspectionList"
      :items-per-page="50"
      class="elevation-0"
      hide-default-footer
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex">
            <div class="title">{{ $t('forms.index.cards.inspectionFiles') }}</div>
            <v-spacer/>
            <v-btn
              class="rounded-lg text-capitalize"
              color="#544B99"
              width="160"
              height="36"
              @click="openDialog"
              :disabled="!currentId"
              :dark="!!currentId"
            >
              Upload document
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.sendDate="{item}">
        {{ formatLong(item.sendDate) }}
      </template>
      <template #item.result="{item}">
        <v-chip :color="statusColor.inspectionStatus(item.result)" dark class="font-weight-bold ml-5">{{ item.result }}</v-chip>
      </template>
      <template #item.actions="{item}">
        <div>
          <v-tooltip top color="#10BF41">
            <template #activator="{on, attrs}">
              <v-btn
                icon class="mr-2"
                @click="editDocument(item)"
                v-on="on"
                v-bind="attrs"
              >
                <v-img src="/edit-green.svg" max-width="20"/>
              </v-btn>
            </template>
            <span>{{ $t("edit") }}</span>
          </v-tooltip>
          <v-tooltip top color="red">
            <template #activator="{on, attrs}">
              <v-btn
                icon class="mr-2"
                @click="openDeleteDialog(item)"
                v-on="on"
                v-bind="attrs"
              >
                <v-img src="/trash-red.svg" max-width="20" />
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
          <v-tooltip top color="#544B99">
            <template #activator="{on, attrs}">
              <v-btn
                icon class="ml-2"
                :href="item.filePath"
                :download="`Document.${item.extension}`"
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
    <v-dialog max-width="700" v-model="newDialog">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between mb-6">
          <div class="title text-capitalize">upload inspection file</div>
          <v-btn icon color="#544B99" @click="newDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="new_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="8">
                  <div class="label" >
                    Upload document
                  </div>
                <v-file-input
                  outlined
                  hide-details
                  placeholder="Select document"
                  height="44"
                  class="rounded-lg base mb-4"
                  show-size
                  dense
                  prepend-icon=""
                  prepend-inner-icon="mdi-file-document-outline"
                  color="#544B99"
                  v-model="newInspectionFile.file"
                  validate-on-blur
                />
                </v-col>
                <v-col cols="12" lg="4">
                  <div class="label">Status</div>
                  <v-select
                    v-model="newInspectionFile.status"
                    :items="inspectionStatus"
                    placeholder="Select status"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base"  dense
                    color="#544B99"
                    append-icon="mdi-chevron-down"
                  />
                </v-col>
                <v-col cols="12" lg="8">
                <div class="label">Title</div>
                <v-text-field
                  placeholder="Enter document name"
                  outlined
                  dense
                  hide-details
                  height="44"
                  class="rounded-lg base mb-4"
                  color="#544B99"
                  v-model="newInspectionFile.title"
                  validate-on-blur
                  :rules="[formRules.required]"
                />
                </v-col>
                <v-col cols="12" lg="4">
                  <div class="label">Inspection date</div>
                  <div style="height: 40px !important">
                    <el-date-picker
                      v-model="newInspectionFile.sendDate"
                      :picker-options="pickerShortcuts"
                      class="base_picker"
                      placeholder="dd.MM.yyyy HH:mm:ss"
                      style="width: 100%; height: 100%"
                      type="date"
                      value-format="timestamp"
                    >
                    </el-date-picker>
                  </div>
                </v-col>
                <v-col cols="12" lg="12">
                <div class="label">Description</div>
                <v-text-field
                  placeholder="Enter description"
                  outlined
                  dense
                  hide-details
                  height="44"
                  class="rounded-lg base mb-4"
                  color="#544B99"
                  v-model="newInspectionFile.description"
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
            cancel
          </v-btn>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#544B99"
            width="140" height="40"
            :disabled="btnDisabled"
            :dark="!btnDisabled"
            @click="addDocument"
          >
            save
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" max-width="700">
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
              <v-col cols="12" lg="8">
                <div class="label" >
                  Upload document
                </div>
              <v-file-input
                outlined
                hide-details
                placeholder="Select document"
                height="44"
                class="rounded-lg base mb-4"
                show-size
                dense
                prepend-icon=""
                prepend-inner-icon="mdi-file-document-outline"
                color="#544B99"
                v-model="newInspectionFile.file"
                validate-on-blur
              />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="label">Status</div>
                <v-select
                  v-model="newInspectionFile.status"
                  :items="inspectionStatus"
                  placeholder="Select status"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"  dense
                  color="#544B99"
                  append-icon="mdi-chevron-down"
                />
              </v-col>
              <v-col cols="12" lg="8">
              <div class="label">Title</div>
              <v-text-field
                placeholder="Enter document name"
                outlined
                dense
                hide-details
                height="44"
                class="rounded-lg base mb-4"
                color="#544B99"
                v-model="newInspectionFile.title"
                validate-on-blur
                :rules="[formRules.required]"
              />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="label">Send date</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    v-model="newInspectionFile.sendDate"
                    :picker-options="pickerShortcuts"
                    class="base_picker"
                    placeholder="dd.MM.yyyy HH:mm:ss"
                    style="width: 100%; height: 100%"
                    type="date"
                    value-format="timestamp"
                  >
                  </el-date-picker>
                </div>
              </v-col>
              <v-col cols="12" lg="12">
              <div class="label">Description</div>
              <v-text-field
                placeholder="Enter description"
                outlined
                dense
                hide-details
                height="44"
                class="rounded-lg base mb-4"
                color="#544B99"
                v-model="newInspectionFile.description"
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
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#544B99"
            width="140" height="40"
            @click="addDocument"
            :dark="!btnDisabled"
            :disabled="btnDisabled"
          >
            {{ $t('update') }}
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <DeleteDialog v-bind="delete_data"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import DeleteDialog from "./DeleteDialog.vue";

export default {
  name: "InspectionFile",
  components:{
    DeleteDialog,
  },
  data() {
    return {
      edit_document: {
        file: null,
        title: '',
        modelId: '',
        id: ''
      },
      inspectionStatus:["NA","OK","PENDING","REMAKE"],
      valid_edit: true,
      edit_dialog: false,
      delete_dialog: false,
      selectedItem:{},
      newDialog: false,
      dialogStatus: 'add',
      btnDisabled: false,
      title: 'add',
      headers: [
        {text:  this.$t('inspectionBox.inspectionDate'), sortable: false, value: 'sendDate'},
        {text: this.$t('inspectionBox.titleDoc'), sortable: false, value: 'title'},
        {text:this.$t('listsModels.child.description'), sortable: false, value: 'description'},
        {text: this.$t('partners.table.status'),  sortable: false, value: 'result'},
        {text: this.$t("catalogGroups.tabs.table.createdAt"), sortable: false, value: 'createdAt'},
        {text: this.$t("catalogGroups.tabs.table.actions"), sortable: false, align: 'center', value: 'actions'},
      ],
      type_enums: ['DOC', 'PHOTO'],
      fileType: '',
      newInspectionFile: {
        file: null,
        title: '',
        description: '',
        modelId: '',
        sendDate:'',
      },
      currentId: '',
      inspectionList: [],
      inspection_list_length: null,
      currentModel:{},
      deleteDialog:false
    }
  },
  computed: {
    ...mapGetters({
      inspectionFileList: "inspectionFile/inspectionFileList",
      selectedModel: "inspectionFile/model",
      newModelId: "models/newModelId",

    }),

    delete_data:{
      get(){
        return{
          deleteDialog:this.deleteDialog,
          closeDialog:()=>{this.deleteDialog=false},
          deleteFunction:this.deleteFunc,
        }
      }
    }
  },
  watch: {
    selectedModel(val){
      this.currentId=val.id
    },
    inspectionFileList(list) {
        this.inspectionList = JSON.parse(JSON.stringify(list))

    },
  },
  methods: {
    ...mapActions({
      getInspectionFileList: "inspectionFile/getInspectionFileList",
      uploadInspectionFile: "inspectionFile/uploadInspectionFile",
      updateInspectionFile: "inspectionFile/updateInspectionFile",
      deleteInspectionFile: "inspectionFile/deleteInspectionFile",
    }),
    openDialog(){
      this.newDialog=true
      this.newInspectionFile.title=""
      this.newInspectionFile.description=""
      this.newInspectionFile.modelId=""
      this.newInspectionFile.id=""
      this.newInspectionFile.sendDate=""
      this.newInspectionFile.status=""

    },
    editDocument(item) {
      this.title = 'edit'
      this.newInspectionFile.id = item.id
      this.newInspectionFile.title = item.title
      this.newInspectionFile.description = item.description
      this.newInspectionFile.modelId = item.modelId
      this.newInspectionFile.sendDate = item.sendDate
      this.newInspectionFile.status = item.result
      this.edit_dialog = true
    },
    openDeleteDialog(item){
      this.deleteDialog=true
      this.selectedItem={...item}

    },
    deleteFunc(){
      this.deleteInspectionFile({id: this.selectedItem.modelId,inspectionId:this.selectedItem.id})
      this.deleteDialog=false
    },
    async addDocument() {
      this.newInspectionFile.modelId = this.$route.params.id!=='add-inspection'?this.$route.params.id:this.currentId
      this.btnDisabled = true
        const {
          description,
          title,
          modelId,
          sendDate,
          status,
          id
        } = this.newInspectionFile
      const formData= new FormData()
      formData.append("inspectionDescription", description)
      formData.append("inspectionTitle", title)
      formData.append("modelId", modelId)
      formData.append("sendDate", sendDate)
      formData.append("result", status)
      if(!!this.newInspectionFile.file){
        formData.append("file", this.newInspectionFile.file)
      }

       if(this.title === 'add') {
         await this.uploadInspectionFile( { data: formData, id: this.newInspectionFile.modelId } )
        .then((res) => {
          this.btnDisabled = false
          this.$refs.new_validate.reset()
        })
        .catch((err) => this.btnDisabled = false);

        this.newDialog = false;
       }else if (this.title === 'edit') {
        formData.append("inspectionId", id)
         await this.updateInspectionFile( { data: formData, id: this.newInspectionFile.modelId,inspectionId:id } )
        .then((res) => {
          this.btnDisabled = false
          this.$refs.edit_validate.reset()
        })
        .catch((err) => this.btnDisabled = false);

        this.edit_dialog = false
       }
      this.newInspectionFile.sendDate=""

    },


  },
  async mounted() {
    const id = this.$route.params.id;
    if (id !== 'add-inspection') {
      await this.getInspectionFileList(id);
      this.currentId=id
      this.dialogStatus = 'Edit'
    } else {
      this.dialogStatus = 'Add'
      this.$store.commit('documents/setDocuments', [])
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
