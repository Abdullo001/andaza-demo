export const state = () => ({});
export const getters = {};
export const mutations = {};
export const actions = {
  uploadImages({commit}, {data, modelId}) {
    const config = {
      headers: {"Content-Type": "multipart/form-data"}
    }
    const formData = new FormData();
    for(let file=0; file <= 3; file++) {
      if(data[file].file !== null) formData.append('files', data[file].file)
    }
    this.$axios.$post(`/api/v1/model-resources/upload-photos?modelId=${modelId}`, formData, config)
      .then(res => {
        this.$toast.success(res.message)
      }).catch(({response}) => {
        this.$toast.error(response.data.message)
    })
  }
};
