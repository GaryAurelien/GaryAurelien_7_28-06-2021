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
        commit('setStatus', 'created');
        resolve(response);
      })
      .catch(function (error) {
        commit('setStatus', 'error_create');
        reject(error);
      });
    },
    getAllPost:() => {
      instance.get('/')
      .then((response) => {
        const allPosts = response.data;
        console.log(allPosts);
      })
      .catch((err) => console.log('Erreur : ' + err));
    }
  },
  modules: {
  }
})
