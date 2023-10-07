<template >
  <div>
    <v-data-table 
      item-key="calculation" 
      :headers="headers" 
      :items="items"
      >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex">
            <div class="title">Model prints</div>
            <v-spacer />
            <v-btn
              class="rounded-lg text-capitalize"
              color="#7631FF"
              width="160"
              height="36"
              @click="newDialog = true"
              dark
            >
              Add print
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.actions="{ item }">
        <div>
          <v-btn icon @click="openEditDialog(item)">
            <v-img src="/edit-green.svg" max-width="20" />
          </v-btn>
          <v-btn icon @click="currentPrint(item)">
            <v-img src="/delete.svg" max-width="24" />
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog max-width="600" v-model="newDialog">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between mb-6">
          <div class="title text-capitalize">add model print</div>
          <v-btn icon color="#7631FF" @click="newDialog = false">
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
                  v-model="newContarct.contractNumber"
                  color="#7631FF"
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
                <div class="label">Deadline of contract</div>
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
                <div class="label text-capitalize mb-2">price</div>
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
                    color="#7631FF"
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
                    color="#7631FF"
                  />
                </div>
              </v-col>
              <v-col cols="6">
                <div class="label text-capitalize mb-2">Delivery condition</div>
                <v-select
                  outlined
                  :items="conditionList"
                  v-model="newContarct.condition"
                  single-line
                  placeholder="Delivery condition"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
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
                      style="background-color: #f1ebfe; color: #7631ff"
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
            color="#7631FF"
            width="130"
            outlined
            height="44"
            style="border-width: 2px"
            @click="newDialog = false"
            >cancel
          </v-btn>
          <v-btn
            class="rounded-lg white--text ml-6"
            color="#7631FF"
            width="130"
            height="44"
            @click="save"
            >save
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
      currency: ["USD", "RUB", "UZS"],
      conditionList: ["CIF", "CIP", "CPT", "EXW", "FCA", "FOB"],
      headers: [
        {
          text: "Client name",
          sortable: false,
          align: "center",
          value: "client",
        },
        { text: "Contract/SA No.", sortable: false, align: "center", value: "contract" },
        { text: "Contract/SA date", sortable: false, align: "center", value: "contractDate" },
        { text: "Deadline", sortable: false, align: "center", value: "deadline" },
        { text: "Sum of Contract", sortable: false, align: "center", value: "contract" },
        { text: "Client country", sortable: false, align: "center", value: "contract" },
        { text: "Delivery condition", sortable: false, align: "center", value: "contract" },
        { text: "Actions", sortable: false, align: "center", value: "actions" },
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
    };
  },

  computed:{
    ...mapGetters({
      contractList:"orderContract/contractList",
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
    },

    openEditDialog(item) {},
    currentPrint(item) {},
  },

  mounted(){
    const id = this.$route.params.id
    this.getContractList(id)
  }
};
</script>
<style lang="">
</style>