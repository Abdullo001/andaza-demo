<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="accessoryAllData"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4 rounded-lg"
    >
      <template #top>
        <v-toolbar elevation="0" class="rounded-lg">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              Accessory planning chart
            </div>
            <v-btn
              color="#7631FF"
              class="rounded-lg white--text text-capitalize"
              @click="new_dialog = true"
              :disabled="checkId"
              :dark="!checkId"
            >
              <v-icon>mdi-plus</v-icon>
              Add Accessory
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider />
      </template>
      <template #item.actions="{ item }">
        <div>
          <v-btn icon color="green" @click.stop="editItem(item)">
            <v-img src="/edit-active.svg" max-width="22" />
          </v-btn>
          <v-btn icon color="red" @click.stop="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27" />
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Add Accessory</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" lazy-validation v-model="validate">
            <v-row>
              <v-col cols="12" md="6">
                <div class="label">Name</div>
                <v-select
                  v-model="create_accessory_chart.accessoryId"
                  :items="nameData"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  item-text="name"
                  item-value="id"
                  placeholder="Select Name"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Specification</div>
                <v-select
                  v-model="create_accessory_chart.specification"
                  :items="specificationData"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Select Specification"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Price per unit</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="create_accessory_chart.accessoryPricePerUnit"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    placeholder="0.0"
                    dense
                    color="#7631FF"
                    :rules="[formRules.required]"
                  />
                  <v-select
                    :items="currency_enums"
                    style="max-width: 100px"
                    outlined
                    hide-details
                    height="44"
                    dense
                    v-model="create_accessory_chart.accessoryPricePerCurrency"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    append-icon="mdi-chevron-down"
                    color="#7631FF"
                    :rules="[formRules.required]"
                  />
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Quantity per unit</div>
                <v-text-field
                  v-model="create_accessory_chart.quantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter Quantity"
                  dense
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Measurement unit</div>
                <v-select
                  :items="nameData"
                  v-model="create_accessory_chart.accessoryId"
                  item-text="measurementUnit"
                  readonly
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Select Measurement unit"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Wastage</div>
                <v-text-field
                  v-model="create_accessory_chart.wastage"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter Wastage"
                  dense
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Production quantity</div>
                <v-text-field
                  v-model="create_accessory_chart.productionQuantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter production quantity"
                  dense
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">Description</div>
                <v-textarea
                  v-model="create_accessory_chart.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  placeholder="Enter Canvas type"
                  dense
                  color="#7631FF"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#7631FF"
            width="163"
            @click="new_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="create"
          >
            add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit Accessory</div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form">
            <v-row>
              <v-col cols="12" md="6">
                <div class="label">Name</div>
                <v-text-field
                  v-model="edit_accessory_chart.name"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  disabled
                  placeholder="Select Name"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Specification</div>
                <v-text-field
                  v-model="edit_accessory_chart.specification"
                  disabled
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Select Specification"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Price per unit</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="edit_accessory_chart.pricePerUnit"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    placeholder="0.0"
                    dense
                    color="#7631FF"
                    :rules="[formRules.required]"
                  />
                  <v-select
                    :items="currency_enums"
                    style="max-width: 100px"
                    outlined
                    hide-details
                    height="44"
                    dense
                    v-model="edit_accessory_chart.pricePerUnitCurrency"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    append-icon="mdi-chevron-down"
                    color="#7631FF"
                    :rules="[formRules.required]"
                  />
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Quantity</div>
                <v-text-field
                  v-model="edit_accessory_chart.quantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter Quantity"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Measurement unit</div>
                <v-select
                  :items="nameData"
                  v-model="edit_accessory_chart.accessoryId"
                  item-text="measurementUnit"
                  item-value="id"
                  disabled
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Select Measurement unit"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Wastage</div>
                <v-text-field
                  v-model="edit_accessory_chart.wastage"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter Wastage"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Production quantity</div>
                <v-text-field
                  v-model="edit_accessory_chart.productionQuantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter production quantity"
                  dense
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">Description</div>
                <v-textarea
                  v-model="edit_accessory_chart.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  placeholder="Enter description"
                  dense
                  color="#7631FF"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#7631FF"
            width="163"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="update"
          >
            {{ $t('update') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40" />
        </div>
        <v-card-title class="d-flex justify-center"
          >Delete Accessory planning chart</v-card-title
        >
        <v-card-text>
          Are you sure you want to Delete this accessory planning chart?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            cancel
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteChart"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AccessoryChartPages",
  data() {
    return {
      validate: true,
      create_accessory_chart: {
        specification: null,
        accessoryId: null,
        accessoryPlanningId: null,
        accessoryPricePerCurrency: "",
        accessoryPricePerUnit: "",
        description: "",
        quantity: "",
        color:"",
        wastage: "",
      },
      edit_accessory_chart: {
        
      },
      delete_acceccory_chart: {},
      currency_enums: ["USD", "UZS", "RUB"],
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Specification", value: "specification" },
        { text: "Price P/U", value: "pricePerUnit" },
        { text: "Currency", value: "pricePerUnitCurrency" },
        { text: "Quantity", value: "quantity" },
        { text: "M/U", value: "quantityUnitName" },
        { text: "Wastage", value: "wastage" },
        { text: "Production Quantity", value: "productionQuantity" },
        { text: "totalAccessory", value: "totalAccessory" },
        { text: "Description", value: "description" },
        { text: "Actions", value: "actions", align: "center", sortable: false , width: 150},
      ],
    };
  },
  watch: {
    "create_accessory_chart.accessoryId"(val) {
      this.create_accessory_chart.specification = val;
      this.getAccessoryComposition(val)
    },
  },
  created() {
    this.getMeasurementUnit({ page: 0, size: 20 });
    this.getAccessoryList();
  },
  computed: {
    ...mapGetters({
      accessoryData: "accessory/accessoryData",
      measurementUnit: "measurement/measurementUnit",
      nameData: "accessoryChart/nameData",
      accessoryAllData: "accessoryChart/accessoryAllData",
      specificationData: "accessoryChart/specificationData",
    }),
    checkId() {
      const param = this.$route.params.id;
      if (param === 'create') {
        const id = this.$store.getters['accessory/newId']
        return id === null
      } else return false
    }
  },
  methods: {
    ...mapActions({
      getMeasurementUnit: "measurement/getMeasurementUnit",
      createChartAccessory: "accessoryChart/createChartAccessory",
      getAccessoryList: "accessoryChart/getAccessoryList",
      updateChartAccessory: "accessoryChart/updateChartAccessory",
      deleteChartAccessory: "accessoryChart/deleteChartAccessory",
      getChartAllData: "accessoryChart/getChartAllData",
      getAccessoryComposition: "accessoryChart/getAccessoryComposition",
    }),
    async deleteChart() {
      const items = this.delete_acceccory_chart;
      await this.deleteChartAccessory({
        id: items.id,
        accessoryPlanningId: items.accessoryPlanningId,
      });
      this.delete_dialog = false;
    },
    async update() {
      const edit_validate = this.$refs.edit_form.validate();
      if (edit_validate) {
        const items = {
          accessoryId: this.edit_accessory_chart.accessoryId,
          accessoryPlanningId: this.edit_accessory_chart.accessoryPlanningId,
          accessoryPricePerCurrency:
            this.edit_accessory_chart.pricePerUnitCurrency,
          accessoryPricePerUnit:
            this.edit_accessory_chart.pricePerUnit,
          description: this.edit_accessory_chart.description,
          id: this.edit_accessory_chart.id,
          productionQuantity:this.edit_accessory_chart.productionQuantity,
          quantity: this.edit_accessory_chart.quantity,
          wastage: this.edit_accessory_chart.wastage,
          specification:this.edit_accessory_chart.specification
        };
        await this.updateChartAccessory(items);
        this.edit_dialog = false;
      }
    },
    async create() {
      const validate = this.$refs.new_form.validate();
      if (validate) {

          this.create_accessory_chart.accessoryPlanningId =this.$route.params.id;
          await this.createChartAccessory(this.create_accessory_chart);
          this.new_dialog = false;
          this.$refs.new_form.reset();

      }
    },
    editItem(item) {
      this.edit_accessory_chart = { ...item };
      this.edit_dialog = true;
    },
    getDeleteItem(item) {
      this.delete_dialog = true;
      this.delete_acceccory_chart.id = item.id;
      this.delete_acceccory_chart.accessoryPlanningId =
        item.accessoryPlanningId;
    },
  },
  mounted() {
    const id = this.$route.params.id;
    if (id !== "create") {
      this.getChartAllData(id);
    }
  },
};
</script>

<style lang="sass"></style>
