<template>
  <div>
    <Breadcrumbs :maps="map_links" />
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>
          Accessory
          <v-chip color="#10BF41" dark class="ml-5 font-weight-bold">
            {{ title }}
          </v-chip>
        </div>
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-4">
        <v-row>
          <v-col>
            <div class="label">Order number</div>
            <v-text-field
              v-model="accessoryDetail.orderNumber"
              placeholder="Search by order number"
              validate-on-blur
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              :return-object="true"
              disabled
              color="#7631FF"
            >
            </v-text-field>
            <div class="label">Client name</div>
            <v-text-field
              v-model="accessoryDetail.clientName"
              validate-on-blur
              outlined
              hide-details
              height="44"
              dense
              placeholder="Enter client name"
              class="rounded-lg base mb-4"
              disabled
              color="#7631FF"
            >
            </v-text-field>
            <div class="label">Ex.rate in planning created day</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="accessoryDetail.exRatePrimaryRate"
                :rules="[formRules.onlyNumber]"
                placeholder="0.00"
                validate-on-blur
                outlined
                hide-details
                height="44"
                dense
                class="rounded-l-lg rounded-r-0 rounded-lg base mb-4"
                color="#7631FF"
              />
              <v-select
                v-model="accessoryDetail.exRatePrimaryCurrency"
                :items="currency_enums"
                style="max-width: 100px"
                outlined
                hide-details
                height="44"
                dense
                validate-on-blur
                class="rounded-r-lg rounded-l-0 rounded-lg base mb-4"
                append-icon="mdi-chevron-down"
                color="#7631FF"
              />
            </div>
            <div class="label">Creator of planning</div>
            <v-text-field
              v-model="accessoryDetail.creatorOfPlanning"
              validate-on-blur
              outlined
              hide-details
              placeholder="Enter Creator of planning"
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#7631FF"
            />
            <div class="label">Creator of order</div>
            <v-text-field
              v-model="accessoryDetail.creatorOfOrder"
              validate-on-blur
              outlined
              placeholder="Enter Creator of order"
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#7631FF"
            />
          </v-col>
          <v-col>
            <div class="label">Model number</div>
            <v-combobox
              :items="modelData"
              v-model="accessoryDetail.modelNumber"
              placeholder="Search by model number"
              validate-on-blur
              item-text="modelNumber"
              item-value="id"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              :search-input.sync="search"
              color="#7631FF"
              append-icon=""
            >
              <template #append>
                <v-icon color="#7631FF">mdi-magnify</v-icon>
              </template>
            </v-combobox>
            <div class="label">Order status</div>
            <v-text-field
              v-model="accessoryDetail.orderStatus"
              validate-on-blur
              placeholder="Enter Order status"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#7631FF"
            />
            <div class="label">Ex.rate in planning created day</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="accessoryDetail.exRateSecondaryRate"
                :rules="[formRules.onlyNumber]"
                placeholder="0.00"
                validate-on-blur
                outlined
                hide-details
                height="44"
                dense
                class="rounded-l-lg rounded-r-0 rounded-lg base mb-4"
                color="#7631FF"
              />
              <v-select
                v-model="accessoryDetail.exRateSecondaryCurrency"
                :items="['UZS']"
                style="max-width: 100px"
                outlined
                hide-details
                height="44"
                dense
                validate-on-blur
                class="rounded-r-lg rounded-l-0 rounded-lg base mb-4"
                append-icon="mdi-chevron-down"
                color="#7631FF"
              />
            </div>
            <div class="label">Created time</div>
            <v-text-field
              v-model="accessoryDetail.createdTimeOfModel"
              validate-on-blur
              placeholder="Enter Created time"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#7631FF"
            >
              <template #append>
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>
            <div class="label">Created time</div>
            <v-text-field
              v-model="accessoryDetail.createdTimeOfOrder"
              validate-on-blur
              placeholder="Enter Created time"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#7631FF"
            >
              <template #append>
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>
          </v-col>
          <v-col>
            <div class="label">Model name</div>
            <v-text-field
              v-model="accessoryDetail.modelName"
              validate-on-blur
              placeholder="Enter Model name"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#7631FF"
            />

            <div class="label">Deadline of order</div>
            <v-text-field
              v-model="accessoryDetail.orderDeadline"
              validate-on-blur
              placeholder="Enter Deadline of order"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#7631FF"
            >
              <template #append>
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>
            <div class="label">Exchange rate in prefinanced day</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="accessoryDetail.exRatePreFinancedDay"
                :rules="[formRules.onlyNumber]"
                placeholder="0.00"
                disabled
                outlined
                hide-details
                height="44"
                dense
                validate-on-blur
                class="rounded-l-lg rounded-r-0 rounded-lg base mb-4"
                color="#7631FF"
              />
              <v-select
                v-model="accessoryDetail.exRatePreFinancedDayCurrency"
                :items="currency_enums"
                style="max-width: 100px"
                disabled
                outlined
                hide-details
                height="44"
                dense
                validate-on-blur
                class="rounded-r-lg rounded-l-0 rounded-lg base mb-4"
                append-icon="mdi-chevron-down"
                color="#7631FF"
              />
            </div>
            <div class="label">Creator of model</div>
            <v-text-field
              v-model="accessoryDetail.creatorOfModel"
              validate-on-blur
              placeholder="Enter Creator of model"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#7631FF"
            />
          </v-col>
          <v-col>
            <div class="label">Head of production department</div>
            <v-text-field
              v-model="accessoryDetail.headOfProductionDepartment"
              validate-on-blur
              placeholder="Enter Head of production department"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#7631FF"
            />
            <div class="label">Actual shipping date</div>
            <v-text-field
              v-model="accessoryDetail.shippingDate"
              validate-on-blur
              placeholder="Enter Actual shipping date"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#7631FF"
            >
              <template #append>
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>
            <div class="label">Exchange rate difference</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="accessoryDetail.differenceRate"
                :rules="[formRules.onlyNumber]"
                :background-color="
                  accessoryDetail.differenceRate >= 0 ? 'green' : 'red'
                "
                placeholder="0.00"
                disabled
                outlined
                hide-details
                height="44"
                dense
                validate-on-blur
                class="rounded-l-lg rounded-r-0 rounded-lg base mb-4"
                color="#7631FF"
                dark
              />
              <v-select
                v-model="accessoryDetail.differenceCurrency"
                :items="currency_enums"
                :background-color="
                  accessoryDetail.differenceRate >= 0 ? 'green' : 'red'
                "
                style="max-width: 100px"
                disabled
                outlined
                hide-details
                height="44"
                dense
                validate-on-blur
                class="rounded-r-lg rounded-l-0 base rounded-lg mb-4"
                color="#7631FF"
                append-icon="mdi-chevron-down"
                dark
              />
            </div>
            <div class="label">Created time</div>
            <v-text-field
              v-model="accessoryDetail.createdTimeOfModel"
              validate-on-blur
              placeholder="Enter Created time"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#7631FF"
            >
              <template #append>
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <div class="label">Photos of models</div>
        <v-row>
          <v-col
            v-for="(image, idx) in modelImages.length === 0 ? 3 : modelImages"
            :key="idx"
            cols="12"
            lg="3"
            md="3"
          >
            <div class="image-box">
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
        </v-row>
      </v-card-text>
      <v-card-actions class="pa-3">
        <v-spacer />
        <v-btn
          dark
          elevation="0"
          class="rounded-lg text-capitalize"
          color="#7631FF"
          @click="saveBtn"
          width="130"
          height="44"
        >
          save
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="elevation-0 rounded-lg mt-5">
      <v-tabs color="#7631FF" v-model="accessory_tab">
        <v-tabs-slider color="#7631FF" />
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
          <AccessorySupplyPages />
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
          <v-btn icon color="#7631FF" large @click="image_dialog = false">
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
import AccessorySupplyPages from "../../components/PlanningAccessory/AccessorySupply.vue";
import AccessoryDocumentsPages from "../../components/PlanningAccessory/AccessorDocuments.vue";

