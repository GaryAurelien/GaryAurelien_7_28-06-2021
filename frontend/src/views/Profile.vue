<template>
<div>
    <Header />
        <div class="container" v-if="admin == 0">
            <div class="col text-center mb-5 pt-5">
                <h1 class="text-secondary fw-bold">Groupomania</h1>
            </div>
            <div class="row justify-content-center m-2 mt-5" v-if="admin == 0">
                <div class="card p-5">
                    <h3 class="card-title m-2">{{ userName + " " + userFirstname }}</h3>
                    <p>Job: {{  position }}</p>
                    <p class="card-subtitle m-2">Voilà donc qui je suis...</p>
                    <img>
                    <div class="row d-flex flex-column mt-5">
                        <button @click="deconnectionAccount()" class="center btn btn-outline-primary shadow">Déconnexion</button>    
                        <button @click="deleteMyAccount()"  class="center btn btn-outline-danger shadow mt-2">Suprimer</button>       
                    </div>
                </div>
            </div>
        </div>
        <div v-if="admin == 1 ">
            <div class="col text-center mb-5 pt-5">
                <h1 class="text-secondary fw-bold">Groupomania</h1>
            </div>
            <div class="row justify-content-center m-2 mt-5" v-for="(user, index) in users" v-bind:key="index">
                <div class="card p-5">
                    <h3 class="card-title m-2">{{ user.name + " " + user.firstname }}</h3>
                    <p>Job: {{  user.position }}</p>
                    <p class="card-subtitle m-2">Voilà donc qui je suis...</p>
                    <img>
                    <div class="row d-flex flex-column mt-5">
                        <button @click="deconnectionAccount()" class="center btn btn-outline-primary shadow">Déconnexion</button>         
                        <button @click="deleteMyAccount()"  class="center btn btn-outline-danger shadow mt-2">Suprimer</button>       
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
        userFirstname: sessionStorage.getItem("userFirstname"),
        userName: sessionStorage.getItem("userName"),
        userId: VueJwtDecode.decode(sessionStorage.getItem("token")).userId,
        position: sessionStorage.getItem("position"),
        admin: VueJwtDecode.decode(sessionStorage.getItem("token")).admin,
        id: "",
/*********************Recuperation tout les users*********************/
        users: 
            axios.get("http://localhost:3000/users/", {
                method: 'GET',
                headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                        })
                        //reponce va etre dans this.posts
                        .then((response) => {
                            this.users = response.data;
                            console.log(this.users);
                            console.log(sessionStorage);
                        })
                        .catch((err) => console.log("Erreur : " + err))
        }
  },


methods: { 
    
    deconnectionAccount() {
            sessionStorage.clear();
            location.replace(location.origin+'/#/signup');
    },
    localClear() {
            sessionStorage.clear();
            router.push({ path : "/" });
    },
    deleteMyAccount() {
        let id = sessionStorage.getItem("userId");
        let confirmUserDeletion = confirm("voulez-vous vraiment supprimer votre compte ?");
        if (confirmUserDeletion == true) {
            axios.delete("http://localhost:3000/users/" + id, /*{headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") }}*/)
            .then((res)=> {
                console.log(res);
                sessionStorage.clear();
                location.replace(location.origin+'/#/signup');
                alert('Cliquez sur ok et l\'utilisateur sera supprimé');
            })
            .catch((error) => { 
                console.log(error)
            })
        } else {
            return 
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
 
</style>