<template>
  <div class="home">
    <div class="col text-center ">
      <img src="../assets/Img-Home.png" class="img_home" alt=""/>
    </div>
    <div class="container">
      <div class="row align-items-center justify-content-around m-2">
        <div class="card shadow-lg ">
          <h1 class="card_title" v-if="mode == 'login'">Connection</h1>
          <h1 class="card_title" v-else>Inscription</h1>
          <p class="card_subtitle" v-if="mode == 'login'">Tu na pas encore de compte ? <span class="card_action" @click="switchToCreateAccount()">Créer un compte</span></p>
          <p class="card_subtitle" v-else>Tu a déjà un compte ? <span class="card_action" @click="switchToLogin()">Se connecter</span></p>
          <form enctype="multipart/form-data">
            <div class="form-row">
              <input v-model="email" id="email" type="email" class="form-row_input" placeholder="Adresse mail"  pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})" required />
            </div>
            <div class="form-row" v-if="mode == 'create'">
              <input v-model="name" id="name" type="text" class="form-row_input" placeholder="Nom"  pattern="[a-zA-ZÀ-ÿ-Zàâäéèêëïîôöùûüç[ -]]{2,30}" required/>
              <input v-model="firstname" id="firstname" type="text" class="form-row_input" placeholder="Prénom"  pattern="[A-Za-z-àâäéèêëïîôöùûüç[ -]]{2,30}" required />
              <input v-model="position" id ="position" type="text" class="form-row_input"  placeholder="Job"  pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*" required />
              <div class="form-group center d-flex flex-column col-12 ">
                <input type="file" accept="image/*" id="imageInput" name="profilPic" @change="onFileAdded(event)" required>
                <img :src="imagePreview" v-if="imagePreview" style="max-height: 100px;display:block;margin-top:10px">
              </div>
            </div>
            <div class="form-row">
              <input v-model="password" id="password" type="password" class="form-row_input"  placeholder="Mot de passe"  required />
            </div>
          </form>
          <div class="form-row">
            <button @click="login()" id="button_login" class="button_login" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
              <span>Connexion</span>
            </button>
            <button @click="createAccount()" id="button_create" class="button_create" :class="{'button--disabled' : !validatedFields}" v-else>
              <span>Créer mon compte</span>
            </button>
          </div>
        </div>
      </div>
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
  name: "Home",
  data() {
    return {
      mode: 'login',
      name: '',
      firstname: '',
      position: '',
      admin: '',
      password: '',
      email: '',
      imagePreview:'',
      profilPic:''
    }
  },
  components: {
    Header,
    Footer
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },
    onFileAdded(event){
            const imageInput = document.querySelector('input[type="file"]')
            const file = imageInput.files[0];
            console.log(file);
            this.profilPic = file;
            console.log(this.profilPic);

            /* imageInput.setValue(file); /
           /  this.sauceForm.updateValueAndValidity(); */
            const reader = new FileReader();
            reader.onload = () => {
            this.imagePreview = reader.result ;
            };
            reader.readAsDataURL(file);
      },
    createAccount(){
            console.log(this.profilPic);
            const firstname = document.getElementById('firstname').value;
            const name = document.getElementById('name').value;
            const position = document.getElementById('position').value;
            const password = document.getElementById('password').value;
            const email = document.getElementById('email').value;
            const profilPic = this.profilPic


            const formData = new FormData();
            formData.append('profilPic', profilPic);
            formData.append('firstname', firstname);
            formData.append('name', name);
            formData.append('position', position);
            formData.append('password', password);
            formData.append('email', email);
            console.log(formData);


            axios.post("http://localhost:3000/users/signup", formData , {

                headers: {
                     'Authorization': 'Bearer ', 
                     'content-Type': 'multipart/form-data',
                },
            })
      //traitement de la réponse du serveur
            .then(async response =>{
           console.log(response.data);
                //récupération de la réponse du serveur
                    let confirmation =  await  response.data;
                    console.log(confirmation);

                    sessionStorage.setItem("token", confirmation.token);
                    console.log(sessionStorage);
                    window.location.href ="profile";


            //traitement des erreurs

            }).catch(function(error) { 
                console.log(error); 
                 alert("Mot de passe invalide ! Il faut au minimum 8 caractères non espacés dont une majuscule, une minuscule et 2 chiffres")
            });
    },
    login() {
        //variable qui reccueille les infos de contact du client
            let contact = {
                password : document.getElementById('password').value,
                email : document.getElementById('email').value
            }; 

        //on POST les infos reccueillies au serveur
            let envoi = fetch("http://localhost:3000/users/login", {
                method: 'POST',
                body: JSON.stringify(contact),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        //traitement de la réponse du serveur
            envoi.then( async response =>{
                try{
                    console.log(response);
                //récupération de la réponse du serveur
                    let confirmation = await response.json();
                    console.log(confirmation);
                    if(confirmation.error) { 
                      alert(confirmation.message);
                      console.log(confirmation.message);
                    }else{

                    let userId = confirmation.userId;
                    console.log(userId);
                    
                    let result = {
                        userId: userId,
                    }
                    console.log(result); 
                    
                    sessionStorage.setItem("token", confirmation.token);
                    window.location.href ="profile";

                    
            //traitement des erreurs
                }} catch (error) {
                    console.log(error);
                    alert("Un problème est survenu, merci de réessayer plus tard");
                }
            });
    },
  },
  computed: {
    validatedFields: function () {
      if (this.mode == 'create') {
        if (this.email != "" && this.firstname != "" && this.name != "" && this.password != "" && this.position != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
      }
    },
};
</script>

<style scoped>

.form-row {
  display: flex;
  margin: 16px 0px;
  gap:16px;
  flex-wrap: wrap;
}
.form-row_input {
  padding:8px;
  border: none;
  border-radius: 8px;
  background:#f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex:1;
  min-width: 100px;
  color: black;
}
.form-row_input::placeholder {
  color:#aaaaaa;
}

</style>>