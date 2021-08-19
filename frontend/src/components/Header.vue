<template>
<header>
    <div class="bg-primary shadow">
        <div class="container ">
            <div class="row">
                <nav class="col navbar navbar-expand-lg navbar-dark">
                    <a class="navbar-brand" href="/">
                        <img src="../assets/icon.png" width="50" height="50" alt="Info Logo" />
                        Groupomania
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div id="navbarContent" class="collapse navbar-collapse justify-content-end ">
                        <ul class="navbar-nav">
                            <router-link class="navbar-brand" to="/">Accueil</router-link> 
                            <router-link class="navbar-brand" to="/Profile">Mon Profile</router-link>
                            <router-link class="navbar-brand" to="/Post">Post</router-link>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</header>
</template>

<script>
export default {
  name: 'Header'
}
</script>


<style scoped>
.router-link-active {
  font-weight: bold;
  color: red
  };
</style>