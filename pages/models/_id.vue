<template>
  <div>
    <Breadcrumbs :maps="map_links" />
    <v-card elevation="0">
      <v-card-title>
        <div>
          {{ $t("listsModels.child.models") }}
          <v-chip color="#10BF41" dark class="font-weight-bold ml-5">{{
            modelStatus
          }}</v-chip>
        </div>
        <v-spacer />
        <div class="d-flex align-center">
          <v-combobox
            v-model="modelTemplate"
            :items="modelTemplatesList"
            item-text="templateName"
            item-value="templateId"
            outlined
            hide-details
            class="rounded-lg filter"
            :return-object="true"
            color="#544B99"
            dense
            :placeholder="$t('listsModels.child.entermodelComposition')"
            append-icon="mdi-chevron-down"
            validate-on-blur
          >
            <template #append>
              <v-icon color="#544B99">mdi-magnify</v-icon>
            </template>
          </v-combobox>
          <v-btn
            outlined
            elevation="0"
            color="#544B99"
            class="text-capitalize rounded-lg ml-4 font-weight-bold"
            height="40"
            @click="redirectPrefinance"
          >
            {{ $t("sidebar.calculations") }}
          </v-btn>
        </div>
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-4">
        <v-row>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("listsModels.child.modelNumber") }}</div>
            <v-text-field
              v-model="model.number"
              outlined
              hide-details
              :class="`rounded-lg  mb-4 ${model.number===templateItem?.modelNumber?'border-required':'base'}`"
              height="44"
              dense
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.enterModelNumber')"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("listsModels.child.modelName") }}</div>
            <v-text-field
              v-model="model.name"
              outlined
              hide-details
              :class="`rounded-lg base mb-4 ${model.name===templateItem?.modelName?'border-optional':''}`"
              height="44"
              dense
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.modelName')"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("listsModels.child.modelGroup") }}</div>

            <v-combobox
              v-model="model.groupId"
              :items="modelGroupList"
              :search-input.sync="groupSearch"
              item-text="name"
              item-value="id"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              :return-object="true"
              color="#544B99"
              dense
              :placeholder="$t('listsModels.child.selectModelGroup')"
              append-icon="mdi-chevron-down"
              :rules="[formRules.required]"
              validate-on-blur
            >
              <template #append>
                <v-icon color="#544B99">mdi-magnify</v-icon>
              </template>
            </v-combobox>
            <!-- <CustomCombobox :items="canvasTypeList || []" itemText="name" placeholder="Select model group"  v-model="selectedValue"/> -->
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("listsModels.child.partner") }}</div>

            <v-combobox
              v-model="model.partnerId"
              :items="partner_enums"
              :search-input.sync="partnerName"
              item-text="name"
              item-value="id"
              outlined
              hide-details
              height="44"
              :class="`rounded-lg base ${model.partnerId.id&&model.partnerId.id===templateItem?.partnerId?'border-optional':''}`"
              :return-object="true"
              color="#544B99"
              dense
              :placeholder="$t('modelBox.dialog.enterPartnerName')"
              append-icon="mdi-chevron-down"
              :rules="[formRules.required]"
              validate-on-blur
            >
              <template #append>
                <v-icon color="#544B99">mdi-magnify</v-icon>
              </template>
            </v-combobox>
          </v-col>
        </v-row>
        <v-row :class="showObject">
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("modelBox.dialog.brandName") }}</div>
            <v-select
              v-model="model.brandName"
              :items="brandList"
              outlined
              hide-details
              :class="`rounded-lg base ${model.brandName&&model.brandName===templateItem?.brandName?'border-optional':''}`"
              height="44"
              dense
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              :placeholder="$t('modelBox.dialog.selectBrandName')"
              color="#544B99"
            />
          </v-col>
          <v-col>
            <div class="label">{{ $t("modelBox.dialog.partnerContract") }}</div>
            <v-select
              v-model="model.partnerContractId"
              :items="partnerContractList"
              item-text="contractNumber"
              item-value="partnerContractId"
              outlined
              hide-details
              :class="`rounded-lg base mb-4 ${model.partnerContractId&&model.partnerContractId===templateItem?.partnerContractId?'border-optional':''}`"
              height="44"
              dense
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              :placeholder="$t('modelBox.dialog.selectPartnerContract')"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("modelBox.dialog.fabricName") }}</div>
            <v-combobox
              v-model="model.canvasTypeId"
              :items="canvasTypeList"
              :search-input.sync="canvasSearch"
              item-text="name"
              item-value="id"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              :return-object="true"
              color="#544B99"
              dense
              :placeholder="$t('modelBox.dialog.enterCanvasType')"
              append-icon="mdi-chevron-down"
              :rules="[formRules.required]"
              validate-on-blur
            >
              <template #append>
                <v-icon color="#544B99">mdi-magnify</v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("modelBox.dialog.composition") }}</div>
            <v-combobox
              v-model="model.compositionId"
              :items="compositionList"
              :search-input.sync="compositionSearch"
              item-text="name"
              item-value="id"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              :return-object="true"
              color="#544B99"
              dense
              :placeholder="$t('listsModels.child.entermodelComposition')"
              append-icon="mdi-chevron-down"
              :rules="[formRules.required]"
              validate-on-blur
            >
              <template #append>
                <v-icon color="#544B99">mdi-magnify</v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">
              {{ $t("modelBox.dialog.mainFabricDensity") }} (gr/m2)
            </div>
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
            />
          </v-col>

          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("sidebar.fabricRework") }}</div>
            <v-select
              v-model="model.fabricReworkId"
              outlined
              hide-details
              class="rounded-lg base mb-4"
              height="44"
              dense
              :items="reworkThinList"
              item-text="name"
              item-value="id"
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              :placeholder="$t('sidebar.fabricRework')"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("listsModels.child.season") }}</div>
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
              :placeholder="$t('listsModels.child.selectSeason')"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("listsModels.child.gender") }}</div>
            <v-select
              v-model="model.gender"
              outlined
              hide-details
              class="rounded-lg base mb-4"
              height="44"
              dense
              :items="gander_enums"
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.selectGender')"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("modelBox.table.inspectionDate") }}</div>
            <div style="height: 44px !important">
              <el-date-picker
                v-model="model.inspectionDate"
                :picker-options="pickerShortcuts"
                :class="`rounded-lg base_picker ${model.inspectionDate&&model.inspectionDate===templateItem?.inspectionTime?'border-optional':''}`"
                placeholder="dd.MM.yyyy"
                style="width: 100%; height: 100%"
                type="date"
                value-format="timestamp"
              >
              </el-date-picker>
            </div>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">
              {{ $t("modelBox.dialog.plannedOrderQuality") }}
            </div>
            <v-text-field
              v-model="model.orderedQuantity"
              outlined
              :class="`rounded-lg base ${model.orderedQuantity&&model.orderedQuantity===templateItem?.orderedQuantity?'border-optional':''}`"
              hide-details
              height="44"
              color="#544B99"
              dense
              :placeholder="$t('modelBox.dialog.enterPlannedOrderQuality')"
              append-icon=""
            />
          </v-col>
          <v-col cols="12" lg="6" md="6" sm="6">
            <div class="label">{{ $t("listsModels.child.description") }}</div>
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
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("listsModels.child.creator") }}</div>
            <v-text-field
              v-model="model.creator"
              outlined
              hide-details
              class="rounded-lg base mb-4"
              height="44"
              dense
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.enterCreator')"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">
              {{ $t("listsModels.child.modifiedPerson") }}
            </div>
            <v-text-field
              v-model="model.modifiedPerson"
              outlined
              hide-details
              class="rounded-lg base mb-4"
              height="44"
              dense
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.enterModifiedPerson')"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("listsModels.child.createdTime") }}</div>
            <v-text-field
              v-model="model.createdTime"
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
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t("listsModels.child.updatedTime") }}</div>
            <v-text-field
              v-model="model.updateTime"
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
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" class="d-flex justify-end align-center">
            <v-spacer />
            <v-btn
              color="#544B99"
              class="text-capitalize rounded-lg mr-4"
              height="44"
              outlined
              @click="templateDialog=true"
              >
              {{ $t("accessoryPlanning.saveAsTemplate") }}
            </v-btn>
            <FinishProcessBtn v-bind="finishDate" />
            <v-btn
              v-if="modelStatus === 'Add'"
              color="#544B99"
              class="text-capitalize rounded-lg"
              width="130"
              height="44"
              dark
              @click="createNewModel"
              >{{ $t("listsModels.child.save") }}
            </v-btn>
            <v-btn
              v-else
              color="#544B99"
              class="text-capitalize rounded-lg"
              width="130"
              height="44"
              dark
              @click="updateModels"
              >{{ $t("update") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-6 pr-4 d-flex justify-center">
        <ShowBtnComponent :click-btn="clickBtn" :show_btn_value="show_btn" />
      </v-card-actions>
    </v-card>
    <v-card class="mt-6" flat>
      <v-tabs v-model="tab">
        <v-tabs-slider color="#544B99" />
        <v-tab
          class="text-capitalize"
          v-for="item in items"
          :key="item"
          active-class="active-tab"
        >
          {{ item }}
        </v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <ModelPartsComponent />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <SizeChartComponent />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <PrintingComponent />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <DocumentsComponent />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <ModelPhotoComponent />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <InstructionComponent />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <InspectionComponent />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
    <v-dialog v-model="templateDialog" max-width="500">
      <v-card class="pa-4 text-center">
        <v-card-title class="d-flex justify-center"
          >{{ $t("accessoryPlanning.saveAsTemplate") }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" >
              <div class="label">Template name</div>
              <v-text-field
                v-model="model.templateName"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                style="max-width: 400px"
                placeholder="Enter template name"
                color="#544B99"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="templateDialog = false"
          >
            {{$t('localization.dialog.cancel')}}
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#544B99"
            width="140"
            elevation="0"
            dark
            @click="saveTemplate"
          >
              Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import ModelPartsComponent from "../../components/ModelParts.vue";
import SizeChartComponent from "../../components/SizeChart.vue";
import PrintingComponent from "../../components/Printing.vue";
import DocumentsComponent from "../../components/Documents.vue";
import SamplesComponent from "../../components/Samples.vue";
import ModelPhotoComponent from "../../components/ModelPhoto.vue";
import InstructionComponent from "../../components/Instruction.vue";
import InspectionComponent from "@/components/InspectionFile.vue";
import composition from "@/components/FabricCatalogs/Composition.vue";
import ShowBtnComponent from "../../components/ShowComponentBtn/ShowBtn.vue";
import FinishProcessBtn from "@/components/FinishProcessBtn.vue";
import CustomCombobox from "../../components/UI/CustomCombobox.vue";
import { computed } from "vue";

export default {
  name: "addOrEditModelsPage",
  components: {
    ShowBtnComponent,
    InstructionComponent,
    ModelPhotoComponent,
    SamplesComponent,
    DocumentsComponent,
    PrintingComponent,
    SizeChartComponent,
    ModelPartsComponent,
    Breadcrumbs,
    InspectionComponent,
    FinishProcessBtn,
    CustomCombobox,
  },
  data() {
    return {
      templateDialog:false,
      modelTemplate: null,
      compositionSearch: "",
      show_btn: true,
      partnerName: "",
      canvasSearch: "",
      items: [
        this.$t("listsModels.child.modelParts"),
        this.$t("listsModels.child.sizeChart"),
        this.$t("listsModels.child.printing"),
        this.$t("listsModels.child.documents"),
        this.$t("listsModels.child.modelPhoto"),
        this.$t("listsModels.child.instruction"),
      ],
      tab: null,
      modelStatus: "Add",
      fields_status: true,
      map_links: [
        {
          text: this.$t("listsModels.child.home"),
          disabled: false,
          to: this.localePath("/"),
          icon: true,
        },
        {
          text: this.$t("listsModels.child.models"),
          disabled: false,
          to: this.localePath("/models"),
          icon: true,
        },
        {
          text: this.$t("listsModels.child.addModels"),
          disabled: true,
          to: this.localePath("/models/7"),
          icon: false,
        },
      ],
      fabricRework: ["Solid", "AOP"],
      model: {
        number: "",
        partnerId: "",
        name: "",
        group: "",
        compositionId: "",
        season: "",
        brandName: "",
        gender: "",
        description: "",
        inspectionDate: null,
        creator: "",
        modifiedPerson: "",
        createdTime: null,
        updateTime: null,
      },
      season_enums: [
        { key: "SS", text: " Spring/Summer" },
        { key: "AW", text: "Autumn/Winter" },
      ],
      licence_enums: [
        { key: true, text: "Yes" },
        { key: false, text: "No" },
      ],
      gander_enums: ["MALE", "FEMALE", "BOY", "GIRL", "UNISEX"],
      groupSearch: "",
      selectedValue:"",
      templateItem:{}
    };
  },
  created() {
    this.getPartnersWithTypes(["buyer"]);
    this.getCompositionList({ page: 0, size: 10 });
    this.filterCanvasTypeList({
      id: "",
      name: "",
      createdAt: "",
      updatedAt: "",
    });
    this.getReworkThinList();
  },
  computed: {
    finishDate: {
      get() {
        return {
          modelId: !!this.oneModel.id ? this.oneModel.id : 0,
          propertyName: "MODEL_CREATING",
        };
      },
    },
    showObject() {
      return {
        show_active: this.show_btn,
      };
    },
    ...mapGetters({
      oneModel: "models/oneModel",
      modelGroups: "models/modelGroups",
      partner_enums: "partners/partnerWithTypes",
      compositionList: "composition/composition_list",
      brandList: "models/brandList",
      canvasTypeList: "canvasType/canvas_type_list",
      reworkThinList: "fabricRework/reworkThinList",
      partnerContractList: "partners/partnerContractList",
      modelGroupList: "model/modelGroupList",
      modelTemplatesList: "models/modelTemplatesList",
      modelTemplateItem: "models/modelTemplateItem",
    }),
  },
  watch: {

    selectedValue(item){
      console.log(item);

    },
    modelTemplate(val) {
      this.getModelTemplateWithId(val.templateId);
    },
    modelTemplateItem(item) {
      this.templateItem=JSON.parse(JSON.stringify(item))
      const val=JSON.parse(JSON.stringify(item))
      const model = this.model;
      model.number = val.modelNumber;
      model.name = val.modelName;
      model.groupId = { id: val.modelCategoryId, name: val.modelCategory };
      model.compositionId =val.modelCompositionId ? { id: val.modelCompositionId, name: val.modelComposition }:null;
      model.season = val.season;
      model.licence = val.isLicenseRequired;
      model.gender = val.gender;
      model.description = val.description;
      model.partnerId = { id: val.partnerId, name: val.partner };
      model.brandName = val.brandName;
      model.fabricReworkId = val.fabricReworkId;
      model.mainFabricDensity = val.mainFabricDensity;
      model.canvasTypeId = { id: val.canvasTypeId, name: val.canvasType };
      model.inspectionDate = val.inspectionTime;
      model.orderedQuantity = val.orderedQuantity;
      model.partnerContractId = val.partnerContractId;
    },
    compositionSearch(val) {
      this.getCompositionList({ page: 0, size: 10, composition: val });
    },
    partnerName(val) {
      // this.getPartnerList({ page: 0, size: 10, partnerName: val });
    },
    canvasSearch(val) {
      this.filterCanvasTypeList({
        id: "",
        name: val,
        createdAt: "",
        updatedAt: "",
      });
    },
    groupSearch(val) {
      this.getModelGroupList({ page: 0, size: 10, modelGroupName: val });
    },
    oneModel(val) {
      const model = this.model;
      model.id = val.id;
      model.number = val.modelNumber;
      model.name = val.name;
      model.groupId = { id: val.modelCategoryId, name: val.modelCategory };
      model.compositionId = { id: val.compositionId, name: val.composition };
      model.season = val.season;
      model.licence = val.licenceRequired;
      model.gender = val.gender;
      model.description = val.description;
      model.creator = val.createdBy;
      model.modifiedPerson = val.updatedBy;
      model.partnerId = { id: val.partnerId, name: val.partner };
      model.createdTime = val.createdAt;
      model.updateTime = val.updatedAt;
      model.brandName = val.brandName;
      model.fabricReworkId = val.fabricReworkId;
      model.mainFabricDensity = val.mainFabricDensity;
      model.canvasTypeId = { id: val.canvasTypeId, name: val.canvasType };
      model.inspectionDate = val.inspectionDate;
      model.orderedQuantity = val.orderedQuantity;
      model.partnerContractId = val.partnerContractId;
    },
    "model.partnerId"(val) {
      if (!!val) {
        this.getBrandList(val?.id);
        this.getPartnerContractList(val?.id);
      }
    },
  },
  methods: {
    ...mapActions({
      getOneModel: "models/getOneModel",
      createModel: "models/createModel",
      updateModel: "models/updateModel",
      getCompositionList: "composition/getCompositionList",
      getBrandList: "models/getBrandList",
      modelToPrefinance: "preFinance/modelToPrefinance",
      getPartnersWithTypes: "partners/getPartnersWithTypes",
      filterCanvasTypeList: "canvasType/filterCanvasTypeList",
      getReworkThinList: "fabricRework/getReworkThinList",
      changePageStatus: "changePageStatus",
      getPartnerContractList: "partners/getPartnerContractList",
      getModelGroupList: "model/getModelGroupList",
      getModelTemplates: "models/getModelTemplates",
      getModelTemplateWithId: "models/getModelTemplateWithId",
      createModelTemplate: "models/createModelTemplate",
    }),
    saveTemplate(){
      const data = { ...this.model };
      data.modelNumber=data.number
      data.partnerId = this.model.partnerId?.id;
      data.modelCategoryId = this.model.groupId?.id;
      data.compositionId = this.model.compositionId?.id;
      data.canvasTypeId = this.model.canvasTypeId?.id;
      data.modelOperationId=1
      data.licenseRequired=data.licence
      delete data.number
      this.createModelTemplate(data)

      this.templateDialog=false
      this.model.templateName=""
    },
    clickBtn() {
      this.show_btn = !this.show_btn;
    },
    redirectPrefinance() {
      this.modelToPrefinance(this.$route.params.id);
    },
    async createNewModel() {
      const data = { ...this.model };
      data.partnerId = this.model.partnerId?.id;
      data.groupId = this.model.groupId?.id;
      data.compositionId = this.model.compositionId?.id;
      data.canvasTypeId = this.model.canvasTypeId?.id;
      data.modelOperationId=1
      await this.createModel(data);
    },
    async updateModels() {
      const id = this.$route.params.id;
      const data = { ...this.model };
      data.partnerId = this.model.partnerId?.id;
      data.groupId = this.model.groupId?.id;
      data.compositionId = this.model.compositionId?.id;
      data.canvasTypeId = this.model.canvasTypeId?.id;

      await this.updateModel({
        data,
        id: +id,
      });
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id !== "add-model") {
      await this.getOneModel(id);
      this.modelStatus = "Edit";
    } else this.modelStatus = "Add";
    this.getModelGroupList({ page: 0, size: 10 });
    this.getModelTemplates();
  },
};
</script>

<style lang="scss" scoped>
.active-tab {
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #544b99;
}

.el-date-editor--datetime {
  width: 100%;
}
.show_active {
  height: 0;
  overflow: hidden;
}
</style>
