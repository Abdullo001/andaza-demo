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
            color="#7631FF"
            class="text-capitalize rounded-lg mr-4 font-weight-bold"
            @click="redirectPrefinance"
          >
            {{ $t('listsModels.child.prefinance') }}
          </v-btn>
          <v-btn
            outlined
            elevation="0"
            color="#777C85"
            class="text-capitalize rounded-lg mr-4"
          >
            <v-img src="/trash.svg" class="mr-1"/>
            {{ $t('listsModels.child.delete') }}
          </v-btn>
          <v-btn
            outlined
            elevation="0"
            class="text-capitalize rounded-lg"
            color="#777C85"
          >
            <v-img :src="fields_status ? '/edit.svg' : '/edit-active.svg'" class="mr-1"/>
            {{ $t('listsModels.child.edit') }}
          </v-btn>
        </div>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-row>
          <v-col>
            <v-text-field
              v-model="model.number"
              :label="$t('listsModels.child.modelNumber')"
              filled
              dense
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.enterModelNumber')"
              class="mb-4"
              color="#7631FF"
            />
            <v-select
              v-model="model.partnerId"
              :items="partner_enums"
              item-value="id"
              item-text="name"
              :label="$t('listsModels.child.partner')"
              filled
              dense
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.selectSeason')"
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="model.name"
              :label="$t('listsModels.child.modelName')"
              filled
              dense
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.modelName')"
              class="mb-4"
              color="#7631FF"
            />
            <v-select
              v-model="model.season"
              :label="$t('listsModels.child.season')"
              filled
              dense
              :items="season_enums"
              item-value="key"
              item-text="text"
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.selectSeason')"
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
          <v-col>
            <v-select
              v-model="model.group"
              :label="$t('listsModels.child.modelGroup')"
              filled dense
              :items="modelGroups"
              item-value="id"
              item-text="name"
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.selectModelGroup')"
              class="mb-4"
              color="#7631FF"
            />
            <v-select
              v-model="model.licence"
              :label="$t('listsModels.child.license')"
              filled dense
              :items="licence_enums"
              item-text="text"
              item-value="key"
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.selectModelGroup')"
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="model.composition"
              :label="$t('listsModels.child.composition')"
              filled dense
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.entermodelComposition')"
              class="mb-4"
              color="#7631FF"
            />
            <v-select
              v-model="model.gender"
              :label="$t('listsModels.child.gender')"
              filled dense
              :items="gander_enums"
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.selectGender')"
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-textarea
              v-model="model.description"
              :label="$t('listsModels.child.description')"
              filled dense
              :placeholder="$t('listsModels.child.enterDescription')"
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="3">
            <v-text-field
              v-model="model.creator"
              :label="$t('listsModels.child.creator')"
              filled dense
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.enterCreator')"
              class="mb-4"
              disabled
            />
            <v-text-field
              v-model="model.modifiedPerson"
              :label="$t('listsModels.child.modifiedPerson')"
              filled dense
              style="max-width: 400px"
              :placeholder="$t('listsModels.child.enterModifiedPerson')"
              class="mb-4" disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <v-text-field
              v-model="model.createdTime"
              filled
              class="rounded-lg mb-4"
              color="#7631FF"
              dense
              :label="$t('listsModels.child.createdTime')"
              placeholder="dd.MM.yyyy HH:mm:ss"
              disabled
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
            <v-text-field
              v-model="model.updateTime"
              filled
              class="rounded-lg mb-4"
              color="#7631FF"
              dense
              :label="$t('listsModels.child.updatedTime')"
              placeholder="dd.MM.yyyy HH:mm:ss"
              disabled
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-6 pr-4">
        <v-spacer/>
        <v-btn
          v-if="modelStatus === 'Add'"
          color="#7631FF"
          class="text-capitalize rounded-lg"
          width="130"
          height="44"
          dark
          @click="createNewModel"
        >{{ $t('listsModels.child.save') }}
        </v-btn>
        <v-btn
          v-else
          color="#7631FF"
          class="text-capitalize rounded-lg"
          width="130"
          height="44"
          dark
          @click="updateModels"
        >{{ $t('update') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mt-6" flat>
      <v-tabs
        v-model="tab"
      >
        <v-tabs-slider color="#7631FF"/>
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
                <SamplesComponent/>
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

export default {
  name: 'addOrEditModelsPage',
  components: {
    InstructionComponent,
    ModelPhotoComponent,
    SamplesComponent,
    DocumentsComponent,
    PrintingComponent,
    SizeChartComponent,
    ModelPartsComponent,
    Breadcrumbs,
  },
  data() {
    return {
      items: [
        this.$t('listsModels.child.modelParts'),
        this.$t('listsModels.child.sizeChart'),
        this.$t('listsModels.child.printing'),
        this.$t('listsModels.child.documents'),
        this.$t('listsModels.child.samples'),
        this.$t('listsModels.child.modelPhoto'),
        this.$t('listsModels.child.instruction'),
        this.$t('listsModels.child.ordersThisModel')
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
      model: {
        number: '',
        partnerId: '',
        name: '',
        group: '',
        composition: '',
        season: '',
        licence: null,
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
  },
  computed: {
    ...mapGetters({
      oneModel: 'models/oneModel',
      modelGroups: 'models/modelGroups',
      partner_enums: 'models/partner_enums'
    }),
  },
  watch: {
    oneModel(val) {
      const model = this.model;
      model.number = val.modelNumber;
      model.name = val.name;
      model.group = val.modelGroupId;
      model.composition = val.composition;
      model.season = val.season;
      model.licence = val.licenceRequired;
      model.gender = val.gender;
      model.description = val.description;
      model.creator = val.createdBy;
      model.modifiedPerson = '';
      model.partnerId = val.partnerId
      model.createdTime = val.createdAt;
      model.updateTime = val.updatedAt;
    }
  },
  methods: {
    ...mapActions({
      getOneModel: 'models/getOneModel',
      getModelGroup: 'models/getModelGroup',
      getPartnerList: 'models/getPartnerList',
      createModel: 'models/createModel',
      updateModel: 'models/updateModel'

    }),
    redirectPrefinance() {
      this.$store.commit('preFinance/setModelNumber', this.model.number);
      this.$router.push(this.localePath('/prefinances/create'));
    },
    async createNewModel() {
      await this.createModel(this.model);
    },
    async updateModels() {
      const id = this.$route.params.id;
      await this.updateModel(
        {
          data: this.model,
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
  color: #7631FF;
}

.el-date-editor--datetime {
  width: 100%;
  border: 5px solid red;
}
</style>
