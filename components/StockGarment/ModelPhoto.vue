<template>
  <div>
    <div class="title mt-3">{{ $t('readyWarehouse.garmentsOfStock.modelPhoto') }}</div>
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

          <div class="update__icon" v-if="!!files[0].file">
            <v-btn color="green" icon @click="getFile('first')">
              <v-img src="/upload-green.svg" max-width="22"/>
            </v-btn>
            <v-btn color="green" icon @click="deleteFile('first')">
              <v-img src="/trash-red.svg" max-width="22"/>
            </v-btn>
          </div>

          <v-img
            :src="images[0].photo"
            lazy-src="/model-image.jpg"
            v-if="!!files[0].file" width="100%"
            @click="showImage(images[0].photo)"
          />

          <div class="default__box" v-else>
            <v-img src="/default-image.svg" width="70"/>
            <v-btn text color="#5570F1" class="rounded-lg mt-6 my-4" @click="getFile('first')">
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
        <div class="text-body-1 font-weight-medium text-capitalize" v-if="!!files[0].file">Additional Images</div>
        <div class="cards mt-5">
          <div class="card__item relative" v-if="!!files[0].file">
            <input
              ref="uploaderSecond"
              class="d-none"
              type="file"
              @change="secondFileChanged"
              accept="image/*"
            />

            <div class="update__icon small" v-if="!!files[1].file">
              <v-btn color="green" icon @click="getFile('second')">
                <v-img src="/upload-green.svg" max-width="18"/>
              </v-btn>
              <v-btn color="green" icon @click="deleteFile('second')">
                <v-img src="/trash-red.svg" max-width="18"/>
              </v-btn>
            </div>

            <v-img
              :src="images[1].photo"
              v-if="!!files[1].file"
              width="100%"
              @click="showImage(images[1].photo)"
            />
            <div class="d-flex flex-column align-center" v-else>
              <v-img src="/default-image.svg" max-width="70" contain/>
              <v-btn text color="#5570F1" class="rounded-lg  my-4" @click="getFile('second')">
                <v-img src="/upload.svg" max-width="20" class="mr-2"/>
                <div class="text-capitalize upload-text-child">Upload Image</div>
              </v-btn>
            </div>
          </div>
          <div class="card__item relative" v-if="!!files[1].file">
            <input
              ref="uploaderThird"
              class="d-none"
              type="file"
              @change="thirdFileChanged"
              accept="image/*"
            />
            <div class="update__icon small" v-if="!!files[2].file">
              <v-btn color="green" icon @click="getFile('third')">
                <v-img src="/upload-green.svg" max-width="18"/>
              </v-btn>
              <v-btn color="green" icon @click="deleteFile('third')">
                <v-img src="/trash-red.svg" max-width="18"/>
              </v-btn>
            </div>
            <v-img
              :src="images[2].photo"
              v-if="!!files[2].file"
              @click="showImage(images[2].photo)"
            />
              <div v-else>
            <div class="d-flex flex-column align-center">
                <v-img src="/default-image.svg" max-width="70" contain/>
                <v-btn text color="#5570F1" class="rounded-lg  my-4" @click="getFile('third')">
                  <v-img src="/upload.svg" max-width="20" class="mr-2"/>
                  <div class="text-capitalize upload-text-child">Upload Image</div>
                </v-btn>
            </div>
              </div>
          </div>
          <div class="card__item relative" v-if="!!files[2].file">
            <input
              ref="uploaderFourth"
              class="d-none"
              type="file"
              @change="thirdFileFourth"
              accept="image/*"
            />
            <div class="update__icon small" v-if="!!files[3].file">
              <v-btn color="green" icon @click="getFile('fourth')">
                <v-img src="/upload-green.svg" max-width="18"/>
              </v-btn>
              <v-btn color="green" icon @click="deleteFile('fourth')">
                <v-img src="/trash-red.svg" max-width="18"/>
              </v-btn>
            </div>
            <v-img
              :src="images[3].photo"
              v-if="!!files[3].file"
              @click="showImage(images[3].photo)"
            />
            <div class="d-flex flex-column align-center" v-else>
              <v-img src="/default-image.svg" max-width="70" contain/>
              <v-btn text color="#5570F1" class="rounded-lg  my-4" @click="getFile('fourth')">
                <v-img src="/upload.svg" max-width="20" class="mr-2"/>
                <div class="text-capitalize upload-text-child">Upload Image</div>
              </v-btn>
            </div>
          </div>
        </div>
        <div class="d-flex justify-center mt-8">
          <v-btn
            class="rounded-lg font-weight-bold"
            color="#544B99"
            width="130"
            outlined
            height="44"
            style="border-width: 2px"
            @click="clearImages"
          >{{ $t('modelBox.documentBox.clear') }}
          </v-btn>
          <v-btn
            class="rounded-lg white--text ml-6"
            color="#544B99"
            width="130"
            height="44"
            @click="saveImages"
          >{{ $t('modelBox.documentBox.save') }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-dialog max-width="590" v-model="image_dialog">
      <v-card>
        <v-card-title class="d-flex">
          <v-spacer/>
          <v-btn icon color="#544B99" large @click="image_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-img :src="currentImage" height="500" contain/>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ModelPhotoComponent",
  data() {
    return {
      selected_img: null,
      avatar: null,
      files: [
        {
          file: null,
          id:null,
        },
        {
          file: null,
          id:null
        },
        {
          file: null,
          id:null
        },
        {
          file: null,
          id:null
        },
      ],
      currentImage: '',
      image_dialog: false,
      uid:null,
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
      newModelId: "models/newModelId",
      setModelImages: "modelPhoto/modelImages",
      stockId: "garmentStock/stockId",
    })
  },
  watch: {
    setModelImages(link) {
      this.images.forEach((el, idx) => {
        this.files[idx].file = link[idx]?.filePath
        this.files[idx].id=link[idx]?.id
        el.photo = link[idx]?.filePath;
      })
    },
    stockId(val){
      this.uid=val.id
    },
    uid(val){
      if(!!val){
        this.getImages(val);
      }
    }
  },
  methods: {
    ...mapActions({
      uploadImages: "modelPhoto/uploadStockImages",
      getImages: "modelPhoto/getStocImages",
      deleteImages: "modelPhoto/deleteImages"

    }),
    async saveImages() {
      await this.uploadImages({
        data: this.files,
        stockId: this.uid
      });
    },
    showImage(image) {
      this.currentImage = image;
      this.image_dialog = true;
    },
    getFile(count) {
      switch (count) {
        case 'first':
          return this.$refs.uploaderFirst.click();
        case 'second':
          return this.$refs.uploaderSecond.click();
        case 'third':
          return this.$refs.uploaderThird.click();
        case 'fourth':
          return this.$refs.uploaderFourth.click();
      }
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
      for (let i = 0; i <= 3; i++) this.files[i].file = null;
    },
    deleteFile(count) {
      switch (count) {
        case 'first':
          this.files[0].file = null;
          this.deleteImages({id:this.files[0].id,modelId:this.$route.params.id})
          break;
        case 'second':
          this.files[1].file = null;
          this.deleteImages({id:this.files[1].id,modelId:this.$route.params.id})
          break;
        case 'third':
          this.files[2].file = null;
          this.deleteImages({id:this.files[2].id,modelId:this.$route.params.id})
          break;
        case 'fourth':
          this.files[3].file = null;
          this.deleteImages({id:this.files[3].id,modelId:this.$route.params.id})
          break;
      }
    }
  },
  mounted() {
    const id = this.$route.params.id;
    if(id!=="add-garment"){
      this.uid=id
    }
    
  }
}
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
}

.card-image {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;

}

.update__icon {
  border-radius: 16px;
  position: absolute !important;
  z-index: 10 !important;
  top: 16px;
  right: 10px;
  background-color: #fff;
  padding: 5px;

  &.small {
    padding: 0 2px;
  }
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

.big__image {
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
