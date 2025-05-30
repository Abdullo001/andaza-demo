<template>
  <div class="image-upload-container">
    <v-img
      :src="currentImage"
      lazy-src="/model-image.jpg"
      v-if="!!currentImage"
      :width="width"
      :height="height"
      @click="showImage(currentImage)"
    />

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
  name: "ImageContainer",
  props: {
    value: {
      type: [String, File],
      default: "",
    },
    width: {
      type: [Number, String],
      default: 100,
    },
    height: {
      type: [Number, String],
      default: 100,
    },
  },
  data() {
    return {
      currentImage: "",
      image_dialog: false,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        console.log(newVal);

        if (newVal instanceof File) {
          this.currentImage = URL.createObjectURL(newVal);
        } else {
          this.currentImage = newVal;
        }
      },
    },
  },
  methods: {
    triggerFileUpload() {
      this.$refs.uploader.click();
    },
    handleFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;

      // Create a local URL for the file
      const imageUrl = URL.createObjectURL(file);
      this.currentImage = imageUrl;

      // Emit the file to parent component
      this.$emit("input", file);
      this.$emit("file-changed", file);
    },
    deleteImage() {
      this.currentImage = "";
      this.$emit("input", "");
      this.$emit("file-deleted");
    },
    showImage(path) {
      // this.$emit('show-image', path);
      this.image_dialog = true;
    },
  },
};
</script>

<style scoped>

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
