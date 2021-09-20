<template>
    <div>
        <Header />
            <div class="container">
                <div class="col text-center m-3">
                    <a class="navbar-brand" href="post"><img src="../assets/Img-Home.png" class="img_home" alt="Image Home"></a>
                </div>

            <!----------------------------------------Affichage profil si non admin-------------------------------------->

                <div class="row justify-content-center m-1" v-if="admin == 0">
                    <div class="card">
                        <h1 class="text-center">Votre Profil</h1>
                    <div>
                    <img class="profilPic" v-if="pic" :src="pic" alt="Photo de Profil "> 
                    <h3 class="card-subtitle mb-2">Nom : {{ userName  }}</h3>
                    <h3 class="card-subtitle mb-2">Prénom : {{ userFirstname }}</h3>
                    <p class="card-subtitle mb-2">Poste : {{  position }}</p>
                    <p class="card-subtitle mb-2">E-mail : {{ email }}</p>
                    <div class="container">
                        <!--editer lance le processus de modification de profil -->
                    <button type="button" id="btnModal" class="btn btn base mt-3 " data-toggle="modal" data-target="#myModal" aria-expanded="false">Éditer</button>

                <!----------------------------------------Pour modifier sont profil taper sont mdp pour valider que nous somme bien le bonne utilisateur-------------------------------------->   
                        
                        <div class="modal fade" id="myModal" role="dialog">
                            <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header bg-btn supprimer">
                                    <h5 class="modal-title ">Saisissez votre mot de passe</h5>
                                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form class="row" id="checked" >
                                        <div class="space-form col-md-6 offset-md-3 mb-2">
                                            <input type="password" v-model="password" class="form-control" id="inputPassword2" placeholder="Mot de passe" aria-label="Password" required>
                                        </div>
                                    </form>
                                    <a @click="checkProfil()" class="btn btn base offset-4 m-2" id="modif">Valider</a>
                                </div> 
                            </div>
                            </div>
                        </div>
                    </div>

                <!----------------------------------------Si profil === true -------------------------------------->

                    <div v-if="profil===true" >
                        <button class=" btn base  mt-2 mb-2" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Modifier
                        </button>
    
                        <div class="collapse" id="collapseExample">
                            <div>
                                <form enctype="multipart/form-data" class="row align-items-center justify-content-around " id="checked" >
                                    <div class="form-row  mt-3">
                                        <input type="file" accept="image/*" id="imageInput" name="profilPic" @change="onFileChange(e)" required>
                                        <img :src="imagePreview" v-if="imagePreview" style="max-height: 100px;display:block;margin-top:10px">
                                    </div>
                                    <div class="form-row">
                                        <input type="text" v-model="userName" class="form-row_input" id="inputNom" placeholder="Nom" aria-label="Nom"  required />
                                        <input type="text" v-model="userFirstname" class="form-row_input" id="inputPrenom" placeholder= "Prénom" aria-label="Prenom"  required />
                                        <input type="text" v-model="position" class="form-row_input" id="inputJob" placeholder= "Job" aria-label="position" required />
                                    </div>
                                    <div class="form-row">
                                        <input type="email" v-model="email" class="form-row_input" id="inputEmail" placeholder= "E-mail" aria-label="Email"  required />
                                    </div>
                                    <div class="form-row">
                                        <input type="text" v-model="password" class="form-row_input" id="inputPassword" placeholder="Mot de passe" aria-label="Password" required />
                                    </div>
                                </form>
                                
                                <a @click="updateProfil()" class="btn btn base offset-3  m-2" id="modif">Valider</a>
                                
                            </div>
                        </div>
                        <div>
                        <button @click="deleteProfil(id)" class=" btn supprimer  mt-2" id="suppr">Supprimer</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <!----------------------------------------Affichage profil si admin === 1-------------------------------------->
            
            <div v-if="admin == 1 ">
                <div class="row justify-content-center m-2 mt-5" v-for="(user, index) in users" v-bind:key="index">
                    <div class="card">
                        <h2 class="article-content text-success" v-if="user.admin == 1">Admin</h2>
                        <img class="profilPic"  :src="user.profilPic" alt="Image Profil">
                        <h3 class="card-subtitle mb-2">Nom : {{ user.name  }}</h3>
                        <h3 class="card-subtitle mb-2">Prénom : {{ user.firstname }}</h3>
                        <p class="card-subtitle mb-2">Poste : {{  user.position }}</p>
                        <p class="card-subtitle mb-2">E-mail : {{ user.email }}</p>
                        <div class="row d-flex flex-column mt-5">   
                            <button @click="deleteProfilAdmin(user.id)" class="btn supprimer col-10 offset-1 offset-sm-4 col-sm-4  mt-2">Supprimer</button>       
                        </div>
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
import VueJwtDecode from "vue-jwt-decode";

