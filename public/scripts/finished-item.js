$(document).ready(function(){

  $('.side').click(function(event){
    if ($(event.target).text() === 'Priorities');
    $.ajax({
      url: '/todos/priority',
      method: 'GET'
    })
    .done(function(database) {
      console.log(database);
    })
  });

  $('#exampleModal').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget) // Button that triggered the modal
    const recipient = button.data('whatever') // Extract info from data attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    const modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
  })

});
