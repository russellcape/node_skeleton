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

  $('.delete-btn').click(function() {
    $(this).parent().remove()
  });

  const add = document.getElementsByClassName('.list-item'); // Find the paragraph element in the page
  add.onclick = addItem; // Add onclick function to element

  function addItem(event) {
    $('.list-item').append('new-list-element')
  }



});
