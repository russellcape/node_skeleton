$(document).ready(function() {


const renderTodos = function(todos) {
  for (let todo in todos) {
    $('.list-box').prepend(createTodoItem(todo))
  }
};

// ul = list-box class
const createTodoItem = function(todo) {
let modalTodoLabel = $(`<label>`).addClass('col-form-label')
let editTodoInput = $(`<input>`).addClass('form-control')
let modalCategoryLabel = $(`<label>`).addClass('col-form-label')
let editCategoryInput = $(`<input>`).addClass('form-control')
let editTodoDiv = $(`<div>`).addClass('form-group')
let editCategoryDiv = $(`<div>`).addClass('form-group')
let form = $(`<form>`)
let modalBothDiv = $(`<div>`).addClass('modal-body')
let spanCloseModal = $(`<span>`)
let exitModalBtn = $(`<button>`).addClass('close')
let closeBtn = $(`<button>`).addClass('btn btn-secondary')
let saveBtn = $(`<button>`).addClass('btn btn-primary')
let modalFooter = $(`<div>`).addClass('modal-footer')
let modalTitle = $(`<h5>`).addClass('modal-title')
let modalHeader = $(`<div>`).addClass('modal-header')
let modalContentDiv = $(`<div>`).addClass('modal-content')
let modelDialog = $(`<div>`).addClass("modal-dialog")
let checkIcon = $(`<i>`).addClass('fas fa-check')
let editIcon = $(`<i>`).addClass('fas fa-edit')
let eraserIcon = $(`<i>`).addClass('fas fa-eraser')
let modalOutterDiv = $(`div`).addClass('modal fade')
let checkBtn = $(`<button>`).addClass('check-btn')
let span = $(`<span>`).text()
let editBtn = $(`<button>`).addClass('edit-btn')
let deleteBtn = $(`<button>`).addClass('delete-btn')
let list = $(`<li>`).addClass('list-item')






  // let listItem = $(`<li>`).addClass('list-item')
  // checkIcon.appendTo(checkBtn)
  // checkBtn.appendTo(listItem)
  // span.appendTo(listItem)
  // eraserIcon.appendTo(deleteBtn)
  // deleteBtn.appendTo(listItem)
  // return listItem
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
