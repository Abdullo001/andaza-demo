<template>
  <div class="mb-6">
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
          <div class="title">{{ $t('planningProduction.planning.planningProduction') }}</div>
          <v-spacer/>
          <v-btn
            color="#7631FF" dark
            class="rounded-lg text-capitalize font-weight-bold"
            height="40"
            @click="openDialog($t('planningProduction.dialog.add'))"
          >
            <v-icon>mdi-plus</v-icon>
            {{ $t('planningProduction.planning.addProcessing') }}
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
          <div class="title text-capitalize">{{ title }} {{ $t('planningProduction.planning.process') }}</div>
          <v-spacer/>
          <v-btn color="#7631FF" icon @click="dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="validate" ref="processing">
            <v-row justify="center">
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">{{ $t('planningProduction.planning.workingProcess') }}</div>
                <v-select
                  :items="processList"
                  item-text="name"
                  item-value="id"
                  filled color="#7631FF"
                  append-icon="mdi-chevron-down"
                  :placeholder="$t('planningProduction.planning.selectWorkingProcess')"
                  v-model="new_process.processId"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">{{ $t('planningProduction.planning.workshop') }}</div>
                <v-select
                  :items="workshopList"
                  item-text="name"
                  item-value="id"
                  filled color="#7631FF"
                  append-icon="mdi-chevron-down"
                  :placeholder="$t('planningProduction.planning.selectWorkshop')"
                  v-model="new_process.workshopId"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">{{ $t('planningProduction.planning.contractDate') }}</div>
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
                <div class="text-body-1 mb-3 font-weight-bold">{{ $t('planningProduction.planning.startedDate') }}</div>
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
                <div class="text-body-1 mb-3 font-weight-bold">{{ $t('planningProduction.planning.finishedDate') }}</div>
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
                <div class="text-body-1 mb-3 font-weight-bold">{{ $t('planningProduction.planning.fabricColor') }}</div>
                <v-select
                  :items="colorsList"
                  item-value="id"
                  item-text="name"
                  filled color="#7631FF"
                  append-icon="mdi-chevron-down"
                  :placeholder="$t('planningProduction.planning.selectFabricColor')"
                  v-model="new_process.colorId"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">{{ $t('planningProduction.planning.quantity') }}</div>
                <v-text-field
                  filled color="#7631FF"
                  placeholder="0"
                  v-model="new_process.quantity"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">{{ $t('planningProduction.planning.currency') }}</div>
                <v-select
                  :items="currencyEnums"
                  filled color="#7631FF"
                  append-icon="mdi-chevron-down"
                  :placeholder="$t('planningProduction.planning.selectCurrency')"
                  v-model="new_process.unitPriceCurrency"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 mb-3 font-weight-bold">{{ $t('planningProduction.planning.unitPrice') }}</div>
                <v-text-field
                  filled color="#7631FF"
                  placeholder="0"
                  v-model="new_process.unitPrice"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="text-body-1 mb-3 font-weight-bold">{{ $t('planningProduction.planning.comment') }}</div>
                <v-text-field
                  filled color="#7631FF"
                  :placeholder="$t('planningProduction.planning.comment')"
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
            {{ $t('planningProduction.planning.cancel') }}
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
            dark @click="removeProcess"
          >
            {{ $t('localization.dialog.delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="d-flex">
      <v-spacer/>
      <v-btn
        color="#7631FF"
        class="rounded-lg text-capitalize font-weight-bold mt-4"
        width="194" height="44"
        @click="goWorking"
        dark
      >
        {{ $t('planningProduction.planning.workingOperations') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ProductionPlanningComponent',
  data() {
    return {
      validate: true,
      delete_dialog: false,
      headers: [
        {text: this.$t('planningProduction.planning.process'), align: 'start', sortable: false, value: 'process'},
        {text: this.$t('planningProduction.planning.workshop'), sortable: false, value: 'workshop'},
        {text: this.$t('planningProduction.planning.contractDate'), sortable: false, value: 'contractDate'},
        {text: this.$t('planningProduction.planning.startedDate'), sortable: false, value: 'startedDate'},
        {text: this.$t('planningProduction.planning.finishedDate'), sortable: false, value: 'finishedDate'},
        {text: this.$t('planningProduction.planning.color'), sortable: false, value: 'color'},
        {text: this.$t('planningProduction.planning.comment'), sortable: false, value: 'description'},
        {text: this.$t('planningProduction.planning.quantity'), sortable: false, value: 'quantity'},
        {text: this.$t('planningProduction.planning.currency'), sortable: false, value: 'unitPriceCurrency'},
        {text: this.$t('planningProduction.planning.unitPrice'), sortable: false, value: 'unitPrice'},
        {text: this.$t('planningProduction.planning.totalPrice'), sortable: false, value: 'totalPrice'},
        {text: this.$t('planningProduction.planning.createdDate'), sortable: false, value: 'createdDate'},
        {text: this.$t('planningProduction.planning.actions'), sortable: false, value: 'actions'},
      ],
      planningList: [],
      dialog: false,
      title: this.$t('planningProduction.dialog.add'),
      btnText: this.$t('planningProduction.dialog.save'),
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
      currentProcessId: ''
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
      if(this.title === this.$t('planningProduction.dialog.add')) {
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
      this.title = this.$t('planningProduction.dialog.edit');
      this.btnText = this.$t('planningProduction.dialog.update');
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
      this.currentProcessId = item.id;
    },
    async removeProcess() {
      await this.deleteProcessing(this.currentProcessId);
      this.delete_dialog = false;
    },
    goWorking() {
      if(this.selectedProcess.length) {
        this.$router.push(this.localePath(`/working-process/${this.selectedProcess[0].id}?id=${this.$route.params.id}`));
      }
    }
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
