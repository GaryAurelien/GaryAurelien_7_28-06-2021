const urlArticlesSup = 'http://localhost:3000/posts/';
const searchParamSup = new URLSearchParams(window.location.search).get("id");
const urlApiIdSup = urlArticlesSup + searchParamSup;
console.log(urlApiIdSup);

const validationSup = document.getElementById("Supprimer");


validationSup.addEventListener('click', (e)=>{
        e.preventDefault;
        if (window.confirm(`Are you sure ?`)) {
            Suppression();
            window.location.href = "./post.html";
        } else {
            window.location.href = "./post.html";
        };
        
    });

function Suppression(){

        //on POST les infos reccueillies au serveur
            const envoi = fetch(urlApiIdSup, {
                method: 'DELETE',
            });
        //traitement de la réponse du serveur
            envoi.then(async response =>{
                try{
                   window.location.href ="./post.html";
 
            //traitement des erreurs
                } catch (error) {
                    console.log(error);
                    alert("Un problème est survenu, merci de réessayer plus tard");
                }
            });
        };