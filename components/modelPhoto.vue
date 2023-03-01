<template>
  <div>
    <div class="title mt-3">Photos of models</div>
    <v-divider class="my-6"/>
    <v-row>
      <v-col cols="12" lg="5">
        <div class="big__image">
          <div class="default__box">
            <v-img src="/default-image.svg" width="70"/>
            <v-btn text color="#5570F1" class="rounded-lg mt-6 mb-4">
              <v-img src="/upload.svg" class="mr-2"/>
              <div class="text-capitalize upload-text">Upload Image</div>
            </v-btn>
            <div class="default__text">
              <p>Upload a cover image for your product.</p>
              <p>File Format <span>jpeg, png</span> Recommend Size <span>600x600 (1:1)</span></p>
            </div>
          </div>
        </div>
      </v-col>
      <v-col>
        <div class="text-body-1 font-weight-medium text-capitalize">Additional Images</div>
        <div class="cards mt-5">
          <div class="card__item">
            <v-img src="/default-image.svg" max-width="70" contain/>
            <v-btn text color="#5570F1" class="rounded-lg  mb-4">
              <v-img src="/upload.svg" max-width="20" class="mr-2"/>
              <div class="text-capitalize upload-text-child">Upload Image</div>
            </v-btn>
          </div>
          <div class="card__item">
            <v-img src="/default-image.svg" max-width="70" contain/>
            <v-btn text color="#5570F1" class="rounded-lg  mb-4">
              <v-img src="/upload.svg" max-width="20" class="mr-2"/>
              <div class="text-capitalize upload-text-child">Upload Image</div>
            </v-btn>
          </div>
          <div class="card__item">
            <v-img src="/default-image.svg" max-width="70" contain/>
            <v-btn text color="#5570F1" class="rounded-lg  mb-4">
              <v-img src="/upload.svg" max-width="20" class="mr-2"/>
              <div class="text-capitalize upload-text-child">Upload Image</div>
            </v-btn>
          </div>
        </div>
        <div class="d-flex justify-center mt-8">
          <v-btn
            class="rounded-lg white--text"
            color="#7631FF"
            width="130"
            height="44"
          >save</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
.upload-text {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #5570F1;
}
.big__image{
  background: #F4F5FA;
  height: 413px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #E1E2E9;
}
.default__box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.default__text {
  > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #8B8D97;
    margin-bottom: 7px;
    > span {
      color: #000;
    }
  }
}
.cards {
  display: flex;
  width: 100%;
  gap: 20px;
}
.card__item {
  display: flex;
  flex-direction: column;
  background: #F4F5FA;
  width: 250px;
  height: 170px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #E1E2E9;
}
.upload-text-child {
  font-size: 14px;
}
</style>
