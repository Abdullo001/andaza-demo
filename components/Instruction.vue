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
                <GeneralComments/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <SewingInstruction/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <SampleInstruction/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <FabricInstruction/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <PackagingInstruct/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <AccessoryInstruct/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <PaintingInstruct/>
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

export default {
  name: 'Instruction',
  data() {
    return {
      items: ['General instruct', 'Sewing instruct', 'Sample instruct', 'Fabric instruct', 'Packaging instruct', 'Accessory instruct', 'Print instruct'],
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
  color: #7631FF;
}
</style>
