<template>
  <div class="Signup">
    <Header />
      <div class="container">
        <form class="row" id="checked">
          <h1 class="col-12 mt-5 text-secondary fw-bold">Créer un compte</h1>
          <div class="space-form col-6 mb-1 mt-5">
            <input v-model="name" type="text" class="form-control" placeholder="Nom"  pattern="[a-zA-ZÀ-ÿ-Zàâäéèêëïîôöùûüç[ -]]{2,30}" required/>
          </div>
          <div class="space-form col-6 mb-1 mt-5">
            <input v-model="firstname" type="text" class="form-control" placeholder="Prénom"  pattern="[A-Za-z-àâäéèêëïîôöùûüç[ -]]{2,30}" required />
          </div>
          <div class="space-form col-6 mb-1 mt-1">
            <input v-model="position" type="text" class="form-control"  placeholder="Job"  pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*" required />
          </div>
          <div class="space-form col-6 mb-1 mt-1">
            <input v-model="admin" type="text" class="form-control"  placeholder="Admin"  />
          </div>
          <div class="space-form col-6 mb-5 mt-1">
            <input v-model="password" type="password" class="form-control"  placeholder="Password"  required />
          </div>
          <div class="space-form col-6 mb-5 mt-1">
            <input v-model="email" type="email" class="form-control" placeholder="E-mail"  pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})" required />
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
    createAccount: function () {
      const self = this;
      this.$store.dispatch('createAccount', {
        name: this.name,
        firstname: this.firstname,
        position: this.position,
        admin: this.admin,
        password: this.password,
        email: this.email,
      }).then(function () {
        self.login();
      }, function (error) {
        console.log(error);
      })
    },
  },
};
</script>