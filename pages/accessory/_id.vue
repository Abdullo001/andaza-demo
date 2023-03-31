<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>Accessory
          <v-chip color="#10BF41" dark class="ml-5 font-weight-bold">{{ title }}</v-chip>
        </div>
        <v-spacer/>
        <div>
          <v-btn
            outlined
            elevation="0"
            color="#777C85"
            class="text-capitalize rounded-lg mr-4"
          >
            <v-img src="/trash.svg" class="mr-1"/>
            Clear
          </v-btn>
          <v-btn
            outlined
            elevation="0"
            class="text-capitalize rounded-lg"
            color="#777C85"
          >
            <v-img
              :src="fields_status ? '/edit.svg' : '/edit-active.svg'"
              class="mr-1"
            />
            Edit
          </v-btn>
        </div>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-row>
          <v-col>
            <div class="mb-2 text-body-1">Order number</div>
            <v-text-field
              v-model="create_accessory.orderNumber"
              placeholder="Search by order number"
              validate-on-blur
              dense
              filled
              :return-object="true"
              disabled
              class="rounded-lg"
              color="#7631FF"
            >
            </v-text-field>
            <div class="mb-2 text-body-1">Client name</div>
            <v-text-field
              v-model="create_accessory.clientName"
              validate-on-blur
              dense
              filled
              disabled
              class="rounded-lg"
              color="#7631FF"
            >
            </v-text-field>
            <div class="mb-2 text-body-1">Ex.rate in planning created day</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="create_new_accessory.exRatePrimaryRate"
                :rules="[formRules.onlyNumber]"
                placeholder="0.00"
                validate-on-blur
                dense
                filled
                class="rounded-l-lg rounded-r-0"
                color="#7631FF"
              />
              <v-select
                v-model="create_new_accessory.exRatePrimaryCurrency"
                :items="currency_enums"
                style="max-width: 100px"
                dense
                filled
                validate-on-blur
                class="rounded-r-lg rounded-l-0"
                append-icon="mdi-chevron-down"
                color="#7631FF"
              />
            </div>
            <div class="mb-2 text-body-1">Creator of planning</div>
            <v-text-field
              v-model="create_accessory.creatorOfPlanning"
              validate-on-blur
              dense
              filled
              disabled
              class="rounded-lg"
              color="#7631FF"
            />
            <div class="mb-2 text-body-1">Creator of order</div>
            <v-text-field
              v-model="create_accessory.creatorOfOrder"
              validate-on-blur
              dense
              filled
              disabled
              class="rounded-lg"
              color="#7631FF"
            />
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Model number</div>
            <v-combobox
              :items="modelData"
              v-model="create_new_accessory.modelId"
              placeholder="Search by model number"
              validate-on-blur
              dense
              item-text="modelNumber"
              item-value="id"
              filled
              :search-input.sync="search"
              class="rounded-lg"
              color="#7631FF"
              append-icon=""
            >
              <template #append>
                <v-icon color="#7631FF">mdi-magnify</v-icon>
              </template>
            </v-combobox>
            <div class="mb-2 text-body-1">Order status</div>
            <v-text-field
              v-model="create_accessory.orderStatus"
              validate-on-blur
              dense
              filled
              disabled
              class="rounded-lg"
              color="#7631FF"
            />
            <div class="mb-2 text-body-1">Ex.rate in planning created day</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="create_new_accessory.exRateSecondaryRate"
                :rules="[formRules.onlyNumber]"
                placeholder="0.00"
                validate-on-blur
                dense
                filled
                class="rounded-l-lg rounded-r-0"
                color="#7631FF"
              />
              <v-select
                v-model="create_new_accessory.exRateSecondaryCurrency"
                :items="['UZS']"
                style="max-width: 100px"
                dense
                filled
                validate-on-blur
                class="rounded-r-lg rounded-l-0"
                append-icon="mdi-chevron-down"
                color="#7631FF"
              />
            </div>
            <div class="mb-2 text-body-1">Created time</div>
            <v-text-field
              v-model="create_accessory.createdTimeOfModel"
              validate-on-blur
              dense
              filled
              disabled
              class="rounded-lg"
              color="#7631FF"
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
            <div class="mb-2 text-body-1">Created time</div>
            <v-text-field
              v-model="create_accessory.createdTimeOfOrder"
              validate-on-blur
              dense
              filled
              disabled
              class="rounded-lg"
              color="#7631FF"
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>

            </v-text-field>
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Model name</div>
            <v-text-field
              v-model="create_accessory.modelName"
              validate-on-blur
              dense
              filled
              disabled
              class="rounded-lg"
              color="#7631FF"
            />

            <div class="mb-2 text-body-1">Deadline of order</div>
            <v-text-field
              v-model="create_accessory.orderDeadline"
              validate-on-blur
              dense
              filled
              disabled
              class="rounded-lg"
              color="#7631FF"
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
            <div class="mb-2 text-body-1">Exchange rate in prefinanced day</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="create_accessory.exRatePreFinancedDay"
                :rules="[formRules.onlyNumber]"
                placeholder="0.00"
                disabled
                filled
                validate-on-blur
                dense
                class="rounded-l-lg rounded-r-0"
                color="#7631FF"
              />
              <v-select
                v-model="create_accessory.exRatePreFinancedDayCurrency"
                :items="currency_enums"
                style="max-width: 100px"
                dense
                disabled
                filled
                validate-on-blur
                class="rounded-r-lg rounded-l-0"
                append-icon="mdi-chevron-down"
                color="#7631FF"
              />
            </div>
            <div class="mb-2 text-body-1">Creator of model</div>
            <v-text-field
              v-model="create_accessory.creatorOfModel"
              validate-on-blur
              dense
              filled
              disabled
              class="rounded-lg"
              color="#7631FF"
            />
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Head of production depatment</div>
            <v-text-field
              v-model="create_accessory.headOfProductionDepartment"
              validate-on-blur
              dense
              filled
              disabled
              class="rounded-lg"
              color="#7631FF"
            />
            <div class="mb-2 text-body-1">Actual shipping date</div>
            <v-text-field
              v-model="create_accessory.shippingDate"
              validate-on-blur
              dense
              filled
              disabled
              class="rounded-lg"
              color="#7631FF"
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
            <div class="mb-2 text-body-1">Exchange rate difference</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="create_accessory.differenceRate"
                :rules="[formRules.onlyNumber]"
                placeholder="0.00"
                disabled
                filled
                validate-on-blur
                dense
                class="rounded-l-lg rounded-r-0"
                color="#7631FF"
              />
              <v-select
                v-model="create_accessory.differenceCurrency"
                :items="currency_enums"
                style="max-width: 100px"
                dense
                disabled
                filled
                validate-on-blur
                class="rounded-r-lg rounded-l-0"
                append-icon="mdi-chevron-down"
                color="#7631FF"
              />
            </div>
            <div class="mb-2 text-body-1">Created time</div>
            <v-text-field
              v-model="create_accessory.createdTimeOfModel"
              validate-on-blur
              dense
              filled
              disabled
              class="rounded-lg"
              color="#7631FF"
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <div class="mb-2 text-body-1">Photos of models</div>
        <v-row>
          <v-col cols="12" lg="6" md="6" class="d-flex flex-wrap px-0" style="height: 200px">
            <v-col v-for="(image, idx) in modelImages.length === 0 ? 3 : modelImages" :key="idx" cols="12" lg="4" md="4">
              <div class="image-box">
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
        </v-row>
      </v-card-text>
      <v-card-actions class="pa-3">
        <v-spacer/>
        <v-btn
          dark
          elevation="0"
          class="rounded-lg text-capitalize"
          color="#7631FF"
          @click="saveBtn"
        >
          save
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="elevation-0 rounded-lg mt-5">
      <v-tabs
        color="#7631FF"
        v-model="accessory_tab"
      >
        <v-tabs-slider color="#7631FF"/>
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
          <AccessoryChartPages/>
        </v-tab-item>
        <v-tab-item>
          <AccessoryOrderPages/>
        </v-tab-item>
        <v-tab-item>
          <AccessorySupplyPages/>
        </v-tab-item>
        <v-tab-item>
          <AccessorDocumentsPages/>
        </v-tab-item>
      </v-tabs-items>
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
  </div>
