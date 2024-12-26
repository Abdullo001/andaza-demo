export const state=()=>({
  paymentsList:[],
  fixedPaymentsList:[],
  paymentHistoryList:[],
  paymentHistorySalaryList:[],
  historyLoading:false,
  historySalaryLoading:false,
  employeeSalaryReport:{},
  salaryChangeHistoryList:[],
})

export const getters={
  paymentsList:(state)=>state.paymentsList,
  fixedPaymentsList:(state)=>state.fixedPaymentsList,
  paymentHistoryList:(state)=>state.paymentHistoryList,
  paymentHistorySalaryList:(state)=>state.paymentHistorySalaryList,
  historyLoading:(state)=>state.historyLoading,
  historySalaryLoading:(state)=>state.historySalaryLoading,
  employeeSalaryReport:(state)=>state.employeeSalaryReport,
  salaryChangeHistoryList:(state)=>state.salaryChangeHistoryList,
}

export const mutations={
  setPaymentsList(state,list){
    state.paymentsList=list
  },
  setFixedPaymentsList(state,list){
    state.fixedPaymentsList=list
  },
  setPaymentHistoryList(state,list){
    state.paymentHistoryList=list
  },
  setPaymentHistorySalaryList(state,list){
    state.paymentHistorySalaryList=list
  },
  setHistoryLoading(state,value){
    state.historyLoading=value
  },
  setHistorySalaryLoading(state,value){
    state.historySalaryLoading=value
  },
  setEmployeeSalaryReport(state,value){
    state.employeeSalaryReport=value
  },
  setSalaryChangeHistory(state,value){
    state.salaryChangeHistoryList=value
  },
}

export const actions={
  getPaymentList({commit},{date,paymentType}){
    this.$axios.get(`/api/v1/wage-payments?paymentType=${paymentType}&date=${date}`)
    .then((res)=>{
      if(paymentType==="FIXED"){
        commit("setFixedPaymentsList",res.data.data)
      }else{
        commit("setPaymentsList",res.data.data)
      }
    })
    .catch((response)=>{
      console.log(response);

    })
  },
  createPayment({dispatch},{employeeId,wageType,amount,paymentType,date}){
    this.$axios.post(`/api/v1/wage-payments`,{employeeId,wageType,amount})
    .then((_res)=>{
      if(paymentType==="FIXED"){
        dispatch("getPaymentList",{date,paymentType})
      }else{
        dispatch("getPaymentList",{date,paymentType})
      }
    })
    .catch(({response})=>{
      console.log(response);
    })
  },
  getPaymentHistoryList({commit},employeeId){
    commit("setHistoryLoading",true)
    this.$axios.get(`/api/v1/wage-payments/per-work/${employeeId}`)
    .then((res)=>{
      commit("setPaymentHistoryList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
    .finally((_res)=>{
      commit("setHistoryLoading",false)
    })
  },
  getPaymentHistorySalaryList({commit},employeeId){
    commit("setHistorySalaryLoading",true)
    this.$axios.get(`/api/v1/wage-payments/${employeeId}`)
    .then((res)=>{
      commit("setPaymentHistorySalaryList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
    .finally((_res)=>{
      commit("setHistorySalaryLoading",false)
    })
  },
  getPaymentReport({commit},{period,paymentType}){
    this.$axios.get(`/api/v1/wage-payments/generate?period=${period}&paymentType=${paymentType}`)
    .then((res)=>{
      const binaryCode = atob(res.data);
      const blob = new Blob(
        [new Uint8Array([...binaryCode].map((char) => char.charCodeAt(0)))],
        { type: "application/pdf" }
      );
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", objectUrl);
      a.click();
    })
    .catch((response)=>{
      console.log(response);

    })
  },
  getPaymentEmployeeReport({commit},{period,employeeId}){
    this.$axios.put(`/api/v1/wage-payments/employee/generate/`,{period,employeeId})
    .then((res)=>{
      commit("setEmployeeSalaryReport",res.data)
      const binaryCode = atob(res.data);
      const blob = new Blob(
        [new Uint8Array([...binaryCode].map((char) => char.charCodeAt(0)))],
        { type: "application/pdf" }
      );
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", objectUrl);
      a.click();
    })
    .catch((response)=>{
      console.log(response);

    })
  },
  changeMonthlySalary({dispatch},{amount,comment,currency,employeeId,date,paymentType}){
    this.$axios.patch(`/api/v1/wages/employees/${employeeId}`,{amount,comment,currency})
    .then((_res)=>{
      dispatch("getPaymentList",{date,paymentType})
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  salaryChangeHistory({commit},employeeId){
    commit("setHistorySalaryLoading",true)
    this.$axios.get(`/api/v1/wages/employees/${employeeId}`)
    .then((res)=>{
      commit("setSalaryChangeHistory",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
    .finally((_res)=>{
      commit("setHistorySalaryLoading",false)
    })
  }
}
