<template>
  <div class="Login">
    <Header />
    <div class="container">
      <form class="row" id="checked">
        <div class="space-form offset-3 col-6 offset-3 mb-2 mt-5">
          <h1 class="col-12 text-center mb-4 text-secondary fw-bold">Se connecter</h1>
          <input v-model="email" type="email" class="form-control" id="inputEmail" placeholder="Adresse mail" aria-label="Email" pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})" required />
        </div>
        <div class="space-form offset-3 col-6 offset-3 mb-5 mt-2">
          <input v-model="password" type="Password" class="form-control" id="inputPassword" placeholder="Mot de passe" aria-label="Password" required />
        </div>
      </form>
      <div class="form-row" v-if="status == 'error_login'">
          Adresse mail et/ou mot de passe invalide
        </div>
      <p class="inscription text-center mb-5">
        Je n'ai pas de
        <a class="text-decoration-none" href="signup">compte</a>. Je m'en
        <a class="text-decoration-none" href="signup">crée</a> un.
      </p>

      <div>
        <button @click="login()" class=" center btn btn-outline-primary shadow" >
          <span v-if="status == 'loading'">Connection en cours...</span>
          <span v-else>Connection</span>
        </button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";


import { mapState } from 'vuex'


export default {
  name: "Login",
   data: function () {
    return {
      password: '',
      email: '',
    }
   },
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapState(['status'])
  },
  methods:{
    login: function () {
      const self = this;
      this.$store.dispatch('login', {
        password: this.password,
        email: this.email,
      }).then(function () {
        self.$router.push('Post');
      }, function (error) {
        console.log(error);
      })
    }
  }
};
</script>