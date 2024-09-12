<template>
  <div>
    <Breadcrumbs :maps="map_links" />
    <v-card elevation="0">
      <v-card-title>
        <div>{{ $t('readyWarehouse.garmentsOfStock.title') }}</div>
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-4">
        <v-form ref="order_detail" v-model="new_validate" lazy-validation>
          <v-row>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('readyWarehouse.garmentsOfStock.modelNumber') }}</div>
              <v-text-field
                v-model="garment.modelNumber"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('readyWarehouse.garmentsOfStock.modelNumber')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('readyWarehouse.garmentsOfStock.modelName') }}</div>
              <v-text-field
                v-model="garment.modelName"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('readyWarehouse.garmentsOfStock.modelName') "
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('listsModels.child.modelGroup') }}</div>
              <v-select
                v-model="garment.modelGroupId"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                :items="modelGroups"
                item-value="id"
                item-text="name"
                append-icon="mdi-chevron-down"
                :placeholder="$t('listsModels.child.modelGroup')"
                color="#544B99"
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('sidebar.composition') }}</div>
              <v-select
                :items="compositionList"
                item-text="name"
                item-value="id"
                v-model="garment.compositionId"
                :return-object="false"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                :placeholder="$t('sidebar.composition')"
                color="#544B99"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('modelBox.dialog.density') }} gr/m2</div>
              <v-text-field
                v-model="garment.density"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('modelBox.dialog.density')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('sidebar.fabricRework') }}</div>
              <v-select
                v-model="garment.fabricReworkId"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                :items="reworkThinList"
                item-text="name"
                item-value="id"
                append-icon="mdi-chevron-down"
                style="max-width: 400px"
                :placeholder="$t('sidebar.fabricRework')"
                color="#544B99"
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t("listsModels.child.season") }}</div>
              <v-select
                v-model="garment.season"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                :items="season_enums"
                item-value="key"
                item-text="text"
                append-icon="mdi-chevron-down"
                style="max-width: 400px"
                :placeholder="$t('listsModels.child.selectSeason')"
                color="#544B99"
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t("listsModels.child.gender") }}</div>
              <v-select
                v-model="garment.gender"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                :items="gander_enums"
                append-icon="mdi-chevron-down"
                style="max-width: 400px"
                :placeholder="$t('listsModels.child.selectGender')"
                color="#544B99"
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t("listsModels.child.creator") }}</div>
              <v-text-field
                v-model="garment.createdBy"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                style="max-width: 400px"
                placeholder="Created by"
                disabled
              />
            </v-col>

            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t("listsModels.child.createdTime") }}</div>
              <v-text-field
                v-model="garment.createdAt"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                color="#544B99"
                dense
                placeholder="dd.MM.yyyy HH:mm:ss"
                disabled
              >
                <template #append>
                  <v-img src="/date-icon.svg" />
                </template>
              </v-text-field>
            </v-col>
            <!-- <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Client name</div>
              <v-text-field
                v-model="order.client"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                placeholder=" client name"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Model number</div>
              <v-combobox
                v-model="order.modelNumber"
                :items="modelList"
                :return-object="true"
                :search-input.sync="modelIdSearch"
                class="rounded-lg base d-flex align-center justify-center mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                item-text="modelNumber"
                item-value="id"
                outlined
                placeholder="Enter model number"
                prepend-icon=""
                @change="(e) => setModelName(e)"
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Model name</div>
              <v-text-field
                v-model="order.modelName"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                placeholder="Enter"
                validate-on-blur
              />
            </v-col>
          </v-row>
          <v-row :class="showObject">
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Head of production depatment</div>
              <div class="search-field">
                <v-combobox
                  v-model="order.headOfDepartment"
                  :items="users"
                  :return-object="true"
                  :search-input.sync="HODSearch"
                  class="rounded-lg base d-flex align-center justify-center"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  item-text="name"
                  item-value="id"
                  outlined
                  placeholder="Enter responsible person"
                  prepend-icon=""
                  style="margin-bottom:22px"
                >
                  <template #append>
                    <v-icon class="d-inline-block" color="#544B99">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Over-production</div>
              <v-text-field
                v-model="order.overproductionPercent"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Enter over production"
                suffix="%"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Price with discount</div>
              <div class="d-flex align-center">
                <v-text-field
                  v-model="order.priceWithDiscount"
                  disabled
                  class="rounded-lg base rounded-l-lg rounded-r-0"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  placeholder="0.00"
                  validate-on-blur
                />
                <v-select
                  v-model="order.priceWithDiscountCurrency"
                  disabled
                  :items="currency_enums"
                  append-icon="mdi-chevron-down"
                  class="rounded-lg base rounded-r-lg rounded-l-0"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  style="max-width: 100px"
                  validate-on-blur
                />
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Total</div>
              <div class="d-flex align-center">
                <v-text-field
                  disabled
                  v-model="order.totalPrice"
                  class="rounded-lg base rounded-l-lg rounded-r-0"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  placeholder="0.00"
                  readonly
                  validate-on-blur
                />
                <v-select
                  disabled
                  v-model="order.priceWithDiscountCurrency"
                  :items="currency_enums"
                  append-icon="mdi-chevron-down"
                  class="rounded-lg base rounded-r-lg rounded-l-0"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  style="max-width: 100px"
                  validate-on-blur
                />
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Order date</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="order.orderDate"
                  :picker-options="pickerShortcuts"
                  class="base_picker"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  style="width: 100%; height: 100%"
                  type="datetime"
                  value-format="dd.MM.yyyy HH:mm:ss"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Deadline</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="order.deadline"
                  :picker-options="pickerShortcuts"
                  class="base_picker"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  style="width: 100%; height: 100%"
                  type="datetime"
                  value-format="dd.MM.yyyy HH:mm:ss"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Order priority</div>
              <v-select
                v-model="order.priority"
                :background-color="statusColor.priorityColor(order.priority)"
                :items="priority_enums"
                append-icon="mdi-chevron-down"
                class="rounded-lg base"
                dark
                dense
                height="44"
                hide-details
                outlined
                placeholder="Select order priority"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3">
              <div class="label">Planned Accessory expense for 1 set</div>
              <div class="d-flex align-center">
                <v-select
                  v-model="expenseGroupId"
                  :items="expenseGroup"
                  item-value="id"
                  item-text="name"
                  append-icon="mdi-chevron-down"
                  class="rounded-lg base rounded-l-lg rounded-r-0 mr-1"
                  color="#544B99"
                  dense
                  placeholder="Expense group"
                  height="44"
                  hide-details
                  outlined
                  style="max-width: 200px"
                  validate-on-blur
                />
                <v-text-field
                  disabled
                  v-model="expense.totalPrice"
                  class="rounded-lg base rounded-l-0 rounded-r-0 mr-1"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  placeholder="0.00"
                  readonly
                  validate-on-blur
                />
                <v-text-field
                  disabled
                  v-model="expense.currency"
                  class="rounded-lg base rounded-l-0 rounded-r-lg"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  placeholder="Currency"
                  readonly
                  validate-on-blur
                />
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Description</div>
              <v-textarea
                v-model="order.description"
                auto-grow
                class="rounded-lg base"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Enter description"
                rows="1"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Creator</div>
              <v-text-field
                v-model="order.creator"
                background-color="#F8F4FE"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                placeholder="Enter creator"
                readonly
                validate-on-blur
              />
            </v-col>

            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Created time</div>
              <v-text-field
                v-model="order.createdTime"
                background-color="#F8F4FE"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                placeholder="Created at"
                readonly
                validate-on-blur

              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Modified person</div>
              <v-text-field
                v-model="order.modifiedPerson"
                background-color="#F8F4FE"
                class="rounded-lg base"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                placeholder="Enter Modified person"
                readonly
                validate-on-blur

              />
            </v-col>


            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Updated time</div>
              <v-text-field
                v-model="order.updatedTime"
                background-color="#F8F4FE"
                class="rounded-lg base"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                placeholder="Update at"
                readonly
                validate-on-blur
              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
            </v-col> -->
            <v-col class="d-flex justify-end align-end" cols="12">
              <v-btn
                v-if="pageStatus === 'new'"
                class="text-capitalize rounded-lg"
                color="#544B99"
                dark
                height="44"
                width="130"
                @click="createdNewGarment"
              >
              {{ $t('userManagement.child.save') }}
              </v-btn>
              <v-btn
                v-else
                class="text-capitalize rounded-lg"
                color="#544B99"
                dark
                height="44"
                width="130"
                @click="updateFunc"
              >
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card class="mt-6" flat>
      <v-tabs v-model="tab">
        <v-tabs-slider color="#544B99" />
        <v-tab
          class="text-capitalize"
          v-for="item in tabs"
          :key="item"
          active-class="active-tab"
        >
          {{ item }}
        </v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <Calculation />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <Sizes />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <SizeDistribution />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <ModelPhoto />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <Documents />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <Selling />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>
