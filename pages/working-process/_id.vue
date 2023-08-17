<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0" class="mt-2 rounded-lg">
      <v-card-title>
        <div>{{ $t('workingProcess.dialog.workingOperations') }}</div>
        <v-chip color="green" dark class="ml-4">{{ $t('workingProcess.dialog.edit') }}</v-chip>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="pb-0">
        <v-row>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('workingProcess.dialog.workingProcess') }}</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              v-model="working_operations.workingProcess"
              disabled
              dense
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('workingProcess.dialog.processType') }}</div>
            <v-text-field
              v-model="working_operations.processType"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              color="#7631FF"
              disabled
              dense
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('workingProcess.dialog.invoiceNumber') }}</div>
            <v-text-field
              v-model="working_operations.invoiceNumber"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              color="#7631FF"
              dense
              :placeholder="$t('workingProcess.dialog.searchModelNumber')"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('workingProcess.dialog.workShop') }}</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              v-model="working_operations.workshop"
              disabled
              dense
            />
          </v-col>
        </v-row>
        <v-row :class="showObject">
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('workingProcess.dialog.contractDate') }}</div>
            <v-text-field
              v-model="working_operations.contractDate"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              disabled
              dense
              :placeholder="$t('workingProcess.dialog.enterContractDate')"
            >
              <template #append>
                <v-img src="/clock-disabled.svg" width="24"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('workingProcess.dialog.shippingDate') }}</div>
            <v-text-field
              v-model="working_operations.shippingDate"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              disabled
              dense
              :placeholder="$t('workingProcess.dialog.enterShippingDate')"
            >
              <template #append>
                <v-img src="/clock-disabled.svg" width="24"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('workingProcess.dialog.orderNumber') }}</div>
            <v-text-field
              v-model="working_operations.orderNumber"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              disabled
              dense
            >
              <template #append>
                <v-img src="/clock-disabled.svg" width="24"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('workingProcess.dialog.modelNumber') }}</div>
            <v-text-field
              v-model="working_operations.modelNumber"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              disabled
              dense
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('workingProcess.dialog.modelName') }}</div>
            <v-text-field
              v-model="working_operations.modelName"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              disabled
              dense
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6">
            <div class="label">{{ $t('workingProcess.dialog.overProduction') }}, %</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              v-model="working_operations.overProductionPercent"
              disabled
              dense
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6"></v-col>
          <v-col cols="12" lg="6" md="6">
            <div class="label mt-4">{{ $t('workingProcess.dialog.photosModels') }}</div>
            <div class="d-flex flex-wrap px-0">
              <v-col v-for="(image, idx) in 3" :key="idx" cols="12" lg="4" md="4">
                <div class="image-box">
                  <v-img
                    :src="modelImages[idx]?.filePath"
                    v-if="!!modelImages[idx]?.filePath"
                    max-height="150"
                    contain class="pointer"
                    @click="showImage(modelImages[idx]?.filePath)"
                  />
                  <v-img src="/default-image.svg" max-width="70" v-else/>
                </div>
              </v-col>
            </div>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="6"></v-col>
          <v-col cols="12" lg="3" md="3" sm="6" class="d-flex justify-end align-end">
            <v-btn
              width="130"
              height="40"
              color="#7631FF"
              class="font-weight-bold rounded-lg"
              dark
              @click="save"
            >
              {{ $t('workingProcess.dialog.save') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="py-6">
        <v-spacer/>
          <ShowBtnComponent
            :click-btn="clickBtn"
            :show_btn_value="show_btn"
          />
        <v-spacer/>
      </v-card-actions>
    </v-card>
    <v-dialog max-width="590" v-model="image_dialog">
      <v-card>
        <v-card-title class="d-flex">
          <v-spacer/>
          <v-btn icon color="#7631FF" large @click="image_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-img :src="currentImage" height="500" contain/>
      </v-card>
    </v-dialog>
    <WorkingOperation class="mt-4"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import WorkingOperation from "../../components/Production/Working.vue";
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import ShowBtnComponent from "../../components/ShowComponentBtn/ShowBtn.vue";

export default {
  name: 'WorkingOperationId',
  components: {ShowBtnComponent, Breadcrumbs, WorkingOperation},
  data() {
    return {
      show_btn: true,
      currentImage: '',
      image_dialog: false,
      working_operations: {
        workingProcess: "",
        processType: "",
        invoiceNumber: "",
        workShop: "",
        contractDate: "",
        shippingDate: "",
        orderNumber: "",
        modelNumber: "",
        modelName: "",
        overProductionPercent: "",
        workshop: "",
      },
      orderList: [],
      modelList: [],
      orderSearch: '',
      planning: {
        modelNumber: ""
      },
      processPlanningId: "",
      map_links: [
        {
          text: this.$t('listsModels.child.home'),
          disabled: false,
          to: this.localePath('/'),
          icon: true
        },
        {
          text:"Production",
          disabled: false,
          to: this.localePath('/production'),
          icon: true
        },
        {
          text: "Production processes for current model",
          disabled: false,
          to: this.localePath(`/production/${this.$route.query.id}`),
          icon: true
        },
        {
          text: this.$t('workingProcess.dialog.workingOperations'),
          disabled: true,
          to: this.localePath('/planning-production'),
          icon: false
        },
      ],
    }
  },
  async created() {
    await this.getWorkingInfo(this.$route.params.id);
  },
  computed: {
    showObject() {
      return {
        show_active: this.show_btn
      }
    },
    ...mapGetters({
      mainsList: "workingOperations/mainsList",
      partList: "workingOperations/partList",
      invoiceNumber: "workingOperations/invoiceNumber",
      modelInfo: 'production/planning/modelInfo',
      modelImages: 'modelPhoto/modelImages',
      planningId: "workingOperations/planningId",
    })
  },
  watch: {
    async "planning.modelNumber"(val) {
      if (typeof val !== null || !!Object.keys(val).length || val?.id) {
        await this.getModelInfo(val?.id);
      }
    },
    async mainsList(val) {
      await this.getModelInfo(val.modelId);
      this.working_operations = JSON.parse(JSON.stringify(val))
    },
    modelInfo(val) {
      val.modelNumber = this.planning.modelNumber
      this.getImages(val?.modelId);
      this.planning = JSON.parse(JSON.stringify(val))
    }
  },
  methods: {
    ...mapActions({
      getWorkingInfo: "workingOperations/getWorkingInfo",
      putSetInvoice: "workingOperations/putSetInvoice",

      getModelName: 'preFinance/getModelName',
      getModelInfo: 'production/planning/getModelInfo',
      getImages: 'modelPhoto/getImages',
    }),
    clickBtn() {
      this.show_btn = !this.show_btn
    },
    async save() {
      const item = {
        processPlanningId: 4,
        invoiceNumber: this.working_operations.invoiceNumber,
      }
      await this.putSetInvoice(item);
      this.working_operations = await JSON.parse(JSON.stringify(this.invoiceNumber));
    },
    showImage(image) {
      this.currentImage = image;
      this.image_dialog = true;
    },
  },
  mounted() {
    this.processPlanningId = this.$route.params.id;
  }
}
</script>

<style lang="scss" scoped>
.image-box {
  background: #F8F4FE;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  min-height: 150px;
}

.show_active {
  height: 0;
  overflow: hidden;
}
</style>
