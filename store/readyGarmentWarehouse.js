export const state=()=>({
  warehouseList:[],
  warehouseDetail:{},
  firstClassList:[],
  secondClassList:[],
})

export const getters={
  warehouseList: state=>state.warehouseList.content,
  warehouseDetail: state=>state.warehouseDetail,
  firstClassList: state=>state.firstClassList,
  secondClassList: state=>state.secondClassList,
}

export const mutations={
  setWarehouseList(state,item){
    state.warehouseList=item
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
}

export const actions={
  getWarehouseList({commit},{client,modelNumber,orderNumber,page,size}){
    const body={
      client,
      modelNumber,
      orderNumber,
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
  }
}