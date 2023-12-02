<template>
  <div>
    <v-toolbar elevation="0">
      <v-toolbar-title
        class="d-flex w-full "
      >
        <div>Shipping models</div>

      </v-toolbar-title>
    </v-toolbar>
    <template v-for="group in groupedShippingOperationList">
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
        </tr>
        </thead>
        <tbody>
        <template v-for="item in group" >
          <tr class="text-center">
            <td>{{ item.orderNumber }}</td>
            <td>{{ item.modelNumber }}</td>
            <td>{{ item.modelName }}</td>
            <td>{{ item.color }}</td>
            <td v-for="(size, idx) in item.sizeDistribution" :key="idx">{{ size.quantity }}</td>
            <td>{{ item.total }}</td>
            <td>{{ item.pricePerPc }}</td>
            <td>{{ item.totalAmount }}</td>
          </tr>
        </template>
        </tbody>
      </table>
    </template>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
export default {
  data() {
    return {
    }
  },
  created() {

  },
  watch: {
  },
  computed: {
    ...mapGetters({
      shippingOperationList: "shipping/shippingOperationList",
    }),
    groupedShippingOperationList() {
      const groupedData = {};
      this.shippingOperationList.forEach((item) => {
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
      getShippingOperationList: "shipping/getShippingOperationList",
    })
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
