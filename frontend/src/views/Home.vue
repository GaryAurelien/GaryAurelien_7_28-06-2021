<template>
  <div class="home">
    <div class="col text-center ">
      <img src="../assets/Img-Home.png" class="img_home" alt="Image Home"/>
    </div>

    <!----------------------------------------Login ou create-------------------------------------->

    <div class="container">
      <div class="row align-items-center justify-content-around m-2">
        <div class="card shadow-lg ">
          <h1 class="card_title connection" v-if="mode == 'login'" >Connection</h1>
          <h1 class="card_title inscription" v-else>Inscription</h1>
          <p class="card_subtitle" v-if="mode == 'login'">Tu na pas encore de compte ? <span class="card_action" @click="switchToCreateAccount()">Créer un compte</span></p>
          <p class="card_subtitle" v-else>Tu a déjà un compte ? <span class="card_action" @click="switchToLogin()">Se connecter</span></p>
          <form enctype="multipart/form-data" id="checked">
            <div class="form-row">
              <input v-model="email" id="email" type="email" class="form-row_input" placeholder="Adresse mail"  pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})" required />
            </div>
            <div class="form-row" v-if="mode == 'create'">
              <input v-model="name" id="name" type="text" class="form-row_input" placeholder="Nom"  pattern="[a-zA-ZÀ-ÿ-Zàâäéèêëïîôöùûüç[ -]]{2,30}" required/>
              <input v-model="firstname" id="firstname" type="text" class="form-row_input" placeholder="Prénom"  pattern="[A-Za-z-àâäéèêëïîôöùûüç[ -]]{2,30}" required />
              <input v-model="position" id ="position" type="text" class="form-row_input"  placeholder="Job"  pattern="[A-Za-z-àâäéèêëïîôöùûüç[ -]]{2,30}" required />
              <div class="form-group center d-flex flex-column col-12 ">
                <input type="file" accept="image/*" id="imageInput" name="profilPic" @change="onFileAdded(event)" required>
                <img :src="imagePreview" v-if="imagePreview" class="profilPic">
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

/*********************Switch de create a login*********************/

  /*Methode qui permet que au click sur la ligne avec la methode défini le mode change en fonction*/

    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },

/*********************Picture*********************/
  //gere la preview de l'image
    onFileAdded(event){
            const imageInput = document.querySelector('input[type="file"]')
            const file = imageInput.files[0];
            this.profilPic = file;

            const reader = new FileReader();
            reader.onload = () => {
            this.imagePreview = reader.result ;
            };
            reader.readAsDataURL(file);
      },

/*********************Creation de compte*********************/

    createAccount(){
      let FormValid = document.getElementById('checked').checkValidity();

        if (FormValid == false ) {
            alert(`Il y a une erreur dans votre formulaire.`);

        }else{
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

            axios.post("http://localhost:3000/users/signup", formData , {
                headers: {
                     'Authorization': 'Bearer ', 
                     'content-Type': 'multipart/form-data',
                },
            })
            .then(async response =>{
                    let confirmation =  await  response.data;
                    sessionStorage.setItem("token", confirmation.token);
                    window.location.href ="profile";


            }).catch(function(error) { 
                console.log(error); 
                 alert("Une erreur est survenue, veuillez réessayer ultérieurement")
            });
        }
    },

/*********************Connection au compte*********************/

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
                //récupération de la réponse du serveur
                    let confirmation = await response.json();
                    if(confirmation.error) { 
                      alert(confirmation.message);
                    }else{
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

/*********************bouton clicable seulement ou les champ définit sont rempli*********************/

    validatedFields: function () {
      // si notre mode est create on veut que tout cela ne soit pas vide
      if (this.mode == 'create') {
        if (this.email != "" && this.firstname != "" && this.name != "" && this.password != "" && this.position != "") {
          return true;
        } else {
          return false;
        }
      // sinon notre mode est login et donc on veut que tout cela ne soit pas vide
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

.profilPic{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
    margin-top: 15px;
    border-radius: 50% ;
    border:  solid #091f43 4px;
    width: 150px;
    height: 150px;
    object-fit: cover;
    object-position: 50% 50%;
}

@media screen and (max-width:326px){
  .connection{
    font-size: 1.3rem;
  }
  p , span , input{
    font-size: 0.2rem;
  }
  .inscription{
    font-size: 1.3rem;

  }
}

</style>>