<template >
  <div>
    <v-row>
      <v-col>
        <div class="mb-2 text-body-1 font-weight-medium">Order number</div>
        <v-text-field
          v-model="orderDetail.orderNumber"
          label="Enter order number"
          single-line
          outlined
          validate-on-blur
          dense
          class="rounded-lg mb-6"
          color="#7631FF"
          background-color="#F8F4FE"
        />
        <div class="mb-2 text-body-1 font-weight-medium">Season</div>
        <v-select
          :items="season_enums"
          v-model="orderDetail.season"
          single-line
          dense
          outlined
          validate-on-blur
          class="rounded-lg"
          append-icon="mdi-chevron-down"
          color="#7631FF"
          background-color="#F8F4FE"
        />
      </v-col>

      <v-col>
        <div class="mb-2 text-body-1 font-weight-medium">Prefinance number</div>
        <v-text-field
          v-model="orderDetail.prefinanceNumber"
          label="Enter prefinance number"
          single-line
          outlined
          validate-on-blur
          dense
          class="rounded-lg mb-6"
          color="#7631FF"
          background-color="#F8F4FE"
        />
        <div class="mb-2 text-body-1 font-weight-medium">Deadline</div>
        <el-date-picker
          v-model="orderDetail.deadline"
          type="datetime"
          placeholder="dd.MM.yyyy HH:mm:ss"
          :picker-options="pickerOptions"
          value-format="dd.MM.yyyy HH:mm:ss"
          style="min-width: 100%"
          class="picker-color"
        >
        </el-date-picker>
      </v-col>

      <v-col>
        <div class="mb-2 text-body-1 font-weight-medium">
          Specification number
        </div>
        <v-text-field
          v-model="orderDetail.specificationNumber"
          label="Enter specification number"
          single-line
          outlined
          validate-on-blur
          dense
          class="rounded-lg mb-6"
          color="#7631FF"
          background-color="#F8F4FE"
        />
        <div class="mb-2 text-body-1 font-weight-medium">
          Responsipble person
        </div>
        <v-text-field
          v-model="orderDetail.responsipblePerson"
          label="Enter responsipble person"
          single-line
          outlined
          validate-on-blur
          append-inner-icon="mdi-plus"
          dense
          class="rounded-lg mb-6"
          color="#7631FF"
          background-color="#F8F4FE"
        >
          
          <template #append>
            <v-icon>
              mdi-magnify
            </v-icon>
          </template>
        </v-text-field>
      </v-col>

      <v-col>
        <div class="mb-2 text-body-1 font-weight-medium">Order group</div>
        <v-select
          :items="orderGroup_enums"
          v-model="orderDetail.orderGroup"
          single-line
          dense
          outlined
          validate-on-blur
          class="rounded-lg"
          append-icon="mdi-chevron-down"
          color="#7631FF"
          background-color="#F8F4FE"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "DetailInfo",

  data() {
    return {
      season_enums: ["SS23Spring/Summer", "AW23Autumn/Winter"],
      orderGroup_enums:['Women T-shirt',],

      orderDetail: {
        orderNumber: "354F-89",
        prefinanceNumber: "219/22",
        specificationNumber: 18,
        orderGroup: "Women T-shirt",
        season: "SS23Spring/Summer",
        deadline: "02.12.2022 00:00:00",
        responsipblePerson: "John Doe",
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
    };
  },
};
</script>
<style lang=""></style>
