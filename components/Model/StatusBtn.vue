<template >
  <div>
    <v-chip :color="statusColor.commonStatus(status)" dark @click.stop="viewStatus(status)">
      {{ $t(`statusItems.${status.toLowerCase()}`) }}
      </v-chip>
  </div>
</template>
<script>
export default {
  props: {
    status: String,
    url: String,
    param: String,
    productionId: Number,
  },
  data(){
    return {

    }
  },

  methods: {
    viewStatus(status){
      this.$router.push(`${this.url}/${this.param}`)
      if(this.productionId){
        console.log(status);
        this.$store.commit("production/planning/setProductionId",this.productionId)
      }
    }
  }
}
</script>
<style lang="">

</style>
