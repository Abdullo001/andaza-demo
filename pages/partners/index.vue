<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form ref="filter_form">
        <v-row
          class="mx-0 px-0 mb-7 mt-4 pa-4 w-full"
          justify="start"
          align="center"
        >
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.phoneNumber"
              :label="$t('partners.child.pNumber')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.partnerName"
              :label="$t('partners.child.pName')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.partnerEmail"
              outlined
              hide-details
              dense
              :label="$t('partners.child.pEmail')"
              class="rounded-lg filter"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-select
              :items="statusEnums"
              v-model="filters.status"
              append-icon="mdi-chevron-down"
              outlined
              hide-details
              dense
              :label="$t('partners.child.status')"
              class="rounded-lg filter"
            />
          </v-col>
          <v-spacer/>
          <v-col cols="12" lg="2" md="2">
            <div class="d-flex justify-end">
              <v-btn
                width="140"
                outlined
                color="#544B99"
                elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click="resetFilters"
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
      :items-per-page="10"
      :items="items_list"
      :server-items-length="totalElements"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4 rounded-lg"
      @update:page="page"
      @update:items-per-page="size"
    >
      <template #top>
        <v-toolbar elevation="0" rounded>
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              {{ $t("partners.table.mainMenu") }}
            </div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="$router.push('/partners/add-partner')"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t("partners.table.mainMenu") }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>
      <template #item.brandName="{ item }">
        <div>
          <span v-for="(el,idx) in item.brandNames" :key="idx">
            {{ el }},
          </span>
        </div>
      </template>
      <template #item.status="{ item }">
        <div>
          <v-select
            @change="statusChange(item)"
            v-model="item.status"
            :items="statusEnums"
            dark
            append-icon="mdi-chevron-down"
            dense
            rounded
            class="text-caption mt-n2"
            flat
            hide-details
            :background-color="statusColor.color(item.status)"
          />
        </div>
      </template>
      <template #item.actions="{ item }">
        <div>
          <v-btn icon color="green" @click.stop="editItem(item)">
            <v-img src="/edit-active.svg" max-width="22"/>
          </v-btn>
          <v-btn icon color="red" @click.stop="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27"/>
          </v-btn>
          <v-tooltip top color="#544B99">
            <template v-slot:activator="{on, attrs}">
              <v-btn
                icon color="#544B99"
                v-on="on" v-bind="attrs"
                @click="viewDetails(item)"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </template>
            <span>Details</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" width="700">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("partners.dialog.addPartner") }}
          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" lazy-validation v-model="validate">
            <v-row>
              <v-col cols="12" md="7">
                <div class="label">{{  $t("partners.table.addBrandName")}}</div>
                <v-text-field
                  v-model="add_brand.name"
                  color="#544B99"
                  :placeholder=" $t('partners.table.addBrandName')"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="base rounded-lg mr-3"
                  @keydown.enter="addBrand"
                />
              </v-col>
              <v-col cols="12" md="5" class="d-flex align-end">
                <v-btn
                  @click="addBrand"
                  color="#544B99"
                  class="rounded-lg text-capitalize"
                  dark
                >
                  <v-icon>mdi-plus</v-icon>
                {{  $t("partners.table.addBrandName")}}
                </v-btn>
              </v-col>
              <v-col cols="12">
                <div class="label">{{  $t("partners.table.brandName")}}</div>
                <v-autocomplete
                  chips
                  multiple
                  v-model="create_partner.brandName"
                  :items="brandNameList"
                  deletable-chips
                  append-icon="mdi-chevron-down"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :placeholder=" $t('partners.table.brandName')"
                  :label=" $t('partners.table.brandName')"
                  single-line
                  color="#544B99"
                >
                  <template v-slot:selection="{item, attrs, on}">
                    <v-chip
                      v-bind="attrs"
                      v-on="on"
                      color="#544B99"
                      dark
                      close
                      @click:close="remove(item)"
                    >
                      {{ item }}
                    </v-chip>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.pName') }} <span style="color: red;">*</span></div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="create_partner.name"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :placeholder="$t('partners.dialog.pNameText')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.pType') }}</div>
                <v-select
                  v-model="create_partner.typeId"
                  :items="partner_type"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  append-icon="mdi-chevron-down"
                  dense
                  :placeholder="$t('partners.dialog.pTypeText')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.pNumber') }}</div>
                
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="create_partner.phoneNumber"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :placeholder="$t('partners.dialog.pNumber')"
                  color="#544B99"
                />
              </v-col>


              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.email') }}</div>
                <v-text-field
                  v-model="create_partner.email"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :placeholder="$t('partners.dialog.emailText')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Country</div>
                <v-combobox
                  v-model="create_partner.country"
                  :items="countryList"
                  :search-input.sync="countryIdSearch"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base d-flex align-center justify-center mb-4"
                  :return-object="true"
                  color="#544B99"
                  dense
                  placeholder="Enter model number"
                >
                  <template #append>
                    <v-icon class="d-inline-block" color="#544B99">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.addres') }}</div>
                <v-text-field
                  v-model="create_partner.address"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :placeholder="$t('partners.dialog.addresText')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.contractNumber') }}</div>
                <v-text-field
                  v-model="create_partner.contractNumber"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :placeholder="$t('partners.dialog.contractNumberText')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.created') }}</div>
                <el-date-picker
                  v-model="create_partner.contractDate"
                  style="width: 100%"
                  type="datetime"
                  :placeholder="$t('partners.dialog.created')"
                  :picker-options="pickerShortcuts"
                  value-format="timestamp"
                  class="base_picker"
                >
                </el-date-picker>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.status') }}</div>
                <v-select
                  v-model="create_partner.status "
                  :items="statusEnums"
                  append-icon="mdi-chevron-down"
                  placeholder="Select status"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                />
              </v-col>
              <v-col cols="12" md="6" v-if="create_partner.typeId!==3 && create_partner.typeId">
                <div class="label">Cooperation type</div>
                <v-select
                  :rules="[formRules.required]"
                  v-model="create_partner.cooperationType"
                  :items="cooperationType"
                  append-icon="mdi-chevron-down"
                  placeholder="Select cooperation type"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                />
              </v-col>
              <v-col cols="12">
                <div class="text-body-1 font-weight-medium mb-3">
                  {{ $t("partners.dialog.uploadContract") }}
                </div>
                <v-card style="border: #a5a7ad dashed 1px" elevation="0">
                  <v-card-title>
                    <input
                      ref="uploader"
                      class="d-none"
                      type="file"
                      @change="onChangeFile"
                    />
                    <v-btn
                      @click="clickImportFile"
                      elevation="0"
                      style="background-color: #f1ebfe; color: #544b99"
                      :disabled="image_list.length !== 0"
                      class="font-weight-bold mr-3 text-capitalize"
                    >
                      {{ $t("partners.dialog.uploadFiles") }}
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <div
                      v-for="(item, idx) in image_list"
                      :key="`imade_${idx}`"
                    >
                      <div class="d-flex justify-space-between align-center">
                        <p class="font-weight-bold">
                          <v-icon class="mr-3" color="green">
                            mdi-check
                          </v-icon>
                          {{ item.name }}
                        </p>
                        <p>
                          <v-btn icon @click="removeImage(item.size)">
                            <v-icon> mdi-close</v-icon>
                          </v-btn>
                        </p>
                      </div>
                      <v-divider/>
                    </div>
                  </v-card-text>
                </v-card>
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

            {{ $t('partners.dialog.cancel') }}


          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="save"
          >
            {{ $t("partners.dialog.create") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="700">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("partners.dialog.editPartner") }}
          </div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" lazy-validation v-model="edit_validate">
            <v-row>
              <v-col cols="12" md="7">
                <div class="label">Add Brand name</div>
                <v-text-field
                  v-model="edit_brand.name"
                  color="#544B99"
                  placeholder="Enter Brand name"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="base rounded-lg mr-3"
                />
              </v-col>
              <v-col cols="12" md="5" class="d-flex align-end">
                <v-btn
                  @click="editBrand"
                  color="#544B99"
                  class="rounded-lg text-capitalize"
                  dark
                >
                  <v-icon>mdi-plus</v-icon>
                  Add Brand name
                </v-btn>
              </v-col>
              <v-col cols="12">
                <div class="label">Brand names</div>
                <v-autocomplete
                  :rules="[formRules.required]"
                  chips
                  multiple
                  v-model="edit_partner.brandNames"
                  :items="brandNameList"
                  deletable-chips

                  append-icon="mdi-chevron-down"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  placeholder="Select brand name"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.pName') }} <span style="color: red;">*</span></div>
                <v-text-field
                  v-model="edit_partner.name"
                  :rules="[formRules.required]"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :placeholder="$t('partners.dialog.pNameText')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.pType') }}</div>
                <v-select
                  v-model="edit_partner.partnerTypeId"
                  :items="partner_type"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  append-icon="mdi-chevron-down"
                  dense
                  :placeholder="$t('partners.dialog.pTypeText')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.pNumber') }}</div>
                <v-text-field
                :rules="[formRules.required]"
                v-model="edit_partner.phoneNumber"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                :placeholder="$t('partners.dialog.pNumber')"
                color="#544B99"
              />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.email') }}</div>
                <v-text-field
                  v-model="edit_partner.email"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :rules="[formRules.required, formRules.email]"
                  :placeholder="$t('partners.dialog.emailText')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.addres') }}</div>
                <v-text-field
                  v-model="edit_partner.address"
                  outlined
                  :rules="[formRules.required]"
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :placeholder="$t('partners.dialog.addresText')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.contractNumber') }}</div>
                <v-text-field
                  v-model="edit_partner.contractNumber"
                  outlined
                  :rules="[formRules.required]"
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :placeholder="$t('partners.dialog.contractNumberText')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.created') }}</div>
                <el-date-picker
                  v-model="edit_partner.contractDate"
                  style="width: 100%;"
                  type="datetime"
                  :placeholder="$t('partners.dialog.created')"
                  :picker-options="pickerShortcuts"
                  class="base_picker"
                  value-format="timestamp"
                >
                </el-date-picker>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('partners.dialog.status') }}</div>
                <v-select
                  v-model="edit_partner.status"
                  :items="statusEnums"
                  append-icon="mdi-chevron-down"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                />
              </v-col>

              <v-col cols="12" md="6">
                <div class="label">Country</div>
                <v-combobox
                  v-model="edit_partner.country"
                  :items="countryList"
                  :search-input.sync="countryIdSearch"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base d-flex align-center justify-center mb-4"
                  :return-object="true"
                  color="#544B99"
                  dense
                  placeholder="Enter country"
                  prepend-icon=""
                >
                  <template #append>
                    <v-icon class="d-inline-block" color="#544B99">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
              </v-col>

              <v-col cols="12" md="6" v-if="edit_partner.partnerTypeId!==3 && edit_partner.partnerTypeId">
                <div class="label">Cooperation type</div>
                <v-select
                  :rules="[formRules.required]"
                  v-model="edit_partner.cooperationTypeId"
                  :items="cooperationType"
                  append-icon="mdi-chevron-down"
                  placeholder="Select cooperation type"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                />
              </v-col>
              <v-col cols="12">
                <div class="text-body-1 font-weight-medium mb-3 d-flex">
                  {{ $t("partners.dialog.uploadContract") }}

                  <v-tooltip top color="green">
                    <template #activator="{ on, attrs }">
                      <div
                        class="ml-5 pointer"
                        @click="downloadPDF(edit_partner.contractFilePath)"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-img src="/copy.svg" width="20"/>
                      </div>
                    </template>
                    <span>
                      {{ $t("partners.dialog.download") }}
                    </span>
                  </v-tooltip>
                </div>
                <v-card style="border: #a5a7ad dashed 1px" elevation="0">
                  <v-card-title>
                    <input
                      ref="uploader_edit"
                      class="d-none"
                      type="file"
                      @change="onChangeFileEdit"
                    />
                    <v-btn
                      @click="clickImportFileEdit"
                      elevation="0"
                      style="background-color: #f1ebfe; color: #544b99"
                      class="font-weight-bold mr-3 text-capitalize"
                    >
                      {{ $t("partners.dialog.uploadFiles") }}
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <div
                      v-for="(item, idx) in edit_image_list"
                      :key="`imade_${idx}`"
                    >
                      <div class="d-flex justify-space-between align-center">
                        <p class="font-weight-bold">
                          <v-icon class="mr-3" color="green">
                            mdi-check
                          </v-icon>
                          {{ item.name }}
                        </p>
                        <p>
                          <v-btn icon @click="removeImageEdit(item.size)">
                            <v-icon> mdi-close</v-icon>
                          </v-btn>
                        </p>
                      </div>
                      <v-divider/>
                    </div>
                  </v-card-text>
                </v-card>
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
            {{ $t("partners.dialog.cancel") }}
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
          {{ $t('partners.dialog.deleteDialog') }}
        </v-card-title>
        <v-card-text>
          {{ $t("partners.dialog.deleteText") }}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{ $t("partners.dialog.cancel") }}
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deletePartners"
          >
            {{ $t("partners.dialog.delete") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
  name: "PackageShapePage",
  components: {
    VuePhoneNumberInput: () => import('vue-phone-number-input')
  },
  data() {
    return {
      delete_partners_id: "",
      delete_dialog: false,
      edit_validate: true,
      validate: true,
      edit_dialog: false,
      new_dialog: false,
      itemPrePage: 10,
      current_page: 0,
      countryIdSearch: "",
      headers: [
        {text: this.$t('partners.table.id'), value: "id", sortable: false},
        {text: this.$t('partners.table.name'), value: "name", sortable: false},
        {text: this.$t('partners.table.brandName'), value: "brandName", sortable: false, width: 150},
        {text: this.$t('partners.table.cooperationType'), value: "cooperationType", sortable: false},
        {text: this.$t('partners.table.address'), value: "address", sortable: false},
        {text: this.$t('partners.table.email'), value: "email", sortable: false},
        {text: this.$t('partners.table.partnerType'), value: "partnerType", sortable: false},
        {text: this.$t('partners.table.pNumber'), value: "phoneNumber", sortable: false},
        {text: this.$t('partners.table.status'), value: "status", sortable: false, width: 120},
        {text: this.$t('partners.table.createdAt'), value: "createdAt", sortable: false},
        {text: this.$t('partners.table.actions'), value: "actions", align: "center", sortable: false, width: 108},
      ],
      items_list: [],
      image_list: [],
      add_brand: {
        name: "",
      },
      edit_brand: {
        name: "",
      },
      create_partner: {
        address: "",
        contractDate: "",
        email: "",
        name: "",
        contractNumber: "",
        status: "",
        typeId: "",
        phoneNumber: "",
        brandName: [],
        country: "",
        cooperationType: "",
      },
      brandNameList: [],
      edit_partner: {},
      edit_image_list: [],
      filters: {
        phoneNumber: "",
        name: "",
        status: "",
        email: "",
      },
      newPhone: '',
      countryCode: '',
      editPhone: ''
    };
  },
  watch: {
    partner_list(val) {
      this.items_list = JSON.parse(JSON.stringify(val));
    },
    partner_one_list(val) {
      const item = JSON.parse(JSON.stringify(val));
      this.edit_partner = {...item};
      this.countryIdSearch = item.country
    },

    "create_partner.brandName"(value) {
      this.brandNameList = value
    },
    "edit_partner.brandNames"(value) {
      this.brandNameList = value
    },
  },
  async created() {
    await this.getPartnerList({page: 0, size: 10});
    this.getCountryList({name: ""});
  },
  computed: {
    ...mapGetters({
      loading: "partners/loading",
      partner_list: "partners/partnerList",
      totalElements: "partners/totalElements",
      partner_type: "partners/partner_type",
      partner_one_list: "partners/partner_one_list",
      cooperationType: "partners/cooperationType",
      countryList: "partners/countryList",

    }),
  },
  methods: {
    ...mapActions({
      getPartnerList: "partners/getPartnerList",
      changeStatus: "partners/changeStatus",
      getPartnerType: "partners/getPartnerType",
      getPartnerOneList: "partners/getPartnerOneList",
      createPartnerList: "partners/createPartnerList",
      updatePartnerList: "partners/updatePartnerList",
      filterPartnerList: "partners/filterPartnerList",
      deletePartnerList: "partners/deletePartnerList",
      getCountryList: "partners/getCountryList",
      getCooperationType: "partners/getCooperationType",
      getPartnersType: "partners/getPartnersType",
    }),
    remove(item) {
      const index = this.brandNameList.indexOf(item)
      if (index >= 0) this.brandNameList.splice(index, 1)
    },
    downloadPDF(e) {
      const link = document.createElement("a");
      link.download = "file";
      link.href = e;
      link.click();
    },
    addBrand() {
      const item = {...this.add_brand};
      if (!!item.name) {
        this.create_partner.brandName.push(item.name);
        this.add_brand.name = "";
      }
    },

    editBrand() {
      if (this.edit_brand.name !== "") {
        const item = {...this.edit_brand};
        this.edit_partner.brandNames.push(item.name);
        this.edit_brand.name = "";
      }
    },
    removeImageEdit(e) {
      this.edit_image_list = this.edit_image_list.filter(
        (item) => item.size !== e
      );
    },
    removeImage(e) {
      this.image_list = this.image_list.filter((item) => item.size !== e);
    },
    onChangeFile(e) {
      const file = e.target.files[0];
      this.image_list.push(file);
    },
    onChangeFileEdit(e) {
      const file = e.target.files[0];
      this.edit_image_list.push(file);
    },
    clickImportFileEdit() {
      this.$refs.uploader_edit.click();
    },
    clickImportFile() {
      this.$refs.uploader.click();
    },
    async statusChange(val) {
      const item = {
        id: val.id,
        status: val.status,
      };
      await this.changeStatus(item);
    },
    async size(val) {
      this.itemPrePage = val;
      await this.getPartnerList({page: 0, size: this.itemPrePage});
    },
    async page(val) {
      this.current_page = val - 1;
      await this.getPartnerList({
        page: this.current_page,
        size: this.itemPrePage,
      });
    },
    newPhoneNumber(e) {
      this.newPhone = e.formattedNumber;
      this.countryCode = e.countryCallingCode
    },
    editPhoneNumber(e) {

      this.editPhone = e.formattedNumber;

    },
    async save() {
      const validate = this.$refs.new_form.validate();
      if (this.create_partner.name) {
        const {
          address,
          contractDate,
          email,
          name,
          contractNumber,
          status,
          typeId,
          brandName,
          country,
          cooperationType,
          phoneNumber

        } = this.create_partner;
        const formData = new FormData();
        formData.append("address", address?address:"");
        formData.append("contractDate", contractDate);
        if (this.image_list[0] !== undefined) {
          formData.append("contractFile", this.image_list[0]);
        }
        formData.append("email", email?email:"");
        formData.append("name", name);
        formData.append("contractNumber", contractNumber?contractNumber:"");
        formData.append("status", status?status:"");
        formData.append("typeId", typeId);
        formData.append("phoneNumber", phoneNumber);
        formData.append("brandNames", brandName);
        if(country?.id){
          formData.append("countryId", country.id);
        }else{
          formData.append("countryId", "");
        }
        if (cooperationType) {
          formData.append("cooperationTypeId", cooperationType);
        }
        await this.createPartnerList(formData);
        this.image_list = [];
        this.create_partner.contractDate = "";
        this.create_partner.brandName = [];
        this.$refs.new_form.reset();
        this.newPhone = '';
        this.countryCode = '';
        this.create_partner.phoneNumber = '';
        this.new_dialog = false;
      }
    },
    async update() {
      const edit_validate = this.$refs.edit_form.validate();
      if (this.edit_partner.name) {
        let {
          address,
          contractDate,
          contractNumber,
          email,
          id,
          name,
          status,
          partnerTypeId,
          countryId,
          country,
          brandNames,
          cooperationTypeId,
          phoneNumber,
        } = this.edit_partner;
        
        if(typeof country!=='string'){
          countryId=country.id
        }
        const formData = new FormData();
        formData.append("typeId", partnerTypeId);
        formData.append("address", address?address:"");
        formData.append("contractDate", contractDate?contractDate:"");
        if (this.image_list[0] !== undefined) {
          formData.append("contractFile", this.image_list[0]);
        }
        formData.append("email", email?email:"");
        formData.append("name", name);
        formData.append("contractNumber", contractNumber?contractNumber:"");
        formData.append("status", status?status:"");
        formData.append("phoneNumber", phoneNumber);
        formData.append("brandNames", brandNames);
        if(countryId){
          formData.append("countryId",countryId);
        }
        if (cooperationTypeId) {
          formData.append("cooperationTypeId", cooperationTypeId);
        }
        await this.updatePartnerList({data:formData,id});
        this.edit_dialog = false;
        this.edit_image_list = [];
      }
    },


    async deletePartners() {
      await this.deletePartnerList(this.delete_partners_id);
      this.delete_dialog = false;
    },
    async getDeleteItem(item) {
      this.delete_partners_id = item.id;
      this.delete_dialog = true;
    },
    async editItem(item) {
      await this.getPartnerOneList(item.id);
      this.edit_dialog = true;
    },
    async resetFilters() {
      this.$refs.filter_form.reset();
      await this.getPartnerList({page: 0, size: 10});
    },
    async filterData() {

      await this.getPartnerList({page:0,size:10,...this.filters});
    },
    viewDetails(item){
      this.$router.push(`/partners/${item.id}`)
      this.$store.commit("partners/setPartnerId",item.id)
    }
  },
  async mounted() {
    await this.$store.commit("setPageTitle", this.$t('sidebar.catalogs'));
    this.getPartnersType()
  },
};
</script>

<style lang="scss">
.el-input__inner::placeholder,
.el-input__icon,
.el-icon-time {
  color: #919191 !important;
}

.custom-picker2 {
  width: 100% !important;

  background: #f8f4fe;
  border-radius: 10px 10px 0 0 !important;

  &::placeholder {
    color: #cccccc;
  }

  > input.el-input__inner {
    border-radius: 10px 10px 0 0 !important;

    background: #f8f4fe !important;
    border: 0;
    border-bottom: 1px solid #777777 !important;
    width: 100% !important;
    height: 52px !important;

    &::placeholder {
      color: #9a979d !important;
    }
  }
}
</style>
