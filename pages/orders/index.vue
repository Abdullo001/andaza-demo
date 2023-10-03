<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <div class=" d-flex align-center justify-space-between flex-fill mb-4">
            
              <v-text-field
                v-model="filters.orderNumber"
                placeholder="Order number"
                outlined
                height="44"
                validate-on-blur
                dense
                hide-details
                class="rounded-lg filter mr-2"
              />
              <v-text-field
                v-model="filters.modelNumber"
                placeholder="Model number"
                outlined
                height="44"
                validate-on-blur
                dense
                hide-details
                class="rounded-lg filter mr-2"
              />
              <v-select
                :items="modelGroups"
                v-model="filters.modelGroup"
                placeholder="Model Group"
                dense
                outlined
                height="44"
                hide-details
                validate-on-blur
                class="rounded-lg filter mr-2"
                append-icon="mdi-chevron-down"
              />
              <v-combobox
                v-model="filters.creatorId"
                :items="users"
                :search-input.sync="creatorSearch"
                item-text="name"
                item-value="id"
                validate-on-blur 
                outlined
                hide-details
                height="44"
                class="rounded-lg filter d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                placeholder="Creator name"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#7631FF">
                    mdi-magnify
                  </v-icon>
                </template>
             </v-combobox>
              <v-combobox
                v-model="filters.clientName"
                :items="clientList"
                :search-input.sync="clientSearch"
                item-text="name"
                item-value="id"
                validate-on-blur 
                outlined
                hide-details
                height="44"
                class="rounded-lg filter d-flex align-center justify-center "
                :return-object="true"
                dense
                placeholder="Client name"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#7631FF">
                    mdi-magnify
                  </v-icon>
                </template>
             </v-combobox>
          </div>
          <div class="d-flex justify-center">
            <v-btn
              width="140"
              outlined
              color="#397CFD"
              elevation="0"
              class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
              @click="resetFilter"
            >
              Reset
            </v-btn>
            <v-btn
              width="140"
              color="#397CFD"
              dark
              elevation="0"
              class="text-capitalize rounded-lg font-weight-bold"
              @click="filterOrder"
            >
              Search
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="list"
      :loading="loading"
      :items-per-page="itemPrePage"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      @update:page="page"
      @update:items-per-page="size"
      :server-items-length="totalElements"
      @click:row="(item) => viewDetails(item)"
      item-key="modelNumber"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>Orders</div>
            <v-btn
              color="#7631FF"
              dark
              class="text-capitalize rounded-lg"
              @click="addOrder"
            >
              <v-icon>mdi-plus</v-icon>
              add Order
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.status="{ item }">
        <v-select
          @click.stop
          @change="changeStatus(item)"
          :background-color="statusColor.orderColor(item.status)"
          :items="status_enums"
          append-icon="mdi-chevron-down"
          v-model="item.status"
          hide-details
          class="mt-n2"
          rounded
          dark
        />
      </template>
      <template #item.model="{ item }">
        <div class="d-flex align-start m-0 p-0">
          <v-img
            :src="item.modelImageUrl"
            class="flex-sm-grow-0 mr-2 mt-2"
            :width="38"
            :height="38"
          />
          <div class="d-flex align-center my-2">
            <div class="ml-2">
              <div class="username-name">{{ item.modelName }}</div>
              <div class="username-email d-flex flex-row">
                {{ item.modelNumber }}
                <v-tooltip top color="green d-inline">
                  <template #activator="{ on, attrs }">
                    <div
                      @click.stop="getCopyKey(item.modelNumber)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-img src="/copy.svg" width="15" class="ml-2 pointer"/>
                    </div>
                  </template>
                  <span>Copy</span>
                </v-tooltip>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #item.action="{ item }">
        <v-tooltip top color="#7631FF">
          <template v-slot:activator="{on, attrs}">
            <v-btn
              icon color="#7631FF"
              v-on="on" v-bind="attrs"
              @click="viewDetails(item)"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <span>Details</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'OrdersPage',
  data() {
    return {
      itemPrePage: 10,
      current_page: 0,
      new_dialog: false,
      filter_form: true,
      creatorSearch:"",
      clientSearch:"",
      users:[],
      filters: {
        orderNumber: "",
        modelNumber: "",
        modelGroup: "",
        creatorId: "",
        clientName: "",
      },
      status_enums: ["FINISHED", "CANCELED", "PENDING", "IN_PROCESS"],
      modelGroup_enums: [],
      headers: [
        {text: "Order number", align: "start", sortable: false, value: "orderNumber"},
        {text: "Model", value: "model", width: 200},
        {text: "Client Name", value: "client"},
        {text: "Created by", value: "createdBy"},
        {text: "Created at", value: "createdAt"},
        {text: "Status", value: "status", width: 215},
        {text: "Deadline", value: "deadLine"},
        {text: "Actions", value: "action", sortable: false},
      ],
      list:[],
    };
  },
  created() {
    this.getModelGroup({name:""})
    this.getUsersList();
    this.getClient();
  },
  computed: {
    ...mapGetters({
      loading: "orders/loading",
      ordersList: "orders/ordersList",
      modelGroups: "orders/modelGroups",
      totalElements: "orders/totalElements",
      usersList: "orders/usersList",
      clientList: "orders/clientList",

    }),
  },
  watch:{
    ordersList(val){
      this.list=JSON.parse(JSON.stringify(val))
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
      getOrdersList: "orders/getOrdersList",
      changeStatusOrder: "orders/changeStatusOrder",
      filterOrderList: "orders/filterOrderList",
      getUsersList: "orders/getUsersList",
      getClient: "orders/getClient",
      getModelGroup: "orders/getModelGroup",
    }),
    async page(value) {
      this.current_page = value - 1;
      await this.getOrdersList({page: this.current_page, size: this.itemPrePage});
    },
    async size(value) {
      this.itemPrePage = value;
      await this.getOrdersList({page: 0, size: this.itemPrePage});
    },
    async resetFilter() {
      this.$refs.filters.reset();
        await this.getOrdersList({page: 0, size: 10});
    },
    async filterOrder() {
      await this.filterOrderList({page: 0, size: 10, data: this.filters});
    },
    async changeStatus(item) {
      await this.changeStatusOrder({id: item.id, status: item.status});
    },
    addOrder() {
      this.$router.push(`/orders/add-order`);
    },
    async viewDetails(item) {
      await this.$router.push(`/orders/${item.id}?modelId=${item.modelId}`);
      await this.$store.commit("orders/setModelId", item.modelId)
    },
    getCopyKey(item) {
      navigator.clipboard.writeText(item)
      this.$toasted.success(`Copied ${item}`, {
        action: {
          text: '',
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        }
      })
    },
  },
  async mounted() {
    this.$store.commit("setPageTitle", "Orders");
    await this.getOrdersList({page: 0, size: 10, modelGroup: "",});
  },
};
</script>

<style lang="scss">
.el-input__inner {
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

tbody > tr {
  cursor: pointer;
}
</style>
