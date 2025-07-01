<template >
  <div>
    <v-toolbar elevation="0">
      <v-toolbar-title
        class="d-flex w-full"
      >
        <div>{{ $t('shipping.id.packingList') }}</div>
      </v-toolbar-title>
    </v-toolbar>
    <template  v-for="(group, groupIndex) in allList">
      <div class="d-flex" :key="groupIndex" id="products-table">
        <template class="d-flex align-start">
          <v-simple-checkbox
            color="#544B99"
            v-model="group.isGenerated"
            :disabled="group.isChecked"
            @click="isGeneratedFunc(group)"
          ></v-simple-checkbox>
        </template>
        <table cellspacing="0">
          <thead>
          <tr class="text-center">
            <th>Order No.</th>
            <th>NO.</th>
            <th>Model No.</th>
            <th>Main color</th>
            <template v-for="(item, idx) in group.itemResponseList">
              <th v-if="idx === 0" v-for="(size, sizeIdx) in item.sizeDistributions" :key="sizeIdx">
                {{ size.size }}
              </th>
            </template>
            <th>Total</th>
            <th width="100px">{{ $t("shipping.boxQuantity") }}</th>
            <th>{{ $t('sidebar.boxSize') }}(m)</th>
            <th>{{ $t("shipping.boxWeight") }}</th>
            <th>{{ $t("shipping.grossWeight") }}</th>
            <th>{{ $t("shipping.grossWeight") }}</th>
            <th>{{ $t("shipping.cbmM") }} No.</th>
            <th>{{ $t("shipping.packingListDate") }}</th>
            <th>{{ $t("shipping.marking") }}</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(item,idx) in group.itemResponseList">
            <tr :key="idx">
              <th v-if="idx === 0" colspan="4">{{ $t('shipping.pcNetWeight') }}</th>
              <td v-if="idx === 0" :colspan="idx" v-for="(sizeItem, sizeItemIdx) in group.sizeWeightDistributions"
                  :key="sizeItemIdx">{{ sizeItem.value }}
              </td>
            </tr>
            <tr class="text-center">
              <td v-if="idx === 0" :rowspan="idx">{{ group.orderNumber }}</td>
              <td>{{ idx + 1 }}</td>
              <td v-if="idx === 0" :rowspan="idx">{{ group.modelNumber }}</td>
              <td>{{ item.color }}</td>
              <td v-for="(size, sizeIdx) in item.sizeDistributions" :key="sizeIdx">
                {{ size.quantity }}
              </td>
              <th>{{ item.total }}</th>
              <td>
                <template>
                  <v-text-field
                    @keyup.enter="setQueueFunc(item)"
                    outlined
                    hide-details
                    style="font-size: 10px; width: 60px"
                    v-model.number="item.boxQuantity"
                    class="rounded-lg base my-2"
                    dense
                    :disabled="group.isChecked"
                    :rules="[formRules.required]"
                    validate-on-blur
                    color="#544B99"
                  />
                </template>
              </td>
              <td v-if="idx === 0" :rowspan="idx">
                <div class="tdBgColor rounded-lg base my-2">
                  {{ group.boxSize }}
                </div>
              </td>
              <td v-if="idx === 0" :rowspan="idx">{{ group.weightPerBox }}</td>
              <td v-if="idx === 0" :rowspan="idx">{{ group.grossWeight === "NaN" ? 0 : group.grossWeight }}</td>
              <td v-if="idx === 0" :rowspan="idx">{{ group.totalCbm }}</td>
              <td v-if="idx === 0" :rowspan="idx">{{ group.packingListNumber }}</td>
              <td v-if="idx === 0" :rowspan="idx">{{ group.packingListDate }}</td>
              <td v-if="idx === 0" :rowspan="idx">{{ group.marking }}</td>
              <td v-if="idx === 0" :rowspan="idx">
                <template>
                  <div class="d-flex">
                    <v-btn :disabled="group.isChecked" icon color="green" @click="editItem(group)">
                      <v-img src="/edit-active.svg" max-width="22"/>
                    </v-btn>
                    <v-tooltip top color="#544B99">
                      <template #activator="{on, attrs}">
                        <v-btn
                          icon class="ml-2"
                          :href="item.filePath"
                          :download="`Document.${item.extension}`"
                          v-on="on"
                          v-bind="attrs"
                          @click="downloadPdf(group)"
                        >
                          <v-img src="/download.svg" max-width="24"/>
                        </v-btn>
                      </template>
                      <span>Download</span>
                    </v-tooltip>
                  </div>
                </template>
              </td>
            </tr>
          </template>
          </tbody>
          <tfoot>
          <template v-for="(item,idx) in group.itemResponseList">
            <tr :key="idx">
              <td v-if="idx === 0" colspan="4"></td>
              <td v-if="idx === 0" :colspan="idx"
                  v-for="(totalDistribution, totalDistributionIdx) in group.totalSizeDistribution"
                  :key="totalDistributionIdx">{{ totalDistribution }}
              </td>
              <th v-if="idx === 0">{{ group.totalDistribution }}</th>
              <th v-if="idx === 0">{{ group.totalBoxQuantity }}</th>
              <th v-if="idx === 0" colspan="8"></th>
            </tr>
            <tr>
              <th v-if="idx === 0" colspan="4">{{ $t("shipping.netWeight") }} (Kg.)</th>
              <th v-if="idx === 0" v-for="(totalNetWeight, totalNetWeightIdx) in group.netWeight"
                  :key="totalNetWeightIdx">{{ totalNetWeight }}
              </th>
              <th v-if="idx === 0">{{ group.totalNetWeight }}</th>
              <th v-if="idx === 0"></th>
              <th v-if="idx === 0" colspan="8"></th>
            </tr>
          </template>
          </tfoot>
        </table>
      </div>
    </template>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ this.title ? "Edit" : "Enter" }} the packing list info
          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" v-model="new_validate" lazy-validation>
            <div class="label">{{ $t("shipping.netWeightPerWork") }}</div>
            <v-row>
              <v-col cols="12" lg="3" v-for="(item, idx) in selectedItem.sizeDistributions" :key="`_cutting_${idx}`">
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model.number="item.value"
                  placeholder="0"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base "
                  validate-on-blur
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('sidebar.boxSize') }}/m</div>
                <v-select
                  :items="boxSizeList"
                  dense
                  append-icon="mdi-chevron-down"
                  item-text="size"
                  item-value="id"
                  v-model="selectedPackingList.boxSizeId"
                  :placeholder="$t('shipping.selectTheBoxSize')"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  color="#544B99"
                  validate-on-blur
                >
                </v-select>
              </v-col>
              <v-col cols="12" md="2">
                <div class="label">{{ $t('shipping.cbmM') }}</div>
                <v-text-field
                  disabled
                  v-model="cbm"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="CBM"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="label">{{ $t('shipping.weightOfPerBox') }}</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="selectedPackingList.weightPerBox"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter Weight of per box/KG"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t("shipping.packingList") }} No.</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="selectedPackingList.packingListNumber"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  height="44"
                  dense
                  color="#544B99"
                  placeholder="Enter the Packing list number"
                />
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <div class="label">{{ $t("shipping.packingListDate") }}</div>
                <el-date-picker
                  style="width: 100%"
                  v-model="selectedPackingList.packingListDate"
                  type="datetime"
                  outlined
                  placeholder="Packing list date"
                  class="filter_picker"
                  color="#544B99"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                >
                </el-date-picker>
              </v-col>
              <v-col cols="12" md="12">
                <div class="label">Marking</div>
                <v-textarea
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  rows="1"
                  dense
                  v-model="selectedPackingList.marking"
                  auto-grow
                  color="#544B99"
                  placeholder="Enter role description"
                  validate-on-blur
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#544B99"
            width="163"
            @click="new_dialog = false"
          >
            {{ $t('cancel') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="savePackingList"
          >
            {{ $t('save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="d-flex my-6 ">
      <v-spacer/>
      <v-btn
        class="text-capitalize rounded-lg font-weight-bold mr-4 py-1 px-6"
        color="#544B99"
        outlined
        height="44"
        @click="generateInvoice"
      >
        {{  this.$t('shipping.id.generateInvoice') , }}
      </v-btn>
    </div>
    <v-overlay v-model="isLoad" class="align-center justify-center">
      <v-progress-circular
        color="#544B99"
        indeterminate
        size="80"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import colorSizeDistribution from "@/components/ColorSizeDistribution.vue";

export default {
  data() {
    return {
      return_dialog: false,
      new_dialog: false,
      return_validate: true,
      new_validate: true,
      title: false,
      selectedItem: {},
      cbm: "",
      shippingId: null,
      generate: false,
      isGeneratedItem: [],
      generatedItem: [],
      selectedPackingList: {
        boxSizeId: null,
        grossWeight: "",
        id: null,
        marking: "",
        packingListDate: "",
        packingListNumber: "",
        sizeWeightDistributions: [],
        weightPerBox: ""
      },
      allList: [],
      updateSizess: [],
      newList: [],
      totalBoxQuantity: "",
      totalGroupTotal: ""
    }
  },
  async created() {
    await this.getBoxSizeList({page: 0, size: 100});
  },
  watch: {
    "selectedPackingList.boxSizeId"(id) {
      this.boxSizeList.forEach(el => {
        if (id === el.id) {
          this.cbm = el.cbm;
        }
      })
    },
    packingList(list) {
      const specialList = list.map((el) => {
        let netWeight = {}
        let totalNetWeight = 0
        const valueSizes = {}
        let totalDistribution = 0
        let totalCbm = 0
        let totalBoxQuantity = 0
        let grossWeight = 0

        for (let item in el.itemResponseList) {
          totalDistribution += el.itemResponseList[item].total
          totalBoxQuantity += el.itemResponseList[item]?.boxQuantity
          for (let id in el.itemResponseList[item]?.sizeDistributions) {
            const size = el.itemResponseList[item]?.sizeDistributions[id]
            !!valueSizes[size.size]
              ? (valueSizes[size.size] = valueSizes[size.size])
              : (valueSizes[size.size] = 0)
            valueSizes[size.size] += size.quantity
          }
        }

        for (let item in el?.sizeWeightDistributions) {
          const size = el?.sizeWeightDistributions[item]
          !!netWeight[size.size]
            ? netWeight[size.size] = netWeight[size.size]
            : netWeight[size.size] = 0
          netWeight[size.size] = parseFloat(
            (size.value * valueSizes[size.size]).toFixed(3)
          );
          totalNetWeight += netWeight[size.size];
        }
        totalCbm = parseFloat((el.cbmM3 * totalBoxQuantity).toFixed(2))
        grossWeight = (
          el.weightPerBox * totalBoxQuantity + totalNetWeight
        ).toFixed(2)
        return {
          ...el,
          isChecked: el.isGenerated,
          totalSizeDistribution: {...valueSizes},
          netWeight: {...netWeight},
          totalDistribution: totalDistribution,
          totalBoxQuantity: totalBoxQuantity,
          totalNetWeight: totalNetWeight ? totalNetWeight.toFixed(3) : "",
          grossWeight: grossWeight,
          totalCbm: totalCbm
        };
      });
      this.allList = JSON.parse(JSON.stringify(specialList));
    },
  },
  computed: {
    ...mapGetters({
      packingList: "packingList/packingList",
      isLoad: "packingList/isLoad",
      boxSizeList: "boxSize/boxSizeList"
    }),
  },
  methods: {
    ...mapActions({
      getPackingList: "packingList/getPackingList",
      getBoxSizeList: "boxSize/getBoxSizeList",
      updatePackingList: "packingList/updatePackingList",
      setBoxQuantity: "packingList/setBoxQuantity",
      postGenerateInvoice: "packingList/postGenerateInvoice",
      generatePackagingListPdf: 'packingList/generatePackagingListPdf'
    }),
    downloadPdf(group) {
      let newNetList = []
      let res
      const filter = this.allList.filter(el => el.id === group.id )
      filter.map(el => {
        res = Object.entries(el.netWeight)
      })
      for(let i = 0; i < res.length; i++) {
          newNetList.push({size: res[i][0],value: res[i][1]})
      }
      const data = {
        cbm: group.totalCbm,
        grossWeight: group.grossWeight,
        packagingListId: group?.id,
        shippingId: Number(this?.shippingId),
        sizeWeightDistributions: [...newNetList],
        totalBoxQuantity: filter[0]?.totalBoxQuantity,
        totalNetWeight: Number(filter[0]?.totalNetWeight),
        totalPcs: filter[0]?.totalDistribution
      }
      this.generatePackagingListPdf(data)
    },
    isGeneratedFunc(item) {
      this.generatedItem.push({
        grossWeight: item.grossWeight,
        modelId: item.modelId,
        netWeight: item.totalNetWeight,
        orderId: item.orderId,
        packagingListId: item.id,
        total: item.totalDistribution,
        totalBoxQuantity: item.totalBoxQuantity,
        isGarment:item.isGarment
      })
    },
    generateInvoice() {
      this.postGenerateInvoice({
        data: {itemRequestList: [...this.generatedItem], shippingId: this.shippingId},
        id: this.shippingId
      })
    },
    editItem(item) {
      this.new_dialog = true;
      this.selectedPackingList = {...item};
      console.log(this.allList)
      this.selectedPackingList.id = item.id;
      let sizesList = [];
      let newSizes = [];
      if (item.sizeWeightDistributions) {
        this.title = true;
        item?.sizeWeightDistributions.map(el => {
          newSizes.push({size: el.size, value: el.value})
        });
      } else {
        this.title = false;
        const newArr = item.itemResponseList.map(el => {
          return [...el.sizeDistributions];
        });
        sizesList = [...newArr[0]];
        sizesList.forEach(el => {
          newSizes.push({size: el.size, value: 0});
        })
      }
      this.selectedItem = {
        sizeDistributions: [...newSizes]
      }
    },
    savePackingList() {
      const data = {
        boxSizeId: this.selectedPackingList.boxSizeId,
        grossWeight: typeof this.selectedPackingList.grossWeight === NaN ? this.selectedPackingList.grossWeight : "",
        id: this.selectedPackingList.id,
        marking: this.selectedPackingList.marking,
        packingListDate: this.selectedPackingList.packingListDate,
        packingListNumber: this.selectedPackingList.packingListNumber,
        sizeWeightDistributions: [...this.selectedItem.sizeDistributions],
        weightPerBox: this.selectedPackingList.weightPerBox,
      }
      this.updatePackingList({data, id: this.shippingId});
      this.new_dialog = false
    },
    setQueueFunc(item) {
      const data = {
        boxQuantity: item.boxQuantity,
        id: item.id,
      }
      this.setBoxQuantity({data, id: this.shippingId})
    },
  },
  mounted() {
    this.shippingId = this.$route.params.id;
    this.getPackingList(this.shippingId);
  }

}
</script>
<style lang="scss" scoped>
.table-l {
  height: 400px;
  overflow-y: auto;
}

#products-table {
  overflow-x: auto;
}

table, th, td {
  border: 1px solid #EBEBEB;
  border-collapse: collapse;
}

table {
  tr {
    border: none;
  }
}

table:nth-child(odd) {
  margin: 10px 0;
}

table {
  line-height: 30px;
  font-size: 16px;
  width: 100%;

  th, td {
    padding: 0 16px;
    font-size: 10px;
    color: #1D2433;
  }

  thead {
    background-color: #F8F4FE;

    th {
      font-weight: 500;
      color: #6B7280
    }
  }

  tfoot {
    font-weight: 700;
    //th:nth-child(-n+3), td:nth-child(-n+3) {
    //  border: none;
    //}
  }

  .p0 {
    padding: 0 !important;
  }


}

::-webkit-scrollbar {
  background-color: #F8F4FE;
}

::-webkit-scrollbar-thumb {
  background-color: #e2d7ee;
  border-radius: 16px;
}

</style>
