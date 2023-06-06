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
              <div class="label">Part name</div>
              <v-select
                v-model="newModelParts.bodyPartId"
                :items="partNames"
                item-text="partName"
                item-value="id"
                placeholder="Enter part name"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                color="#7631FF"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <div class="label">Yarn numbers</div>
              <v-select
                v-model="newModelParts.yarnNumberId"
                :items="yarnNumbersList"
                item-text="yarns"
                item-value="id"
                placeholder="Enter yarn numbers"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"  dense
                color="#7631FF"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <div class="label">Canvas type</div>
              <v-select
                v-model="newModelParts.canvasTypeId"
                :items="canvasTypeList"
                item-text="name"
                item-value="id"
                placeholder="Enter canvas type"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"  dense
                color="#7631FF"
                append-icon="mdi-chevron-down"
              />
            </v-col>

            <v-col cols="12" lg="6">
              <div class="label">Composition</div>
              <v-select
                v-model="newModelParts.compositionId"
                :items="compositionList"
                item-text="name"
                item-value="id"
                placeholder="Enter composition"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"  dense
                color="#7631FF"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <div class="label">Density</div>
              <v-text-field
                v-model="newModelParts.density"
                placeholder="0.00"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                color="#7631FF"
                suffix="gr/m2"
              />
            </v-col>
            <v-col cols="12" lg="12">
              <div class="label">Description</div>
              <v-textarea
                placeholder="Enter description"
                v-model="newModelParts.description"
                outlined
                hide-details
                class="rounded-lg base"
                dense
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
        {text: 'Yarn number', sortable: false, value: 'yarnNumber'},
        {text: 'Canvas type', sortable: false, value: 'canvasType'},
        {text: 'Composition', sortable: false, value: 'composition'},
        {text: 'Comment', sortable: false, value: 'description', width: 500},
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
    } else {
      this.$store.commit('modelParts/setModelPartsList', [])
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
