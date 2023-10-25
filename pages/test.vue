<template>
  <v-app>
    <v-container>
      <v-data-table :headers="headers" :items="items" item-key="orderNumber">
        <template v-slot:item.accessorys="{ item }">
          <v-btn small @click="toggleExpansion(item)">
            {{ isExpanded(item) ? 'Hide Accessories' : 'View Accessories' }}
          </v-btn>
        </template>
        <template v-if="expandedItem">
          <v-card>
            <v-card-title>Accessories Details</v-card-title>
            <v-card-text>
              <v-data-table :headers="accessoryHeaders" :items="expandedItem.accessorys" item-key="accessoryNumber">
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.accessoryNumber }}</td>
                    <td>{{ item.specification }}</td>
                    <td>{{ item.orderedQuantity }}</td>
                    <td>{{ item.deliveredFactQuantity }}</td>
                    <td>{{ item.pricePerUnit }}</td>
                    <td>{{ item.totalPice }}</td>
                    <td>{{ item.supplier }}</td>
                    <td>{{ item.arrivedDate }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </template>
      </v-data-table>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Order Number", value: "orderNumber" },
        { text: "Model Number", value: "modelNumber" },
      ],
      accessoryHeaders: [
        { text: "Accessory Number", value: "accessoryNumber" },
        { text: "Specification", value: "specification" },
        { text: "Ordered Quantity", value: "orderedQuantity" },
        { text: "Delivered Fact Quantity", value: "deliveredFactQuantity" },
        { text: "Price Per Unit", value: "pricePerUnit" },
        { text: "Total Price", value: "totalPice" },
        { text: "Supplier", value: "supplier" },
        { text: "Arrived Date", value: "arrivedDate" },
      ],
      items: [
        {
          orderNumber: "FTSK-0521",
          modelNumber: "ML005",
          accessorys: [
            {
              accessoryNumber: "Button",
              specification: "red, 4 holes D0.5",
              orderedQuantity: "900 kg",
              deliveredFactQuantity: "900 kg",
              pricePerUnit: "0.02 USD",
              totalPice: "20 USD",
              supplier: "Uzum MCHJ",
              arrivedDate: "23.03.2023",
            },
            // Add more accessories here if needed
          ],
        },
      ],
      expandedItem: null,
    };
  },
  methods: {
    toggleExpansion(item) {
      if (this.isExpanded(item)) {
        this.expandedItem = null;
      } else {
        this.expandedItem = item;
      }
    },
    isExpanded(item) {
      return this.expandedItem === item;
    },
  },
};
</script>

<style>
/* Your custom styles here */
</style>


