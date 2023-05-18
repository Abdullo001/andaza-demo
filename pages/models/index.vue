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
                class="rounded-lg"
                @keydown.enter="filterModel"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model.trim="filters.partner"
                :label="$t('listsModels.dialog.partner')"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg"
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
                class="rounded-lg"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-spacer/>
            <v-col cols="12" lg="3">
              <div class="d-flex justify-end">
                <v-btn
                  width="140" outlined
                  color="#397CFD" elevation="0"
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
                  @click.stop="resetFilter"
                >
                  {{ $t('listsModels.dialog.reset') }}
                </v-btn>
                <v-btn
                  width="140" color="#397CFD" dark
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
      :items-per-page="10"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
      @click:row="(item) => viewDetails(item)"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex w-full align-center justify-space-between">
            <div>{{ $t('listsModels.dialog.models') }}</div>
            <v-btn
              color="#7631FF"
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
        <v-btn icon @click="viewDetails(item)">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </template>
      <template #item.licenceRequired="{ item }">
        <v-chip :color="statusColor.licenseColor(item.licenceRequired)" dark>
          {{ item.licenceRequired ? 'Yes' : 'No' }}
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
      filters: {
        modelNumber: '',
        partner: '',
        status: '',
        createdAt: ''
      },
      status_enums: ['ACTIVE', 'DISABLED', 'PENDING'],
      headers: [
        {text: this.$t('listsModels.table.modelN'), align: 'start', sortable: false, value: 'modelNumber'},
        {text: this.$t('listsModels.table.modelName'), value: 'name'},
        {text: this.$t('listsModels.table.composition'), value: 'composition'},
        {text: this.$t('listsModels.table.modelGroup'), value: 'modelGroup'},
        {text: this.$t('listsModels.table.license'), value: 'licenceRequired'},
        {text: this.$t('listsModels.table.order'), value: 'order'},
        {text: this.$t('listsModels.table.deadline'), value: 'deadline'},
        {text: this.$t('listsModels.table.status'), value: 'status', width: 200},
        {text: this.$t('listsModels.table.actions'), value: 'actions'},
      ],
      allModels: []
    }
  },
  computed: {
    ...mapGetters({
      modelsList: 'models/modelsList'
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
    await this.getModelsList({page: 0, size: 50, modelNumber: '', partner: '', status: ''})
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
