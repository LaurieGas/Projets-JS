// ce fichier sert à avoir un tableau avec les jours de la semaine dans l'ordre à partir du jour actuel (aujourd'hui)

const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let ajd = new Date();
// c'est un objet que l'on va passer à la méthode toLocaleDateString
let options = {weekday : 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', options);

// affiche le jour
// console.log(jourActuel, ajd);

// chartAt = prends la 1ère lettre du mot
jourActuel = jourActuel.charAt(0).toUpperCase()+ jourActuel.slice(1);

let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));

// La méthode indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau. Si l'élément cherché n'est pas présent dans le tableau, la méthode renverra -1.

// console.log(tabJoursEnOrdre);

export default tabJoursEnOrdre;