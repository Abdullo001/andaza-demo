<template>
  <div>
    <v-card elevation="0" class="mb-4">
      <v-card-title>
        <div>Waybill</div>
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-4">
        <v-form ref="waybill_detail" v-model="new_validate" lazy-validation>
          <v-row>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Internal waybill No.</div>
              <v-combobox
                v-model="waybill.waybillNumber"
                :items="waybillList"
                :return-object="true"
                :search-input.sync="waybillSearch"
                class="rounded-lg base d-flex align-center justify-center mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                item-text="number"
                item-value="number"
                outlined
                placeholder="Enter branch name"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>

            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Date of waybill</div>
              <div style="height: 40px !important">
                <el-date-picker
                  readonly
                  v-model="waybill.waybillDate"
                  :picker-options="pickerShortcuts"
                  class="base_picker"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  style="width: 100%; height: 100%"
                  type="datetime"
                  value-format="dd.MM.yyyy HH:mm:ss"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Sent from</div>
              <v-text-field
                disabled
                v-model="waybill.partner"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Enter from"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">1. Given by</div>
              <v-text-field
                disabled
                v-model="waybill.givenByPosition1"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Enter position"
                validate-on-blur
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Name 1</div>
              <v-text-field
                disabled
                v-model="waybill.givenByName1"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Enter name"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">2. Given by</div>
              <v-text-field
                disabled
                v-model="waybill.givenByPosition2"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Enter position"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">2. Given by</div>
              <v-text-field
                disabled
                v-model="waybill.givenByPosition2"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Enter name"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Transport number</div>
              <v-text-field
                disabled
                v-model="waybill.transportNumber"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Enter transport number"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Transportation dep. worker</div>
              <v-text-field
                disabled
                v-model="waybill.transportationWorker"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Enter transportation worker"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">1. Receiver</div>
              <v-text-field
                v-model="waybill.receiverByPosition"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Enter receiver position"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Name 1</div>
              <v-text-field
                v-model="waybill.receiverByName"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Enter receiver name"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Checked by</div>
              <v-text-field
                v-model="waybill.checkedByPosition"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Enter checked by"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Name</div>
              <v-text-field
                v-model="waybill.checkedByName"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Name"
                validate-on-blur
              />
            </v-col>

            <v-col class="d-flex justify-end align-end" cols="12">
              <v-btn
                v-if="this.$route.params.id === 'add-garment'"
                class="text-capitalize rounded-lg"
                color="#544B99"
                dark
                height="44"
                width="130"
                @click="saveItem"
              >
                Save
              </v-btn>
              <v-btn
                v-else
                class="text-capitalize rounded-lg"
                color="#544B99"
                dark
                height="44"
                width="130"
                @click="updateItem"
              >
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      new_validate: true,
      waybillSearch: "",
      waybill: {},
    };
  },

  created() {
    this.getWaybillList({ page: 0, size: 10, type: "INTERNAL" });
  },

  computed: {
    ...mapGetters({
      waybillList: "waybill/waybillList",
    }),
  },

  watch: {
    waybillSearch(val) {
      this.getWaybillList({ page: 0, size: 10, type: "INTERNAL", number: val });
    },
    "waybill.waybillNumber"(val) {
      this.waybill.waybillDate = val.sendDate;
      this.waybill.partner = val.partnerAddress;
    },
  },

  methods: {
    ...mapActions({
      getWaybillList: "waybill/getWaybillList",
      createItem: "generalWarehouse/createItem",
    }),
    saveItem() {
      const data = {
        checkedByName: this.waybill.checkedByName,
        checkedByPosition: this.waybill.checkedByPosition,
        receiverName: this.waybill.receiverByName,
        receiverPosition: this.waybill.receiverByPosition,
        type: "SECONDARY",
        waybillId: this.waybill.waybillNumber.id,
      };
      this.createItem(data);
    },
    updateItem() {},
  },
};
</script>
<style lang=""></style>
