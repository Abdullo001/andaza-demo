<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filter.deviceId"
                :label="$t('fraudDevices.dialog.deviceId')"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg filter"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-select
                v-model="filter.status"
                :label="$t('fraudDevices.dialog.status')"
                :items="status_enums"
                outlined dense hide-details
                validate-on-blur
                class="rounded-lg filter"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <el-date-picker
                v-model="filter.from"
                type="datetime"
                style="width: 100%"
                class="filter_picker"
                placeholder="From"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <el-date-picker
                v-model="filter.to"
                type="datetime"
                class="filter_picker"
                style="width: 100%"
                placeholder="To"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </v-col>
            <v-spacer/>
            <v-col cols="12" lg="3">
              <div class="d-flex justify-end">
                <v-btn
                  width="140" outlined
                  color="#544B99" elevation="0"
                  class="text-capitalize mr-4 rounded-lg font-weight-bold"
                  @click.stop="resetSearch"
                >
                  {{ $t('fraudDevices.dialog.reset') }}
                </v-btn>
                <v-btn
                  width="140" color="#544B99" dark
                  elevation="0"
                  class="text-capitalize rounded-lg font-weight-bold"
                  @click="filterDevices"
                >
                  {{ $t('fraudDevices.dialog.search') }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="all_devices"
      :loading="loading"
      :items-per-page="10"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title> {{ $t('fraudDevices.dialog.devices') }}</v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.status="{ item }">
        <v-select
          :background-color="statusColor.color(item.status)"
          :items="status_enums"
          append-icon="mdi-chevron-down"
          v-model="item.status"
          hide-details
          class="mt-n2"
          dark
          rounded
          @change="changeStatus(item)"
        />
      </template>
      <template #item.actions="{item}">
        <v-btn icon color="green" @click="edit_dialog = true">
          <v-img src="edit-active.svg" max-width="22"/>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="edit_dialog" width="800">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit device</div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="12" md="6">
                <div class=label>Device ID</div>
                <v-text-field
                  outlined
                  dense
                  height="44"
                  class="rounded-lg base"
                  hide-details
                  placeholder="Enter Device ID"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Device №</div>
                <v-text-field
                  outlined
                  dense
                  height="44"
                  class="rounded-lg base"
                  hide-details
                  placeholder="Enter Device №"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Blocked by</div>
                <v-text-field
                  outlined
                  dense
                  height="44"
                  class="rounded-lg base"
                  hide-details
                  placeholder="Enter Blocked by"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Status</div>
                <v-select
                  outlined
                  dense
                  height="44"
                  class="rounded-lg base"
                  hide-details
                  label="Status"
                  placeholder="Select Status"
                  color="#544B99"
                  append-icon="mdi-chevron-down"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Blocked date time</div>
                <v-text-field
                  outlined
                  dense
                  height="44"
                  class="rounded-lg base"
                  hide-details
                  disabled
                  color="#544B99"
                  placeholder="Enter blocked date time"
                >
                  <template #append>
                    <v-img src="/date-icon.svg"/>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Unblocked date time</div>
                <v-text-field
                  outlined
                  dense
                  height="44"
                  class="rounded-lg base"
                  hide-details
                  disabled
                  placeholder="Enter unblocked date time"
                  color="#544B99"
                >
                  <template #append>
                    <v-img src="/date-icon.svg"/>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Reason</div>
                <v-text-field
                  outlined
                  dense
                  height="44"
                  class="rounded-lg base"
                  hide-details
                  placeholder="Enter Blocked by"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Device type</div>
                <v-select
                  outlined
                  dense
                  height="44"
                  class="rounded-lg base"
                  hide-details
                  append-icon="mdi-chevron-down"
                  placeholder="Select Device type"
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="163"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="163"
          >
            {{ $t('update') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "FraudDevicesPage",
  data() {
    return {
      edit_dialog: false,
      filter_form: true,
      status_enums: ['UNBLOCKED', 'BLOCKED'],
      filter: {
        form: '',
        to: '',
        deviceId: '',
        status: ''
      },
      headers: [
        {text: "ID",sortable: false, value: 'deviceId'},
        {text: this.$t('fraudDevices.table.deviceId'), align: 'start', sortable: false, value: 'blockedDeviceId'},
        {text: this.$t('fraudDevices.table.blockedBy'), value: 'blockedBy'},
        {text: this.$t('fraudDevices.table.deviceType'), value: 'deviceType'},
        {text: this.$t('fraudDevices.table.blockedDate'), value: 'blockedDateTime'},
        {text: this.$t('fraudDevices.table.unblockedDate'), value: 'unblockDateTime'},
        {text: this.$t('fraudDevices.table.status'), value: 'status', width: 200},
        {text: this.$t('prefinances.table.actions'), value: 'actions', sortable: false,},
      ],
      all_devices: []
    }
  },
  async created() {
    await this.getAllDevices();
  },
  watch: {
    devices(val) {
      this.all_devices = JSON.parse(JSON.stringify(val))
    }
  },
  computed: {
    ...mapGetters({
      devices: "fraud/allDevices",
      loading: "fraud/loading"
    })
  },
  methods: {
    ...mapActions({
      getDevices: "fraud/getDevices",
      filterDevice: "fraud/filterDevice",
      changeStatusDevice: "fraud/changeStatusDevice",
    }),
    async changeStatus(item) {
      await this.changeStatusDevice({id: item.blockedDeviceId, status: item.status});
    },
    async getAllDevices() {
      await this.getDevices({page: 0, size: 10})
    },
    deviceStatusColor(color) {
      switch (color) {
        case 'UNBLOCKED':
          return 'green';
        case 'BLOCKED':
          return 'red'
      }
    },
    async resetSearch() {
      this.filter = {
        form: '',
        to: '',
        deviceId: '',
        status: ''
      },
        await this.getAllDevices();
    },
    async filterDevices() {
      const item = {...this.filter};
      await this.filterDevice(item);
    }
  },
  async mounted() {
    await this.$store.commit('setPageTitle', this.$t('fraudDevices.dialog.fraudManagement'))
  }
}
</script>

<style lang="scss">
.v-text-field--rounded > .v-input__control > .v-input__slot {
  padding: 0 14px;
  font-size: 14px;
}

.el-input__inner::placeholder,
.el-input__icon, .el-icon-time {
  color: #919191 !important;
}
</style>
