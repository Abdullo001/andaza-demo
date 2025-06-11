<template>
  <v-card class="py-4">
    <v-overlay :value="loading" absolute style="z-index: 6">
      <v-progress-circular color="#544B99" indeterminate size="80" />
    </v-overlay>

    <div style="overflow-x: auto">
      <div style="height: 40px !important" class="d-flex mb-4 px-4">
        <v-text-field
          outlined
          hide-details
          dense
          height="44"
          class="rounded-lg base"
          color="#544B99"
          placeholder="Search employees"
          v-model.trim="filterName"
        >
          <template #append>
            <v-icon color="#544B99">mdi-magnify</v-icon>
          </template>
        </v-text-field>
        <v-spacer />
        <el-date-picker
          v-model="reportDate"
          :picker-options="pickerShortcuts"
          class="base_picker"
          placeholder="yyyy.MM.dd"
          style="height: 100%"
          type="date"
          value-format="timestamp"
        >
        </el-date-picker>
      </div>
      <v-simple-table class="min-w-800" height="80vh" fixed-header dense>
        <thead>
          <tr class="text-center first-header">
            <th
              v-for="(header, idx) in headers"
              :key="idx"
              :class="`th-text ${idx < 2 ? `sticky-column` : ``}`"
            >
              {{ header.text }}
            </th>
            <th class="th-text " style="width: 60px; height: 100%">
              Total
            </th>
            <th
              v-for="(header, idx) in mainList[0]?.customOperations"
              :key="`cus-${idx}`"
              class="th-text"
            >
              {{ header.name }}
            </th>
            <th class="th-text d-flex align-center" style="width: 120px; height: 50px">
              <v-tooltip
                top
                color="#544B99"
                class="pointer"
              >
                <template #activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" color="#544B99" @click="openCustomColDialog">
                    <v-img src="/plus.svg" max-width="22" />
                  </v-btn>
                </template>
                <span class="text-capitalize">Add column</span>
              </v-tooltip>
              Actions
            </th>
          </tr>
          <tr v-if="mainList.length" class="text-center second-header">
            <th class="sticky-column z-5" style="border-right: 0"></th>
            <th class="sticky-column z-5" style="border-left: 0">
              Payment amount per operation
            </th>
            <th v-for="(operation, idx) in mainList[0].operations" :key="idx">
              {{ operation.amount }}
            </th>
            <th>{{ sumAllOperationPrice(mainList[0].operations) }}</th>
            <th  v-for="(operation, idx) in mainList[0].customOperations" :key="`${mainList[0].operations.length+idx}`">{{ operation.amount }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in mainList" :key="idx">
            <td class="sticky-column z-5">{{ item.orderNo }}</td>
            <td class="sticky-column z-5">{{ item.fullName }}</td>
            <td
              v-for="(operation, opIdx) in item.operations"
              :key="`td-${opIdx}`"
              class="p0"
            >
              <div class="h-100 d-flex align-center tooltipBox">
                <input
                  type="text"
                  :value="operation.quantity"
                  @input="updateQuantity($event, idx, opIdx)"
                  @keydown="handleKeydown($event, idx, opIdx)"
                  @keypress="onlyNumbers"
                  :ref="`input-${idx}-${opIdx}`"
                  :disabled="workLogsInfo.isFinished"
                  @focus="showTooltip(idx, opIdx)"
                  @blur="hideTooltip(idx, opIdx)"
                  :class="`cell ${
                    footer[opIdx]?.difference > 0 && operation.quantity
                      ? 'error-border'
                      : ''
                  } ${footer[opIdx]?.difference > 0 ? 'error-outline' : ''}`"
                  placeholder="0"
                />
                <div
                  v-if="tooltipVisible[idx][opIdx]"
                  :class="`tooltip ${
                    footer[opIdx]?.difference <= 0
                      ? 'green-tooltip'
                      : 'red-tooltip'
                  }`"
                >
                  <span v-if="footer[opIdx]?.difference < 0">{{
                    `${moneyFormatter(
                      Math.abs(footer[opIdx]?.difference),
                      true
                    )} ta kiritishingiz mumkin`
                  }}</span>
                  <span v-if="footer[opIdx]?.difference > 0">{{
                    `${moneyFormatter(
                      Math.abs(footer[opIdx]?.difference),
                      true
                    )} ta rejalashtirilgandan oshib ketdi`
                  }}</span>
                  <span v-if="footer[opIdx]?.difference == 0">{{
                    `Reja bo'yicha bajarildi`
                  }}</span>
                </div>
              </div>
            </td>
            <td>{{ moneyFormatter(item.total, true) }}</td>
            <td class="p0"  v-for="(operation, opIdx) in item.customOperations" :key="`${item.operations.length+opIdx}`">
              <div class="h-100 d-flex align-center">
                <input
                  type="text"
                  :value="operation.quantity"
                  @input="updateQuantity($event, idx, item.operations.length+opIdx)"
                  @keydown="handleKeydown($event, idx, item.operations.length+opIdx)"
                  @keypress="onlyNumbers"
                  :ref="`input-${idx}-${item.operations.length+opIdx}`"
                  :disabled="workLogsInfo.isFinished"
                  :class="`cell`"
                  placeholder="0"
                />
              </div>
            </td>
            <td>
              <v-tooltip top color="#544B99">
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    color="#544B99"
                    @click="getHistory(item)"
                  >
                    <v-img src="/history.svg" max-width="22" />
                  </v-btn>
                </template>
                <span>History</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="text-center">
            <td class="sticky-column" style="border-right: 0"></td>
            <td class="sticky-column" style="border-left: 0">Total in fact</td>
            <td v-for="(item, idx) in footer" :key="idx" :class="`th-text`">
              {{ moneyFormatter(item.factQuantity, true) }}
            </td>
          </tr>
          <tr class="text-center">
            <td class="sticky-column" style="border-right: 0"></td>
            <td class="sticky-column" style="border-left: 0">
              Total in planned quantity
            </td>
            <td v-for="(item, idx) in footer" :key="idx" :class="`th-text`">
              {{ moneyFormatter(item.plannedQuantity, true) }}
            </td>
          </tr>
          <tr class="text-center">
            <td class="sticky-column" style="border-right: 0"></td>
            <td class="sticky-column" style="border-left: 0">
              Total in difference
            </td>
            <td v-for="(item, idx) in footer" :key="idx" :class="`th-text`">
              {{ moneyFormatter(item.difference, true) }}
            </td>
          </tr>
        </tfoot>
      </v-simple-table>
      <div class="d-flex mt-4 mr-4">
        <v-spacer />
        <v-btn
          class="rounded-lg text-capitalize font-weight-bold"
          color="#544B99"
          elevation="0"
          outlined
          @click="saveDailyReport"
          :disabled="workLogsInfo.isFinished"
        >
          Close daily report
        </v-btn>
      </div>
      <SimpleHistoryDialog
        :historyDialog.sync="historyDialog"
        :itemsList="historyList"
        :headers="historyHeaders"
      />
      <DialogComponent v-model="custumColDialog" :state="custumColDialog" :title="`Add custom column`" :handler="saveCustomCol" >
        <v-form>
          <v-row>
            <v-col cols="6">
              <div class="label">Operation name</div>
              <v-text-field
                outlined
                hide-details
                dense
                height="44"
                class="rounded-lg base"
                color="#544B99"
                placeholder="Enter operation name"
                v-model.trim="customOperation.name"
              />

            </v-col>
            <v-col cols="6">
              <div class="label">Operation amount</div>
              <v-text-field
                outlined
                hide-details
                dense
                height="44"
                class="rounded-lg base"
                color="#544B99"
                placeholder="Enter operation amount"
                v-model.trim="customOperation.amount"
              />
            </v-col>
          </v-row>
        </v-form>
      </DialogComponent>
    </div>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SimpleHistoryDialog from "./UI/SimpleHistoryDialog.vue";
