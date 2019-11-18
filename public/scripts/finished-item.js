$(document).ready(function(){

  $('.list-item').click(function() {
    if ($(this).hasClass('checked')) {
      $(this).removeClass("checked");
      $(this).find('.fas.fa-check').toggle('slide');
    } else {
      $(this).addClass("checked")
      $(this).find('.fas.fa-check').toggle('slide');
    }
  });


});
