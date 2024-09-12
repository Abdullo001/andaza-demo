<template>
  <div>
    <v-card elevation="0" class="mb-4">
      <v-card-title>
        <div>{{ $t('supplyWarehouse.waybill') }}</div>
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-4">
        <v-form ref="waybill_detail" v-model="new_validate" lazy-validation>
          <v-row>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('secondaryWarehouse.waybill.internalWaybillNo') }}</div>
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
                :placeholder="$t('secondaryWarehouse.waybill.internalWaybillNo')"
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
              <div class="label">{{ $t('secondaryWarehouse.waybill.dateOfWaybill') }}</div>
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
              <div class="label">{{ $t('secondaryWarehouse.waybill.sentFrom') }}</div>
              <v-text-field
                disabled
                v-model="waybill.sewedBy"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder=" $t('secondaryWarehouse.waybill.sentFrom')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('secondaryWarehouse.waybill.givenBy1') }}</div>
              <v-text-field
                disabled
                v-model="waybill.givenByPosition1"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('secondaryWarehouse.waybill.enterPosition')"
                validate-on-blur
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('secondaryWarehouse.waybill.name1') }}</div>
              <v-text-field
                disabled
                v-model="waybill.givenByName1"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('secondaryWarehouse.waybill.name1')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('secondaryWarehouse.waybill.givenBy2') }}</div>
              <v-text-field
                disabled
                v-model="waybill.givenByPosition2"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('secondaryWarehouse.waybill.enterPosition')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('secondaryWarehouse.waybill.givenBy2') }}</div>
              <v-text-field
                disabled
                v-model="waybill.givenByPosition2"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
              :placeholder="$t('secondaryWarehouse.waybill.enterPosition')" 
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('secondaryWarehouse.waybill.transportNumber') }}</div>
              <v-text-field
                disabled
                v-model="waybill.transportNumber"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="  $t('secondaryWarehouse.waybill.transportNumber')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('secondaryWarehouse.waybill.transportationWorker') }}</div>
              <v-text-field
                disabled
                v-model="waybill.transportationWorker"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('secondaryWarehouse.waybill.transportationWorker')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('secondaryWarehouse.waybill.receiver') }}</div>
              <v-text-field
                v-model="waybill.receiverByPosition"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder=" $t('secondaryWarehouse.waybill.receiver')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('secondaryWarehouse.waybill.name1') }}</div>
              <v-text-field
                v-model="waybill.receiverByName"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder=" $t('secondaryWarehouse.waybill.name1')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('secondaryWarehouse.waybill.checkedBy') }}</div>
              <v-text-field
                v-model="waybill.checkedByPosition"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder=" $t('secondaryWarehouse.waybill.checkedBy') "
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('prefinances.child.name')  }}</div>
              <v-text-field
                v-model="waybill.checkedByName"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder=" $t('prefinances.child.name')"
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
              {{ $t('secondaryWarehouse.waybill.save') }}
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
    <v-card class="mt-6 mb-8" flat>
      <v-tabs v-model="tab">
        <v-tabs-slider color="#544B99"/>
        <v-tab
          v-for="item in items"
          :key="item"
          active-class="active-tab"
          class="text-capitalize primary-color"
        >
          {{ item }}
        </v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <Overproduction/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <SecondSort/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <Documents/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <Domestic/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          
        </v-tabs-items>
      </v-tabs>
    </v-card>

  </div>
</template>
<script>
import Overproduction from "@/components/SecondaryWarehouse/Overproduction.vue";
import Documents from "@/components/SecondaryWarehouse/Documents.vue";
import SecondSort from "@/components/SecondaryWarehouse/SecondSort.vue";
import Domestic from "@/components/SecondaryWarehouse/Domestic.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components:{
    Overproduction,
    Documents,
    SecondSort,
    Domestic,
  },
  data() {
    return {
      tab:"",
      new_validate: true,
      waybillSearch: "",
      waybill: {},
      items: [this.$t('secondaryWarehouse.overproductions.title'),this.$t('secondaryWarehouse.overproductions.twoSort'),
      this.$t('secondaryWarehouse.overproductions.documents'),this.$t('secondaryWarehouse.overproductions.domesticMarketSales'),"Xom matolar"],
    };
  },

  created() {
    this.getWaybillList({ page: 0, size: 10, type: "INTERNAL" });
  },

  computed: {
    ...mapGetters({
      waybillList: "waybill/waybillList",
      item: "generalWarehouse/item",
      newId: "generalWarehouse/newId",
    }),
  },

  watch: {
    // tab(val){
    //   const warehouseId=this.$route.params.id!=="add-garment"?this.$route.params.id:this.newId
    //   if(val===3){
    //     this.getDomesticList(warehouseId)
    //   }
    // },
    item(val){
      this.waybill={...val}
      this.waybill.waybillNumber={number:val.waybillNumber,id:val.waybillId,sendDate:val.waybillDate,partnerAddress:val.fromAddress}
    },
    waybillSearch(val) {
      this.getWaybillList({ page: 0, size: 10, type: "INTERNAL", number: val });
    },
    "waybill.waybillNumber"(val) {
      this.waybill.waybillDate = val.sendDate;
      this.waybill.sewedBy = val.partnerAddress;
    },
  },

  methods: {
    ...mapActions({
      getWaybillList: "waybill/getWaybillList",
      createItem: "generalWarehouse/createItem",
      getOneItem: "generalWarehouse/getOneItem",
      updateWarehouse: "generalWarehouse/updateItem",
      getDomesticList:"garment/getDomesticList"
      
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
    updateItem() {
      const data = {
        checkedByName: this.waybill.checkedByName,
        checkedByPosition: this.waybill.checkedByPosition,
        receiverName: this.waybill.receiverByName,
        receiverPosition: this.waybill.receiverByPosition,
        type: "SECONDARY",
        waybillId: this.waybill.waybillNumber.id,
      };
      const id = this.$route.params.id

      this.updateWarehouse({data,id})
    },
  },

  mounted(){
    const id = this.$route.params.id
    if(id!=="add-garment"){
      this.getOneItem(id)
    }
  }
};
</script>
<style lang="scss" scoped>
.primary-color{
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #544B99;
}
</style>
