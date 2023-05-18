<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0" class="mt-2 rounded-lg">
      <v-card-title>
        <div>{{ $t('planningProduction.dialog.planningProduction') }}</div>
        <v-chip color="green" dark class="ml-5 text-capitalize font-weight-bold">{{ title }}</v-chip>
        <v-spacer/>
        <div>
          <v-btn outlined class="text-capitalize rounded-lg">
            <v-img src="/clear.svg" max-width="16" class="mr-2"/>
            {{ $t('planningProduction.dialog.clear') }}
          </v-btn>
          <v-btn outlined class="text-capitalize rounded-lg ml-4">
            <v-img src="/edit.svg" max-width="16" class="mr-2"/>
            {{ $t('planningProduction.dialog.edit') }}
          </v-btn>
        </div>
      </v-card-title>
      <v-divider/>
      <v-card-text class="pb-0">
        <v-row>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3"> {{ $t('planningProduction.dialog.orderNumber') }}</div>
            <v-combobox
              v-model="planning.orderNumber"
              :items="orderList"
              :search-input.sync="orderSearch"
              item-text="orderNumber"
              item-value="orderId"
              filled disable-lookup
              class="rounded-lg"
              :return-object="true"
              color="#7631FF"
              dense disabled
              :placeholder="$t('planningProduction.dialog.searchOrderNumber')"
              append-icon=""
              :label="$t('planningProduction.dialog.searchOrderNumber')"
            >
            </v-combobox>
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">{{ $t('planningProduction.dialog.modelNumber') }}</div>
            <v-combobox
              v-model="planning.modelNumber"
              :items="modelData"
              :search-input.sync="modelSearch"
              item-text="modelNumber"
              item-value="id"
              filled
              class="rounded-lg"
              :return-object="true"
              color="#7631FF"
              dense
              :placeholder="$t('planningProduction.dialog.searchModelNumber')"
              append-icon="mdi-chevron-down"
              :label="$t('planningProduction.dialog.searchModelNumber')"
            >
              <template #append>
                <v-icon color="#7631FF">mdi-magnify</v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">{{ $t('planningProduction.dialog.modelName') }}</div>
            <v-text-field
              filled dense
              v-model="planning.modelName"
              class="rounded-lg"
              :label="$t('planningProduction.dialog.enterModelName')"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">{{ $t('planningProduction.dialog.clientName') }}</div>
            <v-text-field
              filled dense
              v-model="planning.clientName"
              class="rounded-lg"
              :label="$t('planningProduction.dialog.enterClientName')"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">{{ $t('planningProduction.dialog.responsiblePerson') }}</div>
            <v-text-field
              filled dense
              v-model="planning.responsiblePerson"
              class="rounded-lg"
              :label="$t('planningProduction.dialog.enterResponsiblePerson')"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">{{ $t('planningProduction.dialog.planningCreator') }}</div>
            <v-text-field
              filled dense
              v-model="planning.planningCreator"
              class="rounded-lg"
              :label="$t('planningProduction.dialog.enterPlanningCreator')"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">{{ $t('planningProduction.dialog.headProduction') }}</div>
            <v-text-field
              filled dense
              v-model="planning.headOfProduction"
              class="rounded-lg"
              :label="$t('planningProduction.dialog.enterHeadProduction')"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">{{ $t('planningProduction.dialog.orderStatus') }}</div>
            <v-text-field
              filled dense
              v-model="planning.orderStatus"
              class="rounded-lg"
              :label="$t('planningProduction.dialog.enterOrderStatus')"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">{{ $t('planningProduction.dialog.orderOpeningDate') }}</div>
            <v-text-field
              filled dense
              v-model="planning.orderOpeningDate"
              class="rounded-lg"
              :label="$t('planningProduction.dialog.enterOrderStatus')"
              disabled
            >
              <template #append>
                <v-img src="/clock-disabled.svg" width="24"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">{{ $t('planningProduction.dialog.orderClosingDate') }}</div>
            <v-text-field
              filled dense
              v-model="planning.orderClosingDate"
              class="rounded-lg"
              :label="$t('planningProduction.dialog.orderClosingDate')"
              disabled
            >
              <template #append>
                <v-img src="/clock-disabled.svg" width="24"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">{{ $t('planningProduction.dialog.deadline') }}</div>
            <v-text-field
              filled dense
              v-model="planning.deadline"
              class="rounded-lg"
              :label="$t('planningProduction.dialog.enterDeadline')"
              disabled
            >
              <template #append>
                <v-img src="/clock-disabled.svg" width="24"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">{{ $t('planningProduction.dialog.shippingDate') }}</div>
            <v-text-field
              filled dense
              v-model="planning.shippingDate"
              class="rounded-lg"
              :label="$t('planningProduction.dialog.enterShippingDate')"
              disabled
            >
              <template #append>
                <v-img src="/clock-disabled.svg" width="24"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">{{ $t('planningProduction.dialog.overproduction') }}, %</div>
            <v-text-field
              filled dense
              v-model="planning.overProductionPercent"
              class="rounded-lg"
              :label="$t('planningProduction.dialog.enterOverproduction')"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">{{ $t('planningProduction.dialog.orderQuantity') }}</div>
            <v-text-field
              filled dense
              v-model="planning.orderQuantity"
              class="rounded-lg"
              :label="$t('planningProduction.dialog.orderQuantity')"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">{{ $t('planningProduction.dialog.productionQuantity') }}</div>
            <v-text-field
              filled dense
              v-model="planning.productionQuantity"
              class="rounded-lg"
              :label="$t('planningProduction.dialog.enterProductionQuantity')"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="6" md="6" class="d-flex flex-wrap px-0">
            <v-col v-for="(image, idx) in 3" :key="idx" cols="12" lg="4" md="4">
              <div class="image-box">
                <v-img
                  :src="modelImages[idx]?.filePath"
                  v-if="!!modelImages[idx]?.filePath"
                  max-height="150"
                  contain class="pointer"
                  @click="showImage(modelImages[idx]?.filePath)"
                />
                <v-img src="/default-image.svg" max-width="70" v-else/>
              </div>
            </v-col>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-6">
        <v-spacer/>
        <v-btn
          width="130"
          height="40"
          color="#7631FF"
          class="font-weight-bold rounded-lg"
          dark @click="savePlanning"
        >
          {{ $t('planningProduction.dialog.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog max-width="590" v-model="image_dialog">
      <v-card>
        <v-card-title class="d-flex">
          <v-spacer/>
          <v-btn icon color="#7631FF" large @click="image_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-img :src="currentImage" height="500" contain/>
      </v-card>
    </v-dialog>
    <ProductionPlanning class="mt-4"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ProductionOfPlanningPage',
  data() {
    return {
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
          to: this.localePath('/planning-production'),
          icon: true
        },
        {
          text: this.$t('planningProduction.table.details'),
          disabled: true,
          to: this.localePath('/models/7'),
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
</style>
