$(document).ready(function(){

  $('.star').on('mouseover', function(){
    const onStar = parseInt($(this).data('value'), 10);

    $(this).parent().children('li.star').each(function(hoverEvent){
      if (hoverEvent < onStar) {
        $(this).addClass('hover');
      }
      else {
        $(this).removeClass('hover');
      }
    });

  }).on('mouseout', function(){
    $(this).parent().children('.star').each(function(hoverEvent){
      $(this).removeClass('hover');
    });
  });

  $('#stars li').on('click', function(){
    const onStar = parseInt($(this).data('value'), 10);
    const stars = $(this).parent().children('.star');
    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }
    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }
  });
});
