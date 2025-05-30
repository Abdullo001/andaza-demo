<template>
  <div class="mt-4">
    <v-data-table
      :headers="chartHeaders"
      :items="planningChartList"
      hide-default-footer
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="text-h6">{{ $t('planning.planningChart.fabricPlanningChart') }}</div>
            <div class="d-flex ">
              <VuetifyCombobox v-model="cloningTemplate" class="mr-4" :itemsList="planningchartTemplatesList" :itemText="'templateName'" :itemValue="'templateName'" :placeholder="'Select template'"/>
              <v-btn
              class="rounded-lg white--text text-capitalize"
              color="#544B99"
              height="36"
              @click="openDialog"
              :disabled="!(modelId !== '')"
            >
              <v-icon class="mr-2">mdi-plus</v-icon>
             {{$t('planning.planningChart.fabricPlanning')}}
            </v-btn>
            </div>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.withFleece="{item}">
        {{ item.withFleece?"Fleece":"-" }}
      </template>

      <template #item.peachEffectEnabled="{item}">
        {{ item.peachEffectEnabled?"Peach effect":"-" }}
      </template>

      <template #item.actions="{item}">
        <v-btn
          icon
          class="mr-3"
          @click="getRow(item)"
        >
          <v-img src="/edit-green.svg" max-width="22"/>
        </v-btn>
        <v-btn
          icon
          @click="getSelectedId(item)"
        >
          <v-img src="/delete.svg" max-width="27"/>
        </v-btn>

      </template>
    </v-data-table>
    <div class="d-flex justify-end mt-4">
      <SaveClonComponent @saveTemplate="saveFabricTemlate"/>
    </div>
    <v-dialog
      v-model="new_dialog"
      max-width="800"
      transition="slide-x-transition"
    >
      <v-card>
        <v-card-title class="d-flex">
          <div class="title">
           <p v-if="dialog_title=='Add'">{{ $t('planning.planningChart.fabricPlanning') }}</p>
           <p v-else>{{ $t('userManagement.child.edit') }}</p>
          </div>
          <v-spacer/>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form lazy-validation ref="new_validate">
            <v-row>
              <v-col lg="6">
                <div class="label">{{ $t('planning.planningChart.modelPart') }}</div>
                <v-select
                  :items="modelPartsList"
                  item-text="bodyPart"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  :placeholder="$t('planning.planningChart.modelPart')"
                  class="rounded-lg base"
                  dense
                  validate-on-blur
                  append-icon="mdi-chevron-down"
                  color="#544B99"
                  v-model="fabric_planning.modelPartId"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <div class="label">{{ $t('orderBox.modelPrint.quantity') }}</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base" dense
                  :placeholder="$t('orderBox.modelPrint.quantity')"
                  validate-on-blur
                  color="#544B99"
                  v-model="fabric_planning.quantity"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <div class="label">{{$t('planning.planningChart.widthType') }}</div>
                <v-select
                  :items="withTypeEnum"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base" dense
                  validate-on-blur
                  :placeholder="$t('planning.planningChart.widthType')"
                  append-icon="mdi-chevron-down"
                  color="#544B99"
                  v-model="fabric_planning.widthType"
                />
              </v-col>
              <v-col lg="6">
                <div class="label">{{ $t('sidebar.measurementUnit')}}</div>
                <v-select
                  :items="measurementUnit"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base" dense
                  validate-on-blur
                  :placeholder="$t('sidebar.measurementUnit')"
                  append-icon="mdi-chevron-down"
                  color="#544B99"
                  v-model="fabric_planning.quantityUnitId"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <div class="label">{{$t('planning.planningChart.widthCm') }}</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base" dense
                  validate-on-blur
                  :placeholder="$t('planning.planningChart.widthCm')"
                  color="#544B99"
                  v-model="fabric_planning.width"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <div class="label">{{$t('planning.planningChart.densityGrM2')}}</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base" dense
                  validate-on-blur
                  color="#544B99"
                  :placeholder="$t('planning.planningChart.densityGrM2')"
                  v-model="fabric_planning.density"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <div class="label">{{$t('workingProcess.working.comment')}}</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base" dense
                  validate-on-blur
                  :placeholder="$t('workingProcess.working.comment')"
                  color="#544B99"
                  v-model="fabric_planning.description"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6" class="d-flex align-center">
                <div class="body-1 font-weight-medium">{{$t('planning.planningChart.fleece')}}</div>
                <v-spacer/>
                <v-switch v-model="fabric_planning.withFleece"
                          inset color="#4F46E5"
                />
              </v-col>
              <v-col cols="12" lg="6" class="d-flex align-center">
                <div class="body-1 font-weight-medium">{{$t('planning.planningChart.peachEffect')}}</div>
                <v-spacer/>
                <v-switch v-model="fabric_planning.peachEffectEnabled"
                          inset color="#4F46E5"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center pb-6">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            style="border: 2px solid #544B99"
            width="163" height="44"
            color="#544B99"
            @click="new_dialog=false"
          >
           {{$t('userManagement.dialog.cancel')}}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-8"
            width="163" height="44"
            color="#544B99" dark
            @click="createChart"
          >
            {{ dialog_btn==="Add"?$t('save'):$t('update') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <DeleteDialog :delete-function="removeItem" :delete-dialog="delete_dialog" :close-dialog="closeDialog"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import DeleteDialog from "../DeleteDialog.vue";
import VuetifyCombobox from "../UI/VuetifyCombobox.vue";
import SaveClonComponent from "../ClonningComponents/SaveClonComponent.vue";

export default {
  name: 'PrintingChartComponent',
  components: {
    DeleteDialog,
    VuetifyCombobox,
    SaveClonComponent,
  },
  data() {
    return {
      delete_dialog: false,
      currency_enums: ["USD", "UZS", "RUB"],
      chartHeaders: [
        {text: this.$t('planning.planningChart.part'), align: 'start', sortable: false, value: 'bodyPartName', width:200},
        {text: this.$t('planning.planningChart.fabricSpecification'), value: 'fabricSpecification', width:200},
        {text: this.$t('planning.planningChart.fleece'), value: 'withFleece',width: 90},
        {text: this.$t('planning.planningChart.part'), value: 'peachEffectEnabled', width: 130},
        {text: this.$t('planning.planningChart.quantity'), value: 'quantity',width:100},
        {text: 'M/U', value: 'quantityUnit',width:80},
        {text: this.$t('planning.planningChart.widthType'), value: 'widthType',width:120},
        {text: this.$t('planning.planningChart.widthCm'), value: 'width',width:120},
        {text: this.$t('planning.planningChart.densityGrM2'), value: 'density', width: 140},
        {text: this.$t('planning.planningChart.actions'), value: 'actions', align: 'center',width: 140},
      ],
      planningCharts: [],
      new_dialog: false,
      fabric_planning: {
        density: "",
        description: "",
        fabricPlanningId: null,
        modelPartId: null,
        withFleece:false,
        peachEffectEnabled:false,
        quantity: "",
        fabricPriceCurrency:"USD",
        fabricPrice:null,
        quantityUnitId: null,
        width: "",
        widthType: ""
      },
      withTypeEnum: ['TUP2', 'A/E'],
      selected_id: '',
      dialog_title: '',
      dialog_btn: '',
      cloningTemplate:null,
      planningId:null,
    }
  },
  created() {
    this.getMeasurementUnit();
  },
  computed: {
    ...mapGetters({
      modelPartsList: 'modelParts/modelPartsList',
      modelId: 'fabric/modelId',
      measurementUnit: 'measurement/measurementUnit',
      fabricPlanningId: 'fabric/fabricPlanningId',
      planningChartList: 'fabric/planningChartList',
      planningchartTemplatesList: 'fabric/planningchartTemplatesList',
    })
  },
  watch: {
    fabricPlanningId(id){
      this.planningId=id
    },
    cloningTemplate(val){
      const data={
        fabricPlanningId:this.planningId,
        templateName:val.templateName
      }
      this.setPlanningChartTemplate(data)
    },
    modelId(val) {
      this.getModelPart(val);
    },
    new_dialog(val) {
      if (!val) {
        this.fabric_planning = {
          density: "",
          description: "",
          fabricPlanningId: null,
          modelPartId: null,
          quantity: "",
          fabricPriceCurrency:"USD",
          fabricPrice:null,
          quantityUnitId: null,
          withFleece:false,
          peachEffectEnabled:false,
          width: "",
          widthType: ""
        };
      }
    },
  },
  methods: {
    ...mapActions({
      getModelPart: 'modelParts/getModelPart',
      createPlanningChart: 'fabric/createPlanningChart',
      getMeasurementUnit: 'measurement/getMeasurementUnit',
      deleteFabricPlanningChart: 'fabric/deleteFabricPlanningChart',
      updatePlanningChart: 'fabric/updatePlanningChart',
      getPlanningChartTemplates: 'fabric/getPlanningChartTemplates',
      setPlanningChartTemplate: 'fabric/setPlanningChartTemplate',
      createPlanningChartTemplate: 'fabric/createPlanningChartTemplate',
    }),
    saveFabricTemlate(templateName){
      const data={
        fabricPlanningId:this.planningId,
        templateName
      }
      this.createPlanningChartTemplate(data)
    },
    getRow(val) {
      this.dialog_btn = 'Update'
      this.fabric_planning = {
        id: val.id,
        density: val.density,
        description: val.description,
        fabricPlanningId: val.fabricPlanningId,
        modelPartId: val.modelPartId,
        quantity: val.quantity,
        fabricPriceCurrency:val.fabricPriceCurrency,
        fabricPrice:val.fabricPrice,
        withFleece:val.withFleece,
        peachEffectEnabled:val.peachEffectEnabled,
        quantityUnitId: val.quantityUnitId,
        width: val.width,
        widthType: val.widthType
      }
      this.new_dialog = true;
      this.dialog_title = 'Edit';
    },
    openDialog() {
      this.dialog_title = 'Add';
      this.dialog_btn = 'Add'
      console.log(this.measurementUnit)
      this.new_dialog = true;
    },
    removeItem() {
      const fabricId = this.planningId;
      this.deleteFabricPlanningChart({itemId: this.selected_id, fabricId});
      this.delete_dialog = false;
    },
    getSelectedId(item) {
      this.selected_id = item.id;
      this.delete_dialog = true;
    },
    closeDialog() {
      this.delete_dialog = !this.delete_dialog;
    },
    async createChart() {
      const valid = this.$refs.new_validate.validate();
      if (valid && this.dialog_title === 'Add') {
        this.fabric_planning.fabricPlanningId = this.fabricPlanningId;
        await this.createPlanningChart({
          data: this.fabric_planning,
          id: this.planningId,
        });
        this.new_dialog = false;
        this.$refs.new_validate.reset();
      } else if (valid && this.dialog_title === 'Edit') {
        await this.updatePlanningChart({
          id: this.planningId,
          data: this.fabric_planning
        });
        this.new_dialog = false;
        this.$refs.new_validate.reset();
      }
    },
  },
  mounted() {
    const id =this.$route.params.id
    if(id!=="create"){
      this.planningId=id
    }
    this.getPlanningChartTemplates()
  }
}
</script>

<style lang="scss" scoped>

</style>
