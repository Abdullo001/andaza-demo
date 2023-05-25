<template >
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filters.id"
                placeholder="Id samples purposes"
                outlined
                validate-on-blur
                dense
                hide-details
                class="rounded-lg filter"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filters.purpose"
                placeholder="Purposes"
                outlined
                validate-on-blur
                dense
                hide-details
                class="rounded-lg filter"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filters.partner"
                placeholder="Partner"
                outlined
                validate-on-blur
                dense
                hide-details
                class="rounded-lg filter"
              />
            </v-col>
           
            <v-col cols="12" lg="2" md="2">
              <el-date-picker
                v-model="filters.updatedAt"
                type="datetime"
                class="rounded-lg d-block filter_picker"
                placeholder="Updated"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </v-col>
            <v-spacer/>
            <v-col cols="12" lg="3">
              <div class="d-flex justify-end">
                <v-btn
                  width="140"
                  outlined
                  color="#397CFD"
                  elevation="0"
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
                  @click="resetFilter"
                >
                  Reset
                </v-btn>
                <v-btn
                  width="140"
                  color="#397CFD"
                  dark
                  elevation="0"
                  class="text-capitalize rounded-lg font-weight-bold"
                  @click="filterOrder"
                >
                  Search
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-data-table
    :headers="headers"
    :items="samplesList"

    :items-per-page="itemsPerPage"
    :footer-props="{
      itemsPerPageOptions: [10, 20, 50, 100],
    }"
    class="mt-4"
    >

    <template #top>
      <v-toolbar elevation="0">
        <v-toolbar-title
          class="d-flex w-full align-center justify-space-between"
        >
          <div>Samples</div>
          <v-btn
            color="#7631FF"
            dark
            class="text-capitalize rounded-lg"
            
          >
            <v-icon>mdi-plus</v-icon>
            Samples
          </v-btn>
        </v-toolbar-title>
      </v-toolbar>
    </template>

    </v-data-table>

    <!-- <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            Create Sample
          </div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" lazy-validation v-model="validate">
            <v-row>
              <v-col cols="12" md="6">
                <div class="label">Model № <span style="color: red;">*</span></div>
                <v-text-field
                  :rules="[formRules.required]"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  placeholder="Select model "
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Purpose <span style="color: red;">*</span></div>
                <v-text-field
                  :rules="[formRules.required]"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  placeholder="Select purpose"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{$t('partners.dialog.pType')}}</div>
                <v-select
                  :rules="[formRules.required]"
                  v-model="create_partner.typeId"
                  :items="partner_type"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  append-icon="mdi-chevron-down"
                  dense
                  :placeholder="$t('partners.dialog.pTypeText')"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{$t('partners.dialog.pNumber')}} <span style="color: red;">*</span></div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="create_partner.phoneNumber"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  v-mask="'(##) ### ## ##'"
                  placeholder="(--) --- -- --"
                  prefix="+998"
                  dense
                  v-model.trim="create_partner.phoneNumber"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{$t('partners.dialog.email')}} <span style="color: red;">*</span></div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="create_partner.email"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :placeholder="$t('partners.dialog.emailText')"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{$t('partners.dialog.addres')}} <span style="color: red;">*</span></div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="create_partner.address"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :placeholder="$t('partners.dialog.addresText')"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{$t('partners.dialog.contractNumber')}} <span style="color: red;">*</span></div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="create_partner.contractNumber"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :placeholder="$t('partners.dialog.contractNumberText')"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{$t('partners.dialog.created')}} <span style="color: red;">*</span></div>
                <el-date-picker
                  :rules="[formRules.required]"
                  v-model="create_partner.contractDate"
                  style="width: 100%"
                  type="datetime"
                  :placeholder="$t('partners.dialog.created')"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                  class="base_picker"
                >
                </el-date-picker>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{$t('partners.dialog.status')}}</div>
                <v-select
                  :rules="[formRules.required]"
                  v-model="create_partner.status"
                  :items="statusEnums"
                  append-icon="mdi-chevron-down"
                  placeholder="Select status"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  color="#7631FF"
                  dense

                />
              </v-col>
              <v-col cols="12">
                <div class="text-body-1 font-weight-medium mb-3">
                  {{ $t("partners.dialog.uploadContract") }}
                </div>
                <v-card style="border: #a5a7ad dashed 1px" elevation="0">
                  <v-card-title>
                    <input
                      ref="uploader"
                      class="d-none"
                      type="file"
                      @change="onChangeFile"
                    />
                    <v-btn
                      @click="clickImportFile"
                      elevation="0"
                      style="background-color: #f1ebfe; color: #7631ff"
                      :disabled="image_list.length !== 0"
                      class="font-weight-bold mr-3 text-capitalize"
                    >
                      {{ $t("partners.dialog.uploadFiles") }}
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <div
                      v-for="(item, idx) in image_list"
                      :key="`imade_${idx}`"
                    >
                      <div class="d-flex justify-space-between align-center">
                        <p class="font-weight-bold">
                          <v-icon class="mr-3" color="green">
                            mdi-check
                          </v-icon>
                          {{ item.name }}
                        </p>
                        <p>
                          <v-btn icon @click="removeImage(item.size)">
                            <v-icon> mdi-close </v-icon>
                          </v-btn>
                        </p>
                      </div>
                      <v-divider />
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#7631FF"
            width="163"
            @click="new_dialog = false"
          >

          {{ $t('partners.dialog.cancel') }}


          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="save"
          >
            {{ $t("partners.dialog.create") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex';

export default {
  data(){
    return{
      filter_form: true,
      itemsPerPage:10,
      filters:{
        id:"",
        purpose:"",
        partner:"",
        updatedAt:""
      },
      headers:[
        {text: "Id", align: "start", sortable: false, value: ""},
        {text: "Mod. №", sortable: false, value: ""},
        {text: "Purpose", sortable: false, value: ""},
        {text: "Partner", sortable: false, value: ""},
        {text: "Sent date", sortable: false, value: ""},
        {text: "Recieved date", sortable: false, value: ""},
        {text: "Result", sortable: false, value: ""},
        {text: "Reason", sortable: false, value: ""},
        {text: "File", sortable: false, value: ""},
        {text: "Created", sortable: false, value: ""},
        {text: "Created by", sortable: false, value: ""},
        {text: "Actions", sortable: false, value: ""},

    ]
    }
  },

  computed:{
    ...mapGetters({
      samplesList:"accessorySamples/samplesList"
    })
  },

  methods:{
    ...mapActions({
      getSamplesList:"accessorySamples/getSamplesList"
    }),

    filterOrder(){

    },
    resetFilter(){

    }
  },

  mounted(){
    this.getSamplesList()
  }
}
</script>
<style lang="">
  
</style>