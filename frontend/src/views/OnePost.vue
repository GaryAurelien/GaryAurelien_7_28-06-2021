<template>
    <div class="OnePost">
    <Header />
    <div class="container">
      <div class="row d-flex flex-column-reverse align-items-center justify-content-around  m-5 " id="discution" >
        <div class="card mb-5 p-2 shadow-lg" style="width: 45rem; background-color: #e0e0e0;" >
          <div class="card-body" >
            <h4 class="card-title text-center">post.user_name post.user_firstname</h4>
            <h5 class="card-title"> post.titre </h5>
            <p class="card-text"> post.content </p>
          </div>
          <div class="text-center">
            <button type="button" class=" btn btn-danger mb-3 mt-3"  @click="deletePost(post.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" ></path>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" ></path></svg>
            </button>
          </div>
          
          <p class="card-text">
            <small class="text-muted">post.date_création </small>
          </p>
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
  name: "OnePost",
  data() {
    return {
      posts : null,
      commentaires: null,
      fileoff: 0,
      content: "",
      userId:"",
      postId:"",
      admin: "",
      //pour les posts
      titre: "",
      content: "",
      user_Id: "",
      
    };
  },
  mounted() {
    this.getOnePost();
  },
  methods: {
    getOnePost() {

      const token = localStorage.getItem("token");
      const idPost = this.$route.params.id;
      console.log(idPost);

      axios.get("http://localhost:3000/posts/" + idPost, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
      })
      //reponse va etre dans this.posts
      .then((response) => {
        this.posts = response.data;
        console.log(this.posts);
        console.log(sessionStorage);
      })
      .catch((err) => console.log("Erreur : " + err));
    
      
    },
  },
 components: {
    Header,
    Footer,
  }
};
</script>


<style>

</style>