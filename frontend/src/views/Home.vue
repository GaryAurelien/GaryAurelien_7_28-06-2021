<template>
  <div class="home">
    <Header />
    <div class="col text-center mb-5 pt-5">
      <h1>Bienvenue sur Groupomania</h1>
    </div>
    <div class="col text-center">
      <div class="embed-responsive embed-responsive-21by9">
        <img
          class="embed-responsive-item"
          src="https://acegif.com/wp-content/uploads/2021/4fh5wi/bienvn-15.gif"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
  },
};
</script>
