<template>
  <div>
    <v-toolbar elevation="0">
      <v-toolbar-title
        class="d-flex w-full "
      >
        <div>{{$t('shipping.id.shippingModels')}}</div>

      </v-toolbar-title>
    </v-toolbar>
    <template  v-for="group in groupedShippingOperationList">
      <table cellspacing="0">
        <thead>
        <tr class="text-center">
          <th>Order No.</th>
          <th>Model No.</th>
          <th>Model name</th>
          <th>Main color</th>
          <th v-for="size in group[0].sizeDistribution" :key="size.size">{{ size.size }}</th>
          <th>Total</th>
          <th>Price per pc</th>
          <th>Total amount</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody >
        <template v-for="(item, idx) in group" >
          <tr :key="item.id" class="text-center">
            <td v-if="idx === 0" :rowspan="idx">{{ item.orderNumber }}</td>
            <td v-if="idx === 0" :rowspan="idx">{{ item.modelNumber }}</td>
            <td>{{ item.modelName }}</td>
            <td>{{ item.color }}</td>
            <td v-for="(size, idx) in item.sizeDistribution" :key="idx">{{ size.quantity }}</td>
            <td>{{ item.total }}</td>
            <td>{{ item.pricePerPc }}</td>
            <td>{{ item.totalAmount }}</td>
            <td>
              <v-tooltip
                top
                color="#544B99"
                class="pointer"
                v-if="Object.keys(item).length > 2"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    color="#544B99"
                    @click="returnDialog(item)"
                  >
                    <v-img src="/rotate.svg" max-width="22"/>
                  </v-btn>
                </template>
                <span class="text-capitalize">return</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </template>
    <v-dialog v-model="return_dialog" width="600">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Returning works to warehouse</div>
          <v-btn icon color="#544B99" @click="return_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="return_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="3" v-for="(item, idx) in selectedItem.sizeDistribution" :key="`_cutting_${idx}`">
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
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
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="130"
            @click="return_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="130"
            @click="save"
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
export default {
  data() {
    return {
      return_dialog: false,
      return_validate: true,
      selectedItem: {},
      allList: [],
    }
  },
  created() {
  },
  watch: {
    shippingOperationList(list){
      this.allList = JSON.parse(JSON.stringify(list));
    },
  },
  computed: {
    ...mapGetters({
      shippingOperationList: "shippingModels/shippingOperationList",
      returnReadyGarment: "shippingModels/returnReadyGarment"
    }),
    groupedShippingOperationList() {
      const groupedData = {};
      this.allList.forEach((item) => {
        const key = `${item.modelNumber}-${item.orderNumber}`;
        if (!groupedData[key]) {
          groupedData[key] = [];
        }
        groupedData[key].push(item);
      });
      return Object.values(groupedData);
    },
  },
  methods: {
    ...mapActions({
      getShippingOperationList: "shippingModels/getShippingOperationList",
      returnReadyGarmentRow: "shippingModels/returnReadyGarmentRow"
    }),
    returnDialog(item) {
      this.return_dialog = true;
      this.selectedItem = {...item};
      const sizesList = [];
      item.sizeDistribution.map(function (el) {
        sizesList.push({size: el.size, quantity: 0})
      })
      this.selectedItem.sizeDistribution = [...sizesList]
    },
    save(){
        const shippingId = this.$route.params.id;
        let data = {
          id: this.selectedItem.id,
          sizeDistributions: [...this.selectedItem.sizeDistribution],
        }
        this.returnReadyGarmentRow({data, id: shippingId});
        this.return_dialog = false;
      }
  },
  mounted() {
  }

}
</script>
<style lang="scss" scoped>
table {
  border-color: #E9EAEB50;
  border-collapse: collapse;
  line-height: 30px;
  font-size: 16px;
  width: 100%;

  th, td {
    padding: 0 16px;
    font-size: 15px;
    color: #1D2433;
    border-bottom: 1px solid #ddd;
  }

  thead {
    background-color: #F4F5FA;

    th {
      font-weight: 500;
      color: #6B7280

    }

  }

  tfoot {
    font-weight: 700;
  }

  .p0 {
    padding: 0 !important;
  }


}

</style>
