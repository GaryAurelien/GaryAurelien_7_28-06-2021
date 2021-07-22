const urlPosts = "http://localhost:3000/posts";
const postContainer = document.getElementById('discution');


/***********************fonction pour affichage des posts*******************/
function displayPost(data) {
    let postElement = '';
    for (let post of data) {
        postElement += `
                        <div class="card mb-4 mb-lg-4 border shadow">
                            <img class="card-img-top " src="./img/depositphotos_40836509-stock-photo-free-happy-woman-enjoying-nature.jpg"  alt="Card image cap">
                            <div class="card-body">
                            <h5 class="card-title">${post.name} ${post.firstname}</h5>
                            <p class="card-text">${post.content}</p>
                            <p class="card-text"><small class="text-muted">${post.date_création}</small></p>
                            </div>
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
/*************************fonction pour créer des posts*********************/

