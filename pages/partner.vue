<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :label="$t('catalogsPartnerType.child.idPartnerType')"
              outlined
              class="rounded-lg"
              v-model.trim="filter_partner.id"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :label="$t('catalogsPartnerType.child.namePartnerType')"
              outlined
              class="rounded-lg"
              v-model.trim="filter_partner.name"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2" style="max-width: 240px">
            <el-date-picker
              v-model="filter_partner.createdAt"
              type="datetime"
              :placeholder="$t('catalogsPartnerType.child.created')"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <el-date-picker
              v-model="filter_partner.updatedAt"
              type="datetime"
              :placeholder="$t('catalogsPartnerType.child.updated')"
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
                color="#397CFD"
                elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                {{ $t("catalogsPartnerType.child.reset") }}
              </v-btn>
              <v-btn
                width="140"
                color="#397CFD"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t("catalogsPartnerType.child.search") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="partnerType"
      :items-per-page="itemPrePage"
      :options.sync="options"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      :loading="loading"
      class="mt-4 rounded-lg"
      @update:items-per-page="size"
      :server-items-length="partnerTotalElements"
      @update:page="page"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              {{ $t("catalogsPartnerType.dialog.partnerType") }}
            </div>
            <v-btn
              color="#7631FF"
              class="rounded-lg text-capitalize"
              dark
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t("catalogsPartnerType.dialog.addPartnerType") }}
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
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("catalogsPartnerType.dialog.addPartnerType") }}
          </div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-text-field
              filled
              v-model="create_partner.name"
              :label="$t('catalogsPartnerType.dialog.partnerType')"
              :placeholder="$t('catalogsPartnerType.dialog.enterPartnerType')"
              dense
              color="#7631FF"
            />
            <v-textarea
              filled
              v-model="create_partner.description"
              :label="$t('catalogsPartnerType.dialog.description')"
              :placeholder="
                $t('catalogsPartnerType.dialog.descriptionPlacholder')
              "
              dense
              color="#7631FF"
            />
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
            {{ $t("catalogsPartnerType.dialog.cancelBtn") }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="save"
          >
            {{ $t("catalogsPartnerType.dialog.createBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("catalogsPartnerType.dialog.editDialog") }}
          </div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-text-field
              filled
              v-model="edit_partner.name"
              :label="$t('catalogsPartnerType.dialog.partnerType')"
              :placeholder="$t('catalogsPartnerType.dialog.enterPartnerType')"
              dense
              color="#7631FF"
            />
            <v-textarea
              filled
              v-model="edit_partner.description"
              :label="$t('catalogsPartnerType.dialog.description')"
              :placeholder="
                $t('catalogsPartnerType.dialog.descriptionPlacholder')
              "
              dense
              color="#7631FF"
            />
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
            {{ $t("catalogsPartnerType.dialog.cancelBtn") }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="editPartnerType"
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
          {{ $t("catalogsPartnerType.dialog.deleteDialog") }}
        </v-card-title>
        <v-card-text>
          {{ $t("catalogsPartnerType.dialog.deleteText") }}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{ $t("catalogsPartnerType.dialog.cancelBtn") }}
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deletePartner"
          >
            {{ $t("catalogsPartnerType.dialog.deleteBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      sortBy: "",
      sortDesc: "",
      edit_dialog: false,
      delete_dialog: false,
      new_dialog: false,
      valid_search: true,
      headers: [
        {
          text: this.$t("catalogsPartnerType.table.id"),
          value: "id",
          align: "start",
          sortable: false,
          width: "100",
        },
        { text: this.$t("catalogsPartnerType.table.name"), value: "name" },
        {
          text: this.$t("catalogsPartnerType.table.description"),
          value: "description",
        },
        {
          text: this.$t("catalogsPartnerType.table.createdAt"),
          value: "createdAt",
        },
        {
          text: this.$t("catalogsPartnerType.table.updatedAt"),
          value: "updatedAt",
        },
        {
          text: this.$t("catalogsPartnerType.table.actions"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      itemPrePage: 20,
      current_page: 0,
      create_partner: {
        name: "",
        description: "",
      },
      edit_partner: {
        name: "",
        description: "",
      },
      options: {},
      filter_partner: {
        description: "",
        createdAt: "",
        updatedAt: "",
        name: "",
        id: "",
      },
      delete_partner: {},
    };
  },
  watch: {
    async "options.sortBy"(elem) {
      if (elem[0] !== undefined) {
        if (this.options.sortDesc[0] !== undefined) {
          const items = {
            sortDesc: this.options.sortDesc[0],
            sortBy: elem[0],
          };
          await this.sortPartnerType({
            page: this.current_page,
            size: this.itemPrePage,
            data: items,
          });
        }
      }
    },
  },
  async created() {
    await this.$store.dispatch("partnerType/getPartnerType", {
      page: this.current_page,
      size: this.itemPrePage,
    });
  },
  computed: {
    ...mapGetters({
      loading: "partnerType/loading",
      partnerType: "partnerType/partnerType",
      partnerTotalElements: "partnerType/partnerTotalElements",
    }),
  },
  methods: {
    ...mapActions({
      getPartnerType: "partnerType/getPartnerType",
      createPartnerType: "partnerType/createPartnerType",
      deletePartnerType: "partnerType/deletePartnerType",
      updatePartnerType: "partnerType/updatePartnerType",
      filterPartnerType: "partnerType/filterPartnerType",
      sortPartnerType: "partnerType/sortPartnerType",
    }),
    async page(value) {
      this.current_page = value;
      await this.getPartnerType({ page: 0, size: this.current_page });
    },
    async size(value) {
      this.itemPrePage = value;
      await this.getPartnerType({
        page: this.current_page,
        size: this.itemPrePage,
      });
    },
    async save() {
      await this.createPartnerType({
        page: this.current_page,
        size: this.itemPrePage,
        data: this.create_partner,
      });
      this.create_partner = {
        name: "",
        description: "",
      };
      this.new_dialog = false;
    },
    getDeleteItem(item) {
      this.delete_partner = { ...item };
      this.delete_dialog = true;
    },
    async deletePartner() {
      const id = this.delete_partner.id;
      await this.deletePartnerType({
        id: id,
        page: this.current_page,
        size: this.itemPrePage,
      });
      this.delete_dialog = false;
    },
    async editPartnerType() {
      await this.updatePartnerType({
        page: this.current_page,
        size: this.itemPrePage,
        data: this.edit_partner,
      });
      this.edit_dialog = false;
    },
    editItem(item) {
      this.edit_partner = { ...item };
      this.edit_dialog = true;
    },
    async resetFilters() {
      await this.$store.dispatch("partnerType/getPartnerType", {
        page: 0,
        size: 10,
      });
      this.filter_partner = {
        description: "",
        createdAt: "",
        updatedAt: "",
        name: "",
        id: "",
      };
    },
    async filterData() {
      await this.filterPartnerType(this.filter_partner);
    },
  },
  mounted() {
    this.$store.commit("setPageTitle", this.$t("sidebar.catalogs"));
  }
}
</script>

<style lang="scss">
.el-input__inner::placeholder,
.el-input__icon,
.el-icon-time {
  color: #919191 !important;
}
</style>
