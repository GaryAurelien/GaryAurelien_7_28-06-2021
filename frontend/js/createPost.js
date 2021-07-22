const validation = document.getElementById("submit");


validation.addEventListener('click', (e)=>{
        e.preventDefault;
        sendPost();
    });

function sendPost(){

    //on verifie que la checkbox est checked

    //on vérifie que tout le formulaire est conforme
        let FormValid = document.getElementById('checked').checkValidity();

    //si formulaire pas conforme, alert le client
        if (FormValid == false ) {

            alert(`Vous n'avez pas rempli tous les champs requis !`);
    //sinon
        }else{
        
        //variable qui reccueille les infos de post du client
            let post = {
                content : document.getElementById('content').value,
                file : document.getElementById('inputImg').value
            }; 
            console.log(post);

        //on POST les infos reccueillies au serveur
            const envoi = fetch("http://localhost:3000/posts/create", {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        //traitement de la réponse du serveur
            envoi.then(async response =>{
                try{
                    console.log(response);
                //récupération de la réponse du serveur
                    let confirmation = await response.json();
                    console.log(confirmation);
                //récupération de l'Id de la validation de prise en compte de la commande du serveur
                    /* let idConfirmation = confirmation.postId;
                    console.log(idConfirmation);
                //variable qui reccueille le post du client et l'Id de confirmation de commande
                    let result = {
                        idConfirmation: idConfirmation,
                        post: post
                    }
                    console.log(result); */

                    window.location.href ="./chatPage.html";

                    
            //traitement des erreurs
                } catch (error) {
                    console.log(error);
                    alert("Un problème est survenu, merci de réessayer plus tard");
                }
            });
        };
}