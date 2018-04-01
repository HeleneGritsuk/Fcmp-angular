angular.module('post').component('post', {
  templateUrl: 'app/post/post.template.html',
  controller: [
    'postsFactory',
    '$routeParams',
    '$location',
    function(postsFactory, $routeParams, $location) {
      this.post = postsFactory.getPost($routeParams.id);

      this.removePost = id => {
        postsFactory.removePost(id).then(() => {
          $location.path('/');
        });
      };
    },
  ],
});
