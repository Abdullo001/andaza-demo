<template>
  <div>
    <Breadcrumbs :maps="map_links" />
    <v-card elevation="0">
      <v-card-title>
        <div>Add Orders</div>
        <v-spacer />
        <div>
          <v-btn
            outlined
            elevation="0"
            color="#777C85"
            class="text-capitalize rounded-lg mr-4"
            @click="clearOrder"
          >
            <v-img src="/trash.svg" class="mr-1" />
            Clear
          </v-btn>
          <v-btn
            outlined
            elevation="0"
            class="text-capitalize rounded-lg"
            color="#777C85"
            @click="editOrder"
          >
            <v-img
              :src="fields_status ? '/edit.svg' : '/edit-active.svg'"
              class="mr-1"
            />
            Edit
          </v-btn>
        </div>
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-4">
        <v-row>
          <v-col>
            <div class="mb-2 text-body-1">Order number</div>
            <v-text-field
              v-model="order.number"
              label="Enter order number"
              single-line
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
            />
            <div class="mb-2 black--text text-body-1">Permission</div>
            <v-chip color="#10BF41" dark class="font-weight-bold">Edit</v-chip>
          </v-col>
          <v-col>

            <div class="mb-2 text-body-1">Client name</div>
            <v-text-field
              v-model="order.clientName"
              label="Client name"
              single-line
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
            />
            <div class="mb-2 text-body-1">Given Price</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="order.givenPrice.amount"
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
                v-model="order.givenPrice.currency"
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
            
            <div class="mb-2 text-body-1">Model number</div>
            <v-text-field
              v-model="order.clientName"
              label="Enter model number"
              single-line
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
            />
            <div class="mb-2 text-body-1">Total</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="order.totalPrice.amount"
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
                v-model="order.totalPrice.currency"
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
            
            <div class="mb-2 text-body-1">Model name</div>
            <v-text-field
              v-model="order.modelName"
              label="Enter model name"
              single-line
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
            />

            <div class="mb-2 text-body-1">Deadline</div>
            <el-date-picker
              v-model="order.deadline"
              type="datetime"
              placeholder="dd.MM.yyyy HH:mm:ss"
              :picker-options="pickerOptions"
              value-format="dd.MM.yyyy HH:mm:ss"
              style="min-width: 100%"
              class="picker-color"
            >
            </el-date-picker>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <div class="mb-2 text-body-1">Description</div>
            <v-textarea
              v-model="order.description"
              label="Enter description"
              single-line
              outlined validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-6 pr-4">
        <v-spacer />
        <v-btn
          color="#7631FF"
          class="text-capitalize rounded-lg"
          width="130"
          height="44"
          dark
          @click="saveOrder"
          >save</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Breadcrumbs from "../../components/Breadcrumbs.vue";
export default {
  components: {
    Breadcrumbs,
  },

  data() {
    return {
      currency_enums: ["USD", "UZS", "RUB"],
      fields_status: true,
      map_links: [
        {
          text: "Home",
          disabled: false,
          to: "/",
          icon: true,
        },
        {
          text: "Orders",
          disabled: false,
          to: "/orders",
          icon: true,
        },
        {
          text: "add orders",
          disabled: true,
          to: "/orders/7",
          icon: false,
        },
      ],
      order: {
        number: "",
        clientName: "",
        modelNumber: "",
        modelName: "",
        givenPrice: {
          amount: "",
          currency: "USD",
        },
        totalPrice: {
          amount: "",
          currency: "USD",
        },
        deadline: "",
        description:"",
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

  methods: {
    editOrder() {},

    clearOrder() {},

    saveOrder() {},
  },
};
</script>

<style lang="scss" scoped>
.el-date-editor--datetime {
  width: 100%;
}
</style>
