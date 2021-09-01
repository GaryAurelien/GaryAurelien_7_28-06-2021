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
          <div class="form-row">
            <input v-model="email" id="email" type="email" class="form-row_input" placeholder="Adresse mail"  pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})" required />
          </div>
          <div class="form-row" v-if="mode == 'create'">
            <input v-model="name" id="name" type="text" class="form-row_input" placeholder="Nom"  pattern="[a-zA-ZÀ-ÿ-Zàâäéèêëïîôöùûüç[ -]]{2,30}" required/>
            <input v-model="firstname" id="firstname" type="text" class="form-row_input" placeholder="Prénom"  pattern="[A-Za-z-àâäéèêëïîôöùûüç[ -]]{2,30}" required />
            <input v-model="position" id ="position" type="text" class="form-row_input"  placeholder="Job"  pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*" required />
          </div>
          <div class="form-row">
            <input v-model="password" id="password" type="password" class="form-row_input"  placeholder="Mot de passe"  required />
          </div>
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
    createAccount() {
      let contact = {
                email : document.getElementById('email').value,
                password : document.getElementById('password').value,
                name : document.getElementById('name').value,
                firstname : document.getElementById('firstname').value,
                position : document.getElementById('position').value
            }; 
            console.log(contact);
     let envoi= fetch("http://localhost:3000/users/signup", {
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

                    let userId = confirmation.userId;
                    console.log(userId);
                    
                    let result = {
                        userId: userId,
                    }
                    console.log(result); 
                    
                    sessionStorage.setItem("confirm", JSON.stringify(result));
                    sessionStorage.setItem("token", confirmation.token);
                    sessionStorage.setItem("userName", confirmation.userName);
                    sessionStorage.setItem("userFirstname", confirmation.userFirstname);
                    sessionStorage.setItem("userId", confirmation.userId);
                    sessionStorage.setItem("position", confirmation.position);
                    window.location.href ="profile";
            //traitement des erreurs
                } catch (error) {
                    console.log(error);
                    alert("Un problème est survenu, merci de réessayer plus tard");
                }
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
                    

                    let userId = confirmation.userId;
                    console.log(userId);
                    
                    let result = {
                        userId: userId,
                    }
                    console.log(result); 
                    
                    sessionStorage.setItem("confirm", JSON.stringify(result));
                    sessionStorage.setItem("token", confirmation.token);
                    sessionStorage.setItem("userName", confirmation.userName);
                    sessionStorage.setItem("userFirstname", confirmation.userFirstname);
                    sessionStorage.setItem("userId", confirmation.userId);
                    sessionStorage.setItem("position", confirmation.position);
                    window.location.href ="profile";

                    
            //traitement des erreurs
                } catch (error) {
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
.main {
  background: linear-gradient(160deg, #e78b07 0%, #8f5bfe 100%);
}
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