<template>
  <div>
    <Breadcrumbs :maps="map_links" />
    <v-card elevation="0">
      <v-card-title>
        <div>{{ orderStatus }} Orders</div>
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
              v-model="order.orderNumber"
              placeholder="Enter order number"
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
            />
            <div class="mb-2 text-body-1">Head of production depatment</div>
            <v-text-field
              v-model="order.headOfDepartment"
              placeholder="Head of production depatment"
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
              placeholder="Client name"
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
                placeholder="0.00"
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
                dense
                outlined
                validate-on-blur
                class="rounded-r-lg rounded-l-0"
                append-icon="mdi-chevron-down"
                color="#7631FF"
                background-color="#F8F4FE"
              />
            </div>

            <div class="mb-2 text-body-1">Order priority</div>
            <v-select
              :background-color="statusColor.priorityColor(order.priority)"
              :items="priority"
              append-icon="mdi-chevron-down"
              v-model="order.priority"
              hide-details
              class="mt-n2"
              rounded
              dark
            />
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Model number</div>
            <v-text-field
              v-model="order.modelNumber"
              placeholder="Enter model number"
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
                placeholder="0.00"
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
              placeholder="Enter model name"
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
              placeholder="Enter description"
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
            />
          </v-col>

          <v-col cols="12" lg="3">
            <div class="mb-2 text-body-1">Creator</div>
            <v-text-field
              v-model="order.creator"
              placeholder="Enter creator"
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
              disabled
            />

            <div class="mb-2 text-body-1">Modified person</div>
            <v-text-field
              v-model="order.modifiedPerson"
              placeholder="Enter Modified person"
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
              disabled
            />
          </v-col>

          <v-col cols="12" lg="3">
            <div class="mb-2 text-body-1">Created time</div>
            <el-date-picker
              v-model="order.createdTime"
              type="datetime"
              placeholder="Created at"
              :picker-options="pickerOptions"
              value-format="dd.MM.yyyy HH:mm:ss"
              style="min-width: 100%"
              disabled
              class="picker-color mb-6"
            >
            </el-date-picker>
            <div class="mb-2 text-body-1">Updated time</div>
            <el-date-picker
              v-model="order.updatedTime"
              type="datetime"
              placeholder="Update at"
              :picker-options="pickerOptions"
              value-format="dd.MM.yyyy HH:mm:ss"
              style="min-width: 100%"
              disabled
              class="picker-color"
            >
            </el-date-picker>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-6 pr-4">
        <v-spacer />
        <v-btn
          v-if="orderStatus === 'Add'"
          color="#7631FF"
          class="text-capitalize rounded-lg"
          width="130"
          height="44"
          dark
          @click="createdNewOrder"
          >Save</v-btn
        >
        <v-btn
          v-else
          color="#7631FF"
          class="text-capitalize rounded-lg"
          width="130"
          height="44"
          dark
          @click="updateOrder"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>

    <v-card class="mt-6 mb-8" flat>
      <v-tabs v-model="tab">
        <v-tabs-slider color="#7631FF" />
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
              <v-card-text>
                <ColorSizeDistirbution />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <DetailInfo />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <Subcontracts />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <ShippingInfo />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Breadcrumbs,
  },

  data() {
    return {
      currency_enums: ["USD", "UZS", "RUB"],
      fields_status: true,
      tab: null,
      orderStatus: "Add",
      priority: ["LOW", "NORMAL", "HIGH"],
      items: [
        "Color/Size distirbution",
        "Detail info",
        "Subcontracts",
        "Shipping info",
        "Comment",
        "Documents",
      ],
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
        id: "",
        orderNumber: "",
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
        description: "",
        creator: "",
        headOfDepartment: "",
        modifiedPerson: "",
        createdTime: "",
        updatedTime: "",
        priority: "LOW",
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

  computed: {
    ...mapGetters({
      orderDetail: "orders/oneOrder",
      orderId: "detailInfo/orderId",
      modelId: "detailInfo/modelId",
    }),
  },

  watch: {
    orderDetail(ordersList) {
      ordersList.map((item) => {
        const order = this.order;
        order.id = item.id;
        order.modelId = item.modelId;
        order.clientName = item.client;
        order.createdTime = item.createdAt;
        order.creator = item.createdBy;
        order.deadline = item.deadLine;
        order.description = item.description;
        order.modelName = item.modelName;
        order.modelNumber = item.modelNumber;
        order.orderNumber = item.orderNumber;
        order.modifiedPerson = item.updatedBy;
        order.updatedTime = item.updatedAt;
        order.headOfDepartment = item.headOfProductionDepartment;
        order.givenPrice.amount = item.givenPrice;
        order.givenPrice.currency = item.givenPriceCurrency;
        const modelId = item.modelId;
        this.setModelId({ modelId });
      });
    },
  },

  methods: {
    ...mapActions({
      getOneOrder: "orders/getOneOrder",
      createdOrder: "orders/createdOrder",
    }),
    ...mapMutations({
      setOrderId: "detailInfo/setOrderId",
      setModelId: "detailInfo/setModelId",
    }),

    updateOrder() {},

    clearOrder() {},

    async createdNewOrder() {
      await this.createdOrder(this.order);
    },
  },

  mounted() {
    const id = this.$route.params.id;
    if (id !== "add-order") {
      this.getOneOrder({
        page: 0,
        size: 50,
        id,
      });
      this.orderStatus = "Edit";
      this.setOrderId({ id });
    } else {
      this.orderStatus = "Add";
      this.setOrderId("");
      this.setModelId("");
    }
  },
};
</script>

<style lang="scss" scoped>
.active-tab {
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #7631ff;
}

.el-date-editor--datetime {
  width: 100%;
}
</style>
