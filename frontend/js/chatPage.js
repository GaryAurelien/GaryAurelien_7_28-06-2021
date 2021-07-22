const urlPosts = "http://localhost:3000/posts";
const postContainer = document.getElementById('discution');


/***********************fonction pour affichage des posts*******************/
function displayPost(data) {
    let postElement = '';
    for (let post of data) {
        postElement += `
                        <div class="card mb-5" style="width: 18rem;">
                            <img class="card-img-top mt-2" src="./img/1603893527-freeimages.webp"  alt="Card image cap">
                            <div class="card-body">
                            <h5 class="card-title">${post.name} ${post.firstname}</h5>
                            <p class="card-text">${post.content}</p>
                            <p class="card-text"><small class="text-muted">${post.date_création}</small></p>
                            </div>
                            <a href="./detailPost.html?id=${post.id}" class="col-10 offset-1 btn btn-primary"><span class="gradient">Voir détails</span></a>
                        </div>`;
    }
    postContainer.innerHTML += postElement;
};

fetch(urlPosts)
    .then((response) =>
        response.json()
            .then((data) => {
                console.log(data);
                displayPost(data)
            })
    )
    .catch((err) => console.log('Erreur : ' + err));

/****************************************************************************/
