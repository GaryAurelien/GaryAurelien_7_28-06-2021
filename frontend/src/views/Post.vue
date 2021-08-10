<template>
  <div class="Post">
    <Header />
    <div class="container">
      <div class="col text-center mb-5 pt-5">
        <h1 class="text-secondary fw-bold">Groupomania</h1>
      </div>
      <div>
        <div>
          <a href="create" class="center btn btn-outline-primary shadow mb-5" id="Créer"><span class="white"> Créer un post </span></a>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row d-flex flex-column-reverse align-items-center justify-content-around m-2" id="discution">
        <div class="card mb-5 p-2" style="width: 18rem" v-for="(posts, index) in posts" v-bind:key="index">
            <img class="card-img-top mt-2" v-bind:src="posts.file"  alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">{{ posts.titre }}</h5>
            <p class="card-text">{{ posts.content }}</p>
            </div>
            <a href="DetailPost" class="col-10 offset-1 btn btn-primary mb-3"><span class="gradient">Voir détails</span></a>
            <p class="card-text"><small class="text-muted">{{ posts.date_création }}</small></p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>



<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

import axios from 'axios'

export default {
  name: "Post",
  data(){
    return {
      posts: null,
    }
  },
  mounted() {
   axios
        //on recupere l'api
        .get('http://localhost:3000/posts/')
        //reponce va etre dans this.posts
        .then((response) => {
        this.posts = response.data;
        console.log(this.posts);
  });
  },
  methods: {
  },
  components: {
    Header,
    Footer,
  },
};
</script>