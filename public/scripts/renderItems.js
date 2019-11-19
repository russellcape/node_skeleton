$(document).ready(function() {


const renderTodos = function(todos) {
  for (let todo of todos) {
    $('.list-box').prepend(createTodoItem(todos))
  }
};



const createTodoItem = function() {
  let checkIcon = $(`<i>`).addClass('fas fa-check')
  let eraserIcon = $(`<i>`).addClass('fas fa-eraser')
  let deleteBtn = $(`<button>`).addClass('delete-btns')
  let checkBtn = $(`<button>`).addClass('check-btn')
  let span = $(`<span>`).text("Dumb Fuck")
  let listItem = $(`<li>`).addClass('list-item')
  .append()

  // let span = $("<span>")
  // let p = $("<p>")
  // li.append(p)
  // p.append(span)

};


const handleNewItem = (function() {
  const todoItem = $('.list-item')
  todoItem.on('button', function(event) {
    event.preventDefault();
    const inputDataStr = $(this).serialize()
    const textContent = $('.todos').val();
    $.ajax({
      url: `/todos`,
      method: `GET`,
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



});
