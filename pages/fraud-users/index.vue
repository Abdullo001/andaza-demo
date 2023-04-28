<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filter.accountId"
                :label="$t('fraudUsers.dialog.accountId')"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-select
                v-model="filter.status"
                :label="$t('fraudUsers.dialog.status')"
                :items="status_enums"
                outlined dense hide-details
                validate-on-blur
                class="rounded-lg"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <el-date-picker
                style="width: 100%;"
                v-model="filter.from"
                type="datetime"
                placeholder="From"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <el-date-picker
                style="width: 100%;"
                v-model="filter.to"
                type="datetime"
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
                  color="#397CFD" elevation="0"
                  class="text-capitalize mr-4 rounded-lg font-weight-bold"
                  @click.stop="resetSearch"
                >
                  {{ $t('fraudUsers.dialog.reset') }}
                </v-btn>
                <v-btn
                  width="140" color="#397CFD" dark
                  elevation="0"
                  class="text-capitalize rounded-lg font-weight-bold"
                  @click="filterDevices"
                >
                  {{ $t('fraudUsers.dialog.search') }}
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
      :items="account_list"
      :loading="loading"
      :items-per-page="10"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title> {{ $t('fraudUsers.dialog.account') }}</v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.status="{ item }">
        <v-select
          @change="changeStatus(item)"
          :background-color="statusColor.color(item.status)"
          :items="status_enums"
          append-icon="mdi-chevron-down"
          v-model="item.status"
          hide-details
          class="mt-n2"
          dark
          rounded
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
          <div class="text-capitalize font-weight-bold">Edit Account</div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  filled
                  label="Account ID"
                  placeholder="Enter Account ID"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  filled
                  label="Blocked by"
                  placeholder="Enter Blocked by"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  filled
                  label="Status"
                  placeholder="Select Status"
                  color="#7631FF"
                  append-icon="mdi-chevron-down"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  filled
                  disabled
                  label="Blocked date time"
                  color="#7631FF"
                >
                  <template #append>
                    <v-img src="/date-icon.svg"/>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  filled
                  disabled
                  label="Unblocked date time"
                  color="#7631FF"
                >
                  <template #append>
                    <v-img src="/date-icon.svg"/>
                  </template>
                </v-text-field>
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
  name: 'FraudAccountPage',
  data() {
    return {
      edit_dialog: false,
      filter_form: true,
      status_enums: ['UNBLOCKED', 'BLOCKED'],
      filter: {
        from: '',
        to: '',
        accountId: '',
        status: ''
      },
      account_list: [],
      headers: [
        {text: this.$t('fraudUsers.table.accountId'), align: 'start', sortable: false, value: 'blockedAccountId'},
        {text: this.$t('fraudUsers.table.blockedBy'), value: 'blockedBy'},
        {text: this.$t('fraudUsers.table.period'), value: 'period'},
        {text: this.$t('fraudUsers.table.blockedDate'), value: 'blockedDateTime'},
        {text: this.$t('fraudUsers.table.unblockedDate'), value: 'unblockDateTime'},
        {text: this.$t('fraudUsers.table.status'), value: 'status', width: 200},
        {text: this.$t('prefinances.table.actions'), value: 'actions', sortable: false,},
      ],
    }
  },
  async created() {
    await this.getAccounts({page: 0, size: 15})
  },
  watch: {
    account(val){
      this.account_list = JSON.parse(JSON.stringify(val));
    },
  },
  computed: {
    ...mapGetters({
      account: 'accounts/accounts',
      loading: "accounts/loading"
    })
  },
  methods: {
    ...mapActions({
      getAccounts: "accounts/getAccounts",
      changeStatusAccount: "accounts/changeStatusAccount",
      filterAccount: "accounts/filterAccount",
    }),
    async changeStatus(item) {
      await this.changeStatusAccount({id: item.blockedAccountId, status: item.status})
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
        from: '',
        to: '',
        accountId: '',
        status: ''
      };
      await this.getAccounts({page: 0, size: 15});
    },
    async filterDevices() {
      const item = {...this.filter};
      await this.filterAccount(item);
    }
  },
  async mounted() {
    await this.$store.commit('setPageTitle', this.$t('fraudUsers.dialog.fraudManagement'));
  }
}
</script>

<style lang="scss">
.el-input__inner::placeholder,
.el-input__icon, .el-icon-time {
  color: #919191 !important;
}
</style>
