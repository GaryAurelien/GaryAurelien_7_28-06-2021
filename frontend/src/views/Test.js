<!----------------------------------------Affichage des commentaires  -------------------------------------->

<div id="accordion">
            <div class=" mb-3 shadow-lg" style="background-color: #e0e0e0;" >
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button @click="getCom(post.id)" v-bind:id="'collapseExpand' + index" class="btn btn-primary" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Commentaire</button>
                </h5>
              </div>
              <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion" >
                <div class="card-body border border-dark p-2 rounded m-2" :id="commentaire.id" v-for="(commentaire, index) in commentaires" v-bind:key="index">
                    <h5>{{commentaire.user_name}} {{commentaire.user_firstname}}</h5>
                     <p class="card-text m-3">{{ commentaire.content }}</p> 
                     <div>
                    <div class="text-center">
                      <button type="button" class=" btn btn-danger Supp"  v-if="userId == commentaire.user_id || admin == 1 " @click="deleteCom(commentaire.id)">
                        <div class="icons align-items-center" v-if="userId == commentaire.user_id || admin == 1 "> <i class="fas fa-globe "></i> <i class="fa fa-check-circle-o check-icon"></i> </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" ></path>
                          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" ></path></svg>
                      </button>
                    </div>
                </div>            
                </div>

              <!----------------------------------------Création des commentaires  -------------------------------------->

                <div class="card-body">
                  <form class="row" id="checked">
                    <div class="space-form col-6 offset-3">
                      <textarea v-model="content" class="form-control mb-2" v-bind:id="post.id" placeholder="Votre commentaire ICI" pattern="[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*" required></textarea>
                    </div>
                  </form>
                  <div>
                    <a @click="createCom(post.id)" id="validationCom" class="btn btn-outline-primary shadow mr-1"
                      ><span>Valider</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>