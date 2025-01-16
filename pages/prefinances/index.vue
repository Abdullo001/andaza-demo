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
              :label="$t('prefinances.dialog.refinanceNumber')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.financeNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :label="$t('prefinances.dialog.modelN')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.modelId"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :label="$t('prefinances.dialog.partner')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.partnerId"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-spacer/>
          <v-col cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn
                width="140" outlined
                color="#544B99" elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                {{ $t('prefinances.dialog.reset') }}
              </v-btn>
              <v-btn
                width="140" color="#544B99" dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t('prefinances.dialog.search') }}
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
      :loading="loading"
      @update:items-per-page="getItemSize"
      @update:page="page"
      :server-items-length="totalElements"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
      :options.sync="options"
      @click:row="(item) => viewDetails(item)"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium">{{ $t('sidebar.calculations') }}</div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="$router.push(localePath(`/prefinances/create`))"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t('sidebar.calculations') }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>
      <template #item.status="{item}">
        <div>
          <v-select
            @click.stop
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
      <template #item.actions="{item}">
        <v-tooltip top color="#544B99">
          <template v-slot:activator="{on, attrs}">
            <v-btn
              icon color="#544B99"
              v-on="on" v-bind="attrs"
              @click.stop="viewDetails(item)"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('prefinances.dialog.edit') }}</span>
        </v-tooltip>
        <v-tooltip top color="#544B99">
          <template v-slot:activator="{on, attrs}">
            <v-btn
              icon color="#544B99"
              v-on="on" v-bind="attrs"
              @click.stop="generatePdf(item)"
              :loading="loadingStates[item.id]"
              :key="item.id"
            >
              <v-img src="/download.svg" max-width="24"/>
            </v-btn>
          </template>
          <span>Generate PDF</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      options: {},
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
        {text: this.$t('prefinances.table.prefinanceNumber'), align: 'start', sortable: false, value: 'preFinanceNumber'},
        {text: this.$t('prefinances.table.modelN'), value: 'modelNumber'},
        {text: this.$t('prefinances.table.partner'), value: 'partner'},
        {text: this.$t('prefinances.table.price'), value: 'soldPrice'},
        {text: this.$t('prefinances.table.currency'), value: 'primaryCurrency'},
        {text: this.$t('prefinances.table.status'), value: 'status', width: 200},
        {text: this.$t('prefinances.table.actions'), value: 'actions', align: 'center'},
      ],
      preFinanceList: [],
      itemPerPage: 10,
      current_page: 0,
      isLoad:false,
      loadingStates: {},
      currentLoadingId: null,
    }
  },
  created() {
    this.getReFinancesList(
      {
        page: 0,
        size: 10,
        preFinanceNumber: '',
        modelNumber: '',
        partner: ''
      })
  },
  computed: {
    ...mapGetters({
      preFinancesContent: 'preFinance/preFinancesContent',
      loading: 'preFinance/loading',
      totalElements: 'preFinance/totalElements',
      prefinancePdf: "preFinance/prefinancePdf",
    })
  },
  watch: {
    preFinancesContent(val) {
      this.preFinanceList = JSON.parse(JSON.stringify(val))
    },
    prefinancePdf(val){
      const blob = new Blob(
        [new Uint8Array([...val].map((char) => char.charCodeAt(0)))],
        { type: "application/pdf" }
      );
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", objectUrl);
      a.click();
      this.$set(this.loadingStates, this.currentLoadingId, false);
      this.currentLoadingId = null;
    },
  },
  methods: {
    ...mapActions({
      getReFinancesList: "preFinance/getPreFinancesList",
      changePreFinanceStatus: "preFinance/changeStatus",
      getPrefinanceGeneratePdf:"preFinance/getPrefinanceGeneratePdf"
    }),
    viewDetails(item) {
      this.$router.push(this.localePath(`/prefinances/${item.id}`))
      this.$store.commit("preFinance/setPreFinanceId", item.id);
    },
    generatePdf(item){
      this.$set(this.loadingStates, item.id, true);
      this.currentLoadingId = item.id;
      const data={
        preFinanceId:item.id,
      }
      this.getPrefinanceGeneratePdf(data)

    },
    resetFilters() {
      this.$refs.filter_form.reset();
      this.getReFinancesList(
        {
          page: 0,
          size: 10,
          preFinanceNumber: '',
          modelNumber: '',
          partner: ''
        })

    },
    changeStatus(item) {
      this.changePreFinanceStatus({
        id: item.id,
        status: item.status
      })
    },
    async getItemSize(val) {
      this.itemPerPage = val;
      await this.getReFinancesList({
        page: this.current_page,
        size: this.itemPerPage,
        modelNumber: this.filters.modelId,
        preFinanceNumber: this.filters.financeNumber,
        partner: this.filters.partnerId
      })
    },
    async page(val) {
      // arrows < > value page
      this.current_page = val - 1
      await this.getReFinancesList({
        page: this.current_page,
        size: this.itemPerPage,
        modelNumber: this.filters.modelId,
        preFinanceNumber: this.filters.financeNumber,
        partner: this.filters.partnerId
      })
    },
    async filterData() {
      await this.getReFinancesList({
        page: this.current_page,
        size: this.itemPerPage,
        modelNumber: this.filters.modelId,
        preFinanceNumber: this.filters.financeNumber,
        partner: this.filters.partnerId
      })
    }
  },
  mounted() {
    this.$store.commit('setPageTitle', this.$t('sidebar.calculations'))
  }
}
</script>

<style lang="scss">
.v-data-table-header {
  background-color: #E9EAEB;
}
</style>
