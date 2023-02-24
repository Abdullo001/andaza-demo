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
              color="#7631FF"
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
          <v-btn icon class="mr-2" @click="editDocument(item)">
            <v-img src="/edit-green.svg" max-width="20"/>
          </v-btn>
          <v-btn icon @click="deleteDoc(item)">
            <v-img src="/trash-red.svg" max-width="20"/>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog max-width="500" v-model="newDialog">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between mb-6">
          <div class="title text-capitalize">add document</div>
          <v-btn icon color="#7631FF" @click="newDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="new_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="12">
                <v-file-input
                  label="Upload document"
                  filled show-size
                  prepend-icon=""
                  prepend-inner-icon="mdi-file-document-outline"
                  color="#7631FF"
                  v-model="newDocument.file"
                  validate-on-blur
                  :rules="[formRules.required]"
                />
                <v-text-field
                  label="Title"
                  placeholder="Enter document name"
                  filled color="#7631FF"
                  v-model="newDocument.title"
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
            outlined color="#7631FF"
            width="140" height="40"
            @click="newDialog=false"
          >
            cancel
          </v-btn>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#7631FF" dark
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
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      delete_dialog: false,
      newDialog: false,
      dialogStatus: 'add',
      headers: [
        {text: 'Type', align: 'start', sortable: false, value: 'extension'},
        {text: 'Document name', sortable: false, value: 'title'},
        {text: 'Uploader', sortable: false, value: 'createdBy'},
        {text: 'Date', sortable: false, value: 'createdAt'},
        {text: 'Actions', sortable: false, align: 'center', value: 'actions'},
      ],
      type_enums: ['DOC', 'PHOTO'],
      fileType: '',
      newDocument: {
        file: null,
        title: '',
        modelId: ''
      },
      currentId: ''
    }
  },
  computed: {
    ...mapGetters({
      documentsList: "documents/documentsList",
      newModelId: "models/newModelId"
    })
  },
  methods: {
    ...mapActions({
      getDocuments: "documents/getDocuments",
      createDocument: "documents/createDocument",
      deleteDocument: "documents/deleteDocument"
    }),
    editDocument() {},
    deleteDoc(item) {
      this.currentId = item.id;
      this.delete_dialog = true;
    },
    async deleteDocumentRow() {
      await this.deleteDocument(this.currentId);
      this.delete_dialog = false;
    },
    async addDocument() {
      const valid = this.$refs.new_validate.validate();
      if(valid) {
        const id = this.$route.params.id;
        if (id === 'add-model') {
          this.newDocument.modelId = this.newModelId
          await this.createDocument(this.newDocument)
          this.$refs.new_validate.reset();
        } else {
          this.newDocument.modelId = id
          await this.createDocument(this.newDocument);
          this.$refs.new_validate.reset();
        }
        this.newDialog = false
      }
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id !== 'add-model') {
      await this.getDocuments({modelId: id, fileType: 'DOC'});
      this.dialogStatus = 'Edit'
    } else this.dialogStatus = 'Add'
  }
}
</script>

<style lang="scss" scoped>

</style>
