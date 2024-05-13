export const state=()=>({
  notificationList:[],
})

export const getters={
  notificationList:(state)=>state.notificationList.content,
  totalElements:(state)=>state.notificationList.totalElements,
}

export const mutations={
  setNotificationList(state,item){
    state.notificationList=item
  },
}

export const actions={
  getNotificationList({commit},{page,size,type="",title="",creatorId=""}){
    const data={
      page,
      size,
      type,
      title,
      creatorId
    }
    this.$axios.put(`/api/v1/notification`,data)
    .then((res)=>{
      commit("setNotificationList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })

  },

  createNotification({dispatch},data){
    this.$axios.post(`/api/v1/notification`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.message)
    })
  }
}