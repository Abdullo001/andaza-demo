<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model.trim="filters.modelNumber"
                label="Model №"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg"
                @keydown.enter="filterModel"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model.trim="filters.partner"
                label="Partner"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg"
                @keydown.enter="filterModel"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-select
                v-model="filters.status"
                label="Status"
                :items="status_enums"
                outlined dense hide-details
                validate-on-blur
                class="rounded-lg"
                append-icon="mdi-chevron-down"
              />
            </v-col>
<!--            <v-col cols="12" lg="2" md="2">-->
<!--              <el-date-picker-->
<!--                v-model="filters.createdAt"-->
<!--                type="datetime"-->
<!--                placeholder="Created at"-->
<!--                :picker-options="pickerShortcuts"-->
<!--                value-format="dd.MM.yyyy HH:mm:ss"-->
<!--              >-->
<!--              </el-date-picker>-->
<!--            </v-col>-->
            <v-spacer/>
            <v-col cols="12" lg="3">
              <div class="d-flex justify-end">
                <v-btn
                  width="140" outlined
                  color="#397CFD" elevation="0"
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
                  @click.stop="resetFilter"
                >
                  Reset
                </v-btn>
                <v-btn
                  width="140" color="#397CFD" dark
                  elevation="0"
                  class="text-capitalize rounded-lg font-weight-bold"
                  @click="filterModel"
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
      :items="allModels"
      :items-per-page="10"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex w-full align-center justify-space-between">
            <div>Models</div>
            <v-btn
              color="#7631FF"
              dark class="text-capitalize rounded-lg"
              @click="addModel"
            >
              <v-icon>mdi-plus</v-icon>
              add model
            </v-btn>
          </v-toolbar-title>
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
        {text: 'Model №', align: 'start', sortable: false, value: 'modelNumber'},
        {text: 'Model name', value: 'name'},
        {text: 'Composition', value: 'composition'},
        {text: 'Model group', value: 'modelGroup'},
        {text: 'License', value: 'licenceRequired'},
        {text: 'Order o/d', value: 'order'},
        {text: 'Deadline', value: 'deadline'},
        {text: 'Status', value: 'status', width: 200},
        {text: 'Actions', value: 'actions'},
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
      this.$router.push(`/models/${item.id}`)
    },
    addModel() {
      this.$router.push(`/models/add-model`)
    }
  },
  async mounted() {
    this.$store.commit('setPageTitle', 'Lists');
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
