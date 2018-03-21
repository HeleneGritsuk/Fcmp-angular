angular.module('AngularApp', [

])
    .controller('MainCtrl', function ($scope) {
        $scope.categories = [
            {"id": 0, "name": "Done todos"},
            {"id": 1, "name": "New todos"}
        ];

        $scope.todos = [
            {"id": 0, "title": "Hit the gym", "category": "Done todos", "date": new Date(2018, 00, 22) },
            {"id": 1, "title": "Bye eggs", "category": "Done todos", "date": new Date(2018, 01, 12) },
            {"id": 2, "title": "Read you dont know JS book", "category": "New todos", "date": new Date(2017, 01, 22) },
            {"id": 3, "title": "Not getting enough sleep", "category": "Done todos", "date": new Date(2018, 02, 05) },
            {"id": 4, "title": "Finish frontcamp and survive", "category": "New todos", "date": new Date(2018, 02, 10) },
            {"id": 5, "title": "Start read JS book", "category": "Done todos", "date": new Date(2018, 02, 24) },
            {"id": 6, "title": "Get a promotion",  "category": "New todos", "date": new Date(2018, 03, 11) },
            {"id": 7, "title": "go snowboarding",  "category": "Done todos", "date": new Date(2018, 01, 28) },
            {"id": 8, "title": "Stay alive till Friday",  "category": "New todos", "date": new Date(2018, 02, 17) }
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
              category: $scope.currentCategory.name,
              date: new Date()
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
