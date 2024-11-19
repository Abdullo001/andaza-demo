<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation>
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2">
            <v-text-field
              :placeholder="$t('bankDetails.table.bankName')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filterBanks.bankName"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2">
            <v-text-field
            :placeholder="$t('bankDetails.dialog.swift')"
            outlined
            class="rounded-lg filter"
            v-model.trim="filterBanks.swift"
            hide-details
            dense
            @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="3">
            <v-text-field
              :placeholder="$t('bankDetails.dialog.bankCode')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filterBanks.mfo"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-spacer />
          <v-col cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn
                width="140"
                outlined
                color="#544B99"
                elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click="resetFilters"
              >
                {{ $t("wastes.wastesWarehouse.reset") }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t("wastes.wastesWarehouse.search") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="bankDetailsList"
      :server-items-length="totalElements"
      :items-per-page="itemPrePage"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4 rounded-lg"
      @update:items-per-page="size"
      @update:page="page"
      :loading="loading"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              {{ $t("sidebar.bankDetails") }}
            </div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t("sidebar.bankDetails") }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider />
      </template>
      <template #item.actions="{ item }">
        <div>
          <v-btn icon color="green" @click="editBankDetail(item)">
            <v-img src="/edit-active.svg" max-width="22" />
          </v-btn>
          <v-btn icon color="red" @click="deleteBankDetails(item)">
            <v-img src="/delete.svg" max-width="27" />
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" width="700">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("sidebar.bankDetails") }}
          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form lazy-validation>
            <v-row>
              <v-col cols="12" lg="4">
                <div class="label">{{$t('bankDetails.dialog.bankCode')}}</div>
                <v-text-field
                  v-model="createBankDetails.mfo"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.dialog.bankCode')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="8">
                <div class="label">{{ $t('bankDetails.table.bankName') }}</div>
                <v-text-field
                  v-model="createBankDetails.name"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.table.bankName')"
                  color="#544B99"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="9">
                <div class="label">{{ $t('bankDetails.table.bankAddress') }}</div>
                <v-text-field
                  v-model="createBankDetails.address"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.table.bankAddress')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="3">
                <div class="label">{{ $t('bankDetails.dialog.swift') }}</div>
                <v-text-field
                  v-model="createBankDetails.swift"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.dialog.swift')"
                  color="#544B99"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">UZS</div>
                <v-text-field
                  v-model="createBankDetails.accountNumberUZS"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.table.accountNumber')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">USD</div>
                <v-text-field
                  v-model="createBankDetails.accountNumberUSD"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.table.accountNumber')"
                  color="#544B99"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">RUB</div>
                <v-text-field
                  v-model="createBankDetails.accountNumberRUB"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.table.accountNumber')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">EURO</div>
                <v-text-field
                  v-model="createBankDetails.accountNumberEUR"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.table.accountNumber')"
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
            {{$t('bankDetails.cancel')}}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="createBankDetail"
          >
          {{$t('bankDetails.save')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="update_dialog" width="700">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("bankDetails.dialog.updateBankDetails") }}
          </div>
          <v-btn icon color="#544B99" @click="update_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form lazy-validation>
            <v-row>
              <v-col cols="12" lg="4">
                <div class="label">{{$t('bankDetails.dialog.bankCode')}}</div>
                <v-text-field
                  v-model="editBankDetails.mfo"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.dialog.bankCode')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="8">
                <div class="label">{{$t('bankDetails.table.bankName')}}</div>
                <v-text-field
                  v-model="editBankDetails.name"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.table.bankName')"
                  color="#544B99"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="9">
                <div class="label">{{$t('bankDetails.table.bankAddress')}}</div>
                <v-text-field
                  v-model="editBankDetails.address"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.table.bankAddress')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="3">
                <div class="label">{{$t('bankDetails.dialog.swift')}}</div>
                <v-text-field
                  v-model="editBankDetails.swift"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.dialog.swift')"
                  color="#544B99"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">UZS</div>
                <v-text-field
                  v-model="editBankDetails.accountNumberUZS"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.table.accountNumber')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">USD</div>
                <v-text-field
                  v-model="editBankDetails.accountNumberUSD"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.table.accountNumber')"
                  color="#544B99"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">RUB</div>
                <v-text-field
                  v-model="editBankDetails.accountNumberRUB"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.table.accountNumber')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">EURO</div>
                <v-text-field
                  v-model="editBankDetails.accountNumberEUR"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('bankDetails.table.accountNumber')"
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
            @click="update_dialog = false"
          >
            {{$t('bankDetails.cancel')}}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="updateBankDetails"
          >
            {{$t('bankDetails.update')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <DeleteDialog v-bind="deleteData" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DeleteDialog from "../components/DeleteDialog.vue";

export default {
  name: "BankDetails",
  components: {
    DeleteDialog,
  },
  data() {
    return {
      headers: [
        {
          text: this.$t('bankDetails.table.bankName'),
          value: "name",
          sortable: false,
        },
        {
          text: this.$t('bankDetails.table.bankCode'),
          value: "mfo",
        },
        {
          text: this.$t('bankDetails.table.bankAddress'),
          value: "address",
          sortable: false,
        },
        {
          text: this.$t('bankDetails.table.created'),
          value: "createdAt",
          sortable: false,
        },
        {
          text: this.$t('bankDetails.table.createdBy'),
          value: "createdBy",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t('bankDetails.table.actions'),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      itemPrePage: 10,
      current_page: 0,
      new_dialog: false,
      update_dialog: false,
      createBankDetails: {
        mfo: "",
        name: "",
        address: "",
        swift: "",
        accountNumberUZS:"",
        accountNumberUSD:"",
        accountNumberRUB:"",
        accountNumberEUR:"",
      },
      editBankDetails: {
        mfo: "",
        name: "",
        address: "",
        swift: "",
        accountNumberUZS:"",
        accountNumberUSD:"",
        accountNumberRUB:"",
        accountNumberEUR:"",
      },
      updateBankId: null,
      deleteDialog: false,
      deleteBankId: null,
      filterBanks: {
        accountNumber: "",
        bankName: "",
        mfo: "",
        swift: "",
      },
    };
  },
  async created() {
    await this.getBankDetailsList({ page: 0, size: 10 });
  },
  computed: {
    ...mapGetters({
      bankDetailsList: "bankDetails/bankDetailsList",
      totalElements: "bankDetails/totalElements",
      loading: "bankDetails/loading",
    }),
    deleteData: {
      get() {
        return {
          deleteDialog: this.deleteDialog,
          deleteFunction: () => {
            this.deleteBank(this.deleteBankId);
            this.deleteDialog = false;
          },
          closeDialog: () => {
            this.deleteDialog = false;
          },
        };
      },
    },
  },
  methods: {
    ...mapActions({
      getBankDetailsList: "bankDetails/getBankDetailsList",
      createBank: "bankDetails/createBank",
      updateBank: "bankDetails/updateBank",
      deleteBank: "bankDetails/deleteBank",
    }),
    async size(val) {
      this.itemPrePage = val;
      await this.getBankDetailsList({ page: 0, size: this.itemPrePage });
    },
    async page(val) {
      this.current_page = val - 1;
      await this.getBankDetailsList({
        page: this.current_page,
        size: this.itemPrePage,
      });
    },
    async createBankDetail() {
      const data = { ...this.createBankDetails };

      await this.createBank(data);

      (this.new_dialog = false),
        (this.createBankDetails = {
          mfo: "",
          name: "",
          address: "",
          currency: "",
          swift: "",
          accountNumber: "",
        });
    },
    editBankDetail(item) {
      this.editBankDetails = { ...item };
      this.update_dialog = true;
      this.updateBankId = item.id;
    },
    async updateBankDetails() {
      const data = { ...this.editBankDetails };
      const id = this.updateBankId;

      await this.updateBank({ id, data });

      (this.update_dialog = false),
        (this.editBankDetails = {
          mfo: "",
          name: "",
          address: "",
          currency: "",
          swift: "",
          accountNumber: "",
        });
    },
    deleteBankDetails(item) {
      this.deleteDialog = true;
      this.deleteBankId = item.id;
    },
    async resetFilters() {
      this.filterBanks = {
        accountNumber: "",
        bankName: "",
        mfo: "",
        swift: "",
      };
      await this.getBankDetailsList({ page: 0, size: 10 });
    },
    async filterData() {
      await this.getBankDetailsList({ page: 0, size: 10, ...this.filterBanks });
    },
  },
};
</script>

<style lang="scss"></style>
