<template>
  <div>
    <v-row>
      <v-col>
        <div class="mb-2 text-body-1 font-weight-medium">
          Actual shipping date
        </div>
        <el-date-picker
          v-model="shippingInfo.actualShippingDate"
          type="datetime"
          placeholder="dd.MM.yyyy HH:mm:ss"
          :picker-options="pickerOptions"
          value-format="dd.MM.yyyy HH:mm:ss"
          style="min-width: 100%"
          class="el-date-picker mb-8"
        >
        </el-date-picker>

        <div class="mb-2 text-body-1">Surplus products quantity</div>
        <div class="d-flex align-center">
          <v-text-field
            v-model="shippingInfo.surplusProductsQuantity"
            :rules="[formRules.onlyNumber]"
            placeholder="0"
            outlined
            validate-on-blur
            dense
            class="rounded-l-lg rounded-r-0"
            color="#7631FF"
          />
          <v-select
            :items="measurementUnitList"
            v-model="shippingInfo.quantityUnityId"
            item-value="id"
            item-text="name"
            style="max-width: 100px"
            dense
            outlined
            validate-on-blur
            class="rounded-r-lg rounded-l-0"
            append-icon="mdi-chevron-down"
            color="#7631FF"
          />
        </div>
      </v-col>

      <v-col>
        <div class="mb-2 text-body-1 font-weight-medium">
          Order closing date
        </div>
        <el-date-picker
          v-model="shippingInfo.orderClosingDate"
          type="datetime"
          placeholder="dd.MM.yyyy HH:mm:ss"
          :picker-options="pickerOptions"
          value-format="dd.MM.yyyy HH:mm:ss"
          style="min-width: 100%"
          class="el-date-picker mb-8"
        >
        </el-date-picker>

        <div class="mb-2 text-body-1">Sold price of surplus products</div>
        <div class="d-flex align-center">
          <v-text-field
            v-model="shippingInfo.soldPriceOfSurplusProducts"
            :rules="[formRules.onlyNumber]"
            placeholder="0"
            outlined
            validate-on-blur
            dense
            class="rounded-l-lg rounded-r-0"
            color="#7631FF"
          />
          <v-select
            :items="currency_enums"
            v-model="shippingInfo.soldPriceOfSurplusProductsCurrency"
            style="max-width: 100px"
            dense
            outlined
            validate-on-blur
            class="rounded-r-lg rounded-l-0"
            append-icon="mdi-chevron-down"
            color="#7631FF"
          />
        </div>
      </v-col>

      <v-col>
        <div class="mb-2 text-body-1">Actual shipping order quantity</div>
        <div class="d-flex align-center mb-1-5">
          <v-text-field
            v-model="shippingInfo.actualShippingOrderQuantity"
            :rules="[formRules.onlyNumber]"
            placeholder="0.00"
            outlined
            validate-on-blur
            dense
            class="rounded-l-lg rounded-r-0"
            color="#7631FF"
          />
          <v-select
            :items="measurementUnitList"
            v-model="shippingInfo.quantityUnityId"
            item-value="id"
            item-text="name"
            style="max-width: 100px"
            dense
            outlined
            validate-on-blur
            class="rounded-r-lg rounded-l-0"
            append-icon="mdi-chevron-down"
            color="#7631FF"
          />
        </div>

        <div class="mb-2 text-body-1">Total</div>
        <div class="d-flex align-center">
          <v-text-field
            v-model="shippingInfo.total"
            :rules="[formRules.onlyNumber]"
            placeholder="0.00"
            outlined
            validate-on-blur
            dense
            class="rounded-l-lg rounded-r-0"
            color="#7631FF"
            readonly
          />
          <v-select
            :items="currency_enums"
            v-model="shippingInfo.soldPriceOfSurplusProductsCurrency"
            style="max-width: 100px"
            dense
            outlined
            validate-on-blur
            class="rounded-r-lg rounded-l-0"
            append-icon="mdi-chevron-down"
            color="#7631FF"
            readonly
          />
        </div>
      </v-col>

      <v-col>
        <div class="mb-2 text-body-1">Packaging size</div>
        <div class="d-flex align-center">
          <v-text-field
            v-model="shippingInfo.packagingSize"
            placeholder="0.00"
            outlined
            validate-on-blur
            dense
            class="rounded-l-lg rounded-r-0"
            color="#7631FF"
          />
          <v-select
            v-model="shippingInfo.packagingSizeUnityId"
            :items="measurementUnitList"
            item-value="id"
            item-text="name"
            style="max-width: 100px"
            dense
            outlined
            validate-on-blur
            class="rounded-r-lg rounded-l-0"
            append-icon="mdi-chevron-down"
            color="#7631FF"
          />
        </div>

        <div class="d-flex justify-end w-full mt-9">
          <v-btn
            color="#7631FF"
            class="text-capitalize rounded-lg"
            width="130"
            height="44"
            dark
            v-if="this.$route.params.id!==`add-order`"
            @click="setShippingInfo"
            >Save</v-btn
          >
          <v-btn
            color="#7631FF"
            class="text-capitalize rounded-lg"
            width="130"
            height="44"
            dark
            v-else
            @click="setNewShippingInfo"
            >Save</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ShippingInfo",

  data() {
    return {
      currency_enums: ["USD", "UZS", "RUB"],
      size_enums: [],
      id: this.$route.params.id,
      modelId: this.$route.query.modelId,
      shippingInfo: {
        actualShippingDate: "",
        orderClosingDate: "",
        actualShippingOrderQuantity: null,
        quantityUnityId: 1,
        packagingSize: null,
        packagingSizeUnityId: 1,
        surplusProductsQuantity: null,
        soldPriceOfSurplusProducts: null,
        soldPriceOfSurplusProductsCurrency: "USD",
      },

      pickerOptions: {
        shortcuts: [
          {
            text: "Cегодня",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "Вчера",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "Неделя",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },

  created() {
    this.getMeasurementUnit();
  },

  computed: {
    ...mapGetters({
      measurementUnitList: "shippingInfo/measurementUnitList",
      shippingInfoDetail: "shippingInfo/shippingInfoDetail",
    }),

  },

  watch: {
    shippingInfoDetail(item) {
      const value = this.shippingInfo;
      value.actualShippingDate = item.data.actualShippingDate;
      value.actualShippingOrderQuantity = item.data.actualShippingOrderQuantity;
      value.quantityUnityId = item.data.actualShippingUnitId;
      value.orderClosingDate = item.data.orderClosingDate;
      value.packagingSize = item.data.packagingSize;
      value.packagingSizeUnityId = item.data.packagingSizeUnitId;
      value.soldPriceOfSurplusProducts = item.data.soldPriceOfSurplusProduct;
      value.soldPriceOfSurplusProductsCurrency =
        item.data.soldPriceOfSurplusProductCurrency;
      value.surplusProductsQuantity = item.data.surplusProductQuantity;
      value.total = item.data.total;
    },
  },

  methods: {
    ...mapActions({
      getShippingInfo: "shippingInfo/getShippingInfo",
      getMeasurementUnit: "shippingInfo/getMeasurementUnit",
      createShippingInfo: "shippingInfo/createShippingInfo",
    }),

    async setShippingInfo() {
      this.createShippingInfo({
        ...this.shippingInfo,
        id: this.id,
        modelId: this.modelId,
      });
    },

    setNewShippingInfo() {
      this.createShippingInfo({
        ...this.shippingInfo,
        id: this.$store.getters["orders/newOrderId"],
        modelId: this.$store.getters["orders/newModelId"],
      });
    },
  },

  mounted() {
    const id = this.$route.params.id;
    const modelId = this.$route.query.modelId;
    if (id !== "add-order") {
      this.getShippingInfo({ id, modelId });
    }
  },
};
</script>
<style lang="scss" scoped>
.mb-1-5 {
  margin-bottom: 6px;
}
.el-date-editor--datetime {
  width: 100%;
}
</style>
