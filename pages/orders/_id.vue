<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0">
      <v-card-title>
        <div>
          Orders
          <v-chip color="#10BF41" dark class="font-weight-bold ml-5">{{ orderStatus }}</v-chip>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-form lazy-validation v-model="new_validate" ref="order_detail">
          <v-row>
            <v-col cols="3">
              <div class="label">Order number</div>
              <v-text-field
                outlined
                hide-details
                height="44"
                class="rounded-lg base mb-4"
                v-model="order.orderNumber"
                placeholder="Enter order number"
                validate-on-blur
                dense
                color="#7631FF"
              />
            </v-col>
            <v-col cols="3">
              <div class="label">Vendor (Artikul) code</div>
              <v-text-field
                outlined
                hide-details
                readonly
                height="44"
                class="rounded-lg base mb-4"
                v-model="order.vendorArticularCode"
                placeholder="Vendor articular code"
                validate-on-blur
                dense
                color="#7631FF"
              />
            </v-col>
            <v-col cols="3">
              <div class="label">Client name</div>
              <v-text-field
                outlined
                hide-details
                readonly
                height="44"
                class="rounded-lg base mb-4"
                v-model="order.client"
                placeholder=" client name"
                validate-on-blur
                dense
                color="#7631FF"
              />
            </v-col>
            <v-col cols="3">
              <div class="label">Model number</div>
              <v-combobox
                v-model="order.modelNumber"
                @change="(e) => setModelName(e)"
                :items="modelList"
                :search-input.sync="modelIdSearch"
                item-text="modelNumber"
                item-value="id"
                outlined
                hide-details
                height="44"
                class="rounded-lg base d-flex align-center justify-center mb-4"
                :return-object="true"
                color="#7631FF"
                dense
                placeholder="Enter responsible person"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#7631FF">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="3">
              <div class="label">Model name</div>
              <v-text-field
                v-model="order.modelName"
                placeholder="Enter"
                outlined
                hide-details
                height="44"
                class="rounded-lg base mb-4"
                validate-on-blur
                dense
                color="#7631FF"
                readonly
              />
            </v-col>
            <v-col cols="3">
              <div class="label">Head of production depatment</div>
              <div class="search-field">
                <v-combobox
                  v-model="order.headOfDepartment"
                  :items="users"
                  :search-input.sync="HODSearch"
                  style="margin-bottom:22px"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base d-flex align-center justify-center"
                  :return-object="true"
                  color="#7631FF"
                  dense
                  placeholder="Enter responsible person"
                  prepend-icon=""
                >
                  <template #append>
                    <v-icon class="d-inline-block" color="#7631FF">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
              </div>
            </v-col>
            <v-col cols="3">
              <div class="label">Price with discount</div>
              <div class="d-flex align-center">
                <v-text-field
                  v-model="order.priceWithDiscount"
                  placeholder="0.00"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base rounded-l-lg rounded-r-0"
                  validate-on-blur
                  dense
                  color="#7631FF"
                />
                <v-select
                  :items="currency_enums"
                  v-model="order.priceWithDiscountCurrency"
                  style="max-width: 100px"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base rounded-r-lg rounded-l-0"
                  validate-on-blur
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                />
              </div>
            </v-col>
            <v-col cols="3">
              <div class="label">Total</div>
              <div class="d-flex align-center">
                <v-text-field
                v-model="order.totalPrice"
                readonly
                placeholder="0.00"
                outlined
                hide-details
                height="44"
                class="rounded-lg base rounded-l-lg rounded-r-0"
                validate-on-blur
                dense
                color="#7631FF"
              />
              <v-select
                :items="currency_enums"
                v-model="order.priceWithDiscountCurrency"
                style="max-width: 100px"
                dense
                outlined
                hide-details
                height="44"
                class="rounded-lg base rounded-r-lg rounded-l-0"
                validate-on-blur
                append-icon="mdi-chevron-down"
                color="#7631FF"
              />
              </div>
              
            </v-col>

            <v-col cols="3">
              <div class="label">Order date</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="order.orderDate"
                  type="datetime"
                  style="width: 100%; height: 100%"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                  class="base_picker"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="3">
              <div class="label">Deadline</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="order.deadline"
                  type="datetime"
                  style="width: 100%; height: 100%"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                  class="base_picker"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="3">
              <div class="label">Order priority</div>
              <v-select
                :background-color="statusColor.priorityColor(order.priority)"
                :items="priority_enums"
                append-icon="mdi-chevron-down"
                v-model="order.priority"
                dense
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                validate-on-blur
                placeholder="Select order priority"
                dark
              />
            </v-col>
            <v-col cols="3">
              <div class="label">Description</div>
              <v-textarea
                v-model="order.description"
                placeholder="Enter description"
                rows="1"
                height="44"
                outlined
                hide-details
                class="rounded-lg base"
                validate-on-blur
                dense
                color="#7631FF"
              />
            </v-col>

            <v-col cols="3" >
              <div class="label">Creator</div>
              <v-text-field
                v-model="order.creator"
                placeholder="Enter creator"
                outlined
                hide-details
                height="44"
                class="rounded-lg base mb-4"
                validate-on-blur
                dense
                color="#7631FF"
                background-color="#F8F4FE"
                readonly
              />
            </v-col>
            
            <v-col cols="3">
              <div class="label">Created time</div>
              <v-text-field
                v-model="order.createdTime"
                placeholder="Created at"
                outlined
                hide-details
                height="44"
                class="rounded-lg base mb-4"
                validate-on-blur
                dense
                color="#7631FF"
                background-color="#F8F4FE"
                readonly
              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
              </v-col>

              <v-col cols="3">
                <div class="label">Modified person</div>
                <v-text-field
                  v-model="order.modifiedPerson"
                  placeholder="Enter Modified person"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  validate-on-blur
                  dense
                  color="#7631FF"
                  background-color="#F8F4FE"
                  readonly
                />
              </v-col>
  

              <v-col cols="3">
              <div class="label">Updated time</div>
              <v-text-field
                v-model="order.updatedTime"
                placeholder="Update at"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                validate-on-blur
                dense
                color="#7631FF"
                background-color="#F8F4FE"
                readonly
              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
            </v-col>
            
             
              
            
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-6 pr-4">
        <v-spacer/>
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
          Update
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mt-6 mb-8" flat>
      <v-tabs v-model="tab">
        <v-tabs-slider color="#7631FF"/>
        <v-tab
          class="text-capitalize primary-color"
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
                <ColorSizeDistirbution/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <DetailInfo/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <Subcontracts/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <ShippingInfo/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <OrderDocuments/>
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
import ColorSizeDistirbution from "../../components/ColorSizeDistirbution.vue";
import DetailInfo from "../../components/DetailInfo.vue";
import Subcontracts from "../../components/Subcontracts.vue";
import ShippingInfo from "../../components/ShippingInfo.vue";
import OrderDocuments from "../../components/OrderDocuments.vue";

