<template>
  <v-card flat>
    <v-data-table
      id="myTable"
      :headers="headers"
      :items="processingList"
      :items-per-page="10"
      :server-items-length="processingTotalElements"
      show-select
      :single-select="true"
      v-model="selectedProcess"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      checkbox-color="#7631FF"
    >
      <template #top>
        <v-card-title class="d-flex">
          <div class="title">Planning of production</div>
          <v-spacer/>
          <v-btn
            color="#7631FF" dark
            class="rounded-lg text-capitalize font-weight-bold"
            width="200" height="40"
            @click="openDialog('add')"
          >
            <v-icon>mdi-plus</v-icon>
            add processing
          </v-btn>
        </v-card-title>
      </template>
      <template #item.totalPrice="{item}">
        {{ item.totalPrice.toLocaleString() }}
      </template>
      <template #item.unitPrice="{item}">
        {{ item.unitPrice.toLocaleString() }}
      </template>
      <template #item.actions="{item}">
        <v-btn icon color="green" @click.stop="editItem(item)">
          <v-img src="/edit-active.svg" max-width="22"/>
        </v-btn>
        <v-btn icon color="red" @click.stop="deleteItem(item)">
          <v-img src="/delete.svg" max-width="27"/>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="1000">
      <v-card flat>
        <v-card-title class="d-flex mb-4">
          <div class="title text-capitalize">{{ title }} process</div>
          <v-spacer/>
          <v-btn color="#7631FF" icon @click="dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="validate" ref="processing">
            <v-row justify="center">
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Working process</div>
                <v-select
                  :items="processList"
                  item-text="name"
                  item-value="id"
                  filled color="#7631FF"
                  append-icon="mdi-chevron-down"
                  placeholder="Select working process"
                  v-model="new_process.processId"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Workshop</div>
                <v-select
                  :items="workshopList"
                  item-text="name"
                  item-value="id"
                  filled color="#7631FF"
                  append-icon="mdi-chevron-down"
                  placeholder="Select workshop"
                  v-model="new_process.workshopId"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Contract date</div>
                <el-date-picker
                  v-model="new_process.contractDate"
                  type="datetime"
                  placeholder="DD.MM.YYYY"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                  class="custom-picker"
                >
                </el-date-picker>
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Started date</div>
                <el-date-picker
                  v-model="new_process.startedDate"
                  type="datetime"
                  placeholder="DD.MM.YYYY"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                  class="custom-picker"
                >
                </el-date-picker>
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Finished date</div>
                <el-date-picker
                  v-model="new_process.finishedDate"
                  type="datetime"
                  placeholder="DD.MM.YYYY"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                  class="custom-picker"
                >
                </el-date-picker>
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Fabric color</div>
                <v-select
                  :items="colorsList"
                  item-value="id"
                  item-text="name"
                  filled color="#7631FF"
                  append-icon="mdi-chevron-down"
                  placeholder="Select fabric color"
                  v-model="new_process.colorId"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Quantity</div>
                <v-text-field
                  filled color="#7631FF"
                  placeholder="0"
                  v-model="new_process.quantity"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Currency</div>
                <v-select
                  :items="currencyEnums"
                  filled color="#7631FF"
                  append-icon="mdi-chevron-down"
                  placeholder="Select currency"
                  v-model="new_process.unitPriceCurrency"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">Unit price</div>
                <v-text-field
                  filled color="#7631FF"
                  placeholder="0"
                  v-model="new_process.unitPrice"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="text-body-1 mb-3 font-weight-bold">Comment</div>
                <v-text-field
                  filled color="#7631FF"
                  placeholder="Comment"
                  v-model="new_process.description"
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
            @click="dialog=false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold ml-8"
            color="#7631FF" dark
            width="163" height="44"
            @click="saveProcessing()"
          >
            {{ btnText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">{{ $t('localization.dialog.deleteDilaog') }}</v-card-title>
        <v-card-text>
          {{ $t('localization.dialog.deletetext') }}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{ $t('localization.dialog.cancel') }}
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark @click="deleteItem('delete')"
          >
            {{ $t('localization.dialog.delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ProductionOfPlanningComponent',
  data() {
    return {
      validate: true,
      delete_dialog: false,
      headers: [
        {text: 'Process', align: 'start', sortable: false, value: 'process'},
        {text: 'Workshop', sortable: false, value: 'workshop'},
        {text: 'Contract date', sortable: false, value: 'contractDate'},
        {text: 'Started date', sortable: false, value: 'startedDate'},
        {text: 'Finished date', sortable: false, value: 'finishedDate'},
        {text: 'Color', sortable: false, value: 'color'},
        {text: 'Comment', sortable: false, value: 'description'},
        {text: 'Quantity', sortable: false, value: 'quantity'},
        {text: 'Currency', sortable: false, value: 'unitPriceCurrency'},
        {text: 'Unit price', sortable: false, value: 'unitPrice'},
        {text: 'Total price', sortable: false, value: 'totalPrice'},
        {text: 'Created date', sortable: false, value: 'createdDate'},
        {text: 'Actions', sortable: false, value: 'actions'},
      ],
      planningList: [],
      dialog: false,
      title: 'Add',
      btnText: 'save',
      currencyEnums: ['UZS', 'RUB', 'USD'],
      new_process: {
        processId: '',
        workshopId: '',
        contractDate: '',
        startedDate: '',
        finishedDate: '',
        colorId: '',
        description: '',
        quantity: '',
        unitPriceCurrency: '',
        unitPrice: '',
        productionId: '',
      },
      selectedProcess: [],
      processRow: null
    }
  },
  computed: {
    ...mapGetters({
      processList: 'production/planning/processList',
      workshopList: 'production/planning/workshopList',
      colorsList: 'production/planning/colorsList',
      productionId: 'production/planning/productionId',
      processingList: 'production/planning/processingList',
      processingTotalElements: 'production/planning/processingTotalElements'
    })
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$refs.processing.reset();
        this.new_process.contractDate = '';
        this.new_process.startedDate = '';
        this.new_process.finishedDate = '';
        delete this.new_process.id
      }
    }
  },
  methods: {
    ...mapActions({
      createProcessing: 'production/planning/createProcessing',
      updateProcessing: 'production/planning/updateProcessing',
      deleteProcessing: 'production/planning/deleteProcessing'
    }),
    async saveProcessing() {
      if(this.title === 'add') {
        this.new_process.productionId = this.productionId;
        await this.createProcessing(this.new_process);
        this.$refs.processing.reset();
        this.dialog = false;
      } else {
        await this.updateProcessing(this.new_process);
        this.dialog = false;
        this.$refs.processing.reset();
      }
    },
    openDialog(title) {
      this.title = title;
      this.dialog = true;
    },
    editItem(item) {
      this.dialog = true;
      this.title = 'Edit';
      this.btnText = 'update';
      this.new_process = {
        processId: item.processId,
        workshopId: item.workshopId,
        contractDate: item.contractDate,
        startedDate: item.startedDate,
        finishedDate: item.finishedDate,
        colorId: item.colorId,
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unitPriceCurrency: item.unitPriceCurrency,
        unitPrice: item.unitPrice,
        productionId: item.productionId,
      }
    },
    deleteItem(item) {
      this.delete_dialog = true;

    }
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
