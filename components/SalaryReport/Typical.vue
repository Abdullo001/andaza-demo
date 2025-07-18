<template>
  <div>
    <v-card-title>
      <div class="">{{ $t("report.salaryFixed") }}</div>
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
            <div class="label">{{ $t("report.reportDate") }}</div>
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
              @click="changeSalary(item)"
            >
              <v-img src="/wallet.svg" max-width="22" />
            </v-btn>
          </template>
          <span class="text-capitalize">Change monthly</span>
        </v-tooltip>
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
          <td >{{moneyFormatter(paymentsList.totalWage, true)}}</td>
          <td >{{moneyFormatter(paymentsList.totalAdvance, true)}}</td>
          <td >{{moneyFormatter(paymentsList.totalLeftAmount, true)}}</td>
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
      :itemsList="paymentHistoryList"
      :headers="historyHeaders"
      :loadingState="historyLoading"
    />
    <AdvancePaymentDialog
      :dialogState.sync="advanceDialog"
      :employeeId="selectedEmployee.employeeId"
      :currency="selectedEmployee.currency || ''"
      :paymentType="'FIXED'"
      :date="reportDate || 0"
    />
    <PreSalary
      :dialogState.sync="preSalary"
      :employeeId="selectedEmployee.employeeId"
      :date="reportDate || 0"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SimpleHistoryDialog from "../UI/SimpleHistoryDialog.vue";
import AdvancePaymentDialog from "./AdvancePaymentDialog.vue";
import PreSalary from "./PreSalary.vue";
export default {
  components: {
    SimpleHistoryDialog,
    AdvancePaymentDialog,
    PreSalary,
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
        { text: this.$t("prefinances.child.detailsHeaders.currency"), value: "currency", sortable: false },
        { text: this.$t("prefinances.child.documentsHeaders.actions"), value: "actions", sortable: false },
      ],
      items: [],
      preSalary: false,
      reportDate: null,
      historyDialog: false,
      advanceDialog: false,
      selectedEmployee: {
        employeeId: 0,
      },
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
      paymentsList: "salary/fixedPaymentsList",
      paymentHistoryList: "salary/paymentHistoryList",
      historyLoading: "salary/historyLoading",
      employeeSalaryReport: "salary/employeeSalaryReport",
    }),
  },

  watch: {
    paymentsList(val) {
      this.items = val.data.map((item) => {
        return{
          ...item,
          advancePayment: this.moneyFormatter(item.advancePayment, true),
          leftAmount: this.moneyFormatter(item.leftAmount, true),
          monthlyPayment: this.moneyFormatter(item.monthlyPayment, true),
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
        paymentType: "FIXED",
      };
      this.getPaymentReport(data);
    },

    getEmployees() {
      const data = {
        paymentType: "FIXED",
        date: this.reportDate,
      };
      this.getPaymentList(data);
    },
    giveAdvance(item) {
      this.advanceDialog = true;
      this.selectedEmployee = { ...item };
    },
    changeSalary(item) {
      this.preSalary = true;
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
