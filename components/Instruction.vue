<template>
  <div>
    <v-card class="mt-6" flat>
      <v-tabs
        v-model="tab"
        class="rounded-lg"
      >
        <v-tabs-slider color="transparent"/>
        <v-tab
          class="text-capitalize rounded-lg"
          v-for="item in items"
          :key="item"
          active-class="active-tab"
          @click="getCurrentTab(item)"
        >
          {{ item }}
        </v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <GeneralCommentsComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <SewingInstructionComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <SampleInstructionComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <FabricInstructionComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <PackagingInstructComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <AccessoryInstructComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <PaintingInstructComponent/>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import GeneralCommentsComponent from "./GeneralComments.vue";
import SampleInstructionComponent from "./SampleInstruction.vue";
import FabricInstructionComponent from "./FabricInstruction.vue";
import PackagingInstructComponent from "./PackagingInstruct.vue";
import SewingInstructionComponent from "./SewingInstruction.vue";
import AccessoryInstructComponent from "./AccessoryInstruct.vue";
import PaintingInstructComponent from "./PaintingInstruct.vue";

export default {
  name: 'InstructionComponent',
  components: {
    PaintingInstructComponent,
    AccessoryInstructComponent,
    SewingInstructionComponent,
    PackagingInstructComponent,
    FabricInstructionComponent,
    SampleInstructionComponent,
    GeneralCommentsComponent
  },
  data() {
    return {
      items: [this.$t('modelBox.instruction.generalInstruct'),this.$t('modelBox.instruction.sewingInstruct'),this.$t('modelBox.instruction.sampleInstruct'),this.$t('modelBox.instruction.fabricInstruct'), this.$t('modelBox.instruction.packagingInstruct'), this.$t('modelBox.instruction.accessoryInstruct'), this.$t('modelBox.instruction.printInstruct')],
      tab: null,
    }
  },
  methods: {
    ...mapActions({
      createComments: 'instruction/createComments',
      getComment: 'instruction/getComment',
      updateComment: 'instruction/updateComment'
    }),
    getCurrentTab(val) {
      val = val.replace(' instruct', '').toUpperCase();
      const id = this.$route.params.id;
      if(id !== 'add-model') {
        this.getComment({modelId: id, type: val});
      } this.$store.commit('instruction/setCommentText', {})
    }
  }
}
</script>

<style lang="scss" scoped>
.active-tab {
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #544B99;
}
</style>
