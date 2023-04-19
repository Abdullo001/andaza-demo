<template>
  <v-card flat class="rounded-lg">
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="10"
    >
      <template #top>
        <v-card-title class="d-flex">
          <div class="title">Working Operation</div>
          <v-spacer/>
          <v-btn
            color="#7631FF" dark
            class="rounded-lg text-capitalize font-weight-bold"
            width="200" height="40"
            @click="openDialog"
          >
            <v-icon>mdi-plus</v-icon>
            add processing
          </v-btn>
        </v-card-title>
      </template>
      <template #item.actions="{item}">
        <v-btn icon color="green" @click.stop="editItem(item)">
          <v-img src="/edit-active.svg" max-width="22"/>
        </v-btn>
        <v-btn icon color="red" @click.stop="getDeleteItem(item)">
          <v-img src="/delete.svg" max-width="27"/>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="1200">
      <v-card flat>
        <v-card-title class="d-flex mb-4">
          <div class="title text-capitalize">Add Working operations</div>
          <v-spacer/>
          <v-btn color="#7631FF" icon @click="dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form lazy-validation v-model="validate" ref="form">
            <v-row justify="center">
              <v-col
                v-if="create_working_operation.sizeDistributions.length !== 0"
                cols="12"
                lg="4"
                v-for="(item, idx) in partList?.sizeDistributions"
                :key="idx"
              >
                <div class="text-body-1 mb-3 font-weight-bold">{{ item?.size }}</div>
                <v-text-field
                  v-model="create_working_operation.sizeDistributions[idx].quantity"
                  filled
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Total</div>
                <v-text-field
                  v-model="create_working_operation.total"
                  filled
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Return</div>
                <v-text-field
                  v-model="create_working_operation.returnedQuantity"
                  filled
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Loss</div>
                <v-text-field
                  v-model="create_working_operation.lostQuantity"
                  filled
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Loss reason</div>
                <v-textarea
                  v-model="create_working_operation.lostReason"
                  rows="1"
                  filled
                  auto-grow
                  color="#7631FF"
                  placeholder="Select working process"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Weight</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="create_working_operation.weight"
                    filled
                    :rules="[ formRules.required ]"
                    validate-on-blur
                    placeholder="0"
                    color="#7631FF"
                  />
                  <v-select
                    v-model="create_working_operation.weightUnit"
                    :items="weight_enum"
                    style="width: 30px;"
                    filled
                    :rules="[ formRules.required ]"
                    validate-on-blur
                    append-icon="mdi-chevron-down"
                    color="#7631FF"
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Status</div>
                <v-select
                  v-model="create_working_operation.status"
                  :items="status_enums"
                  filled
                  :rules="[ formRules.required ]"
                  append-icon="mdi-chevron-down"
                  validate-on-blur
                  color="#7631FF"
                  placeholder="Select fabric color"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">VAT, %</div>
                <v-text-field
                  v-model="create_working_operation.vatTaxPercent"
                  filled
                  validate-on-blur
                  :rules="create_working_operation.isVatTaxEnabled !== 'YES' ? [] : [formRules.required]"
                  :disabled="form_disabled"
                  placeholder="Select fabric color"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">VAT</div>
                <v-select
                  v-model="create_working_operation.isVatTaxEnabled"
                  :items="vat"
                  filled
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  append-icon="mdi-chevron-down"
                  placeholder="Select currency"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Comment</div>
                <v-text-field
                  v-model="create_working_operation.description"
                  filled
                  placeholder="0"
                  color="#7631FF"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#7631FF"
            width="163" height="44"
            @click="dialog = !dialog"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold ml-8"
            color="#7631FF" dark
            width="163" height="44"
            @click="create"
          >
            add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" max-width="1200">
      <v-card flat>
        <v-card-title class="d-flex mb-4">
          <div class="title text-capitalize">Edit Working operations</div>
          <v-spacer/>
          <v-btn color="#7631FF" icon @click="edit_dialog = !edit_dialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="edit_validate" ref="edit_form" lazy-validation>
            <v-row justify="center">
              <v-col
                v-if="update_working.sizeDistributions.length !== 0"
                cols="12"
                lg="4"
                v-for="(item, idx) in partList?.sizeDistributions"
                :key="idx"
              >
                <div class="text-body-1 mb-3 font-weight-bold">{{ item?.size }}</div>
                <v-text-field
                  v-model="update_working.sizeDistributions[idx].quantity"
                  filled
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Total</div>
                <v-text-field
                  v-model="update_working.totalQuantity"
                  filled
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Return</div>
                <v-text-field
                  v-model="update_working.returnQuantity"
                  filled
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Loss</div>
                <v-text-field
                  v-model="update_working.lostQuantity"
                  filled
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Loss reason</div>
                <v-textarea
                  v-model="update_working.lostReason"
                  rows="1"
                  filled
                  auto-grow
                  color="#7631FF"
                  placeholder="Select working process"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Weight</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="update_working.weight"
                    filled
                    validate-on-blur
                    :rules="[ formRules.required ]"
                    placeholder="0"
                    color="#7631FF"
                  />
                  <v-select
                    v-model="update_working.weightUnit"
                    :items="weight_enum"
                    style="width: 30px;"
                    filled
                    hide-selected
                    :rules="[ formRules.required ]"
                    validate-on-blur
                    append-icon="mdi-chevron-down"
                    color="#7631FF"
                    placeholder="Select workshop"
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Status</div>
                <v-select
                  v-model="update_working.status"
                  :items="status_enums"
                  filled
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  placeholder="Select fabric color"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">VAT, %</div>
                <v-text-field
                  v-model="update_working.vatTaxPercent"
                  filled
                  :disabled="update_working.isVatTexEnabled!=='YES'"
                  placeholder="Select fabric color"
                  :rules="update_working.isVatTexEnabled !== 'YES' ? [] : [formRules.required]"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">VAT</div>
                <v-select
                  v-model="update_working.isVatTexEnabled"
                  :items="vat"
                  filled
                  validate-on-blur
                  append-icon="mdi-chevron-down"
                  placeholder="Select currency"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Comment</div>
                <v-text-field
                  v-model="update_working.description"
                  filled
                  placeholder="0"
                  color="#7631FF"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#7631FF"
            width="163" height="44"
            @click="edit_dialog = !edit_dialog"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold ml-8"
            color="#7631FF" dark
            width="163" height="44"
            @click="update"
          >
            update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center"> Delete working operations</v-card-title>
        <v-card-text>
          Are you sure you want to Delete working operations?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{ $t('permissionRole.dialog.cancel') }}
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteDetails"
          >
            {{ $t('permissionRole.dialog.delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "WorkingOperation",
  data() {
    return {
      edit_form_disabled: true,
      form_disabled: true,
      edit_validate: true,
      validate: true,
      edit_dialog: false,
      delete_dialog: false,
      weight_enum: ["kg", "gr"],
      vat: ["YES", "NO"],
      status_enums: ["RETURNED", "LOST", "PRINT"],
      headers: [
        {text: "Amount", align: 'start', sortable: false, value: 'amount'},
        {text: 'Fabric Color', sortable: false, value: 'fabricColor'},
        {text: 'Return', sortable: false, value: 'fabricColor'},
        {text: 'Is VatTex Enabled', sortable: false, value: 'isVatTexEnabled'},
        {text: 'Lost Quantity', sortable: false, value: 'lostQuantity'},
        {text: 'Return Quantity', sortable: false, value: 'returnQuantity'},
        {text: 'Total Amount', sortable: false, value: 'totalAmount'},
        {text: 'Total Quantity', sortable: false, value: 'totalQuantity'},
        {text: 'Unit Price', sortable: false, value: 'unitPrice'},
        {text: 'Unit Price Currency', sortable: false, value: 'unitPriceCurrency'},
        {text: 'Vat Tax Percent', sortable: false, value: 'vatTaxPercent'},
        {text: 'Weight', sortable: false, value: 'weight'},
        {text: 'Actions', sortable: false, value: 'actions', width: 108, align: "center"},
      ],
      items: [],
      working_arr: [],
      dialog: false,
      create_working_operation: {
        fabricColor: "",
        sizeDistributions: [],
        returnedQuantity: "",
        lostQuantity: "",
        weight: "",
        weightUnitId: null,
        weightUnit: "kg",
        status: "",
        description: "",
        unitPriceCurrency: "",
        unitPrice: null,
        amount: null,
        vatTaxPercent: "",
        isVatTaxEnabled: "NO",
        totalAmount: "",
        total: null,
        lostReason: "",
        processPlanningId: 4,
      },
      update_working: {
        fabricColor: "",
        sizeDistributions: [],
        returnQuantity: "",
        lostQuantity: "",
        weight: "",
        weightUnitId: "",
        weightUnit: "kg",
        status: "",
        description: "",
        unitPriceCurrency: "",
        unitPrice: "",
        amount: "",
        vatTaxPercent: "",
        isVatTexEnabled: "NO",
        totalAmount: "",
        totalQuantity: "",
        lostReason: "",
        processPlanningId: 4,
      },
      id: "",
      partsDetails: {},
      obj: {},
      headFields: [],
    }
  },
  computed: {
    ...mapGetters({
      partList: "workingOperations/partList",
      message: "workingOperations/message",
    })
  },
  watch: {
    "create_working_operation.isVatTaxEnabled"(elem) {
      this.form_disabled = elem !== "YES"
    },
    dialog(val) {
      if (!val) {
        this.create_working_operation = {
          fabricColor: "",
          sizeDistributions: [],
          returnedQuantity: "",
          lostQuantity: "",
          weight: "",
          weightUnitId: "",
          weightUnit: "",
          status: "",
          description: "",
          unitPriceCurrency: "",
          unitPrice: "",
          amount: '',
          vatTaxPercent: "",
          isVatTaxEnabled: false,
          totalAmount: "",
          totalQuantity: "",
          lostReason: "",
          processPlanningId: 8,
        }
      } else {
        this.create_working_operation.sizeDistributions = [...this.working_arr];
        this.dialog = true;
      }
    },
    partList(val) {
      this.partsDetails = JSON.parse(JSON.stringify(val));
      const key = [];
      const value = [];
      if  ( this.headers.length <= 13 ){
        this.partsDetails.sizeDistributions.forEach((elem, idx, array) => {
          const arr = [];
          const copyArr = {text: elem.size, sortable: false, value: elem.size};
          arr.splice(idx, array.length, copyArr);
          this.headers = arr.concat(this.headers);
          key.push(Object.values(elem)[0])
          value.push(Object.values(elem)[1])
        });
      }
      for (let i = 0; i < this.partsDetails.sizeDistributions.length; i++) {
        const obj = {
          quantity: null,
          size: this.partsDetails.sizeDistributions[i].size,
        };
        this.working_arr.push(obj);
      }
      const allIWorking = [JSON.parse(JSON.stringify(val))];
      allIWorking.forEach((item) => {
        let oldObject = {...item};
        item?.sizeDistributions.forEach(elem => {
          oldObject[elem.size] = elem.quantity
        })
        this.items = [oldObject];
      })
    },
  },
  methods: {
    ...mapActions({
      getWorkingInfo: "workingOperations/getWorkingInfo",
      postWorkingOperation: "workingOperations/postWorkingOperation",
      updateWorkingOperation: "workingOperations/updateWorkingOperation",
      deleteWorkingOperation: "workingOperations/deleteWorkingOperation",
    }),
    openDialog() {
      this.create_working_operation.sizeDistributions = [...this.working_arr];
      this.dialog = true;
    },
    async deleteDetails() {
      const idDetails = {
        id: this.id,
        processPlanningId: this.$route.params.id
      }
      // await this.deleteWorkingOperation(idDetails);
    },
    async create() {
      const validate = this.$refs.form.validate();
      if (validate) {
        const copyWorks = {...this.create_working_operation};
        const items = {
          description: copyWorks.description,
          isVatTaxEnabled: copyWorks.isVatTaxEnabled === "YES",
          lostQuantity: copyWorks.lostQuantity,
          lostReason: copyWorks.lostReason,
          processPlanningId: copyWorks.processPlanningId,
          returnedQuantity: copyWorks.returnedQuantity,
          sizeDistributions: copyWorks.sizeDistributions,
          status: copyWorks.status,
          total: copyWorks.total,
          vatTaxPercent: copyWorks.vatTaxPercent === "" ? 0 : copyWorks.vatTaxPercent,
          weight: copyWorks.weight,
          weightUnit: copyWorks.weightUnit,
        }
        this.items = [];
        await this.postWorkingOperation(items);
        this.$refs.form.reset();
        this.dialog = false;
      }
    },
    async update() {
      const edit_validate = this.$refs.edit_form.validate();
      if (edit_validate) {
        const copyWorks = this.update_working
        const items = {
          id: copyWorks.id,
          processPlanningId: 4,
          sizeDistributions: copyWorks.sizeDistributions,
          total: copyWorks.totalQuantity,
          returnedQuantity: `${copyWorks.returnQuantity}`,
          lostQuantity: `${copyWorks.lostQuantity}`,
          lostReason: copyWorks.lostReason,
          weight: `${copyWorks.weight}`,
          weightUnit: copyWorks.weightUnit,
          status: copyWorks.status,
          isVatTaxEnabled: copyWorks.isVatTexEnabled === "YES",
          vatTaxPercent: `${copyWorks.vatTaxPercent}` === "" ? 0 : `${copyWorks.vatTaxPercent}`,
          description: copyWorks.description,
        }
        await this.updateWorkingOperation(items);
        this.edit_dialog = false;
        this.$refs.edit_form.reset();
      }
    },
    editItem(item) {
      this.edit_dialog = true;
      this.update_working = {...item};
      this.update_working.isVatTexEnabled = JSON.parse(JSON.stringify(item.isVatTexEnabled)) ? "YES" : "NO"
    },
    getDeleteItem(item) {
      this.delete_dialog = true;
      this.id = item.id;
    },
  },
}
</script>

<style lang="scss">
.custom-picker {
  width: 100% !important;
  background: #F8F4FE;
  border-radius: 10px 10px 0 0 !important;

  &::placeholder {
    color: #cccccc;
  }

  > input.el-input__inner {
    border-radius: 10px 10px 0 0 !important;

    background: #F8F4FE !important;
    border: 0;
    border-bottom: 1px solid #777777 !important;
    width: 100% !important;
    height: 52px !important;

    &::placeholder {
      color: #9A979D !important;
    }
  }
}
</style>
