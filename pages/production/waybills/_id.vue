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
              <v-text-field
                v-model="waybill.waybillNumber"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Enter waybill No."
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Waybill date</div>
              <div style="height: 40px !important">
                <el-date-picker
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
              <div class="label">Sending from</div>
              <v-combobox
                v-model="waybill.branchId"
                :items="partnerLists"
                :return-object="true"
                :search-input.sync="branchSearch"
                class="rounded-lg base d-flex align-center justify-center mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                item-text="name"
                item-value="name"
                outlined
                placeholder="Enter sender from"
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
              <div class="label">1. Given by</div>
              <v-text-field
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
          <v-row :class="showObject">
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Name 1</div>
              <v-text-field
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
                v-model="waybill.givenByName2"
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
                v-model="waybill.transportationNumber"
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
                placeholder="Enter checked position"
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
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Creator</div>
              <v-text-field
                v-model="waybill.createdBy"
                background-color="#F8F4FE"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                placeholder="Creator"
                readonly
                validate-on-blur
              />
            </v-col>

            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Created time</div>
              <v-text-field
                v-model="waybill.createdAt"
                class="rounded-lg base mb-4"
                dense
                disabled
                height="44"
                hide-details
                outlined
                placeholder="Created at"
                validate-on-blur
              >
                <template #append>
                  <v-img src="/date-icon.svg" />
                </template>
              </v-text-field>
            </v-col>

            <!-- <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Updated time</div>
              <v-text-field
                v-model="waybill.updatedAt"
                background-color="#F8F4FE"
                class="rounded-lg base"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                placeholder="Update at"
                readonly
                validate-on-blur
              >
                <template #append>
                  <v-img src="/date-icon.svg" />
                </template>
              </v-text-field>
            </v-col> -->

            <v-col class="d-flex justify-end align-end" cols="12">
              <v-btn
                v-if="this.$route.params.id === 'add-waybill'"
                class="text-capitalize rounded-lg"
                color="#544B99"
                dark
                height="44"
                width="130"
                @click="saveWaybill"
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
                @click="update"
              >
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-6 pr-4">
        <v-spacer />
        <ShowBtnComponent :click-btn="clickBtn" :show_btn_value="show_btn" />
        <v-spacer />
      </v-card-actions>
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
              <v-card-text>
                <GenTab :type="`FIRST_CLASS`" :tabName="`1-sort`"/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <GenTab :type="`SECOND_CLASS`" :tabName="`2-sort`"/>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>

      </v-tabs>

      <div class="d-flex align-center justify-center mt-16 pb-6">
        <v-btn
          class="text-capitalize rounded-lg"
          color="#544B99"
          outlined
          height="44"
          width="250"
          @click="getPdf"
          :loading="loading"
        >
          Generate PDF
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ShowBtnComponent from "@/components/ShowComponentBtn/ShowBtn.vue";
import GenTab from '@/components/Waybill/GenTab.vue';

export default {
  components:{
    ShowBtnComponent,
    GenTab
  },
  data() {
    return {
      show_btn: true,
      tab:"",
      waybill: {
        waybillNumber: "",
        branchId: "",
        branchAddress: "",
        waybillDate: "",
      },
      new_validate: true,
      branchSearch: "",
      id: null,
      items:["1-sort","2-sort"],
      loading:false,
    };
  },

  created() {
    this.getPartnerList({page:0, size:10});
  },

  computed: {
    showObject() {
      return {
        show_active: this.show_btn
      }
    },
    ...mapGetters({
      partnerLists: "partners/partnerList",
      oneWaybill: "waybill/oneWaybill",
      newWaybillId: "waybill/newWaybillId",
      pdfList: "waybill/waybillForm",
    }),
  },

  watch: {
    branchSearch(val) {
      this.getPartnerList({page:0, size:10,partnerName:val});
    },

    oneWaybill(val){
      this.waybill={...val}
      this.waybill.waybillNumber=val.number
      this.waybill.branchId={id:val.partnerId,name:val.partner}
      this.waybill.waybillDate=val.sendDate
    },

    newWaybillId(val){
      this.id=val
    },

    pdfList(val) {
      this.loading=false
      const blob = new Blob(
        [new Uint8Array([...val].map((char) => char.charCodeAt(0)))],
        { type: "application/pdf" }
      );
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", objectUrl);
      a.click();
    },
  },

  methods: {
    ...mapActions({
      getPartnerList: "partners/getPartnerList",
      createWaybillList: "waybill/createWaybillList",
      updateWaybill: "waybill/updateWaybill",
      getOneWaybill: "waybill/getOneWaybill",
      getWaybilForm: "waybill/getWaybilForm",
    }),
    clickBtn() {
      this.show_btn = !this.show_btn;
    },
    saveWaybill() {
      const data = {
        ...this.waybill,
        number: this.waybill.waybillNumber,
        partnerId: this.waybill.branchId.id,
        sendDate: this.waybill.waybillDate,
        type: "INTERNAL",
      };
      this.createWaybillList(data);
    },
    update() {
      const data = {
        ...this.waybill,
        number: this.waybill.waybillNumber,
        partnerId: this.waybill.branchId.id,
        sendDate: this.waybill.waybillDate,
        type: "INTERNAL",
      };
      this.updateWaybill({ data, id: this.id });
    },
    getPdf(){
      this.loading=true
      this.getWaybilForm(this.id)
    }
  },

  mounted() {
    const param = this.$route.params.id;
    if (param !== "add-waybill") {
      this.id = param;
      this.getOneWaybill(param)
    }
  },
};
</script>
<style lang="scss" scoped>
.show_active {
  height: 0;
  overflow: hidden;
}
</style>
