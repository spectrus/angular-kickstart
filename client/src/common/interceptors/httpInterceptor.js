(function() {
  'use strict';

  function httpInterceptor($q, $log) {
    return {

      requestError: function(rejection) {
        $log.debug('requestError: ', rejection);
        return $q.reject(rejection);
      },
      response: function(response) {
        $log.debug('httpInterceptor.response: ', response);
        return response;
      },
      responseError: function(rejection) {
        $log.debug('responseError: ', rejection);
        return $q.reject(rejection);
      }
    };
  }

  angular.module('common.interceptors.http', [])
    .factory('httpInterceptor', httpInterceptor);
})();
