angular.module('postsList').component('postsList', {
  templateUrl: 'app/posts-list/posts-list.template.html',
  controller: [
    '$scope',
    'postsFactory',
    ($scope, postsFactory) => {
      $scope.posts = postsFactory.getPosts();
    },
  ],
});
