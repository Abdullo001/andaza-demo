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
          <v-toolbar-title class="w-full d-flex">
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
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.actions="{ item }">
        <div>
          <v-btn icon class="mr-2" @click="edit()">
            <v-img src="/edit-green.svg" max-width="20" />
          </v-btn>
          <v-btn icon>
            <v-img src="/trash-red.svg" max-width="20" />
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="edit_dialog" max-width="572">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>Edit</div>
          <v-btn @click="edit_dialog = !edit_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row class="mb-4">
              <v-col
                cols="6"
                v-for="(item, idx) in orderSizeDetail.modelBodyParts"
                :key="idx"
              >
                <div class="mb-2 text-body-1">{{ item.bodyPart }}</div>
                <v-text-field
                  v-model="item.value"
                  :placeholder="item.bodyPart"
                  single-line
                  outlined
                  validate-on-blur
                  dense
                  class="rounded-lg"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>
            </v-row>

            <v-row class="mb-4">
              <v-col
                cols="3"
                v-for="(item, idx) in orderSizeDetail.sizeDistributions"
                :key="idx"
              >
                <div class="mb-2 text-body-1">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quatity"
                  :placeholder="item.size"
                  single-line
                  outlined
                  validate-on-blur
                  dense
                  class="rounded-lg"
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
                width="163"
                @click="update"
                >save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ColorSizeDistirbution",
  data() {
    return {
      edit_dialog: false,
      new_validate: true,
      templeHeaders: [
        { text: "Total", sortable: false, value: "total" },
        { text: "Actions", sortable: false, align: "center", value: "actions" },
      ],

      headerSizes: [],
      headerBodyPart: [],
      headers: [],
      item: {},
      number: null,

      orderSizeList: [],

      orderSizeDetail: {
        modelBodyParts: [],
        sizeDistributions: [],
      },
      modelId: this.$route.query.modelId,
    };
  },

  computed: {
    ...mapGetters({
      sizes: "sizeDistirbution/sizes",
      bodyParts: "sizeDistirbution/bodyParts",
      sizeValues: "sizeDistirbution/sizeValues",
      bodyPartValues: "sizeDistirbution/bodyPartValues",
      totalItem: "sizeDistirbution/total",
    }),
  },

  watch: {
    sizes(list) {
      this.headerSizes = [];
      list.forEach((item) => {
        const res = { text: item, sortable: false, value: item };
        this.headerSizes.push(res);
      });
      this.headers = [...this.headerSizes, ...this.templeHeaders];
    },

    bodyParts(items) {
      this.headerBodyPart = [];
      for (let item in items) {
        const res = { text: item, sortable: false, value: item };
        this.headerBodyPart.push(res);
      }
      this.headers = [...this.headerBodyPart, ...this.headers];
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
      this.item = { ...value };
    },

    sizeValues(items) {
      this.orderSizeDetail.sizeDistributions = [];
      const value = {};
      for (let item in items) {
        const sizeObj = {
          size: item,
          quatity: items[item],
        };
        value[item] = items[item];
        this.orderSizeDetail.sizeDistributions.push(sizeObj);
      }
      this.item = { ...this.item, ...value };
      this.orderSizeList.shift();
      this.orderSizeList.push(this.item);
    },

    totalItem(val) {
      this.item.total = val.total;
    },
  },

  methods: {
    ...mapActions({
      getSizeDistirbution: "sizeDistirbution/getSizeDistirbution",
      getSizeDistirbutionValue: "sizeDistirbution/getSizeDistirbutionValue",
      updateSizeDistirbutionValue:
        "sizeDistirbution/updateSizeDistirbutionValue",
    }),

    edit() {
      this.edit_dialog = !this.edit_dialog;
    },
    async update() {
      await this.updateSizeDistirbutionValue({
        ...this.orderSizeDetail,
        modelId: this.modelId,
        orderId: this.$route.params.id,
      });
      this.edit_dialog = !this.edit_dialog;
    },
  },

  async mounted() {
    const id = this.$route.params.id;

    if (id !== "add-order") {
      await this.getSizeDistirbution({ modelId: this.modelId });
      await this.getSizeDistirbutionValue({
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
