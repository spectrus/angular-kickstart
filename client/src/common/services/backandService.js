(function () {
  'use strict';

  function backandService($http, $log, $state, $rootScope, Backand, Session, AUTH_EVENTS) {

    var factory = {};

    factory.listOfObjects = function() {
      return $http({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/table/config',
        params: {
          pageSize: 200,
          pageNumber: 1,
          filter: '[{fieldName:"SystemView", operator:"equals", value: false}]',
          sort: '[{fieldName:"captionText", order:"asc"}]'
        }
      });
    };

    factory.objectData = function(name, pageSize, pageNumber, sort, filter) {
      return $http({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/' + name,
        params: {
          pageSize: pageSize || 5,
          pageNumber: pageNumber || 1,
          filter: filter || '',
          sort: sort || ''
        }
      });
    };

    factory.login = function(credentials){

      $log.debug('backandService.login', credentials);

      return Backand.signin(credentials.username, credentials.password)
        .then(
        function (data, status, headers, config) {
          console.log('logged in, returned: ', data);
          // $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          // members.results = 'You are in.';
          // loadObjects();
          var usr_obj = {};
          usr_obj.username = data.username; usr_obj.firstName = data.firstName; usr_obj.access_token = data.access_token; usr_obj.role = data.role;

          Session.create(usr_obj.username, usr_obj.firstName, usr_obj.access_token, usr_obj.role);
          return usr_obj;
        }
      );

    };

    factory.logout = function (){
      $log.debug('backandService.logout');
      Backand.signout();
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $state.go('root.login',{}, {reload: true});
    };

    return factory;
  }

  angular.module('common.services.backand',[])
    .factory('BackandService', ['$http', '$log', '$state', '$rootScope', 'Backand', 'Session', 'AUTH_EVENTS', backandService]);
})();
