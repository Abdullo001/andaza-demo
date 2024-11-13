<template >
  <div>
    <v-data-table
      item-key="calculation"
      :headers="headers"
      :items="contractByModelList"
      >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex">
            <div class="title">{{ $t('orderBox.dialog.contract') }}</div>
            <v-spacer />
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.contractDate="{item}">
        {{ formatLong(item.contractDate) }}
      </template>
      <template #item.contractDeadline="{item}">
        {{ formatLong(item.contractDeadline) }}
      </template>

      <template #item.actions="{ item }">
        <div>
          <v-tooltip top color="#544B99">
            <template #activator="{on, attrs}">
              <v-btn
                icon
                :href="item.contractFilePath"
                :download="`Document.${item.contractNumber}`"
                v-on="on"
                v-bind="attrs"
                @click.stop
              >
                <v-img src="/download.svg" max-width="24"/>
              </v-btn>
            </template>
            <span>Download</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>

    <v-dialog max-width="600" v-model="newDialog">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between mb-6">
          <div class="title text-capitalize">{{ $t('orderBox.contractBox.addContract') }}</div>
          <v-btn icon color="#544B99" @click="newDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="new_validate" lazy-validation>
            <v-row>
              <v-col cols="6">
                <div class="label text-capitalize mb-2">{{ $t('orderBox.contractBox.contractNo') }}</div>
                <v-text-field
                  outlined
                  single-line
                  :placeholder=" $t('orderBox.contractBox.contractNo') "
                  v-model="newContarct.contractNumber"
                  color="#544B99"
                  dense
                  class="rounded-lg base"
                  height="44"
                  hide-details
                />
              </v-col>
              <v-col cols="6">
                <div class="label">{{ $t('orderBox.contractBox.contractDate') }}</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    v-model="newContarct.contractDate"
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
              <v-col cols="6">
                <div class="label">{{ $t('orderBox.contractBox.deadline') }}</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    v-model="newContarct.deadline"
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
              <v-col cols="6">
                <div class="label text-capitalize mb-2">{{ $t('orderBox.modelPrint.price') }}</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="newContarct.sum"
                    placeholder="0.00"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    validate-on-blur
                    dense
                    color="#544B99"
                  />
                  <v-select
                    :items="currency"
                    v-model="newContarct.sumCurrency"
                    style="max-width: 100px"
                    dense
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    validate-on-blur
                    append-icon="mdi-chevron-down"
                    color="#544B99"
                  />
                </div>
              </v-col>
              <v-col cols="6">
                <div class="label text-capitalize mb-2">{{ $t('orderBox.contractBox.deliveryCondition') }}</div>
                <v-select
                  outlined
                  :items="conditionList"
                  v-model="newContarct.condition"
                  single-line
                  :placeholder="$t('orderBox.contractBox.deliveryCondition')"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#544B99"
                  class="rounded-lg base"
                  height="44"
                  hide-details
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
                      style="background-color: #f1ebfe; color: #544b99"
                      :disabled="docList.length !== 0"
                      class="font-weight-bold mr-3 text-capitalize"
                    >
                      {{ $t("partners.dialog.uploadFiles") }}
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <div v-for="(item, idx) in docList" :key="`imade_${idx}`">
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
                      <v-divider />
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center mt-8">
          <v-btn
            class="rounded-lg font-weight-bold"
            color="#544B99"
            width="130"
            outlined
            height="44"
            style="border-width: 2px"
            @click="newDialog = false"
            >{{ $t('orderBox.colorSize.cencel') }}
          </v-btn>
          <v-btn
            class="rounded-lg white--text ml-6"
            color="#544B99"
            width="130"
            height="44"
            @click="save"
            >{{ $t('orderBox.contractBox.save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog max-width="600" v-model="edit_dialog">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between mb-6">
          <div class="title text-capitalize">add contract</div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="new_validate" lazy-validation>
            <v-row>
              <v-col cols="6">
                <div class="label text-capitalize mb-2">Contract/SA No.</div>
                <v-text-field
                  outlined
                  single-line
                  placeholder="Contract/SA No"
                  v-model="selectItem.contractNumber"
                  color="#544B99"
                  dense
                  class="rounded-lg base"
                  height="44"
                  hide-details
                />
              </v-col>
              <v-col cols="6">
                <div class="label">Date of contract</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    v-model="selectItem.contractDate"
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
              <v-col cols="6">
                <div class="label">Deadline of contract</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    v-model="selectItem.deadline"
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
              <v-col cols="6">
                <div class="label text-capitalize mb-2">price</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="selectItem.sum"
                    placeholder="0.00"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    validate-on-blur
                    dense
                    color="#544B99"
                  />
                  <v-select
                    :items="currency"
                    v-model="selectItem.sumCurrency"
                    style="max-width: 100px"
                    dense
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    validate-on-blur
                    append-icon="mdi-chevron-down"
                    color="#544B99"
                  />
                </div>
              </v-col>
              <v-col cols="6">
                <div class="label text-capitalize mb-2">Delivery condition</div>
                <v-select
                  outlined
                  :items="conditionList"
                  v-model="selectItem.condition"
                  single-line
                  placeholder="Delivery condition"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#544B99"
                  class="rounded-lg base"
                  height="44"
                  hide-details
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
                      style="background-color: #f1ebfe; color: #544b99"
                      :disabled="docList.length !== 0"
                      class="font-weight-bold mr-3 text-capitalize"
                    >
                      {{ $t("partners.dialog.uploadFiles") }}
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <div v-for="(item, idx) in docList" :key="`imade_${idx}`">
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
                      <v-divider />
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center mt-8">
          <v-btn
            class="rounded-lg font-weight-bold"
            color="#544B99"
            width="130"
            outlined
            height="44"
            style="border-width: 2px"
            @click="edit_dialog = false"
            >cancel
          </v-btn>
          <v-btn
            class="rounded-lg white--text ml-6"
            color="#544B99"
            width="130"
            height="44"
            @click="save"
            >save
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
          >Delete contract
        </v-card-title>
        <v-card-text>
          Are you sure you want to Delete contract?
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
            @click="deleteFunc"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      newDialog: false,
      edit_dialog:false,
      delete_dialog:false,
      currency: ["USD", "RUB", "UZS"],
      conditionList: ["CIF", "CIP", "CPT", "EXW", "FCA", "FOB"],
      headers: [
        { text: this.$t('orderBox.contractBox.contractNo'), sortable: false, align: "center", value: "contractNumber" },
        { text: "Partner name", sortable: false, align: "center", value: "partnerName" },
        { text: this.$t('orderBox.contractBox.contractDate'), sortable: false, align: "center", value: "contractDate" },
        { text:this.$t('orderBox.contractBox.deadline'), sortable: false, align: "center", value: "contractDeadline" },
        { text: this.$t('orderBox.contractBox.sumOfContract'), sortable: false, align: "center", value: "contractAmount" },
        { text: "Delivery terms", sortable: false, align: "center", value: "deliveryTerms" },
        { text: this.$t("catalogGroups.tabs.table.actions"), sortable: false, align: "center", value: "actions" },
      ],
      items: [],
      newContarct: {
        contractNumber: "",
        contractDate: "",
        deadline: "",
        sum: "",
        sumCurrency: "",
        condition: "",
      },
      docList: [],
      selectItem:{},
    };
  },

  computed:{
    ...mapGetters({
      contractList:"orderContract/contractList",
      contractByModelList:"partners/contractByModelList",
    })
  },

  watch:{
    contractList(val){
      this.items=JSON.parse(JSON.stringify(val))
    }
  },

  methods: {
    ...mapActions({
      createContract: "orderContract/createContract",
      getContractList: "orderContract/getContractList",
      deleteContract: "orderContract/deleteContract",
      getOneContract: "orderContract/getOneContract",
      getContractsByModel: "partners/getContractsByModel",
    }),

    onChangeFile(e) {
      const file = e.target.files[0];
      this.docList.push(file);
    },
    clickImportFile() {
      this.$refs.uploader.click();
    },
    removeImage(e) {
      this.docList = this.docList.filter((item) => item.size !== e);
    },

    save(){
      const {
        contractNumber,
        contractDate,
        deadline,
        sum,
        sumCurrency,
        condition,
      }=this.newContarct
      const orderId=this.$route.params.id
      const file=this.docList[0]
      const formData =new FormData()
      formData.append("contractNumber",contractNumber)
      formData.append("contractDate",contractDate)
      formData.append("deadline",deadline)
      formData.append("sum",sum)
      formData.append("sumCurrency",sumCurrency)
      formData.append("condition",condition)
      formData.append("orderId",orderId)
      if(!!file){
        formData.append("file",file)
      }
      this.createContract({data:formData,orderId})
      this.newDialog=false
    },

    openEditDialog(item) {
      this.edit_dialog=true
      this.selectItem={...item}
      this.getOneContract(item.id)
    },



    currentPrint(item) {
      this.delete_dialog=true
      this.selectItem={...item}
    },

    deleteFunc(){
      const orderId=this.$route.params.id
      this.deleteContract({id:this.selectItem.id,orderId})
      this.delete_dialog=false
    }
  },

  mounted(){
    const id = this.$route.params.id
    if(id!=="add-order"){
      const modelId = this.$route.query.modelId;
      this.getContractsByModel(modelId)
    }
  }
};
</script>
<style lang="">
</style>
