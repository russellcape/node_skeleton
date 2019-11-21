$(document).ready(function() {


const renderTodos = function(todos) {
  for (let todo in todos) {
    $('.list-box').prepend(createTodoItem(todo))
  }
};

// ul = list-box class
const createTodoItem = function(todo) {
  console.log("CHECKING TODO: ", todo);
  let modalTodoLabel = $(`<label>`).addClass('col-form-label')
  let editTodoInput = $(`<input>`).addClass('form-control')
  let modalCategoryLabel = $(`<label>`).addClass('col-form-label')
  let editCategoryInput = $(`<input>`).addClass('form-control')
  let editTodoDiv = $(`<div>`).addClass('form-group')
  let editCategoryDiv = $(`<div>`).addClass('form-group')
  let form = $(`<form>`)
  let modalFormBothDiv = $(`<div>`).addClass('modal-body')
  let spanExitModal = $(`<span>`)
  let exitModalBtn = $(`<button>`).addClass('close')
  let closeBtn = $(`<button>`).addClass('btn btn-secondary')
  let saveBtn = $(`<button>`).addClass('btn btn-primary')
  let modalFooter = $(`<div>`).addClass('modal-footer')
  let modalTitle = $(`<h5>`).addClass('modal-title')
  let modalHeader = $(`<div>`).addClass('modal-header')
  let modalContentDiv = $(`<div>`).addClass('modal-content')
  let modalDialog = $(`<div>`).addClass("modal-dialog")
  let modalOutterDiv = $(`div`).addClass('modal fade')
  let checkIcon = $(`<i>`).addClass('fas fa-check')
  let editIcon = $(`<i>`).addClass('fas fa-edit')
  let eraserIcon = $(`<i>`).addClass('fas fa-eraser')
  let checkBtn = $(`<button>`).addClass('check-btn')
  let span = $(`<span>`).text()
  let editBtn = $(`<button>`).addClass('edit-btn')
  let deleteBtn = $(`<button>`).addClass('delete-btn')
  let listItem = $(`<li>`).addClass('list-item')
  modalTodoLabel.appendTo(editTodoDiv)
  editTodoInput.appendTo(editTodoDiv)
  modalCategoryLabel.appendTo(editCategoryDiv)
  editCategoryInput.appendTo(editTodoDiv)
  editCategoryDiv.appendTo(form)
  editTodoDiv.appendTo(form)
  form.appendTo(modalFormBothDiv)
  spanExitModal.appendTo(exitModalBtn)
  exitModalBtn.appendTo(modalHeader)
  modalTitle.appendTo(modalHeader)
  closeBtn.appendTo(modalFooter)
  saveBtn.appendTo(modalFooter)
  modalFooter.appendTo(modalContentDiv)
  modalHeader.appendTo(modalContentDiv)
  modalContentDiv.appendTo(modalDialog)
  modalDialog.appendTo(modalOutterDiv)
  modalOutterDiv.appendTo(listItem)
  checkIcon.appendTo(checkBtn)
  checkBtn.appendTo(listItem)
  span.appendTo(listItem)
  editIcon.appendTo(editBtn)
  editBtn.appendTo(listItem)
  eraserIcon.appendTo(deleteBtn)
  deleteBtn.appendTo(listItem)
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
    }
  })
};

loadNewTodos()

});
