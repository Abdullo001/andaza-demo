<template>
  <div>
    <TableForNextProcess :tableTitle="`1-sort`" :items="firstClass"/>
    <TableForNextProcess :tableTitle="`2-sort`" :items="secondClass"/>
    <v-row>
      <v-col cols="6">
        <MainTableForNextProcess :passingList="firstClassKidding" :tableTitle="`1-sort`"/>
      </v-col>
      <v-col cols="6">
        <MainTableForNextProcess :passingList="secondClassKidding" :tableTitle="`2-sort`"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableForNextProcess from "./TableForNextProcess.vue";
import MainTableForNextProcess from "./MainTableForNextProcess.vue";

export default {
  name: "QualityControl",
  components: {
    TableForNextProcess,
    MainTableForNextProcess,
  },
  props: {
    passSupplyWarehouse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      firstClass:[],
      secondClass:[],
      firstClassKidding:[],
      secondClassKidding:[],
    };
  },

  computed: {
    ...mapGetters({
      planningProcessId: "cuttingProcess/planningProcessId",
      passingList: "passingToNextProcess/passingList",
      kittedList: "passingToNextProcess/kittedList",
      secondKittedList: "passingToNextProcess/secondKittedList",
      productionId: "production/planning/productionId",
    }),
  },

  watch: {
    kittedList(val){
      this.firstClassKidding = [...val];
    },
    secondKittedList(val){
      this.secondClassKidding = [...val];
    },
    passingList(list) {
      this.firstClass = [];
      this.secondClass = [];
      list.forEach((item) => {
        if(item.isSecond) {
          this.secondClass.push(item)
        }else{
          this.firstClass.push(item)
        }
      })
    },
  },
  methods: {
    ...mapActions({
      getPassingListForSorting: "passingToNextProcess/getPassingListForSorting",
      getKittedList: "passingToNextProcess/getKittedList",
    }),
  },
  async mounted() {
    this.title = this.$route.path.split("/")[2]==='planning-production'?this.$route.path.split("/")[3]:this.$route.path.split("/")[2];
    this.getPassingListForSorting(this.planningProcessId);
    Promise.all([
      this.getKittedList({planningProcessId: this.planningProcessId, isSecond: false}),
      this.getKittedList({planningProcessId: this.planningProcessId, isSecond: true}),
    ]);
  },
};
</script>

<style lang="scss" scoped></style>
