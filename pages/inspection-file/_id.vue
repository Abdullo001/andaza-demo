<template>
  <div>
    <v-card elevation="0">
      <v-card-title>
        <div>{{ $t('forms.index.cards.inspectionFiles') }} </div>
        <v-spacer />
      </v-card-title>
      <v-card-text>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{$t('listsModels.child.modelNumber')}}</div>
            <v-combobox
              :disabled="this.$route.params.id!=='add-inspection'"
              v-model="modelNumber"
              :items="modelsList"
              :return-object="true"
              :search-input.sync="modelNumSearch"
              class="rounded-lg base d-flex align-center justify-center mb-4"
              color="#544B99"
              dense
              height="44"
              hide-details
              item-text="modelNumber"
              item-value="id"
              outlined
               :placeholder="$t('listsModels.child.enterModelNumber')"
              prepend-icon=""
              @change="e=>modelChange(e)"
            >
              <template #append>
                <v-icon class="d-inline-block" color="#544B99">
                  mdi-magnify
                </v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("listsModels.child.modelName") }}</div>
            <v-text-field
              v-model="model.name"
              outlined
              hide-details
              class="rounded-lg base mb-4"
              height="44"
              dense
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.modelName')"
              color="#544B99"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("listsModels.child.modelGroup") }}</div>
            <v-text-field
              v-model="model.modelGroup"
              outlined
              hide-details
              class="rounded-lg base mb-4"
              height="44"
              dense
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.selectModelGroup')"
              color="#544B99"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("listsModels.child.partner") }}</div>
            <v-text-field
              v-model="model.partner"
              outlined
              hide-details
              class="rounded-lg base mb-4"
              height="44"
              dense
              style="max-width: 400px"
              :placeholder="$t('inspectionBox.clientName')"
              color="#544B99"
              disabled
            />
          </v-col>
          </v-row>
          <v-row :class="showObject">
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t("modelBox.dialog.brandName") }}</div>
              <v-text-field
                v-model="model.brandName"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                style="max-width: 400px"
                :placeholder="$t('modelBox.dialog.selectBrandName')"
                color="#544B99"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t("modelBox.dialog.fabricName") }}</div>

              <v-text-field
                v-model="model.canvasType"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                style="max-width: 400px"
                :placeholder="$t('modelBox.dialog.enterCanvasType')"
                color="#544B99"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t("modelBox.dialog.composition") }}</div>
              <v-text-field
                v-model="model.composition"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                style="max-width: 400px"
                :placeholder="$t('listsModels.child.entermodelComposition')"
                color="#544B99"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t("modelBox.dialog.mainFabricDensity") }} (gr/m2)</div>
              <v-text-field
                v-model="model.mainFabricDensity"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                style="max-width: 400px"
                :placeholder="$t('modelBox.dialog.density')"
                color="#544B99"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t("sidebar.fabricRework") }}</div>
              <v-text-field
                v-model="model.rework"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                style="max-width: 400px"
               :placeholder="$t('sidebar.fabricRework')"
                color="#544B99"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('listsModels.child.season')}}</div>
              <v-select
                v-model="model.season"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                :items="season_enums"
                item-value="key"
                item-text="text"
                append-icon="mdi-chevron-down"
                style="max-width: 400px"
                :placeholder="$t('listsModels.child.season')"
                color="#544B99"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('listsModels.child.gender')}}</div>
              <v-text-field
                v-model="model.gender"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                style="max-width: 400px"
               :placeholder="$t('listsModels.child.selectGender')"
                color="#544B99"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('inspectionBox.plannedInspectionDate') }}</div>
              <v-text-field
                v-model="model.inspectionDate"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                style="max-width: 400px"
                :placeholder="$t('inspectionBox.inspectionDate')"
                color="#544B99"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('listsModels.child.creator')}}</div>
              <v-text-field
                v-model="model.createdBy"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44" dense
                style="max-width: 400px"
                :placeholder="$t('listsModels.child.enterCreator')"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('listsModels.child.modifiedPerson')}}</div>
              <v-text-field
                v-model="model.updatedBy"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44" dense
                style="max-width: 400px"
                :placeholder="$t('listsModels.child.enterModifiedPerson')"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('listsModels.child.createdTime')}}</div>
              <v-text-field
                v-model="model.createdAt"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                color="#544B99"
                dense
                placeholder="dd.MM.yyyy HH:mm:ss"
                disabled
              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('listsModels.child.updatedTime')}}</div>
              <v-text-field
                v-model="model.updatedAt"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                color="#544B99"
                dense
                placeholder="dd.MM.yyyy HH:mm:ss"
                disabled
              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6">
              <div class="label">{{$t('listsModels.child.description')}}</div>
              <v-textarea
                v-model="model.description"
                outlined
                auto-grow
                rows="1"
                hide-details
                class="rounded-lg base"
                dense
               :placeholder="$t('listsModels.child.enterDescription')"
                color="#544B99"
                disabled
              />
            </v-col>
          </v-row>

          <div class="d-flex justify-end">
            <FinishProcessBtn v-bind="finishDate"/>

          </div>
          
      </v-card-text>
    </v-card>

    <InspectionFile class="mt-8"/>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import InspectionFile from "@/components/InspectionFile.vue";
