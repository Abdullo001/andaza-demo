<template >
  <div>
    <Breadcrumbs :maps="map_links"/>

    <v-card elevation="0">
      <v-card-title>
        <div>
         {{ $t('samplesBox.samples') }}
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-form lazy-validation v-model="new_validate" ref="order_detail">
          <v-row>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('planning.id.orderNumber') }}</div>
              <v-combobox
                v-model="sampleDetail.orderNumber"
                :items="ordersList"
                :search-input.sync="orderNumSearch"
                item-text="orderNumber"
                item-value="orderNumber"
                validate-on-blur
                outlined
                disabled
                hide-details
                height="44"
                class="rounded-lg base d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                :placeholder="$t('planning.id.orderNumber') "
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
              <div class="label">{{$t('listsModels.child.modelNumber')}}</div>
              <v-combobox
                v-model="sampleDetail.modelNumber"
                :items="modelsList"
                :search-input.sync="modelNumSearch"
                item-text="modelNumber"
                item-value="id"
                validate-on-blur
                outlined
                hide-details
                height="44"
                class="rounded-lg base d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                :placeholder="$t('listsModels.child.modelNumber')"
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
              <div class="label">{{ $t('listsModels.child.modelName') }}</div>
              <v-text-field
                outlined
                hide-details
                disabled
                height="44"
                class="rounded-lg base mb-4"
                v-model="sampleDetail.modelName"
               :placeholder="$t('listsModels.child.modelName')"
                validate-on-blur
                dense
                color="#544B99"
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('planning.id.clientName') }}</div>
              <v-text-field
                outlined
                hide-details
                disabled
                height="44"
                class="rounded-lg base mb-4"
                v-model="sampleDetail.client"
                :placeholder=" $t('planning.id.clientName')"
                validate-on-blur
                dense
                color="#544B99"
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('samplesBox.id.orderQuantity') }}</div>
              <v-text-field
                outlined
                hide-details
                disabled
                height="44"
                class="rounded-lg base mb-4"
                v-model="sampleDetail.orderedQuantity"
                :placeholder="$t('samplesBox.id.orderQuantity')"
                validate-on-blur
                dense
                color="#544B99"
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('samplesBox.id.createdBy') }}</div>
              <v-text-field
                v-model="sampleDetail.createdBy"
                :placeholder="$t('samplesBox.id.createdBy')"
                outlined
                hide-details
                height="44"
                class="rounded-lg base mb-4"
                validate-on-blur
                dense
                color="#544B99"
                background-color="#F8F4FE"
                readonly
                disabled
              />
            </v-col>

            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('samplesBox.id.createdAt') }}</div>
              <v-text-field
                v-model="sampleDetail.createdAt"
                :placeholder=" $t('samplesBox.id.createdAt')"
                outlined
                hide-details
                height="44"
                class="rounded-lg base mb-4"
                validate-on-blur
                dense
                color="#544B99"
                background-color="#F8F4FE"
                readonly
                disabled

              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
              </v-col>

              <v-col cols="12" lg="3" md="3" sm="6">
                <div class="label">{{  $t('samplesBox.id.updatedBy') }}</div>
                <v-text-field
                  v-model="sampleDetail.updatedBy"
                  :placeholder="  $t('samplesBox.id.updatedBy')"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  validate-on-blur
                  dense
                  color="#544B99"
                  background-color="#F8F4FE"
                  readonly
                  disabled

                />
              </v-col>


              <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{   $t('samplesBox.id.updatedAt') }}</div>
              <v-text-field
                v-model="sampleDetail.updatedAt"
                :placeholder=" $t('samplesBox.id.updatedAt')"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                validate-on-blur
                dense
                color="#544B99"
                background-color="#F8F4FE"
                readonly
                disabled
              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex justify-end align-end">
              <FinishProcessBtn v-bind="finishDate"/>
              <v-btn
                v-if="$route.params.id==='create-sample'"
                color="#544B99"
                class="text-capitalize rounded-lg"
                width="130"
                height="44"
                dark
                @click="createdSample"
              >
                 {{ $t('listsModels.child.save') }}
              </v-btn>
              <v-btn
                v-else
                color="#544B99"
                class="text-capitalize rounded-lg"
                width="130"
                height="44"
                dark
                @click="updateFunc"
              >
                {{ $t("update") }}
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
          class="text-capitalize primary-color"
          v-for="item in items"
          :key="item"
          active-class="active-tab"
        >
          {{ item }}
        </v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <FqsComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <LdComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <FitComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <StrikeComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <BulkComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <PpsComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <PhotoSampleComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <ShipmentSampleComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <CertificateSampleComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
      <div class="d-flex px-8 pb-5">
        <v-spacer/>
        <v-btn
          color="#544B99"
          outlined
          class="text-capitalize rounded-lg px-3"
          width="200"
          @click="finisSample"
        >
          {{ $t('samplesBox.finishSample') }}
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex';
import FqsComponent from '@/components/SampleTabs/Fqs.vue';
import LdComponent from '@/components/SampleTabs/Ld.vue';
import FitComponent from '@/components/SampleTabs/Fit.vue';
import StrikeComponent from '@/components/SampleTabs/Strike.vue';
import BulkComponent from '@/components/SampleTabs/Bulk.vue';
import PpsComponent from '@/components/SampleTabs/Pps.vue';
import PhotoSampleComponent from '@/components/SampleTabs/PhotoSample.vue';
import ShipmentSampleComponent from '@/components/SampleTabs/ShipmentSample.vue';
import CertificateSampleComponent from '@/components/SampleTabs/CertificateSample.vue';
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import FinishProcessBtn from "@/components/FinishProcessBtn.vue";


