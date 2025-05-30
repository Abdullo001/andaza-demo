<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-lg">
      <v-form ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filter_size.id"
              :label="$t('sizeTemplate.child.idSize')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filter_size.name"
              :label="$t('sizeTemplate.child.sizeName')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <el-date-picker
              v-model="filter_size.createdAt"
              style="width: 100%"
              type="datetime"
              class="filter_picker"
              :placeholder="$t('measurementUnit.child.created')"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <el-date-picker
              v-model="filter_size.updatedAt"
              style="width: 100%"
              class="filter_picker"
              type="datetime"
             :placeholder="$t('measurementUnit.child.updated')"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-spacer />
          <v-col cols="12" lg="2" md="2">
            <div class="d-flex justify-end">
              <v-btn
                width="140"
                outlined
                color="#544B99"
                elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
               {{ $t("partners.child.reset") }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
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
      :loading="loading"
      :server-items-length="totalElements"
      :items-per-page="itemPrePage"
      :items="size_template"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4 rounded-lg"
      @update:items-per-page="size"
      @update:page="page"
    >
      <template #top>
        <v-toolbar elevation="0" class="rounded-lg">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">{{ $t("sizeTemplate.dialog.size") }}</div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
             {{$t("sizeTemplate.dialog.addSize")}}
          
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider />
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
    <v-dialog v-model="new_dialog" width="830">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">{{ $t('sizeTemplate.dialog.createSize') }}</div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" v-model="validate" lazy-validation>
            <v-row>
              <v-col cols="12">
                <div class="label">{{ $t("sizeTemplate.child.sizeName")}}</div>
                <v-text-field
                  v-model="create_size.name"
                  color="#544B99"
                  :placeholder="$t('sizeTemplate.dialog.enterSizeName')"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="base rounded-lg mr-3"
                />
              </v-col>
              <v-col cols="12" md="9">
                <div class="label">{{ $t("sizeTemplate.dialog.addSize")}}</div>
                <v-text-field
                  v-model="add_size.size"
                  color="#544B99"
                  :placeholder="$t('sizeTemplate.dialog.addSize')"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="base rounded-lg mr-3"
                />
              </v-col>
              <v-col cols="12" md="3" class="d-flex align-end">
                <v-btn
                  @click="addSize"
                  color="#544B99"
                  class="rounded-lg text-capitalize"
                  dark
                >
                  <v-icon>mdi-plus</v-icon>
                 {{ $t("sizeTemplate.dialog.addSize")}}
                </v-btn>
              </v-col>
              <v-col cols="12">
                <div class="label">{{ $t("sizeTemplate.dialog.size")}}</div>
                <v-autocomplete
                  :rules="[formRules.required]"
                  chips
                  multiple
                  v-model="create_size.sizes"
                  :items="enum_size"
                  deletable-chips
                  append-icon="mdi-chevron-down"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  placeholder="Select size"
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#544B99"
            width="163"
            @click="new_dialog = false"
          >
           {{ $t("sizeTemplate.dialog.cancel")}}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
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
          <div class="text-capitalize font-weight-bold">Edit Size</div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" lazy-validation v-model="edit_validate">
            <v-row>
              <v-col cols="12">
                <div class="label">Size name</div>
                <v-text-field
                v-model="edit_size.name"

                  color="#544B99"
                  placeholder="Enter size name"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="base rounded-lg mr-3"
                />
              </v-col>

              <v-col cols="12" md="9">
                <div class="label">Add Size</div>
                <v-text-field
                  v-model="edit_add_size.size"
                  color="#544B99"
                  placeholder="Enter Add size"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base mr-3"
                  dense
                />
              </v-col>
              <v-col cols="12" md="3" class="d-flex align-end">
                <v-btn
                  @click="editAddSize"
                  color="#544B99"
                  class="rounded-lg text-capitalize"
                  dark
                >
                  <v-icon>mdi-plus</v-icon>
                  Add Size
                </v-btn>
              </v-col>
              <v-col cols="12">
                <div class="label">Size</div>
                <v-autocomplete
                  :rules="[formRules.required]"
                  chips
                  multiple
                  dense
                  v-model="edit_size.sizes"
                  :items="edit_enum_size"
                  deletable-chips
                  append-icon="mdi-chevron-down"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  placeholder="Select size"
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#544B99"
            width="163"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="update"
          >
            {{ $t("update") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40" />
        </div>
        <v-card-title class="d-flex justify-center">Delete Size</v-card-title>
        <v-card-text> Are you sure you want to Delete this size? </v-card-text>
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CatalogSizePage",
  data() {
    return {
      delete_size_id: "",
      edit_validate: true,
      validate: true,
      itemPrePage: 10,
      current_page: 0,
      add_size: {
        size: "",
      },
      edit_add_size: {
        name:"",
        size: "",
      },
      create_size: {
        name: "",
        sizes: [],
      },
      edit_enum_size: [],
      edit_size: {},
      enum_size: [],
      filter_size: {
        id: "",
        name: "",
        updatedAt: "",
        createdAt: "",
      },
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      headers: [
        { text: this.$t("sizeTemplate.table.id"), value: "id", sortable: false },
        { text:  this.$t("samplePurposes.table.name"), value: "name", sortable: false },
        { text: this.$t("sizeTemplate.table.sizes"), value: "sizes", sortable: false },
        { text:this.$t("samplePurposes.table.createdAt"), value: "createdAt", sortable: false },
        { text: this.$t("samplePurposes.table.updatedAt"), value: "updatedAt", sortable: false },
        { text: this.$t("samplePurposes.table.actions"), value: "actions", align: "center", sortable: false },
      ],
    };
  },
  watch: {
    "create_size.sizes"(value) {
      this.enum_size = value;
    },
    "edit_size.sizes"(value) {
      this.edit_enum_size = value;
    },
  },
  async created() {
    await this.getSizeTemplateList({ page: 0, size: 10 });
  },
  computed: {
    ...mapGetters({
      loading: "sizeTemplate/loading",
      size_template: "sizeTemplate/size_template",
      totalElements: "sizeTemplate/totalElements",
    }),
  },
  methods: {
    ...mapActions({
      getSizeTemplateList: "sizeTemplate/getSizeTemplateList",
      createSizeTemplate: "sizeTemplate/createSizeTemplate",
      updateSizeTemplate: "sizeTemplate/updateSizeTemplate",
      deleteSizeTemplate: "sizeTemplate/deleteSizeTemplate",
      filterSizeTemplate: "sizeTemplate/filterSizeTemplate",
    }),
    async size(val) {
      this.itemPrePage = val;
      await this.getSizeTemplateList({ page: 0, size: this.itemPrePage });
    },
    async page(val) {
      this.current_page = val - 1;
      await this.getSizeTemplateList({
        page: this.current_page,
        size: this.itemPrePage,
      });
    },
    editAddSize() {
      if (this.edit_add_size.size !== "") {
        const item = { ...this.edit_add_size };
        this.edit_size.sizes.push(item.size);
        this.edit_add_size.size = "";
      }
    },
    addSize() {
      if (this.add_size.size !== "") {
        const item = { ...this.add_size };
        this.create_size.sizes.push(item.size);
        this.add_size.size = "";
      }
    },
    async save() {
      const validate = this.$refs.new_form.validate();
      if (validate) {
        const item = { ...this.create_size };
        await this.createSizeTemplate(item);
        this.create_size = {
          name:"",
          sizes: [],
        };
        this.new_dialog = false;
      }
    },
    async update() {
      const edit_validate = this.$refs.edit_form.validate();
      if (edit_validate) {
        const { id, sizes, name} = this.edit_size;
        const item = { id, sizes,name };

        await this.updateSizeTemplate(item);
        this.edit_dialog = false;
      }
    },
    async deleteItem() {
      await this.deleteSizeTemplate(this.delete_size_id);
      this.delete_dialog = false;
    },
    editItem(item) {
      this.edit_size = JSON.parse(JSON.stringify(item));
      this.edit_dialog = true;
    },
    getDeleteItem(item) {
      this.delete_size_id = item.id;
      this.delete_dialog = true;
    },
    async filterData() {
      const item = { ...this.filter_size };
      await this.getSizeTemplateList({page:0,size:10,});
    },
    async resetFilters() {
      this.filter_size = {
        id: "",
        name: "",
        updatedAt: "",
        createdAt: "",
      };
      await this.getSizeTemplateList({ page: 0, size: 10 });
    },
  },
  mounted() {
    this.$store.commit("setPageTitle", this.$t('sidebar.catalogs'));
  },
};
</script>

<style lang="scss">
.el-input__inner::placeholder,
.el-input__icon,
.el-icon-time {
  color: #919191 !important;
}
</style>
