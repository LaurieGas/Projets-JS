/* Mini-jeu de devinette.

Objectif: Ecrire un programme qui fait deviner un nombre entre 1 et 100.


Le jeu choisit aléatoirement un nombre entre 1 et 100,
// Cette ligne génère aléatoirement un nombre entre 1 et 100
var solution = Math.floor(Math.random() * 100) + 1;

puis il met le joueur au défi de le deviner en 7 tentatives maximum.
Le joueur devine ce nombre en faisant des propositions.
À chaque tour, le joueur doit être informé s'il a deviné ou non le bon nombre
— si ce n'est pas le cas, le programme lui dit si le nombre qu’il a saisi est trop petit ou trop grand,


Le jeu se termine quand le joueur a deviné le nombre mystère,
ou s'il a épuisé ses 7 chances.
A la fin du jeu, le joueur a la possibilité de débuter une nouvelle partie.

*/



var solution = Math.floor(Math.random() * 100) + 1;
console.log(solution);
var nombreChance = 7;

var solution = Math.floor(Math.random() * 100) + 1;
var nombreChance = 7

     
$("#paris > div").click(function(){
      var reponse = $("input").val();  
      $(".reponse").text(reponse);
      
      nombreChance -= 1;
      $(".nbrChance").text(nombreChance);

    if (solution == reponse ){
          alert(reponse + " Vous avez gagné");
      } else if (solution > reponse ){
            alert(reponse + " Faux, le nombre est trop petit");
      }else if (solution < reponse ){
            alert(reponse + " Faux, le nombre est trop grand");}

      
 });

$("#paris > div").click(function(){
    $('form').append("<div>Rejouez</div>")
});








