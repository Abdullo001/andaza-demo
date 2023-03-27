<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model="filters.id"
                placeholder="ID sample purposes"
                outlined
                validate-on-blur
                dense
                hide-details
                class="rounded-lg"
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
                class="rounded-lg"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2" style="max-width: 240px">
              <el-date-picker
                v-model="filters.createdDate"
                type="datetime"
                class="rounded-lg d-block el-date-picker"
                placeholder="Created"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <el-date-picker
                v-model="filters.updatedDate"
                type="datetime"
                class="rounded-lg d-block el-date-picker"
                placeholder="Updated"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </v-col>
            <v-spacer />
            <v-col cols="12" lg="3">
              <div class="d-flex justify-end">
                <v-btn
                  width="140"
                  outlined
                  color="#397CFD"
                  elevation="0"
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
                >
                  Reset
                </v-btn>
                <v-btn
                  width="140"
                  color="#397CFD"
                  dark
                  elevation="0"
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
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="accessoryList"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>Accessory</div>
            <v-btn color="#7631FF" dark class="text-capitalize rounded-lg" @click="addOrder">
              <v-icon>mdi-plus</v-icon> Accessory
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>

    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      filters: {
        id: "",
        name: "",
        createdDate: "",
        updatedDate: "",
      },

      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Order №", value: "orderNumber" },
        { text: "Model №", value: "modelNumber" },
        { text: "Created at", value: "createdAt" },
        { text: "Created by", value: "createdBy" },
        { text: "Detail", value: "detail" },
      ],

      accessoryList:[],

    };
  },

  methods:{
    ...mapActions({
      getAccessoryList: "accessory/getAccessoryList",
      getModelOrderInfo:"accessory/getModelOrderInfo",
    }),

    addOrder(){
      this.$router.push(`/accessory/create`);
    },
  },

  mounted(){
    this.getAccessoryList();
    this.getModelOrderInfo();
  }
};
</script>

<style lang="scss" scoped></style>
