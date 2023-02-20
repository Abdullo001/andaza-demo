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
          class="picker-color mb-8"
        >
        </el-date-picker>

        <div class="mb-2 text-body-1">Surplus products quantity</div>
        <div class="d-flex align-center">
          <v-text-field
            v-model="shippingInfo.surplusProductsQuantity"
            :rules="[formRules.onlyNumber]"
            label="0"
            single-line
            outlined
            validate-on-blur
            dense
            class="rounded-l-lg rounded-r-0"
            color="#7631FF"
            background-color="#F8F4FE"
          />
          <v-select
            :items="quantity_enums"
            v-model="shippingInfo.surplusProductionUnity"
            style="max-width: 100px"
            single-line
            dense
            outlined
            validate-on-blur
            class="rounded-r-lg rounded-l-0"
            append-icon="mdi-chevron-down"
            color="#7631FF"
            background-color="#F8F4FE"
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
          class="picker-color mb-8"
        >
        </el-date-picker>

        <div class="mb-2 text-body-1">Sold price of surplus products</div>
        <div class="d-flex align-center">
          <v-text-field
            v-model="shippingInfo.soldPriceOfSurplusProducts"
            :rules="[formRules.onlyNumber]"
            label="0.00"
            single-line
            outlined
            validate-on-blur
            dense
            class="rounded-l-lg rounded-r-0"
            color="#7631FF"
            background-color="#F8F4FE"
          />
          <v-select
            :items="currency_enums"
            v-model="shippingInfo.soldPriceOfSurplusProductsCurrency"
            style="max-width: 100px"
            single-line
            dense
            outlined
            validate-on-blur
            class="rounded-r-lg rounded-l-0"
            append-icon="mdi-chevron-down"
            color="#7631FF"
            background-color="#F8F4FE"
          />
        </div>
      </v-col>

      <v-col>
        <div class="mb-2 text-body-1">Actual shipping order quantity</div>
        <div class="d-flex align-center mb-1-5">
          <v-text-field
            v-model="shippingInfo.actualShippingOrderQuantity"
            :rules="[formRules.onlyNumber]"
            label="0.00"
            single-line
            outlined
            validate-on-blur
            dense
            class="rounded-l-lg rounded-r-0"
            color="#7631FF"
            background-color="#F8F4FE"
          />
          <v-select
            :items="quantity_enums"
            v-model="shippingInfo.quantityUnity"
            style="max-width: 100px"
            single-line
            dense
            outlined
            validate-on-blur
            class="rounded-r-lg rounded-l-0"
            append-icon="mdi-chevron-down"
            color="#7631FF"
            background-color="#F8F4FE"
          />
        </div>

        <div class="mb-2 text-body-1">Total</div>
        <div class="d-flex align-center">
          <v-text-field
            v-model="shippingInfo.total"
            :rules="[formRules.onlyNumber]"
            label="0.00"
            single-line
            outlined
            validate-on-blur
            dense
            class="rounded-l-lg rounded-r-0"
            color="#7631FF"
            background-color="#F8F4FE"
          />
          <v-select
            :items="currency_enums"
            v-model="shippingInfo.totalUnity"
            style="max-width: 100px"
            single-line
            dense
            outlined
            validate-on-blur
            class="rounded-r-lg rounded-l-0"
            append-icon="mdi-chevron-down"
            color="#7631FF"
            background-color="#F8F4FE"
          />
        </div>
      </v-col>

      <v-col>
        <div class="mb-2 text-body-1">Packaging size</div>
        <div class="d-flex align-center">
          <v-text-field
            v-model="shippingInfo.packagingSize"
            :rules="[formRules.onlyNumber]"
            label="0.00"
            single-line
            outlined
            validate-on-blur
            dense
            class="rounded-l-lg rounded-r-0"
            color="#7631FF"
            background-color="#F8F4FE"
          />
          <v-select
            :items="size_enums"
            v-model="shippingInfo.packagingSizeUnity"
            style="max-width: 100px"
            single-line
            dense
            outlined
            validate-on-blur
            class="rounded-r-lg rounded-l-0"
            append-icon="mdi-chevron-down"
            color="#7631FF"
            background-color="#F8F4FE"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "ShippingInfo",

  data() {
    return {
      quantity_enums: ["PSC"],
      currency_enums: ["USD", "UZS", "RUB"],
      size_enums: ["M3"],

      shippingInfo: {
        actualShippingDate: "02.12.2022 10:19:31",
        orderClosingDate: "02.12.2022 10:19:31",
        actualShippingOrderQuantity: 1020,
        quantityUnity: "PSC",
        packagingSize: 2.3,
        packagingSizeUnity: "M3",
        surplusProductsQuantity: 200,
        surplusProductionUnity: "PSC",
        soldPriceOfSurplusProducts: 2.5,
        soldPriceOfSurplusProductsCurrency: "USD",
        total: 500,
        totalUnity: "USD",
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
};
</script>
<style lang="scss" scoped>
  .mb-1-5{
    margin-bottom: 6px;
  }
</style>
