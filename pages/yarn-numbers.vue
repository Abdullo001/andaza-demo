<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filters.id"
                placeholder="ID yarn number"
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
                placeholder="Name"
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
                placeholder="Created"
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
                placeholder="Updated"
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
                  color="#397CFD"
                  elevation="0"
                  @click="resetBtn"
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
                >
                  Reset
                </v-btn>
                <v-btn
                  width="140"
                  color="#397CFD"
                  dark
                  elevation="0"
                  @click="filterBtn"
                  class="text-capitalize rounded-lg font-weight-bold"
                >
                  Search
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
      :items="yarn_number_list"
      :loading="loading"
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
              {{ $t("catalogGroups.tabs.yarnNumber") }}
            </div>
            <v-btn
              color="#7631FF"
              class="rounded-lg text-capitalize"
              dark
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t("catalogGroups.tabs.yarnNumber") }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider />
      </template>
      <template #item.checkbox="{ item }">
        <v-checkbox />
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
          <div class="text-capitalize font-weight-bold">
            {{ $t("catalogGroups.yarnNumber.dialogs.create") }}
          </div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" lazy-validation v-model="validate">
            <div class="label">{{ $t('catalogGroups.tabs.yarnNumber') }}</div>
            <v-text-field
              v-model="create_yarn_number.name"
              :rules="[formRules.required]"
              outlined
              hide-details
              height="44"
              dense
              class="rounded-lg base mb-4"
              :placeholder="$t('catalogGroups.yarnNumber.dialogs.select')"
              color="#7631FF"
            />
            <div class="label">Yarn type</div>
            <v-radio-group
              row
              v-model="create_yarn_number.yarnType"
              class="mb-4"
            >
              <v-radio
                color="#7631FF"
                v-for="item in radio_item"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
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
            {{ $t("catalogGroups.yarnNumber.dialogs.cancelBtn") }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="save"
          >
            {{ $t("catalogGroups.yarnNumber.dialogs.createBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("catalogGroups.yarnNumber.dialogs.edit") }}
          </div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" lazy-validation v-model="edit_validate">
            <div class="layout">{{$t('catalogGroups.tabs.yarnNumber')}}</div>
            <v-text-field
              v-model="edit_yarn_number.name"
              :rules="[formRules.required]"
              outlined
              dense
              hide-details
              height="44"
              class="rounded-lg base mb-4"
              :placeholder="$t('catalogGroups.yarnNumber.dialogs.select')"
              color="#7631FF"
            />
            <div class="label">Yarn type</div>
            <v-radio-group
              row
              v-model="create_yarn_number.yarnType"
              class="mb-4"
            >
              <v-radio
                color="#7631FF"
                v-for="item in radio_item"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
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
            {{ $t("catalogGroups.yarnNumber.dialogs.cancelBtn") }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
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
        <v-card-title class="d-flex justify-center">
          {{ $t("catalogGroups.yarnNumber.dialogs.deleteDialog") }}
        </v-card-title>
        <v-card-text>
          {{ $t("catalogGroups.yarnNumber.dialogs.deleteText") }}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{ $t("catalogGroups.yarnNumber.dialogs.cancelBtn") }}
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteYarn"
          >
            {{ $t("catalogGroups.yarnNumber.dialogs.deleteBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "YarnNumberPage",
  data() {
    return {
      radio_item:["PN", "KD", "OE", "CB"],
      filters: {
        id: "",
        name: "",
        createdAt: "",
        updatedAt: "",
      },
      itemPrePage: 10,
      current_page: 0,
      edit_validate: true,
      validate: true,
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      create_yarn_number: {
        name: "",
        yarnType: "Comb",
      },
      edit_yarn_number: {
        name: "",
        description: "",
      },
      delete_yarn_id: "",
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
          text: "Yarns",
          value: "yarns",
          sortable: false,
        },
        {
          text: "Yarn Type",
          value: "yarnType",
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
  async created(){
    await this.getYarnNumberList({page: 0, size: 10});
  },
  computed: {
    ...mapGetters({
      loading: "yarnNumber/loading",
      yarn_number_list: "yarnNumber/yarn_number_list",
      totalElements: "yarnNumber/totalElements",
      catalogGroupId: "catalogGroups/catalogGroupId",
    }),
  },
  methods: {
    ...mapActions({
      getYarnNumberList: "yarnNumber/getYarnNumberList",
      createYarnNumber: "yarnNumber/createYarnNumber",
      updateYarnNumber: "yarnNumber/updateYarnNumber",
      deleteYarnNumber: "yarnNumber/deleteYarnNumber",
      filterYarnNumberList: "yarnNumber/filterYarnNumberList",
    }),
    async size(val) {
      this.itemPrePage = val;
      await this.getYarnNumberList({
        page: 0,
        size: this.itemPrePage,
        id: this.create_yarn_number.catalogGroupId,
      });
    },
    async page(val) {
      this.current_page = val - 1;
      await this.getYarnNumberList({
        page: this.current_page,
        size: this.itemPrePage,
        id: this.create_yarn_number.catalogGroupId,
      });
    },
    async save() {
      const validate = this.$refs.new_form.validate();
      if (validate) {
        await this.createYarnNumber(this.create_yarn_number);
        this.$refs.new_form.reset();
        this.new_dialog = false;
      }
    },
    async update() {
      const edit_validate = this.$refs.edit_form.validate();
      const { id, name, yarnType } = this.edit_yarn_number;
      if (edit_validate) {
        const item = { id, name, yarnType};
        await this.updateYarnNumber(item);
        this.edit_dialog = false;
      }
    },
    async deleteYarn() {
      await this.deleteYarnNumber({
        id: this.delete_yarn_id,
        groupId: this.create_yarn_number.catalogGroupId,
      });
      this.delete_dialog = false;
    },
    editItem(item) {
      this.edit_yarn_number = { ...item };
      this.edit_dialog = true;
    },
    getDeleteItem(item) {
      this.delete_yarn_id = item.id;
      this.delete_dialog = true;
    },
    async resetBtn(){
      this.filters = {
        id: "",
        name: "",
        createdAt: "",
        updatedAt: "",
      };
      await this.getYarnNumberList({page: 0, size: 10});
    },
    async filterBtn(){
      await this.filterYarnNumberList(this.filters);
    },
  },
  mounted() {
    this.$store.commit("setPageTitle", "Catalogs");
  },
};
</script>

<style lang="sass" scoped></style>
