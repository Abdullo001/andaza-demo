<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="!!printingList.length ? printingList : printOne"
      :items-per-page="10"
      hide-default-footer
      class="elevation-0"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex">
            <v-spacer/>
            <v-btn
              class="text-capitalize rounded-lg"
              color="#7631FF"
              @click="openDialog"
              :disabled="checkModelId"
              :dark="!checkModelId"
            >
              <v-icon class="mr-1">mdi-plus</v-icon>
              printing
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.actions="{item}">
        <v-btn icon @click="openEditDialog(item)" :disabled="checkModelId">
          <v-img src="/edit-green.svg" max-width="22"/>
        </v-btn>
      </template>
    </v-data-table>
    <v-divider/>
    <v-dialog v-model="printing_dialog" max-width="1000">
      <v-card>
        <v-card-title>
          <div>{{ dialogTitle }} printing</div>
          <v-spacer/>
          <v-btn icon color="amber" @click="printing_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form lazy-validation v-model="printingValid" ref="new_printing">
            <v-row>
              <v-col cols="12" lg="4">
                <div class="text-body-1 font-weight-medium text-capitalize mb-2"> print type</div>
                <v-select
                  outlined
                  :items="printTypeEnums"
                  single-line
                  placeholder="Print Type"
                  item-value="id"
                  item-text="name"
                  v-model="newPrints.printTypeId"
                  dense append-icon="mdi-chevron-down"
                  color="#7631FF"
                  class="rounded-lg"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 font-weight-medium text-capitalize mb-2"> color quantity</div>
                <v-text-field
                  outlined
                  single-line
                  placeholder="Color quantity"
                  v-model="newPrints.colorQuantity"
                  color="#7631FF"
                  dense
                  class="rounded-lg"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 font-weight-medium text-capitalize mb-2"> partner name</div>
                <v-select
                  outlined
                  :items="partnerEnums"
                  single-line
                  placeholder="Partner name"
                  item-value="id"
                  item-text="name"
                  v-model="newPrints.partnerId"
                  dense append-icon="mdi-chevron-down"
                  color="#7631FF"
                  class="rounded-lg"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 font-weight-medium text-capitalize mb-2"> currency</div>
                <v-select
                  outlined
                  :items="currency"
                  single-line
                  placeholder="Currency"
                  v-model="newPrints.currency"
                  dense append-icon="mdi-chevron-down"
                  color="#7631FF"
                  class="rounded-lg"

                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 font-weight-medium text-capitalize mb-2"> price</div>
                <v-text-field
                  outlined
                  single-line
                  placeholder="Price"
                  v-model="newPrints.price"
                  color="#7631FF"
                  dense
                  class="rounded-lg"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <div class="text-body-1 font-weight-medium text-capitalize mb-2"> simple send date</div>
                <el-date-picker
                  v-model="newPrints.sendDate"
                  type="datetime"
                  placeholder="Send date"
                  :picker-options="pickerOptions"
                  value-format="dd.MM.yyyy HH:mm:ss"
                  class="printing-date"
                  style="width: 100%; color: #7631FF;"
                >
                </el-date-picker>
              </v-col>
              <v-col cols="12" lg="12">
                <div class="text-body-1 font-weight-medium text-capitalize mb-2">description</div>
                <v-textarea
                  v-model="newPrints.description"
                  placeholder="Enter description"
                  outlined
                  single-line
                  color="#7631FF"
                  dense
                  class="rounded-lg"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-4">
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg border"
            outlined color="#7631FF"
            width="140" height="40"
            @click="printing_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            v-if="dialogTitle === 'Edit'"
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#7631FF" dark
            width="140" height="40"
            @click="upgradePrints"
          >
            save
          </v-btn>
          <v-btn
            v-else
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#7631FF" dark
            width="140" height="40"
            @click="createNewPrints"
          >
            add
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      printingValid: true,
      printing_dialog: false,
      print_types: ['Material', 'test', 'test 2'],
      currency: ['USD', 'RUB', 'UZS'],
      headers: [
        {text: 'Print type', align: 'start', sortable: false, value: 'printType', width: 180},
        {text: 'Color quantity', sortable: false, value: 'colorQuantity'},
        {text: 'Print partner name', sortable: false, value: 'partner'},
        {text: 'Price', sortable: false, value: 'price'},
        {text: 'Currency', sortable: false, value: 'currency', width: 100},
        {text: 'Simple send date', sortable: false, value: 'sendDate'},
        {text: 'Comment', sortable: false, value: 'description'},
        {text: 'Creator', sortable: false, value: 'createdBy'},
        {text: 'Date', sortable: false, value: 'updatedAt'},
        {text: 'Actions', sortable: false, value: 'actions'},
      ],
      dialogTitle: '',
      newPrints: {
        colorQuantity: null,
        currency: "",
        description: "",
        modelId: null,
        partnerId: null,
        price: "",
        printTypeId: 0,
        sendDate: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "Cегодня",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "Вчера",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "Неделя",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters({
      printingList: 'printing/printingList',
      printOne: 'printing/printOne',
      printTypeEnums: 'printing/printTypeEnums',
      partnerEnums: 'models/partner_enums'
    }),
    checkModelId() {
      const param = this.$route.params.id;
      if (param === 'add-model') {
        const id = this.$store.getters['models/newModelId']
        return id === null
      } else return false
    }
  },
  watch: {
    printing_dialog(val) {
      if (!val) this.$refs.new_printing.reset();
    }
  },
  methods: {
    ...mapActions({
      getPrintingList: "printing/getPrintingList",
      getPrintOne: "printing/getPrintOne",
      getPrintType: "printing/getPrintType",
      getPartnerList: "models/getPartnerList",
      createPrints: "printing/createPrints",
      updatePrints: "printing/updatePrints",

    }),
    async createNewPrints(item) {
      const id = this.$route.params.id;
      const data = this.newPrints;
      data.modelId = id;
      await this.createPrints(data);
      this.printing_dialog = false;
      await this.$refs.new_printing.reset();
    },
    openDialog() {
      this.dialogTitle = 'Add new';
      this.printing_dialog = !this.printing_dialog;
    },
    openEditDialog(item) {
      this.dialogTitle = 'Edit';
      this.printing_dialog = !this.printing_dialog;
      this.newPrints = {...item};
    },
    async upgradePrints() {
      await this.updatePrints(this.newPrints);
      this.printing_dialog = false;
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id !== 'add-model') {
      await this.getPrintOne({id: id, page: 0, size: 10});
    } else await this.getPrintingList({page: 0, size: 20})
    await this.getPrintType({page: 0, size: 10})
  }
}
</script>

<style lang="scss">
.el-date-table__row {
  background-color: #fff !important;

  > td.current > div > span {
    background-color: #7631FF !important;
  }

  > td.today > div > span {
    color: #7631FF !important;
  }

  > td.today.current > div > span {
    color: #FFFFFF !important;
  }
}

.el-picker-panel__footer > button > span {
  color: #7631FF !important;
}

.el-input__inner {
  border-color: #A0A0A0 !important;
}

.printing-date > input.el-input__inner::placeholder {
  color: #ccc;
}
</style>
