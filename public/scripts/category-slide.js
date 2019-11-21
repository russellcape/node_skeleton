$(document).ready(function(){

  $(".cat-slide").click(function() {
    $(".cats").slideToggle("slow");
  });

  $(".cat-slide").click(function(){
    $(".rotate").toggleClass("down");
   });



  $( ".new-item-button" ).click(function() {
    $(".todos").focus()
  });


});