export default {
  name:"samplesDetailPage",
  components:{
    FqsComponent,
    LdComponent,
    FitComponent,
    StrikeComponent,
    BulkComponent,
    PpsComponent,
    PhotoSampleComponent,
    ShipmentSampleComponent,
    CertificateSampleComponent,
    Breadcrumbs,
    FinishProcessBtn,
  },
  data(){
    return{
      tab:"",
      items:["FQS","LD","FIT","STRIKE","BULK","PPS",this.$t('samplesBox.id.photoSample'),this.$t('samplesBox.id.shipmentSample'),this.$t('samplesBox.id.certificateSample')],
      sampleDetail:{
        orderNumber:"",
        modelNumber:"",
        id:null,
      },
      orderNumSearch: "",
      modelNumSearch: "",
      new_validate:true,
      purpose:'',
      map_links: [
        {
          text: this.$t('billingCompany.child.home'),
          disabled: false,
          to: "/",
          icon: true,
        },
        {
          text: this.$t('sidebar.samples'),
          disabled: false,
          to: "/samples",
          icon: true,
        },
        {
          text: this.$t('samplesBox.addSample'),
          disabled: true,
          to: "/samples/7",
          icon: false,
        },
      ],
    }
  },
  created(){
    this.filterOrderList({
      page: 0,
      size: 10,
      data: {
        modelNumber: "",
        orderNumber: this.orderNumSearch,
        creatorId: "",
        clientName: "",
      },
    });
    this.getModelsList({
      page: 0,
      size: 10,
      modelNumber: this.modelNumSearch,
      partner: "",
      status: "ACTIVE",
    });
  },

  computed:{
    finishDate:{
      get(){
        return{
          modelId:!!this.oneSample.modelId?this.oneSample.modelId:0,
          propertyName:"SAMPLE_STATUS",
        }
      }
    },
    ...mapGetters({
      ordersList: "orders/ordersList",
      modelsList: "models/modelsList",
      oneSample:"accessorySamples/oneSample",
      accessoryData:"accessory/accessoryData",
    })
  },

  watch:{
    accessoryData(val){
      if(this.$route.params.id==="create-sample"){
        this.sampleDetail={...val}
        this.sampleDetail.orderNumber={orderNumber:val.orderNumber,id:val.orderId}
      }
    },
    oneSample(val){
      this.sampleDetail={}

      this.sampleDetail=JSON.parse(JSON.stringify(val))
      this.sampleDetail.modelNumber={modelNumber:val.modelNumber, id:val.modelId}
      this.sampleDetail.orderNumber={orderNumber:val.orderNumber, id:val.orderId}

      this.getChartList({purpose:"FQS",planningId:val.id})
      this.modelColor(val.modelId)
    },

    "sampleDetail.modelNumber"(val){
      if(!!val){
        this.getModelOrderInfo(val?.id)
      }

    },
    tab(val){

        switch(val){
          case 0:  this.purpose="FQS"; break
          case 1:  this.purpose="LD";break
          case 2:  this.purpose="FIT";break
          case 3:  this.purpose="STRIKE";break
          case 4:  this.purpose="BULK";break
          case 5:  this.purpose="PPS";break
          case 6:  this.purpose="PHOTO_SAMPLE";break
          case 7:  this.purpose="SHIPMENT_SAMPLE";break
          case 8:  this.purpose="CERTIFICATE_SAMPLE";break
        }
        const id = this.sampleDetail.id
        if(!!id){
          this.getChartList({purpose:this.purpose,planningId:id})
        }
      },

    orderNumSearch(val) {
      if (!!val) {
        this.filterOrderList({
          page: 0,
          size: 10,
          data: {
            modelNumber: "",
            orderNumber: val,
            creatorId: "",
            clientName: "",
          },
        });
      }
    },
    modelNumSearch(val) {
      if (!!val) {
        this.getModelsList({
          page: 0,
          size: 10,
          modelNumber: val,
          partner: "",
          status: "ACTIVE",
        });
      }
    },

  },

  methods:{
    ...mapActions({
      filterOrderList: "orders/filterOrderList",
      getModelsList: "models/getModelsList",
      createSample: "accessorySamples/createSample",
      getOneSample:"accessorySamples/getOneSample",
      updateSample:"accessorySamples/updateSample",
      modelColor:"accessorySamples/modelColor",
      getModelOrderInfo:"accessory/getModelOrderInfo",
      getChartList:"samplesTabs/getChartList",
      finishSampleFunc:"sample/finishSample",
    }),

    createdSample(){
      const data={
        modelId:this.sampleDetail.modelId,
        orderId:this.sampleDetail.orderNumber.id,
      }
      this.createSample(data)
    },

    updateFunc(){
      const data={
        modelId:this.sampleDetail.modelNumber.id,
        orderId:this.sampleDetail.orderNumber.id,
        id:this.sampleDetail.id
      }
      this.updateSample(data)
    },
    finisSample(){
      const id = this.$route.params.id;
      const data={
        purpose:this.purpose,
        id
      }
      this.finishSampleFunc(data)
    },
  },

  mounted(){
    const id = this.$route.params.id
    if(id!=='create-sample'){
      this.getOneSample(id)
    }
  },

}
</script>
<style lang="scss" scoped>
.active-tab {
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #544b99;
}

.custom-picker-2 {
  width: 100% !important;
  background: #f8f4fe;
  border-radius: 10px 10px 0 0 !important;

  &::placeholder {
    color: #cccccc;
  }

  > input.el-input__inner {
    border-radius: 10px 10px 0 0 !important;

    background: #f8f4fe !important;
    border: 0;
    border-bottom: 1px solid #777777 !important;
    width: 100% !important;
    height: 40px !important;

    &::placeholder {
      color: #9a979d !important;
    }
  }
}
.show_active{
  height: 0;
  overflow: hidden;
}
</style>
