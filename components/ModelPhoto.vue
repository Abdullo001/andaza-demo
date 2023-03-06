<template>
  <div>
    <div class="title mt-3">Photos of models</div>
    <v-divider class="my-6"/>
    <v-row>
      <v-col cols="12" lg="5">
        <div class="big__image overflow-hidden relative">
          <input
            ref="uploaderFirst"
            class="d-none"
            type="file"
            @change="firstFileChanged"
            accept="image/*"
          />

            <div class="update__icon">
              <v-btn color="green" icon   @click="getFileFirst" v-if="!!files[0].file">
                <v-img src="/upload-green.svg" max-width="22"/>
              </v-btn>
              <v-btn color="green" icon  @click="getFileFirst" v-if="!!files[0].file">
                <v-img src="/trash-red.svg" max-width="22"/>
              </v-btn>
            </div>


            <v-img :src="images[0].photo" contain v-if="!!files[0].file"/>

          <div class="default__box" v-else>
            <v-img src="/default-image.svg" width="70"/>
            <v-btn text color="#5570F1" class="rounded-lg mt-6 my-4" @click="getFileFirst">
              <v-img src="/upload.svg" class="mr-2"/>
              <div class="text-capitalize upload-text">Upload Image</div>
            </v-btn>
          </div>
          <div class="default__text">
            <p>Upload a cover image for your product.</p>
            <p>File Format <span>jpeg, png</span> Recommend Size <span>600x600 (1:1)</span></p>
          </div>

        </div>
      </v-col>
      <v-col>
        <div class="text-body-1 font-weight-medium text-capitalize">Additional Images</div>
        <div class="cards mt-5">
          <div class="card__item relative">
            <input
              ref="uploaderSecond"
              class="d-none"
              type="file"
              @change="secondFileChanged"
              accept="image/*"
            />
            <v-img :src="images[1].photo" v-if="!!files[1].file"/>
            <div class="d-flex flex-column align-center" v-else>
              <v-img src="/default-image.svg" max-width="70" contain/>
              <v-btn text color="#5570F1" class="rounded-lg  my-4" @click="getFileSecond">
                <v-img src="/upload.svg" max-width="20" class="mr-2"/>
                <div class="text-capitalize upload-text-child">Upload Image</div>
              </v-btn>
            </div>
          </div>
          <div class="card__item">
            <input
              ref="uploaderThird"
              class="d-none"
              type="file"
              @change="thirdFileChanged"
              accept="image/*"
            />
            <v-img :src="images[2].photo" v-if="!!files[2].file"/>
            <div class="d-flex flex-column align-center" v-else>
              <v-img src="/default-image.svg" max-width="70" contain/>
              <v-btn text color="#5570F1" class="rounded-lg  my-4" @click="getFileThird">
                <v-img src="/upload.svg" max-width="20" class="mr-2"/>
                <div class="text-capitalize upload-text-child">Upload Image</div>
              </v-btn>
            </div>
          </div>
          <div class="card__item">
            <input
              ref="uploaderFourth"
              class="d-none"
              type="file"
              @change="thirdFileFourth"
              accept="image/*"
            />
            <v-img :src="images[3].photo" v-if="!!files[3].file"/>
            <div class="d-flex flex-column align-center" v-else>
              <v-img src="/default-image.svg" max-width="70" contain/>
              <v-btn text color="#5570F1" class="rounded-lg  my-4" @click="getFileFourth">
                <v-img src="/upload.svg" max-width="20" class="mr-2"/>
                <div class="text-capitalize upload-text-child">Upload Image</div>
              </v-btn>
            </div>
          </div>
        </div>
        <div class="d-flex justify-center mt-8">
          <v-btn
            class="rounded-lg font-weight-bold"
            color="#7631FF"
            width="130"
            outlined
            height="44"
            style="border-width: 2px"
            @click="clearImages"
          >clear</v-btn>
          <v-btn
            class="rounded-lg white--text ml-6"
            color="#7631FF"
            width="130"
            height="44"
            @click="saveImages"
          >save</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      selected_img: null,
      avatar: null,
      files: [
        {file: null},
        {file: null},
        {file: null},
        {file: null},
      ],
    }
  },
  computed: {
    images() {
      return [
        {photo: null},
        {photo: null},
        {photo: null},
        {photo: null},
      ]
    },
    ...mapGetters({
      newModelId: "models/newModelId"
    })
  },
  methods: {
    ...mapActions({
      uploadImages: "modelPhoto/uploadImages"
    }),
    async saveImages() {
      const param = this.$route.params.id;
      let id = '';
      if(param === 'add-model') {
        id = this.newModelId
      } else id = param;
      await this.uploadImages({
        data: this.files,
        modelId: id
      });
    },
    getFileFirst() {
      this.$refs.uploaderFirst.click();
    },
    getFileSecond() {
      this.$refs.uploaderSecond.click();
    },
    getFileThird() {
      this.$refs.uploaderThird.click();
    },
    getFileFourth() {
      this.$refs.uploaderFourth.click();
    },
    firstFileChanged(e) {
      this.files[0].file = e.target.files[0];
      this.images[0].photo = URL.createObjectURL(this.files[0].file);
    },
    secondFileChanged(e) {
      this.files[1].file = e.target.files[0];
      this.images[1].photo = URL.createObjectURL(this.files[1].file);
    },
    thirdFileChanged(e) {
      this.files[2].file = e.target.files[0];
      this.images[2].photo = URL.createObjectURL(this.files[2].file);
    },
    thirdFileFourth(e) {
      this.files[3].file = e.target.files[0];
      this.images[3].photo = URL.createObjectURL(this.files[3].file);
    },
    clearImages() {
      for(let i=0; i<=3; i++) this.files[i].file = null;
    }
  }
}
</script>

<style lang="scss" scoped>
.card-image {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;

}
.update__icon {
  border-radius: 16px;
  position: absolute !important;
  z-index: 10000 !important;
  top: 16px;
  right: 10px;
  background-color: #fff;
  padding: 9px;
}
.relative {
  position: relative !important;
  width: 100%;
}
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
  flex-direction: column;
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
  overflow: hidden;
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
