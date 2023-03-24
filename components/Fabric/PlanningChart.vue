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
            <div class="text-h6">Fabric planning chart</div>
            <v-btn
              class="rounded-lg white--text text-capitalize"
              color="#7631FF"
              width="150" height="36"
              @click="new_dialog = true"
              :disabled="!(modelId !== '')"
            >
              <v-icon class="mr-2">mdi-plus</v-icon>
              add row
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.actions="{item}">
         <v-btn icon class="mr-3">
           <v-img src="/edit-green.svg" max-width="22"/>
         </v-btn>
        <v-btn icon>
          <v-img src="/delete.svg" max-width="27"/>
        </v-btn>

      </template>
    </v-data-table>
    <v-dialog
      v-model="new_dialog"
      max-width="800"
      transition="slide-x-transition"
    >
      <v-card>
        <v-card-title class="d-flex">
          <div class="title">
            Add row
          </div>
          <v-spacer/>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form lazy-validation ref="new_validate">
            <v-row>
              <v-col lg="6">
                <v-select
                  :items="modelPartsList"
                  item-text="bodyPart"
                  item-value="id"
                  label="Part name"
                  filled dense
                  validate-on-blur
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  v-model="fabric_planning.modelPartId"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <v-text-field
                  label="Quantity"
                  filled dense
                  validate-on-blur
                  color="#7631FF"
                  v-model="fabric_planning.quantity"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <v-text-field
                  label="VAR.1"
                  filled dense
                  validate-on-blur
                  color="#7631FF"
                  v-model="fabric_planning.var1"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <v-text-field
                  label="VAR.2"
                  filled dense
                  validate-on-blur
                  color="#7631FF"
                  v-model="fabric_planning.var2"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <v-select
                  :items="withTypeEnum"
                  label="Width type"
                  filled dense
                  validate-on-blur
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  v-model="fabric_planning.widthType"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <v-select
                  :items="measurementUnit"
                  item-text="name"
                  item-value="id"
                  label="Measurement unit"
                  filled dense
                  validate-on-blur
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  v-model="fabric_planning.quantityUnitId"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <v-text-field
                  label="Width(cm)"
                  filled dense
                  validate-on-blur
                  color="#7631FF"
                  v-model="fabric_planning.width"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <v-text-field
                  label="Comment"
                  filled dense
                  validate-on-blur
                  color="#7631FF"
                  v-model="fabric_planning.description"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <v-text-field
                  label="Density kg/m2"
                  filled dense
                  validate-on-blur
                  color="#7631FF"
                  v-model="fabric_planning.density"
                  :rules="[formRules.required]"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center pb-6">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            style="border: 2px solid #7631FF"
            width="163" height="44"
            color="#7631FF"
            @click="new_dialog=false"
          >
            Cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-8"
            width="163" height="44"
            color="#7631FF" dark
            @click="createChart"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'PrintingChartComponent',
  data() {
    return {
      chartHeaders: [
        {text: 'Part', align: 'start', sortable: false, value: 'bodyPartName'},
        {text: 'Fabric specification', value: 'fabricSpecification'},
        {text: 'VAR.1', value: 'var1'},
        {text: 'VAR.2', value: 'var2'},
        {text: 'Quantity', value: 'quantity'},
        {text: 'M/U', value: 'quantityUnit'},
        {text: 'Width type', value: 'widthType'},
        {text: 'Width(cm)', value: 'width'},
        {text: 'Density kg/m2', value: 'density'},
        {text: 'Comment', value: 'description'},
        {text: 'Actions', value: 'actions', align: 'center'},
      ],
      planningCharts: [],
      new_dialog: false,
      fabric_planning: {
        density: "",
        description: "",
        fabricPlanningId: null,
        modelPartId: null,
        quantity: "",
        quantityUnitId: null,
        var1: "",
        var2: "",
        width: "",
        widthType: ""
      },
      withTypeEnum: ['TUP2', 'A/E']
    }
  },
  created() {
    this.getMeasurementUnit({page: 0, size: 20});
  },
  computed: {
    ...mapGetters({
      modelPartsList: 'modelParts/modelPartsList',
      modelId: 'fabric/modelId',
      measurementUnit: 'measurement/measurementUnit',
      fabricPlanningId: 'fabric/fabricPlanningId',
      planningChartList: 'fabric/planningChartList',
    })
  },
  watch: {
    modelId(val) {
      this.getModelPart(val);
    },
  },
  methods: {
    ...mapActions({
      getModelPart: 'modelParts/getModelPart',
      createPlanningChart: 'fabric/createPlanningChart',
      getMeasurementUnit: 'measurement/getMeasurementUnit',

    }),

    async createChart() {
      const valid = this.$refs.new_validate.validate();
      if(valid) {
        this.fabric_planning.fabricPlanningId = this.fabricPlanningId;
        await this.createPlanningChart(this.fabric_planning);
        this.new_dialog = false;
        this.$refs.new_validate.reset();
      }
    },
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>

</style>
