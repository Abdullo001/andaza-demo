<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model.trim="filters.modelNumber"
                :label="$t('listsModels.dialog.modelN')"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg filter"
                @keydown.enter="filterModel"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model.trim="filters.partner"
                :label="$t('listsModels.dialog.partner')"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg filter"
                @keydown.enter="filterModel"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-select
                v-model="filters.status"
                :label="$t('listsModels.dialog.status')"
                :items="status_enums"
                outlined dense hide-details
                validate-on-blur
                class="rounded-lg filter"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-spacer/>
            <v-col cols="12" lg="3">
              <div class="d-flex justify-end">
                <v-btn
                  width="140" outlined
                  color="#544B99" elevation="0"
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
                  @click.stop="resetFilter"
                >
                  {{ $t('listsModels.dialog.reset') }}
                </v-btn>
                <v-btn
                  width="140" color="#544B99" dark
                  elevation="0"
                  class="text-capitalize rounded-lg font-weight-bold"
                  @click="filterModel"
                >
                  {{ $t('listsModels.dialog.search') }}
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
      :items="allModels"
      :items-per-page="itemPrePage"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
      @click:row="(item) => viewDetails(item)"
      :server-items-length="totalElements"
      @update:page="page"
      @update:items-per-page="size"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex w-full align-center justify-space-between">
            <div>{{ $t('listsModels.dialog.models') }}</div>
            <v-btn
              color="#544B99"
              dark class="text-capitalize rounded-lg"
              @click="addModel"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t('listsModels.dialog.addModel') }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.status="{ item }">
        <v-select
          @click.stop
          @change="changeStatus(item)"
          :background-color="statusColor.color(item.status)"
          :items="status_enums"
          append-icon="mdi-chevron-down"
          v-model="item.status"
          hide-details
          class="mt-n2"
          rounded dark
        />
      </template>
      <template #item.actions="{item}">
        <v-tooltip top color="#544B99">
          <template v-slot:activator="{on, attrs}">
            <v-btn
              icon color="#544B99"
              v-on="on" v-bind="attrs"
              @click="viewDetails(item)"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <span>Details</span>
        </v-tooltip>
      </template>
      <template #item.licenceRequired="{ item }">
        <v-chip :color="statusColor.licenseColor(item.licenceRequired)" dark>
          {{ item.licenceRequired ? 'Yes' : 'No' }}
        </v-chip>
      </template>
      <template #item.fabricStatus="{ item }">
        <v-chip :color="statusColor.fabricModelStatus(item.fabricStatus)" dark>
          {{ item.fabricStatus }}
        </v-chip>
      </template>
      <template #item.accessoryStatus="{ item }">
        <v-chip :color="statusColor.fabricModelStatus(item.accessoryStatus)" dark>
          {{ item.accessoryStatus }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ModelMainPage',
  data() {
    return {
      new_dialog: false,
      filter_form: true,
      itemPrePage: 10,
      current_page: 0,
      filters: {
        modelNumber: '',
        partner: '',
        status: '',
        createdAt: ''
      },
      status_enums: ['ACTIVE', 'DISABLED', 'PENDING'],
      headers: [
        {text: "No.", value: 'ordinalNumber', sortable:false},
        {text: "Client", value: 'partner'},
        {text: "Style", align: 'start', sortable: false, value: 'modelNumber'},
        {text: "Category", value: 'modelGroup'},
        {text: "Final Inspection", value: 'inspectionDate'},
        {text: "Days left FI", value: 'differDays'},
        {text: "Fabric status", value: 'fabricStatus'},
        {text: this.$t('listsModels.table.modelName'), value: 'name'},
        {text: this.$t('listsModels.table.composition'), value: 'composition'},
        {text: "Accessory status", value: 'accessoryStatus'},
        {text: this.$t('listsModels.table.status'), value: 'status', width: 200},
        {text: this.$t('listsModels.table.actions'), value: 'actions'},
      ],
      allModels: []
    }
  },
  computed: {
    ...mapGetters({
      modelsList: 'models/modelsList',
      totalElements: 'models/totalElements',
    }),
  },
  watch: {
    modelsList: {
      handler(models) {
        this.allModels = JSON.parse(JSON.stringify(models));
      }
    }
  },
  methods: {
    ...mapActions({
      getModelsList: 'models/getModelsList',
      changeStatusModel: 'models/changeStatusModel'
    }),
    async page(value) {
      this.current_page = value - 1;
      await this.getModelsList({page: this.current_page, size: this.itemPrePage, modelNumber: '', partner: '', status: ''})

    },
    async size(value) {
      this.itemPrePage = value;
      await this.getModelsList({page: 0, size: this.itemPrePage, modelNumber: '', partner: '', status: ''})

    },
    async changeStatus(item) {
      await this.changeStatusModel(
        {id: item.id, status: item.status})
    },
    async resetFilter() {
      this.$refs.filters.reset();
      await this.getModelsList({page: 0, size: 50, modelNumber: '', partner: '', status: ''})
    },
    async filterModel() {
      await this.getModelsList({
        page: 0, size: 50,
        modelNumber: this.filters.modelNumber,
        partner: this.filters.partner,
        status: this.filters.status
      })
    },
    viewDetails(item) {
      this.$router.push(this.localePath(`/models/${item.id}`))
    },
    addModel() {
      this.$router.push(this.localePath(`/models/add-model`))
    }
  },
  async mounted() {
    this.$store.commit('setPageTitle', this.$t('listsModels.dialog.lists'));
    await this.getModelsList({page: 0, size: 10, modelNumber: '', partner: '', status: ''})
  }
}
</script>

<style lang="scss">
.el-input__inner {
  &::placeholder {
    color: #000 !important;
  }
}

.el-input__icon.el-icon-time {
  color: #777 !important;
  font-size: 18px;
}

.v-data-table-header {
  background-color: #E9EAEB;
}

tbody > tr {
  cursor: pointer;
}
</style>
