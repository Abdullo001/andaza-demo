<template >
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0" class="mb-4">
      <v-card-title>
        <div>
          Partners
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-form ref="order_detail" v-model="new_validate" lazy-validation>
          <v-row>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">Partner name</div>
              <v-text-field
                v-model="partner.name"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                placeholder="Enter partner name"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="3">
              <div class="label">{{ $t('partners.dialog.pType') }}</div>
              <v-select
                v-model="partner.partnerTypeCode"
                :items="partnerTypes"
                item-text="name"
                item-value="code"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                append-icon="mdi-chevron-down"
                dense
                :placeholder="$t('partners.dialog.pTypeText')"
                color="#544B99"
              />
            </v-col>
            <v-col cols="12" md="3">
              <div class="label">Cooperation type</div>
              <v-select
                v-model="partner.cooperationTypeId"
                :items="cooperationType"
                :disabled="!cooperationType.length"
                item-text="name"
                item-value="cooperationTypeId"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                append-icon="mdi-chevron-down"
                dense
                placeholder="Select c ooperation type"
                color="#544B99"
              />
            </v-col>
            <v-col cols="3">
              <div class="label">{{  $t("partners.table.addBrandName")}}</div>
              <div class="d-flex">
                <v-text-field
                  v-model="newBrand.name"
                  color="#544B99"
                  placeholder="Enter brand name"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="base rounded-lg mr-3"
                  @keydown.enter="addBrand"
                />
                <v-btn
                  @click="addBrand"
                  color="#544B99"
                  class="rounded-lg text-capitalize"
                  dark
                  width="30"
                  height="44"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="label">Brands</div>
              <v-autocomplete
                chips
                multiple
                v-model="partner.brandNames"
                :items="brandNameList"
                deletable-chips
                append-icon="mdi-chevron-down"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                :placeholder=" $t('partners.table.brandName')"
                :label=" $t('partners.table.brandName')"
                single-line
                color="#544B99"
              >
                <template v-slot:selection="{item, attrs, on}">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    color="#544B99"
                    dark
                    close
                    @click:close="remove(item)"
                  >
                    {{ item }}
                  </v-chip>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="3" >
              <div class="label">Country</div>
              <v-combobox
                v-model="partner.country"
                :items="countryList"
                :search-input.sync="countrySearch"
                item-text="name"
                item-value="id"
                outlined
                hide-details
                height="44"
                class="rounded-lg base d-flex align-center justify-center mb-4"
                :return-object="true"
                color="#544B99"
                dense
                placeholder="Enter country"
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="3" >
              <div class="label">{{ $t('partners.dialog.addres') }}</div>
              <v-text-field
                v-model="partner.address"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                :placeholder="$t('partners.dialog.addresText')"
                color="#544B99"
              />
            </v-col>
            <v-col cols="3" md="3">
              <div class="label">{{ $t('partners.dialog.pNumber') }}</div>
              
              <v-text-field
                :rules="[formRules.required]"
                v-model="partner.phoneNumber"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                :placeholder="$t('partners.dialog.pNumber')"
                color="#544B99"
              />
            </v-col>


            <v-col cols="3" md="3">
              <div class="label">{{ $t('partners.dialog.email') }}</div>
              <v-text-field
                v-model="partner.email"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                :placeholder="$t('partners.dialog.emailText')"
                color="#544B99"
              />
            </v-col>
            <v-col cols="3" md="3">
              <div class="label">Created by</div>
              <v-text-field
                v-model="partner.createdBy"
                disabled
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                placeholder="Created By"
                color="#544B99"
              />
            </v-col>
            <v-col cols="3" md="3">
              <div class="label">Created at</div>
              <v-text-field
                v-model="partner.createdAt"
                disabled
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                placeholder="Created at"
                color="#544B99"
              />
            </v-col>
            <v-col cols="3" md="3">
              <div class="label">Update by</div>
              <v-text-field
                v-model="partner.updatedBy"
                disabled
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                placeholder="Created By"
                color="#544B99"
              />
            </v-col>
            <v-col cols="3" md="3">
              <div class="label">Update at</div>
              <v-text-field
                v-model="partner.updatedAt"
                disabled
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                placeholder="Created at"
                color="#544B99"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end pb-8">
        <v-btn
          class="rounded-lg text-capitalize ml-4 font-weight-bold"
          color="#544B99"
          dark
          width="163"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>

    <PartnerContract/>
  </div>
</template>
<script>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import PartnerContract from "@/components/PartnerContract.vue";
import {mapActions, mapGetters} from "vuex"
export default {
  components:{
    Breadcrumbs,
    PartnerContract
  },

  data(){
    return{
      map_links: [
        {
          text: "Home",
          disabled: false,
          to: "/",
          icon: true,
        },
        {
          text: "Partners",
          disabled: false,
          to: "/partners",
          icon: true,
        },
        {
          text: "Detail",
          disabled: true,
          to: "/partners/7",
          icon: false,
        },
      ],
      new_validate:true,
      newBrand:{
        name:"",
      },
      brandNameList:[],
      countrySearch:"",
      title:"add",
      items:[""],
      partner:{
        name:"",
        partnerTypeCode:"",
        cooperationType:"",
        brandNames:[],
        brandName:"",
        countryId:null,
        country:"",
        address:"",
        phoneNumber:"",
        email:"",
        createdAt:"",
        createdBy:"",
        updatedAt:"",
        updatedBy:"",
        status: "ACTIVE"
      }
    }
  },

  computed:{
    ...mapGetters({
      partnerTypes:"partners/partnerTypes",
      countryList: "partners/countryList",
      partnerId: "partners/partnerId",
      partner_one_list: "partners/partner_one_list",
      cooperationType: "partners/cooperationType",
    })
  },

  watch:{
    partner_one_list(val){
      this.partner=JSON.parse(JSON.stringify(val))
      this.partner.country={name:val.country,id:val.countryId}
    },
    "partner.partnerTypeCode"(val){
      if(val){
        this.getCooperationType(val)
      }
    },
    "partner.brandNames"(value) {
      this.brandNameList = value
    },
  },

  methods:{
    ...mapActions({
      getPartnersType: "partners/getPartnersType",
      getCooperationType: "partners/getCooperationType",
      getCountryList: "partners/getCountryList",
      getPartnerOneList: "partners/getPartnerOneList",
      createPartnerList: "partners/createPartnerList",
      updatePartnerList: "partners/updatePartnerList",
    }),

    addBrand() {
      const item = {...this.newBrand};
      if (!!item.name) {
        this.partner.brandNames.push(item.name);
        this.newBrand.name = "";
      }
    },
    remove(item) {
      const index = this.brandNameList.indexOf(item)
      if (index >= 0) this.brandNameList.splice(index, 1)
    },
    
    save(){
      const data={...this.partner}
      data.countryId=this.partner.country.id
      
      if(this.title==="add"){
        this.createPartnerList(data)
      }
      if(this.title==="edit"){
        this.updatePartnerList({data,id:data.id})
      }
    }
  },

  mounted(){
    const id = this.$route.params.id;
    if(!this.partnerId&&id!=="add-partner"){
      this.$store.commit("partners/setPartnerId",id)
    }
    this.getPartnersType()
    this.getCountryList({name: ""});
    const param=this.$route.params.id
    if(param!=="add-partner"){
      this.title="edit"
      this.getPartnerOneList(this.partnerId);
    }
    
  }
  
}
</script>
<style lang="scss">
  
</style>