$(document).ready(function () {

  /*
   * Effet et animation
   */

  $("img").fadeIn(5000);


  /*
   * Fonctionnalité du panier
   */

  var nbrArticle = 0;

  // Ajouter un article au panier
  $('#add').click(function () {
    nbrArticle++;
    $("header span").text(nbrArticle);
  });

  // Retirer un article du panier
  $('#remove').click(function () {
    nbrArticle--;
    $("header span").text(nbrArticle);
  });

  /*
   * Ajout des avis
   */

  $("#avisButton").click(function () {
    var titre = $("#titleInput").val();
    var commentaire = $("#contentInput").val();

    $("#right").append('<div class="commentaire"><h4>Titre : ' + titre + '</h4><p>Commentaire : ' + commentaire + '</p></div>')
  })


})