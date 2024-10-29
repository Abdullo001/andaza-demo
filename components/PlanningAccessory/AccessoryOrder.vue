<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="allPlannerOrder"
      :items-per-page="100"
      class="elevation-0"
      v-model="selectedItems"
      show-select
      color="#544b99"
      hide-default-footer
      item-key="planningChartId"
    >
      <!-- Select all checkbox in header -->
      <template v-slot:[`header.data-table-select`]="{ props, on }">
        <v-simple-checkbox
          :value="props.value"
          :indeterminate="props.indeterminate"
          color="#544B99"
          v-on="on"
        />
      </template>

      <!-- Individual row checkboxes -->
      <template v-slot:item.data-table-select="{item, isSelected, select }">
        <div :class="{'checkbox-warning': showAlert && item.status !== 'ORDERED'}">
          <v-simple-checkbox
            v-if="item.status !== 'ORDERED'"
            :value="isSelected"
            :disabled="item.status === 'ORDERED'"
            color="#544B99"
            @input="(value) => handleRowSelect(value, select)"
          />
          <v-simple-checkbox
            v-else
            :value="true"
            :disabled="item.status === 'ORDERED'"
            color="#544B99"
            @input="(value) => handleRowSelect(value, select)"
          />
        </div>
      </template>

      <template #top>
        <v-card class="elevation-0">
          <v-card-text>
            <v-form v-model="new_valid" ref="valid" lazy-validation>
              <v-row class="mt-4">
                <v-col cols="12" lg="3">
                  <div class="label">{{ $t('fabricOrderingBox.plannedAccessoryOrderBox.partnerName') }}</div>
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
                    color="#544B99"
                    dense
                    :placeholder="$t('fabricOrderingBox.plannedAccessoryOrderBox.partnerName')"
                    append-icon="mdi-chevron-down"
                    :rules="[formRules.required]"
                    validate-on-blur
                  >
                    <template #append>
                      <v-icon color="#544B99">mdi-magnify</v-icon>
                    </template>
                  </v-combobox>
                </v-col>

                <v-col cols="12" lg="3">
                  <div class="label">{{$t('fabricOrderingBox.plannedAccessoryOrderBox.deliveryTime') }}</div>
                  <el-date-picker 
                    v-model="details.deliveryTime"
                    type="datetime"
                    style="width: 100%; height: 44px !important;"
                    :placeholder="$t('fabricOrderingBox.plannedAccessoryOrderBox.deliveryTime')"
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

      <template #item.deadline="{ item }">
        {{ formatLong(item.deadline) }}
      </template>

      <template #item.status="{ item }">
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

      <template #item.orderedQuantity="{ item }">
        <v-text-field
          v-model="item.orderedQuantity"
          outlined
          hide-details
          height="32"
          class="rounded-lg base my-2"
          dense
          :disabled="item.status === 'ORDERED'"
          :rules="[formRules.required]"
          validate-on-blur
          color="#544B99"
        />
      </template>
    </v-data-table>

    <v-divider />
    
    <v-alert
      v-model="showAlert"
      dismissible
      color="warning"
      border="left"
      class="mt-4"
      @click="showAlert = false"
    >
      {{ $t('alertText') }}
    </v-alert>

    <div class="d-flex mt-6">
      <v-spacer />
      <v-btn
        class="text-capitalize rounded-lg font-weight-bold"
        color="#544B99"
        dark
        height="44"
        width="133"
        @click="validateAndSave"
      >
        {{ $t('fabricOrderingBox.plannedAccessoryOrderBox.order') }}
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
      status_enums: ["ORDERED", "RECEIVED", "CANCELLED", "PENDING"],
      showAlert: false,
      headers: [
        {
          text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.deadline'),
          align: "start",
          sortable: false,
          value: "deadline",
        },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.orderNumber'), value: "orderNumber", sortable: false },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.modelNumber'), value: "modelNumber", sortable: false },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.client'), value: "client", sortable: false },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.supplierName'), value: "supplierName", sortable: false },
        {
          text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.accessNameSpecification'),
          value: "accessNameAndSpecification",
          sortable: false,
          width: "200",
        },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.status'), value: "status", sortable: false, width: 200 },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.producing'), value: "producingQuantity", sortable: false },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.measurementUnit'), value: "producingQuantityMUnit", sortable: false },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.quantityForOnePiece'), value: "quantityOnePc", sortable: false },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.measurementUnit'), value: "quantityOnePcUnit", sortable: false },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.totalAccessory'), value: "totalAccessory", sortable: false },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.pricePerUnit'), value: "pricePerUnit", sortable: false },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.orderingQuantity'), value: "orderedQuantity", sortable: false, width: 150 },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.totalPrice'), value: "totalPrice", sortable: false },
      ],
      details: {
        partnerName: "",
        deliveryTime: "",
      },
      partnerName: "",
      allPlannerOrder: [],
      new_valid: true,
      selectedItems: [],
    };
  },
  computed: {
    hasSelectedItems() {
      return this.selectedItems.length > 0;
    },
    ...mapGetters({
      partnerLists: "partners/partnerList",
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
      this.getPartnerList({ page: 0, size: 10, partnerName: val });
    },
    accessoryData(val) {
      this.getPlannedOrderList({ id: val.id });
    },
  },
  methods: {
    ...mapActions({
      getPartnerList: "partners/getPartnerList",
      getPlannedOrderList: "accessoryOrder/getPlannedOrderList",
      createPlanningOrder: "accessoryOrder/createPlanningOrder",
      changeStatus: "accessoryOrder/changeStatus",
    }),
    handleRowSelect(value, select) {
      select(value);
      this.handleCheckboxChange();  // This will ensure that the alert hides when items are selected
    },
    validateAndSave() {
      if (!this.hasSelectedItems) {
        this.showAlert = true;
        this.$nextTick(() => {
          const alertElement = document.querySelector('.v-alert');
          if (alertElement) {
            alertElement.scrollIntoView({ behavior: 'smooth' });
          }
        });
        return;
      }
      
      if (this.$refs.valid.validate()) {
        this.savePlanningOrder();
      }
    },
    handleCheckboxChange() {
      this.$nextTick(() => {
        if (this.hasSelectedItems) {
          this.showAlert = false;
        }
      });
    },
    savePlanningOrder() {
      const id = this.$route.params.id !== 'create' ? this.$route.params.id : this.$store.getters["accessory/newId"];
      
      const planningOrderRequests = this.selectedItems.filter(item=> item.status!=="ORDERED" )
      
      const data = {
        deliveryTime: this.details.deliveryTime,
        partnerId: this.details.partnerName.id,
        planningOrderRequests: planningOrderRequests.map(item=>({
          chartId:item.planningChartId,
          orderedQuantity:item.orderedQuantity
        })),
      };
      
      this.createPlanningOrder({ data, id });
    },
    changeStatusFunc(item) {
      const id = this.$route.params.id !== 'create' ? this.$route.params.id : this.$store.getters["accessory/newId"];
      this.changeStatus({
        id: item.planningChartId,
        status: item.status,
        planningId: id
      });
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.getPlannedOrderList(id !== "create" ? id : this.$store.getters["accessory/newId"]);
  },
};
</script>

<style lang="scss">
.checkbox-warning {
  border: 2px solid #ff5252;
  border-radius: 4px;
  padding: 2px;
  display: inline-block;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(255, 82, 82, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
  }
}

.margin-0 {
  margin: 0 !important;
}
</style>