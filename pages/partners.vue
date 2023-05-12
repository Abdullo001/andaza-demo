<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-form ref="filter_form">
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
              v-model="filters.name"
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
            <v-text-field
              v-model="filters.email"
              outlined
              hide-details
              dense
              label="Partner email"
              placeholder="Enter email"
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
                @click="resetFilters"
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
      :items="items_list"
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
          <v-form ref="new_form" lazy-validation v-model="validate">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  :rules="[ formRules.required ]"
                  v-model="create_partner.name"
                  filled
                  dense
                  label="Partner name"
                  placeholder="Enter partner name"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  :rules="[ formRules.required ]"
                  v-model="create_partner.typeId"
                  :items="partner_type"
                  item-text="name"
                  item-value="id"
                  filled
                  append-icon="mdi-chevron-down"
                  label="Partner type"
                  dense
                  placeholder="Select Partner type"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  :rules="[ formRules.required ]"
                  v-model="create_partner.phoneNumber"
                  filled
                  v-mask="'(##) ### ## ##'"
                  placeholder="(--) --- -- --"
                  prefix="+998"
                  dense
                  v-model.trim="create_partner.phoneNumber"
                  label="Phone number"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  :rules="[ formRules.required ]"
                  v-model="create_partner.email"
                  filled
                  label="Email"
                  dense
                  placeholder="Enter email"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  :rules="[ formRules.required ]"
                  v-model="create_partner.address"
                  filled
                  dense
                  label="Address"
                  placeholder="Enter address"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  :rules="[ formRules.required ]"
                  v-model="create_partner.contractNumber"
                  filled
                  dense
                  label="Contract number"
                  placeholder="Enter contract number"
                  color="#7631FF"
                />
              </v-col>
              <v-col
                cols="12" md="6"
              >
                <el-date-picker
                  :rules="[ formRules.required ]"
                  v-model="create_partner.contractDate"
                  style="width: 100%"
                  type="datetime"
                  placeholder="Created"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                >
                </el-date-picker>
              </v-col>
              <v-col
                cols="12" md="6"
              >
                <v-select
                  :rules="[ formRules.required ]"
                  v-model="create_partner.status"
                  :items="statusEnums"
                  append-icon="mdi-chevron-down"
                  filled
                  hide-details
                  color="#7631FF"
                  dense
                  label="Status"
                  class="rounded-lg"
                />
              </v-col>
              <v-col cols="12">
                <div class="text-body-1 font-weight-medium mb-3">Uploud contract</div>
                <v-card style="border: #A5A7AD dashed 1px" elevation="0">
                  <v-card-title>
                    <input
                      ref="uploader"
                      class="d-none"
                      type="file"
                      @change="onChangeFile"
                    />
                    <v-btn
                      @click="clickImportFile" elevation="0"
                      style="background-color: #F1EBFE; color:#7631ff;"
                      :disabled="image_list.length !== 0"
                      class="font-weight-bold mr-3 text-capitalize"
                    >
                      Upload Files...
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <div
                      v-for="(item, idx) in image_list"
                      :key="`imade_${idx}`">
                      <div class="d-flex justify-space-between align-center">
                        <p class="font-weight-bold">
                          <v-icon class="mr-3" color="green">
                            mdi-check
                          </v-icon>
                          {{ item.name }}
                        </p>
                        <p>
                          <v-btn icon @click="removeImage(item.size)">
                            <v-icon>
                              mdi-close
                            </v-icon>
                          </v-btn>
                        </p>
                      </div>
                      <v-divider/>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
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
          <v-form ref="edit_form" lazy-validation v-model="edit_validate">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="edit_partner.name"
                  :rules="[formRules.required]"
                  filled
                  dense
                  label="Partner name"
                  placeholder="Enter partner name"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="edit_partner.partnerTypeId"
                  :items="partner_list"
                  item-text="name"
                  item-value="id"
                  filled
                  append-icon="mdi-chevron-down"
                  label="Partner type"
                  dense
                  placeholder="Select Partner type"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="edit_partner.phoneNumber"
                  filled
                  v-mask="'(##) ### ## ##'"
                  placeholder="(--) --- -- --"
                  prefix="+998"
                  dense
                  label="Phone number"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="edit_partner.email"
                  filled
                  label="Email"
                  dense
                  :rules="[formRules.email]"
                  placeholder="Enter email"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="edit_partner.address"
                  filled
                  dense
                  label="Address"
                  placeholder="Enter address"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="edit_partner.contractNumber"
                  filled
                  dense
                  label="Contract number"
                  placeholder="Enter contract number"
                  color="#7631FF"
                />
              </v-col>
              <v-col
                cols="12" md="6"
              >
                <el-date-picker
                  v-model="edit_partner.contractDate"
                  style="width: 100%"
                  type="datetime"
                  placeholder="Created"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                >
                </el-date-picker>
              </v-col>
              <v-col
                cols="12" md="6"
              >
                <v-select
                  v-model="edit_partner.status"
                  :items="statusEnums"
                  append-icon="mdi-chevron-down"
                  filled
                  hide-details
                  color="#7631FF"
                  dense
                  label="Status"
                  class="rounded-lg"
                />
              </v-col>
              <v-col cols="12">
                <div class="text-body-1 font-weight-medium mb-3 d-flex">
                  Uploud contract
                  <v-tooltip top color="green">
                    <template #activator="{ on, attrs }">
                      <div class="ml-5 pointer" @click="downloadPDF(edit_partner.contractFilePath)" v-bind="attrs"
                           v-on="on">
                        <v-img src="/copy.svg" width="20"/>
                      </div>
                    </template>
                    <span>Download</span>
                  </v-tooltip>
                </div>
                <v-card style="border: #A5A7AD dashed 1px" elevation="0">
                  <v-card-title>
                    <input
                      ref="uploader_edit"
                      class="d-none"
                      type="file"
                      @change="onChangeFileEdit"
                    />
                    <v-btn
                      @click="clickImportFileEdit" elevation="0"
                      style="background-color: #F1EBFE; color:#7631ff;"
                      class="font-weight-bold mr-3 text-capitalize"
                    >
                      Upload Files...
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <div
                      v-for="(item, idx) in edit_image_list"
                      :key="`imade_${idx}`">
                      <div class="d-flex justify-space-between align-center">
                        <p class="font-weight-bold">
                          <v-icon class="mr-3" color="green">
                            mdi-check
                          </v-icon>
                          {{ item.name }}
                        </p>
                        <p>
                          <v-btn icon @click="removeImageEdit(item.size)">
                            <v-icon>
                              mdi-close
                            </v-icon>
                          </v-btn>
                        </p>
                      </div>
                      <v-divider/>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col class="d-flex justify-start">

              </v-col>
            </v-row>
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
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "PackageShapePage",
  data() {
    return {
      edit_validate: true,
      validate: true,
      edit_dialog: false,
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
      items_list: [],
      image_list: [],
      create_partner: {
        address: "",
        contractDate: "",
        email: "",
        name: "",
        contractNumber: "",
        status: "",
        typeId: "",
        phoneNumber: ""
      },
      edit_partner: {},
      edit_image_list: [],
      filters: {
        phoneNumber: "",
        name: "",
        status: "",
        email: "",
      },
    }
  },
  watch: {
    partner_list(val) {
      this.items_list = JSON.parse(JSON.stringify(val));
    },
    partner_one_list(val) {
      const item = JSON.parse(JSON.stringify(val));
      this.edit_partner = {...item};
      this.edit_partner.phoneNumber = this.edit_partner.phoneNumber.slice(4);
    }
  },
  async created() {
    await this.getPartnerList({page: 0, size: 10});
    await this.getPartnerType({page: 0, size: 50});
  },
  computed: {
    ...mapGetters({
      loading: "partners/loading",
      partner_list: "partners/partner_list",
      totalElements: "partners/totalElements",
      partner_type: "partners/partner_type",
      partner_one_list: "partners/partner_one_list",
    })
  },
  methods: {
    ...mapActions({
      getPartnerList: "partners/getPartnerList",
      changeStatus: "partners/changeStatus",
      getPartnerType: "partners/getPartnerType",
      getPartnerOneList: "partners/getPartnerOneList",
      createPartnerList: "partners/createPartnerList",
      updatePartnerList: "partners/updatePartnerList",
      filterPartnerList: "partners/filterPartnerList",
    }),
    downloadPDF(e) {
      const link = document.createElement('a');
      link.download = 'file';
      link.href = e;
      link.click();
    },
    removeImageEdit(e) {
      this.edit_image_list = this.edit_image_list.filter(item => item.size !== e);
    },
    removeImage(e) {
      this.image_list = this.image_list.filter(item => item.size !== e);
    },
    onChangeFile(e) {
      const file = e.target.files[0];
      this.image_list.push(file);
    },
    onChangeFileEdit(e) {
      const file = e.target.files[0];
      this.edit_image_list.push(file);
    },
    clickImportFileEdit() {
      this.$refs.uploader_edit.click();
    },
    clickImportFile() {
      this.$refs.uploader.click();
    },
    async statusChange(val) {
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
      const validate = this.$refs.new_form.validate();
      if (validate) {
        this.create_partner.phoneNumber = `+998${this.create_partner.phoneNumber.replace('(', '').replace(')', '').replaceAll(' ', '')}`
        const {address, contractDate, email, name, contractNumber, status, typeId, phoneNumber} = this.create_partner;
        const formData = new FormData();
        formData.append('address', address);
        formData.append('contractDate', contractDate);
        formData.append('contractFile', this.image_list[0]);
        formData.append('email', email);
        formData.append('name', name);
        formData.append('contractNumber', contractNumber);
        formData.append('status', status);
        formData.append('typeId', typeId);
        formData.append('phoneNumber', phoneNumber);
        await this.createPartnerList(formData);
        this.image_list = [];
        this.create_partner.contractDate = "";
        this.$refs.new_form.reset();
        this.new_dialog = false;
      }
    },
    async update() {
      const edit_validate = this.$refs.edit_form.validate();
      if (edit_validate) {
        this.edit_partner.phoneNumber = `+998${this.edit_partner.phoneNumber.replace('(', '').replace(')', '').replaceAll(' ', '')}`
        const {
          address,
          contractDate,
          contractNumber,
          email,
          id,
          name,
          phoneNumber,
          status,
          partnerTypeId
        } = this.edit_partner;
        const formData = new FormData();
        formData.append('address', address);
        formData.append('contractDate', contractDate);
        formData.append('contractNumber', contractNumber);
        formData.append('email', email);
        formData.append('id', id);
        formData.append('name', name);
        if (this.edit_image_list.length !== 0) {
          formData.append('contractFile', this.edit_image_list[0]);
        };
        formData.append('phoneNumber', phoneNumber);
        formData.append('status', status);
        formData.append('typeId', partnerTypeId);
        await this.updatePartnerList(formData);
        this.edit_dialog = false;
        this.edit_image_list = [];
      }
    },
    async editItem(item) {
      await this.getPartnerOneList(item.id);
      this.edit_dialog = true;
    },
    async resetFilters() {
      this.$refs.filter_form.reset();
      await this.getPartnerList({page: 0, size: 10});
    },
    async filterData() {
      const items = {...this.filters};
      await this.filterPartnerList(items);
    },
  },
  async mounted() {
    await this.$store.commit('setPageTitle', 'Catalogs');
  }
}
</script>

<style lang="scss">
.el-input__inner::placeholder,
.el-input__icon, .el-icon-time {
  color: #919191 !important;
}
</style>
