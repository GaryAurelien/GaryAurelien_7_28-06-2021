const urlPostId = "http://localhost:3000/posts/";
const searchParam = new URLSearchParams(window.location.search).get("id");
const urlApiId = urlPostId + searchParam;
console.log(urlApiId);
const postContainer = document.getElementById('postId');


/***********************fonction pour affichage des posts*******************/
function displayPostId(data) {
    let postElement = '';
        postElement += `
                <img [src]="sauce?.imageUrl" alt="">
                <div class="info">
                    <h1>${data.content}</h1>
                    <p class="manufacturer">by {{ sauce?.manufacturer }}</p>
                    <h3>Description</h3>
                    <p>${data.content}</p>
                    <div class="like-buttons" *ngIf="!likePending">
                        <div class="likes">
                            <i [ngClass]="{ 'fas liked': liked, 'far': !liked, 'disabled': disliked }"
                                class="like fa-thumbs-up fa-lg" (click)="onLike()"></i>
                            <span>{{ sauce.likes }}</span>
                        </div>
                        <div class="dislikes">
                            <i [ngClass]="{ 'fas disliked': disliked, 'far': !disliked, 'disabled': liked }"
                                class="dislike fa-thumbs-down fa-lg" (click)="onDislike()"></i>
                            <span>{{ sauce.dislikes }}</span>
                        </div>
                    </div>
                    <div class="like-pending" *ngIf="likePending">
                        <mat-spinner class="white-spinner"></mat-spinner>
                    </div>
                    <div class="control-buttons">
                        <button mat-raised-button (click)="onBack()">BACK</button>
                        <button mat-raised-button color="primary" (click)="onModify()"
                            *ngIf="userId === sauce.userId">MODIFY</button>
                        <button mat-raised-button color="warn" (click)="onDelete()"
                            *ngIf="userId === sauce.userId">DELETE</button>
                    </div>
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