export default {
  name: 'OrdersChildPage',
  components: {
    OrderDocuments,
    ShippingInfo,
    Subcontracts,
    DetailInfo,
    ColorSizeDistirbution,
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
      new_validate:true,
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
        client: "",
        modelNumber: "",
        modelName: "",
        priceWithDiscount: null,
        priceWithDiscountCurrency: "USD",
        vendorArticularCode:"",
        orderDate:"",

        totalPrice: null,
        deadline: "",
        description: "",
        creator: "",
        headOfDepartmentId: null,
        headOfDepartment: "",

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
      order.priceWithDiscount = item.priceWithDiscountUSD;
      order.totalPrice=item.totalPriceUSD
      order.priceWithDiscountCurrency = "USD";
      order.modelId = item.modelId;
      order.priority = item.priority;
      order.headOfDepartment = item.headOfProductionDepartment
      order.client = item.client
      order.vendorArticularCode=item.vendorArticularCode
      order.orderDate=item.orderDate
      this.$store.commit('orders/setModelId', item.modelId);
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
      this.selectedModelInfo = {...item};
      this.order.priceWithDiscount = item.priceWithDiscountUSD;
      this.order.priceWithDiscountCurrency = 'USD';
      this.order.client=item.client
      this.order.clientId=item.clientId
    },
    "order.priceWithDiscountCurrency"(val) {
      const id =this.$route.params

      if(id.id==="add-order"){

        switch (val) {
        case 'USD':
          return this.order.priceWithDiscount = this.infoToOrder.priceWithDiscountUSD;
        case 'RUB':
          return this.order.priceWithDiscount = this.infoToOrder.priceWithDiscountRUB;
        case 'UZS':
          return this.order.priceWithDiscount = this.infoToOrder.priceWithDiscountUZS;
        }

      } else {
        switch (val) {
        case 'USD':
          return (
            this.order.priceWithDiscount = this.orderDetail.priceWithDiscountUSD,
            this.order.totalPrice = this.orderDetail.totalPriceUSD
          
          );
          
        case 'RUB':
          return (
            this.order.priceWithDiscount = this.orderDetail.priceWithDiscountRUB,
            this.order.totalPrice = this.orderDetail.totalPriceRUB
          );
        case 'UZS':
          return (
            this.order.priceWithDiscount = this.orderDetail.priceWithDiscountUZS,
            this.order.totalPrice = this.orderDetail.totalPriceUZS
  
          );
        }
        
      }
    }
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
    async updateOrderFunc() {
      await this.updateOrder(this.order);
    },
    async createdNewOrder() {
      this.order.modelId = this.infoToOrder.id;
      await this.createdOrder(this.order);
    },
    setModelName(item) {
      if(item !== 'null' || !!item) {
        this.order.modelName = item.name;
        this.order.client=item.client
        this.getGivePrice({id: item.id});
      }
    },
    clear(){
      this.$refs.order_detail.reset();
      this.order.deadline="";
    },

  },
  mounted() {
    const id = this.$route.params.id;
    const modelId = this.$route.query.modelId;
    if (id !== "add-order") {
      this.getOneOrder({id, modelId});
      this.orderStatus = "Edit";
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
