<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="allPrintList"
      :items-per-page="10"
      hide-default-footer
      class="elevation-0"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex">
            {{ $t("modelBox.printingBox.printing") }}
            <v-spacer/>
            <v-btn
              class="text-capitalize rounded-lg"
              color="#544B99"
              @click="openDialog"
              :disabled="checkModelId"
              :dark="!checkModelId"
            >
              <v-icon class="mr-1">mdi-plus</v-icon>
              printing
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.photo="{item}">
        <img
          :src="item.filePath"
          width="40"
          height="40"
          alt="print photo"
          @click="showImage(item.filePath)"
        >
      </template>
      <template #item.actions="{item}">
        <v-btn icon @click="openEditDialog(item)" :disabled="checkModelId">
          <v-img src="/edit-green.svg" max-width="20"/>
        </v-btn>
        <v-btn icon @click="currentPrint(item)">
          <v-img src="/delete.svg" max-width="24"/>
        </v-btn>
      </template>
    </v-data-table>
    <v-divider/>
    <v-dialog v-model="printing_dialog" max-width="1000">
      <v-card>
        <v-card-title>
          <div>{{ dialogTitle }} printing</div>
          <v-spacer/>
          <v-btn icon color="amber" @click="printing_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form lazy-validation v-model="printingValid" ref="new_printing">
            <v-row>
              <v-col cols="12" lg="4">
                <div class="label text-capitalize mb-2"> print type</div>
                <v-select
                  v-if="dialogTitle!=='Edit'"
                  outlined
                  :items="printTypeEnums"
                  single-line
                  placeholder="Print Type"
                  item-value="id"
                  item-text="name"
                  v-model="newPrints.printTypeId"
                  dense append-icon="mdi-chevron-down"
                  color="#544B99"
                  class="rounded-lg base"
                  height="44"
                  hide-details
                />
                <v-select
                  v-else
                  outlined
                  :items="printTypeEnums"
                  single-line
                  placeholder="Print Type"
                  item-value="id"
                  item-text="name"
                  v-model="edit.printTypeId"
                  dense append-icon="mdi-chevron-down"
                  color="#544B99"
                  class="rounded-lg base"
                  height="44"
                  hide-details
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="label text-capitalize mb-2"> color quantity</div>
                <v-text-field
                  v-if="dialogTitle!=='Edit'"
                  outlined
                  single-line
                  placeholder="Color quantity"
                  v-model="newPrints.colorQuantity"
                  color="#544B99"
                  dense
                  class="rounded-lg base"
                  height="44"
                  hide-details
                />
                <v-text-field
                  v-else
                  outlined
                  single-line
                  placeholder="Color quantity"
                  v-model="edit.colorQuantity"
                  color="#544B99"
                  dense
                  class="rounded-lg base"
                  height="44"
                  hide-details
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="label text-capitalize mb-2"> partner name</div>
                <v-select
                  v-if="dialogTitle!=='Edit'"
                  outlined
                  :items="partnerEnums"
                  single-line
                  placeholder="Partner name"
                  item-value="id"
                  item-text="name"
                  v-model="newPrints.partnerId"
                  dense append-icon="mdi-chevron-down"
                  color="#544B99"
                  class="rounded-lg base"
                  height="44"
                  hide-details
                />
                <v-select
                  v-else
                  outlined
                  :items="partnerEnums"
                  single-line
                  placeholder="Partner name"
                  item-value="id"
                  item-text="name"
                  v-model="edit.partnerId"
                  dense append-icon="mdi-chevron-down"
                  color="#544B99"
                  class="rounded-lg base"
                  height="44"
                  hide-details
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="label text-capitalize mb-2"> price</div>
                <div
                  class="d-flex align-center"
                  v-if="dialogTitle!=='Edit'"
                >
                  <v-text-field

                    v-model="newPrints.price"
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
                    v-model="newPrints.currency"
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
                <div
                  class="d-flex align-center"
                  v-else
                >
                  <v-text-field

                    v-model="edit.price"
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
                    v-model="edit.currency"
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
              <v-col cols="12" lg="4">
                <div class="label text-capitalize mb-2"> simple send date</div>
                <el-date-picker
                  v-if="dialogTitle!=='Edit'"
                  v-model="newPrints.sendDate"
                  type="datetime"
                  placeholder="Send date"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                  class="base_picker"
                  style="width: 100%; color: #544B99; height: 44px"
                >
                </el-date-picker>
                <el-date-picker
                  v-else
                  v-model="edit.sendDate"
                  type="datetime"
                  placeholder="Send date"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                  class="base_picker"
                  style="width: 100%; color: #544B99; height: 44px"
                >
                </el-date-picker>
              </v-col>
              <v-col cols="12" lg="4">
                <div class="label text-capitalize mb-2">description</div>
                <v-textarea
                  v-if="dialogTitle!=='Edit'"
                  v-model="newPrints.description"
                  placeholder="Enter description"
                  rows="1"
                  outlined
                  single-line
                  color="#544B99"
                  dense
                  class="rounded-lg base"
                  hide-details
                />
                <v-textarea
                  v-else
                  v-model="edit.description"
                  placeholder="Enter description"
                  rows="1"
                  outlined
                  single-line
                  color="#544B99"
                  dense
                  class="rounded-lg base"
                  hide-details
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" lg="4">
                <div class="label">Photos of models</div>
                <div class="big__image overflow-hidden relative " v-if="dialogTitle!=='Edit'">
                  <input
                    ref="uploaderFirst"
                    class="d-none"
                    type="file"
                    @change="(e)=>firstFileChanged(e)"
                    accept="image/*"
                  />

                  <div class="update__icon" v-if="!!newPrints.filePath">
                    <v-btn color="green" icon @click="getFile('first')">
                      <v-img src="/upload-green.svg" max-width="22"/>
                    </v-btn>
                    <v-btn color="green" icon @click="deleteFile('first')">
                      <v-img src="/trash-red.svg" max-width="22"/>
                    </v-btn>
                  </div>

                  <v-img
                    :src="dialogTitle==='Edit'?edit.filePath:image"
                    lazy-src="/model-image.jpg"
                    v-if="!!newPrints.filePath" width="100%"
                    @click="showImage(newPrints.filePath)"
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
                <div class="big__image overflow-hidden relative " v-else>
                  <input
                    ref="uploaderFirst"
                    class="d-none"
                    type="file"
                    @change="(e)=>firstFileEdit(e)"
                    accept="image/*"
                  />

                  <div class="update__icon" v-if="!!edit.filePath">
                    <v-btn color="green" icon @click="getFile('first')">
                      <v-img src="/upload-green.svg" max-width="22"/>
                    </v-btn>
                    <v-btn color="green" icon @click="deleteFileEdit('first')">
                      <v-img src="/trash-red.svg" max-width="22"/>
                    </v-btn>
                  </div>

                  <v-img
                    :src="edit.filePath"
                    lazy-src="/model-image.jpg"
                    v-if="!!edit.filePath" width="100%"
                    @click="showImage(edit.filePath)"
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
        <v-card-actions class="d-flex justify-center pb-4">
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg border"
            outlined color="#544B99"
            width="140" height="40"
            @click="printing_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            v-if="dialogTitle === 'Edit'"
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#544B99" dark
            width="140" height="40"
            @click="upgradePrints"
          >
            {{ $t('update') }}
          </v-btn>
          <v-btn
            v-else
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#544B99" dark
            width="140" height="40"
            @click="createNewPrints"
          >
            add
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
        <v-img :src="currentImage" height="500" contain/>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete this printing row</v-card-title>
        <v-card-text>
          Are you sure you want to Delete model printing ?
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
            dark @click="deletePrinting"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "PrintingComponent",
  data() {
    return {
      delete_dialog: false,
      printingValid: true,
      printing_dialog: false,
      image_dialog:false,
      currentImage:null,
      print_types: ['Material', 'test', 'test 2'],
      currency: ['USD', 'RUB', 'UZS'],
      headers: [
        {text:  this.$t('modelBox.printingBox.photoModel'), align: 'start', sortable: false, value: 'photo', width: 180},
        {text:  this.$t('modelBox.printingBox.printType'), align: 'start', sortable: false, value: 'printType', width: 180},
        {text:  this.$t('modelBox.printingBox.colorQuality'), sortable: false, value: 'colorQuantity'},
        {text:  this.$t('modelBox.printingBox.printPartnerName'), sortable: false, value: 'partner'},
        {text:  this.$t('modelBox.printingBox.price'), sortable: false, value: 'price'},
        {text:  this.$t('modelBox.printingBox.currency'), sortable: false, value: 'currency', width: 100},
        {text:  this.$t('modelBox.printingBox.simpleSendDate'), sortable: false, value: 'sendDate'},
        {text:  this.$t('modelBox.modelPartsBox.comment'), sortable: false, value: 'description'},
        {text:  this.$t('modelBox.modelPartsBox.creator'), sortable: false, value: 'createdBy'},
        {text:  this.$t('modelBox.measurementListBox.date'), sortable: false, value: 'updatedAt'},
        {text:  this.$t("catalogGroups.tabs.table.actions"), sortable: false, value: 'actions'},
      ],
      dialogTitle: '',
      newPrints: {
        colorQuantity: null,
        currency: "USD",
        description: "",
        modelId: null,
        partnerId: null,
        price: "",
        printTypeId: 0,
        sendDate: "",
        filePath:null,
      },
      edit:{},
      current_printing: null,
      image:null,
      allPrintList:[],
    }
  },
  computed: {
    ...mapGetters({
      printingList: 'printing/printingList',
      printOne: 'printing/printOne',
      printTypeEnums: 'printing/printTypeEnums',
      partnerEnums: 'models/partner_enums',
      newModelId: "models/newModelId"
    }),
    checkModelId() {
      const param = this.$route.params.id;
      if (param === 'add-model') {
        const id = this.$store.getters['models/newModelId']
        return id === null
      } else return false
    }
  },
  watch: {
    printing_dialog(val) {
      if (!val) this.$refs.new_printing.reset();
    },
    printOne(value){
      this.allPrintList=JSON.parse(JSON.stringify(value))
    }
  },
  methods: {
    ...mapActions({
      getPrintingList: "printing/getPrintingList",
      getPrintOne: "printing/getPrintOne",
      getPrintType: "printType/getPrintType",
      getPartnerList: "models/getPartnerList",
      createPrints: "printing/createPrints",
      updatePrints: "printing/updatePrints",
      deleteOnePrinting: "printing/deleteOnePrinting",
    }),

    currentPrint(item) {
      this.delete_dialog = true;
      this.current_printing = {...item};
    },
    async deletePrinting() {
      const param = this.$route.params.id;
      await this.deleteOnePrinting({
        printId: this.current_printing.id,
        modelId: param
      })
      this.delete_dialog = false
    },

    getFile(count) {
      this.$refs.uploaderFirst.click();
    },

    firstFileChanged(e) {
      this.newPrints.filePath = e.target.files[0];
      this.image = URL.createObjectURL(this.newPrints.filePath);
      },
    firstFileEdit(e) {
      this.edit.filePath = e.target.files[0];
      this.image = URL.createObjectURL(this.edit.filePath);
      },

    deleteFile(count) {
          this.newPrints.filePath = null;
    },
    deleteFileEdit(count) {
          this.newPrints.filePath = null;
    },
    showImage(photo) {
      this.currentImage = photo;
      this.image_dialog = true;
    },
    async createNewPrints() {
      let id = 0
      if(this.$route.params.id === 'add-model') {
        id = this.newModelId;
      } else {
        id = this.$route.params.id;
      }
      let {
        colorQuantity,
        currency,
        description,
        modelId,
        partnerId,
        price,
        printTypeId,
        sendDate,
        filePath,
      }=this.newPrints
      modelId=id
      const data=new FormData()
      data.append("colorQuantity",colorQuantity)
      data.append("currency",currency)
      data.append("description",description)
      data.append("modelId",modelId)
      data.append("partnerId",partnerId)
      data.append("price",price)
      data.append("printTypeId",printTypeId)
      data.append("sentDate",sendDate)
      data.append("file",filePath)
      await this.createPrints({data,modelId:id});
      this.printing_dialog = false;
      await this.$refs.new_printing.reset();
    },
    openDialog() {
      this.dialogTitle = 'Add new';
      this.printing_dialog = !this.printing_dialog;
    },
    openEditDialog(item) {
      this.dialogTitle = 'Edit';
      this.printing_dialog = !this.printing_dialog;
      this.edit = {...item};
    },
    async upgradePrints() {
      let {
        colorQuantity,
        currency,
        description,
        modelId,
        partnerId,
        price,
        id,
        printTypeId,
        sendDate,
        filePath,
      }=this.edit

      const data=new FormData()
      data.append("colorQuantity",colorQuantity)
      data.append("currency",currency)
      data.append("description",description)
      data.append("modelId",modelId)
      data.append("partnerId",partnerId)
      data.append("price",price)
      data.append("id",id)
      data.append("printTypeId",printTypeId)
      data.append("sentDate",sendDate)
      if(typeof filePath!=="string"){
        data.append("file",filePath)
      }
      await this.updatePrints({data,id:modelId});
      this.printing_dialog = false;
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id !== 'add-model') {
      await this.getPrintOne(id);
      await this.getPrintType({page: 0, size: 100})
    } else {
      await this.getPrintType({page: 0, size: 100})
      await this.$store.commit("printing/setPrintOne", []);
    }
  }
}
</script>

<style lang="scss" scoped>
.el-date-table__row {
  background-color: #fff !important;

  > td.current > div > span {
    background-color: #544B99 !important;
  }

  > td.today > div > span {
    color: #544B99 !important;
  }

  > td.today.current > div > span {
    color: #FFFFFF !important;
  }
}

.el-picker-panel__footer > button > span {
  color: #544B99 !important;
}

.el-input__inner {
  border-color: #A0A0A0 !important;
}

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
  height: 213px;
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
.printing-date > input.el-input__inner::placeholder {
  color: #CFCFCF !important;
}
</style>
