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
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize"
            color="#544B99"
            width="160" height="36"
            @click="newDialog = true"
            dark
          >
            Add print
          </v-btn>
        </v-toolbar-title>
      </v-toolbar>
    </template>
    <template #item.printPhoto="{item}">
     <div class="d-flex ">
      <v-img
        :src="el.filePath"
        class="mr-2"
        v-for="(el,idx) in item.images"
        :key="idx"
        width="40"
        height="40"
        @click="showImage(el.filePath)"
      />
     </div>
    </template>
    <template #item.actions="{item}">
      <div>
        <v-btn icon @click="openEditDialog(item)" >
          <v-img src="/edit-green.svg" max-width="20"/>
        </v-btn>
        <v-btn icon @click="currentPrint(item)">
          <v-img src="/delete.svg" max-width="24"/>
        </v-btn>
      </div>
    </template>
    </v-data-table>
    <v-dialog max-width="1000" v-model="newDialog">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between mb-6">
          <div class="title text-capitalize">add model print</div>
          <v-btn icon color="#544B99" @click="newDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="new_validate" lazy-validation>
            <v-row>
              <v-col cols="6">
                <div class="label text-capitalize mb-2"> Main color</div>
                <v-select
                  outlined
                  :items="mainColorsList"
                  v-model="newPrints.modelPartColorId"
                  single-line
                  placeholder="Main color"
                  item-value="id"
                  item-text="color"
                  dense append-icon="mdi-chevron-down"
                  color="#544B99"
                  class="rounded-lg base"
                  height="44"
                  hide-details
                />
              </v-col>
              <v-col cols="6">
                <div class="label text-capitalize mb-2"> print type</div>
                <v-select
                  outlined
                  :items="printTypeEnums"
                  v-model="newPrints.printTypeId"
                  single-line
                  placeholder="Print Type"
                  item-value="id"
                  item-text="name"
                  dense append-icon="mdi-chevron-down"
                  color="#544B99"
                  class="rounded-lg base"
                  height="44"
                  hide-details
                />
              </v-col>
              <v-col cols="6">
                <div class="label text-capitalize mb-2"> Color quantity</div>
                <v-text-field
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
              </v-col>
              <v-col cols="6">
                <div class="label text-capitalize mb-2"> partner name</div>
                <v-select
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
              </v-col>
              <v-col cols="6">
                <div class="label text-capitalize mb-2"> price</div>
                <div class="d-flex align-center">
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
              </v-col>
              <v-col cols="12">
                <div class="label text-capitalize mb-2">description</div>
                <v-textarea
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
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="4">
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
              <v-col cols="12" lg="4" v-if="!!files[0].file">
                <div class="big__image overflow-hidden relative " >
                  <input
                    ref="uploaderSecond"
                    class="d-none"
                    type="file"
                    @change="(e)=>secondFileChanged(e)"
                    accept="image/*"
                  />

                  <div class="update__icon" v-if="!!files[1].file">
                    <v-btn color="green" icon @click="getFile('second')">
                      <v-img src="/upload-green.svg" max-width="22"/>
                    </v-btn>
                    <v-btn color="green" icon @click="deleteFile('second')">
                      <v-img src="/trash-red.svg" max-width="22"/>
                    </v-btn>
                  </div>

                  <v-img
                    :src="images[1].photo"
                    lazy-src="/model-image.jpg"
                    v-if="!!files[1].file" width="100%"
                    @click="showImage(images[1].photo)"
                  />

                  <div class="default__box" v-else>
                    <v-img src="/default-image.svg" width="70"/>
                    <v-btn text color="#5570F1" class="rounded-lg mt-6 my-4" @click="getFile('second')">
                      <v-img src="/upload.svg" class="mr-2"/>
                      <div class="text-capitalize upload-text">Upload Image</div>
                    </v-btn>
                    <div class="default__text">
                      <p>Upload a cover image for your product.</p>
                    </div>
                  </div>

                </div>
              </v-col>
              <v-col cols="12" lg="4" v-if="!!files[1].file">
                <div class="big__image overflow-hidden relative " >
                  <input
                    ref="uploaderThird"
                    class="d-none"
                    type="file"
                    @change="(e)=>thirdFileChanged(e)"
                    accept="image/*"
                  />

                  <div class="update__icon" v-if="!!files[2].file">
                    <v-btn color="green" icon @click="getFile('second')">
                      <v-img src="/upload-green.svg" max-width="22"/>
                    </v-btn>
                    <v-btn color="green" icon @click="deleteFile('third')">
                      <v-img src="/trash-red.svg" max-width="22"/>
                    </v-btn>
                  </div>

                  <v-img
                    :src="images[2].photo"
                    lazy-src="/model-image.jpg"
                    v-if="!!files[2].file" width="100%"
                    @click="showImage(images[2].photo)"
                  />

                  <div class="default__box" v-else>
                    <v-img src="/default-image.svg" width="70"/>
                    <v-btn text color="#5570F1" class="rounded-lg mt-6 my-4" @click="getFile('third')">
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
        <v-card-actions class="d-flex justify-center mt-8">
          <v-btn
              class="rounded-lg font-weight-bold"
              color="#544B99"
              width="130"
              outlined
              height="44"
              style="border-width: 2px"
              @click="newDialog=false"
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

    <v-dialog max-width="1000" v-model="editDialog">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between mb-6">
          <div class="title text-capitalize">edit model print</div>
          <v-btn icon color="#544B99" @click="editDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="new_validate" lazy-validation>
            <v-row>
              <v-col cols="6">
                <div class="label text-capitalize mb-2"> Main color</div>
                <v-select
                  outlined
                  :items="mainColorsList"
                  v-model="selectedItem.modelPartColorId"
                  single-line
                  placeholder="Main color"
                  item-value="id"
                  item-text="color"
                  dense append-icon="mdi-chevron-down"
                  color="#544B99"
                  class="rounded-lg base"
                  height="44"
                  hide-details
                />
              </v-col>
              <v-col cols="6">
                <div class="label text-capitalize mb-2"> print type</div>
                <v-select
                  outlined
                  :items="printTypeEnums"
                  v-model="selectedItem.printTypeId"
                  single-line
                  placeholder="Print Type"
                  item-value="id"
                  item-text="name"
                  dense append-icon="mdi-chevron-down"
                  color="#544B99"
                  class="rounded-lg base"
                  height="44"
                  hide-details
                />
              </v-col>
              <v-col cols="6">
                <div class="label text-capitalize mb-2"> Color quantity</div>
                <v-text-field
                  outlined
                  single-line
                  placeholder="Color quantity"
                  v-model="selectedItem.colorQuantity"
                  color="#544B99"
                  dense
                  class="rounded-lg base"
                  height="44"
                  hide-details
                />
              </v-col>
              <v-col cols="6">
                <div class="label text-capitalize mb-2"> partner name</div>
                <v-select
                  outlined
                  :items="partnerEnums"
                  single-line
                  placeholder="Partner name"
                  item-value="id"
                  item-text="name"
                  v-model="selectedItem.partnerId"
                  dense append-icon="mdi-chevron-down"
                  color="#544B99"
                  class="rounded-lg base"
                  height="44"
                  hide-details
                />
              </v-col>
              <v-col cols="6">
                <div class="label text-capitalize mb-2"> price</div>
                <div class="d-flex align-center">
                  <v-text-field

                    v-model="selectedItem.price"
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
                    v-model="selectedItem.currency"
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
              <v-col cols="12">
                <div class="label text-capitalize mb-2">description</div>
                <v-textarea
                  v-model="selectedItem.description"
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
              <v-col cols="12" lg="4" v-if="!!files[0].file">
                <div class="big__image overflow-hidden relative " >
                  <input
                    ref="uploaderSecond"
                    class="d-none"
                    type="file"
                    @change="(e)=>secondFileChanged(e)"
                    accept="image/*"
                  />

                  <div class="update__icon" v-if="!!files[1].file">
                    <v-btn color="green" icon @click="getFile('second')">
                      <v-img src="/upload-green.svg" max-width="22"/>
                    </v-btn>
                    <v-btn color="green" icon @click="deleteFile('second')">
                      <v-img src="/trash-red.svg" max-width="22"/>
                    </v-btn>
                  </div>

                  <v-img
                    :src="images[1].photo"
                    lazy-src="/model-image.jpg"
                    v-if="!!files[1].file" width="100%"
                    @click="showImage(images[1].photo)"
                  />

                  <div class="default__box" v-else>
                    <v-img src="/default-image.svg" width="70"/>
                    <v-btn text color="#5570F1" class="rounded-lg mt-6 my-4" @click="getFile('second')">
                      <v-img src="/upload.svg" class="mr-2"/>
                      <div class="text-capitalize upload-text">Upload Image</div>
                    </v-btn>
                    <div class="default__text">
                      <p>Upload a cover image for your product.</p>
                    </div>
                  </div>

                </div>
              </v-col>
              <v-col cols="12" lg="4" v-if="!!files[1].file">
                <div class="big__image overflow-hidden relative " >
                  <input
                    ref="uploaderThird"
                    class="d-none"
                    type="file"
                    @change="(e)=>thirdFileChanged(e)"
                    accept="image/*"
                  />

                  <div class="update__icon" v-if="!!files[2].file">
                    <v-btn color="green" icon @click="getFile('second')">
                      <v-img src="/upload-green.svg" max-width="22"/>
                    </v-btn>
                    <v-btn color="green" icon @click="deleteFile('third')">
                      <v-img src="/trash-red.svg" max-width="22"/>
                    </v-btn>
                  </div>

                  <v-img
                    :src="images[2].photo"
                    lazy-src="/model-image.jpg"
                    v-if="!!files[2].file" width="100%"
                    @click="showImage(images[2].photo)"
                  />

                  <div class="default__box" v-else>
                    <v-img src="/default-image.svg" width="70"/>
                    <v-btn text color="#5570F1" class="rounded-lg mt-6 my-4" @click="getFile('third')">
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
        <v-card-actions class="d-flex justify-center mt-8">
          <v-btn
              class="rounded-lg font-weight-bold"
              color="#544B99"
              width="130"
              outlined
              height="44"
              style="border-width: 2px"
              @click="editDialog=false"
            >cancel
            </v-btn>
            <v-btn
              class="rounded-lg white--text ml-6"
              color="#544B99"
              width="130"
              height="44"
              @click="updatePrint"
            >save
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
  data(){
    return{
      headers:[
        {text: 'Main color', sortable: false, align: 'center', value: 'color', },
        {text: 'Print photo', sortable: false, align: 'center', value: 'printPhoto', },
        {text: 'Print type', sortable: false, align: 'center', value: 'printType', },
        {text: 'Color quantity', sortable: false, align: 'center', value: 'colorQuantity', },
        {text: 'Price per design', sortable: false, align: 'center', value: 'price', },
        {text: 'Quantity', sortable: false, align: 'center', value: 'quantity', },
        {text: 'Total amount', sortable: false, align: 'center', value: 'totalAmount', },
        {text: 'Partner', sortable: false, align: 'center', value: 'partner', },
        {text: 'Description', sortable: false, align: 'center', value: 'description', },
        {text: 'Creator', sortable: false, align: 'center', value: 'createdBy', },
        {text: 'Created at', sortable: false, align: 'center', value: 'createdAt', },
        {text: 'Actions', sortable: false, align: 'center', value: 'actions',width:"150" }
      ],
      currency:["USD","RUB","UZS"],
      items:[],
      delete_dialog:false,
      newDialog:false,
      editDialog:false,
      newPrints:{
        printTypeId:"",
        colorQuantity:"",
        partnerId:"",
        currency:"USD",
        price:null,
        description:"",
        files:[
          {file:null},
          {file:null},
          {file:null},
          {file:null},
        ],
        modelPartColorId:"",
      },
      images:[
        {photo:""},
        {photo:""},
        {photo:""},
        {photo:""},
      ],
      currentImage:"",
      image_dialog:false,
      selectedItem:{},
      files:[
        {file:null,id:null},
        {file:null,id:null},
        {file:null,id:null},
        {file:null,id:null},
      ],

      fileRequests:[
        {file:null,id:null},
        {file:null,id:null},
        {file:null,id:null},
        {file:null,id:null},
      ]

    }
  },
  computed:{
    ...mapGetters({
      printTypeEnums: "printing/printTypeEnums",
      partnerEnums: "models/partner_enums",
      mainColorsList: "orderModelPrint/mainColorsList",
      modelPrintList: "orderModelPrint/modelPrintList",
    })
  },

  watch:{
    modelPrintList(val){
      this.items=JSON.parse(JSON.stringify(val))

    },
    selectedItem(link) {
      this.images.forEach((el, idx) => {
        this.files[idx].file = link.images[idx]?.filePath
        this.files[idx].id=link.images[idx]?.id
        el.photo = link.images[idx]?.filePath;
      })
    },
    editDialog(val){
    //   if(!val){
    //     for (let file = 0; file <= 3; file++) {
    //       if (this.files[file].file) {
    //         this.files[file].file=""
    //         // this.files[file]?.id="";
    //       }
    //     }
    //   }
    }
  },

  created(){
    this.getPartnerList()
  },

  methods:{
    ...mapActions({
      getPrintType: "printing/getPrintType",
      getPartnerList: "models/getPartnerList",
      getMainColorsList:"orderModelPrint/getMainColorsList",
      createModelPrint:"orderModelPrint/createModelPrint",
      getModelPrintList:"orderModelPrint/getModelPrintList",
      getOneModelPrint:"orderModelPrint/getOneModelPrint",
      deleteModelPrint:"orderModelPrint/deleteModelPrint",
      updateModelPrint:"orderModelPrint/updateModelPrint",

    }),
    firstFileChanged(e) {
      this.files[0].file = e.target.files[0];
      this.images[0].photo = URL.createObjectURL(this.files[0].file);
      if(!!this.files[0].id){
        this.fileRequests[0].file=e.target.files[0]
        this.fileRequests[0].id=this.files[0].id
      }
    },
    secondFileChanged(e) {
      this.files[1].file = e.target.files[0];
      this.images[1].photo = URL.createObjectURL(this.files[1].file);
      if(!!this.files[1].id){
        this.fileRequests[1].file=e.target.files[0]
        this.fileRequests[1].id=this.files[1].id
      }
    },
    thirdFileChanged(e) {
      this.files[2].file = e.target.files[0];
      this.images[2].photo = URL.createObjectURL(this.files[2].file);
      if(!!this.files[2].id){
        this.fileRequests[2].file=e.target.files[0]
        this.fileRequests[2].id=this.files[2].id
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

    async save(){
      const {
        printTypeId,
        colorQuantity,
        partnerId,
        currency,
        price,
        description,
        modelPartColorId,
      }=this.newPrints
      const files=[...this.files]
      const modelId=this.$route.query.modelId
      const formData = new FormData()
      formData.append("modelPartColorId",modelPartColorId)
      formData.append("modelId",modelId)
      formData.append("colorQuantity",colorQuantity)
      formData.append("partnerId",partnerId)
      formData.append("currency",currency)
      formData.append("price",price)
      formData.append("description",description)
      for (let file = 0; file <= 3; file++) {
        if (files[file].file) {
          formData.append('files', files[file].file)
          files[file].file=""
        }
      }
      formData.append("printTypeId",printTypeId)

      await this.createModelPrint({data:formData,modelId})
      this.newDialog=false
      this.$refs.new_validate.reset()
    },

    openEditDialog(item){
      this.editDialog=true
      this.selectedItem={...item}
      this.getOneModelPrint(item.id)
    },
    closeEditDialog(){
      this.editDialog=false

    },


    currentPrint(item){
      this.selectedItem={...item}
      this.delete_dialog=true
    },

    deletePrinting(){
      const modelId=this.$route.query.modelId
      this.deleteModelPrint({id:this.selectedItem.id,modelId})
      this.delete_dialog=false

    },

    updatePrint(){
      const {
        printTypeId,
        colorQuantity,
        partnerId,
        currency,
        price,
        id,
        description,
        modelPartColorId,
        images
      }=this.selectedItem
      const fileRequests=[...this.fileRequests]
      const files=[...this.files]
      let idx=0
      const modelId=this.$route.query.modelId
      const formData = new FormData()
      formData.append("modelPartColorId",modelPartColorId)
      formData.append("modelId",modelId)
      formData.append("colorQuantity",colorQuantity)
      formData.append("partnerId",partnerId)
      formData.append("currency",currency)
      formData.append("price",price)
      formData.append("description",description)
      formData.append("id",id)
      for (let file = 0; file <= 3; file++) {
        if (!files[file]?.id && !!files[file]?.file) {
          formData.append('files', files[file].file)
        }
      }
      for (let file = 0; file <= 3; file++) {
        if(typeof fileRequests[file].file!=='string'){
          if (fileRequests[file].file) {
            formData.append(`fileRequests[${idx}].file`, fileRequests[file].file)
            formData.append(`fileRequests[${idx}].id`, fileRequests[file].id)
            fileRequests[file].file=""
            fileRequests[file].id=""
            idx++
          }
        }
      }
      formData.append("printTypeId",printTypeId)

      this.updateModelPrint({data:formData,modelId})
      this.editDialog=false
    }



  },

  mounted(){
    const id=this.$route.query.modelId
    this.getPrintType({page: 0, size: 100})
    this.getMainColorsList(id)
    this.getModelPrintList(id)
  }
}
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
  height: 413px;
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
