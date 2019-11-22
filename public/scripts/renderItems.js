$(document).ready(function() {


const renderTodos = function(todos) {
  for (let todo of todos) {
    $('.list-box').prepend(createTodoItem(todo))
  }
};

// ul = list-box class
const createTodoItem = function(todo) {
  // console.log("CHECKING TODO: ", todo);
  let modalTodoLabel = $(`<label>`).addClass('col-form-label').attr({
    for: "todoInput"
  }).text("Todo:")
  let editTodoInput = $(`<input>`).addClass('form-control').attr({
    type: "text",
    id: "todoInput"
  })
  let modalCategoryLabel = $(`<label>`).addClass('col-form-label').attr({
    for: "categoryInput"
  }).text("Category:")
  let editCategoryInput = $(`<input>`).addClass('form-control').attr({
    type: "text",
    id: "categoryInput"
  })
  let editTodoDiv = $(`<div>`).addClass('form-group')
  let editCategoryDiv = $(`<div>`).addClass('form-group')
  let form = $(`<form>`).attr("data-id", `${todo.id}`)
  let modalFormBothDiv = $(`<div>`).addClass('modal-body')
  let spanExitModal = $(`<span>`).attr({
    "aria-hidden": "true"
  }).html("&times;")
  let exitModalBtn = $(`<button>`).addClass('close').attr({
    type: "button",
    "data-dismiss": "modal",
    "aria-label": "Close"
  })
  let closeBtn = $(`<button>`).addClass('btn btn-secondary').attr({
    type: "button",
    "data-dismiss": "modal"
  }).text("Close")
  let saveBtn = $(`<button>`).addClass('btn btn-primary save-btn').attr({
    type: "button"
  }).text("Save Changes")
  let modalFooter = $(`<div>`).addClass('modal-footer')
  let modalTitle = $(`<h5>`).addClass('modal-title').attr({
    id: "exampleModalLabel"
  }).text("Edit Todo Item Category:")

  let modalHeader = $(`<div>`).addClass('modal-header')
  let modalContentDiv = $(`<div>`).addClass('modal-content')
  let modalDialog = $(`<div>`).addClass("modal-dialog").attr({
    role: "document"
  })
  let modalOutterDiv = $(`<div>`).addClass('modal fade').attr({
    id: "exampleModal",
    tabindex: "-1",
    role: "dialog",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  })
  let checkIcon = $(`<i>`).addClass('fas fa-check')
  let editIcon = $(`<i>`).addClass('fas fa-edit')
  let eraserIcon = $(`<i>`).addClass('fas fa-eraser')
  let checkBtn = $(`<button>`).addClass('check-btns')
  let span = $(`<span>`).addClass('todo-text').text([`${todo.description}, -----Priority-----> ${todo.priority}, -----Category-----> ${todo.category}`])
  let editBtn = $(`<button>`).addClass('edit-btn').attr({
    "data-toggle": "modal",
    type: "button",
    "data-target": "#exampleModal",
    "data-whatever":"@cat"
  })
  let deleteBtn = $(`<button>`).addClass('delete-btn')
  let listItem = $(`<li>`).addClass('list-item').attr("id", todo.id)
  // // Split 1
  modalTodoLabel.appendTo(editTodoDiv)
  editTodoInput.appendTo(editTodoDiv)
  editTodoDiv.appendTo(form)
  modalCategoryLabel.appendTo(editCategoryDiv)
  editCategoryInput.appendTo(editCategoryDiv)
  editCategoryDiv.appendTo(form)
  form.appendTo(modalFormBothDiv)

  modalTitle.appendTo(modalHeader)
  exitModalBtn.appendTo(modalHeader)
  spanExitModal.appendTo(exitModalBtn)
  modalHeader.appendTo(modalContentDiv)
  modalFormBothDiv.appendTo(modalContentDiv)
  modalFooter.appendTo(modalContentDiv)

  closeBtn.appendTo(modalFooter)
  saveBtn.appendTo(modalFooter)

  modalContentDiv.appendTo(modalDialog)
  modalDialog.appendTo(modalOutterDiv)

  checkIcon.appendTo(checkBtn)
  checkBtn.appendTo(listItem)
  modalOutterDiv.appendTo(listItem)
  span.appendTo(listItem)
  eraserIcon.appendTo(deleteBtn)
  deleteBtn.appendTo(listItem)
  editBtn.appendTo(listItem)
  editIcon.appendTo(editBtn)
  return listItem
};

$( ".submit-todo" ).submit(function( event ) {
  event.preventDefault();
  console.log("submit-todo")
  const starTotal = $(this).find('.selected').length;

  const formData = {
    description: this.todoTextbox.value,
    date_created: moment().format().substr(0, 10),
    date_due: this.todoDate.value,
    priority: starTotal
  };

  $.ajax({
    url: '/todos',
    method: 'POST',
    data: formData
  })
    .done(function (newTodo) {
      console.log(newTodo , "add todo")
      const todoItem = createTodoItem(newTodo)
      console.log(todoItem);
      $('.list-box').prepend(createTodoItem(newTodo))

    })
});


// const handleNewItem = function() {
//   const todoItemForm = $('.submit-todo')
//   todoItemForm.on('submit', function(event) {
//     event.preventDefault();
//     const inputDataStr = $(this)
//     // console.log(inputDataStr)
//     console.log('Button clicked, performing ajax call...');
// //     $.ajax({
// //       url: `/todos`,
// //       method: `POST`,
// //       dataType: inputDataStr
// //     }).then(function(postedTodos) {
// //       $('.todos').text();
// //       loadNewTodos(postedTodos)
// //     })
// //   })
// // };
// handleNewItem()





const loadNewTodos = function() {
  $.ajax({
    url: `/todos`,
    method: `GET`,
    dataType: `json`,
    success: function(data) {
      console.log('Success: ', data);
      renderTodos(data);

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
        let li_id = $(this).parent().attr("id")
        console.log(li_id)
        $.ajax({
          url: `/todos/${li_id}`,
          method: 'DELETE',
        })
        .done(function () {

        })
        $(this).parent().remove()
      });


      // THIS IS SUPPOSED TO BE THE AJAX CLICK THAT WILL EDIT

      // $('.delete-btn').click(function() {
      //   let li_id = $(this).parent().attr("id")
      //   console.log(li_id)
      //   $.ajax({
      //     url: `/todos/${li_id}`,
      //     method: 'PUT',
      //   })
      //   .done(function () {

      //   })
      // });

      //end of success
    }
  })
};

loadNewTodos()

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

$('.cats').click(function(event) {
  const categoryId =  this.getAttribute("data-categoryId");
  $.ajax({
    url: `categories/${categoryId}/todos`,
    method: 'GET',
  })
  .done(function(data) {
    $('.list-box').empty();
    renderTodos(data);
  })
});


});
