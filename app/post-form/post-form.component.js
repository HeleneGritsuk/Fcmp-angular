angular.module('postForm').component('postForm', {
  templateUrl: 'app/post-form/post-form.template.html',
  bindings: {
    postAction: '&',
    post: '=',
  },
  controller: [
    '$scope',
    function($scope) {
      this.onSubmit = () => {
        if ($scope.postForm.$valid) {
          this.postAction({ post: this.post });
        }
      };
    },
  ],
});
