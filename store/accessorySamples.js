export const state = () => ({
  samplesList: [],
});

export const getters = {
  samplesList: (state) => state.samplesList,
};

export const mutations = {
  setSamplesList(state, list) {
    state.samplesList = list;
  },
};

export const actions = {
  getSamplesList({ commit }) {
    const body = {
      filters: [
        // {
        //   key: "name",
        //   operator: "LIKE",
        //   propertyType: "STRING",
        //   value: name,
        // },
        // {
        //   key: "code",
        //   operator: "LIKE",
        //   propertyType: "STRING",
        //   value: code,
        // },
      ],
      sorts: [],
      page: 0,
      size: 10,
    };
    body.filters = body.filters.filter(
      (el) => el.value !== "" && el.value !== null
    );

    this.$axios.put('/api/v1/samples/list',body)
    .then((res)=>{
      commit("setSamplesList",res.data.data.content)
      console.log(res);
    })
    .catch((res)=>{
      console.log(res);
    })
  },
};
