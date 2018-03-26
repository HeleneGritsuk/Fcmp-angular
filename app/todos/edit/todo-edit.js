angular.module('todos.edit', [])

  .config(function($stateProvider) {
    $stateProvider
      .state('myapp.todos.edit', {
        url: 'todos/:todoId/edit',
        templateUrl: 'app/todos/edit/todo-edit.tmpl.html',
        controller: 'EditTodoCtrl as editTodoCtrl'
      });
  })
  .controller('EditTodoCtrl', function($state, $stateParams, TodosModel) {

    var editTodoCtrl = this;

    function returnToTodos() {
      $state.go('myapp.todos', {

      })
    }

    function updateTodo() {
      editTodoCtrl.todo = angular.copy(editTodoCtrl.editedTodo);
      TodosModel.updateTodo(editTodoCtrl.editedTodo);
      returnToTodos();
    }

    function cancelEditing() {
      returnToTodos();
    }

    TodosModel.getTodoById($stateParams.todoId)
      .then(function(todo) {
        if (todo) {
          editTodoCtrl.todo = todo;
          editTodoCtrl.editedTodo = angular.copy(editTodoCtrl.todo);
        } else {
          returnToTodos();
        }
      });

    editTodoCtrl.cancelEditing = cancelEditing;
    editTodoCtrl.updateTodo = updateTodo;
  });
