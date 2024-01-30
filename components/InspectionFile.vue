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
            <div class="title">Inspection file</div>
            <v-spacer/>
            <v-btn
              class="rounded-lg text-capitalize"
              color="#544B99"
              :disabled="inspectionList.length > 0"
              width="160"
              height="36"
              @click="newDialog = true"
              :dark="!(inspectionList.length > 0)"
            >
              Upload document
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
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
            <span>Edit</span>
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
    <v-dialog max-width="500" v-model="newDialog">
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
              <v-col cols="12" lg="12">
                  <div class="text-body-1 font-weight-medium mb-3" v-if="inspectionList.length !== 1">
                    Upload document
                  </div>
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
                  v-model="newInspectionFile.file"
                  validate-on-blur
                />
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
            color="#544B99" dark
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
                  v-model="newInspectionFile.file"
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
                  v-model="newInspectionFile.title"
                  validate-on-blur
                  :rules="[formRules.required]"
                />
                <div class="label">Description</div>
                <v-text-field
                  placeholder="Enter description"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                  v-model="newInspectionFile.description"
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
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "InspectionFile",
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
      btnDisabled: false,
      title: 'add',
      headers: [
        {text: 'Document name', sortable: false, value: 'title'},
        {text: 'Description', sortable: false, value: 'description'},
        {text: 'Actions', sortable: false, align: 'center', value: 'actions'},
      ],
      type_enums: ['DOC', 'PHOTO'],
      fileType: '',
      newInspectionFile: {
        file: null,
        title: '',
        description: '',
        modelId: ''
      },
      currentId: '',
      inspectionList: [],
      inspection_list_length: null,
    }
  },
  computed: {
    ...mapGetters({
      inspectionFileList: "inspectionFile/inspectionFileList",
      newModelId: "models/newModelId"
    })
  },
  watch: {
    inspectionFileList(list) {
      if(Object.keys(this.inspectionFileList).length !== 0) {
        this.inspectionList = [list]
      }
    },
  },
  methods: {
    ...mapActions({
      getInspectionFileList: "inspectionFile/getInspectionFileList",
      uploadInspectionFile: "inspectionFile/uploadInspectionFile",
    }),
    editDocument(item) {
      this.title = 'edit'
      this.newInspectionFile.id = item.id
      this.newInspectionFile.title = item.title
      this.newInspectionFile.description = item.description
      this.newInspectionFile.modelId = item.modelId
      this.edit_dialog = true
    },
    async addDocument() {
      this.newInspectionFile.modelId = this.$route.params.id
      this.btnDisabled = true
        const {
          description,
          title,
          modelId,
        } = this.newInspectionFile
      const formData= new FormData()
      formData.append("description", description)
      formData.append("title", title)
      formData.append("modelId", modelId)
      if(!!this.newInspectionFile.file){
        formData.append("file", this.newInspectionFile.file)
      }
      await this.uploadInspectionFile( { data: formData, id: this.newInspectionFile.modelId } )
        .then((res) => {
          this.btnDisabled = false
          this.$refs.edit_validate.reset()
        })
        .catch((err) => this.btnDisabled = false);
       if(this.title === 'add') {
         this.newDialog = false;
       }else if (this.title === 'edit') {
         this.edit_dialog = false
       }
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id !== 'add-model') {
      await this.getInspectionFileList(id);
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
