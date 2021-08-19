<template>
  <div class="Signup">
    <Header />
      <div class="container">
        <form class="row" id="checked">
          <h1 class="col-12 mt-5 text-secondary fw-bold">Créer un compte</h1>
          <div class="space-form col-6 mb-1 mt-5">
            <input v-model="name" id="name" type="text" class="form-control" placeholder="Nom"  pattern="[a-zA-ZÀ-ÿ-Zàâäéèêëïîôöùûüç[ -]]{2,30}" required/>
          </div>
          <div class="space-form col-6 mb-1 mt-5">
            <input v-model="firstname" id="firstname" type="text" class="form-control" placeholder="Prénom"  pattern="[A-Za-z-àâäéèêëïîôöùûüç[ -]]{2,30}" required />
          </div>
          <div class="space-form col-6 mb-1 mt-1">
            <input v-model="position" id ="position" type="text" class="form-control"  placeholder="Job"  pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*" required />
          </div>
          <div class="space-form col-6 mb-1 mt-1">
            <input v-model="admin" id="admin" type="text" class="form-control"  placeholder="Admin"  />
          </div>
          <div class="space-form col-6 mb-5 mt-1">
            <input v-model="password" id="password" type="password" class="form-control"  placeholder="Password"  required />
          </div>
          <div class="space-form col-6 mb-5 mt-1">
            <input v-model="email" id="email" type="email" class="form-control" placeholder="E-mail"  pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})" required />
          </div>
        </form>
      </div>
      <div>
        <button @click="createAccount()" class=" center btn btn-outline-primary shadow" id="validate" ><span @click.prevent="sendSignup" class="white"> validate </span></button >
      </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default {
  name: "Signup",
  data: function () {
    return {
      name: '',
      firstname: '',
      position: '',
      admin: '',
      password: '',
      email: '',
    }
  },
  components: {
    Header,
    Footer,
  },
  methods:{
    createAccount() {
      const contact = {
                email : document.getElementById('email').value,
                password : document.getElementById('password').value,
                name : document.getElementById('name').value,
                firstname : document.getElementById('firstname').value,
                position : document.getElementById('position').value
            }; 
            console.log(contact);
     const envoi= fetch("http://localhost:3000/users/signup", {
                method: 'POST',
                body: JSON.stringify(contact),
                headers: {
                    'Content-Type': 'application/json'
                }});
      
      //traitement de la réponse du serveur
            envoi.then(async response =>{
                try{
                    console.log(response);
                //récupération de la réponse du serveur
                    let confirmation = await response.json();
                    console.log(confirmation);
                    sessionStorage.setItem("token", confirmation.token);
                    sessionStorage.setItem("userName", confirmation.userName);
                    sessionStorage.setItem("userFirstname", confirmation.userFirstname);
                    /*window.location.href ="profile";*/
            //traitement des erreurs
                } catch (error) {
                    console.log(error);
                    alert("Un problème est survenu, merci de réessayer plus tard");
                }
            });
    },
  },
};
</script>