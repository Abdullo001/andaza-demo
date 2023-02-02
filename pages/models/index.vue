<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filters.modelNumber"
                label="Model №"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filters.companyName"
                label="Company name"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg"
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
            <v-col cols="12" lg="2" md="2">
              <el-date-picker
                v-model="filters.order"
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
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
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
      :items="modelsList"
      :items-per-page="10"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
      @click:row="(item) => viewDetails(item)"
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
              <v-icon>mdi-plus</v-icon>add model
            </v-btn>
          </v-toolbar-title>
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
          rounded dark
        />
      </template>
      <template #item.licenceRequired="{ item }">
        <v-chip :color="statusColor.licenseColor(item.licenceRequired)" dark>
          {{item.licenceRequired ? 'Yes' : 'No'}}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      new_dialog: false,
      filter_form: true,
      filters: {
        modelNumber: '',
        companyName: '',
        status: '',
        order: ''
      },
      status_enums: ['ACTIVE', 'DISABLED', 'PENDING'],
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
      headers: [
        {text: 'Model №', align: 'start', sortable: false, value: 'modelNumber'},
        {text: 'Model name', value: 'name'},
        {text: 'Composition', value: 'composition', width: 280},
        {text: 'Model group', value: 'modelGroup'},
        {text: 'License', value: 'licenceRequired'},
        {text: 'Order o/d', value: 'order'},
        {text: 'Deadline', value: 'deadline'},
        {text: 'Status', value: 'status', width: 200},
      ],
      // modelsList: [
      //   {
      //     id: 1,
      //     modelNumber: '123456',
      //     modelName: 'Women T-shirt.',
      //     companyName: 'ARTEX LLC',
      //     modelGroup: 'T-shirt',
      //     license: 'No',
      //     order: '12.10.2022 12:25:08',
      //     deadline: '12.10.2022 12:25:08',
      //     status: 'ACTIVE'
      //   },
      //   {
      //     id: 2,
      //     modelNumber: '123499',
      //     modelName: 'Women T-shirt.',
      //     companyName: 'ARTEX LLC',
      //     modelGroup: 'T-shirt',
      //     license: 'Yes',
      //     order: '12.10.2022 12:25:08',
      //     deadline: '12.10.2022 12:25:08',
      //     status: 'PENDING'
      //   },
      // ],

    }
  },
  computed: {
    ...mapGetters({
      modelsList: 'models/modelsList'
    }),

  },
  methods: {
    ...mapActions({
      getModelsList: 'models/getModelsList'
    }),
    changeStatus() {},
    resetSearch() {},
    filterCompany() {},
    viewDetails(item) {
      this.$router.push(`/models/${item.id}`)
    },
    addModel() {
      this.$router.push(`/models/add-model`)
    }
  },
  async mounted() {
    this.$store.commit('setPageTitle', 'Lists');
    await this.getModelsList({page: 0, size:10})
  }
}
</script>

<style lang="scss">
.el-input__inner {
  &::placeholder {
    color: #777 !important;
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
