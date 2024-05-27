<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0">
      <v-card-title>
        <div>{{ $t('listsModels.child.models') }}
          <v-chip color="#10BF41" dark class="font-weight-bold ml-5">{{ modelStatus }}</v-chip>
        </div>
        <v-spacer/>
        <div>
          <v-btn
            outlined
            elevation="0"
            color="#544B99"
            class="text-capitalize rounded-lg mr-4 font-weight-bold"
            @click="redirectPrefinance"
          >
            {{ $t('sidebar.calculations') }}
          </v-btn>
        </div>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-row>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{$t('listsModels.child.modelNumber')}}</div>
            <v-text-field
              v-model="model.number"
              outlined
              hide-details
              class="rounded-lg base mb-4"
              height="44"
              dense
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.enterModelNumber')"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{$t('listsModels.child.modelName')}}</div>
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
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{$t('listsModels.child.modelGroup')}}</div>
            <v-select
              v-model="model.group"
              outlined
              hide-details
              class="rounded-lg base mb-4"
              height="44" dense
              :items="modelGroups"
              item-value="id"
              item-text="name"
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.selectModelGroup')"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{$t('listsModels.child.partner')}}</div>

            <v-combobox
                  v-model="model.partnerId"
                  :items="partner_enums"
                  :search-input.sync="partnerName"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :return-object="true"
                  color="#544B99"
                  dense
                  placeholder="Enter partner name"
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
            <div class="label">Brand name</div>
            <v-select
              v-model="model.brandName"
              :items="brandList"
              outlined
              hide-details
              class="rounded-lg base mb-4"
              height="44"
              dense
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              placeholder="Select brand name"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">Fabric name</div>
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
                  placeholder="Enter canvas type"
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
            <div class="label">{{$t('listsModels.child.composition')}}</div>
            <v-select
              :items="compositionList"
              item-text="name"
              item-value="id"
              v-model="model.compositionId"
              :return-object="false"
              outlined
              hide-details
              class="rounded-lg base mb-4"
              height="44"
              dense
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.entermodelComposition')"
              color="#544B99"
              append-icon="mdi-chevron-down"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">Main fabric density (gr/m2)</div>
            <v-text-field
              v-model="model.mainFabricDensity"
              outlined
              hide-details
              class="rounded-lg base mb-4"
              height="44"
              dense
              style="max-width: 400px"
              placeholder="Density"
              color="#544B99"
            />
          </v-col>
          
          
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">Fabric rework</div>
            <v-select
              v-model="model.fabricRework"
              outlined
              hide-details
              class="rounded-lg base mb-4"
              height="44" dense
              :items="fabricRework"
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              placeholder="Fabric rework"
              color="#544B99"
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
              :placeholder="$t('listsModels.child.selectSeason')"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{$t('listsModels.child.gender')}}</div>
            <v-select
              v-model="model.gender"
              outlined
              hide-details
              class="rounded-lg base mb-4"
              height="44" dense
              :items="gander_enums"
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.selectGender')"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">Inspection date</div>
            <div style="height: 44px !important">
              <el-date-picker
                v-model="model.inspectionDate"
                :picker-options="pickerShortcuts"
                class="base_picker"
                placeholder="dd.MM.yyyy HH:mm:ss"
                style="width: 100%; height: 100%"
                type="datetime"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </div>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">Planned order quantity</div>
            <v-text-field
              v-model="model.orderedQuantity"
              outlined
              class="rounded-lg base"
              hide-details
              height="44"
              color="#544B99"
              dense
              placeholder="Enter the planned order quantity"
              append-icon=""
            />
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
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{$t('listsModels.child.creator')}}</div>
            <v-text-field
              v-model="model.creator"
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
              v-model="model.modifiedPerson"
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
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{$t('listsModels.child.updatedTime')}}</div>
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
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12"  class="d-flex justify-end align-center">
            <v-spacer/>
            <v-btn
              v-if="modelStatus === 'Add'"
              color="#544B99"
              class="text-capitalize rounded-lg"
              width="130"
              height="44"
              dark
              @click="createNewModel"
            >{{ $t('listsModels.child.save') }}
            </v-btn>
            <v-btn
              v-else
              color="#544B99"
              class="text-capitalize rounded-lg"
              width="130"
              height="44"
              dark
              @click="updateModels"
            >{{ $t('update') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-6 pr-4 d-flex justify-center">
        <ShowBtnComponent
          :click-btn="clickBtn"
          :show_btn_value="show_btn"
        />
      </v-card-actions>
    </v-card>
    <v-card class="mt-6" flat>
      <v-tabs
        v-model="tab"
      >
        <v-tabs-slider color="#544B99"/>
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
                <ModelPartsComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <SizeChartComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <PrintingComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <DocumentsComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <ModelPhotoComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <InstructionComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <InspectionComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
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

export default {
  name: 'addOrEditModelsPage',
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
    InspectionComponent
  },
  data() {
    return {
      show_btn: true,
      partnerName:'',
      canvasSearch:'',
      items: [
        this.$t('listsModels.child.modelParts'),
        this.$t('listsModels.child.sizeChart'),
        this.$t('listsModels.child.printing'),
        this.$t('listsModels.child.documents'),
        this.$t('listsModels.child.modelPhoto'),
        this.$t('listsModels.child.instruction'),
        "Inspection file"
      ],
      tab: null,
      modelStatus: 'Add',
      fields_status: true,
      map_links: [
        {
          text: this.$t('listsModels.child.home'),
          disabled: false,
          to: this.localePath('/'),
          icon: true
        },
        {
          text: this.$t('listsModels.child.models'),
          disabled: false,
          to: this.localePath('/models'),
          icon: true
        },
        {
          text: this.$t('listsModels.child.addModels'),
          disabled: true,
          to: this.localePath('/models/7'),
          icon: false
        },
      ],
      fabricRework:["Solid","AOP"],
      model: {
        number: '',
        partnerId: '',
        name: '',
        group: '',
        compositionId: '',
        season: '',
        licence: null,
        brandName:'',
        gender: '',
        description: '',
        creator: '',
        modifiedPerson: '',
        createdTime: null,
        updateTime: null
      },
      season_enums: [
        {key: 'SS', text: ' Spring/Summer'},
        {key: 'AW', text: 'Autumn/Winter'}
      ],
      licence_enums: [
        {key: true, text: 'Yes'},
        {key: false, text: 'No'}
      ],
      gander_enums: ['MALE', 'FEMALE', 'BOY', 'GIRL', 'UNISEX'],
    }
  },
  created() {
    this.getPartnerList();
    this.getCompositionList();
    this.filterCanvasTypeList({id:"",name:"", createdAt:"", updatedAt:""});
  },
  computed: {
    showObject(){
      return{
        show_active: this.show_btn
      }
    },
    ...mapGetters({
      oneModel: 'models/oneModel',
      modelGroups: 'models/modelGroups',
      partner_enums: 'fabricOrdering/partnerLists',
      compositionList: 'models/compositionList',
      brandList: 'models/brandList',
      canvasTypeList: 'canvasType/canvas_type_list',
    }),
  },
  watch: {
    partnerName(val) {
      if(!!val && val !== '') {
      this.getPartnerName(val);
      }
    },
    canvasSearch(val){
      this.filterCanvasTypeList({id:"",name:val, createdAt:"", updatedAt:""});
    },
    oneModel(val) {
      const model = this.model;
      model.number = val.modelNumber;
      model.name = val.name;
      model.group = val.modelGroupId;
      model.compositionId = val.compositionId;
      model.season = val.season;
      model.licence = val.licenceRequired;
      model.gender = val.gender;
      model.description = val.description;
      model.creator = val.createdBy;
      model.modifiedPerson = val.updatedBy;
      model.partnerId ={id:val.partnerId,name:val.partner}
      model.createdTime = val.createdAt;
      model.updateTime = val.updatedAt;
      model.brandName = val.brandName;
      model.fabricRework = val.fabricRework;
      model.mainFabricDensity = val.mainFabricDensity;
      model.canvasTypeId = {id:val.canvasTypeId,name:val.canvasType}
    },
    "model.partnerId"(val){
      if(!!val){
        this.getBrandList(val?.id)
      }
    }

  },
  methods: {
    ...mapActions({
      getOneModel: 'models/getOneModel',
      getModelGroup: 'models/getModelGroup',
      getPartnerList: 'models/getPartnerList',
      createModel: 'models/createModel',
      updateModel: 'models/updateModel',
      getCompositionList: 'models/getCompositionList',
      getBrandList: 'models/getBrandList',
      modelToPrefinance: 'preFinance/modelToPrefinance',
      getPartnerName: 'fabricOrdering/getPartnerName',
      filterCanvasTypeList: 'canvasType/filterCanvasTypeList',

    }),
    clickBtn(){
      this.show_btn = !this.show_btn
    },
    redirectPrefinance() {
      this.modelToPrefinance(this.$route.params.id)
    },
    async createNewModel() {
      const data = {...this.model};
      data.partnerId=this.model.partnerId?.id
      await this.createModel(data);
    },
    async updateModels() {
      const id = this.$route.params.id;
      const data = {...this.model};
      data.partnerId=this.model.partnerId?.id

      await this.updateModel(
        {
          data,
          id: +id
        })
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id !== 'add-model') {
      await this.getOneModel(id);
      this.modelStatus = 'Edit'
    } else this.modelStatus = 'Add'
    await this.getModelGroup()
  }
}
</script>

<style lang="scss" scoped>
.active-tab {
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #544B99;
}

.el-date-editor--datetime {
  width: 100%;
}
.show_active {
  height: 0;
  overflow: hidden;
}
</style>
