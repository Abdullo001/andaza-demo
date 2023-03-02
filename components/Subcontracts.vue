<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="subcontractsList"
      :items-per-page="50"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="elevation-0"
      hide-default-footer
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex">
            <span class="mr-8">Model Number</span>
            <div class="search-field">
              <v-text-field
                placeholder="Enter responsipble person"
                single-line
                outlined
                validate-on-blur
                append-inner-icon="mdi-plus"
                dense
                class="rounded-lg"
                color="#7631FF"
                background-color="#F8F4FE"
              >
                <template #append>
                  <v-icon> mdi-magnify </v-icon>
                </template>
              </v-text-field>
            </div>

            <v-spacer />

            <v-btn
              class="rounded-lg text-capitalize"
              color="#7631FF"
              width="160"
              height="36"
              dark
              @click="newSubcontract"
            >
              <v-icon>mdi-plus</v-icon>
              Row
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.actions="{ item }">
        <div>
          <v-btn icon class="mr-2" @click="editParts(item)">
            <v-img src="/edit-green.svg" max-width="20" />
          </v-btn>
          <v-btn icon>
            <v-img src="/trash-red.svg" max-width="20" />
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="new_dialog" max-width="572">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>New subcontracts</div>
          <v-btn @click="new_dialog = !new_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row class="mb-4">
              <v-col cols="6">
                <div class="mb-2 text-body-1">Cooperation type</div>
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
                  validate-on-blur
                  dense
                  class="rounded-lg"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
                <div class="mb-2 text-body-1">Quantity</div>
                <v-text-field
                  v-model="newSubcontractDetail.quantity"
                  placeholder="Enter quantity"
                  single-line
                  outlined
                  validate-on-blur
                  dense
                  class="rounded-lg"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>

              <v-col cols="6">
                <div class="mb-2 text-body-1">Partner name</div>
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
                  validate-on-blur
                  dense
                  class="rounded-lg"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
                <div class="mb-2 text-body-1">Measurement unit</div>
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
                  validate-on-blur
                  dense
                  class="rounded-lg"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>

              <v-col cols="12">
                <div class="mb-2 text-body-1">Description</div>
                <v-textarea
                  v-model="newSubcontractDetail.comment"
                  placeholder="Enter description"
                  single-line
                  outlined
                  validate-on-blur
                  dense
                  class="rounded-lg"
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
        <v-card-title class="w-full d-flex justify-space-between">
          <div>Edit Cutting</div>
          <v-btn @click="edit_dialog = !edit_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row class="mb-4">
              <v-col cols="6">
                <div class="mb-2 text-body-1">Cooperation type</div>
                <v-select
                  v-model="subcontractsDetail.cooperationTypeId"
                  placeholder="select cooperation Type"
                  :items="cooperation_type"
                  item-text="name"
                  item-id="id"
                  append-icon="mdi-chevron-down"
                  rounded
                  single-line
                  outlined
                  validate-on-blur
                  dense
                  class="rounded-lg"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
                <div class="mb-2 text-body-1">Quantity</div>
                <v-text-field
                  v-model="subcontractsDetail.quantity"
                  placeholder="Enter quantity"
                  single-line
                  outlined
                  validate-on-blur
                  dense
                  class="rounded-lg"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>

              <v-col cols="6">
                <div class="mb-2 text-body-1">Partner name</div>
                <v-select
                  v-model="subcontractsDetail.partnerId"
                  placeholder="select Partner"
                  :items="partnerList"
                  item-text="name"
                  item-id="id"
                  append-icon="mdi-chevron-down"
                  rounded
                  single-line
                  outlined
                  validate-on-blur
                  dense
                  class="rounded-lg"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
                <div class="mb-2 text-body-1">Measurement unit</div>
                <v-select
                  v-model="subcontractsDetail.measurementUnitId"
                  placeholder="select unit"
                  :items="measurementUnitList"
                  item-text="name"
                  item-id="id"
                  append-icon="mdi-chevron-down"
                  rounded
                  single-line
                  outlined
                  validate-on-blur
                  dense
                  class="rounded-lg"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>

              <v-col cols="12">
                <div class="mb-2 text-body-1">Description</div>
                <v-textarea
                  v-model="subcontractsDetail.comment"
                  placeholder="Enter description"
                  single-line
                  outlined
                  validate-on-blur
                  dense
                  class="rounded-lg"
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
                @click="updateSubcontracts"
                >save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Subcontracts",
  data() {
    return {
      edit_dialog: false,
      new_dialog: false,
      new_validate: true,
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
        { text: "Quantity", sortable: false, value: "quantity" },
        {
          text: "Meansurement Unit",
          sortable: false,
          value: "measurementUnit",
          width: "180",
        },
        { text: "Comment", sortable: false, value: "comment", width: "220" },
        { text: "Date", sortable: false, value: "date" },
        { text: "Action", sortable: false, align: "center", value: "actions" },
      ],

      subcontractsList: [
        {
          id: 1,
          cooperationType: "Cutting",
          partnerName: "Artatex LLC",
          quantity: 800,
          measurementUnit: "PSC",
          comment: "",
          date: "12.10.2022",
        },
      ],

      subcontractsDetail: {
        id: null,
        cooperationId:null ,
        partnerId: null,
        quantity: null,
        measurementUnitId: null,
        comment: "",
      },

      newSubcontractDetail: {
        cooperationTypeId: null,
        partnerId: null,
        quantity: 100,
        measurementUnitId: null,
        comment: "",
        dispatchedDate:'2023-02-03 12:41:34',
        modelId:1,
      },
    };
  },

  created() {
    this.getCooperationTypes();
    this.getPartnerList();
    this.getMeasurementUnit();
  },

  computed: {
    ...mapGetters({
      cooperation_type: "subcontracts/cooperation_type",
      partnerList: "subcontracts/partnerList",
      measurementUnitList: "subcontracts/measurementUnitList",
      modelId: "orders/modelId"
    }),
  },

  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 2000);
    },
  },

  methods: {
    ...mapActions({
      getSubcontractsList: "subcontracts/getSubcontractsList",
      getCooperationTypes: "subcontracts/getCooperationTypes",
      getPartnerList: "subcontracts/getPartnerList",
      getMeasurementUnit: "subcontracts/getMeasurementUnit",
      createSubcontracts: "subcontracts/createSubcontracts",
    }),

    editParts(item) {
      this.edit_dialog = !this.edit_dialog;
    },

    // getTime(){
    //   const today=new Date();
    //   const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    //   const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //   this.newSubcontractDetail.dispatchedDate=date+" "+time;
    // },

    updateSubcontracts() {},

    newSubcontract() {
      this.new_dialog = !this.new_dialog;
     
    },

    

    async setNewSubcontracts() {
      await this.createSubcontracts(this.newSubcontractDetail)
      console.log(this.newSubcontractDetail);
      this.new_dialog = !this.new_dialog;
    },
  },

  mounted() {
    this.getSubcontractsList();
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
