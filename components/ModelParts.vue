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
           {{ $t("modelBox.modelPartsBox.modelParts") }}
            <v-spacer/>
            <div class="d-flex">
              <VuetifyCombobox v-model="cloningTemplate" class="mr-4" :itemsList="modelPartsTemplates" :itemText="'templateName'" :itemValue="'templateName'" :placeholder="'Select template'"/>
              <v-btn
              class="rounded-lg text-capitalize"
              color="#544B99"
              width="160" height="36"
              @click="newDialog"
              dark
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t("modelBox.modelPartsBox.addPart") }}
            </v-btn>
            </div>
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
    <div class="d-flex justify-end mt-4">
      <SaveClonComponent @saveTemplate="saveFabricTemlate"/>
    </div>
    <v-dialog v-model="partsDialog" max-width="900">
      <v-card>
        <v-card-title>
          <div class="title">{{ dialogTitle }} model parts</div>
          <v-spacer/>
          <v-btn icon color="#544B99" @click="partsDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="12" lg="6">
              <div class="label"> {{ $t("modelBox.modelPartsBox.partName") }}</div>
                <v-combobox
                  v-model="newModelParts.bodyPartId"
                  :items="partNames"
                  :search-input.sync="partSearch"
                  item-text="partName"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base d-flex align-center justify-center"
                  :return-object="true"
                  color="#544B99"
                  dense
                  :placeholder="$t('modelBox.modelPartsBox.enterPartName')"
                  prepend-icon=""
                >
                  <template #append>
                    <v-icon class="d-inline-block" color="#544B99">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
            </v-col>
            <v-col cols="12" lg="6">
              <div class="label"> {{ $t("modelBox.modelPartsBox.yarnNumber") }}</div>
              <v-combobox
                  v-model="newModelParts.yarnNumberId"
                  :items="yarnNumbersList"
                  :search-input.sync="yarnSearch"
                  item-text="yarns"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base d-flex align-center justify-center"
                  :return-object="true"
                  color="#544B99"
                  dense
                  :placeholder="$t('modelBox.modelPartsBox.enterYarnNumber')"
                  prepend-icon=""
                >
                  <template #append>
                    <v-icon class="d-inline-block" color="#544B99">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
            </v-col>
            <v-col cols="12" lg="6">
              <div class="label">{{ $t("modelBox.modelPartsBox.canvasType") }}</div>
              <v-combobox
                v-model="newModelParts.canvasTypeId"
                :items="canvasTypeList"
                :search-input.sync="canvasSearch"
                item-text="name"
                item-value="id"
                outlined
                hide-details
                height="44"
                class="rounded-lg base d-flex align-center justify-center"
                :return-object="true"
                color="#544B99"
                dense
                :placeholder="$t('modelBox.modelPartsBox.enterCanvasType')"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>

            <v-col cols="12" lg="6">
              <div class="label">{{ $t("modelBox.dialog.composition") }}</div>
              <v-combobox
                v-model="newModelParts.compositionId"
                :items="compositionList"
                :search-input.sync="compositionSearch"
                item-text="name"
                item-value="id"
                outlined
                hide-details
                height="44"
                class="rounded-lg base d-flex align-center justify-center"
                :return-object="true"
                color="#544B99"
                dense
                :placeholder="$t('modelBox.modelPartsBox.enterComposition')"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" lg="6">
              <div class="label">{{ $t("modelBox.dialog.density") }}</div>
              <v-text-field
                v-model="newModelParts.density"
                placeholder="0.00"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                color="#544B99"
                suffix="gr/m2"
              />
            </v-col>
            <v-col cols="12" lg="12">
              <div class="label">{{ $t("catalogGroups.composition.dialogs.description") }}</div>
              <v-textarea
                 :placeholder="$t('modelBox.modelPartsBox.enterDescription')"
                v-model="newModelParts.description"
                outlined
                hide-details
                class="rounded-lg base"
                dense
                color="#544B99"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-spacer/>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg border"
            outlined color="#544B99"
            width="140" height="40"
            @click="partsDialog=false"
          >
              {{ $t("userManagement.dialog.cancel") }}
          </v-btn>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#544B99" dark
            width="140" height="40"
            @click="saveModelParts"
            v-if="dialogTitle === 'Add'"
          >
            {{ $t("userManagement.dialog.add") }}
          </v-btn>
          <v-btn
            v-else
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#544B99" dark
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
import VuetifyCombobox from "@/components/UI/VuetifyCombobox.vue";
import SaveClonComponent from "@/components/ClonningComponents/SaveClonComponent.vue";

