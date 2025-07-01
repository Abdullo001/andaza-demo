<template>
  <div>
    <v-dialog v-model="state" max-width="800">
      <v-card flat>
        <v-card-title>
          <div class="title">Make a payment</div>
          <v-spacer />
          <v-btn icon @click="closeHistory" color="#544B99">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row class="mb-4">
            <v-col cols="6">
              <v-radio-group
                row
                v-model.trim="paymentDetail.wageType"
                class="mb-4"
              >
                <v-radio
                  color="#544B99"
                  label="Advance payment"
                  value="ADVANCE_PAYMENT"
                ></v-radio>
                <v-radio
                  color="#544B99"
                  label="Monthly payment"
                  value="MONTHLY_PAYMENT"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="6">
              <div class="label">Payment amount</div>
              <v-text-field
                v-model="paymentDetail.amount"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="0"
                validate-on-blur
                :suffix="currency"
              />
            </v-col>
          </v-row>
          <v-divider />

          <v-data-table
            :headers="headers"
            :items="historyList"
            :loading="historySalaryLoading"
            item-key="cuttingTable"
            hide-default-footer
          >
            <template #top>
              <div class="title ma-4">{{$t("report.paymentHistory")}}</div>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            color="#544B99"
            @click="closeHistory"
            class="text-capitalize mr-4"
            width="100"
          >
            Cancel
          </v-btn>
          <v-btn
            dark
            color="#544B99"
            @click="savePayment"
            class="text-capitalize "
            width="100"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
export default {
  props: {
    dialogState: {
      type: Boolean,
      required: true,
    },
    employeeId: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    paymentType:{
      type:String,
      required:true,
    }
  },

  data() {
    return {
      state: this.dialogState,
      paymentDetail: {
        amount: null,
        wageType: null,
        employeeId: this.employeeId,
      },
      historyList:[],
      headers: [
        { text: this.$t("historyTable.date"), value: "date", sortable: false },
        { text: this.$t("report.paymentPurpose"), value: "wageType", sortable: false },
        { text: this.$t("dailyTasks.paymentAmount"), value: "amount", sortable: false },
        { text: this.$t("report.remainingAmount"), value: "leftAmount", sortable: false },
      ],
    };
  },
  computed:{
    ...mapGetters({
      paymentHistorySalaryList:"salary/paymentHistorySalaryList",
      historySalaryLoading:"salary/historySalaryLoading",
    })
  },
  watch: {
    paymentHistorySalaryList(list){
      this.historyList = list.map((item) => {
        return {
          ...item,
          leftAmount: this.moneyFormatter(item.leftAmount, true),
          amount:  this.moneyFormatter(item.amount, true),
        };
      })
    },
    dialogState(newVal) {
      this.state = newVal;
      this.getPaymentHistorySalaryList(this.employeeId)
    },
    state(newVal) {
      this.$emit("update:dialogState", newVal);
    },
  },

  methods: {
    ...mapActions({
      createPayment:"salary/createPayment",
      getPaymentHistorySalaryList:"salary/getPaymentHistorySalaryList",
    }),
    closeHistory() {
      this.state = false;
    },
    savePayment() {
      const data={
        amount:this.paymentDetail.amount,
        employeeId:this.employeeId,
        wageType:this.paymentDetail.wageType,
        date:this.date,
        paymentType:this.paymentType,
      }
      this.createPayment(data)
      this.closeHistory()
    },
  },

  mounted(){
  }
};
</script>
<style lang=""></style>
