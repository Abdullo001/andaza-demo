<template>
  <div>
    <Breadcrumbs :maps="map_links" />
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>
         {{ $t('sidebar.accessory') }}
          <v-chip color="#10BF41" dark class="ml-5 font-weight-bold">
            {{ title }}
          </v-chip>
        </div>
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-4">
        <v-row>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('fabricOrderingBox.id.orderNumber') }}</div>
            <v-text-field
              v-model="accessoryDetail.orderNumber"
              :placeholder="$t('fabricOrderingBox.id.orderNumber')"
              validate-on-blur
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              :return-object="true"
              disabled
              color="#544B99"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('fabricOrderingBox.id.modelNumber') }}</div>
            <v-combobox
              v-model="accessoryDetail.modelNumber"
              :items="modelData"
              :search-input.sync="modelSearch"
              item-text="modelNumber"
              item-value="modelNumber"
              outlined
              height="44"
              class="rounded-lg base"
              hide-details
              :return-object="true"
              color="#544B99"
              dense
              :placeholder="$t('prefinances.child.enterModelNumber')"
              append-icon="mdi-chevron-down"
            >
              <template #append>
                <v-icon color="#544B99">mdi-magnify</v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6" >
            <div class="label">{{ $t('fabricOrderingBox.id.modelName') }}</div>
            <v-text-field
              v-model="accessoryDetail.modelName"
              validate-on-blur
              :placeholder="$t('prefinances.child.enterModelNumber')"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('fabricOrderingBox.id.enterHeadOfProductionDepartment') }}</div>
            <v-text-field
              v-model="accessoryDetail.headOfProductionDepartment"
              validate-on-blur
              :placeholder=" $t('fabricOrderingBox.id.enterHeadOfProductionDepartment')"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            />
          </v-col>
        </v-row>
        <v-row :class="showObject">
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{$t('fabricOrderingBox.id.clientName') }}</div>
            <v-text-field
              v-model="accessoryDetail.clientName"
              validate-on-blur
              outlined
              hide-details
              height="44"
              dense
              :placeholder="$t('fabricOrderingBox.id.clientName')"
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('fabricOrderingBox.id.orderStatus') }}</div>
            <v-text-field
              v-model="accessoryDetail.orderStatus"
              validate-on-blur
              :placeholder="$t('fabricOrderingBox.id.orderStatus')"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('fabricOrderingBox.id.deadlineOfOrder') }}</div>
            <v-text-field
              v-model="accessoryDetail.orderDeadline"
              validate-on-blur
              :placeholder="$t('fabricOrderingBox.id.deadlineOfOrder') "
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            >
              <template #append>
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('fabricOrderingBox.id.actualShippingDate')  }}</div>
            <v-text-field
              v-model="accessoryDetail.shippingDate"
              validate-on-blur
              :placeholder="$t('fabricOrderingBox.id.actualShippingDate')"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            >
              <template #append>
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('fabricOrderingBox.id.creatorOfPlanning') }}</div>
            <v-text-field
              v-model="accessoryDetail.creatorOfPlanning"
              validate-on-blur
              outlined
              hide-details
              :placeholder=" $t('fabricOrderingBox.id.creatorOfPlanning') "
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{  $t('fabricOrderingBox.id.createdTime')  }}</div>
            <v-text-field
              v-model="accessoryDetail.createdTimeOfModel"
              validate-on-blur
              :placeholder="$t('fabricOrderingBox.id.createdTime')"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            >
              <template #append>
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('fabricOrderingBox.id.creatorOfModel') }}</div>
            <v-text-field
              v-model="accessoryDetail.creatorOfModel"
              validate-on-blur
              :placeholder=" $t('fabricOrderingBox.id.creatorOfModel')"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{  $t('fabricOrderingBox.id.createdTime') }}</div>
            <v-text-field
              v-model="accessoryDetail.createdTimeOfModel"
              validate-on-blur
              :placeholder=" $t('fabricOrderingBox.id.createdTime') "
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            >
              <template #append>
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{  $t('fabricOrderingBox.id.creatorOfOrder')  }}</div>
            <v-text-field
              v-model="accessoryDetail.creatorOfOrder"
              validate-on-blur
              outlined
              :placeholder="$t('fabricOrderingBox.id.creatorOfOrder')"
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{  $t('fabricOrderingBox.id.createdTime') }}</div>
            <v-text-field
              v-model="accessoryDetail.createdTimeOfOrder"
              validate-on-blur
              :placeholder="$t('fabricOrderingBox.id.createdTime')"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            >
              <template #append>
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <div class="label">{{ $t('fabricOrderingBox.id.plannedAccessoryExpense') }}</div>
            <div class="d-flex align-center">
              <!-- <v-select
                v-model="expenseGroupId"
                :items="expenseGroup"
                item-value="id"
                item-text="name"
                append-icon="mdi-chevron-down"
                class="rounded-lg base rounded-l-lg rounded-r-0 mr-1"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                style="max-width: 200px"
                validate-on-blur
              /> -->
              <v-combobox
                v-model="expenseGroupId"
                :items="expenseGroup"
                :search-input.sync="expenseSearch"
                item-text="name"
                item-value="id"
                outlined
                height="44"
                class="rounded-lg base"
                hide-details
                :return-object="true"
                color="#544B99"
                dense
                append-icon="mdi-chevron-down"
              >
                <template #append>
                  <v-icon color="#544B99">mdi-magnify</v-icon>
                </template>
              </v-combobox>
              <v-text-field
                disabled
                v-model="expense.totalPrice"
                class="rounded-lg base rounded-l-0 rounded-r-0 mr-1"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="0.00"
                readonly
                validate-on-blur
              />
              <v-text-field
                disabled
                v-model="expense.currency"
                class="rounded-lg base rounded-l-0 rounded-r-lg"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('fabricOrderingBox.id.currency')"
                readonly
                validate-on-blur
              />
            </div>
          </v-col>
          <v-col cols="12" lg="6" md="6" sm="6">
            <div class="label" v-if="!!modelImages[0]?.filePath">Photos of models</div>
            <div class="d-flex flex-wrap px-0">
              <v-col
                v-for="(image, idx) in modelImages.length === 0 ? 3 : modelImages"
                :key="idx"
                cols="12"
                lg="4"
                md="4"
                v-if="!!modelImages[idx]?.filePath"
              >
                <div class="image-box" style="min-height: 132px">
                  <v-img
                    :src="modelImages[idx]?.filePath"
                    v-if="!!modelImages[idx]?.filePath"
                    max-height="150"
                    contain
                    class="pointer"
                    @click="showImage(modelImages[idx]?.filePath)"
                  />
                  <v-img src="/default-image.svg" max-width="50" v-else />
                </div>
              </v-col>
            </div>
          </v-col>
          <v-col cols="12" lg="6" md="6" sm="6" class="d-flex justify-end align-end">
            <v-btn
              dark
              elevation="0"
              class="rounded-lg text-capitalize"
              color="#544B99"
              @click="saveBtn"
              width="130"
              height="44"
            >
            {{ $t('fabricOrderingBox.id.save') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="py-6">
        <v-spacer />
          <ShowBtnComponent
            :click-btn="clickBtn"
            :show_btn_value="show_btn"
          />
        <v-spacer/>
      </v-card-actions>
    </v-card>
    <v-card class="elevation-0 rounded-lg mt-5">
      <v-tabs color="#544B99" v-model="accessory_tab">
        <v-tabs-slider color="#544B99" />
        <v-tab
          class="text-capitalize"
          v-for="item in items"
          :key="item"
          color=""
        >
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="accessory_tab">
        <v-tab-item>
          <AccessoryChartPages />
        </v-tab-item>
        <v-tab-item>
          <AccessoryOrderPages />
        </v-tab-item>
        <v-tab-item>
          <AccessoryDocumentsPages />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-dialog max-width="590" v-model="image_dialog">
      <v-card>
        <v-card-title class="d-flex">
          <v-spacer />
          <v-btn icon color="#544B99" large @click="image_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-img :src="currentImage" height="500" contain />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import AccessoryChartPages from "../../components/PlanningAccessory/AccessoryChart.vue";
import AccessoryOrderPages from "../../components/PlanningAccessory/AccessoryOrder.vue";
import AccessoryDocumentsPages from "../../components/PlanningAccessory/AccessorDocuments.vue";
import ShowBtnComponent from "../../components/ShowComponentBtn/ShowBtn.vue";

export default {
  components: {
    ShowBtnComponent,
    AccessoryDocumentsPages,
    AccessoryOrderPages,
    AccessoryChartPages,
    Breadcrumbs,
  },
  data() {
    return {
      show_btn: true,
      accessoryDetail: {
        modelId: null,
        orderId: null,
        exRatePrimaryCurrency: "",
        exRatePrimaryRate: null,
        exRateSecondaryCurrency: "",
        exRateSecondaryRate: null,
        orderNumber: "",
        modelNumber: "",
        modelName: "",
        headOfProductionDepartment: "",
        exRatePreFinancedDay: "",
        exRatePreFinancedDayCurrency: "",
        clientName: "",
        orderStatus: "",
        orderDeadline: "",
        shippingDate: "",
        creatorOfModel: "",
        createdTimeOfModel: "",
        creatorOfOrder: "",
        createdTimeOfOrder: "",
      },
      handleDiffirence: null,
      modelSearch:"",
      title: "Add",
      search: "",
      accessory_tab: null,
      items: [
        this.$t('fabricOrderingBox.id.accessoryPlanningChart'),
         this.$t('fabricOrderingBox.id.accessoryPlannedOrder'),
        this.$t('prefinances.child.documents'),
      ],
      fields_status: true,
      currency_enums: ["USD", "UZS", "RUB"],
      map_links: [
        {
          text: "Home",
          disabled: false,
          to: "/",
          icon: true,
        },
        {
          text: "Accessory",
          disabled: false,
          to: "/accessory",
          icon: true,
        },
        {
          text: "add models",
          disabled: true,
          to: "/orders/7",
          icon: false,
        },
      ],
      image_dialog: false,
      currentImage: "",
      expenseGroupId:null,
      expense:{},
      expenseSearch:"",
    };
  },

  created(){
    this.getModelName("")
  },

  computed: {
    showObject(){
      return{
        show_active: this.show_btn
      }
    },
    ...mapGetters({
      modelList: "orders/modelList",
      modelData: "preFinance/modelData",
      accessoryData: "accessory/accessoryData",
      modelImages: "modelPhoto/modelImages",
      OneData: "accessory/oneData",
      expenseForProduction: "expenseGroup/expenseForProduction",
      expenseGroup: "expenseGroup/expenseGroup",
    }),
  },
  watch: {
    expenseSearch(val){
      this.filterExpenseGroup({id:"",name:val,createdAt:"",updateAt:""})
    },
    expenseGroupId(val){
      this.getExpenseProduction({groupId:val?.id,modelId:this.accessoryDetail.modelId})
    },
    expenseForProduction(val){
      this.expense=JSON.parse(JSON.stringify(val))
    },
    modelSearch(val){
      this.getModelName(val);
    },
    search(elem) {
      if (!(typeof elem === null || typeof elem === "object")) {
        this.getModelName(elem);
      }
    },
    async "accessoryDetail.modelNumber"(val) {
      if (typeof val !== null && !!Object.keys(val).length && typeof val ==='object') {
        const id = val?.id;
        await this.getModelOrderInfo(id);
        if (id !== null && id !== undefined) {
          await this.getImages(id);
        }
      }
    },



    accessoryData(item) {
      this.accessoryDetail = JSON.parse(JSON.stringify(item));
    },

    OneData(val) {
      this.getImages(val.modelId);
      this.accessoryDetail = JSON.parse(JSON.stringify(val));
    },
  },

  methods: {
    ...mapActions({
      getModelName: "preFinance/getModelName",
      getModelOrderInfo: "accessory/getModelOrderInfo",
      getImages: "modelPhoto/getImages",
      createPlanningAccessory: "accessory/createPlanningAccessory",
      updatePlanningAccessory: "accessory/updatePlanningAccessory",
      getOneAccessory: "accessory/getOneAccessory",
      filterExpenseGroup: "expenseGroup/filterExpenseGroup",
      getExpenseProduction: "expenseGroup/getExpenseProduction",
    }),
    clickBtn(){
      this.show_btn = !this.show_btn
    },
    async saveBtn() {
      if (this.title === "Add") {
        await this.createPlanningAccessory({

          modelId: this.accessoryDetail.modelId,
          orderId: this.accessoryDetail.orderId,
        });
        this.$store.commit("accessoryChart/setSelectedAccessory",this.accessoryDetail)
      } else if (this.title === "Edit") {
        await this.updatePlanningAccessory({

          id: this.$route.params.id,
          modelId: this.accessoryDetail.modelId,
          orderId: this.accessoryDetail.orderId,
        });
      }
    },

    showImage(image) {
      this.currentImage = image;
      this.image_dialog = true;
    },
  },

  async mounted() {
    this.filterExpenseGroup({id:"",name:"",createdAt:"",updateAt:""})
    const param = this.$route.params.id;
    if (param !== "create") {
      this.title = "Edit";
      await this.getOneAccessory({ id: param });
    }

    this.$store.commit("modelPhoto/setModelImages", []);
  },
};
</script>

<style lang="scss">
.image-box {
  background: #f8f4fe;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 158px;
  min-height: 132px;
}
.show_active{
  height: 0;
  overflow: hidden;
}
</style>
