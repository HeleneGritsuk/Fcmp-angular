angular.module('AngularApp', [

])
    .controller('MainCtrl', function ($scope) {
        $scope.categories = [
            {"id": 0, "name": "Done todos"},
            {"id": 1, "name": "New todos"}
        ];

        $scope.todos = [
            {"id": 0, "title": "Hit the gym", "category": "Done todos" },
            {"id": 1, "title": "Bye eggs", "category": "Done todos" },
            {"id": 2, "title": "Read you dont know JS book", "category": "New todos" },
            {"id": 3, "title": "Not getting enough sleep", "category": "Done todos" },
            {"id": 4, "title": "Finish frontcamp and survive", "category": "New todos" },
            {"id": 5, "title": "Start read JS book", "category": "Done todos" },
            {"id": 6, "title": "Get a promotion",  "category": "New todos" },
            {"id": 7, "title": "go snowboarding",  "category": "Done todos" },
            {"id": 8, "title": "Stay alive till Friday",  "category": "New todos" }
        ];

        $scope.currentCategory = null;
        $scope.isCreating = false;
        $scope.isEditing = false;
        $scope.editedTodo = null;

        function isCurrentCategory(category) {
            return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
        }

        function setCurrentCategory(category) {
            $scope.currentCategory = category;
            cancelCreating();
            cancelEditing();
        }

        $scope.isCurrentCategory = isCurrentCategory;
        $scope.setCurrentCategory = setCurrentCategory;

        function shouldShowCreating() {
            return $scope.currentCategory && !$scope.isEditing;
        }
        //
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
        //
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
              category: $scope.currentCategory.name
          };
      }




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

      $scope.createTodo = createTodo;


      function updateTodo(todo) {
          var index = _.findIndex($scope.todos, function (b) {
              return b.id == todo.id
          });
          $scope.todos[index] = todo;

          $scope.editedTodo = null;
          $scope.isEditing = false;
      }

      $scope.updateTodo = updateTodo;

    })
;
