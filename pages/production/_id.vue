<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0" class="mt-2 rounded-lg">
      <v-card-title>
        <div>{{ $t('planningProduction.dialog.planningProduction') }}</div>
        <v-chip color="green" dark class="ml-5 text-capitalize font-weight-bold">{{ title }}</v-chip>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="pb-0">
        <v-row>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label"> {{ $t('planningProduction.dialog.orderNumber') }}</div>
            <v-combobox
              v-model="planning.orderNumber"
              :items="orderList"
              :search-input.sync="orderSearch"
              item-text="orderNumber"
              item-value="orderId"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              disable-lookup
              :return-object="true"
              color="#544B99"
              dense disabled
              :placeholder="$t('planningProduction.dialog.searchOrderNumber')"
              append-icon=""
            >
            </v-combobox>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('planningProduction.dialog.modelNumber') }}</div>
            <v-combobox
              v-model="planning.modelNumber"
              :items="modelData"
              :search-input.sync="modelSearch"
              item-text="modelNumber"
              item-value="id"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              :return-object="true"
              color="#544B99"
              dense
              :placeholder="$t('planningProduction.dialog.searchModelNumber')"
              append-icon="mdi-chevron-down"
            >
              <template #append>
                <v-icon color="#544B99">mdi-magnify</v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('planningProduction.dialog.modelName') }}</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base" dense
              v-model="planning.modelName"
              :placeholder="$t('planningProduction.dialog.enterModelName')"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('planningProduction.dialog.clientName') }}</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base" dense
              v-model="planning.clientName"
              :placeholder="$t('planningProduction.dialog.enterClientName')"
              disabled
            />
          </v-col>
        </v-row>
        <v-row :class="showObject">
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('planningProduction.dialog.orderOpeningDate') }}</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base" dense
              v-model="planning.orderOpeningDate"
              :placeholder="$t('planningProduction.dialog.enterOrderStatus')"
              disabled
            >
              <template #append>
                <v-img src="/clock-disabled.svg" width="24"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('planningProduction.dialog.orderClosingDate') }}</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base" dense
              v-model="planning.orderClosingDate"
              :placeholder="$t('planningProduction.dialog.orderClosingDate')"
              disabled
            >
              <template #append>
                <v-img src="/clock-disabled.svg" width="24"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('planningProduction.dialog.deadline') }}</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base" dense
              v-model="planning.deadline"
              :placeholder="$t('planningProduction.dialog.enterDeadline')"
              disabled
            >
              <template #append>
                <v-img src="/clock-disabled.svg" width="24"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('planningProduction.dialog.shippingDate') }}</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base" dense
              v-model="planning.shippingDate"
              :placeholder="$t('planningProduction.dialog.enterShippingDate')"
              disabled
            >
              <template #append>
                <v-img src="/clock-disabled.svg" width="24"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('planningProduction.dialog.overproduction') }}, %</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base" dense
              v-model="planning.overProductionPercent"
              :placeholder="$t('planningProduction.dialog.enterOverproduction')"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('planningProduction.dialog.responsiblePerson') }}</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base" dense
              v-model="planning.responsiblePerson"
              :placeholder="$t('planningProduction.dialog.enterResponsiblePerson')"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('planningProduction.dialog.headProduction') }}</div>
            <v-text-field
              outlined
              hide-details
              height="44" dense
              v-model="planning.headOfProduction"
              class="rounded-lg base"
              :placeholder="$t('planningProduction.dialog.enterHeadProduction')"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('planningProduction.dialog.orderStatus') }}</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base" dense
              v-model="planning.orderStatus"
              :placeholder="$t('planningProduction.dialog.enterOrderStatus')"
              disabled
            />
          </v-col>

          <v-col cols="12" lg="6" md="6">
            <div class="label mt-4"  v-if="!!model_images[0]?.filePath">{{ $t('workingProcess.dialog.photosModels') }}</div>
            <div class="d-flex flex-wrap px-0">
              <v-col v-for="(image, idx) in 3" :key="idx" cols="12" lg="4" md="4"  v-if="!!model_images[idx]?.filePath">
                <div class="image-box">
                  <v-img
                    :src="model_images[idx]?.filePath"
                    v-if="!!model_images[idx]?.filePath"
                    max-height="150"
                    contain class="pointer"
                    @click="showImage(model_images[idx]?.filePath)"
                  />
                  <v-img src="/default-image.svg" max-width="70" v-else/>
                </div>
              </v-col>
            </div>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6"></v-col>
          <v-col cols="12" lg="3" md="3" sm="6" class="d-flex justify-end align-end">
            <v-btn
              width="130"
              height="40"
              color="#544B99"
              class="font-weight-bold rounded-lg"
              dark @click="savePlanning"
            >
              {{ $route.params.id === 'create' ? $t('save') : $t('update') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="py-6">
        <v-spacer/>
          <ShowBtnComponent
            :click-btn="clickBtn"
            :show_btn_value="show_btn"
          />
        <v-spacer/>
      </v-card-actions>
    </v-card>
    <v-dialog max-width="590" v-model="image_dialog">
      <v-card>
        <v-card-title class="d-flex">
          <v-spacer/>
          <v-btn icon color="#544B99" large @click="image_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-img :src="currentImage" height="500" contain/>
      </v-card>
    </v-dialog>

    <v-card elevation="0" class="mt-3 rounded-lg">
      <v-card-text>
        <ProductionPlanningComponent/>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ProductionPlanningComponent from "../../components/Production/Planning.vue";
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import Subcontracts from "../../components/Subcontracts.vue";
import ShowBtnComponent from "../../components/ShowComponentBtn/ShowBtn.vue";

export default {
  name: 'ProductionOfPlanningPage',
  components: {
    ShowBtnComponent,
    Subcontracts,
    Breadcrumbs,
    ProductionPlanningComponent},
  data() {
    return {
      show_btn: true,
      tab: null,
      items: ["Planning of production"],
      title: "Add",
      currentImage: '',
      image_dialog: false,
      planning: {
        orderNumber: '',
        modelNumber: '',
        modelName: '',
        clientName: '',
        responsiblePerson: '',
        planningCreator: '',
        headOfProduction: '',
        orderStatus: '',
        orderOpeningDate: '',
        orderClosingDate: '',
        deadline: '',
        shippingDate: '',
        overProductionPercent: '',
        orderQuantity: '',
        productionQuantity: '',
      },
      orderList: [],
      modelList: [],
      orderSearch: '',
      modelSearch: '',
      model_images: [],
      map_links: [
        {
          text: this.$t('listsModels.child.home'),
          disabled: false,
          to: this.localePath('/'),
          icon: true
        },
        {
          text: this.$t('planningProduction.table.planningProduction'),
          disabled: false,
          to: this.localePath('/production'),
          icon: true
        },
        {
          text: this.$t('planningProduction.table.details'),
          disabled: true,
          to: this.localePath('/production/7'),
          icon: false
        },
      ],
    }
  },
  created() {
    this.getProcessList();
    this.getWorkshopList();
    this.getColorsList();
  },
  computed: {
    showObject(){
      return{
        show_active: this.show_btn
      }
    },
    ...mapGetters({
      modelData: 'preFinance/modelData',
      modelInfo: 'production/planning/modelInfo',
      modelImages: 'modelPhoto/modelImages',
      productionId: 'production/planning/productionId'
    })
  },
  watch: {
    modelSearch(elem) {
      if (!(typeof elem === null || typeof elem === 'object')) {
        this.getModelName(elem)
      }
    },
    "planning.modelNumber"(val) {
      if (val?.id ?? false) {
        this.getModelInfo(val?.id);
      }
    },
    modelInfo(val) {
      this.getImages(val?.modelId);
      this.planning = JSON.parse(JSON.stringify(val))
    },
    modelImages(val) {
      this.model_images = JSON.parse(JSON.stringify(val))
    }
  },
  methods: {
    ...mapActions({
      getModelName: 'preFinance/getModelName',
      getModelInfo: 'production/planning/getModelInfo',
      getImages: 'modelPhoto/getImages',
      getProcessList: 'production/planning/getProcessList',
      getWorkshopList: 'production/planning/getWorkshopList',
      getColorsList: 'production/planning/getColorsList',
      createProcessPlanning: 'production/planning/createProcessPlanning',
      getProcessingList: 'production/planning/getProcessingList'
    }),
    clickBtn(){
      this.show_btn = !this.show_btn
    },
    async savePlanning() {
      const data = {modelId: this.planning.modelId}
      await this.createProcessPlanning(data);
    },
    showImage(image) {
      this.currentImage = image;
      this.image_dialog = true;
    },
  },
  mounted() {
    const param = this.$route.params.id;
    if(param !== 'create') {
      this.title = "Edit"
      this.getModelInfo(param);
      this.getProcessingList({
        id: this.productionId,
        page: 0,
        size: 10
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.image-box {
  background: #F8F4FE;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  min-height: 150px;
}
.show_active{
  height: 0;
  overflow: hidden;
}
</style>
