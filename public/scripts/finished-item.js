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
    $.ajax({
      url: '/todos/:id',
      method: 'POST',

    })
    .done(function () {

    })
  });


  $('#exampleModal').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget) // Button that triggered the modal
    const recipient = button.data('whatever') // Extract info from data attributes
    $.ajax({
      url: '/todos',
      method: 'POST',

    })
    .done(function () {

    })
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    const modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
  })





});
