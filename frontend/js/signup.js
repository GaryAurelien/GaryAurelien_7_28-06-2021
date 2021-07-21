const validation = document.getElementById("validate");


validation.addEventListener('click', (e)=>{
        e.preventDefault;
        sendSignup();
    });

function sendSignup(){

    //on verifie que la checkbox est checked

    //on vérifie que tout le formulaire est conforme
        let FormValid = document.getElementById('checked').checkValidity();

    //si formulaire pas conforme, alert le client
        if (FormValid == false ) {

            alert(`Vous n'avez pas rempli tous les champs requis !`);
    //sinon
        }else{
        
        //variable qui reccueille les infos de contact du client
            let contact = {
                email : document.getElementById('inputEmail').value,
                password : document.getElementById('inputPassword').value,
                name : document.getElementById('inputNom').value,
                firstname : document.getElementById('inputPrenom').value,
                position : document.getElementById('inputJob').value
            }; 
            console.log(contact);

        //on POST les infos reccueillies au serveur
            const envoi = fetch("http://localhost:3000/users/signup", {
                method: 'POST',
                body: JSON.stringify(contact),
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
                    /* let idConfirmation = confirmation.contactId;
                    console.log(idConfirmation);
                //variable qui reccueille le contact du client et l'Id de confirmation de commande
                    let result = {
                        idConfirmation: idConfirmation,
                        contact: contact
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