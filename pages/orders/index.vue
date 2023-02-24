<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filters.orderNumber"
                placeholder="Order number"
                outlined
                validate-on-blur
                dense
                hide-details
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filters.modelGroup"
                placeholder="Model Group"
                outlined
                validate-on-blur
                dense
                hide-details
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2" style="max-width: 240px">
              <el-date-picker
                v-model="filters.createdDate"
                type="datetime"
                class="rounded-lg d-block el-date-picker"
                placeholder="Created at"
                :picker-options="pickerOptions"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <el-date-picker
                v-model="filters.updatedDate"
                type="datetime"
                class="rounded-lg d-block el-date-picker"
                placeholder="Updated at"
                :picker-options="pickerOptions"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </v-col>
            <v-spacer />
            <v-col cols="12" lg="3">
              <div class="d-flex justify-end">
                <v-btn
                  width="140"
                  outlined
                  color="#397CFD"
                  elevation="0"
                  class="
                    text-capitalize
                    mr-4
                    border-primary
                    rounded-lg
                    font-weight-bold
                  "
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
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="allOrders"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
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
              @click="addModel"
            >
              <v-icon>mdi-plus</v-icon>add Order
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.status="{ item }">
        <v-select
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
            class="flex-sm-grow-0 mr-2"
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

      <template #item.action="{ item }">
        <v-btn icon @click="viewDetails(item)">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      new_dialog: false,
      filter_form: true,
      filters: {
        orderNumber: "",
        modelGroup: "",
        createdDate: "",
        updatedDate: "",
      },
      status_enums: ["FINISHED", "CANCELED", "PENDING", "IN_PROCESS"],
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
      headers: [
        {
          text: "Order number",
          align: "start",
          sortable: false,
          value: "orderNumber",
        },
        { text: "Model", value: "model", width: 200 },
        { text: "Client Name", value: "client" },
        { text: "Created by", value: "createdBy" },
        { text: "Created at", value: "createdAt" },
        { text: "Status", value: "status", width: 215 },
        { text: "Deadline", value: "deadLine" },
        { text: "Actions", value: "action" },
      ],
      allOrders: [],
    };
  },
  computed: {
    ...mapGetters({
      ordersList: "orders/ordersList",
    }),
  },

  watch: {
    ordersList: {
      handler(orders) {
        this.allOrders = JSON.parse(JSON.stringify(orders));
      },
    },
  },

  methods: {
    ...mapActions({
      getOrdersList: "orders/getOrdersList",
      changeStatusOrder: "orders/changeStatusOrder",
    }),

    async changeStatus(item) {
      await this.changeStatusOrder({ id: item.id, status: item.status });
    },
    async resetFilter() {
      this.$refs.filters.reset();
      await this.getOrdersList({
        page: 0,
        size: 50,
        orderNumber: "",
        modelGroup: "",
      });
    },

    async filterOrder() {
      await this.getOrdersList({
        page: 0,
        size: 50,
        orderNumber: this.filters.orderNumber,
        modelGroup: this.filters.modelGroup,
      });
    },

    viewDetails(item) {
      this.$router.push(`/orders/${item.id}`);
    },

    addModel() {
      this.$router.push(`/orders/add-order`);
    },
  },

  async mounted() {
    this.$store.commit("setPageTitle", "Lists");
    await this.getOrdersList({
      page: 0,
      size: 50,
      orderNumber: "",
      modelGroup: "",
    });
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
