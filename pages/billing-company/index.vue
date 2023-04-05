<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filter.companyName"
                :label="$t('billingCompany.dialog.companyName')"
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
                :label="$t('billingCompany.dialog.status')"
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
                :placeholder="$t('billingCompany.dialog.createdAt')"
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
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
                  @click.stop="resetSearch"
                >
                  {{ $t('billingCompany.dialog.reset') }}
                </v-btn>
                <v-btn
                  width="140" color="#397CFD" dark
                  elevation="0"
                  class="text-capitalize rounded-lg font-weight-bold"
                  @click="filterCompany"
                >
                  {{ $t('billingCompany.dialog.search') }}
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
          <v-toolbar-title class="d-flex w-full align-center justify-space-between">
            <div>{{ $t('billingCompany.dialog.company') }}</div>
            <v-btn
              color="#7631FF"
              dark class="text-capitalize rounded-lg"
              @click="new_dialog = !new_dialog"
            >
              <v-icon>mdi-plus</v-icon>{{ $t('billingCompany.dialog.addCompany') }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.status="{ item }">
        <v-select
          @click.stop="changeStatus"
          :background-color="statusColor.color(item.status)"
          :items="company_enums"
          append-icon="mdi-chevron-down"
          v-model="item.status"
          hide-details
          class="mt-n2"
          rounded dark
        />
      </template>
      <template #item.owner="{item}">
        <div class="d-flex align-center my-2">
          <div class="ml-2">
            <div class="username-name">{{ item.owner }}</div>
            <div class="username-email">
              {{ item.email }}
              <v-tooltip top color="green">
                <template #activator="{ on, attrs }">
                  <div @click.stop="getCopyKey(item.email)" v-bind="attrs" v-on="on">
                    <v-img src="/copy.svg" width="15" class="ml-2 pointer"/>
                  </div>
                </template>
                <span>{{ $t('billingCompany.dialog.copy') }}</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" max-width="700">
      <v-card>
        <v-card-title class="text-capitalize mb-4 d-flex justify-space-between">
          <div>{{ $t('billingCompany.dialog.addCompany') }}</div>
          <v-btn icon color="#7631FF" @click="new_dialog = !new_dialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form lazy-validation ref="new_form" v-model="valid">
            <v-row>
              <v-col cols="12" lg="6">
                <v-text-field
                  :label="$t('billingCompany.dialog.companyName')"
                  :placeholder="$t('billingCompany.dialog.enterCompanyName')"
                  filled dense
                  validate-on-blur
                  v-model="newCompany.companyName"
                  :rules="[formRules.required]"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  :label="$t('billingCompany.dialog.ownerFullname')"
                  :placeholder="$t('billingCompany.dialog.enterOwnerName')"
                  filled dense
                  validate-on-blur
                  v-model="newCompany.ownerFullName"
                  :rules="[formRules.required]"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  :label="$t('billingCompany.dialog.eMail')"
                  :placeholder="$t('billingCompany.dialog.entereMail')"
                  filled dense
                  validate-on-blur
                  v-model="newCompany.email"
                  :rules="[formRules.required, formRules.email]"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  :label="$t('billingCompany.dialog.phoneNumber')"
                  placeholder="(--) --- -- --"
                  filled dense
                  validate-on-blur
                  v-model="newCompany.phoneNUmber"
                  :rules="[formRules.required]"
                  color="#7631FF"
                  v-mask="`(##) ### ## ##`"
                  prefix="+998"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  label="INN"
                  placeholder="Enter INN"
                  filled dense
                  validate-on-blur
                  v-model="newCompany.inn"
                  :rules="[formRules.required]"
                  color="#7631FF"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex align-center justify-center pb-4">
          <v-btn
            outlined
            color="#7631FF"
            min-width="163px"
            class="text-capitalize border rounded-lg mr-2 font-weight-bold"
            @click="new_dialog = false"
          >
            {{ $t('billingCompany.dialog.cancel') }}
          </v-btn>
          <v-btn
            color="#7631FF"
            min-width="163px"
            class="text-capitalize rounded-lg"
            dark
          >
            {{ $t('billingCompany.dialog.add') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  name: "BillingCompanyPage",
  data() {
    return {
      map_links: [

      ],
      newCompany: {
        companyName: '',
        ownerFullName: '',
        email: '',
        phoneNUmber: '',
        inn: ''
      },
      valid: true,
      new_dialog: false,
      company_enums: ['ACTIVE', 'DISABLED'],
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
        {text: this.$t('billingCompany.table.companyName'), value: 'companyName'},
        {text: this.$t('billingCompany.table.owner'), value: 'owner', width: 280},
        {text: this.$t('billingCompany.table.phoneNumber'), value: 'phoneNumber'},
        {text: 'INN', value: 'inn'},
        {text: this.$t('billingCompany.table.created'), value: 'created'},
        {text: this.$t('billingCompany.table.updated'), value: 'updated'},
        {text: this.$t('billingCompany.table.status'), value: 'status', width: 200},
      ],
      billingCompany: [
        {
          id: 12,
          companyName: 'SMARTTEX LLC',
          owner: 'john Doe',
          email: 'awesome@asgardia.team',
          phoneNumber: '+99890 123 45 67',
          inn: '1234567890123',
          status: 'ACTIVE',
          created: '12.10.2023 17:09:08',
          updated: '15.10.2023 17:09:08'
        }
      ]
    }
  },
  created() {
    this.getBillingCompany({page: 0, size: 10})
  },
  watch: {
    devices(val) {
      this.all_devices = JSON.parse(JSON.stringify(val))
    }
  },
  computed: {
    ...mapGetters({
      loading: "billingCompany/loading"
    })
  },
  methods: {
    ...mapActions({
      getBillingCompany: "billingCompany/getBillingCompanies"
    }),
    resetSearch() {},
    filterCompany() {},
    changeStatus() {},
    viewDetails(item) {
      console.log(item);
      this.$router.push(`/billing-company/${item.id}`)
    },
    getCopyKey(item) {
      navigator.clipboard.writeText(item)
      this.$toasted.success(`Copied ${item}`, {
        action: {
          text: '',
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        }
      })
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
    this.$store.commit('setPageTitle', this.$t('billingCompany.dialog.billing'))
  }
}
</script>

<style lang="scss">
.v-text-field--rounded > .v-input__control > .v-input__slot {
  padding: 0 14px;
  font-size: 14px;
}

.username-name {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #1D2433;
}

.username-email {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #777C85;
  display: flex;
  align-items: center;
}

.btn-color {
  font-size: 14px;
  line-height: 140%;
  color: #7631FF;
}

tbody > tr {
  cursor: pointer;
}

</style>

