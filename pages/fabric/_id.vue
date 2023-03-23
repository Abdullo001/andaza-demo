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
              item-value="modelId"
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
              v-model="addFabric.modelName"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              v-model="addFabric.headOfProduction"
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
              <el-date-picker
                v-model="addFabric.deadlineForFabric"
                type="datetime"
                placeholder="Deadline for fabric"
                :picker-options="pickerOptions"
                format="dd.MM.yyyy HH:mm:ss"
                class="custom-picker"
              >
              </el-date-picker>
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <v-text-field
                v-model="addFabric.creatorOfPlanning"
                filled
                class="rounded-lg"
                color="#7631FF"
                dense
                label="Creator of planning"
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
              <v-col v-for="(image, idx) in 3" :key="idx" cols="12" lg="4" md="4">
                <div class="image-box">
                  <v-img
                    :src="modelImages[idx]?.filePath"
                    v-if="!!modelImages[idx]?.filePath"
                    max-height="150"
                    contain class="pointer"
                    @click="showImage(modelImages[idx]?.filePath)"
                  />
                  <v-img src="/default-image.svg" max-width="50" v-else/>
                </div>
              </v-col>
            </v-col>
            <v-col cols="12" lg="6" md="6" class="d-flex flex-wrap mt-4">
              <v-col cols="12" lg="6" class="pl-0 pt-0">
                <v-text-field
                  v-model="addFabric.creatorOfModel"
                  filled
                  class="rounded-lg"
                  color="#7631FF"
                  dense
                  label="Creator of Model"
                  disabled
                />
              </v-col>
              <v-col cols="12" lg="6" class="pt-0 pr-0">
                <v-text-field
                  v-model="addFabric.createdTimeOfModel"
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
                  v-model="addFabric.creatorOfOrder"
                  filled
                  class="rounded-lg"
                  color="#7631FF"
                  dense
                  label="Creator of order"
                  placeholder="Enter Modified person"
                  disabled
                />
              </v-col>
              <v-col cols="12" lg="6" class="pt-0 pr-0">
                <v-text-field
                  v-model="addFabric.createdTimeOfOrder"
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
    <v-card elevation="0" class="mt-3 rounded-lg">
      <v-card-text>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="#7631FF"
        >
          <v-tab
            v-for="item in items"
            :key="item"
            class="text-capitalize"

          >
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-divider/>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <FabricPlanningChart/>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card class="mt-3 rounded-lg elevation-0">
          <v-card-text>
            <FabricCalculation/>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card class="mt-3 rounded-lg elevation-0">
          <v-card-text>
            <FabricOrder/>
            <v-divider/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog max-width="590" v-model="image_dialog">
      <v-card>
        <v-card-title class="d-flex">
          <v-spacer/>
          <v-btn icon color="#7631FF" large @click="image_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-img :src="currentImage" height="500" contain/>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      image_dialog: false,
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
      orderSearch: '',
      modelSearch: '',
      items: [
        'Fabric planning chart',
        'List of fabrics to be ordered',
        'Planned fabric order',
        'Supply fabric',
        'Documentation'
      ],
      tab: null,
      currentImage: '',
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
    }
  },
  watch: {
    date(val) {
      if (!val) return null
      if(val.split('-')[0] > 1000) {
        const [year, month, day] = val.split('-')
        return this.date = `${day}-${month}-${year}`
      }
    },
    modelSearch(elem) {
      if (!(typeof elem === null || typeof elem === 'object')) {
        this.getModelName(elem)
      }
    },
    async "addFabric.modelNumber"(val) {
      if (typeof val !== null || !!Object.keys(val).length) {
        await this.getOrderNames(val?.id);
      }
    },
    fabricData(val) {
      this.addFabric = JSON.parse(JSON.stringify(val))
    },
    async addFabric(val) {
      await this.getImages(val.modelId);
      this.$store.commit('fabric/setModelId', val.modelId)
    }
  },
  computed: {
    ...mapGetters({
      modelNames: 'preFinance/modelNames',
      modelData: 'preFinance/modelData',
      fabricData: 'fabric/fabricData',
      modelImages: 'modelPhoto/modelImages',
    })
  },
  methods: {
    ...mapActions({
      getModelName: 'preFinance/getModelName',
      getOrderNames: 'fabric/getOrderNames',
      getImages: 'modelPhoto/getImages',
    }),
    showImage(image) {
      this.currentImage = image;
      this.image_dialog = true;
    },
  },
  mounted() {
    const param = this.$route.params.id;
    if (param === "create") {
      this.title = 'Add'
    } else this.title = 'Edit';

    this.$store.commit('modelPhoto/setModelImages', [])
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
  min-height: 90%;
}
.custom-picker {
  width: 100%;
  border: 0 !important;
  background: #F8F4FE;
  &::placeholder {
    color: #cccccc;
  }
  > .el-input__inner {
    background: #7631FF;
    border: 0 !important;
    &::placeholder {
      color: #cccccc;
    }
  }
}
</style>
