<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0" class="mt-2 rounded-lg">
      <v-card-title>
        <div>Planning of production</div>
        <v-chip color="green" dark class="ml-4">Edit</v-chip>
        <v-spacer/>
        <div>
          <v-btn outlined class="text-capitalize rounded-lg">
            <v-img src="/clear.svg" max-width="16" class="mr-2"/>
            clear
          </v-btn>
          <v-btn outlined class="text-capitalize rounded-lg ml-4">
            <v-img src="/edit.svg" max-width="16" class="mr-2"/>
            edit
          </v-btn>
        </div>
      </v-card-title>
      <v-divider/>
      <v-card-text class="pb-0">
        <v-row>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">Order number</div>
            <v-combobox
              v-model="planning.orderNumber"
              :items="orderList"
              :search-input.sync="orderSearch"
              item-text="orderNumber"
              item-value="orderId"
              filled disable-lookup
              class="rounded-lg"
              :return-object="true"
              color="#7631FF"
              dense disabled
              placeholder="Search by order number"
              append-icon=""
              label="Search by order number"
            >
            </v-combobox>
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">Model number</div>
            <v-combobox
              v-model="planning.modelNumber"
              :items="modelData"
              :search-input.sync="modelSearch"
              item-text="modelNumber"
              item-value="id"
              filled
              class="rounded-lg"
              :return-object="true"
              color="#7631FF"
              dense
              placeholder="Search by model number"
              append-icon="mdi-chevron-down"
              label="Search by model number"
            >
              <template #append>
                <v-icon color="#7631FF">mdi-magnify</v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">Model name</div>
            <v-text-field
              filled dense
              v-model="planning.modelName"
              class="rounded-lg"
              label="Enter model name"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">Client name</div>
            <v-text-field
              filled dense
              v-model="planning.clientName"
              class="rounded-lg"
              label="Enter client name"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">Responsible person</div>
            <v-text-field
              filled dense
              v-model="planning.responsiblePerson"
              class="rounded-lg"
              label="Enter responsible person"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">Responsible person</div>
            <v-text-field
              filled dense
              v-model="planning.planningCreator"
              class="rounded-lg"
              label="Enter planning creator"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">Head of production</div>
            <v-text-field
              filled dense
              v-model="planning.headOfProduction"
              class="rounded-lg"
              label="Enter head of production"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">Order status</div>
            <v-text-field
              filled dense
              v-model="planning.orderStatus"
              class="rounded-lg"
              label="Enter order status"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">Order opening date</div>
            <v-text-field
              filled dense
              v-model="planning.orderOpeningDate"
              class="rounded-lg"
              label="Enter order status"
              disabled
            >
              <template #append>
                <v-img src="/clock-disabled.svg" width="24"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">Order closing date</div>
            <v-text-field
              filled dense
              v-model="planning.orderClosingDate"
              class="rounded-lg"
              label="Enter order closing date"
              disabled
            >
              <template #append>
                <v-img src="/clock-disabled.svg" width="24"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">Deadline</div>
            <v-text-field
              filled dense
              v-model="planning.deadline"
              class="rounded-lg"
              label="Enter deadline"
              disabled
            >
              <template #append>
                <v-img src="/clock-disabled.svg" width="24"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">Shipping date</div>
            <v-text-field
              filled dense
              v-model="planning.shippingDate"
              class="rounded-lg"
              label="Enter shipping date"
              disabled
            >
              <template #append>
                <v-img src="/clock-disabled.svg" width="24"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">Overproduction, %</div>
            <v-text-field
              filled dense
              v-model="planning.overproduction"
              class="rounded-lg"
              label="Enter overproduction"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">Order quantity</div>
            <v-text-field
              filled dense
              v-model="planning.orderQuantity"
              class="rounded-lg"
              label="Enter overproduction"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="text-body-1 mb-3">Production quantity</div>
            <v-text-field
              filled dense
              v-model="planning.productionQuantity"
              class="rounded-lg"
              label="Enter production quantity"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="6" md="6" class="d-flex flex-wrap px-0">
            <v-col v-for="(image, idx) in 3" :key="idx" cols="12" lg="4" md="4">
              <div class="image-box">
<!--                <v-img-->
<!--                  :src="modelImages[idx]?.filePath"-->
<!--                  v-if="!!modelImages[idx]?.filePath"-->
<!--                  max-height="150"-->
<!--                  contain class="pointer"-->
<!--                  @click="showImage(modelImages[idx]?.filePath)"-->
<!--                />-->
                <v-img src="/default-image.svg" max-width="70"/>
              </div>
            </v-col>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-6">
        <v-spacer/>
        <v-btn
          width="130"
          height="40"
          color="#7631FF"
          class="font-weight-bold rounded-lg"
          dark
        >
          save
        </v-btn>
      </v-card-actions>
    </v-card>
    <ProductionPlanning class="mt-4"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ProductionOfPlanningPage',
  data() {
    return {
      planning: {
        orderNumber: '',
        modelNumber: '',
        modelName: '',
        clientName: '',
        responsiblePerson: '',
        planningCreator: '',
        headOfProduction: '',
        orderStatus: '',
        orderOpeningDate: '',
        orderClosingDate: '',
        deadline: '',
        shippingDate: '',
        overproduction: '',
        orderQuantity: '',
        productionQuantity: '',
      },
      orderList: [],
      modelList: [],
      orderSearch: '',
      modelSearch: '',
      map_links: [
        {
          text: this.$t('listsModels.child.home'),
          disabled: false,
          to: this.localePath('/'),
          icon: true
        },
        {
          text: 'Planning of production',
          disabled: false,
          to: this.localePath('/planning-production'),
          icon: true
        },
        {
          text: 'Details',
          disabled: true,
          to: this.localePath('/models/7'),
          icon: false
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      modelData: 'preFinance/modelData',
      infoToOrder: 'orders/infoToOrder'
    })
  },
  watch: {
    modelSearch(elem) {
      if (!(typeof elem === null || typeof elem === 'object')) {
        this.getModelName(elem)
      }
    },
    async "planning.modelNumber"(val) {
      if (typeof val !== null || !!Object.keys(val).length) {
        await this.getGivenPrice(val?.id);
      }

    },
    infoToOrder(val) {
      console.log(val);
    }
  },
  methods: {
    ...mapActions({
      getModelName: 'preFinance/getModelName',
      getGivenPrice: 'orders/getGivePrice'
    })
  }
}
</script>

<style lang="scss" scoped>
.image-box {
  background: #F8F4FE;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  min-height: 150px;
}
</style>
