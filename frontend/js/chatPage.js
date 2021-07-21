/*function getPosts() {
    //appel url
    fetch("http://localhost:3000/posts")
      //then trouver et revien
      .then(function (Response) {
        //donc il retourne
       Response.json()
      })
      //trouve pas ou plante
      .catch(function (error) {
        //retourne ceci
        alert(error)
      })
  };*/

const post = document.getElementById('discution');


const getPosts = async function () {
        let response = await fetch("http://localhost:3000/posts")
        if (response.ok) {
            //une fois que l'on a la reponce on attend la conversion du json en objet
            let data = await response.json()
            console.log(data)
        } else {
            console.error('Retour du serveur : ', response.status)
        }
};

getPosts();

async function afficherListePost() {
    let listePost = await getPosts();
    console.log(listePost);
    afficherPostsHtml(listePost)
};

function afficherPostsHtml(listePostsAAfficher) {
    console.log(listePostsAAfficher)
    //on crée la variable conteneur et on va chercher la div avec id conteneur
    let conteneur = document.getElementById('discution');
    //on crée la variable contenue  vide
    let contenu = '';
    //boucle for pour recupérer chaque post un a un
    for (let i = 0; i < listePostsAAfficher.length; i++) {
        //creation de la constante post courant on y stockera l'post a chaque passage de la boucle
        const postCourant = listePostsAAfficher[i];
        //dans la variable contenue quon a crée vide on y ajoute ce quon aura déffinier dans afficherDetailpostHtml plus loin
        contenu += afficherDetailPostHtml(postCourant);
    }
    //on affiche tout ca (le contenu de contenu) avec un innertHTML dans la div avec id conteneur
    conteneur.innerHTML = contenu
}

/*********************************************************************************************************/



/*************fonction ou l'on crée le html qui sera injjecter dans la div avec l'id conteneur***********/

function afficherDetailPostHtml(post) {
    let contenu = '';
    contenu += `
        <div class="card">
            <h2 class="nom_post">${post.name}</h2>
            <p><strong>Content : </strong>${post.content}€</p>
            <p>date de création : ${post.date_création}</p>
        </div>
    `
    return contenu;
}

/*********************************************************************************************************/