<script>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import Calculation from "@/components/StockGarment/Calculation.vue";
import Sizes from "@/components/StockGarment/Sizes.vue";
import SizeDistribution from "@/components/StockGarment/SizeDistribution.vue";
import ModelPhoto from "@/components/StockGarment/ModelPhoto.vue";
import Documents from "@/components/StockGarment/Documents.vue";
import Selling from "@/components/StockGarment/Selling.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Breadcrumbs,
    Calculation,
    Sizes,
    SizeDistribution,
    ModelPhoto,
    Documents,
    Selling,
  },

  data() {
    return {
      tab: "",
      tabs: [
       this.$t('readyWarehouse.garmentsOfStock.calculation'),
       this.$t('readyWarehouse.garmentsOfStock.sizes'),
        this.$t('readyWarehouse.garmentsOfStock.quantitiesBySizes'),
       this.$t('readyWarehouse.garmentsOfStock.modelPhoto'),
        this.$t('readyWarehouse.garmentsOfStock.documents'),
        this.$t('readyWarehouse.garmentsOfStock.selling'),
      
      ],
      map_links: [
        {
          text: "Home",
          disabled: false,
          to: "/",
          icon: true,
        },
        {
          text: "Ready Garment",
          disabled: false,
          to: "/ready-warehouse",
          icon: true,
        },
        {
          text: "Garments of stock",
          disabled: false,
          to: "/garments-stock",
          icon: true,
        },
        {
          text: "Garment details",
          disabled: true,
          to: "/garments-stock/2",
          icon: false,
        },
      ],
      pageStatus: "new",
      new_validate: true,

      garment: {
        modelNumber: "",
      },

      season_enums: [
        { key: "SS", text: "Spring/Summer" },
        { key: "AW", text: "Autumn/Winter" },
      ],
      gander_enums: ["MALE", "FEMALE", "BOY", "GIRL", "UNISEX"],
    };
  },

  created() {
    this.getModelGroup();
    this.getCompositionList();
    this.getReworkThinList();
  },

  computed: {
    ...mapGetters({
      modelGroups: "models/modelGroups",
      compositionList: "models/compositionList",
      reworkThinList: "fabricRework/reworkThinList",
      stockItem: "garmentStock/stockItem",
    }),
  },

  watch: {
    stockItem(val) {
      this.garment = JSON.parse(JSON.stringify(val));
    },
  },

  methods: {
    ...mapActions({
      getModelGroup: "models/getModelGroup",
      getCompositionList: "models/getCompositionList",
      getReworkThinList: "fabricRework/getReworkThinList",
      createStock: "garmentStock/createStock",
      getStock: "garmentStock/getStock",
      updateStock: "garmentStock/updateStock",
    }),
    createdNewGarment() {
      this.createStock(this.garment);

    },
    updateFunc() {
      const data = {
        compositionId: this.garment.compositionId,
        density: this.garment.density,
        fabricReworkId: this.garment.fabricReworkId,
        gender: this.garment.gender,
        id: this.garment.id,
        modelGroupId: this.garment.modelGroupId,
        modelName: this.garment.modelName,
        modelNumber: this.garment.modelNumber,
        season: this.garment.season,
      };
      this.updateStock({ id: data.id, data });
    },
  },

  mounted() {
    const id = this.$route.params.id;
    if (id !== "add-garment") {
      this.getStock(id);
      this.pageStatus = "edit";
    }
  },
};
</script>
<style lang="scss" scoped>
.active-tab {
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #544b99;
}
</style>
