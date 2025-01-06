<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation>
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2">
            <v-text-field
              v-model="filter.firstName"
              :placeholder="$t('listOfWorkers.filter.firstName')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2">
            <v-text-field
              v-model="filter.lastName"
              :placeholder="$t('listOfWorkers.filter.lastName')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2">
            <v-text-field
              v-model="filter.phone"
              :placeholder="$t('listOfWorkers.filter.contact')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2">
            <v-select
              :items="filterSallaryType"
              v-model="filter.paymentType"
              append-icon="mdi-chevron-down"
              item-text="text"
              item-value="val"
              outlined
              hide-details
              dense
              :placeholder="$t('listOfWorkers.filter.paymentType')"
              class="rounded-lg filter"
            />
          </v-col>
          <v-spacer />
          <v-col cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn
                width="140"
                outlined
                color="#544B99"
                elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click="resetFilters"
              >
                {{ $t("wastes.wastesWarehouse.reset") }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t("wastes.wastesWarehouse.search") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="listOfWorkersMain"
      :server-items-length="totalElements"
      :loading="loading"
      :items-per-page="itemPrePage"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4 rounded-lg"
      @update:items-per-page="size"
      @update:page="page"
      @click:row="(item) => viewDetails(item)"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              {{ $t('sidebar.listOfWorkers') }}
            </div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="new_user = true"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t('sidebar.listOfWorkers') }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider />
      </template>
      <template #item.paymentType="{ item }">
        <div>
          {{ item.paymentType == "FIXED" ? $t('listOfWorkers.dialog.fixed') : $t('listOfWorkers.dialog.donabay') }}
        </div>
      </template>
      <template #item.employmentStatus="{ item }">
        <v-chip
          :color="
            item.employmentStatus == 'CURRENTLY_WORKING' ? '#19b53f' : '#ff2928'
          "
          dark
        >
          {{
            item.employmentStatus == "CURRENTLY_WORKING"
              ? $t('listOfWorkers.working')
              : $t('listOfWorkers.fired')
          }}
        </v-chip>
      </template>
      <template #item.actions="{ item }">
        <div>
          <v-tooltip top color="#544B99">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="#544B99"
                v-on="on"
                v-bind="attrs"
                @click="viewDetails(item)"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </template>
            <span>Details</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_user" max-width="800" persistent>
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>{{ $t("userManagement.dialog.addUser") }}</div>
          <v-btn icon @click="resetUserDialog">
            <v-icon color="#544B99">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form lazy-validation ref="new_user" v-model="new_valid">
            <v-row>
              <v-col cols="12" md="6">
                <div class="d-flex align-center">
                  <v-img
                    :src="avatar ? avatar : '/upload-default.svg'"
                    max-width="120"
                    v-ripple
                    class="rounded-lg"
                  />
                  <v-btn
                    color="#F1EBFE"
                    elevation="0"
                    class="rounded-lg ml-6 text-capitalize"
                    @click="handleFileImport"
                  >
                    <v-img src="/upload-btn-icon.svg" width="20" class="mr-2" />
                    <div class="btn-color">
                      {{ $t("userManagement.dialog.uploadPhoto") }}
                    </div>
                  </v-btn>
                  <input
                    ref="uploader"
                    class="d-none"
                    type="file"
                    @change="onFileChanged"
                    accept="image/*"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col cols="12" lg="6">
                <div class="label">{{$t('listOfWorkers.filter.firstName')}}</div>
                <v-text-field
                  dense
                  outlined
                  class="base rounded-lg"
                  color="#544B99"
                  hide-details
                  :placeholder="$t('listOfWorkers.filter.firstName')"
                  v-model="user_data.firstName"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{$t('listOfWorkers.filter.lastName')}}</div>
                <v-text-field
                  outlined
                  dense
                  color="#544B99"
                  hide-details
                  class="base rounded-lg"
                  :placeholder="$t('listOfWorkers.filter.lastName')"
                  v-model="user_data.lastName"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{$t('listOfWorkers.dialog.birthDate')}}</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    v-model="user_data.birthDate"
                    :picker-options="pickerShortcuts"
                    class="base_picker"
                    placeholder="dd.MM.yyyy"
                    style="width: 100%; height: 100%"
                    type="date"
                    value-format="timestamp"
                  >
                  </el-date-picker>
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{$t('listOfWorkers.dialog.background')}}</div>
                <v-text-field
                  dense
                  hide-details
                  outlined
                  class="base rounded-lg"
                  color="#544B99"
                  :placeholder="$t('listOfWorkers.dialog.background')"
                  v-model="user_data.background"
                  validate-on-blur
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">
                  {{ $t('userManagement.dialog.phoneNumber') }}
                </div>
                <div>
                  <vue-phone-number-input
                    default-country-code="UZ"
                    v-model="user_data.phone"
                    :color="'#544B99'"
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{$t('listOfWorkers.dialog.address')}}</div>
                <v-text-field
                  dense
                  hide-details
                  outlined
                  class="base rounded-lg"
                  color="#544B99"
                  :placeholder="$t('listOfWorkers.dialog.address')"
                  v-model="user_data.address"
                  validate-on-blur
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{$t('listOfWorkers.dialog.hiredDate')}}</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    v-model="user_data.hiredDate"
                    :picker-options="pickerShortcuts"
                    class="base_picker"
                    placeholder="dd.MM.yyyy"
                    style="width: 100%; height: 100%"
                    type="date"
                    value-format="timestamp"
                  >
                  </el-date-picker>
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{$t('listOfWorkers.dialog.speciality')}}</div>
                <v-text-field
                  dense
                  hide-details
                  outlined
                  class="base rounded-lg"
                  color="#544B99"
                  :placeholder="$t('listOfWorkers.dialog.speciality')"
                  v-model="user_data.speciality"
                  validate-on-blur
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Status</div>
                <v-select
                  :items="statusEnums"
                  v-model="user_data.employmentStatus"
                  append-icon="mdi-chevron-down"
                  item-text="text"
                  item-value="val"
                  outlined
                  hide-details
                  dense
                  label="Status"
                  class="rounded-lg"
                  color="#544B99"
                  background-color="#F8F4FE"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{$t('listOfWorkers.dialog.firedDate')}}</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    v-model="user_data.firedDate"
                    :picker-options="pickerShortcuts"
                    class="base_picker"
                    placeholder="dd.MM.yyyy"
                    style="width: 100%; height: 100%"
                    type="date"
                    value-format="timestamp"
                    :disabled="user_data.employmentStatus == 'CURRENTLY_WORKING'"
                  >
                  </el-date-picker>
                </div>
              </v-col>
              <v-col cols="12" lg="8" class="d-flex align-center">
                <div class="label mr-5">{{$t('listOfWorkers.dialog.paymentType')}}</div>
                <v-radio-group row v-model="user_data.paymentType">
                  <v-radio
                    color="#544B99"
                    :label="$t('listOfWorkers.dialog.fixed')"
                    value="FIXED"
                  ></v-radio>
                  <v-radio
                    color="#544B99"
                    :label="$t('listOfWorkers.dialog.donabay')"
                    value="PER_WORK"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="text-capitalize rounded-lg font-weight-bold mr-6"
            color="#544B99"
            width="163"
            @click="resetUserDialog"
            >{{ $t("userManagement.dialog.cancel") }}
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="createUser"
            >{{ $t("userManagement.dialog.add") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VuePhoneNumberInput from "vue-phone-number-input";

export default {
  name: "BankDetails",
  components: {
    VuePhoneNumberInput,
  },
  data() {
    return {
      headers: [
        {
          text: "№",
          value: "id",
        },
        {
          text: this.$t('listOfWorkers.headers.name'),
          value: "firstName",
          sortable: false,
        },
        {
          text: this.$t('listOfWorkers.headers.lastname'),
          value: "lastName",
          sortable: false,
        },
        {
          text: this.$t('listOfWorkers.headers.sallary'),
          value: "paymentType",
          sortable: false,
        },
        {
          text: this.$t('listOfWorkers.headers.contact'),
          value: "phone",
          sortable: false,
        },
        {
          text: this.$t('listOfWorkers.headers.status'),
          value: "employmentStatus",
          sortable: false,
        },
        {
          text: this.$t('listOfWorkers.headers.actions'),
          value: "actions",
          sortable: false,
        },
      ],
      filterSallaryType: [
        { text: this.$t('listOfWorkers.dialog.fixed'), val: "FIXED" },
        { text: this.$t('listOfWorkers.dialog.donabay'), val: "PER_WORK" },
      ],
      statusEnums: [
        { text: this.$t('listOfWorkers.working'), val: "CURRENTLY_WORKING" },
        { text: this.$t('listOfWorkers.fired'), val: "NO_LONGER_WORKING" },
      ],
      filter: {
        paymentType: "",
        firstName: "",
        lastName: "",
        phone: "",
      },
      itemPrePage: 10,
      current_page: 0,
      new_user: false,
      new_valid: true,
      avatar: null,
      birthDate: "",
      hiredDate: "",
      firedDate: "",
      user_data: {
        photo: "",
        firstName: "",
        lastName: "",
        phone: "",
        birthDate: "",
        background: "",
        address: "",
        hiredDate: "",
        firedDate: "",
        speciality: "",
        paymentType: "FIXED",
        employmentStatus: "CURRENTLY_WORKING",
      },
    };
  },
  async created() {
    await this.getListOfWorkers({ page: 0, size: 10 });
  },
  computed: {
    ...mapGetters({
      listOfWorkersMain: "listOfWorkers/listOfWorkers",
      totalElements: "listOfWorkers/totalElements",
      loading: "listOfWorkers/loading",
    }),
  },
  methods: {
    ...mapActions({
      getListOfWorkers: "listOfWorkers/getListOfWorkers",
      createEmployee: "listOfWorkers/createEmployee",
    }),
    async size(val) {
      this.itemPrePage = val;
      await this.getBankDetailsList({ page: 0, size: this.itemPrePage });
    },
    async page(val) {
      this.current_page = val - 1;
      await this.getBankDetailsList({
        page: this.current_page,
        size: this.itemPrePage,
      });
    },
    resetUserDialog() {
      this.$refs.new_user.reset();
      this.user_data.phone = "";
      this.avatar = "";
      this.new_user = !this.new_user;
    },
    handleFileImport() {
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.user_data.photo = e.target.files[0];
      this.avatar = URL.createObjectURL(this.user_data.photo);
    },
    async createUser() {
      const valid = this.$refs.new_user.validate();
      if (valid) {
        if (this.user_data.photo === null) {
          delete this.user_data.photo;
        }
        this.user_data.phone = `998${this.user_data.phone}`;

        const data = { ...this.user_data };

        await this.createEmployee(data);

        (this.new_user = false), (this.avatar = "");
        this.birthDate = "";
        this.hiredDate = "";
        this.firedDate = "";
        this.user_data = {
          photo: null,
          firstName: "",
          lastName: "",
          phone: "",
          birthDate: "",
          background: "",
          address: "",
          hiredDate: "",
          firedDate: "",
          speciality: "",
          paymentType: "FIXED",
          employmentStatus: "CURRENTLY_WORKING",
        };
      }
    },
    convertDate(time) {
      const date = new Date(time);
      const timeMillis = date.getTime();
      return timeMillis;
    },
    viewDetails(item) {
      this.$router.push(`/list-of-workers/${item.id}`);
    },
    async resetFilters() {
      this.filter = {
        paymentType: "",
        firstName: "",
        lastName: "",
        phone: "",
      };
      await this.getListOfWorkers({ page: 0, size: 10 });
    },
    async filterData() {
      await this.getListOfWorkers({ page: 0, size: 10, ...this.filter });
    },
  },
};
</script>

<style lang="scss"></style>
