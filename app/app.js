angular.module('myapp', [
    'ui.router',
    'todos'
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/', // Make to navigate to index.html#/
                templateUrl: 'app/todos/todos.tmpl.html',
                controller: 'MainCtrl'
            })
        ;
    })
    .controller('MainCtrl', function ($scope) {

        $scope.todos = [
            {"id": 0, "title": "Hit the gym", "status": true, "date": new Date(2018, 0, 22) },
            {"id": 1, "title": "Bye bananas", "status": true, "date": new Date(2018, 1, 12) },
            {"id": 2, "title": "Read you dont know JS book", "status": false, "date": new Date(2017, 1, 22) },
            {"id": 3, "title": "Not getting enough sleep", "status": true, "date": new Date(2018, 2, 5) },
            {"id": 4, "title": "Finish frontcamp and survive", "status": false, "date": new Date(2018, 2, 10) },
            {"id": 5, "title": "Start read JS book", "status": true, "date": new Date(2018, 2, 24) },
            {"id": 6, "title": "Get a promotion",  "status": false, "date": new Date(2018, 3, 11) },
            {"id": 7, "title": "go snowboarding",  "status": true, "date": new Date(2018, 1, 28) },
            {"id": 8, "title": "Stay alive till Friday",  "status": false, "date": new Date(2018, 2, 17) }
        ];

        $scope.currentCategory = null;
        $scope.isCreating = false;
        $scope.isEditing = false;
        $scope.editedTodo = null;
        $scope.searchQuery   = '';

        $scope.sortType     = 'title';
        $scope.sortReverse  = false;

        $scope.filterDate=function(obj){
          return Math.round( (new Date() - obj.date) / (1000*60*60*24)) >= $scope.searchQuery;
        }

        // function isCurrentCategory(category) {
        //     return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
        // }
        //
        // function setCurrentCategory(category) {
        //     $scope.currentCategory = category;
        //     cancelCreating();
        //     cancelEditing();
        // }
        //
        // $scope.isCurrentCategory = isCurrentCategory;
        // $scope.setCurrentCategory = setCurrentCategory;

        function shouldShowCreating() {
            return !$scope.isEditing;
        }

        function startCreating() {
            $scope.isCreating = true;
            $scope.isEditing = false;

              resetCreateForm();
        }

        function cancelCreating() {
            $scope.isCreating = false;
        }

        $scope.shouldShowCreating = shouldShowCreating;
        $scope.startCreating = startCreating;
        $scope.cancelCreating = cancelCreating;

        function shouldShowEditing() {
            return $scope.isEditing && !$scope.isCreating;
        }

        function startEditing() {
            $scope.isCreating = false;
            $scope.isEditing = true;
        }

        function cancelEditing() {
            $scope.isEditing = false;
            $scope.editedTodo = null;
        }

        $scope.startEditing = startEditing;
        $scope.cancelEditing = cancelEditing;
        $scope.shouldShowEditing = shouldShowEditing;


      function resetCreateForm() {
          $scope.newTodo = {
              title: '',
              status: false,
              date: new Date()
          };
      }

      function toggleTodo(todo){
        var index = _.findIndex($scope.todos, function (b) {
            return b.id == todo.id
        });
        $scope.todos[index].status = !todo.status;

      }
      $scope.toggleTodo = toggleTodo;

      function setEditedTodo(todo) {
        $scope.editedTodo = angular.copy(todo);
      }

      $scope.setEditedTodo = setEditedTodo;

      function isSelectedTodo(todoId) {
          return $scope.editedTodo !== null && $scope.editedTodo.id === todoId;
      }
        $scope.isSelectedTodo = isSelectedTodo;



      //-------------------------------------------------------------------------------------------------
    // CRUD
    //-------------------------------------------------------------------------------------------------


      function createTodo(todo) {
          todo.id = $scope.todos.length;
          $scope.todos.push(todo);

          resetCreateForm();
      }

      function updateTodo(todo) {
          var index = _.findIndex($scope.todos, function (b) {
              return b.id == todo.id
          });
          $scope.todos[index] = todo;

          $scope.editedTodo = null;
          $scope.isEditing = false;
      }

      function deleteTodo(todo) {
          _.remove($scope.todos, function (b) {
              return b.id == todo.id;
          });
      }


      $scope.updateTodo = updateTodo;
      $scope.createTodo = createTodo;
      $scope.deleteTodo = deleteTodo;
    })
;
