<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>
          Ready garment warehouse
          <v-chip color="#10BF41" dark class="ml-5 font-weight-bold">
            {{ title }}
          </v-chip>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-row>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">Order number</div>
            <v-text-field
              v-model="accessoryDetail.orderNumber"
              placeholder="Search by order number"
              validate-on-blur
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              :return-object="true"
              disabled
              color="#544B99"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">Model number</div>
            <v-combobox
              :items="modelData"
              v-model="accessoryDetail.modelNumber"
              placeholder="Search by model number"
              validate-on-blur
              item-text="modelNumber"
              item-value="id"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              :search-input.sync="search"
              color="#544B99"
              append-icon=""
            >
              <template #append>
                <v-icon color="#544B99">mdi-magnify</v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">Model name</div>
            <v-text-field
              v-model="accessoryDetail.modelName"
              validate-on-blur
              placeholder="Enter Model name"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">Client name</div>
            <v-text-field
              v-model="accessoryDetail.clientName"
              validate-on-blur
              placeholder="Enter Head of production department"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            />
          </v-col>
        </v-row>
        <v-row :class="showObject">
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">Fabric specification</div>
            <v-text-field
              v-model="accessoryDetail.fabricSpecification"
              validate-on-blur
              outlined
              hide-details
              height="44"
              dense
              placeholder="Enter fabric specification"
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">Season</div>
            <v-text-field
              v-model="accessoryDetail.season"
              validate-on-blur
              placeholder="Enter Season"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">Gender</div>
            <v-text-field
              v-model="accessoryDetail.gender"
              validate-on-blur
              placeholder="Enter Gender"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">Order date</div>
            <v-text-field
              v-model="accessoryDetail.orderDate"
              validate-on-blur
              placeholder="Enter order date"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">Deadline</div>
            <v-text-field
              v-model="accessoryDetail.deadline"
              validate-on-blur
              outlined
              hide-details
              placeholder="Enter deadline"
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">Order quantity</div>
            <v-text-field
              v-model="accessoryDetail.orderQuantity"
              validate-on-blur
              placeholder="Enter Created time"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              disabled
              color="#544B99"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="py-6">
        <v-spacer/>
        <ShowBtnComponent
          :click-btn="clickBtn"
          :show_btn_value="show_btn"
        />
        <v-spacer/>
      </v-card-actions>
    </v-card>
    <v-card class="elevation-0 rounded-lg mt-5">
      <v-tabs color="#544B99" v-model="accessory_tab">
        <v-tabs-slider color="#544B99"/>
        <v-tab
          class="text-capitalize"
          v-for="item in items"
          :key="item"
          color=""
        >
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-divider/>
      <v-tabs-items v-model="accessory_tab">
        <v-tab-item>
          <SortOne/>
        </v-tab-item>
        <v-tab-item>
          <SortTwo/>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-dialog max-width="590" v-model="image_dialog">
      <v-card>
        <v-card-title class="d-flex">
          <v-spacer/>
          <v-btn icon color="#544B99" large @click="image_dialog = false">
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
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import ShowBtnComponent from "@/components/ShowComponentBtn/ShowBtn.vue";
import SortOne from "@/components/Warehouse/sortOne.vue";
import SortTwo from "@/components/Warehouse/sortTwo.vue";

export default {
  components: {
    SortTwo,
    SortOne,
    ShowBtnComponent,
    Breadcrumbs,
  },
  data() {
    return {
      modelData: [],
      show_btn: true,
      accessoryDetail: {
        orderNumber: "",
        modelNumber: "",
        modelName: "",
        clientName: "",
        fabricSpecification: "",
        season: "",
        gender: "",
        orderDate: "",
        deadline: "",
        orderQuantity: ""
      },
      title: "Add",
      search: "",
      accessory_tab: null,
      items: [
        "1-sort",
        "2-sort",
      ],
      fields_status: true,
      currency_enums: ["USD", "UZS", "RUB"],
      map_links: [
        {
          text: "Home",
          disabled: false,
          to: "/",
          icon: true,
        },
        {
          text: "Ready garment warehouse",
          disabled: false,
          to: "/ready-warehouse",
          icon: true,
        },
        {
          text: "details",
          disabled: true,
          to: "/orders/7",
          icon: false,
        },
      ],
      image_dialog: false,
      currentImage: "",
    };
  },

  computed: {
    showObject() {
      return {
        show_active: this.show_btn
      }
    },
    ...mapGetters({
      warehouseDetail:"readyGarmentWarehouse/warehouseDetail",
    }),
  },
  watch: {
    warehouseDetail(item){
      this.accessoryDetail=JSON.parse(JSON.stringify(item))
    }
  },

  methods: {
    ...mapActions({
      getWarehouseDetail:"readyGarmentWarehouse/getWarehouseDetail",
    }),
    clickBtn() {
      this.show_btn = !this.show_btn
    },
    async saveBtn() {
      if (this.title === "Add") {
        await this.createPlanningAccessory({

          modelId: this.accessoryDetail.modelId,
          orderId: this.accessoryDetail.orderId,
        });
      } else if (this.title === "Edit") {
        await this.updatePlanningAccessory({

          id: this.$route.params.id,
          modelId: this.accessoryDetail.modelId,
          orderId: this.accessoryDetail.orderId,
        });
      }
    },

    showImage(image) {
      this.currentImage = image;
      this.image_dialog = true;
    },
  },

  mounted() {
    const id=this.$route.params.id
    this.getWarehouseDetail(id)
  },
};
</script>

<style lang="scss">
.image-box {
  background: #f8f4fe;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 158px;
  min-height: 132px;
}

.show_active {
  height: 0;
  overflow: hidden;
}
</style>
