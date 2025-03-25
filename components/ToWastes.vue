<template>
  <div>
    <v-data-table
      class="rounded-lg"
      :headers="headers"
      :items="productionWastesList"
      hide-default-footer
    >
      <template #item.action="{ item }">
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
              @click="getHistory(item)"
            >
              <v-img src="/history.svg" max-width="20" />
            </v-btn>
          </template>
          <span class="text-capitalize">History</span>
        </v-tooltip>
        <v-tooltip top color="#544B99">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#544B99"
              v-on="on"
              v-bind="attrs"
              @click="sendWarehouse(item)"
            >
              <v-icon>mdi-warehouse</v-icon>
            </v-btn>
          </template>
          <span>Send warehouse</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <v-dialog v-model="new_dialog" width="600">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            Passing to waste warehouse
          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="new_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="4">
                <div class="label">Weight/Kg.</div>
                <v-text-field
                  v-model="passing.weight"
                  placeholder="0"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  validate-on-blur
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="8">
                <div class="label">Name</div>
                <v-text-field
                  v-model="passing.name"
                  placeholder="Enter name"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  validate-on-blur
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="label">Batch No.Of Fabric</div>
                <v-text-field
                  v-model="passing.batchNumber"
                  placeholder="Enter batch number"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
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
            outlined
            color="#544B99"
            width="130"
            @click="new_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="passToWare"
          >
            save
          </v-btn>
        </v-card-actions>
        <div class="px-4 pb-4">
          <v-data-table
            :headers="historyHeaders"
            hide-default-footer
            :items="productionHistoryList"
            class="mt-4 rounded-lg"
            style="border: 1px solid #e9eaeb"
          >
          </v-data-table>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="history_dialog" width="600">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            History
          </div>
          <v-btn icon color="#544B99" @click="history_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-data-table
            :headers="historyHeaders"
            hide-default-footer
            :items="productionHistoryList"
            class="mt-4 rounded-lg"
            style="border: 1px solid #e9eaeb"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      history_dialog:false,
      passing: {
        weight: "",
        name: "",
        batchNumber: "",
        entityId: "",
      },
      new_validate: true,
      new_dialog: false,
      headers: [
        {
          text: "Fabric specification",
          value: "fabricSpecification",
          sortable: false,
        },
        { text: "Color", value: "color", sortable: false },
        { text: "Weight/Kg", value: "weight", sortable: false },
        { text: "Wastes name", value: "name", sortable: false },
        { text: "Actions", value: "action", sortable: false },
      ],

      historyHeaders: [
        { text: "Date", value: "createdAt", sortable: false },
        { text: "Weight", value: "weight", sortable: false },
        { text: "Name", value: "name", sortable: false },
        { text: "Batch No.", value: "batchNumber", sortable: false },
        {
          text: "Specification",
          value: "fabricSpecification",
          sortable: false,
        },
      ],
      historyList:[]
    };
  },

  computed: {
    ...mapGetters({
      productionWastesList: "wastesWarehouse/productionWastesList",
      productionHistoryList: "wastesWarehouse/productionHistoryList",
    }),
  },

  watch: {},

  methods: {
    ...mapActions({
      getProductionWastesList: "wastesWarehouse/getProductionWastesList",
      sendToSupply: "wastesWarehouse/sendToSupply",
      getProductionHistoryList: "wastesWarehouse/getProductionHistoryList",
    }),
    sendWarehouse(item) {
      this.new_dialog = true;
      this.passing.entityId = item.id;
      this.getProductionHistoryList(item.id);
    },
    getHistory(item) {
      this.getProductionHistoryList(item.id);
      this.history_dialog=true
    },
    passToWare() {
      const data = {
        ...this.passing,
      };
      this.sendToSupply({ modelId: this.$route.params.id, data });
      this.new_dialog = false;
    },
  },

  mounted() {
    const id = this.$route.params.id;
    this.getProductionWastesList(id);
  },
};
</script>
<style lang=""></style>
