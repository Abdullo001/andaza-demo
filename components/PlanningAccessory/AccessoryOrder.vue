<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="allPlannerOrder"
      :items-per-page="100"
      class="elevation-0"
      hide-default-footer
    >
      <template #top>
        <v-card class="elevation-0">
          <v-card-text>
            <v-form v-model="new_valid" ref="valid" lazy-validation>
              <v-row class="mt-4">
                <v-col cols="12" lg="3">
                  <div class="label">Partner name</div>
                  <v-combobox
                    v-model="details.partnerName"
                    :items="partnerLists"
                    :search-input.sync="partnerName"
                    item-text="name"
                    item-value="id"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base"
                    :return-object="true"
                    color="#7631FF"
                    dense
                    placeholder="Enter partner name"
                    append-icon="mdi-chevron-down"
                    :rules="[formRules.required]"
                    validate-on-blur
                  >
                    <template #append>
                      <v-icon color="#7631FF">mdi-magnify</v-icon>
                    </template>
                  </v-combobox>
                </v-col>
                
                <v-col cols="12" lg="3">
                  <div class="label">Delivery time</div>
                  <el-date-picker
                    v-model="details.deliveryTime"
                    type="datetime"
                    style="width: 100%; height: 44px !important;"
                    placeholder="Deadline for fabric"
                    :picker-options="pickerShortcuts"
                    value-format="dd.MM.yyyy HH:mm:ss"
                    class="base_picker"
                    :rules="[formRules.required]"
                    validate-on-blur
                  >
                  </el-date-picker>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </template>
      <template #item.isOrdered="{ item }">
        <v-simple-checkbox
          v-model="item.isOrdered"
          :disabled="item.status==='ORDERED'"
          color="#7631FF"
        ></v-simple-checkbox>
      </template>

      <template #item.status="{item}">
        <v-select
          :background-color="statusColor.fabricOrderedStatus(item.status)"
          :items="status_enums"
          @change="changeStatusFunc(item)"
          append-icon="mdi-chevron-down"
          v-model="item.status"
          hide-details
          class="mt-n2"
          rounded
          dark
          readonly
        />
      </template>
      <template #item.orderedQuantity="{item}">
        <v-text-field
          outlined
          hide-details
          height="32"
          class="rounded-lg base my-2" dense
          :disabled="item.status==='ORDERED'"
          :rules="[formRules.required]"
          validate-on-blur
          color="#7631FF"
          v-model="item.orderedQuantity"
        />
      </template>
    </v-data-table>
    <v-divider />
    <div class="d-flex mt-6">
      <v-spacer />
      <v-btn
        class="text-capitalize rounded-lg font-weight-bold"
        color="#7631FF"
        dark
        height="44"
        width="133"
        @click="savePlanningOrder"
      >
        order
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AccessoryOrderPages",
  data() {
    return {
      status_enums: ["ORDERED", "CANCELLED", "PENDING"],

      headers: [
        { text: "", value: "isOrdered", sortable: false },
        {
          text: "Deadline",
          align: "start",
          sortable: false,
          value: "deadline",
        },
        { text: "Order №", value: "orderNumber", sortable: false },
        { text: "Model №", value: "modelNumber", sortable: false },
        { text: "Client", value: "client", sortable: false },
        {
          text: "Access name and specification",
          value: "accessNameAndSpecification",
          sortable: false,
          width: "200",
        },
        { text: "Status", value: "status", sortable: false, width:200 },
        { text: "Producing", value: "producingQuantity", sortable: false },
        { text: "M/U", value: "producingQuantityMUnit", sortable: false },
        { text: "Quantity for 1pc", value: "quantityOnePc", sortable: false },
        { text: "M/U", value: "quantityOnePcUnit", sortable: false },
        { text: "Total accessory", value: "totalAccessory", sortable: false },
        {
          text: "Price per unit",
          value: "pricePerUnit",
          sortable: false,
        },
        { text: "Ordering quantity", value: "orderedQuantity", sortable: false, width:150 },
        { text: "Total price", value: "totalPrice", sortable: false },
      ],
      details: {
        partnerName: "",
        warehouseCode: "",
        warehouseName: "",
        deliveryTime: "",
      },
      partnerName: "",
      warehouseCode: "",
      warehouseName: "",
      allPlannerOrder: [],
      new_valid: true,
      id: "",
    };
  },
  computed: {
    ...mapGetters({
      partnerLists: "plannedOrder/partnerLists",
      warehouseList: "plannedOrder/warehouseList",
      accessoryData: "accessory/accessoryData",
      plannedOrderList: "accessoryOrder/plannedOrderList",
      modelId: "accessory/newId",
    }),
  },
  watch: {
    plannedOrderList(val) {
      this.allPlannerOrder = JSON.parse(JSON.stringify(val));
    },
    partnerName(val) {
      if (!!val && val !== "") {
        this.getPartnerName(val);
      }
    },
    warehouseCode(val) {
      if (!!val && val !== "") this.getWarehouseCodeList({ code: val });
    },
    warehouseName(val) {
      if (!!val && val !== "") this.getWarehouseCodeList({ name: val });
    },
    "details.warehouseCode"(val) {
      this.details.warehouseName = val;
    },
    "details.warehouseName"(val) {
      this.details.warehouseCode = val;
    },
    accessoryData(val) {
      this.getPlannedOrderList({id:val.id});
    },
  },
  methods: {
    ...mapActions({
      getPartnerList: "models/getPartnerList",
      getPartnerName: "plannedOrder/getPartnerName",
      getWarehouseCodeList: "plannedOrder/getWarehouseCodeList",
      getPlannedOrderList: "accessoryOrder/getPlannedOrderList",
      createPlanningOrder: "accessoryOrder/createPlanningOrder",
      changeStatus: "accessoryOrder/changeStatus",
      getDocuments: "documents/getDocuments",
    }),
    savePlanningOrder() {
      const id = this.$route.params.id;
      const valid = this.$refs.valid.validate();
      if (valid) {
        const planningOrderRequests = []
        this.allPlannerOrder.forEach((item) => {
          if(item.isOrdered){
            planningOrderRequests.push({
              chartId:item.planningChartId,
              orderedQuantity:item.orderedQuantity,
            })
          }
        });
        
        const data = {
          deliveryTime: this.details.deliveryTime,
          partnerId: this.details.partnerName.id,
          planningOrderRequests,
        };
        console.log(data);
        this.createPlanningOrder({ data,id });
      }
    },

    changeStatusFunc(item){
      const id = this.$route.params.id;
      this.changeStatus({id:item.planningChartId,status:item.status,planningId:id})
    }
  },
  mounted() {
    const id = this.$route.params.id;
    if (id !== "create") {
      this.getPlannedOrderList(id);
    } else {
      this.getPlannedOrderList(id =this.$store.getters["accessory/newId"]);
    }
  },
};
</script>

<style lang="scss">
.custom-picker2 {
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
