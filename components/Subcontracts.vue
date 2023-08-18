<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="subcontractsList"
      :items-per-page="50"
      item-key="id"
      show-select
      :single-select="singleSelect"
      show-expand
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="elevation-0"
      hide-default-footer
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex align-center">
            <span class="mr-8">Subcontractor</span>
            <v-spacer/>
            <v-btn
              class="rounded-lg text-capitalize"
              color="#7631FF"
              width="160"
              height="36"
              dark
              :disabled="btn_disabled"
              @click="newSubcontract"
            >
              <v-icon>mdi-plus</v-icon>
              Subcontract
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #[`header.data-table-select`]="{ props, on }">
        <v-simple-checkbox
          :value="props.value || props.indeterminate"
          v-on="on"
          :indeterminate="props.indeterminate"
          color="#7631FF"
        />
      </template>
      <template #item.data-table-select="{isSelected, select}">
        <v-simple-checkbox
          color="#7631FF"
          v-ripple
          :value="isSelected"
          @input="select($event)"
        />
      </template>
      <template #item.actions="{ item }">
        <div>
          <v-btn icon @click="returnDialog(item)">
            <v-img src="/rotate.svg" max-width="20"/>
          </v-btn>
          <v-btn icon @click="getClassification(item)">
            <v-img src="/t-shirt.svg" max-width="20"/>
          </v-btn>
          <v-btn icon @click="getHistory(item)">
            <v-img src="/history.svg" max-width="20"/>
          </v-btn>
          <v-btn icon class="mr-2" @click="editParts(item)">
            <v-img src="/edit-green.svg" max-width="20"/>
          </v-btn>
          <v-btn icon @click="deleteSubcontractOne(item)">
            <v-img src="/trash-red.svg" max-width="20"/>
          </v-btn>
        </div>
      </template>
      <template #expanded-item="{headers, item}">
        <td :colspan="headers.length">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col>
                  <div class="body-1 mb-3">
                    Used fabric:
                    <span class="font-weight-bold ml-2"> 900 kg</span>
                  </div>
                  <div class="body-1 mb-3">
                    sent date:
                    <span class="font-weight-bold ml-2">05.03.2023</span>
                  </div>
                </v-col>
                <v-col>
                  <div class="body-1 mb-3">
                    Total price:
                    <span class="font-weight-bold ml-2"> 900 kg</span>
                  </div>
                  <div class="body-1 mb-3">
                    Deadline:
                    <span class="font-weight-bold ml-2">05.03.2023</span>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="new_dialog" max-width="572">
      <v-card>
        <v-card-title class="w-full text-h6 d-flex justify-space-between text-capitalize">
          <div>Create Subcontracts</div>
          <v-btn @click="new_dialog = !new_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row class="mb-4">
              <v-col cols="6">
                <div class="label">Cooperation type</div>
                <v-select
                  v-model="newSubcontractDetail.cooperationTypeId"
                  placeholder="select cooperation Type"
                  :items="cooperation_type"
                  item-text="name"
                  item-value="id"
                  append-icon="mdi-chevron-down"
                  rounded
                  single-line
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base mb-4"
                  validate-on-blur
                  dense
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
                <div class="label">Quantity</div>
                <v-text-field
                  v-model="newSubcontractDetail.quantity"
                  placeholder="Enter quantity"
                  single-line
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  validate-on-blur
                  dense
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>

              <v-col cols="6">
                <div class="label">Partner name</div>
                <v-select
                  v-model="newSubcontractDetail.partnerId"
                  placeholder="select Partner"
                  :items="partnerList"
                  item-text="name"
                  item-value="id"
                  append-icon="mdi-chevron-down"
                  rounded
                  single-line
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base mb-4"
                  validate-on-blur
                  dense
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
                <div class="label">Measurement unit</div>
                <v-select
                  v-model="newSubcontractDetail.measurementUnitId"
                  placeholder="select unit"
                  :items="measurementUnitList"
                  item-text="name"
                  item-value="id"
                  append-icon="mdi-chevron-down"
                  rounded
                  single-line
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  validate-on-blur
                  dense
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>

              <v-col cols="12">
                <div class="label">Description</div>
                <v-textarea
                  v-model="newSubcontractDetail.description"
                  placeholder="Enter description"
                  single-line
                  outlined
                  hide-details
                  class="rounded-lg base"
                  validate-on-blur
                  dense
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>
            </v-row>

            <v-card-actions class="d-flex justify-center pb-6">
              <v-btn
                outlined
                class="text-capitalize rounded-lg font-weight-bold mr-6"
                color="#7631FF"
                width="163"
                @click="new_dialog = !new_dialog"
              >cancel
              </v-btn>
              <v-btn
                class="text-capitalize rounded-lg font-weight-bold"
                color="#7631FF"
                dark
                width="163"
                @click="setNewSubcontracts"
              >save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="edit_dialog" max-width="572">
      <v-card>
        <v-card-title class="w-full d-flex text-capitalize text-h6 justify-space-between">
          <div>Edit Subcontract</div>
          <v-btn @click="edit_dialog = !edit_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="edit_form">
            <v-row class="mb-4">
              <v-col cols="6">
                <div class="label">Cooperation type</div>
                <v-select
                  v-model="subcontractsDetail.cooperationTypeId"
                  placeholder="select cooperation Type"
                  :items="cooperation_type"
                  item-text="name"
                  item-value="id"
                  append-icon="mdi-chevron-down"
                  rounded
                  single-line
                  height="44"
                  outlined
                  hide-details
                  validate-on-blur
                  dense
                  class="rounded-lg base mb-4"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
                <div class="label">Quantity</div>
                <v-text-field
                  v-model="subcontractsDetail.quantity"
                  placeholder="Enter quantity"
                  single-line
                  height="44"
                  outlined
                  hide-details
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>

              <v-col cols="6">
                <div class="label">Partner name</div>
                <v-select
                  v-model="subcontractsDetail.partnerId"
                  placeholder="select Partner"
                  :items="partnerList"
                  item-text="name"
                  item-value="id"
                  append-icon="mdi-chevron-down"
                  rounded
                  single-line
                  outlined
                  hide-details
                  height="44"
                  validate-on-blur
                  dense
                  class="rounded-lg base mb-4"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
                <div class="label">Measurement unit</div>
                <v-select
                  v-model="subcontractsDetail.measurementUnitId"
                  placeholder="select unit"
                  :items="measurementUnitList"
                  item-text="name"
                  item-value="id"
                  append-icon="mdi-chevron-down"
                  rounded
                  single-line
                  height="44"
                  outlined
                  hide-details
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>

              <v-col cols="12">
                <div class="label">Description</div>
                <v-textarea
                  v-model="subcontractsDetail.description"
                  placeholder="Enter description"
                  single-line
                  outlined
                  hide-details
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>
            </v-row>

            <v-card-actions class="d-flex justify-center pb-6">
              <v-btn
                outlined
                class="text-capitalize rounded-lg font-weight-bold mr-6"
                color="#7631FF"
                width="163"
                @click="edit_dialog = !edit_dialog"
              >cancel
              </v-btn>
              <v-btn
                class="text-capitalize rounded-lg font-weight-bold"
                color="#7631FF"
                dark
                width="163"
                @click="updateSubcontractsView"
              >{{ $t('update') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center"
        >Delete subcontract row
        </v-card-title
        >
        <v-card-text>
          Are you sure you want to Delete subcontract row?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            cancel
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteSubcontract"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Subcontracts",
  data() {
    return {
      selected: [],
      singleSelect: false,
      expanded: [],
      singleExpand: true,
      btn_disabled: true,
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      new_validate: true,
      modelSearch: "",
      modelNumber: "",
      headers: [
        {
          text: "Cooperation type",
          sortable: false,
          value: "cooperationType",
          width: "180",
        },
        {
          text: "Partner Name",
          sortable: false,
          value: "partnerName",
          width: "210",
        },
        {text: "Quantity", sortable: false, value: "quantity"},
        {
          text: "Meansurement Unit",
          sortable: false,
          value: "measurementUnit",
          width: "180",
        },
        {
          text: "Comment",
          sortable: false,
          value: "description",
          width: "220",
        },
        {text: "Date", sortable: false, value: "dispatchedDate"},
        {text: "Action", sortable: false, align: "end", value: "actions"},
        {text: '', value: 'data-table-expand'},
      ],
      subcontractsList: [],
      subcontractsDetail: {},
      selectedSubcontract: {},
      newSubcontractDetail: {
        cooperationTypeId: null,
        partnerId: null,
        quantity: null,
        measurementUnitId: null,
        comment: "",
        dispatchedDate: "",
      },
      planning_model_id: "",
      model_data: []
    };
  },
  async created() {
    await this.getCooperationTypes();
    await this.getPartnerList();
    await this.getMeasurementUnit();
    await this.getModelList();
  },
  computed: {
    ...mapGetters({
      cooperation_type: "subcontracts/cooperation_type",
      partnerList: "subcontracts/partnerList",
      measurementUnitList: "subcontracts/measurementUnitList",
      setSubcontractsList: "subcontracts/subcontractsList",
      modelData: "subcontracts/modelList",
      modelInfo: "production/planning/modelInfo",
    }),
  },
  watch: {
    overlay(val) {
      val &&
      setTimeout(() => {
        this.overlay = false;
      }, 2000);
    },
    edit_dialog(val) {
      if (!val) this.$refs.edit_form.reset();
    },
    new_dialog(val) {
      if (!val) this.$refs.new_form.reset();
    },
    setSubcontractsList(subcontracts) {
      this.subcontractsList = JSON.parse(JSON.stringify(subcontracts));
    },
    modelInfo(val) {
      this.planning_model_id = val.modelId
      this.btn_disabled = false;
    },
    modelData(val) {
      this.model_data = JSON.parse(JSON.stringify(val));
    },
  },

  methods: {
    ...mapActions({
      getSubcontractsList: "subcontracts/getSubcontractsList",
      getCooperationTypes: "subcontracts/getCooperationTypes",
      getPartnerList: "subcontracts/getPartnerList",
      getMeasurementUnit: "subcontracts/getMeasurementUnit",
      createSubcontracts: "subcontracts/createSubcontracts",
      getModelList: "subcontracts/getModelList",
      updateSubcontracts: "subcontracts/updateSubcontracts",
      deleteSubcontractServer: "subcontracts/deleteSubcontractServer",
      getModelInfo: 'production/planning/getModelInfo',
    }),
    returnDialog(item) {
      this.return_dialog = true;
      this.returned_fabric = {...item};
    },
    getHistory(item) {
      this.history_dialog = true;
    },
    getClassification(item) {
      this.classification_dialog = true;
    },

    editParts(item) {
      this.edit_dialog = !this.edit_dialog;
      this.subcontractsDetail = {...item};
    },
    getTime() {
      const today = new Date();
      let day = "";
      let month = "";
      let date = "";
      today.getDate().toString().length === 1
        ? (day = `0${today.getDate()}`)
        : (day = `${today.getDate()}`);
      today.getMonth().toString().length === 1
        ? (month = `0${today.getMonth()}`)
        : (month = `${today.getMonth()}`);
      date = day + "." + month + "." + today.getFullYear();
      let time = "";
      let hour = "";
      let minut = "";
      let second = "";
      today.getHours().toString().length === 1
        ? (hour = `0${today.getHours()}`)
        : (hour = `${today.getHours()}`);
      today.getMinutes().toString().length === 1
        ? (minut = `0${today.getMinutes()}`)
        : (minut = `${today.getMinutes()}`);
      today.getSeconds().toString().length === 1
        ? (second = `0${today.getSeconds()}`)
        : (second = `${today.getSeconds()}`);
      time = hour + ":" + minut + ":" + second;
      return date + " " + time;
    },
    async changeCombobox(item) {
      const items = item.modelNumber === null ? '' : item.modelNumber
      await this.getSubcontractsList({modelNumber: items, modelId: this.planning_model_id})
    },
    async updateSubcontractsView() {
      this.edit_dialog = !this.edit_dialog;
      await this.updateSubcontracts({...this.subcontractsDetail, modelId: this.planning_model_id});
    },
    newSubcontract() {
      this.new_dialog = !this.new_dialog;
    },
    async setNewSubcontracts() {
      this.newSubcontractDetail.dispatchedDate = this.getTime();
      await this.createSubcontracts({...this.newSubcontractDetail, modelId: this.planning_model_id});
      this.new_dialog = !this.new_dialog;
    },
    async searchSubcontracts(item) {
      await this.getSubcontractsList({modelNumber: item.target._value, modelId: this.planning_model_id});
    },
    deleteSubcontractOne(item) {
      this.selectedSubcontract = item;
      this.delete_dialog = true;
    },
    async deleteSubcontract() {
      await this.deleteSubcontractServer({
        id: this.selectedSubcontract.id,
        modelId: this.planning_model_id,
      });
      this.delete_dialog = false;
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id !== "create") {
      await this.getModelInfo(id);
      await this.getSubcontractsList({modelNumber: "", modelId: this.planning_model_id});
    }
  },
};
</script>
<style lang="scss" scoped>
.search-field {
  width: 250px !important;
}

.color-white {
  color: #000000;
}

.v-select > .v-input__control > .v-input__slot {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
