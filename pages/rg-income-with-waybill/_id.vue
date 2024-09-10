<template>
  <div>
    <v-card elevation="0" class="mb-4">
      <v-card-title>
        <div>{{ $route.params.id==='add-garment'?'Add':'Edit' }}  Ready garment</div>
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-4">
        <v-form ref="waybill_detail" v-model="new_validate" lazy-validation>
          <v-row>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">  {{ $t('readyWarehouse.id.internalWaybillNo') }}</div>
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
                :placeholder="$t('readyWarehouse.id.internalWaybillNo')"
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
              <div class="label">{{ $t('readyWarehouse.id.dateOfWaybill') }}</div>
              <div style="height: 40px !important">
                <el-date-picker
                  readonly
                  v-model="waybill.waybillDate"
                  :picker-options="pickerShortcuts"
                  class="base_picker"
                  placeholder="dd.MM.yyyy"
                  style="width: 100%; height: 100%"
                  type="date"
                  value-format="dd.MM.yyyy"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('readyWarehouse.id.sent') }} </div>
              <v-text-field
                disabled
                v-model="waybill.sewedBy"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder=" $t('readyWarehouse.id.sent')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">1.{{  $t('readyWarehouse.id.givenBy') }}</div>
              <v-text-field
                disabled
                v-model="waybill.givenByPosition1"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder=" $t('readyWarehouse.id.givenBy')"
                validate-on-blur
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('readyWarehouse.id.name1') }}</div>
              <v-text-field
                disabled
                v-model="waybill.givenByName1"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder=" $t('readyWarehouse.id.name1') "
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">2.{{  $t('readyWarehouse.id.givenBy') }}</div>
              <v-text-field
                disabled
                v-model="waybill.givenByPosition2"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder=" $t('readyWarehouse.id.givenBy')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">2. {{  $t('readyWarehouse.id.name') }}</div>
              <v-text-field
                disabled
                v-model="waybill.givenByName2"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder=" $t('readyWarehouse.id.name') "
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('readyWarehouse.id.transportNumber')  }}</div>
              <v-text-field
                disabled
                v-model="waybill.transportationNumber"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('readyWarehouse.id.transportNumber') "
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('readyWarehouse.id.transportationDepWorker')  }}</div>
              <v-text-field
                disabled
                v-model="waybill.transportationWorker"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('readyWarehouse.id.transportationDepWorker')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">1. {{ $t('readyWarehouse.id.receiver') }}</div>
              <v-text-field
                v-model="waybill.receiverByPosition"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('readyWarehouse.id.receiver')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('readyWarehouse.id.name') }} 1</div>
              <v-text-field
                v-model="waybill.receiverByName"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('readyWarehouse.id.name') "
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('readyWarehouse.id.checkedBy')  }}</div>
              <v-text-field
                v-model="waybill.checkedByPosition"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('readyWarehouse.id.checkedBy')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('readyWarehouse.id.name') }}</div>
              <v-text-field
                v-model="waybill.checkedByName"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder=" $t('readyWarehouse.id.name') "
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
               {{  $t('userManagement.child.save')  }}
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
                <ReadyGarment/>
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
          
        </v-tabs-items>
      </v-tabs>
    </v-card>

  </div>
</template>
<script>
import ReadyGarment from "@/components/SecondaryWarehouse/ReadyGarment.vue";
import Documents from "@/components/SecondaryWarehouse/Documents.vue";
import SecondSort from "@/components/SecondaryWarehouse/SecondSort.vue";
import Domestic from "@/components/SecondaryWarehouse/Domestic.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components:{
    ReadyGarment,
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
      items: ["Ready garments","Documents",],
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
      this.waybill=JSON.parse(JSON.stringify(val))
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
        type: "CENTRAL",
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
        type: "CENTRAL",
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
