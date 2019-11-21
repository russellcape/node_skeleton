$(document).ready(function() {


const renderTodos = function(todos) {
  for (let todo of todos) {
    $('.list-box').prepend(createTodoItem(todo))
  }
};

// ul = list-box class
const createTodoItem = function(todo) {
  console.log("CHECKING TODO: ", todo);
  let modalTodoLabel = $(`<label>`).addClass('col-form-label').attr({
    for: "recipient-name"
  }).text("Todo:")
  let editTodoInput = $(`<input>`).addClass('form-control').attr({
    type: "text",
    id: "recipient-name"
  })
  let modalCategoryLabel = $(`<label>`).addClass('col-form-label').attr({
    for: "message-text"
  }).text("Category:")
  let editCategoryInput = $(`<input>`).addClass('form-control').attr({
    type: "text",
    id: "message-text"
  })
  let editTodoDiv = $(`<div>`).addClass('form-group')
  let editCategoryDiv = $(`<div>`).addClass('form-group')
  let form = $(`<form>`)
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
  let saveBtn = $(`<button>`).addClass('btn btn-primary').attr({
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
  let checkBtn = $(`<button>`).addClass('check-btn')
  let span = $(`<span>`).text(todo.description)
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
  editCategoryInput.appendTo(editTodoDiv)
  editCategoryDiv.appendTo(form)
  form.appendTo(modalFormBothDiv)

  modalTitle.appendTo(modalHeader)
  exitModalBtn.appendTo(modalHeader)
  spanExitModal.appendTo(exitModalBtn)
  modalHeader.appendTo(modalContentDiv)

  closeBtn.appendTo(modalFooter)
  saveBtn.appendTo(modalFooter)

  modalFormBothDiv.appendTo(modalContentDiv)
  modalFooter.appendTo(modalContentDiv)
  modalContentDiv.appendTo(modalDialog)
  modalDialog.appendTo(modalOutterDiv)
  modalOutterDiv.appendTo(listItem)

  checkIcon.appendTo(checkBtn)
  checkBtn.appendTo(listItem)
  span.appendTo(listItem)
  eraserIcon.appendTo(deleteBtn)
  deleteBtn.appendTo(listItem)
  editBtn.appendTo(listItem)
  editIcon.appendTo(editBtn)
  return listItem
};


const handleNewItem = function() {
  const todoItemForm = $('.submit-todo')
  todoItemForm.on('submit', function(event) {
    event.preventDefault();
    const inputDataStr = $(this)
    console.log(inputDataStr)
    console.log('Button clicked, performing ajax call...');
    $.ajax({
      url: `/todos`,
      method: `POST`,
      dataType: inputDataStr
    }).then(function(postedTodos) {
      $('.todos').text();
      loadNewTodos(postedTodos)
    })
  })
};
handleNewItem()

const loadNewTodos = function() {
  $.ajax({
    url: `/todos`,
    method: `GET`,
    dataType: `json`,
    success: function(data) {
       console.log('Success: ', data);
       renderTodos(data);




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

    }
  })
};

loadNewTodos()

});
