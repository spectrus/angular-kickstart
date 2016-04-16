(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.login', {
        url: '/login',
        // resolve: {
        //   auth: function resolveAuthentication(AuthResolver) {
        //     console.log('auth.resolveAuthentication');
        //     return AuthResolver.resolve();
        //   }
        // },
        views: {
          '@': {
            templateUrl: 'src/app/login/login.tpl.html',
            controller: 'LoginCtrl as login'
            // resolve: {
            //   data: function(DataService) {
            //     return DataService.get();
            //   }
            // }
          }
        }
      });
  }

  /**
   * @name  LoginCtrl
   * @description Controller
   */
  function LoginCtrl($scope, $rootScope, $log, $state, Backand, BackandService, AUTH_EVENTS) {
    var self = this;

    (function init() {
      self.username = '';
      self.password = '';

      $log.debug('LoginCtrl.init scope', $scope, $rootScope);

      var unwatch = $scope.$watch('currentUser', function (currentUser) {
          if (angular.isDefined(currentUser)) {
            console.log('LoginCtrl.init - user defined', currentUser);
            if (currentUser) {
              self.results = 'You are in.';
            } else {
              console.log('user not defined');
            }
          }
        });
      self.results = 'Not connected.';
    }());

    function loadObjects() {
      console.log('loadObjects');
      //BackandService.listOfObjects().then(loadObjectsSuccess, errorHandler);
    }

    self.login = function (credentials) {

      $log.debug('login.login: ', credentials);

      BackandService.login(credentials).then(function (user) {
        $log.debug('login.login success: ', user);
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        self.results = 'You are in.';
        $scope.setCurrentUser(user);
      }, function (data) {
        $log.debug('login.login failed: ', data.error_description);
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        self.results = 'Login failed.';
      });

      // Backand.setAppName(login.appName);

      // Backand.signin(credentials.username, credentials.password)
      //   .then(
      //   function () {
      //     $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      //     login.results = 'You are in.';
      //     loadObjects();
      //   },
      //   function (data, status, headers, config) {
      //     $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      //     $log.debug('authentication error', data, status, headers, config);
      //     login.results = data;
      //   }
      //);
    };

  }

  angular.module('login', [])
    .config(config)
    .controller('LoginCtrl',['$scope', '$rootScope', '$log', '$state', 'Backand','BackandService', 'AUTH_EVENTS', LoginCtrl]);
})();
