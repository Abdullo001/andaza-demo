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
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filter.deviceNumber"
                :label="$t('fraudDevices.dialog.deviceN')"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-select
                v-model="filter.status"
                :label="$t('fraudDevices.dialog.status')"
                :items="status_enums"
                outlined dense hide-details
                validate-on-blur
                class="rounded-lg"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <el-date-picker
                v-model="filter.end_time"
                type="datetime"
                :placeholder="$t('fraudDevices.dialog.blockedDateTime')"
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
                  color="#397CFD" elevation="0"
                  class="text-capitalize mr-4 rounded-lg font-weight-bold"
                  @click.stop="resetSearch"
                >
                  {{ $t('fraudDevices.dialog.reset') }}
                </v-btn>
                <v-btn
                  width="140" color="#397CFD" dark
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
      @click:row="(item) => viewDetails(item)"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title>  {{ $t('fraudDevices.dialog.devices') }}</v-toolbar-title>
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
          @click.stop="changeStatus"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "FraudDevicesPage",
  data() {
    return {
      filter_form: true,
      status_enums: ['UNBLOCKED', 'BLOCKED'],
      filter: {
        blockedAt: '',
        deviceId: '',
        deviceNumber: '',
        status: ''
      },
      headers: [
        {text: this.$t('fraudDevices.table.deviceId'), align: 'start', sortable: false, value: 'deviceId'},
        {text: this.$t('fraudDevices.table.deviceN'), value: 'blockedDeviceId'},
        {text: this.$t('fraudDevices.table.blockedBy'), value: 'blockedBy'},
        {text: this.$t('fraudDevices.table.deviceType'), value: 'deviceType'},
        {text: this.$t('fraudDevices.table.blockedDate'), value: 'blockedDateTime'},
        {text: this.$t('fraudDevices.table.unblockedDate'), value: 'unblockDateTime'},
        {text: this.$t('fraudDevices.table.status'), value: 'status', width: 200},
      ],
      all_devices: []
    }
  },
  created() {
    this.getAllDevices();
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
      filterDevice: "fraud/filterDevice"
    }),
    changeStatus() {},
    viewDetails(item) {
      this.$router.push(`/fraud-devices/${item.deviceId}`)
    },
    getAllDevices() {
      this.getDevices({page: 0, size: 10})
    },
    deviceStatusColor(color) {
      switch (color) {
        case 'UNBLOCKED':
          return 'green';
        case 'BLOCKED':
          return 'red'
      }
    },
    resetSearch() {
    },
    filterDevices() {
      this.filterDevice({
        deviceId: this.filter.deviceId,
        deviceNumber: this.filter.deviceNumber,
        status: this.filter.status
      })
    }
  },
  mounted() {
    this.$store.commit('setPageTitle', this.$t('fraudDevices.dialog.fraudManagement'))
  }
}
</script>

<style lang="scss">
.v-text-field--rounded > .v-input__control > .v-input__slot {
  padding: 0 14px;
  font-size: 14px;
}
tbody > tr {
  cursor: pointer;
}
</style>
