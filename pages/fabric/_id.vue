<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0" class="mt-2 rounded-lg">
      <v-card-title>
        <div>
         {{$t('planning.index.fabric')}}
          <v-chip
            color="#10BF41"
            class="text-capitalize ml-5 font-weight-bold"
            dark>
            {{ title }}
          </v-chip>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="pb-0">
        <v-form lazy-validation ref="new_validate">
          <v-row>
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{ $t('planning.id.orderNumber') }}</div>
              <v-combobox
                v-model="addFabric.orderNumber"
                :items="orderData"
                :search-input.sync="orderSearch"
                item-text="orderNumber"
                item-value="orderId"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                :return-object="true"
                color="#544B99"
                dense
                disabled
                :placeholder="$t('planning.id.enterOrderNumber') "
                append-icon="mdi-chevron-down"
              >
                <template #append>
                  <v-icon color="#544B99">mdi-magnify</v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{$t('listsModels.child.modelNumber')}}</div>
              <v-combobox
                v-model="addFabric.modelNumber"
                :items="modelData"
                :search-input.sync="modelSearch"
                item-text="modelNumber"
                item-value="modelId"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                :return-object="true"
                color="#544B99"
                dense
                :placeholder="$t('listsModels.child.enterModelNumber')"
                append-icon="mdi-chevron-down"
              >
                <template #append>
                  <v-icon color="#544B99">mdi-magnify</v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{$t('listsModels.child.modelName')}}</div>
              <v-text-field
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                color="#544B99"
                dense
                :placeholder="$t('listsModels.child.modelName')"
                v-model="addFabric.modelName"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{ $t('planning.id.deadlineForFabric') }}</div>
              <v-text-field
                v-model="addFabric.headOfProduction"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                color="#544B99"
                dense disabled
                :placeholder="$t('planning.id.deadlineForFabricPlaceholder') "
                append-icon=""
              />
            </v-col>
          </v-row>
          <v-row :class="showObject">
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{ $t('planning.id.clientName') }}</div>
              <v-text-field
                v-model="addFabric.clientName"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                color="#544B99"
                dense disabled
                :placeholder="$t('planning.id.enterClientName')"
                append-icon=""
              />
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{$t('planning.id.orderPriority')}}</div>
              <v-text-field
                v-model="addFabric.orderPriority"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                color="#544B99"
                dense
                placeholder="0"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{$t('planning.id.deadlineOfOrder')}}</div>
              <v-text-field
                v-model="addFabric.deadlineOfOrder"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                color="#544B99"
                dense
                :placeholder="$t('planning.id.enterDeadlineOfOrder')"
                disabled
              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{$t('planning.id.actualShippingDate')}}</div>
              <v-text-field
                v-model="addFabric.actualShippingDate"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                color="#544B99"
                dense
                :placeholder="$t('planning.id.enterActualShippingDate')"
                disabled
              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{$t('planning.id.deadlineForFabric')}}</div>
              <el-date-picker
                v-model="addFabric.deadlineForFabric"
                type="datetime"
                style="width: 100%; height: 44px !important;"
                :placeholder="$t('planning.id.deadlineForFabric')"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
                class="base_picker"
              >
              </el-date-picker>
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{$t('planning.id.creatorOfPlanning')}}</div>
              <v-text-field
                v-model="addFabric.creatorOfPlanning"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                color="#544B99"
                dense
                :placeholder="$t('planning.id.creatorOfPlanning')"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{$t('planning.id.creatorOfPlanning')}}</div>
              <v-text-field
                v-model="addFabric.createdAt"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                color="#544B99"
                dense
                placeholder="Enter created time"
                disabled
              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{$t('planning.id.creatorOfModel')}}</div>
              <v-text-field
                v-model="addFabric.creatorOfModel"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                color="#544B99"
                dense
                :placeholder="$t('planning.id.creatorOfModel')"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{$t('planning.id.createdTime')}}</div>
              <v-text-field
                v-model="addFabric.createdTimeOfModel"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
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
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{$t('planning.id.creatorOfOrder')}}</div>
              <v-text-field
                v-model="addFabric.creatorOfOrder"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                color="#544B99"
                dense
                :placeholder="$t('planning.id.creatorOfOrder')"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{$t('planning.id.createdTime')}}</div>
              <v-text-field
                v-model="addFabric.createdTimeOfOrder"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
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
            <v-col cols="12">
              <div class="label px-3" v-if="!!modelImages[0]?.filePath">Photos of models</div>
              <v-col cols="12" lg="6" md="6" class="d-flex flex-wrap px-0">
                <v-col v-for="(image, idx) in 3" :key="idx" cols="12" lg="4" md="4" v-if="!!modelImages[idx]?.filePath">
                  <div class="image-box" style="min-height: 132px">
                    <v-img
                      :src="modelImages[idx]?.filePath"
                      v-if="!!modelImages[idx]?.filePath"
                      max-height="150"
                      contain class="pointer"
                      @click="showImage(modelImages[idx]?.filePath)"
                    />
                    <v-img src="/default-image.svg" max-width="50" v-else/>
                  </div>
                </v-col>
              </v-col>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn
                color="#544B99"
                dark class="text-capitalize rounded-lg font-weight-bold"
                style="min-width: 130px;"
                @click="createPlanning"
              >
               {{ $t('listsModels.child.save') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
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
    <v-card elevation="0" class="mt-3 rounded-lg">
      <v-card-text>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="#544B99"
        >
          <v-tab
            v-for="item in items"
            :key="item"
            class="text-none"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-divider/>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <FabricPlanningChart/>
          </v-tab-item>
          <v-tab-item>
            <FabricOrdered/>
          </v-tab-item>
          <v-tab-item>
            <FabricPlannedOrder/>
          </v-tab-item>
          <v-tab-item>
            <Documents/>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card class="mt-3 rounded-lg elevation-0">
          <v-card-text>
            <FabricCalculation/>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6">
        <v-card class="mt-3 rounded-lg elevation-0">
          <v-card-text>
            <PlannedExpense :modelId="addFabric.modelId"/>
            <v-divider/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import FabricPlanningChart from "../../components/Fabric/PlanningChart.vue"
import FabricOrdered from "../../components/Fabric/Ordered.vue"
import FabricSupplyFabric from "../../components/Fabric/SupplyFabric.vue"
import FabricOrder from "../../components/Fabric/Order.vue"
import PlannedExpense from "../../components/Fabric/PlannedExpense.vue"
import FabricCalculation from "../../components/Fabric/Calculation.vue"
import FabricPlannedOrder from "../../components/Fabric/PlannedOrder.vue"
import Documents from "../../components/Documents.vue"
import ShowBtnComponent from "../../components/ShowComponentBtn/ShowBtn.vue";

export default {
  name: 'FabricPlanningDynamicPage',
  components: {
    ShowBtnComponent,
    Breadcrumbs,
    FabricPlanningChart,
    FabricOrdered,
    FabricSupplyFabric,
    FabricOrder,
    FabricCalculation,
    FabricPlannedOrder,
    Documents,
    PlannedExpense
  },
  data() {
    return {
      show_btn: true,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      image_dialog: false,
      map_links: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
          icon: true
        },
        {
          text: 'Fabric',
          disabled: false,
          to: '/fabric',
          icon: true
        },
        {
          text: 'Details',
          disabled: true,
          to: '/fabric/7a42ec47-7351-4128-9db9-5236adbbfe6d',
          icon: false
        },
      ],
      title: 'Add',
      addFabric: {
        orderNumber: '',
        modelNumber: '',
        modelName: '',
        headOfProductionDepartment: '',
        clientName: '',
        orderPriority: '',
        deadlineOfOrder: '',
        actualShippingDate: '',
        permission: 'Edit',
        deadlineForFabric: '',
        creatorOfPlanning: '',
        creatorOfModel: '',
        createdTimeOfModel: '',
        creatorOfOrder: '',
        createdTimeOfOrder: '',
        createdTime: '',
        photosOfModels: [],
        createdAt: '',
      },
      orderData: [],
      orderSearch: '',
      modelSearch: '',
      items: [
       this.$t('planning.planningChart.fabricPlanningChart'),
         this.$t('planning.planningChart.listOfFabrics'),
         this.$t('planning.planningChart.plannedFabricOrder'),
        this.$t("modelBox.documentBox.document"),
      ],
      tab: null,
      currentImage: '',
    }
  },
  watch: {
    modelSearch(elem) {
      if (!(typeof elem === null || typeof elem === 'object')) {
        this.getModelName(elem)
      }
    },
    async "addFabric.modelNumber"(val) {
      if (typeof val !== null || !!Object.keys(val).length) {
        await this.getOrderNames(val?.id);
      }
    },
    fabricData(val) {
      this.addFabric = JSON.parse(JSON.stringify(val))
    },
    async addFabric(val) {
      await this.getImages(val.modelId);
      this.$store.commit('fabric/setModelId', val.modelId)
    },
    fabricPlanningId(val) {
      this.getPlanningChartList(val)
    },
    onePlanningChart(val) {
      this.$store.commit('fabric/setModelId', val.modelId);
      this.getImages(val.modelId);
      const data = this.addFabric;
      data.orderNumber = val.orderNumber;
      data.modelNumber = val.modelNumber;
      data.modelName = val.modelName;
      data.headOfProduction = val.headOfProduction;
      data.clientName = val.clientName;
      data.orderPriority = val.orderPriority;
      data.deadlineOfOrder = val.deadlineOfOrder?this.formatLong(val.deadlineOfOrder):'';
      data.actualShippingDate = val.actualShippingDate?this.formatLong(val.actualShippingDate):'';
      data.permission = 'Edit';
      data.deadlineForFabric = val.deadlineOfFabricPlanning;
      data.creatorOfPlanning = val.creatorOfPlanning;
      data.createdTime = val.createdTime;
      data.photosOfModels = val.photosOfModels;
      data.createdAt = val.createdAt;
      data.creatorOfModel = val.creatorOfModel;
      data.createdTimeOfModel = val.createdTimeOfModel;
      data.creatorOfOrder = val.creatorOfOrder;
      data.createdTimeOfOrder = val.createdTimeOfOrder;
      data.modelId=val.modelId
    }
  },
  computed: {
    showObject(){
      return{
        show_active: this.show_btn
      }
    },
    ...mapGetters({
      modelNames: 'preFinance/modelNames',
      modelData: 'preFinance/modelData',
      fabricData: 'fabric/fabricData',
      modelImages: 'modelPhoto/modelImages',
      fabricPlanningId: "fabric/fabricPlanningId",
      onePlanningChart: 'fabric/onePlanningChart'
    })
  },
  methods: {
    ...mapActions({
      getModelName: 'preFinance/getModelName',
      getOrderNames: 'fabric/getOrderNames',
      getImages: 'modelPhoto/getImages',
      savePlanning: 'fabric/savePlanning',
      getPlanningChartList: 'fabric/getPlanningChartList',
      getPlanningChartListOne: 'fabric/getPlanningChartListOne',
    }),
    clickBtn(){
      this.show_btn = !this.show_btn
    },
    async createPlanning() {
      const valid = this.$refs.new_validate.validate();
      if (valid) {
        const body = {
          deadline: this.addFabric.deadlineForFabric,
          modelId: this.addFabric.modelId,
          orderId: this.addFabric.orderId
        }

        await this.savePlanning(body);
      }
    },
    showImage(image) {
      this.currentImage = image;
      this.image_dialog = true;
    },
  },
  mounted() {
    const param = this.$route.params.id;
    if (param === "create") {
      this.title = 'Add'
      this.$store.commit('fabric/setPlanningChartList', [])
    } else {
      this.title = 'Edit';
      this.$store.commit('fabric/setFabricPlanningId', param);
      this.getPlanningChartList(param);
      this.getPlanningChartListOne(param);
    }

    this.$store.commit('modelPhoto/setModelImages', [])
  }
}
</script>

<style lang="scss">
.image-box {
  background: #F8F4FE;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  min-height: 90%;
}

.custom-picker {
  width: 100% !important;
  background: #F8F4FE;
  border-radius: 10px 10px 0 0 !important;

  &::placeholder {
    color: #cccccc;
  }

  > input.el-input__inner {
    border-radius: 10px 10px 0 0 !important;

    background: #F8F4FE !important;
    border: 0;
    border-bottom: 1px solid #777777 !important;
    width: 100% !important;
    height: 52px !important;

    &::placeholder {
      color: #9A979D !important;
    }
  }
}
.show_active{
  height: 0;
  overflow: hidden;
}
</style>
