// objet date = obj qui se construit avec le constructeur new Date => voir MDN
// => ne retourne pas une chaine de caractères, il faudra le transformé avant pour le traiter

const affichage = document.querySelector('.affichage');
const btns = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input');
const infoTxt = document.querySelector('.info-txt')
let dejaFait = false;

const today = new Date();
// console.log(today);

const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
// getTime = tps en milliseconde
// ici on rajoute le temps sur une semaine
console.log(nextWeek);

// transforme l'obj date en chaine de caractère
let day = ('0' + nextWeek).slice(9,11);
// console.log(day); // affiche "28"
//9 = chiffre de d"part
// 11 = chiffre de fin à partir du chiffre de départ ici 9
// slice prends aussi en compte les espaces comme chaîes de caractères

let month = ('0' + (nextWeek.getMonth() + 1)).slice(-2);
// getMonth = prends en compte les mois de 0 à 11 pour les 12 mois de l'année, donc on rajoute +1 pr avoir 12 mois
//  -2 = decoupe la chaine de caractère à partir de la fin
console.log(month);

let year = today.getFullYear();
console.log(year);
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;

// ici on a un tableau de boutons et on recupère chacun d'entre eux
// btn = valeur courante, on aurait pu écrire un autre nom mais vaut mieux rester logique !
btns.forEach(btn => {
    btn.addEventListener('click', btnAction);
})


function btnAction(e){

    let nvObj = {};

    inputs.forEach(input => {
        // on récupère l'attribut
        let attrName = input.getAttribute('name');

        // syntaxe ternaire : si attr name est différent de "cookie expire" alors => recup sa valeur sinon si attr name = "cookie expire" alors => recupère sa valeur sous forme da date
        let attrValeur = attrName !== "cookieExpire" ? input.value : input.valueAsDate;

        // on ajoute à notre objet vide => les attr et valeurs que l'on a recup dès lors qu'on cliquera sur les boutons créer ou modifier
        nvObj[attrName] = attrValeur;
    })

    // console.log(nvObj);

    let description = e.target.getAttribute('data-cookie');

    // si on appuie sur le bouton créer data-cookie = btn ds l'index
    if(description === "creer"){
        creerCookie(nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire);
    } 
    else if (description === "toutAfficher"){
        listeCookies();
    }

}

function creerCookie(name, value, exp) {

     // message de la ligne 76, disparit au bout d'un moment
     infoTxt.innerText = "";
     affichage.innerHTML = "";

// OU

    // supprimer la liste affichage pour l'enlever du DOM pour créer de nouveau cookie
      affichage.childNodes.forEach(child => {
        child.remove();
    })

    // Si le cookie à un même nom
    let cookies = document.cookie.split(';');
    // document.cookie = en js c'est pour voir les cookies créés

    cookies.forEach(cookie => {
        cookie = cookie.trim();
        // trim() = raser, supprimer les espaces blancs avant ou après son contenu
        // console.log(cookie);

        let formatCookie = cookie.split('=');
        console.log(formatCookie);
        if(formatCookie[0] === encodeURIComponent(name)){
            dejaFait = true;
        }
    })

    if(dejaFait){
        infoTxt.innerText = "Un cookie possède déjà ce nom!"
        dejaFait = false;
        return;
    }


    // Si le cookie n'a pas de nom
    if(name.length === 0) {
        infoTxt.innerText = `Impossible de définir un cookie sans nom.`
        return;
    }


    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp.toUTCString()}`;
    let info = document.createElement('li');
    info.innerText = `Cookie ${name} créé.`;
    affichage.appendChild(info);

    // permet de faire une action différée ds le temps
    setTimeout(() => {
        info.remove();
    }, 1500)
}

function listeCookies() {
    let cookies = document.cookie.split(';');
    if(cookies.join() === "") {
        infoTxt.innerText = "Pas de cookies à afficher";
        return;
    }

    cookies.forEach(cookie => {
        cookie = cookie.trim();
        let formatCookie = cookie.split('=');
        // console.log(formatCookie);

        let item = document.createElement('li');

        infoTxt.innerText = 'Cliquez sur un cookie dans la liste pour le supprimer.'
        item.innerText = `Nom : ${decodeURIComponent(formatCookie[0])}, Valeur : ${decodeURIComponent(formatCookie[1])}`;
        affichage.appendChild(item);

          // Suppression cookie
          item.addEventListener('click', () => {

            document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`
            // new Date(0) =  01/01/1970 donc une date passée => dc cookie supprimé
            item.innerText = `Cookie ${formatCookie[0]} supprimé`;
            setTimeout(() => {
                item.remove();
            }, 1000);

        })
    })

}

