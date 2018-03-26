angular.module('myapp', [
    'ui.router',
    'todos'
])
.config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('myapp', {
              url: '',
              abstract: true
          })
      ;

      $urlRouterProvider.otherwise('/');
  })

;
