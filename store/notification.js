export const state=()=>({
  notificationList:[],
  countUnreadNotification:null,
  recivedNotificationList:[],
  notification:{},
})

export const getters={
  notificationList:(state)=>state.notificationList.content,
  totalElements:(state)=>state.notificationList.totalElements,
  recivedNotificationList:(state)=>state.recivedNotificationList.content,
  recivedNotificationListTotalElements:(state)=>state.recivedNotificationList.totalElements,
  countUnreadNotification:(state)=>state.countUnreadNotification,
  notification:(state)=>state.notification,
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
  setNotification(state,item){
    state.notification=item
  }
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
    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    }
    this.$axios.post(`/api/v1/notification`, data, config)
    .then((res)=>{
      this.$toast.success(res.data.message)
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.message)
    })
  },

  getNotification({commit},id){
    this.$axios.get(`/api/v1/notification/get/${id}`)
    .then((res)=>{
      commit("setNotification",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
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
      dispatch("getCountUnreadNotification",userId)
      dispatch("getRecivedNotification",{id:userId,page:0,size:5})
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message)
      console.log(response);
    })
  },

  markAsReadAll({dispatch},userId){
    this.$axios.patch(`/api/v1/notification/read-all`)
    .then((res)=>{
      dispatch("getRecivedNotification",{id:userId,page:0,size:5})
      dispatch("getCountUnreadNotification",userId)
      this.$toast.success(res.data.code)
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message)
      console.log(response);
    })
  }
}
