import angular from 'angular';
import ngRoute from 'angular-route';
import ngResource from 'angular-resource';

require('./posts-list/posts-list.module');
require('./post/post.module');
require('./add-post/add-post.module');
require('./edit-post/edit-post.module');
require('./post-form/post-form.module');

import postsFactory from './factories/posts-factory';

angular
  .module('myapp', [
    'postsList',
    'post',
    'addPost',
    'editPost',
    'postForm',
    ngRoute,
    ngResource,
  ])
  .factory('postsFactory', ['$resource', postsFactory])

  .config([
    '$locationProvider',
    '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/', {
          template: '<posts-list></posts-list>',
        })
        .when('/:id', {
          template: '<post></post>',
        })
        .when('/admin/add', {
          template: '<add-post></add-post>',
        })
        .when('/admin/edit/:id', {
          template: '<edit-post></edit-post>',
        })
        .otherwise('/');
    },
  ]);
