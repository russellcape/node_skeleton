$(document).ready(function(){

  $(".list").click(function() {
    if (click) {
      $(this).wrap("<strike>");
        // do first click stuff
    } else {
      $(this).unwrap();
        // do second (and beyond?) click stuff
    }
});

});
