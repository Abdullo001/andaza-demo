<template>
  <div>
    <Breadcrumbs :maps="map_links" />
    <v-card elevation="0" class="mt-2 rounded-lg">
      <v-card-title>
        <div class="text-capitalize">
          {{ $t("sidebar.calculations") }}

          <v-chip
            color="#10BF41"
            class="text-capitalize ml-5 font-weight-bold"
            dark
          >
            {{ title }}
          </v-chip>
        </div>
        <v-spacer />
        <div>
          <v-btn outlined class="text-capitalize rounded-lg border-grey">
            <v-img src="/clear.svg" max-width="16" class="mr-2" />
            {{ $t("prefinances.child.clear") }}
          </v-btn>
          <v-btn outlined class="text-capitalize rounded-lg ml-4">
            <v-img src="/edit.svg" max-width="16" class="mr-2" />
            {{ $t("prefinances.child.edit") }}
          </v-btn>
        </div>
      </v-card-title>
      <v-divider />
      <v-card-text class="pb-0">
        <v-row>
          <v-col cols="12" lg="3" md="3">
            <div class="label">
              {{ $t("prefinances.child.prefinanceNumber") }}
            </div>
            <v-text-field
              outlined
              class="rounded-lg base"
              color="#7631FF"
              dense
              height="44"
              hide-details
              :placeholder="$t('prefinances.child.enterPrefinanceNumber')"
              v-model="addPreFinances.preFinanceNumber"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">{{ $t("prefinances.child.modelNumber") }}</div>
            <v-combobox
              v-model="addPreFinances.modelNumber"
              :items="modelData"
              :search-input.sync="modelSearch"
              item-text="modelNumber"
              item-value="modelNumber"
              outlined
              height="44"
              class="rounded-lg base"
              hide-details
              :return-object="true"
              color="#7631FF"
              dense
              :placeholder="$t('prefinances.child.enterModelNumber')"
              append-icon="mdi-chevron-down"
            >
              <template #append>
                <v-icon color="#7631FF">mdi-magnify</v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">{{ $t("prefinances.child.modelName") }}</div>
            <v-text-field
              outlined
              class="rounded-lg base"
              hide-details
              color="#7631FF"
              dense
              height="44"
              :placeholder="$t('prefinances.child.enterModelName')"
              v-model="addPreFinances.modelName"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">{{ $t("prefinances.child.partner") }}</div>
            <v-text-field
              v-model="addPreFinances.partner"
              outlined
              class="rounded-lg base"
              hide-details
              height="44"
              color="#7631FF"
              dense
              disabled
              :placeholder="$t('prefinances.child.partnerNamePhone')"
              append-icon=""
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">
              {{ $t("prefinances.child.primaryCurrency") }}
            </div>
            <v-select
              v-model="addPreFinances.primaryCurrency"
              :items="currency_enums"
              placeholder="Select primary Currency"
              outlined
              height="44"
              class="rounded-lg base"
              hide-details
              color="#7631FF"
              dense
              append-icon="mdi-chevron-down"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">
              {{ $t("prefinances.child.secondaryCurrency") }}
            </div>
            <v-select
              v-model="addPreFinances.secondaryCurrency"
              :items="currency_enums"
              placeholder="Select secondary currency"
              outlined
              height="44"
              class="rounded-lg base"
              hide-details
              dense
              color="#7631FF"
              append-icon="mdi-chevron-down"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">
              {{ $t("prefinances.child.tertiaryCurrency") }}
            </div>
            <v-select
              v-model="addPreFinances.tertiaryCurrency"
              :items="currency_enums"
              placeholder="Select tertiary currency"
              outlined
              height="44"
              class="rounded-lg base"
              hide-details
              color="#7631FF"
              dense
              append-icon="mdi-chevron-down"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">{{ $t("prefinances.child.primaryRare") }}</div>
            <v-text-field
              v-model="addPreFinances.primaryRate"
              outlined
              height="44"
              class="rounded-lg base"
              hide-details
              color="#7631FF"
              dense
              placeholder="0"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">{{ $t("prefinances.child.secondaryRate") }}</div>
            <v-text-field
              v-model="addPreFinances.secondaryRate"
              outlined
              height="44"
              class="rounded-lg base"
              hide-details
              color="#7631FF"
              dense
              placeholder="0"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">{{ $t("prefinances.child.tertiaryRate") }}</div>
            <v-text-field
              v-model="addPreFinances.tertiaryRate"
              outlined
              height="44"
              class="rounded-lg base"
              hide-details
              color="#7631FF"
              dense
              placeholder="0"
            />
          </v-col>

          <v-row class="ma-0">
            <v-col cols="12" lg="6" md="6">
              <div class="label">{{ $t("prefinances.child.description") }}</div>
              <v-textarea
                v-model="addPreFinances.description"
                outlined
                class="rounded-lg base"
                hide-details
                color="#7631FF"
                dense
                rows="4"
                :placeholder="$t('prefinances.child.enterDescription')"
              />
            </v-col>
            <v-col cols="12" lg="6" md="6" class="d-flex flex-wrap">
              <v-col cols="12" lg="6" class="pl-0 pt-0">
                <div class="label">{{ $t("prefinances.child.owner") }}</div>
                <v-text-field
                  v-model="addPreFinances.owner"
                  outlined
                  height="44"
                  class="rounded-lg base"
                  hide-details
                  color="#7631FF"
                  dense
                  :placeholder="$t('prefinances.child.enterOwner')"
                  disabled
                />
              </v-col>
              <v-col cols="12" lg="6" class="pt-0 pr-0">
                <div class="label">
                  {{ $t("prefinances.child.createdTime") }}
                </div>
                <v-text-field
                  v-model="addPreFinances.createdAt"
                  outlined
                  height="44"
                  class="rounded-lg base"
                  hide-details
                  color="#7631FF"
                  dense
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  disabled
                >
                  <template #append>
                    <v-img src="/date-icon.svg" />
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" class="pl-0 pt-0">
                <div class="label">
                  {{ $t("prefinances.child.modifiedPerson") }}
                </div>
                <v-text-field
                  v-model="addPreFinances.modifiedPerson"
                  outlined
                  height="44"
                  class="rounded-lg base"
                  hide-details
                  color="#7631FF"
                  dense
                  :placeholder="$t('prefinances.child.enterModifiedPerson')"
                  disabled
                />
              </v-col>
              <v-col cols="12" lg="6" class="pt-0 pr-0">
                <div class="label">
                  {{ $t("prefinances.child.updatedTime") }}
                </div>
                <v-text-field
                  v-model="addPreFinances.updatedAt"
                  outlined
                  height="44"
                  class="rounded-lg base"
                  hide-details
                  color="#7631FF"
                  dense
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  disabled
                >
                  <template #append>
                    <v-img src="/date-icon.svg" />
                  </template>
                </v-text-field>
              </v-col>
            </v-col>
          </v-row>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-6">
        <v-spacer />
        <v-btn
          color="#7631FF"
          dark
          class="text-capitalize rounded-lg font-weight-bold"
          style="min-width: 130px"
          @click="createNewPreFinance"
        >
          {{ btn }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mt-4 rounded-lg" elevation="0">
      <v-card-text>
        <v-tabs v-model="tab" background-color="transparent" color="#7631FF">
          <v-tab v-for="item in items" :key="item" class="text-capitalize">
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-data-table
              :headers="detailsHeaders"
              :items="detailsList"
              hide-default-footer
              :no-data-text="$t('noDataText')"
              :footer-props="{
                itemsPerPageText: this.$t('allDataTableText'),
              }"
            >
              <template #top>
                <v-divider />
                <v-toolbar elevation="0">
                  <v-toolbar-title
                    class="d-flex justify-space-between w-full align-center"
                  >
                    <div class="text-h6">Details</div>
                    <v-btn
                      class="text-capitalize font-weight-bold rounded-lg"
                      color="#7631FF"
                      min-width="170"
                      :dark="!!preFinanceId"
                      @click="new_details = true"
                      :disabled="!preFinanceId"
                    >
                      <v-icon class="mr-2">mdi-plus</v-icon>
                      {{ $t("prefinances.child.details") }}
                    </v-btn>
                  </v-toolbar-title>
                </v-toolbar>
              </template>
              <template #item.delete="{ item, index }">
                <div>
                  <v-tooltip
                    top
                    color="green"

                    class="pointer"
                    v-if="Object.keys(item).length > 2"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        color="green"
                        @click="editRow(item, index)"
                        
                      >
                        <v-img src="/edit-active.svg" max-width="22" />
                      </v-btn>
                      
                    </template>
                    <span class="text-capitalize">{{ $t("prefinances.child.edit") }}</span>
                  </v-tooltip>

                  <v-tooltip
                    top
                    class="pointer"
                    v-if="Object.keys(item).length > 2"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        color="red"
                       
                        @click="deleteRow(item, index)"
                      >
                        <v-img src="/delete.svg" max-width="27" />
                      </v-btn>
                    </template>
                    <span>{{ $t("prefinances.child.delete") }}</span>
                  </v-tooltip>
                </div>
              </template>
              <template #footer>
                <v-divider />
                <div class="d-flex justify-end mt-4 mr-2 text-body-1">
                  {{ $t("prefinances.child.totalPrice") }}: {{ totalPrice }} USD
                </div>
              </template>
            </v-data-table>
          </v-tab-item>
          <!--          TODO:  Documents tabs table  -->
          <v-tab-item>
            <v-data-table
              :headers="documentsHeaders"
              :items="allDocuments"
              hide-default-footer
              :no-data-text="$t('noDataText')"
              :footer-props="{
                itemsPerPageText: this.$t('allDataTableText'),
              }"
            >
              <template #top>
                <v-toolbar elevation="0">
                  <v-toolbar-title class="d-flex justify-space-between w-full">
                    <div class="text-h6">
                      {{ $t("prefinances.child.documents") }}
                    </div>
                  </v-toolbar-title>
                </v-toolbar>
              </template>
              <template #item.actions="{ item }">
                <v-tooltip top color="#7631FF">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
                      class="ml-2"
                      :href="item.filePath"
                      :download="`Document.${item.extension}`"
                      target="_blank"
                      v-on="on"
                      v-bind="attrs"
                      @click.stop
                    >
                      <v-img src="/download.svg" max-width="24" />
                    </v-btn>
                  </template>
                  <span>{{ $t("prefinances.child.download") }}</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>

    <!--    TODO: Photo of Models -->
    <v-row>
      <v-col cols="12" lg="5" class="mb-4">
        <v-card class="mt-4 rounded-lg" elevation="0" height="100%">
          <v-card-title>{{
            $t("prefinances.child.photosModels")
          }}</v-card-title>
          <v-divider />
          <v-card-text class="mt-4">
            <v-row>
              <v-col
                cols="12"
                lg="6"
                md="6"
                v-show="!modelImages.length"
                v-for="(item, idx) in 4"
                :key="`img_${idx}`"
              >
                <div class="default-data" v-ripple>
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
              <v-col
                cols="12"
                lg="6"
                md="6"
                v-for="(link, idx) in modelImages"
                :key="`images_${idx}`"
              >
                <div class="rounded-lg model-images overflow-hidden">
                  <v-img :src="link.filePath" />
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="7">
        <v-card class="mt-4 rounded-lg" elevation="0">
          <v-card-title>
            {{ $t("prefinances.child.calculations") }}
            <v-spacer />
            <v-btn outlined class="text-capitalize rounded-lg">
              <v-img src="/clear.svg" max-width="16" class="mr-2" />
              {{ $t("prefinances.child.clear") }}
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="calculation"
              :items-per-page="50"
              :no-data-text="$t('noDataText')"
              hide-default-footer
              :footer-props="{
                itemsPerPageText: this.$t('allDataTableText'),
              }"
            >
              <template #item.editable="{ item }">
                <v-text-field
                  solo
                  flat
                  v-model="item.editable"
                  placeholder="0.0"
                  hide-details
                  :background-color="!item.status ? '#F8F4FE' : 'transparent'"
                  :disabled="item.status"
                  :readonly="!(Object.keys(detailsList[0]).length > 3)"
                  class="pa-0 ma-0"
                />
              </template>
              <template #item.firstCurrency="{ item }">
                <v-text-field
                  solo
                  v-model="item.firstCurrency"
                  hide-details
                  placeholder="0.0"
                  flat
                  :background-color="
                    !item.usd_disabled && !item.readonly
                      ? '#F8F4FE'
                      : 'transparent'
                  "
                  :disabled="item.usd_disabled"
                  class="pa-0 ma-0"
                  :readonly="
                    !(Object.keys(detailsList[0]).length > 3) || item.readonly
                  "
                />
              </template>
            </v-data-table>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="#7631FF"
              class="text-capitalize rounded-lg"
              dark
              min-width="130"
              @click="saveCalculation"
            >
              {{
                $route.params.id === "crate"
                  ? $t("prefinances.child.create")
                  : $t("prefinances.child.save")
              }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog max-width="1000" v-model="new_details">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center w-full">
          <div class="text-capitalize">
            {{ $t("prefinances.child.newDetails") }}
          </div>
          <v-btn icon color="#7631FF" @click="new_details = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form v-model="details_form" ref="details_form">
            <v-row>
              <v-col cols="12" lg="4">
                <div class="label">
                  {{ $t("prefinances.child.expenseGroup") }}
                </div>
                <v-combobox
                  placeholder="Select expense group"
                  dense
                  append-icon="mdi-chevron-down"
                  :items="expenseGroup"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  item-text="name"
                  item-value="id"
                  v-model="details.expenseGroup"
                  validate-on-blur
                  :rules="[formRules.required]"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="label">{{ $t("prefinances.child.expense") }}</div>
                <v-select
                  placeholder="Select expense"
                  append-icon="mdi-chevron-down"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :items="expenseList"
                  v-model="details.expense"
                  validate-on-blur
                  :rules="[formRules.required]"
                  :disabled="expense_status"
                  item-value="id"
                  item-text="name"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="label">{{ $t("prefinances.child.quantity") }}</div>
                <v-text-field
                  placeholder="Enter quantity"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  v-model="details.quantity"
                  validate-on-blur
                  :rules="[formRules.required]"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="label">
                  {{ $t("prefinances.child.measurementunit") }}
                </div>
                <v-select
                  placeholder="Select measurement unit"
                  append-icon="mdi-chevron-down"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :items="measurementUnitList"
                  v-model="details.measurementUnit"
                  validate-on-blur
                  :rules="[formRules.required]"
                  item-text="name"
                  item-value="id"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="label">
                  {{ $t("prefinances.child.pricePerUnit") }}
                </div>
                <v-text-field
                  placeholder="Enter price per unit"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  v-model="details.pricePerUnit"
                  validate-on-blur
                  :rules="[formRules.required]"
                  color="#7631FF"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="py-4">
          <v-spacer />
          <v-btn
            color="amber"
            text
            class="text-capitalize font-weight-bold"
            @click="new_details = false"
            >{{ $t("prefinances.child.cancel") }}
          </v-btn>
          <v-btn
            color="#7631FF"
            text
            class="text-capitalize font-weight-bold"
            @click="createDetailsNew"
            >{{ $t("prefinances.child.save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog max-width="1000" v-model="update_details">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center w-full">
          <div class="text-capitalize">
            {{ $t("prefinances.child.editDetails") }}
          </div>
          <v-btn icon color="#7631FF" @click="cancelFunc">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form v-model="details_form" ref="details_form">
            <v-row>
              <v-col cols="12" lg="4">
                <v-combobox
                  :label="$t('prefinances.child.expenseGroup')"
                  filled
                  dense
                  append-icon="mdi-chevron-down"
                  :items="expenseGroup"
                  item-text="name"
                  item-value="id"
                  v-model="selectDetail.expenseGroup"
                  validate-on-blur
                  :rules="[formRules.required]"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <v-select
                  :label="$t('prefinances.child.expense')"
                  append-icon="mdi-chevron-down"
                  filled
                  dense
                  :items="expenseList"
                  v-model="selectDetail.expenseId"
                  validate-on-blur
                  :rules="[formRules.required]"
                  item-value="id"
                  item-text="name"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <v-text-field
                  :label="$t('prefinances.child.quantity')"
                  filled
                  dense
                  v-model="selectDetail.quantity"
                  validate-on-blur
                  :rules="[formRules.required]"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <v-select
                  :label="$t('prefinances.child.measurementunit')"
                  append-icon="mdi-chevron-down"
                  filled
                  dense
                  :items="measurementUnitList"
                  v-model="selectDetail.measurementUnitId"
                  validate-on-blur
                  :rules="[formRules.required]"
                  item-text="name"
                  item-value="id"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <v-text-field
                  :label="$t('prefinances.child.pricePerUnit')"
                  filled
                  dense
                  v-model="selectDetail.pricePerUnit"
                  validate-on-blur
                  :rules="[formRules.required]"
                  color="#7631FF"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="py-4">
          <v-spacer />
          <v-btn
            color="amber"
            text
            class="text-capitalize font-weight-bold"
            @click="cancelFunc"
            >{{ $t("prefinances.child.cancel") }}
          </v-btn>
          <v-btn
            color="#7631FF"
            text
            class="text-capitalize font-weight-bold"
            @click="updateDetailsFunc"
            >{{ $t("prefinances.child.updateBtn") }}
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
          >Delete detail row</v-card-title
        >
        <v-card-text> Are you sure you want to Delete detail row? </v-card-text>
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
            @click="deleteFunc"
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
import DefaultLayout from "@/layouts/default.vue";
import Breadcrumbs from "../../components/Breadcrumbs.vue";

export default {
  name: "CreatePreFinancePage",
  components: { Breadcrumbs, DefaultLayout },
  data() {
    return {
      hide_calc: true,
      new_details: false,
      delete_dialog: false,
      update_details: false,
      details_form: true,
      expenseGroupLists: [],
      details: {
        expenseGroup: "",
        expense: "",
        quantity: "",
        measurementUnit: "",
        pricePerUnit: "",
      },
      selectDetail: {},
      deletedDetailId: null,
      calculationVal: {
        discountPercent: "",
        extraExpensePercent: "",
        generalExpensePercent: "",
        givenPrice: "",
        givenPriceCurrency: "USD",
        lossPercent: "",
        overProductionPercent: "",
        preFinanceId: 0,
        targetProfitPercent: "",
      },
      map_links: [
        {
          text: this.$t("prefinances.child.home"),
          disabled: false,
          to: this.localePath("/"),
          icon: true,
        },
        {
          text: this.$t("prefinances.child.prefinances"),
          disabled: false,
          to: this.localePath("/prefinances"),
          icon: true,
        },
        {
          text: this.$t("prefinances.child.details"),
          disabled: true,
          to: this.localePath(`/user-management/${this.$route.params.id}`),
          icon: false,
        },
      ],
      name: "",
      addPreFinances: {
        id: "",
        modelName: "",
        preFinanceNumber: "",
        modelNumber: "",
        partnerId: "",
        partner: "",
        primaryCurrency: "",
        tertiaryCurrency: "",
        secondaryCurrency: "",
        description: "",
        owner: "",
        createdAt: "",
        modifiedPerson: "",
        updatedAt: "",
      },
      headers: [
        {
          text: this.$t("prefinances.child.name"),
          value: "name",
          align: "start",
          sortable: false,
        },
        { text: "", value: "editable", sortable: false, width: 110 },
        { text: "USD", value: "firstCurrency", sortable: false, width: 110 },
        { text: "UZS", value: "secondCurrency", sortable: false, width: 110 },
        { text: "RUB", value: "tertiaryCurrency", sortable: false, width: 110 },
      ],
      detailsHeaders: [
        {
          text: this.$t("prefinances.child.detailsHeaders.expenseGroup"),
          align: "start",
          sortable: false,
          value: "expenseGroup",
        },
        {
          text: this.$t("prefinances.child.detailsHeaders.expense"),
          value: "expense",
        },
        {
          text: this.$t("prefinances.child.detailsHeaders.expenseDescription"),
          value: "expenseGroupDescription",
        },
        {
          text: this.$t("prefinances.child.detailsHeaders.quantity"),
          value: "quantity",
        },
        {
          text: this.$t("prefinances.child.detailsHeaders.measurementUnit"),
          value: "measurementUnit",
        },
        {
          text: this.$t("prefinances.child.detailsHeaders.currency"),
          value: "currency",
        },
        {
          text: this.$t("prefinances.child.detailsHeaders.priceUnit"),
          value: "pricePerUnit",
        },
        {
          text: this.$t("prefinances.child.detailsHeaders.price"),
          value: "price",
        },
        { text: "", value: "delete", sortable: false },
      ],
      documentsHeaders: [
        {
          text: this.$t("prefinances.child.documentsHeaders.type"),
          align: "start",
          sortable: false,
          value: "extension",
        },
        {
          text: this.$t("prefinances.child.documentsHeaders.documentName"),
          value: "title",
        },
        {
          text: this.$t("prefinances.child.documentsHeaders.owner"),
          value: "createdBy",
        },
        {
          text: this.$t("prefinances.child.documentsHeaders.date"),
          value: "createdAt",
        },
        {
          text: this.$t("prefinances.child.documentsHeaders.actions"),
          value: "actions",
        },
      ],
      calculation: [
        {
          name: "Cost subtotal",
          editable: "-",
          firstCurrency: 0,
          secondCurrency: 0,
          tertiaryCurrency: 0,
          status: true,
          usd_disabled: true,
          readonly: false,
        },
        {
          name: "Overproduction %",
          editable: "",
          firstCurrency: "0.0",
          secondCurrency: "0.0",
          tertiaryCurrency: "0.0",
          status: false,
          usd_disabled: true,
          readonly: false,
        },
        {
          name: "Lost resource %",
          editable: "",
          firstCurrency: "0.0",
          secondCurrency: "0.0",
          tertiaryCurrency: "0.0",
          status: false,
          usd_disabled: true,
          readonly: false,
        },
        {
          name: "General expenses %",
          editable: "",
          firstCurrency: "0.0",
          secondCurrency: "0.0",
          tertiaryCurrency: "0.0",
          status: false,
          usd_disabled: true,
          readonly: false,
        },
        {
          name: "Extra expenses %",
          editable: "",
          firstCurrency: "0.0",
          secondCurrency: "0.0",
          tertiaryCurrency: "0.0",
          status: false,
          usd_disabled: true,
          readonly: false,
        },
        {
          name: "Cost price",
          editable: "-",
          firstCurrency: "0.0",
          secondCurrency: "0.0",
          tertiaryCurrency: "0.0",
          status: true,
          usd_disabled: true,
          readonly: false,
        },
        {
          name: "Target profit %",
          editable: "",
          firstCurrency: "0.0",
          secondCurrency: "0.0",
          tertiaryCurrency: "0.0",
          status: false,
          usd_disabled: true,
          readonly: false,
        },
        {
          name: "Client target price",
          editable: "-",
          firstCurrency: "",
          secondCurrency: "0.0",
          tertiaryCurrency: "0.0",
          status: true,
          usd_disabled: false,
          readonly: false,
        },
        {
          name: "Given price",
          editable: "-",
          firstCurrency: "",
          secondCurrency: "0.0",
          tertiaryCurrency: "0.0",
          status: true,
          usd_disabled: false,
          readonly: true,
        },
        {
          name: "Discount %",
          editable: "",
          firstCurrency: "0.0",
          secondCurrency: "0.0",
          tertiaryCurrency: "0.0",
          status: false,
          usd_disabled: true,
          readonly: false,
        },
        {
          name: "Price with discount",
          editable: "-",
          firstCurrency: "0.0",
          secondCurrency: "0.0",
          tertiaryCurrency: "0.0",
          status: true,
          usd_disabled: true,
          readonly: false,
        },
        {
          name: "Actual profit %",
          editable: "",
          firstCurrency: "0.0",
          secondCurrency: "0.0",
          tertiaryCurrency: "0.0",
          status: true,
          usd_disabled: true,
          readonly: false,
        },
        {
          name: "Actual profit amount",
          editable: "-",
          firstCurrency: "0.0",
          secondCurrency: "0.0",
          tertiaryCurrency: "0.0",
          status: true,
          usd_disabled: true,
          readonly: false,
        },
      ],
      tab: null,
      items: ["Details", "Documents"],
      count: 1,
      allDocuments: [{ type: "word" }],
      model_first: null,
      model_second: null,
      model_third: null,
      model_fourth: null,
      model_photo: {
        first: null,
        second: null,
        third: null,
        fourth: null,
      },
      currency_enums: ["USD", "UZS", "RUB"],
      expense_status: true,
      modelSearch: "",
    };
  },
  computed: {
    ...mapGetters({

      modelNames: "preFinance/modelNames",
      modelData: "preFinance/modelData",
      preFinanceId: "preFinance/preFinanceId",
      expenseGroup: "preFinance/expenseGroup",
      expenseList: "preFinance/expenseList",
      measurementUnitList: "preFinance/measurementUnit",
      detailsList: "preFinance/detailsList",
      totalPrice: "preFinance/totalPrice",
      modelImages: "modelPhoto/modelImages",
      documentsList: "documents/documentsList",
      onePreFinance: "preFinance/onePreFinance",
      selectedModelNumber: "preFinance/selectedModelNumber",

    }),
    title() {
      const id = this.$route.params.id;
      return id === "create" ? "Add" : "Edit";
    },
    btn() {
      const id = this.$route.params.id;
      return id === "create"
        ? this.$t("prefinances.child.save")
        : this.$t("update");
    },
  },
  watch: {
    onePreFinance(val) {
      if (Object.keys(val).length) {
        const data = JSON.parse(JSON.stringify(val));
        this.addPreFinances = data;
        this.addPreFinances.modelNames = data.modelName;
        this.$store.commit("preFinance/setPreFinanceId", data.id);
        this.addPreFinances.owner = data.createdBy;
        this.calculation[0].firstCurrency = this.detailsList[0].totalPrice;
        this.calculation[0].secondCurrency = (
          this.detailsList[0].totalPrice * val?.secondaryRate
        ).toFixed(2);
        this.calculation[0].tertiaryCurrency = (
          this.detailsList[0].totalPrice * val?.tertiaryRate
        ).toFixed(2);
        if (val?.overProductionPercent >= 0) {
          this.calculation[1].editable = val?.overProductionPercent;
          this.calculation[2].editable = val?.lossPercent;
          this.calculation[3].editable = val?.generalExpensePercent;
          this.calculation[4].editable = val?.extraExpensePercent;
          this.calculation[6].editable = val?.targetProfitPercent;
          this.calculation[7].firstCurrency = val?.targetProfitPercent;
          this.calculation[9].editable = val?.discountPercent;
        }
      }
    },
    documentsList(val) {
      this.allDocuments = [...val];
    },
    async modelData(val) {
      if (typeof val[0]?.id === "number") {
        const id = val[0]?.id;
        await this.getImages(id);
        await this.getDocuments({ modelId: id });
      }

      if (this.$route.params.id === "creating") {
        const data = { ...val[0] };
        this.addPreFinances = {
          id: data.id,
          modelName: data.name,
          preFinanceNumber: data.id,
          modelNumber: data.modelNumber,
          partnerId: data.partnerId,
          partner: data.partner,
          primaryCurrency: "",
          tertiaryCurrency: "",
          secondaryCurrency: "",
          description: data.description,
          owner: "",
          createdAt: data.createdAt,
          modifiedPerson: "",
          updatedAt: data.updatedAt,
        };
      } else if (this.$route.params.id === "create") {
        this.addPreFinances = {
          id: "",
          modelName: "",
          preFinanceNumber: "",
          modelNumber: "",
          partnerId: "",
          partner: "",
          primaryCurrency: "",
          tertiaryCurrency: "",
          secondaryCurrency: "",
          description: "",
          owner: "",
          createdAt: "",
          modifiedPerson: "",
          updatedAt: "",
        };
      }
    },
    "addPreFinances.modelNumber"(elem) {

      if (!(elem === "null" || typeof elem === "object")) {
        this.getModelName(elem);

      }
      const { modelNumber, name, partner, id } = this.addPreFinances.modelNumber;
      if (
        (Object.keys(this.addPreFinances.modelNumber).length > 3 &&
          modelNumber) ||
        name ||
        partner !== undefined
      ) {
        this.addPreFinances.partner = partner;
        this.addPreFinances.preFinanceNumber = id;
        this.addPreFinances.modelNames = name;
        this.addPreFinances.modelNumber = modelNumber;
      }
    },
    "details.expenseGroup": {
      async handler(val) {
        Object.keys(val).length > 1
          ? (this.expense_status = false)
          : (this.expense_status = true);

        await this.getExpenseList(val.id);
      },
      deep: true,
    },
    "selectDetail.expenseGroup": {
      async handler(val) {
        Object.keys(val).length > 1
          ? (this.expense_status = false)
          : (this.expense_status = true);

        await this.getExpenseList(val.id);
      },
      deep: true,
    },

    totalPrice(val) {
      let data = this.calculation[0];
      data.firstCurrency = +val.toFixed(2);
      data.secondCurrency = (+val * +this.addPreFinances.secondaryRate).toFixed(
        2
      );
      data.tertiaryCurrency = (
        +val * +this.addPreFinances.tertiaryRate
      ).toFixed(2);
    },
    calculation: {
      handler(val) {
        if (val[0].firstCurrency > 0) {
          const overproduction = val[1].editable;
          val[1].firstCurrency = (
            (this.totalPrice / 100) *
            overproduction
          ).toFixed(2);
          val[1].secondCurrency = (
            (this.calculation[0].secondCurrency / 100) *
            overproduction
          ).toFixed(2);
          val[1].tertiaryCurrency = (
            (this.calculation[0].tertiaryCurrency / 100) *
            overproduction
          ).toFixed(2);

          const lostResource = val[2].editable;
          val[2].firstCurrency = (
            (this.totalPrice / 100) *
            lostResource
          ).toFixed(2);
          val[2].secondCurrency = (
            (this.calculation[0].secondCurrency / 100) *
            lostResource
          ).toFixed(2);
          val[2].tertiaryCurrency = (
            (this.calculation[0].tertiaryCurrency / 100) *
            lostResource
          ).toFixed(2);

          const generalExpenses = val[3].editable;
          val[3].firstCurrency = (
            (this.totalPrice / 100) *
            generalExpenses
          ).toFixed(2);
          val[3].secondCurrency = (
            (this.calculation[0].secondCurrency / 100) *
            generalExpenses
          ).toFixed(2);
          val[3].tertiaryCurrency = (
            (this.calculation[0].tertiaryCurrency / 100) *
            generalExpenses
          ).toFixed(2);

          const extraExpenses = val[4].editable;
          val[4].firstCurrency = (
            (this.totalPrice / 100) *
            extraExpenses
          ).toFixed(2);
          val[4].secondCurrency = (
            (this.calculation[0].secondCurrency / 100) *
            extraExpenses
          ).toFixed(2);
          val[4].tertiaryCurrency = (
            (this.calculation[0].tertiaryCurrency / 100) *
            extraExpenses
          ).toFixed(2);

          val[5].firstCurrency = (
            +val[0].firstCurrency +
            +val[1].firstCurrency +
            +val[2].firstCurrency +
            +val[3].firstCurrency +
            +val[4].firstCurrency
          ).toFixed(2);
          val[5].secondCurrency = (
            +val[0].secondCurrency +
            +val[1].secondCurrency +
            +val[2].secondCurrency +
            +val[3].secondCurrency +
            +val[4].secondCurrency
          ).toFixed(2);

          val[5].tertiaryCurrency = (
            +val[0].tertiaryCurrency +
            +val[1].tertiaryCurrency +
            +val[2].tertiaryCurrency +
            +val[3].tertiaryCurrency +
            +val[4].tertiaryCurrency
          ).toFixed(2);

          const targetProfit = val[6].editable;
          val[6].firstCurrency = (
            (val[5].firstCurrency / 100) *
            targetProfit
          ).toFixed(2);
          val[6].secondCurrency = (
            val[6].firstCurrency * this.addPreFinances.secondaryRate
          ).toFixed(2);
          val[6].tertiaryCurrency = (
            val[6].firstCurrency * this.addPreFinances.tertiaryRate
          ).toFixed(2);

          val[7].secondCurrency = (
            val[7].firstCurrency * +this.addPreFinances.secondaryRate
          ).toFixed(2);
          val[7].tertiaryCurrency = (
            val[7].firstCurrency * +this.addPreFinances.tertiaryRate
          ).toFixed(2);

          val[8].firstCurrency = (
            +val[5].firstCurrency + +val[6].firstCurrency
          ).toFixed(2);
          val[8].secondCurrency = (
            val[8].firstCurrency * +this.addPreFinances.secondaryRate
          ).toFixed(2);
          val[8].tertiaryCurrency = (
            val[8].firstCurrency * +this.addPreFinances.tertiaryRate
          ).toFixed(2);

          const discount = val[9].editable;
          val[9].firstCurrency = (
            (val[8].firstCurrency / 100) *
            discount
          ).toFixed(2);
          val[9].secondCurrency = (
            val[9].firstCurrency * +this.addPreFinances.secondaryRate
          ).toFixed(2);
          val[9].tertiaryCurrency = (
            val[9].firstCurrency * +this.addPreFinances.tertiaryRate
          ).toFixed(2);

          val[10].firstCurrency = (
            val[8].firstCurrency - val[9].firstCurrency
          ).toFixed(2);
          val[10].secondCurrency = (
            val[8].secondCurrency - val[9].secondCurrency
          ).toFixed(2);
          val[10].tertiaryCurrency = (
            val[8].tertiaryCurrency - val[9].tertiaryCurrency
          ).toFixed(2);

          val[12].firstCurrency = (
            val[10].firstCurrency - val[5].firstCurrency
          ).toFixed(2);
          val[12].secondCurrency = (
            val[12].firstCurrency * +this.addPreFinances.secondaryRate
          ).toFixed(2);
          val[12].tertiaryCurrency = (
            val[12].firstCurrency * +this.addPreFinances.tertiaryRate
          ).toFixed(2);

          val[11].editable = (
            (val[12].firstCurrency / val[5].firstCurrency) *
            100
          ).toFixed(2);
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      createPreFinance: "preFinance/createPreFinance",
      getModelName: "preFinance/getModelName",
      saveCalculations: "preFinance/saveCalculation",
      getExpenseGroup: "preFinance/getExpenseGroup",
      getExpenseList: "preFinance/getExpenseList",
      getMeasurementUnit: "preFinance/getMeasurementUnit",
      createDetails: "preFinance/createDetails",
      getAllDetails: "preFinance/getAllDetails",
      getImages: "modelPhoto/getImages",
      getDocuments: "documents/getDocuments",
      getOnePreFinance: "preFinance/getOnePreFinance",
      getOneDetails: "preFinance/getOneDetails",
      deleteDetails: "preFinance/deleteDetails",
      updateDetails: "preFinance/updateDetails",
    }),
    saveCalculation() {
      const calcVal = this.calculation.filter(
        (el) => el.status === false || el.usd_disabled === false
      );
      calcVal.priceWithDiscountUSD = this.calculation[10].firstCurrency;
      calcVal.priceWithDiscountUZS = this.calculation[10].secondCurrency;
      calcVal.priceWithDiscountRUB = this.calculation[10].tertiaryCurrency;
      this.saveCalculations({
        data: calcVal,
        id: this.preFinanceId,
        currency: 2,
      });
    },

    async createDetailsNew() {
      const data = {
        quantity: this.details.quantity,
        pricePerUnit: this.details.pricePerUnit,
        measurementId: this.details.measurementUnit,
        expenseId: this.details.expense,
        preFinanceId: this.preFinanceId,
      };
      await this.createDetails(data);
      this.new_details = false;

      this.details.quantity = "";
      this.details.pricePerUnit = "";
      this.details.measurementUnit = "";
      this.details.expense = "";
      this.details.expenseGroup = "";
    },
    async createNewPreFinance() {
      await this.createPreFinance(this.addPreFinances);
    },
    deleteRow(item, index) {
      this.delete_dialog = true;
      this.deletedDetailId = item.id;
    },

    deleteFunc() {
      this.deleteDetails({ id: this.deletedDetailId });
      this.delete_dialog = false;
    },

    editRow(item, index) {
      this.update_details = true;
      this.details.expenseGroup = {
        id: item.expenseGroupId,
        name: item.expenseGroup,
      };
      this.selectDetail = { ...item };
    },

    updateDetailsFunc() {
      const data = {
        expenseId: this.selectDetail.expenseId,
        id: this.selectDetail.id,
        measurementId: this.selectDetail.measurementUnitId,
        preFinanceId: this.preFinanceId,
        pricePerUnit: this.selectDetail.pricePerUnit,
        quantity: this.selectDetail.quantity,
      };
      this.update_details = false;
      this.updateDetails(data);
      delete this.details.expenseGroup;
    },

    cancelFunc() {
      this.update_details = false;
      delete this.details.expenseGroup;
    },
  },
  mounted() {
    this.getExpenseGroup();
    this.getMeasurementUnit();
    const param = this.$route.params.id;

    if (param !== "create" && param !== "creating") {
      this.getOnePreFinance(param);
      this.getAllDetails(param);
    } else {
      this.$store.commit("modelPhoto/setModelImages", []);
      this.$store.commit("documents/setDocuments", []);
      this.$store.commit("preFinance/setDetailsList", [{ totalPrice: 0 }]);
      setTimeout(() => {
        this.calculation[0].secondCurrency = 0;
        this.calculation[0].tertiaryCurrency = 0;
      }, 1000);
    }

    if (!!this.selectedModelNumber) {
      this.getModelName(this.selectedModelNumber);
    }
  },
};
</script>

<style lang="scss" src="../../assets/abstracts/_prefinances.scss" scoped />
