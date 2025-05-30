<template>
  <div>
    <Breadcrumbs :maps="map_links" />
    <v-card color="#fff" elevation="0">
      <v-card-title class="d-flex justify-space-between">
        <div>{{ employeeInfo?.firstName }}</div>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col>
            <div class="label">{{ $t("userManagement.child.photo") }}</div>
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
            <div class="label mt-2">
              {{ $t("listOfWorkers.filter.firstName") }}
            </div>
            <v-text-field
              v-model="employeeInfo.firstName"
              :placeholder="$t('listOfWorkers.filter.firstName')"
              outlined
              class="base rounded-lg"
              dense
              height="44"
              style="max-width: 400px"
            />
            <div class="label">{{ $t("listOfWorkers.filter.lastName") }}</div>
            <v-text-field
              v-model="employeeInfo.lastName"
              :placeholder="$t('listOfWorkers.filter.lastName')"
              outlined
              class="base rounded-lg"
              dense
              height="44"
              style="max-width: 400px"
              color="#544B99"
            />
            <div class="label">{{ $t("listOfWorkers.dialog.background") }}</div>
            <v-text-field
              v-model="employeeInfo.background"
              dense
              hide-details
              outlined
              class="base rounded-lg"
              color="#544B99"
              height="44"
              :placeholder="$t('listOfWorkers.dialog.background')"
              validate-on-blur
            />
          </v-col>
          <v-col>
            <div class="label mt-5">
              {{ $t("listOfWorkers.dialog.birthDate") }}
            </div>
            <div style="height: 40px !important">
              <el-date-picker
                v-model="employeeInfo.birthDate"
                :picker-options="pickerShortcuts"
                class="base_picker"
                placeholder="yyyy.MM.dd"
                style="width: 100%; height: 100%"
                type="date"
                value-format="timestamp"
              >
              </el-date-picker>
            </div>
            <div class="label mt-7">
              {{ $t("listOfWorkers.dialog.hiredDate") }}
            </div>
            <div style="height: 40px !important">
              <el-date-picker
                v-model="employeeInfo.hiredDate"
                :picker-options="pickerShortcuts"
                class="base_picker"
                placeholder="yyyy.MM.dd"
                style="width: 100%; height: 100%"
                type="date"
                value-format="timestamp"
              >
              </el-date-picker>
            </div>
            <div class="label mt-7">
              {{ $t("listOfWorkers.dialog.address") }}
            </div>
            <v-text-field
              v-model="employeeInfo.address"
              dense
              hide-details
              outlined
              class="base rounded-lg"
              height="44"
              color="#544B99"
              :placeholder="$t('listOfWorkers.dialog.address')"
              validate-on-blur
            />
            <div class="label mt-6">
              {{ $t("userManagement.dialog.phoneNumber") }}
            </div>
            <v-text-field
              v-model="employeeInfo.phone"
              dense
              hide-details
              outlined
              class="base rounded-lg"
              height="44"
              color="#544B99"
              :placeholder="$t('userManagement.dialog.phoneNumber')"
              validate-on-blur
            />
          </v-col>
          <v-col>
            <div class="label mt-5">
              {{ $t("listOfWorkers.dialog.speciality") }}
            </div>
            <v-text-field
              v-model="employeeInfo.speciality"
              dense
              hide-details
              outlined
              class="base rounded-lg"
              height="44"
              color="#544B99"
              :placeholder="$t('listOfWorkers.dialog.speciality')"
              validate-on-blur
            />
            <div class="label mt-5">Status</div>
            <v-select
              :items="statusEnums"
              v-model="employeeInfo.employmentStatus"
              append-icon="mdi-chevron-down"
              item-text="text"
              item-value="val"
              outlined
              dense
              hide-details
              class="rounded-lg base"
              color="#544B99"
              background-color="#F8F4FE"
            />
            <div class="label mt-9">
              {{ $t("listOfWorkers.dialog.firedDate") }}
            </div>
            <div style="height: 40px !important">
              <el-date-picker
                v-model="employeeInfo.firedDate"
                :picker-options="pickerShortcuts"
                class="base_picker"
                placeholder="yyyy.MM.dd"
                style="width: 100%; height: 100%"
                type="date"
                value-format="timestamp"
                :disabled="employeeInfo.employmentStatus == 'CURRENTLY_WORKING'"
              >
              </el-date-picker>
            </div>
            <div class="label mt-7">
              {{ $t("listOfWorkers.dialog.paymentType") }}
            </div>
            <v-select
              :items="filterSallaryType"
              v-model="employeeInfo.paymentType"
              append-icon="mdi-chevron-down"
              item-text="text"
              item-value="val"
              outlined
              color="#544B99"
              hide-details
              dense
              class="rounded-lg base"
              background-color="#F8F4FE"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="saveBtn"
          color="#544B99"
          dark
          class="text-capitalize font-weight-bold mx-3 mb-4 px-5"
          height="40"
          >{{ $t("userManagement.child.save") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      map_links: [
        {
          text: "Home",
          disabled: false,
          to: "/",
          icon: true,
        },
        {
          text: "Staff list",
          disabled: false,
          to: "/list-of-workers",
          icon: true,
        },
        {
          text: "Detail",
          disabled: true,
          to: "",
          icon: false,
        },
      ],
      employeeInfo: {},
      birthDate: "",
      hiredDate: "",
      firedDate: "",
      avatar: null,
      filterSallaryType: [
        { text: this.$t('listOfWorkers.dialog.fixed'), val: "FIXED" },
        { text: this.$t('listOfWorkers.dialog.donabay'), val: "PER_WORK" },
      ],
      statusEnums: [
        { text: this.$t('listOfWorkers.working'), val: "CURRENTLY_WORKING" },
        { text: this.$t('listOfWorkers.fired'), val: "NO_LONGER_WORKING" },
      ],
    };
  },
  async created() {
    await this.getSelectedEmployee(this.$route.params.id);
  },
  computed: {
    ...mapGetters({
      selectedEmployeeInfo: "listOfWorkers/selectedEmployeeInfo",
    }),
  },
  watch: {
    selectedEmployeeInfo(val) {
      this.employeeInfo = JSON.parse(JSON.stringify(val));
      this.avatar = this.employeeInfo?.photo;
    },
  },
  methods: {
    ...mapActions({
      getSelectedEmployee: "listOfWorkers/getSelectedEmployee",
      updateSelectedEmployee: "listOfWorkers/updateSelectedEmployee",
    }),
    handleFileImport() {
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.employeeInfo.photo = e.target.files[0];
      this.avatar = URL.createObjectURL(this.employeeInfo.photo);
    },
    convertInitDate(time) {
      const date = new Date(time);
      const timeMillis = date.getTime();
      return timeMillis;
    },
    convertDate(time) {
      const timeMillis = time;
      const date = new Date(timeMillis);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const formattedDate = `${day}.${month}.${year}`;
      return formattedDate;
    },
    saveBtn() {
      delete this.employeeInfo.id;
      this.employeeInfo.photo === this.selectedEmployeeInfo.photo
        ? (this.employeeInfo.photo = "")
        : this.employeeInfo.photo;

      const id = this.$route.params.id;
      const data = this.employeeInfo;
      this.updateSelectedEmployee({ id, data });
    },
  },
};
</script>

<style lang="scss"></style>
