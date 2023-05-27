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
              @click="openDialog"
              :disabled="!(modelId !== '')"
            >
              <v-icon class="mr-2">mdi-plus</v-icon>
              add row
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
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
    <v-dialog
      v-model="new_dialog"
      max-width="800"
      transition="slide-x-transition"
    >
      <v-card>
        <v-card-title class="d-flex">
          <div class="title">
            {{ dialog_title }} row
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
                <div class="label">Part name</div>
                <v-select
                  :items="modelPartsList"
                  item-text="bodyPart"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  placeholder="Select part name"
                  class="rounded-lg base"
                  dense
                  validate-on-blur
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  v-model="fabric_planning.modelPartId"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <div class="label">Quantity</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base" dense
                  placeholder="Enter quantity"
                  validate-on-blur
                  color="#7631FF"
                  v-model="fabric_planning.quantity"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <div class="label">VAR.1</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  placeholder="Enter VAR.1"
                  class="rounded-lg base" dense
                  validate-on-blur
                  color="#7631FF"
                  v-model="fabric_planning.var1"
                />
              </v-col>
              <v-col lg="6">
                <div class="label">VAR.2</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  placeholder="Enter VAR.2"
                  class="rounded-lg base" dense
                  validate-on-blur
                  color="#7631FF"
                  v-model="fabric_planning.var2"
                />
              </v-col>
              <v-col lg="6">
                <div class="label">Width type</div>
                <v-select
                  :items="withTypeEnum"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base" dense
                  validate-on-blur
                  placeholder="Select width type"
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  v-model="fabric_planning.widthType"
                />
              </v-col>
              <v-col lg="6">
                <div class="label">Measurement unit</div>
                <v-select
                  :items="measurementUnit"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base" dense
                  validate-on-blur
                  placeholder="Select measurement unit"
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  v-model="fabric_planning.quantityUnitId"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <div class="label">Width(cm)</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base" dense
                  validate-on-blur
                  placeholder="Enter width(cm)"
                  color="#7631FF"
                  v-model="fabric_planning.width"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col lg="6">
                <div class="label">Comment</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base" dense
                  validate-on-blur
                  placeholder="Enter comment"
                  color="#7631FF"
                  v-model="fabric_planning.description"
                />
              </v-col>
              <v-col cols="12" lg="6" class="d-flex align-center">
                <div class="body-1 font-weight-medium">Fleece</div>
                <v-spacer/>
                <v-switch
                  inset color="#4F46E5"
                />
              </v-col>
              <v-col cols="12" lg="6" class="d-flex align-center">
                <div class="body-1 font-weight-medium">Peach effect</div>
                <v-spacer/>
                <v-switch
                  inset color="#4F46E5"
                />
              </v-col>
              <v-col lg="6">
                <div class="label">Density kg/m2</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base" dense
                  validate-on-blur
                  color="#7631FF"
                  placeholder="Enter density kg/m2"
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
            {{ dialog_btn }}
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

export default {
  name: 'PrintingChartComponent',
  components: {DeleteDialog},
  data() {
    return {
      delete_dialog: false,
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
      withTypeEnum: ['TUP2', 'A/E'],
      selected_id: '',
      dialog_title: '',
      dialog_btn: ''
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
    new_dialog(val) {
      if (!val) {
        this.fabric_planning = {
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
      updatePlanningChart: 'fabric/updatePlanningChart'
    }),
    getRow(val) {
      this.dialog_btn = 'Update'
      this.fabric_planning = {
        id: val.id,
        density: val.density,
        description: val.description,
        fabricPlanningId: val.fabricPlanningId,
        modelPartId: val.modelPartId,
        quantity: val.quantity,
        quantityUnitId: val.quantityUnitId,
        var1: val.var1,
        var2: val.var2,
        width: val.width,
        widthType: val.widthType
      }
      this.new_dialog = true;
      this.dialog_title = 'Edit';
    },
    openDialog() {
      this.dialog_title = 'Add';
      this.dialog_btn = 'Add'
      this.new_dialog = true;
    },
    removeItem() {
      const fabricId = this.$route.params.id;
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
          id: this.$route.params.id
        });
        this.new_dialog = false;
        this.$refs.new_validate.reset();
      } else if (valid && this.dialog_title === 'Edit') {
        await this.updatePlanningChart({
          id: this.$route.params.id,
          data: this.fabric_planning
        });
        this.new_dialog = false;
        this.$refs.new_validate.reset();
      }
    },
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>

</style>
