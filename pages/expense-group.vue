<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form>
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.expenseGroupId"
              :label="$t('expenseGroup.child.idSearch')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.expenseGroupName"
              :label="$t('expenseGroup.child.name')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
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
                @click.stop="resetFilters"
              >
                {{ $t("expenseGroup.child.reset") }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t("expenseGroup.child.search") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="expenseGroup"
      :loading="loading"
      :server-items-length="totalElements"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4 rounded-lg"
      @update:page="page"
      @update:items-per-page="size"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              {{ $t("expenseGroup.dialog.menuName") }}
            </div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t("expenseGroup.dialog.menuName") }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>
      <template #item.expensesNames="{ item }">
        <div>
         <span v-for="(expense,idx) in item.expensesNames" :key="idx">
          {{ expense }},
         </span>
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
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("expenseGroup.dialog.addMainName") }}
          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="12">
                <div class="label">{{ $t('expenseGroup.dialog.name') }}</div>
                <v-text-field
                  v-model="create_expense.expenseGroupName"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  height="44"
                  :placeholder="$t('expenseGroup.dialog.enterMainName')"
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="8">
                <div class="label">Add expense</div>
                <v-text-field
                  v-model="add_expenses.expense"
                  color="#544B99"
                  placeholder="Enter expense"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="base rounded-lg mr-3"
                  @keyup.enter="addExpense"
                />
              </v-col>
              <v-col cols="4" class="d-flex align-end">
                <v-btn
                  @click="addExpense"
                  color="#544B99"
                  class="rounded-lg text-capitalize"
                  dark
                >
                  <v-icon>mdi-plus</v-icon>
                  Add Expense
                </v-btn>
              </v-col>

              <v-col cols="12">
                <div class="label">Expense</div>
                <v-autocomplete
                  :rules="[formRules.required]"
                  chips
                  multiple
                  v-model="create_expense.expenseNames"
                  :items="enum_expense"
                  deletable-chips
                  append-icon="mdi-chevron-down"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  dense
                  placeholder="Expenses"
                  color="#544B99"
                >
                  <template #selection="data">
                    <v-chip
                      dark
                      color="#544B99"
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      close
                      class="my-1"
                      @click="data.select"
                      @click:close="remove(data.item)"
                    >
                      {{ data.item }}
                    </v-chip>
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="12">
                <div class="label">{{ $t('expenseGroup.dialog.description') }}</div>
                <v-textarea
                  v-model="create_expense.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  :placeholder="$t('expenseGroup.dialog.descriptionPlacholder')"
                  dense
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
            {{ $t("expenseGroup.dialog.cancelBtn") }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="save"
          >
            {{ $t("expenseGroup.dialog.createBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("expenseGroup.dialog.editDialog") }}
          </div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="12">
                <div class="label">{{ $t('expenseGroup.dialog.enterMainName') }}</div>
                <v-text-field
                  v-model="edit_expense.name"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  :placeholder="$t('expenseGroup.dialog.enterMainName')"
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="8">
                <div class="label">Add expense</div>
                <v-text-field
                  v-model="edit_expenses.expense"
                  color="#544B99"
                  placeholder="Enter expense"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="base rounded-lg mr-3"
                  @keydown.enter="editAddExpense"
                />
              </v-col>
              <v-col cols="4" class="d-flex align-end">
                <v-btn
                  @click="editAddExpense"
                  color="#544B99"
                  class="rounded-lg text-capitalize"
                  dark
                >
                  <v-icon>mdi-plus</v-icon>
                  Add Expense
                </v-btn>
              </v-col>

              <v-col cols="12">
                <div class="label">Expense</div>
                <v-autocomplete
                  :rules="[formRules.required]"
                  chips
                  multiple
                  v-model="edit_expense.expensesNames"
                  :items="edit_enums_expense"
                  deletable-chips
                  append-icon="mdi-chevron-down"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  dense
                  placeholder="Expenses"
                  color="#544B99"
                >
                  <template #selection="data">
                    <v-chip
                      dark
                      color="#544B99"
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      close
                      class="my-1"
                      @click="data.select"
                      @click:close="removeEdit(data.item)"
                    >
                      {{ data.item }}
                    </v-chip>
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="12">
                <div class="label">{{ $t('expenseGroup.dialog.description') }}</div>
                <v-textarea
                  v-model="edit_expense.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  :placeholder="$t('expenseGroup.dialog.descriptionPlacholder')"
                  dense
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
            {{ $t("expenseGroup.dialog.cancelBtn") }}
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
        <v-card-title class="d-flex justify-center">{{
            $t("expenseGroup.dialog.deleteDialog")
          }}
        </v-card-title>
        <v-card-text>
          {{ $t("expenseGroup.dialog.deleteText") }}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{ $t("expenseGroup.dialog.cancelBtn") }}
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteSample"
          >
            {{ $t("expenseGroup.dialog.deleteBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ExpenseGroupPage",
  data() {
    return {
      edit_dialog: false,
      delete_dialog: false,
      new_dialog: false,
      itemPrePage: 10,
      current_page: 0,
      options: {},
      headers: [
        {
          text: this.$t("samplePurposes.table.id"),
          value: "id",
          align: "start",
          sortable: false,
          width: "100",
        },
        {text: this.$t("samplePurposes.table.name"), value: "name"},
        {text:  this.$t("samplePurposes.table.expenses"), value: "expensesNames"},
        {
          text: this.$t("samplePurposes.table.description"),
          value: "description",
        },
        {
          text: this.$t("samplePurposes.table.createdAt"),
          value: "createdAt",
        },
        {
          text: this.$t("samplePurposes.table.updatedAt"),
          value: "updatedAt",
        },
        {
          text: this.$t("samplePurposes.table.actions"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      create_expense: {
        expenseGroupName: "",
        expenseNames: [],
        description: "",
      },
      edit_expense: {
        expenseGroupName: "",
        expenseNames: [],
        description: "",
      },
      delete_expense: {},
      filters: {
        id: "",
        name: "",
        updatedAt: "",
        createdAt: "",
      },
      add_expenses: {
        expense: "",
      },
      edit_expenses: {
        expense: "",
      },

      edit_enums_expense: [],
      enum_expense: [],
    };
  },
  watch: {

    "create_expense.expenseNames"(value) {
      this.enum_expense = value;
    },
    "edit_expense.expensesNames"(value) {
      this.edit_enums_expense = value;
    },


  },
  async created() {
    this.getExpenseGroup({page:0,size:10})
  },
  computed: {
    ...mapGetters({
      loading: "expenseGroup/loading",
      expenseGroup: "expenseGroup/expenseGroup",
      totalElements: "expenseGroup/totalElements",
    }),
  },
  methods: {
    ...mapActions({
      getExpenseGroup: "expenseGroup/getExpenseGroup",
      createExpenseGroup: "expenseGroup/createExpenseGroup",
      updateExpenseGroup: "expenseGroup/updateExpenseGroup",
      deleteExpenseGroup: "expenseGroup/deleteExpenseGroup",
      filterExpenseGroup: "expenseGroup/filterExpenseGroup",
    }),
    remove(item) {
      const index = this.create_expense.expenseNames.indexOf(item)
      if (index >= 0) this.create_expense.expenseNames.splice(index, 1)
    },
    addExpense() {
      if (this.add_expenses.expense !== "") {
        const item = {...this.add_expenses};
        this.create_expense.expenseNames.push(item.expense);
        this.add_expenses.expense = "";
      }
    },
    removeEdit(item) {
      const index = this.edit_expense.expensesNames.indexOf(item);
      if (index >= 0) this.edit_expense.expensesNames.splice(index, 1);
    },

    editAddExpense() {
      if (!!this.edit_expenses.expense) {
        const item = {...this.edit_expenses};
        console.log(item);
        
        this.edit_expense.expensesNames.push(item.expense);
        this.edit_expenses.expense = "";
      }
    },

    async size(val) {
      this.itemPrePage = val;
      this.getExpenseGroup({page:0,size:this.itemPrePage})
    },
    async page(val) {
      this.current_page = val - 1;
      this.getExpenseGroup({page:this.current_page,size:this.itemPrePage})
    },
    async deleteSample() {
      const id = this.delete_expense.id;
      await this.deleteExpenseGroup(id);
      this.delete_dialog = false;
    },
    async save() {
      const items = {...this.create_expense};
      await this.createExpenseGroup(items);
      this.create_expense = {
        expenseGroupName: "",
        expenseNames: [],
        description: "",
      };
      this.new_dialog = false;
    },
    async update() {
      const items = {...this.edit_expense};
      const data={
        expenseGroupName:this.edit_expense.name,
        expenseNames:this.edit_expense.expensesNames,
        description:this.edit_expense.description
      }
      
      await this.updateExpenseGroup({data,id:this.edit_expense.id});
      this.edit_dialog = false;
    },
    async getDeleteItem(item) {
      this.delete_expense = {...item};
      this.delete_dialog = true;
    },
    editItem(item) {
      this.edit_expense = JSON.parse(JSON.stringify(item));
      delete this.edit_expense.createdAt;
      delete this.edit_expense.updatedAt;
      
      this.edit_dialog = true;
    },
    async resetFilters() {
      await this.getExpenseGroup({page: 0, size: 10});
      this.filters = {
        expenseGroupId: "",
        expenseNames: "",
      };
    },
    async filterData() {
      const {expenseGroupName,expenseGroupId} = this.filters
      await this.getExpenseGroup({page:0,size:10,expenseGroupName,expenseGroupId});
    },
  },
  mounted() {
    this.$store.commit("setPageTitle", this.$t("sidebar.catalogs"));

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
