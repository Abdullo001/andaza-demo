<template>
  <v-card class="py-4">
    <v-overlay :value="loading" absolute style="z-index: 6">
      <v-progress-circular color="#544B99" indeterminate size="80" />
    </v-overlay>
    <div style="overflow-x: auto;">
      <v-simple-table class="min-w-800" height="100vh" fixed-header dense>
        <thead>
          <tr class="text-center">
            <th v-for="(header, idx) in headers" :key="idx" :class="`th-text ${idx<2?`sticky-column`:``}`" >
              {{ header.text }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="mainList.length" class="text-center">
            <td  class="sticky-column z-5" style="border-right: 0;"></td>
            <td class="sticky-column z-5" style="border-left: 0;">Payment amount per operation</td>
            <td v-for="(operation, idx) in mainList[0].operations" :key="idx">
              {{ operation.amount }}
            </td>
            <td>{{ sumAllOperationPrice(mainList[0].operations) }}</td>
            <td></td>
          </tr>
          <tr v-for="(item, idx) in mainList" :key="idx">
            <td class="sticky-column z-5">{{ item.orderNo }}</td>
            <td class="sticky-column z-5">{{ item.fullName }}</td>
            <td
              v-for="(operation, opIdx) in item.operations"
              :key="`td-${opIdx}`"
              class="p0"
            >
              <div class="h-100 d-flex align-center">
                <input
                  type="text"
                  :value="operation.quantity"
                  @input="updateQuantity($event, idx, opIdx)"
                  @keydown="handleKeydown($event, idx, opIdx)"
                  @keypress="onlyNumbers"
                  :ref="`input-${idx}-${opIdx}`"
                  :disabled="workLogsInfo.isFinished"
                  class="cell"
                  placeholder="0"
                />
              </div>
            </td>
            <td>{{ sumAllOperation(item.operations) }}</td>
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
    <SimpleHistoryDialog :historyDialog.sync="historyDialog" :itemsList="workLogsHistory" :headers="historyHeaders"   />
    </div>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SimpleHistoryDialog from "./UI/SimpleHistoryDialog.vue";
export default {
  components:{
    SimpleHistoryDialog,
  },
  data() {
    return {
      mainList: [],
      headers: [
        { text: "No.", value: "id", sortable: false },
        { text: "Employes fullname", value: "fullName", sortable: false },
      ],
      historyDialog:false,
      historyHeaders:[
        {text:"Date",value:"date",sortable:false},
        {text:"Operation name",value:"operationName",sortable:false},
        {text:"Done work quantity",value:"doneWorkQuantity",sortable:false},
        {text:"Done work amount",value:"doneWorkAmount",sortable:false},
        {text:"Created by",value:"createdBy",sortable:false},
      ],
      savedTable:[],
      loading:true
    };
  },
  computed: {
    ...mapGetters({
      listOfWorkers: "listOfWorkers/employees",
      workLogsInfo: "dailyWorkTable/workLogsInfo",
      modelCategoryList: "dailyWorkTable/modelCategoryList",
      workLogsHistory: "dailyWorkTable/workLogsHistory",
      temporaryTable: "dailyWorkTable/temporaryTable",
    }),
  },
  watch: {
    modelCategoryList(list) {
      this.headers = [
        { text: "No.", value: "id", sortable: false },
        { text: "Employes fullname", value: "fullName", sortable: false },
      ];
      list.forEach((item) => {
        const obj = {
          text: item.modelOperationName,
          value: item.modelOperationName,
          sortable: false,
        };
        this.headers.push(obj);
      });
      this.headers.push(
        { text: "Total", value: "totalPrice", sortable: false },
        { text: "Actions", value: "actions", sortable: false }
      );

      this.mainList.forEach((employee) => {
        employee.operations = employee.operations.length>0 ? employee.operations : JSON.parse(JSON.stringify(list));
      });
      this.loading=false

    },
    workLogsInfo(val) {
      this.getModelCategoryList(val.modelCategoryId);
    },
    listOfWorkers(list) {
      const hasSavedTable = this.savedTable.length === list.length;
      this.mainList = list.map((item, idx) => ({
        fullName: `${item.lastName} ${item.firstName}`,
        orderNo: idx + 1,
        id: item.id,
        operations: hasSavedTable ? this.savedTable[idx].operations : [],
      }));
    },
  },
  methods: {
    ...mapActions({
      getEmployeesWithOutPagination: "listOfWorkers/getEmployeesWithOutPagination",
      getModelCategoryList: "dailyWorkTable/getModelCategoryList",
      getWorkLogsHistory: "dailyWorkTable/getWorkLogsHistory",
      saveDailyWorkLogs: "dailyWorkTable/saveDailyWorkLogs",
    }),
    handleKeydown(event, rowIdx, colIdx) {
      const key = event.key;
      let newRow = rowIdx;
      let newCol = colIdx;

      if (key === "ArrowUp") newRow = rowIdx > 0 ? rowIdx - 1 : rowIdx;
      if (key === "ArrowDown") newRow = rowIdx < this.mainList.length - 1 ? rowIdx + 1 : rowIdx;
      if (key === "ArrowLeft") newCol = colIdx > 0 ? colIdx - 1 : colIdx;
      if (key === "ArrowRight") newCol = colIdx < this.mainList[0].operations.length - 1 ? colIdx + 1 : colIdx;

      this.$nextTick(() => {
        const nextInput = this.$refs[`input-${newRow}-${newCol}`];
        if (nextInput && nextInput[0]) {
          nextInput[0].focus();
        }
      });
    },
    closer(){
      this.historyDialog=false
    },
    getHistory(item) {
      this.historyDialog=true;
      this.getWorkLogsHistory(item.id);
    },
    sumAllOperation(operations) {
      return operations.reduce((sum, item) => {
        return sum + (item.quantity ? item.quantity * item.amount : 0);
      }, 0);
    },
    sumAllOperationPrice(operations) {
      return operations.reduce((sum, item) => {
        return sum + (item.amount ? item.amount : 0);
      }, 0);
    },
    saveDailyReport() {
      const payload = {
        data: this.mainList.reduce((acc, item) => {
          const operationsData = item.operations
            .filter(operation => operation.quantity)
            .map(operation => ({
              employeeId: item.id,
              modelOperationId: operation.modelOperationId,
              quantity: operation.quantity,
            }));
          return acc.concat(operationsData);
        }, []),
        modelCategoryId: this.workLogsInfo.modelCategoryId,
        modelId: this.$route.params.id,
      };

      this.saveDailyWorkLogs({data:payload,modelId:this.$route.params.id})
    },
    updateQuantity(event, idx, opIdx) {
      const value = event.target.value.replace(/\D/g, "");
      this.mainList[idx].operations[opIdx].quantity = value;
    },
    onlyNumbers(event) {
      if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
      }
    },
    dataChecker(arr){
      return arr.some(employee => {
        const temp = employee.operations.filter(operation => operation.quantity);
        if (temp.length > 0) {
          return true;
        }
        return false;
      });
    }
  },
  created(){
    this.savedTable=JSON.parse(JSON.stringify(this.temporaryTable))

  },
  mounted() {
    this.getEmployeesWithOutPagination("PER_WORK");
  },
  beforeDestroy(){
    if(this.dataChecker(this.mainList)){
      this.$store.commit("dailyWorkTable/setTemporaryTable",this.mainList)
    }
  }
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

.th-text {
  min-width: 100px;
  font-size: 16px !important;
  font-weight: 500;
}
.z-5{
  z-index: 3 !important;
}
.cell{
  width: 100%;
  height: 44px;
  background-color: #F7F4FE;
  padding: 10px 5px;
  font-size: 16px;
  will-change: transform, opacity;
  contain: layout paint;

  &:focus{
    outline-color: #544B99;
  }
}
</style>
