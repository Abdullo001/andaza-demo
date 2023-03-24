export const state=()=>({
  accessoryList:[],
})

export const getters={
  accessoryList:state=>state.accessoryList,
}

export const mutations={
  setAccessoryList(state,item){
    state.accessoryList=item
  },
}

export const actions={
  async getAccessoryList({commit}){
    const body={
      filters:[],
      sorts:[],
      page:0,
      size:50,
    }
    await this.$axios.put(`/api/v1/accessory-planning/list`,body)
    .then((res)=>{
      console.log(res);
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  async getModelOrderInfo({commit}){
    const modelId=1
    await this.$axios.get(`/api/v1/accessory-planning/model-order-info?modelId=${modelId}`)
    .then((res)=>{
      console.log(res);
    })
    .catch((res)=>{
      console.log(res);
    })
  }
}