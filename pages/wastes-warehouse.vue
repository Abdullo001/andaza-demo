<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              placeholder="Model №"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.modelNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              placeholder="Wastes name"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.name"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2">
            <div style="height: 40px !important">
              <el-date-picker
                v-model="filters.from"
                type="datetime"
                style="width: 100%; height: 100%"
                class="filter_picker"
                placeholder="From"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </div>
          </v-col>
          <v-col cols="12" lg="2">
            <div style="height: 40px !important">
              <el-date-picker
                v-model="filters.from"
                type="datetime"
                style="width: 100%; height: 100%"
                placeholder="To"
                class="filter_picker"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </div>
          </v-col>
          <v-spacer />
          <v-col cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn
                width="140"
                outlined
                color="#544B99"
                elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                Reset
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                Search
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>

    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="current_list"
      :items-per-page="10"
      hide-default-footer
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      :server-items-length="10"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>Wastes warehouse</div>
            <div>
              <v-btn
                color="#544B99"
                dark
                class="text-capitalize rounded-lg"
                @click="addWastes"
              >
                <v-icon>mdi-plus</v-icon>
                Add wastes
              </v-btn>
            </div>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.quantity="{ item }">
        <div style="color: #f2c62c">
          {{ item.quantity }}
        </div>
      </template>
      <template #item.totalPrice="{ item }">
        <div style="color: #f2c62c">
          {{ item.totalPrice }}
        </div>
      </template>
      <template #item.inputQuantity="{ item }">
        <div style="color: #ff0000">
          {{ item.inputQuantity }}
        </div>
      </template>
      <template #item.inputPrice="{ item }">
        <div style="color: #ff0000">
          {{ item.inputPrice }}
        </div>
      </template>
      <template #item.outputQuantity="{ item }">
        <div style="color: #08b137">
          {{ item.outputQuantity }}
        </div>
      </template>
      <template #item.outputPrice="{ item }">
        <div style="color: #08b137">
          {{ item.outputPrice }}
        </div>
      </template>
      <template #item.remainingQuantity="{ item }">
        <div style="color: #f2c62c">
          {{ item.remainingQuantity }}
        </div>
      </template>
      <template #item.remainingTotalPrice="{ item }">
        <div style="color: #f2c62c">
          {{ item.remainingTotalPrice }}
        </div>
      </template>

      <template #item.actions="{ item }">
        <div class="d-flex">
          <v-tooltip
            top
            color="#544B99"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="#544B99"
                @click="spendFunc(item)"
              >
                <v-img src="/spend-icon.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">Sell</span>
          </v-tooltip>

          <v-tooltip
            top
            color="#544B99"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="#544B99"
                @click="getHistory(item)"
              >
                <v-img src="/history.svg" max-width="20" />
              </v-btn>
            </template>
            <span class="text-capitalize">History</span>
          </v-tooltip>
          <v-tooltip
            top
            color="green"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="green"
                @click="editItem(item)"
              >
                <v-img src="/edit-active.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">Edit</span>
          </v-tooltip>
          <v-tooltip
            top
            color="red"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="red"
                @click="getDeleteItem(item)"
              >
                <v-img src="/delete.svg" max-width="27" />
              </v-btn>
            </template>
            <span class="text-capitalize">Delete</span>
          </v-tooltip>
        </div>
      </template>

      <template v-slot:body.append>
        <tr>
          <td></td>
          <td class="text-capitalize text-body-1 font-weight-bold">total:</td>
          <td colspan="4"></td>
          <td class="font-weight-bold text-body-1" style="color: #f2c62c">
            {{ totalBeginQuantity }}
          </td>
          <td class="font-weight-bold text-body-1" style="color: #f2c62c">
            {{ totalBeginPrice }}
          </td>
          <td class="font-weight-bold text-body-1" style="color: #ff0000">
            {{ totalInputQuantity }}
          </td>
          <td class="font-weight-bold text-body-1" style="color: #ff0000">
            {{ totalInputPrice }}
          </td>
          <td class="font-weight-bold text-body-1" style="color: #08b137">
            {{ totalOutputQuantity }}
          </td>
          <td class="font-weight-bold text-body-1" style="color: #08b137">
            {{ totalOutputPrice }}
          </td>
          <td class="font-weight-bold text-body-1" style="color: #f2c62c">
            {{ totalRemainingQuantity }}
          </td>
          <td class="font-weight-bold text-body-1" style="color: #f2c62c">
            {{ totalRemainingPrice }}
          </td>
          <td></td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="800">
      <v-card elevation="0">
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">{{ title }} wastes</div>
          <v-btn icon color="#544B99" @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">Name of wastes</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="currentItem.name"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter name of wastes"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Model No.</div>
                <v-combobox
                  v-model="currentItem.modelNumber"
                  :items="modelsList"
                  :search-input.sync="searchModelNumber"
                  item-text="modelNumber"
                  item-value="modelNumber"
                  validate-on-blur
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base d-flex align-center justify-center mr-2"
                  :return-object="true"
                  dense
                  placeholder="Select model number"
                  prepend-icon=""
                >
                  <template #append>
                    <v-icon class="d-inline-block" color="#544B99">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" lg="6">
                <div>
                  <div class="label">Wastes quantity</div>
                  <div class="d-flex align-center">
                    <v-text-field
                      v-model="currentItem.quantity"
                      placeholder="Enter quantity"
                      outlined
                      hide-details
                      height="44"
                      class="rounded-lg base rounded-l-lg rounded-r-0"
                      validate-on-blur
                      dense
                      color="#544B99"
                    />
                    <v-select
                      v-model="currentItem.measurementUnitId"
                      :items="measurementUnit"
                      style="max-width: 120px"
                      item-text="name"
                      item-value="id"
                      dense
                      outlined
                      hide-details
                      height="44"
                      class="rounded-lg base rounded-r-lg rounded-l-0"
                      validate-on-blur
                      placeholder=""
                      append-icon="mdi-chevron-down"
                      color="#544B99"
                    />
                  </div>
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Selling price</div>
                <div class="d-flex align-center">
                  <v-text-field
                    :rules="[formRules.required]"
                    v-model="currentItem.price"
                    outlined
                    hide-details
                    height="44"
                    dense
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    placeholder="Enter price"
                    color="#544B99"
                  />
                  <v-select
                    v-model="currentItem.currency"
                    :items="currency_list"
                    style="max-width: 120px"
                    dense
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    validate-on-blur
                    placeholder=""
                    append-icon="mdi-chevron-down"
                    color="#544B99"
                  />
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="text-capitalize rounded-lg font-weight-bold mr-6"
            color="#544B99"
            width="163"
            @click="dialog = false"
            >cancel
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="saveWaste"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="sellingDialog" width="800">
      <v-card elevation="0">
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Selling wastes</div>
          <v-btn icon color="#544B99" @click="sellingDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">Quantity</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="sellingWastes.quantity"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter quantity"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Customer</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="sellingWastes.customer"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter customers name"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="12">
                <div class="label">Description</div>
                <v-text-field
                  v-model="sellingWastes.description"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter description"
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
          <div class="d-flex justify-center pb-4 pt-8">
            <v-btn
              outlined
              class="text-capitalize rounded-lg font-weight-bold mr-6"
              color="#544B99"
              width="163"
              @click="sellingDialog = false"
              >cancel
            </v-btn>
            <v-btn
              class="text-capitalize rounded-lg font-weight-bold"
              color="#544B99"
              dark
              width="163"
            >
              Create
            </v-btn>
          </div>
          <v-divider />

          <v-data-table
            class="rounded-lg"
            :headers="sellingHistoryHeader"
            :items="sellingHistoryItems"
            hide-default-footer
          >
            <template #top>
              <v-toolbar elevation="0">
                <v-toolbar-title
                  class="d-flex w-full align-center justify-space-between"
                >
                  <div>History</div>
                </v-toolbar-title>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="historyDialog" width="600">
      <v-card elevation="0">
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">In/Output history</div>
          <v-btn icon color="#544B99" @click="historyDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            class="rounded-lg"
            :headers="historyDialogHeaders"
            :items="historyItems"
            hide-default-footer
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>

    <DeleteDialog v-bind="deleteData" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DeleteDialog from "../components/DeleteDialog.vue";