import FinishProcessBtn from "@/components/FinishProcessBtn.vue";

export default {
  components: {
    InspectionFile,
    FinishProcessBtn
  },
  data() {
    return {
      season_enums: [
        {key: 'SS', text: ' Spring/Summer'},
        {key: 'AW', text: 'Autumn/Winter'}
      ],
      newDialog: false,
      modelNumSearch: "",
      modelNumber: "",
      model: {},
      show_btn: true,

      items: [],
      headers: [
        { text: this.$t('modelBox.printingBox.simpleSendDate'), sortable: false, value: "sendDate" },
        { text: "Title of document", sortable: false, value: "title" },
        { text: this.$t('listsModels.child.description'), sortable: false, value: "description" },
        { text: this.$t('partners.table.status'), sortable: false, value: "status" },
        { text: this.$t("catalogGroups.tabs.table.createdAt"),sortable: false, value: "createdAt" },
        { text: this.$t("catalogGroups.tabs.table.actions"), sortable: false, align: "center", value: "actions" },
      ],
      newInspectionFile: {
        file: null,
        title: "",
        description: "",
        modelId: "",
      },
    };
  },

  created() {
    this.getModelsList({
      page: 0,
      size: 10,
      modelNumber: this.modelNumSearch,
      partner: "",
      status: "ACTIVE",
    });
  },

  computed: {
    finishDate:{
      get(){
        return{
          modelId:!!this.oneModel.id?this.oneModel.id:0,
          propertyName:"FINAL_INSPECTION",
        }
      }
    },
    ...mapGetters({
      modelsList: "models/modelsList",
      oneModel: "models/oneModel",
      inspectionFileList: "inspectionFile/inspectionFileList",
    }),

    showObject() {
      return {
        show_active: this.show_btn,
      };
    },
  },

  watch: {
    oneModel(val){
      this.model={...val}
      this.modelNumber={id:val.id,modelNumber:val.modelNumber}
      this.model.inspectionDate=this.formatLong(val.inspectionDate)
    },
    inspectionFileList(val) {
      this.items = [];
      this.items.push({ ...val });
    },
    modelNumSearch(val) {
      if (!!val) {
        this.getModelsList({
          page: 0,
          size: 10,
          modelNumber: val,
          partner: "",
          status: "ACTIVE",
        });
      }
    },
  },

  methods: {
    ...mapActions({
      getModelsList: "models/getModelsList",
      getInspectionFileList: "inspectionFile/getInspectionFileList",
      getOneModel: "models/getOneModel",
    }),
    modelChange(e){
      if(e!==null){
        this.model={...e}
        this.$store.commit("inspectionFile/setModel",e)
      }
    },
    openDialog() {
      this.newDialog = true;
      this.newInspectionFile.title = "";
      this.newInspectionFile.description = "";
      this.newInspectionFile.modelId = "";
      this.newInspectionFile.id = "";
      this.newInspectionFile.sendDate = "";
      this.newInspectionFile.status = "";
    },
    searchInspection() {
      this.getInspectionFileList(this.modelNumber.id);
    },
  },
  mounted(){
    const id = this.$route.params.id
    if(id!=="add-inspection"){
      this.getOneModel(id)
    }
  }
};
</script>
<style lang=""></style>
