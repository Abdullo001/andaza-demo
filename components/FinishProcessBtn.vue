<template>
  <div>
    <v-btn
      v-if="!type"
      color="#544B99"
      class="text-capitalize rounded-lg mr-4"
      width="130"
      height="44"
      outlined
      @click="attantionDialog=true"
      >{{ $t("modelBox.dialog.finishProccess") }}
    </v-btn>
    <v-btn
      v-else
      color="#544B99"
      icon
      @click="attantionDialog=true"
      >
      <v-icon>mdi-flag-checkered</v-icon>
    </v-btn>

    <v-dialog v-model="attantionDialog" max-width="550" persistent>
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40" />
        </div>
        <v-card-title class="d-flex justify-center">
        {{ $t('finishProcess.completeProcess') }}
        </v-card-title>
        <v-card-text>
          <!-- finish this process -->
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="attantionDialog=false"
          >
            {{ $t("catalogsPartnerType.dialog.cancelBtn") }}
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#544B99"
            width="140"
            elevation="0"
            dark
            @click="confirm"
          >
             {{ $t('finishProcess.finish') }}

          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
export default {
  props:{
    modelId:{
      type:Number,
      required:true,
    },
    propertyName:{
      type:String,
      required:true,
    },
    type:{
      type:Boolean,
      default:false,
    }

  },
  data(){
    return{
      attantionDialog:false,
    }
  },

  methods:{
    ...mapActions({
      changePageStatus:"changePageStatus",
    }),

    confirm(){
      this.changePageStatus({modelId:this.modelId,propertyName:this.propertyName})
      this.attantionDialog=false
    },
  }


};
</script>
<style lang=""></style>
