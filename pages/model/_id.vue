<template>
  <div>
    <Breadcrumbs :maps="map_links" />
    <v-card color="#fff" elevation="0" v-if="modelItem">
      <v-card-title class="d-flex justify-space-between">
        <div>{{ modelItem?.name }}</div>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="4">
            <div class="label">Model category</div>
            <v-text-field
              v-model="modelItem.name"
              dense
              hide-details
              outlined
              class="base rounded-lg"
              color="#544B99"
              placeholder="Model category"
              validate-on-blur
            />
          </v-col>
          <v-col cols="12" lg="4">
            <div class="label">Creator</div>
            <v-text-field
              v-model="modelItem.createdBy"
              dense
              hide-details
              outlined
              class="base rounded-lg"
              color="#544B99"
              placeholder="Creator"
              validate-on-blur
              disabled
            />
          </v-col>
          <v-col cols="12" lg="4">
            <div class="label">Created at</div>
            <v-text-field
              v-model="modelItem.createdAt"
              dense
              hide-details
              outlined
              class="base rounded-lg"
              color="#544B99"
              placeholder="Created at"
              validate-on-blur
              disabled
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="4">
            <div class="label">Category production price</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="calculations"
                class="rounded-lg base rounded-l-lg rounded-r-0"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="0"
                validate-on-blur
                disabled
              />
              <v-select
                :items="currency_enums"
                v-model="currency"
                append-icon="mdi-chevron-down"
                class="rounded-lg base rounded-r-lg rounded-l-0"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                style="max-width: 100px"
                validate-on-blur
                disabled
              />
            </div>
          </v-col>
          <v-col cols="12" lg="8">
            <div class="label">Description</div>
            <v-text-field
              v-model="modelItem.description"
              dense
              hide-details
              outlined
              class="base rounded-lg"
              color="#544B99"
              placeholder="Description"
              validate-on-blur
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="editModelData"
          color="#544B99"
          dark
          class="text-capitalize font-weight-bold mx-3 mb-4 px-5"
          height="40"
          >{{ $t("update") }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card color="#fff" elevation="0" class="mt-5" v-if="modelOperationsItem">
      <v-card-title class="d-flex justify-space-between">
        <div>Model Operations</div>
        <v-btn
          @click="addOperation"
          color="#544B99"
          dark
          class="text-capitalize font-weight-bold px-5"
          height="40"
          >+ Add Operation
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-spacer />
          <v-col cols="12" lg="2">
            <div class="d-flex justify-end">
              <v-btn
                @click="resetModelOperations"
                outlined
                color="#544B99"
                elevation="0"
                class="text-capitalize ml-1 rounded-lg font-weight-bold"
                height="30"
                >Reset
              </v-btn>
              <v-btn
                @click="deleteOperationsBtn"
                class="rounded-lg ml-1 text-capitalize font-weight-bold white--text"
                color="#FF4E4F"
                elevation="0"
                height="30"
                :disabled="!selectedOperations.length"
                >Delete
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            lg="6"
            v-for="(item, id) in modelOperationsItem"
            :key="id"
          >
            <div class="d-flex align-center">
              <div class="mr-1">
                <input type="checkbox" v-model="selectedOperations" :value="item.modelOperationId" class="check">
              </div>
              <v-text-field
                v-model="item.modelOperationName"
                class="rounded-lg base rounded-l-lg rounded-r-lg rounded-r-0 mr-1"
                style="max-width: 250px"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="name"
                validate-on-blur
                disabled
              />
              <v-text-field
                @input="updateOperation(item)"
                @focus="getOldCurrency(item.currency)"
                v-model="item.amount"
                class="rounded-lg base rounded-l-lg rounded-r-0"
                style="max-width: 100px"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="0"
                validate-on-blur
              />
              <v-select
                @focus="getOldCurrency(item.currency)"
                @change="updateOperation(item)"
                v-model="item.currency"
                :items="currency_enums"
                append-icon="mdi-chevron-down"
                class="rounded-lg base rounded-r-lg rounded-l-0"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                style="max-width: 100px; margin-left: 1px"
                validate-on-blur
              />
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="confirmUpdateOperation"
          color="#544B99"
          dark
          class="text-capitalize font-weight-bold mx-3 mb-4 px-5"
          height="40"
          >{{ $t("userManagement.child.save") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      map_links: [
        {
          text: "Home",
          disabled: false,
          to: "/",
          icon: true,
        },
        {
          text: "Model categories",
          disabled: false,
          to: "/model",
          icon: true,
        },
        {
          text: "Detail",
          disabled: true,
          to: "",
          icon: false,
        },
      ],
      currency_enums: ["USD", "UZS", "RUB", "EUR"],
      modelOperationsItem: null,
      modelItem: null,
      oldCurrency: "",
      selectedOperations: [],
      calculations: 0,
      currency:"UZS",
    };
  },
  computed: {
    ...mapGetters({
      selectedModelOperations: "model/selectedModelOperations",
      selectedModel: "model/selectedModel",
    }),
  },
  watch: {
    selectedModelOperations(val) {
      this.modelOperationsItem = JSON.parse(JSON.stringify(val));

      this.calculations = 0
      this.modelOperationsItem.forEach((item) =>{
        this.calculations = this.calculations + item.amount
      })
      this.currency = this.modelOperationsItem[0].currency
    },
    selectedModel(val) {
      this.modelItem = JSON.parse(JSON.stringify(val));
    },
  },
  async created() {
    await this.getSelectedModel(this.$route.params.id);
    await this.getSelectedModelOperations(this.$route.params.id);
  },
  methods: {
    ...mapActions({
      getSelectedModelOperations: "model/getSelectedModelOperations",
      getSelectedModel: "model/getSelectedModel",
      updateModelData: "model/updateModelData",
      resetOperations: "model/resetOperations",
      deleteOperations: "model/deleteOperations",
      updateOperations: "model/updateOperations",
    }),
    async editModelData() {
      await this.updateModelData(this.modelItem);
    },
    addOperation() {
      this.$router.push(this.localePath("model-operations"));
    },
    async resetModelOperations() {
      await this.resetOperations(this.$route.params.id);
      this.selectedOperations = []
    },
    getOldCurrency(currency) {
      this.oldCurrency = currency;
    },
    updateOperation(item) {
      item.amount == ""
        ? (item.amount = 0)
        : (item.amount = Number(item.amount));
      if (this.oldCurrency !== item.currency) {
        this.modelOperationsItem.forEach((el) => {
          el.currency = item.currency;
        });
      }
    },
    async confirmUpdateOperation(){
      const data = {
        modelCategoryId: this.$route.params.id,
        requests: [...this.modelOperationsItem]
      };

      this.calculations = 0
      this.modelOperationsItem.forEach((item) =>{
        this.calculations = this.calculations + item.amount
      })
      this.currency = this.modelOperationsItem[0].currency

      this.updateOperations(data)
    },
    async deleteOperationsBtn() {
      const data = this.selectedOperations;
      const id = this.$route.params.id;
      await this.deleteOperations({ id, data });
      this.selectedOperations = []
    },
  },
};
</script>

<style lang="scss">
.check[type="checkbox"] {
  accent-color: #544B99;
  mix-blend-mode: multiply;
  height: 18px;
  width: 18px;
}
</style>
