const urlPostId = "http://localhost:3000/posts/";
const searchParam = new URLSearchParams(window.location.search).get("id");
const urlApiId = urlPostId + searchParam;
console.log(urlApiId);
const postContainer = document.getElementById('postId');


/***********************fonction pour affichage des posts*******************/
function displayPostId(data) {
    let postElement = '';
    postElement += `
                <img src=${data.file} alt="">
                <div class="info">
                    <h1>${data.content}</h1>
                </div>
                <div>
                    <a href="./post.html" class="offset-5 col-2 offset-5 center mt-2 btn btn-outline-primary shadow" id="validate"><span class="white"> Retour
                    </span></a>
                    <a href="./modifierPost.html?id=${data.id}"" class="offset-5 col-2 offset-5 center mt-2 btn btn-outline-primary shadow"><span class="white"> Modifier
                    </span></a>
                    <a href="#" class="offset-5 col-2 offset-5 center mt-2 btn btn-outline-primary shadow" id="validate"><span class="white"> Supprimer
                    </span></a>
                </div> `;
    postContainer.innerHTML += postElement;
};



fetch(urlApiId)
    .then((response) =>
        response.json()
            .then((data) => {
                console.log(data);
                displayPostId(data);
            })
    )
    .catch((err) => console.log('Erreur : ' + err));

/****************************************************************************/
