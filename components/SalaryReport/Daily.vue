<template>
  <div>
    <v-card-title>
      <div class="">{{ $t('report.salaryPerWorkReport') }}</div>
    </v-card-title>
    <v-divider />
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="cuttingTable"
      hide-default-footer
      :items-per-page="items.length"
    >
      <template #top>
        <div class="d-flex justify-space-between align-center mb-4 mt-2">
          <div>
            <div class="label">Report date</div>
            <div style="height: 40px !important">
              <el-date-picker
                v-model="reportDate"
                :picker-options="pickerShortcuts"
                class="base_picker"
                placeholder="dd.MM.yyyy HH:mm:ss"
                style="width: 100%; height: 100%"
                type="month"
                value-format="timestamp"
              >
              </el-date-picker>
            </div>
          </div>
          <div>
            <v-btn
              class="text-capitalize rounded-lg"
              color="#544B99"
              outlined
              height="44"
              width="130"
              @click="reportDate = null"
            >
              Clear
            </v-btn>
            <v-btn
              class="text-capitalize rounded-lg"
              color="#544B99"
              dark
              height="44"
              width="130"
              @click="getEmployees"
            >
              Search
            </v-btn>
          </div>
        </div>
      </template>
      <template #item.hiredDate="{ item }">
        {{ formatLong(item.hiredDate) }}
      </template>
      <template #item.actions="{ item }">
        <v-tooltip top color="#544B99" class="pointer">
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
              @click="giveAdvance(item)"
            >
              <v-img src="/money.svg" max-width="22" />
            </v-btn>
          </template>
          <span class="text-capitalize">Advance payment</span>
        </v-tooltip>

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
        <v-tooltip top color="#544B99">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#544B99"
              v-on="on"
              v-bind="attrs"
              @click.stop="generatePdf(item)"
              :loading="loadingStates[item.employeeId]"
              :key="item.employeeId"
            >
              <v-img src="/download.svg" max-width="24" />
            </v-btn>
          </template>
          <span>Generate PDF</span>
        </v-tooltip>
      </template>
      <template v-slot:body.append>
        <tr>
          <td></td>
          <td
            class="text-capitalize text-body-1 font-weight-bold"
          >
              Total
          </td>
          <td colspan="2"></td>
          <td >{{moneyFormatter(paymentsList.totalWage)}}</td>
          <td >{{moneyFormatter(paymentsList.totalAdvance)}}</td>
          <td >{{moneyFormatter(paymentsList.totalLeftAmount)}}</td>
          <td colspan="2"></td>
        </tr>
      </template>
    </v-data-table>
    <div class="d-flex justify-end">
      <v-btn
        outlined
        color="#544B99"
        @click="getReportFile"
        class="text-capitalize mt-4"
      >
        {{ $t('report.downloadReport') }}
      </v-btn>
    </div>
    <SimpleHistoryDialog
      :historyDialog.sync="historyDialog"
      :itemsList="historyList"
      :headers="historyHeaders"
      :loadingState="historyLoading"
    />
    <AdvancePaymentDialog
      :dialogState.sync="advanceDialog"
      :employeeId="selectedEmployee.employeeId"
      :currency="selectedEmployee.currency || ''"
      :paymentType="'PER_WORK'"
      :date="reportDate || 0"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SimpleHistoryDialog from "../UI/SimpleHistoryDialog.vue";
import AdvancePaymentDialog from "./AdvancePaymentDialog.vue";
export default {
  components: {
    SimpleHistoryDialog,
    AdvancePaymentDialog,
  },
  data() {
    return {
      headers: [
        { text: "No", value: "employeeId", sortable: false },
        { text: this.$t("dailyTasks.employeeFullname"), value: "fullName", sortable: false },
        { text: this.$t("listOfWorkers.dialog.hiredDate"), value: "hiredDate", sortable: false },
        { text: this.$t("report.speciality"), value: "speciality", sortable: false },
        { text: this.$t("report.monthlyPayment"), value: "monthlyPayment", sortable: false },
        { text: this.$t("report.advancePayment"), value: "advancePayment", sortable: false },
        { text: this.$t("report.leftPayment"), value: "leftAmount", sortable: false },
        { text: this.$t("prefinances.detailsHeaders.currency"), value: "currency", sortable: false },
        { text: this.$t("prefinances.detailsHeaders.actions"), value: "actions", sortable: false },
      ],
      items: [],
      reportDate: null,
      historyDialog: false,
      advanceDialog: false,
      selectedEmployee: {
        employeeId: 0,
      },
      historyList:[],
      loadingStates: {},
      currentLoadingId: null,
      historyHeaders: [
        { text: "Date", value: "date", sortable: false },
        { text: "Operation", value: "operationName", sortable: false },
        {
          text: "Done work quantity",
          value: "doneWorkQuantity",
          sortable: false,
        },
        { text: "Done work amount", value: "doneWorkAmount", sortable: false },
        { text: "Model number", value: "modelNumber", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters({
      paymentsList: "salary/paymentsList",
      paymentHistoryList: "salary/paymentHistoryList",
      historyLoading: "salary/historyLoading",
      employeeSalaryReport: "salary/employeeSalaryReport",
    }),
  },

  watch: {
    paymentHistoryList(val) {
      this.historyList = val.map((item) => {
        return {
          ...item,
          doneWorkAmount: this.moneyFormatter(item.doneWorkAmount, true),
          doneWorkQuantity: this.moneyFormatter(item.doneWorkQuantity, true),
        };
      });
    },
    paymentsList(val) {
      this.items = val.data.map((item) => {
        return {
          ...item,
          advancePayment: this.moneyFormatter(item.advancePayment),
          leftAmount: this.moneyFormatter(item.leftAmount),
          monthlyPayment: this.moneyFormatter(item.monthlyPayment),
        }
      })
    },
    employeeSalaryReport(val) {
      Object.keys(this.loadingStates).forEach((key) => {
        this.loadingStates[key] = false;
      });
    },
  },

  methods: {
    ...mapActions({
      getPaymentList: "salary/getPaymentList",
      getPaymentHistoryList: "salary/getPaymentHistoryList",
      getPaymentReport: "salary/getPaymentReport",
      getPaymentEmployeeReport: "salary/getPaymentEmployeeReport",
    }),
    generatePdf(item) {
      this.$set(this.loadingStates, item.employeeId, true);
      this.currentLoadingId = item.employeeId;
      const data = {
        employeeId: item.employeeId,
        period: this.reportDate,
      };
      this.getPaymentEmployeeReport(data);
    },
    getReportFile() {
      const data = {
        period: this.reportDate,
        paymentType: "PER_WORK",
      };
      this.getPaymentReport(data);
    },

    getEmployees() {
      const data = {
        paymentType: "PER_WORK",
        date: this.reportDate,
      };
      this.getPaymentList(data);
    },
    giveAdvance(item) {
      this.advanceDialog = true;
      this.selectedEmployee = { ...item };
    },
    getHistory(item) {
      this.historyDialog = true;
      this.getPaymentHistoryList(item.employeeId);
    },
  },

  mounted() {},
};
</script>
<style lang=""></style>
