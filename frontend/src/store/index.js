import { createStore } from 'vuex'
const axios = require('axios');


export default createStore({
  state: {
    status: '',
    user: {
      userId: -1,
      token:'',
    },
  },
  mutations: {
    setStatus: function(state, status) {
      state.status = status;
    },
    logUser: function(state, user) {
      state.user = user;
    },
  },
  getters: {
  },
  actions: {
//************************connection compte***********************

    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      axios.post('http://localhost:3000/users/login', userInfos)
      .then( response =>{
        commit('setStatus', '');
        commit('logUser', response.data);
        try{
            console.log(response);
        //récupération de la réponse du serveur
            let confirmation =  response;
            console.log(confirmation);
            sessionStorage.setItem("token", confirmation.data.token);
            sessionStorage.setItem("userName", confirmation.data.userName);
            sessionStorage.setItem("userFirstname", confirmation.data.userFirstname);
    //traitement des erreurs
        } catch (error) {
          commit('setStatus', 'error_login');
            console.log(error);
            alert("Un problème est survenu, merci de réessayer plus tard");
        }
    });
    },
  },
  modules: {
  }
});




