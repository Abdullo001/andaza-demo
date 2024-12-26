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
              <div class="label">Payment amount</div>
              <div class="d-flex align-center">
                <v-text-field
                  v-model="paymentDetail.amount"
                  class="rounded-lg base rounded-l-lg rounded-r-0"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  placeholder="0.00"
                  validate-on-blur
                />
                <v-select
                  v-model="paymentDetail.currency"
                  :items="currencyList"
                  item-text="key"
                  item-value="key"
                  append-icon="mdi-chevron-down"
                  class="rounded-lg base rounded-r-lg rounded-l-0"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  style="max-width: 100px"
                  validate-on-blur
                  placeholder="Currency"
                />
              </div>
            </v-col>
            <v-col cols="6">
              <div class="label">Comment</div>
              <v-text-field
                v-model="paymentDetail.comment"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Enter comment"
                validate-on-blur
              />
            </v-col>
          </v-row>
          <v-divider />

          <v-data-table
            :headers="headers"
            :items="salaryChangeHistoryList"
            :loading="historySalaryLoading"
            item-key="cuttingTable"
            hide-default-footer
          >
            <template #top>
              <div class="title ma-4">Payment history</div>
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
    date: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      state: this.dialogState,
      paymentDetail: {
        amount: null,
        comment: "",
        currency: null,
        employeeId: this.employeeId,
      },
      headers: [
        { text: "Date", value: "date", sortable: false },
        { text: "Amount ", value: "amount", sortable: false },
        { text: "Comment", value: "comment", sortable: false },
        { text: "Pointer", value: "pointer", sortable: false },
      ],
    };
  },
  computed:{
    ...mapGetters({
      salaryChangeHistoryList:"salary/salaryChangeHistoryList",
      historySalaryLoading:"salary/historySalaryLoading",
      currencyList:"partners/currencyList",
    })
  },
  watch: {
    dialogState(newVal) {
      this.state = newVal;
      this.salaryChangeHistory(this.employeeId)
    },
    state(newVal) {
      this.$emit("update:dialogState", newVal);
    },
  },

  methods: {
    ...mapActions({
      changeMonthlySalary:"salary/changeMonthlySalary",
      salaryChangeHistory:"salary/salaryChangeHistory",
      getCurrencyList:"partners/getCurrencyList",
    }),
    closeHistory() {
      this.state = false;
    },
    savePayment() {
      const data={
        amount:this.paymentDetail.amount,
        employeeId:this.employeeId,
        comment:this.paymentDetail.comment,
        currency:this.paymentDetail.currency,
        date:this.date,
        paymentType:"FIXED",
      }
      this.changeMonthlySalary(data)
      this.closeHistory()
      this.paymentDetail={}
    },
  },

  mounted(){
    this.getCurrencyList()
  }
};
</script>
<style lang=""></style>
