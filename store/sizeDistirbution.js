export const state=()=>({
  sizeDistirbutionInfo:{},
})



export const actions={
  async getSizeDistirbution({commit},{modelId}){
    this.$axios.get(`/api/v1/orders/size-distributions-info?modelId=1`)
    .then((res)=>{
      console.log(res);
    })
    .catch((response)=>{
      console.log(response);
    })
  },
}