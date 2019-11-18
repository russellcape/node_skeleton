$(document).ready(function(){

  $('.list').click(function() {
    if ($(this).hasClass('checked')) {
      $(this).closest(this).removeClass("checked");
    } else {
      $(this).closest(this).addClass("checked");
    }
  });

});
