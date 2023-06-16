<template >
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0">
      <v-card-title>
        <div>
          Shipping
          <v-chip color="#10BF41" dark class="font-weight-bold ml-5">Edit</v-chip>
        </div>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-row>
          <v-col cols="3">
            <div class="label">Shipping No.</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base mb-4"
              placeholder="Enter shipping No."
              validate-on-blur
              dense
              color="#7631FF"
            />
          </v-col>
          
          <v-col cols="3">
            <div class="label">Order number</div>
            <v-combobox
              
              :search-input.sync="orderIdSearch"
              item-text="modelNumber"
              item-value="id"
              outlined
              hide-details
              height="44"
              class="rounded-lg base d-flex align-center justify-center mb-4"
              :return-object="true"
              color="#7631FF"
              dense
              placeholder="Enter responsible person"
              prepend-icon=""
            >
              <template #append>
                <v-icon class="d-inline-block" color="#7631FF">
                  mdi-magnify
                </v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="3">
            <div class="label">Model number</div>
            <v-combobox
             
              :search-input.sync="modelIdSearch"
              item-text="modelNumber"
              item-value="id"
              outlined
              hide-details
              height="44"
              class="rounded-lg base d-flex align-center justify-center mb-4"
              :return-object="true"
              color="#7631FF"
              dense
              placeholder="Enter model number"
              prepend-icon=""
            >
              <template #append>
                <v-icon class="d-inline-block" color="#7631FF">
                  mdi-magnify
                </v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="3">
            <div class="label">Client name</div>
            <v-text-field
              outlined
              hide-details
              
              height="44"
              class="rounded-lg base mb-4"
              placeholder="client name"
              validate-on-blur
              dense
              color="#7631FF"
            />
          </v-col>
         
          <v-col cols="3">
            <div class="label">Brand name</div>
            <v-select
            dense
            outlined
            hide-details
            height="44"
            class="rounded-lg base"
            validate-on-blur
            placeholder="Select brand name"
            append-icon="mdi-chevron-down"
            color="#7631FF"
          />
          </v-col>
          
          <v-col cols="3">
            <div class="label">Contract No.</div>
            <v-text-field
              outlined
              hide-details
              
              height="44"
              class="rounded-lg base mb-4"
              placeholder="Enter contract No."
              validate-on-blur
              dense
              color="#7631FF"
            />
          </v-col>
          <v-col cols="3">
            <div class="label">Invoice No.</div>
            <v-text-field
              outlined
              hide-details
              
              height="44"
              class="rounded-lg base mb-4"
              placeholder="Enter Invoice No."
              validate-on-blur
              dense
              color="#7631FF"
            />
          </v-col>
          <v-col cols="3">
            <div class="label">Packing List No.</div>
            <v-text-field
              outlined
              hide-details
              
              height="44"
              class="rounded-lg base mb-4"
              placeholder="Enter Packing List No."
              validate-on-blur
              dense
              color="#7631FF"
            />
          </v-col>

          <v-col cols="3">
            <div class="label">Order quantity</div>
            <v-text-field
              outlined
              hide-details
              suffix="psc"
              height="44"
              class="rounded-lg base mb-4"
              placeholder="Enter Order quantity"
              validate-on-blur
              dense
              color="#7631FF"
            />
          </v-col>
          <v-col cols="3">
            <div class="label">Actual shipping total quantity</div>
            <v-text-field
              outlined
              hide-details
              suffix="psc"
              height="44"
              class="rounded-lg base mb-4"
              placeholder="Enter Actual shipping total"
              validate-on-blur
              dense
              color="#7631FF"
            />
          </v-col>
          <v-col cols="3">
            <div class="label">Overshipment</div>
            <v-text-field
              outlined
              hide-details
              suffix="%"
              height="44"
              class="rounded-lg base mb-4"
              placeholder="Enter overshipment"
              validate-on-blur
              dense
              color="#7631FF"
            />
          </v-col>
          <v-col cols="3">
            <div class="label">Remaining total quantity dom.market</div>
            <v-text-field
              outlined
              hide-details
              suffix="psc"
              height="44"
              class="rounded-lg base mb-4"
              placeholder=" Remaining total quantity dom.market"
              validate-on-blur
              dense
              color="#7631FF"
            />
          </v-col>

          <v-col cols="3">
            <div class="label">Creator</div>
            <v-text-field
              placeholder="Enter creator"
              outlined
              readonly
              hide-details
              height="44"
              class="rounded-lg base mb-4"
              validate-on-blur
              dense
              color="#7631FF"
              background-color="#F8F4FE"
              
            />
          </v-col>
          
          <v-col cols="3">
            <div class="label">Created time</div>
            <v-text-field
              placeholder="Created at"
              outlined
              readonly
              hide-details
              height="44"
              class="rounded-lg base mb-4"
              validate-on-blur
              dense
              color="#7631FF"
              background-color="#F8F4FE"
              
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
            </v-col>

            <v-col cols="3">
              <div class="label">Modified person</div>
              <v-text-field
                placeholder="Enter Modified person"
                outlined
                hide-details
                readonly
                height="44"
                class="rounded-lg base"
                validate-on-blur
                dense
                color="#7631FF"
                background-color="#F8F4FE"
                
              />
            </v-col>


            <v-col cols="3">
            <div class="label">Updated time</div>
            <v-text-field
              placeholder="Update at"
              outlined
              readonly
              hide-details
              height="44"
              class="rounded-lg base"
              validate-on-blur
              dense
              color="#7631FF"
              background-color="#F8F4FE"
              
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
          </v-col>
          
           
            
          
        </v-row>
        <div class="">
          <div class="label">Photos of models</div>
          <div class="mx-3">
            <v-row>
              <v-col cols="12" lg="6" md="6" class="d-flex flex-wrap px-0">
                <div
                  v-for="(image, idx) in modelImages.length === 0 ? 3 : modelImages"
                  :key="idx"
                  class="mr-3"
                >
                  <div class="image-box" style="min-height: 132px">
                    <v-img
                      :src="modelImages[idx]?.filePath"
                      v-if="!!modelImages[idx]?.filePath"
                      max-height="150"
                      contain
                      class="pointer"
                      @click="showImage(modelImages[idx]?.filePath)"
                    />
                    <v-img src="/default-image.svg" max-width="50" v-else />
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="mt-6 mb-8" flat>
      <v-tabs v-model="tab">
        <v-tabs-slider color="#7631FF"/>
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
                <Invoice/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <PackingList/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <RemainingQuantity/>
              </v-card-text>
            </v-card>
          </v-tab-item>

        </v-tabs-items>
      </v-tabs>
    
    </v-card>
  </div>
</template>
<script>
import Breadcrumbs from '../../components/Breadcrumbs.vue';
import Invoice from '../../components/Shipping/Invoice.vue';
import PackingList from '../../components/Shipping/PackingList.vue';
import RemainingQuantity from '../../components/Shipping/RemainingQuantity.vue';

export default {

  components:{ Breadcrumbs, Invoice, PackingList, RemainingQuantity },

  data() {
    return {
      orderIdSearch:"",
      modelIdSearch:"",
      modelImages:[],
      tab:null,
      items:[
        "Invoice",
        "Packing list",
        "Remaining quantity for dom.market"
        ],
      map_links: [
                {
                    text: "Home",
                    disabled: false,
                    to: "/",
                    icon: true,
                },
                {
                    text: "Shipping",
                    disabled: false,
                    to: "/shipping",
                    icon: true,
                },
                {
                    text: "add shipping",
                    disabled: true,
                    to: "/shipping/7",
                    icon: false,
                },
        ],
      };
    },
}
</script>
<style lang="scss" scoped>
.image-box {
  background: #f8f4fe;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 158px;
  min-height: 132px;
}
.active-tab {
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #7631ff;
}
</style>