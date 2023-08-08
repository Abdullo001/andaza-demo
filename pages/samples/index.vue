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
    :items="currentList"
    :items-per-page="itemsPerPage"
    :footer-props="{
      itemsPerPageOptions: [10, 20, 50, 100],
    }"
    :loading="loading"
    @update:page="page"
    @update:items-per-page="size"
    :server-items-length="totalElements"
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
            @click="new_dialog=true"
          >
            <v-icon>mdi-plus</v-icon>
            Samples
          </v-btn>
        </v-toolbar-title>
      </v-toolbar>
    </template>

    <template #item.result="{ item }">
      <v-select
        @click.stop
        @change="changeStatus(item)"
        :background-color="statusColor.resultColor(item.result)"
        :items="result_enums"
        append-icon="mdi-chevron-down"
        v-model="item.result"
        hide-details
        class="mt-n2"
        rounded
        dark
      />
    </template>

    <template #item.actions="{ item, index }">
      <div>
        <v-tooltip
          top
          color="green"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="green"
              @click="editRow(item, index)"
            >
              <v-img src="/edit-active.svg" max-width="22" />
            </v-btn>
          </template>
          <span class="text-capitalize">Edit</span>
        </v-tooltip>

        <v-tooltip
          top
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="red"
              @click="deleteRow(item, index)"
            >
              <v-img src="/delete.svg" max-width="27" />
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>
      </div>
    </template>
    </v-data-table>

    <v-dialog v-model="new_dialog" width="580">
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
                <v-combobox
                v-model="sample.modelNumber"
                :items="modelList"
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
              <v-col cols="12" md="6">
                <div class="label">Purpose <span style="color: red;">*</span></div>
                <v-select
                v-model="sample.purposeId"
                :rules="[formRules.required]"
                :items="purposeList"
                item-text="name"
                item-value="id"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                append-icon="mdi-chevron-down"
                dense
                placeholder="Select purpose"
                color="#7631FF"
              />
              </v-col>
              <v-col cols="12" md="6" v-if="sample.purposeId===3">
                <div class="label">Part colors <span style="color: red;">*</span></div>
                <v-select
                  v-model="sample.colorId"
                  :rules="[formRules.required]"
                  :items="colorList"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  append-icon="mdi-chevron-down"
                  dense
                  placeholder="Select part color"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6" v-if="sample.purposeId===11">
                <div class="label">Part colors <span style="color: red;">*</span></div>
                <v-select
                  v-model="sample.colorId"
                  :rules="[formRules.required]"
                  :items="colorList"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  append-icon="mdi-chevron-down"
                  dense
                  placeholder="Select part color"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Partner <span style="color: red;">*</span></div>

                <v-select
                  v-model="sample.partnerId"
                  :rules="[formRules.required]"
                  :items="partner_enums"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  append-icon="mdi-chevron-down"
                  dense
                  placeholder="Select partner"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Sent date<span style="color: red;">*</span></div>
                <el-date-picker
                v-model="sample.sentDate"
                :rules="[formRules.required]"
                style="width: 100%"
                type="datetime"
                placeholder="Enter sent date "
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
                class="base_picker"
              >
              </el-date-picker>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Recieved date</div>
                <el-date-picker
                v-model="sample.recievedDate"
                style="width: 100%"
                type="datetime"
                placeholder="Enter recieved date "
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
                class="base_picker"
              >
              </el-date-picker>
              </v-col>


              <v-col cols="12" md="6">
                <div class="label">Result </div>
                <v-select
                  v-model="sample.result"
                  :items="result_enums"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  append-icon="mdi-chevron-down"
                  dense
                  placeholder="Select result"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6"  v-if="sample.purposeId===11">
                <div class="label">Panton code</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="sample.pantoneCode"
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
                    v-model="sample.pantoneType"
                    style="max-width: 100px"
                    dense
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    validate-on-blur
                    append-icon="mdi-chevron-down"
                    color="#7631FF"
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="6" >
                <div class="label">Reason <span style="color: red;">*</span> </div>
                <v-text-field
                  v-model="sample.reason"
                  :rules="[formRules.required]"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  placeholder="Enter reason"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6" v-if="sample.purposeId===11">
                <div class="label">Color variant  </div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="sample.colorVariant"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  placeholder="Enter color variant"
                  color="#7631FF"
                />
              </v-col>

              <v-col cols="12">
                <div class="text-body-1 font-weight-medium mb-3">
                  Upload files...
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
                    Upload files...
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <div
                      v-for="(item, idx) in image_list"
                      :key="`image_${idx}`"
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
                            <v-icon> mdi-close</v-icon>
                          </v-btn>
                        </p>
                      </div>
                      <v-divider/>
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

          Cancel


          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            Edit Sample
          </div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" lazy-validation v-model="validate">
            <v-row>
              <v-col cols="12" md="6">
                <div class="label">Model № <span style="color: red;">*</span></div>

                <v-combobox
                v-model="selectedSample.modelNumber"
                :items="modelList"
                :search-input.sync="modelIdSearchEdit"
                readonly
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
              <v-col cols="12" md="6">
                <div class="label">Purpose <span style="color: red;">*</span></div>
                <v-select
                v-model="selectedSample.samplePurposeId"
                :rules="[formRules.required]"
                :items="purposeList"
                item-text="name"
                item-value="id"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                append-icon="mdi-chevron-down"
                dense
                placeholder="Select purpose"
                color="#7631FF"
              />
              </v-col>
              <v-col cols="12" md="6" v-if="selectedSample.samplePurposeId===11">
                <div class="label">Body part <span style="color: red;">*</span></div>
                <v-select
                  v-model="selectedSample.modelPartId"
                  :rules="[formRules.required]"
                  :items="modelPartsList"
                  item-text="bodyPart"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  append-icon="mdi-chevron-down"
                  dense
                  placeholder="Select body part "
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6" v-if="selectedSample.samplePurposeId===11">
                <div class="label">Part colors <span style="color: red;">*</span></div>
                <v-select
                  v-model="selectedSample.colorId"
                  :rules="[formRules.required]"
                  :items="colorList"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  append-icon="mdi-chevron-down"
                  dense
                  placeholder="Select part color"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Partner <span style="color: red;">*</span></div>

                <v-select
                  v-model="selectedSample.partnerId"
                  :rules="[formRules.required]"
                  :items="partner_enums"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  append-icon="mdi-chevron-down"
                  dense
                  placeholder="Select partner"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Sent date<span style="color: red;">*</span></div>
                <el-date-picker
                v-model="selectedSample.sentDate"
                :rules="[formRules.required]"
                style="width: 100%"
                type="datetime"
                placeholder="Enter sent date "
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
                class="base_picker"
              >
              </el-date-picker>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Recieved date<span style="color: red;">*</span></div>
                <el-date-picker
                v-model="selectedSample.receivedDate"
                :rules="[formRules.required]"
                style="width: 100%"
                type="datetime"
                placeholder="Enter recieved date "
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
                class="base_picker"
              >
              </el-date-picker>
              </v-col>


              <v-col cols="12" md="6">
                <div class="label">Result <span style="color: red;">*</span></div>

                <v-select
                  v-model="selectedSample.result"
                  :rules="[formRules.required]"
                  :items="result_enums"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  append-icon="mdi-chevron-down"
                  dense
                  placeholder="Select result"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6"  v-if="selectedSample.samplePurposeId===11">
                <div class="label">Panton code</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="selectedSample.pantoneCode"
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
                    v-model="selectedSample.pantoneType"
                    style="max-width: 100px"
                    dense
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    validate-on-blur
                    append-icon="mdi-chevron-down"
                    color="#7631FF"
                  />
                </div>
              </v-col>
              <v-col cols="12" >
                <div class="label">Reason </div>
                <v-text-field
                   v-model="selectedSample.reason"
                  :rules="[formRules.required]"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  placeholder="Enter reason"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6" v-if="selectedSample.samplePurposeId===11">
                <div class="label">Color variant  </div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="selectedSample.colorVariant"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  placeholder="Enter color variant"
                  color="#7631FF"
                />
              </v-col>

              <v-col cols="12">
                <div class="text-body-1 font-weight-medium mb-3">
                  Upload files...
                </div>
                <v-card style="border: #a5a7ad dashed 1px" elevation="0">
                  <v-card-title>
                    <input
                      ref="uploader_edit"
                      class="d-none"
                      type="file"
                      @change="onChangeFileEdit"
                    />
                    <v-btn
                      @click="clickImportFileEdit"
                      elevation="0"
                      style="background-color: #f1ebfe; color: #7631ff"
                      :disabled="image_list.length !== 0"
                      class="font-weight-bold mr-3 text-capitalize"
                    >
                    Upload files...
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <div
                      v-for="(item, idx) in edit_image_list"
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
                          <v-btn icon @click="removeImageEdit(item.size)">
                            <v-icon> mdi-close</v-icon>
                          </v-btn>
                        </p>
                      </div>
                      <v-divider/>
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
            @click="edit_dialog = false"
          >

          Cancel


          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="update"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">
          Delete sapmles row
        </v-card-title>
        <v-card-text>
          Are you sure you want to Delete samples row?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            Cancel
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteSamples"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex';

