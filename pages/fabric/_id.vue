<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0" class="mt-2 rounded-lg">
      <v-card-title>
        <div>{{ title }} Fabric</div>
        <v-spacer/>
        <div>
          <v-btn outlined class="text-capitalize rounded-lg border-grey">
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
          <v-col cols="12" lg="3" md="3">
            <v-combobox
              v-model="addFabric.orderNumber"
              :items="orderData"
              :search-input.sync="orderSearch"
              item-text="orderNumber"
              item-value="orderId"
              filled
              class="rounded-lg"
              :return-object="true"
              color="#7631FF"
              dense disabled
              label="Order number"
              placeholder="Enter order number"
              append-icon="mdi-chevron-down"
            >
              <template #append>
                <v-icon color="#7631FF">mdi-magnify</v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-combobox
              v-model="addFabric.modelNumber"
              :items="modelData"
              :search-input.sync="modelSearch"
              item-text="modelNumber"
              item-value="modelNumber"
              filled
              class="rounded-lg"
              :return-object="true"
              color="#7631FF"
              dense
              label="Model number"
              placeholder="Enter model number"
              append-icon="mdi-chevron-down"
            >
              <template #append>
                <v-icon color="#7631FF">mdi-magnify</v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Model name"
              placeholder="Model name"
              v-model="addFabric.modelName" disabled
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              v-model="addFabric.headOfProductionDepartment"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense disabled
              label="Head of production department"
              placeholder="Enter head of production department..."
              append-icon=""
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              v-model="addFabric.clientName"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense disabled
              label="Client name"
              placeholder="Enter client name..."
              append-icon=""
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              v-model="addFabric.orderPriority"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Order priority"
              placeholder="0"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              v-model="addFabric.deadlineOfOrder"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Deadline of order"
              placeholder="Enter deadline of order"
              disabled
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              v-model="addFabric.actualShippingDate"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Actual shipping date"
              disabled
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
          </v-col>
          <v-row class="px-3">
            <v-col cols="12" lg="3" md="3">
              <div class="text-body-1 font-weight-medium">Permission</div>
              <v-chip
                color="#10BF41"
                class="text-capitalize px-4 mt-3 font-weight-bold"
                dark>
                edit
              </v-chip>
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <v-text-field
                v-model="addFabric.deadlineForFabric"
                filled
                class="rounded-lg"
                color="#7631FF"
                dense
                label="Deadline for fabric"
                placeholder="Enter deadline for fabric"
              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <v-text-field
                v-model="addFabric.creatorOfPlanning"
                filled
                class="rounded-lg"
                color="#7631FF"
                dense
                label="Deadline for fabric"
                placeholder="Enter deadline for fabric"
                disabled
              />
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <v-text-field
                v-model="addFabric.createdAt"
                filled
                class="rounded-lg"
                color="#7631FF"
                dense
                label="Created time"
                disabled
              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="ma-0">
            <v-col cols="12" lg="6" md="6" class="d-flex flex-wrap px-0">
              <v-col v-for="(image, idx) in 3" :key="idx">
                <div class="image-box">
                  <v-img src="/default-image.svg" max-width="50"/>
                </div>
              </v-col>
            </v-col>
            <v-col cols="12" lg="6" md="6" class="d-flex flex-wrap mt-4">
              <v-col cols="12" lg="6" class="pl-0 pt-0">
                <v-text-field
                  v-model="addFabric.owner"
                  filled
                  class="rounded-lg"
                  color="#7631FF"
                  dense
                  label="Owner"
                  placeholder="Enter Owner"
                  disabled
                />
              </v-col>
              <v-col cols="12" lg="6" class="pt-0 pr-0">
                <v-text-field
                  v-model="addFabric.createdAt"
                  filled
                  class="rounded-lg"
                  color="#7631FF"
                  dense
                  label="Created time"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  disabled
                >
                  <template #append>
                    <v-img src="/date-icon.svg"/>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" class="pl-0 pt-0">
                <v-text-field
                  v-model="addFabric.modifiedPerson"
                  filled
                  class="rounded-lg"
                  color="#7631FF"
                  dense
                  label="Modified person"
                  placeholder="Enter Modified person"
                  disabled
                />
              </v-col>
              <v-col cols="12" lg="6" class="pt-0 pr-0">
                <v-text-field
                  v-model="addFabric.updatedAt"
                  filled
                  class="rounded-lg"
                  color="#7631FF"
                  dense
                  label="Updated time"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  disabled
                >
                  <template #append>
                    <v-img src="/date-icon.svg"/>
                  </template>
                </v-text-field>
              </v-col>
            </v-col>
          </v-row>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-6">
        <v-spacer/>
        <v-btn
          color="#7631FF"
          dark class="text-capitalize rounded-lg font-weight-bold"
          style="min-width: 130px;"
        >
          save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map_links: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
          icon: true
        },
        {
          text: 'Fabric',
          disabled: false,
          to: '/fabric',
          icon: true
        },
        {
          text: 'Details',
          disabled: true,
          to: '/fabric/7a42ec47-7351-4128-9db9-5236adbbfe6d',
          icon: false
        },
      ],
      title: 'Add',
      addFabric: {
        orderNumber: '',
        modelNumber: '',
        modelName: '',
        headOfProductionDepartment: '',
        clientName: '',
        orderPriority: '',
        deadlineOfOrder: '',
        actualShippingDate: '',
        permission: 'Edit',
        deadlineForFabric: '',
        creatorOfPlanning: '',
        createdTime: '',
        photosOfModels: [],
        createdAt: '',
      },
      orderData: [],
      modelData: [],
      orderSearch: '',
      modelSearch: ''
    }
  },
  computed: {},
  methods: {}
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
  min-height: 100%;
}
</style>
