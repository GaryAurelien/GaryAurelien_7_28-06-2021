<template>
  <div class="Signup">
    <Header />
      <div class="container">
        <form class="row" id="checked">
          <div class="space-form col-6 mb-1 mt-5">
            <input
              type="text"
              class="form-control"
              id="inputNom"
              placeholder="Nom"
              aria-label="Nom"
              pattern="[a-zA-ZÀ-ÿ-Zàâäéèêëïîôöùûüç[ -]]{2,30}"
              required
            />
          </div>
          <div class="space-form col-6 mb-1 mt-5">
            <input
              type="text"
              class="form-control"
              id="inputPrenom"
              placeholder="Prénom"
              aria-label="Prenom"
              pattern="[A-Za-z-àâäéèêëïîôöùûüç[ -]]{2,30}"
              required
            />
          </div>
          <div class="space-form col-6 mb-1 mt-1">
            <input
              type="text"
              class="form-control"
              id="inputJob"
              placeholder="Job"
              aria-label="Job"
              pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*"
              required
            />
          </div>
          <div class="space-form col-6 mb-1 mt-1">
            <input
              type="text"
              class="form-control"
              id="inputAdmin"
              placeholder="Admin"
              aria-label="Admin"
            />
          </div>
          <div class="space-form col-6 mb-5 mt-1">
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              placeholder="Password"
              aria-label="Password"
              required
            />
          </div>
          <div class="space-form col-6 mb-5 mt-1">
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
        </form>
      </div>
      <div>
        <a
          href="#"
          class="col-5 center btn btn-outline-primary shadow"
          id="validate"
          ><span @click.prevent="sendSignup" class="white"> validate </span></a
        >
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
  components: {
    Header,
    Footer,
  },
  methods: {
    sendSignup() {
      //on vérifie que tout le formulaire est conforme
      let FormValid = document.getElementById("checked")/*.checkValidity()*/;

      //si formulaire pas conforme, alert le client
      if (FormValid == false) {
        alert(`Vous n'avez pas rempli tous les champs requis !`);
        //sinon
      } else {
        //variable qui reccueille les infos de contact du client
        let contact = {
          email: document.getElementById("inputEmail").value,
          password: document.getElementById("inputPassword").value,
          name: document.getElementById("inputNom").value,
          firstname: document.getElementById("inputPrenom").value,
          position: document.getElementById("inputJob").value,
        };
        console.log(contact);

        //on POST les infos reccueillies au serveur
        const envoi = fetch("http://localhost:3000/users/signup", {
          method: "POST",
          body: JSON.stringify(contact),
          headers: {
            "Content-Type": "application/json",
          },
        });
        //traitement de la réponse du serveur
        envoi.then(async (response) => {
          try {
            console.log(response);
            //récupération de la réponse du serveur
            let confirmation = await response.json();
            console.log(confirmation);
            window.location.href = "./chatPage.html";

            //traitement des erreurs
          } catch (error) {
            console.log(error);
            alert("Un problème est survenu, merci de réessayer plus tard");
          }
        });
      }
    },
  },
};
</script>