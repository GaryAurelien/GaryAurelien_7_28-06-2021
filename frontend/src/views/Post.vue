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

        <!----------------------------------------Affichage et  Création de post  -------------------------------------->

        <div class="collapse mb-5 " style="d-flex justify-content-center" id="collapseExample">
          <div class="d-flex justify-content-center">
            <div class="card" style="width: 45rem;">
                <div class="container">
                    <div class="col text-center mb-5 pt-5">
                      <h1 class="card_title">Créer ton post 😁</h1>
                    </div>
                  </div>
                  <form class="row" id="checked">
                    <div class="space-form col-6 offset-3">
                      <input v-model="titre" type="text" class="form-control mb-2" id="inputTitre" placeholder="Titre" pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*" required />
                    </div>
                    <div class="space-form col-6 offset-3">
                      <textarea v-model="content" class="form-control mb-2" id="textarea" placeholder="Contenu" pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*" required></textarea>
                    </div>
                    <div class="space-form col-6 offset-3 mb-2">
                      <label for="fileInput" class="m-2">Ajouter une image</label>
                      <input type="file" class="form-control-file mb-2" id="fileInput" />
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

    <!----------------------------------------Affichage et  Création de commentaire  -------------------------------------->

    <div class="container">
      <div class="row d-flex flex-column-reverse align-items-center justify-content-around  m-2 " id="discution" >
        <div class="card mb-5 p-2 shadow-lg" style="width: 45rem; background-color: #e0e0e0;" v-for="(posts, index) in posts" v-bind:key="index" >
          <img class="card-img-top mt-2" v-bind:src="posts.file" alt="Card image cap" />
          <div class="card-body" >
            <h4 class="card-title text-center">{{posts.user_name}} {{posts.user_firstname}}</h4>
            <h5 class="card-title">{{ posts.titre }}</h5>
            <p class="card-text">{{ posts.content }}</p>
          </div>
          <div class="text-center">
            <button type="button" class=" btn btn-danger mb-3"  @click="deletePost(posts.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" ></path>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" ></path></svg>
            </button>
          </div>
          <div id="accordion">
            <div class=" mb-3 shadow-lg" style="background-color: #e0e0e0;" >
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-primary" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Commentaire</button>
                </h5>
              </div>
              <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion" >
                <div class="card-body border border-dark p-2 rounded m-2" v-for="(commentaires, index) in commentaires" v-bind:key="index">
                    <h5>{{commentaires.user_name}} {{commentaires.user_firstname}}</h5>
                     <p class="card-text m-3">{{ commentaires.content }}</p> 
                     <div>
                    <div class="text-center">
                      <button type="button" class=" btn btn-danger Supp"  @click="deleteCom(commentaires.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" ></path>
                          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" ></path></svg>
                      </button>
                    </div>
                </div>            
                </div>
                <div class="card-body">
                  <form class="row" id="checked">
                    <div class="space-form col-6 offset-3">
                      <textarea v-model="content" class="form-control mb-2" id="commentTextarea" placeholder="Votre commentaire ICI" pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*" required></textarea>
                    </div>
                  </form>
                  <div>
                    <a @click="createCom()" id="validationCom" class="btn btn-outline-primary shadow mr-1"
                      ><span>Valider</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="card-text">
            <small class="text-muted">{{ posts.date_création }}</small>
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
  name: "Post",
  data() {
    return {
      posts: null,
      commentaires: null,
      content: "",
      userId:"",
      postId:"",
      //pour les posts
      titre: "",
      content: "",
    };
  },
  mounted() {

 /*********************Recuperation des posts*********************/

    axios.get("http://localhost:3000/posts/")
      //reponce va etre dans this.posts
      .then((response) => {
        this.posts = response.data;
        console.log(this.posts);
      })
      .catch((err) => console.log("Erreur : " + err));

/*********************Recuperation des commentaires*********************/

    axios.get("http://localhost:3000/commentaires/")
    .then((response) => {
      this.commentaires = response.data;
      console.log(this.commentaires);
    })
    .catch((err) => console.log("Erreur : " + err));
},
  
  methods: {

    /*********************Créer un post*********************/

    createPost() {
            const userName = sessionStorage.getItem("userName");
            const userFirstname = sessionStorage.getItem("userFirstname");
            const user_Id = sessionStorage.getItem("userId");

      axios.post("http://localhost:3000/posts/create", {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
          titre: document.getElementById("inputTitre").value,
          content: document.getElementById("textarea").value,
          user_name: userName,
          user_firstname: userFirstname,
          userId: user_Id,
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


    /*********************Créer commentaires*********************/

    /*createCom(){
        //variable qui reccueille les infos de contact du client
        let comment = {
            content : document.getElementById('commentTextarea').value
        }; 
        console.log(comment);

    //on POST les infos reccueillies au serveur
        const envoi = fetch("http://localhost:3000/commentaires/create", {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        });
    //traitement de la réponse du serveur
        envoi.then(async response =>{
            try{
                console.log(response);
            //récupération de la réponse du serveur
                let confirmation = await response.json();
                console.log(confirmation);
                window.location.href = 'post';

                
        //traitement des erreurs
            } catch (error) {
                console.log(error);
                alert("Un problème est survenu, merci de réessayer plus tard");
            }
        });
    },*/


   createCom(){
            const userName = sessionStorage.getItem("userName");
            const userFirstname = sessionStorage.getItem("userFirstname");
            const user_Id = sessionStorage.getItem("userId");
            axios.post("http://localhost:3000/commentaires/create", {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
                content: document.getElementById("commentTextarea").value,
                user_name: userName,
                user_firstname: userFirstname,
                userId: user_Id,
        })
        .then(function(response) { 
                console.log(response);
                document.location.reload(); 
        }) 
        .catch(function(error) { 
            console.log(error); 
        });
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