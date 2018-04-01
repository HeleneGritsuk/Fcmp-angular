angular.module('addPost').component('addPost', {
  templateUrl: 'app/add-post/add-post.template.html',
  controller: [
    'postsFactory',
    '$location',
    function(postsFactory, $location) {
      this.addPost = function(post) {
        debugger;
        post.date = new Date().toJSON();
        postsFactory.addPost(post);
        $location.path('/');
      };
    },
  ],
});
