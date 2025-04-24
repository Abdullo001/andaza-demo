<template >
  <div>
    <v-dialog v-model="state" max-width="800">
      <v-card flat>
        <v-card-title>
          <div class="title">{{ title }}</div>
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
          <slot/>
        </v-card-text>
        <v-card-actions class="px-10 pb-5">
          <v-spacer/>
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#544B99"
            width="163" height="44"
            @click="closeHistory"
            style="border-width: 2px"
          >
            {{ $t('planningProduction.planning.cancel') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold ml-8"
            color="#544B99" dark
            width="163" height="44"
            @click="handler"
          >
            Save
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

export default {
  props:{
    state:{
      type:Boolean,
      required:true,
    },
    title:{
      type:String,
      required:true,
    },
    handler:{
      type:Function,
      required:true,
    },
  },
  methods:{
    closeHistory(){
      this.$emit('input', false)
    },
  },

}
</script>
<style lang="">

</style>
