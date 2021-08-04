<template>
  <div class="Post">
    <Header />
    <div class="container">
      <div class="col text-center mb-5 pt-5">
        <h1 class="text-secondary">Groupomania</h1>
      </div>
      <div>
        <div class="row mb-5">
          <a href="create" class=" offset-5 col-2 offset-5 mb-3 center btn btn-outline-primary shadow" id="Créer"><span class="white"> Nouveau un Post </span></a
          >
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row d-flex flex-column-reverse align-items-center justify-content-around m-5" id="discution">
        <div class="card mb-5" style="width: 18rem" v-for="(post, idx) in posts" v-bind:key="idx">
                            <img class="card-img-top mt-2" src=""  alt="Card image cap">
                            <div class="card-body">
                            <h5 class="card-title">{gsrghsgsgs}</h5>
                            <p class="card-text">sgsgsegeg</p>
                            </div>
                            <a href="./detailPost.html?id=${post.id}" class="col-10 offset-1 btn btn-primary mb-3"><span class="gradient">Voir détails</span></a>
                            <p class="card-text"><small class="text-muted">${post.date_création}</small></p>
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
  name: "Post",
  data() {
    return {
      posts: []
    };
  },
  async created() {
    this.posts = (await axios.get('http://localhost:3000/posts/'));
  },
  components: {
    Header,
    Footer,
  },
};
</script>