<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4 rounded-lg"
    >
      <template #top>
        <v-toolbar elevation="0" class="rounded-lg">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              {{ $t('fabricOrderingBox.id.accessoryPlanningChart') }}
            </div>
            <v-btn
              color="#544B99"
              class="rounded-lg white--text text-capitalize"
              @click="new_dialog = true"
              :disabled="checkId"
              :dark="!checkId"
            >
              <v-icon>mdi-plus</v-icon>
             {{  $t('fabricOrderingBox.addAccessoryBox.addAccessory')}}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider />
      </template>
      <template #item.accessoryPhoto="{item}">
        <v-img
        v-if="!!item.accessoryPhoto"
        :src="item?.accessoryPhoto"
        class="mr-2"
        width="40"
        height="40"
        @click="showImage(item.accessoryPhoto)"
      />
      </template>
      <template #item.actions="{ item }">
        <div>
          <v-btn icon color="green" @click.stop="editItem(item)">
            <v-img src="/edit-active.svg" max-width="22" />
          </v-btn>
          <v-btn icon color="red" @click.stop="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27" />
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="new_dialog" width="700">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold"> {{  $t('fabricOrderingBox.addAccessoryBox.addAccessory')}}</div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" lazy-validation v-model="validate">
            <v-row>
              <v-col cols="5" >
                <div class="label"> {{  $t('fabricOrderingBox.addAccessoryBox.name')}}</div>
                <v-combobox
                  v-model="create_accessory_chart.accessoryId"
                  :items="nameData"
                  :return-object="true"
                  :search-input.sync="accessorySearch"
                  class="rounded-lg base d-flex align-center justify-center mb-4"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  item-text="name"
                  item-value="id"
                  outlined
                  :placeholder="$t('accessoryWarehouse.accessoryName')"
                  prepend-icon=""
                >
                  <template #append>
                    <v-icon class="d-inline-block" color="#544B99">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="4" >
                <div class="label">{{  $t('fabricOrderingBox.addAccessoryBox.specification') }}</div>
                <v-select
                  :disabled="!create_accessory_chart.accessoryId"
                  v-model="create_accessory_chart.specification"
                  :items="create_accessory_chart.accessoryId?.specification"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder=" $t('fabricOrderingBox.addAccessoryBox.selectSpecification')"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="3" >
                <div class="label">M/U</div>
                <v-select
                  :items="nameData"
                  v-model="create_accessory_chart.accessoryId"
                  item-text="measurementUnit"
                  readonly
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('fabricOrderingBox.addAccessoryBox.selectMeasurementUnit')"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
              
              <v-col cols="5">
                <div class="label">1 unit for how many products</div>
                <v-text-field
                  v-model="create_accessory_chart.quantityPerUnit"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="0"
                  dense
                  color="#544B99"
                  :rules="[formRules.required,formRules.onlyNumber]"
                />
              </v-col>
              <v-col cols="4">
                <div class="label">Counted accessory quantity</div>
                <v-text-field
                  v-model="create_accessory_chart.countedAccessoryQuantity"
                  disabled
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="0"
                  dense
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="3">
                <div class="label">Order quantity</div>
                <v-text-field
                  v-model="oneOrder.totalQuantityWithOverProduction"
                  disabled
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('fabricOrderingBox.addAccessoryBox.quantityPerUnit')"
                  dense
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
              
              <v-col cols="5" class="d-flex ">
                <div class="mr-2">
                  <div class="label">{{$t('fabricOrderingBox.addAccessoryBox.wastage')}} %</div>
                  <v-text-field
                    v-model="create_accessory_chart.wastage"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base"
                    placeholder="0"
                    dense
                    color="#544B99"
                    :rules="[formRules.required]"
                  />
                </div>
                <div>
                  <div class="label">With wastage</div>
                  <v-text-field
                    v-model="create_accessory_chart.wastageWithPercent"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base"
                    placeholder="0"
                    dense
                    color="#544B99"
                    disabled
                  />
                </div>
              </v-col>
              <v-col cols="4">
                <div class="label">Actual order quantity</div>
                <v-text-field
                  v-model="create_accessory_chart.actualOrderQuantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="0"
                  dense
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="3">
                <div class="label">{{  $t('fabricOrderingBox.addAccessoryBox.pricePerUnit') }}</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="create_accessory_chart.price"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    placeholder="0.0"
                    dense
                    color="#544B99"
                    :rules="[formRules.required]"
                  />
                  <v-select
                    :items="currency_enums"
                    style="max-width: 100px"
                    outlined
                    hide-details
                    height="44"
                    dense
                    v-model="create_accessory_chart.currency"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    append-icon="mdi-chevron-down"
                    color="#544B99"
                    :rules="[formRules.required]"
                  />
                </div>
              </v-col>
              <v-col cols="12" class="d-flex align-center ">
                <v-simple-checkbox
                  color="#544B99"
                  v-model="withSizes"
                ></v-simple-checkbox>
                <div class="">
                  Quantity by Sizes
                </div>
              </v-col>
            </v-row>
            <v-row v-if="withSizes">
              <v-col v-for="(item,idx) in this.sizeDistributions" :key="idx" cols="3">
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
                  :rules="[formRules.onlyNumber, formRules.required]"
                  single-line
                  outlined
                  hide-details
                  height="44"
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#544B99"
                  background-color="#F8F4FE"
                  placeholder="0"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div class="label">{{ $t('fabricOrderingBox.addAccessoryBox.description')  }}</div>
                <v-textarea
                  v-model="create_accessory_chart.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  :placeholder="$t('fabricOrderingBox.addAccessoryBox.description')"
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
            width="163"
            @click="new_dialog = false"
          >
         {{ $t('billingCompany.dialog.cancel') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="createAccessoryChart"
          >
            {{ $t('billingCompany.dialog.add') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="700">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit Accessory</div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form">
            <v-row>
              <v-col cols="5" >
                <div class="label"> {{  $t('fabricOrderingBox.addAccessoryBox.name')}}</div>
                <v-combobox
                  v-model="edit_accessory_chart.accessoryId"
                  :items="nameData"
                  :return-object="true"
                  :search-input.sync="accessorySearch"
                  class="rounded-lg base d-flex align-center justify-center mb-4"
                  color="#544B99"
                  dense
                  disabled
                  height="44"
                  hide-details
                  item-text="name"
                  item-value="id"
                  outlined
                  :placeholder="$t('accessoryWarehouse.accessoryName')"
                  prepend-icon=""
                >
                  <template #append>
                    <v-icon class="d-inline-block" color="#544B99">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="4" >
                <div class="label">{{  $t('fabricOrderingBox.addAccessoryBox.specification') }}</div>
                <v-select
                  disabled
                  v-model="edit_accessory_chart.specification"
                  :items="edit_accessory_chart.accessoryId?.specification"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder=" $t('fabricOrderingBox.addAccessoryBox.selectSpecification')"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="3" >
                <div class="label">M/U</div>
                <v-select
                  :items="nameData"
                  v-model="edit_accessory_chart.accessoryId"
                  item-text="measurementUnit"
                  disabled
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('fabricOrderingBox.addAccessoryBox.selectMeasurementUnit')"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
              
              <v-col cols="5">
                <div class="label">1 unit for how many products</div>
                <v-text-field
                  v-model="edit_accessory_chart.quantityPerUnit"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="0"
                  dense
                  color="#544B99"
                  :rules="[formRules.required,formRules.onlyNumber]"
                />
              </v-col>
              <v-col cols="4">
                <div class="label">Counted accessory quantity</div>
                <v-text-field
                  v-model="edit_accessory_chart.countedAccessoryQuantity"
                  disabled
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="0"
                  dense
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="3">
                <div class="label">Order quantity</div>
                <v-text-field
                  v-model="oneOrder.totalQuantityWithOverProduction"
                  disabled
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('fabricOrderingBox.addAccessoryBox.quantityPerUnit')"
                  dense
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
              
              <v-col cols="5" class="d-flex ">
                <div class="mr-2">
                  <div class="label">{{$t('fabricOrderingBox.addAccessoryBox.wastage')}} %</div>
                  <v-text-field
                    v-model="edit_accessory_chart.wastage"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base"
                    placeholder="0"
                    dense
                    color="#544B99"
                    :rules="[formRules.required]"
                  />
                </div>
                <div>
                  <div class="label">With wastage</div>
                  <v-text-field
                    v-model="edit_accessory_chart.wastageWithPercent"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base"
                    placeholder="0"
                    dense
                    color="#544B99"
                    disabled
                  />
                </div>
              </v-col>
              <v-col cols="4">
                <div class="label">Actual order quantity</div>
                <v-text-field
                  v-model="edit_accessory_chart.actualOrderQuantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="0"
                  dense
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="3">
                <div class="label">{{  $t('fabricOrderingBox.addAccessoryBox.pricePerUnit') }}</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="edit_accessory_chart.price"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    placeholder="0.0"
                    dense
                    color="#544B99"
                    :rules="[formRules.required]"
                  />
                  <v-select
                    :items="currency_enums"
                    style="max-width: 100px"
                    outlined
                    hide-details
                    height="44"
                    dense
                    v-model="edit_accessory_chart.currency"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    append-icon="mdi-chevron-down"
                    color="#544B99"
                    :rules="[formRules.required]"
                  />
                </div>
              </v-col>
              
            </v-row>
            <v-row >
              <v-col v-for="(item,idx) in edit_accessory_chart.sizeDistributions" :key="idx" cols="3">
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
                  :rules="[formRules.onlyNumber, formRules.required]"
                  single-line
                  outlined
                  hide-details
                  height="44"
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#544B99"
                  background-color="#F8F4FE"
                  placeholder="0"
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
            width="163"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="update"
          >
            {{ $t('update') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40" />
        </div>
        <v-card-title class="d-flex justify-center"
          >Delete Accessory planning chart</v-card-title
        >
        <v-card-text>
          Are you sure you want to Delete this accessory planning chart?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            cancel
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteChart"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog max-width="590" v-model="image_dialog">
      <v-card >
        <v-card-title class="d-flex">
          <v-spacer/>
          <v-btn icon color="#544B99" large @click="image_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-img :src="currentImage" height="500" class="mb-4" contain/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AccessoryChartPages",
  data() {
    return {
      validate: true,
      accessorySearch:"",
      withSizes:false,
      create_accessory_chart: {
        specification: null,
        accessoryId: null,
        accessoryPlanningId: null,
        description: "",
        wastage: "",
      },
      edit_accessory_chart: {

      },
      delete_acceccory_chart: {},
      currency_enums: ["USD", "UZS", "RUB"],
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      headers: [
        { text: this.$t('fabricOrderingBox.addAccessoryBox.name'), value: "accessoryName", sortable:false },
        { text: this.$t('fabricOrderingBox.addAccessoryBox.specification'), value: "specification", sortable:false },
        { text:this.$t('fabricOrderingBox.addAccessoryBox.accessoryPhoto'), value: "accessoryPhoto", sortable:false },
        { text: "M/U", value: "measurementUnit", sortable:false },
        { text: this.$t('fabricOrderingBox.addAccessoryBox.pricePerUnit'), value: "pricePerUnit", sortable:false },
        { text: "Actual order quantity", value: "actualOrderQuantity",sortable:false },
        { text: this.$t('fabricOrderingBox.addAccessoryBox.wastage'), value: "wastage", sortable:false },
        { text: "Total price", value: "totalPrice", sortable:false },
        { text: this.$t('fabricOrderingBox.addAccessoryBox.actions'), value: "actions", align: "center", sortable: false , width: 150},
      ],
      items:[],
      accessoryId:null,
      files:[
        {file:null,id:null},
        {file:null,id:null},
        {file:null,id:null},
        {file:null,id:null},
      ],
      images:[
        {photo:""},
        {photo:""},
        {photo:""},
        {photo:""},
      ],
      currentImage:"",
      image_dialog:false,
      sizeDistributions:[],
    };
  },
  created() {
    this.getMeasurementUnit({ page: 0, size: 20 });
    this.getAccessoryList({page:0,size:10,});
  },
  computed: {
    ...mapGetters({
      accessoryData: "accessory/oneData",
      measurementUnit: "measurement/measurementUnit",
      nameData: "catalogAccessory/accessory_list",
      accessoryAllData: "accessoryChart/accessoryAllData",
      specificationData: "accessoryChart/specificationData",
      newId: "accessory/newId",
      sizes: "sizeDistribution/sizes",
      selectedAccessory: "accessoryChart/selectedAccessory",
      oneOrder: "orders/oneOrder",
    }),
    checkId() {
      const param = this.$route.params.id;
      if (param === 'create') {
        const id = this.$store.getters['accessory/newId']
        return id === null
      } else return false
    }
  },
  watch: {
    sizes(val){
      const items=[]
      this.headers= [
        { text: this.$t('fabricOrderingBox.addAccessoryBox.name'), value: "accessoryName", sortable:false },
        { text: this.$t('fabricOrderingBox.addAccessoryBox.specification'), value: "specification", sortable:false },
        { text:this.$t('fabricOrderingBox.addAccessoryBox.accessoryPhoto'), value: "accessoryPhoto", sortable:false },
        { text: "M/U", value: "measurementUnit", sortable:false },
        { text: this.$t('fabricOrderingBox.addAccessoryBox.pricePerUnit'), value: "pricePerUnit", sortable:false },
      ],
      val.forEach((item)=>{
        items.push(
          {
            size:item,
            quantity:null,
          }
        )
        this.headers.push({
          text: item, sortable: false, align: 'start', value: item
        })
      })
      this.sizeDistributions=JSON.parse(JSON.stringify(items))

      this.headers.push(
        { text: "Actual order quantity", value: "actualOrderQuantity", sortable:false },
        { text: this.$t('fabricOrderingBox.addAccessoryBox.wastage'), value: "wastage", sortable:false },
        { text: "Total price", value: "totalPrice", sortable:false },
        { text: this.$t('fabricOrderingBox.addAccessoryBox.actions'), value: "actions", align: "center", sortable: false , width: 150},
      )
    },
    selectedAccessory(val){
      this.getSizeDistribution({modelId:val.modelId})
      this.getOneOrder({id:val.orderId,modelId:val.modelId})
    },
    newId(val){
      this.accessoryId=val
    },
    accessoryAllData(list){
      const specialList = list.map(function (el) {
        const value = {};
        const sizesList = [];
        el?.sizeDistributions?.forEach((item) => {
          value[item.size] = item.quantity
          sizesList.push({size: item.size, quantity: item.quantity})
        });

        return {
          ...value,
          ...el,
          sizeDistributions: [...sizesList],

        }
      })
      this.items=JSON.parse(JSON.stringify(specialList))
    },
    accessorySearch(val){
      this.getAccessoryList({page:0,size:10,name:val});
    },
    "create_accessory_chart.quantityPerUnit"(val){
      if(/^\d+$/.test(val)){
        this.create_accessory_chart.countedAccessoryQuantity=Math.ceil(this.oneOrder.totalQuantityWithOverProduction/val)
      }else{
        this.create_accessory_chart.countedAccessoryQuantity=null
      }
    },
    "create_accessory_chart.wastage"(val){
      if(/^\d+$/.test(val) && /^\d+$/.test(this.create_accessory_chart.countedAccessoryQuantity)){
        this.create_accessory_chart.wastageWithPercent=Math.ceil(this.create_accessory_chart.countedAccessoryQuantity*(1+val/100))
      }else{
        this.create_accessory_chart.wastageWithPercent=null
      }
    },

  },
  methods: {
    ...mapActions({
      getMeasurementUnit: "measurement/getMeasurementUnit",
      createChartAccessory: "accessoryChart/createChartAccessory",
      getAccessoryList: "catalogAccessory/getAccessoryList",
      updateChartAccessory: "accessoryChart/updateChartAccessory",
      deleteChartAccessory: "accessoryChart/deleteChartAccessory",
      getChartAllData: "accessoryChart/getChartAllData",
      getSizeDistribution: "sizeDistribution/getSizeDistribution",
      getOneOrder: "orders/getOneOrder",
    }),
    handlePaste(event) {
      const items = (event.clipboardData || event.originalEvent.clipboardData).items;
      for (const item of items) {
        if (item.type.indexOf('image') === 0) {
          const blob = item.getAsFile();
          this.processImage(blob);
        }
      }
    },

    processImage(file) {
      const emptyIndex = this.files.findIndex(f => !f.file);
      if (emptyIndex === -1) {
        alert('All image slots are full. Please delete an image before pasting a new one.');
        return;
      }

      this.files[emptyIndex].file = file;
      this.images[emptyIndex].photo = URL.createObjectURL(file);
    },
    firstFileChanged(e) {
      this.files[0].file = e.target.files[0];
      this.images[0].photo = URL.createObjectURL(this.files[0].file);
      if(!!this.files[0].id){
        this.fileRequests[0].file=e.target.files[0]
        this.fileRequests[0].id=this.files[0].id
      }
    },
    getFile(count) {
      switch (count) {
        case 'first':
          return this.$refs.uploaderFirst.click();
        case 'second':
          return this.$refs.uploaderSecond.click();
        case 'third':
          return this.$refs.uploaderThird.click();
        case 'fourth':
          return this.$refs.uploaderFourth.click();
      }
    },
    deleteFile(count) {
      switch (count) {
        case 'first':
          this.files[0].file = null;
          break;
        case 'second':
          this.files[1].file = null;
          break;
        case 'third':
          this.files[2].file = null;

          break;
        case 'fourth':
          this.files[3].file = null;
          this.deleteImages({id:this.files[3].id,modelId:this.$route.params.id})
          break;
      }
    },
    showImage(photo) {
      this.currentImage = photo;
      this.image_dialog = true;
    },

    async deleteChart() {
      const items = this.delete_acceccory_chart;
      await this.deleteChartAccessory({
        id: items.id,
        accessoryPlanningId: items.accessoryPlanningId,
      });
      this.delete_dialog = false;
    },
    async update() {
      let accessoryPlanningId=this.$route.params.id!=='create'?this.$route.params.id:this.accessoryId
        const data=JSON.parse(JSON.stringify(this.edit_accessory_chart))
        data.accessoryId=data.accessoryId?.id
        data.accessoryPlanningId=accessoryPlanningId
        
        await this.updateChartAccessory({data,id:accessoryPlanningId,accessoryPlanningChartId:data.id});

        this.edit_dialog = false;
        this.clearFields(this.edit_accessory_chart)
    },
    clearFields(obj) {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'string') {
          obj[key] = ''; 
        } else if (typeof obj[key] === 'number') {
          obj[key] = 0; 
        } else if (typeof obj[key] === 'boolean') {
          obj[key] = false; 
        } else if (Array.isArray(obj[key])) {
          obj[key] = []; 
        } else {
          obj[key] = null; 
        }
      });
    },
    async createAccessoryChart() {
      let accessoryPlanningId=this.$route.params.id!=='create'?this.$route.params.id:this.accessoryId
        const data=JSON.parse(JSON.stringify(this.create_accessory_chart))
        data.accessoryId=data.accessoryId?.id
        data.accessoryPlanningId=accessoryPlanningId
        data.sizeDistributions=[]
        if(this.withSizes){
          data.sizeDistributions=this.sizeDistributions.map((item)=>({
            size:item.size,
            quantity: item.quantity?item.quantity:0
          }))
        }
        await this.createChartAccessory({data,id:accessoryPlanningId});

        this.new_dialog = false;
        this.clearFields(this.create_accessory_chart)
      
    },
    editItem(item) {
      this.edit_accessory_chart = { ...item };
      this.edit_accessory_chart.accessoryId={id:item.accessoryId, name:item.accessoryName}
      this.edit_accessory_chart.price=this.extractNumber(item.pricePerUnit)
      this.edit_dialog = true;
    },
    getDeleteItem(item) {
      this.delete_dialog = true;
      this.delete_acceccory_chart.id = item.id;
      this.delete_acceccory_chart.accessoryPlanningId =
        item.accessoryPlanningId;
    },
  },
  mounted() {
    const id = this.$route.params.id;
    if(this.selectedAccessory.modelId&&this.selectedAccessory.orderId){
      this.getSizeDistribution({modelId:this.selectedAccessory.modelId})
      this.getOneOrder({id:this.selectedAccessory.orderId,modelId:this.selectedAccessory.modelId})
    }
    
    if (id !== "create") {
      this.getChartAllData(id);
    }
    document.addEventListener('paste', this.handlePaste);
  },

  beforeUnmount() {
    document.removeEventListener('paste', this.handlePaste);
  },
};
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
}

.card-image {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;

}

.update__icon {
  border-radius: 16px;
  position: absolute !important;
  z-index: 10 !important;
  top: 16px;
  right: 10px;
  background-color: #fff;
  padding: 5px;

  &.small {
    padding: 0 2px;
  }
}

.relative {
  position: relative !important;
  width: 100%;
}

.upload-text {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #5570F1;
}

.big__image {
  background: #F4F5FA;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid #E1E2E9;
}

.default__box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.default__text {
  > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #8B8D97;
    margin-bottom: 7px;

    > span {
      color: #000;
    }
  }
}

.cards {
  display: flex;
  width: 100%;
  gap: 20px;
}

.card__item {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #F4F5FA;
  width: 250px;
  height: 170px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #E1E2E9;
}

.upload-text-child {
  font-size: 14px;
}
</style>
