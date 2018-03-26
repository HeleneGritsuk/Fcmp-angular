angular.module('myapp.models.todos', [])

  .service('TodosModel', function($http, $q) {
    var model = this,
      URLS = {
        FETCH: 'data/todos.json'
      },
      todos;

    function extract(result) {
      return result.data;
    }

    function cacheTodos(result) {
      todos = extract(result);
      return todos;
    }

    function findTodo(todoId) {
      return _.find(todos, function(todo) {
        return todo.id === parseInt(todoId, 10);
      })
    }

    model.toggleTodo = function(todo) {
      var index = _.findIndex(todos, function(b) {
        return b.id == todo.id
      });

      todos[index].status = !todo.status;
    }

    model.filterTodosByDate = function(obj, searchQuery) {
      return Math.round((new Date() - new Date(obj.date)) / (1000 * 60 * 60 * 24)) >= searchQuery;
    }

    model.getTodos = function() {
      return (todos) ? $q.when(todos) : $http.get(URLS.FETCH).then(cacheTodos);
    };

    model.getTodoById = function(todoId) {
      var deferred = $q.defer();
      if (todos) {
        deferred.resolve(findTodo(todoId))
      } else {
        model.getTodos().then(function() {
          deferred.resolve(findTodo(todoId))
        })
      }
      return deferred.promise;
    };


    model.createTodo = function(todo) {
      todo.id = todos.length;
      todos.push(todo);
    };

    model.updateTodo = function(todo) {
      var index = _.findIndex(todos, function(b) {
        return b.id == todo.id
      });

      todos[index] = todo;
    };

    model.deleteTodo = function(todo) {
      _.remove(todos, function(b) {
        return b.id == todo.id;
      });
    };


  })

;
