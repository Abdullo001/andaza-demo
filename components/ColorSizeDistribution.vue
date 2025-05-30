<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="orderSizeList"
      :items-per-page="50"
      class="elevation-0"
      hide-default-footer
      :no-data-text="$t('noDataText')"
      :footer-props="{
        itemsPerPageText: this.$t('allDataTableText'),
      }"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>
              <v-btn
                class="rounded-lg text-capitalize mr-2 colorSizeBtn"
                outlined
              >
                {{ $t('orderBox.colorSize.supply') }}
              </v-btn>
              <v-btn
                class="rounded-lg text-capitalize colorSizeBtn"
                style="
                  color: rgb(119, 124, 133);
                  caret-color: rgb(119, 124, 133);
                "
                outlined
              >
               {{ $t('orderBox.colorSize.cuttingInfo') }}
              </v-btn>
            </div>
            <v-btn
              color="#544B99"
              dark
              class="text-capitalize rounded-lg"
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t('orderBox.colorSize.addRow') }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.actions="{ item }">
        <div style="min-width: 100px">
          <v-btn icon class="mr-2" @click="edit(item)">
            <v-img src="/edit-green.svg" max-width="20" />
          </v-btn>
          <v-btn icon @click="deleteFunc(item)">
            <v-img src="/trash-red.svg" max-width="20" />
          </v-btn>
        </div>
      </template>

      <template v-slot:body.append>
        <tr>
          <td
            :colspan="newSizeDistirbution?.modelBodyParts?.length"
            class="text-capitalize text-body-1 font-weight-bold"
          >
              {{ $t('orderBox.colorSize.totalQuantities') }}
          </td>
          <td
            v-for="(item, idx) in totalSizes.sizesList"
            :key="idx * 12"
            class="font-weight-bold text-body-1"
          >
            {{ item }}
          </td>

          <td class="font-weight-bold text-body-1">{{ totalSizes.total }}</td>
          <td></td>
          <td class="font-weight-bold text-body-1">
            {{ totalSizes.totalPriceWithDiscount }}
          </td>
          <td></td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="new_dialog" max-width="572">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>  {{ $t('orderBox.dialog.colorDist') }}</div>
          <v-btn @click="new_dialog = !new_dialog" icon>
            <v-icon color="#544B99">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row class="mb-4 d-flex justify-space-between">
              <v-col
                v-for="(item, idx) in newSizeDistirbution.modelBodyParts"
                :cols="item.bodyPartId !== 0 ? '12' : '6'"
                :key="idx"
              >
                <v-row>
                  <v-col cols="6" v-if="item.bodyPartId !== 0">
                    <div>
                      <div class="label">{{ item.bodyPart }}</div>
                      <v-select
                        v-model="item.colorId"
                        :items="colorsList"
                        :rules="[formRules.required]"
                        append-icon="mdi-chevron-down"
                        :placeholder="item.bodyPart"
                        outlined
                        item-text="name"
                        item-value="id"
                        single-line
                        hide-details
                        height="44"
                        class="rounded-lg base"
                        color="#544B99"
                        dense
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" v-else>
                    <div>
                      <div class="label">{{ item.bodyPart }}</div>
                      <v-text-field
                        :rules="[formRules.required]"
                        :placeholder="item.bodyPart"
                        v-model="item.colorCode"
                        single-line
                        outlined
                        hide-details
                        height="44"
                        validate-on-blur
                        dense
                        class="rounded-lg base"
                        color="#544B99"
                        background-color="#F8F4FE"
                      />
                    </div>
                  </v-col>
                  <v-col cols="6" v-if="item.bodyPartId !== 0">
                    <div>
                      <div class="label">{{ $t('colorsBox.table.pantoneCode') }}</div>
                      <div class="d-flex align-center">
                        <v-text-field
                          v-model="item.pantoneCode"
                          placeholder="0"
                          outlined
                          hide-details
                          height="44"
                          class="rounded-lg base rounded-l-lg rounded-r-0"
                          validate-on-blur
                          dense
                          color="#544B99"
                        />
                        <v-select
                          :items="enums"
                          v-model="item.pantoneType"
                          style="max-width: 100px"
                          dense
                          outlined
                          hide-details
                          height="44"
                          class="rounded-lg base rounded-r-lg rounded-l-0"
                          validate-on-blur
                          placeholder=""
                          append-icon="mdi-chevron-down"
                          color="#544B99"
                        />
                      </div>
                    </div>
                  </v-col>


                </v-row>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" >
                <div class="label">{{ $t('orderBox.colorSize.artwork') }}</div>
                <v-text-field
                      v-model="newSizeDistirbution.artwork"
                      placeholder=""
                      outlined
                      hide-details
                      height="44"
                      class="rounded-lg base "
                      validate-on-blur
                      dense
                      color="#544B99"
                    />
              </v-col>
            </v-row>

            <v-row class="mb-4 d-flex justify-space-between">
              <v-col
                cols="3"
                v-for="(item, idx) in newSizeDistirbution.sizeDistributions"
                :key="idx"
              >
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
                  :rules="[formRules.onlyNumber, formRules.required]"
                  single-line
                  outlined
                  hide-details
                  height="44"
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#544B99"
                  background-color="#F8F4FE"
                />
              </v-col>
            </v-row>

            <v-card-actions class="d-flex justify-center pb-6">
              <v-btn
                outlined
                class="text-capitalize rounded-lg font-weight-bold mr-6"
                color="#544B99"
                width="163"
                @click="new_dialog = !new_dialog"
                >{{ $t('orderBox.colorSize.cencel') }}
              </v-btn>
              <v-btn
                class="text-capitalize rounded-lg font-weight-bold"
                color="#544B99"
                dark
                width="163"
                @click="createSizeDistirbution"
              >
                {{ $t('orderBox.colorSize.create') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="edit_dialog" max-width="572">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>{{ $t('orderBox.colorSize.editColorSize') }}</div>
          <v-btn @click="edit_dialog = !edit_dialog" icon>
            <v-icon color="#544B99">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="edit_form">
            <v-row class="mb-4 d-flex justify-space-between">
              <v-col
                v-for="(item, idx) in oneSizeDistirbution?.modelBodyParts
                  ?.slice()
                  ?.reverse()"
                :cols="item.bodyPartId ? '12' : '6'"
                :key="idx"
              >
                <v-row>
                  <v-col cols="6" v-if="item.bodyPartId">
                    <div>
                      <div class="label">{{ item.bodyPart }}</div>
                      <v-select
                        v-model="item.colorId"
                        :items="colorsList"
                        :rules="[formRules.required]"
                        append-icon="mdi-chevron-down"
                        :placeholder="item.bodyPart"
                        outlined
                        item-text="name"
                        item-value="id"
                        single-line
                        hide-details
                        height="44"
                        class="rounded-lg base"
                        color="#544B99"
                        dense
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" v-else>
                    <div>
                      <div class="label">{{ item.bodyPart }}</div>
                      <v-text-field
                        :rules="[formRules.required]"
                        :placeholder="item.bodyPart"
                        v-model="item.colorCode"
                        single-line
                        outlined
                        hide-details
                        height="44"
                        validate-on-blur
                        dense
                        class="rounded-lg base"
                        color="#544B99"
                        background-color="#F8F4FE"
                      />
                    </div>
                  </v-col>
                  <v-col cols="6" v-if="item.bodyPartId">
                    <div>
                      <div class="label">{{ $t('colorsBox.table.pantoneCode') }}</div>
                      <div class="d-flex align-center">
                        <v-text-field
                          v-model="item.pantoneCode"
                          placeholder="0"
                          outlined
                          hide-details
                          height="44"
                          class="rounded-lg base rounded-l-lg rounded-r-0"
                          validate-on-blur
                          dense
                          color="#544B99"
                        />
                        <v-select
                          :items="enums"
                          v-model="item.pantoneType"
                          style="max-width: 100px"
                          dense
                          outlined
                          hide-details
                          height="44"
                          class="rounded-lg base rounded-r-lg rounded-l-0"
                          validate-on-blur
                            placeholder=""
                          append-icon="mdi-chevron-down"
                          color="#544B99"
                        />
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" >
                <div class="label">{{ $t('orderBox.colorSize.artwork') }}</div>
                <v-text-field
                      v-model="oneSizeDistirbution.artwork"
                      placeholder=""
                      outlined
                      hide-details
                      height="44"
                      class="rounded-lg base "
                      validate-on-blur
                      dense
                      color="#544B99"
                    />
              </v-col>
            </v-row>

            <v-row class="mb-4 d-flex justify-space-between">
              <v-col
                cols="3"
                v-for="(item, idx) in oneSizeDistirbution.sizeDistributions"
                :key="idx"
              >
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
                  placeholder="Enter size"
                  single-line
                  outlined
                  hide-details
                  height="44"
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#544B99"
                  background-color="#F8F4FE"
                />
              </v-col>
            </v-row>

            <v-card-actions class="d-flex justify-center pb-6">
              <v-btn
                outlined
                class="text-capitalize rounded-lg font-weight-bold mr-6"
                color="#544B99"
                width="163"
                @click="edit_dialog = !edit_dialog"
                >{{$t('localization.dialog.cancel')}}
              </v-btn>
              <v-btn
                class="text-capitalize rounded-lg font-weight-bold"
                color="#544B99"
                dark
                v-if="this.$route.params.id !== `add-order`"
                width="163"
                @click="update"
                >{{$t('update')}}
              </v-btn>
              <v-btn
                class="text-capitalize rounded-lg font-weight-bold"
                color="#544B99"
                dark
                v-else
                width="163"
                @click="updateNewOrder"
                >{{$t('localization.dialog.cancel')}}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40" />
        </div>
        <v-card-title class="d-flex justify-center"
          >{{$t('orderBox.colorSize.delete')}}
        </v-card-title>
        <v-card-text>
          {{$t('orderBox.colorSize.sure')}}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{$t('localization.dialog.cancel')}}
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteSizeDistribution"
          >
              {{$t('localization.dialog.delete')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ColorSizeDistribution",
  data() {
    return {
      new_dialog: false,
      edit_dialog: false,
      delete_dialog: false,
      new_validate: true,

      templeHeaders: [
        { text: this.$t('orderBox.add.total'), sortable: false, value: "total" },
        {
          text: this.$t('orderBox.add.overProduct'),
          sortable: false,
          value: "overproductionPercent",
        },
        {
          text:  this.$t('orderBox.add.totalWithOver'),
          sortable: false,
          value: "totalWithOverproductionPercent",
        },
        { text:this.$t('forms.printBox.printType'), sortable: false, align: "center", value: "artwork" },
        { text:this.$t('userManagement.table.actions'), sortable: false, align: "center", value: "actions" },
      ],
      enums: ["TPX", "TCX", "TPG", "C", "MELANGE"],
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
      oneSizeDistirbution: {},
      newSizeDistirbution: {
        modelBodyParts: [],
        sizeDistributions: [],
      },
      totalSizes: {
        sizesList: [],
        total: null,
        totalPriceWithDiscount: null,
      },
      modelId: this.$route.query.modelId,
      sizeList: [],
      colorSizeDisturbution: [],
    };
  },

  created() {
    this.getColorsList();
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
      totalWithOverproductionPercent:"sizeDistribution/totalWithOverproductionPercent",
      colorsList: "sizeDistribution/colorsList",
      sizeDistributionList: "sizeDistribution/sizeDistributionList",
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
      this.item = { ...this.item, ...value };
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
    bodyParts(items) {
      this.headerBodyPart = [];
      this.newSizeDistirbution.modelBodyParts=[]
      this.headers = [];
      for (let item in items) {
        const res = { text: item, sortable: false, value: item };
        let val = {};
        if (items[item] === 0) {
          val = {
            bodyPart: item,
            bodyPartId: items[item],
            colorCode: null,
            isMain: false,
          };
        } else {
          val = { bodyPart: item, bodyPartId: items[item], colorId: null };
        }
        this.newSizeDistirbution.modelBodyParts.push(val);
        this.headerBodyPart.push(res);
      }
    },
    sizes(list) {
      this.sizeList = JSON.parse(JSON.stringify(list));
      this.headerSizes = [];
      this.headers = [];
      const sizeList = [...list];
        this.newSizeDistirbution.sizeDistributions = [];
        this.headerSizes = [];
        sizeList.forEach((item) => {
          const res = { text: item, sortable: false, value: item };
          const val = { size: item, quantity: null };
          this.newSizeDistirbution.sizeDistributions.push(val);
          this.headerSizes.push(res);
        });
        this.headers = [
          ...this.headerBodyPart,
          ...this.headerSizes,
          ...this.templeHeaders,
        ];
    },

    sizeDistributionList(list) {
      this.orderSizeList = [];
      let totalObj = 0;
      let totalSizes = [];
      let totalPriceWithDiscount = 0;
      const orderedItemList = this.sizes
      const orderedSizeDistribution = {}


      const specialList = list.map(function (el) {
        const value = {};
        el.bodyPartsCodes.forEach((item) => {
          if (item.color) {
            value[item.bodyPart] = item.colorSpecification;
          } else {
            value[item.bodyPart] = item.colorCode;
          }
        });

        const valueSizes = {};
        const valueSizesList = [];
        let idx = 0;
        for(let orderedItem in orderedItemList){
          for (let item in el.sizeDistributions) {
            if(orderedItemList[orderedItem]===item){
              orderedSizeDistribution[item]=el.sizeDistributions[item]
            }
          }
        }

        for (let item in orderedSizeDistribution) {
          totalSizes[idx]
            ? (totalSizes[idx] = totalSizes[idx])
            : (totalSizes[idx] = 0);
          totalSizes[idx] =
            parseInt(totalSizes[idx]) + parseInt(orderedSizeDistribution[item]);
          idx++;
          const sizeObj = {
            size: item,
            quantity: orderedSizeDistribution[item],
          };
          valueSizes[item] = orderedSizeDistribution[item];
          valueSizesList.push(sizeObj);
        }
        totalObj = totalObj + el.total;
        totalPriceWithDiscount =totalPriceWithDiscount + el.totalWithOverproductionPercent;
        return {
          ...value,
          ...valueSizes,
          modelBodyParts: [...el.bodyPartsCodes],
          overproductionPercent: el.overproductionPercent,
          total: el.total,
          setIdentifier: el.setIdentifier,
          sizeDistributionId: el.sizeDistributionId,
          totalWithOverproductionPercent: el.totalWithOverproductionPercent,
          sizeDistributions: [...valueSizesList],
          artwork:el.artwork
        };
      });
      this.orderSizeList = JSON.parse(JSON.stringify(specialList));
      this.totalSizes.sizesList = [...totalSizes];
      this.totalSizes.total = totalObj;
      this.totalSizes.totalPriceWithDiscount = totalPriceWithDiscount;
    },
    colorSizeDisturbution(val) {
      this.oneSizeDistirbution = { ...this.colorSizeDisturbution };
      this.newSizeDistirbution.modelBodyParts.forEach((e, idy) => {
        let count=0
        val?.modelBodyParts.forEach((item, idx) => {
          if(e.bodyPart===item.bodyPart){
            count++
          }
        });
        if(count===0){
          this.oneSizeDistirbution.modelBodyParts.unshift(e)
          this.oneSizeDistirbution=JSON.parse(JSON.stringify(this.oneSizeDistirbution))

        }
      });
    },
  },
  methods: {
    ...mapActions({
      getSizeDistribution: "sizeDistribution/getSizeDistribution",
      getSizeDistirbutionValue: "sizeDistribution/getSizeDistirbutionValue",
      updateSizeDistributionValue:
        "sizeDistribution/updateSizeDistributionValue",
      deleteSizeDistributionFunc: "sizeDistribution/deleteSizeDistributionFunc",
      getColorsList: "sizeDistribution/getColorsList",
      createSizeDistirbutionFunc: "sizeDistribution/createSizeDistirbutionFunc",
    }),
    edit(item) {
      this.colorSizeDisturbution = {};
      this.edit_dialog = !this.edit_dialog;
      this.colorSizeDisturbution = { ...item };
    },
    deleteFunc(item) {
      this.oneSizeDistirbution = {};
      this.delete_dialog = true;
      this.oneSizeDistirbution = { ...item };
    },
    async updateNewOrder() {
      const list = [...this.oneSizeDistirbution.modelBodyParts];
      const item = this.oneSizeDistirbution;
      const validate = this.$refs.edit_form.validate();
      if (validate) {
        list.forEach((el) => {
          if (el.bodyPart === "Color Code") {
            el.isMain = false;
          }
        });
        const specialObj = {
          modelBodyParts: [...item.modelBodyParts],
          modelId: this.$store.getters["orders/newModelId"],
          orderId: this.$store.getters["orders/newOrderId"],
          setIdentifier: item.setIdentifier,
          sizeDistributionId: item.sizeDistributionId,
          sizeDistributions: [...item.sizeDistributions],
          artwork:item.artwork
        };
        console.log(specialObj);
        // await this.updateSizeDistributionValue( specialObj );
        this.edit_dialog = !this.edit_dialog;
      }
    },

    async createSizeDistirbution() {
      const list = [...this.newSizeDistirbution.modelBodyParts];
      const validate = this.$refs.new_form.validate();
      if (validate) {
        list.forEach((item) => {
          if (item.bodyPart === "Main Color") {
            item.isMain = true;
          }
        });
        if (this.$route.params.id !== "add-order") {
          await this.createSizeDistirbutionFunc({
            ...this.newSizeDistirbution,
            modelId: this.modelId,
            orderId: this.$route.params.id,
          });
        } else {
          await this.createSizeDistirbutionFunc({
            ...this.newSizeDistirbution,
            modelId: this.$store.getters["orders/newModelId"],
            orderId: this.$store.getters["orders/newOrderId"],
          });
        }

        this.new_dialog = false;
        await this.$refs.new_form.reset();
      }
    },

    async update() {
      const list = [...this.oneSizeDistirbution.modelBodyParts];
      const item = this.oneSizeDistirbution;
      const validate = this.$refs.edit_form.validate();
      if (validate) {
        list.forEach((el) => {
          if (el.bodyPart === "Color Code") {
            el.isMain = false;
          }
        });
        const specialObj = {
          modelBodyParts: [...item.modelBodyParts],
          modelId: this.modelId,
          orderId: this.$route.params.id,
          setIdentifier: item.setIdentifier,
          sizeDistributionId: item.sizeDistributionId,
          sizeDistributions: [...item.sizeDistributions],
          artwork:item.artwork
        };

        await this.updateSizeDistributionValue(specialObj);
        this.edit_dialog = !this.edit_dialog;
      }
    },

    deleteSizeDistribution() {
      const id = this.$route.params.id;
      if (id !== "add-order") {
        this.deleteSizeDistributionFunc({
          orderId: id,
          modelId: this.modelId,
          setIdentifier: this.oneSizeDistirbution.setIdentifier,
          sizeDistributionId: this.oneSizeDistirbution.sizeDistributionId,
        });
        this.delete_dialog = false;
      } else {
        this.deleteSizeDistributionFunc({
          modelId: this.$store.getters["orders/newModelId"],
          orderId: this.$store.getters["orders/newOrderId"],
          setIdentifier: this.oneSizeDistirbution.setIdentifier,
          sizeDistributionId: this.oneSizeDistirbution.sizeDistributionId,
        });
        this.delete_dialog = false;
      }
    },
  },

  async mounted() {
    const id = this.$route.params.id;
    if (id !== "add-order") {
      await this.getSizeDistribution({ modelId: this.modelId });
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
