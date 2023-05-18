<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="modelPartsList"
      :items-per-page="50"
      class="elevation-0"
      hide-default-footer
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex">
            <v-spacer/>
            <v-btn
              class="rounded-lg text-capitalize"
              color="#7631FF"
              width="160" height="36"
              @click="newDialog"
              dark
            >
              <v-icon>mdi-plus</v-icon>
              Add parts
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.actions="{item}">
        <div>
          <v-btn icon class="mr-2" @click="editParts(item)">
            <v-img src="/edit-green.svg" max-width="20"/>
          </v-btn>
          <v-btn icon @click="deleteItem(item)">
            <v-img src="/trash-red.svg" max-width="20"/>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-divider/>
    <v-dialog v-model="partsDialog" max-width="900">
      <v-card>
        <v-card-title>
          <div class="title">{{ dialogTitle }} model parts</div>
          <v-spacer/>
          <v-btn icon color="#7631FF" @click="partsDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="12" lg="6">
              <v-select
                v-model="newModelParts.bodyPartId"
                :items="partNames"
                item-text="partName"
                item-value="id"
                label="Part name"
                placeholder="Enter part name"
                filled dense
                color="#7631FF"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <v-select
                v-model="newModelParts.yarnNumberId"
                :items="yarnNumbersList"
                item-text="name"
                item-value="id"
                label="Yarn numbers"
                placeholder="Enter yarn numbers"
                filled dense
                color="#7631FF"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <v-select
                v-model="newModelParts.canvasTypeId"
                :items="canvasTypeList"
                item-text="name"
                item-value="id"
                label="Canvas type"
                placeholder="Enter canvas type"
                filled dense
                color="#7631FF"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <v-select
                v-model="newModelParts.yarnTypeId"
                :items="yarnTypeList"
                item-text="name"
                item-value="id"
                label="Yarn type"
                placeholder="Enter yarn type"
                filled dense
                color="#7631FF"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <v-select
                v-model="newModelParts.compositionId"
                :items="compositionList"
                item-text="name"
                item-value="id"
                label="Composition"
                placeholder="Enter composition"
                filled dense
                color="#7631FF"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <v-text-field
                v-model="newModelParts.density"
                label="Density"
                placeholder="0.00"
                filled dense
                color="#7631FF"
                suffix="gr/m2"
              />
            </v-col>
            <v-col cols="12" lg="6" class="d-flex align-center">
              <div class="body-1 font-weight-medium">Fleece</div>
              <v-spacer/>
              <v-switch
                inset color="#4F46E5"
                v-model="newModelParts.withFleece"
              />
            </v-col>
            <v-col cols="12" lg="6" class="d-flex align-center">
              <div class="body-1 font-weight-medium">Peach effect</div>
              <v-spacer/>
              <v-switch
                inset color="#4F46E5"
                v-model="newModelParts.peachEffectEnabled"
              />
            </v-col>
            <v-col cols="12" lg="12">
              <v-text-field
                label="Description"
                placeholder="Enter description"
                v-model="newModelParts.description"
                filled dense
                color="#7631FF"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-spacer/>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg border"
            outlined color="#7631FF"
            width="140" height="40"
            @click="partsDialog=false"
          >
            cancel
          </v-btn>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#7631FF" dark
            width="140" height="40"
            @click="saveModelParts"
            v-if="dialogTitle === 'Add'"
          >
            add
          </v-btn>
          <v-btn
            v-else
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#7631FF" dark
            width="140" height="40"
            @click="updateParts"
          >
            {{ $t('update') }}
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
        <v-card-title class="d-flex justify-center">Delete model parts row</v-card-title>
        <v-card-text>
          Are you sure you want to Delete model parts row ?
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
            dark @click="deleteModelParts"
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
  name: 'ModelPartsComponent',
  data() {
    return {
      headers: [
        {text: 'Part name', align: 'start', sortable: false, value: 'bodyPart'},
        {text: 'Composition', sortable: false, value: 'composition'},
        {text: 'Comment', sortable: false, value: 'description'},
        {text: 'Creator', sortable: false, value: 'createdBy'},
        {text: 'Created at', sortable: false, value: 'createdAt'},
        {text: 'Actions', sortable: false, align: 'center', value: 'actions'},
      ],
      partsDialog: false,
      newModelParts: {
        bodyPartId: null,
        canvasTypeId: null,
        compositionId: null,
        density: "",
        description: "",
        modelId: null,
        peachEffectEnabled: true,
        withFleece: true,
        yarnNumberId: null,
        yarnTypeId: null

      },
      dialogTitle: '',
      delete_dialog: false,
      selectedPartsId: null
    }
  },
  created() {
    this.getPartName();
    this.getYarnNumbers();
    this.getCanvasType();
    this.getYarnType();
    this.getComposition();
  },
  computed: {
    ...mapGetters({
      partNames: 'modelParts/partName',
      newModelId: 'models/newModelId',
      modelPartsList: "modelParts/modelPartsList",
      yarnNumbersList: "modelParts/yarnNumbersList",
      canvasTypeList: "modelParts/canvasTypeList",
      yarnTypeList: "modelParts/yarnType",
      compositionList: "modelParts/compositionList",
      oneModelParts: "modelParts/oneModelParts"
    }),
  },
  watch: {
    partsDialog(val) {
      if (!val) {
        this.newModelParts = {
          bodyPartId: '',
          partComposition: '',
          description: '',
          createdBy: '',
          createAt: ''
        }
      }
    },
    oneModelParts(val) {
      this.newModelParts = {...val}
    }
  },

  methods: {
    ...mapActions({
      getPartName: 'modelParts/getPartName',
      createModelParts: 'modelParts/createModelParts',
      updateModelParts: 'modelParts/updateModelParts',
      deletePartModel: 'modelParts/deletePartModel',
      getModelPart: 'modelParts/getModelPart',
      getYarnNumbers: 'modelParts/getYarnNumbers',
      getCanvasType: 'modelParts/getCanvasType',
      getYarnType: 'modelParts/getYarnType',
      getComposition: 'modelParts/getComposition',
      getOneModelParts: 'modelParts/getOneModelParts'
    }),
    async saveModelParts() {
      const id = this.$route.params.id;
      if(id === 'add-model') {
        this.newModelParts.modelId = this.newModelId
        await this.createModelParts(this.newModelParts);
        this.partsDialog = false
      } else {
        this.newModelParts.modelId = id
        await this.createModelParts(this.newModelParts);
        this.partsDialog = false
      }
    },
    editParts(item) {
      this.dialogTitle = 'Edit';
      this.getOneModelParts(item.id)
      this.partsDialog = true;
    },
    newDialog() {
      this.partsDialog = true;
      this.dialogTitle = 'Add';
    },
    async updateParts() {
      await this.updateModelParts(this.newModelParts)
      this.partsDialog = false
    },
    deleteItem(item) {
      this.delete_dialog = true;
      this.selectedPartsId = item.id
    },
    async deleteModelParts() {
      const id = this.$route.params.id;
      if(id === 'add-model') {
        await this.deletePartModel({
          partId: this.selectedPartsId,
          modelId: this.newModelId
        });
        this.delete_dialog = false;
      } else {
        await this.deletePartModel({
          partId: this.selectedPartsId,
          modelId: id
        });
        this.delete_dialog = false;
      }
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    if(id !== 'add-model') {
      await this.getModelPart(id)
    }

  }
}
</script>

<style lang="scss">
::v-deep .v-data-table-header {
  background-color: #F4F5FA;
}

::v-deep th {
  color: #000 !important;
}

</style>
