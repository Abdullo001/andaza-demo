<template>
  <div>
    <v-toolbar elevation="0">
      <v-toolbar-title
        class="d-flex w-full "
      >
        <div>Packing list</div>

      </v-toolbar-title>
    </v-toolbar>
    <template v-for="(group, groupIndex) in allList">
      <table  cellspacing="0">
        <thead>
          <tr  class="text-center" >
            <th>Order No.</th>
            <th>NO.</th>
            <th>Model No.</th>
            <th>Main color</th>
            <template v-for="(item, idx) in group.itemResponseList">
              <th v-if="idx === 0" v-for="size in item.sizeDistributions">
                {{size.size}}
              </th>
            </template>
            <th>Total</th>
            <th width="100px">Box quantity</th>
            <th>Box size(m)</th>
            <th>1 Box weight(kg)</th>
            <th>Gross weight(Kg.)</th>
            <th>CBM m3</th>
            <th>Packing list No.</th>
            <th>Packing list date</th>
            <th>Marking</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody >
        <template v-for="(item,idx) in group.itemResponseList">
          <tr>
            <th v-if="idx === 0" colspan="4">1pc Net weight (Kg.)</th>
            <td v-if="idx === 0" :colspan="idx" v-for="sizeItem in group.sizeWeightDistributions">{{sizeItem.value}}</td>
          </tr>
          <tr class="text-center">
            <td v-if="idx === 0" :rowspan="idx">{{group.orderNumber}}</td>
            <td>{{idx + 1}}</td>
            <td v-if="idx === 0" :rowspan="idx">{{group.modelNumber}}</td>
            <td>{{item.color}}</td>
            <td v-for="size in item.sizeDistributions">
              {{size.quantity}}
            </td>
            <th>{{item.total}}</th>
            <td>
              <template>
                <v-text-field
                  @keyup.enter="setQueueFunc(item)"
                  outlined
                  hide-details
                  style="font-size: 10px"
                  v-model.number="item.boxQuantity"
                  class="rounded-lg base my-2" dense
                  :rules="[formRules.required]"
                  validate-on-blur
                  color="#7631FF"
                />
              </template>
            </td>
            <td v-if="idx === 0" :rowspan="idx">
              <div class="tdBgColor rounded-lg base my-2">
                {{group.boxSize}}
              </div>
            </td>
            <td v-if="idx === 0" :rowspan="idx">{{group.weightPerBox}}</td>
            <td v-if="idx === 0" :rowspan="idx">{{group.grossWeight === "NaN" ? 0  : group.grossWeight }}</td>
            <td v-if="idx === 0" :rowspan="idx">{{group.cbmM3}}</td>
            <td v-if="idx === 0" :rowspan="idx">{{group.packagingListNumber}}</td>
            <td v-if="idx === 0" :rowspan="idx">{{group.packagingListDate}}</td>
            <td v-if="idx === 0" :rowspan="idx">{{group.marking}}</td>
            <td v-if="idx === 0" :rowspan="idx">
              <template>
                <div class="d-flex">
                  <v-btn icon color="green" @click="editItem(group)">
                    <v-img src="/edit-active.svg" max-width="22" />
                  </v-btn>
                </div>
              </template>
            </td>
          </tr>
        </template>
        </tbody>
        <tfoot>
        <template v-for="(item,idx) in group.itemResponseList">
          <tr>
            <td v-if="idx === 0" colspan="4" ></td>
            <td v-if="idx === 0" :colspan="idx" v-for="totalDistribution in group.totalSizeDistribution">{{totalDistribution}}</td>
            <th v-if="idx === 0">{{group.totalDisturbution}}</th>
            <th v-if="idx === 0">{{group.totalBoxQuantity}}</th>
            <th v-if="idx === 0" colspan="8"></th>
          </tr>
          <tr>
            <th  v-if="idx === 0" colspan="4">Net weight (Kg.)</th>
            <th v-if="idx === 0" v-for="totalNetWeight in group.netWeight">{{totalNetWeight}}</th>
            <th v-if="idx === 0">{{group.totalNetWeight}}</th>
            <th v-if="idx === 0"></th>
            <th v-if="idx === 0" colspan="8"></th>
          </tr>
        </template>
        </tfoot>
      </table>
    </template>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            Enter the packing list info
          </div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" v-model="new_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="2" v-for="(item, idx) in selectedItem.sizeDistributions" :key="`_cutting_${idx}`">
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
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="4">
                <div class="label">Status</div>
                <v-select
                  :items="boxSizeList"
                  dense
                  append-icon="mdi-chevron-down"
                  item-text="size"
                  item-value="id"
                  v-model="selectedPackingList.boxSizeId"
                  placeholder="Select the box size"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  color="#7631FF"
                  validate-on-blur
                >
                </v-select>
              </v-col>
              <v-col cols="12" md="2">
                <div class="label">CBM/m3</div>
                <v-text-field
                  disabled
                  v-model="cbm"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="CBM"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Weight of per box/kg.</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="selectedPackingList.weightPerBox"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  placeholder="Enter Weight of per box/KG"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Packing list No.</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="selectedPackingList.packingListNumber"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  height="44"
                  dense
                  color="#7631FF"
                  placeholder="Enter the Packing list number"
                />
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <div class="label">Packing list date</div>
                <el-date-picker
                  style="width: 100%"
                  v-model="selectedPackingList.packingListDate"
                  type="datetime"
                  placeholder="Packing list date"
                  class="filter_picker"
                  color="#7631FF"
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
                  color="#7631FF"
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
            color="#7631FF"
            width="163"
            @click="new_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="savePackingList"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      selectedItem: {},
      cbm: "",
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
      allList:[],
      totalBoxQuantity: "",
      totalGroupTotal: ""
    }
  },
  async created() {
    await this.getBoxSizeList({ page: 0, size: 100 });
  },
  watch: {
    "selectedPackingList.boxSizeId"(id){
      this.boxSizeList.forEach(el => {
        if(id === el.id) {
          this.cbm = el.cbm;
        }
      })
    },
    packingList(list){
      const specialList = list.map(function (el) {
        const netWeight={};
        let totalNetWeight=0;
        const valueSizes = {};
        let totalDisturbution=0;
        let totalBoxQuantity=0;
        let grossWeight=0

        for (let item in el.itemResponseList) {
          totalDisturbution+=el.itemResponseList[item].total
          totalBoxQuantity+=el.itemResponseList[item].boxQuantity
          for (let id in el.itemResponseList[item].sizeDistributions){
            const size=el.itemResponseList[item].sizeDistributions[id]
            !!valueSizes[size.size]?valueSizes[size.size]=valueSizes[size.size]:valueSizes[size.size]=0
            valueSizes[size.size]=valueSizes[size.size]+size.quantity
          }

        }
        for (let item in el.sizeWeightDistributions){
          const size=el.sizeWeightDistributions[item]
          !!netWeight[size.size]?netWeight[size.size]=netWeight[size.size]:netWeight[size.size]=0
          console.log(netWeight)
          netWeight[size.size] = parseFloat((size.value * valueSizes[size.size]).toFixed(3));
          totalNetWeight+=netWeight[size.size]
          console.log(totalNetWeight)
        }
        grossWeight = (el.weightPerBox*totalBoxQuantity+totalNetWeight).toFixed(2)
        return {
           ...el,
          totalSizeDistribution:{...valueSizes},
          netWeight:{...netWeight},
          totalDisturbution:totalDisturbution,
          totalBoxQuantity: totalBoxQuantity,
          totalNetWeight: totalNetWeight ? totalNetWeight.toFixed(3) : "",
          grossWeight: grossWeight,
        };
      });
      console.log(specialList)
      this.allList=JSON.parse(JSON.stringify(specialList));
    },
  },
  computed: {
    ...mapGetters({
      packingList: "packingList/packingList",
      boxSizeList: "boxSize/boxSizeList"
    }),
  },
  methods: {
    ...mapActions({
      getPackingList: "packingList/getPackingList",
      getBoxSizeList: "boxSize/getBoxSizeList",
      updatePackingList: "packingList/updatePackingList",
      setBoxQuantity: "packingList/setBoxQuantity"
    }),
    editItem(item) {
      this.new_dialog = true;
      this.selectedPackingList = {...item};
      console.log(this.selectedPackingList);
      this.selectedPackingList.id = item.id;
      let sizesList = [];
      let sizees = [];
      const newArr = item.itemResponseList.map(el => {
        return [...el.sizeDistributions];
      });
      sizesList = [...newArr[0]];
      sizesList.forEach(el => {
        sizees.push({size: el.size, value: 0})
      })
      return this.selectedItem = {
        sizeDistributions:  [...sizees]
      }
    },
    savePackingList() {
      const id=this.$route.params.id
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
      this.updatePackingList({data, id});
      this.new_dialog = false
    },
    setQueueFunc(item){
      console.log(item)
      const shippingId=this.$route.params.id
      const data = {
        boxQuantity: item.boxQuantity,
        id: item.id,
      }
      this.setBoxQuantity({data,id:shippingId})
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.getPackingList(id);
  }

}
</script>
<style lang="scss" scoped>
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
  margin: 50px 0;
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
    background-color: #EBEBEB;
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

</style>
