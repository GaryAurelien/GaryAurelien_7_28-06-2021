<template>
  <div class="Post">
    <Header />
    <div class="container">
      <div class="col text-center m-3">
        <a class="navbar-brand" href="post"><img src="../assets/Img-Home.png" class="img_home" alt="Image Home"></a>
      </div>
      <div>
        <div>
          <a href="" class=" btn base shadow mb-5" id="Créer" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" ><span class="white"> Créer un post </span></a>
        </div>

        <!----------------------------------------Création des posts  -------------------------------------->

        <div class="collapse mb-5 " style="d-flex justify-content-center" id="collapseExample">
          <div class="d-flex  justify-content-center">
            <div class="card " style="width: 45rem;">
              <div class="container d-flex justify-content-center">
                <div class="col text-center mb-5 pt-5">
                  <h1 class="card_title">Crée ton post !!! 😁</h1>
                </div>
              </div>
              <form enctype="multipart/form-data" id="checked">
                <div class="space-form col-md-6 offset-md-3">
                  <input v-model="titre" type="text" class="form-control mb-2" id="inputTitre" placeholder="Titre" pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*"/>
                </div>
                <div class="space-form col-md-6 offset-md-3">
                  <textarea v-model="content" class="form-control mb-2" id="textarea" placeholder="Contenu" pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*" required></textarea>
                </div>
                <div class="form-group d-flex flex-column col-md-6 offset-md-3 mb-4">
                  <input type="file" accept="image/*" id="imageInput" name="image" @change="onFileAdded(event)">
                  <img :src="imagePreview" v-if="imagePreview" class="postPic">
                </div>
              </form>
              <div>
                <a @click="createPost()" class="btn base shadow mr-1"><span>Valider</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!----------------------------------------Affichage des posts  -------------------------------------->

    <div class="container">
      <div class="row d-flex  align-items-center justify-content-around  m-1 " id="discution" >
        <div class="card mb-5  p-2 shadow-lg" style="width: 45rem; background-color: #e0e0e0;" v-for="(post, index) in posts" v-bind:key="index" >
          <div class="card-body" >
            <img class="profilPic" v-if="post.profilPic" :src="post.profilPic" alt="Photo de Profil du créateur du post"> 
            <h4 class="card-title text-center mb-4"> {{post.name}} {{post.firstname}}</h4>
            <img class="col-lg-6 col-md-8 col-12 imgCard" v-if="post.imageUrl" :src="post.imageUrl" alt="Image du post">
            <h5 class="card-title mt-3">{{ post.titre }}</h5>
            <p class="card-text mt-3">{{ post.content }}</p>
          </div>
          <div class="text-center" >
            <button type="button"  class=" btn supprimer mb-3 mt-3" v-if="userId == post.user_id || admin == 1 "  @click="deletePost(post.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" ></path><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" ></path></svg>Supprimer</button>
          </div>
          
          <!----------------------------------------Affichage des commentaires  -------------------------------------->
                  
          <div class="row m-2">
            <button @click="getCom(post.id)" type="button" id="btnModal" class=" btn btn base col-md-4 offset-md-4" data-toggle="modal" :data-target="'#myModal'+post.id" aria-expanded="false">Commentaires</button>
            <div class="modal fade" :id="'myModal'+post.id" role="dialog">
              <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-btn supprimer">
                        <h5 class="modal-title" style="font-size:1.2rem">Commentaires</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="card card-body mb-3" v-if="commentaires" v-for="comm in commentaires" :key="comm.id">
                          <img class="profilPic" v-if="comm.profilPic" :src="comm.profilPic" alt="Photo Profil du créateur du commentaire"> 
                          <h5>{{comm.name}} {{comm.firstname}}</h5>
                          <p>{{comm.content}}</p>
                          <a v-if="comm.user_id == userId || admin == 1" @click="deleteCom(comm.id)"  class=" offset-8 col-4 poubelle offset-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" ></path><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" ></path></svg></a>
                      </div>
                      <div v-else>
                          <h5>Il n'y a pas de commentaires pour l'instant </h5>
                      </div>

          <!----------------------------------------Création des commentaires  -------------------------------------->
          
                      <div class="row modal-footer" >
                          <form  id="checked">
                              <div class="row">
                                  <textarea class="form-control" v-bind:id="post.id" placeholder="Ici ton commentaire !!!" aria-label="Textarea" required></textarea>
                              </div>
                          </form>
                          <a @click="createCom(post.id)" class=" col-md-5   center btn base mt-1" id="validateComment"><span>Commenter</span></a>
                      </div>
                    </div>
                </div>
              </div>
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
      userIdSession: VueJwtDecode.decode(sessionStorage.getItem("token")).userId,
      commentaires: '',
      imagePreview: '',
      imageUrl: '',

  /*********************Recuperation des posts*********************/
  
      file: '',
      posts:  
          axios.get("http://localhost:3000/posts", {
              method: 'GET',
              headers: {
                  'Authorization': 'Bearer ' + sessionStorage.getItem("token")
              }
          })
                  //reponce va etre dans this.posts
                  .then((response) => {
                    this.posts = response.data;
                  })
                  .catch((err) => console.log("Erreur : " + err))
            }
  },
 


  methods: {
    
     /*********************Aff Image avant création post*********************/

    onFileAdded(event){
            const imageInput = document.querySelector('input[type="file"]')
            const file = imageInput.files[0];
            this.imageUrl = file;


            const reader = new FileReader();
            reader.onload = () => {
            this.imagePreview = reader.result ;
            };
            reader.readAsDataURL(file);
      },
    
    /*********************Créer un post*********************/

    createPost() {
      let FormValid = document.getElementById('checked').checkValidity();
        if (FormValid == false ) {
            alert(`Au moins une photo et un contenu s'il te plaît !!`);
        }else{

      const user_Id = VueJwtDecode.decode(sessionStorage.getItem("token")).userId;
      const titre = document.getElementById("inputTitre").value;
      const content = document.getElementById("textarea").value;
      const imageUrl = this.imageUrl;

      const formData = new FormData();
      formData.append('image', imageUrl);
      formData.append('titre', titre);
      formData.append('content', content);
      formData.append('user_id', user_Id);

      axios.post("http://localhost:3000/posts/create", formData, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            'content-Type': 'multipart/form-data'
          },
      })
      .then(function (response) {
        document.location.reload(); 
      })
      .catch(function (error) {
        console.log(error);
      });
      }
    },

   
