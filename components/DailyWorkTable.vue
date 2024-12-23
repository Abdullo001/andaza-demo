<template>
  <div>
    <v-card class="py-4">
      <table cellspacing="0" >
        <thead>
          <tr class="text-center">
            <th v-for="(header, idx) in headers" :key="idx" class="">
              {{ header.text }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="mainList.length" class="text-center">
            <td colspan="2">Payment amount per operation</td>
            <td v-for="(operation, idx) in mainList[0].operations" :key="idx">
              {{ operation.amount }}
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr v-for="(item, idx) in mainList" :key="idx">
            <td>{{ item.id }}</td>
            <td>{{ item.fullName }}</td>
            <td
              v-for="(operation, idx) in item.operations"
              :key="idx"
              class="p-1"
            >
              <div class="h-100 d-flex align-center">
                <v-text-field
                  v-model="operation.quantity"
                  class="base text-center"
                  :disabled="workLogsInfo.isFinished"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  placeholder="0"
                  validate-on-blur
                  :rules="[formRules.onlyNumber]"
                />
              </div>
            </td>
            <td>{{ sumAllOperation(item.operations) }}</td>
            <td>
              <v-tooltip top color="#544B99" class="pointer">
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
                <span class="text-capitalize">History</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </table>
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
    </v-card>

    <SimpleHistoryDialog :historyDialog.sync="historyDialog" :itemsList="workLogsHistory" :headers="historyHeaders"   />
  </div>
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
      ]
    };
  },
  computed: {
    ...mapGetters({
      listOfWorkers: "listOfWorkers/listOfWorkers",
      workLogsInfo: "dailyWorkTable/workLogsInfo",
      modelCategoryList: "dailyWorkTable/modelCategoryList",
      workLogsHistory: "dailyWorkTable/workLogsHistory",
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
        employee.operations = JSON.parse(JSON.stringify(list));
      });
    },
    workLogsInfo(val) {
      this.getModelCategoryList(val.modelCategoryId);
    },
    listOfWorkers(list) {
      const specialList = list.map((item) => {
        return {
          fullName: `${item.lastName} ${item.firstName}`,
          id: item.id,
          operations: [],
        };
      });
      this.mainList = JSON.parse(JSON.stringify(specialList));
    },
  },
  methods: {
    ...mapActions({
      getListOfWorkers: "listOfWorkers/getListOfWorkers",
      getWorkLogsReport: "dailyWorkTable/getWorkLogsReport",
      getModelCategoryList: "dailyWorkTable/getModelCategoryList",
      getWorkLogsHistory: "dailyWorkTable/getWorkLogsHistory",
      saveDailyWorkLogs: "dailyWorkTable/saveDailyWorkLogs",
    }),
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
      };

      this.saveDailyWorkLogs({data:payload,modelId:this.$route.params.id})
    },
  },
  mounted() {
    const modelId = this.$route.params.id;
    this.getListOfWorkers({ paymentType: "PER_WORK" });
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
  width: 100%;

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
    //th:nth-child(-n+3), td:nth-child(-n+3) {
    //  border: none;
    //}
  }

  .p0 {
    padding: 0 !important;
  }
}
</style>
