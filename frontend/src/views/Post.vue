<template>
  <div class="Post">
    <Header />
    <div class="container">
      <div class="col text-center mb-5 pt-5">
        <h1 class="text-secondary">Groupomania</h1>
      </div>
      <div>
        <div class="row mb-5">
          <a
            href="create"
            class="
              offset-5
              col-2
              offset-5
              mb-3
              center
              btn btn-outline-primary
              shadow
            "
            id="Créer"
            ><span class="white"> Nouveau un Post </span></a
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
          m-5
        "
        id="discution"
      ></div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Post",
  components: {
    Header,
    Footer,
  },
};
</script>