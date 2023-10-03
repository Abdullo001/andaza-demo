<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="orderSizeList"
      :items-per-page="50"
      class="elevation-0"
      hide-default-footer
      :no-data-text="$t('noDataText')"
      :footer-props="{
        itemsPerPageText: this.$t('allDataTableText'),
      }"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class=" d-flex w-full align-center justify-space-between">
            <div>
              <v-btn
                class="rounded-lg text-capitalize mr-2 colorSizeBtn"
                outlined
              >
                Supply
              </v-btn>
              <v-btn
                class="rounded-lg text-capitalize colorSizeBtn"
                style="color: rgb(119, 124, 133); caret-color: rgb(119, 124, 133)"
                outlined
              >
                Cutting info
              </v-btn>
            </div>
            <v-btn
              color="#7631FF"
              dark
              class="text-capitalize rounded-lg"
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
              Add row
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.actions="{ item }">
        <div style="min-width: 100px;">
          <v-btn icon class="mr-2" @click="edit(item)">
            <v-img src="/edit-green.svg" max-width="20"/>
          </v-btn>
          <v-btn icon @click="deleteFunc(item)">
            <v-img src="/trash-red.svg" max-width="20"/>
          </v-btn>
        </div>
      </template>

      <template v-slot:body.append>
        <tr>
          <td :colspan="orderSizeList[0]?.modelBodyParts?.length" class="text-capitalize text-body-1 font-weight-bold">total quantities</td>
          <td
            v-for="(item,idx) in totalSizes.sizesList"
            :key="idx*12"
            class="font-weight-bold text-body-1"
          >
            {{item}}
          </td>

          <td class="font-weight-bold text-body-1">{{ totalSizes.total }}</td>
          <td></td>
          <td class="font-weight-bold text-body-1">{{totalSizes.totalPriceWithDiscount}}</td>
          <td></td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="new_dialog" max-width="572">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>Create color/Size</div>
          <v-btn @click="new_dialog = !new_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row class="mb-4 d-flex justify-space-between">
              <v-col
                v-for="(item, idx) in newSizeDistirbution.modelBodyParts"
                :cols="item.bodyPartId!==0?'12':'6'"
                :key="idx"
              >
                <v-row>
                  <v-col cols="6" v-if="item.bodyPartId!==0">
                    <div >
                      <div class="label">{{ item.bodyPart }}</div>
                      <v-select
                        v-model="item.colorId"
                        :items="colorsList"
                        :rules="[formRules.required]"
                        append-icon="mdi-chevron-down"
                        :placeholder="item.bodyPart"
                        outlined
                        item-text="name"
                        item-value="id"
                        single-line
                        hide-details
                        height="44"
                        class="rounded-lg base"
                        color="#7631FF"
                        dense
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" v-else>
                    <div >
                      <div class="label">{{ item.bodyPart }}</div>
                      <v-text-field
                      :rules="[formRules.required]"
                      :placeholder="item.bodyPart"
                      v-model="item.colorCode"
                      single-line
                      outlined
                      hide-details
                      height="44"
                      validate-on-blur
                      dense
                      class="rounded-lg base"
                      color="#7631FF"
                      background-color="#F8F4FE"
                    />
                    </div>
                  </v-col>
                  <v-col cols="6" v-if="item.bodyPartId!==0">
                    <div >
                      <div class="label">Panton code</div>
                      <div class="d-flex align-center">
                        <v-text-field
                          v-model="item.pantoneCode"
                          placeholder="0"
                          outlined
                          hide-details
                          height="44"
                          class="rounded-lg base rounded-l-lg rounded-r-0"
                          validate-on-blur
                          dense
                          color="#7631FF"
                        />
                        <v-select
                          :items="enums"
                          v-model="item.pantoneType"
                          style="max-width: 100px"
                          dense
                          outlined
                          hide-details
                          height="44"
                          class="rounded-lg base rounded-r-lg rounded-l-0"
                          validate-on-blur
                          placeholder=""
                          append-icon="mdi-chevron-down"
                          color="#7631FF"
                        />
                      </div>
                    </div>
                    
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="mb-4 d-flex justify-space-between">
              <v-col
                cols="3"
                v-for="(item, idx) in newSizeDistirbution.sizeDistributions"
                :key="idx"
              >
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
                  :rules="[formRules.onlyNumber,formRules.required]"
                  single-line
                  outlined
                  hide-details
                  height="44"
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>
            </v-row>


          <v-card-actions class="d-flex justify-center pb-6">
            <v-btn
              outlined
              class="text-capitalize rounded-lg font-weight-bold mr-6"
              color="#7631FF"
              width="163"
              @click="new_dialog = !new_dialog"
            >cancel
            </v-btn>
            <v-btn
              class="text-capitalize rounded-lg font-weight-bold"
              color="#7631FF"
              dark
              width="163"
              @click="createSizeDistirbution"
              >
                Create
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="edit_dialog" max-width="572">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>Edit color/Size</div>
          <v-btn @click="edit_dialog = !edit_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="edit_form">
            <v-row class="mb-4 d-flex justify-space-between">
            <v-col
              v-for="(item, idx) in oneSizeDistirbution?.modelBodyParts?.slice()?.reverse()"
              :cols="!item.colorCode?'12':'6'"
              :key="idx"
            >
              <v-row>
                <v-col cols="6" v-if="!item.colorCode">
                  <div >
                    <div class="label">{{ item.bodyPart }}</div>
                    <v-select
                      v-model="item.colorId"
                      :items="colorsList"
                      :rules="[formRules.required]"
                      append-icon="mdi-chevron-down"
                      :placeholder="item.bodyPart"
                      outlined
                      item-text="name"
                      item-value="id"
                      single-line
                      hide-details
                      height="44"
                      class="rounded-lg base"
                      color="#7631FF"
                      dense
                    />
                  </div>
                </v-col>
                <v-col cols="12" v-else>
                  <div >
                    <div class="label">{{ item.bodyPart }}</div>
                    <v-text-field
                    :rules="[formRules.required]"
                    :placeholder="item.bodyPart"
                    v-model="item.colorCode"
                    single-line
                    outlined
                    hide-details
                    height="44"
                    validate-on-blur
                    dense
                    class="rounded-lg base"
                    color="#7631FF"
                    background-color="#F8F4FE"
                  />
                  </div>
                </v-col>
                <v-col cols="6" v-if="!item.colorCode">
                  <div >
                    <div class="label">Panton code</div>
                    <div class="d-flex align-center">
                      <v-text-field
                        v-model="item.pantoneCode"
                        placeholder="0"
                        outlined
                        hide-details
                        height="44"
                        class="rounded-lg base rounded-l-lg rounded-r-0"
                        validate-on-blur
                        dense
                        color="#7631FF"
                      />
                      <v-select
                        :items="enums"
                        v-model="item.pantoneType"
                        style="max-width: 100px"
                        dense
                        outlined
                        hide-details
                        height="44"
                        class="rounded-lg base rounded-r-lg rounded-l-0"
                        validate-on-blur
                        placeholder=""
                        append-icon="mdi-chevron-down"
                        color="#7631FF"
                      />
                    </div>
                  </div>
                  
                </v-col>
              </v-row>
            </v-col>
            </v-row>

            <v-row class="mb-4 d-flex justify-space-between">
              <v-col
                cols="3"
                v-for="(item, idx) in oneSizeDistirbution.sizeDistributions"
                :key="idx"
              >
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
                  placeholder="Enter size"
                  single-line
                  outlined
                  hide-details
                  height="44"
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>
            </v-row>

            <v-card-actions class="d-flex justify-center pb-6">
              <v-btn
                outlined
                class="text-capitalize rounded-lg font-weight-bold mr-6"
                color="#7631FF"
                width="163"
                @click="edit_dialog = !edit_dialog"
              >cancel
              </v-btn>
              <v-btn
                class="text-capitalize rounded-lg font-weight-bold"
                color="#7631FF"
                dark
                v-if="this.$route.params.id !== `add-order`"
                width="163"
                @click="update"
              >update
              </v-btn>
              <v-btn
                class="text-capitalize rounded-lg font-weight-bold"
                color="#7631FF"
                dark
                v-else
                width="163"
                @click="updateNewOrder"
              >save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center"
        >Delete Color/Size distribution
        </v-card-title
        >
        <v-card-text>
          Are you sure you want to Delete Color/Size distribution?
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
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteSizeDistribution"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "ColorSizeDistribution",
  data() {
    return {
      new_dialog: false,
      edit_dialog: false,
      delete_dialog: false,
      new_validate: true,

      templeHeaders: [
        {text: "Total", sortable: false, value: "total"},
        {text: "Over-production %", sortable: false, value: "overproductionPercent"},
        {text: "Total with overproduction", sortable: false, value: "totalWithOverproductionPercent"},
        {text: "Actions", sortable: false, align: "center", value: "actions"},
      ],
      enums:["TPX", "TCX", "TPG", "C","MELANGE"],
      headerSizes: [],
      headerBodyPart: [],
      headers: [],
      item: {},
      newModelId: null,
      newOrderId: null,
      size_list_value: {},
      orderSizeList: [],
      size_value_list: {},

      orderSizeDetail: {
        modelBodyParts: [],
        sizeDistributions: [],
      },
      oneSizeDistirbution:{},
      newSizeDistirbution:{
        modelBodyParts:[],
        sizeDistributions:[],

      },
      totalSizes:{
        sizesList:[],
        total: null,
        totalPriceWithDiscount:null
      },
      modelId: this.$route.query.modelId,
      sizeList:[],
    };
  },

  created(){
    this.getColorsList()
  },

  computed: {
    ...mapGetters({
      sizes: "sizeDistribution/sizes",
      bodyParts: "sizeDistribution/bodyParts",
      sizeValues: "sizeDistribution/sizeValues",
      bodyPartValues: "sizeDistribution/bodyPartValues",
      totalItem: "sizeDistribution/total",
      newModelIdServer: "orders/newModelId",
      newOrderIdServer: "orders/newOrderId",
      overproductionPercent: "sizeDistribution/overproductionPercent",
      totalWithOverproductionPercent: "sizeDistribution/totalWithOverproductionPercent",
      colorsList: "sizeDistribution/colorsList",
      sizeDistributionList: "sizeDistribution/sizeDistributionList",

    }),
  },

  watch: {
    size_list_value(items) {
      const value = {};
      for (let item in items) {
        const sizeObj = {
          size: items[item],
          quantity: 0,
        };
        value[item] = items[item];
        this.orderSizeDetail.sizeDistributions.push(sizeObj);
      }
      this.item = {...this.item, ...value};
      this.orderSizeList.shift();
      if (items.length !== 0) {
        this.orderSizeList.push(this.item);
      }
    },
    

    newOrderIdServer: {
      deep: true,
      handler(id) {
        this.newOrderId = id;
      },
    },

    newModelIdServer: {
      deep: true,
      handler(id) {
        this.newModelIdId = id;
      },
    },
    bodyParts(items) {
      this.headerBodyPart = [];
      this.headers=[];
      for (let item in items) {
        const res = {text: item, sortable: false, value: item};
        let val={}
        if(items[item]===0){
          val={bodyPart:item,bodyPartId:items[item],colorCode:null,isMain:false}
        }else{
          val={bodyPart:item,bodyPartId:items[item],colorId:null}
        }
        this.newSizeDistirbution.modelBodyParts.push(val)

        this.headerBodyPart.push(res);
      }

    },
    sizes(list) {
      this.sizeList=JSON.parse(JSON.stringify(list))
      
    },



    sizeDistributionList(list){
      this.orderSizeList=[]
      let totalObj=0
      let totalSizes=[]
      let totalPriceWithDiscount=0
      this.headerSizes = [];
      this.headers=[]
      if(list.length!==0){
        this.newSizeDistirbution.sizeDistributions=[]
        for (const [key, value] of Object.entries(list[0]?.sizeDistributions)) {
          const res = {text: key, sortable: false, value: key};
          const val={size:key,quantity:null}
          this.newSizeDistirbution.sizeDistributions.push(val)
          this.headerSizes.push(res);
        }
        this.headers = [...this.headerBodyPart,...this.headerSizes, ...this.templeHeaders];
      }else{
        const list = [...this.sizeList]
        this.newSizeDistirbution.sizeDistributions=[]
        this.headerSizes = [];
        list.forEach((item) => {
          const res = {text: item, sortable: false, value: item};
          const val={size:item,quantity:null}
          this.newSizeDistirbution.sizeDistributions.push(val)
          this.headerSizes.push(res);
        });
        this.headers = [...this.headerBodyPart,...this.headerSizes, ...this.templeHeaders];
      }

      const specialList=list.map(function(el){

        const value = {};
        el.bodyPartsCodes.forEach((item) => {
          if(item.color){
            value[item.bodyPart]=item.colorSpecification
          }else{
            value[item.bodyPart]=item.colorCode
          }
        });

        const valueSizes = {};
        const valueSizesList=[];
        let idx=0

        for (let item in el.sizeDistributions) {
          totalSizes[idx]?totalSizes[idx]=totalSizes[idx]:totalSizes[idx]=0
          totalSizes[idx]=parseInt(totalSizes[idx])+parseInt(el.sizeDistributions[item])
          idx++
          const sizeObj = {
            size: item,
            quantity: el.sizeDistributions[item],
          };
          valueSizes[item] = el.sizeDistributions[item];
          valueSizesList.push(sizeObj);
        }

        totalObj=totalObj+el.total
        totalPriceWithDiscount=totalPriceWithDiscount+el.totalWithOverproductionPercent

        return{
          ...value,
          ...valueSizes,
          modelBodyParts:[...el.bodyPartsCodes],
          overproductionPercent:el.overproductionPercent,
          total:el.total,
          setIdentifier:el.setIdentifier,
          sizeDistributionId:el.sizeDistributionId,
          totalWithOverproductionPercent:el.totalWithOverproductionPercent,
          sizeDistributions:[...valueSizesList]

        }
      })
      this.orderSizeList=JSON.parse(JSON.stringify(specialList))

      this.totalSizes.sizesList=[...totalSizes]
      this.totalSizes.total=totalObj
      this.totalSizes.totalPriceWithDiscount=totalPriceWithDiscount
    },

    
  },
  methods: {
    ...mapActions({
      getSizeDistribution: "sizeDistribution/getSizeDistribution",
      getSizeDistirbutionValue: "sizeDistribution/getSizeDistirbutionValue",
      updateSizeDistributionValue: "sizeDistribution/updateSizeDistributionValue",
      deleteSizeDistributionFunc: "sizeDistribution/deleteSizeDistributionFunc",
      getColorsList: "sizeDistribution/getColorsList",
      createSizeDistirbutionFunc: "sizeDistribution/createSizeDistirbutionFunc",
    }),
    edit(item) {
      this.oneSizeDistirbution={}
      this.edit_dialog = !this.edit_dialog;
      this.oneSizeDistirbution={...item}
    },
    deleteFunc(item){
      this.oneSizeDistirbution={}
      this.delete_dialog=true
      this.oneSizeDistirbution={...item}

    },
    async updateNewOrder() {
      const list=[...this.oneSizeDistirbution.modelBodyParts]
      const item = this.oneSizeDistirbution
      const validate=this.$refs.edit_form.validate()
      if(validate){
        list.forEach((el)=>{
          if(el.bodyPart==="Color Code"){
            el.isMain=false
          }
        })
        const specialObj={
          modelBodyParts:[...item.modelBodyParts],
          modelId: this.$store.getters["orders/newModelId"],
          orderId: this.$store.getters["orders/newOrderId"],
          setIdentifier:item.setIdentifier,
          sizeDistributionId:item.sizeDistributionId,
          sizeDistributions:[...item.sizeDistributions]
        }
        await this.updateSizeDistributionValue({specialObj});
        this.edit_dialog = !this.edit_dialog;
      }
    },

    async createSizeDistirbution(){
      const list=[...this.newSizeDistirbution.modelBodyParts]
      const validate=this.$refs.new_form.validate()
      if(validate){
        list.forEach((item)=>{
          if(item.bodyPart==="Main Color"){
            item.isMain=true
          }
        })
        if(this.$route.params.id!=="add-order"){
          await this.createSizeDistirbutionFunc({
            ...this.newSizeDistirbution,
            modelId: this.modelId,
            orderId: this.$route.params.id,
            })
          }
          else{
            await this.createSizeDistirbutionFunc({
            ...this.newSizeDistirbution,
            modelId: this.$store.getters["orders/newModelId"],
            orderId: this.$store.getters["orders/newOrderId"],
            })
          }

          this.new_dialog=false
          await this.$refs.new_form.reset();
        }
      },



    async update() {
      const list=[...this.oneSizeDistirbution.modelBodyParts]
      const item = this.oneSizeDistirbution
      const validate=this.$refs.edit_form.validate()
      if(validate){
        list.forEach((el)=>{
          if(el.bodyPart==="Color Code"){
            el.isMain=false
          }
        })
        const specialObj={
          modelBodyParts:[...item.modelBodyParts],
          modelId: this.modelId,
          orderId: this.$route.params.id,
          setIdentifier:item.setIdentifier,
          sizeDistributionId:item.sizeDistributionId,
          sizeDistributions:[...item.sizeDistributions]

        }

        await this.updateSizeDistributionValue(specialObj)
        this.edit_dialog = !this.edit_dialog;
      }
    },

    deleteSizeDistribution() {
      const id = this.$route.params.id;
      if (id !== "add-order") {
        this.deleteSizeDistributionFunc({
          orderId: id,
          modelId: this.modelId,
          setIdentifier:this.oneSizeDistirbution.setIdentifier,
          sizeDistributionId:this.oneSizeDistirbution.sizeDistributionId
        });
        this.delete_dialog = false;
      } else {
        this.deleteSizeDistributionFunc({
          modelId: this.$store.getters["orders/newModelId"],
          orderId: this.$store.getters["orders/newOrderId"],
          setIdentifier:this.oneSizeDistirbution.setIdentifier,
          sizeDistributionId:this.oneSizeDistirbution.sizeDistributionId
        });
        this.delete_dialog = false;
      }
    },
  },

  async mounted() {
    const id = this.$route.params.id;
    if (id !== "add-order") {
      await this.getSizeDistribution({modelId: this.modelId});
      await this.getSizeDistirbutionValue({
        modelId: this.modelId,
        orderId: id,
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.colorSizeBtn {
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #777c85;
}
</style>
