<template>
  <div class="image-upload-container">
    <div class="label">{{ label }}</div>
    <div class="big__image overflow-hidden relative">
      <input
        ref="uploader"
        class="d-none"
        type="file"
        @change="handleFileChange"
        accept="image/*"
      />
      <div class="update__icon" v-if="!!currentImage">
        <v-btn color="green" icon @click="triggerFileUpload">
          <v-img src="/upload-green.svg" max-width="22"/>
        </v-btn>
        <v-btn color="green" icon @click="deleteImage">
          <v-img src="/trash-red.svg" max-width="22"/>
        </v-btn>
      </div>
      <v-img
        :src="currentImage"
        lazy-src="/model-image.jpg"
        v-if="!!currentImage"
        width="100%"
        @click="showImage(currentImage)"
      />
      <div class="default__box" v-else>
        <v-img src="/default-image.svg" width="70"/>
        <v-btn text color="#5570F1" class="rounded-lg mt-6 my-4" @click="triggerFileUpload">
          <v-img src="/upload.svg" class="mr-2"/>
          <div class="text-capitalize upload-text">{{ uploadButtonText }}</div>
        </v-btn>
        <div class="default__text">
          <p>{{ description }}</p>
        </div>
      </div>
    </div>
    <v-dialog max-width="900" v-model="image_dialog">
      <v-card>
        <v-card-title class="d-flex">
          <v-spacer />
          <v-btn icon color="#544B99" large @click="image_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-img :src="currentImage" height="600" class="mb-4" contain />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ImageUploader',
  props: {
    value: {
      type: [String, File],
      default: ''
    },
    label: {
      type: String,
      default: 'Image'
    },
    uploadButtonText: {
      type: String,
      default: 'Upload Image'
    },
    description: {
      type: String,
      default: 'Upload a cover image for your product.'
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentImage: '',
      image_dialog: false,
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if (newVal instanceof File) {
          this.currentImage = URL.createObjectURL(newVal);
        } else {
          this.currentImage = newVal;
        }
      }
    }
  },
  methods: {
    triggerFileUpload() {
      this.$refs.uploader.click();
    },
    handleFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.setImage(file);
    },
    setImage(file){
      const imageUrl = URL.createObjectURL(file);
      this.currentImage = imageUrl;
      this.$emit('input', file);
      this.$emit('file-changed', file);
    },
    deleteImage() {
      this.currentImage = '';
      this.$emit('input', '');
      this.$emit('file-deleted');
    },
    showImage(path) {
      this.image_dialog = true;
    },
    handlePaste(event) {
      const items = (event.clipboardData || event.originalEvent.clipboardData).items;
      for (const item of items) {
        if (item.type.indexOf('image') === 0) {
          this.setImage(item.getAsFile());
        }
      }
    },
  },
  mounted(){
    document.addEventListener('paste', this.handlePaste);
  },
  beforeUnmount() {
    document.removeEventListener('paste', this.handlePaste);
  },


}
</script>

<style scoped>
.image-upload-container {
  margin-bottom: 20px;
}
.label {
  font-weight: 500;
  margin-bottom: 10px;
}
.big__image {
  border-radius: 8px;
  border: 1px dashed #ccc;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.default__box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  text-align: center;
}
.update__icon {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  display: flex;
  gap: 8px;
}
.default__text {
  color: #666;
  font-size: 14px;
}
</style>
