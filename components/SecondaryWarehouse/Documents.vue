<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="documentsList"
      :items-per-page="50"
      class="elevation-0"
      hide-default-footer
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex">
            <div class="title">Documents</div>
            <v-spacer/>
            <v-btn
              class="rounded-lg text-capitalize"
              color="#544B99"
              width="160" height="36"
              @click="newDialog = true"
              dark
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
          <div class="title text-capitalize">add document</div>
          <v-btn icon color="#544B99" @click="newDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="new_validate" lazy-validation>
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
                  placeholder="Select document"
                  color="#544B99"
                  v-model="newDocument.file"
                  validate-on-blur
                  :rules="[formRules.required]"
                />
                <div class="label">Title</div>
                <v-text-field
                  placeholder="Enter document name"
                  outlined
                  dense
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  color="#544B99"
                  v-model="newDocument.title"
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
                  class="rounded-lg base"
                  color="#544B99"
                  v-model="newDocument.description"
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
            @click="newDialog=false"
          >
            cancel
          </v-btn>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#544B99" dark
            width="140" height="40"
            @click="addDocument"
          >
            save
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
        {text: 'Type', align: 'start', sortable: false, value: 'type'},
        {text: 'Document name', sortable: false, value: 'title'},
        {text: 'Uploader', sortable: false, value: 'createdBy'},
        {text: 'Date', sortable: false, value: 'uploadedAt'},
        {text: 'Actions', sortable: false, align: 'center', value: 'actions'},
      ],
      type_enums: ['DOC', 'PHOTO'],
      fileType: '',
      newDocument: {
        file: null,
        title: '',
        modelId: ''
      },
      currentId: '',
      id:null,
    }
  },
  computed: {
    ...mapGetters({
      documentsList: "generalDocument/documentsList",
      newId:"generalWarehouse/newId",
    })
  },
  watch:{
    newId(val){
      this.id=val
    },

    id(val){
      this.getDocuments({warehouseId: val, });

    }
  },
  methods: {
    ...mapActions({
      getDocuments: "generalDocument/getDocuments",
      createDocument: "generalDocument/createDocument",
      deleteDocument: "generalDocument/deleteDocument",
      updateDocument: "generalDocument/updateDocument"
    }),
    editDocument(item) {
      this.edit_document.id = item.id;
      this.edit_document.title = item.title;
      this.edit_document.modelId = item.modelId;
      this.edit_dialog = true;
    },
    async docUpdate() {
      await this.updateDocument(this.edit_document);
      this.edit_dialog = false;
    },
    deleteDoc(item) {
      this.currentId = item.id;
      this.delete_dialog = true;
    },
    async deleteDocumentRow() {
      
      await this.deleteDocument({id:this.currentId,warehouseId:this.id});
      this.delete_dialog = false;
    },
    async addDocument() {
      const valid = this.$refs.new_validate.validate();
      if(valid) {
        this.newDocument.warehouseId = this.id
        await this.createDocument(this.newDocument);

        this.newDialog = false
      }
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id !== 'add-model') {
      this.getDocuments({warehouseId: id, });
      this.id=id
    } else {
      this.$store.commit('documents/setDocuments', [])
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
