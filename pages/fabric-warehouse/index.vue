<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :label="$t('fabricWarehouse.sipNumber')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.sipNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :label="$t('fabricWarehouse.batchNumber')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.batchNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
               :label="$t('fabricWarehouse.orderNumber')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.orderNumber"
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
                @click.stop="resetFilters"
              >
              {{$t('fabricWarehouse.reset') }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
               {{$t('fabricWarehouse.search') }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="current_list"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      show-expand
      @update:page="page"
      @update:items-per-page="size"
      :server-items-length="totalElements"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      @item-expanded="loadDetails"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div> {{$t('fabricWarehouse.fabricWarehouse') }}</div>
            <div>
              <v-btn
                color="#544B99"
                outlined
                class="text-capitalize rounded-lg mr-2"
                @click="$router.push(localePath(`/fabric-warehouse/fabric-stock`))"
              >
                {{$t('fabricWarehouse.fabricStock') }}
              </v-btn>
              <v-btn
                color="#544B99"
                dark
                class="text-capitalize rounded-lg"
                @click="addArrivedFabric"
              >
                <v-icon>mdi-plus</v-icon>
                {{$t('fabricWarehouse.addArrivedFabric') }}
              </v-btn>
            </div>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.production="{ item }">
        <div class="d-flex">
          <v-tooltip
            top
            color="#544B99"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="#544B99"
                @click="spendFunc(item)"
              >
                <v-img src="/spend-icon.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">Spend</span>
          </v-tooltip>

          <v-tooltip
            top
            color="#544B99"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="#544B99"
                @click="getHistory(item)"
              >
                <v-img src="/history.svg" max-width="20" />
              </v-btn>
            </template>
            <span class="text-capitalize">History</span>
          </v-tooltip>

          <v-tooltip
            top
            color="#544B99"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="#544B99"
                @click="workshopFunc(item)"
              >
                <v-img src="/cut-icon.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">Workshop</span>
          </v-tooltip>

          <v-tooltip
            top
            color="#544B99"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="#544B99"
                @click="subcontractorFunc(item)"
              >
                <v-img src="/bag-icon.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">subcontractor</span>
          </v-tooltip>
          <v-tooltip
            top
            color="#544B99"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="#544B99"
                @click="tansferStock(item)"
              >
                <v-img src="/stock-icon.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">To Stock</span>
          </v-tooltip>
        </div>
      </template>
      <template #item.actions="{ item }">
        <div class="d-flex">
          <v-btn icon color="green" @click="editItem(item)">
            <v-img src="/edit-active.svg" max-width="22" />
          </v-btn>
          <v-btn icon color="red" @click="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27" />
          </v-btn>
        </div>
      </template>
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col>
                  <div class="body-1 mb-3">
                    Fabric width in order:
                    <span class="font-weight-bold ml-2">
                      {{ item?.fabricWidthInOrder }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Fabric width in fact:
                    <span class="font-weight-bold ml-2">
                      {{ item?.fabricWidthInFact }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Density(gsm) in order gr/m2:
                    <span class="font-weight-bold ml-2">
                      {{ item?.densityInOrder ?? "No" }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Density(gsm) in fact gr/m2:
                    <span class="font-weight-bold ml-2">
                      {{ item?.densityInFact ?? "No" }}</span
                    >
                  </div>
                </v-col>
                <v-col>
                  <div class="body-1 mb-3">
                    Actual fabric quantity:
                    <span class="font-weight-bold ml-2">
                      {{ item?.actualFabricQuantity }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Fabric received Gross weight:
                    <span class="font-weight-bold ml-2">
                      {{ item?.factReceivedGrossWeight }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Actual fabric price:
                    <span class="font-weight-bold ml-2">
                      {{ item?.actualUnitPrice }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Ordered quantity:
                    <span class="font-weight-bold ml-2">
                      {{ item?.orderedQuantity }}</span
                    >
                  </div>
                </v-col>
                <v-col>
                  <div class="body-1 mb-3">
                    Created at:
                    <span class="font-weight-bold ml-2">
                      {{ item?.updatedAt }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Created by:
                    <span class="font-weight-bold ml-2">
                      {{ item?.updatedBy }}</span
                    >
                  </div>
                  <div class="body-1 mb-3">
                    Total price:
                    <span class="font-weight-bold ml-2">
                      {{ item?.actualTotalPrice }}</span
                    >
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
         {{$t('fabricWarehouse.newArrivedFabric') }}
          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" v-model="new_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label"> {{$t('fabricWarehouse.sipNumber') }}</div>
                <v-combobox
                  v-model="arrivedFabric.fabricOrderId"
                  :items="sipNumbers"
                  :search-input.sync="sipNumberSearch"
                  item-text="sipNumber"
                  item-value="fabricOrderId"
                  validate-on-blur
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base d-flex align-center justify-center mr-2"
                  :return-object="true"
                  dense
                  :placeholder="$t('fabricWarehouse.sipNumber')"
                  prepend-icon=""
                >
                  <template #append>
                    <v-icon class="d-inline-block" color="#544B99">
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('fabricWarehouse.batchNumber') }}</div>
                <v-text-field
                  v-model="arrivedFabric.batchNumber"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  :placeholder="$t('fabricWarehouse.batchNumber')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('fabricWarehouse.fabricWidth') }}</div>
                <v-text-field
                  v-model="arrivedFabric.fabricWidthInFact"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                :placeholder=" $t('fabricWarehouse.fabricWidth') "
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{  $t('fabricWarehouse.density')  }}</div>
                <v-text-field
                  v-model="arrivedFabric.densityInFact"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  height="44"
                  dense
                  color="#544B99"
                  :placeholder="$t('fabricWarehouse.density')"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('fabricWarehouse.receivedGrossWeight') }}</div>
                <v-text-field
                  v-model="arrivedFabric.factReceivedGrossWeight"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  :placeholder="$t('fabricWarehouse.receivedGrossWeight')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('fabricWarehouse.receivedNettoWeight') }}</div>
                <v-text-field
                  v-model="arrivedFabric.factReceivedNettoWeight"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  :placeholder="$t('fabricWarehouse.receivedNettoWeight')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('fabricWarehouse.actualUnitPrice') }}</div>
                <v-text-field
                  v-model="arrivedFabric.actualUnitPrice"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  :placeholder=" $t('fabricWarehouse.actualUnitPrice') "
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
           {{  $t('centralWarehouse.cancel') }}
          </v-btn>
          <v-btn
            v-if="title === 'New'"
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="saveArrivedFabric"
          >
            {{  $t('centralWarehouse.save') }}
          </v-btn>
          <v-btn
            v-else
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="editArrivedFabric"
          >
            {{ $t('userManagement.child.edit') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="spend_dialog" width="350">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">{{ $t('spending.spendingFabric') }}</div>
          <v-btn icon color="#544B99" @click="spend_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="spend_form" v-model="spend_validate" lazy-validation>
            <v-row>
              <v-col cols="12">
                <div class="label">{{ $t('spending.toSipNo') }}</div>
                <!-- <v-select
                  append-icon="mdi-chevron-down"
                  v-model="spendingFabric.idTo"
                  :rules="[formRules.required]"
                  :items="toSipNumbers"
                  item-text="sipNumber"
                  item-value="id"
                  hide-details
                  color="#544B99"
                  class="base rounded-lg"
                  rounded
                  outlined
                  dense
                  placeholder="Select Sip №"
                /> -->
                <v-combobox
                  v-model="spendingFabric.idTo"
                  :items="toSipNumbers"
                  item-text="sipNumber"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :return-object="true"
                  color="#544B99"
                  dense
                  :placeholder="$t('spending.toSipNo')"
                  append-icon="mdi-chevron-down"
                  :rules="[formRules.required]"
                  validate-on-blur
                  >
                  <template #append>
                    <v-icon color="#544B99">mdi-magnify</v-icon>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12">
                <div class="label">{{ $t('spending.toBatchNo') }}</div>
                <!-- <v-select
                  append-icon="mdi-chevron-down"
                  v-model="spendingFabric.idTo"
                  :rules="[formRules.required]"
                  :items="toSipNumbers"
                  item-text="batchNumber"
                  item-value="id"
                  hide-details
                  class="base rounded-lg"
                  rounded
                  color="#544B99"
                  outlined
                  dense
                  placeholder="Batch №"
                /> -->
                <v-combobox
                  v-model="subcontractor.idTo"
                  :items="toSipNumbers"
                  item-text="batchNumber"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :return-object="true"
                  color="#544B99"
                  dense
                  :placeholder="$t('spending.toBatchNo')"
                  append-icon="mdi-chevron-down"
                  :rules="[formRules.required]"
                  validate-on-blur
                  >
                  <template #append>
                    <v-icon color="#544B99">mdi-magnify</v-icon>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('spending.spendingQuantity')}}</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="spendingFabric.spendingQuantity"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  :placeholder="$t('spending.spendingQuantity')"
                  color="#544B99"
                  suffix="kg"
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
            width="130"
            @click="spend_dialog = false"
          >
           {{$t('userManagement.dialog.cancel')}}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="saveSpending"
          >
           {{$t('userManagement.dialog.save')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="workshop_dialog" width="450">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
           {{$t('spending.fabricGivingToOwnWorkshop')}}
          </div>
          <v-btn icon color="#544B99" @click="workshop_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form
            ref="workshop_form"
            v-model="workshop_validate"
            lazy-validation
          >
            <v-row>
              <v-col cols="12">
                <div class="label">{{$t('readyWarehouse.id.modelNo')}}</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="workshop.modelNumber"
                  :rules="[formRules.required]"
                  :items="modelNumbers"
                  hide-details
                  color="#544B99"
                  class="base rounded-lg"
                  rounded
                  outlined
                  dense
                  :placeholder="$t('readyWarehouse.id.modelNo')"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">Body parts</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="workshop.modelPartId"
                  :rules="[formRules.required]"
                  :items="modelParts"
                  item-text="modelPartName"
                  item-value="modelPartId"
                  hide-details
                  color="#544B99"
                  class="base rounded-lg"
                  rounded
                  outlined
                  dense
                  placeholder="Select body part"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('spending.givingFabricQuantity')}}</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="workshop.quantity"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  :placeholder="$t('spending.givingFabricQuantity')"
                  color="#544B99"
                  :suffix="workshop.measurement"
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
            width="130"
            @click="workshop_dialog = false"
          >
           {{$t('userManagement.dialog.cancel')}}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="saveWorkshop"
          >
        {{$t('userManagement.dialog.save')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="subcontractor_dialog" width="450">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
           {{$t('spending.fabricGivingToSubcontractor')}}
          </div>
          <v-btn icon color="#544B99" @click="subcontractor_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form
            ref="subcontractor_form"
            v-model="subcontractor_validate"
            lazy-validation
          >
            <v-row>
              <v-col cols="12">
                <div class="label">{{$t('prefinances.child.partner')}}</div>
                <v-combobox
                  v-model="subcontractor.partnerId"
                  :items="partnerList"
                  :search-input.sync="partnerName"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :return-object="true"
                  color="#544B99"
                  dense
                  :placeholder="$t('prefinances.child.partner')"
                  append-icon="mdi-chevron-down"
                  :rules="[formRules.required]"
                  validate-on-blur
                  >
                  <template #append>
                    <v-icon color="#544B99">mdi-magnify</v-icon>
                  </template>
                </v-combobox>
              </v-col>

              <v-col cols="12">
                <div class="label">{{ $t('readyWarehouse.id.modelNo') }}</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="subcontractor.modelNumber"
                  :items="modelNumbers"
                  :rules="[formRules.required]"
                  hide-details
                  color="#544B99"
                  class="base rounded-lg"
                  rounded
                  outlined
                  dense
                  :placeholder=" $t('readyWarehouse.id.modelNo')"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">Body parts</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="subcontractor.modelPartId"
                  :rules="[formRules.required]"
                  :items="modelParts"
                  item-text="modelPartName"
                  item-value="modelPartId"
                  hide-details
                  color="#544B99"
                  class="base rounded-lg"
                  rounded
                  outlined
                  dense
                  placeholder="Select body part"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{ $t('spending.givingFabricQuantity')}}</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="subcontractor.quantity"
                  outlined
                  hide-details
                  dense
                  class="rounded-lg base"
                  :placeholder="$t('spending.givingFabricQuantity')"
                  color="#544B99"
                  :suffix="subcontractor.measurement"
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
            width="130"
            @click="subcontractor_dialog = false"
          >
           {{$t('userManagement.dialog.cancel')}}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="saveSubcontractor"
          >
          {{$t('userManagement.dialog.save')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="history_dialog" max-width="1000">
      <v-card flat>
        <v-card-title>
          <div class="title">{{ $t('spending.history') }}</div>
          <v-spacer />
          <v-btn icon @click="history_dialog = false" color="#544B99">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="historyHeaders"
            :items="historyList"
            hide-default-footer
            class="mt-4 rounded-lg"
            style="border: 1px solid #e9eaeb"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40" />
        </div>
        <v-card-title class="d-flex justify-center"
          > {{ $t('spending.deleteFabricWarehouseRow') }}</v-card-title
        >
        <v-card-text>
         {{ $t('spending.areYouSureYouWantToDeleteFabricWarehouseRow') }}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{$t('userManagement.dialog.cancel')}}
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
            {{$t('userManagement.dialog.delete')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <WarningDialog :dialogState="toStockState" :voidFunction="transferFunc" :dialogCloser="dialogCloser" :dialogText="'Do you really want to stock this fabric?'"/>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import WarningDialog from "@/components/WarningDialog.vue";

export default {
  components:{
    WarningDialog,
  },
  data() {
    return {
      toStockState:false,
      sipNumberSearch:"",
      headers: [
        { text: this.$t('fabricWarehouse.sipNumber'), value: "sipNumber", sortable: false },
        { text:this.$t('fabricWarehouse.batchNumber'), value: "batchNumber", sortable: false },
        { text: this.$t('fabricWarehouse.orderNumber'), value: "orderNumber", sortable: false },
        { text: this.$t('prefinances.child.modelNumber'), value: "modelNumber", sortable: false },
        {
          text: this.$t('fabricWarehouse.fabricSpecification'),
          value: "fabricSpecification",
          sortable: false,
          width: 200,
        },
        { text: this.$t('fabricWarehouse.color'), value: "color", sortable: false },
        {
          text: this.$t('fabricWarehouse.receivedNettoWeight'),
          value: "factReceivedNettoWeight",
          sortable: false,
        },
        { text:this.$t('fabricWarehouse.givenToCutting'), value: "givenToCutting", sortable: false },
        {
          text: this.$t('fabricWarehouse.remainingQuantity'),
          value: "remainingQuantity",
          sortable: false,
        },
        {
          text: this.$t('fabricWarehouse.production'),
          value: "production",
          sortable: false,
          align: "center",
        },
        { text: this.$t('fabricWarehouse.action'), value: "actions", sortable: false, align: "center" },
        { text: "", value: "data-table-expand" },
      ],

      historyHeaders: [
        { text: this.$t('spending.date'), value: "createdAt", sortable: false },
        { text: this.$t('spending.doneBy'), value: "createdBy", sortable: false },
        {
          text: this.$t('spending.warehouseOperations'),
          value: "operationType",
          sortable: false,
        },
        { text: this.$t('spending.operationId'), value: "operationId", sortable: false },
        { text: this.$t('spending.quantity'), value: "quantity", sortable: false },
      ],

      expanded: [],
      singleExpand: true,
      valid_search: "",
      new_validate: true,
      workshop_validate: true,
      subcontractor_validate: true,
      spend_validate: true,
      new_dialog: false,
      delete_dialog: false,
      spend_dialog: false,
      workshop_dialog: false,
      subcontractor_dialog: false,

      history_dialog: false,

      title: "",
      arrivedFabric: {},
      spendingFabric: {
        batchNumber: null,
        idFrom: null,
        idTo: null,
        spendingQuantity: null,
      },

      workshop: {
        modelNumber: null,
        quantity: null,
        measurement: null,
        fabricWarehouseId: null,
      },

      subcontractor: {
        fabricWarehouseId: null,
        partnerId: null,
        modelNumber: null,
        quantity: null,
        measurement: null,
      },

      filters: {
        sipNumber: null,
        batchNumber: null,
        orderNumber: null,
      },

      deletedId: null,
      modelNumbers: [],
      itemPrePage: 10,
      current_page: 0,

      current_list: [],
      partnerName: "",
    };
  },

  computed: {
    ...mapGetters({
      fabricWarehouseList: "fabricWarehouse/fabricWarehouseList",
      sipNumbers: "fabricsList/fabricsList",
      toSipNumbers: "fabricWarehouse/toSipNumbers",
      totalElements: "fabricWarehouse/totalElements",
      historyList: "fabricWarehouse/historyList",
      modelParts: "fabricWarehouse/modelParts",
      partnerList: "partners/partnerList",
    }),
  },

  watch: {
    "workshop.modelNumber"(val){
      this.getModelPartsList(val)
    },
    "subcontractor.modelNumber"(val){
      this.getModelPartsList(val)
    },
    partnerName(val) {
      this.getPartnerList({page:0, size:10,partnerName:val});
    },
    sipNumberSearch(val){
      this.getSipNumbers({page:0,size:10,sipNumber:val});
    },
    fabricWarehouseList(val) {
      this.current_list = JSON.parse(JSON.stringify(val));

      this.current_list.forEach((item,idx)=>{
        item.modelNumber=val[idx].modelNumber.split("$")
      })

    },

    new_dialog(val){
      if(!val){
        this.$refs.new_form.reset();
      }
    }
  },

  created() {
    this.getSipNumbers({page:0,size:10});
    this.getToSipNumbers();
    this.getPartnerList({page:0, size:10});
  },

  methods: {
    ...mapActions({
      getFabricWarehouseList: "fabricWarehouse/getFabricWarehouseList",
      createFabricWarehouse: "fabricWarehouse/createFabricWarehouse",
      getSipNumbers: "fabricsList/getFabricsList",
      getWarehouseHistory: "fabricWarehouse/getHistory",
      updateFabricWarehouse: "fabricWarehouse/updateFabricWarehouse",
      deleteFabricWarehouse: "fabricWarehouse/deleteFabricWarehouse",
      getToSipNumbers: "fabricWarehouse/getToSipNumbers",
      setSpendingFabric: "fabricWarehouse/setSpendingFabric",
      setFabricToWorkshop: "fabricWarehouse/setFabricToWorkshop",
      setFabricToSubcontract: "fabricWarehouse/setFabricToSubcontract",
      getModelPartsList: "fabricWarehouse/getModelPartsList",
      transferToStock: "fabricWarehouse/transferToStock",
      getPartnerList: "partners/getPartnerList",

    }),
    loadDetails({ item }) {
      // current opened || choose object ^
    },
    dialogCloser(){
      this.toStockState=false
    },
    async page(value) {
      this.current_page = value - 1;
      await this.getFabricWarehouseList({
        sipNumber: this.filters.sipNumber,
        batchNumber: this.filters.batchNumber,
        orderNumber: this.filters.orderNumber,
        page:this.current_page,
        size:this.itemPrePage,
      });
    },
    async size(value) {
      this.itemPrePage = value;
      await this.getFabricWarehouseList({
        sipNumber: this.filters.sipNumber,
        batchNumber: this.filters.batchNumber,
        orderNumber: this.filters.orderNumber,
        page:this.current_page,
        size:this.itemPrePage,
      });
    },

    addArrivedFabric() {

      this.arrivedFabric={}
      this.title = "New";
      this.new_dialog = true;
    },

    async saveArrivedFabric() {
      const data = { ...this.arrivedFabric };
      await this.createFabricWarehouse(data);
      this.new_dialog = false;
    },

    editItem(item) {
      this.title = "Edit";
      this.arrivedFabric = { ...item };
      this.arrivedFabric.fabricOrderId={fabricOrderId: item.fabricOrderId,sipNumber:item.sipNumber}
      // this.arrivedFabric.actualUnitPrice=this.arrivedFabric.actualUnitPrice.split(" ")[0]
      this.new_dialog = true;
    },

    editArrivedFabric() {
      const data = {
        batchNumber: this.arrivedFabric.batchNumber,
        densityInFact: this.arrivedFabric.densityInFact,
        fabricOrderId: this.arrivedFabric.fabricOrderId?.fabricOrderId,
        fabricWidthInFact: this.arrivedFabric.fabricWidthInFact.split(" ")[0],
        factReceivedGrossWeight:
          this.arrivedFabric.factReceivedGrossWeight.split(" ")[0],
        factReceivedNettoWeight:
          this.arrivedFabric.factReceivedNettoWeight.split(" ")[0],
        id: this.arrivedFabric.id,
        actualUnitPrice:this.arrivedFabric.actualUnitPrice.split(" ")[0]

      };
      this.updateFabricWarehouse(data);
      this.new_dialog = false;
    },
    tansferStock(item){
      this.deletedId = item.id;
      this.toStockState=true
    },
    transferFunc(){
      this.transferToStock(this.deletedId)
      this.toStockState=false
    },

    spendFunc(item) {
      this.spendingFabric.idFrom = item.id;
      this.spend_dialog = true;
    },

    async saveSpending() {
      const data = { ...this.spendingFabric };
      data.idTo=this.spendingFabric.idTo.id
      await this.setSpendingFabric(data);
      await this.$refs.spend_form.reset();
      this.spend_dialog = false;
    },

    getDeleteItem(item) {
      this.deletedId = item.id;
      this.delete_dialog = true;
    },

    deleteItem() {
      this.deleteFabricWarehouse(this.deletedId);
      this.delete_dialog = false;
    },

    workshopFunc(item) {
      this.workshop_dialog = true;
      this.workshop.fabricWarehouseId = item.id;
      this.workshop.measurement = item.measurementUnit;
      if(typeof item.modelNumber==="string"){
        this.modelNumbers.push(item.modelNumber)
      }

      if(typeof item.modelNumber==="object"){
        this.modelNumbers=[...item.modelNumber]
      }
    },

    async saveWorkshop() {
      this.workshop_dialog = false;
      const data = {
        modelNumber: this.workshop.modelNumber,
        quantity: this.workshop.quantity,
        modelPartId: this.workshop.modelPartId,
        fabricWarehouseId: this.workshop.fabricWarehouseId,
      };
      this.setFabricToWorkshop(data);

      await this.$refs.workshop_form.reset();
    },

    async saveSubcontractor() {
      this.subcontractor_dialog = false;
      const data = {
        modelNumber: this.subcontractor.modelNumber,
        quantity: this.subcontractor.quantity,
        modelPartId:this.subcontractor.modelPartId,
        fabricWarehouseId: this.subcontractor.fabricWarehouseId,
        partnerId: this.subcontractor.partnerId?.id,
      };
      this.setFabricToSubcontract(data);
      await this.$refs.subcontractor_form.reset();
    },

    async subcontractorFunc(item) {
      this.modelNumbers=[]
      this.subcontractor_dialog = true;
      this.subcontractor.measurement = item.measurementUnit;
      this.subcontractor.fabricWarehouseId = item.id;

      if(typeof item.modelNumber==="string"){
        this.modelNumbers.push(item.modelNumber)
      }

      if(typeof item.modelNumber==="object"){
        this.modelNumbers=[...item.modelNumber]
      }
    },

    getHistory(item) {
      this.history_dialog = true;
      this.getWarehouseHistory(item.id)
    },

    filterData() {
      this.getFabricWarehouseList({
        sipNumber: this.filters.sipNumber,
        batchNumber: this.filters.batchNumber,
        orderNumber: this.filters.orderNumber,
        page:this.current_page,
        size:this.itemPrePage,
      });
    },
    async resetFilters() {
      await this.getFabricWarehouseList({
        sipNumber: "",
        batchNumber: "",
        orderNumber: "",
        page:this.current_page,
        size:this.itemPrePage,
      });
      await this.$refs.filter_form.reset();
    },
  },

  mounted() {
    this.getFabricWarehouseList({
      sipNumber: "",
      batchNumber: "",
      orderNumber: "",
      page:0,
      size:10,
    });
  },
};
</script>
<style lang="scss"></style>
