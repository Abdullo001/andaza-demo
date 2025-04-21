<template>
  <div>
    <v-card elevation="0" class="rounded-lg mb-4">
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
                item-text="value"
                item-value="key"
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
    <VDataTableWrapper :headers="headers" :items="allModels" :totalElements="totalElements" :callerFunction="getModelsList" :fixedColumns="6" :rowFunction="viewDetails">
      <template #top>
        <v-toolbar elevation="0" class="rounded-lg">
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
          item-value="key"
          item-text="value"
          append-icon="mdi-chevron-down"
          v-model="item.status"
          hide-details
          class="mt-n2"
          rounded dark
        />
      </template>
      <template #item.inspectionDate="{item}">
        {{ item.inspectionDate?formatLong(item.inspectionDate):"" }}
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
        <v-tooltip top color="#544B99">
          <template #activator="{on, attrs}">
            <v-btn
              icon class="ml-2"
              v-on="on"
              v-bind="attrs"
              @click.stop="getModelPassport(item.id)"
            >
              <v-img src="/download.svg" max-width="24"/>
            </v-btn>
          </template>
          <span>Download</span>
        </v-tooltip>
      </template>
      <template #item.licenceRequired="{ item }">
        <v-chip :color="statusColor.licenseColor(item.licenceRequired)" dark>
          {{ item.licenceRequired ? 'Yes' : 'No' }}
        </v-chip>
      </template>
      <template #item.fabricStatus="{ item }">
        <StatusBtn :status="item.fabricStatus" :url="`/fabric`" :param="item.fabricPlanningId ? `${item.fabricPlanningId}`:'create'" />
      </template>
      <template #item.accessoryStatus="{ item }">
        <StatusBtn :status="item.accessoryStatus" :url="`/accessory`" :param="item.accessoryPlanningId ? `${item.accessoryPlanningId}`:'create'" />
      </template>
      <template #item.modelCreating="{ item }">
        <StatusBtn :status="item.modelCreating" :url="`/models`" :param="`${item.id}`" />
      </template>
      <template #item.calculation="{ item }">
        <StatusBtn :status="item.calculation" :url="`/prefinances`" :param="item.preFinanceId?`${item.preFinanceId}`:'create'" />
      </template>
      <template #item.orderForming="{ item }">
        <StatusBtn :status="item.orderForming" :url="`/orders`" :param="item.orderId?`${item.orderId}?modelId=${item.id}`:'add-order'" />
      </template>
      <template #item.printAdding="{ item }">
        <StatusBtn :status="item.orderForming" :url="`/orders`" :param="item.orderId?`${item.orderId}?modelId=${item.id}`:'add-order'" />
      </template>
      <template #item.sampleStatus="{ item }">
        <StatusBtn :status="item.sampleStatus" :url="`/samples`" :param="item.samplePlanningId?`${item.samplePlanningId}`:'create-sample'" />
      </template>
      <template #item.cutting="{ item }">
        <StatusBtn :status="item.cutting" :url="`/production`" :param="item.productionId?`${item.id}`:'create'" :productionId="item.productionId"/>
      </template>
      <template #item.printing="{ item }">
        <StatusBtn :status="item.printing" :url="`/production`" :param="item.productionId?`${item.id}`:'create'" :productionId="item.productionId"/>
      </template>
      <template #item.supplyWarehouse="{ item }">
        <StatusBtn :status="item.supplyWarehouse" :url="`/supply-warehouse`" :param="''" />
      </template>
      <template #item.sewing="{ item }">
        <StatusBtn :status="item.sewing" :url="`/production`" :param="item.productionId?`${item.id}`:'create'" :productionId="item.productionId"/>
      </template>
      <template #item.packaging="{ item }">
        <StatusBtn :status="item.packaging" :url="`/production`" :param="item.productionId?`${item.id}`:'create'" :productionId="item.productionId"/>
      </template>
      <template #item.readyGarmentWarehouse="{ item }">
        <StatusBtn :status="item.readyGarmentWarehouse" :url="`/ready-warehouse`" :param="''" />
      </template>
      <template #item.finalInspection="{ item }">
        <StatusBtn :status="item.finalInspection" :url="`/inspection-file`" :param="item.id ? `${item.id}`:''" />
      </template>
      <template #item.shipment="{ item }">
        <StatusBtn :status="item.shipment" :url="`/shipping`" :param="''" />
      </template>
    </VDataTableWrapper>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import VDataTableWrapper from "../../components/UI/VDataTableWrapper.vue";
import StatusBtn from "../../components/Model/StatusBtn.vue";

export default {
  name: 'ModelMainPage',
  components: {
    VDataTableWrapper,
    StatusBtn
  },
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
      status_enums: [{key:'ACTIVE',value:this.$t('statusItems.active')}, {key:'DISABLED',value:this.$t('statusItems.disabled')}, {key:'PENDING',value:this.$t('statusItems.pending')}, {key:'CANCELED',value:this.$t('statusItems.cancelled')}],
      headers: [
        {text: this.$t('modelBox.table.no'), value: 'ordinalNumber', fixed: true, sortable:false},
        {text: this.$t('modelBox.table.client'), value: 'partner', fixed: true, sortable:false},
        {text: this.$t('modelBox.table.style'), align: 'start', fixed: true, sortable: false, value: 'modelNumber'},
        {text: this.$t('modelBox.table.category'), value: 'modelCategory', fixed: true, sortable:false},
        {text: this.$t('modelBox.table.inspectionDate'), value: 'inspectionDate', fixed: true, sortable:false},
        {text: this.$t('modelBox.table.daysLeftFl'), value: 'differDays', fixed: true, width: 120 },
        {text:this.$t('modelBox.table.modelCreating'), value: 'modelCreating',sortable:false},
        {text: this.$t('modelBox.table.priceCalculation'), value: 'calculation',sortable:false},
        {text: this.$t('modelBox.table.orderForming'), value: 'orderForming',sortable:false},
        {text: this.$t('modelBox.table.addingPrint'), value: 'printAdding',sortable:false},
        {text:this.$t('modelBox.table.fabricStatus'), value: 'fabricStatus',sortable:false},
        {text: this.$t('modelBox.table.sampleStatus'), value: 'sampleStatus',sortable:false},
        {text: this.$t('modelBox.table.accessoryStatus'), value: 'accessoryStatus', sortable:false},
        {text: this.$t('modelBox.table.cutting'), value: 'cutting', sortable:false},
        {text:this.$t('modelBox.table.printing'), value: 'printing', sortable:false},
        {text: this.$t('modelBox.table.supplyWarehouse'), value: 'supplyWarehouse', sortable:false},
        {text:this.$t('modelBox.table.sewing'), value: 'sewing', sortable:false},
        {text:this.$t('modelBox.table.packaging'), value: 'packaging', sortable:false},
        {text: this.$t('modelBox.table.readyGarmentWarehouse'), value: 'readyGarmentWarehouse', sortable:false},
        {text: this.$t('modelBox.table.finalInspection'), value: 'finalInspection', sortable:false},
        {text: this.$t('modelBox.table.shipment'), value: 'shipment', sortable:false},
        {text: this.$t('listsModels.table.status'), value: 'status', width: 200, sortable:false},
        {text: this.$t('listsModels.table.actions'), value: 'actions',width: 120, sortable:false},
      ],
      allModels: [],
    }
  },
  computed: {
    ...mapGetters({
      modelsList: 'models/modelsList',
      totalElements: 'models/totalElements',
      pdfLoading: 'models/pdfLoading',
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
      changeStatusModel: 'models/changeStatusModel',
      getModelPassport: 'models/getModelPassport',
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
