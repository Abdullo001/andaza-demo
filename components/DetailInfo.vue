<template>
  <div>
    <v-row>
      <v-col>
        <div class="mb-2 text-body-1 font-weight-medium">Order number</div>
        <v-text-field
          v-model="orderDetail.orderNumber"
          placeholder="Enter order number"
          outlined
          validate-on-blur
          dense
          class="rounded-lg mb-6"
          color="#7631FF"
          background-color="#F8F4FE"
          readonly
        />
        <div class="mb-2 text-body-1 font-weight-medium">Season</div>
        <v-text-field
          placeholder="select season"
          v-model="orderDetail.season"
          dense
          outlined
          validate-on-blur
          class="rounded-lg"
          color="#7631FF"
          background-color="#F8F4FE"
          readonly
        />
      </v-col>

      <v-col>
        <div class="mb-2 text-body-1 font-weight-medium">Prefinance number</div>
        <v-text-field
          v-model="orderDetail.prefinanceNumber"
          placeholder="Enter prefinance number"
          outlined
          validate-on-blur
          dense
          class="rounded-lg mb-6"
          color="#7631FF"
          background-color="#F8F4FE"
          readonly
        />
        <div class="mb-2 text-body-1 font-weight-medium">Deadline</div>
        <el-date-picker
          v-model="orderDetail.deadline"
          type="datetime"
          placeholder="Deadline"
          :picker-options="pickerShortcuts"
          value-format="dd.MM.yyyy HH:mm:ss"
          style="min-width: 100%"
          disabled
          class="el-date-picker"
        >
        </el-date-picker>
      </v-col>

      <v-col>
        <div class="mb-2 text-body-1 font-weight-medium">
          Specification number
        </div>
        <v-text-field
          v-model="orderDetail.specificationNumber"
          placeholder=" specification number"
          outlined
          validate-on-blur
          dense
          class="rounded-lg mb-6"
          color="#7631FF"
          background-color="#F8F4FE"
          readonly
        />
        <div class="mb-2 text-body-1 font-weight-medium">
          Responsipble person
        </div>
        <v-text-field
          v-model="orderDetail.responsipblePerson"
          placeholder="Enter responsipble person"
          outlined
          validate-on-blur
          dense
          class="rounded-lg mb-6"
          color="#7631FF"
          background-color="#F8F4FE"
          readonly
        />
      </v-col>

      <v-col>
        <div class="mb-2 text-body-1 font-weight-medium">Model group</div>
        <v-text-field
          placeholder="select Order group"
          v-model="orderDetail.orderGroup"
          dense
          outlined
          validate-on-blur
          class="rounded-lg"
          color="#7631FF"
          background-color="#F8F4FE"
          readonly
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DetailInfo",

  data() {
    return {
      season_enums: ["Spring/Summer", "Autumn/Winter"],
      orderGroup_enums: [],

      orderDetail: {
        orderNumber: "",
        prefinanceNumber: "",
        specificationNumber: "",
        orderGroup: "",
        season: "",
        deadline: "",
        responsipblePerson: "",
      },
    };
  },

  created() {
    this.getModelGroup();
  },

  computed: {
    ...mapGetters({
      modelId: "orders/modelId",
      detailInfo: "detailInfo/detailInfo",
      modelGroups: "detailInfo/modelGroups",
    }),
  },

  watch: {
    detailInfo(item) {
      const detail = this.orderDetail;
      detail.orderNumber = item.orderNumber;
      detail.prefinanceNumber = item.preFinanceNumber;
      detail.specificationNumber = item.specificationNumber;
      detail.orderGroup = item.modelGroup;
      detail.season = item.season;
      detail.deadline = item.deadline;
      detail.responsipblePerson = item.responsiblePerson;
    },

    modelGroups(groups) {
      groups.map((item) => {
        this.orderGroup_enums.push(item.name);
      });
    },
  },

  methods: {
    ...mapActions({
      getDetailInfo: "detailInfo/getDetailInfo",
      getModelGroup: "detailInfo/getModelGroup",
    }),
  },

  mounted() {
    const id = this.$route.params.id;
    if (id !== "add-order") {
      this.getDetailInfo({
        orderId: this.$route.params.id,
        modelId: this.modelId.modelId,
      });
    }else{
      this.getDetailInfo({
        orderId:this.$store.getters["orders/newOrderId"] ,
        modelId: this.$store.getters["orders/newModelId"],
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.el-date-editor--datetime {
  width: 100%;
  color: #c0c4cc;
}

.el-input__inner {
  color: #c0c4cc !important;
}
.el-input__inner {
  color: #777 !important;
  &::placeholder {
    color: #777 !important;
  }
}
.el-input__icon.el-icon-time {
  color: #777 !important;
  font-size: 18px;
}
.v-data-table-header {
  background-color: #e9eaeb;
}
.el-input__inner {
  background-color: #e9eaeb !important;
}

.bg-color-dataPic {
  background-color: #f8f4fe !important;
}
</style>
