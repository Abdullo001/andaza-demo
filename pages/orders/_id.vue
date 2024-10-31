<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0">
      <v-card-title>
        <div>
          {{ $t('sidebar.orders') }}

          <v-chip class="font-weight-bold ml-5" color="#10BF41" dark>{{ orderStatus }}</v-chip>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-form ref="order_detail" v-model="new_validate" lazy-validation>
          <v-row>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('orderBox.index.orderNum')}}</div>
              <v-text-field
                v-model="order.orderNumber"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('orderBox.add.enterOrderNumber')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('inspectionBox.clientName') }}</div>
              <v-text-field
                v-model="order.client"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                :placeholder=" $t('inspectionBox.clientName')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('prefinances.child.modelNumber') }}</div>
              <v-combobox
                v-model="order.modelNumber"
                :items="modelList"
                :return-object="true"
                :search-input.sync="modelIdSearch"
                class="rounded-lg base d-flex align-center justify-center mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                item-text="modelNumber"
                item-value="id"
                outlined
                :placeholder="$t('prefinances.child.enterModelNumber')"
                prepend-icon=""
                @change="(e) => setModelName(e)"
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('planningProduction.dialog.modelName') }}</div>
              <v-text-field
                v-model="order.modelName"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                :placeholder="$t('planningProduction.dialog.enterModelName')"
                validate-on-blur
              />
            </v-col>
          </v-row>
          <v-row :class="showObject">
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('orderBox.add.headProductDep')}}</div>
              <div class="search-field">
                <v-combobox
                  v-model="order.headOfDepartment"
                  :items="users"
                  :return-object="true"
                  :search-input.sync="HODSearch"
                  class="rounded-lg base d-flex align-center justify-center"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  item-text="name"
                  item-value="id"
                  outlined
                  :placeholder="$t('orderBox.add.enterRespPerson')"
                  prepend-icon=""
                  style="margin-bottom:22px"
                >
                  <template #append>
                    <v-icon class="d-inline-block" color="#544B99">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('orderBox.add.overProduct')}}</div>
              <v-text-field
                v-model="order.overproductionPercent"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('orderBox.add.enterOverproduction')"
                suffix="%"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('orderBox.add.priceDiscount')}}</div>
              <div class="d-flex align-center">
                <v-text-field
                  v-model="order.priceWithDiscount"
                  disabled
                  class="rounded-lg base rounded-l-lg rounded-r-0"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  placeholder="0.00"
                  validate-on-blur
                />
                <v-select
                  v-model="order.priceWithDiscountCurrency"
                  disabled
                  :items="currency_enums"
                  append-icon="mdi-chevron-down"
                  class="rounded-lg base rounded-r-lg rounded-l-0"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  style="max-width: 100px"
                  validate-on-blur
                />
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('orderBox.add.total')}}</div>
              <div class="d-flex align-center">
                <v-text-field
                  disabled
                  v-model="order.totalPrice"
                  class="rounded-lg base rounded-l-lg rounded-r-0"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  placeholder="0.00"
                  readonly
                  validate-on-blur
                />
                <v-select
                  disabled
                  v-model="order.priceWithDiscountCurrency"
                  :items="currency_enums"
                  append-icon="mdi-chevron-down"
                  class="rounded-lg base rounded-r-lg rounded-l-0"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  style="max-width: 100px"
                  validate-on-blur
                />
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('orderBox.add.orderDate')}}</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="order.orderDate"
                  :picker-options="pickerShortcuts"
                  class="base_picker"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  style="width: 100%; height: 100%"
                  type="datetime"
                  value-format="timestamp"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('orderBox.index.deadline')}}</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="order.deadline"
                  :picker-options="pickerShortcuts"
                  class="base_picker"
                  placeholder="dd.MM.yyyy"
                  style="width: 100%; height: 100%"
                  type="date"
                  value-format="timestamp"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('orderBox.add.orderpriority')}}</div>
              <v-select
                v-model="order.priority"
                :background-color="statusColor.priorityColor(order.priority)"
                :items="priority_enums"
                append-icon="mdi-chevron-down"
                class="rounded-lg base"
                dark
                dense
                height="44"
                hide-details
                outlined
                placeholder="Select order priority"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <div class="label">{{$t('orderBox.add.plannedAccess')}}</div>
              <div class="d-flex align-center">
                <v-select
                  v-model="expenseGroupId"
                  :items="expenseGroup"
                  item-value="id"
                  item-text="name"
                  append-icon="mdi-chevron-down"
                  class="rounded-lg base rounded-l-lg rounded-r-0 mr-1"
                  color="#544B99"
                  dense
                  placeholder="Expense group"
                  height="44"
                  hide-details
                  outlined
                  style="max-width: 200px"
                  validate-on-blur
                />
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
                  placeholder="Currency"
                  readonly
                  validate-on-blur
                />
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('listsModels.child.description')}}</div>
              <v-textarea
                v-model="order.description"
                auto-grow
                class="rounded-lg base"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('listsModels.child.description')"
                rows="1"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('modelBox.modelPartsBox.creator') }}</div>
              <v-text-field
                v-model="order.creator"
                background-color="#F8F4FE"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                :placeholder="$t('modelBox.modelPartsBox.creator')"
                readonly
                validate-on-blur
              />
            </v-col>

            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('catalogGroups.tabs.table.createdAt') }}</div>
              <v-text-field
                v-model="order.createdTime"
                background-color="#F8F4FE"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                :placeholder="$t('catalogGroups.tabs.table.createdAt')"
                readonly
                validate-on-blur

              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('orderBox.add.modeifiedPerson') }}</div>
              <v-text-field
                v-model="order.modifiedPerson"
                background-color="#F8F4FE"
                class="rounded-lg base"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                :placeholder=" $t('orderBox.add.modeifiedPerson') "
                readonly
                validate-on-blur

              />
            </v-col>


            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('orderBox.add.updatedTime') }}</div>
              <v-text-field
                v-model="order.updatedTime"
                background-color="#F8F4FE"
                class="rounded-lg base"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                :placeholder="$t('orderBox.add.updatedAt')"
                readonly
                validate-on-blur
              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
            </v-col>
            <v-col class="d-flex justify-end align-center" cols="12">
              <FinishProcessBtn v-bind="finishDate"/>
              <v-btn
                v-if="orderStatus === 'Add'"
                class="text-capitalize rounded-lg"
                color="#544B99"
                dark
                height="44"
                width="130"
                @click="createdNewOrder"
              >
                {{ $t('orderBox.contractBox.save') }}
              </v-btn>
              <v-btn
                v-else
                class="text-capitalize rounded-lg"
                color="#544B99"
                dark
                height="44"
                width="130"
                @click="updateOrderFunc"
              >
                Update
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-6 pr-4">
        <v-spacer/>
        <ShowBtnComponent
          :click-btn="clickBtn"
          :show_btn_value="show_btn"
        />
        <v-spacer/>
      </v-card-actions>
    </v-card>
    <v-card class="mt-6 mb-8" flat>
      <v-tabs v-model="tab">
        <v-tabs-slider color="#544B99"/>
        <v-tab
          v-for="item in items"
          :key="item"
          active-class="active-tab"
          class="text-capitalize primary-color"
        >
          {{ item }}
        </v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <ColorSizeDistribution/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <OrdersModelPrints/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <OrderContract/>
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
import {mapActions, mapGetters} from "vuex";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import DetailInfo from "@/components/DetailInfo.vue";
import OrderDocuments from "@/components/OrderDocuments.vue";
import ShowBtnComponent from "@/components/ShowComponentBtn/ShowBtn.vue";
import ColorSizeDistribution from "@/components/ColorSizeDistribution.vue";
import OrdersModelPrints from "@/components/OrdersModelPrints.vue";
import OrderContract from "@/components/OrderContract.vue";
import FinishProcessBtn from "@/components/FinishProcessBtn.vue";

