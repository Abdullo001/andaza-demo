<template>
  <div>
    <v-toolbar elevation="0">
      <v-toolbar-title
        class="d-flex w-full "
      >
        <div>Invoice</div>

      </v-toolbar-title>
    </v-toolbar>

    <table
      border="1px solid #E9EAEB"
      cellspacing="0"

    >
      <thead>
      <tr>
        <th rowspan="2">Color</th>
        <th :colspan="tableColumn.length">Actual Shipping quantity</th>
        <th rowspan="2">Currency</th>
        <th rowspan="2">Price</th>
        <th rowspan="2">Total price</th>
        <th rowspan="2">Action</th>
      </tr>
      <tr>
        <th v-for="item in tableColumn" :key="item">{{ item }}</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(item,idx) in tableRow" :key="item">
        <td>{{ item }}</td>
        <td v-for="el in tableColumn" :key="el" class="pa-0">
          <v-text-field
            solo
            hide-details
            placeholder="0.0"
            flat
            class="pa-0 ma-0 table-field"
          />
        </td>
        <td v-if="idx<=0" :rowspan="tableRow.length">USD</td>
        <td v-if="idx<=0" :rowspan="tableRow.length">2.55</td>
        <td v-if="idx<=0" :rowspan="tableRow.length">14.139,75</td>
        <td v-if="idx<=0" :rowspan="tableRow.length">
          <div class="d-flex align-center justify-center">
            <v-tooltip
              top
              color="green"
              class="pointer"
              v-if="Object.keys(item).length > 2"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  color="green"

                >
                  <v-img src="/edit-active.svg" max-width="22"/>
                </v-btn>

              </template>
              <span class="text-capitalize">Edit</span>
            </v-tooltip>

            <v-tooltip
              top
              class="pointer"
              v-if="Object.keys(item).length > 2"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  color="red"

                >
                  <v-img src="/delete.svg" max-width="27"/>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </div>
        </td>
      </tr>
      </tbody>

      <tfoot>
      <tr>
        <td>Total:</td>
        <td v-for="(item,idx) in tableTotal" :key="item" class="p0">
          <v-text-field
            solo
            v-model="tableTotal[idx]"
            hide-details
            placeholder="0.0"
            flat
            class="pa-0 ma-0 table-field"
            readonly
          />
        </td>
        <td colspan="3"></td>

        <td>
          <v-btn
            outlined
            elevation="0"
            color="#7631FF"
            class="text-capitalize rounded-lg font-weight-bold"
            width="130"
            height="44"

          >
            Save
          </v-btn>
        </td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableColumn: [
        "98", "98", "98", "98", "98",
      ],
      tableRow: [
        "Red",
        "Black",
        "Blue",
      ],

      tableTotal: [
        "800",
        "900",
        "1000",
        "1100",
        "1200",
      ]

    }
  }
}
</script>
<style lang="scss" scoped>
table {
  border-color: #E9EAEB50;
  line-height: 30px;
  font-size: 16px;

  th, td {
    padding: 0 16px;
    color: #1D2433;

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
