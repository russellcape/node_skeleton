$(() => {
  $( ".submit-todo" ).submit(function( event ) {
    event.preventDefault();

    const starTotal = $(this).find('.selected').length;

    const formData = {
      description: this.todoTextbox.value,
      date_due: this.todoDate.value,
      priority: starTotal
    };

    console.log(formData);

    $.ajax({
      url: '/todos',
      method: 'POST',
      data: formData
    })
      .done(function (newTodo) {
        console.log(newTodo)

      })
  });
});
