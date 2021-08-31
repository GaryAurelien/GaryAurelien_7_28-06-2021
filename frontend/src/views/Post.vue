<template>
  <div class="Post">
    <Header />
    <div class="container">
      <div class="col text-center mb-5 pt-5">
        <h1 class="text-secondary fw-bold">Groupomania</h1>
      </div>
      <div>
        <div>
          <a
            href=""
            class=" btn btn-outline-primary shadow mb-5"
            id="Créer"
            data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
            ><span class="white"> Créer un post </span></a
          >
        </div>

        <!----------------------------------------Création des posts  -------------------------------------->

        <div class="collapse mb-5 " style="d-flex justify-content-center" id="collapseExample">
          <div class="d-flex justify-content-center">
            <div class="card" style="width: 45rem;">
                <div class="container">
                    <div class="col text-center mb-5 pt-5">
                      <h1 class="card_title">Crée ton post !!! 😁</h1>
                    </div>
                  </div>
                  <form class="row" id="checked">
                    <div class="space-form col-10 offset-1">
                      <input v-model="titre" type="text" class="form-control mb-2" id="inputTitre" placeholder="Titre" pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*" required />
                    </div>
                    <div class="space-form col-10 offset-1">
                      <textarea v-model="content" class="form-control mb-2" id="textarea" placeholder="Contenu" pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*" required></textarea>
                    </div>
                    <div class="d-flex flex-column col-10 offset-1 mb-3">
                      <input type="file" accept="image/*" name="imageUrl" class="form-control" id="inputImage" placeholder="Image" aria-label="Image" >
                    </div>
                  </form>
                  <div>
                    <a @click="createPost()" class="btn btn-outline-primary shadow mr-1"
                      ><span>Valider</span></a>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!----------------------------------------Affichage des posts  -------------------------------------->

    <div class="container">
      <div class="row d-flex flex-column-reverse align-items-center justify-content-around  m-2 " id="discution" >
        <div class="card mb-5 p-2 shadow-lg" style="width: 45rem; background-color: #e0e0e0;" v-for="(post, index) in posts" v-bind:key="index" >
          <img class="card-img-top mt-2" v-if="post.file" :src="post.file" alt="Card image cap" />
          <p>{{post.file}}</p>
          <div class="card-body" >
            <h4 class="card-title text-center">{{post.user_name}} {{post.user_firstname}}</h4>
            <h5 class="card-title">{{ post.titre }}</h5>
            <p class="card-text">{{ post.content }}</p>
          </div>
          <div class="text-center" >
            <button type="button"  class=" btn btn-outline-danger mb-3 mt-3" v-if="userId == post.user_id || admin == 1 "  @click="deletePost(post.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" ></path>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" ></path></svg>
            </button>
          </div>
          
          <!----------------------------------------Affichage des commentaires  -------------------------------------->
                  

                    <p>
                        <button @click="getCom(post.id)" class="btn btn-outline-primary" type="button" data-toggle="collapse" :data-target="'#collapseExample'+post.id" aria-expanded="false" aria-controls="collapseExample">
                            Voir les commentaires
                        </button>
                    </p>
                        <div class="collapse row center col-10 offset-1" :id="'collapseExample'+post.id">
                            <div class="card card-body row center mb-2" v-if="commentaires" v-for="commentaire in commentaires" :key="commentaire.id">
                                <h5>{{commentaire.user_name}} {{commentaire.user_firstname}}</h5>
                                <p>{{commentaire.content}}</p>
                                <div class=" text-center  mt-2 ">
                                  <button class="btn btn-outline-danger" v-if="userId == commentaire.user_id || admin == 1 " @click="deleteCom(commentaire.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" ></path>
                                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" ></path></svg></button>
                              </div>
                  
                            </div>
                            <div>
                        <form class="row center mt-1 mb-1" id="checked">
                            <div class="space-form col-10 offset-1">
                                <textarea class="form-control" v-bind:id="post.id" placeholder="Ajouté un commentaire" aria-label="Textarea" required></textarea>
                            </div>
                        </form>
                        <a @click="createCom(post.id)" class=" center btn btn-outline-primary mt-1" id="validateComment"><span>Commenter</span></a>
                        </div>
                        </div>
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
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "Post",
  data() {
    return {
      commentaires: null,
      content: "",
      userId: VueJwtDecode.decode(sessionStorage.getItem("token")).userId,
      postId:"",
      admin: VueJwtDecode.decode(sessionStorage.getItem("token")).admin,
      titre: "",
      content: "",
      user_Id: "",
      user_name: '',
      user_firstname: '',
      userIdSession: sessionStorage.getItem("userId"),
      commentaires: '',
  /*********************Recuperation des posts*********************/
      file: '',
      posts:  
          axios.get("http://localhost:3000/posts/", {
              method: 'GET',
              headers: {
                  'Authorization': 'Bearer ' + sessionStorage.getItem("token")
              }
          })
                  //reponce va etre dans this.posts
                  .then((response) => {
                    this.posts = response.data;
                    console.log(this.posts);
                    console.log(sessionStorage);
                  })
                  .catch((err) => console.log("Erreur : " + err))
            }
  },
 


  methods: {
    
    /*********************Créer un post*********************/

    createPost() {
            const userName = sessionStorage.getItem("userName");
            const userFirstname = sessionStorage.getItem("userFirstname");
            const user_Id = sessionStorage.getItem("userId");
            let file = document.getElementById('inputImage').files[0];

      axios.post("http://localhost:3000/posts/create", {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
          titre: document.getElementById("inputTitre").value,
          content: document.getElementById("textarea").value,
          file: document.getElementById("inputImage").files[0],
          user_name: userName,
          user_firstname: userFirstname,
          user_id: user_Id,
        })
        .then(function (response) {
          console.log(response);
          document.location.reload(); 
        })
        .catch(function (error) {
          console.log(error);
        });
    },

/*********************Supprimer un post*********************/

    deletePost(data) {
      if (confirm("Voulez-vous vraiment supprimer ce post ?")) {
        axios.delete("http://localhost:3000/posts/" + data, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        })
        .then(function(response) { 
            console.log(response);
            document.location.reload();
        }) 
        .catch(function(error) { 
            console.log(error); 
        });
    }},


    /*********************Créer commentaires*********************/

   createCom(data){
            const userName = sessionStorage.getItem("userName");
            const userFirstname = sessionStorage.getItem("userFirstname");
            const user_Id = sessionStorage.getItem("userId");
            axios.post("http://localhost:3000/commentaires/create", {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
                post_id : data,
                content: document.getElementById(data).value,
                name: userName,
                firstname: userFirstname,
                user_id: user_Id,

        })
        .then(function(response) { 
                console.log(response);
                document.location.reload(); 
        }) 
        .catch(function(error) { 
            console.log(error); 
        });
   },


  /*********************Recuperation des commentaires*********************/

getCom(data){

    axios.get("http://localhost:3000/commentaires/" +  data  + "/comment", {
        headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }
    } )
    .then((response) => {
      this.commentaires = response.data;
      console.log(this.commentaires);

    })
    .catch((err) => console.log("Erreur : " + err));

},
/*********************Supprimer commentaires*********************/

   deleteCom(data){
     if (confirm("Voulez-vous vraiment supprimer ce post ?")) {
        axios.delete("http://localhost:3000/commentaires/" + data, {
          headers: {
          "Authorization": "Bearer " + sessionStorage.getItem("token"),
        },
        })
        .then(function(response) { 
            console.log(response);
            document.location.reload();
        }) 
        .catch(function(error) { 
            console.log(error); 
        });
    }},

  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style >

</style>