<template>
  <div>
    <Breadcrumbs :maps="map_links" />

    <v-card elevation="0" class="mb-4">
      <v-card-title>
        <div>Work performed in the section of employees</div>
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="detail" v-model="new_validate" lazy-validation>
          <v-row>
            <v-col cols="8">
              <v-row>
                <v-col cols="12" lg="4">
                  <div class="label">Model Number</div>
                  <v-text-field
                    v-model="modelDetail.modelNumber"
                    disabled
                    class="rounded-lg base mb-4"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    placeholder="Model number"
                    validate-on-blur
                  />
                </v-col>
                <v-col cols="12" lg="4">
                  <div class="label">Model Category</div>
                  <v-text-field
                    v-model="modelDetail.modelCategoryName"
                    disabled
                    class="rounded-lg base mb-4"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    placeholder="Model number"
                    validate-on-blur
                  />
                </v-col>
                <v-col cols="12" lg="4">
                  <div class="label">Deadline</div>
                  <v-text-field
                    v-model="modelDetail.deadline"
                    disabled
                    class="rounded-lg base mb-4"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    placeholder="Deadline"
                    validate-on-blur
                  />
                </v-col>
                <v-col cols="12" lg="4" class="d-flex">
                  <div class="mr-2">
                    <div class="label">Order quantity</div>
                    <v-text-field
                      v-model="modelDetail.orderQuantity"
                      disabled
                      class="rounded-lg base mb-4"
                      color="#544B99"
                      dense
                      height="44"
                      hide-details
                      outlined
                      placeholder="Order quantity"
                      validate-on-blur
                    />
                  </div>
                  <div>
                    <div class="label">Labor cost</div>
                    <v-text-field
                      v-model="modelDetail.productPrice"
                      disabled
                      class="rounded-lg base mb-4"
                      color="#544B99"
                      dense
                      height="44"
                      hide-details
                      outlined
                      placeholder=""
                      validate-on-blur
                    />
                  </div>
                </v-col>
                <v-col cols="12" lg="4">
                  <div class="label">Total labor cost</div>
                  <v-text-field
                    v-model="modelDetail.totalAmount"
                    disabled
                    class="rounded-lg base mb-4"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    placeholder="Total labor coast"
                    validate-on-blur
                  />
                </v-col>
                <v-col cols="12" lg="4">
                  <div class="label">Actual cut quantity</div>
                  <v-text-field
                    v-model="modelDetail.actualCutQuantity"
                    disabled
                    class="rounded-lg base mb-4"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    placeholder="0"
                    validate-on-blur
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-img v-if="modelImages.length" :src="modelImages[0].filePath"/>
              <div v-else class="default-data" v-ripple>
                <div
                  class="d-flex justify-center flex-column align-center h-full"
                >
                  <v-img
                    src="/default-image.svg"
                    max-width="56"
                    max-height="56"
                  />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <DailyWorkTable/>
  </div>
</template>
<script>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import DailyWorkTable from "@/components/DailyWorkTable.vue";
import {mapActions,mapGetters} from "vuex"

export default {
  components: {
    Breadcrumbs,
    DailyWorkTable
  },
  data() {
    return {
      map_links: [
        {
          text: "Home",
          disabled: false,
          to: "/",
          icon: true,
        },
        {
          text: "Production",
          disabled: false,
          to: "/production",
          icon: true,
        },
        {
          text: "Complated tasks",
          disabled: true,
          to: "/production/3",
          icon: false,
        },
      ],
      new_validate: true,
      modelDetail: {},
    };
  },
  computed:{
    ...mapGetters({
      workLogsInfo:"dailyWorkTable/workLogsInfo",
      modelImages: "modelPhoto/modelImages",
    })
  },
  watch:{
    workLogsInfo(val){
      this.modelDetail=JSON.parse(JSON.stringify(val))
    },
  },
  methods:{
    ...mapActions({
      getWorkLogsInfo:"dailyWorkTable/getWorkLogsInfo",
      getImages: "modelPhoto/getImages",
    }),
  },
  mounted(){
    const modelId=this.$route.params.id
    this.getWorkLogsInfo(modelId)
    this.getImages(modelId)
  }
};
</script>
<style lang="scss" scoped>
.default-data {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 260px;
  width: 100%;
  background: #F4F5FA;
  border: 1px solid #E1E2E9;
  border-radius: 12px;
  padding: 5px;
}
</style>
