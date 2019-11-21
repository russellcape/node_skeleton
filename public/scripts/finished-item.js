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
    let li_id = $(this).find("li").attr("id")
    $.ajax({
      url: `/todos/${li_id}`,
      method: 'DELETE',

    })
    .done(function () {

    })
    $(this).parent().remove()
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
