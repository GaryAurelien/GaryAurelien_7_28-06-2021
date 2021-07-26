const urlComs = "http://localhost:3000/commentaires/";
const idDuPost = new URLSearchParams(window.location.search).get("id");

const urlCom = urlComs + idDuPost + "/comment";


const comContainer = document.getElementById('comments-container');


/***********************fonction pour affichage des posts*******************/

function displayCom(data) {
    let postElement = '';
    for (let comment of data) {
        postElement += `
                        <div class="card mb-5" style="width: 18rem;">
                            <div class="card-body">
                            <p class="card-text">${comment.content}</p>
                            </div>
                        </div>`;
    }
    comContainer.innerHTML += postElement;
};

fetch(urlCom)
    .then((response) =>
        response.json()
            .then((data) => {
                console.log(data);
                displayCom(data)
            })
    )
    .catch((err) => console.log('Erreur : ' + err));

/****************************************************************************/