import DialogComponent from "./UI/DialogComponent.vue";
export default {
  components: {
    SimpleHistoryDialog,
    DialogComponent,
  },
  data() {
    return {
      mainList: [],
      filterName: null,
      employeeSearch: "",
      reportDate: "",
      custumColDialog: false,
      headers: [
        { text: "No.", value: "id", sortable: false },
        { text: "Employes fullname", value: "fullName", sortable: false },
      ],
      footer: [{ text: "Jami ishlar soni:", value: "total", sortable: false }],
      historyDialog: false,
      historyList: [],
      historyHeaders: [
        { text: "Date", value: "date", sortable: false },
        { text: "Operation name", value: "operationName", sortable: false },
        {
          text: "Done work quantity",
          value: "doneWorkQuantity",
          sortable: false,
        },
        { text: "Done work amount", value: "doneWorkAmount", sortable: false },
        { text: "Created by", value: "createdBy", sortable: false },
      ],
      savedTable: [],
      loading: true,
      tooltipVisible: [],
      arrForFilter: [],
      customOperation:{
        name: "",
        amount: "",
      }
    };
  },
  computed: {
    ...mapGetters({
      listOfWorkers: "listOfWorkers/employees",
      workLogsInfo: "dailyWorkTable/workLogsInfo",
      modelCategoryList: "dailyWorkTable/modelCategoryList",
      workLogsHistory: "dailyWorkTable/workLogsHistory",
      temporaryTable: "dailyWorkTable/temporaryTable",
      totals: "dailyWorkTable/totals",
    }),
  },
  watch: {
    filterName(val) {
      this.mainList = this.arrForFilter.filter((item) =>
        item.fullName
          .toLowerCase()
          .includes(val ? String(val).toLowerCase() : "")
      );
    },
    totals(val) {
      this.footer = [];
      const temp = JSON.parse(JSON.stringify(val));
      this.sortByIdOrder(this.modelCategoryList, temp).forEach((item) => {
        const obj = {
          plannedQuantity: item.plannedQuantity,
          factQuantity: item.factQuantity,
          factQuantityBase: item.factQuantity,
          operationId: item.modelOperationId,
          difference: item.difference,
          diffBase: item.difference,
        };
        this.footer.push(obj);
      });
    },
    workLogsHistory(newList) {
      this.historyList = newList.map((item) => {
        return {
          ...item,
          doneWorkAmount: this.moneyFormatter(item.doneWorkAmount, true),
          doneWorkQuantity: this.moneyFormatter(item.doneWorkQuantity, true),
        };
      });
    },
    modelCategoryList(list) {
      this.headers = [
        { text: "No.", value: "id", sortable: false },
        { text: "Employes fullname", value: "fullName", sortable: false },
      ];
      list.forEach((item) => {
        const obj = {
          text: item.modelOperationName,
          value: item.modelOperationName,
          operationId: item.modelOperationId,
          amount: item.amount,
          sortable: false,
        };
        this.headers.push(obj);
      });

      this.arrForFilter.forEach((employee) => {
        employee.operations = JSON.parse(JSON.stringify(list));
        employee.customOperations = [];
      });
      this.mainList = JSON.parse(JSON.stringify(this.arrForFilter));
      this.loading = false;
    },
    async workLogsInfo(val) {
      await this.getModelCategoryList(val.modelCategoryId).then(() => {
        this.getTotals(this.$route.params.id);
      });
    },
    listOfWorkers(list) {
      this.tooltipVisible = list.map(() => []);
      const hasSavedTable = this.savedTable.length === list.length;
      this.arrForFilter = list.map((item, idx) => ({
        fullName: `${item.lastName} ${item.firstName}`,
        orderNo: idx + 1,
        id: item.id,
        operations: hasSavedTable ? this.savedTable[idx].operations : [],
      }));
    },
  },
  methods: {
    ...mapActions({
      getEmployeesWithOutPagination:
        "listOfWorkers/getEmployeesWithOutPagination",
      getModelCategoryList: "dailyWorkTable/getModelCategoryList",
      getWorkLogsHistory: "dailyWorkTable/getWorkLogsHistory",
      saveDailyWorkLogs: "dailyWorkTable/saveDailyWorkLogs",
      getTotals: "dailyWorkTable/getTotals",
    }),
    sortByIdOrder(referenceArray, targetArray) {
      const idOrder = referenceArray.map((item) => item.id);
      const sortedArray = targetArray.sort((a, b) => {
        return idOrder.indexOf(a.id) - idOrder.indexOf(b.id);
      });
      return sortedArray;
    },
    handleKeydown(event, rowIdx, colIdx) {
      const key = event.key;
      let newRow = rowIdx;
      let newCol = colIdx;
      if (key === "ArrowUp") newRow = rowIdx > 0 ? rowIdx - 1 : rowIdx;
      if (key === "ArrowDown")
        newRow = rowIdx < this.mainList.length - 1 ? rowIdx + 1 : rowIdx;
      if (key === "ArrowLeft") newCol = colIdx > 0 ? colIdx - 1 : colIdx;
      if (key === "ArrowRight")
        newCol =colIdx < this.mainList[0].operations.length + this.mainList[0].customOperations.length - 1 ? colIdx + 1 : colIdx;
      this.$nextTick(() => {
        const nextInput = this.$refs[`input-${newRow}-${newCol}`];
        if (nextInput && nextInput[0]) {
          nextInput[0].focus();
        }
      });
    },
    closer() {
      this.historyDialog = false;
    },
    getHistory(item) {
      this.historyDialog = true;
      this.getWorkLogsHistory(item.id);
    },
    sumAllOperation(operations) {
      return operations.reduce((sum, item) => {
        return (
          sum +
          (item.quantity ? this.cleanQuantity(item.quantity) * item.amount : 0)
        );
      }, 0);
    },
    sumAllOperationPrice(operations) {
      return operations.reduce((sum, item) => {
        return sum + (item.amount ? item.amount : 0);
      }, 0);
    },
    async saveDailyReport() {
      this.loading = true;
      const payload = {
        customModelCategoryOperations: this.mainList.reduce((acc, item) => {
          const customOperationsData = item.customOperations
            .filter((operation) => operation.quantity)
            .map((operation) => ({
              name: operation.name,
              amount: operation.amount,
              // quantity: this.cleanQuantity(operation.quantity),
            }));
          return acc.concat(customOperationsData);
        }, []),
        data: this.mainList.reduce((acc, item) => {
          const operationsData = item.operations
            .filter((operation) => operation.quantity)
            .map((operation) => ({
              employeeId: item.id,
              modelOperationId: operation.modelOperationId,
              quantity: this.cleanQuantity(operation.quantity),
            }));
          return acc.concat(operationsData);
        }, []),
        modelCategoryId: this.workLogsInfo.modelCategoryId,
        modelId: this.$route.params.id,
        date: this.reportDate,
      };
      payload.data.push(
        ...this.mainList.reduce((acc, item) => {
          const customOperationsData = item.customOperations
            .filter((operation) => operation.quantity)
            .map((operation) => ({
              employeeId: item.id,
              customModelOperationName: operation.name,
              quantity: this.cleanQuantity(operation.quantity),
            }));
          return acc.concat(customOperationsData);
        }, [])
      )


      await this.saveDailyWorkLogs({
        data: payload,
        modelId: this.$route.params.id,
      });
      this.filterName = null;
    },
    updateQuantity(event, idx, opIdx) {
      let value = event.target.value.replace(/\D/g, "");
      value = this.moneyFormatter(value, true);
      event.target.value = value;
      if(this.mainList[idx].operations.length-1>=opIdx){
        this.mainList[idx].operations[opIdx].quantity = value;
        this.$set(this.mainList, idx, {
          ...this.mainList[idx],
          total: this.sumAllOperation(this.mainList[idx].operations),
        });
        const totalColumn = this.columnTotal(opIdx);
        this.$set(this.footer, opIdx, {
          ...this.footer[opIdx],
          difference: parseInt(this.footer[opIdx].diffBase, 10) + totalColumn,
          factQuantity:
            parseInt(this.footer[opIdx].factQuantityBase, 10) + totalColumn,
        });
      }else{
        this.mainList[idx].customOperations[opIdx-this.mainList[idx].operations.length].quantity = value;
      }
      this.$nextTick(() => {
        const input = event.target;
        input.selectionStart = input.selectionEnd = value.length;
      });
    },

    onlyNumbers(event) {
      if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
      }
    },
    columnTotal(idx) {
      return this.mainList.reduce((acc, item) => {
        return (
          acc +
          (item.operations[idx].quantity
            ? this.cleanQuantity(item.operations[idx].quantity)
            : 0)
        );
      }, 0);
    },
    dataChecker(arr) {
      return arr.some((employee) => {
        const temp = employee.operations.filter(
          (operation) => operation.quantity
        );
        if (temp.length > 0) {
          return true;
        }
        return false;
      });
    },
    showTooltip(idx, opIdx) {
      this.$set(this.tooltipVisible[idx], opIdx, true);
    },
    hideTooltip(idx, opIdx) {
      this.$set(this.tooltipVisible[idx], opIdx, false);
    },
    openCustomColDialog() {
      this.custumColDialog = true;
    },
    saveCustomCol() {
      this.mainList.forEach((item) => {
        item.customOperations.push({
          name: this.customOperation.name,
          amount: this.customOperation.amount,
        });
      });
      console.log(this.mainList);

      this.custumColDialog = false;
      this.customOperation.name = "";
      this.customOperation.amount = "";
    },
  },
  created() {
    this.savedTable = JSON.parse(JSON.stringify(this.temporaryTable));
  },
  mounted() {
    this.getEmployeesWithOutPagination("PER_WORK");
  },
  beforeDestroy() {
    if (this.dataChecker(this.mainList)) {
      this.$store.commit("dailyWorkTable/setTemporaryTable", this.mainList);
    }
  },
};
</script>
<style lang="scss" scoped>
table,
th,
td {
  border: 1px solid #ebebeb;
  border-collapse: collapse;
}
table {
  overflow: scroll;
  tr {
    border: none;
  }
}

