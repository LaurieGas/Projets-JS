import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';

// console.log("DEPUIS MAIN JS:" + tabJoursEnOrdre);

const CLEFAPI = '98ae39402d9c139096f57023077c5da6';
let resultatsAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

// si le navigateur possède la possibilité de se géolocaliser
if(navigator.geolocation) {
    // ici function getCurrentPosition possède 2 arguments : 
    // => position = qui indiquera la current position
    // => fonction anonyme = qui ouvrira un pop up contenant un message
    navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);

        // on récupère les données concernant la long et la lat
        let long = position.coords.longitude;
        let lat = position.coords.latitude;

        // création de la fonction AppelAPI contenant 2 paramètres, à laquelle on fera appel plus loin
        AppelAPI(long,lat);

    }, () => {
        alert("Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuiller l'activer !")
    })
}

function AppelAPI(long,lat) {
    // console.log(long, lat);

    // requete http pour aller récup les données de l'api
    // fetch retourne une promesse et elle va se resoudre lorsque les données seront présentes, lorsque notre requete sera ok
    // utilisation des backticks pour utiliser les templates litterals (expressions js) pour recup long et lat
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    .then((reponse) => {
        return reponse.json();
        // reponse que l'on recoit de l'api n'est pas forcement lisible par notre navigateur, il faut donc le transformer, ici en json
    })
    .then((data) => {
        // console.log(data);
        // ici, on affiche les données, on les console log simplement

        resultatsAPI = data;

        temps.innerText = resultatsAPI.current.weather[0].description;
        // console.log(resultatsAPI);

        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;

        localisation.innerText = resultatsAPI.timezone;

        // les heures par tranche de 3 avec leurs température

        // obtenir l'heure actuelle
        let heureActuelle = new Date().getHours();

        for(let i = 0; i < heure.length; i++) {
            let heureIncr = heureActuelle + i * 3;

            if(heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24} h`;
            } else if(heureIncr === 24) {
                heure[i].innerText = "00h";
            } else {
                heure[i].innerText = `${heureIncr} h`;
            }
        }

        // temperature pour 3h
        for(let j = 0; j < tempPourH.length; j++) {
            tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`
        }

        // 3 premières lettres des jours

        for(let k = 0; k < tabJoursEnOrdre.length; k++) {
            joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);
        }

        // Températures par jour
        for(let m = 0; m < 7; m++) {
            tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m+1].temp.day)}°`
        }

        // icônes dynamiques

        if(heureActuelle >= 6 && heureActuelle < 21) {
            imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
        } else  {
           imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
        }

        chargementContainer.classList.add('disparition');
    })
}