</template>

<script>
import AccessoryChartPages from "@/components/PlanningAccessory/AccessoryChart.vue";
import AccessoryOrderPages from "@/components/PlanningAccessory/AccessoryOrder.vue";
import AccessorySupplyPages from "@/components/PlanningAccessory/AccessorySupply.vue";
import AccessorDocumentsPages from "@/components/PlanningAccessory/AccessorDocuments.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {AccessorDocumentsPages, AccessorySupplyPages, AccessoryOrderPages, AccessoryChartPages},
  data() {
    return {
      create_new_accessory:{
        modelId: null,
        orderId: null,
        exRatePrimaryCurrency: "",
        exRatePrimaryRate: "",
        exRateSecondaryCurrency: "",
        exRateSecondaryRate: "",
      },
      create_accessory: {
        orderId: null,
        modelId: null,
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
        createdTimeOfOrder: ""
      },
      title: 'Add',
      search: "",
      accessory_tab: null,
      items: ["Accessory planning chart", "Planned accessory order", "Supply accessory", "Documentation"],
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
    };
  },
  watch: {
    search(elem) {
      if (!(typeof elem === null || typeof elem === 'object')) {
        this.getModelName(elem)
      }
    },
    async "create_new_accessory.modelId"(val) {
      if (typeof val !== null || !!Object.keys(val).length) {
        const id = val?.id;
        await this.getModelOrderInfo(id);
        if (id !== null && id !== undefined){
          await this.getImages(id);
          this.$store.commit('fabric/setModelId', val.modelId)
        }
      }
    },
    accessoryData(value) {
      this.create_accessory = JSON.parse(JSON.stringify(value));
    },
  },
  computed: {
    ...mapGetters({
      modelData: "accessory/modelData",
      accessoryData: "accessory/accessoryData",
      modelImages: "modelPhoto/modelImages",
    })
  },
  methods: {
    ...mapActions({
      getModelOrderInfo: "accessory/getModelOrderInfo",
      getModelName: "accessory/getModelName",
      getImages: "modelPhoto/getImages",
      createPlanningAccessory: "accessory/createPlanningAccessory",
      updatePlanningAccessory: "accessory/updatePlanningAccessory",
    }),
    async saveBtn(){
        if  (this.title === "Add"){
          if  (this.create_accessory.orderId !== null && this.create_new_accessory.modelId !== null){
            const item = {...this.create_new_accessory};
            item.orderId = this.create_accessory.orderId;
            item.modelId = item.modelId.id;
            await this.createPlanningAccessory(item);
          }
        }
        else if (this.title === "Edit"){
          const id = this.$route.params.id;
          const item = {...this.create_new_accessory};
          item.orderId = this.create_accessory.orderId;
          item.modelId = item.modelId.id;
          item.id = Number(id);
          await this.updatePlanningAccessory(item)
        }
    },
    showImage(image) {
      this.currentImage = image;
      this.image_dialog = true;
    },
  },
  async mounted() {
    const param = this.$route.params.id;
    if (param !== "create") {
      this.title = 'Edit';
      await this.$store.dispatch("accessory/getModelOrderInfo", param);
      this.create_new_accessory.modelId = {
        id: this.create_accessory.id,
        modelNumber: this.create_accessory.modelNumber,
      }
    }

    this.$store.commit('modelPhoto/setModelImages', [])
  }
};
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
</style>
