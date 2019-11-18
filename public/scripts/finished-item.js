$(document).ready(function(){

  $('.list').click(function() {
    const click = $(this).closest("li").addClass("checked");
    const unclick = $(this).closest("li").removeClass("checked");


    if ($(this).hasClass(".checked")) {
      return unclick
    } else {
      return click
    }
  });

});
