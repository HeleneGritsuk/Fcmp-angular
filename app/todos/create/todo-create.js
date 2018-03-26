angular.module('todos.create', [])

.config(function ($stateProvider) {
        $stateProvider
            .state('myapp.todos.create', {
                url: 'todos/create',
                templateUrl: 'app/todos/create/todo-create.tmpl.html',
                controller: 'CreateTodoCtrl as createTodoCtrl'
            })
        ;
    })
    .controller('CreateTodoCtrl', function($state, $stateParams, TodosModel) {
      var createTodoCtrl = this;
      function returnToTodos() {
          $state.go('myapp.todos', {
          })
      }

      function cancelCreating() {
          returnToTodos();
      }

      function createTodo() {
          TodosModel.createTodo(createTodoCtrl.newTodo);
          returnToTodos();
      }

      function resetForm() {
          createTodoCtrl.newTodo = {
              title: '',
              status: false,
              date: new Date()
          };
      }

      createTodoCtrl.cancelCreating = cancelCreating;
      createTodoCtrl.createTodo = createTodo;

      resetForm();
    });
