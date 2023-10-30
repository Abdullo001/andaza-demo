<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4 rounded-lg"
    >
      <template #top>
        <v-toolbar elevation="0" class="rounded-lg">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              Accessory planning chart
            </div>
            <v-btn
              color="#7631FF"
              class="rounded-lg white--text text-capitalize"
              @click="new_dialog = true"
              :disabled="checkId"
              :dark="!checkId"
            >
              <v-icon>mdi-plus</v-icon>
              Add Accessory
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider />
      </template>
      <template #item.accessoryPhoto="{item}">
        <v-img 
        :src="item?.filePath" 
        class="mr-2"
        width="40" 
        height="40" 
        @click="showImage(item.filePath)"
      />
      </template>
      <template #item.actions="{ item }">
        <div>
          <v-btn icon color="green" @click.stop="editItem(item)">
            <v-img src="/edit-active.svg" max-width="22" />
          </v-btn>
          <v-btn icon color="red" @click.stop="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27" />
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Add Accessory</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" lazy-validation v-model="validate">
            <v-row>
              <v-col cols="12" md="6">
                <div class="label">Name</div>
                <v-select
                  v-model="create_accessory_chart.accessoryId"
                  :items="nameData"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  item-text="name"
                  item-value="id"
                  placeholder="Select Name"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Specification</div>
                <v-select
                  v-model="create_accessory_chart.specification"
                  :items="specificationData"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Select Specification"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Price per unit</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="create_accessory_chart.accessoryPricePerUnit"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    placeholder="0.0"
                    dense
                    color="#7631FF"
                    :rules="[formRules.required]"
                  />
                  <v-select
                    :items="currency_enums"
                    style="max-width: 100px"
                    outlined
                    hide-details
                    height="44"
                    dense
                    v-model="create_accessory_chart.accessoryPricePerCurrency"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    append-icon="mdi-chevron-down"
                    color="#7631FF"
                    :rules="[formRules.required]"
                  />
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Quantity per unit</div>
                <v-text-field
                  v-model="create_accessory_chart.quantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter Quantity"
                  dense
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Measurement unit</div>
                <v-select
                  :items="nameData"
                  v-model="create_accessory_chart.accessoryId"
                  item-text="measurementUnit"
                  readonly
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Select Measurement unit"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Wastage</div>
                <v-text-field
                  v-model="create_accessory_chart.wastage"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter Wastage"
                  dense
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Production quantity</div>
                <v-text-field
                  v-model="create_accessory_chart.productionQuantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter production quantity"
                  dense
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">Description</div>
                <v-textarea
                  v-model="create_accessory_chart.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  placeholder="Enter Canvas type"
                  dense
                  color="#7631FF"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
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
            color="#7631FF"
            width="163"
            @click="new_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="create"
          >
            add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit Accessory</div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form">
            <v-row>
              <v-col cols="12" md="6">
                <div class="label">Name</div>
                <v-text-field
                  v-model="edit_accessory_chart.name"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  disabled
                  placeholder="Select Name"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Specification</div>
                <v-text-field
                  v-model="edit_accessory_chart.specification"
                  disabled
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Select Specification"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Price per unit</div>
                <div class="d-flex align-center">
                  <v-text-field
                    v-model="edit_accessory_chart.pricePerUnit"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    placeholder="0.0"
                    dense
                    color="#7631FF"
                    :rules="[formRules.required]"
                  />
                  <v-select
                    :items="currency_enums"
                    style="max-width: 100px"
                    outlined
                    hide-details
                    height="44"
                    dense
                    v-model="edit_accessory_chart.pricePerUnitCurrency"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    append-icon="mdi-chevron-down"
                    color="#7631FF"
                    :rules="[formRules.required]"
                  />
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Quantity</div>
                <v-text-field
                  v-model="edit_accessory_chart.quantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter Quantity"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Measurement unit</div>
                <v-select
                  :items="nameData"
                  v-model="edit_accessory_chart.accessoryId"
                  item-text="measurementUnit"
                  item-value="id"
                  disabled
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Select Measurement unit"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Wastage</div>
                <v-text-field
                  v-model="edit_accessory_chart.wastage"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter Wastage"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Production quantity</div>
                <v-text-field
                  v-model="edit_accessory_chart.productionQuantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter production quantity"
                  dense
                  color="#7631FF"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">Description</div>
                <v-textarea
                  v-model="edit_accessory_chart.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  placeholder="Enter description"
                  dense
                  color="#7631FF"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <div class="big__image overflow-hidden relative " >
                  <input
                    ref="uploaderFirst"
                    class="d-none"
                    type="file"
                    @change="(e)=>firstFileChanged(e)"
                    accept="image/*"
                  />

                  <div class="update__icon" v-if="!!files[0].file||!!images[0].photo">
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
                    v-if="!!files[0].file || !!images[0].photo" width="100%"
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
            color="#7631FF"
            width="163"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="update"
          >
            {{ $t('update') }}
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
          >Delete Accessory planning chart</v-card-title
        >
        <v-card-text>
          Are you sure you want to Delete this accessory planning chart?
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
            @click="deleteChart"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog max-width="590" v-model="image_dialog">
      <v-card >
        <v-card-title class="d-flex">
          <v-spacer/>
          <v-btn icon color="#7631FF" large @click="image_dialog = false">
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AccessoryChartPages",
  data() {
    return {
      validate: true,
      create_accessory_chart: {
        specification: null,
        accessoryId: null,
        accessoryPlanningId: null,
        accessoryPricePerCurrency: "",
        accessoryPricePerUnit: "",
        description: "",
        quantity: "",
        color:"",
        wastage: "",
      },
      edit_accessory_chart: {
        
      },
      delete_acceccory_chart: {},
      currency_enums: ["USD", "UZS", "RUB"],
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Specification", value: "specification" },
        { text: "Price P/U", value: "pricePerUnit" },
        { text: "Currency", value: "pricePerUnitCurrency" },
        { text: "Accessory photo", value: "accessoryPhoto" },
        { text: "Quantity", value: "quantity" },
        { text: "M/U", value: "quantityUnitName" },
        { text: "Wastage", value: "wastage" },
        { text: "Production Quantity", value: "productionQuantity" },
        { text: "totalAccessory", value: "totalAccessory" },
        { text: "Description", value: "description" },
        { text: "Actions", value: "actions", align: "center", sortable: false , width: 150},
      ],
      items:[],
      accessoryId:null,
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
      currentImage:"",
      image_dialog:false,
    };
  },
  watch: {
    newId(val){
      this.accessoryId=val
    },
    accessoryAllData(val){
      this.items=JSON.parse(JSON.stringify(val))
    },
    "create_accessory_chart.accessoryId"(val) {
      this.create_accessory_chart.specification = val;
      this.getAccessoryComposition(val)
    },
  },
  created() {
    this.getMeasurementUnit({ page: 0, size: 20 });
    this.getAccessoryList();
  },
  computed: {
    ...mapGetters({
      accessoryData: "accessory/accessoryData",
      measurementUnit: "measurement/measurementUnit",
      nameData: "accessoryChart/nameData",
      accessoryAllData: "accessoryChart/accessoryAllData",
      specificationData: "accessoryChart/specificationData",
      newId: "accessory/newId",
    }),
    checkId() {
      const param = this.$route.params.id;
      if (param === 'create') {
        const id = this.$store.getters['accessory/newId']
        return id === null
      } else return false
    }
  },
  methods: {
    ...mapActions({
      getMeasurementUnit: "measurement/getMeasurementUnit",
      createChartAccessory: "accessoryChart/createChartAccessory",
      getAccessoryList: "accessoryChart/getAccessoryList",
      updateChartAccessory: "accessoryChart/updateChartAccessory",
      deleteChartAccessory: "accessoryChart/deleteChartAccessory",
      getChartAllData: "accessoryChart/getChartAllData",
      getAccessoryComposition: "accessoryChart/getAccessoryComposition",
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

    async deleteChart() {
      const items = this.delete_acceccory_chart;
      await this.deleteChartAccessory({
        id: items.id,
        accessoryPlanningId: items.accessoryPlanningId,
      });
      this.delete_dialog = false;
    },
    async update() {
      const edit_validate = this.$refs.edit_form.validate();
      const {
        specification,
        accessoryId,
        pricePerUnitCurrency,
        pricePerUnit,
        description,
        quantity,
        id,
        color,
        productionQuantity,
        wastage,
      }=this.edit_accessory_chart
      let accessoryPlanningId=this.$route.params.id!=='create'?this.$route.params.id:this.accessoryId
      if (edit_validate) {
        const formData= new FormData()
        formData.append("specification",specification),
        formData.append("accessoryId",accessoryId),
        formData.append("accessoryPlanningId",this.$route.params.id!=='create'?this.$route.params.id:this.accessoryId),
        formData.append("accessoryPricePerCurrency",pricePerUnitCurrency),
        formData.append("id",id),
        formData.append("accessoryPricePerUnit",pricePerUnit),
        formData.append("description",description),
        formData.append("quantity",quantity)
        if(!!this.files[0]?.file){
          formData.append("file",this.files[0]?.file)
        }
        formData.append("wastage",wastage),
        formData.append("productionQuantity",productionQuantity),
        await this.updateChartAccessory({data:formData,id:accessoryPlanningId});
        this.edit_dialog = false;
      }
    },
    async create() {
      const validate = this.$refs.new_form.validate();
      const {
        specification,
        accessoryId,
        accessoryPricePerCurrency,
        accessoryPricePerUnit,
        description,
        quantity,
        color,
        productionQuantity,
        wastage,
      }=this.create_accessory_chart
      let accessoryPlanningId=this.$route.params.id!=='create'?this.$route.params.id:this.accessoryId
      if (validate) {
        const formData= new FormData()
        formData.append("specification",specification),
        formData.append("accessoryId",accessoryId),
        formData.append("accessoryPlanningId",this.$route.params.id!=='create'?this.$route.params.id:this.accessoryId),
        formData.append("accessoryPricePerCurrency",accessoryPricePerCurrency),
        formData.append("accessoryPricePerUnit",accessoryPricePerUnit),
        formData.append("description",description),
        formData.append("quantity",quantity)
        if(!!this.files[0]?.file){
          formData.append("file",this.files[0]?.file)
        }
        formData.append("wastage",wastage),
        formData.append("productionQuantity",productionQuantity),

          await this.createChartAccessory({data:formData,id:accessoryPlanningId});
          this.new_dialog = false;
          this.$refs.new_form.reset();

      }
    },
    editItem(item) {
      this.edit_accessory_chart = { ...item };
      this.images[0].photo=""
      if(!!item.filePath){
        this.images[0].photo=item.filePath
      }
      this.edit_dialog = true;
    },
    getDeleteItem(item) {
      this.delete_dialog = true;
      this.delete_acceccory_chart.id = item.id;
      this.delete_acceccory_chart.accessoryPlanningId =
        item.accessoryPlanningId;
    },
  },
  mounted() {
    const id = this.$route.params.id;
    if (id !== "create") {
      this.getChartAllData(id);
    }
  },
};
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
  height: 200px;
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
