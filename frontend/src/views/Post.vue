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
            href="create"
            class="center btn btn-outline-primary shadow mb-5"
            id="Créer"
            ><span class="white"> Créer un post </span></a
          >
        </div>
      </div>
    </div>
    <div class="container">
      <div
        class="
          row
          d-flex
          flex-column-reverse
          align-items-center
          justify-content-around
          m-2
        "
        id="discution"
      >
        <div
          class="card mb-5 p-2"
          style="width: 35rem"
          v-for="(posts, index) in posts"
          v-bind:key="index"
        >
          <img
            class="card-img-top mt-2"
            v-bind:src="posts.file"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{{ posts.titre }}</h5>
            <p class="card-text">{{ posts.content }}</p>
          </div>
          <a
            href=""
            @click="deletePost(posts.id)"
            class="col-10 offset-1 btn btn-danger mb-3"
            ><span class="gradient">Suprimer</span></a
          >
          <div id="accordion">
            <div class="card col-10 offset-1 mb-3">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button
                    class="btn btn-primary"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Commentaire
                  </button>
                </h5>
              </div>
              <div
                id="collapseOne"
                class="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
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
    };
  },
  mounted() {
    axios
      //on recupere l'api
      .get("http://localhost:3000/posts/")
      //reponce va etre dans this.posts
      .then((response) => {
        this.posts = response.data;
        console.log(this.posts);
      })
      .catch((err) => console.log("Erreur : " + err));
  },
  methods: {
    deletePost(data) {
      axios.delete("http://localhost:3000/posts/" + data, {
        /*headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },*/
      });
    },
  },
  components: {
    Header,
    Footer,
  },
};
</script>