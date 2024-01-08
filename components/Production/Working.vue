<template>
  <v-card flat class="rounded-lg">
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="10"
    >
      <template #top>
        <v-card-title class="d-flex">
          <div class="title">{{ $t('workingProcess.working.workingOperation') }}</div>
          <v-spacer/>
          <v-btn
            v-if="message !== 200"
            color="#544B99" dark
            class="rounded-lg text-capitalize font-weight-bold"
            width="200" height="40"
            @click="openDialog"
          >
            <v-icon>mdi-plus</v-icon>
            {{ $t('workingProcess.working.workingOperation') }}
          </v-btn>
          <v-btn
            v-else
            disabled
            class="rounded-lg text-capitalize font-weight-bold"
            width="200" height="40"
          >
            <v-icon>mdi-plus</v-icon>
            {{ $t('workingProcess.working.workingOperation') }}
          </v-btn>
        </v-card-title>
      </template>
      <template #item.actions="{item}">
        <v-tooltip top color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              @click="downloadPDF(item)"
            >
              <v-icon>
                mdi-download
              </v-icon>
            </v-btn>
          </template>
          <span>{{ $t('workingProcess.working.pdfDownload') }}</span>
        </v-tooltip>
        <v-btn icon color="green" @click.stop="editItem(item)">
          <v-img src="/edit-active.svg" max-width="22"/>
        </v-btn>
        <v-btn icon color="red" @click.stop="getDeleteItem(item)">
          <v-img src="/delete.svg" max-width="27"/>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="572">
      <v-card flat>
        <v-card-title class="d-flex mb-4">
          <div class="title text-capitalize">{{ $t('workingProcess.working.addWorkingOperations') }}</div>
          <v-spacer/>
          <v-btn color="#544B99" icon @click="dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form lazy-validation v-model="validate" ref="form">
            <v-row>
              <v-col
                v-if="create_working_operation.sizeDistributions.length !== 0"
                cols="12"
                lg="3"
                v-for="(item, idx) in partList?.sizeDistributions"
                :key="idx"
              >
                <div class="label">{{ item?.size }}</div>
                <v-text-field
                  v-model="create_working_operation.sizeDistributions[idx].quantity"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="rounded-lg base"
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#544B99"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.total') }}</div>
                <v-text-field
                  v-model="create_working_operation.total"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="rounded-lg base"
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.return') }}</div>
                <v-text-field
                  v-model="create_working_operation.returnedQuantity"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="rounded-lg base"
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.loss') }}</div>
                <v-text-field
                  v-model="create_working_operation.lostQuantity"
                  outlined
                  hide-details
                  dense
                  height="44"
                  class="rounded-lg base"
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.lossReason') }}</div>
                <v-textarea
                  v-model="create_working_operation.lostReason"
                  rows="1"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  auto-grow
                  color="#544B99"
                  :placeholder="$t('workingProcess.working.selectWorkingProcess')"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.weight') }}</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="create_working_operation.weight"
                    outlined
                    hide-details
                    dense
                    height="44"
                    class="rounded-lg base"
                    :rules="[ formRules.required ]"
                    validate-on-blur
                    placeholder="0"
                    color="#544B99"
                  />
                  <v-select
                    v-model="create_working_operation.weightUnit"
                    :items="weight_enum"
                    style="width: 80px;"
                    outlined
                    dense
                    hide-details
                    height="44"
                    class="rounded-lg base"
                    :rules="[ formRules.required ]"
                    validate-on-blur
                    append-icon="mdi-chevron-down"
                    color="#544B99"
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.status') }}</div>
                <v-select
                  v-model="create_working_operation.status"
                  :items="status_enums"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="rounded-lg base"
                  :rules="[ formRules.required ]"
                  append-icon="mdi-chevron-down"
                  validate-on-blur
                  color="#544B99"
                  :placeholder="$t('workingProcess.working.selectFabricColor')"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.vat') }}, %</div>
                <v-text-field
                  v-model="create_working_operation.vatTaxPercent"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="rounded-lg base"
                  validate-on-blur
                  :rules="create_working_operation.isVatTaxEnabled !== 'YES' ? [] : [formRules.required]"
                  :disabled="form_disabled"
                  :placeholder="$t('workingProcess.working.selectVat')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.vat') }}</div>
                <v-select
                  v-model="create_working_operation.isVatTaxEnabled"
                  :items="vat"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="rounded-lg base"
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  append-icon="mdi-chevron-down"
                  :placeholder="$t('workingProcess.working.selectVat')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.comment') }}</div>
                <v-text-field
                  v-model="create_working_operation.description"
                  outlined
                  dense
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="0"
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#544B99"
            width="163" height="44"
            @click="dialog = !dialog"
          >
            {{ $t('workingProcess.working.cancel') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold ml-8"
            color="#544B99" dark
            width="163" height="44"
            @click="create"
          >
            {{ $t('workingProcess.working.add') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" max-width="572">
      <v-card flat>
        <v-card-title class="d-flex mb-4">
          <div class="title text-capitalize">{{ $t('workingProcess.working.editWorkingOperations') }}</div>
          <v-spacer/>
          <v-btn color="#544B99" icon @click="edit_dialog = !edit_dialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="edit_validate" ref="edit_form" lazy-validation>
            <v-row>
              <v-col
                v-if="update_working.sizeDistributions.length !== 0"
                cols="12"
                lg="3"
                v-for="(item, idx) in partList?.sizeDistributions"
                :key="idx"
              >
                <div class="label">{{ item?.size }}</div>
                <v-text-field
                  v-model="update_working.sizeDistributions[idx].quantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#544B99"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.total') }}</div>
                <v-text-field
                  v-model="update_working.totalQuantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.return') }}</div>
                <v-text-field
                  v-model="update_working.returnQuantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.loss') }}</div>
                <v-text-field
                  v-model="update_working.lostQuantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  placeholder="0"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.lossReason') }}</div>
                <v-textarea
                  v-model="update_working.lostReason"
                  rows="1"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  auto-grow
                  color="#544B99"
                  :placeholder="$t('workingProcess.working.selectLossReason')"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.weight') }}</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="update_working.weight"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base"
                    validate-on-blur
                    :rules="[ formRules.required ]"
                    placeholder="0"
                    color="#544B99"
                  />
                  <v-select
                    v-model="update_working.weightUnit"
                    :items="weight_enum"
                    style="width: 80px;"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base"
                    hide-selected
                    :rules="[ formRules.required ]"
                    validate-on-blur
                    append-icon="mdi-chevron-down"
                    color="#544B99"
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.status') }}</div>
                <v-select
                  v-model="update_working.status"
                  :items="status_enums"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :rules="[ formRules.required ]"
                  validate-on-blur
                  append-icon="mdi-chevron-down"
                  color="#544B99"
                  :placeholder="$t('workingProcess.working.selectStatus')"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.vat') }}, %</div>
                <v-text-field
                  v-model="update_working.vatTaxPercent"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :disabled="update_working.isVatTexEnabled!=='YES'"
                  :placeholder="$t('workingProcess.working.selectVat')"
                  :rules="update_working.isVatTexEnabled !== 'YES' ? [] : [formRules.required]"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.vat') }}</div>
                <v-select
                  v-model="update_working.isVatTexEnabled"
                  :items="vat"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  validate-on-blur
                  append-icon="mdi-chevron-down"
                  :placeholder="$t('workingProcess.working.selectVat')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('workingProcess.working.comment') }}</div>
                <v-text-field
                  v-model="update_working.description"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('workingProcess.working.selectComment')"
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#544B99"
            width="163" height="44"
            @click="edit_dialog = !edit_dialog"
          >
            {{ $t('workingProcess.working.cancel') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold ml-8"
            color="#544B99" dark
            width="163" height="44"
            @click="update"
          >
            {{ $t('workingProcess.working.update') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">{{ $t('workingProcess.working.deleteDialog') }}</v-card-title>
        <v-card-text>
          {{ $t('workingProcess.working.deleteText') }}
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
        {text: this.$t('workingProcess.workingTable.amount'), align: 'start', sortable: false, value: 'amount'},
        {text: this.$t('workingProcess.workingTable.fabricColor'), sortable: false, value: 'fabricColor'},
        {text: this.$t('workingProcess.workingTable.isVatTexEnabled'), sortable: false, value: 'isVatTexEnabled'},
        {text: this.$t('workingProcess.workingTable.lostQuantity'), sortable: false, value: 'lostQuantity'},
        {text: this.$t('workingProcess.workingTable.returnQuantity'), sortable: false, value: 'returnQuantity'},
        {text: this.$t('workingProcess.workingTable.totalAmount'), sortable: false, value: 'totalAmount'},
        {text: this.$t('workingProcess.workingTable.totalQuantity'), sortable: false, value: 'totalQuantity'},
        {text: this.$t('workingProcess.workingTable.unitPrice'), sortable: false, value: 'unitPrice'},
        {text: this.$t('workingProcess.workingTable.unitPriceCurrency'), sortable: false, value: 'unitPriceCurrency'},
        {text: this.$t('workingProcess.workingTable.vatTaxPercent'), sortable: false, value: 'vatTaxPercent'},
        {text: this.$t('workingProcess.workingTable.weight'), sortable: false, value: 'weight'},
        {
          text: this.$t('workingProcess.workingTable.actions'),
          sortable: false,
          value: 'actions',
          width: 116,
          align: "center"
        },
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
        processPlanningId: "",
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
        processPlanningId: "",
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
          processPlanningId: this.$route.params.id,
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
      if (this.headers.length <= 13) {
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
    async getWorkingOperationPdf(id) {
      await this.$axios.get(`/api/v1/working-operations/generate-invoice-pdf?detailsId=${id}`)
        .then((res) => {
          const blob = new Blob([res.data], {type: "application/pdf"});
          const link = document.createElement("a");
          const url = URL.createObjectURL(blob);
          link.href = url
          link.download = "document.pdf";
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(({response}) => {
          this.$toast.error(response.data.message);
        })
    },
    openDialog() {
      this.create_working_operation.sizeDistributions = [...this.working_arr];
      this.dialog = true;
    },
    async deleteDetails() {
      const idDetails = {
        id: this.id,
        processPlanningId: this.$route.params.id
      };
      await this.deleteWorkingOperation(idDetails);
      this.delete_dialog = false;
    },
    async downloadPDF(item) {
      await this.getWorkingOperationPdf(item.id);
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
        };
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
        };
        await this.updateWorkingOperation(items);
        this.edit_dialog = false;
        this.$refs.edit_form.reset();
      }
    },
    editItem(item) {
      this.edit_dialog = true;
      this.update_working = {...item};
      this.update_working.weightUnit = item.weightUnit === undefined ? "kg" : JSON.parse(JSON.stringify(item.weightUnit));
      if (item.isVatTexEnabled !== undefined) {
        this.update_working.isVatTexEnabled = JSON.parse(JSON.stringify(item.isVatTexEnabled)) ? "YES" : "NO";
      } else {
        this.update_working.isVatTexEnabled = "NO"
      }
    },
    getDeleteItem(item) {
      this.delete_dialog = true;
      this.id = item.id;
    },
  },
  mounted() {
    this.create_working_operation.processPlanningId = this.$route.params.id;
    this.update_working.processPlanningId = this.$route.params.id;
  }
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
