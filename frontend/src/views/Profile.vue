<template>
<div>
    <Header />
        <div class="container">
            <div class="row align-items-center justify-content-around m-2 mt-5" >
                <div class="card p-5">
                    <h1 class="card-title m-2">Espace Perso</h1>
                    <p class="card-subtitle m-2">Voilà donc qui je suis...</p>
                    <img>
                    <div class="form-row mt-5">
                        <button class="center btn btn-outline-primary shadow">Déconnexion</button>      
                    </div>
                    <div class="form-row mt-2">
                        <button class="center btn btn-outline-primary shadow">Modifier</button>      
                    </div>
                    <div class="form-row mt-2">
                        <button class="center btn btn-outline-primary shadow">Suprimer</button>       
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

export default {
    name: "Profile",
components: {
    Header,
    Footer,
  },
}
</script>

<style scoped>
 
</style>