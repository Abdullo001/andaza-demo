<template >
  <div>
    <v-data-table
      :headers="headers"
      :items="orderSizeList"
      :items-per-page="50"
      class="elevation-0"
      hide-default-footer
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex">
            <v-btn
              class="rounded-lg text-capitalize mr-2 colorSizeBtn"
              outlined
            >
              Supply
            </v-btn>
            <v-btn
              class="rounded-lg text-capitalize colorSizeBtn"
              style="color: rgb(119, 124, 133); caret-color: rgb(119, 124, 133)"
              outlined
            >
              Cutting info
            </v-btn>
            <v-spacer />
            <v-btn
              class="rounded-lg text-capitalize"
              color="#7631FF"
              width="160"
              height="36"
              dark
            >
              <v-icon>mdi-plus</v-icon>
              Column
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.actions="{ item }">
        <div>
          <v-btn icon class="mr-2" @click="edit()">
            <v-img src="/edit-green.svg" max-width="20" />
          </v-btn>
          <v-btn icon>
            <v-img src="/trash-red.svg" max-width="20" />
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="edit_dialog" max-width="572">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>Edit Supply</div>
          <v-btn @click="edit_dialog = !edit_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row class="mb-4">
              <v-col cols="6">
                <div class="mb-2 text-body-1">Main body</div>
                <v-text-field
                  v-model="orderSizeDetail.mainBody"
                  label="Enter main bodyx"
                  single-line
                  outlined
                  validate-on-blur
                  dense
                  class="rounded-lg"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
                <div class="mb-2 text-body-1">Collar</div>
                <v-text-field
                  v-model="orderSizeDetail.collar"
                  label="Enter collar"
                  single-line
                  outlined
                  validate-on-blur
                  dense
                  class="rounded-lg"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>

              <v-col cols="6">
                <div class="mb-2 text-body-1">Sleeve </div>
                <v-text-field
                  v-model="orderSizeDetail.sleeve"
                  label="Enter Sleeve "
                  single-line
                  outlined
                  validate-on-blur
                  dense
                  class="rounded-lg"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
                <div class="mb-2 text-body-1">Lining</div>
                <v-text-field
                  v-model="orderSizeDetail.linning"
                  label="Enter Linning"
                  single-line
                  outlined
                  validate-on-blur
                  dense
                  class="rounded-lg"
                  color="#7631FF"
                  background-color="#F8F4FE"
                />
              </v-col>
            </v-row>

            <v-card-actions class="d-flex justify-center pb-6">
              <v-btn
                outlined
                class="text-capitalize rounded-lg font-weight-bold mr-6"
                color="#7631FF"
                width="163"
                @click="edit_dialog = !edit_dialog"
                >cancel
              </v-btn>
              <v-btn
                class="text-capitalize rounded-lg font-weight-bold"
                color="#7631FF"
                dark
                width="163"
                @click="updateSupply"
                >save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex';

export default {
  name: "ColorSizeDistirbution",

  data() {
    return {
      edit_dialog: false,
      new_validate: true,

      headers: [
        {
          text: "Main body",
          align: "start",
          sortable: false,
          value: "mainBody",
        },
        { text: "Sleeve", sortable: false, value: "sleeve" },
        { text: "Collar", sortable: false, value: "collar" },
        { text: "Linning", sortable: false, value: "linning" },
        { text: "S", sortable: false, value: "s" },
        { text: "M", sortable: false, value: "m" },
        { text: "X", sortable: false, value: "x" },
        { text: "XL", sortable: false, value: "xl" },
        { text: "Total", sortable: false, value: "total" },
        { text: "Actions", sortable: false, align: "center", value: "actions" },
      ],

      orderSizeList: [
        {
          mainBody: 3,
          sleeve: 3,
          collar: 3,
          linning: "FFFFFF",
          s: 400,
          m: 2000,
          x: 110,
          xl: 250,
          total: 900,
        },
      ],

      orderSizeDetail: {
        mainBody: 3,
        sleeve: 3,
        collar: 3,
        linning: "FFFFFF",
        s: 400,
        m: 2000,
        x: 110,
        xl: 250,
        total: 900,
      },
    };
  },

  computed:{
    ...mapGetters({
      modelId: "detailInfo/modelId"
    })
  },

  methods: {

    ...mapActions({
      getSizeDistirbution:'sizeDistirbution/getSizeDistirbution' 
    }),

    edit() {
      this.edit_dialog = !this.edit_dialog;
    },
    updateSupply() {},
  },

  mounted(){
    const id = this.$route.params.id;
    if(id!=='add-order'){
      this.getSizeDistirbution({modelId:this.modelId.modelId});
      console.log(this.modelId);
    }
  }
};
</script>
<style lang="scss" scoped>
.colorSizeBtn {
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #777c85;
}
</style>