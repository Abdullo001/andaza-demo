<template>
  <div>
    <Breadcrumbs :maps="map_links" />
    <v-card elevation="0">
      <v-card-title>
        <div>{{ orderStatus }} order</div>
        <v-spacer />
        <div>
          <v-btn
            outlined
            elevation="0"
            color="#777C85"
            class="text-capitalize rounded-lg mr-4"
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
              filled
              v-model="order.orderNumber"
              placeholder="Enter order number"
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
            />
            <div class="mb-2 text-body-1">Head of production depatment</div>

            <div class="search-field">
              <v-combobox
                v-model="order.headOfDepartmentId"
                :items="users"
                :search-input.sync="HODSearch"
                style="margin-bottom:22px"
                item-text="name"
                item-value="id"
                filled
                hide-details
                class="rounded-lg d-flex align-center justify-center"
                :return-object="true"
                color="#7631FF"
                dense
                placeholder="Enter responsible person"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#7631FF"
                    >mdi-magnify</v-icon
                  >
                </template>
              </v-combobox>
            </div>
            <div class="mb-2 black--text text-body-1">Permission</div>
            <v-chip color="#10BF41" dark class="font-weight-bold">Edit</v-chip>
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Client name</div>

            <v-combobox
              v-model="order.clientId"
              :items="clientList"
              :search-input.sync="clientIdSearch"
              style="margin-bottom:22px"

              item-text="name"
              item-value="id"
              filled
              hide-details
              class="rounded-lg d-flex align-center justify-center"
              :return-object="true"
              color="#7631FF"
              dense
              placeholder="Enter responsible person"
              prepend-icon=""
            >
              <template #append>
                <v-icon class="d-inline-block" color="#7631FF"
                  >mdi-magnify</v-icon
                >
              </template>
            </v-combobox>
            <div class="mb-2 text-body-1">Price with discount</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="order.priceWithDiscount"
                placeholder="0.00"
                filled
                validate-on-blur
                dense
                class="rounded-l-lg rounded-r-0"
                color="#7631FF"
              />
              <v-select
                :items="currency_enums"
                v-model="order.priceWithDiscountCurrency"
                style="max-width: 100px"
                dense
                filled
                validate-on-blur
                class="rounded-r-lg rounded-l-0"
                append-icon="mdi-chevron-down"
                color="#7631FF"
              />
            </div>
            <div class="mb-2 text-body-1">Order priority</div>
            <v-select
              :background-color="statusColor.priorityColor(order.priority)"
              :items="priority_enums"
              append-icon="mdi-chevron-down"
              v-model="order.priority"
              hide-details
              dense
              filled
              validate-on-blur
              class="rounded-lg"
              dark
            />
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Model number</div>

            <v-combobox
              v-model="order.modelId"
              @change="(e) => setModelName(e)"
              :items="modelList"
              :search-input.sync="modelIdSearch"
              style="margin-bottom:22px"

              item-text="modelNumber"
              item-value="id"
              filled
              hide-details
              class="rounded-lg d-flex align-center justify-center"
              :return-object="true"
              color="#7631FF"
              dense
              placeholder="Enter responsible person"
              prepend-icon=""
            >
              <template #append>
                <v-icon class="d-inline-block" color="#7631FF"
                  >mdi-magnify</v-icon
                >
              </template>
            </v-combobox>
            <div class="mb-2 text-body-1">Total</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="order.totalPrice.amount"
                :rules="[formRules.onlyNumber]"
                placeholder="0.00"
                filled
                validate-on-blur
                dense
                class="rounded-l-lg rounded-r-0"
                color="#7631FF"
              />
              <v-select
                :items="currency_enums"
                v-model="order.totalPrice.currency"
                style="max-width: 100px"
                dense
                filled
                validate-on-blur
                class="rounded-r-lg rounded-l-0"
                append-icon="mdi-chevron-down"
                color="#7631FF"
              />
            </div>
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Model name</div>
            <v-text-field
              v-model="selectedModelInfo.name"
              placeholder="Enter"
              filled
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              readonly
            />
            <div class="mb-2 text-body-1">Deadline</div>
            <div style="height: 40px !important">
              <el-date-picker
                v-model="order.deadline"
                type="datetime"
                placeholder="dd.MM.yyyy HH:mm:ss"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
                class="custom-picker-2"
              >
              </el-date-picker>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <div class="mb-2 text-body-1">Description</div>
            <v-textarea
              v-model="order.description"
              placeholder="Enter description"
              filled
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="mb-2 text-body-1">Creator</div>
            <v-text-field
              v-model="order.creator"
              placeholder="Enter creator"
              filled
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
              readonly
            />
            <div class="mb-2 text-body-1">Modified person</div>
            <v-text-field
              v-model="order.modifiedPerson"
              placeholder="Enter Modified person"
              filled
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
              readonly
            />
          </v-col>

          <v-col cols="12" lg="3">
            <div class="mb-2 text-body-1">Created time</div>
            <v-text-field
              v-model="order.createdTime"
              placeholder="Created at"
              filled
              validate-on-blur
              dense
              disabled
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
              readonly
            >
              <template #append>
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>

            <div class="mb-2 text-body-1">Updated time</div>
            <v-text-field
              v-model="order.updatedTime"
              placeholder="Update at"
              filled
              validate-on-blur
              dense
              disabled
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
              readonly
            >
              <template #append>
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>
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
        >
          Save
        </v-btn>
        <v-btn
          v-else
          color="#7631FF"
          class="text-capitalize rounded-lg"
          width="130"
          height="44"
          dark
          @click="updateOrderFunc"
        >
          Save
        </v-btn>
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
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <OrderDocuments />
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
      users: [],
      fields_status: true,
      tab: null,
      orderStatus: "Add",
      HODSearch: "",
      clientIdSearch: "",
      modelIdSearch: "",
      priority_enums: ["LOW", "MEDIUM", "HIGH"],
      items: [
        "Color/Size distirbution",
        "Detail info",
        "Subcontracts",
        "Shipping info",
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
        clientId: null,
        modelNumber: "",
        modelName: "",
        priceWithDiscount: null,
        priceWithDiscountCurrency: "",

        totalPrice: {
          amount: "",
          currency: "",
        },
        deadline: "",
        description: "",
        creator: "",
        headOfDepartmentId: null,
        modifiedPerson: "",
        createdTime: "",
        updatedTime: "",
        priority: this.$route.params.id !== "add-order" ? "" : "LOW",
        modelId: null,
      },

      selectedModelInfo: {},
      modelInfo: {},
      saveOrder: false,
    };
  },
  created() {
    this.getUsersList();
    this.getClient();
    this.getModelId();
  },
  computed: {
    ...mapGetters({
      orderDetail: "orders/oneOrder",
      modelId: "orders/modelId",
      usersList: "orders/usersList",
      clientList: "orders/clientList",
      modelList: "orders/modelList",
      infoToOrder: "orders/infoToOrder",
    }),
  },
  watch: {
    orderDetail(item) {
      const order = this.order;
      order.id = item.id;
      order.modelId = item.modelId;
      order.clientId = item.clientId;
      order.createdTime = item.createdAt;
      order.creator = item.createdBy;
      order.deadline = item.deadLine;
      order.description = item.description;
      order.modelName = item.modelName;
      order.modelNumber = item.modelNumber;
      order.orderNumber = item.orderNumber;
      order.modifiedPerson = item.updatedBy;
      order.updatedTime = item.updatedAt;
      order.headOfDepartmentId = item.headOfProductionDepartmentId;
      order.priceWithDiscount = item.priceWithDiscount;
      order.priceWithDiscountCurrency = item.priceWithDiscountCurrency;
      order.modelId = item.modelId;
      order.priority = item.priority;
      const modelId = item.modelId;
      this.setModelId({ modelId });
    },
    usersList(list) {
      list.map((item) => {
        this.users.push({
          id: item.id,
          name: `${item.firstName} ${item.lastName}`,
        });
      });
    },

    infoToOrder(item) {
      this.selectedModelInfo = { ...item };
    },
  },
  methods: {
    ...mapActions({
      getOneOrder: "orders/getOneOrder",
      createdOrder: "orders/createdOrder",
      getUsersList: "orders/getUsersList",
      getClient: "orders/getClient",
      getModelId: "orders/getModelId",
      updateOrder: "orders/updateOrder",
      getGivePrice: "orders/getGivePrice",
    }),
    ...mapMutations({
      setModelId: "orders/setModelId",
    }),
    async updateOrderFunc() {
      await this.updateOrder(this.order);
    },
    async createdNewOrder() {
      await this.createdOrder(this.order);
    },
    setModelName(item) {
      console.log(item);
      this.modelList.forEach((e) => {
        if (item === e.id) {
          this.order.modelName = e.name;
          console.log(e);
        }
      });
      if (item) {
        this.getGivePrice({ id: item.id });
      } else {
        this.selectedModelInfo.name = "";
      }
    },
  },
  mounted() {
    const id = this.$route.params.id;
    const modelId = this.$route.query.modelId;
    if (id !== "add-order") {
      this.getOneOrder({ id, modelId });
      this.orderStatus = "Edit";
    }
  },
};
</script>

<style lang="scss">
.active-tab {
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #7631ff;
}

.custom-picker-2 {
  width: 100% !important;
  background: #f8f4fe;
  border-radius: 10px 10px 0 0 !important;
  &::placeholder {
    color: #cccccc;
  }
  > input.el-input__inner {
    border-radius: 10px 10px 0 0 !important;

    background: #f8f4fe !important;
    border: 0;
    border-bottom: 1px solid #777777 !important;
    width: 100% !important;
    height: 40px !important;
    &::placeholder {
      color: #9a979d !important;
    }
  }
}
</style>
