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
      item-key="accessoryPlanningChartId"
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
            v-if="!item.plannedOrderStatus || item.plannedOrderStatus==='PENDING'"
            :value="isSelected"
            :disabled="item.plannedOrderStatus || item.plannedOrderStatus==='PENDING'"
            color="#544B99"
            @input="(value) => handleRowSelect(value, select)"
          />
          <v-simple-checkbox
            v-else
            :value="true"
            :disabled="!item.plannedOrderStatus || item.plannedOrderStatus!=='PENDING'"
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
                    :items="partnerWithTypes"
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
      <template #item.accessoryPhoto="{item}">
        <v-img
        v-if="!!item.accessoryPhoto"
        :src="item?.accessoryPhoto"
        class="mr-2"
        width="40"
        height="40"
        @click="showImage(item.accessoryPhoto)"
      />
      </template>

      <template #item.deadline="{ item }">
        {{ formatLong(item.deadline) }}
      </template>

      <template #item.status="{ item }">
        <v-select
          :background-color="statusColor.fabricOrderedStatus(item.plannedOrderStatus)"
          :items="status_enums"
          @change="changeStatusFunc(item)"
          append-icon="mdi-chevron-down"
          v-model="item.plannedOrderStatus"
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
    <v-dialog max-width="590" v-model="image_dialog">
      <v-card >
        <v-card-title class="d-flex">
          <v-spacer/>
          <v-btn icon color="#544B99" large @click="image_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-img :src="currentImage" height="500" class="mb-4" contain/>
        </v-card-text>
      </v-card>
    </v-dialog>
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
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.supplierName'), value: "supplier", sortable: false },
        { text: this.$t("accessoryPlanning.nameNSpecification"), value: "accessNameAndSpecification", sortable: false, width: 200 },
        { text:this.$t('fabricOrderingBox.addAccessoryBox.accessoryPhoto'), value: "accessoryPhoto", sortable:false },
        { text: "M/U", value: "measurementUnit", sortable:false },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.pricePerUnit'), value: "pricePerUnit", sortable: false },
        { text: this.$t("accessoryPlanning.actualOrderQuantityOfAcc"), value: "actualOrderQuantity", sortable: false },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.totalPrice'), value: "totalPrice", sortable: false },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.status'), value: "status", sortable: false, width: 200 },
      ],
      details: {
        partnerName: "",
        deliveryTime: "",
      },
      partnerName: "",
      allPlannerOrder: [],
      new_valid: true,
      selectedItems: [],
      currentImage:"",
      image_dialog:false,
    };
  },
  created(){
    this.getPartnersWithTypes(["supplier"])
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
      partnerWithTypes: "partners/partnerWithTypes",
      sizes: "sizeDistribution/sizes",
      selectedAccessory: "accessoryChart/selectedAccessory",
    }),
  },
  watch: {
    plannedOrderList(list) {
      const specialList = list.map(function (el) {
        const value = {};
        const sizesList = [];
        el?.sizeDistributions?.forEach((item) => {
          value[item.size] = item.quantity
          sizesList.push({size: item.size, quantity: item.quantity})
        });

        return {
          ...value,
          ...el,
          sizeDistributions: [...sizesList],

        }
      })
      this.allPlannerOrder = JSON.parse(JSON.stringify(specialList));
    },
    accessoryData(val) {
      this.getPlannedOrderList({ id: val.id });
    },
    sizes(val){
      const items=[]
      this.headers= [
        {
          text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.deadline'),
          align: "start",
          sortable: false,
          value: "deadline",
        },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.supplierName'), value: "supplier", sortable: false },
        { text: this.$t("accessoryPlanning.nameNSpecification"), value: "accessNameAndSpecification", sortable: false, width: 200 },
        { text:this.$t('fabricOrderingBox.addAccessoryBox.accessoryPhoto'), value: "accessoryPhoto", sortable:false },
        { text: "M/U", value: "measurementUnit", sortable:false },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.pricePerUnit'), value: "pricePerUnit", sortable: false },
      ],
      val.forEach((item)=>{
        items.push(
          {
            size:item,
            quantity:null,
          }
        )
        this.headers.push({
          text: item, sortable: false, align: 'start', value: item
        })
      })
      this.sizeDistributions=JSON.parse(JSON.stringify(items))

      this.headers.push(
        { text: this.$t("accessoryPlanning.actualOrderQuantityOfAcc"), value: "actualOrderQuantity", sortable: false },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.totalPrice'), value: "totalPrice", sortable: false },
        { text: this.$t('fabricOrderingBox.plannedAccessoryOrderBox.status'), value: "status", sortable: false, width: 200 },
      )
    },
  },
  methods: {
    ...mapActions({
      getPlannedOrderList: "accessoryOrder/getPlannedOrderList",
      createPlanningOrder: "accessoryOrder/createPlanningOrder",
      changeStatus: "accessoryOrder/changeStatus",
      getPartnersWithTypes: "partners/getPartnersWithTypes",
      getSizeDistribution: "sizeDistribution/getSizeDistribution",
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
    showImage(photo) {
      this.currentImage = photo;
      this.image_dialog = true;
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
          chartId:item.accessoryPlanningChartId,
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
    this.getSizeDistribution({modelId:this.selectedAccessory.modelId})

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
