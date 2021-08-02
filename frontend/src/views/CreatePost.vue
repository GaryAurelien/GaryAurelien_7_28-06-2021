<template>
<div>
    <Header />
    <div class='container'>
       
        <div class="col text-center  mb-5 pt-5 ">
            <h1 class="text-secondary">Groupomania</h1>
        </div>
    </div>
    <form class="row" id="checked">
        <div class="space-form col-6 offset-3" >
            <input v-model="titre" type="text" class="form-control mb-2" id="inputTitre" placeholder="Titre" aria-label="Titre"
                pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*" required />
        </div>
        <div class="space-form col-6 offset-3" >
            <textarea v-model="content" class="form-control mb-2" id="content" placeholder="Contenu" aria-label="Contenu"
                pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*" required></textarea>
        </div>
        <div class="space-form col-6 offset-3 mb-2" >
            <label for="fileInput">Ajouter une image</label>
            <input type="file" class="form-control-file" id="fileInput"/>
          </div>
    </form>
    <div>
        <a @click='createPost()' href="Post" class="border-primary btn btn-default offset-3" id="valider"><span>Valider</span></a>
    </div>
    <Footer />
</div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "create",
  data() {
      return {
          model: "create",
          titre: '',
          content: '',
          }
  },
  methods: {
      createPost: function() {
          this.$store.dispatch('createPost', {
              titre: this.titre,
              content: this.content,
          }) 
      }
  },
  components: {
    Header,
    Footer,
  },
};
</script>


<style>

</style>