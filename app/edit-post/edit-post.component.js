angular.module('editPost').component('editPost', {
  templateUrl: 'app/edit-post/edit-post.template.html',
  controller: [
    'postsFactory',
    '$location',
    '$routeParams',
    function(postsFactory, $location, $routeParams) {
      this.post = postsFactory.getPosts().find(post => {
        return post._id === $routeParams.id;
      });

      this.editPost = function(postText) {
        postsFactory.editPost({
          ...this.post,
          text: postText,
        });
        $location.path('/');
      };
    },
  ],
});