export default {
  components: {
    AccessoryDocumentsPages,
    AccessorySupplyPages,
    AccessoryOrderPages,
    AccessoryChartPages,
    Breadcrumbs,
  },
  data() {
    return {
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

      title: "Add",
      search: "",
      accessory_tab: null,
      items: [
        "Accessory planning chart",
        "Planned accessory order",
        "Supply accessory",
        "Documentation",
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
    };
  },

  computed: {
    ...mapGetters({
      modelData: "accessory/modelData",
      accessoryData: "accessory/accessoryData",
      modelImages: "modelPhoto/modelImages",
      OneData: "accessory/oneData",
    }),
  },

  watch: {
    search(elem) {
      if (!(typeof elem === null || typeof elem === "object")) {
        this.getModelName(elem);
      }
    },
    async "accessoryDetail.modelNumber"(val) {
      if (typeof val !== null || !!Object.keys(val).length) {
        const id = val?.id;
        await this.getModelOrderInfo(id);
        if (id !== null && id !== undefined) {
          await this.getImages(id);
        }
      }
    },

    "accessoryDetail.exRateSecondaryRate"(val) {
      if (typeof this.accessoryDetail.exRateSecondaryRate !== undefined) {
        this.accessoryDetail.differenceRate =
          val - this.accessoryDetail.exRatePreFinancedDay;
      }

      this.accessoryDetail.differenceRate = this.accessoryDetail.differenceRate
        ? this.accessoryDetail.differenceRate
        : 0;
    },

    accessoryData(item) {
      this.accessoryDetail = JSON.parse(JSON.stringify(item));
      console.log(item);
    },

    OneData(val) {
      this.getImages(val.modelId);
      this.accessoryDetail = JSON.parse(JSON.stringify(val));
    },
  },

  methods: {
    ...mapActions({
      getModelOrderInfo: "accessory/getModelOrderInfo",
      getModelName: "accessory/getModelName",
      getImages: "modelPhoto/getImages",
      createPlanningAccessory: "accessory/createPlanningAccessory",
      updatePlanningAccessory: "accessory/updatePlanningAccessory",
      getOneAccessory: "accessory/getOneAccessory",
    }),
    async saveBtn() {
      if (this.title === "Add") {
        this.createPlanningAccessory({
          exRatePrimaryCurrency: this.accessoryDetail.exRatePrimaryCurrency,
          exRatePrimaryRate: this.accessoryDetail.exRatePrimaryRate,
          exRateSecondaryCurrency: this.accessoryDetail.exRateSecondaryCurrency,
          exRateSecondaryRate: this.accessoryDetail.exRateSecondaryRate,
          modelId: this.accessoryDetail.modelId,
          orderId: this.accessoryDetail.orderId,
        });
      } else if (this.title === "Edit") {
        await this.updatePlanningAccessory({
          exRatePrimaryCurrency: this.accessoryDetail.exRatePrimaryCurrency,
          exRatePrimaryRate: this.accessoryDetail.exRatePrimaryRate,
          exRateSecondaryCurrency: this.accessoryDetail.exRateSecondaryCurrency,
          exRateSecondaryRate: this.accessoryDetail.exRateSecondaryRate,
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
    const param = this.$route.params.id;
    if (param !== "create") {
      this.title = "Edit";
      this.getOneAccessory({ id: param });
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
  min-width: 100%;
  min-height: 90%;
}
</style>
