<template>
<div>
    <Header />
        <div class="container ">
            <div class="row justify-content-center m-2 mt-5" >
                <div class="card p-5">
                    <h1 class="card-title m-2">{{ nameCurrentUser }}</h1>
                    <p class="card-subtitle m-2">Voilà donc qui je suis...</p>
                    <img>
                    <div class="form-row d-flex justify-content-around mt-5">
                        <button @click="deconnectionAccount()" class="center btn btn-outline-primary shadow">Déconnexion</button>      
                        <button class="center btn btn-outline-primary shadow">Modifier</button>      
                        <button @click="deleteMyAccount()"  class="center btn btn-outline-danger shadow">Suprimer</button>       
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
    name: "Profile",
data() {
    return {
        userFirstname: "",
        userName:"",
        userId: "",
        admin: false,
        nameCurrentUser: "",
        id: "",
    }
  },
methods: { 
    getUserInfo() {
            const userName = sessionStorage.getItem("userName");
            const userFirstname = sessionStorage.getItem("userFirstname");
            const user_Id = sessionStorage.getItem("userId");

            this.userFirstname = userFirstname;
            this.userName = userName;
            this.userId = user_Id;
            return this;
    },
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