<template>
  <div>
    <v-row>
      <v-col cols="12" lg="8">
        <v-textarea
          :placeholder="$t('prefinances.child.enterDescription')"
          v-model="description"
          outlined
          hide-details
          background-color="#F8F4FE"
          color="#544B99"
          rows="8"
          class="rounded-lg base"
        />
      </v-col>
      <v-col>
        <div class="table">
          <div class="table__header">
            <div>{{ $t("modelBox.modelPartsBox.creator") }}</div>
            <div>{{ $t("modelBox.measurementListBox.date") }}</div>
          </div>
          <div class="table__content">
            <div>{{ commentText?.createdBy }}</div>
            <div>{{ commentText.createdAt }}</div>
          </div>
        </div>
        <div class="mt-7 d-flex justify-center">
          <v-btn
            outlined
            color="#777C85"
            class="text-capitalize rounded-lg mr-6"
            width="130" height="44"
          >
            <v-img src="/delete-default.svg" max-width="18" class="mr-2"/>
            {{ $t("modelBox.documentBox.delete") }}

          </v-btn>
          <v-btn
            color="#544B99"
            class="text-capitalize rounded-lg"
            dark width="130" height="44"
            @click="saveComment"
          >
             
             {{ $t("modelBox.documentBox.save") }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "FabricInstructionComponent",
  data() {
    return {
      description: ''
    }
  },
  computed: {
    ...mapGetters({
      commentText: 'instruction/commentText',
      newModelId: 'models/newModelId'
    })
  },
  watch: {
    commentText(val) {
      const data = JSON.parse(JSON.stringify(val))
      this.description = data.content;
    }
  },
  methods: {
    ...mapActions({
      createComments: 'instruction/createComments',
      getComment: 'instruction/getComment',
      updateComment: 'instruction/updateComment'
    }),
    async saveComment() {
      const id = this.$route.params.id;
      const data = {
        content: this.description,
        modelId: id === 'add-model' ? this.newModelId : id,
        id: this.commentText.id,
        type: 'FABRIC'
      };
      if(id !== 'add-model' && !!this.commentText?.id) {
        await this.updateComment(data)
      } else await this.createComments(data)
    },
  },
}
</script>

<style lang="scss" scoped>
.table {
  margin-top: 15px;
  border-bottom: 1px solid #E9EAEB;
  &__header, &__content {
    display: flex;
    padding: 8px;
    background: #F4F5FA;
    border-bottom: 1px solid #E9EAEB;
    > div {
      width: 50%;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #6B7280;
      &:nth-child(1) {
        border-right: 1px solid rgba(107, 114, 128, 0.99);
        margin-right: 10px;
      }
    }
  }
  &__content {
    background: #FFFFFF;
  }
}
</style>
