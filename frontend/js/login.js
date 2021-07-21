const validation = document.getElementById("validate");


validation.addEventListener('click', (e)=>{
        e.preventDefault;
        sendLogin();
    });

function sendLogin(){

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
                password : document.getElementById('inputPassword').value,
                email : document.getElementById('inputEmail').value
            }; 
            console.log(contact);

        //on POST les infos reccueillies au serveur
            const envoi = fetch("http://localhost:3000/users/login", {
                method: 'POST',
                body: JSON.stringify(contact),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        //traitement de la réponse du serveur
            envoi.then( response =>{
                try{
                    console.log(response);
                //récupération de la réponse du serveur
                    let confirmation = response.json();
                    console.log(confirmation);

                    window.location.href ="./chatPage.html";

                    
            //traitement des erreurs
                } catch (error) {
                    console.log(error);
                    alert("Un problème est survenu, merci de réessayer plus tard");
                }
            });
        };
}