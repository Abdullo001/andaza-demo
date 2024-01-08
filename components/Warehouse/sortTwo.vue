<template>
  <div>
    <v-data-table
      item-key="id"
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="items"
      :items-per-page="10"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
    >
      <template #top>
        <v-card flat>
          <div class="title mt-0 ma-4">2-sort</div>
        </v-card>
      </template>
      <template #item.actions="{item}">
        <v-tooltip
          top
          color="#544B99"
          class="pointer"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
              @click="showHistory(item)"
            >
              <v-img src="/history.svg" max-width="21"/>
            </v-btn>
          </template>
          <span class="text-capitalize">History</span>
        </v-tooltip>
        <v-tooltip
          top
          color="#544B99"
          class="pointer"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
              @click="sortTwoBtn(item)"
            >
              <v-img src="/dollar.svg" max-width="21"/>
            </v-btn>
          </template>
          <span class="text-capitalize">Selling</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <v-dialog v-model="history_dialog" max-width="700">
      <v-card flat>
        <v-card-title>
          <div class="title">History</div>
          <v-spacer/>
          <v-btn
            icon
            @click="history_dialog=false"
            color="#544B99"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="historyHeaders"
            hide-default-footer
            :items="historyList"
            class="mt-4 rounded-lg"
            style="border: 1px solid #E9EAEB"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="sortTwo_dialog" width="1000">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Selling 2 sorts</div>
          <v-btn icon color="#544B99" @click="sortTwo_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="sortTwo_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="3" v-for="(item, idx) in selectedItem.sizeDistributions" :key="`_cutting_${idx}`">
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model.number="item.quantity"
                  placeholder="0"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base "
                  validate-on-blur
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Selling price</div>
                <div class="d-flex align-center">
                  <v-text-field
                    height="44"
                    v-model="sortTwo.sellingPrice"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    color="#544B99"
                    outlined
                    hide-details
                    dense
                    placeholder="Enter selling price"
                  />
                  <v-select
                    :items="currency_nums"
                    style="max-width: 100px"
                    dense
                    v-model="sortTwo.sellingPriceCurrency"
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
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('listsModels.modelPartsTable.table.comment') }}</div>
                <div class="d-flex align-center">
                  <v-text-field
                    height="44"
                    v-model="sortTwo.comment"
                    class="rounded-lg base rounded-l-lg"
                    color="#544B99"
                    outlined
                    hide-details
                    dense
                    placeholder="Add comment"
                  />
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="130"
            @click="sortTwo_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="130"
            @click="save"
          >
            {{ this.title === "sell" ? "Sell" : this.title === "edit" ? "Update" : "Sell" }}
          </v-btn>
        </v-card-actions>
        <v-data-table
          :headers="sortTwoHistoryHeaders"
          hide-default-footer
          :items="historyListSortTwo"
          class="mt-4 rounded-lg"
          style="border: 1px solid #E9EAEB"
        >
          <template #item.actions="{ item, index }">
            <div>
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
                    @click="editRow(item, index)"
                  >
                    <v-img src="/edit-active.svg" max-width="22"/>
                  </v-btn>

                </template>
                <span class="text-capitalize">{{ $t('Edit') }}</span>
              </v-tooltip>

              <v-tooltip
                top
                class="pointer"
                v-if="Object.keys(item).length > 2"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    color="red"
                    @click="deleteRow(item)"
                  >
                    <v-img src="/delete.svg" max-width="27"/>
                  </v-btn>
                </template>
                <span>{{ $t('delete') }}</span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete History</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this history?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{ $t('cancel') }}
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            @click="deleteHistory"
            dark
          >
            {{ $t('delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import sortTwo from "@/components/Warehouse/sortTwo.vue";

export default {
  name: 'SortTwo',
  data() {
    return {
      sortTwo_dialog: false,
      sortTwo_validate: true,
      delete_dialog: false,
      selectedItem: {},
      sortTwo: {
        comment: "",
        sellingPrice: "",
        sellingPriceCurrency: "",
      },
      headers: [
        {text: 'Main colors', align: 'start', sortable: false, value: 'mainColors'},
        {text: '24', align: 'start', sortable: false, value: '24'},
        {text: '26', align: 'start', sortable: false, value: '26'},
        {text: '28', align: 'start', sortable: false, value: '28'},
        {text: '30', align: 'start', sortable: false, value: '30'},
        {text: 'Total', align: 'start', sortable: false, value: 'total'},
        {text: 'Real price', align: 'start', sortable: false, value: 'realPrice'},
        {
          text: this.$t('prefinances.child.calculationsHeaders.soldPrice'),
          align: 'start',
          sortable: false,
          value: 'soldPrice'
        },
        {text: this.$t('listsModels.modelPartsTable.table.comment'), align: 'start', sortable: false, value: 'comment'},
        {text: this.$t('actions'), align: 'end', sortable: false, value: 'actions'},
      ],
      history_dialog: '',
      historyHeaders: [
        {
          text: this.$t('planningProduction.planning.createdDate'),
          sortable: false,
          align: 'start',
          value: 'createdDate'
        },
        {text: 'Done By', sortable: false, align: 'center', value: 'createdBy'},
      ],
      sortTwoHistoryHeaders: [
        {
          text: this.$t('planningProduction.planning.createdDate'),
          sortable: false,
          align: 'start',
          value: 'createdDate'
        },
        {text: 'Total', sortable: false, align: 'start', value: 'total'},
        {text: 'Selling price', sortable: false, align: 'start', value: 'sellingPrice'},
        {text: 'Total sold amount', sortable: false, align: 'start', value: 'sellingPrice'},
        {text: 'Sold by', sortable: false, align: 'start', value: 'soldBy'},
        {text: this.$t('listsModels.modelPartsTable.table.comment'), sortable: false, align: 'start', value: 'comment'},
        {text: this.$t('actions'), sortable: false, align: 'start', value: 'actions'},
      ],
      title: "sell",
      colorSpecification: "",
      historyList: [],
      historyListSortTwo: [],
      items: [],
      deleteRowItemId: null,
      warehouseId: null,
      currency_nums: ["UZS", "USD", "RUB"]
    }
  },

  computed: {
    ...mapGetters({
      secondClassList: "readyGarmentWarehouse/secondClassList",
      historyServerList: "readyGarmentWarehouse/historyList",
      sortTwoHistoryList: "readyGarmentWarehouse/sortTwoHistoryList",
    })
  },

  watch: {
    secondClassList(list) {
      this.headers = [
        {text: 'Color', sortable: false, align: 'start', value: 'colorSpecification'},
      ],

        list[0]?.sizeDistributionList?.forEach((item) => {
          this.headers.push({
            text: item.size, sortable: false, align: 'start', value: item.size
          })
        })

      this.headers.push(
        {text: 'Produced total', sortable: false, align: 'start', value: 'total'},
        {text: 'Real price', sortable: false, align: 'start', value: 'price'},
        {text: 'Total sold amount', sortable: false, align: 'start', value: 'totalPrice'},
        {text: this.$t('actions'), sortable: false, align: 'start', value: 'actions'},
      )

      const specialList = list.map(function (el) {
        const value = {};
        const sizesList = [];
        el?.sizeDistributionList.forEach((item) => {
          value[item.size] = item.quantity
          sizesList.push({size: item.size, quantity: 0})
        });

        return {
          ...value,
          ...el,
          sizeDistributions: [...sizesList],

        }
      })
      this.items = JSON.parse(JSON.stringify(specialList))
    },
    sortTwoHistoryList(list) {
      this.sortTwoHistoryHeaders = [
        {
          text: this.$t('planningProduction.planning.createdDate'),
          sortable: false,
          align: 'start',
          value: 'createdDate'
        },
      ],
        list[0]?.sizeDistributionList?.forEach((item) => {
          this.sortTwoHistoryHeaders.push({
            text: item.size, sortable: false, align: 'start', value: item.size
          })
        })
      this.sortTwoHistoryHeaders.push(
        {text: 'Total', sortable: false, align: 'start', value: 'total'},
        {text: 'Selling price', sortable: false, align: 'start', value: 'sellingPrice'},
        {text: 'Total sold amount', sortable: false, align: 'start', value: 'sellingTotalPrice'},
        {text: 'Sold by', sortable: false, align: 'start', value: 'createdBy'},
        {text: this.$t('listsModels.modelPartsTable.table.comment'), sortable: false, align: 'start', value: 'comment'},
        {text: this.$t('actions'), sortable: false, align: 'start', value: 'actions'},
      )
      const specialList = list.map(function (el) {
        const value = {};
        const sizesList = [];
        el?.sizeDistributionList.forEach((item) => {
          value[item.size] = item.quantity
          sizesList.push({size: item.size, quantity: item.quantity})
        });
        return {
          ...el,
          ...value,
          sizeDistributions: [...sizesList],
        }
      })
      this.historyListSortTwo = JSON.parse(JSON.stringify(specialList))
    },
    historyServerList(list) {
      this.historyHeaders = [
        {
          text: this.$t('planningProduction.planning.createdDate'),
          sortable: false,
          align: 'start',
          value: 'createdDate'
        },
      ],
        list[0]?.sizeDistributionList?.forEach((item) => {
          this.historyHeaders.push({
            text: item.size, sortable: false, align: 'start', value: item.size
          })
        })
      this.historyHeaders.push(
        {text: 'Total', sortable: false, align: 'center', value: 'total'},
        {text: 'Done By', sortable: false, align: 'center', value: 'createdBy'},
      )

      const specialList = list.map(function (el) {
        const value = {};
        const sizesList = [];
        el?.sizeDistributionList.forEach((item) => {
          value[item.size] = item.quantity
          sizesList.push({size: item.size, quantity: item.quantity})
        });
        return {
          ...el,
          ...value,
          sizeDistributions: [...sizesList],
        }
      })
      this.historyList = JSON.parse(JSON.stringify(specialList))
    },
  },

  methods: {
    ...mapActions({
      getWarehouseListEachSort: "readyGarmentWarehouse/getWarehouseListEachSort",
      getWarehouseHistoryList: "readyGarmentWarehouse/getWarehouseHistoryList",
      getSortTwoHistoryList: "readyGarmentWarehouse/getSortTwoHistoryList",
      putWarehouseListTwoSort: "readyGarmentWarehouse/putWarehouseListTwoSort",
      updateHistoryList: "readyGarmentWarehouse/updateHistoryListTwoSort",
      deleteSortTwoHistory: "readyGarmentWarehouse/deleteSortTwoHistory"
    }),
    showHistory(item) {
      this.getWarehouseHistoryList({
        warehouseId: this.warehouseId,
        operationType: "SECOND_CLASS",
        color: item.colorSpecification
      })
      this.history_dialog = true
    },
    save() {
      if (this.title === "sell") {
        this.sortTwo_dialog = false;
        const data = {
          colorSpecification: this.selectedItem.colorSpecification,
          operationType: "SECOND_CLASS",
          comment: this.sortTwo.comment,
          sellingPrice: this.sortTwo.sellingPrice,
          sellingPriceCurrency: this.sortTwo.sellingPriceCurrency,
          warehouseId: this.warehouseId,
          sizeDistributions: [...this.selectedItem.sizeDistributions],
        }
        this.putWarehouseListTwoSort({data, operationType: "SECOND_CLASS", warehouseId: this.warehouseId})
        this.sortTwo.comment = "";
        this.sortTwo.sellingPrice = "";
        this.sortTwo.sellingPriceCurrency = "";
      } else if (this.title === "edit") {
        const data = {
          comment: this.sortTwo.comment,
          id: this.sortTwo.id,
          sellingPrice: this.sortTwo.sellingPrice,
          sellingPriceCurrency: this.sortTwo.sellingPriceCurrency,
          sizeDistributions: [...this.selectedItem.sizeDistributions]
        }
        this.updateHistoryList({
          data,
          operationType: "SECOND_CLASS",
          warehouseId: this.warehouseId,
          color: this.colorSpecification
        });
        this.sortTwo.comment = "";
        this.sortTwo.sellingPrice = "";
        this.sortTwo.sellingPriceCurrency = "";
        this.title = "sell";
      }
    },
    sortTwoBtn(item) {
      this.title = 'sell';
      this.sortTwo_dialog = true;
      this.selectedItem = {...item};
      this.colorSpecification = item.colorSpecification;
      this.getSortTwoHistoryList({
        warehouseId: this.warehouseId,
        operationType: "SECOND_CLASS",
        color: item.colorSpecification
      });
    },
    editRow(item) {
      this.title = "edit";
      this.sortTwo.sellingPrice = item.sellingPrice.split(" ")[0];
      this.sortTwo.sellingPriceCurrency = item.sellingPrice.split(" ")[1];
      this.selectedItem.sizeDistributions = [...item.sizeDistributions];
      this.sortTwo.comment = item.comment;
      this.sortTwo.id = item.id;
    },
    deleteRow(item) {
      this.delete_dialog = true
      this.deleteRowItemId = item.id
    },
    deleteHistory() {
      this.deleteSortTwoHistory({
        id: this.deleteRowItemId,
        warehouseId: this.warehouseId,
        operationType: "SECOND_CLASS",
        color: this.colorSpecification
      })
      this.delete_dialog = false
    }
  },

  mounted() {
    this.warehouseId = this.$route.params.id
    this.getWarehouseListEachSort({warehouseId: this.warehouseId, operationType: "SECOND_CLASS"})
  }

}
</script>

<style lang="scss" scoped>

</style>
