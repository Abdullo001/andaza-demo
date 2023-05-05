<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-form>
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start" align="center">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.phoneNumber"
              label="Phone number"
              placeholder="Enter Phone number"
              outlined
              class="rounded-lg"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.partnerName"
              label="Partner name"
              placeholder="Enter Partner number"
              outlined
              class="rounded-lg"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <v-select
              v-model="filters.partnerType"
              append-icon="mdi-chevron-down"
              outlined
              hide-details
              dense
              label="Partner type"
              class="rounded-lg"
            />
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <v-select
              :items="statusEnums"
              v-model="filters.status"
              append-icon="mdi-chevron-down"
              outlined
              hide-details
              dense
              label="Status"
              class="rounded-lg"
            />
          </v-col>
          <v-spacer/>
          <v-col cols="12" lg="2" md="2">
            <div class="d-flex justify-end">
              <v-btn
                width="140" outlined
                color="#397CFD" elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                Reset
              </v-btn>
              <v-btn
                width="140" color="#397CFD" dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                Search
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items-per-page="10"
      :items="partner_list"
      :server-items-length="totalElements"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100]
      }"
      class="mt-4 rounded-lg"
      @update:page="page"
      @update:items-per-page="size"
    >
      <template #top>
        <v-toolbar elevation="0" rounded>
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">Partners</div>
            <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark @click="new_dialog = true">
              <v-icon>mdi-plus</v-icon>
              Partners
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>
      <template #item.status="{item}">
        <div>
          <v-select
            @change="statusChange(item)"
            v-model="item.status"
            :items="statusEnums"
            dark
            append-icon="mdi-chevron-down"
            dense
            rounded
            class="text-caption mt-n2"
            flat
            hide-details
            :background-color="statusColor.color(item.status)"
          />
        </div>
      </template>
      <template #item.actions="{item}">
        <div>
          <v-btn icon color="green" @click.stop="editItem(item)">
            <v-img src="edit-active.svg" max-width="22"/>
          </v-btn>
          <v-btn icon color="red" @click.stop="getDeleteItem(item)">
            <v-img src="delete.svg" max-width="27"/>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Add Partner</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  filled
                  label="Partner name"
                  placeholder="Enter partner name"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  filled
                  append-icon="mdi-chevron-down"
                  label="Partner type"
                  placeholder="Select Partner type"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  filled
                  v-mask="'(##) ### ## ##'"
                  placeholder="(--) --- -- --"
                  prefix="+998"
                  v-model.trim="create_partner.phoneNumber"
                  label="Phone number"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  filled
                  v-model="create_partner.email"
                  label="Email"
                  :rules="[formRules.email]"
                  placeholder="Enter email"
                  color="#7631FF"
                />
              </v-col>
            </v-row>

            <v-textarea
              filled
              label="Description"
              placeholder="Enter package shape description"
              color="#7631FF"
            />
            <v-select
              filled
              item-text="name"
              item-value="id"
              append-icon="mdi-chevron-down"
              label="Measurement unit ID"
              placeholder="Select Measurement unit ID"
              color="#7631FF"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#7631FF"
            width="163"
            @click="new_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="163"
            @click="save"
          >
            create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit partner</div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-text-field
              v-model="edit_package.name"
              filled
              label="Name"
              placeholder="Enter name package shape"
              dense
              color="#7631FF"
            />
            <v-textarea
              v-model="edit_package.description"
              filled
              label="Description"
              placeholder="Enter package shape description"
              dense
              color="#7631FF"
            />
            <v-select
              v-model="edit_package.measurement"
              filled
              disabled
              append-icon="mdi-chevron-down"
              label="Measurement unit ID"
              placeholder="Select Measurement unit ID"
              dense
              color="#7631FF"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#7631FF"
            width="163"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="163"
            @click="update"
          >
            create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete Package shape</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this package shape?
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
            @click="deletePackage"
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
  name: "PackageShapePage",
  data() {
    return {
      edit_dialog: false,
      delete_dialog: false,
      new_dialog: false,
      itemPrePage: 10,
      current_page: 0,
      headers: [
        {text: "Id", value: "id", sortable: false},
        {text: "Name", value: "name", sortable: false},
        {text: "Address", value: "address", sortable: false},
        {text: "Email", value: "email", sortable: false},
        {text: "Partner Type", value: "partnerType", sortable: false},
        {text: "Phone Number", value: "phoneNumber", sortable: false},
        {text: "Status", value: "status", sortable: false, width: 120},
        {text: "Created At", value: "createdAt", sortable: false},
        {text: "Updated At", value: "updatedAt", sortable: false},
        {text: "Actions", value: "actions", align: "center", sortable: false},
      ],
      create_partner: {
        name: "",
        measurementId: "",
        description: "",
        phoneNumber: "",
      },
      edit_package: {
        name: "",
        description: "",
        measurement: {
          id: "",
          name: "",
        },
      },
      delete_package: {},
      filters: {
        phoneNumber: "",
        partnerName: "",
        partnerType: "",
        status: "",
      },
    }
  },
  async created() {
    await this.getPartnerList({page: 0, size: 10});
  },
  computed: {
    ...mapGetters({
      loading: "partners/loading",
      partner_list: "partners/partner_list",
      totalElements: "partners/totalElements",
    })
  },
  methods: {
    ...mapActions({
      getPartnerList: "partners/getPartnerList",
      changeStatus: "partners/changeStatus",
      filterPartnerList: "partners/filterPartnerList",
    }),
    async statusChange(val){
      const item = {
        id: val.id,
        status: val.status
      };
      await this.changeStatus(item);
    },
    async size(val) {
      this.itemPrePage = val;
      await this.getPartnerList({page: 0, size: this.itemPrePage});
    },
    async page(val) {
      this.current_page = val - 1;
      await this.getPartnerList({page: this.current_page, size: this.itemPrePage});
    },
    async deletePackage() {
      this.delete_dialog = false;
    },
    async save() {
      this.new_dialog = false;
    },
    async update() {
      this.edit_dialog = false;
    },
    async getDeleteItem(item) {
      this.delete_dialog = true;
    },
    editItem(item) {
      this.edit_dialog = true;
    },
    async resetFilters() {
      this.filters = {
        id: "",
        name: "",
        updatedAt: "",
        createdAt: "",
      };
    },
    async filterData() {
      const items = {...this.filters};
    },
  },
}
</script>

<style lang="scss">
.el-input__inner::placeholder,
.el-input__icon, .el-icon-time {
  color: #919191 !important;
}
</style>
