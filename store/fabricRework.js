export const state = () => ({
  reworkList: [],
})

export const getters={
  reworkList:(state)=>state.reworkList.content,
  totalElements:(state)=>state.reworkList.totalElements,
}

export const mutations={
  setReworkList(state,list){
    state.reworkList=list
  },
}

export const actions={
  getReworkList({commit},{page,size,name=""}){
    const body = {
      filters: [
        {
          key: 'name',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: name,
        },
      ],
      
      sorts: [],
      page,
      size,
    }
    body.filters = body.filters.filter(
      (el) => el.value !== "" && el.value !== null
    );
    this.$axios.put(`/api/v1/fabric-rework`,body)
    .then((res)=>{
      commit("setReworkList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  createRework({dispatch},data){
    this.$axios.post(`/api/v1/fabric-rework`,data)
    .then((res)=>{
      dispatch("getReworkList",{page:0,size:10})
      this.$toast.success(res.data.message)
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.response)

    })
  },
  deleteRework({dispatch},id){
    this.$axios.delete(`/api/v1/fabric-rework/${id}`,)
    .then((res)=>{
      dispatch("getReworkList",{page:0,size:10})
      this.$toast.success(res.data.message)
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.response)

    })
  },
  updateRework({dispatch},{id,data}){
    this.$axios.put(`/api/v1/fabric-rework/${id}`,data)
    .then((res)=>{
      dispatch("getReworkList",{page:0,size:10})
      this.$toast.success(res.data.message)
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.response)

    })
  },
}