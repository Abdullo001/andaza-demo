<template >
  <div>
    <v-data-table
    :items="sampleList"
    :headers="headers"
    :items-per-page="100"
    item-key="plannedFabricOrderId"
    show-select
    :single-select="singleSelect"
    v-model="selected"
    class="elevation-0"
    hide-default-footer
    >
    <template #top>
      <div class="mt-1">
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="text-h6">{{ $t('sidebar.fabricOrdering') }}</div>
          </v-toolbar-title>

        </v-toolbar>
        <div class="px-4 py-4">
          <v-row class=" mb-4 align-end justify-space-beetwen">
            <v-col cols="12" lg="4"  >
              <div class="label"> {{ $t('orderBox.index.orderNum') }} <span style="color:red">*</span></div>
              <v-combobox
                v-model="orderId"
                :items="ordersList"
                :search-input.sync="orderNumSearch"
                item-text="orderNumber"
                item-value="orderNumber"
                validate-on-blur
                outlined
                hide-details
                height="44"
                class="rounded-lg base  d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                :placeholder=" $t('orderBox.index.orderNum')"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" lg="8" class="d-flex">
              <v-spacer/>
              <v-btn
                class="text-capitalize rounded-lg font-weight-bold py-1 px-6"
                color="#544B99"
                dark
                height="44"
                @click="searchModels"
              >
                {{ $t('appBar.search') }}
              </v-btn>
            </v-col>
          </v-row>
          <v-form v-model="new_valid" ref="valid" lazy-validation>
            <v-row >
              <v-col cols="12" lg="3">
                <div class="label">{{$t('forms.orderedFabrics.supplier')}}</div>
                <v-combobox
                  v-model="partnerId"
                  :items="partnerWithTypes"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :return-object="true"
                  color="#544B99"
                  dense
                  :placeholder="$t('forms.orderedFabrics.supplier')"
                  append-icon="mdi-chevron-down"
                  :rules="[formRules.required]"
                  validate-on-blur
                  >
                  <template #append>
                    <v-icon color="#544B99">mdi-magnify</v-icon>
                  </template>
                 </v-combobox>
              </v-col>
              <v-col cols="12" lg="3">
                <div class="label">{{ $t('fabricOrderingBox.index.deliveyTime') }}</div>
                <div style="height: 44px !important">
                  <el-date-picker
                    v-model="deliveryTime"
                    type="datetime"
                    style="width: 100%; height: 100%"
                    placeholder="dd.MM.yyyy HH:mm:ss"
                    :picker-options="pickerShortcuts"
                    value-format="dd.MM.yyyy HH:mm:ss"
                    class="base_picker"
                  >
                  </el-date-picker>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </div>

      </div>
    </template>

    <template #[`header.data-table-select`]="{ props, on,items }">
      <v-simple-checkbox
        :value="props.value || props.indeterminate"
        v-on="on"
        :indeterminate="props.indeterminate"
        color="#544B99"
        @input="selectItems(props)"
      />
    </template>
    <template #item.data-table-select="{isSelected, select,item}">
      <v-simple-checkbox
        color="#544B99"
        v-ripple
        :value="item.isChecked"
        :disabled="item.isOrdered"
        @input="enterSelect(item)"
      />
    </template>



  </v-data-table>

  <div class="d-flex my-6 ">
    <v-spacer/>
    <v-btn
      class="text-capitalize rounded-lg font-weight-bold mr-4 py-1 px-6"
      color="#544B99"
      outlined
      height="44"
      @click="generateFabric"
    >
      {{ $t('fabricOrderingBox.index.generateOrder') }}
    </v-btn>
  </div>

  <v-data-table
    :items="generatedList"
    :headers="genHeaders"
    :items-per-page="100"
    class="elevation-0"
    hide-default-footer
  >
    <template #top>
      <v-toolbar elevation="0">
        <v-toolbar-title class="d-flex justify-space-between w-full">
          <div class="text-h6">{{$t('fabricOrderingBox.index.title')}}</div>
        </v-toolbar-title>
        <v-btn
          color="#544B99"
          outlined
          class="text-capitalize rounded-lg mr-2"
          @click="$router.push(localePath(`/fabric-ordering/fabrics-list`))"
        >
         {{ $t('fabricOrderingBox.index.fabricList') }}
        </v-btn>
      </v-toolbar>
    </template>

    <template #item.fabricDesignPhoto="{item}">

    </template>

    <template #item.isOrder="{item}">
      <v-simple-checkbox
        v-model="item.isOrdered"
        :disabled="item.status==='ORDERED'"
        color="#544B99"
      ></v-simple-checkbox>
    </template>
    <template #item.status="{item}">
      <v-select
        :background-color="statusColor.fabricOrderedStatus(item.status)"
        :items="status_enums"
        append-icon="mdi-chevron-down"
        v-model="item.status"
        hide-details
        class="mt-n2"
        rounded
        dark
        @change="changeStatusFunc(item)"
      />
    </template>

    <template #item.actions="{item}">
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
            :disabled="item.status=== 'ORDERED' || item.status=== 'RECEIVED'"
            @click="editItem(item)"
          >
            <v-img :src="item.status=== 'ORDERED' || item.status === 'RECEIVED' ? '/disable-editIcon.svg' : '/edit-active.svg'" max-width="22"/>
          </v-btn>
        </template>
        <span class="text-capitalize">Add info</span>
      </v-tooltip>
    </template>
    <template #item.fabricDesignPhoto="{item}">
      <v-img
        :src="item?.filePath"
        class="mr-2"
        width="40"
        height="40"
        @click="showImage(item.filePath)"
      />
    </template>

  </v-data-table>
  <div class="d-flex my-6 ">
    <v-spacer/>

    <v-btn
      class="text-capitalize rounded-lg font-weight-bold mr-4 py-1 px-6"
      color="#544B99"
      outlined
      height="44"
      @click="returnFunc"
    >
     {{ $t('fabricOrderingBox.index.return') }}
    </v-btn>
    <v-btn
      class="text-capitalize rounded-lg font-weight-bold mr-4 py-1 px-6"
      color="#544B99"
      dark
      height="44"
      @click="ordering"
    >
      {{ $t('fabricOrderingBox.index.orderFabric') }}
    </v-btn>
  </div>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            Add Fabric informations
          </div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="6">
                <div class="label">Actual fabric price</div>
                <div class="d-flex align-center">
                  <v-text-field
                    height="44"
                    class="rounded-lg base rounded-l-lg"
                    color="#544B99"
                    v-model="addFabricInformation.actualPrice"
                    outlined
                    hide-details
                    dense
                    placeholder="Enter Actual F/P" />
                </div>
              </v-col>
              <v-col cols="6">
                <div class="label">Queue</div>
                <v-text-field
                  height="44"
                  class="rounded-lg base rounded-l-lg"
                  color="#544B99"
                  v-model="addFabricInformation.queue"
                  outlined
                  hide-details
                  dense
                  placeholder="Enter Queue" />
              </v-col>
              <v-col cols="12">
                <div class="label">Additional accessories</div>
                <v-text-field
                  height="44"
                  class="rounded-lg base rounded-l-lg"
                  color="#544B99"
                  v-model="addFabricInformation.additionalAccessory"
                  outlined
                  hide-details
                  dense
                  placeholder="Enter Additional accessories" />
              </v-col>
              <v-col cols="12">
                <div class="big__image overflow-hidden relative " >
                  <input
                    ref="uploaderFirst"
                    class="d-none"
                    type="file"
                    @change="(e)=>firstFileChanged(e)"
                    accept="image/*"
                  />

                  <div class="update__icon" v-if="!!files[0].file">
                    <v-btn color="green" icon @click="getFile('first')">
                      <v-img src="/upload-green.svg" max-width="22"/>
                    </v-btn>
                    <v-btn color="green" icon @click="deleteFile('first')">
                      <v-img src="/trash-red.svg" max-width="22"/>
                    </v-btn>
                  </div>

                  <v-img
                    :src="images[0].photo"
                    lazy-src="/model-image.jpg"
                    v-if="!!files[0].file" width="100%"
                    @click="showImage(images[0].photo)"
                  />

                  <div class="default__box" v-else>
                    <v-img src="/default-image.svg" width="70"/>
                    <v-btn text color="#5570F1" class="rounded-lg mt-6 my-4" @click="getFile('first')">
                      <v-img src="/upload.svg" class="mr-2"/>
                      <div class="text-capitalize upload-text">Upload Image</div>
                    </v-btn>
                    <div class="default__text">
                      <p>Upload a cover image for your product.</p>
                    </div>
                  </div>

                </div>
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
            {{ $t("bodyParts.dialog.cancelBtn") }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="updateItem"
          >
            {{ $t("save") }}
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
import {mapActions, mapGetters} from "vuex";
export default {

  data(){
    return{
      selected:[],
      singleSelect:false,
      edit_dialog: false,
      new_form: true,
      headers:[
        {text: "Id",value:"id",sortable:false},
        {text: this.$t('planning.listFabric.modelNumber'),value:"modelNumber",sortable:false},
        {text: this.$t('planning.listFabric.fabricSpecification'),value:"specification",sortable:false},
        {text: this.$t('planning.planningChart.densityGrM2'),value:"density",sortable:false},
        {text: this.$t('planning.planningChart.fleece'),value:"fleeceEnabled",sortable:false},
        {text:this.$t('fabricOrderingBox.index.peachEffect'),value:"peachEffectEnabled",sortable:false},
        {text:this.$t('planning.listFabric.color'),value:"color",sortable:false},
        {text:this.$t('planning.listFabric.actualTotalFabric'),value:"actualFabricTotal",sortable:false},
      ],
      genHeaders:[
        {text: "", value:"isOrder",sortable:false},
        {text: "Id",value:"id",sortable:false},
        {text: this.$t('fabricOrderingBox.index.sipNumber'), value:"sipNumber",sortable:false},
        {text:  this.$t('planning.listFabric.modelNumber'), value:"modelNumbers",sortable:false},
        {text:this.$t('fabricOrderingBox.index.fabricDesign'), value: "fabricDesignPhoto", sortable: false},
        {text: this.$t('fabricOrderingBox.index.queue'), value:"queue",sortable:false},
        {text:  this.$t('planning.listFabric.fabricSpecification'),value:"fabricSpecification",sortable:false,width:200},
        {text:this.$t('planning.listFabric.color'),value:"color",sortable:false},
        {text: this.$t('fabricOrderingBox.index.status'),value:"status",sortable:false},
        {text: this.$t('fabricOrderingBox.index.supplier'),value:"supplier",sortable:false},
        {text:this.$t('planning.listFabric.actualTotalFabric'),value:"actualTotalFabric",sortable:false},
        {text:this.$t('fabricOrderingBox.index.actualFabricPrice'),value:"actualPrice",sortable:false},
        {text: this.$t('fabricOrderingBox.index.actualTotalPrice'),value:"totalPrice",sortable:false,width:200},
        {text: this.$t('fabricOrderingBox.index.fabricDeadline'),value:"fabricDeadline",sortable:false},
        {text: this.$t('fabricOrderingBox.index.additionalAccessory'),value:"additionalAccessory",sortable:false},
        {text:  this.$t("catalogGroups.tabs.table.actions"), value: "actions"}
      ],
      new_valid:true,
      image_dialog: false,
      currentImage: "",
      orderNumSearch:"",
      orderNumber:"",
      partnerName:"",
      partnerId:null,
      orderId:null,
      deliveryTime:null,
      status_enums: ["ORDERED", "CANCELLED", "PENDING", "RECEIVED"],
      price_enums: ["USD", "UZS", "RUB"],
      generatedList:[],
      sampleList:[],
      addFabricInformation: {
        actualPrice: '',
        additionalAccessory: '',
        fabricOrderId: null,
        queue: ''
      },
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
    this.getPartnersWithTypes(["supplier"])
  },

  computed:{
    ...mapGetters({
      ordersList: "orders/ordersList",
      sampleFabricOrdering:"fabricOrdering/sampleFabricOrdering",
      partnerLists: "partners/partnerList",
      generatedFabricOrdering: "fabricOrdering/generatedFabricOrdering",
      partnerWithTypes: "partners/partnerWithTypes",
    })
  },

  watch:{
    generatedFabricOrdering(val){
      const specialList=[]
      val.forEach((item,id)=>{
        specialList.push({...item,id:id+1})
      })
      this.generatedList=JSON.parse(JSON.stringify(specialList))
    },
    sampleFabricOrdering(val){
      const specialList=[]
      val.forEach((item,id)=>{
        specialList.push({...item,isChecked:JSON.parse(JSON.stringify(item.isOrdered)),id:id+1})
      })
      this.sampleList=JSON.parse(JSON.stringify(specialList))
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
    }
  },


  methods:{
    ...mapActions({
      filterOrderList: "orders/filterOrderList",
      getOrdersList:"orders/getOrdersList",
      getSampleFabricOrdering:"fabricOrdering/getSampleFabricOrdering",
      generateFabricOrder: 'fabricOrdering/generateFabricOrder',
      getGeneratedFabricOrdering: 'fabricOrdering/getGeneratedFabricOrdering',
      setFabricOrder: 'fabricOrdering/setFabricOrder',
      setTotalPrice: 'fabricOrdering/setTotalPrice',
      changeStatus: 'fabricOrdering/changeStatus',
      returnOrders: 'fabricOrdering/returnOrders',
      setQueue: 'fabricOrdering/setQueue',
      updateGeneratedOrders: 'fabricOrdering/updateGeneratedOrders',
      getPartnersWithTypes: "partners/getPartnersWithTypes",
    }),

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

    setTotalPriceFunc(e,item){
      if(e.code===`Enter`){
        const data={
          fabricOrderId:item.fabricOrderId,
          totalPrice:item.totalPrice.split(' ')[0],
        }
        this.setTotalPrice({data,id:this.orderId.id})
      }
    },
    setQueueFunc(item){
      const data={
        fabricOrderId:item.fabricOrderId,
        queue:item.queue,
      }
      this.setQueue({...data,orderId:this.orderId.id})

    },

    enterSelect(item){
      item.isChecked=!item.isChecked
    },

    selectItems(event){

      this.sampleList.forEach((item)=>{
        if(!item.isOrdered){
          item.isChecked=!event.value
        }
      })
    },

    changeStatusFunc(item){
      this.changeStatus({id:item.fabricOrderId,status:item.status})
    },

    returnFunc(){
      const ids = []
      this.generatedList.forEach((item)=>{
        if(item.isOrdered&&item.status!=="ORDERED"){
          ids.push(item.fabricOrderId)
        }
      })

      this.returnOrders({ids,id:this.orderId.id})
    },


    searchModels(){
      this.getSampleFabricOrdering(this.orderId.id)
      this.getGeneratedFabricOrdering(this.orderId.id)
    },

    generateFabric(){
      const validate=this.$refs.valid.validate()
      if(validate){
        const plannedFabricOrderIds = []
        this.sampleList.forEach((item)=>{
          if(!item.isOrdered&&!!item.isChecked){
            plannedFabricOrderIds.push(item.plannedFabricOrderId)
          }
        })

        if(plannedFabricOrderIds.length!==0){
          const data={
            plannedFabricOrderIds,
            fabricDeadline: this.deliveryTime,
            orderId:this.orderId.id ,
            supplierId: this.partnerId.id
          }

          this.generateFabricOrder(data)
        }
      }

    },

    ordering(){
      const fabricOrderIds = []
      this.generatedList.forEach((item)=>{
        if(item.isOrdered){
          fabricOrderIds.push(item.fabricOrderId)
        }
      })

      const data={
        fabricOrderIds
      }

      this.setFabricOrder({data,id:this.orderId.id})
    },

    editItem(item) {
      this.edit_dialog = true
      this.addFabricInformation.fabricOrderId = item.fabricOrderId
    },
    async updateItem()  {
          const validate = this.$refs.new_form.validate();
          const {
            actualPrice,
            additionalAccessory,
            fabricOrderId,
            queue,
          } = this.addFabricInformation
          if (validate) {
            const formData= new FormData()
            formData.append("actualPrice", actualPrice)
            formData.append("additionalAccessory", additionalAccessory)
            formData.append("fabricOrderId", fabricOrderId)
            formData.append("queue", queue)
            if(!!this.files[0]?.file){
              formData.append("file",this.files[0]?.file)
            }
            await this.updateGeneratedOrders({ data: formData,orderId:this.orderId?.id })
            await this.$refs.new_form.reset()
          }
          this.edit_dialog = false
      },
  },


  mounted(){
    this.$store.commit('setPageTitle', this.$t('sidebar.fabricOrdering'));
  }
}

</script>
<style lang="scss" scoped>

</style>
