const searchInput = document.querySelector('.recherche-poke input');
let allPokemon = [];
let tableauFin = [];
const listePoke = document.querySelector('.liste-poke');
const chargement = document.querySelector('.loader');

const types = {
    grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
};

function fetchPokemonBase(){

    // recuperer nos données/ requete http
    // chaine de requete = query parameter => ?limit=151"
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    // on transforme les données en format json
    .then(reponse => reponse.json())
    // on traite/affiche les données
    .then((allPoke) => {
        // console.log(allPoke);

        // on fait une méthode pour récupérer chaque élément du tableau allPoke (qui est un tableau d'obj)
        // forEach prends en paramètre l'objet en cours (pokemon)
        allPoke.results.forEach((pokemon) => {
            fetchPokemonComplet(pokemon);
        })
    })
}
// on appel la fonction
fetchPokemonBase();

function fetchPokemonComplet(pokemon) {
    let objPokemonFull = {};
    let url = pokemon.url;
    let nameP = pokemon.name;

    fetch(url)
    .then(reponse => reponse.json())
    .then((pokeData) => {
        // console.log(pokeData);

        objPokemonFull.pic = pokeData.sprites.front_default;
        objPokemonFull.type = pokeData.types[0].type.name;
        objPokemonFull.id = pokeData.id;

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
        .then((reponse) => reponse.json())
        .then((pokeData) => {
            // console.log(pokeData);

            // on crée une propriété à objPokemonFull
            objPokemonFull.name = pokeData.names[4].name;
            allPokemon.push(objPokemonFull);

            if(allPokemon.length === 151) {
                // console.log(allPokemon);

                // ici on trie les éléments => soit a avant b, soit au mm niveau, soit après
                tableauFin = allPokemon.sort((a,b) => {
                    return a.id - b.id;
                    // 1er element - un autre element ?
                }).slice(0,21);
                // console.log(tableauFin);

                createCard(tableauFin);
                chargement.style.display = "none";
            }
        })

    })
}

// Création des cartes

function createCard(arr) {
    for(let i = 0; i < arr.length; i++) {

        const carte = document.createElement('li');
        let couleur = types[arr[i].type];
        // tableau de [0], ici type de [0]
        carte.style.background = couleur;

        const txtCarte = document.createElement('h5');
        txtCarte.innerText = arr[i].name;

        const idCarte = document.createElement('p');
        idCarte.innerText = `ID# ${arr[i].id}`;

        const imgCarte = document.createElement('img');
        imgCarte.src = arr[i].pic;

        carte.appendChild(imgCarte);
        carte.appendChild(txtCarte);
        carte.appendChild(idCarte);

        listePoke.appendChild(carte);
    }
}

// Scroll Infini

window.addEventListener('scroll', () => {

    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    // scrollTop = scroll depuis le top
    // scrollHeight = scroll total, tout ce que l'on peut scroller ( top + partie visible)
    // clientHeight = hauteur de la fenêtre, partie visible.
    // console.log(scrollTop, scrollHeight, clientHeight);

    if(clientHeight + scrollTop >= scrollHeight - 20) {
        addPoke(6);
    }

})

let index = 21;

function addPoke(nb) {
    if(index > 151) {
        return;
    }
    const arrToAdd = allPokemon.slice(index, index + nb);
    console.log(index, index + nb);
    createCard(arrToAdd);
    index += nb;
}

// Recherche

// recherche avec système de recherche, dans ce cas masquer le btn rechercher 
searchInput.addEventListener('keyup', recherche);

// recherche au clic (btn rechercher)
// const formRecherche = document.querySelector('form');
// formRecherche.addEventListener('submit', (e) => {
//         e.preventDefault();
//         recherche();
//     })
    

function recherche() {
    if(index < 151) {
        addPoke(130);
    }

let filter, allLi, titleValue, allTitles;
    filter = searchInput.value.toUpperCase();
    allLi = document.querySelectorAll('li');
    allTitles = document.querySelectorAll('li > h5');

   
    for(i = 0; i < allLi.length; i++) {

        titleValue = allTitles[i].innerText;

        if(titleValue.toUpperCase().indexOf(filter) > -1) {
            allLi[i].style.display = "flex";
        } else {
            allLi[i].style.display = "none";
        }

    }

}


// Animation Input

searchInput.addEventListener('input', function(e) {
    if(e.target.value !== "") {
        // "si on est en train d'écrire dans l'input alors..."
        // e = objet qui contient les propriétés de l'évenement 
        // target = input
        // value = valeur de l'input
        e.target.parentNode.classList.add('active-input');
        // parentNode = parent de l'input
    } else if(e.target.value === ""){
        // "si on est PAS en train d'écrire dans l'input alors..."
        e.target.parentNode.classList.remove('active-input');
    }
})