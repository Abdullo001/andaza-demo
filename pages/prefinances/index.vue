<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Refinance number"
              outlined
              class="rounded-lg"
              v-model="filters.financeNumber"
              hide-details
              dense
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Model №"
              outlined
              class="rounded-lg"
              v-model="filters.modelId"
              hide-details
              dense
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Partner"
              outlined
              class="rounded-lg"
              v-model="filters.partnerId"
              hide-details
              dense
            />
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="filters.createAt"
                  label="Created at"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                  append-icon="mdi-lock"
                  class="rounded-lg"
                  hide-details
                  style="width: 200px"
                >
                  <template #append>
                    <v-img src="/date-icon.svg"/>
                  </template>
                </v-text-field>
              </template>
              <v-date-picker
                v-model="filters.createAt"
                @input="menu2 = false"
                color="#7631FF"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col class="" cols="12" lg="4">
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
      :items="preFinanceList"
      :items-per-page="10"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium">Prefinance</div>
            <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark @click="$router.push(`/prefinances/create`)">
              <v-icon>mdi-plus</v-icon>
              Prefinance
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>
      <template #item.status="{item}">
        <div>
          <v-select
            @change="changeStatus(item)"
            :items="status_enum"
            v-model="item.status"
            hide-details
            rounded
            append-icon="mdi-chevron-down"
            :background-color="statusColor.color(item.status)"
            dark
            class="text-caption mt-n2"
            flat
          />
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      status_enum: ['ACTIVE', 'DISABLED'],
      new_prefinance: false,
      filters: {
        financeNumber: '',
        modelId: '',
        partnerId: '',
        createAt: ''
      },
      valid_search: '',
      menu2: false,
      headers: [
        {text: 'Prefinance number', align: 'start', sortable: false, value: 'preFinanceNumber'},
        {text: 'Model №', value: 'modelNumber'},
        {text: 'Partner', value: 'partner'},
        {text: 'Price', value: 'primaryRate'},
        {text: 'Currency', value: 'primaryCurrency'},
        {text: 'Status', value: 'status', align: 'center', width: 200},
      ],
      preFinanceList: []
    }
  },
  created() {
    this.getReFinancesList({page: 0, size: 50})
  },
  computed: {
    ...mapGetters({
      preFinancesContent: 'preFinance/preFinancesContent'
    })
  },
  watch: {
    preFinancesContent(val) {
      this.preFinanceList = JSON.parse(JSON.stringify(val))
    }
  },
  methods: {
    ...mapActions({
      getReFinancesList: "preFinance/getPreFinancesList",
      changePreFinanceStatus: "preFinance/changeStatus"
    }),
    resetFilters() {
      this.$refs.filter_form.reset()
    },
    changeStatus(item) {
      this.changePreFinanceStatus({
        id: item.id,
        status: item.status
      })
    }
  },
  mounted() {
    this.$store.commit('setPageTitle', 'Prefinances')
  }
}
</script>

<style lang="scss">
.v-data-table-header {
  background-color: #E9EAEB;
}
</style>
