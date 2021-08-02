<template>
  <div class="Login">
    <Header />

    <div class="container">
      <form class="row" id="checked">
        <div class="space-form offset-3 col-6 offset-3 mb-2 mt-5">
          <h1 class="col-12 text-center mb-4">Se connecter</h1>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            placeholder="E-mail"
            aria-label="Email"
            pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})"
            required
          />
        </div>
        <div class="space-form offset-3 col-6 offset-3 mb-5 mt-2">
          <input
            type="text"
            class="form-control"
            id="inputPassword"
            placeholder="Password"
            aria-label="Password"
            required
          />
        </div>
      </form>
      <p class="inscription text-center mb-5">
        Je n'ai pas de
        <a class="text-decoration-none" href="signup">compte</a>. Je m'en
        <a class="text-decoration-none" href="signup">crée</a> un.
      </p>

      <div>
        <a
          href="#"
          class="col-5 center btn btn-outline-primary shadow"
          id="validate"
          ><span class="white"> validate </span></a
        >
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
  name: "Login",
  components: {
    Header,
    Footer,
  },
};
</script>