<template>
  <div>
    <Header />
    <div class="container">
      <div class="col text-center mb-5 pt-5">
        <h1 class="text-secondary">Groupomania</h1>
      </div>
    </div>
    <form class="row" id="checked">
      <div class="space-form col-6 offset-3">
        <input
          v-model="titre"
          type="text"
          class="form-control mb-2"
          id="inputTitre"
          placeholder="Titre"
          pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*"
          required
        />
      </div>
      <div class="space-form col-6 offset-3">
        <textarea
          v-model="content"
          class="form-control mb-2"
          id="textarea"
          placeholder="Contenu"
          pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*"
          required
        ></textarea>
      </div>
      <div class="space-form col-6 offset-3 mb-2">
        <label for="fileInput">Ajouter une image</label>
        <input type="file" class="form-control-file" id="fileInput" />
      </div>
    </form>
    <div>
      <a @click="createPost()" class="btn btn-outline-primary shadow mr-1"
        ><span>Valider</span></a
      >
      ou
      <a href="Post" class="btn btn-outline-primary shadow ml-2"
        ><span>Retour</span></a
      >
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default {
  name: "create",
  data() {
    return {
      titre: "",
      content: "",
    };
  },
  components: {
    Header,
    Footer,
  },
  methods: {
    createPost() {
      /*const userName = sessionStorage.getItem("userName");
            const userFirstname = sessionStorage.getItem("userFirstname");
            const user_Id = sessionStorage.getItem("userId");*/
      axios
        .post("http://localhost:3000/posts/create", {
            /*headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
        },*/
          titre: document.getElementById("inputTitre").value,
          content: document.getElementById("textarea").value,
          /*user_name: userName,
          user_firstname: userFirstname,
          id_user: user_Id,*/
        })
        .then(function (response) {
          console.log(response);
          window.location.href = "Post"
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>


<style>
</style>