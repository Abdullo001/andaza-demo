export const state = () => ({
  modelImages: []
});
export const getters = {
  modelImages: state => {
    return state.modelImages?.slice(0, 4);
  }
};
export const mutations = {
  setModelImages(state, image) {
    state.modelImages = image;
  }
};
export const actions = {
  uploadImages({commit}, {data, modelId}) {
    const config = {
      headers: {"Content-Type": "multipart/form-data"}
    }
    const formData = new FormData();
    for (let file = 0; file <= 3; file++) {
      if (data[file].file) formData.append('files', data[file].file)
    }
    this.$axios.$post(`/api/v1/model-resources/upload-photos?modelId=${modelId}`, formData, config)
      .then(res => {
        this.$toast.success(res.message)
      }).catch(({response}) => {
      this.$toast.error(response.data.message)
    })
  },
  getImages({commit}, id) {
    this.$axios.$get(`/api/v1/model-resources/list?modelId=${id}&fileType=PHOTO`)
      .then(res => {
        commit('setModelImages', res.data);
      }).catch((response) => {
      console.log(response);
    })
  },

  deleteImages({dispatch},{id,modelId}){
    this.$axios.delete(`/api/v1/model-resources/delete?id=${id}`)
    .then((res)=>{
      dispatch('getImages',modelId)
      this.$toast.success(res.message)
    })
    .catch((res)=>{
      console.log(res);
    })
  }
};
