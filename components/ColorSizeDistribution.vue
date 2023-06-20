<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="orderSizeList"
      :items-per-page="50"
      class="elevation-0"
      hide-default-footer
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class=" d-flex w-full align-center justify-space-between">
            <div>
              <v-btn
                class="rounded-lg text-capitalize mr-2 colorSizeBtn"
                outlined
              >
                Supply
              </v-btn>
              <v-btn
                class="rounded-lg text-capitalize colorSizeBtn"
                style="color: rgb(119, 124, 133); caret-color: rgb(119, 124, 133)"
                outlined
              >
                Cutting info
              </v-btn>
            </div>
            <v-btn
              color="#7631FF"
              dark
              class="text-capitalize rounded-lg"
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
              Add row
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.actions="{ item }">
        <div>
          <v-btn icon class="mr-2" @click="edit()">
            <v-img src="/edit-green.svg" max-width="20"/>
          </v-btn>
          <v-btn icon @click="delete_dialog = true">
            <v-img src="/trash-red.svg" max-width="20"/>
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="edit_dialog" max-width="572">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>Edit color/Size</div>
          <v-btn @click="edit_dialog = !edit_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">

            <v-row class="mb-4 ">
              <v-col cols="12">
                <div class="label">Main color</div>
                <v-text-field
                  placeholder="Enter main color"
                  single-line
                  outlined
                  hide-details
                  height="44"
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">Color code</div>
                <v-text-field
                  placeholder="Enter color code"
                  single-line
                  outlined
                  hide-details
                  height="44"
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>
            </v-row>

            <v-row class="mb-4 d-flex justify-space-between">
              <v-col
                cols="6"
                v-for="(item, idx) in orderSizeDetail.modelBodyParts"
                :key="idx"
              >
                <div class="label">{{ item.bodyPart }}</div>
                <v-select
                  v-model="item.value "
                  :items="colorsList"
                  append-icon="mdi-chevron-down"
                  :placeholder="item.bodyPart"
                  outlined
                  item-text="name"
                  item-value="name"
                  single-line
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  color="#7631FF"
                  dense
                />
              </v-col>
            </v-row>
            
            <v-row class="mb-4 d-flex justify-space-between">
              <v-col
                cols="3"
                v-for="(item, idx) in orderSizeDetail.sizeDistributions"
                :key="idx"
              >
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
                  :placeholder="item.size"
                  single-line
                  outlined
                  hide-details
                  height="44"
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>
            </v-row>

            <v-card-actions class="d-flex justify-center pb-6">
              <v-btn
                outlined
                class="text-capitalize rounded-lg font-weight-bold mr-6"
                color="#7631FF"
                width="163"
                @click="edit_dialog = !edit_dialog"
              >cancel
              </v-btn>
              <v-btn
                class="text-capitalize rounded-lg font-weight-bold"
                color="#7631FF"
                dark
                v-if="this.$route.params.id !== `add-order`"
                width="163"
                @click="update"
              >update
              </v-btn>
              <v-btn
                class="text-capitalize rounded-lg font-weight-bold"
                color="#7631FF"
                dark
                v-else
                width="163"
                @click="updateNewOrder"
              >save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center"
        >Delete Color/Size distribution
        </v-card-title
        >
        <v-card-text>
          Are you sure you want to Delete Color/Size distribution?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            cancel
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteSizeDistribution"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "ColorSizeDistribution",
  data() {
    return {
      new_dialog: false,
      edit_dialog: false,
      delete_dialog: false,
      new_validate: true,
      
      templeHeaders: [
        {text: "Total", sortable: false, value: "total"},
        {text: "Over-production %", sortable: false, value: "overproductionPercent"},
        {text: "Total with overproduction", sortable: false, value: "totalWithOverproductionPercent"},
        {text: "Actions", sortable: false, align: "center", value: "actions"},
      ],

      templaFirstHeaders:[
        {text: "Main color ", sortable: false, value: "mainColor"},
        {text: "Color code ", sortable: false, value: "colorCode"},
        ],
      headerSizes: [],
      headerBodyPart: [],
      headers: [],
      item: {},
      newModelId: null,
      newOrderId: null,
      size_list_value: {},
      orderSizeList: [],
      size_value_list: {},
      orderSizeDetail: {
        modelBodyParts: [],
        sizeDistributions: [],
      },
      modelId: this.$route.query.modelId,
    };
  },

  created(){
    this.getColorsList()
  },

  computed: {
    ...mapGetters({
      sizes: "sizeDistribution/sizes",
      bodyParts: "sizeDistribution/bodyParts",
      sizeValues: "sizeDistribution/sizeValues",
      bodyPartValues: "sizeDistribution/bodyPartValues",
      totalItem: "sizeDistribution/total",
      newModelIdServer: "orders/newModelId",
      newOrderIdServer: "orders/newOrderId",
      overproductionPercent: "sizeDistribution/overproductionPercent",
      totalWithOverproductionPercent: "sizeDistribution/totalWithOverproductionPercent",
      colorsList: "sizeDistribution/colorsList",
    }),
  },

  watch: {
    size_list_value(items) {
      const value = {};
      for (let item in items) {
        const sizeObj = {
          size: items[item],
          quantity: 0,
        };
        value[item] = items[item];
        this.orderSizeDetail.sizeDistributions.push(sizeObj);
      }
      this.item = {...this.item, ...value};
      this.orderSizeList.shift();
      if (items.length !== 0) {
        this.orderSizeList.push(this.item);
      }
    },
    newOrderIdServer: {
      deep: true,
      handler(id) {
        this.newOrderId = id;
      },
    },

    newModelIdServer: {
      deep: true,
      handler(id) {
        this.newModelIdId = id;
      },
    },
    sizes(list) {
      this.size_list_value = JSON.parse(JSON.stringify(list));
      this.headerSizes = [];
      list.forEach((item) => {
        const res = {text: item, sortable: false, value: item};
        this.headerSizes.push(res);
      });
      this.headers = [...this.headerSizes, ...this.templeHeaders];
    },
    bodyParts(items) {
      this.headerBodyPart = [];
      for (let item in items) {
        const res = {text: item, sortable: false, value: item};
        this.headerBodyPart.push(res);
      }
      this.headers = [...this.templaFirstHeaders,...this.headerBodyPart, ...this.headers];
    },
    bodyPartValues(items) {
      this.orderSizeDetail.modelBodyParts = [];
      this.orderSizeList[0] = {};
      const value = {};
      for (let item in items) {
        const part = {
          bodyPart: item,
          value: items[item],
          bodyPartId: this.bodyParts[item],
        };
        value[item] = items[item];
        this.orderSizeDetail.modelBodyParts.push(part);
      }
      this.item = {...value};
    },

    sizeValues(items) {
      if (Object.keys(items).length !== 0) {
        this.orderSizeDetail.sizeDistributions = [];
        const value = {};
        for (let item in items) {
          const sizeObj = {
            size: item,
            quantity: items[item],
          };
          value[item] = items[item];
          this.orderSizeDetail.sizeDistributions.push(sizeObj);
        }
        this.item = {...this.item, ...value};
        this.orderSizeList.shift();
        this.orderSizeList.push(this.item);
      }
    },
    totalItem(val) {
      this.item.total = val.total;
    },
    totalWithOverproductionPercent(val) {
      this.item.totalWithOverproductionPercent = val.totalWithOverproductionPercent
    },
    overproductionPercent(val) {
      this.item.overproductionPercent = val.overproductionPercent
    },
  },
  methods: {
    ...mapActions({
      getSizeDistribution: "sizeDistribution/getSizeDistribution",
      getSizeDistributionValue: "sizeDistribution/getSizeDistributionValue",
      updateSizeDistributionValue:
        "sizeDistribution/updateSizeDistributionValue",
      deleteSizeDistributionFunc: "sizeDistribution/deleteSizeDistributionFunc",
      getColorsList: "sizeDistribution/getColorsList",
    }),
    edit() {
      this.edit_dialog = !this.edit_dialog;
    },
    async updateNewOrder() {
      await this.updateSizeDistributionValue({
        ...this.orderSizeDetail,
        modelId: this.$store.getters["orders/newModelId"],
        orderId: this.$store.getters["orders/newOrderId"],
      });
      this.edit_dialog = !this.edit_dialog;
    },
    async update() {
      this.orderSizeDetail.modelBodyParts.map(elem => {
        delete elem.bodyPart
      })
      const item = this.orderSizeDetail
      await this.updateSizeDistributionValue({
        ...item,
        modelId: this.modelId,
        orderId: this.$route.params.id,
      });
      this.edit_dialog = !this.edit_dialog;
    },

    deleteSizeDistribution() {
      const id = this.$route.params.id;
      if (id !== "add-order") {
        this.deleteSizeDistributionFunc({orderId: id, modelId: this.modelId});
        this.delete_dialog = false;
      } else {
        this.deleteSizeDistributionFunc({
          modelId: this.$store.getters["orders/newModelId"],
          orderId: this.$store.getters["orders/newOrderId"],
        });
        this.delete_dialog = false;
      }
    },
  },

  async mounted() {
    const id = this.$route.params.id;
    if (id !== "add-order") {
      await this.getSizeDistribution({modelId: this.modelId});
      await this.getSizeDistributionValue({
        modelId: this.modelId,
        orderId: id,
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.colorSizeBtn {
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #777c85;
}
</style>