/*********************Supprimer un post*********************/

    deletePost(data) {
      if (confirm("Tu veux vraiment supprimer ce post ?")) {
        axios.delete("http://localhost:3000/posts/" + data, {
          headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
        },
        })
        .then(function(response) {
            document.location.reload();
        }) 
        .catch(function(error) { 
            console.log(error); 
        });
    }},


    /*********************Créer commentaires*********************/

    createCom(data){
        if (document.getElementById(data).value == "") {
            alert(`Tu as oublié ton commentaire !!`);
        }else{

      const userName = VueJwtDecode.decode(sessionStorage.getItem("token")).userName;
      const userFirstname = VueJwtDecode.decode(sessionStorage.getItem("token")).userFirstname;
      const user_Id = VueJwtDecode.decode(sessionStorage.getItem("token")).userId;

      axios.post("http://localhost:3000/commentaires/create", {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
      },
        post_id : data,
        content: document.getElementById(data).value,
        name: userName,
        firstname: userFirstname,
        user_id: user_Id,
      })
      .then(function(response) {
              document.location.reload(); 
      }) 
      .catch(function(error) { 
          console.log(error); 
      });
      }
    },


  /*********************Recuperation des commentaires*********************/

    getCom(data){
        this.commentaires = "";
        axios.get("http://localhost:3000/commentaires/" +  data  + "/comment", {
            headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                    }
        } )
        .then((response) => {
          this.commentaires = response.data;

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

.poubelle{
  font-size: 40px;
  display: flex;
  color: red;
  justify-items: center;
  cursor: pointer;
}

.postPic{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
    margin-top: 15px;
    border:  solid #091f43 4px;
    width: 150px;
    height: 150px;
    object-fit: cover;
    object-position: 50% 50%;
}

.profilPic{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
    margin-top: 15px;
    border-radius: 50% ;
    border:  solid #091f43 4px;
    width: 75px;
    height: 75px;
    object-fit: cover;
    object-position: 50% 50%;
}

@media screen and (max-width:326px){
 
  p , span , input{
    font-size: 0.2rem;
  }
  
}

</style>