export default {
  data(){
    return{
      filter_form: true,
      new_dialog:false,
      edit_dialog:false,
      delete_dialog:false,
      selectedSample:{},
      validate: true,
      edit_validate:true,
      deleteId:null,
      enums:["TPX","TPC","TPG","C"],

      modelIdSearch: "",
      modelIdSearchEdit:"",
      current_page: 0,
      itemsPerPage:10,
      image_list:[],
      edit_image_list: [],
      result_enums:["PENDING", "OK", "REMAKE"],
      sample:{
        modelNumber:null,
        modelPartId:null,
        colorId:null,
        purposeId:"",
        partnerId:"",
        sentDate:"",
        recievedDate:"",
        result:"",
        reason:"",

      },
      filters:{
        id:"",
        purpose:"",
        partner:"",
        updatedAt:""
      },
      headers:[
        {text: "Id", align: "start", sortable: false, value: "id"},
        {text: "Mod. №", sortable: false, value: "modelNumber",width:150},
        {text: "Purpose", sortable: false, value: "samplePurpose"},
        {text: "Partner", sortable: false, value: "partner"},
        {text: "Sent date", sortable: false, value: "sentDate"},
        {text: "Recieved date", sortable: false, value: "receivedDate"},
        {text: "Result", sortable: false, value: "result"},
        {text: "Reason", sortable: false, value: "reason"},
        {text: "File", sortable: false, value: "fileExtension"},
        {text: "Created", sortable: false, value: "createdAt"},
        {text: "Created by", sortable: false, value: "createdBy",width:120},
        {text: "Actions", sortable: false, value: "actions", align:"center",width:150},
      ],
      currentList:[],
    }
  },

  created(){
    this.getPurposeList()
    this.getPartnerList();
    this.getModelId();

  },

  computed:{
    ...mapGetters({
      samplesList:"accessorySamples/samplesList",
      purposeList:"accessorySamples/purposeList",
      partner_enums: 'models/partner_enums',
      modelList: "orders/modelList",
      loading: "accessorySamples/loading",
      totalElements: "accessorySamples/totalElements",
      modelPartsList: "modelParts/modelPartsList",
      colorList: "accessorySamples/colorList",
    })
  },

  watch:{
    samplesList(val){
      this.currentList=JSON.parse(JSON.stringify(val))
    },

    "sample.modelNumber"(val){
      if(val!==null) {
        this.modelColor(val.id)
      }
    },

    "selectedSample.modelId"(val){
      if(val!==null) {
        this.modelColor(val)
      }
    },

    "selectedSample.modelNumber"(val){
      if(val!==null) {
        this.modelColor(val.id)
      }
    },


  },

  methods:{
    ...mapActions({
      getSamplesList:"accessorySamples/getSamplesList",
      getPurposeList:"accessorySamples/getPurposeList",
      getPartnerList: 'models/getPartnerList',
      getModelId: "orders/getModelId",
      createSample:"accessorySamples/createSample",
      getOneSample:"accessorySamples/getOneSample",
      deleteSample:"accessorySamples/deleteSample",
      updateSample:"accessorySamples/updateSample",
      changeResult:"accessorySamples/changeResult",
      filterSamples:"accessorySamples/filterSamples",
      modelColor:"accessorySamples/modelColor",
      getModelPart:"modelParts/getModelPart",

    }),

    removeImageEdit(e) {
      this.edit_image_list = this.edit_image_list.filter(
        (item) => item.size !== e
      );
    },
    removeImage(e) {
      this.image_list = this.image_list.filter((item) => item.size !== e);
    },
    onChangeFile(e) {
      const file = e.target.files[0];
      this.image_list.push(file);
    },
    onChangeFileEdit(e) {
      const file = e.target.files[0];
      this.edit_image_list.push(file);
    },

    filterOrder(){
      this.filterSamples({...this.filters})
    },
    resetFilter(){
      this.filters={
        id:"",
        purpose:"",
        partner:"",
        updatedAt:"",
      }
      this.filterSamples({...this.filters})
    },

    editRow(item, index){
      this.edit_dialog=true
      this.selectedSample={...item}
    },

    deleteRow(item, index){
      this.deleteId=item.id
      this.delete_dialog=true
    },

    deleteSamples(){
      this.deleteSample(this.deleteId)
      this.delete_dialog=false

    },

    async page(value) {
      this.current_page = value - 1;
      await this.getSamplesList({page:this.current_page,size:this.itemPrePage})

    },
    async size(value) {
      this.itemPrePage = value;
      await this.getSamplesList({page:0,size:this.itemPrePage})

    },

    changeStatus(item){
      this.changeResult({id:item.id,result:item.result})
    },



    async save() {
      const validate = this.$refs.new_form.validate();
      if (validate  !== '') {
        const {
          modelNumber,
          purposeId,
          partnerId,
          sentDate,
          recievedDate,
          modelPartId,
          colorId,
          pantoneCode,
          pantoneType,
          colorVariant,
          result,
          reason,
        } = this.sample;
        const formData = new FormData();
        formData.append("modelId",modelNumber.id );
        formData.append("samplePurposeId", purposeId);
        if (this.image_list[0] !== undefined) {
          formData.append("file", this.image_list[0]);
        }
        formData.append("sentDate", sentDate);
        formData.append("partnerId", partnerId);

        if(colorId!==null){
          formData.append("colorId", colorId);
        }
        if(pantoneCode!==null){
          formData.append("pantoneCode", pantoneCode);
          formData.append("pantoneType", pantoneType);
          formData.append("colorVariant", colorVariant);
        }
        if(recievedDate!==""){
          formData.append("receivedDate", recievedDate);
        }
        if(result!==""){
          formData.append("result", result);
        }
        formData.append("reason", reason);

        await this.createSample(formData);
        this.image_list = [];

        this.$refs.new_form.reset();
        this.sample.sentDate = '';
        this.sample.recievedDate = '';
        this.new_dialog = false;
      }

    },
    async update() {
      const edit_validate = this.$refs.edit_form.validate();
      if (edit_validate !== '') {
        const {
          id,
          modelNumber,
          modelId,
          samplePurposeId,
          partnerId,
          sentDate,
          modelPartId,
          colorVariant,
          pantoneType,
          pantoneCode,
          colorId,
          receivedDate,
          result,
          reason,
        } = this.selectedSample;
        const formData = new FormData();
        formData.append("modelId",modelId );
        formData.append("id",id );
        formData.append("samplePurposeId", samplePurposeId);
        if (this.image_list[0] !== undefined) {
          formData.append("file", this.edit_image_list[0]);
        }
        if(modelPartId!==null){
          formData.append("modelPartId", modelPartId);
        }
        if(colorId!==null){
          formData.append("colorId", colorId);
          formData.append("pantoneCode", pantoneCode);
          formData.append("pantoneType", pantoneType);
          formData.append("colorVariant", colorVariant);
        }
        formData.append("partnerId", partnerId);
        formData.append("sentDate", sentDate);
        if(receivedDate!==""&&receivedDate!==undefined){
          formData.append("receivedDate", receivedDate);
        }
        if(result!==""&&receivedDate!==undefined){
          formData.append("result", result);
        }
        formData.append("reason", reason);

        await this.updateSample(formData);
        this.edit_image_list = [];
        this.edit_dialog = false;
      }

    },


    clickImportFileEdit() {
      this.$refs.uploader_edit.click();
    },
    clickImportFile() {
      this.$refs.uploader.click();
    },
  },

  mounted(){
    this.$store.commit("setPageTitle", "Planning");
    this.getSamplesList({page:0,size:10})
  }
}
</script>
<style lang="">

</style>
