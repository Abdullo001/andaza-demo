<template>
  <div>
    <v-row>
      <v-col cols="12" lg="8">
        <v-textarea
          placeholder="Enter description"
          v-model="description"
          background-color="#F8F4FE"
          color="#7631FF"
          rows="8"
          class="rounded-lg"
        />
      </v-col>
      <v-col>
        <div class="table">
          <div class="table__header">
            <div>Creator</div>
            <div>Date</div>
          </div>
          <div class="table__content">
            <div>John Doe</div>
            <div>12.10.2022</div>
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
            delete
          </v-btn>
          <v-btn
            color="#7631FF"
            class="text-capitalize rounded-lg"
            dark width="130" height="44"
          >
            save
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: ''
    }
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
