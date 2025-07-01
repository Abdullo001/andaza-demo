<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="tableItems"
      hide-default-footer
      class="mb-4"
      show-select
      item-value="id"
      v-model="selectedItems"
    >
      <template v-slot:[`header.data-table-select`]="{ props, on }">
        <v-simple-checkbox
          :value="props.value || props.indeterminate"
          v-on="on"
          :indeterminate="props.indeterminate"
          color="#544B99"
        />
      </template>
      <template v-slot:item.data-table-select="{ isSelected, select }">
        <v-simple-checkbox
          :value="isSelected"
          color="#544B99"
          @input="select($event)"
        />
      </template>
      <template #top>
        <v-card flat>
          <v-card-title>{{ tableTitle }}</v-card-title>
        </v-card>
      </template>
      <template #item.actions="{ item }">
        <v-tooltip top color="#544B99" class="pointer">
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
              @click="editItem(item)"
            >
              <v-img src="/warehouse-filled.svg" max-width="21" />
            </v-btn>
          </template>
          <span class="text-capitalize">Send warehouse</span>
        </v-tooltip>
      </template>
      <template #item.workshop="{item}">
        {{ item.workshop==='OWN_WORKSHOP'? $t('planningProduction.workShopType.own') : item.workshop}}
      </template>
    </v-data-table>

    <div class="d-flex justify-end">
      <v-btn
        color="#544B99"
        class="ma-2"
        :dark="selectedItems.length !== 0"
        :outlined="selectedItems.length === 0"
        @click="openKittingFunc"
        :disabled="selectedItems.length === 0"
      >
        Kitting
      </v-btn>
    </div>
    <v-dialog v-model="kitting_dialog" width="600">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Kitting</div>
          <v-btn icon color="#544B99" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="kitting_form" v-model="edit_validate" lazy-validation>
            <v-row>
              <v-col cols="12" >
                <div class="label">Main color</div>
                <v-select
                  :items="mainColors"
                  item-text="process"
                  item-value="process"
                  v-model.trim="mainColor"
                  append-icon="mdi-chevron-down"
                  outlined
                  dense
                  height="44"
                  class="rounded-lg base"
                  color="#544B99"
                  placeholder="Select main color"
                  :rules="[formRules.required]"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#544B99"
            width="130"
            @click="closeDialog"
          >
          {{ $t(`cancel`) }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="kittingFunc"
          >
          {{ $t(`save`) }}
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
    <v-dialog v-model="waste_dialog" width="600">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Transfer to waste warehouse</div>
          <v-btn icon color="#544B99" @click="closeWasteDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="waste_form" v-model="edit_validate" lazy-validation>
            <v-row>
              <v-col cols="12">
                <div class="label">Weight</div>
                <v-text-field
                  v-model="selectedItem.weight"
                  placeholder="Enter weight"
                  outlined
                  height="44"
                  class="rounded-lg base"
                  validate-on-blur
                  dense
                  color="#544B99"
                  :rules="[formRules.required, formRules.onlyNumber]"
                  suffix="kg"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">Waste name</div>
                <v-text-field
                  v-model="selectedItem.wasteName"
                  placeholder="Enter waste name"
                  outlined
                  height="44"
                  class="rounded-lg base"
                  validate-on-blur
                  dense
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#544B99"
            width="130"
            @click="closeWasteDialog"
          >
          {{ $t(`cancel`) }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="wasteFunc"
          >
          {{ $t(`save`) }}
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props:{
    tableTitle: {
      type: String,
      default: 'Table Title'
    },
    items: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Workshop', value: 'workshop' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      kitting_dialog: false,
      edit_validate: false,
      tableItems:[],
      selectedItems: [],
      waste_dialog: false,
      selectedItem: {},
      mainColors: [],
      mainColor: "",
    };
  },
  computed: {
    ...mapGetters({
      planningProcessId: "cuttingProcess/planningProcessId",
    }),
  },
  watch: {
    items: {
      immediate: true,
      handler(list) {
        this.headers = [
          { text: this.$t("bodyPart"), align: "start", sortable: false, value: "modelPartName" },
          { text: this.$t('planningProduction.planning.color'), align: "start", sortable: false, value: "color" },
        ];

        list[0]?.sizeDistributionList.forEach((item) => {
          this.headers.push({
            text: item.size,
            sortable: false,
            align: "start",
            value: item.size,
          });
        });

        this.headers.push(
          { text: this.$t('total'), align: "start", sortable: false, value: "total" },
          {
            text: this.$t('planningProduction.planning.workshop'),
            align: "start",
            sortable: false,
            value: "workshop",
          },
          { text: this.$t('planningProduction.planning.actions'), align: "end", sortable: false, value: "actions" }
        );

        const specialList = list.map(function (el) {
          const value = {};
          const sizesList = [];
          el?.sizeDistributionList.forEach((item) => {
            value[item.size] = item.quantity;
            sizesList.push({ size: item.size, quantity: null });
          });

          return {
            ...value,
            ...el,
            sizeDistributions: [...sizesList],
            id: el.entityId
          };
        });
        this.tableItems = JSON.parse(JSON.stringify(specialList));
      }
    },
    async waste_dialog(val){
      if(!val){
        await this.$refs.waste_form.reset()
      }
    },
    async kitting_dialog(val){
      if(!val){
        await this.$refs.kitting_form.reset()
      }
    },
  },
  methods: {
    ...mapActions({
      sendToWasteWarehouse: "passingToNextProcess/sendToWasteWarehouse",
      giveCitting: "passingToNextProcess/giveCitting",
    }),
    editItem(item) {
      this.waste_dialog = true;
      this.selectedItem = item;
    },
    openKittingFunc() {
      const arr = this.selectedItems.map(item => item.color);
      this.mainColors = [...new Set(arr)];
      this.kitting_dialog = true;
    },
    closeDialog() {
      this.kitting_dialog = false;
    },
    closeWasteDialog() {
      this.waste_dialog = false;
    },
    async kittingFunc() {
      const payload = {
        planningProcessId: this.planningProcessId,
        color: this.mainColor,
        entityIds: this.selectedItems.map(item => item.id),
        isSecond: this.selectedItems[0].isSecond,
      }
      await this.giveCitting({ payload, planningProcessId: this.planningProcessId })
      .then((_res)=>{
        this.selectedItems = []
      })
      this.kitting_dialog = false;
    },
    async wasteFunc() {
      const payload = {
        wasteName: this.selectedItem.wasteName,
        weight: this.selectedItem.weight,
        entityId: this.selectedItem.id
      }
      await this.sendToWasteWarehouse({payload, planningProcessId: this.planningProcessId})
      this.waste_dialog = false;
    }
  }

}
</script>
<style lang="">

</style>
