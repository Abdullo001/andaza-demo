<template>
  <div>
    <v-card flat class="rounded-lg pb-4">
      <v-data-table :headers="headers" :items="items" hide-default-footer>
        <template #top>
          <div class="title pa-4">Order quantities</div>
        </template>
      </v-data-table>

      <v-card-actions class="d-flex mt-2">
        <v-spacer/>
        <v-btn
          class="rounded-lg text-capitalize"
          color="red"
          width="160"
          height="36"
          :dark="!disableBtn"
          :disabled="disableBtn"
          @click="refuseBtn"
        >
          Refuse
        </v-btn>
        <v-btn
          class="rounded-lg text-capitalize"
          color="green"
          width="160"
          height="36"
          :dark="!disableBtn"
          :disabled="disableBtn"
          @click="warningDialog=true"
        >
          Approwe
        </v-btn>
        <v-spacer/>
        
      </v-card-actions>
    </v-card>

    <v-dialog v-model="warningDialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">
          Confirming incoming works
        </v-card-title>
        <v-card-text>
          Are you sure you want to confirm the quantities of incoming works
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="red"
            width="140"
            @click.stop="warningDialog = false"
          >
            Cancel
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="green"
            width="140"
            elevation="0"
            dark
            @click="approwe"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="refuseDialog" width="800">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Add classification</div>
          <v-btn icon color="#544B99" @click="refuseDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="refuse_form" v-model="refuse_validate" lazy-validation>
            <v-row>
              
              <v-col cols="12" lg="6">
                <div class="label">Select main color</div>
                <v-select
                  :items="colorList"
                  v-model="refuseItem.detailsId"
                  placeholder="Select gender"
                  item-text="color"
                  item-value="id"
                  dense
                  outlined
                  height="44"
                  hide-details
                  color="#544B99"
                  class="rounded-lg base mr-2"
                  append-icon="mdi-chevron-down"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="3" v-for="(item, idx) in refuseItem.primaryList" :key="`_cutting_${idx}`">
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
                  placeholder="0"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base "
                  validate-on-blur
                  dense
                  color="#544B99"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div class="label">Description</div>
                <v-text-field
                  v-model="refuseItem.description"
                  placeholder="Enter description"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base "
                  validate-on-blur
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
            outlined color="#544B99"
            width="130"
            @click="refuseDialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="130"
            @click="sendRefuse"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "OrderQuantities",

  data() {
    return {
      refuse_validate:true,
      value:0,
      headers: [],
      items: [],
      colorList:[],
      warningDialog:false,
      disableBtn:false,
      refuseDialog:false,
      refuseItem:{
        detailsId:"",
      },

    };
  },

  computed: {
    ...mapGetters({
      orderQuantityList: "commonProcess/orderQuantityList",
      ownList:"commonProcess/ownList",
      subcontractList:"commonProcess/subcontractList",
      isConfirm:"commonProcess/isConfirm",
    }),
  },

  watch: {
    isConfirm(val){
      this.disableBtn=JSON.parse(JSON.stringify(val.isConfirm))
    },
    ownList(val){
      this.colorList=JSON.parse(JSON.stringify(val))
    },
    subcontractList(val){
      this.colorList=JSON.parse(JSON.stringify(val))
    },
    
    refuseDialog(val){
      if(!val){
        this.$refs.refuse_form.reset()
      }
    },
    orderQuantityList(list) {
      this.headers = [
        { text: "Main color", sortable: false, value: "color", align: "start" },
      ];
      list[0]?.sizeDistributionList.forEach((item) => {
        this.headers.push({
          text: item.size,
          sortable: false,
          value: item.size,
          align: "start",
        });
      });
      this.headers.push({
        text: "Total",
        sortable: false,
        value: "total",
        align: "end",
      });

      const specialList = list.map(function (el) {
        const sizeList = {};
        const primaryList=[];
        el?.sizeDistributionList.forEach((item) => {
          sizeList[item.size] = item.quantity;
          primaryList.push({size:item.size,quantity:null})
        });

        return {
          color: el.color,
          total: el.total,
          ...sizeList,
          primaryList,
        };
      });
      this.items = JSON.parse(JSON.stringify(specialList));
    },
  },

  methods: {
    ...mapActions({
      getOrderQuantityList: "commonProcess/getOrderQuantityList",
      refuseApprove: "commonProcess/refuseApprove",
      confirmApprove: "commonProcess/confirmApprove",
    }),
    approwe(){
      this.disableBtn=true
      this.warningDialog=false
      this.confirmApprove({isConfirm:true})
    },
    refuseBtn(){
      this.refuseDialog=true
      this.refuseItem={...this.items[0]}
    },
    increment(){
      this.value++
    },
    decrement(){
      this.value--
    },
    sendRefuse(){
      const data={
        description:this.refuseItem.description,
        detailsId:this.refuseItem.detailsId,
        reason:"DEFECT",
        sizeDistributions:[],
      }

      data.sizeDistributions=this.refuseItem.primaryList.map((item)=>{
        
        return{
          size:item.size,
          quantity:item.quantity??0,
        }
      })
      this.refuseApprove(data)

      this.refuseDialog=false
    }


  },

  mounted() {
    this.getOrderQuantityList();
    const id = this.$route.query.isConfirmed
    this.disableBtn=id==="true"?true:false
  },
};
</script>

<style lang="scss" scoped ></style>
