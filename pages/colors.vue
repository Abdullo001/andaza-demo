<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-lg"
    >
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.code"
              :label="$t('colorsBox.table.colorCode')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.name"
               :label="$t('colorsBox.table.colorName')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-spacer/>
          <v-col cols="12" lg="2" md="2">
            <div class="d-flex justify-end">
              <v-btn
                width="140" outlined
                color="#544B99" elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                {{ $t("partners.child.reset") }}
              </v-btn>
              <v-btn
                width="140" color="#544B99" dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                 {{ $t("partners.child.search") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items-per-page="itemPrePage"
      :items="colors_thin_list"
      :loading="loading"
      :server-items-length="totalElements"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100]
      }"
      class="mt-4 rounded-lg"
      @update:items-per-page="size"
      @update:page="page"
    >
      <template #top>
        <v-toolbar class="rounded-lg" elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">{{$t("colorsBox.table.color") }}</div>
            <v-btn color="#544B99" class="rounded-lg text-capitalize" dark @click="new_dialog = true">
              <v-icon>mdi-plus</v-icon>
         {{$t("colorsBox.dialog.addColor")}}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>
      <template #item.colorCodeHex="{ item }">
        <v-chip label style="height: 25px; width: 30px" :color="item.colorCodeHex"/>
        {{ item.colorCodeHex }}
      </template>
      <template #item.actions="{item}">
        <div>
          <v-btn icon color="green" @click="editItem(item)">
            <v-img src="/edit-active.svg" max-width="22"/>
          </v-btn>
          <v-btn icon color="red" @click="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27"/>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">  {{$t("colorsBox.dialog.addColor")}}</div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" v-model="validate" lazy-validation>
            <v-row>
              <v-col cols="12" md="6">
                <div class="label">{{$t("colorsBox.table.colorName") }}</div>
                <v-text-field
                  v-model="create_colors.name"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('colorsBox.dialog.entercolorName')"
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{$t("colorsBox.table.colorName") }}</div>
                <div>
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        hide-details
                        height="44"
                        class="rounded-lg base"
                        :rules="[formRules.required]"
                         :placeholder="$t('colorsBox.dialog.entercolorName')"
                        color="#544B99"
                        v-model="create_colors.colorCodeHex.hex"
                        v-on="on"
                        v-bind="attrs"
                      />
                    </template>
                    <v-card>
                      <v-card-text>
                        <v-color-picker
                          outlined
                          hide-details
                          height="44"
                          class="rounded-lg base"
                          canvas-height="100"
                          v-model="create_colors.colorCodeHex"
                        >
                        </v-color-picker>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer/>
                        <v-btn class="text-capitalize primary darken-1" small @click="menu = false">save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{$t("colorsBox.table.colorCode") }}</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  v-model="create_colors.colorCode"
                  :placeholder="$t('colorsBox.dialog.entercolorCode')"
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{$t("colorsBox.table.pantoneCode") }}</div>
                <v-text-field
                  v-model="create_colors.pantoneCode"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('colorsBox.dialog.enterPantoneCode')"
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" >
                <div class="text-body-1">{{$t("colorsBox.table.pantoneType") }}</div>
                <v-radio-group
                  row
                  v-model="create_colors.pantoneType"
                >
                  <v-radio
                    color="#544B99"
                    v-for="item in radio_item"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="163"
            @click="new_dialog = false"
          >
             {{ $t("sizeTemplate.dialog.cancel")}}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="163"
            @click="save"
          >
              {{ $t("sizeTemplate.dialog.add")}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit Color</div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="edit_validate" lazy-validation>
            <v-row>
              <v-col cols="12" md="6">
                <div class="label">Color name</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="edit_colors.name"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter Color name"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Code and apperance</div>
                <div>
                  <v-menu
                    v-model="edit_menu"
                    :close-on-content-click="false"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        :rules="[formRules.required]"
                        v-model="edit_colors.colorCodeHex"
                        outlined
                        hide-details
                        height="44"
                        class="rounded-lg base"
                        placeholder="Enter Code and apperance"
                        color="#544B99"
                        v-on="on"
                        v-bind="attrs"
                      />
                    </template>
                    <v-card>
                      <v-card-text>
                        <v-color-picker
                          v-model="edit_colors.colorCodeHex"
                          canvas-height="100"
                        >
                        </v-color-picker>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer/>
                        <v-btn class="text-capitalize primary darken-1" small @click="edit_menu = false">save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Color code</div>
                <v-text-field
                  v-model="edit_colors.colorCode"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter Color code"
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Panton code</div>
                <v-text-field
                  v-model="edit_colors.pantoneCode"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Enter Panton code"
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" >
                <div class="text-body-1">Panton Type</div>
                <v-radio-group
                  row
                  v-model="edit_colors.pantoneType"
                >
                  <v-radio
                    color="#544B99"
                    v-for="item in radio_item"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="163"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="163"
            @click="update"
          >
          {{$t("update")}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete Color</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this color?
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
            dark
            @click="deleteItem"
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
  name: "CatalogsColorPages",
  data() {
    return {
      radio_item: ["TPX", "TCX", "TPG","C"],
      edit_validate: true,
      validate: true,
      itemPrePage: 10,
      current_page: 0,
      edit_colors: {
        id: "",
        colorCodeHex: "",
        description: "",
        name: ""
      },
      create_colors: {
        description: null,
        colorCodeHex: {},
        name: "",
        colorCode: "",
        pantoneCode: "",
        pantoneType: "TPX",
      },
      delete_colors_id: "",
      filters: {
        code: "",
        name: "",
      },
      valid_search: true,
      edit_menu: false,
      menu: false,
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      headers: [
        {text: this.$t("sizeTemplate.table.id"), value: "id", sortable: false},
        {text: this.$t("samplePurposes.table.name"), value: "name", sortable: false},
        {text: this.$t("colorsBox.table.colorCodeHex"), value: "colorCodeHex", sortable: false},
        {text: this.$t("colorsBox.table.pantoneCode"), value: "pantoneCode", sortable: false},
        {text:  this.$t("colorsBox.table.pantoneType"), value: "pantoneType", sortable: false},
        {text:this.$t("samplePurposes.table.createdAt"), value: "createdAt", sortable: false},
        {text:  this.$t("samplePurposes.table.updatedAt"), value: "updatedAt", sortable: false},
        {text: this.$t("samplePurposes.table.actions"), value: "actions", align: "center", sortable: false},
      ],
    }
  },
  async created() {
    await this.getColorsThinList({page: 0, size: 10});
  },
  computed: {
    ...mapGetters({
      loading: "colors/loading",
      colors_thin_list: "colors/colors_thin_list",
      totalElements: "colors/totalElements",
    }),
  },
  watch:{
    new_dialog(val){
      if(!val){
        this.$refs.new_form.reset()
        this.$refs.new_form.resetValidation();
      }
    },
  },
  methods: {
    ...mapActions({
      getColorsThinList: "colors/getColorsThinList",
      createColorsList: "colors/createColorsList",
      updateColorsList: "colors/updateColorsList",
      deleteColorsList: "colors/deleteColorsList",
      filterColorsThinList: "colors/filterColorsThinList",
    }),
    async size(val) {
      this.itemPrePage = val
      await this.getColorsThinList({page: this.current_page, size: this.itemPrePage});
    },
    async page(val) {
      this.current_page = val - 1;
      await this.getColorsThinList({page: this.current_page, size: this.itemPrePage});
    },
    async save() {
      const validate = this.$refs.new_form.validate();
      if (validate) {
        const payload = {...this.create_colors};
        payload.colorCodeHex = this.create_colors.colorCodeHex?.hex;
        await this.createColorsList(payload);
        this.new_dialog = false;
      }
    },
    async update() {
      const edit_validate = this.$refs.edit_form.validate();
      if (edit_validate) {
        const {id, colorCodeHex, name, colorCode, pantoneCode, pantoneType} = this.edit_colors;
        const item = {id, colorCodeHex, description: null, name, colorCode, pantoneCode, pantoneType};
        await this.updateColorsList(item);
        this.edit_dialog = false;
      }
    },
    async deleteItem() {
      await this.deleteColorsList(this.delete_colors_id);
      this.delete_dialog = false;
    },
    editItem(item) {
      this.edit_colors = {...item};
      this.edit_dialog = true;
    },
    getDeleteItem(item) {
      this.delete_colors_id = item.id;
      this.delete_dialog = true;
    },
    async filterData() {
      this.getColorsThinList({...this.filters})
    },
    async resetFilters() {
      await this.getColorsThinList({page: 0, size: 10});
      this.$refs.filter_form.reset()
    },
  },
  async mounted() {
    await this.$store.commit('setPageTitle', this.$t('sidebar.catalogs'));
  }
}
</script>

<style lang="sass" scoped>

</style>