export default {
    name: "Profile",
data() {
    return {
        name: VueJwtDecode.decode(sessionStorage.getItem("token")).name,
        firstname: VueJwtDecode.decode(sessionStorage.getItem("token")).firstname,
        userFirstname: VueJwtDecode.decode(sessionStorage.getItem("token")).userFirstname,
        userName: VueJwtDecode.decode(sessionStorage.getItem("token")).userName,
        userId: VueJwtDecode.decode(sessionStorage.getItem("token")).userId,
        position: VueJwtDecode.decode(sessionStorage.getItem("token")).position,
        admin: VueJwtDecode.decode(sessionStorage.getItem("token")).admin,
        email: VueJwtDecode.decode(sessionStorage.getItem("token")).email,
        pic: VueJwtDecode.decode(sessionStorage.getItem("token")).profilPic,
        id: "",
        profil: "",
        imagePreview:'',
        profilPic:'',
        
/*********************Recuperation tout les users*********************/
        users: 
            axios.get("http://localhost:3000/users/", {
                method: 'GET',
                headers: {
                            "Authorization": 'Bearer ' + sessionStorage.getItem("token")
                        }
                        })
                        //reponce va etre dans this.posts
                        .then((response) => {
                            this.users = response.data;
                        })
                        .catch((err) => console.log("Erreur : " + err))
    }
},


methods: { 

/**************************** Acceder au "menu de profile" ****************************/

    checkProfil(){
        let FormValid = document.getElementById('checked').checkValidity();
        if (FormValid == false ) {
            alert(`Vous n'avez pas rempli tous les champs requis !`);
        }else{
        
        //variable qui reccueille les infos de contact du client
            let contact = {
                password : document.getElementById('inputPassword2').value,
                email : VueJwtDecode.decode(sessionStorage.getItem("token")).email
            };
            
        //on POST les infos reccueillies au serveur
            const envoi =  fetch("http://localhost:3000/users/login", {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        });
        //traitement de la réponse du serveur
            envoi.then(async response =>{
                try{
                //récupération de la réponse du serveur
                    let confirmation = await response.json();
                    //si il y a une erreur dans le mdp 
                    if (confirmation.error){
                        console.log("error")
                        alert("Mot de passe invalide !")
                    }else{
                    //si le mdp et ok on defini profil en true et donc la modification ou suppresion est posible 
                    document.querySelector(".modal-backdrop").remove()
                    document.getElementById('btnModal').remove()
                    document.getElementById('myModal').remove()
                    this.profil = true
                    sessionStorage.setItem('token', confirmation.token)
                    }
            //traitement des erreurs
                } catch (error) {
                    console.log(error);
                    alert("Un problème est survenu, merci de réessayer plus tard");
                }
            });
        };
    },

/*********************Aff Image utiliser dans profile*********************/

    onFileChange(e){
        const imageInput = document.querySelector('input[type="file"]')
        const file = imageInput.files[0];
        this.profilPic = file;

        const reader = new FileReader();
        reader.onload = () => {
        this.imagePreview = reader.result ;
        };
        reader.readAsDataURL(file);
    },


/************************** Modification du profile *****************************/


    updateProfil(){
    let FormValid = document.getElementById('checked').checkValidity();
        if (FormValid == false ) {
            alert(`Vous n'avez pas rempli tous les champs requis !`);
        }else{
            
            //on recupere les données du formulaire
            const firstname = document.getElementById('inputPrenom').value;
            const name = document.getElementById('inputNom').value;
            const position = document.getElementById('inputJob').value;
            const password = document.getElementById('inputPassword').value;
            const email = document.getElementById('inputEmail').value;
            const admin =  VueJwtDecode.decode(sessionStorage.getItem("token")).admin;
            const profilPic = this.profilPic;

            
            const formData = new FormData();
            formData.append('firstname', firstname);
            formData.append('name', name);
            formData.append('position', position);
            formData.append('password', password);
            formData.append('email', email);
            formData.append('admin', admin);
            formData.append('profilPic', profilPic);

            const userId = VueJwtDecode.decode(sessionStorage.getItem("token")).userId;

            axios.put('http://localhost:3000/users/' + userId, formData,{
                
                headers:{
                    'Content-Type' : 'multpart/form-data',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }
            })
            .then( async response =>{
                try{
                    let confirmation = await response.data;
                    sessionStorage.clear()
                    window.location.href = "/";
                } catch(error) {
                    alert("Une erreur est survenue, veuillez retenter plus tard")
                }
            })}

    },

/************************** Suppresion du profile *****************************/

    deleteProfil(data) {
           if(confirm("Supprimer le profil ?")){
             const userId = VueJwtDecode.decode(sessionStorage.getItem("token")).userId;

               axios.delete('http://localhost:3000/users/' + userId, {
                   method: "DELETE",
                   headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }})
               .then(function(response) {
                    sessionStorage.clear();
                    window.location.href= "/";
                })
                .catch(function(error) {
                    console.log(error);
                }); 
           }
    },

/************************** Suppresion du profile par l'admin*****************************/
    //data qui est l'id du user a qui apartien le profile que l'on souaithe supprimer 
    deleteProfilAdmin(data) {
           if(confirm("Supprimer le profil ?")){
               axios.delete('http://localhost:3000/users/' + data, {
                   method: "DELETE",
                   headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }})
               .then(function(response) {
                    document.location.reload();
                })
                .catch(function(error) {
                    console.log(error);
                }); 
           }
       },
    
},
components: {
    Header,
    Footer,
},

}
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
 
  p , span , input{
    font-size: 0.2rem;
  }
  
}

</style>