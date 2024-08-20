export const state=()=>({
  departmentList:[],
  loading:true,
})

export const getters={
  departmentList:(state)=>state.departmentList.items,
  totalElements:(state)=>state.departmentList.totalElements,
  loading: state => state.loading,


}

export const mutations={
  setDepartmentList(state,item){
    state.departmentList=item
  },
  setLoading(state, loadings) {
    state.loading = loadings
  },
}

export const actions={
  getDepartmentList({commit},{page,size,name=""}){
    this.$axios.get(`/api/v1/departments?page=${page}&size=${size}&name=${name}`)
    .then((res)=>{
      commit("setDepartmentList",res.data.data)
      commit("setLoading", false)
    })
    .catch((response)=>{
      console.log(response);
      commit("setLoading", false)
    })
  },

  createDepartment({dispatch},data){
    this.$axios.post(`/api/v1/departments`,data)
    .then((res)=>{
      dispatch("getDepartmentList",{page:0,size:10})
      this.$toast.success(res.data.code)
      
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.message)
    })
  },

  updateDepartment({dispatch},data){
    const body={
      description:data.description,
      name:data.name
    }
    this.$axios.put(`/api/v1/departments/${data.departmentId}`,body)
    .then((res)=>{
      dispatch("getDepartmentList",{page:0,size:10})
      this.$toast.success(res.data.code)
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.message)
    })
  },

  deleteDepartment({dispatch},id){
    this.$axios.delete(`/api/v1/departments/${id}`)
    .then((res)=>{
      dispatch("getDepartmentList",{page:0,size:10})
      this.$toast.success(res.data.data.message)
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.message)
    })
  },

}