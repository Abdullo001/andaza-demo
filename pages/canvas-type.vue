<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filters.id"
                :placeholder="$t('canvasType.idCanvasType')"
                outlined
                validate-on-blur
                dense
                hide-details
                class="rounded-lg filter"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filters.name"
                :placeholder= "$t('samplePurposes.table.name')"
                outlined
                validate-on-blur
                dense
                hide-details
                class="rounded-lg filter"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2" style="max-width: 240px">
              <el-date-picker
                v-model="filters.createdAt"
                type="datetime"
                class="rounded-lg d-block filter_picker"
                :placeholder="$t('measurementUnit.child.created')"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <el-date-picker
                v-model="filters.updatedAt"
                type="datetime"
                class="rounded-lg d-block filter_picker"
                 :placeholder="$t('measurementUnit.child.updated')"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </v-col>
            <v-spacer/>
            <v-col cols="12" lg="3">
              <div class="d-flex justify-end">
                <v-btn
                  width="140"
                  outlined
                  color="#544B99"
                  elevation="0"
                  @click="resetBtn"
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
                >
                   {{ $t("partners.child.reset") }}
                </v-btn>
                <v-btn
                  width="140"
                  color="#544B99"
                  dark
                  elevation="0"
                  @click="filterBtn"
                  class="text-capitalize rounded-lg font-weight-bold"
                >
                  {{ $t("partners.child.search") }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-data-table
      :headers="headers"
      :items-per-page="itemPrePage"
      :loading="loading"
      :items="canvas_type_list"
      :server-items-length="totalElements"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4 rounded-lg"
      @update:page="page"
      @update:items-per-page="size"
    >
      <template #top>
        <v-toolbar elevation="0" class="rounded-lg">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              {{ $t("catalogGroups.tabs.canvasType") }}
            </div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t("catalogGroups.tabs.canvasType") }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>
      <template #item.checkbox="{ item }">
        <v-checkbox/>
      </template>
      <template #item.actions="{ item }">
        <div>
          <v-btn icon color="green" @click.stop="editItem(item)">
            <v-img src="/edit-active.svg" max-width="22"/>
          </v-btn>
          <v-btn icon color="red" @click.stop="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27"/>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("catalogGroups.canvasType.dialogs.createCanvas") }}
          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" lazy-validation v-model="validate">
            <div class="label">{{$t('catalogGroups.tabs.canvasType')}}</div>
            <v-text-field
              :rules="[formRules.required]"
              v-model="create_canvas_type.name"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              :placeholder="$t('catalogGroups.canvasType.dialogs.selectCanvas')"
              color="#544B99"
            />
            <div class="label">{{$t('catalogGroups.canvasType.dialogs.description')}}</div>
            <v-textarea
              v-model="create_canvas_type.description"
              outlined
              hide-details
              class="rounded-lg base"
              :placeholder="$t('catalogGroups.canvasType.dialogs.enterDescription')"
              color="#544B99"
            />
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
            {{ $t("catalogGroups.canvasType.dialogs.cancelBtn") }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="save"
          >
            {{ $t("catalogGroups.canvasType.dialogs.createBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("catalogGroups.canvasType.dialogs.editCanvas") }}
          </div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <div class="label">{{$t('catalogGroups.tabs.canvasType')}}</div>
            <v-text-field
              v-model="edit_canvas_type.name"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              :rules="[formRules.required]"
              :placeholder="$t('catalogGroups.canvasType.dialogs.selectCanvas')"
              color="#544B99"
            />
            <div class="label">{{$t('catalogGroups.canvasType.dialogs.description')}}</div>
            <v-textarea
              v-model="edit_canvas_type.description"
              outlined
              hide-details
              dense
              class="rounded-lg base"
              :placeholder="
                $t('catalogGroups.canvasType.dialogs.enterDescription')
              "
              color="#544B99"
            />
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
            {{ $t("catalogGroups.canvasType.dialogs.cancelBtn") }}
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
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">
          {{ $t("catalogGroups.canvasType.dialogs.deleteDialog") }}
        </v-card-title>
        <v-card-text>
          {{ $t("catalogGroups.canvasType.dialogs.deleteText") }}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{ $t("catalogGroups.canvasType.dialogs.cancelBtn") }}
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteCanvas"
          >
            {{ $t("catalogGroups.canvasType.dialogs.deleteBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CanvasTypePage",
  data() {
    return {
      filters: {
        id: "",
        name: "",
        createdAt: "",
        updatedAt: "",
      },
      itemPrePage: 10,
      current_page: 0,
      validate: true,
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      create_canvas_type: {
        description: "",
        name: "",
      },
      edit_canvas_type: {
        description: "",
        name: "",
        specification: "",
      },
      delete_canvas_id: "",
      headers: [
        {
          text: this.$t("catalogGroups.tabs.table.id"),
          value: "id",
          align: "start",
          width: "100",
          sortable: false,
        },
        {
          text: this.$t("catalogGroups.tabs.table.name"),
          sortable: false,
          value: "name",
        },
        {
          text: this.$t("catalogAccessory.table.description"),
          value: "description",
          sortable: false,
        },
        {
          text: this.$t("catalogGroups.tabs.table.createdAt"),
          value: "createdAt",
          sortable: false,
        },
        {
          text: this.$t("catalogGroups.tabs.table.updatedAt"),
          value: "updatedAt",
          sortable: false,
        },
        {
          text: this.$t("catalogGroups.tabs.table.actions"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
    };
  },
  async created() {
    await this.getCanvasTypeList({page: 0, size: 10});
  },
  computed: {
    ...mapGetters({
      loading: "canvasType/loading",
      canvas_type_list: "canvasType/canvas_type_list",
      totalElements: "canvasType/totalElements",
      catalogGroupId: "catalogGroups/catalogGroupId",
    }),
  },
  methods: {
    ...mapActions({
      getCanvasTypeList: "canvasType/getCanvasTypeList",
      createCanvasType: "canvasType/createCanvasType",
      updateCanvasType: "canvasType/updateCanvasType",
      deleteCanvasType: "canvasType/deleteCanvasType",
      filterCanvasTypeList: "canvasType/filterCanvasTypeList",
    }),
    async size(val) {
      this.itemPrePage = val;
      await this.getCanvasTypeList({
        page: 0,
        size: this.itemPrePage,
        id: this.create_canvas_type.catalogGroupId,
      });
    },
    async page(val) {
      this.current_page = val - 1;
      await this.getCanvasTypeList({
        page: this.current_page,
        size: this.itemPrePage,
        id: this.create_canvas_type.catalogGroupId,
      });
    },
    async save() {
      const validate = this.$refs.new_form.validate();
      if (validate) {
        const item = {...this.create_canvas_type};
        await this.createCanvasType(item);
        this.new_dialog = false;
        this.$refs.new_form.reset();
      }
    },
    async update() {
      const { name, id, description} =this.edit_canvas_type;
      const item = { description, id, name };
      await this.updateCanvasType(item);
      this.edit_dialog = false;
    },
    async deleteCanvas() {
      await this.deleteCanvasType(this.delete_canvas_id);
      this.delete_dialog = false;
    },
    editItem(item) {
      this.edit_canvas_type = {...item};
      this.edit_dialog = true;
    },
    getDeleteItem(item) {
      this.delete_canvas_id = item.id;
      this.delete_dialog = true;
    },
    async resetBtn() {
      this.filters = {
        id: "",
        name: "",
        createdAt: "",
        updatedAt: "",
      };
      await this.getCanvasTypeList({page: 0, size: 10});
    },
    async filterBtn() {
      await this.filterCanvasTypeList(this.filters);
    },
  },
  mounted() {
    this.$store.commit("setPageTitle",this.$t('sidebar.catalogs'));
  },
};
</script>

<style lang="sass" scoped></style>