table:nth-child(odd) {
  margin: 10px 0;
}

table {
  line-height: 30px;
  font-size: 16px;

  th,
  td {
    padding: 0 4px;
    font-size: 14px;
    color: #1d2433;
  }

  thead {
    background-color: #f8f4fe;

    th {
      font-weight: 500;
      color: #6b7280;
    }
  }

  tfoot {
    font-weight: 700;
  }

  .p0 {
    padding: 0 !important;
  }
}
.sticky-column {
  position: sticky;
  left: 0;
  background-color: white;
  z-index: 5 !important;
  min-width: 150px;
  border-right: 1px solid #e0e0e0;
}

/* 2-ustun ham harakatsiz qolishi uchun */
.sticky-column:nth-child(2) {
  left: 80px; /* 1-ustun kengligi */
}

th {
  min-width: 100px;
  font-size: 16px !important;
  font-weight: 500;
}
.z-5 {
  z-index: 3 !important;
}
.cell {
  width: 100%;
  height: 44px;
  background-color: #f7f4fe;
  padding: 10px 5px;
  font-size: 16px;
  will-change: transform, opacity;
  contain: layout paint;

  &:focus {
    outline-color: #544b99;
  }
}
.error-outline {
  &:focus {
    outline-color: #ff0000;
  }
}
.error-border {
  border: 2px solid #ff0000;
  border-radius: 4px;
}
.v-data-table table tfoot {
  position: sticky;
  z-index: 5;
  bottom: 0;
  background: #fff;
}
.tooltipBox {
  position: relative !important;
  display: inline-block;
}
.tooltip {
  position: absolute;
  z-index: 5;
  top: -30px;
  left: 0;
  right: 0;
  width: 250px;
  background-color: #333;
  color: #fff;
  padding: 5px 8px;
  height: 30px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 1;
  transition: opacity 0.3s;
}
.red-tooltip {
  background-color: red;
}
.green-tooltip {
  background-color: green;
}
thead{
  z-index: 10;
}
.first-header {
  position: sticky;
  top: 0;
  z-index: 5;
  background-color: white;
}

.second-header {
  position: sticky;
  z-index: 5;
  top: 97px;
  background-color: white;
}
</style>
