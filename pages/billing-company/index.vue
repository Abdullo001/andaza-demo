<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filter.companyName"
                label="Company name"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filter.inn"
                label="INN"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-select
                v-model="filter.status"
                label="Status"
                :items="status_enums"
                outlined dense hide-details
                validate-on-blur
                class="rounded-lg"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <el-date-picker
                v-model="filter.createdAt"
                type="datetime"
                placeholder="Created at"
                :picker-options="pickerOptions"
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
                  Reset
                </v-btn>
                <v-btn
                  width="140" color="#397CFD" dark
                  elevation="0"
                  class="text-capitalize rounded-lg font-weight-bold"
                  @click="filterCompany"
                >
                  Search
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
      :items="billingCompany"
      :loading="loading"
      :items-per-page="10"
      @click:row="(item) => viewDetails(item)"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title>Company</v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.status="{ item }">
        <v-select
          @click.stop="changeStatus"
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
    </v-data-table>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  name: "BillingCompanyPage",
  data() {
    return {
      filter_form: true,
      status_enums: ['UNBLOCKED', 'BLOCKED'],
      filter: {
        companyName: '',
        inn: '',
        status: '',
        createdAt: ''
      },
      headers: [
        {text: 'ID', align: 'start', sortable: false, value: 'id'},
        {text: 'Company name', value: 'companyName'},
        {text: 'Owner', value: 'owner'},
        {text: 'Phone number', value: 'phoneNumber'},
        {text: 'INN', value: 'inn'},
        {text: 'Created', value: 'created'},
        {text: 'Updated', value: 'updated'},
        {text: 'Status', value: 'status', width: 200},
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "Cегодня",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "Вчера",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "Неделя",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      billingCompany: []
    }
  },
  created() {
  },
  watch: {
    devices(val) {
      this.all_devices = JSON.parse(JSON.stringify(val))
    }
  },
  computed: {
    ...mapGetters({
      loading: "accounts/loading"
    })
  },
  methods: {
    ...mapActions({
      getAccounts: "accounts/getAccounts"
    }),
    resetSearch() {},
    filterCompany() {},
    changeStatus() {},
    viewDetails(item) {
      console.log(item);
      // this.$router.push(`/fraud-users/${item.blockedAccountId}`)
    },
    deviceStatusColor(color) {
      switch (color) {
        case 'UNBLOCKED':
          return 'green';
        case 'BLOCKED':
          return 'red'
      }
    },

  },
  mounted() {
    this.$store.commit('setPageTitle', 'Billing')
  }
}
</script>

<style lang="scss" scoped />