export default {
  name: 'OrdersChildPage',
  components: {
    ColorSizeDistribution,
    ShowBtnComponent,
    OrderDocuments,
    DetailInfo,
    Breadcrumbs,
    OrdersModelPrints,
    OrderContract,
    FinishProcessBtn
  },
  data() {
    return {
      show_btn: true,
      currency_enums: ["USD", "UZS", "RUB"],
      users: [],
      fields_status: true,
      tab: null,
      orderStatus: "Add",
      HODSearch: "",
      clientIdSearch: "",
      new_validate: true,
      modelIdSearch: "",
      priority_enums: ["LOW", "MEDIUM", "HIGH"],
      items: [
       this.$t('orderBox.dialog.colorDist'),
       this.$t('orderBox.dialog.modelPrints'),
        this.$t('orderBox.dialog.contract'),
        this.$t('orderBox.dialog.detailInfo'),
        this.$t('orderBox.dialog.documents'),
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
        orderDate: "",
        overproductionPercent: null,

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
      expenseGroupId:"",
      expense:{},

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
    finishDate:{
      get(){
        return{
          modelId:!!this.orderDetail.modelId?this.orderDetail.modelId:0,
          propertyName:"ORDER_FORMING",
        }
      }
    },
    showObject() {
      return {
        show_active: this.show_btn
      }
    },
    ...mapGetters({
      orderDetail: "orders/oneOrder",
      modelId: "orders/modelId",
      usersList: "orders/usersList",
      clientList: "orders/clientList",
      modelList: "orders/modelList",
      infoToOrder: "orders/infoToOrder",
      expenseForProduction: "expenseGroup/expenseForProduction",
      expenseGroup: "expenseGroup/expenseGroup",
    }),
  },
  watch: {
    expenseGroupId(val){
      this.getExpenseProduction({groupId:val,modelId:this.order.modelId})
    },
    expenseForProduction(val){
      this.expense=JSON.parse(JSON.stringify(val))
    },
    orderDetail(item) {
      console.log(item);
      this.order=JSON.parse(JSON.stringify(item))
      this.order.createdTime = item.createdAt;
      this.order.creator = item.createdBy;
      this.order.modifiedPerson = item.updatedBy;
      this.order.updatedTime = item.updatedAt;
      this.order.headOfDepartmentId = item.headOfProductionDepartmentId;
      this.order.priceWithDiscount = item.priceWithDiscountUSD;
      this.order.totalPrice = item.totalPriceUSD
      this.order.priceWithDiscountCurrency = "USD";
      this.order.headOfDepartment = {id:item.headOfProductionDepartmentId, name:item.headOfProductionDepartment}
      
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
      this.order.client = item.client
      this.order.clientId = item.clientId
    },
    "order.priceWithDiscountCurrency"(val) {
      const id = this.$route.params

      if (id.id === "add-order") {
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
      filterExpenseGroup: "expenseGroup/filterExpenseGroup",
      getExpenseProduction: "expenseGroup/getExpenseProduction",
    }),
    clickBtn() {
      this.show_btn = !this.show_btn
    },
    async updateOrderFunc() {
      await this.updateOrder(this.order);
    },
    async createdNewOrder() {
      this.order.modelId = this.infoToOrder.id;
      await this.createdOrder(this.order);
    },
    setModelName(item) {
      if (item !== 'null' || !!item) {
        this.order.modelName = item.name;
        this.order.client = item.client
        this.getGivePrice({id: item.id});
      }
    },
    clear() {
      this.$refs.order_detail.reset();
      this.order.deadline = "";
    },

  },
  mounted() {
    this.filterExpenseGroup({id:"",name:"",createdAt:"",updateAt:""})
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
  color: #544b99;
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

.show_active {
  height: 0;
  overflow: hidden;
}
</style>
