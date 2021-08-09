<template>
  <div class="home">
    <Header/>
    <div class="col text-center  mb-5 pt-5">
      <h1 class="text-secondary fw-bold">Bienvenue sur Groupomania</h1>
    </div>
    <div class="col text-center">
      <div class="embed-responsive embed-responsive-21by9">
        <img
          class="img-fluid mb-5 mt-5"
          src="https://acegif.com/wp-content/uploads/2021/4fh5wi/bienvn-15.gif" width="400"
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

<style scoped>

</style>