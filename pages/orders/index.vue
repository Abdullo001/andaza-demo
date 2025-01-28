<template>
  <div>
    <v-card elevation="0" class="rounded-lg mb-4">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <div class="d-flex align-center justify-space-between flex-fill mb-4">
            <v-text-field
              v-model="filters.orderNumber"
              :placeholder="$t('orderBox.index.orderNum')"
              outlined
              height="44"
              validate-on-blur
              dense
              hide-details
              class="rounded-lg filter mr-2"
            />
            <v-text-field
              v-model="filters.modelNumber"
              :placeholder="$t('inspectionBox.model')"
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
              :placeholder="$t('orderBox.index.modelGroup')"
              item-text="name"
              item-value="name"
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
              :placeholder="$t('modelBox.modelPartsBox.creator')"
              prepend-icon=""
            >
              <template #append>
                <v-icon class="d-inline-block" color="#544B99">
                  mdi-magnify
                </v-icon>
              </template>
            </v-combobox>
          </div>
          <div class="d-flex justify-center">
            <v-btn
              width="140"
              outlined
              color="#544B99"
              elevation="0"
              class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
              @click="resetFilter"
            >
              {{ $t("listsModels.dialog.reset") }}
            </v-btn>
            <v-btn
              width="140"
              color="#544B99"
              dark
              elevation="0"
              class="text-capitalize rounded-lg font-weight-bold"
              @click="filterOrder"
            >
              {{ $t("listsModels.dialog.search") }}
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
    <VDataTableWrapper
      :headers="headers"
      :items="list"
      :loading="loading"
      :totalElements="totalElements"
      :callerFunction="getOrdersList"
    >
      <template #top>
        <v-toolbar elevation="0" class="rounded-lg">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>{{ $t("sidebar.orders") }}</div>
            <div>
              <v-btn
                color="#544B99"
                outlined
                class="text-capitalize rounded-lg mr-2"
                @click="$router.push(localePath(`/forms/print-pdf-generation`))"
              >
                {{ $t("orderBox.index.printForms") }}
              </v-btn>
              <v-btn
                color="#544B99"
                outlined
                class="text-capitalize rounded-lg mr-2"
                @click="$router.push(localePath(`/forms/order-pdf-generation`))"
              >
                {{ $t("orderBox.index.placedOrderForm") }}
              </v-btn>
              <v-btn
                color="#544B99"
                dark
                class="text-capitalize rounded-lg"
                @click="addOrder"
              >
                <v-icon>mdi-plus</v-icon>
                {{ $t("orderBox.index.addOrder") }}
              </v-btn>
            </div>
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
                      <v-img src="/copy.svg" width="15" class="ml-2 pointer" />
                    </div>
                  </template>
                  <span>Copy</span>
                </v-tooltip>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #item.deadline="{ item }">
        {{ item.deadline ? formatLong(item.deadline) : "" }}
      </template>
      <template #item.action="{ item }">
        <v-tooltip top color="#544B99">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#544B99"
              v-on="on"
              v-bind="attrs"
              @click="viewDetails(item)"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <span>Details</span>
        </v-tooltip>
      </template>
    </VDataTableWrapper>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VDataTableWrapper from "../../components/UI/VDataTableWrapper.vue";

export default {
  name: "OrdersPage",
  components: {
    VDataTableWrapper,
  },
  data() {
    return {
      new_dialog: false,
      filter_form: true,
      creatorSearch: "",
      clientSearch: "",
      users: [],
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
        {
          text: this.$t("orderBox.index.orderNum"),
          value: "orderNumber",
          align: "start",
          sortable: false,
        },
        { text: this.$t("inspectionBox.model"), value: "model", width: 200 },
        { text: this.$t("inspectionBox.clientName"), value: "client" },
        { text: this.$t("modelBox.modelPartsBox.creator"), value: "createdBy" },
        {
          text: this.$t("catalogGroups.tabs.table.createdAt"),
          value: "createdAt",
        },
        { text: this.$t("partners.table.status"), value: "status", width: 215 },
        { text: this.$t("orderBox.index.deadline"), value: "deadline" },
        {
          text: this.$t("catalogGroups.tabs.table.actions"),
          value: "action",
          sortable: false,
        },
      ],
      list: [],
    };
  },
  created() {
    this.getModelGroupList({ page: 0, size: 10 });
    this.getUsersList();
  },
  computed: {
    ...mapGetters({
      loading: "orders/loading",
      ordersList: "orders/ordersList",
      modelGroups: "model/modelGroupList",
      totalElements: "orders/totalElements",
      usersList: "orders/usersList",
    }),
  },
  watch: {
    ordersList(val) {
      this.list = JSON.parse(JSON.stringify(val));
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
      getModelGroupList: "model/getModelGroupList",
    }),
    async resetFilter() {
      this.$refs.filters.reset();
      await this.getOrdersList({ page: 0, size: 10 });
    },
    async filterOrder() {
      await this.filterOrderList({ page: 0, size: 10, data: this.filters });
    },
    async changeStatus(item) {
      await this.changeStatusOrder({
        id: item.id,
        status: item.status,
        modelId: item.modelId,
      });
    },
    addOrder() {
      this.$router.push(this.localePath(`/orders/add-order`));
    },
    async viewDetails(item) {
      await this.$router.push(
        this.localePath(`/orders/${item.id}?modelId=${item.modelId}`)
      );
      await this.$store.commit("orders/setModelId", item.modelId);
    },
    getCopyKey(item) {
      navigator.clipboard.writeText(item);
      this.$toasted.success(`Copied ${item}`, {
        action: {
          text: "",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
      });
    },
  },
  async mounted() {
    this.$store.commit("setPageTitle", "Orders");
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
