
export const state=()=>({
  warehouseList:[],
  warehouseDetail:{},
  firstClassList:[],
  secondClassList:[],
  historyList:[],
  giveShipping: [],
  sortTwoHistoryList: [],
  sortTwoList: [],
  readyGarmentInfo:{},
})

export const getters={
  giveShipping: state => state.giveShipping,
  warehouseList: state=>state.warehouseList.content,
  totalElements: state=>state.warehouseList.totalElements,
  warehouseDetail: state=>state.warehouseDetail,
  firstClassList: state=>state.firstClassList,
  secondClassList: state=>state.secondClassList,
  historyList: state=>state.historyList,
  sortTwoHistoryList: state => state.sortTwoHistoryList,
  sortTwoList: state => state.sortTwoList,
  readyGarmentInfo: state => state.readyGarmentInfo,
}

export const mutations={
  setWarehouseList(state,item){
    state.warehouseList=item
  },
  setSortTwoHistoryList(state, item) {
    state.sortTwoHistoryList = item
  },
  setGiveShipping(state, item){
    state.giveShipping = item
  },
  setWarehouseDetail(state,item){
    state.warehouseDetail=item
  },
  setFirstClassList(state,item){
    state.firstClassList=item
  },
  setSecondClassList(state,item){
    state.secondClassList=item
  },
  setHistoryList(state,item){
    state.historyList=item
  },
  setSortTwoList(state, item) {
    state.sortTwoList = item
  },
  setReadyGarmentInfo(state, item) {
    state.readyGarmentInfo = item
  },
}

export const actions={
  getWarehouseList({commit},{clientName,modelNumber,orderNumber,page,size}){
    const body={
      client:clientName??"",
      modelNumber:modelNumber??"",
      orderNumber:orderNumber??"",
      page,
      size
    }

    this.$axios.put(`/api/v1/ready-garment-warehouse/list`,body)
      .then((res)=>{
        commit("setWarehouseList",res.data.data)
      })
      .catch((res)=>{
        console.log(res);
      })
  },

  getWarehouseDetail({commit},id){
    this.$axios.get(`/api/v1/ready-garment-warehouse/get-one?id=${id}`)
      .then((res)=>{
        commit("setWarehouseDetail",res.data.data)
      })
      .catch((res)=>{
        console.log(res);
      })
  },

  getWarehouseListEachSort({commit},{warehouseId,operationType}){
    this.$axios.get(`/api/v1/ready-garment-operation/big-list?warehouseId=${warehouseId}&operationType=${operationType}`)
      .then((res)=>{
        if(operationType==='FIRST_CLASS'){
          commit("setFirstClassList",res.data.data)
        }
        if(operationType==='SECOND_CLASS'){
          commit("setSecondClassList",res.data.data)
        }
      })
      .catch((res)=>{
        console.log(res);
      })
  },

  getWarehouseHistoryList({commit},{warehouseId,operationType,color}){
    this.$axios.get(`/api/v1/ready-garment-operation/thin-list?warehouseId=${warehouseId}&operationType=${operationType}&color=${color}`,)
      .then((res)=>{
        commit("setHistoryList",res.data.data)
      })
      .catch((res)=>{
        console.log(res);
      })
  },
  putWarehouseListTwoSort({commit, dispatch}, {data, warehouseId,operationType}){
    this.$axios.put(`/api/v1/ready-garment-operation/sell`, data)
      .then((res)=>{
        this.$toast.success(res.data.message)
        dispatch("getWarehouseListEachSort", {warehouseId, operationType})
        commit("setSortTwoList", res.data)
      })
      .catch((res)=>{
        this.$toast.error(res.message)
      })
  },

  async updateHistoryListTwoSort({ dispatch}, {data, warehouseId,operationType, color}){
    await this.$axios.put(`/api/v1/ready-garment-operation/update`, data)
      .then((res)=>{
        this.$toast.success(res.data.message)
        dispatch("getSortTwoHistoryList", {warehouseId, operationType,color})
      })
      .catch((res)=>{
        this.$toast.error(res.message)
      })
  },

  async getSortTwoHistoryList({commit},{warehouseId,operationType,color}){
    await this.$axios.get(`/api/v1/ready-garment-operation/sold-history?warehouseId=${warehouseId}&operationType=${operationType}&color=${color}`,)
      .then((res)=>{
        commit("setSortTwoHistoryList",res.data.data)
      })
      .catch((res)=>{
        console.log(res);
      })
  },

  deleteSortTwoHistory({dispatch}, {id, warehouseId, operationType,color}) {
    this.$axios.delete(`/api/v1/ready-garment-operation/delete?id=${id}`).then(res => {
      this.$toast.success(res.data.message)
      dispatch('getSortTwoHistoryList', {warehouseId, operationType,color})
    }).catch(res => {
      this.$toast.error(res.message)
    })
  },

  putGiveShipping({commit, dispatch}, {data, warehouseId, operationType}) {
    this.$axios.$put(`/api/v1/ready-garment-operation/give-shipping`, data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch("getWarehouseListEachSort", {warehouseId, operationType})
        commit('setGiveShipping', res.data.content)
      })
      .catch(({response}) => {
        this.$toast.error(response.message)
      })
  },
  giveGarmentStock({commit, dispatch}, data) {
    this.$axios.post(`/api/v1/ready-garment-operation/give-garment-stock`, data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch("getWarehouseListEachSort", {warehouseId:data.readyGarmentWarehouseId,operationType:"FIRST_CLASS"})
      })
      .catch(({response}) => {
        this.$toast.error(response.message)
      })
  },
  complateModel({dispatch}, {orderId, modelId, warehouseId}) {
    this.$axios.post(`/api/v1/shipping/complete-model?modelId=${modelId}&orderId=${orderId}`)
    .then((res) => {
      this.$toast.success(res.data.message)
      dispatch("getWarehouseListEachSort", {warehouseId, operationType:"FIRST_CLASS"})
    })
    .catch((response) => {
      console.log(response);

    })
  },

  getReadyGarmentInfo({commit}, {orderId, modelId}) {
    this.$axios.get(`/api/v1/shipping/final-model-info?modelId=${modelId}&orderId=${orderId}`)
      .then((res) => {
        commit("setReadyGarmentInfo", res.data.data)
      })
      .catch((response) => {
        console.log(response);
      })
  }
}
