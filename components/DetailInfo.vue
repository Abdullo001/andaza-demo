<template>
  <div>
    <v-row>
      <v-col cols="4" >
        <div class="label">{{ $t('orderBox.orderDetail.orderNumber') }}</div>
        <v-text-field
          v-model="orderDetail.orderNumber"
          :placeholder=" $t('orderBox.orderDetail.enterOrderNumber')"
          validate-on-blur
          outlined
          hide-details
          height="44"
          class="rounded-lg mb-4 base"
          dense
          color="#544B99"
          background-color="#F8F4FE"
          disabled
        />
      </v-col>
      <v-col cols="4">
        <div class="label">{{ $t('orderBox.orderDetail.season') }}</div>
        <v-text-field
          :placeholder="$t('orderBox.orderDetail.selectSeason')"
          v-model="orderDetail.season"
          dense
          outlined
          hide-details
          height="44"
          class="rounded-lg mb-4 base"
          validate-on-blur
          color="#544B99"
          background-color="#F8F4FE"
          disabled
        />
      </v-col>

      <v-col cols="4">
        <div class="label">{{ $t('orderBox.orderDetail.prefinanceNumber') }}</div>
        <v-text-field
          v-model="orderDetail.prefinanceNumber"
          :placeholder=" $t('orderBox.orderDetail.enterPrefinanceNumber')"
          outlined
          hide-details
          height="44"
          class="rounded-lg mb-4 base"
          validate-on-blur
          dense
          color="#544B99"
          background-color="#F8F4FE"
          disabled
        />
      </v-col>
      <v-col cols="4">
        <div class="label">{{  $t('orderBox.orderDetail.deadline')}}</div>
        <v-text-field
          v-model="orderDetail.deadline"
          :placeholder=" $t('orderBox.orderDetail.deadline')"
          outlined
          hide-details
          height="44"
          class="rounded-lg mb-4 base"
          validate-on-blur
          dense
          disabled
          color="#544B99"
          background-color="#F8F4FE"
        >
          <template #append>
            <v-img src="/date-icon.svg"/>
          </template>
        </v-text-field>
      </v-col>

      <v-col cols="4">
        <div class="label">
         {{  $t('orderBox.orderDetail.responsiblePerson')}}
        </div>
        <v-text-field
          v-model="orderDetail.responsipblePerson"
          :placeholder="  $t('orderBox.orderDetail.enterResponsiblePerson')"
          outlined
          hide-details
          height="44"
          class="rounded-lg mb-4 base"
          validate-on-blur
          dense
          color="#544B99"
          background-color="#F8F4FE"
          disabled
        />
      </v-col>

      <v-col cols="4">
        <div class="label">{{$t('orderBox.orderDetail.modelGroup')}}</div>
        <v-text-field
          :placeholder="$t('orderBox.orderDetail.modelGroup')"
          v-model="orderDetail.orderGroup"
          dense
          outlined
          hide-details
          height="44"
          class="rounded-lg mb-4 base"
          validate-on-blur
          color="#544B99"
          background-color="#F8F4FE"
          disabled
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
    this.getModelGroupList({page:0,size:10})
  },

  computed: {
    ...mapGetters({
      modelId: "orders/modelId",
      detailInfo: "detailInfo/detailInfo",
      modelGroups: "model/modelGroupList",
    }),
  },

  watch: {
    detailInfo(item) {
      const detail = this.orderDetail;
      detail.orderNumber = item.orderNumber;
      detail.prefinanceNumber = item.preFinanceNumber;
      detail.specificationNumber = item.specificationNumber;
      detail.orderGroup = item.modelCategory;
      detail.season = item.season;
      detail.deadline = this.formatLong(item.deadline);
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
      getModelGroupList: "model/getModelGroupList"
    }),
  },

  mounted() {
    const id = this.$route.params.id;
    if (id !== "add-order") {
      this.getDetailInfo({
        orderId: this.$route.params.id,
        modelId: this.$route.query.modelId,
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
