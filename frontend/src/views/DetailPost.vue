<template>
<div>
    <Header />
    <div class="container">
      <div class="row d-flex flex-column-reverse align-items-center justify-content-around m-5" id="discution">
        <div class="card mb-5" style="width: 18rem" >
            <img class="card-img-top mt-2" src=""  alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">sdfgbsdfrhg</h5>
            <p class="card-text">qwdrsfhgqwsrdhf</p>
            </div>
            <p class="card-text"><small class="text-muted">tedhujsqerhdq</small></p>
            <a href="Post" class="col-10 offset-1 btn btn-primary mb-3"><span class="gradient">Retour</span></a>
            <a href="" class="col-10 offset-1 btn btn-primary mb-3"><span class="gradient">Modifier</span></a>
            <a href="" class="col-10 offset-1 btn btn-primary mb-3"><span class="gradient">Suprimer</span></a>
        </div>
      </div>
    </div>
    <Footer />
</div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>


<style>

</style>