const inpUtilisateur = document.querySelector('.form-groupe:nth-child(1) input');
const inpMail = document.querySelector('.form-groupe:nth-child(2) input');
const inpMdp = document.querySelector('.form-groupe:nth-child(3) input');
const inpConfirme = document.querySelector('.form-groupe:nth-child(4) input');
const allImg = document.querySelectorAll('.icone-verif');
const allSpan = document.querySelectorAll('span');
const allLigne = document.querySelectorAll('.ligne div');



// nom d'utilisateur doit avoir minimum 3 caractères
// ici evenement input => quand on est dans l'input, (e) => objet de l'evenement
inpUtilisateur.addEventListener('input', (e) => {

    if(e.target.value.length >= 3) {
        // on recupère la valeur de (e), donc notre input
       
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/check.svg";
        allSpan[0].style.display = "none";
    }   
    else {
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/error.svg";
        allSpan[0].style.display = "inline";
    }

})



// on vérifie l'input email
inpMail.addEventListener('input', (e) => {

    // on vérifie le format email, le contenu de l'input
    // \S = tt les caractères qui ne sont pas des espaces
    //  + = nbre indéfini
    const regexEmail = /\S+@\S+\.\S+/;
    
    // vérifier la valeur de notre input
    // search() = vérifie une chaine de caractère
    if(e.target.value.search(regexEmail) === 0){

        allImg[1].style.display = "inline";
        allImg[1].src = "ressources/check.svg";
        allSpan[1].style.display = "none";

    } else if(e.target.value.search(regexEmail) === -1) {

        allImg[1].style.display = "inline";
        allImg[1].src = "ressources/error.svg";
        allSpan[1].style.display = "inline";

    }

})



// Validation création du MDP
let valeurInp;
const specialCar = /[^a-zA-Z0-9]/;  
// tt ce qui est caractères speciaux
const alphabet = /[a-z]/i;
// i = insensitive : pas sensible à la casse sur les miniscules ou majascules
const chiffres = /[0-9]/;

// permet de savoir le nbre de caractères (symbole, lettre, chiffres) que l'on a ds son input
let objValidation = {
    symbole : 0,
    lettre : 0,
    chiffre : 0
}


// on crée un ecouteur d'evenement sur l'input mdp
// on vérifie les caractères du mdp
inpMdp.addEventListener('input', (e) => {

    // on recupère la valeur de l'input
    valeurInp = e.target.value;

    // search() = vérifie une chaine de caractère
    // si valeur de l'input mdp possède un caractère spécial alors 1 dans l'objet objValidation
    if(valeurInp.search(specialCar) !== -1){
        objValidation.symbole = 1;
    }
    if(valeurInp.search(alphabet) !== -1){
        objValidation.lettre = 1;
    }
    if(valeurInp.search(chiffres) !== -1){
        objValidation.chiffre = 1;

        // console.log(objValidation);
    }




    // prise en compte du retour/effacement de caractères
    if(e.inputType = 'deleteContentBackward'){
        if(valeurInp.search(specialCar) === -1){
            objValidation.symbole = 0;
        }
        if(valeurInp.search(alphabet) === -1){
            objValidation.lettre = 0;
        }
        if(valeurInp.search(chiffres) === -1){
            objValidation.chiffre = 0;
        }
        // console.log(objValidation);
    } 



    // pour valider le mdp (nbre de caractères suffisant)
    let testAll = 0;

    // ici la boucle itère sur les propriétés de l'objet objValidation (symbole, lettre, chiffre)
    for(const property in objValidation){

        // si on a passé la validation, nbre d'éléments/caractères suffisants alors testAll +1
        if(objValidation[property] > 0){
            testAll++;
        }
    }
    // si on a pas passé la validation et donc testAll inférieur à 3 => c'est pas bon, sinon si testAll supérieur à 3 => c'est bon !
    if(testAll < 3){
        allSpan[2].style.display = "inline";
        allImg[2].style.display = "inline";
        allImg[2].src = "ressources/error.svg";
    } else {
        allSpan[2].style.display = "none";
        allImg[2].src = "ressources/check.svg";
    }




    // force mdp
    // ici on compare si la longueur de la valeur de l'input mdp est inf à 6 et sup à 0
    if(valeurInp.length <= 6 && valeurInp.length > 0){
        allLigne[0].style.display = 'block';
        allLigne[1].style.display = 'none';
        allLigne[2].style.display = 'none';
    }
    // ici on compare si la longueur de la valeur de l'input mdp est sup à 6 et inf à 9
    else if (valeurInp.length > 6 && valeurInp.length <= 9) {
        allLigne[0].style.display = 'block';
        allLigne[1].style.display = 'block';
        allLigne[2].style.display = 'none';
    }
      // ici on compare si la longueur de la valeur de l'input mdp est sup à 9 
    else if (valeurInp.length > 9) {
        allLigne[0].style.display = 'block';
        allLigne[1].style.display = 'block';
        allLigne[2].style.display = 'block';
    }
      // ici on compare si la longueur de la valeur de l'input mdp est égale à 0
    else if (valeurInp.length === 0) {
        allLigne[0].style.display = 'none';
        allLigne[1].style.display = 'none';
        allLigne[2].style.display = 'none';
    }

})


// confirmation du mdp
inpConfirme.addEventListener('input', (e) => {

    // si la longueur de la valeur de l'input est égale à 0
    if(e.target.value.length === 0){
        // ici on a "attrape"/recupère le 4ème bloc : <div class="form-groupe"> et on lui applique cette image
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/error.svg";
    }
    // si la valeur de l'input est égale à valeurInp déclarée plus haut (portée globale)
    else if(e.target.value === valeurInp){
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/check.svg";
    } else {
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/error.svg";
    }

})
