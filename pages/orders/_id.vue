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
            />
            <div class="mb-2 text-body-1">Head of production depatment</div>

            <v-select
              :items="users"
              v-model="order.headOfDepartmentId"
              placeholder="Head of production depatment"
              item-value="id"
              item-text="name"
              dense
              outlined
              validate-on-blur
              class="rounded-lg"
              append-icon="mdi-magnify"
              color="#7631FF"
            />
            <div class="mb-2 black--text text-body-1">Permission</div>
            <v-chip color="#10BF41" dark class="font-weight-bold">Edit</v-chip>
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Client name</div>
            <v-select
              :items="clientList"
              v-model="order.clientId"
              placeholder="Client name"
              item-value="id"
              item-text="name"
              dense
              outlined
              validate-on-blur
              class="rounded-lg"
              append-icon="mdi-magnify"
              color="#7631FF"
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
              outlined
              validate-on-blur
              class="rounded-lg"
              dark
            />
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Model number</div>
            <v-select
              @change="(e) => setModelName(e)"
              :items="modelList"
              v-model="order.modelId"
              item-value="id"
              item-text="modelNumber"
              placeholder="Model number"
              dense
              outlined
              validate-on-blur
              class="rounded-lg"
              append-icon="mdi-magnify"
              color="#7631FF"
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
              />
            </div>
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Model name</div>
            <v-text-field
              v-model="order.modelName"
              placeholder="Enter "
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              readonly
            />
           

            <div class="mb-2 text-body-1">Deadline</div>
            <el-date-picker
              v-model="order.deadline"
              type="datetime"
              placeholder="dd.MM.yyyy HH:mm:ss"
              :picker-options="pickerOptions"
              value-format="dd.MM.yyyy HH:mm:ss"
              style="min-width: 100%"
              class=" el-date-picker bg-color-dataPic"
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
              readonly
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
              readonly
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
              class="el-date-picker mb-6"
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
              class="el-date-picker"
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
          @click="updateOrderFunc"
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
        headOfDepartmentId: null,
        modifiedPerson: "",
        createdTime: "",
        updatedTime: "",
        priority: this.$route.params.id !== "add-order" ? "" : "LOW",
        modelId: null,
      },

      saveOrder: false,

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
        order.givenPrice.amount = item.givenPrice;
        order.givenPrice.currency = item.givenPriceCurrency;
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
  },

  methods: {
    ...mapActions({
      getOneOrder: "orders/getOneOrder",
      createdOrder: "orders/createdOrder",
      getUsersList: "orders/getUsersList",
      getClient: "orders/getClient",
      getModelId: "orders/getModelId",
      updateOrder: "orders/updateOrder",
    }),
    ...mapMutations({
      setModelId: "orders/setModelId",
    }),

    async updateOrderFunc() {
      await this.updateOrder(this.order);
    },

    clearOrder() {},

    async createdNewOrder() {
      await this.createdOrder(this.order);
    },

    setModelName(item) {

      this.modelList.forEach((e) => {
        if (item === e.id) {
          this.order.modelName = e.name;
        }
      });
    },
  },

  mounted() {
    const id = this.$route.params.id;
    const modelId = this.$route.query.modelId;
    if (id !== "add-order") {
      this.getOneOrder({
        page: 0,
        size: 50,
        id,
        modelId,
      });
      this.orderStatus = "Edit";
    } else {
      this.orderStatus = "Add";
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
  color: #c0c4cc;
}

.el-input__inner {
  color: #c0c4cc !important;
}
.el-input__inner {
  color: #777 !important;
  &::placeholder {
    color: #777 !important;
  }
}
.el-input__icon.el-icon-time {
  color: #777 !important;
  font-size: 18px;
}
.v-data-table-header {
  background-color: #e9eaeb;
}
.el-input__inner {
  background-color: #e9eaeb !important;
}

.bg-color-dataPic{
  background-color: #F8F4FE !important;
}
</style>
