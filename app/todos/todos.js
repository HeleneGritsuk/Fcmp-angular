angular.module('todos', [

    'myapp.models.todos',
    'todos.create',
    'todos.edit'
])

  .config(function($stateProvider){
      $stateProvider
          .state('myapp.todos', {
              url: '/',
              views: {
                  'todos@': {
                      controller: 'TodosCtrl as todosCtrl',
                      templateUrl: 'app/todos/todos.tmpl.html'
                  }
              }
          })
  })
  .controller('TodosCtrl', function ($stateParams, TodosModel, $scope) {
    var todosCtrl = this;

    TodosModel.getTodos()
      .then(function(todos){
        todosCtrl.todos = todos;
    });

    todosCtrl.searchQuery='';
    todosCtrl.filterDate = function(obj) {
        return TodosModel.filterTodosByDate(obj, todosCtrl.searchQuery );
    }
    todosCtrl.deleteTodo = TodosModel.deleteTodo;
    todosCtrl.toggleTodo = TodosModel.toggleTodo;
  })
;
