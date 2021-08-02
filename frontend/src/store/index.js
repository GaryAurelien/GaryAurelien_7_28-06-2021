import { createStore } from 'vuex'
const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/posts/'
});

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    createPost: ({commit}, postInfo) => {
      commit;
      instance.post('/create', postInfo)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  modules: {
  }
})
