$(document).ready(function() {


const renderTodos = function(todos) {
  for (let todo in todos) {
    $('.list-box').append(createTodoItem(todo))
  }
};


const createTodoItem = function(todo) {
  let checkIcon = $(`<i>`).addClass('fas fa-check')
  let eraserIcon = $(`<i>`).addClass('fas fa-eraser')
  let deleteBtn = $(`<button>`).addClass('delete-btns')
  let checkBtn = $(`<button>`).addClass('check-btn')
  let span = $(`<span>`).text(todo)
  let listItem = $(`<li>`).addClass('list-item')
  checkIcon.appendTo(checkBtn)
  checkBtn.appendTo(listItem)
  span.appendTo(listItem)
  eraserIcon.appendTo(deleteBtn)
  deleteBtn.appendTo(listItem)
  return listItem
};


const handleNewItem = (function() {
  const todoItemForm = $('.submit-todo')
  todoItemForm.on('submit', function(event) {
    event.preventDefault();
    const inputDataStr = $(this).serialize()
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

});
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