export default {
  name: 'ModelPartsComponent',
  components:{
    VuetifyCombobox,
    SaveClonComponent,
  },
  data() {
    return {
      cloningTemplate:null,
      headers: [
        {text: this.$t('modelBox.modelPartsBox.partName'), align: 'start', sortable: false, value: 'bodyPart'},
        {text: this.$t('modelBox.modelPartsBox.yarnNumber'), sortable: false, value: 'yarnNumber'},
        {text:  this.$t('modelBox.modelPartsBox.canvasType'), sortable: false, value: 'canvasType'},
        {text: this.$t('sidebar.composition'), sortable: false, value: 'composition'},
        {text:  this.$t('modelBox.modelPartsBox.comment'), sortable: false, value: 'description', width: 500},
        {text:  this.$t('modelBox.modelPartsBox.creator'), sortable: false, value: 'createdBy'},
        {text:  this.$t("catalogGroups.tabs.table.createdAt"), sortable: false, value: 'createdAt'},
        {text:  this.$t("catalogGroups.tabs.table.actions"), sortable: false, align: 'center', value: 'actions'},
      ],
      partsDialog: false,
      partSearch:"",
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
      selectedPartsId: null,
      yarnSearch:"",
      canvasSearch:"",
      compositionSearch:"",
    }
  },
  created() {
    this.getPartName("");
    this.getYarnNumbers({page:0,size:10});
    this.getCanvasType({page:0,size:10});
    this.getYarnType();
    this.getComposition({page:0,size:10});
  },
  computed: {
    ...mapGetters({
      partNames: 'modelParts/partName',
      newModelId: 'models/newModelId',
      modelPartsList: "modelParts/modelPartsList",
      yarnNumbersList: "yarnNumber/yarn_number_list",
      canvasTypeList: "canvasType/canvas_type_list",
      yarnTypeList: "modelParts/yarnType",
      compositionList: "composition/composition_list",
      oneModelParts: "modelParts/oneModelParts",
      modelPartsTemplates: "modelParts/modelPartsTemplates",
    }),
  },
  watch: {
    cloningTemplate(val){
      const data={
        modelId:this.$route.params.id!=='add-model'?this.$route.params.id:this.newModelId,
        templateName:val.templateName
      }
      this.setModelPartsTemplate(data)
    },
    yarnSearch(val){
      this.getYarnNumbers({page:0,size:10,name:val})
    },
    canvasSearch(val){
      this.getCanvasType({page:0,size:10,name:val})
    },
    compositionSearch(val){
      this.getComposition({page:0,size:10,name:val});
    },
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
      this.partSearch=val.bodyPart
      this.newModelParts.bodyPartId={partName:val.bodyPart,id:val.bodyPartId}
      this.newModelParts.yarnNumberId={yarns:val.yarnNumber,id:val.yarnNumberId}
      this.newModelParts.canvasTypeId={name:val.canvasType,id:val.canvasTypeId}
      this.newModelParts.compositionId={name:val.composition,id:val.compositionId}
    },
    partSearch(val){
      if(!!val&&val!==null){
        this.getPartName(val)
      }else{
        this.getPartName("")
      }
    }
  },

  methods: {
    ...mapActions({
      getPartName: 'modelParts/getPartName',
      createModelParts: 'modelParts/createModelParts',
      updateModelParts: 'modelParts/updateModelParts',
      deletePartModel: 'modelParts/deletePartModel',
      getModelPart: 'modelParts/getModelPart',
      getYarnNumbers: 'yarnNumber/getYarnNumberList',
      getCanvasType: 'canvasType/getCanvasTypeList',
      getYarnType: 'modelParts/getYarnType',
      getComposition: 'composition/getCompositionList',
      getOneModelParts: 'modelParts/getOneModelParts',
      getModelPartsTemplates: "modelParts/getModelPartsTemplates",
      setModelPartsTemplate: "modelParts/setModelPartsTemplate",
      createModelPartsTemplate: "modelParts/createModelPartsTemplate",
    }),
    saveFabricTemlate(templateName){
      const data={
        templateName,
        modelId:this.$route.params.id!=='add-model'?this.$route.params.id:this.newModelId
      }
      this.createModelPartsTemplate(data)
    },
    async saveModelParts() {
      const id = this.$route.params.id;
      if(id === 'add-model') {
        this.newModelParts.modelId = this.newModelId;
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
    this.getModelPartsTemplates()
    if(id !== 'add-model') {
      await this.getModelPart(id)
    }else {
      await this.$store.commit("modelParts/setModelPartsList", [])
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
