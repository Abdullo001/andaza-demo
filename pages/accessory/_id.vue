<template>
  <div>
    <Breadcrumbs :maps="map_links" />

    <v-card elevation="0">
      <v-card-title>
        <div>Accessory</div>
        <v-spacer />
        <div>
          <v-btn
            outlined
            elevation="0"
            color="#777C85"
            class="text-capitalize rounded-lg mr-4"
          >
            <v-img src="/trash.svg" class="mr-1" />
            Clear
          </v-btn>
          <v-btn
            outlined
            elevation="0"
            class="text-capitalize rounded-lg"
            color="#777C85"
          >
            <v-img
              :src="fields_status ? '/edit.svg' : '/edit-active.svg'"
              class="mr-1"
            />
            Edit
          </v-btn>
        </div>
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-4">
        <v-row>
          <v-col>
            <div class="mb-2 text-body-1">Order number</div>
            <v-text-field
              placeholder="Search by order number"
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
            />
            <!-- <div class="search-field">
              <v-combobox
                outlined
                hide-details
                class="rounded-lg d-flex align-center justify-center"
                :return-object="true"
                color="#7631FF"
                dense
                placeholder="Enter responsible person"
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#7631FF"
                    >mdi-magnify</v-icon
                  >
                </template>
              </v-combobox>
            </div> -->
            <div class="mb-2 text-body-1">Client name</div>
            <v-text-field
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
            />
            <div class="mb-2 text-body-1">Ex.rate in planning created day</div>
            <div class="d-flex align-center">
              <v-text-field
                :rules="[formRules.onlyNumber]"
                placeholder="0.00"
                outlined
                validate-on-blur
                dense
                class="rounded-l-lg rounded-r-0"
                color="#7631FF"
              />
              <v-select
                :items="currency_enums"
                style="max-width: 100px"
                dense
                outlined
                validate-on-blur
                class="rounded-r-lg rounded-l-0"
                append-icon="mdi-chevron-down"
                color="#7631FF"
              />
            </div>
            <div class="mb-2 black--text text-body-1">Permission</div>
            <v-chip color="#10BF41" dark class="font-weight-bold">Edit</v-chip>
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Model number</div>
            <v-text-field
              placeholder="Search by model number"
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
            />
            <div class="mb-2 text-body-1">Order status</div>
            <v-text-field
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
            />
            <div class="mb-2 text-body-1">Ex.rate in planning created day</div>
            <div class="d-flex align-center">
              <v-text-field
                :rules="[formRules.onlyNumber]"
                placeholder="0.00"
                outlined
                validate-on-blur
                dense
                class="rounded-l-lg rounded-r-0"
                color="#7631FF"
              />
              <v-select
                :items="currency_enums"
                style="max-width: 100px"
                dense
                outlined
                validate-on-blur
                class="rounded-r-lg rounded-l-0"
                append-icon="mdi-chevron-down"
                color="#7631FF"
              />
            </div>
            <div class="mb-2 text-body-1">Exchange rate difference</div>
            <div class="d-flex align-center">
              <v-text-field
                :rules="[formRules.onlyNumber]"
                placeholder="0.00"
                outlined
                validate-on-blur
                dense
                class="rounded-l-lg rounded-r-0"
                color="#7631FF"
              />
              <v-select
                :items="currency_enums"
                style="max-width: 100px"
                dense
                outlined
                validate-on-blur
                class="rounded-r-lg rounded-l-0"
                append-icon="mdi-chevron-down"
                color="#7631FF"
              />
            </div>
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Model name</div>
            <v-text-field
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
            />

            <div class="mb-2 text-body-1">Deadline of order</div>
            <el-date-picker
              type="datetime"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
              style="min-width: 100%"
              class="el-date-picker bg-color-dataPic mb-6-5"
            >
            </el-date-picker>
            <div class="mb-2 text-body-1">Exchange rate in prefinanced day</div>
            <div class="d-flex align-center">
              <v-text-field
                :rules="[formRules.onlyNumber]"
                placeholder="0.00"
                outlined
                validate-on-blur
                dense
                class="rounded-l-lg rounded-r-0"
                color="#7631FF"
              />
              <v-select
                :items="currency_enums"
                style="max-width: 100px"
                dense
                outlined
                validate-on-blur
                class="rounded-r-lg rounded-l-0"
                append-icon="mdi-chevron-down"
                color="#7631FF"
              />
            </div>
            <div class="mb-2 text-body-1">Creator of planning</div>
            <v-text-field
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
            />
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Head of production depatment</div>
            <v-text-field
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
            />

            <div class="mb-2 text-body-1">Actual shipping date</div>
            <el-date-picker
              type="datetime"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
              style="min-width: 100%"
              class="el-date-picker bg-color-dataPic mb-6-5"
            >
            </el-date-picker>
            <div class="mb-2 text-body-1">Exchange rate in prefinanced day</div>
            <div class="d-flex align-center">
              <v-text-field
                :rules="[formRules.onlyNumber]"
                placeholder="0.00"
                outlined
                validate-on-blur
                dense
                class="rounded-l-lg rounded-r-0"
                color="#7631FF"
              />
              <v-select
                :items="currency_enums"
                style="max-width: 100px"
                dense
                outlined
                validate-on-blur
                class="rounded-r-lg rounded-l-0"
                append-icon="mdi-chevron-down"
                color="#7631FF"
              />
            </div>
            <div class="mb-2 text-body-1">Created time</div>
            <v-text-field
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
            >
              <template #append>
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <div class="d-flex align-center">
              <div class="default-data" v-ripple>
                <div class="d-flex justify-center flex-column align-center h-full">
                  <v-img
                    src="/default-image.svg"
                    max-width="158"
                    max-height="132"
                  />
                </div>
              </div>

            </div>
          </v-col>

          <v-col cols="3">
            <div class="mb-2 text-body-1">Creator of model</div>
            <v-text-field
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
            />
            <div class="mb-2 text-body-1">Creator of order</div>
            <v-text-field
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="3">
            <div class="mb-2 text-body-1">Created time</div>
            <v-text-field
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
            >
              <template #append>
                <v-img src="/date-icon.svg" />
              </template>

            </v-text-field>
            <div class="mb-2 text-body-1">Created time</div>
            <v-text-field
              outlined
              validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
            >
              <template #append>
                <v-img src="/date-icon.svg" />
              </template>
            </v-text-field>
          </v-col>

        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields_status: true,
      currency_enums: ["USD", "UZS", "RUB"],

      map_links: [
        {
          text: "Home",
          disabled: false,
          to: "/",
          icon: true,
        },
        {
          text: "Accessory",
          disabled: false,
          to: "/accessory",
          icon: true,
        },
        {
          text: "add models",
          disabled: true,
          to: "/orders/7",
          icon: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.mb-6-5 {
  margin-bottom: 26px;
}
</style>
