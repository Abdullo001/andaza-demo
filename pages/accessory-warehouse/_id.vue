<template >
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card
    color="#fff"
    elevation="0"
    class="rounded-t-lg pb-4 mb-4"
    >
      <v-card-title>
        <div>
          {{ $t('sidebar.accessoryWarehouse') }}
          <v-chip color="#10BF41" dark class="font-weight-bold ml-5">{{stateStatus}}</v-chip>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-form lazy-validation v-model="valid_search" ref="filter_form" >
        <v-row class="mx-0 px-0 mb-2 mt-4  pa-4 w-full" justify="start">
          <v-col cols="12" lg="3" md="3">
            <div class="label">{{ $t('planningProduction.dialog.orderNumber') }}</div>
              <v-combobox
                v-model="filters.orderId"
                :items="ordersList"
                item-text="orderNumber"
                item-value="id"
                :disabled="stateStatus==='Edit'"
                :search-input.sync="orderNumber"
                outlined
                hide-details
                height="44"
                class="rounded-lg base d-flex align-center justify-center mb-4"
                :return-object="true"
                color="#544B99"
                dense
                :placeholder=" $t('planningProduction.dialog.orderNumber') "
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">{{ $t('planningProduction.dialog.modelNumber') }}</div>
              <v-combobox
                v-model="filters.modelId"
                :items="modelsList"
                item-text="modelNumber"
                item-value="id"
                :disabled="stateStatus==='Edit'"
                :search-input.sync="modelNumber"
                outlined
                hide-details
                height="44"
                class="rounded-lg base d-flex align-center justify-center mb-4"
                :return-object="true"
                color="#544B99"
                dense
                :placeholder=" $t('planningProduction.dialog.modelNumber') "
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">{{$t('accessoryWarehouse.plannedAt')}}</div>
              <v-text-field
                :placeholder="$t('accessoryWarehouse.plannedAt')"
                outlined
                hide-details
                height="44"
                class="rounded-lg base mb-4"
                validate-on-blur
                dense
                color="#544B99"
                background-color="#F8F4FE"
                readonly
                disabled
                v-model="filters.plannedAt"

              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">{{ $t('accessoryWarehouse.plannedBy') }}</div>
            <v-text-field
              :placeholder=" $t('readyWarehouse.measurementList.creator')"
              outlined
              hide-details
              height="44"
              class="rounded-lg base mb-4"
              validate-on-blur
              dense
              color="#544B99"
              background-color="#F8F4FE"
              readonly
              disabled
              v-model="filters.plannedBy"

            />
          </v-col>


        </v-row>

        <div class="d-flex  justify-end mr-3  ">
          <v-btn
              height="44"
              width="133"
              color="#544B99"
              :dark="stateStatus!=='Edit'"
              class="text-capitalize rounded-lg font-weight-bold"
              @click="search"
              :disabled="stateStatus==='Edit'"
            >
              {{ $t('readyWarehouse.id.search') }}
            </v-btn>
        </div>
      </v-form>
    </v-card>

    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="accessoryList"
      :items-per-page="10"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
    >

      <template #item.deliveredQuantity="{item}">
        <v-text-field
          outlined
          height="32"
          class="rounded-lg base my-2" dense
          :rules="[formRules.required]"
          @keydown.enter="handleEnter(item)"
          @focus="handleKeyEvent(item.accessoryId, $event)"
          @keyup="handleKeyEvent(item.accessoryId, $event)"
          :hide-details="!enterError[item.accessoryId]"
          :error-messages="enterError[item.accessoryId]"
          validate-on-blur
          color="#544B99"
          v-model="item.deliveredQuantity"
        />
      </template>
      <template #item.sizes="{ item }">
        <table style="width: 100% !important">
          <thead>
            <tr>
              <th
                class="mr-2"
                v-for="(el, idx) in item.sizeDistributions"
                :key="`${el.size}-${idx}`"
              >
                {{ el.size }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                v-for="(el, idx) in item.sizeDistributions"
                :key="`${el.size}` + `${idx}`"
              >
                {{ el.quantity }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>

      <template #item.actions="{item}">
        <div class="d-flex ">
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
                <v-img src="/spend-icon.svg" max-width="22"/>
              </v-btn>
            </template>
            <span class="text-capitalize">{{$t('warehouseId.spend')}}</span>
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
              <v-img src="/history.svg" max-width="20"/>
              </v-btn>
            </template>
            <span class="text-capitalize">{{$t('warehouseId.history')}}</span>
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
                <v-img src="/cut-icon.svg" max-width="22"/>
              </v-btn>
            </template>
            <span class="text-capitalize">{{$t('warehouseId.workShop')}}</span>
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
                <v-img src="/bag-icon.svg" max-width="22"/>
              </v-btn>
            </template>
            <span class="text-capitalize">{{$t('warehouseId.subcontractor')}}</span>
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
                @click="giveSureStock(item)"
              >
                <v-img src="/stock-icon.svg" max-width="22" />
              </v-btn>
            </template>
            <span class="text-capitalize">{{$t('warehouseId.stock')}}</span>
          </v-tooltip>
          
        </div>
      </template>
      <template #item.accessoryPhoto="{item}">
        <v-img
        v-if="!!item.accessoryPhoto"
        :src="item?.accessoryPhoto"
        class="mr-2"
        width="40"
        height="40"
      />
      </template>
    </v-data-table>
    <div class="d-flex mt-4">
      <v-spacer />
      <v-btn
        class="text-capitalize rounded-lg font-weight-bold"
        color="#544B99"
        dark
        height="44"
        width="133"
        @click="saveAccessory"
      >
        {{$t('userManagement.child.save')}}
      </v-btn>
    </div>

    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center"> {{$t('spending.deleteFabricWarehouseRow')}}</v-card-title>
        <v-card-text>
          {{$t('spending.areYouSureYouWantToDeleteFabricWarehouseRow')}}
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
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteItem"
          >
             {{$t('userManagement.child.delete')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="spend_dialog" width="500">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">{{$t('spending.spendingFabric')}}</div>
          <v-btn icon color="#544B99" @click="spend_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="spend_form" v-model="spend_validate" lazy-validation>
            <v-row class="mx-0 px-0 mb-2 mt-4  pa-4 w-full" justify="start">
              <v-col cols="12" lg="6" md="3">
                <div class="label">{{$t('orderBox.index.orderNumber')}}</div>
                  <v-combobox
                    v-model="spend.orderId"
                    :items="ordersListSpend"
                    item-text="orderNumber"
                    item-value="id"
                    :search-input.sync="orderNumberSpend"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base d-flex align-center justify-center mb-4"
                    :return-object="true"
                    color="#544B99"
                    dense
                    :placeholder="$t('orderBox.index.orderNumber')"
                    prepend-icon=""
                  >
                    <template #append>
                      <v-icon class="d-inline-block" color="#544B99">
                        mdi-magnify
                      </v-icon>
                    </template>
                  </v-combobox>
              </v-col>
              <v-col cols="12" lg="6" md="3">
                <div class="label">{{$t('prefinances.child.modelNumber')}}</div>
                  <v-combobox
                    v-model="spend.modelId"
                    :items="modelsListSpend"
                    item-text="modelNumber"
                    item-value="id"
                    :search-input.sync="modelNumberSpend"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base d-flex align-center justify-center mb-4"
                    :return-object="true"
                    color="#544B99"
                    dense
                    :placeholder="$t('prefinances.child.modelNumber')"
                    prepend-icon=""
                  >
                    <template #append>
                      <v-icon class="d-inline-block" color="#544B99">
                        mdi-magnify
                      </v-icon>
                    </template>
                  </v-combobox>
              </v-col>
              <v-col cols="12" lg="6" md="3">
                <div class="label">{{$t('catalogAccessory.dialog.accessory')}}</div>
                  <v-combobox
                    v-model="spend.accessoryIdTo"
                    :items="accessoriesSpendList"
                    item-text="name"
                    item-value="planningOrderId"
                    :search-input.sync="accessoryName"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base d-flex align-center justify-center mb-4"
                    :return-object="true"
                    color="#544B99"
                    dense
                    :placeholder="$t('catalogAccessory.dialog.accessory')"
                    prepend-icon=""
                  >
                    <template #append>
                      <v-icon class="d-inline-block" color="#544B99">
                        mdi-magnify
                      </v-icon>
                    </template>
                  </v-combobox>
              </v-col>
              <v-col cols="12" lg="6" md="3">
                <div class="label">{{$t('catalogAccessory.table.specification')}}</div>
                <v-combobox
                    v-model="spend.accessoryIdTo"
                    :items="accessoriesSpendList"
                    item-text="specification"
                    item-value="planningOrderId"
                    outlined
                    disabled
                    hide-details
                    height="44"
                    class="rounded-lg base d-flex align-center justify-center mb-4"
                    :return-object="true"
                    color="#544B99"
                    dense
                    :placeholder="$t('catalogAccessory.table.specification')"
                    prepend-icon=""
                  >
                    <template #append>
                      <v-icon class="d-inline-block" color="#544B99">
                        mdi-magnify
                      </v-icon>
                    </template>
                  </v-combobox>
              </v-col>
              <v-col cols="12" lg="6" md="3">
                <div class="label">{{$t('spending.spendingQuantity')}}</div>
                <v-text-field
                outlined
                hide-details
                height="44"
                class="rounded-lg base my-2" dense
                :rules="[formRules.required]"
                validate-on-blur
                :placeholder="$t('spending.spendingQuantity')"
                color="#544B99"
                v-model="spend.spendingQuantity"
              />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="130"
            @click="spend_dialog = false"
          >
            {{$t('userManagement.dialog.cancel')}}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="130"
            @click="saveSpending"
          >
           {{$t('userManagement.child.save')}}
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="history_dialog" max-width="800">
      <v-card flat>
        <v-card-title>
          <div class="title">{{$t('warehouseId.history')}}</div>
          <v-spacer/>
          <v-btn
            icon
            @click="history_dialog=false"
            color="#544B99"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="historyHeaders"
            :items="historyList"
            :items-per-page="-1"
            hide-default-footer
            class="mt-4 rounded-lg"
            style="border: 1px solid #E9EAEB"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="workshop_dialog" width="700">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">{{$t('warehouseId.accessoryGivingWork')}}</div>
          <v-btn icon color="#544B99" @click="workshop_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="workshop_form" v-model="workshop_validate" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-radio-group
                  row
                  v-model.trim="selectedItem.process"
                  class="mb-4"
                >
                  <v-radio
                    :aria-disabled="selectedItem.status==='edit_history'"
                    color="#544B99"
                    label="Sewing"
                    value="SEWING"
                  ></v-radio>
                  <v-radio
                    color="#544B99"
                    label="Packaging"
                    value="PACKAGING"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('planningProduction.planning.quantity')}}</div>
                <v-text-field
                :rules="[formRules.required]"
                v-model="selectedItem.quantity"
                outlined
                hide-details
                dense
                class="rounded-lg base "
                :placeholder="$t('planningProduction.planning.quantity')"
                color="#544B99"
              />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex align-center ">
                <v-simple-checkbox
                  color="#544B99"
                  v-model="withSizes"
                ></v-simple-checkbox>
                <div class="">
                  Quantity by Sizes
                </div>
              </v-col>
            </v-row>
            <v-row v-if="withSizes">
              <v-col v-for="(item,idx) in selectedItem.editableSizeDistributions" :key="idx" cols="3">
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
                  :rules="[formRules.onlyNumber, formRules.required]"
                  single-line
                  outlined
                  hide-details
                  height="44"
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#544B99"
                  background-color="#F8F4FE"
                  placeholder="0"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="130"
            @click="workshop_dialog = false"
          >
             {{$t('userManagement.dialog.cancel')}}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="130"
            @click="saveWorkshop"
          >
           {{$t('userManagement.child.save')}}
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="subcontract_dialog" width="500">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">{{$t('warehouseId.accessoryGivingSub')}}</div>
          <v-btn icon color="#544B99" @click="subcontract_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="subcontractor_form" v-model="workshop_validate" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-radio-group
                  row
                  v-model.trim="subcontractor.process"
                  class="mb-4"
                >
                  <v-radio
                    color="#544B99"
                    label="Sewing"
                    value="SEWING"
                  ></v-radio>
                  <v-radio
                    color="#544B99"
                    label="Packaging"
                    value="PACKAGING"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="6" >
                <div class="label">{{$t('orderBox.modelPrint.partner')}}</div>
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
                  :placeholder="$t('modelBox.dialog.enterPartnerName')"
                  append-icon="mdi-chevron-down"
                  :rules="[formRules.required]"
                  validate-on-blur
                >
                  <template #append>
                    <v-icon color="#544B99">mdi-magnify</v-icon>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="6">
                <div class="label">{{ $t('planningProduction.planning.quantity') }}</div>
                <v-text-field
                :rules="[formRules.required]"
                v-model="subcontractor.quantity"
                outlined
                hide-details
                dense
                class="rounded-lg base "
                :placeholder="$t('planningProduction.planning.quantity')"
                color="#544B99"
              />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex align-center ">
                <v-simple-checkbox
                  color="#544B99"
                  v-model="withSizes"
                ></v-simple-checkbox>
                <div class="">
                  Quantity by Sizes
                </div>
              </v-col>
            </v-row>
            <v-row v-if="withSizes">
              <v-col v-for="(item,idx) in subcontractor.editableSizeDistributions" :key="idx" cols="3">
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
                  :rules="[formRules.onlyNumber, formRules.required]"
                  single-line
                  outlined
                  hide-details
                  height="44"
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#544B99"
                  background-color="#F8F4FE"
                  placeholder="0"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="130"
            @click="subcontract_dialog = false"
          >
           {{$t('userManagement.dialog.cancel')}}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="130"
            @click="saveSubcontract"
          >
           {{$t('userManagement.child.save')}}
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="giveSure_dialog" max-width="450">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40" />
        </div>
        <v-card-title class="d-flex justify-center font-weight-bold"
        >{{$t('warehouseId.areYouSure')}}</v-card-title
        >
        <v-card-text>
          {{$t('warehouseId.want')}}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#544B99"
            width="135"
            @click.stop="giveSure_dialog = false"
          >
           {{$t('userManagement.dialog.cancel')}}
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#544B99"
            width="135"
            elevation="0"
            dark
            @click="giveStock"
          >
         {{$t('warehouseId.givingStock ')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import Breadcrumbs from "../../components/Breadcrumbs.vue";

export default {
  components: {
    Breadcrumbs
  },
  data(){
    return{
      stateStatus:"Add",
      orderNumber:"",
      modelNumber:"",
      orderNumberSpend:"",
      modelNumberSpend:"",
      valid_search:"",
      delete_dialog:"",
      spend_dialog:"",
      accessoryName:"",
      spend_validate:true,
      history_dialog:false,
      giveSure_dialog: false,
      filters:{
        orderId:null,
        modelId:null,
        createdBy:"",
        createdAt:"",
      },

      map_links: [
        {
          text: "Home",
          disabled: false,
          to: "/",
          icon: true,
        },
        {
          text: "Accessory-warehouse",
          disabled: false,
          to: "/accessory-warehouse",
          icon: true,
        },
        {
          text: "Add arrived accessory-warehouse",
          disabled: true,
          to: "/accessory-warehouse/7",
          icon: false,
        },
      ],

      spend:{
        idFrom:null,
        modelId:null,
        orderId:null,
        accessoryIdTo:null,
        spendingQuantity:null,
      },
      selectedItem:null,

      headers:[
        {text: this.$t('warehouseId.name'), value: "accessoryName", sortable: false},
        {text: this.$t('warehouseId.specification'), value: "specification", sortable: false},
        {text: "Accessory photo", value: "accessoryPhoto", sortable: false},
        {text: this.$t('warehouseId.orderedQuantity'), value: "orderedQuantity", sortable: false},
        {text: this.$t('warehouseId.deliveredQuantity'), value: "deliveredQuantity", sortable: false, width:200},
        {text: "Remaing quantity", value: "sizes", sortable: false, width:300, align:"center"},
        {text: this.$t('warehouseId.spentQuantity'), value: "spentQuantity", sortable: false},
        {text: this.$t('warehouseId.perUnitPrice'), value: "price", sortable: false},
        {text: this.$t('warehouseId.totalPrice'), value: "totalPrice", sortable: false},
        {text: this.$t('fabricOrderingBox.index.supplier'), value: "supplier", sortable: false},
        {text: this.$t('warehouseId.orderedDate'), value: "orderedDate", sortable: false},
        {text: this.$t('warehouseId.actions'), value: "actions", sortable: false},

      ],
      selectedItem:{},
      selectedWarehouseId: null,
      accessoryList:[],
      workshop_validate:true,
      workshop_dialog:false,
      subcontract_dialog:false,
      subcontractor:{
        partnerId:null,
      },
      withSizes:false,

      historyHeaders:[
        {text: "Date", value: "createdAt", sortable: false},
        {text: "Quantity", value: "quantity", sortable: false},
        {text: "M/U", value: "measurementUnit", sortable: false},
        {text: "Done by ", value: "createdBy", sortable: false},
      ],
      historyList:[],
      partnerName:"",
      enterError: {},
    }
  },

  created(){
    this.getPartnerList({page:0,size:10})
  },

  computed:{
    ...mapGetters({
      ordersList:"accessoryWarehouse/ordersList",
      ordersListSpend:"accessoryWarehouse/ordersListSpend",
      modelsList:"accessoryWarehouse/modelsList",
      modelsListSpend:"accessoryWarehouse/modelsListSpend",
      accessoriesDetailList:"accessoryWarehouse/accessoriesDetailList",
      accessoriesSpendList:"accessoryWarehouse/accessoriesSpendList",
      editDates:"accessoryWarehouse/editDates",
      historyServerList:"accessoryWarehouse/historyList",
      partnerList: "partners/partnerList",
    })
  },

  watch:{
    partnerName(val){
      this.getPartnerList({page:0,size:10,partnerName:val})
    },
    editDates:{
      deep:true,
      immediate:true,

      handler(val){
        const id = this.$route.params.id
        this.orderNumber=val.orderNumber
        this.modelNumber=val.modelNumber
        this.filters.plannedAt=val.plannedAt
        this.filters.plannedBy=val.plannedBy
        this.filters.orderId={id:id,orderNumber:val.orderNumber}
        this.filters.modelId={id:val.modelId,modelNumber:val.modelNumber}
        if(id!=="add-accessory-warehouse"){
          this.searchAccessory({orderId:id,modelId:val.modelId})
        }
      }
    },
    orderNumber(val){
      if(!!val && val !== ''){
        this.getOrdersList({name: val});
      }
    },
    orderNumberSpend(val){
      if(!!val && val !== ''){
        this.getOrdersListSpend({name:val});
      }
    },

    "filters.orderId"(val){
      if(!!val && val !== ''){
        this.getModelsList(val.id)
      }
    },
    "spend.orderId"(val){
      if(!!val && val !== ''){
        this.getModelsListSpend(val.id)
      }
    },


    "spend.modelId"(val){
      if(!!val && val !== ''){
        if(!!this.spend.orderId && this.spend.orderId !== ''){
          this.searchSpendAccessory({orderId:this.spend.orderId.id,modelId:val.id})
        }
      }
    },

    accessoriesDetailList(list){
      const specialList = list.map(function (el) {
        const value = {};
        const sizesList = [];
        el?.sizeDistributions?.forEach((item) => {
          value[item.size] = item.quantity
          sizesList.push({size: item.size, quantity: null})
        });

        return {
          ...value,
          ...el,
          editableSizeDistributions: [...sizesList],
        }
      })
      this.accessoryList=JSON.parse(JSON.stringify(specialList))

    },

    historyServerList(list){
      this.historyList = JSON.parse(JSON.stringify(list))
    }

  },

  methods:{
    ...mapActions({
      getOrdersList:"accessoryWarehouse/getOrdersList",
      getModelsList:"accessoryWarehouse/getModelsList",
      searchAccessory:"accessoryWarehouse/searchAccessory",
      setDelivered:"accessoryWarehouse/setDeliveredQuantity",
      createAccessoryWarehouse:"accessoryWarehouse/createAccessoryWarehouse",
      deleteAccessory:"accessoryWarehouse/deleteAccessory",
      searchSpendAccessory:"accessoryWarehouse/searchSpendAccessory",
      spendAccessory:"accessoryWarehouse/spendAccessory",
      getOrdersListSpend:"accessoryWarehouse/getOrdersListSpend",
      getModelsListSpend:"accessoryWarehouse/getModelsListSpend",
      giveOwn:"accessoryWarehouse/giveOwn",
      getHistoryList:"accessoryWarehouse/getHistoryList",
      giveSubcontractor:"accessoryWarehouse/giveSubcontractor",
      getPartnerList: "partners/getPartnerList",
      giveToAccessoryStock: "accessoryWarehouse/giveToAccessoryStock",
    }),
    handleKeyEvent(id, event) {
      if (event.keyCode !== 13) {
        this.enterError[id] = 'Please confirm with Enter';
      } else {
        this.enterError[id] = '';
      }
    },
    handleEnter(item) {
      if (item.deliveredQuantity && item.deliveredQuantity.trim() !== '') {
        this.setDeliviredQuantity(item);
      } 
    },
    setDeliviredQuantity(item){
      const data={
        warehouseId:item.accessoryWarehouseId,
        deliveredQuantity:item.deliveredQuantity
      }
      this.setDelivered({data,modelId:this.filters.modelId?.id,orderId:this.filters.orderId?.id})
    },
    search(){
      this.searchAccessory({orderId:this.filters.orderId.id,modelId:this.filters.modelId.id})
    },
    saveAccessory(){
      this.createAccessoryWarehouse({modelId:this.filters.modelId.id,orderId:this.filters.orderId.id})
    },

    spendFunc(item){
      this.spend_dialog=true
      this.spend.idFrom=item.planningOrderId
    },

    giveStock(){
      this.giveSure_dialog = false;
      let orderId = this.filters.orderId.id;
      let modelId = this.filters.modelId.id;
      let warehouseId = this.selectedWarehouseId;
      this.giveToAccessoryStock({warehouseId,orderId, modelId})
    },

    giveSureStock(item) {
      this.selectedWarehouseId = item.accessoryWarehouseId;
      this.giveSure_dialog = true;
    },

    async saveSpending(){
      const data={
        idFrom:this.spend.idFrom,
        modelIdTo:this.spend.modelId.id,
        orderIdTo:this.spend.orderId.id,
        accessoryIdTo:this.spend.accessoryIdTo.planningOrderId,
        spendingQuantity:this.spend.spendingQuantity,
      }
      await this.spendAccessory({data,modelId:this.filters.modelId?.id,orderId:this.filters.orderId?.id})
      await this.$refs.spend_form.reset()
      this.spend_dialog=false
    },

    getDeleteItem(item){
      this.selectedItem=item.planningOrderId
      this.delete_dialog=true
    },

    deleteItem(){
      if(id!=="add-accessory-warehouse"){
        this.deleteAccessory({planningOrderId:this.selectedItem,modelId:this.filters.modelId.id,orderId:this.filters.orderId.id})
      }
      else{
        this.deleteAccessory({planningOrderId:this.selectedItem,modelId:this.filters.modelId.id,orderId:this.filters.orderId.id})
      }
      this.delete_dialog=false
    },
    getHistory(item){
      this.history_dialog=true
      this.getHistoryList(item.accessoryWarehouseId)
    },
    workshopFunc(item){
      this.workshop_dialog=true
      this.selectedItem={...item}
    },
    async saveWorkshop(){
      const data={
        process:this.selectedItem.process,
        quantity:this.selectedItem.quantity,
        accessoryWarehouseId:this.selectedItem.accessoryWarehouseId,
      }
      data.sizeDistributions=[]
        if(this.withSizes){
          data.sizeDistributions=this.selectedItem.editableSizeDistributions.map((item)=>({
            size:item.size,
            quantity: item.quantity?item.quantity:0
          }))
        }
      await this.giveOwn({data,modelId:this.filters.modelId?.id,orderId:this.filters.orderId?.id})
      this.workshop_dialog=false

      await this.$refs.workshop_form.reset()
      this.withSizes=false
    },
    subcontractorFunc(item){
      this.subcontractor={...item}
      this.subcontract_dialog=true
    },

    async saveSubcontract(){
      const data={
        process:this.subcontractor.process,
        quantity:this.subcontractor.quantity,
        accessoryWarehouseId:this.subcontractor.accessoryWarehouseId,
      }
      data.sizeDistributions=[]
        if(this.withSizes){
          data.sizeDistributions=this.subcontractor.editableSizeDistributions.map((item)=>({
            size:item.size,
            quantity: item.quantity?item.quantity:0
          }))
        }
      data.partnerId=this.subcontractor.partnerId?.id
      await this.giveSubcontractor({data,modelId:this.filters.modelId?.id,orderId:this.filters.orderId?.id})
      this.subcontract_dialog=false
      await this.$refs.subcontractor_form.reset()
      this.withSizes=false
    },

  },

  mounted() {
    this.getOrdersList({name: ""});
    this.getOrdersListSpend({name: ""});
    const id=this.$route.params.id
    if(id!=="add-accessory-warehouse"){
      this.stateStatus="Edit"

    }else{
      this.filters.orderId=null
      this.filters.modelId=null
      this.stateStatus="New"
    }

  },
}
</script>
<style lang="">

</style>