export default {
  components: {
    DeleteDialog,
  },
  data() {
    return {
      sellingDialog: false,
      new_validate: true,
      dialog: false,
      searchModelNumber: "",
      title: "Add",
      totalBeginQuantity: 100,
      totalBeginPrice: 100,
      totalInputQuantity: 100,
      totalInputPrice: 100,
      totalOutputQuantity: 100,
      totalOutputPrice: 100,
      totalRemainingQuantity: 100,
      totalRemainingPrice: 100,
      valid_search: true,
      filters: {},
      currentItem: {},
      current_list: [
        {
          id: 1,
          name: "Waste A",
          modelNumber: "W001",
          measurementUnit: "kg",
          price: 10,
          currency: "USD",
          quantity: 100,
          totalPrice: 1000,
          inputQuantity: 50,
          outputQuantity: 30,
          outputPrice: 300,
          remainingQuantity: 70,
          remainingTotalPrice: 700,
          actions: "Edit/Delete", // Example actions
        },
        {
          id: 2,
          name: "Waste B",
          modelNumber: "W002",
          measurementUnit: "kg",
          price: 15,
          currency: "USD",
          quantity: 200,
          totalPrice: 3000,
          inputQuantity: 80,
          outputQuantity: 50,
          outputPrice: 750,
          remainingQuantity: 150,
          remainingTotalPrice: 2250,
          actions: "Edit/Delete", // Example actions
        },
      ],
      headers: [
        { text: "No.", value: "id", sortable: false },
        { text: "Name of wastes", value: "name", sortable: false },
        { text: "Model No.", value: "modelNumber", sortable: false },
        { text: "M/U", value: "measurementUnit", sortable: false },
        { text: "Price", value: "price", sortable: false },
        { text: "Currency", value: "currency", sortable: false },
        { text: "Begin. of period (qty)", value: "quantity", sortable: false },
        {
          text: "Begin.of perion (tot.pr)",
          value: "totalPrice",
          sortable: false,
        },
        { text: "Total input q-ty", value: "inputQuantity", sortable: false },
        { text: "Total input price", value: "inputPrice", sortable: false },
        { text: "Total output q-ty", value: "outputQuantity", sortable: false },
        { text: "Total output price", value: "outputPrice", sortable: false },
        { text: "Remaining q-ty", value: "remainingQuantity", sortable: false },
        {
          text: "Remaining total price",
          value: "remainingTotalPrice",
          sortable: false,
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          width: 150,
          align: "center",
        },
      ],
      sellingHistoryHeader: [
        { text: "Date", value: "date", sortable: false },
        { text: "Quantity", value: "quantity", sortable: false },
        { text: "Total price", value: "totalPrice", sortable: false },
        { text: "Customer", value: "customer", sortable: false },
        { text: "Description", value: "description", sortable: false },
      ],
      sellingHistoryItems: [],
      currency_list:["USD","UZS","RUB"],
      sellingWastes: {},
      historyDialog: false,
      historyItems: [],
      historyDialogHeaders: [
        { text: "Date", value: "date", sortable: false },
        { text: "Moving", value: "moving", sortable: false },
        { text: "Quantity", value: "quantity", sortable: false },
        { text: "Total price", value: "totalPrice", sortable: false },
      ],
      selectItem: {},
      deleteDialog: false,
    };
  },

  created() {
    this.getMeasurementUnit({ page: 0, size: 20 });
    this.getModelsList({
      page: 0,
      size: 10,
      modelNumber: "",
      partner: "",
    });
  },

  computed: {
    ...mapGetters({
      measurementUnit: "measurement/measurementUnit",
      modelsList: "models/modelsList",
    }),

    deleteData: {
      get() {
        return {
          deleteDialog: this.deleteDialog,
          deleteFunction: () => {},
          closeDialog: () => {
            this.deleteDialog = false;
          },
        };
      },
    },
  },

  watch: {
    searchModelNumber(val) {
      this.getModelsList({
        page: 0,
        size: 10,
        modelNumber: val,
        partner: "",
      });
    },
  },

  methods: {
    ...mapActions({
      getMeasurementUnit: "measurement/getMeasurementUnit",
      getModelsList: "models/getModelsList",
      getWastesList: "wastesWarehouse/getWastesList",
      createWaste: "wastesWarehouse/createWaste",
    }),
    resetFilters() {},
    filterData() {},
    addWastes() {
      this.dialog = true;
    },
    spendFunc(item) {
      this.sellingWastes.id = item.id;
      this.sellingDialog = true;
    },
    getHistory(item) {
      this.historyDialog = true;
      this.selectItem = { ...item };
    },
    getDeleteItem() {
      this.deleteDialog = true;
    },
    saveWaste(){
      const data={
        ...this.currentItem,
        modelId:this.currentItem.modelNumber.id
      }
      delete data.modelNumber
      this.createWaste(data)
      this.dialog=false
    }
  },

  mounted() {
    this.$store.commit("setPageTitle", "Wastes warehouse");
    this.getWastesList({ page: 0, size: 10 });
  },
};
</script>
<style lang=""></style>
