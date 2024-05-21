<template >
  <div>
    <Breadcrumbs :maps="map_links"/>

    <v-card elevation="0">
      <v-card-title>
        <div>
          Samples
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-form lazy-validation v-model="new_validate" ref="order_detail">
          <v-row>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Order number</div>
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
                placeholder="Order name"
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
              <div class="label">Model number</div>
              <v-combobox
                v-model="sampleDetail.modelNumber"
                :items="modelsList"
                :search-input.sync="modelNumSearch"
                item-text="modelNumber"
                item-value="modelNumber"
                validate-on-blur
                outlined
                hide-details
                height="44"
                class="rounded-lg base d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                placeholder="Model name"
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
              <div class="label">Model name</div>
              <v-text-field
                outlined
                hide-details
                disabled
                height="44"
                class="rounded-lg base mb-4"
                v-model="sampleDetail.modelName"
                placeholder="Model name"
                validate-on-blur
                dense
                color="#544B99"
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Client name</div>
              <v-text-field
                outlined
                hide-details
                disabled
                height="44"
                class="rounded-lg base mb-4"
                v-model="sampleDetail.clientName"
                placeholder="Client name"
                validate-on-blur
                dense
                color="#544B99"
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Order quantity</div>
              <v-text-field
                outlined
                hide-details
                disabled
                height="44"
                class="rounded-lg base mb-4"
                v-model="sampleDetail.orderQuantity"
                placeholder=" Order quantity"
                validate-on-blur
                dense
                color="#544B99"
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Created by</div>
              <v-text-field
                v-model="sampleDetail.creatorOfModel"
                placeholder="Enter creator"
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
              <div class="label">Created at</div>
              <v-text-field
                v-model="sampleDetail.createdTimeOfModel"
                placeholder="Created at"
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
                <div class="label">Updated by</div>
                <v-text-field
                  v-model="sampleDetail.updatedBy"
                  placeholder="Enter Modified person"
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
              <div class="label">Updated at</div>
              <v-text-field
                v-model="sampleDetail.updatedAt"
                placeholder="Update at"
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
              <v-btn
                v-if="$route.params.id==='create-sample'"
                color="#544B99"
                class="text-capitalize rounded-lg"
                width="130"
                height="44"
                dark
                @click="createdSample"
              >
                Save
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
                Update
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
  },
  data(){
    return{
      tab:"",
      items:["FQS","LD","FIT","STRIKE","BULK","PPS","PHOTO SAMPLE","SHIPMENT SAMPLE","CERTIFICATE SAMPLE"],
      sampleDetail:{
        orderNumber:"",
        modelNumber:"",
      },
      orderNumSearch: "",
      modelNumSearch: "",
      new_validate:true,
      map_links: [
        {
          text: "Home",
          disabled: false,
          to: "/",
          icon: true,
        },
        {
          text: "Samples",
          disabled: false,
          to: "/samples",
          icon: true,
        },
        {
          text: "add samples",
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
    ...mapGetters({
      ordersList: "orders/ordersList",
      modelsList: "models/modelsList",
      oneSample:"accessorySamples/oneSample",
      accessoryData:"accessory/accessoryData",
    })
  },

  watch:{
    accessoryData(val){
      this.sampleDetail={...val}
      this.sampleDetail.orderNumber={orderNumber:val.orderNumber,id:val.orderId}
    },
    oneSample(val){
      const oneSample=this.sampleDetail
      oneSample.modelNumber={modelNumber:val.modelNumber, id:val.modelId}
      oneSample.orderNumber={orderNumber:val.orderNumber, id:val.orderId}
      oneSample.client=val.client
      oneSample.orderedQuantity=val.orderedQuantity
      oneSample.createdBy=val.createdBy
      oneSample.createdAt=val.createdAt
      oneSample.updatedBy=val.updatedBy
      oneSample.updatedAt=val.updatedAt
      oneSample.id=val.id
      this.getChartList({purpose:"FQS",planningId:val.id})
      this.modelColor(val.modelId)
    },

    "sampleDetail.modelNumber"(val){
      if(!!val){
        this.getModelOrderInfo(val?.id)
      }

    },
    tab(val){
        let purpose=""
        switch(val){
          case 0:  purpose="FQS"; break
          case 1:  purpose="LD";break
          case 2:  purpose="FIT";break
          case 3:  purpose="STRIKE";break
          case 4:  purpose="BULK";break
          case 5:  purpose="PPS";break
          case 6:  purpose="PHOTO_SAMPLE";break
          case 7:  purpose="SHIPMENT_SAMPLE";break
          case 8:  purpose="CERTIFICATE_SAMPLE";break
        }
        const id =this.sampleDetail.id
        if(!!id){
          this.getChartList({purpose,planningId:id})
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

    }),

    createdSample(){
      const data={
        modelId:this.sampleDetail.modelNumber.id,
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
    }
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
