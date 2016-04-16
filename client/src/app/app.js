(function() {
  'use strict';

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
  });

  function config(BackandProvider, $stateProvider, $urlRouterProvider, $logProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/');

    $logProvider.debugEnabled(true);

    BackandProvider.setAppName('dog');
    //BackandProvider.setAnonymousToken('Your Anonymous Token');
    //BackandProvider.setSignUpToken('Your SignUp Token');

    $httpProvider.interceptors.push('httpInterceptor');

    $stateProvider
      .state('root', {
        views: {
          'header': {
            templateUrl: 'src/common/header.tpl.html',
            controller: 'HeaderCtrl'
          },
          'footer': {
            templateUrl: 'src/common/footer.tpl.html',
            controller: 'FooterCtrl'
          }
        }
      });
  }

  function MainCtrl($log, $scope, Backand, USER_ROLES) {
    $log.debug('MainCtrl loaded! scope id: ', $scope.$id);

    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    // $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setCurrentUser = function (user) {
      $log.debug('app.js: setting current user', user);
      $scope.currentUser = user;
    };

    $scope.unSetCurrentUser = function () {
      $scope.currentUser = null;
    };

    $scope.$on(Backand.EVENTS.SIGNIN, function(){
        $log.debug('Backand.EVENTS.SIGNIN');
    });

    $scope.$on(Backand.EVENTS.SIGNOUT, function(){
        $log.debug('Backand.EVENTS.SIGNOUT');
        $scope.unSetCurrentUser();
    });

    Backand.getUserDetails().then(function(user){
      if(user !== null) {
        $log.debug('App is running, user: ', user, ', scope id: ', $scope.$id);
        $scope.setCurrentUser(user);
      } else {
        $log.debug('App is running, no user in local storage: ', user, ', scope id: ', $scope.$id);
      }
    });
  }

  function run($log) {
    //$log.debug('app running');
  }

  angular.module('app', [
      'ui.router',
      'backand',
      'home',
      'getting-started',
      'login',
      'common.header',
      'common.footer',
      'common.services.backand',
      'common.services.session',
      'common.services.data',
      'common.services.authresolver',
      'common.directives.version',
      'common.filters.uppercase',
      'common.interceptors.http',
      'templates'
    ])
    .config(config)
    .run(run)
    .controller('MainCtrl', ['$log', '$scope', 'Backand', 'USER_ROLES', MainCtrl])
    .value('version', '1.1.0')
    .constant('AUTH_EVENTS', {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
    }).constant('USER_ROLES', {
      all: '*',
      admin: 'admin',
      guest: 'guest'
    });
})();
