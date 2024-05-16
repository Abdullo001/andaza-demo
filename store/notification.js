export const state=()=>({
  notificationList:[],
  countUnreadNotification:null,
  recivedNotificationList:[],
})

export const getters={
  notificationList:(state)=>state.notificationList.content,
  totalElements:(state)=>state.notificationList.totalElements,
  recivedNotificationList:(state)=>state.recivedNotificationList.content,
  recivedNotificationListTotalElements:(state)=>state.recivedNotificationList.totalElements,
  countUnreadNotification:(state)=>state.countUnreadNotification,
}

export const mutations={
  setNotificationList(state,item){
    state.notificationList=item
  },
  setRecivedNotificationList(state,item){
    state.recivedNotificationList=item
  },
  setCountUnreadNotification(state,item){
    state.countUnreadNotification=item
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
  },

  getCountUnreadNotification({commit},id){
    this.$axios.get(`/api/v1/notification/unread/${id}`)
    .then((res)=>{
      commit("setCountUnreadNotification",res.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  getRecivedNotification({commit},{id,page='',size=''}){
    this.$axios.get(`/api/v1/notification/${id}?page=${page}&size=${size}`)
    .then((res)=>{
      commit("setRecivedNotificationList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  markAsRead({dispatch},{id,userId}){
    this.$axios.put(`/api/v1/notification/${id}`)
    .then((res)=>{
      console.log(res);
      dispatch("getCountUnreadNotification",userId)
      dispatch("getRecivedNotification",{id:userId,page:0,size:5})
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message)
      console.log(response);
    })
  }
}