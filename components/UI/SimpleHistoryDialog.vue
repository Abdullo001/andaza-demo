<template >
  <div>
    <v-dialog v-model="state" max-width="800">
      <v-card flat>
        <v-card-title>
          <div class="title">History</div>
          <v-spacer/>
          <v-btn
            icon
            @click="closeHistory"
            color="#544B99"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            hide-default-footer
            :items="itemsList"
            class="mt-4 rounded-lg"
            style="border: 1px solid #E9EAEB"
            :loading="loadingState"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props:{
    headers:{
      type:Array,
      required:true,
    },
    itemsList:{
      type:Array,
      required:true,
    },
    historyDialog:{
      type:Boolean,
      required:true,
    },
    loadingState:{
      type:Boolean,
      default:false,
    }
  },

  data(){
    return{
      state:this.historyDialog,
    }
  },
  watch: {
    historyDialog(newVal) {
      this.state = newVal;
    },
    state(newVal) {
      this.$emit('update:historyDialog', newVal);
    }
  },

  methods:{
    closeHistory(){
      this.state=false
    }
  }
}
</script>
<style lang="">

</style>
