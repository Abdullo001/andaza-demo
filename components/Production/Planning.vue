<template>
  <div class="mb-6">
    <v-data-table
      id="myTable"
      :headers="headers"
      :items="planningList"
      :items-per-page="10"
      :server-items-length="processingTotalElements"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      @click:row="(item) => getCurrentRow(item)"
    >
      <template #top>
        <v-card-title class="d-flex">
          <div class="title">{{$t('secondaryWarehouse.productionProcesses')}}</div>
          <v-spacer/>
          <div>
            <v-btn
              color="#544B99"
              outlined
              class="rounded-lg text-capitalize font-weight-bold"
              height="40"
              :disabled="btn_disabled"
              @click="openDailyTask"
            >
              {{ $t('planningProduction.planning.dailyTasks') }}
            </v-btn>
            <v-btn
              color="#544B99" dark
              class="rounded-lg text-capitalize font-weight-bold"
              height="40"
              :disabled="btn_disabled"
              @click="openDialog('add')"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t('planningProduction.planning.process') }}
            </v-btn>
          </div>
        </v-card-title>
      </template>
      <template #item.process="{item}">
        {{ item.process?$t(`planningProduction.process.${item.process.toLowerCase()}`):'' }}
      </template>
      <template #item.workshopType="{item}">
        {{ item.workshopType?$t(`planningProduction.workShopType.${item.workshopType.toLowerCase()}`):'' }}
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
    <v-dialog v-model="dialog" max-width="572">
      <v-card flat>
        <v-card-title class="d-flex mb-4">
          <div class="title text-capitalize">{{ title }} {{ $t('planningProduction.planning.process') }}</div>
          <v-spacer/>
          <v-btn color="#544B99" icon @click="dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="validate" ref="processing">
            <v-row justify="center">
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('planningProduction.planning.workingProcess') }}<span style="color: red" >*</span> </div>
                <v-select
                  :items="processList"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="rounded-lg base"
                  color="#544B99"
                  append-icon="mdi-chevron-down"
                  :placeholder="$t('planningProduction.planning.selectWorkingProcess')"
                  v-model="new_process.process"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('planningProduction.planning.startedDate') }}</div>
                <el-date-picker
                  v-model="new_process.startDate"
                  type="datetime"
                  style="width: 100%"
                  placeholder="DD.MM.YYYY"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                  class="base_picker"
                >
                </el-date-picker>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('planningProduction.planning.workshop') }}<span style="color: red" >*</span></div>
                <v-select
                  :items="workshopList"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="rounded-lg base" color="#544B99"
                  append-icon="mdi-chevron-down"
                  :placeholder="$t('planningProduction.planning.selectWorkshop')"
                  v-model="new_process.workshopType"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('planningProduction.planning.comment') }}</div>
                <v-text-field
                  outlined
                  hide-details
                  dense
                  height="44"
                  class="rounded-lg base" color="#544B99"
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
            color="#544B99"
            width="163" height="44"
            @click="dialog=false"
          >
            {{ $t('planningProduction.planning.cancel') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold ml-8"
            color="#544B99" dark
            width="163" height="44"
            @click="createProcess"
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
        <v-card-title class="d-flex justify-center">{{ $t('workingProcess.dialog.deleteTitle') }}</v-card-title>
        <v-card-text>
          {{ $t('workingProcess.dialog.deleteText') }}
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
    <WarningDialog v-bind="warningDate" />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import WarningDialog from "../WarningDialog.vue";

export default {
  name: 'ProductionPlanningComponent',
  components: {
    WarningDialog,
  },
  data() {
    return {
      btn_disabled: true,
      validate: true,
      delete_dialog: false,
      headers: [
        {text: this.$t('planningProduction.planning.process'), align: 'start', sortable: false, value: 'process'},
        {text: this.$t('planningProduction.planning.workshop'), sortable: false, value: 'workshopType'},
        {text: this.$t('planningProduction.planning.startedDate'), sortable: false, value: 'startedDate'},
        {text: this.$t('planningProduction.planning.finishedDate'), sortable: false, value: 'finishedDate'},
        {text: this.$t('planningProduction.planning.comment'), sortable: false, value: 'description'},
        {text: this.$t('planningProduction.planning.actions'), sortable: false, value: 'actions'},
      ],
      planningList: [],
      dialog: false,
      title: "add",
      btnText: this.$t('planningProduction.dialog.save'),
      currencyEnums: ['UZS', 'RUB', 'USD'],
      new_process: {
        process: '',
        workshopType: '',
        startDate: '',
        description: '',
        productionId: '',
      },
      selectedProcess: [],
      currentProcessId: '',
      processList:[
        {id:"CUTTING", name:this.$t('planningProduction.process.cutting')},
        {id:"PRINTING", name:this.$t('planningProduction.process.printing')},
        {id:"SEWING", name:this.$t('planningProduction.process.sewing')},
        {id:"IRONING", name:this.$t('planningProduction.process.ironing')},
        {id:"QUALITY_CONTROL", name:this.$t('planningProduction.process.quality_control')},
        {id:"PACKAGING", name:this.$t('planningProduction.process.packaging')},
        {id:"SORTING", name:this.$t('planningProduction.process.sorting')},
      ],
      workshopList:[
        {id:"SUBCONTRACTOR", name:this.$t('planningProduction.workShopType.subcontractor')},
        {id:"OWN_WORKSHOP", name:this.$t('planningProduction.workShopType.own')},
        {id:"BOTH", name:this.$t('planningProduction.workShopType.both')},
      ],
      lastItem:{},
      warningState:false,
      warningText:""
    }
  },
  computed: {
    warningDate: {
      get() {
        return {
          dialogState: this.warningState,
          voidFunction: this.saveProcessing,
          dialogCloser: () => {
            this.warningState = false;
          },
          dialogText: this.warningText,
        };
      },
    },
    ...mapGetters({
      colorsList: 'production/planning/colorsList',
      productionId: 'production/planning/productionId',
      processingList: 'production/planning/processingList',
      processingTotalElements: 'production/planning/processingTotalElements',
      planningProcessId: "cuttingProcess/planningProcessId",
    })
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$refs.processing.reset();
        this.new_process.startDate = '';
        delete this.new_process.id
      }
    },
    processingList(val) {
      this.planningList = JSON.parse(JSON.stringify(val));
      this.lastItem=this.planningList[0]
    },
    productionId(val) {
      this.btn_disabled = false;
    }
  },
  methods: {
    ...mapActions({
      createProcessing: 'production/planning/createProcessing',
      updateProcessing: 'production/planning/updateProcessing',
      deleteProcessing: 'production/planning/deleteProcessing',
    }),
    async saveProcessing() {
      const validate = await this.$refs.processing.validate();
      if (!validate) return;
      if (this.title === "add") {
        this.new_process.productionId = this.productionId;
        let item={}
        for(let el in this.new_process) {
          if(this.new_process[el]){
            item[el] = this.new_process[el]
          }
        }
        await this.createProcessing(item);
        this.$refs.processing.reset();
        this.dialog = false;
      } else {
        await this.updateProcessing(this.new_process);
        this.dialog = false;
        this.$refs.processing.reset();
      }
      this.warningState=false
    },

    async createProcess(){
      const validate = await this.$refs.processing.validate();
      if (!validate) return;
      if(this.lastItem?.status==="Finished"|| !this.lastItem){
        this.saveProcessing()
      } else {
        this.warningText=`The previous <strong>${this.lastItem.process?.toUpperCase()}</strong> process has not yet been completed. Are you sure you want to continue?`
        this.warningState=true
      }
    },
    openDailyTask(){
      const id = this.$route.params.id;
      this.$router.push(`/production/daily-works/${id}`)
    },
    openDialog(title) {
      this.title = title;
      this.dialog = true;
    },
    getCurrentRow(item){
      this.$store.commit('cuttingProcess/setPlanningProcessId', item.id)
      const id = this.$route.params.id;
      const isConfirm=item.isConfirmed??false
      const process=item.process?item.process.toLowerCase().replace('_', '-'):'';
      this.$store.commit('subcontracts/setPlanningProcessId', item.id)
      this.$store.commit('commonProcess/setPlanningProcessId', item.id)
      this.$store.commit('commonProcess/setIsConfirm',{isConfirm:item.isConfirmed,time: new Date()})
      this.$router.push(this.localePath(`/planning-production/${process}/${id}?isConfirmed=${isConfirm}`));

    },
    editItem(item) {
      this.dialog = true;
      this.title = "edit";
      this.btnText = this.$t('planningProduction.dialog.update');
      this.new_process = {
        process: item.process,
        workshopType: item.workshopType,
        startDate: item.startedDate,
        id: item.id,
        description: item.description,
        quantity: item.quantity,
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
      if (this.selectedProcess.length) {
        this.$router.push(this.localePath(`/working-process/${this.selectedProcess[0].id}?id=${this.$route.params.id}`));
      }
    }
  },
  mounted() {
    const param = this.$route.params.id;
    if (param !== "create") {
      this.btn_disabled = false;
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
